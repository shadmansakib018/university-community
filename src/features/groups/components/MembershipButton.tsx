import { Check, LogOut, Plus } from 'lucide-react'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { Button } from '@/components/ui/button'

type MembershipButtonProps = {
  isMember: boolean
  universityName: string
  onJoin: () => void
  onLeave: () => void
}

/** Join button for non-members; "Leave" (with confirmation) for members. */
export function MembershipButton({ isMember, universityName, onJoin, onLeave }: MembershipButtonProps) {
  if (!isMember) {
    return (
      <Button size="lg" onClick={onJoin} aria-label={`Join ${universityName}`}>
        <Plus aria-hidden="true" />
        Join
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
        <Check className="size-4" aria-hidden="true" />
        Joined
      </span>
      <ConfirmDialog
        trigger={
          <Button variant="outline" size="lg" aria-label={`Leave ${universityName}`}>
            <LogOut aria-hidden="true" />
            Leave
          </Button>
        }
        title={`Leave ${universityName}?`}
        description="You’ll lose access to this community’s discussions. Your existing posts stay visible to members. You can rejoin anytime."
        confirmLabel="Leave community"
        onConfirm={onLeave}
        destructive
      />
    </div>
  )
}
