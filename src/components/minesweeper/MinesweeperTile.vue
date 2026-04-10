<script lang="ts">
import Tile from '@/classes/Tile'
import { defineComponent, ref, type PropType } from 'vue'

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
  setup(props) {
    const tileo = ref(props.tile)
    return { tileo }
  },
})
</script>

<template>
  <img class="tileSprite" :src="tileo.getSprite()" alt="" />
</template>

<style scoped>
.tileSprite {
  display: inline-block;
}
</style>
