<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="nav-element pos-z-grey">Start</div>
    <router-link to="/">
      <div class="nav-element pos-z-grey">Hello!</div>
    </router-link>
  </nav>
  <div class="routerView">
    <RouterView />
  </div>
</template>

<style scoped>
.routerView {
  padding: 10vh 10vw;
}

nav {
  background-color: var(--grey);
  border-bottom: 3px solid black;
}
.nav-element {
  padding: 3px 8px;
  width: max-content;
  min-width: 100px;
  font-weight: bold;
  display: inline-block;
  margin: 5px;
}
</style>
