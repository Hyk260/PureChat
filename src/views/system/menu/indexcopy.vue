<template>
  <el-scrollbar>
    <div class="content-wrap select-none">
      <el-row :gutter="20">
        <!-- 菜单列表 -->
        <el-col :span="10" class="style-el-col">
          <el-card>
            <template #header>
              <div class="style-header">
                <el-button size="small" plain @click="addMenuBtn">
                  添加菜单
                </el-button>
                <el-button size="small" plain @click="Putall(isExpand)">
                  {{ isExpand ? "全部展开" : " 全部收起" }}
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="delMenuBtn"
                  v-show="showDelBtn"
                >
                  删除
                </el-button>
              </div>
            </template>
            <el-skeleton animated :rows="12" :loading="loading">
              <template #default>
                <div>
                  <div class="input-style">
                    <el-input
                      class="me-input"
                      placeholder="输入菜单名称搜索"
                      v-model="filterText"
                      clearable
                    >
                    </el-input>
                  </div>
                  <el-scrollbar>
                    <div class="style-tree">
                      <el-tree
                        ref="treeRef"
                        class="filter-tree"
                        :data="routingtable"
                        show-checkbox
                        accordion
                        highlight-current
                        default-expand-all
                        node-key="id"
                        @node-click="nodeClick"
                        @check="checkBox"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                      >
                        <template #default="scope">
                          <div class="custom-node">
                            <FontIcon :iconName="scope.data.meta.icon" />
                            <span>{{ scope.node.label }}</span>
                          </div>
                        </template>
                      </el-tree>
                    </div>
                  </el-scrollbar>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>
        <!-- 编辑菜单 -->
        <el-col :span="14" class="style-el-col">
          <el-card>
            <template #header>
              <div class="style-header">
                <span> 编辑菜单 </span>
              </div>
            </template>
            <el-skeleton animated :rows="12" :loading="loading">
              <template #default>
                <!-- close-text="知道了" -->
                <el-alert
                  title="从菜单列表选择一项后,进行编辑"
                  :closable="false"
                />
                <div class="style-menu">
                  <el-form
                    ref="ruleLabelRef"
                    :label-position="labelPosition"
                    label-width="100px"
                    :model="formLabelAlign"
                  >
                    <el-form-item label="标题" prop="name">
                      <el-input v-model="formLabelAlign.name" disabled />
                    </el-form-item>
                    <el-form-item label="路径" prop="path">
                      <el-input v-model="formLabelAlign.path" disabled />
                    </el-form-item>
                    <el-form-item label="组件" prop="component">
                      <el-input v-model="formLabelAlign.component" disabled />
                    </el-form-item>
                    <el-form-item label="图标" prop="icon">
                      <el-select
                        v-model="formLabelAlign.icon"
                        class="year"
                        popper-class="style-select"
                        placeholder="请选择图标"
                      >
                        <el-option
                          class="dropdown"
                          v-for="item in ElIcons"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name"
                        >
                          <FontIcon :iconName="item.name" />
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">
                        保存修改
                      </el-button>
                      <el-button @click="Reset" v-show="false">重置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-col>
      </el-row>
      <!-- 弹框 -->
      <el-dialog v-model="dialogFormVisible" :title="'添加菜单'">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            :label="ruleFormText.title"
            prop="title"
            placeholder="请输入标题"
          >
            <el-input v-model="ruleForm.title" autocomplete="off" />
          </el-form-item>
          <el-form-item
            :label="ruleFormText.path"
            prop="path"
            placeholder="请输入路径"
          >
            <el-input v-model="ruleForm.path" />
          </el-form-item>
          <el-form-item
            :label="ruleFormText.component"
            prop="component"
            placeholder="请输入组件名"
          >
            <el-input v-model="ruleForm.component" />
          </el-form-item>
          <el-form-item :label="ruleFormText.icon" prop="icon">
            <el-select
              v-model="ruleForm.icon"
              class="year"
              popper-class="style-select"
              placeholder="请选择图标"
            >
              <el-option
                class="dropdown"
                v-for="item in ElIcons"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
                <FontIcon :iconName="item.name" />
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm(ruleFormRef)"> 重置 </el-button>
            <el-button @click="dialogFormVisible = false"> 取消 </el-button>
            <el-button type="primary" @click="determine(ruleFormRef)">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useState } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { ElMessageBox } from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import { updateMenu, AddMenu, getMenu, DeleteMenu } from "@/api/menu";
import { Message, errorMessage, warnMessage } from "@/utils/message";

const defaultProps = {
  children: "children",
  label: "label",
};

const ruleFormText = {
  title: "标题",
  path: "路径",
  component: "组件",
  icon: "图标",
};

const state = reactive({
  treeData: null,
  checkedKeys: null,
});
//修改菜单数据
const formLabelAlign = reactive({
  ID: "",
  name: "",
  path: "",
  icon: "",
  component: "",
});
// 新增菜单数据
const ruleForm = reactive({
  title: "测试",
  path: "/system1",
  component: "System",
  icon: "Folder",
});

// 校验规则
const rules = reactive({
  name: [{ required: true, message: "请输入标题", trigger: "blur" }],
  path: [{ required: true, message: "请输入路径", trigger: "blur" }],
  icon: [],
  component: [{ required: true, message: "请输入组件名", trigger: "blur" }],
});

const loading = ref(true);
const showDelBtn = ref(false);
const isExpand = ref(false);
const ruleLabelRef = ref();
const ruleFormRef = ref();
const labelPosition = ref("right");
const filterText = ref("");
const treeRef = ref(null);
const dialogFormVisible = ref(false);
const dialogRef = ref(null);
const { dispatch, commit } = useStore();
const { routingtable } = useState({
  routingtable: (state) => state.data.Routingtable,
});

watch(filterText, (val) => {
  treeRef.value.filter(val);
  // console.log(treeRef.value)
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const Reset = () => {};

// 添加菜单按钮
const addMenuBtn = () => {
  dialogFormVisible.value = true;
};
// 全部收起
const Putall = (val) => {
  const tree = routingtable.value;
  isExpand.value = !isExpand.value;
  tree.map((t, i) => {
    treeRef.value.store.nodesMap[tree[i].id].expanded = val;
  });
};

const delMenuBtn = () => {
  const {
    meta: { modify, title },
  } = state.treeData;
  if (modify) return warnMessage("没有权限删除系统菜单!");
  ElMessageBox.confirm(`是否删除菜单 ${title}?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delMenu();
    })
    .catch(() => {});
};
// 删除菜单
const delMenu = async () => {
  const Keys = state.checkedKeys;
  let ids = [formLabelAlign.ID];
  const result = await DeleteMenu({ ids });
  if (result) {
    update(result);
  } else {
    errorMessage("删除失败");
  }
};
const update = async (menu) => {
  // console.log(menu)
  await dispatch("updateRoute", menu);
};
const nodeClick = (data) => {
  console.log(data);
};
// 弹框确定按钮
const determine = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      dialogFormVisible.value = false;
      newlyAddeMenu();
    } else {
      return false;
    }
  });
};
// 新建菜单
const newlyAddeMenu = async () => {
  // const { icon, title, path } = data
  // 根目录ID
  let RootDir = "d17d701b-6257-40bd-a6c3-a4672d4823d4";
  // 默认根目录新建 || 自选目录
  const ID = state.checkedKeys;
  if (ID?.length > 0 && showDelBtn.value) {
    RootDir = formLabelAlign.ID;
  }
  console.log(RootDir);
  const datas = await AddMenu({
    parentId: RootDir,
    path: ruleForm.path,
    title: ruleForm.title,
    icon: ruleForm.icon,
    componentName: "System",
  });
  datas && update(datas);
};
const checkBox = (node, key) => {
  console.log(node, key);
  const { checkedKeys } = key;
  const { id, label, meta, path, componentName } = node;
  const { icon } = meta;
  state.treeData = node;
  state.checkedKeys = checkedKeys;
  const exist = checkedKeys.length > 0;
  // 显示隐藏删除按钮
  showDelBtn.value = exist;
  if (exist) {
    formLabelAlign.ID = id;
    formLabelAlign.icon = icon;
    formLabelAlign.name = label;
    formLabelAlign.path = path;
    formLabelAlign.component = componentName;
  } else {
    resetForm(ruleLabelRef.value);
  }
};
const resetForm = (formEl) => {
  if (!formEl) return;
  console.log(formEl);
  formEl.resetFields();
};
// 修改菜单
const modifyMenu = async () => {
  // console.log(state.treeData)
  const { id, path, meta, componentName } = state.treeData;
  const { title } = meta;

  const { icon } = formLabelAlign;
  // console.log(icon)
  const route = await updateMenu({ id, path, title, icon });
  route && dispatch("updateRoute", route);
};
// 保存修改
const onSubmit = () => {
  if (!state.checkedKeys || state.checkedKeys?.length <= 0) {
    Message("从菜单列表选择一项后进行修改");
    return;
  }
  ElMessageBox.confirm("是否保存修改?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      modifyMenu();
    })
    .catch(() => {});
};
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>
<style lang="scss">
.style-select {
  background: #fff;

  .el-scrollbar__view {
    display: flex;
    flex-wrap: wrap;
  }

  .el-select-dropdown__item {
    padding: 0;
  }

  .el-select-dropdown {
    width: 400px;
  }
}
</style>
<style lang="scss" scoped>
.el-col {
  min-width: 300px;
}
.el-card {
  min-width: 300px;
}
.is-current {
  .custom-node {
    // background-color: #d5e8fc;
  }
}
.custom-node {
  .el-icon {
    vertical-align: bottom;
  }
  i {
    color: #2b4157;
  }
  span {
    margin-left: 3px;
  }
}
.style-tree,
.style-menu {
  min-height: 410px;
}
.input-style,
.el-alert {
  margin-bottom: 10px;
}
.el-alert {
  height: 32px;
}
.style-header {
  height: 26px;
  line-height: 26px;
}
.year {
  :deep(.el-input__inner) {
    // background: url("~@/assets/images/log.png") no-repeat;
    // background-size: 26px 26px;
    // background-position: 0px 3px;
    // padding: 0 0 0 26px;
    // box-sizing: border-box;
    // font-size: 14px;
  }

  :deep(.el-input) {
    width: 500px;
  }
}
.dropdown {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-node {
}
</style>
