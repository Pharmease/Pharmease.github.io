<template>
  <div
    class="bg-neutral-darkCharcoal sticky top-0 z-50 h-20 p-4 flex items-center justify-between">
    <span class="">
      <ph-logo />
    </span>

    <div class="lg:flex hidden items-center gap-x-4">
      <ph-button
        class="bg-primary font-medium capitalize justify-center text-white p-2 flex gap-x-2 px-6 rounded-full w-40"
        >Login
      </ph-button>
      <ph-button
        class="text-primary border-2 border-white font-medium capitalize justify-center bg-white w-max p-2 flex gap-x-2 px-6 rounded-full lg:w-fit"
        >Create Account
      </ph-button>
    </div>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__flipInY"
      leave-active-class="animate__animated animate__flipOutY">
      <component
        :is="!showMenu ? Menu1Icon : CloseCircleIcon"
        class="h-8 w-8 lg:hidden text-white"
        @click="showMenu = !showMenu" />
    </transition>

    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
      class="lg:hidden absolute top-20 border rounded-lg w-[90 vw] right-0 p-10 bg-white">
      <div class="grid items-center w-full justify-end gap-4" v-if="showMenu">
        <ph-button
          class="bg-primary font-medium capitalize justify-center text-white p-2 flex gap-x-2 px-6 rounded-full w-40"
          >Login
        </ph-button>
        <ph-button
          class="text-primary border-2 border-primary font-medium capitalize justify-center bg-white w-max p-2 flex gap-x-2 px-6 rounded-full lg:w-fit"
          >Create Account
        </ph-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Menu1Icon, CloseCircleIcon } from '@placetopay/iconsax-vue/outline';

const showMenu = ref(false);
</script>

<style scoped></style>
