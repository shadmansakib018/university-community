import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { UniversityEmblem } from '@/features/universities/components/UniversityEmblem'
import { formatUniversityLocation } from '@/features/universities/format'
import type { Group } from '../types'

/** Dashboard card for a joined group. The whole card is one link. */
export function GroupCard({ group }: { group: Group }) {
  const { university } = group
  return (
    <Card className="group/group-card relative transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
      <CardContent className="flex items-start gap-4">
        <UniversityEmblem name={university.name} />
        <div className="min-w-0 space-y-1">
          <h2 className="font-semibold leading-snug">
            <Link to={`/groups/${group.id}`} className="outline-none after:absolute after:inset-0">
              {university.name}
            </Link>
          </h2>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {formatUniversityLocation(university)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-between text-sm font-medium text-primary">
        Open community
        <ArrowRight className="size-4 transition-transform group-hover/group-card:translate-x-0.5" aria-hidden="true" />
      </CardFooter>
    </Card>
  )
}
