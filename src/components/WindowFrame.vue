<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import notepadIcon from '../assets/icons/notepad-4.png'
import minesweeperIcon from '../assets/icons/minesweeper-1.png'

export default defineComponent({
  name: 'WindowFrame',
  props: {
    title: {
      required: true,
      type: String as PropType<string>,
    },
    icon: {
      required: false,
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const sources: {
      [key: string]: string
    } = {
      notepad: notepadIcon,
      minesweeper: minesweeperIcon,
    }
    const src = ref<string>('')
    src.value = sources[props.icon] ?? notepadIcon
    return { src }
  },
})
</script>

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

<style scoped>
.window {
  background: var(--grey);
  margin: 10px;
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
