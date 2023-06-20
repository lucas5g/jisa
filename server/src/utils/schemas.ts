import { z } from "zod";

const profiles = [
  'coordinator', 
  'judge',
  'manager', 
  'representative'
] as const 

const unities = [
  'contagem',
  'bh'
] as const 

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  profile: z.enum(profiles), 
  unity: z.enum(unities)
})  

export const userUpdateSchema = userCreateSchema.extend({
  id: z.number().optional(),
  password: z.string().optional()
})

export const userFilterSchema = z.object({
  profile: z.enum(profiles).optional()
})
export type UserCreateType = z.infer<typeof userCreateSchema>
export type UserUpdateType = z.infer<typeof userUpdateSchema>


export const groupSchema = z.object({
  name: z.string(),
  unity: z.enum(['bh', 'contagem', 'gutierrez', 'novalima'])
  // codcur: z.number(),
  // codper: z.number()
})

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const authUpdateMeSchema = z.object({
  name: z.string(),
  password: z.string().optional()
})

export type authType = z.infer<typeof authSchema>

export const gameSchema = z.object({
  date: z.string().datetime(),
  startHours: z.string(),
  endHours: z.string(),
  placeId: z.number(),
  modalityId: z.number(),
  userId: z.number(),
  comments: z.string().optional().nullable(),
  teams:z.array(
    z.object({
      id: z.number(),
      goals: z.number(),
      points: z.number()
    })
  )
})

export const gameFilterSchema = z.object({
  userId: z.coerce.number().optional(),
  date: z.string().datetime().optional(),

})

export type GameFilterType = z.infer<typeof gameFilterSchema>

export type GameType = z.infer<typeof gameSchema>



export const studentQuerySchema = z.object({
  group: z.string().optional(),
  unity: z.string().optional()
  // codcur:z.coerce.number().optional(),
  // codper:z.coerce.number().optional()
})

export type StudentQueryType = z.infer<typeof studentQuerySchema>

export const teamSchema = z.object({
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number(),
  students:z.string().array()
})

export const teamQuerySchema = z.object({
  modalityId: z.coerce.number().optional()
})

export type TeamType = z.infer<typeof teamSchema>
export type teamQuerySchema = z.infer<typeof teamQuerySchema>

export const modalitySchema = z.object({
  name: z.string(),
  membersQuantity: z.coerce.number(),
  teamsQuantity: z.coerce.number()
})