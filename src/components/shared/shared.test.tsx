import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { School } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from './ConfirmDialog'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { StudentStatusBadge } from './StudentStatusBadge'

describe('LoadingState', () => {
  it('announces loading to assistive technology', () => {
    render(<LoadingState label="Loading posts…" />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading posts…')
  })
})

describe('EmptyState', () => {
  it('renders the title, description and action', () => {
    render(
      <EmptyState
        icon={School}
        title="No communities yet"
        description="Join one to get started."
        action={<Button>Discover</Button>}
      />,
    )
    expect(screen.getByRole('heading', { name: 'No communities yet' })).toBeInTheDocument()
    expect(screen.getByText('Join one to get started.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Discover' })).toBeInTheDocument()
  })
})

describe('ErrorState', () => {
  it('shows an alert and calls onRetry', async () => {
    const onRetry = vi.fn()
    render(<ErrorState message="Network error" onRetry={onRetry} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Network error')
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('hides the retry button when no handler is given', () => {
    render(<ErrorState />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

describe('ConfirmDialog', () => {
  function renderDialog(onConfirm = vi.fn()) {
    render(
      <ConfirmDialog
        trigger={<Button>Delete post</Button>}
        title="Delete this post?"
        description="This cannot be undone."
        confirmLabel="Delete"
        onConfirm={onConfirm}
        destructive
      />,
    )
    return onConfirm
  }

  it('does not run the action until the user confirms', async () => {
    const user = userEvent.setup()
    const onConfirm = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Delete post' }))
    expect(screen.getByRole('alertdialog', { name: 'Delete this post?' })).toBeInTheDocument()
    expect(onConfirm).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('cancelling closes the dialog without running the action', async () => {
    const user = userEvent.setup()
    const onConfirm = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Delete post' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(onConfirm).not.toHaveBeenCalled()
  })
})

describe('StudentStatusBadge', () => {
  it.each([
    ['incoming', 'Incoming student'],
    ['current', 'Current student'],
  ] as const)('labels %s students', (status, label) => {
    render(<StudentStatusBadge status={status} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
