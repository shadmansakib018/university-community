import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { profileSchema, type ProfileValues } from '../schemas'
import { StudentStatusField } from './StudentStatusField'

type ProfileFormProps = {
  defaultValues: ProfileValues
  onSubmit: (values: ProfileValues) => void
}

export function ProfileForm({ defaultValues, onSubmit }: ProfileFormProps) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  const handleValid = (values: ProfileValues) => {
    onSubmit(values)
    form.reset(values)
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(handleValid)}>
      <FieldGroup>
        <FormTextField
          control={form.control}
          name="displayName"
          label="Display name"
          autoComplete="nickname"
          description="Visible to other students next to your posts and comments."
        />
        <StudentStatusField control={form.control} name="studentStatus" />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={!form.formState.isDirty}
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
            Save changes
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
