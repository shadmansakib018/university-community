import { cn } from '@/lib/utils'
import { getUniversityMonogram } from '../format'

type UniversityEmblemProps = {
  name: string
  size?: 'md' | 'lg'
}

/** Decorative monogram tile. The MVP has no university logos. */
export function UniversityEmblem({ name, size = 'md' }: UniversityEmblemProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl bg-accent font-semibold tracking-tight text-accent-foreground ring-1 ring-primary/10',
        size === 'md' ? 'size-11 text-sm' : 'size-14 text-base',
      )}
    >
      {getUniversityMonogram(name)}
    </span>
  )
}
