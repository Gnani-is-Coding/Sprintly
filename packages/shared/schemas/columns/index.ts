import z from "zod";

export const columnsSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  bgColor: z.string().optional(),
  order: z.number().int(),
  boardId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// `order` is computed server-side on POST.
export const columnsCreateSchema = columnsSchema.omit({
  id: true,
  order: true,
  createdAt: true,
  updatedAt: true,
});

export const columnsUpdateSchema = columnsCreateSchema.partial().extend({
  order: z.number().int().optional(),
});

export type Columns = z.infer<typeof columnsSchema>;
export type ColumnsCreate = z.infer<typeof columnsCreateSchema>;
export type ColumnsUpdate = z.infer<typeof columnsUpdateSchema>;
