import tile0 from '@/assets/minesweeper_tiles/tile0.svg'
import tile1 from '@/assets/minesweeper_tiles/tile1.svg'
import tile2 from '@/assets/minesweeper_tiles/tile2.svg'
import tile3 from '@/assets/minesweeper_tiles/tile3.svg'
import tile4 from '@/assets/minesweeper_tiles/tile4.svg'
import tile5 from '@/assets/minesweeper_tiles/tile5.svg'
import tile6 from '@/assets/minesweeper_tiles/tile6.svg'
import tile7 from '@/assets/minesweeper_tiles/tile7.svg'
import tile8 from '@/assets/minesweeper_tiles/tile8.svg'

const numberTiles: string[] = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8]

import tileFlagged from '@/assets/minesweeper_tiles/tileFlagged.svg'
import tileUncleared from '@/assets/minesweeper_tiles/tileUncleared.svg'
import tileExploded from '@/assets/minesweeper_tiles/tileExploded.svg'
import tileMine from '@/assets/minesweeper_tiles/tileMine.svg'
import { ClearMethod } from '../types/ClearMethod'
import type { GameState } from '../types/GameState'
import type { Ref } from 'vue'

export class Tile {
  mine: boolean
  revealed: boolean = false
  flagged: boolean = false
  mouseDown: boolean = false
  number: number = 0
  neighbours: Tile[] = []
  gameState: Ref<GameState> | null

  constructor(hasMine: boolean, gameState: Ref<GameState> | null = null) {
    this.mine = hasMine
    this.gameState = gameState
  }

  // assume game is active if no gameState passed to tile.
  gameActive(): boolean {
    return this.gameState ? this.gameState.value.gameActive : true
  }

  updateNumber(): void {
    this.number = this.neighbours.reduce(
      (number, currentTile) => number + (currentTile.mine ? 1 : 0),
      0,
    )
  }

  addNeighbours(neighbours: Tile[], updateNumber = true): void {
    this.neighbours = neighbours
    if (!updateNumber) {
      return
    }
    this.updateNumber()
  }

  reveal(clearMethod = ClearMethod.direct): void {
    if (this.mine) {
    }

    // setting up booleans
    const cascade = !this.revealed && this.number === 0 && !this.mine

    const flagNeighbours = this.neighbours.reduce(
      (number, currentTile) => number + (currentTile.flagged ? 1 : 0),
      0,
    )
    const chord =
      this.revealed &&
      flagNeighbours === this.number &&
      this.number !== 0 &&
      clearMethod === ClearMethod.direct

    // chording
    if (chord) {
      this.neighbours.forEach((tile) => tile.reveal(ClearMethod.chord))
    }

    // reveal number. unflag if cascading 0s cleared it.
    if (!this.flagged || clearMethod == ClearMethod.cascade) {
      this.revealed = true
      this.flagged = false
    }

    // cascading 0s
    if (cascade) {
      this.neighbours.forEach((tile) => tile.reveal(ClearMethod.cascade))
    }
  }

  getSprite(): string {
    // click preview
    if (!this.revealed && !this.flagged && this.gameActive()) {
      if (
        this.neighbours.some((neighbour) => neighbour.mouseDown && neighbour.revealed) ||
        this.mouseDown
      ) {
        return tile0
      }
    }

    // basic sprites
    if (this.revealed) {
      if (this.mine) {
        return tileExploded
      } else {
        return numberTiles[this.number] ?? tile0
      }
    } else {
      if (!this.gameActive() && this.mine) {
        return tileMine
      }
      return this.flagged ? tileFlagged : tileUncleared
    }
  }

  // on right-click function
  toggleFlag(): void {
    if (!this.gameActive()) {
      return
    }
    // can't flag revealed tile
    this.flagged = !this.flagged && !this.revealed
  }

  // on left-click function (specifically on release)
  handleLeftClick(): void {
    // these values are watched in the board that the gameState belongs to.
    if (this.gameState) {
      if (this.gameState.value.nextClickFirst) {
        this.gameState.value.nextClickFirst = false
      }
      if (this.mine) {
        this.gameState.value.gameActive = false
      }
    }

    this.mouseDown = false
    this.reveal()
  }

  setMouseDown(newValue: boolean): void {
    this.mouseDown = newValue
  }
}

export default Tile
