<script setup lang="ts">
import { computed, ref } from 'vue'
import WindowFrame from '../WindowFrame.vue'
import MinesweeperBoard from './MinesweeperBoard.vue'

type difficultyNames = 'beginner' | 'intermediate' | 'expert'
interface difficultyInfo {
  width: number
  height: number
  mineCount: number
}
const difficulties: Record<difficultyNames, difficultyInfo> = {
  beginner: {
    width: 9,
    height: 9,
    mineCount: 10,
  },
  intermediate: {
    width: 16,
    height: 16,
    mineCount: 40,
  },
  expert: {
    width: 30,
    height: 16,
    mineCount: 99,
  },
}

const difficulty = ref<difficultyNames>('beginner')
const selection = computed(() => {
  return difficulties[difficulty.value]
})
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <ul class="options">
      <li>Game</li>
      <li>Help</li>
    </ul>
    <MinesweeperBoard
      :width="selection.width"
      :height="selection.height"
      :mines="selection.mineCount"
    />
  </WindowFrame>
</template>

<style scoped>
ul.options {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
  padding: 3px;
}
</style>
