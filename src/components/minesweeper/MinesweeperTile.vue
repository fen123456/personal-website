<script setup lang="ts">
import tile0 from '@/assets/minesweeper_tiles/tile0.svg'
import tile1 from '@/assets/minesweeper_tiles/tile1.svg'
import tile2 from '@/assets/minesweeper_tiles/tile2.svg'
import tile3 from '@/assets/minesweeper_tiles/tile3.svg'
import tile4 from '@/assets/minesweeper_tiles/tile4.svg'
import tile5 from '@/assets/minesweeper_tiles/tile5.svg'
import tile6 from '@/assets/minesweeper_tiles/tile6.svg'
import tile7 from '@/assets/minesweeper_tiles/tile7.svg'
import tile8 from '@/assets/minesweeper_tiles/tile8.svg'

const numberTiles: string[] = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8]

import tileFlagged from '@/assets/minesweeper_tiles/tileFlagged.svg'
import tileUncleared from '@/assets/minesweeper_tiles/tileUncleared.svg'
import tileExploded from '@/assets/minesweeper_tiles/tileExploded.svg'
import tileMine from '@/assets/minesweeper_tiles/tileMine.svg'

import { computed, ref, type PropType } from 'vue'
import type { GameStateReadOnly } from '../types/GameState'
// import MinesweeperTile from './MinesweeperTile.vue'

// I wish I could type self-referentially as below but this will have to do?
// type MinesweeperTileRef = InstanceType<typeof MinesweeperTile>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MinesweeperTileRef = any

const props = defineProps({
  mine: {
    required: true,
    type: Boolean as PropType<boolean>,
  },
  coordinate: {
    required: true,
    type: Array<number> as PropType<Array<number>>,
  },
  gameState: {
    required: false,
    type: Object as PropType<GameStateReadOnly>,
  },
  neighbours: {
    required: false,
    type: Array<MinesweeperTileRef> as PropType<Array<MinesweeperTileRef>>,
    default: [],
  },
})

// refs + computed values
const revealed = ref<boolean>(false)
const flagged = ref<boolean>(false)
const mouseDown = ref<boolean>(false)

const number = computed(() => {
  return props.neighbours.reduce((count, neighbour) => count + (neighbour.props.mine ? 1 : 0), 0)
})

const flagNeighbours = computed(() => {
  return props.neighbours.reduce((count, neighbour) => count + (neighbour.flagged ? 1 : 0), 0)
})

const gameActive = computed(() => {
  return props.gameState ? props.gameState.gameActive : true
})
const sprite = computed(() => {
  // click preview
  if (!revealed.value && !flagged.value && gameActive.value) {
    if (
      props.neighbours.some((neighbour) => neighbour.mouseDown && neighbour.revealed) ||
      mouseDown.value
    ) {
      return tile0
    }
  }

  // basic sprites
  if (revealed.value) {
    if (props.mine) {
      return tileExploded
    } else {
      return numberTiles[number.value] ?? tile0
    }
  } else {
    if (!gameActive.value && props.mine && !flagged.value) {
      return tileMine
    }
    return flagged.value ? tileFlagged : tileUncleared
  }
})

// click functions
const emit = defineEmits(['leftClick', 'rightClick'])

function handleRightClick(): void {
  if (!gameActive.value) {
    return
  }

  flagged.value = !flagged.value && !revealed.value
}

function handleLeftClick(): void {
  if (!gameActive.value) {
    return
  }
  emit('leftClick', props.coordinate)

  mouseDown.value = false
}

function reset(): void {
  revealed.value = false
  flagged.value = false
}

function setRevealed(newValue: boolean): void {
  revealed.value = newValue
}

function setFlagged(newValue: boolean): void {
  flagged.value = newValue
}

defineExpose({
  revealed,
  flagged,
  mouseDown,
  number,
  flagNeighbours,
  props,
  reset,
  setRevealed,
  setFlagged,
})
</script>

<template>
  <img
    class="tileSprite preventSelect"
    :src="sprite"
    alt=""
    @mouseup.left="handleLeftClick"
    @mousedown.left="mouseDown = true"
    @mousedown.right="handleRightClick"
    @mouseenter="mouseDown = $event.buttons === 1"
    @mouseleave="mouseDown = false"
    oncontextmenu="return false"
    draggable="false"
  />
</template>

<style scoped>
.tileSprite {
  float: left;
}
</style>
