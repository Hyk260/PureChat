<template>
  <el-scrollbar>
    <el-card class="style-header" shadow="never">
      <template #header>
        <div>
          <span class="name"> PureChat </span>
        </div>
      </template>
      <span class="describe"> 聊天应用与AI开发框架 </span>
    </el-card>
    <!-- 项目信息 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>项目信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="item in data"
          :key="item.label"
          :label="item.label"
          label-align="left"
          align="left"
        >
          <el-tag v-if="item?.tag">{{ item.tag }}</el-tag>
          <a v-else-if="item?.url" :href="item.url" target="_blank">
            <span class="style-color"> {{ item.title }} </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 生产环境依赖 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>生产环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          v-for="(item, index) in schema"
          :key="index"
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
        >
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 开发环境依赖 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>开发环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          v-for="(item, index) in devSchema"
          :key="index"
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
        >
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from "vue"
const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, repository, version, docs } = pkg

const schema = []
const devSchema = []

const data = [
  {
    label: "版本",
    tag: version,
  },
  {
    label: "最后编译时间",
    tag: lastBuildTime,
  },
  {
    label: "文档地址",
    url: docs,
    title: "文档地址",
  },
  {
    label: "QQ交流群",
    url: "https://jq.qq.com/?_wv=1027&k=Cd4Ihd2J",
    title: "点击链接加入群聊【PureChat交流群】",
  },
  {
    label: "Github",
    url: repository.url,
    title: "Github",
  },
  {
    label: "gitee",
    url: "https://gitee.com/H260788/PureChat",
    title: "gitee",
  },
  {
    label: "更新日志",
    url: `${docs}/other/logs.html`,
    title: "更新日志",
  },
]

const words = [
  "markdown-it",
  "unocss",
  "pinia",
  "vite",
  "mitt",
  "axios",
  "dayjs",
  "vue",
  "lodash-es",
  "element-plus",
  "vue-i18n",
  "vue-router",
  "sass",
]

const getMainLabel = computed(() => (label) => {
  return words.includes(label) ? "main-label" : null
})

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: dependencies[key], label: key })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: devDependencies[key], label: key })
})
</script>

<style scoped lang="scss">
:deep(.main-label) {
  font-size: 16px !important;
  color: var(--el-color-danger) !important;
}
.style-color {
  color: var(--el-color-primary);
}
.style-card {
  margin: 20px !important;
}
.style-header {
  .name {
    font:
      bold 100% Consolas,
      Monaco,
      monospace;
  }
  .describe {
    font-size: 15px;
  }
}
</style>
