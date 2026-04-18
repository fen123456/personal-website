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
    coordinate: {
      required: true,
      type: Array<number> as PropType<Array<number>>,
    },
    gameActive: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: true,
    },
    firstClick: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, ctx) {
    // clearing/flagging logic
    function handleClick() {
      if (props.firstClick) {
        ctx.emit('firstClick', props.coordinate)
      }
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
    :src="tile.getSprite(gameActive)"
    alt=""
    @mouseup.left="gameActive && handleClick()"
    @mousedown.left="tile.setMouseDown(true)"
    @mousedown.right="gameActive && tile.toggleFlag()"
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
