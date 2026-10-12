import type { PublicProfile } from '@/features/profile/types'
import { formatDate, formatRelativeTime } from '@/lib/format'
import { StudentStatusBadge } from './StudentStatusBadge'
import { UserAvatar } from './UserAvatar'

type AuthorMetaProps = {
  author: PublicProfile
  createdAt: string
  size?: 'sm' | 'md'
}

/** Avatar, display name, student status and relative timestamp for posts and comments. */
export function AuthorMeta({ author, createdAt, size = 'md' }: AuthorMetaProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserAvatar name={author.displayName} className={size === 'sm' ? 'size-8' : undefined} />
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="truncate font-medium">{author.displayName}</span>
        <StudentStatusBadge status={author.studentStatus} />
        <time dateTime={createdAt} title={formatDate(createdAt)} className="text-muted-foreground">
          {formatRelativeTime(createdAt)}
        </time>
      </div>
    </div>
  )
}
