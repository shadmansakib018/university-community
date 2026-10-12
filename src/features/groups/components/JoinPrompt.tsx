import { Lock, Plus } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'

type JoinPromptProps = {
  universityName: string
  onJoin: () => void
}

/** Shown to non-members instead of the feed. */
export function JoinPrompt({ universityName, onJoin }: JoinPromptProps) {
  return (
    <EmptyState
      icon={Lock}
      title="Join to see the discussion"
      description={`Posts and comments in the ${universityName} community are visible to members only.`}
      action={
        <Button size="lg" onClick={onJoin}>
          <Plus aria-hidden="true" />
          Join community
        </Button>
      }
    />
  )
}
