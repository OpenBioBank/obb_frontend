<template>
  <div class="px-180px mt-30px pb-100px">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{route.query.type}} All </span>
      </template>
    </el-page-header>
    <el-divider />
    <el-radio-group v-model="category0">
      <el-radio-button v-for="item in categoryOptions0" :key="item.id" :value="item.value">
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
    <div class="flex-between-c mb-20px mt-10px">
      <div class="flex-y-center">
        <el-radio-group v-model="category1">
          <el-radio-button v-for="item in categoryOptions1" :key="item.id" :value="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <el-select class="ml-20px w-220px" v-model="category2" placeholder="select category"
          clearable>
          <el-option v-for="item in categoryOptions2" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
      <el-radio-group v-model="time">
        <el-radio-button v-for="item in timeOptions" :key="item.id" :value="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <el-table :data="tableData" style="width: 100%" row-class-name='text-[#000] font-500'
      header-row-class-name='text-[#000] font-500'>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="Collection" prop="desc">
        <template #default="scope">
          <img :src="scope.row.img" class="w-70px h-70px rounded-6px" alt="">
        </template>
      </el-table-column>
      <el-table-column label="Category" prop="category" />
      <el-table-column label="Desc" prop="desc" />
      <el-table-column label="Price" prop="price" />
      <el-table-column label="Owners" prop="owners" />

    </el-table>
    <el-pagination class="mt-20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled"
      layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const category0 = ref('trending')
const category1 = ref('all')
const category2 = ref('all')
const time = ref('1h')
const currentPage = ref(4)
const pageSize = ref(100)
const total = ref(0)
const small = ref(false)
const disabled = ref(false)
const router = useRouter()
const route = useRoute()
console.log('看下rote', route)
const goBack = () => {
  router.go(-1)
}
const categoryOptions0 = [
  {
    value: 'trending',
    label: 'Trending',
  },
  {
    value: 'top',
    label: 'Top',
  },
]
const timeOptions = [
  {
    value: '1h',
    label: '1h',
  },
  {
    value: '24h',
    label: '24h',
  },
  {
    value: '7d',
    label: '7d',
  },
]
const categoryOptions1 = [
  {
    value: 'all',
    label: 'all',
  },
  {
    value: 'human',
    label: 'human',
  },
  {
    value: 'dog',
    label: 'dog',
  },
  {
    value: 'cat',
    label: 'cat',
  },
]
const categoryOptions2: any[] = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'urine',
    value: 'urine',
  },
  {
    label: 'saliva',
    value: 'saliva',
  },
  {
    label: 'hair',
    value: 'hair',
  },
  {
    label: 'blood',
    value: 'blood',
  },
]
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const tableData: any[] = [
  {
    infoTotal: 400,
    date: '2016-05-03',
    category: 'urine',
    desc: 'xxxx xxx',
    price: 20,
    gatherImg:
      'https://i.seadn.io/gae/3hqgtmgLMJXSmKT6SILdYaeXCNy_eAeqqdH9l_Xc1wqjSf0J2F1AwbMf-rizYrzrFvUGdyGsNYUizclsYCwcan5ass3-X3wz2NlhFEo?auto=format&dpr=1&h=500&fr=1',
    img: 'https://i.seadn.io/s/raw/files/64f5dd9d1860435dac4448c3e59f3ea2.png?auto=format&dpr=1&w=128',
    owners: '2000',
  },
  {
    infoTotal: 123,
    date: '2016-05-02',
    category: 'saliva',
    desc: 'xxxx xxx',
    price: 20,
    gatherImg:
      'https://i.seadn.io/s/raw/files/6e725e68619c97f6b98a3cc6204f5d60.jpg?auto=format&dpr=1&h=500&fr=1',
    img: 'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=128',
    owners: '2000',
  },
  {
    infoTotal: 570,
    date: '2016-05-04',
    category: 'hair',
    desc: 'xxxx xxx',
    price: 20,
    gatherImg:
      'https://i.seadn.io/gae/3hqgtmgLMJXSmKT6SILdYaeXCNy_eAeqqdH9l_Xc1wqjSf0J2F1AwbMf-rizYrzrFvUGdyGsNYUizclsYCwcan5ass3-X3wz2NlhFEo?auto=format&dpr=1&h=500&fr=1',
    img: 'https://i.seadn.io/s/raw/files/64f5dd9d1860435dac4448c3e59f3ea2.png?auto=format&dpr=1&w=128',
    owners: '2000',
  },
  {
    infoTotal: 8000,
    date: '2016-05-01',
    category: 'blood',
    desc: 'xxxx xxx',
    price: 20,
    gatherImg:
      'https://i.seadn.io/s/raw/files/6e725e68619c97f6b98a3cc6204f5d60.jpg?auto=format&dpr=1&h=500&fr=1',
    img: 'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=128',
    owners: '2000',
  },
  {
    infoTotal: 8000,
    date: '2016-05-01',
    category: 'blood',
    desc: 'xxxx xxx',
    price: 20,
    gatherImg:
      'https://i.seadn.io/s/raw/files/6e725e68619c97f6b98a3cc6204f5d60.jpg?auto=format&dpr=1&h=500&fr=1',
    img: 'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=128',
    owners: '2000',
  },
]
</script>
