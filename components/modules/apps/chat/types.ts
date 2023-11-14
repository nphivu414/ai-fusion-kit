import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { z } from "zod";

import { Chat } from "@/lib/db";

import { ChatParamSchema } from "./schema";

export type ChatParams = z.infer<typeof ChatParamSchema>;

export type ChatActionProps = {
  chat: Chat;
} & Omit<AlertDialogProps, "children">;
