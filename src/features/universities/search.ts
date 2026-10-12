import type { University } from './types'

export const MIN_SEARCH_LENGTH = 2

/** Trims and collapses whitespace so "  ann   arbor " → "ann arbor". */
export function normalizeSearchTerm(term: string): string {
  return term.trim().replace(/\s+/g, ' ')
}

/** Case-insensitive substring match on the university name. */
export function matchesUniversityName(university: University, term: string): boolean {
  const needle = normalizeSearchTerm(term).toLowerCase()
  return university.name.toLowerCase().includes(needle)
}
