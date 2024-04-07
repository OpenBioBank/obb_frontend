<template>
  <div class="wrapper w-full h-full pt-60px flex flex-col">
    <Header></Header>

    <router-view v-slot="{ Component,route }">
      <keep-alive>
        <component :key="route.name" :is="Component" v-if="route?.meta.keepAlive" />
      </keep-alive>
      <component :key="route.name" :is="Component" v-if="!route?.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style scoped>
</style>
