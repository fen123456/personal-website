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
    <div class="text-pane neg-z-grey">
      <slot>Oops!</slot>
    </div>
  </WindowFrame>
</template>

<style scoped>
.text-pane {
  background-color: white;
  padding: 2px;
}
</style>
