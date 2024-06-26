import React from "react";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { Message } from "ai";
import { validate } from "uuid";

import { createClient } from "@/lib/supabase/client";

type ChatMemberStatus = {
  userId: string;
  onlineAt: string;
};

export type RealtimeChatMemberStatus = RealtimePresenceState<ChatMemberStatus>;

type UseSubscribeChatMessagesParams = {
  initialMessages: Message[];
  chatId: string;
  currentUserId?: string;
  newMessageInsertCallback: (messages: Message[]) => void;
  chatMemberPresenceCallback?: (presence: RealtimeChatMemberStatus) => void;
  chatMemberJoinCallback?: (presence: RealtimeChatMemberStatus[]) => void;
  chatMemberLeaveCallback?: (presence: RealtimeChatMemberStatus[]) => void;
};

export function useSubscribeChatMessages({
  initialMessages,
  chatId,
  currentUserId,
  newMessageInsertCallback,
  chatMemberJoinCallback,
  chatMemberLeaveCallback,
  chatMemberPresenceCallback,
}: UseSubscribeChatMessagesParams) {
  const supabaseClient = createClient();
  const messageListRef = React.useRef<Message[]>([]);

  messageListRef.current = initialMessages;

  React.useEffect(() => {
    const subscription = supabaseClient
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.chat_id !== chatId) {
            return;
          }
          const newMessageId = payload.new.id;
          const newMessages = [
            ...messageListRef.current.filter(
              (message) => message.id !== newMessageId && validate(message.id)
            ),
            {
              id: payload.new.id,
              content: payload.new.content,
              role: payload.new.role,
              data: {
                profile_id: payload.new.profile_id,
                chat_id: payload.new.chat_id,
              },
            },
          ];

          newMessageInsertCallback(newMessages);
        }
      )
      .on("presence", { event: "sync" }, () => {
        const newState = subscription.presenceState<ChatMemberStatus>();
        chatMemberPresenceCallback?.(newState);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        chatMemberJoinCallback?.(newPresences);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        chatMemberLeaveCallback?.(leftPresences);
      })
      .subscribe((status) => {
        if (status !== "SUBSCRIBED" || !currentUserId) {
          return;
        }

        subscription.track({
          userId: currentUserId,
          onlineAt: new Date().toISOString(),
        });
      });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chatId,
    supabaseClient,
    currentUserId,
    chatMemberJoinCallback,
    chatMemberLeaveCallback,
    chatMemberPresenceCallback,
    newMessageInsertCallback,
  ]);
}
