import React from "react";

import { useChatIdFromPathName } from "@/hooks/useChatIdFromPathName";
import { UserAvatar } from "@/components/ui/common/UserAvatar";

import { DeleteMemberAction } from "./DeleteMemberAction";

type ChatMemberItemProps = {
  id: string;
  username: string;
  avatarUrl: string | null;
  fullname?: string;
  removeable?: boolean;
  isOnline?: boolean;
};

export const ChatMemberItem = ({
  id,
  fullname,
  username,
  avatarUrl,
  removeable = false,
  isOnline,
}: ChatMemberItemProps) => {
  const chatId = useChatIdFromPathName();

  return (
    <div className="flex items-center gap-3 rounded-md p-2 text-sm">
      <UserAvatar
        className="z-0"
        username={username}
        avatarUrl={avatarUrl}
        email=""
        isOnline={isOnline}
      />
      <div className="flex-1">
        <p>{fullname || username}</p>
      </div>
      {removeable && (
        <DeleteMemberAction
          chatId={chatId}
          memberId={id}
          memberUsername={username}
        />
      )}
    </div>
  );
};
