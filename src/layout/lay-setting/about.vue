<template>
  <div>
    <div class="ui-row flex-bc">
      <div class="flex">
        <div>
          <img src="@/assets/images/log.png" class="min-h-52 min-w-52" alt="log" />
        </div>
        <div class="ui-col flex items-start flex-col">
          <div class="col-title">{{ VITE_APP_NAME }}</div>
          <div class="version">
            <el-tag type="primary">v{{ version }}</el-tag>
          </div>
        </div>
      </div>
      <div class="flex">
        <el-button @click="openDocs"> {{ $t("settings.about.releases.title") }} </el-button>
        <!-- <el-button> 检查更新 </el-button> -->
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script setup>
import { openWindow } from "@/utils/common";
const { VITE_APP_NAME } = import.meta.env;
const { version, docs } = __APP_INFO__.pkg;

function openDocs() {
  openWindow(`${docs}/other/logs.html`);
}
</script>

<style lang="scss" scoped>
.ui-row {
  img {
    height: 52px;
    height: 52px;
  }
  .ui-col {
    margin-left: 1rem;
    .col-title {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 30px;
    }
    .version {
      margin-top: 0.25rem;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
