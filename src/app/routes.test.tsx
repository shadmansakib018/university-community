import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/test/render'

describe('app routes', () => {
  it.each([
    ['/', /meet your university community/i],
    ['/signup', 'Create your account'],
    ['/login', 'Welcome back'],
    ['/forgot-password', 'Reset your password'],
    ['/reset-password', 'Choose a new password'],
    ['/auth/callback', 'Email confirmed'],
    ['/dashboard', /welcome back, alex/i],
    ['/discover', 'Discover universities'],
    ['/groups/group-1', 'University of Michigan-Ann Arbor'],
    ['/groups/group-1/posts/post-1', 'Ask me anything about North Campus housing'],
    ['/settings', 'Profile & settings'],
    ['/no-such-page', 'Page not found'],
  ])('renders %s', async (path, heading) => {
    renderRoute(path)
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('shows a not-found state for an unknown group', async () => {
    renderRoute('/groups/does-not-exist')
    expect(await screen.findByRole('heading', { name: 'Community not found' })).toBeInTheDocument()
  })

  it('shows a join prompt instead of posts to non-members', async () => {
    renderRoute('/groups/group-4')
    expect(await screen.findByRole('heading', { name: 'Join to see the discussion' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Latest discussions' })).not.toBeInTheDocument()
  })

  it('navigates from the dashboard into a group', async () => {
    const { user } = renderRoute('/dashboard')
    const groups = await screen.findByRole('list')
    await user.click(within(groups).getByRole('link', { name: 'Georgia Institute of Technology' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Georgia Institute of Technology' })).toBeInTheDocument()
  })
})
