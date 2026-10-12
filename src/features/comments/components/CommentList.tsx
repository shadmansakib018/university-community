import { MessageCircle } from 'lucide-react'
import { AuthorMeta } from '@/components/shared/AuthorMeta'
import { DeleteButton } from '@/components/shared/DeleteButton'
import { EmptyState } from '@/components/shared/EmptyState'
import type { Comment } from '../types'

type CommentListProps = {
  comments: Comment[]
  currentUserId: string
  onDelete: (commentId: string) => void
}

/** Flat comment thread, oldest first. */
export function CommentList({ comments, currentUserId, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="No comments yet"
        description="Be the first to reply to this discussion."
      />
    )
  }

  return (
    <ul className="divide-y rounded-xl bg-card ring-1 ring-foreground/10">
      {comments.map((comment) => (
        <li key={comment.id} className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <AuthorMeta author={comment.author} createdAt={comment.createdAt} size="sm" />
            {comment.author.id === currentUserId && (
              <DeleteButton
                itemLabel="comment"
                description="This comment will be permanently removed."
                onConfirm={() => onDelete(comment.id)}
              />
            )}
          </div>
          <p className="pl-11 whitespace-pre-line">{comment.body}</p>
        </li>
      ))}
    </ul>
  )
}
