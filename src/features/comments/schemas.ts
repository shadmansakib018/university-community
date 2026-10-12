import { z } from 'zod'
import { LIMITS } from '@/lib/validation'

export const createCommentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(LIMITS.commentBody.min, 'Write a comment first.')
    .max(LIMITS.commentBody.max, `Use at most ${LIMITS.commentBody.max.toLocaleString()} characters.`),
})

export type CreateCommentValues = z.infer<typeof createCommentSchema>
