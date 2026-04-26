<script setup lang="ts">
import TextWindow from '@/components/TextWindow.vue'
import MinesweeperWindow from '@/components/MinesweeperWindow.vue'
</script>

<template>
  <TextWindow title="Hello!">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit blanditiis voluptates corporis
      nisi illum atque at optio nam dicta, corrupti cum libero quia nostrum fuga reiciendis
      repudiandae voluptate quisquam adipisci. Provident porro laborum sed fugit, optio dicta? A
      debitis harum asperiores dolor voluptatum ullam dignissimos. Ullam minima, dolore consectetur
      corrupti autem, eos veniam architecto consequuntur deleniti harum vel exercitationem sapiente?
      Tempore error quibusdam ratione perspiciatis omnis, explicabo pariatur laboriosam. Facilis
      fuga a earum magnam at iure perspiciatis, accusantium et maiores, assumenda exercitationem
      eveniet modi rerum minus eum! Accusamus, voluptates quisquam?
    </p>
    <p>Second line</p>
    <p></p>
  </TextWindow>
  <MinesweeperWindow />
</template>

<style scoped>
.text-pane {
  background-color: white;
  padding: 3px;
}
</style>
