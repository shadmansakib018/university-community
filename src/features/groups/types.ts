import type { University } from '@/features/universities/types'

/** One community group per university. */
export type Group = {
  id: string
  university: University
}
