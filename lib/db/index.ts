import { Tables } from "./database.types";

export * from "./database.types";
export type Profile = Tables<"profiles">;
export type App = Tables<"apps">;
export type Chat = Tables<"chats">;
export type Message = Tables<"messages">;
