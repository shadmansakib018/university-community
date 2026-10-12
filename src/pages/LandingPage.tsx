import { ArrowRight, MessagesSquare, Search, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME, APP_TAGLINE } from '@/config/app'

const FEATURES = [
  {
    icon: Search,
    title: 'Find your university',
    description: 'Search thousands of US colleges and universities and join their student community in one click.',
  },
  {
    icon: MessagesSquare,
    title: 'Ask and answer',
    description: 'Incoming students ask about housing, classes and campus life. Current students share what they wish they had known.',
  },
  {
    icon: ShieldCheck,
    title: 'Members-only discussions',
    description: 'Each community is visible only to its members, so conversations stay focused and relevant.',
  },
] as const

const STEPS = [
  { title: 'Create your account', description: 'Sign up with your email and tell us whether you’re incoming or current.' },
  { title: 'Join your communities', description: 'Find the universities you’re considering or attending and join their groups.' },
  { title: 'Start the conversation', description: 'Post questions, share advice and reply to fellow students.' },
] as const

export function LandingPage() {
  return (
    <>
      <section className="border-b bg-linear-to-b from-accent/70 to-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-sm font-medium text-accent-foreground ring-1 ring-primary/15">
              <Users className="size-4" aria-hidden="true" />
              For incoming and current students
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">{APP_TAGLINE}</h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              {APP_NAME} connects students heading to a US university with the people already there.
              Get real answers about classes, housing and campus life from your future classmates.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-5 text-base">
                <Link to="/signup">
                  Get started. It’s free
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5 text-base">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="features-heading" className="text-center text-2xl font-semibold sm:text-3xl">
          Everything you need to feel at home before you arrive
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="steps-heading" className="text-center text-2xl font-semibold sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map(({ title, description }, index) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">Your future classmates are already talking.</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Join {APP_NAME} and find your community today.
        </p>
        <Button asChild size="lg" className="mt-8 h-11 px-5 text-base">
          <Link to="/signup">Create your free account</Link>
        </Button>
      </section>
    </>
  )
}

/** Static illustration of a group feed. Decorative only. */
function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-2xl bg-card p-5 shadow-xl ring-1 ring-foreground/10">
        <div className="flex items-center gap-3 border-b pb-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">
            UM
          </span>
          <div>
            <p className="font-semibold">University of Michigan</p>
            <p className="text-sm text-muted-foreground">Ann Arbor, MI</p>
          </div>
        </div>
        <div className="space-y-3 pt-4">
          {[
            { name: 'Sofia', tag: 'Incoming', text: 'Which dorm has the best dining hall nearby?' },
            { name: 'Priya', tag: 'Current', text: 'Bursley has its own dining hall. Big plus in winter!' },
            { name: 'Marcus', tag: 'Current', text: 'Get a real parka before November.' },
          ].map(({ name, tag, text }) => (
            <div key={name} className="rounded-xl bg-muted/60 p-3">
              <p className="text-sm">
                <span className="font-semibold">{name}</span>{' '}
                <span className="text-xs text-muted-foreground">· {tag} student</span>
              </p>
              <p className="mt-1 text-sm text-foreground/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
