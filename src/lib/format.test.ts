import { describe, expect, it } from 'vitest'
import { formatRelativeTime, getInitials } from './format'

describe('formatRelativeTime', () => {
  const now = new Date('2026-10-12T12:00:00.000Z')

  it.each([
    ['2026-10-12T11:59:30.000Z', 'just now'],
    ['2026-10-12T11:55:00.000Z', '5 minutes ago'],
    ['2026-10-12T09:00:00.000Z', '3 hours ago'],
    ['2026-10-11T12:00:00.000Z', 'yesterday'],
    ['2026-09-28T12:00:00.000Z', '2 weeks ago'],
    ['2025-10-12T12:00:00.000Z', 'last year'],
  ])('formats %s as "%s"', (isoDate, expected) => {
    expect(formatRelativeTime(isoDate, now)).toBe(expected)
  })
})

describe('getInitials', () => {
  it.each([
    ['Alex Rivera', 'AR'],
    ['  priya   ', 'P'],
    ['Mary Jane Watson', 'MW'],
    ['', '?'],
  ])('returns initials for "%s"', (name, expected) => {
    expect(getInitials(name)).toBe(expected)
  })
})
