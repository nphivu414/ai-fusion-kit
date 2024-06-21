import GPTAvatar from "@/public/chat-gpt.jpeg";

import { Profile } from "./db";

export const APP_SLUGS = {
  CHAT: "/apps/chat",
};

export const CHAT_MEMBER_SIDEBAR_LAYOUT_COOKIE =
  "react-resizable-panels:member-sidebar-layout";

export const DEFAULT_CHAT_MEMBER_SIDEBAR_LAYOUT = [70, 30];
export const MIN_CHAT_MEMBER_SIDEBAR_SIZE = 8;
export const MAX_CHAT_MEMBER_SIDEBAR_SIZE = 70;
export const CHAT_BOT_TRIGGER_WHITE_LIST = ["assistant"];
export const MENTION_MARKUP = "@[__display__](user:__id__)";
export const MENTION_TRIGGER = "@";
export const MAX_CHAT_INPUT_HEIGHT = 210;
export const AI_ASSISTANT_PROFILE: Profile = {
  id: "assistant",
  username: "Assissant",
  avatar_url: GPTAvatar.src,
  full_name: "Bot",
  billing_address: null,
  payment_method: null,
  updated_at: null,
  website: "https://openai.com",
};
