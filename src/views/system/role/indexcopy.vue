<template>
  <el-scrollbar>
    <div class="content-wrap">
      <el-row>
        <el-col :span="24" style="margin-bottom: 24px">
          <el-card>
            <template #header>
              <div class="style-header">
                <el-form
                  label-width="100px"
                  :model="formLabelAlign"
                  class="flex"
                >
                  <el-form-item label="角色名称">
                    <el-input
                      v-model="formLabelAlign.name"
                      placeholder="请输入角色名称"
                    />
                  </el-form-item>
                  <el-form-item label="角色标识">
                    <el-input
                      v-model="formLabelAlign.region"
                      placeholder="请输入角色标识"
                    />
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-input v-model="formLabelAlign.type" />
                  </el-form-item>
                </el-form>
              </div>
            </template>
            <el-skeleton animated :rows="12" :loading="false">
              <template #default>
                <div class="mb-5">
                  <el-button size="small" plain @click="AddRoleBtn">
                    新增角色
                  </el-button>
                  <el-button
                    v-show="ShowDelBtn"
                    size="small"
                    type="danger"
                    @click="Deletelot"
                  >
                    删除角色
                  </el-button>
                </div>
                <!-- 表格 -->
                <el-table
                  border
                  height="410"
                  :data="tableData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" />
                  <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="200"
                  />
                  <el-table-column prop="info" label="说明" width="200" />
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="200"
                  >
                    <template #default="scope">
                      {{ formatTime(scope.row.createTime) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    sortable
                    width="200"
                  >
                    <template #default="scope">
                      {{ formatTime(scope.row.updateTime) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="isDefaultRole"
                    label="角色类型"
                    width="200"
                  >
                    <template #default="scope">
                      <el-tag :type="scope.row.isDefaultRole ? '' : 'success'">
                        {{ scope.row.isDefaultRole ? "内置" : "自定义" }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="DelColumn(scope, tableData)"
                      >
                        删除
                      </el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="ModifyBtn(scope, tableData)"
                      >
                        修改
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                  small
                  background
                  align="center"
                  class="mt-5"
                  :default-current-page="5"
                  :total="tableData.length"
                  :page-sizes="[10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handlePageChange"
                  layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>
      </el-row>
      <!-- 弹框 -->
      <el-dialog
        v-model="dialogFormVisible"
        :title="infoText ? '添加角色' : '编辑角色'"
      >
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              autocomplete="off"
              style="width: 216px"
            />
          </el-form-item>
          <el-form-item label="说明" prop="info">
            <el-select v-model="ruleForm.info" placeholder="角色类型">
              <el-option label="普通用户" value="普通用户" />
              <el-option label="管理员" value="管理员" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm(ruleFormRef)"> 重置 </el-button>
            <el-button @click="dialogFormVisible = false"> 取消 </el-button>
            <el-button type="primary" @click="determine(infoText, ruleFormRef)">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { getRoles, addRoles, deleteRoles, updateRoles } from "@/api/roles";
import { successMessage } from "@/utils/message";
import { warnMessage } from "@/utils/message";
import { formatTime } from "@/utils/filter";
import { chunk } from "lodash";
// import WrapDialog from "@/views/components/WrapDialog/index.vue";

const ruleFormRef = ref();
const tableData = ref([]);
const PageData = ref([]);
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const infoText = ref(true);
const ShowDelBtn = ref(false);

const ruleForm = reactive({
  id: "",
  name: "",
  info: "普通用户",
  age: "",
  region: "",
  ids: "",
});

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  info: [],
  age: [],
  // { validator: checkAge, trigger: "blur" }
});

function handleSelectionChange(val) {
  console.log(val);
  ShowDelBtn.value = val.length > 0;
  ruleForm.ids = val.map((t) => t.id);
  console.log(ruleForm.ids);
}
// 每页显示个数
function handleSizeChange(val) {
  console.log(val);
  PageData.value = chunk(tableData.value, val);
  // console.log(PageData.value)
}

function handlePageChange(val) {
  console.log(val);
  // tableData.value = PageData.value[val-1]
  // console.log(PageData.value)
}
const AddRoleBtn = () => {
  dialogFormVisible.value = true;
  infoText.value = true;
};
// 添加修改角色 确定按钮
const determine = (off, formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      off ? Addrole() : ModifyRoles();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
// 添加角色
const Addrole = async () => {
  const { code, msg } = await addRoles({
    roleName: ruleForm.name,
    info: ruleForm.info,
    isDefaultRole: false,
  });
  if (code === 200) {
    successMessage(msg);
    getRolesList();
  }
  dialogFormVisible.value = false;
  resetForm(ruleFormRef.value);
};
// 修改角色
const ModifyRoles = async () => {
  const { code, msg } = await updateRoles({
    id: ruleForm.id,
    roleName: ruleForm.name,
    info: ruleForm.info,
    isDefaultRole: false,
  });
  if (code === 200) {
    successMessage(msg);
    getRolesList();
    resetForm(ruleFormRef.value);
    dialogFormVisible.value = false;
  } else {
    dialogFormVisible.value = false;
  }
  console.log(ruleForm);
};
// 删除单列
const DelColumn = (index, data) => {
  const { $index, row } = index;
  const { roleName, id, isDefaultRole } = row;
  if (isDefaultRole) {
    warnMessage("内置用户不允许删除!");
    return;
  }
  ElMessageBox.confirm(`确认删除角色 ${roleName || ""} 吗?`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log(row);
      // data.splice($index, 1)
      delRoles([id]);
    })
    .catch(() => {});
};

const delRoles = async (id) => {
  const { code, msg } = await deleteRoles({ ids: id });
  if (code === 200) {
    successMessage(msg);
    getRolesList();
  } else {
    successMessage(msg);
  }
  console.log(code, msg);
};
// 多选删除
const Deletelot = () => {
  // delRoles(ruleForm.ids)
};
// 修改按钮
const ModifyBtn = (index, data) => {
  const { $index, row } = index;
  const { roleName, id, info } = row;
  dialogFormVisible.value = true;
  infoText.value = false;

  ruleForm.name = roleName;
  ruleForm.info = info;
  ruleForm.id = id;
};
// 初始化表格数据
const getRolesList = async () => {
  let { code, result } = await getRoles();
  if (code === 200) {
    console.log(result);
    tableData.value = result;
  }
};
getRolesList();

function filterTag(value, row) {
  return row.isDefaultRole === value;
}

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const checkName = (rule, value, callback) => {
  console.log(value);
  if (value === "") {
    callback(new Error("必传参数"));
  } else {
    callback();
  }
};

const checkInfo = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("必传参数"));
  } else {
    callback();
  }
};
// 表单内容重置
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.style-header {
  :deep(.el-form-item) {
    margin-bottom: 0px;
  }
}
</style>
