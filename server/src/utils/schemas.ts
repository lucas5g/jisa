import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})  

export const userUpdateSchema = z.intersection(userCreateSchema, z.object({
  password: z.string().optional()
}))

export type userCreateType = z.infer<typeof userCreateSchema>
export type userUpdateType = z.infer<typeof userUpdateSchema>


export const groupSchema = z.object({
  name: z.string(),
  codcur: z.number(),
  codper: z.number()
})

export const authSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido!'
  }),
  password: z.string().min(3)
})

export const gameSchema = z.object({
  date: z.string().datetime({ offset: true }),
  startHours: z.string(),
  endHours: z.string(),
  placeId: z.number(),
  modalityId: z.number(),
  userId: z.number()
})

export const teamQuerySchema = z.object({
  modalityId:z.coerce.number().optional()
})

export const teamSchema = z.object({
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number()
})

export type teamType = z.infer<typeof teamSchema>
