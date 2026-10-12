import { zodResolver } from '@hookform/resolvers/zod'
import { MailCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { StudentStatusField } from '@/features/profile/components/StudentStatusField'
import { AuthCard } from '../components/AuthCard'
import { TextLink } from '../components/TextLink'
import { signUpSchema, type SignUpValues } from '../schemas'

export function SignUpPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      studentStatus: 'incoming',
      password: '',
      confirmPassword: '',
    },
  })

  // TODO(M2): call supabase.auth.signUp. M1 only validates the form.
  const onSubmit = (values: SignUpValues) => setSubmittedEmail(values.email)

  if (submittedEmail) {
    return (
      <AuthCard
        title="Check your email"
        description={
          <>
            We sent a confirmation link to <strong className="text-foreground">{submittedEmail}</strong>.
            Open it to activate your account.
          </>
        }
        footer={
          <span>
            Already confirmed? <TextLink to="/login">Log in</TextLink>
          </span>
        }
      >
        <div className="flex items-start gap-3 rounded-lg bg-accent p-4 text-sm text-accent-foreground">
          <MailCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>
            Preview mode: no email was sent and no account was created. Real sign-up arrives in the
            next milestone.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Create your account"
      description="Join the communities for the universities you’re attending or considering."
      footer={
        <span>
          Already have an account? <TextLink to="/login">Log in</TextLink>
        </span>
      }
    >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormTextField control={form.control} name="displayName" label="Display name" autoComplete="nickname" description="Shown to other students next to your posts." />
          <FormTextField control={form.control} name="email" label="Email" type="email" autoComplete="email" />
          <StudentStatusField control={form.control} name="studentStatus" />
          <FormTextField control={form.control} name="password" label="Password" type="password" autoComplete="new-password" description="At least 8 characters." />
          <FormTextField control={form.control} name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" />
          <Button type="submit" size="lg" className="h-10 w-full" disabled={form.formState.isSubmitting}>
            Create account
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}
