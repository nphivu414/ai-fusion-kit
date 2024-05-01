"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Chat } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Separator } from "@/components/ui/Separator";

import { AddMembersForm } from "./AddMembersForm";
import { ChatMemberItem } from "./ChatMemberItem";

// import { ChatMembersItem } from "./ChatMembersItem";
// import { NewChatButton } from "./NewChatButton";

type ChatMembersProps = {
  data: Chat[] | null;
  closeDrawer?: () => void;
};

export const ChatMembers = ({ data, closeDrawer }: ChatMembersProps) => {
  return (
    <aside className="max-h-full overflow-auto pb-4">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-card lg:px-4">
        <p className="lg:text-md text-lg font-bold lg:font-normal lg:text-muted-foreground">
          Chat members
        </p>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <AddMembersForm />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator className="sticky top-16" />
      <ul className="mt-2 lg:px-2">
        {/* {data?.length ? null : (
          <p className="text-sm text-muted-foreground">No data</p>
        )} */}
        {/* {data?.map((member) => {
          return <ChatMemberItem key={member.id} />;
        })} */}
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
        <Separator />
        <ChatMemberItem />
      </ul>
    </aside>
  );
};
