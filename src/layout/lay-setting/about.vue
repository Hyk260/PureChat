<template>
  <div>
    <div class="ui-row flex-bc">
      <div class="flex">
        <div>
          <img src="@/assets/images/log.png" class="min-h-52 min-w-52" alt="log" />
        </div>
        <div class="ui-col flex items-start flex-col">
          <div class="col-title">PureChat</div>
          <div class="version">
            <ElTag type="primary">v{{ version }}</ElTag>
          </div>
        </div>
      </div>
      <div class="flex">
        <ElButton @click="openDocs"> {{ $t("settings.about.releases.title") }} </ElButton>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script setup lang="ts">
import { openWindow } from "@/utils/common"
const { version, docs } = __APP_INFO__.pkg

function openDocs() {
  openWindow(`${docs}/other/logs.html`)
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
