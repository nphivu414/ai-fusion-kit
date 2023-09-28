import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/AlertDialog';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Loader, Trash2 } from 'lucide-react';
import { deleteChat } from './action';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useChatIdFromPathName } from '@/hooks/useChatIdFromPathName';
import { ChatActionProps } from './types';

export const DeleteChatAction = ({ chat, ...rest }: ChatActionProps) => {
  const [ isAlertOpen, setIsAlertOpen ] = React.useState(false)
  const [ pendingDeleteChat, startDeleteChat ] = React.useTransition()
  const { replace } = useRouter()
  const chatIdFromPathName = useChatIdFromPathName()

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    startDeleteChat(async () => {
      try {
        await deleteChat(chat.id)
        toast({
          title: "Success",
          description: "Your chat has been deleted.",
        })
        if (chatIdFromPathName === chat.id) {
          replace('/apps/chat')
        }
        setIsAlertOpen(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete chat. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} {...rest}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 size={16}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this chat?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({
              variant: 'destructive',
            }))} 
            onClick={onDelete}
          >
            {pendingDeleteChat ? <Loader size={16} className="animate-spin"/> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}