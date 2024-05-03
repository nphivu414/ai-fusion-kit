import React from "react";
import { useFormState } from "react-dom";

import { useChatIdFromPathName } from "@/hooks/useChatIdFromPathName";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { addNewMember } from "./action";

export const AddMembersForm = () => {
  const chatId = useChatIdFromPathName();
  const [username, setUsername] = React.useState("");
  const addNewMemberToCurrentChat = addNewMember.bind(null, username, chatId);
  const [state, formAction] = useFormState(addNewMemberToCurrentChat, null);
  console.log("🚀 ~ AddMembersForm ~ state:", state);

  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Add new members</h4>
          <p className="text-sm text-muted-foreground">
            You can add new members to this chat to discuss and share ideas.
          </p>
        </div>
        <div className="space-y-4">
          <Input
            name="username"
            label="Enter member username"
            autoFocus
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit" size="sm" className="w-full">
            Add member
          </Button>
        </div>
      </div>
    </form>
  );
};
