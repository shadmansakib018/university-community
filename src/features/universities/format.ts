import type { University } from './types'

const IGNORED_WORDS = new Set(['of', 'the', 'at', 'and', 'in', 'main', 'campus'])

/**
 * Short monogram for a university emblem, built from the significant words
 * before any campus suffix: "New York University" → "NYU",
 * "University of Michigan-Ann Arbor" → "UM".
 */
export function getUniversityMonogram(name: string): string {
  const [baseName] = name.split('-')
  const letters = baseName
    .split(/\s+/)
    .filter((word) => word.length > 0 && !IGNORED_WORDS.has(word.toLowerCase()))
    .map((word) => word[0].toUpperCase())
  return letters.slice(0, 3).join('') || '?'
}

/** "Ann Arbor, MI" */
export function formatUniversityLocation(university: Pick<University, 'city' | 'state'>): string {
  return `${university.city}, ${university.state}`
}
