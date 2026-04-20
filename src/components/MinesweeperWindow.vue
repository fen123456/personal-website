<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from './WindowFrame.vue'
import MinesweeperBoard from './minesweeper/MinesweeperBoard.vue'

export default defineComponent({
  name: 'MinesweeperWindow',
  components: { WindowFrame, MinesweeperBoard },
  setup() {
    return { width: 10, height: 10, mineCount: 10 }
  },
})
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <MinesweeperBoard :width="width" :height="height" :mines="mineCount" />
  </WindowFrame>
</template>

<style scoped></style>
