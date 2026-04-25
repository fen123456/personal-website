import type { ComputedRef } from 'vue'

export interface GameState {
  gameActive: boolean
  nextClickFirst: boolean
  mineCount: ComputedRef<number>
  gameWon: ComputedRef<boolean>
}
