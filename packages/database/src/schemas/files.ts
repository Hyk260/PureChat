import { z } from "zod"

export const FileSchema = {
  id: "",
  origin_name: "",
  name: "",
  path: "",
  created_at: "",
  size: 0,
  ext: "",
  type: "",
  count: 0,
  createdAt: 0,
  updatedAt: 0,
}

export const DB_FileSchema = z.object({
  origin_name: z.string(),
  name: z.string(),
  path: z.string(),
  created_at: z.string(), // "2025-06-13T06:56:17.471Z"
  size: z.number(),
  ext: z.string(), // .png
  type: z.string(),
  count: z.number(),
  // id: z.string().uuid(),
  // createdAt: z.number().optional(),
  // updatedAt: z.number().optional(),
})

export type DB_File = z.infer<typeof DB_FileSchema>
