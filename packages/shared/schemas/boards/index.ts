import z from "zod";

export const boardSchema = z.object({
  id: z.string(),
  title: z.string(),
  bgColor: z.string(),
  isATemplate: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Board = z.infer<typeof boardSchema>;
