<script lang="ts">
import Tile from '@/components/composables/Tile'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    coordinate: {
      required: true,
      type: Array<number> as PropType<Array<number>>,
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
    function handleRightClick() {
      props.tile.toggleFlag()
    }

    return { handleClick, handleRightClick }
  },
})
</script>

<template>
  <img
    class="tileSprite preventSelect"
    :src="tile.getSprite()"
    alt=""
    @mouseup.left="handleClick()"
    @click.right="handleRightClick()"
    oncontextmenu="return false"
    draggable="false"
  />
</template>

<style scoped>
.tileSprite {
  display: inline-block;
}
</style>
