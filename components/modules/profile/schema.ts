import * as z from "zod"

export const profileSchema = z.object({
  fullName: z.string().optional().or(z.literal('')),
  username: z.string().optional().or(z.literal('')),
  website: z.string().optional().or(z.literal('')),
});