<script lang="ts">
import { computed, defineComponent, ref, type PropType } from 'vue'

import Tile from '@/components/composables/Tile'
import MinesweeperTile from './MinesweeperTile.vue'
import { newTiles } from '@/components/composables/newTiles'

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
    mines: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  setup(props) {
    const tiles = ref<Tile[][]>(newTiles(props.width, props.height, props.mines))
    const gameActive = ref<boolean>(true)
    const mouseDown = ref<boolean>(false)
    const lastStartTime = ref<number>(Date.now())
    console.log(tiles)
    const mineCount = computed(() => {
      return (
        props.mines -
        tiles.value.reduce(
          (count, tileArray) =>
            count +
            tileArray.reduce((secondCount, tile) => secondCount + (tile.flagged ? 1 : 0), 0),
          0,
        )
      )
    })

    const time = computed(() => {
      return Date.now() - lastStartTime.value
    })

    function gameOver(): void {
      gameActive.value = false
    }

    function newGame(): void {
      gameActive.value = true
      tiles.value = newTiles(props.width, props.height, props.mines)
      lastStartTime.value = Date.now() // not intended behaviour - this goes in first click logic
    }

    function setMouseDown(newValue: boolean): void {
      mouseDown.value = newValue
      console.log(newValue)
    }

    return { tiles, gameOver, newGame, mineCount, time, setMouseDown }
  },
})
</script>

<template>
  <div class="information">
    <p>{{ time }}</p>
    <p>{{ mineCount }}</p>
  </div>
  <div class="tilesContainer" @mousedown="setMouseDown(true)" @mouseup="setMouseDown(false)">
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
