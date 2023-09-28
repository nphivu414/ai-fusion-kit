import { z } from 'zod';

// create schema based on CompletionCreateParams from openai
export const ChatParamSchema = z
  .object({
    model: z.string().optional(),
    description: z.string().optional(),
    temperature: z.array(z.number()).optional(),
    maxTokens: z.array(z.number()).optional(),
    topP: z.array(z.number()).optional(),
    presencePenalty: z.array(z.number()).optional(),
    frequencyPenalty: z.array(z.number()).optional(),
  })
  .strict();
