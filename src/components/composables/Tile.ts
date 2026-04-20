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

export class Tile {
  mine: boolean
  revealed: boolean
  flagged: boolean
  mouseDown: boolean
  number: number
  neighbours: Tile[]

  constructor(hasMine: boolean) {
    this.mine = hasMine
    this.revealed = false
    this.flagged = false
    this.mouseDown = false
    this.number = 0
    this.neighbours = []
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

  getSprite(gameActive = true): string {
    // click preview
    if (!this.revealed && !this.flagged && gameActive) {
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
      if (!gameActive && this.mine) {
        return tileMine
      }
      return this.flagged ? tileFlagged : tileUncleared
    }
  }
  toggleFlag() {
    // can't flag revealed tile
    this.flagged = !this.flagged && !this.revealed
  }
  setMouseDown(newValue: boolean): void {
    this.mouseDown = newValue
  }
}

export default Tile
