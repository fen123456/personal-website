<script setup lang="ts">
import WindowFrame from './WindowFrame.vue'
import MinesweeperBoard from './minesweeper/MinesweeperBoard.vue'

const width = 9
const height = 9
const mineCount = 10
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <ul class="options">
      <li>Game</li>
      <li>Help</li>
    </ul>
    <MinesweeperBoard :width="width" :height="height" :mines="mineCount" />
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
