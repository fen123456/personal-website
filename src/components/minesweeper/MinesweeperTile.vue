<script lang="ts">
import Tile from '@/components/composables/Tile'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    // coordinate: {
    //   required: true,
    //   type: Array<number> as PropType<Array<number>>,
    // },
    tile: {
      required: true,
      type: Tile as PropType<Tile>,
    },
  },
  setup(props, ctx) {
    // clearing/flagging logic
    function handleClick() {
      if (props.tile.mine) {
        ctx.emit('gameOver')
      }
      props.tile.setMouseDown(false)
      props.tile.reveal()
    }

    return { handleClick }
  },
})
</script>

<template>
  <img
    class="tileSprite preventSelect"
    :src="tile.getSprite()"
    alt=""
    @mouseup.left="handleClick"
    @mousedown.left="tile.setMouseDown(true)"
    @mousedown.right="tile.toggleFlag"
    @mouseenter="tile.setMouseDown($event.buttons == 1)"
    @mouseleave="tile.setMouseDown(false)"
    oncontextmenu="return false"
    draggable="false"
  />
</template>

<style scoped>
.tileSprite {
  float: left;
}
</style>
