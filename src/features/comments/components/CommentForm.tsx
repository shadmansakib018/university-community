import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { createCommentSchema, type CreateCommentValues } from '../schemas'

type CommentFormProps = {
  onSubmit: (values: CreateCommentValues) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const form = useForm<CreateCommentValues>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { body: '' },
  })

  const handleValid = (values: CreateCommentValues) => {
    onSubmit(values)
    form.reset()
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(handleValid)} className="space-y-3">
      <FormTextField
        control={form.control}
        name="body"
        label="Add a comment"
        hideLabel
        multiline
        rows={3}
        placeholder="Share your answer or experience…"
      />
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          Comment
        </Button>
      </div>
    </form>
  )
}
