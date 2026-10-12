import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/format'
import { cn } from '@/lib/utils'

type UserAvatarProps = {
  name: string
  className?: string
}

/** Initials avatar. The MVP has no profile photos. */
export function UserAvatar({ name, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('size-9', className)}>
      <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
