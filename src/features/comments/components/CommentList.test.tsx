import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '@/test/render'
import type { Comment } from '../types'
import { CommentList } from './CommentList'

const comments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    author: { id: 'me', displayName: 'Alex Rivera', studentStatus: 'incoming' },
    body: 'My comment',
    createdAt: '2026-10-10T10:00:00.000Z',
  },
  {
    id: 'c2',
    postId: 'p1',
    author: { id: 'other', displayName: 'Priya Shah', studentStatus: 'current' },
    body: 'Someone else’s comment',
    createdAt: '2026-10-10T11:00:00.000Z',
  },
]

describe('CommentList', () => {
  it('shows an empty state when there are no comments', () => {
    renderWithRouter(<CommentList comments={[]} currentUserId="me" onDelete={vi.fn()} />)
    expect(screen.getByRole('heading', { name: 'No comments yet' })).toBeInTheDocument()
  })

  it('offers delete only on the current user’s own comments', () => {
    renderWithRouter(<CommentList comments={comments} currentUserId="me" onDelete={vi.fn()} />)
    expect(screen.getAllByRole('button', { name: /delete comment/i })).toHaveLength(1)
  })

  it('deletes after confirmation', async () => {
    const onDelete = vi.fn()
    const { user } = renderWithRouter(<CommentList comments={comments} currentUserId="me" onDelete={onDelete} />)

    await user.click(screen.getByRole('button', { name: /delete comment/i }))
    expect(onDelete).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Delete comment' }))

    expect(onDelete).toHaveBeenCalledWith('c1')
  })
})
