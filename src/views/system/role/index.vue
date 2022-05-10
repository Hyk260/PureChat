<template>
  <div>

    <div class="Role-top">
      <el-form label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="角色名称">
          <el-input v-model="formLabelAlign.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色标识">
          <el-input v-model="formLabelAlign.region" placeholder="请输入角色标识" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
      </el-form>
    </div>

    <div class="role-header">
      <header>
        <p>
          角色列表
        </p>
        <div>
          <el-button type="primary" @click="AddRoleBtn">新增角色</el-button>
          <el-button v-show="ShowDelBtn" type="danger" @click="Deletelot">删除角色</el-button>
        </div>
      </header>
      <el-table tooltip-effect="dark" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="info" label="说明" width="180" />

        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="更新时间" width="180">
          <template #default="scope">
            {{formatTime(scope.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="isDefaultRole" label="角色类型" width="180">
          <template #default="scope">
            <el-tag :type="scope.row.isDefaultRole? 'primary' : 'success'">
              {{scope.row.isDefaultRole?'内置':'自定义'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button type="text" size="small" @click="DelColumn(scope,tableData)">删除</el-button>
            <el-button type="text" size="small" @click="ModifyBtn(scope,tableData)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
    </div>
    <!-- 弹框 -->
    <el-dialog v-model="dialogFormVisible" :title="infoText? '添加角色':'编辑角色'">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="说明" prop="info">
          <el-select v-model="ruleForm.info" placeholder="角色类型">
            <el-option label="普通用户" value="普通用户" />
            <el-option label="管理员" value="管理员" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="Age"
          prop="age"
        >
          <el-input v-model.number="ruleForm.age" />
        </el-form-item> -->
      </el-form>
      <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">
            重置
          </el-button>
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="determine(infoText,ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
  import { ElMessageBox } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { successMessage } from '@/utils/message'
  import { getRoles, addRoles, deleteRoles, updateRoles } from '@/api/roles'

  import { formatTime } from '@/utils/filter'

  const ruleFormRef = ref()
  const tableData = ref([])
  const dialogTableVisible = ref(false)
  const dialogFormVisible = ref(false)
  const infoText = ref(true)
  const ShowDelBtn = ref(false)

  const ruleForm = reactive({
    id: '',
    name: '',
    info: '',
    age: '',
    region: '',
    ids: ''
  })
  const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
  })
  // const formLabel = reactive({
  //   name: '',
  //   info: '',
  //   type: '',
  // })

  const rules = reactive({
    name: [{ validator: checkName, trigger: 'blur' }],
    info: [{ validator: checkInfo, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
  })
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })

  function handleSelectionChange(val) {
    console.log(val)
    ShowDelBtn.value = val.length > 0
    ruleForm.ids = val.map(t => t.id)
    console.log(ruleForm.ids)
  }
  const AddRoleBtn = () => {
    dialogFormVisible.value = true
    infoText.value = true
  }
  // 添加修改角色 确定按钮
  const determine = (off, formEl) => {
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')

        off ? Addrole() : ModifyRoles()
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  // 添加角色
  const Addrole = async () => {
    const { code, msg } = await addRoles({
      roleName: ruleForm.name,
      info: ruleForm.info,
      isDefaultRole: false,
    })
    if (code === 200) {
      successMessage(msg)
      getRolesList()
    }
    dialogFormVisible.value = false
    resetForm(ruleFormRef.value)
  }
  // 修改角色
  const ModifyRoles = async () => {
    const { code, msg } = await updateRoles({
      id: ruleForm.id,
      roleName: ruleForm.name,
      info: ruleForm.info,
      isDefaultRole: false,
    })
    if (code === 200) {
      successMessage(msg)
      getRolesList()
      resetForm(ruleFormRef.value)
      dialogFormVisible.value = false
    } else {
      dialogFormVisible.value = false
    }
    console.log(ruleForm)
  }
  // 删除单列
  const DelColumn = (index, data) => {
    const { $index, row } = index
    const { roleName, id } = row
    ElMessageBox.confirm(`确认删除角色 ${roleName || ''} 吗?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        console.log(row)
        // data.splice($index, 1)
        delRoles([id])
      })
      .catch(() => {})
  }

  const delRoles = async (id) => {
    const { code, msg } = await deleteRoles({ ids: id })
    if (code === 200) {
      successMessage(msg)
      getRolesList()
    } else {
      successMessage(msg)
    }
    console.log(code, msg)
  }
  // 多选删除
  const Deletelot = () => {
    delRoles(ruleForm.ids)
  }
  // 修改按钮
  const ModifyBtn = (index, data) => {
    const { $index, row } = index
    const { roleName, id, info } = row
    dialogFormVisible.value = true
    infoText.value = false

    ruleForm.name = roleName
    ruleForm.info = info
    ruleForm.id = id
  }
  // 初始化表格数据
  const getRolesList = async () => {
    let { code, result } = await getRoles()
    if (code === 200) {
      tableData.value = result
    }
  }
  getRolesList()

  function filterTag(value, row) {
    return row.isDefaultRole === value
  }

  const checkAge = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else {
        if (value < 18) {
          callback(new Error('Age must be greater than 18'))
        } else {
          callback()
        }
      }
    }, 1000)
  }

  const checkName = (rule, value, callback) => {
    console.log(value)
    if (value === '') {
      callback(new Error('必传参数'))
    } else {
      callback()
    }
  }

  const checkInfo = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('必传参数'))
    } else {
      callback()
    }
  }

  /**
   * 表单内容重置
   */
  const resetForm = (formEl) => {
    if (!formEl) return
    console.log(formEl, '重置')
    formEl.resetFields()
  }
</script>
<style scoped>
  .el-button--text {
    margin-right: 15px;
  }

  .el-select {
    width: 300px;
  }

  .el-input {
    width: 300px;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss" scoped>
  .Role-top {
    background: var(--color-body-bg);

    .el-form {
      max-width: 100% !important;
      display: flex;
      width: 100%;
      padding-top: 16px;

      .el-input {
        width: auto;
      }
    }

    .el-form-item {
      display: inline-flex;
      vertical-align: middle;
      margin-right: 32px;
    }
  }

  .role-header {
    margin-top: 24px;

    header {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 8px;
      background: var(--color-body-bg);
    }

    .el-table--fit {
      padding: 0 8px;
    }
  }
</style>