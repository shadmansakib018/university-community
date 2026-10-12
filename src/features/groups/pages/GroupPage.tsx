import { MessagesSquare } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { CreatePostForm } from '@/features/posts/components/CreatePostForm'
import { PostCard } from '@/features/posts/components/PostCard'
import type { CreatePostValues } from '@/features/posts/schemas'
import type { Post } from '@/features/posts/types'
import { mockCurrentUser, mockJoinedGroupIds } from '@/mocks/data'
import { getGroupById, getPostsForGroup } from '@/mocks/queries'
import { GroupHeader } from '../components/GroupHeader'
import { GroupNotFound } from '../components/GroupNotFound'
import { JoinPrompt } from '../components/JoinPrompt'
import { MembershipButton } from '../components/MembershipButton'

export function GroupPage() {
  const { groupId = '' } = useParams()
  // The key resets local preview state when navigating between groups.
  return <GroupFeed key={groupId} groupId={groupId} />
}

function GroupFeed({ groupId }: { groupId: string }) {
  // TODO(M3/M4): replace mock lookups and local state with Supabase-backed hooks.
  const group = getGroupById(groupId)
  const [isMember, setIsMember] = useState(() => mockJoinedGroupIds.includes(groupId))
  const [previewPosts, setPreviewPosts] = useState<Post[]>([])

  if (!group) return <GroupNotFound />

  const universityName = group.university.name
  const posts = [...previewPosts, ...getPostsForGroup(groupId)]
  const previewPostIds = new Set(previewPosts.map((post) => post.id))

  const join = () => {
    setIsMember(true)
    toast.success(`Joined ${universityName}`, { description: 'Preview mode: membership isn’t saved yet.' })
  }

  const leave = () => {
    setIsMember(false)
    toast.success(`Left ${universityName}`)
  }

  const createPost = (values: CreatePostValues) => {
    const post: Post = {
      id: `preview-${crypto.randomUUID()}`,
      groupId,
      author: {
        id: mockCurrentUser.id,
        displayName: mockCurrentUser.displayName,
        studentStatus: mockCurrentUser.studentStatus,
      },
      title: values.title,
      body: values.body,
      createdAt: new Date().toISOString(),
      commentCount: 0,
    }
    setPreviewPosts((current) => [post, ...current])
    toast.success('Post added to this preview', { description: 'It isn’t saved and will disappear on refresh.' })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <GroupHeader
        group={group}
        actions={
          <MembershipButton isMember={isMember} universityName={universityName} onJoin={join} onLeave={leave} />
        }
      />

      {!isMember ? (
        <JoinPrompt universityName={universityName} onJoin={join} />
      ) : (
        <>
          <CreatePostForm onSubmit={createPost} />

          <section aria-labelledby="feed-heading" className="space-y-4">
            <h2 id="feed-heading" className="text-sm font-medium text-muted-foreground">
              Latest discussions
            </h2>
            {posts.length === 0 ? (
              <EmptyState
                icon={MessagesSquare}
                title="No discussions yet"
                description="Start the first conversation in this community using the form above."
              />
            ) : (
              <ul className="space-y-3">
                {posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} linkable={!previewPostIds.has(post.id)} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}
