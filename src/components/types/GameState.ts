import type { ComputedRef } from 'vue'

// when I pass this as a prop, it becomes the read-only version.
export interface GameStateReactive {
  nextClickFirst: boolean
  mineCount: ComputedRef<number>
  gameWon: ComputedRef<boolean>
  gameLost: ComputedRef<boolean>
  gameActive: ComputedRef<boolean>
}

export interface GameStateReadOnly {
  nextClickFirst: boolean
  mineCount: number
  gameWon: boolean
  gameLost: boolean
  gameActive: boolean
}
