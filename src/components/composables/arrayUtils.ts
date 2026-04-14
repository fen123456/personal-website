export function arrayEquals(arr1: unknown[], arr2: unknown[]): boolean {
  return arr1.every((val, idx) => val === arr2[idx])
}

export function arrayIncludes2D(arr1: unknown[][], arr2: unknown[]): boolean {
  return arr1.some((val) => arrayEquals(val, arr2))
}
