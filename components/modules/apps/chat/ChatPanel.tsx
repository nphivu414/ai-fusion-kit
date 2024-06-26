"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message, useChat } from "ai/react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { containsChatBotTrigger } from "@/lib/chat-input";
import { Chat, ChatMemberProfile, Message as SupabaseMessage } from "@/lib/db";
import { useProfileStore } from "@/lib/stores/profile";
import {
  RealtimeChatMemberStatus,
  useSubscribeChatMessages,
} from "@/hooks/useSubscribeChatMessages";
import { ChatList } from "@/components/ui/chat";
import { ChatScrollAnchor } from "@/components/ui/common/ChatScrollAnchor";
import { Separator } from "@/components/ui/Separator";
import { Sheet } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/use-toast";

import { revalidateChatLayout } from "./action";
import { ChatForm } from "./ChatForm";
import { ControlSidebarSheet } from "./control-side-bar/ControlSidebarSheet";
import { defaultSystemPrompt } from "./control-side-bar/data/models";
import { Header } from "./Header";
import { ChatParamSchema } from "./schema";
import { ChatParams } from "./types";
import { buildChatRequestParams } from "./utils";

const defaultValues: ChatParams = {
  description: defaultSystemPrompt,
  model: "gpt-3.5-turbo",
  temperature: [1],
  topP: [0.5],
  maxTokens: [250],
  frequencyPenalty: [0],
  presencePenalty: [0],
};

export type ChatPanelProps = {
  chatId: Chat["id"];
  initialMessages: Message[];
  chats: Chat[] | null;
  chatParams?: ChatParams;
  isNewChat?: boolean;
  isChatHost?: boolean;
  chatMembers: ChatMemberProfile[] | null;
  defaultMemberSidebarLayout: number[];
};

export const ChatPanel = ({
  chatId,
  chats,
  initialMessages,
  chatParams,
  isNewChat,
  isChatHost,
  chatMembers,
  defaultMemberSidebarLayout,
}: ChatPanelProps) => {
  const { toast } = useToast();
  const profile = useProfileStore((state) => state.profile);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [sidebarSheetOpen, setSidebarSheetOpen] = React.useState(false);
  const router = useRouter();
  const [chatMemberWithStatus, setChatMemberWithStatus] = React.useState<
    ChatMemberProfile[] | null
  >(chatMembers);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    isLoading,
    stop,
    reload,
    error,
    setMessages,
    append,
  } = useChat({
    id: chatId,
    api: "/api/chat",
    initialMessages,
    sendExtraMessageFields: true,
    onResponse: async (response) => {
      if (response?.headers.get("should-redirect-to-new-chat") === "true") {
        await revalidateChatLayout();
        router.replace(`/apps/chat/${chatId}`);
      }
    },
    onFinish: async () => {
      if (isNewChat) {
        await revalidateChatLayout();
        router.replace(`/apps/chat/${chatId}`);
      }
    },
  });

  const handleChatMemberPresense = React.useCallback(
    (newState: RealtimeChatMemberStatus) => {
      if (!chatMembers?.length) {
        return;
      }

      const onlineMemberProfileIds = Object.values(newState).map(
        (value) => value[0].userId
      );
      const updatedChatMembers: ChatMemberProfile[] = chatMembers.map(
        (member) => ({
          ...member,
          status: onlineMemberProfileIds.includes(member.profiles?.id || "")
            ? "online"
            : "offline",
        })
      );
      setChatMemberWithStatus(updatedChatMembers);
    },
    [chatMembers]
  );

  const handleNewMessageInsert = React.useCallback(
    (newMessages: Message[]) => {
      setMessages(newMessages);
    },
    [setMessages]
  );

  useSubscribeChatMessages({
    initialMessages: messages,
    chatId,
    currentUserId: profile?.id,
    newMessageInsertCallback: handleNewMessageInsert,
    chatMemberPresenceCallback: handleChatMemberPresense,
  });

  const formReturn = useForm<ChatParams>({
    defaultValues: chatParams || defaultValues,
    mode: "onChange",
    resolver: zodResolver(ChatParamSchema),
  });

  const chatRequestParams = React.useMemo(() => {
    const formValues = formReturn.getValues();
    return buildChatRequestParams(formValues);
  }, [formReturn]);

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description:
          "AI Assistant is not available at the moment. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  React.useEffect(() => {
    if (!messages.length) {
      return;
    }
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
    });
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages.length]);

  React.useEffect(() => {
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
    });
    window.scrollTo({ top: document.body.scrollHeight });
  }, []);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
  };

  const handleReloadMessages = React.useCallback(
    (id: SupabaseMessage["id"]) => {
      reload({
        options: {
          body: {
            ...chatRequestParams,
            chatId,
            isRegenerate: true,
            regenerateMessageId: id,
          },
        },
      });
    },
    [chatId, chatRequestParams]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || isLoading) {
      return;
    }

    append(
      {
        content: input,
        role: "user",
        id: uuidv4(),
        data: {
          profile_id: profile?.id || "",
          chat_id: chatId,
        },
      },
      {
        options: {
          body: {
            ...chatRequestParams,
            chatId,
            isNewChat,
            enableChatAssistant: containsChatBotTrigger(input),
          },
        },
      }
    );
    setInput("");
  };

  const closeSidebarSheet = React.useCallback(() => {
    setSidebarSheetOpen(false);
  }, []);

  return (
    <Sheet open={sidebarSheetOpen} onOpenChange={setSidebarSheetOpen}>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1">
          <div className="flex w-full flex-col rounded-lg pb-4 lg:bg-background">
            <div className="mx-auto flex w-full flex-1 flex-col">
              <Header />
              <Separator />
              <div
                ref={scrollAreaRef}
                className="mx-auto flex w-full max-w-screen-2xl grow basis-0 flex-col overflow-visible px-4 pb-[130px] lg:overflow-y-auto lg:pb-0"
              >
                <ChatList
                  data={messages}
                  isLoading={isLoading}
                  stop={stop}
                  reload={handleReloadMessages}
                  chatMembers={chatMemberWithStatus}
                />
                <ChatScrollAnchor
                  trackVisibility={isLoading}
                  parentElement={scrollAreaRef?.current}
                />
              </div>
              <ChatForm
                chatInput={input}
                chats={chats}
                onInputChange={handleOnChange}
                isChatStreamming={isLoading}
                onSubmit={onSubmit}
                chatMembers={chatMemberWithStatus}
              />
            </div>
          </div>
          <ControlSidebarSheet
            closeSidebarSheet={closeSidebarSheet}
            formReturn={formReturn}
            isNewChat={isNewChat}
            messages={messages}
            setMessages={setMessages}
            chatMembers={chatMemberWithStatus}
            isChatHost={isChatHost}
            defaultMemberSidebarLayout={defaultMemberSidebarLayout}
          />
        </div>
      </div>
    </Sheet>
  );
};
