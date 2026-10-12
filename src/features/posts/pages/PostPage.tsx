import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { AuthorMeta } from '@/components/shared/AuthorMeta'
import { DeleteButton } from '@/components/shared/DeleteButton'
import { Card, CardContent } from '@/components/ui/card'
import { CommentForm } from '@/features/comments/components/CommentForm'
import { CommentList } from '@/features/comments/components/CommentList'
import type { CreateCommentValues } from '@/features/comments/schemas'
import type { Comment } from '@/features/comments/types'
import { GroupNotFound } from '@/features/groups/components/GroupNotFound'
import { JoinPrompt } from '@/features/groups/components/JoinPrompt'
import { mockCurrentUser, mockJoinedGroupIds } from '@/mocks/data'
import { getCommentsForPost, getGroupById, getPostById } from '@/mocks/queries'

export function PostPage() {
  const { groupId = '', postId = '' } = useParams()
  return <PostDiscussion key={postId} groupId={groupId} postId={postId} />
}

function PostDiscussion({ groupId, postId }: { groupId: string; postId: string }) {
  const navigate = useNavigate()
  // TODO(M4): replace mock lookups and local state with Supabase-backed hooks.
  const group = getGroupById(groupId)
  const post = getPostById(postId)
  const [isMember, setIsMember] = useState(() => mockJoinedGroupIds.includes(groupId))
  const [comments, setComments] = useState<Comment[]>(() => getCommentsForPost(postId))

  if (!group) return <GroupNotFound />
  if (!post || post.groupId !== group.id) return <GroupNotFound title="Discussion not found" />

  const groupPath = `/groups/${group.id}`

  const backLink = (
    <Link
      to={groupPath}
      className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {group.university.name}
    </Link>
  )

  if (!isMember) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        {backLink}
        <JoinPrompt universityName={group.university.name} onJoin={() => setIsMember(true)} />
      </div>
    )
  }

  const deletePost = () => {
    toast.success('Post deleted', { description: 'Preview mode: sample posts aren’t actually removed.' })
    navigate(groupPath)
  }

  const addComment = (values: CreateCommentValues) => {
    const comment: Comment = {
      id: `preview-${crypto.randomUUID()}`,
      postId: post.id,
      author: {
        id: mockCurrentUser.id,
        displayName: mockCurrentUser.displayName,
        studentStatus: mockCurrentUser.studentStatus,
      },
      body: values.body,
      createdAt: new Date().toISOString(),
    }
    setComments((current) => [...current, comment])
    toast.success('Comment added to this preview', { description: 'It isn’t saved yet.' })
  }

  const deleteComment = (commentId: string) => {
    setComments((current) => current.filter((comment) => comment.id !== commentId))
    toast.success('Comment deleted')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {backLink}

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <AuthorMeta author={post.author} createdAt={post.createdAt} />
            {post.author.id === mockCurrentUser.id && (
              <DeleteButton
                itemLabel="post"
                description="This post and all of its comments will be permanently removed."
                onConfirm={deletePost}
              />
            )}
          </div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p className="leading-relaxed whitespace-pre-line">{post.body}</p>
        </CardContent>
      </Card>

      <section aria-labelledby="comments-heading" className="space-y-4">
        <h2 id="comments-heading" className="text-lg font-semibold">
          Comments ({comments.length})
        </h2>
        <CommentList comments={comments} currentUserId={mockCurrentUser.id} onDelete={deleteComment} />
        <Card>
          <CardContent>
            <CommentForm onSubmit={addComment} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
