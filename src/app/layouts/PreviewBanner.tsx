import { FlaskConical } from 'lucide-react'

/** Milestone 1 notice: every signed-in page shows sample data. Remove in M4. */
export function PreviewBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-900">
      <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-xs sm:px-6 sm:text-sm">
        <FlaskConical className="size-4 shrink-0" aria-hidden="true" />
        <span>
          <strong className="font-semibold">Preview mode:</strong> you’re seeing sample data. Changes
          aren’t saved yet.
        </span>
      </p>
    </div>
  )
}
