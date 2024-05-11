import React from "react";
import GPTAvatar from "@/public/chat-gpt.jpeg";
import { Message } from "ai/react";

import { MessageAdditionalData, Message as SupabaseMessage } from "@/lib/db";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Heading5 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { ChatPanelProps } from "@/components/modules/apps/chat/ChatPanel";

import { ChatBubble } from "./ChatBubble";

type ChatListProps = {
  data: Message[];
  isLoading: boolean;
  stop: () => void;
  reload: (id: SupabaseMessage["id"]) => void;
  chatMembers: ChatPanelProps["chatMembers"];
};

export const ChatList = ({
  data,
  chatMembers,
  isLoading,
  stop,
  reload,
}: ChatListProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({});
  const hasConversation =
    data.filter((message) => message.role !== "system").length > 0;

  React.useEffect(() => {
    if (isCopied) {
      toast({
        description: "Copied to clipboard",
      });
    }
  }, [isCopied]);

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
            const direction = m.role === "assistant" ? "start" : "end";
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
                direction={direction}
                isLoading={isLoading}
                isLast={isLast}
                onCopy={copyToClipboard}
                onRegenerate={reload}
                onStopGenerating={stop}
              />
            );
          })}
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
