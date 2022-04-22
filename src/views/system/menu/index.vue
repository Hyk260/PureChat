<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-row class="mb-4">
          <el-button
            size="small"
            plain
          >添加菜单</el-button>
          <el-button
            @click="Putall"
            size="small"
            plain
          >全部收起</el-button>
          <el-button
            size="small"
            type="danger"
          >删除</el-button>
        </el-row>
        <div class="common-box">
          <el-input
            class="me-input"
            placeholder="输入菜单名称搜索"
            v-model="filterText"
            clearable
          ></el-input>
          <el-tree
            ref="treeRef"
            class="filter-tree"
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            @check="checkBox"
            :props="defaultProps"
            :filter-node-method="filterNode"
          >
            <template #default="scope">
              <div class="custom-node">
                <FontIcon
                  v-if="scope.data.meta.icon"
                  :iconName="scope.data.meta.icon"
                />
                <span>{{scope.node.label}}</span>
              </div>
            </template>
          </el-tree>
        </div>
      </el-aside>
      <el-main>
        <el-row class="mb-4">
          编辑菜单：角色权限管理
        </el-row>
        <div class="Edit-menu">
          <el-alert
            title="从菜单列表选择一项后,进行编辑"
            :closable="false"
          />
          <!-- close-text="知道了" -->
          <el-row>
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="formLabelAlign"
            >
              <el-form-item label="标题">
                <el-input
                  v-model="formLabelAlign.name"
                  disabled
                />
              </el-form-item>
              <el-form-item label="路径">
                <el-input
                  v-model="formLabelAlign.path"
                  disabled
                />
              </el-form-item>
              <el-form-item label="图标">
                <!-- <el-input v-model="formLabelAlign.icon" /> -->
                <el-select
                  v-model="value"
                  class="m-2 year"
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
                <el-button
                  type="primary"
                  @click="onSubmit"
                >保存修改</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import FontIcon from '@/layout/FontIcon/indx.vue'

import { updateMenu } from '@/api/user'

const labelPosition = ref('right')
const treeRef = ref(null)

const state = reactive({
  treeData: null,
})
const value = ref('')
const defaultProps = {
  children: 'children',
  label: 'label',
}
const formLabelAlign = reactive({
  name: '',
  path: '',
  icon: '',
})

const store = useStore()
const filterText = ref('')

const data = computed(() => {
  return store.state.data.Routingtable
})
watch(filterText, (val) => {
  treeRef.value.filter(val)
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
// 选中时触发
function checkBox(node, key) {
  console.log(node)
  state.treeData = node
  const { label, meta, path } = node
  const { icon } = meta
  formLabelAlign.name = label
  formLabelAlign.path = path
  value.value = icon
}

// 保存修改
function onSubmit() {
  ElMessageBox.confirm('是否保存修改?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      modifyMenu()
    })
    .catch(() => {})
}

const modifyMenu = async () => {
  const { id, path, meta, componentName } = state.treeData
  const { title } = meta
  const icon = value.value
  const route = await updateMenu({ id, path, title, icon })
  route && store.dispatch('updateRoute', route)
}
// 全部收起
function Putall() {
  const tree = data.value
  tree.map((t, i) => {
    treeRef.value.store.nodesMap[tree[i].id].expanded = false
  })
}
</script>

<style>
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
.el-form .el-input {
  width: 500px;
}
</style>
<style lang="scss" scoped>
.custom-node {
  .el-icon {
    vertical-align: top;
  }
}

.year {
  ::v-deep .el-input__inner {
    background: url('~@/assets/images/log.png') no-repeat;
    background-size: 26px 26px;
    background-position: 0px 3px;
    padding: 0 0 0 26px;
    box-sizing: border-box;
    font-size: 14px;
  }
}
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside,
    .el-main {
      background: #fff;
    }
    .el-main {
      margin-left: 20px;
      padding: 0;
      .Edit-menu {
        padding: 0 17px;
      }
      .el-alert {
        margin: 24px 0 18px 0;
      }
      .mb-4 {
        height: 52px;
        display: flex;
        align-items: center;
      }
    }
    .el-aside {
      width: 536px;
      .el-input {
        margin: 24px 0 18px 0;
      }
      .common-box {
        padding: 0 17px;
      }
    }
    .mb-4 {
      padding: 12px 0 15px 17px;
      border-bottom: 1px solid #e8eaec;
    }
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