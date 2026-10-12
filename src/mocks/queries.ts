/**
 * ⚠️ MOCK QUERIES — Milestone 1 only.
 *
 * Synchronous lookups over `./data`. Pages call these now. In Milestones 3–4
 * they are replaced by `features/<name>/api.ts` + hooks backed by Supabase.
 */
import type { Comment } from '@/features/comments/types'
import type { Group } from '@/features/groups/types'
import type { Post } from '@/features/posts/types'
import { mockComments, mockGroups, mockJoinedGroupIds, mockPosts } from './data'

const byNewest = (a: { createdAt: string }, b: { createdAt: string }) =>
  b.createdAt.localeCompare(a.createdAt)

export function getJoinedGroups(): Group[] {
  return mockGroups.filter((group) => mockJoinedGroupIds.includes(group.id))
}

export function getGroupById(groupId: string): Group | undefined {
  return mockGroups.find((group) => group.id === groupId)
}

export function getGroupByUniversityId(universityId: number): Group | undefined {
  return mockGroups.find((group) => group.university.id === universityId)
}

export function getPostsForGroup(groupId: string): Post[] {
  return mockPosts.filter((post) => post.groupId === groupId).sort(byNewest)
}

export function getPostById(postId: string): Post | undefined {
  return mockPosts.find((post) => post.id === postId)
}

export function getCommentsForPost(postId: string): Comment[] {
  return mockComments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}
