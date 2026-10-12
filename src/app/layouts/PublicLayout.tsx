import { Link, Outlet, ScrollRestoration } from 'react-router'
import { AppLogo } from '@/components/shared/AppLogo'
import { Button } from '@/components/ui/button'
import { MAIN_CONTENT_ID } from './constants'
import { SkipLink } from './SkipLink'
import { SiteFooter } from './SiteFooter'

/** Shell for signed-out pages: landing, auth forms and 404. */
export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <AppLogo />
          <nav aria-label="Account" className="flex items-center gap-2">
            <Button asChild variant="ghost" size="lg">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main id={MAIN_CONTENT_ID} className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
