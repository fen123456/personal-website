<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from './WindowFrame.vue'
import MinesweeperBoard from './minesweeper/MinesweeperBoard.vue'

export default defineComponent({
  name: 'MinesweeperWindow',
  components: { WindowFrame, MinesweeperBoard },
  setup() {
    return { width: 9, height: 9, mineCount: 10 }
  },
})
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
