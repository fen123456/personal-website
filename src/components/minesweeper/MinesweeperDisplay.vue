<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import img0 from '@/assets/minesweeper_8seg/0.svg'
import img1 from '@/assets/minesweeper_8seg/1.svg'
import img2 from '@/assets/minesweeper_8seg/2.svg'
import img3 from '@/assets/minesweeper_8seg/3.svg'
import img4 from '@/assets/minesweeper_8seg/4.svg'
import img5 from '@/assets/minesweeper_8seg/5.svg'
import img6 from '@/assets/minesweeper_8seg/6.svg'
import img7 from '@/assets/minesweeper_8seg/7.svg'
import img8 from '@/assets/minesweeper_8seg/8.svg'
import img9 from '@/assets/minesweeper_8seg/9.svg'
import imgDash from '@/assets/minesweeper_8seg/-.svg'

const numberImages = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9]

export default defineComponent({
  props: {
    digits: {
      required: true,
      type: Number as PropType<number>,
    },
    number: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  setup(props) {
    function getImageList(number: number, digits: number): Array<string> {
      let outString = number.toString()

      const toAdd = '0'.repeat(digits - outString.length)
      if (number < 0) {
        outString = outString.substring(0, 1) + toAdd + outString.substring(1)
      } else {
        outString = toAdd + outString
      }
      const out = [] as Array<string>

      outString.split('').forEach((char) => {
        out.push(numberImages[Number(char)] ?? imgDash)
      })
      return out
    }
    const imageList = computed(() => {
      return getImageList(props.number, props.digits)
    })

    return { imageList }
  },
})
</script>

<template>
  <div class="imagesContainer">
    <div v-for="(src, i) in imageList" :key="i" class="number">
      <img :src="src" alt="" />
    </div>
  </div>
</template>

<style scoped>
.imagesContainer {
  background-color: black;
  height: 29px;
  border-color: var(--minesweeper3) var(--minesweeper1) var(--minesweeper3) var(--minesweeper1);
  border-width: 2px;
  border-style: solid;
}
.number {
  display: inline-block;
  height: 25px;
}
</style>
