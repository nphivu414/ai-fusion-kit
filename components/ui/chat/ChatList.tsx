import React from "react";
import GPTAvatar from "@/public/chat-gpt.jpeg";
import { Message } from "ai/react";

import { getRawValueFromMentionInput } from "@/lib/chat-input";
import {
  ChatMemberProfile,
  MessageAdditionalData,
  Message as SupabaseMessage,
} from "@/lib/db";
import { useProfileStore } from "@/lib/stores/profile";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Heading5 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { ChatPanelProps } from "@/components/modules/apps/chat/ChatPanel";

import { ChatBubble, ChatBubbleProps } from "./ChatBubble";

type ChatListProps = {
  data: Message[];
  isLoading: boolean;
  stop: () => void;
  reload: (id: SupabaseMessage["id"]) => void;
  chatMembers: ChatPanelProps["chatMembers"];
  showAssistantTyping?: boolean;
};

export const ChatList = ({
  data,
  chatMembers,
  isLoading,
  stop,
  reload,
  showAssistantTyping,
}: ChatListProps) => {
  const currentProfile = useProfileStore((state) => state.profile);
  const { isCopied, copyToClipboard } = useCopyToClipboard({});
  const hasConversation =
    data.filter((message) => message.role !== "system").length > 0;

  const chatMemberMap = React.useMemo(() => {
    return chatMembers?.reduce(
      (acc, member) => {
        if (!member.profiles) return acc;
        acc[member.profiles.id] = {
          ...member,
          profiles: member.profiles,
          created_at: member.created_at,
        };
        return acc;
      },
      {} as Record<string, ChatMemberProfile>
    );
  }, [chatMembers]);

  React.useEffect(() => {
    if (isCopied) {
      toast({
        description: "Copied to clipboard",
      });
    }
  }, [isCopied]);

  const handleOnCopy = React.useCallback(
    (message: string) => {
      const rawMessage = getRawValueFromMentionInput(message);
      copyToClipboard(rawMessage);
    },
    [copyToClipboard]
  );

  return (
    <>
      {hasConversation ? (
        <>
          {data.map((m, index) => {
            const messageAdditionalData = m.data as
              | MessageAdditionalData
              | undefined;

            const messageProfileId = messageAdditionalData?.profile_id;

            const member = chatMembers?.find(
              (member) => member.profiles?.id === messageProfileId
            )?.profiles;
            const memberUsername = member?.username;
            const memberAvatar = member?.avatar_url;

            if (m.role === "system") {
              return null;
            }
            const name =
              m.role === "assistant"
                ? "AI Assistant"
                : memberUsername || "Unknown User";
            const avatar =
              m.role === "assistant" ? GPTAvatar.src : memberAvatar || "";

            let direction: ChatBubbleProps["direction"];
            if (
              messageAdditionalData?.profile_id === currentProfile?.id &&
              m.role === "user"
            ) {
              direction = "end";
            } else if (m.role === "assistant") {
              direction = "start";
            }

            const isLast = index === data.length - 1;
            return (
              <ChatBubble
                id={m.id}
                prevId={
                  data[index - 1]?.role === "user"
                    ? data[index - 1].id
                    : undefined
                }
                key={index}
                name={name}
                content={m.content}
                avatar={avatar}
                direction={
                  direction || messageAdditionalData?.chatBubleDirection
                }
                isLoading={isLoading}
                isLast={isLast}
                chatMemberMap={chatMemberMap}
                onCopy={handleOnCopy}
                onRegenerate={reload}
                onStopGenerating={stop}
              />
            );
          })}
          {showAssistantTyping && (
            <ChatBubble
              id="typing"
              name="AI Assistant"
              content="Typing..."
              avatar={GPTAvatar.src}
              direction="start"
              isLoading={true}
              isLast={false}
              onCopy={() => {}}
              onRegenerate={() => {}}
            />
          )}
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="text-center lg:max-w-[65%]">
            <Heading5 className="lg:text-3xl">Unleash Your Creativity</Heading5>
            <p className="mt-2 text-sm text-muted-foreground">
              Chat with your AI assistant to generate new ideas and get
              inspired.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
