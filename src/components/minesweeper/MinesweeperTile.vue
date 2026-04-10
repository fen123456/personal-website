<script lang="ts">
import Tile from '@/classes/Tile'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    coordinate: {
      required: true,
      type: Array<number> as PropType<number[]>,
    },
    tile: {
      required: true,
      type: Tile as PropType<Tile>,
    },
  },
  setup(props, ctx) {
    function handleClick() {
      if (props.tile.mine) {
        ctx.emit('gameOver')
      }
      props.tile.reveal()
    }
    return { handleClick }
  },
})
</script>

<template>
  <img class="tileSprite" :src="tile.getSprite()" alt="" @click="handleClick()" />
</template>

<style scoped>
.tileSprite {
  display: inline-block;
}
</style>
