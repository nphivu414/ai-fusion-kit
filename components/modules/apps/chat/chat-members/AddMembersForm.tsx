import React from "react";

import { useChatIdFromPathName } from "@/hooks/useChatIdFromPathName";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/use-toast";

import { addNewMember } from "./action";

type AddMembersFormProps = {
  onCloseAddMemberPopover: () => void;
};

export const AddMembersForm = ({
  onCloseAddMemberPopover,
}: AddMembersFormProps) => {
  const { toast } = useToast();
  const chatId = useChatIdFromPathName();
  const [username, setUsername] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleAddMember = () => {
    startTransition(async () => {
      try {
        await addNewMember(username, chatId);
        setUsername("");
        toast({
          title: "Success",
          description: `${username} has been added to this chat.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to add the member to this chat. Please try again.",
          variant: "destructive",
        });
      } finally {
        onCloseAddMemberPopover();
      }
    });
  };

  return (
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
        <Button
          size="sm"
          className="w-full"
          isLoading={isPending}
          onClick={handleAddMember}
        >
          Add member
        </Button>
      </div>
    </div>
  );
};
