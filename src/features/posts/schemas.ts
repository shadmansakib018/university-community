import { z } from 'zod'
import { LIMITS } from '@/lib/validation'

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(LIMITS.postTitle.min, `Use at least ${LIMITS.postTitle.min} characters.`)
    .max(LIMITS.postTitle.max, `Use at most ${LIMITS.postTitle.max} characters.`),
  body: z
    .string()
    .trim()
    .min(LIMITS.postBody.min, 'Write something before posting.')
    .max(LIMITS.postBody.max, `Use at most ${LIMITS.postBody.max.toLocaleString()} characters.`),
})

export type CreatePostValues = z.infer<typeof createPostSchema>
