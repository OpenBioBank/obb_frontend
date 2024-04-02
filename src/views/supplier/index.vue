<template>
  <div class="px-180px pb-60px mt-30px supplier flex-1 overflow-auto">
    <div class="flex-between">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="keyword">
          <el-input v-model="formInline.keyword" placeholder="keyword search" clearable />
        </el-form-item>
        <el-form-item label="Category">
          <el-select class="w-220px" v-model="formInline.category" placeholder="select category"
            clearable>
            <el-option v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="add time">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
      <el-button class="w-150px" type="primary" @click="onSubmit">Add</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="add info" width="600">
    <el-form label-width='100px' class="px-20px" :model="form" label-position="right">
      <!-- <el-form-item label="Name" required>
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="Category" required>
        <el-select v-model="form.category" placeholder="select category" clearable>
          <el-option v-for="item in options" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Message" required>
        <el-input v-model="form.desc" :rows="4" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="px-20px">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
const currentPage = ref(4)
const pageSize = ref(100)
const total = ref(0)
const small = ref(false)
const disabled = ref(false)
const dialogFormVisible = ref(false)
const formInline = reactive({
  user: '',
  category: '',
  date: '',
})
let form = reactive({
  name: '',
  category: '',
  desc: '',
})

const onSubmit = () => {
  dialogFormVisible.value = true
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  dialogFormVisible.value = true
  form = row
}
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}
const options: any[] = [
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
<style lang="less">
</style>
<style lang="less" scoped>
</style>