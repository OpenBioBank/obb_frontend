<template>
  <div class="px-180px pb-60px mt-30px supplier flex-1 overflow-auto">
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
      <el-button class="w-150px" type="primary" @click="addHandle">Add</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" style="width: 100%"
      row-class-name='text-[#000] font-500' header-row-class-name='text-[#000] font-500'>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="Collection" prop="desc">
        <template #default="scope">
          <!-- <div class="flex-y-center"> -->
          <div class='grid grid-cols-4 grid-rows-4 w-80px h-80px rounded-6px overflow-hidden'>
            <div :style="`background:${color}`" v-for="(color) in createColor(scope.row)"
              :key="color" :class="`w-20px h-20px`">
            </div>

          </div>
          <!-- <div class="ml-20px">{{ scope.row.gcContent }}</div> -->
          <!-- </div> -->
          <!-- <img :src="scope.row.img" class="w-70px h-70px rounded-6px" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column label="OMICS GC" prop="gcContent" />
      <el-table-column label="Description" prop="desc">
        <template #default="scope">
          <div>{{ scope.row.desc ||  descHandle(scope.row)}}</div>
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
  </div>
  <el-dialog @closed="closed" :destroy-on-close="true" v-model="dialogFormVisible" title="add info"
    width="600">
    <el-form ref="ruleFormRef" label-width='150px' class="px-20px" :model="form" :rules="rules"
      label-position="right">

      <el-form-item label="Category" prop="category">
        <el-select v-model="form.category" placeholder="select category" clearable>
          <el-option v-for="item in options" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Institution Type" prop="institution">
        <el-select v-model="form.institution" placeholder="select institution type" clearable>
          <el-option v-for="item in institutionOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="description">
        <el-input type="textarea" v-model="form.desc" />
      </el-form-item>
      <el-form-item label="Attachments" prop="fileList">
        <div class="flex-between w-full">
          <el-upload accept=".fna" v-model:file-list="form.fileList"
            class="upload-demo flex-1 overflow-hidden" multiple :limit="1" action="#"
            :auto-upload="false" :on-preview="handlePreview" :on-remove="handleRemove">
            <el-button type="primary">Click to upload</el-button>
          </el-upload>
          <div v-if="exampleFile">
            <p>Download sample file</p>
            <div v-for="(file,idx) in exampleFile" :key="idx" class="flex-y-center"
              @click="downloadFile(file)">
              <el-icon>
                <Document />
              </el-icon>
              <el-button class="ml-4px" type="primary" link>{{ file.label }}</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="px-20px">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm(ruleFormRef)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElLoading } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import API from '@/api/index'
import { useWallet } from 'solana-wallets-vue'
import { useContract } from '@/hooks/useContract'
import { createColor, descHandle } from '@/hooks/useCreateColor'
import _ from 'lodash'

const { publicKey } = useWallet()
const { callContract } = useContract()
const exampleFileList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const disabled = ref(false)
const dialogFormVisible = ref(false)
const tableLoading = ref(false)

onMounted(async () => {
  setTimeout(() => {
    if (!publicKey.value) return
    getGenomes()
    getNFTByCreator()
  }, 500)
})
const getGenomes = async () => {
  const { status, code, data } = await API.getGenomes()
  if (code === 200) {
    dialogFormVisible.value = false
    exampleFileList.value = data
  }
}
const saveNFTInfo = async (params: any) => {
  const { status, code, data } = await API.saveNFTInfo(params)
  if (code === 200) {
    getNFTByCreator()
    ElMessage({
      message: 'Add success',
      type: 'success',
    })
  } else {
    ElMessage({
      message: 'Add fail',
      type: 'error',
    })
  }
}
const getNFTByCreator = async () => {
  tableLoading.value = true
  const params: any = {
    page: currentPage.value,
    creator: publicKey?.value?.toString(),
  }
  formInline.category && (params.nftSymbol = formInline.category)
  const { status, code, data } = await API.getNFTByCreator(params)
  if (code === 200) {
    const { results, totalResults } = _.get(data, 'data', {})
    total.value = totalResults
    tableData.value = results
  }
  tableLoading.value = false
}
const downloadFile = (file: { value: string; uri: string }) => {
  let link = document.createElement('a') // 创建a标签
  link.href = file.uri.includes('http') ? file.uri : `http://${file.uri}`
  link.download = file.value // 重命名文件
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const exampleFile = computed(() => {
  let _list: any = exampleFileList.value.find(
    (i: { label: string; description: string; child: [] }) =>
      i.label.toLowerCase() === form.category
  )
  const res = _list
    ? _list.child.reduce(
        (prev: [], cur: { label: string; description: string; child: [] }) => {
          return cur.child ? [...prev, ...cur.child] : [...prev, cur]
        },
        []
      )
    : ''
  return res.slice(0, 2)
})

let tableData = ref([])
let ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<any>>({
  category: [
    {
      required: true,
      message: 'Please select category',
      trigger: ['blur', 'change'],
    },
  ],
  institution: [
    {
      required: true,
      message: 'Please select institution',
      trigger: ['blur', 'change'],
    },
  ],
  // desc: [
  //   {
  //     required: true,
  //     message: 'Please input description',
  //     trigger: ['blur', 'change'],
  //   },
  // ],
  fileList: [
    {
      required: true,
      message: 'Please upload attachment',
      trigger: ['blur', 'change'],
    },
  ],
})
const closed = () => {
  form.category = ''
  form.desc = ''
  form.institution = ''
  form.fileList = []
}

const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const loadingInstance = ElLoading.service({ fullscreen: true })
      const { status, code, data } = await API.sampleCollection({
        address: publicKey?.value?.toString(),
        sampleType: form.category,
        manufacturer: form.institution,
        files: form.fileList[0].raw,
      })

      if (code === 200) {
        try {
          await callContract(data)
          await saveNFTInfo({
            nftSymbol: form.category, //支持的类别  phages  viruses  bacteria  fungi
            creator: publicKey?.value?.toString(), //用户的账户地址(公钥)
            cid: data.cid, //数据上传接口返回值，填入即可
            url: data.url, //数据上传接口返回值，填入即可
            agct: data.agct, //数据上传接口返回值，填入即可
            gcContent: data.gcContent, //数据上传接口返回值，填入即可
            desc: form.desc,
          })
          // createColor(data)
        } catch (error) {
          ElMessage({
            message: 'Add fail',
            type: 'error',
          })
        }
        dialogFormVisible.value = false
      } else {
        ElMessage.error('Add failure')
      }
      loadingInstance.close()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const randomColor = (val: string): string => {
  let suffix = ''
  switch (val.toLowerCase()) {
    case 'a':
      suffix = '1'
      break
    case 'g':
      suffix = '4'
      break
    case 'c':
      suffix = '9'
      break
    case 't':
      suffix = 'e'
      break

    default:
      break
  }
  // let random = Math.random()
  // if (random === 0) {
  //   return randomColor(val)
  // }
  // return '#' + random.toString(16).substring(2, 7) + suffix
  return suffix
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
const formInline = reactive({
  keyword: '',
  category: '',
  date: '',
})
let form = reactive({
  category: '',
  // desc: '',
  desc: '',
  institution: '',
  fileList: ref<UploadUserFile[]>([]),
})

const validWallet = () => {
  if (!publicKey.value) {
    ElMessage({
      message: 'Please connect wallet',
      type: 'warning',
    })
    return false
  }
  return true
}

const onSearch = () => {
  if (!validWallet()) return
  getNFTByCreator()
}
const addHandle = () => {
  if (!validWallet()) return
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
const institutionOptions: any[] = [
  {
    label: 'Medical treatment',
    value: 'medicalTreatment',
  },
  {
    label: 'Manufacturer',
    value: 'manufacturer',
  },
]
</script>
<style lang="less">
</style>
<style lang="less" scoped>
</style>