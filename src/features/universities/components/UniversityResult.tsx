import { MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { MembershipButton } from '@/features/groups/components/MembershipButton'
import { formatUniversityLocation } from '../format'
import type { University } from '../types'
import { UniversityEmblem } from './UniversityEmblem'

type UniversityResultProps = {
  university: University
  groupId: string
  isMember: boolean
  onJoin: () => void
  onLeave: () => void
}

export function UniversityResult({ university, groupId, isMember, onJoin, onLeave }: UniversityResultProps) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <UniversityEmblem name={university.name} />
          <div className="min-w-0">
            <h3 className="font-semibold leading-snug">
              {isMember ? (
                <Link to={`/groups/${groupId}`} className="rounded-sm outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
                  {university.name}
                </Link>
              ) : (
                university.name
              )}
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {formatUniversityLocation(university)}
            </p>
          </div>
        </div>
        <div className="sm:shrink-0">
          <MembershipButton
            isMember={isMember}
            universityName={university.name}
            onJoin={onJoin}
            onLeave={onLeave}
          />
        </div>
      </CardContent>
    </Card>
  )
}
