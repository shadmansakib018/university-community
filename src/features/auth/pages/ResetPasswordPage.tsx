import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { AuthCard } from '../components/AuthCard'
import { resetPasswordSchema, type ResetPasswordValues } from '../schemas'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  // TODO(M2): require a PASSWORD_RECOVERY session and call supabase.auth.updateUser.
  const onSubmit = () => {
    toast.success('Preview mode: password form validated. Nothing was changed.')
    navigate('/login')
  }

  return (
    <AuthCard title="Choose a new password" description="Use at least 8 characters.">
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormTextField control={form.control} name="password" label="New password" type="password" autoComplete="new-password" />
          <FormTextField control={form.control} name="confirmPassword" label="Confirm new password" type="password" autoComplete="new-password" />
          <Button type="submit" size="lg" className="h-10 w-full" disabled={form.formState.isSubmitting}>
            Update password
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}
