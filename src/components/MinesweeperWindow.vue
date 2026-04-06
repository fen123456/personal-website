<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from './WindowFrame.vue'

export default defineComponent({
  name: 'MinesweeperWindow',
  components: { WindowFrame },
})
</script>

<template>
  <WindowFrame title="Minesweeper" icon="minesweeper">
    <MinesweeperTile> </MinesweeperTile>
  </WindowFrame>
</template>

<style scoped></style>
