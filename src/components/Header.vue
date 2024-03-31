<template>
  <div
    class="flex-between items-center px-100px shadow-xl shadow-gray-500/10 fixed top-0 left-0 w-full bg-[#fff] z-99">
    <div class="flex items-center">
      <div class="text-[30px] font-bold right-border pr-20px mr-20px self-center flex items-center">
        <img class="w-60px rounded-6px mr-10px" src="@/assets/image/logo.png" alt="">
        <h1>OPEN BIOBANK</h1>
      </div>
      <el-menu :default-active="activeIndex" class="!border-none" mode="horizontal"
        @select="handleSelect" :ellipsis="false">
        <el-menu-item class="text-[18px] mr-20px font-bold items-center" v-for="(nav,idx) in navs"
          :key="idx" :index="nav.path" :router="true">
          {{ nav.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <el-button :icon="Wallet" type="primary">Connect</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { Wallet } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('/home')
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
const handleSelect = (key: string) => {
  router.push({ path: key })
}
</script>
