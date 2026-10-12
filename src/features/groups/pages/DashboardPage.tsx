import { Compass, School } from 'lucide-react'
import { Link } from 'react-router'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { mockCurrentUser } from '@/mocks/data'
import { getJoinedGroups } from '@/mocks/queries'
import { GroupCard } from '../components/GroupCard'

export function DashboardPage() {
  // TODO(M3): replace mock lookups with useMyGroups() backed by Supabase.
  const groups = getJoinedGroups()
  const firstName = mockCurrentUser.displayName.split(' ')[0]

  const discoverButton = (
    <Button asChild size="lg">
      <Link to="/discover">
        <Compass aria-hidden="true" />
        Discover universities
      </Link>
    </Button>
  )

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Your university communities, all in one place."
        actions={groups.length > 0 ? discoverButton : undefined}
      />

      {groups.length === 0 ? (
        <EmptyState
          icon={School}
          title="You haven’t joined any communities yet"
          description="Find the universities you’re attending or considering and join their student communities."
          action={discoverButton}
        />
      ) : (
        <section aria-labelledby="my-communities-heading" className="space-y-4">
          <h2 id="my-communities-heading" className="text-sm font-medium text-muted-foreground">
            My communities ({groups.length})
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <li key={group.id}>
                <GroupCard group={group} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
