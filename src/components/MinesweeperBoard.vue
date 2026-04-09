<script lang="ts">
import { defineComponent } from 'vue'

import Tile from '@/assets/classes/Tile.ts'

export default defineComponent({
  setup() {
    const tile = new Tile(false)

    tile.number = 2
    tile.reveal()

    const src = tile.getSprite()

    return { src }
  },
})
</script>

<template>
  <div>
    <img :src="src" alt="" />
  </div>
</template>

<style></style>
