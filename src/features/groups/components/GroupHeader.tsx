import { MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { UniversityEmblem } from '@/features/universities/components/UniversityEmblem'
import { formatUniversityLocation } from '@/features/universities/format'
import type { Group } from '../types'

type GroupHeaderProps = {
  group: Group
  actions?: ReactNode
}

export function GroupHeader({ group, actions }: GroupHeaderProps) {
  const { university } = group
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <UniversityEmblem name={university.name} size="lg" />
        <div className="min-w-0 space-y-1">
          <h1 className="text-xl font-semibold sm:text-2xl">{university.name}</h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {formatUniversityLocation(university)} · Student community
          </p>
        </div>
      </div>
      {actions && <div className="sm:shrink-0">{actions}</div>}
    </div>
  )
}
