<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import WindowFrame from './WindowFrame.vue'

export default defineComponent({
  name: 'TextWindow',
  components: { WindowFrame },
  props: {
    title: {
      required: true,
      type: String as PropType<string>,
    },
  },
})
</script>

<template>
  <WindowFrame :title="title" icon="notepad">
    <div class="text-pane-container">
      <div class="text-pane neg-z-grey">
        <slot>Oops!</slot>
      </div>
    </div>
  </WindowFrame>
</template>

<style scoped>
.text-pane-container {
  padding: 3px;
}
.text-pane {
  background-color: white;
  padding: 2px;
  width: max-content;
  max-width: 100%;
}
</style>
