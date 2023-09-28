import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { RequestCookies } from "@edge-runtime/cookies";
import {
  env
} from '@/env.mjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { getCurrentSession } from '@/lib/session';
import { createNewMessage, deleteMessagesFrom, getMessageById } from '@/lib/db/message';
import { pick } from 'lodash';
import { AxiomRequest, withAxiom } from 'next-axiom';

export const runtime = 'edge'
 
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})
 
export const POST = withAxiom(async (req: AxiomRequest) => {
  const log = req.log.with({
    route: 'api/chat',
  });
  
  const cookies = new RequestCookies(req.headers) as any;
  const supabase = createRouteHandlerClient({ cookies: () => cookies })
  const params = await req.json()
  console.log("🚀 ~ file: route.ts:15 ~ POST ~ params:", params)
  const {
    messages,
    temperature,
    model,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
    chatId,
    isRegenerate,
    regenerateMessageId,
  } = params;

  const session = await getCurrentSession(supabase)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const lastMessage = messages[messages.length - 1]
  const profileId = session.user.id

  if (!isRegenerate) {
    await createNewMessage(supabase, {
      chatId,
      content: lastMessage.content,
      profileId,
      role: 'user',
      id: lastMessage.id
    })
  }else if (regenerateMessageId) {
    const fromMessage = await getMessageById(supabase, regenerateMessageId)
    if (fromMessage?.createdAt) {
      await deleteMessagesFrom(supabase, chatId, profileId, fromMessage.createdAt)
    }
  }

  const response = await openai.chat.completions.create({
    model,
    temperature,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages.map((message: any) => pick(message, 'content', 'role')),
    max_tokens: maxTokens,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stream: true
  })
  log.debug('Create stream');
 
  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      log.debug('onCompletion', { completion });
      createNewMessage(supabase, {
        chatId,
        content: completion,
        profileId: session.user.id,
        role: 'assistant',
      })
    },
    onFinal(completion) {
      log.debug('onFinal', { completion });
    },
    onToken(token) {
      log.debug('onToken', { token });
    },
    onStart() {
      log.debug('onStart');
    },
  })
 
  return new StreamingTextResponse(stream)
})
