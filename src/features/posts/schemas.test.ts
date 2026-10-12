import { describe, expect, it } from 'vitest'
import { createCommentSchema } from '@/features/comments/schemas'
import { profileSchema } from '@/features/profile/schemas'
import { createPostSchema } from './schemas'

describe('createPostSchema', () => {
  it('accepts a valid post and trims whitespace', () => {
    const result = createPostSchema.safeParse({ title: '  Housing tips  ', body: ' Ask away ' })
    expect(result.success).toBe(true)
    expect(result.data).toEqual({ title: 'Housing tips', body: 'Ask away' })
  })

  it.each([
    ['title too short', { title: 'Hi', body: 'Body' }],
    ['title too long', { title: 'x'.repeat(151), body: 'Body' }],
    ['whitespace-only body', { title: 'Valid title', body: '    ' }],
    ['body too long', { title: 'Valid title', body: 'x'.repeat(5001) }],
  ])('rejects %s', (_case, input) => {
    expect(createPostSchema.safeParse(input).success).toBe(false)
  })

  it('never accepts an author id from the form', () => {
    const result = createPostSchema.safeParse({ title: 'Valid title', body: 'Body', authorId: 'someone-else' })
    expect(result.data).not.toHaveProperty('authorId')
  })
})

describe('createCommentSchema', () => {
  it('rejects empty and overly long comments', () => {
    expect(createCommentSchema.safeParse({ body: '   ' }).success).toBe(false)
    expect(createCommentSchema.safeParse({ body: 'x'.repeat(2001) }).success).toBe(false)
    expect(createCommentSchema.safeParse({ body: 'Thanks!' }).success).toBe(true)
  })
})

describe('profileSchema', () => {
  it('only allows the two self-reported student statuses', () => {
    expect(profileSchema.safeParse({ displayName: 'Alex', studentStatus: 'current' }).success).toBe(true)
    expect(profileSchema.safeParse({ displayName: 'Alex', studentStatus: 'faculty' }).success).toBe(false)
  })
})
