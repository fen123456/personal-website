<script lang="ts">
import Tile from '@/components/composables/Tile'
import { defineComponent, ref, watch, type PropType } from 'vue'

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
    // clearing/flagging logic
    function handleClick() {
      if (props.tile.mine) {
        ctx.emit('gameOver')
      }
      props.tile.reveal()
    }
    function handleRightClick() {
      props.tile.toggleFlag()
    }

    // held down detection
    const mouseDown = ref<boolean>(false)

    function setMouseDown(newValue: boolean): void {
      mouseDown.value = newValue
    }

    function handleMouseEnter(e: MouseEvent): void {
      mouseDown.value = e.buttons == 1
    }

    watch(mouseDown, () => {
      if (mouseDown.value) {
        props.tile.mouseDown()
      } else {
        props.tile.mouseUp()
      }
    })

    return {
      handleClick,
      handleRightClick,
      setMouseDown,
      mouseDown,
      handleMouseEnter,
    }
  },
})
</script>

<template>
  <img
    class="tileSprite preventSelect"
    :class="{ green: mouseDown }"
    :src="tile.getSprite()"
    ref="div"
    alt=""
    @mouseup.left="handleClick"
    @mousedown="setMouseDown(true)"
    @mouseup="setMouseDown(false)"
    @mouseenter="handleMouseEnter"
    @mouseleave="setMouseDown(false)"
    @click.right="handleRightClick"
    oncontextmenu="return false"
    draggable="false"
  />
</template>

<style scoped>
.tileSprite {
  display: inline-block;
}
.tileSprite:hover {
  cursor: auto;
}
</style>
