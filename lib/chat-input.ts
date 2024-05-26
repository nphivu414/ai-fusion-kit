import { CHAT_BOT_TRIGGER_WHITE_LIST } from "./contants";

export const containsChatBotTrigger = (input: string) => {
  console.log("🚀 ~ containsChatBotTrigger ~ input:", input);
  const whitelistPattern = CHAT_BOT_TRIGGER_WHITE_LIST.join("|");
  // Regular expression to match the pattern @[<value>](user:<value>) with the whitelist
  const pattern = new RegExp(`@\\[(${whitelistPattern})\\]\\(user:\\1\\)`);
  return pattern.test(input);
};
