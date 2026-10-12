import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { AuthCard } from '../components/AuthCard'
import { TextLink } from '../components/TextLink'
import { logInSchema, type LogInValues } from '../schemas'

export function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  // TODO(M2): call supabase.auth.signInWithPassword and honor ?redirectTo.
  const onSubmit = () => {
    toast.info('Preview mode: signed in with sample data.')
    navigate('/dashboard')
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Log in to catch up with your university communities."
      footer={
        <span>
          New here? <TextLink to="/signup">Create an account</TextLink>
        </span>
      }
    >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormTextField control={form.control} name="email" label="Email" type="email" autoComplete="email" />
          <FormTextField control={form.control} name="password" label="Password" type="password" autoComplete="current-password" />
          <div className="-mt-2 text-right text-sm">
            <TextLink to="/forgot-password">Forgot your password?</TextLink>
          </div>
          <Button type="submit" size="lg" className="h-10 w-full" disabled={form.formState.isSubmitting}>
            Log in
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}
