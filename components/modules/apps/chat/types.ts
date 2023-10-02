import { z } from 'zod';
import { ChatParamSchema } from './schema';
import { Chat } from '@/lib/db';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';

export type ChatParams = z.infer<typeof ChatParamSchema>;

export type ChatActionProps = {
  chat: Chat
} & Omit<AlertDialogProps, 'children'>