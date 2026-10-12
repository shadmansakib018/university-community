import { Badge } from '@/components/ui/badge'
import type { StudentStatus } from '@/features/profile/types'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<StudentStatus, { label: string; className: string }> = {
  incoming: { label: 'Incoming student', className: 'bg-sky-50 text-sky-800 ring-1 ring-sky-200' },
  current: { label: 'Current student', className: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200' },
}

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const { label, className } = STATUS_STYLES[status]
  return <Badge className={cn('font-medium', className)}>{label}</Badge>
}
