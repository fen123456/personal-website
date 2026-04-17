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
    const lastStartTime = ref<number>(Date.now())
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

    // time :D
    const time = ref(0)
    setInterval(() => {
      time.value = Math.floor((Date.now() - lastStartTime.value) / 1000)
    }, 50)

    function gameOver(): void {
      gameActive.value = false
    }

    function newGame(): void {
      gameActive.value = true
      tiles.value = newTiles(props.width, props.height, props.mines)
      lastStartTime.value = Date.now() // not intended behaviour - this goes in first click logic
    }

    return { tiles, gameOver, newGame, mineCount, time }
  },
})
</script>

<template>
  <div class="information">
    <div class="timer">{{ time }}</div>
    <button class="resetButton">:)</button>
    <div class="minecount">{{ mineCount }}</div>
  </div>
  <div class="tilesContainer">
    <div v-for="(row, i) in tiles" :key="i" class="row">
      <MinesweeperTile
        v-for="(tile, j) in row"
        :key="width * i + j"
        :tile="tile"
        @gameOver="gameOver"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  height: 16px;
  width: max-content;
}

.timer {
  float: left;
}
.resetButton {
  float: center;
}
.minecount {
  float: right;
}
</style>
