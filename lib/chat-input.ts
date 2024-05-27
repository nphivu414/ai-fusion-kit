import { CHAT_BOT_TRIGGER_WHITE_LIST } from "./contants";

export const containsChatBotTrigger = (input: string) => {
  const whitelistPattern = CHAT_BOT_TRIGGER_WHITE_LIST.join("|");
  const pattern = new RegExp(`@\\[(${whitelistPattern})\\]\\(user:\\1\\)`, "i");
  return pattern.test(input);
};
