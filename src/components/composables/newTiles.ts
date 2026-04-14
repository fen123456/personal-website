import { arrayIncludes2D } from './arrayUtils'
import Tile from './Tile'

export function newTiles(width: number, height: number, mineCount: number): Tile[][] {
  const newCoords: number[] = Array<number>(2)
  const mineCoordinates: number[][] = []
  const tiles = Array<Tile[]>(height)

  while (mineCoordinates.length < mineCount) {
    newCoords[0] = Math.floor(Math.random() * height)
    newCoords[1] = Math.floor(Math.random() * width)

    if (!arrayIncludes2D(mineCoordinates, newCoords)) {
      mineCoordinates.push([...newCoords])
    }
  }
  console.log(mineCoordinates)
  // setup tiles array with mines in specified places.
  for (let i = 0; i < height; i++) {
    tiles[i] = Array.from({ length: width })
    for (let j = 0; j < width; j++) {
      //@ts-expect-error ts doesn't recognise that tiles[i] is definitely an array.
      tiles[i][j] = new Tile(arrayIncludes2D(mineCoordinates, [i, j]))
    }
  }

  // give tiles neighbours
  let currentNeighbours: Tile[] = Array<Tile>(0)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      currentNeighbours = []
      for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, height); k++) {
        for (let l = Math.max(j - 1, 0); l < Math.min(j + 2, width); l++) {
          if (!(k === i && l === j)) {
            //@ts-expect-error ts doesn't recognise that we are definitely in range here.
            currentNeighbours.push(tiles[k][l])
          }
        }
      }
      //@ts-expect-error ts doesn't recognise that we are definitely in range here.
      tiles[i][j].addNeighbours([...currentNeighbours])
    }
  }
  return tiles
}
