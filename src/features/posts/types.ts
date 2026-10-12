import type { PublicProfile } from '@/features/profile/types'

export type Post = {
  id: string
  groupId: string
  author: PublicProfile
  title: string
  body: string
  createdAt: string
  commentCount: number
}
