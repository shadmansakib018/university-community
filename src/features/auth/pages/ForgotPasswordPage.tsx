import { zodResolver } from '@hookform/resolvers/zod'
import { MailCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/shared/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { AuthCard } from '../components/AuthCard'
import { TextLink } from '../components/TextLink'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../schemas'

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  // TODO(M2): call supabase.auth.resetPasswordForEmail.
  const onSubmit = () => setIsSent(true)

  const footer = (
    <span>
      Remembered it? <TextLink to="/login">Back to log in</TextLink>
    </span>
  )

  if (isSent) {
    return (
      <AuthCard title="Check your email" footer={footer}>
        {/* Same message whether or not the account exists, to avoid account enumeration. */}
        <div className="flex items-start gap-3 rounded-lg bg-accent p-4 text-sm text-accent-foreground">
          <MailCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>
            If an account exists for that email, you’ll receive a link to reset your password.
            (Preview mode: no email was sent.)
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your account email and we’ll send you a reset link."
      footer={footer}
    >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormTextField control={form.control} name="email" label="Email" type="email" autoComplete="email" />
          <Button type="submit" size="lg" className="h-10 w-full" disabled={form.formState.isSubmitting}>
            Send reset link
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}
