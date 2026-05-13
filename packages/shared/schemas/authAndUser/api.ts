import z from "zod";
import { registerSchema } from ".";

export const userProfileSchema = registerSchema.extend({
  refreshToken: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
