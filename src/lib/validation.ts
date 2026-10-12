import { z } from 'zod'
import { STUDENT_STATUSES } from '@/features/profile/types'

/**
 * Field rules shared by every form. These mirror the database CHECK
 * constraints in docs/DATABASE.md; the database remains the source of truth.
 */
export const LIMITS = {
  displayName: { min: 2, max: 50 },
  password: { min: 8, max: 72 },
  postTitle: { min: 3, max: 150 },
  postBody: { min: 1, max: 5000 },
  commentBody: { min: 1, max: 2000 },
} as const

export const emailField = z
  .string()
  .trim()
  .min(1, 'Enter your email address.')
  .pipe(z.email('Enter a valid email address.'))

export const passwordField = z
  .string()
  .min(LIMITS.password.min, `Use at least ${LIMITS.password.min} characters.`)
  .max(LIMITS.password.max, `Use at most ${LIMITS.password.max} characters.`)

export const displayNameField = z
  .string()
  .trim()
  .min(LIMITS.displayName.min, `Use at least ${LIMITS.displayName.min} characters.`)
  .max(LIMITS.displayName.max, `Use at most ${LIMITS.displayName.max} characters.`)

export const studentStatusField = z.enum(STUDENT_STATUSES, {
  error: 'Choose your student status.',
})
