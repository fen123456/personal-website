<template>
  <div class="window pos-z-bw">
    <div class="title-bar">
      <h1>{{ title }}</h1>
    </div>
    <div class="window-contents">
      <slot>Default Component</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
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
}
.window-contents {
  padding: 5px;
}
</style>
