<template>
  <div class="px-180px mt-30px pb-100px flex-1 overflow-auto">
    <div class="flex-between-c">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button disabled value="gather">Gather</el-radio-button>
        <el-radio-button value="single">Single</el-radio-button>
      </el-radio-group>
      <el-button class="w-100px" type="primary" @click="more">More</el-button>
    </div>
    <!-- <div v-if="tabPosition === 'gather'" class="grid grid-cols-5 gap-x-30px gap-y-30px">
      <div v-for="item in [...tableData,...tableData]" :key="item.id"
        class="rounded-12px shadow-xl shadow-gray-500/10 overflow-hidden hover:relative -top-6px cursor-pointer"
        @click="goDetails(item)">
        <div class="bg-cover bg-no-repeat bg-center h-180px"
          :style="`background-image:url('${item.gatherImg}')`"></div>
        <div class="p-15px text-20px font-bold">
          <div>{{item.desc}}</div>
          <div class="flex-between-c mt-20px">
            <div>
              <p class="font-normal text-16px mb-8px">Total</p>
              <p>{{item.infoTotal}}</p>
            </div>
            <div class="flex flex-col items-end">
              <p class="font-normal text-16px mb-8px">Price</p>
              <p>{{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
        </template>
      </el-table-column>
      <el-table-column label="Category" prop="nftSymbol" />
      <el-table-column label="Owners" prop="creator" />
    </el-table>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import API from '@/api/index'
import _ from 'lodash'
import { createColor } from '@/hooks/useCreateColor'

const tabPosition = ref('single')
const router = useRouter()
const tableLoading = ref(false)

const goDetails = () => {
  router.push({
    path: '/buyer/details',
    query: {
      type: tabPosition.value,
    },
  })
}
const more = () => {
  router.push({
    path: '/buyer/all',
    query: {
      type: tabPosition.value,
    },
  })
}
let tableData = ref([])

onMounted(async () => {
  getNFTInfo()
})

const getNFTInfo = async () => {
  tableLoading.value = true
  const params: any = {
    page: 1,
  }
  const { status, code, data } = await API.getNFTInfo(params)
  if (code === 200) {
    const { results } = _.get(data, 'data', {})
    tableData.value = results
  }
  tableLoading.value = false
}
</script>
