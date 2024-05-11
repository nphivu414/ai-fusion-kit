import { CHAT_BOT_TRIGGER_WHITE_LIST } from "./contants";

export const containsChatBotTrigger = (str: string) => {
  return CHAT_BOT_TRIGGER_WHITE_LIST.some((word) => str.includes(`@${word}`));
};
