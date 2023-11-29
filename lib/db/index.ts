import { PostgrestError } from "@supabase/supabase-js";

import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Insert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Update<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;

// Select
export type Profile = Tables<"profiles">;
export type App = Tables<"apps">;
export type Chat = Tables<"chats">;
export type Message = Tables<"messages">;
export type TokenUsage = Tables<"token_usage">;
export type SubscriptionPlan = Tables<"subscription_plans">;
export type Product = Tables<"products">;
export type Price = Tables<"prices">;
export type Subscription = Tables<"subscriptions">;

//Insert
export type NewSubscription = Insert<"subscriptions">;
export type NewTokenUsage = Insert<"token_usage">;

//Update
export type UpdateMessage = Update<"messages">;
export type UpdateTokenUsage = Update<"token_usage">;
