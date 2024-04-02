<template>
  <div
    class="bg-gradient-to-r from-[#000] to-[#000] flex-between h-44px flex-y-center items-center px-180px shadow-xl fixed top-0 left-0 w-full bg-[#fff] z-99">
    <div class="text-[30px] font-bold pr-20px mr-20px self-center flex items-center">
      <img class="w-27px h-25px rounded-6px mr-8px" src="@/assets/image/logo.png" alt="">
      <img class="w-107px h-17px rounded-6px mr-10px" src="@/assets/image/web_name.png" alt="">
    </div>
    <div class="flex-y-center h-full">
      <div @click="navHandle(idx)" v-for="(nav,idx) in navs" :key="idx"
        class="px-18px mr-16px text-[#fff] opacity-65 cursor-pointer"
        :class="[{'opacity-100':activeIndex === idx}]">
        {{ nav.name }}
      </div>
      <div
        class="cursor-pointer flex-y-center border-1 border-solid opacity-65 border-[#979797] rounded-4px text-[#fff] text-10px h-20px px-4px font-bold leading-20px">
        <el-icon class="mr-5px">
          <Wallet />
        </el-icon>
        Connect
      </div>

    </div>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { Wallet } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const activeIndex = ref('/home')
let activeIndex = ref(0)
const navs = reactive([
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Supplier',
    path: '/supplier',
  },
  {
    name: 'Buyer',
    path: '/buyer',
  },
])
const navHandle = (idx: number) => {
  activeIndex.value = idx
  router.push({ path: navs[idx].path })
}
</script>
<style lang="less" scoped>
</style>