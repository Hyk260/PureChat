<template>
  <el-scrollbar>
    <div class="content-wrap">
      <el-row :gutter="20">
        <el-col :span="10">
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
                  v-if="showDelBtn"
                >
                  删除
                </el-button>
              </div>
            </template>
            <el-skeleton animated :rows="14" :loading="false">
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
        <el-col :span="14">
          <el-card>
            <template #header>
              <div class="style-header">
                <span> 编辑菜单 </span>
              </div>
            </template>
            <el-skeleton animated :rows="14" :loading="false">
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
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
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

const state = reactive({
  treeData: null,
  checkedKeys: null,
});
/**
 * 修改菜单数据
 * */
const formLabelAlign = reactive({
  ID: "",
  name: "",
  path: "",
  icon: "",
  component: "",
});
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

// 校验规则
const rules = reactive({
  name: [{ required: true, message: "请输入标题", trigger: "blur" }],
  path: [{ required: true, message: "请输入路径", trigger: "blur" }],
  icon: [],
  component: [{ required: true, message: "请输入组件名", trigger: "blur" }],
});

const ruleFormText = {
  title: "标题",
  path: "路径",
  component: "组件",
  icon: "图标",
};
// 新增菜单数据
const ruleForm = reactive({
  title: "测试",
  path: "/system1",
  component: "System",
  icon: "Folder",
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const { routingtable } = useState({
  routingtable: (state) => state.data.Routingtable,
});

watch(filterText, (val) => {
  treeRef.value.filter(val);
  // console.log(treeRef.value)
});

const Reset = () => {};

// 添加菜单按钮
const addMenuBtn = () => {
  // dialogFormVisible.value = true
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
.el-card {
  min-width: 300px;
}
.custom-node {
  .el-icon {
    vertical-align: top;
  }
}
.style-tree,
.style-menu {
  min-height: 490px;
}
.input-style,
.el-alert {
  margin-bottom: 10px;
}
.el-alert{
  height: 32px;
}
.style-header {
  height: 26px;
  line-height: 26px;
}
.year {
  :deep(.el-input__inner) {
    background: url("~@/assets/images/log.png") no-repeat;
    background-size: 26px 26px;
    background-position: 0px 3px;
    padding: 0 0 0 26px;
    box-sizing: border-box;
    font-size: 14px;
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
</style>
