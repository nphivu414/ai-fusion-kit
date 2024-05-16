"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message, useChat } from "ai/react";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { containsChatBotTrigger } from "@/lib/chat-input";
import { Chat, ChatMemberProfile, Message as SupabaseMessage } from "@/lib/db";
import { useProfileStore } from "@/lib/stores/profile";
import { createClient } from "@/lib/supabase/client";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import {
  RealtimeChatMemberStatus,
  useSubscribeChatMessages,
} from "@/hooks/useSubscribeChatMessages";
import { Button } from "@/components/ui/Button";
import { ChatInput, ChatList } from "@/components/ui/chat";
import { ChatScrollAnchor } from "@/components/ui/common/ChatScrollAnchor";
import { Separator } from "@/components/ui/Separator";
import { Sheet } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/use-toast";

import { revalidateChatLayout } from "./action";
import { ControlSidebarSheet } from "./control-side-bar/ControlSidebarSheet";
import { defaultSystemPrompt } from "./control-side-bar/data/models";
import { Header } from "./Header";
import { MobileDrawerControl } from "./MobileDrawerControls";
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
  const supabaseClient = createClient();
  const { toast } = useToast();
  const profile = useProfileStore((state) => state.profile);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [sidebarSheetOpen, setSidebarSheetOpen] = React.useState(false);
  const { formRef, onKeyDown } = useEnterSubmit();
  const router = useRouter();
  const [chatMemberWithStatus, setChatMemberWithStatus] = React.useState<
    ChatMemberProfile[] | null
  >(chatMembers);
  const [showAssistantTyping, setShowAssistantTyping] = React.useState(false);

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
    onFinish: async () => {
      if (isNewChat) {
        await revalidateChatLayout();
        router.replace(`/apps/chat/${chatId}`);
      }
    },
  });

  React.useEffect(() => {
    const subscription = supabaseClient.channel(
      `chat:assistant-streamming:${chatId}`
    );

    subscription
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") {
          return null;
        }

        // Send a message once the client is subscribed
        subscription.send({
          type: "broadcast",
          event: "ai-streamming",
          payload: { isStreamming: isLoading },
        });
      })
      .on("broadcast", { event: "ai-streamming" }, (payload) => {
        console.log(
          "🚀 ~ React.useEffect ~ payload:",
          payload.payload.isStreamming
        );

        if (payload.payload.isStreamming) {
          setShowAssistantTyping(true);
        } else {
          setShowAssistantTyping(false);
        }
      });
  }, [chatId, isLoading, messages, setMessages, supabaseClient, toast]);

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

  const getChatRequestParams = () => {
    const formValues = formReturn.getValues();
    return buildChatRequestParams(formValues);
  };

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

  const handleReloadMessages = (id: SupabaseMessage["id"]) => {
    reload({
      options: {
        body: {
          ...getChatRequestParams(),
          chatId,
          isRegenerate: true,
          regenerateMessageId: id,
        },
      },
    });
  };

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
            ...getChatRequestParams(),
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
                className="mx-auto flex w-full max-w-screen-2xl grow basis-0 flex-col overflow-visible px-4 pb-[110px] lg:overflow-y-auto lg:pb-0"
              >
                <ChatList
                  data={messages}
                  isLoading={isLoading}
                  stop={stop}
                  reload={handleReloadMessages}
                  chatMembers={chatMemberWithStatus}
                  showAssistantTyping={showAssistantTyping}
                />
                <ChatScrollAnchor
                  trackVisibility={isLoading}
                  parentElement={scrollAreaRef?.current}
                />
              </div>
              <div className="fixed bottom-0 left-0 w-full bg-background p-4 lg:relative lg:mt-2 lg:bg-transparent lg:py-0">
                <form onSubmit={onSubmit} className="relative" ref={formRef}>
                  <ChatInput
                    value={input}
                    onKeyDown={onKeyDown}
                    onChange={handleOnChange}
                  />
                  <MobileDrawerControl chats={chats} />
                  <div className="absolute bottom-0 right-0 flex w-1/2 justify-end px-2 pb-2">
                    <Button size="sm" type="submit" disabled={isLoading}>
                      Send
                      <SendHorizonal size={14} className="ml-1" />
                    </Button>
                  </div>
                </form>
              </div>
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
