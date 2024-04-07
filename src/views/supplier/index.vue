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
          <el-button type="primary" @click="onSearch">Query</el-button>
        </el-form-item>
      </el-form>
      <el-button class="w-150px" type="primary" @click="addHandle">Add</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-class-name='text-[#000] font-500'
      header-row-class-name='text-[#000] font-500'>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="Collection" prop="desc">
        <template #default="scope">
          <div class='grid grid-cols-4 grid-rows-4 w-80px h-80px rounded-6px overflow-hidden'>
            <div :style="`background:${color}`" v-for="(color,idx) in scope.row.colorList"
              :key="color" :class="`w-20px h-20px`">
            </div>
          </div>
          <!-- <img :src="scope.row.img" class="w-70px h-70px rounded-6px" alt=""> -->
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
      <el-form-item label="Detection coding" prop="detectionNum">
        <el-input v-model="form.detectionNum" />
      </el-form-item>
      <el-form-item label="Attachments" prop="fileList">
        <div class="flex-between w-full">
          <el-upload v-model:file-list="form.fileList" class="upload-demo flex-1 overflow-hidden"
            multiple :limit="1" action="#" :auto-upload="false" :on-preview="handlePreview"
            :on-remove="handleRemove">
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

const { publicKey } = useWallet()
const { callContract } = useContract()
const exampleFileList = ref([])
const currentPage = ref(4)
const pageSize = ref(100)
const total = ref(0)
const small = ref(false)
const disabled = ref(false)
const dialogFormVisible = ref(false)
onMounted(async () => {
  const { status, code, data } = await API.getGenomes()
  if (code === 200) {
    dialogFormVisible.value = false
    exampleFileList.value = data
  }
})
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
      i.label === form.category
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

const tableData: any[] = reactive([])
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
  detectionNum: [
    {
      required: true,
      message: 'Please input Detection coding',
      trigger: ['blur', 'change'],
    },
  ],
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
  form.detectionNum = ''
  form.institution = ''
  form.fileList = []
}
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const loadingInstance = ElLoading.service({ fullscreen: true })
      const { status, code, data } = await API.sampleCollection({
        sampleType: form.category,
        manufacturer: form.institution,
        code: form.detectionNum,
        files: form.fileList[0].raw,
      })

      if (code === 200) {
        try {
          await callContract(data)
          ElMessage({
            message: 'Add success',
            type: 'success',
          })
          nftImgHandle(data)
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
      suffix = '2'
      break
    case 'c':
      suffix = '3'
      break
    case 't':
      suffix = '4'
      break

    default:
      break
  }
  let random = Math.random()
  if (random === 0) {
    return randomColor(val)
  }
  return '#' + random.toString(16).substring(2, 7) + suffix
}

const nftImgHandle = (data: any) => {
  const agct = data.agct
  const colorList = agct.split('').map((i: string) => randomColor(i))
  data.colorList = colorList
  tableData.unshift(data)
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
  detectionNum: '',
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
  callContract({
    message: 'upload success!',
    url: 'https://green-sad-canidae-844.mypinata.cloud/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH',
    agct: 'ATTAAAGGTTTATACC',
    gcContent: '37.97%',
    timestamp: 1712392721929,
  })
  return
  if (!validWallet()) return
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
    label: 'Bacteria',
    value: 'Bacteria',
  },
  {
    label: 'Fungi',
    value: 'Fungi',
  },
  {
    label: 'Phages',
    value: 'Phages',
  },
  {
    label: 'Viruses',
    value: 'Viruses',
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