export const defaultSystemPrompt = "You are an AI assistant. You can answer questions, generate code snippets, and more."

export const types = ["GPT-3.5", "GPT-4"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description: string
  type: Type
}

export const models: Model<ModelType>[] = [
  {
    id: "1",
    name: "gpt-3.5-turbo",
    description: "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration 2 weeks after it is released.",
    type: "GPT-3.5"
  },
  {
    id: "2",
    name: "gpt-3.5-turbo-16k",
    description: "	Same capabilities as the standard gpt-3.5-turbo model but with 4 times the context.",
    type: "GPT-3.5"
  },
  {
    id: "3",
    name: "gpt-3.5-turbo-0613",
    description: "Snapshot of gpt-3.5-turbo from June 13th 2023 with function calling data. Unlike gpt-3.5-turbo, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    type: "GPT-3.5"
  },
  {
    id: "4",
    name: "gpt-4",
    description: "More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration 2 weeks after it is released.",
    type: "GPT-4"
  },
  {
    id: "5",
    name: "gpt-4-0613",
    description: "Snapshot of gpt-4 from June 13th 2023 with function calling data. Unlike gpt-4, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    type: "GPT-4"
  },
  {
    id: "6",
    name: "gpt-4-32k",
    description: "Same capabilities as the standard gpt-4 mode but with 4x the context length. Will be updated with our latest model iteration.",
    type: "GPT-4"
  },
]
