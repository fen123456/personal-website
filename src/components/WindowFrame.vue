<template>
  <div class="window pos-z-bw">
    <div class="title-bar">
      <img v-if="src" :src="src" />
      <h1>{{ title }}</h1>
    </div>
    <div class="window-contents">
      <slot>Default Component</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import notepadIcon from '../assets/notepad-4.png'
import minesweeperIcon from '../assets/minesweeper-1.png'

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    icon: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const sources = {
      notepad: notepadIcon,
      minesweeper: minesweeperIcon,
    }
    const src = ref<string>('')
    src.value = sources[props.icon] === undefined ? sources.notepad : sources[props.icon]
    return { src }
  },
})
</script>

<style scoped>
.window {
  background: var(--grey);
}
.title-bar {
  background-color: #00f;
  color: white;
  padding: 5px;
  display: flex;
  align-items: center;
}
.title-bar img {
  height: 25px;
  margin-right: 5px;
}
.window-contents {
  padding: 3px;
}
</style>
