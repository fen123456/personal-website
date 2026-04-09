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

class Tile {
  number: number
  revealed: boolean
  flagged: boolean
  mine: boolean
  neighbours: Tile[]

  constructor(hasMine: boolean) {
    this.mine = hasMine
    this.revealed = false
    this.flagged = false
    this.number = 0
    this.neighbours = []
  }
  addNeighbours(neighbours: Tile[], updateNumber = true) {
    this.neighbours = neighbours
    if (!updateNumber) {
      return
    }
    this.number = this.neighbours.reduce(
      (number, currentTile) => number + (currentTile.mine ? 1 : 0),
      0,
    )
  }
  reveal() {
    if (!this.revealed && this.number === 0) {
      this.neighbours.forEach((tile) => tile.reveal())
    }

    this.revealed = true
  }
  getSprite(gameEnded = false) {
    if (this.revealed) {
      if (this.mine) {
        return tile1
      } else {
        return numberTiles[this.number]
      }
    } else {
      if (gameEnded && this.mine) {
        return tile1
      }
      return this.flagged ? tileFlagged : tileUncleared
    }
  }
}

export default Tile
