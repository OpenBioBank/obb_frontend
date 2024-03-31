<template>
  <div class="px-100px mt-30px pb-100px">
    <div class="flex-between-c">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button value="gather">Gather</el-radio-button>
        <el-radio-button value="single">Single</el-radio-button>
      </el-radio-group>
      <el-button class="w-100px" type="primary" @click="more">More</el-button>
    </div>
    <div v-if="tabPosition === 'gather'" class="grid grid-cols-5 gap-x-30px gap-y-30px">
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
    </div>
    <el-table v-else :data="tableData" style="width: 100%" row-class-name='cursor-pointer'
      @row-click="goDetails">
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
  </div>

</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const tabPosition = ref('gather')
const router = useRouter()

const goDetails = (row) => {
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
