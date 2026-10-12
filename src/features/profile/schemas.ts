import { z } from 'zod'
import { displayNameField, studentStatusField } from '@/lib/validation'

export const profileSchema = z.object({
  displayName: displayNameField,
  studentStatus: studentStatusField,
})

export type ProfileValues = z.infer<typeof profileSchema>
