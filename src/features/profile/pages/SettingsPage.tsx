import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { StudentStatusBadge } from '@/components/shared/StudentStatusBadge'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/format'
import { mockCurrentUser } from '@/mocks/data'
import { ProfileForm } from '../components/ProfileForm'

export function SettingsPage() {
  const navigate = useNavigate()
  // TODO(M2): read the profile from AuthProvider and save via Supabase.
  const user = mockCurrentUser

  const handleSave = () => {
    toast.success('Profile updated', { description: 'Preview mode: changes aren’t saved yet.' })
  }

  const handleLogOut = () => {
    toast.info('Preview mode: there is no real session to end yet.')
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader title="Profile & settings" description="Manage how other students see you." />

      <Card>
        <CardContent className="flex items-center gap-4">
          <UserAvatar name={user.displayName} className="size-14 text-base" />
          <div className="min-w-0 space-y-1">
            <p className="truncate text-lg font-semibold">{user.displayName}</p>
            <StudentStatusBadge status={user.studentStatus} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">Public profile</h2>
          </CardTitle>
          <CardDescription>Only your display name and student status are shown to others.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            defaultValues={{ displayName: user.displayName, studentStatus: user.studentStatus }}
            onSubmit={handleSave}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">Account</h2>
          </CardTitle>
          <CardDescription>Private. Never shown to other students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium break-all">{user.email}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-muted-foreground">Member since</dt>
              <dd className="font-medium">{formatDate(user.createdAt)}</dd>
            </div>
          </dl>
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Signed in on this device.</p>
            <Button variant="outline" size="lg" onClick={handleLogOut}>
              <LogOut aria-hidden="true" />
              Log out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
