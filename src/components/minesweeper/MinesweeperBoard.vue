<script setup lang="ts">
import { computed, onMounted, ref, watch, type PropType } from 'vue'

import MinesweeperTile from './MinesweeperTile.vue'
import MinesweeperDisplay from './MinesweeperDisplay.vue'
import { Timer } from '../composables/Timer'
import { arrayEquals, randomMask2D } from '../composables/arrayUtils'
import type { GameStateReactive } from '../types/GameState'
import { ClearMethod } from '../types/ClearMethod'

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

const mines = ref<boolean[][]>(randomMask2D(props.height, props.width, props.mines))

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
  gameLost: false,
  gameActive: computed(() => {
    return true
  }),
})

// time :D
const timer = ref(new Timer())

const displayTime = ref(0)
setInterval(() => {
  displayTime.value = Math.floor(timer.value.getTime() / 1000)
}, 50)

function newGame(): void {
  gameState.value.nextClickFirst = true
  gameState.value.gameLost = false
  timer.value.reset()

  mines.value = randomMask2D(props.height, props.width, props.mines)
  tiles.value.forEach((row) => row.forEach((tile) => tile.reset()))
}

function firstClick(coordinate: [number, number]): void {
  function randomTile(excludeCoordinate: [number, number]): [number, number] {
    let newY = Math.floor(Math.random() * props.height)
    let newX = Math.floor(Math.random() * props.width)
    //@ts-expect-error tiles coord in bounds.
    while (arrayEquals([newY, newX], excludeCoordinate) && mines.value[newY][newX]) {
      newY = Math.floor(Math.random() * props.height)
      newX = Math.floor(Math.random() * props.width)
    }
    return [newY, newX]
  }

  timer.value.start()

  const [i, j] = coordinate
  //@ts-expect-error another index issue!
  if (mines.value[i][j]) {
    //@ts-expect-error another index issue!
    mines.value[i][j] = false
    const [newI, newJ] = randomTile(coordinate)
    //@ts-expect-error another index issue!
    mines.value[newI][newJ] = true
  }
  gameState.value.nextClickFirst = false
}

function reveal(coordinate: [number, number], clearMethod = ClearMethod.direct): void {
  const [i, j] = coordinate
  // @ts-expect-error indexing AGAIN!
  const tile = tiles.value[i][j] as MinesweeperTileRef
  // @ts-expect-error indexing AGAIN!
  const mine = mines.value[i][j]
  // @ts-expect-error indexing AGAIN!
  const neighbour = neighbours.value[i][j] as MinesweeperTileRef[]

  // setting up booleans
  const cascade = !tile.revealed && tile.number === 0 && !mine

  const chord =
    tile.revealed &&
    tile.flagNeighbours === tile.number &&
    tile.number !== 0 &&
    clearMethod === ClearMethod.direct
  // chording
  if (chord) {
    tile.props.neighbours.forEach((tile) => reveal(tile.props.coordinate, ClearMethod.chord))
  }

  // reveal number + unflag if cascading 0s cleared it.
  if (!tile.flagged || clearMethod == ClearMethod.cascade) {
    tile.setRevealed(true)
    tile.setFlagged(false)
  }

  // cascading 0s
  if (cascade) {
    neighbour.forEach((tile) =>
      reveal(tile.props.coordinate as [number, number], ClearMethod.cascade),
    )
  }
}

function handleLeftClick(coordinate: [number, number]): void {
  if (gameState.value.nextClickFirst) {
    firstClick(coordinate)
  }

  const [i, j] = coordinate
  //@ts-expect-error man its an indexer
  if (mines.value[i][j]) {
    gameState.value.gameLost = true
  }

  reveal(coordinate)
}

function handleRightClick() {}

onMounted(() => {
  const gameWonCondition = () => {
    return !tiles.value.some((row) => {
      return row.some((tile) => !tile.revealed && !tile.props.mine)
    })
  }

  const gameActiveCondition = () => {
    // console.log({ lost: gameLostCondition() })
    // console.log({ won: gameWonCondition() })
    return !(gameState.value.gameLost || gameWonCondition())
  }

  // this was throwing a fit at me if I started looking for minecount and gameWon before mounting.
  gameState.value = {
    nextClickFirst: true,
    mineCount: computed(() => {
      return (
        props.mines -
        tiles.value.reduce(
          (count, row) =>
            count + row.reduce((rowCount, tile) => rowCount + (tile.flagged ? 1 : 0), 0),
          0,
        )
      )
    }),
    gameWon: computed(gameWonCondition),
    gameLost: false,
    gameActive: computed(gameActiveCondition),
  }

  watch(gameActiveCondition, () => {
    if (!gameActiveCondition()) {
      timer.value.pause()
    }
  })

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
  border-width: 4px;
}
.minesweeperElement {
  border-color: var(--minesweeper1) var(--minesweeper3) var(--minesweeper3) var(--minesweeper1);
  border-style: solid;
  border-width: 4px;
  margin: 8px;
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
