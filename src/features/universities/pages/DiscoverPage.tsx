import { Search, SearchX } from 'lucide-react'
import { useId, useState } from 'react'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockGroups, mockJoinedGroupIds } from '@/mocks/data'
import { UniversityResult } from '../components/UniversityResult'
import { MIN_SEARCH_LENGTH, matchesUniversityName, normalizeSearchTerm } from '../search'

export function DiscoverPage() {
  const searchId = useId()
  const [term, setTerm] = useState('')
  // TODO(M3): replace with Supabase search + real join/leave. M1 keeps membership in local state only.
  const [joinedGroupIds, setJoinedGroupIds] = useState<Set<string>>(() => new Set(mockJoinedGroupIds))

  const normalizedTerm = normalizeSearchTerm(term)
  const isSearching = normalizedTerm.length >= MIN_SEARCH_LENGTH
  const results = isSearching
    ? mockGroups.filter((group) => matchesUniversityName(group.university, normalizedTerm))
    : mockGroups

  const join = (groupId: string, name: string) => {
    setJoinedGroupIds((current) => new Set(current).add(groupId))
    toast.success(`Joined ${name}`, { description: 'Preview mode: membership isn’t saved yet.' })
  }

  const leave = (groupId: string, name: string) => {
    setJoinedGroupIds((current) => {
      const next = new Set(current)
      next.delete(groupId)
      return next
    })
    toast.success(`Left ${name}`)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Discover universities"
        description="Search for a US university and join its student community."
      />

      <div className="space-y-2">
        <Label htmlFor={searchId} className="sr-only">
          Search universities by name
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id={searchId}
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search by university name, e.g. Michigan"
            maxLength={100}
            autoComplete="off"
            className="h-12 rounded-xl bg-card pl-11 text-base"
          />
        </div>
        {normalizedTerm.length > 0 && !isSearching && (
          <p className="text-sm text-muted-foreground">Type at least {MIN_SEARCH_LENGTH} characters to search.</p>
        )}
      </div>

      <section aria-labelledby="results-heading" className="space-y-4">
        <h2 id="results-heading" className="text-sm font-medium text-muted-foreground" aria-live="polite">
          {isSearching
            ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${normalizedTerm}”`
            : 'Featured universities'}
        </h2>

        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No universities found"
            description="Check the spelling or try a shorter part of the name."
          />
        ) : (
          <ul className="space-y-3">
            {results.map((group) => (
              <li key={group.id}>
                <UniversityResult
                  university={group.university}
                  groupId={group.id}
                  isMember={joinedGroupIds.has(group.id)}
                  onJoin={() => join(group.id, group.university.name)}
                  onLeave={() => leave(group.id, group.university.name)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
