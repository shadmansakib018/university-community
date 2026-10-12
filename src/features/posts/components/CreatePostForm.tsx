import { zodResolver } from '@hookform/resolvers/zod'
import { PenSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'
import { LIMITS } from '@/lib/validation'
import { createPostSchema, type CreatePostValues } from '../schemas'

type CreatePostFormProps = {
  onSubmit: (values: CreatePostValues) => void
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '' },
  })

  const handleValid = (values: CreatePostValues) => {
    onSubmit(values)
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <PenSquare className="size-4 text-primary" aria-hidden="true" />
            Start a discussion
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(handleValid)}>
          <FieldGroup className="gap-4">
            <FormTextField control={form.control} name="title" label="Title" placeholder="What do you want to ask or share?" />
            <FormTextField
              control={form.control}
              name="body"
              label="Details"
              multiline
              rows={4}
              placeholder="Add context so others can help."
              description={`Up to ${LIMITS.postBody.max.toLocaleString()} characters.`}
            />
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                Post
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
