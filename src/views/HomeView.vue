<script lang="ts">
import { defineComponent } from 'vue'
import TextWindow from '@/components/TextWindow.vue'

export default defineComponent({
  name: 'HomeView',
  components: { TextWindow },
})
</script>

<template>
  <TextWindow title="Hello!">
    <p>Oh boy this should work.</p>
    <p>Second line</p>
  </TextWindow>
</template>

<style scoped>
.text-pane {
  background-color: white;
  padding: 3px;
}
</style>
