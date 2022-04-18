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
            prefix-icon="el-icon-search"
            v-model="filterText"
            @change="filter(filterText)"
          ></el-input>
          <el-tree
            ref="Tree"
            :data="data"
            show-checkbox
            node-key="id"
            @check="checkBox"
            :props="defaultProps"
          />
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
              style="max-width: 460px"
            >
              <el-form-item label="标题">
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
              <el-form-item label="路径">
                <el-input v-model="formLabelAlign.path" />
              </el-form-item>
              <el-form-item label="图标">
                <!-- <el-input v-model="formLabelAlign.icon" /> -->
                <el-select
                  v-model="value"
                  class="m-2"
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

const labelPosition = ref('right')
const Tree = ref(null)
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
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
]
const store = useStore()
const filterText = ref('')

const data = computed(() => {
  return store.state.data.Routingtable
})
// watch(
//   () => filterText.value,
//   (val) => {
//     console.log(val)
//     // Tree.value.filter(val)
//   }
// )

function filter(val) {
  // Tree.value.data.label.filter(val)
  // console.log(Tree.value.data)
}

// 选中时触发
function checkBox(node, key) {
  // console.log(node.meta)
  const { label, meta, path } = node
  const { icon } = meta
  formLabelAlign.name = label
  formLabelAlign.path = path
  value.value = icon
}

// function changeTree(node,attribute,event){
//   console.log(node,attribute,event)
// }
// 保存修改
function onSubmit() {
  ElMessageBox.confirm('是否保存修改?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {})
    .catch(() => {})
}
// 全部收起
function Putall() {
  const tree = data.value
  tree.map((t, i) => {
    Tree.value.store.nodesMap[tree[i].id].expanded = false
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
</style>
<style lang="scss" scoped>
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