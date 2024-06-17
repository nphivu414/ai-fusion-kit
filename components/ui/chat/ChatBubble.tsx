import React from "react";
import { CalendarDays, Copy, RefreshCcw, StopCircle } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { isTaggedUserPattern } from "@/lib/chat-input";
import { ChatMemberProfile, Message } from "@/lib/db";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/modules/apps/chat/CodeBlock";

import { Button } from "../Button";
import { UserAvatar } from "../common/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { MemoizedReactMarkdown } from "./Markdown";

export type ChatBubbleProps = {
  id: Message["id"];
  prevId?: Message["id"];
  direction?: "start" | "end";
  avatar?: string;
  name: string;
  time?: string;
  status?: string;
  content: string;
  isLoading: boolean;
  isLast: boolean;
  chatMemberMap?: Record<string, ChatMemberProfile>;
  onCopy: (message: string) => void;
  onRegenerate: (id: Message["id"]) => void;
  onStopGenerating?: () => void;
};

export const ChatBubble = ({
  prevId,
  content,
  name,
  avatar,
  direction,
  status,
  time,
  isLoading,
  isLast,
  chatMemberMap,
  onCopy,
  onRegenerate,
  onStopGenerating,
}: ChatBubbleProps) => {
  const chatClass = cn(`chat-${direction} chat mb-4`, {
    "place-items-start grid-cols-[auto_1fr]": direction === "start",
    "place-items-end grid-cols-[1fr_auto]": direction === "end",
  });
  const chatBubbleClass = cn(
    "chat-bubble min-h-fit w-auto max-w-full rounded-md px-4 py-2 lg:max-w-[90%]",
    {
      "bg-secondary text-secondary-foreground": direction === "start",
      "bg-primary text-primary-foreground": direction === "end",
    }
  );

  const handleOnCopy = () => {
    onCopy(content);
  };

  const renderActionButtons = () => {
    const copyButton = (
      <button
        className={badgeVariants({ variant: "secondary" })}
        onClick={handleOnCopy}
      >
        <Copy size={12} className="mr-1" />
        Copy
      </button>
    );
    if (isLast) {
      return isLoading ? (
        direction === "start" && (
          <button
            className={badgeVariants({ variant: "secondary" })}
            onClick={onStopGenerating}
          >
            <StopCircle size={12} className="mr-1" />
            Stop generating
          </button>
        )
      ) : (
        <>
          {copyButton}
          {direction === "start" && (
            <button
              className={badgeVariants({
                variant: "secondary",
                className: "ml-2",
              })}
              onClick={() => prevId && onRegenerate(prevId)}
            >
              <RefreshCcw size={12} className="mr-1" />
              Regenerate response
            </button>
          )}
        </>
      );
    }

    return copyButton;
  };

  return (
    <div className={chatClass}>
      <div className="avatar chat-image">
        <UserAvatar username={name} avatarUrl={avatar} />
      </div>
      <div className="chat-header mb-2 text-muted-foreground">
        {name}
        {time ? <time className="text-xs opacity-50">{time}</time> : null}
      </div>
      <div className={chatBubbleClass}>
        <MemoizedReactMarkdown
          className="dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            a({ children, node: { properties } }) {
              if (!isTaggedUserPattern(properties?.href || "")) {
                return (
                  <a className="cursor-pointer text-gray-300 underline">
                    {children}
                  </a>
                );
              }

              const userName = properties?.href?.toString()?.split(":")[1];
              const profile = userName && chatMemberMap?.[userName]?.profiles;
              const profileCreatedAt =
                userName && chatMemberMap?.[userName]?.created_at;

              if (!profile) {
                return (
                  <a className="cursor-pointer text-gray-300 underline">
                    {children}
                  </a>
                );
              }

              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className={cn("p-0 text-foreground", {
                        "text-white": direction === "end",
                      })}
                    >
                      {children}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-60">
                    <div className="flex justify-between space-x-4">
                      <UserAvatar
                        username={profile.username}
                        avatarUrl={profile.avatar_url}
                      />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{children}</h4>
                        {profile.full_name ? (
                          <p className="text-sm">{profile.full_name}</p>
                        ) : null}
                        {profileCreatedAt ? (
                          <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 size-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              Joined on{" "}
                              {new Date(profileCreatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            },
            code({ inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
      <div className="chat-footer">
        {status}
        <div className="mt-2 flex w-full justify-end">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};
