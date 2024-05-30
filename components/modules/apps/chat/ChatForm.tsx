import React from "react";
import { SendHorizonal } from "lucide-react";
import { MentionsInputProps, SuggestionDataItem } from "react-mentions";

import { Chat, ChatMemberProfile } from "@/lib/db";
import { useProfileStore } from "@/lib/stores/profile";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { Button } from "@/components/ui/Button";
import { ChatInput } from "@/components/ui/chat";

import { MobileDrawerControl } from "./MobileDrawerControls";

type ChatFormProps = {
  chatInput: string;
  chats: Chat[] | null;
  isChatStreamming: boolean;
  chatMembers: ChatMemberProfile[] | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export const ChatForm = ({
  chats,
  isChatStreamming,
  chatMembers,
  chatInput,
  onSubmit,
  onInputChange,
}: ChatFormProps) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const currentProfile = useProfileStore((state) => state.profile);

  const mentionData: SuggestionDataItem[] = React.useMemo(() => {
    const mentionData = [{ id: "assistant", display: "Assistant" }];

    if (!chatMembers) return mentionData;

    chatMembers.forEach((member) => {
      if (!member.profiles) return;
      mentionData.push({
        id: member.profiles.id,
        display: member.profiles.username || "",
      });
    });

    return mentionData.filter((mention) => mention.id !== currentProfile?.id);
  }, [chatMembers, currentProfile?.id]);

  const handleOnChange: MentionsInputProps["onChange"] = (e) => {
    onInputChange({
      target: { value: e.target.value },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background p-4 lg:relative lg:mt-2 lg:bg-transparent lg:py-0">
      <form onSubmit={onSubmit} className="relative" ref={formRef}>
        <ChatInput
          value={chatInput}
          onKeyDown={onKeyDown}
          onChange={handleOnChange}
          mentionData={mentionData}
        />
        <MobileDrawerControl chats={chats} />
        <div className="absolute bottom-0 right-0 flex w-1/2 justify-end px-2 pb-2">
          <Button size="sm" type="submit" disabled={isChatStreamming}>
            Send
            <SendHorizonal size={14} className="ml-1" />
          </Button>
        </div>
      </form>
    </div>
  );
};
