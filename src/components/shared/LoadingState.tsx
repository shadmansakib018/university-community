import { Skeleton } from '@/components/ui/skeleton'

type LoadingStateProps = {
  /** Screen-reader text announced while content loads. */
  label?: string
  /** Number of placeholder rows to show. */
  rows?: number
}

export function LoadingState({ label = 'Loading…', rows = 3 }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} aria-hidden="true" className="space-y-2 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  )
}
