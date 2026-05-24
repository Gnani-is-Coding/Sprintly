import z from "zod";
import { userProfileSchema } from "../authAndUser/api";

export const Roles = z.enum(["OWNER", "ADMIN", "EDITOR", "VIEWER"]);

export const boardMemberSchema: z.ZodType = z.lazy(() => {
  return z.object({
    id: z.string(),
    userId: z.string(),
    boardId: z.string(),
    role: Roles,
    user: userProfileSchema,
  });
});

export const boardSchema = z.object({
  id: z.string(),
  title: z.string(),
  bgColor: z.string(),
  isATemplate: z.boolean(),
  authorId: z.string(),
  members: z.array(boardMemberSchema).optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const boardCreateSchema = boardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  members: true,
});

export const boardUpdateSchema = boardCreateSchema.partial();

export type Board = z.infer<typeof boardSchema>;
export type BoardCreate = z.infer<typeof boardCreateSchema>;
export type BoardUpdate = z.infer<typeof boardUpdateSchema>;
