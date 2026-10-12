import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router'
import { APP_NAME } from '@/config/app'
import { cn } from '@/lib/utils'

type AppLogoProps = {
  to?: string
  className?: string
}

export function AppLogo({ to = '/', className }: AppLogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 rounded-md font-semibold tracking-tight text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg">{APP_NAME}</span>
    </Link>
  )
}
