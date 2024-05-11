import { cookies } from "next/headers";
import { env } from "@/env.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { pick } from "lodash";
import { AxiomRequest, withAxiom } from "next-axiom";
import OpenAI from "openai";

import { getAppBySlug } from "@/lib/db/apps";
import { createNewChatMember } from "@/lib/db/chat-members";
import { createNewChat } from "@/lib/db/chats";
import {
  createNewMessage,
  deleteMessagesFrom,
  getMessageById,
} from "@/lib/db/message";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const preferredRegion = "home";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = withAxiom(async (req: AxiomRequest) => {
  const log = req.log.with({
    route: "api/chat",
  });

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const params = await req.json();
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
    isNewChat,
    enableChatAssistant = true,
  } = params;

  const user = await getCurrentUser(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const lastMessage = messages[messages.length - 1];

  if (!isRegenerate) {
    if (isNewChat && currentApp) {
      await createNewChat(supabase, {
        id: chatId,
        app_id: currentApp.id,
        name: lastMessage.content,
      });
      await createNewChatMember(supabase, {
        chat_id: chatId,
        member_id: user.id,
      });
    }
    await createNewMessage(supabase, {
      chat_id: chatId,
      content: lastMessage.content,
      role: "user",
      id: lastMessage.id,
    });
  } else if (regenerateMessageId) {
    const fromMessage = await getMessageById(supabase, regenerateMessageId);
    if (fromMessage?.created_at) {
      await deleteMessagesFrom(supabase, chatId, fromMessage.created_at);
    }
  }

  if (!enableChatAssistant) {
    return new Response(null);
  }

  const response = await openai.chat.completions.create({
    model,
    temperature,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages.map((message: any) => pick(message, "content", "role")),
    max_tokens: maxTokens,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stream: true,
  });
  log.debug("Create stream");

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      await createNewMessage(supabase, {
        chat_id: chatId,
        content: completion,
        role: "assistant",
      });
    },
  });

  return new StreamingTextResponse(stream);
});
