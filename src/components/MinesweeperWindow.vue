<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from './WindowFrame.vue'
import MinesweeperBoard from './MinesweeperBoard.vue'

export default defineComponent({
  name: 'MinesweeperWindow',
  components: { WindowFrame, MinesweeperBoard },
})
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <MinesweeperBoard />
  </WindowFrame>
</template>

<style scoped></style>
