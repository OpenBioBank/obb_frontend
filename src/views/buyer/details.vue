<template>
  <div class="px-180px mt-30px pb-100px">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Details Page </span>
      </template>
    </el-page-header>
    <el-divider />
    <div class="flex py-30px">
      <div class="border-0.5px border-solid border-[#000] rounded-4px">
        <div class="p-6px flex-between-c">
          <img class="w-15px h-15px mr-8px" src="@/assets/image/logo.png" alt="">
          <span class="flex-y-center text-12px cursor-pointer">
            <span class="mr-4px">16</span>
            <el-icon class="mr-4px">
              <Star />
            </el-icon>
          </span>
        </div>
        <div class="bg-img-base w-300px h-300px" :style="`background-image:url('${info.img}')`">
        </div>
      </div>
      <div class="h-full flex flex-col justify-between  ml-40px self-start w-500px">
        <div>
          <p class="text-16px text-[#FFB500] leading-32px">CrypToadz by YUANER</p>
          <p class="text-18px font-500 leading-24px mt-7px mb-3px">{{info.name}}</p>
          <p class="text-12px leading-26px leading-15px">{{info.desc}}</p>
          <div class="flex text-12px leading-13px mt-10px">
            <span class="flex-y-center mr-12px">
              <el-icon class="mr-4px">
                <View />
              </el-icon>
              100 views
            </span>
            <span class="flex-y-center">
              <el-icon class="mr-4px">
                <Star />
              </el-icon>
              16 favorites
            </span>
          </div>
        </div>
        <!-- <div class="my-20px">
          <p class="mb-10px font-bold">Current Price</p>
          <p class="text-20px font-bold">${{info.price}}</p>
        </div> -->

        <div
          class="w-300px button-border border-[#979797] rounded-4px bg-[#000000] bg-opacity-2 mt-20px">
          <div class="p-10px text-14px">
            Sale ends 2/4/2024 at 5:18.P.M
          </div>

          <div class="p-10px top-border border-[#979797]">
            <div class="">
              <p class="text-12px text-[#000] opacity-65">Current Price</p>
              <p class="text-16px text-[#000] leading-18px mt-4px font-600">${{info.price}}</p>
            </div>
            <div
              class="button-border w-full border-[#000] mt-8px bg-[#FFB500] rounded-6px text-[#fff] text-20px py-8px font-bold flex-center cursor-pointer text-[#000]">
              Buy Now
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ShoppingCart, View, Star } from '@element-plus/icons-vue'
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