import z from "zod";

export const tagSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string(),
});

export const cardSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  bgImage: z.string().optional(),
  tags: z.array(tagSchema).default([]),
  order: z.number().int(),
  columnId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// `order` is computed server-side on POST.
export const cardCreateSchema = cardSchema.omit({
  id: true,
  order: true,
  createdAt: true,
  updatedAt: true,
});

export const cardUpdateSchema = cardCreateSchema.partial().extend({
  order: z.number().int().optional(),
});

export type Card = z.infer<typeof cardSchema>;
export type CardCreate = z.infer<typeof cardCreateSchema>;
export type CardUpdate = z.infer<typeof cardUpdateSchema>;
export type Tag = z.infer<typeof tagSchema>;
