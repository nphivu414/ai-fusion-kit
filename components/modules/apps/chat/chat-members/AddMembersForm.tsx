import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { useChatIdFromPathName } from "@/hooks/useChatIdFromPathName";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/form/form-fields";
import { useToast } from "@/components/ui/use-toast";

import { addNewMember } from "./action";
import { addMemberSchema } from "./schema";

type AddMembersFormProps = {
  onCloseAddMemberPopover: () => void;
};

type AddMembersFormParams = z.infer<typeof addMemberSchema>;

const defaultValues: AddMembersFormParams = {
  username: "",
};

export const AddMembersForm = ({
  onCloseAddMemberPopover,
}: AddMembersFormProps) => {
  const { toast } = useToast();
  const chatId = useChatIdFromPathName();
  const [isPending, startTransition] = React.useTransition();

  const { handleSubmit, formState, register } = useForm<AddMembersFormParams>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: zodResolver(addMemberSchema),
  });

  const fieldProps = { register, formState };

  const onSubmit: SubmitHandler<AddMembersFormParams> = (data) => {
    handleAddMember(data.username);
  };

  const handleAddMember = async (username: string) => {
    startTransition(async () => {
      try {
        await addNewMember(username, chatId);
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
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Add new members</h4>
        <p className="text-sm text-muted-foreground">
          You can add new members to this chat to discuss and share ideas.
        </p>
      </div>
      <div className="space-y-4">
        <InputField
          name="username"
          label="Enter member username"
          autoFocus
          required
          {...fieldProps}
        />
        <Button
          type="submit"
          size="sm"
          className="w-full"
          isLoading={formState.isSubmitting || isPending}
        >
          Add member
        </Button>
      </div>
    </form>
  );
};
