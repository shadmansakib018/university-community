import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from './ConfirmDialog'

type DeleteButtonProps = {
  /** What is being deleted, e.g. "post" or "comment". */
  itemLabel: string
  description: string
  onConfirm: () => void
}

/** Author-only delete action with a confirmation step. */
export function DeleteButton({ itemLabel, description, onConfirm }: DeleteButtonProps) {
  return (
    <ConfirmDialog
      trigger={
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
          aria-label={`Delete ${itemLabel}`}
        >
          <Trash2 aria-hidden="true" />
          Delete
        </Button>
      }
      title={`Delete this ${itemLabel}?`}
      description={description}
      confirmLabel={`Delete ${itemLabel}`}
      onConfirm={onConfirm}
      destructive
    />
  )
}
