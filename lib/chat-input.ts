import { CHAT_BOT_TRIGGER_WHITE_LIST } from "./contants";

export const containsChatBotTrigger = (input: string) => {
  const whitelistPattern = CHAT_BOT_TRIGGER_WHITE_LIST.join("|");
  const pattern = new RegExp(`@\\[(${whitelistPattern})\\]\\(user:\\1\\)`, "i");
  return pattern.test(input);
};

export const getRawValueFromMentionInput = (input: string) => {
  const pattern = /@\[(.*?)\]\(user:(.*?)\)/i;
  return input.replace(pattern, "@$1");
};

export const isTaggedUserPattern = (
  input: string | number | true | (string | number)[]
) => {
  if (typeof input !== "string") {
    return false;
  }
  const pattern = /user:\w+/;
  return pattern.test(input);
};
