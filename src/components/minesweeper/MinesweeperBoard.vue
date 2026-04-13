<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'

import Tile from '@/classes/Tile'
import MinesweeperTile from './MinesweeperTile.vue'
import { newTiles } from '@/classes/newTiles'

export default defineComponent({
  components: { MinesweeperTile },
  props: {
    width: {
      required: true,
      type: Number as PropType<number>,
    },
    height: {
      required: true,
      type: Number as PropType<number>,
    },
    mineCount: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  setup(props) {
    const tiles = ref<Tile[][]>(newTiles(props.width, props.height, props.mineCount))
    // const gameActive = ref(true)
    // const mouseDown = ref(false)

    // coord array for mines

    function gameOver() {
      console.log('Gaaame over')
    }

    return { tiles, gameOver }
  },
})
</script>

<template>
  <div class="boardContainer">
    <div v-for="(row, i) in tiles" :key="i" class="row">
      <MinesweeperTile
        v-for="(tile, j) in row"
        :key="width * i + j"
        :coordinate="[i, j]"
        :tile="tile"
        @gameOver="gameOver"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  height: 16px;
}
</style>
