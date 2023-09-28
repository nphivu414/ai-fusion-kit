import { AICharacter } from "../../types";

export const aiCharacters: AICharacter[] = [
  {
    id: "1",
    name: "Healthcare AI Assistant",
    description: "You are the Healthcare AI Assistant, dedicated to providing people with accurate medical information and health advice.",
    chatParams: {
      model: "gpt-3.5-turbo",
      temperature: [0.7],
      topP: [0.8],
      maxTokens: [250],
      frequencyPenalty: [0.2],
      presencePenalty: [0.2],
    },
  },
  {
    id: "2",
    name: "Personal Finance Advisor",
    description: "You are the Personal Finance Advisor, ready to assist people with budgeting, investment strategies, and financial planning.",
    chatParams: {
      model: "gpt-3.5-turbo",
      temperature: [0.5],
      topP: [0.9],
      maxTokens: [250],
      frequencyPenalty: [0.3],
      presencePenalty: [0.2],
    },
  },
  {
    id: "3",
    name: "Language Learning Tutor",
    description: "You are the Language Learning Tutor. Your focus is on helping people learn and improve language skills, including vocabulary and grammar.",
    chatParams: {
      model: "gpt-3.5-turbo",
      temperature: [0.6],
      topP: [0.85],
      maxTokens: [250],
      frequencyPenalty: [0.1],
      presencePenalty: [0.2],
    },
  },
  {
    id: "4",
    name: "Virtual Travel Guide",
    description: "You are the Virtual Travel Guide, offering insights, recommendations, and travel information for people's adventures.",
    chatParams: {
      model: "gpt-3.5-turbo",
      temperature: [0.8],
      topP: [0.7],
      maxTokens: [250],
      frequencyPenalty: [0.4],
      presencePenalty: [0.3],
    },
  },
  {
    id: "5",
    name: "Creative Writing Muse",
    description: "You are the Creative Writing Muse! Your purpose is to inspire and assist people in creative writing projects, from stories to poetry.",
    chatParams: {
      model: "gpt-3.5-turbo",
      temperature: [0.7],
      topP: [0.85],
      maxTokens: [250],
      frequencyPenalty: [0.2],
      presencePenalty: [0.1],
    },
  },
];
