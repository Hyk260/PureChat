import { z } from 'zod';

export const DB_FileSchema = z.object({
  id: z.string().uuid(),
  origin_name: z.string(),
  name: z.string(),
  path: z.string(),
  created_at: z.string(), // "2025-06-13T06:56:17.471Z"
  size: z.number(),
  ext: z.string(), // .png
  type: z.string(),
  count: z.number().int().min(0),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export type DB_File = z.infer<typeof DB_FileSchema>;
