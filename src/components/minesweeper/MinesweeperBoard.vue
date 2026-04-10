<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import Tile from '@/classes/Tile'
import MinesweeperTile from './MinesweeperTile.vue'

function arrayEquals(arr1: unknown[], arr2: unknown[]): boolean {
  return arr1.every((val, idx) => val === arr2[idx])
}

function arrayIncludes2D(arr1: unknown[][], arr2: unknown[]): boolean {
  return arr1.some((val) => arrayEquals(val, arr2))
}

export default defineComponent({
  components: { MinesweeperTile },
  props: {
    width: {
      required: true,
      type: Number as PropType<number>,
    },
    height: {
      required: true,
      type: Number as PropType<number>,
    },
    mineCount: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  setup(props) {
    const mineCoordinates: number[][] = []
    const tiles: Tile[][] = []

    const newCoords: number[] = [0, 0]
    while (mineCoordinates.length < props.mineCount) {
      newCoords[0] = Math.floor(Math.random() * props.width)
      newCoords[1] = Math.floor(Math.random() * props.height)

      if (!arrayIncludes2D(mineCoordinates, newCoords)) {
        mineCoordinates.push([...newCoords])
      }
    }

    for (let i = 0; i < props.height; i++) {
      tiles.push(Array.from({ length: props.width }))
      for (let j = 0; j < props.width; j++) {
        //@ts-expect-error ts doesn't recognise that tiles[i] is definitely an array.
        tiles[i][j] = new Tile(arrayIncludes2D(mineCoordinates, [i, j]))
      }
    }

    return { tiles }
  },
})
</script>

<template>
  <div class="boardContainer">
    <div v-for="(row, i) in tiles" :key="i" class="row">
      <MinesweeperTile v-for="(tile, j) in row" :key="j" :coordinate="[i, j]" :tile="tile" />
    </div>
  </div>
</template>

<style scoped>
.row {
  height: 16px;
}
</style>
