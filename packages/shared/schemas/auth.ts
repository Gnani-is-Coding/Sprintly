import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(8, "Password must be of min 8 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Name is required"),
});
export const userProfileSchema = registerSchema.extend({
  refreshToken: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
