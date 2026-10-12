import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/test/render'

describe('SignUpPage', () => {
  it('shows field errors when submitted empty', async () => {
    const { user } = renderRoute('/signup')

    await user.click(await screen.findByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Use at least 2 characters.')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(screen.getByText('Use at least 8 characters.')).toBeInTheDocument()
    expect(screen.getByLabelText('Display name')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows the check-your-email screen after a valid submission', async () => {
    const { user } = renderRoute('/signup')

    await user.type(await screen.findByLabelText('Display name'), 'Alex Rivera')
    await user.type(screen.getByLabelText('Email'), 'alex@example.edu')
    await user.click(screen.getByRole('radio', { name: /current student/i }))
    await user.type(screen.getByLabelText('Password'), 'correct-horse')
    await user.type(screen.getByLabelText('Confirm password'), 'correct-horse')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByRole('heading', { name: 'Check your email' })).toBeInTheDocument()
    expect(screen.getByText('alex@example.edu')).toBeInTheDocument()
  })
})
