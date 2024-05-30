"use client";

import React from "react";
import { Plus } from "lucide-react";

import { ChatMemberProfile } from "@/lib/db";
import { useProfileStore } from "@/lib/stores/profile";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Separator } from "@/components/ui/Separator";

import { ChatPanelProps } from "../ChatPanel";
import { AddMembersForm } from "./AddMembersForm";
import { ChatMemberItem } from "./ChatMemberItem";

type ChatMembersProps = {
  data: ChatMemberProfile[] | null;
  isChatHost: ChatPanelProps["isChatHost"];
  closeDrawer?: () => void;
};

export const ChatMembers = ({ data, isChatHost }: ChatMembersProps) => {
  const [addMemberPopoverOpen, setAddMemberPopoverOpen] = React.useState(false);
  const currentProfile = useProfileStore((state) => state.profile);

  const handleAddMemberPopoverOpen = (isOpen: boolean) => {
    setAddMemberPopoverOpen(isOpen);
  };

  const closeAddMemberPopover = () => {
    setAddMemberPopoverOpen(false);
  };

  return (
    <aside className="max-h-full overflow-auto pb-4">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-card px-4">
        <p className="lg:text-md text-lg font-bold lg:font-normal lg:text-muted-foreground">
          Chat members
        </p>
        <div>
          <Popover
            open={addMemberPopoverOpen}
            onOpenChange={handleAddMemberPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <AddMembersForm onCloseAddMemberPopover={closeAddMemberPopover} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator className="sticky top-16" />
      <ul className="mt-2 lg:px-2">
        {data?.length ? null : (
          <p className="text-sm text-muted-foreground">No data</p>
        )}
        {data?.map((member) => {
          const { profiles, id } = member;
          if (!profiles) return null;
          let removeable = false;
          const isMemberChat =
            currentProfile && currentProfile.id !== profiles.id ? true : false;

          if (isChatHost && isMemberChat) {
            removeable = true;
          }
          return (
            <React.Fragment key={id}>
              <ChatMemberItem
                id={id}
                username={profiles.username || ""}
                avatarUrl={profiles.avatar_url}
                removeable={removeable}
                isOnline={member.status === "online"}
              />
              <Separator />
            </React.Fragment>
          );
        })}
      </ul>
    </aside>
  );
};
