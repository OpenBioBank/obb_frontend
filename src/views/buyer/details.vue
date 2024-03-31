<template>
  <div class="px-100px mt-30px pb-100px">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Details Page </span>
      </template>
    </el-page-header>
    <el-divider />
    <div class="flex-between-c px-100px py-30px">
      <div class="bg-img-base w-500px h-500px rounded-12px"
        :style="`background-image:url('${info.img}')`">
      </div>
      <div class="flex-1 ml-50px self-start p-20px">
        <p class="text-30px font-500 mb-20px">{{info.name}}</p>
        <p class="text-18px leading-26px">{{info.desc}}</p>
        <div class="my-20px">
          <p class="mb-10px font-bold">Current Price</p>
          <p class="text-20px font-bold">${{info.price}}</p>
        </div>
        <div
          class="bg-[#409EFE] rounded-6px text-[#fff] text-26px py-10px font-bold px-100px w-auto inline-block cursor-pointer">
          <el-icon size='30px'>
            <ShoppingCart />
          </el-icon>
          <span class="items-start ml-20px relative -top-5px">Buy Now</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ShoppingCart } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.go(-1)
}
const info = {
  infoTotal: 400,
  date: '2016-05-03',
  category: 'urine',
  name: 'Asian Longhair',
  desc: 'Information about Asian men under 35 years old',
  price: 20,
  gatherImg:
    'https://i.seadn.io/gae/3hqgtmgLMJXSmKT6SILdYaeXCNy_eAeqqdH9l_Xc1wqjSf0J2F1AwbMf-rizYrzrFvUGdyGsNYUizclsYCwcan5ass3-X3wz2NlhFEo?auto=format&dpr=1&h=500&fr=1',
  img: 'https://arweave.net/D5ihjmdt75TIStMnxoCXduJHDES-QZtgu8ZlsLErv2Q/4026.png',
  owners: '2000',
}
</script>
  const info = 
<style>
</style>