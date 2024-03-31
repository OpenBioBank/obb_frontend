<template>
  <div class="px-100px mt-30px">
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
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="Date" prop="date" />
      <el-table-column label="Category" prop="category" />
      <el-table-column label="Desc" prop="desc" />
      <el-table-column align="right" label="Operations" fixed="right" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
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
    date: '2016-05-03',
    category: 'urine',
    desc: 'xxxx xxx',
  },
  {
    date: '2016-05-02',
    category: 'saliva',
    desc: 'xxxx xxx',
  },
  {
    date: '2016-05-04',
    category: 'hair',
    desc: 'xxxx xxx',
  },
  {
    date: '2016-05-01',
    category: 'blood',
    desc: 'xxxx xxx',
  },
]
</script>
