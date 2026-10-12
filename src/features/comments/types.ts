import type { PublicProfile } from '@/features/profile/types'

export type Comment = {
  id: string
  postId: string
  author: PublicProfile
  body: string
  createdAt: string
}
