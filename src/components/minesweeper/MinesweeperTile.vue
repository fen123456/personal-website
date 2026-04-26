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
import { ClearMethod } from '../types/ClearMethod'

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

const emit = defineEmits(['leftClick', 'rightClick'])

const revealed = ref<boolean>(false)
const flagged = ref<boolean>(false)
const mouseDown = ref<boolean>(false)

const number = computed(() => {
  return props.neighbours.reduce((number, neighbour) => number + (neighbour.props.mine ? 1 : 0), 0)
})

const flagNeighbours = computed(() => {
  return props.neighbours.reduce((number, neighbour) => number + (neighbour.flagged ? 1 : 0), 0)
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
    if (!gameActive.value && props.mine) {
      return tileMine
    }
    return flagged.value ? tileFlagged : tileUncleared
  }
})

function reveal(clearMethod = ClearMethod.direct): void {
  // setting up booleans
  const cascade = !revealed.value && number.value === 0 && !props.mine

  const chord =
    revealed.value &&
    flagNeighbours.value === number.value &&
    number.value !== 0 &&
    clearMethod === ClearMethod.direct
  // chording
  if (chord) {
    props.neighbours.forEach((tile) => tile.reveal(ClearMethod.chord))
  }

  // reveal number. unflag if cascading 0s cleared it.
  if (!flagged.value || clearMethod == ClearMethod.cascade) {
    revealed.value = true
    flagged.value = false
  }

  // cascading 0s
  if (cascade) {
    props.neighbours.forEach((tile) => tile.reveal(ClearMethod.cascade))
  }
}

function toggleFlag(): void {
  if (!gameActive.value) {
    return
  }

  flagged.value = !flagged.value && !revealed.value
}

function handleLeftClick(): void {
  emit('leftClick', props.coordinate)

  mouseDown.value = false
  reveal()
}

function reset(): void {
  revealed.value = false
  flagged.value = false
}

defineExpose({
  revealed,
  flagged,
  mouseDown,
  number,
  props,
  reveal,
  reset,
})
</script>

<template>
  <img
    class="tileSprite preventSelect"
    :src="sprite"
    alt=""
    @mouseup.left="handleLeftClick()"
    @mousedown.left="mouseDown = true"
    @mousedown.right="toggleFlag"
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
