import { APP_NAME } from '@/config/app'

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Built for students, by students.
        </p>
        <p>A university software engineering project.</p>
      </div>
    </footer>
  )
}
