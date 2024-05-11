import { Tables } from "./database.types";

export * from "./database.types";
export type Profile = Tables<"profiles">;
export type App = Tables<"apps">;
export type Chat = Tables<"chats">;
export type ChatMember = Tables<"chat_members">;
export type Message = Tables<"messages">;
export type ChatMemberProfile = {
  id: ChatMember["id"];
  profiles: Profile | null;
};
export type MessageAdditionalData = Pick<Message, "profile_id" | "chat_id">;
