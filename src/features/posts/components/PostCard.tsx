import { MessageSquare } from 'lucide-react'
import { Link } from 'react-router'
import { AuthorMeta } from '@/components/shared/AuthorMeta'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Post } from '../types'

type PostCardProps = {
  post: Post
  /** False for preview-only posts that have no detail page yet. */
  linkable?: boolean
}

export function PostCard({ post, linkable = true }: PostCardProps) {
  const commentLabel = `${post.commentCount} ${post.commentCount === 1 ? 'comment' : 'comments'}`

  return (
    <Card className="relative transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
      <CardContent className="space-y-3">
        <AuthorMeta author={post.author} createdAt={post.createdAt} />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-snug">
            {linkable ? (
              <Link to={`/groups/${post.groupId}/posts/${post.id}`} className="outline-none after:absolute after:inset-0">
                {post.title}
              </Link>
            ) : (
              post.title
            )}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">{post.body}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="size-4" aria-hidden="true" />
            {commentLabel}
          </span>
          {!linkable && <Badge variant="outline">Preview: not saved</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
