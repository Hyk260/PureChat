<template>
  <el-scrollbar>
    <el-card class="style-header" shadow="never">
      <template #header>
        <div>
          <span class="name"> {{ $config.Title }} </span>
        </div>
      </template>
      <span class="describe"> {{ $config.Title }} 是一个基于Vue3、Element-Plus的聊天工作室 </span>
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
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
          v-for="(item, index) in schema"
          :key="index"
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
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
          v-for="(item, index) in devSchema"
          :key="index"
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

<script setup>
import { computed } from "vue";
const { repository } = require("../../../package.json");
const APP_INFO = JSON.parse(window.__APP_INFO__);
const { pkg, lastBuildTime } = APP_INFO;
const { dependencies, devDependencies, version } = pkg;

const schema = [];
const devSchema = [];

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
    url: "https://hyk260.github.io/pure-docs",
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
    url: "https://hyk260.github.io/pure-docs/other/logs.html",
    title: "更新日志",
  },
];
const words = [
  "@babel/core",
  "@vue/cli-service",
  "@vue/cli-plugin-eslint",
  "@babel/eslint-parser",
  "@vue/cli-plugin-babel",
  "@vue/cli-plugin-router",
  "@vue/cli-plugin-vuex",
  "@vue/compiler-sfc",
  "@vue/eslint-config-prettier",
  "@vueuse/core",
  "eslint-config-prettier",
  "eslint-plugin-prettier",
  "eslint-plugin-vue",
  "mitt",
  "axios",
  "vuex",
  "dayjs",
  "vue",
  "lodash-es",
  "element-plus",
  "vue-i18n",
  "vue-router",
  "eslint",
  "prettier",
  "sass",
  "sass-loader",
];

const getMainLabel = computed(() => (label) => {
  return words.includes(label) ? "main-label" : null;
});

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: dependencies[key], label: key });
});

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: devDependencies[key], label: key });
});
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
    font: bold 100% Consolas, Monaco, monospace;
  }
  .describe {
    font-size: 15px;
  }
}
</style>
