export function arrayEquals(arr1: unknown[], arr2: unknown[]): boolean {
  return arr1.every((val, idx) => val === arr2[idx])
}

export function arrayIncludes2D(arr1: unknown[][], arr2: unknown[]): boolean {
  return arr1.some((val) => arrayEquals(val, arr2))
}

export function randomMask2D(height: number, width: number, count: number): boolean[][] {
  const newCoords: [number, number] = Array<number>(2) as [number, number]
  const maskCoords: [number, number][] = []
  const mask = Array<boolean[]>(height)

  while (maskCoords.length < count) {
    newCoords[0] = Math.floor(Math.random() * height)
    newCoords[1] = Math.floor(Math.random() * width)

    if (!arrayIncludes2D(maskCoords, newCoords)) {
      maskCoords.push([...newCoords])
    }
  }

  // setup tiles array with mines in specified places.
  for (let i = 0; i < height; i++) {
    mask[i] = Array<boolean>(width)
    for (let j = 0; j < width; j++) {
      //@ts-expect-error ts doesn't recognise that tiles[i] is definitely an array.
      mask[i][j] = arrayIncludes2D(mineCoordinates, [i, j])
    }
  }

  return mask
}
