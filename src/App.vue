<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="body">
    <RouterView />
  </div>
</template>

<style scoped>
.body {
  background-color: #008080;
  height: 100vh;
  width: 100vw;
  padding: 10vh 10vw;
}
</style>
