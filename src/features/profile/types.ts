export const STUDENT_STATUSES = ['incoming', 'current'] as const

export type StudentStatus = (typeof STUDENT_STATUSES)[number]

/** Public profile fields — the only data other users can see. */
export type PublicProfile = {
  id: string
  displayName: string
  studentStatus: StudentStatus
}

/** The signed-in user's own account view. Email comes from the auth session, never from `profiles`. */
export type CurrentUser = PublicProfile & {
  email: string
  createdAt: string
}
