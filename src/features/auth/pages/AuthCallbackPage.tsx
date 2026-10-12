import { CircleCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { AuthCard } from '../components/AuthCard'

/**
 * Landing page for the email-confirmation link.
 * TODO(M2): wait for supabase-js to establish the session, then redirect to /dashboard.
 */
export function AuthCallbackPage() {
  return (
    <AuthCard title="Email confirmed" description="Your account is ready. Welcome aboard!">
      <div className="flex flex-col items-center gap-6 py-2">
        <CircleCheck className="size-12 text-emerald-600" aria-hidden="true" />
        <Button asChild size="lg" className="h-10 w-full">
          <Link to="/dashboard">Go to your dashboard</Link>
        </Button>
      </div>
    </AuthCard>
  )
}
