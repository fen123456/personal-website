<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from './WindowFrame.vue'
import MinesweeperBoard from './minesweeper/MinesweeperBoard.vue'

export default defineComponent({
  name: 'MinesweeperWindow',
  components: { WindowFrame, MinesweeperBoard },
  setup() {
    return { width: 16, height: 16, mineCount: 40 }
  },
})
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <MinesweeperBoard :width="width" :height="height" :mines="mineCount" />
  </WindowFrame>
</template>

<style scoped></style>
