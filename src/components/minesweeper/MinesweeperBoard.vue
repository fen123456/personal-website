<script lang="ts">
import { computed, defineComponent, ref, type PropType } from 'vue'

import Tile from '../composables/Tile'
import MinesweeperTile from './MinesweeperTile.vue'
import MinesweeperDisplay from './MinesweeperDisplay.vue'
import { newTiles } from '../composables/newTiles'
import { Timer } from '../composables/Timer'

export default defineComponent({
  components: { MinesweeperTile, MinesweeperDisplay },
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
    const timer = ref(new Timer())
    const nextClickFirst = ref(true)
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

    function updateNumbers() {
      tiles.value.forEach((row) => {
        row.forEach((tile) => {
          tile.updateNumber()
        })
      })
    }

    // time :D
    const displayTime = ref(0)
    setInterval(() => {
      displayTime.value = Math.floor(timer.value.getTime() / 1000)
    }, 50)

    function gameOver(): void {
      gameActive.value = false
      timer.value.pause()
    }

    function newGame(): void {
      gameActive.value = true
      tiles.value = newTiles(props.width, props.height, props.mines)
      timer.value.reset() // need a start in first click logic
      nextClickFirst.value = true
    }

    function firstClick(coordinate: [number, number]): void {
      function randomTile(excludeY: number, excludeX: number): Tile {
        let newY = Math.floor(Math.random() * props.height)
        let newX = Math.floor(Math.random() * props.width)
        while (newY == excludeY && newX == excludeX) {
          newY = Math.floor(Math.random() * props.height)
          newX = Math.floor(Math.random() * props.width)
        }
        console.log({ newY, newX })
        //@ts-expect-error Maybe I can set array bounds for TS
        return tiles.value[newY][newX]
      }

      timer.value.start()
      const [i, j] = coordinate
      //@ts-expect-error man I know this is in range
      const currentTile = tiles.value[i][j] as Tile
      console.log(currentTile)
      if (currentTile.mine) {
        currentTile.mine = false
        let newTile = randomTile(i, j)
        while (newTile.mine) {
          newTile = randomTile(i, j)
        }
        newTile.mine = true
        updateNumbers()
      }
      nextClickFirst.value = false
    }

    return {
      tiles,
      gameOver,
      newGame,
      mineCount,
      displayTime,
      gameActive,
      nextClickFirst,
      firstClick,
    }
  },
})
</script>

<template>
  <div class="minesweeperContent">
    <div class="information minesweeperElement">
      <MinesweeperDisplay :number="displayTime" :digits="3" class="timer" />
      <button class="resetButton" @click="newGame">:)</button>
      <MinesweeperDisplay :number="mineCount" :digits="3" class="minecount" />
    </div>
    <div class="tilesContainer minesweeperElement">
      <div v-for="(row, i) in tiles" :key="i" class="row">
        <MinesweeperTile
          v-for="(tile, j) in row"
          :key="width * i + j"
          :tile="tile"
          :gameActive="gameActive"
          :firstClick="nextClickFirst"
          :coordinate="[i, j]"
          @gameOver="gameOver"
          @firstClick="firstClick($event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.minesweeperContent {
  background-color: var(--minesweeper2);
  border-style: solid;
  border-color: var(--minesweeper3) var(--minesweeper1) var(--minesweeper1) var(--minesweeper3);
  border-width: 5px;
}
.minesweeperElement {
  border-color: var(--minesweeper1) var(--minesweeper3) var(--minesweeper3) var(--minesweeper1);
  border-style: solid;
  border-width: 5px;
  margin: 10px 5px;
}

.row {
  height: 16px;
  width: max-content;
}

.information {
  height: m-content;
  padding: 3px;
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
