import { describe, expect, it } from 'vitest'
import { formatUniversityLocation, getUniversityMonogram } from './format'
import { matchesUniversityName, normalizeSearchTerm } from './search'

const michigan = { id: 1, name: 'University of Michigan-Ann Arbor', city: 'Ann Arbor', state: 'MI' }

describe('normalizeSearchTerm', () => {
  it('trims and collapses whitespace', () => {
    expect(normalizeSearchTerm('  ann    arbor ')).toBe('ann arbor')
  })
})

describe('matchesUniversityName', () => {
  it('matches case-insensitively on the name', () => {
    expect(matchesUniversityName(michigan, 'MICHIGAN')).toBe(true)
    expect(matchesUniversityName(michigan, '  ann   arbor ')).toBe(true)
  })

  it('does not match on unrelated terms', () => {
    expect(matchesUniversityName(michigan, 'Stanford')).toBe(false)
  })
})

describe('getUniversityMonogram', () => {
  it.each([
    ['New York University', 'NYU'],
    ['The University of Texas at Austin', 'UTA'],
    ['Boston University', 'BU'],
    ['Purdue University-Main Campus', 'PU'],
    ['University of Michigan-Ann Arbor', 'UM'],
  ])('builds a monogram for %s', (name, expected) => {
    expect(getUniversityMonogram(name)).toBe(expected)
  })
})

describe('formatUniversityLocation', () => {
  it('formats city and state', () => {
    expect(formatUniversityLocation(michigan)).toBe('Ann Arbor, MI')
  })
})
