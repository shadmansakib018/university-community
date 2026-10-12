import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type AuthCardProps = {
  title: string
  description?: ReactNode
  children: ReactNode
  /** Secondary links shown under the form, e.g. "Already have an account?" */
  footer?: ReactNode
}

/** Centered card used by every authentication page. */
export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex flex-1 items-start justify-center bg-linear-to-b from-accent/50 to-background px-4 py-12 sm:items-center sm:py-16">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="gap-2">
          <CardTitle>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </CardTitle>
          {description && <CardDescription className="text-base">{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="justify-center py-4 text-center text-sm text-muted-foreground">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
