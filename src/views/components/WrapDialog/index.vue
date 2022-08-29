<template>
   <!-- 弹框 -->
    <el-dialog v-model="dialogFormVisible" :title="IofoText">
      <!-- <el-form
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
      </el-form> -->

      <!-- <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="说明"
          prop="info"
        >
          <el-select
            v-model="ruleForm.info"
            placeholder="角色类型"
          >
            <el-option
              label="普通用户"
              value="普通用户"
            />
            <el-option
              label="管理员"
              value="管理员"
            />
          </el-select>
        </el-form-item>
      </el-form> -->

      <slot name="menu"></slot>
   
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)" v-if="DisplayBtn"> 
            重置 
          </el-button>
          <el-button @click="dialogFormVisible = false">
            取消 
          </el-button>
          <el-button type="primary" @click="determine(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
import FontIcon from "@/layout/FontIcon/indx.vue";

const props = defineProps({
  IofoText: {
    type: String,
    default: "标题",
    required: false,
  },
  // 确定按钮回调函数
  Callback: {
    type: Function,
    default: () => {},
  },
  // 显示隐藏重置按钮
  DisplayBtn: {
    type: Boolean,
    default: false,
  }
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

// 校验规则
const rules = reactive({
  name: [{ required: true, message: "请输入标题", trigger: "blur" }],
  path: [{ required: true, message: "请输入路径", trigger: "blur" }],
  icon: [],
  component: [{ required: true, message: "请输入组件名", trigger: "blur" }],
});

const ruleFormRef = ref();
const dialogFormVisible = ref(false);
const { IofoText, DisplayBtn, Callback } = toRefs(props);

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 弹框确定按钮
const determine = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      dialogFormVisible.value = false;
      Callback.value(ruleForm)
    } else {
      return false;
    }
  });
};

defineExpose({ dialogFormVisible });
</script>

<style lang="scss" scoped>
.year {
  :deep(.el-input__inner) {
    background: url("~@/assets/images/log.png") no-repeat;
    background-size: 26px 26px;
    background-position: 0px 3px;
    padding: 0 0 0 26px;
    box-sizing: border-box;
    font-size: 14px;
  }
  :deep(.el-input)  {
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