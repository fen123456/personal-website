<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from '../components/WindowFrame.vue'

export default defineComponent({
  name: 'HomeView',
  components: { WindowFrame },
})
</script>

<template>
  <WindowFrame title="test">
    Hello! Testing out here.
    <h2>Oooo</h2>
  </WindowFrame>
</template>
