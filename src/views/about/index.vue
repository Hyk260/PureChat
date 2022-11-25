<template>
  <el-scrollbar>
    <el-card class="" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium"> 关于 </span>
        </div>
      </template>
      <span style="font-size: 15px">
        Pure-Admin 是一个基于Vue3、Element-Plus的后台管理模板
      </span>
    </el-card>
    <!-- <Motion :delay="100"> -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本" label-align="left" align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item
          label="最后编译时间"
          label-align="left"
          align="left"
        >
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="文档地址" label-align="left" align="left">
          <a href="#" target="_blank">
            <span class="style-color">文档地址</span>
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址" label-align="left" align="left">
          <a href="#" target="_blank">
            <span class="style-color">预览地址</span>
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="left" align="left">
          <a href="https://github.com/Hyk260" target="_blank">
            <span class="style-color">Github</span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- </Motion> -->
    <!-- <Motion :delay="200"> -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">生产环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.label"
          label-align="left"
          align="left"
          v-for="(item, index) in schema"
          :key="index"
        >
          <a
            :href="'https://www.npmjs.com/package/' + item.label"
            target="_blank"
          >
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- </Motion> -->
    <!-- <Motion :delay="300"> -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">开发环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.label"
          label-align="left"
          align="left"
          v-for="(item, index) in devSchema"
          :key="index"
        >
          <a
            :href="'https://www.npmjs.com/package/' + item.label"
            target="_blank"
          >
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- </Motion> -->
  </el-scrollbar>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import Motion from "@/utils/motion";

const { proxy } = getCurrentInstance();
const { dependencies, devDependencies, version } = proxy.__APP_INFO__;

const lastBuildTime = 345346;
const schema = [];
const devSchema = [];

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: dependencies[key], label: key });
});

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: devDependencies[key], label: key });
});
</script>

<style scoped lang="scss">
.style-color {
  color: var(--el-color-primary);
}
.style-card {
  margin: 20px !important;
}
</style>
