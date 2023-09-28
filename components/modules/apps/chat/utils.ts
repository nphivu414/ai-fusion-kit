import { ChatParams } from "./types"

export const buildChatRequestParams = (formValues: ChatParams) => {
  const { model, temperature, topP, maxTokens, frequencyPenalty, presencePenalty } = formValues
  return {
    model,
    temperature: temperature?.[0],
    topP: topP?.[0],
    maxTokens: maxTokens?.[0],
    frequencyPenalty: frequencyPenalty?.[0],
    presencePenalty: presencePenalty?.[0],
  }
}