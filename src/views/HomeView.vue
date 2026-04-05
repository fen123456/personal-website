<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from '../components/WindowFrame.vue'

export default defineComponent({
  name: 'HomeView',
  components: { WindowFrame },
})
</script>

<template>
  <WindowFrame title="test" icon="notepad">
    <div class="text-pane neg-z-grey">
      Hello! Testing out here.
      <h2>Oooo</h2>
    </div>
  </WindowFrame>
</template>

<style scoped>
.text-pane {
  background-color: white;
  padding: 3px;
}
</style>
