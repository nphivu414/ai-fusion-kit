import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Edit, Loader } from 'lucide-react';
import { updateChat } from './action';
import { toast } from '@/components/ui/use-toast';
import { ChatActionProps } from './types';

export const EditChatAction = ({ chat, ...rest }: ChatActionProps) => {
  const [ isAlertOpen, setIsAlertOpen ] = React.useState(false)
  const [ pendingUpdateChat, startUpdateChat ] = React.useTransition()
  const [inputValue, setInputValue] = React.useState(chat.name || '')
  
  const handleDelete = () => {
    startUpdateChat(async () => {
      try {
        await updateChat({
          id: chat.id,
          name: inputValue,
        })
        toast({
          title: "Success",
          description: "Your chat has been updated.",
        })
        setIsAlertOpen(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update chat. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleDelete()
    }
  }

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
  }

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleDelete()
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} {...rest}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit size={16}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Edit your chat title
          </AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='pb-4'>
          <Input name="name" value={inputValue} onChange={onChange} onKeyDown={onKeyDown} autoFocus/>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
          >
            {pendingUpdateChat ? <Loader size={16} className="animate-spin"/> : 'Update'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}