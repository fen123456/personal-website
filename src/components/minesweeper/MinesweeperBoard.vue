<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'

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
    // coord array for mines
    const newCoords: number[] = Array<number>(2)
    const mineCoordinates: number[][] = []
    while (mineCoordinates.length < props.mineCount) {
      newCoords[0] = Math.floor(Math.random() * props.width)
      newCoords[1] = Math.floor(Math.random() * props.height)

      if (!arrayIncludes2D(mineCoordinates, newCoords)) {
        mineCoordinates.push([...newCoords])
      }
    }

    // setup tiles array with mines in specified places.
    const tiles = ref<Tile[][]>(Array<Tile[]>(props.height))
    for (let i = 0; i < props.height; i++) {
      tiles.value[i] = Array.from({ length: props.width })
      for (let j = 0; j < props.width; j++) {
        //@ts-expect-error ts doesn't recognise that tiles[i] is definitely an array.
        tiles.value[i][j] = new Tile(arrayIncludes2D(mineCoordinates, [i, j]))
      }
    }

    // give tiles neighbours
    let currentNeighbours: Tile[] = Array<Tile>(0)
    for (let i = 0; i < props.height; i++) {
      for (let j = 0; j < props.width; j++) {
        currentNeighbours = []
        for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, props.height); k++) {
          for (let l = Math.max(j - 1, 0); l < Math.min(j + 2, props.width); l++) {
            if (!(k === i && l === j)) {
              //@ts-expect-error ts doesn't recognise that we are definitely in range here.
              currentNeighbours.push(tiles.value[k][l])
            }
          }
        }
        //@ts-expect-error ts doesn't recognise that we are definitely in range here.
        tiles.value[i][j].addNeighbours([...currentNeighbours])
      }
    }

    function gameOver() {
      console.log('Gaaame over')
    }

    return { tiles, gameOver }
  },
})
</script>

<template>
  <div class="boardContainer">
    <div v-for="(row, i) in tiles" :key="i" class="row">
      <MinesweeperTile
        v-for="(tile, j) in row"
        :key="width * i + j"
        :coordinate="[i, j]"
        :tile="tile"
        @gameOver="gameOver"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  height: 16px;
}
</style>
