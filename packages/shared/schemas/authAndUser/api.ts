import z from "zod";
import { registerSchema } from ".";
import { boardMemberSchema, boardSchema } from "../boards";

export const userProfileSchema = registerSchema.extend({
  refreshToken: z.string().optional(),
  boardMemberShips: z.array(boardMemberSchema),
  ownedBoards: z.array(boardSchema),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
