import { cookies } from "next/headers";
import { env } from "@/env.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { pick } from "lodash";
import { AxiomRequest, withAxiom } from "next-axiom";
import OpenAI from "openai";

import { createFreeTokenUsage, reduceTokenUsage } from "@/lib/db/admin";
import { getAppBySlug } from "@/lib/db/apps";
import { createNewChat } from "@/lib/db/chats";
import {
  createNewMessage,
  deleteMessagesFrom,
  getMessageById,
} from "@/lib/db/message";
import { getTokenUsage } from "@/lib/db/token-usage";
import { getCurrentSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const preferredRegion = "home";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const tokenThreshold = 100;

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
  } = params;

  const session = await getCurrentSession(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  let tokenUsage = await getTokenUsage(supabase);
  if (!tokenUsage) {
    tokenUsage = await createFreeTokenUsage(session.user.id);
  }

  const limitToken = Math.min(tokenUsage.remaining_tokens, maxTokens);
  if (limitToken < tokenThreshold) {
    return new Response(
      JSON.stringify({
        error: "Token limit reached",
        tokenUsage,
      }),
      { status: 402 }
    );
  }

  const lastMessage = messages[messages.length - 1];
  const profileId = session.user.id;

  await Promise.all([
    (async () => {
      if (!isRegenerate) {
        if (isNewChat && currentApp) {
          await createNewChat(supabase, {
            id: chatId,
            appId: currentApp.id,
            profileId,
            name: lastMessage.content,
          });
        }
        await createNewMessage(supabase, {
          chatId,
          content: lastMessage.content,
          profileId,
          role: "user",
          id: lastMessage.id,
        });
      } else if (regenerateMessageId) {
        const fromMessage = await getMessageById(supabase, regenerateMessageId);
        if (fromMessage?.createdAt) {
          await deleteMessagesFrom(
            supabase,
            chatId,
            profileId,
            fromMessage.createdAt
          );
        }
      }
    })(),
    reduceTokenUsage(tokenUsage, limitToken),
  ]);

  const response = await openai.chat.completions.create({
    model,
    temperature,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages.map((message: any) => pick(message, "content", "role")),
    max_tokens: limitToken,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stream: true,
  });
  log.debug("Create stream");

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      await createNewMessage(supabase, {
        chatId,
        content: completion,
        profileId,
        role: "assistant",
      });
    },
  });

  return new StreamingTextResponse(stream);
});
