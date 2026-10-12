import { Compass, LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react'
import { NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { AppLogo } from '@/components/shared/AppLogo'
import { StudentStatusBadge } from '@/components/shared/StudentStatusBadge'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { mockCurrentUser } from '@/mocks/data'
import { PreviewBanner } from './PreviewBanner'
import { MAIN_CONTENT_ID } from './constants'
import { SkipLink } from './SkipLink'
import { SiteFooter } from './SiteFooter'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/discover', label: 'Discover', icon: Compass },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )

/** Shell for signed-in pages. M1: user data is mocked; M2 wires real auth. */
export function AppLayout() {
  const navigate = useNavigate()
  // TODO(M2): replace with the session user from AuthProvider.
  const user = mockCurrentUser

  const handleLogOut = () => {
    toast.info('Preview mode: there is no real session to end yet.')
    navigate('/')
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <PreviewBanner />
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <AppLogo to="/dashboard" />

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden h-10 gap-2 px-2 md:inline-flex" aria-label="Open account menu">
                  <UserAvatar name={user.displayName} className="size-8" />
                  <span className="max-w-32 truncate text-sm font-medium">{user.displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="space-y-1 font-normal">
                  <p className="truncate text-sm font-medium text-foreground">{user.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/settings')}>
                  <Settings aria-hidden="true" />
                  Profile &amp; settings
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogOut}>
                  <LogOut aria-hidden="true" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Open menu">
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.displayName} />
                    <div className="min-w-0 space-y-1">
                      <SheetTitle className="truncate">{user.displayName}</SheetTitle>
                      <SheetDescription className="truncate">{user.email}</SheetDescription>
                    </div>
                  </div>
                  <div className="pt-2">
                    <StudentStatusBadge status={user.studentStatus} />
                  </div>
                </SheetHeader>
                <nav aria-label="Main" className="flex flex-col gap-1 px-4">
                  {[...NAV_ITEMS, { to: '/settings', label: 'Profile & settings', icon: Settings }].map(
                    ({ to, label, icon: Icon }) => (
                      <SheetClose asChild key={to}>
                        <NavLink to={to} className={navLinkClass}>
                          <Icon className="size-4" aria-hidden="true" />
                          {label}
                        </NavLink>
                      </SheetClose>
                    ),
                  )}
                </nav>
                <div className="mt-auto border-t p-4">
                  <SheetClose asChild>
                    <Button variant="outline" size="lg" className="w-full" onClick={handleLogOut}>
                      <LogOut aria-hidden="true" />
                      Log out
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
