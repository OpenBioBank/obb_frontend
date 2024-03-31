<template>
  <div class="wrapper w-full h-full py-60px">
    <Header></Header>
    <RouterView> </RouterView>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
</style>
