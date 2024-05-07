import React from "react";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { Loader, Trash2 } from "lucide-react";

import { Chat, Profile } from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useToast } from "@/components/ui/use-toast";

import { deleteMember } from "./action";

type ChatActionProps = {
  memberId: Profile["id"];
  memberUsername: Profile["username"];
  chatId: Chat["id"];
} & AlertDialogProps;

export const DeleteMemberAction = ({
  memberId,
  memberUsername,
  chatId,
  ...rest
}: ChatActionProps) => {
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [pendingDeleteMember, startDeleteMember] = React.useTransition();

  const handleRemoveMember = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    startDeleteMember(async () => {
      try {
        await deleteMember(memberId, chatId);
        toast({
          title: "Success",
          description: `${memberUsername || "The member"} has been removed to this chat.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to remove the member to this chat. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAlertOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} {...rest}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove{" "}
            <span className="font-semibold">&quot;{memberUsername}&quot; </span>
            from this chat?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({
                variant: "destructive",
              })
            )}
            onClick={handleRemoveMember}
          >
            {pendingDeleteMember ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
