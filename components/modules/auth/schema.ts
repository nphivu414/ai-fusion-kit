import * as z from "zod"

const credentialAuthObject = {
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
}

export const credentialAuthSchema = z.object({
  ...credentialAuthObject,
})

export const registerProfileSchema = z.object({
  ...credentialAuthObject,
  fullName: z.string().optional(),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});