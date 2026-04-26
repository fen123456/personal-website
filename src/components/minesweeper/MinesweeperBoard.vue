<script setup lang="ts">
import { computed, onMounted, ref, type PropType } from 'vue'

import MinesweeperTile from './MinesweeperTile.vue'
import MinesweeperDisplay from './MinesweeperDisplay.vue'
import { Timer } from '../composables/Timer'
import { arrayEquals, randomMask2D } from '../composables/arrayUtils'
import type { GameStateReactive } from '../types/GameState'

type MinesweeperTileRef = InstanceType<typeof MinesweeperTile>

const props = defineProps({
  height: {
    required: true,
    type: Number as PropType<number>,
  },
  width: {
    required: true,
    type: Number as PropType<number>,
  },
  mines: {
    required: true,
    type: Number as PropType<number>,
  },
})

const mines = ref(randomMask2D(props.height, props.width, props.mines))

const tiles = ref<MinesweeperTileRef[][]>(Array.from({ length: props.height }))
for (let i = 0; i < props.height; i++) {
  tiles.value[i] = Array.from({ length: props.width })
}

const neighbours = ref<MinesweeperTileRef[][][]>(Array.from({ length: props.height }))
for (let i = 0; i < props.height; i++) {
  neighbours.value[i] = Array.from({ length: props.width })
  for (let j = 0; j < props.width; j++) {
    //@ts-expect-error coordinates always in bounds.
    neighbours.value[i][j] = []
  }
}

// computed values get actually set on mount once I can work with the tile refs.
const gameState = ref<GameStateReactive>({
  nextClickFirst: true,
  mineCount: computed(() => {
    return props.mines
  }),
  gameWon: computed(() => {
    return false
  }),
  gameLost: computed(() => {
    return false
  }),
  gameActive: computed(() => {
    return true
  }),
})

const timer = ref(new Timer())

// time :D
const displayTime = ref(0)
setInterval(() => {
  displayTime.value = Math.floor(timer.value.getTime() / 1000)
}, 50)

function gameOver(): void {
  gameState.value.gameActive = false
  timer.value.pause()
}

function newGame(): void {
  gameState.value.nextClickFirst = true
  timer.value.reset()

  mines.value = randomMask2D(props.height, props.width, props.mines)
  tiles.value.forEach((row) => row.forEach((tile) => tile.reset()))
}

function firstClick(coordinate: [number, number]): void {
  function randomTile(excludeCoordinate: [number, number]): MinesweeperTileRef {
    let newY = Math.floor(Math.random() * props.height)
    let newX = Math.floor(Math.random() * props.width)
    //@ts-expect-error tiles coord in bounds.
    while (arrayEquals([newY, newX], excludeCoordinate) && tiles[newY][newX].props.mine) {
      newY = Math.floor(Math.random() * props.height)
      newX = Math.floor(Math.random() * props.width)
    }
    //@ts-expect-error Maybe I can set array bounds for TS
    return tiles.value[newY][newX]
  }

  timer.value.start()
  //@ts-expect-error another index issue!
  const currentTile = tiles.value[coordinate[0]][coordinate[1]] as MinesweeperTileRef
  console.log(currentTile)
  if (currentTile.mine) {
    currentTile.mine = false
    let newTile = randomTile(coordinate)
    while (newTile.mine) {
      newTile = randomTile(coordinate)
    }
    newTile.mine = true
  }
  gameState.value.nextClickFirst = false
}

function handleLeftClick(coordinate: [number, number]): void {
  if (gameState.value.nextClickFirst) {
    firstClick(coordinate)
  }
}

function handleRightClick() {}

onMounted(() => {
  // this was throwing a fit at me if I started looking for minecount and gameWon before mounting.
  gameState.value = {
    nextClickFirst: true,
    mineCount: computed(() => {
      return (
        props.mines -
        tiles.value.reduce(
          (count, row) =>
            count + row.reduce((secondCount, tile) => secondCount + (tile.flagged ? 1 : 0), 0),
          0,
        )
      )
    }),
    gameWon: computed(() => {
      return !tiles.value.some((row) => {
        row.some((tile) => !tile.revealed && !tile.mine)
      })
    }),
    gameLost: computed(() => {
      return tiles.value.some((row) => {
        row.some((tile) => tile.revealed && tile.mine)
      })
    }),
    gameActive: computed(() => {
      return !(gameState.value.gameWon || gameState.value.gameLost)
    }),
  }

  // neighbour assignment can only be done once tiles is all assigned.
  for (let i = 0; i < props.height; i++) {
    for (let j = 0; j < props.width; j++) {
      for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, props.height); k++) {
        for (let l = Math.max(j - 1, 0); l < Math.min(j + 2, props.width); l++) {
          if (!(k === i && l === j)) {
            //@ts-expect-error ts doesn't recognise that we are definitely in range here.
            neighbours.value[i][j].push(tiles.value[k][l])
          }
        }
      }
    }
  }
})
</script>

<template>
  <div class="minesweeperContent">
    <div class="information minesweeperElement">
      <MinesweeperDisplay :number="displayTime" :digits="3" class="timer" />
      <button class="resetButton" @click="newGame">:)</button>
      <MinesweeperDisplay :number="gameState.mineCount" :digits="3" class="minecount" />
    </div>
    <div class="tilesContainer minesweeperElement">
      <div v-for="(row, i) in mines" :key="i" class="row">
        <MinesweeperTile
          v-for="(mine, j) in row"
          :key="width * i + j"
          :coordinate="[i, j]"
          :mine="mine"
          :neighbours="neighbours[i][j]"
          :ref="(element) => (tiles[i][j] = element)"
          :game-state="gameState"
          @left-click="handleLeftClick"
          @right-click="handleRightClick"
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
  padding: 5px;
}
.minesweeperElement {
  border-color: var(--minesweeper1) var(--minesweeper3) var(--minesweeper3) var(--minesweeper1);
  border-style: solid;
  border-width: 5px;
  margin: 5px;
}

.row {
  height: 16px;
  width: max-content;
}

.information {
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
