<template>
  <div class="px-180px mt-30px pb-100px">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{route.query.type}} All </span>
      </template>
    </el-page-header>
    <el-divider />
    <div class="flex-between">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- <el-form-item label="keyword">
          <el-input v-model="formInline.keyword" placeholder="keyword search" clearable />
        </el-form-item> -->
        <el-form-item label="Category">
          <el-select class="w-220px" v-model="formInline.category" placeholder="select category"
            clearable>
            <el-option v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="add time">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date"
            clearable />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSearch">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" style="width: 100%"
      row-class-name='text-[#000] font-500' header-row-class-name='text-[#000] font-500'>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="Collection" prop="desc">
        <template #default="scope">
          <div class='grid grid-cols-4 grid-rows-4 w-80px h-80px rounded-6px overflow-hidden'>
            <div :style="`background:${color}`" v-for="(color) in createColor(scope.row)"
              :key="color" :class="`w-20px h-20px`">
            </div>
          </div>
          <!-- <img :src="scope.row.img" class="w-70px h-70px rounded-6px" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column label="Category" prop="nftSymbol" />
      <!-- <el-table-column label="Desc" prop="agct" /> -->
      <!-- <el-table-column label="Price" prop="price" /> -->
      <el-table-column label="Owners" prop="creator" />
    </el-table>
    <el-pagination class="mt-20px" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :small="small" :disabled="disabled" layout="total, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <!-- <el-radio-group v-model="category0">
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
      @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import API from '@/api/index'
import _ from 'lodash'
import { createColor } from '@/hooks/useCreateColor'

const category0 = ref('trending')
const category1 = ref('all')
const category2 = ref('all')
const time = ref('1h')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const disabled = ref(false)
const router = useRouter()
const route = useRoute()
let tableData = ref([])
const formInline = reactive({
  keyword: '',
  category: '',
  date: '',
})
const tableLoading = ref(false)
const goBack = () => {
  router.go(-1)
}
const onSearch = () => {
  getNFTInfo()
}
onMounted(async () => {
  getNFTInfo()
})
const options: any[] = [
  {
    label: 'bacteria',
    value: 'bacteria',
  },
  {
    label: 'fungi',
    value: 'fungi',
  },
  {
    label: 'phages',
    value: 'phages',
  },
  {
    label: 'viruses',
    value: 'viruses',
  },
]
// const categoryOptions0 = [
//   {
//     value: 'trending',
//     label: 'Trending',
//   },
//   {
//     value: 'top',
//     label: 'Top',
//   },
// ]
// const timeOptions = [
//   {
//     value: '1h',
//     label: '1h',
//   },
//   {
//     value: '24h',
//     label: '24h',
//   },
//   {
//     value: '7d',
//     label: '7d',
//   },
// ]
// const categoryOptions1 = [
//   {
//     value: 'all',
//     label: 'all',
//   },
//   {
//     value: 'human',
//     label: 'human',
//   },
//   {
//     value: 'dog',
//     label: 'dog',
//   },
//   {
//     value: 'cat',
//     label: 'cat',
//   },
// ]
// const categoryOptions2: any[] = [
//   {
//     label: 'all',
//     value: 'all',
//   },
//   {
//     label: 'urine',
//     value: 'urine',
//   },
//   {
//     label: 'saliva',
//     value: 'saliva',
//   },
//   {
//     label: 'hair',
//     value: 'hair',
//   },
//   {
//     label: 'blood',
//     value: 'blood',
//   },
// ]
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const getNFTInfo = async () => {
  tableLoading.value = true
  const params: any = {
    page: currentPage.value,
  }
  formInline.category && (params.nftSymbol = formInline.category)
  const { status, code, data } = await API.getNFTInfo(params)
  if (code === 200) {
    const { results, totalResults } = _.get(data, 'data', {})
    total.value = totalResults
    tableData.value = results.reverse()
  }
  tableLoading.value = false
}
</script>
