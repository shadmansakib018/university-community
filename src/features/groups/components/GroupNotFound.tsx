import { SearchX } from 'lucide-react'
import { Link } from 'react-router'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'

type GroupNotFoundProps = {
  title?: string
}

export function GroupNotFound({ title = 'Community not found' }: GroupNotFoundProps) {
  return (
    <EmptyState
      icon={SearchX}
      title={title}
      description="It may have been removed, or the link may be incorrect."
      action={
        <Button asChild size="lg" variant="outline">
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      }
    />
  )
}
