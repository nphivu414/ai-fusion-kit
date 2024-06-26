import z from "zod";

export const addMemberSchema = z.object({
  username: z.string(),
});
