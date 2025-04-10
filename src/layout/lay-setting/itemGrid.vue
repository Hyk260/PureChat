<template>
  <div class="panel-wrapper w-full flex flex-col">
    <div class="title flex-bc">
      <span>{{ item.title }}</span>
      <el-icon @click="emit('onClose')"><CloseBold /></el-icon>
    </div>
    <div v-if="item.id === 'currency'">
      <ul class="setting w-full">
        <li>
          <span>{{ $t("common.theme") }}</span>
          <el-select v-model="themeColor" placeholder="主题颜色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li v-if="isDev">
          <span>{{ $t("common.language") }}</span>
          <el-select v-model="language" placeholder="选择语言">
            <el-option
              v-for="item in languages"
              @click="languageChange"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li class="logout" v-if="!isLocalMode">
          <el-button @click="logout" type="primary">
            {{ $t("login.logout") }}
          </el-button>
        </li>
      </ul>
    </div>
    <WebSearch v-else-if="item.id === 'webSearch'" />
    <div v-else-if="item.id === 'about'">
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
        <div>
          <el-button @click="log"> {{ $t("settings.about.releases.title") }} </el-button>
        </div>
      </div>
      <div class="divider"></div>
      <!-- <div class="info">
        <div>其他信息</div>
      </div> -->
    </div>
    <div v-else-if="item.id === 'provider'">
      <ul class="setting w-full">
        <li>
          <span>{{ $t("settings.defaultProvider") }} </span>
          <el-select v-model="defaultProvider">
            <el-option
              v-for="item in optionsModel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore, useRobotStore } from "@/stores/index";
import { languages, options, optionsModel } from "./enums";
import WebSearch from "./webSearch.vue";

const { VITE_APP_NAME, DEV: isDev } = import.meta.env;
const { docs, version } = __APP_INFO__.pkg;
const isLocalMode = __LOCAL_MODE__;

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["onClose", "onItem"]);

const userStore = useUserStore();
const robotStore = useRobotStore();

function languageChange() {
  emit("onItem");
}

function log() {
  open(`${docs}/other/logs.html`);
}

function logout() {
  emit("onClose");
  userStore.handleUserLogout();
}

const defaultProvider = computed({
  get() {
    return robotStore.defaultProvider;
  },
  set(val) {
    robotStore.setDefaultProvider(val);
  },
});

const themeColor = computed({
  get() {
    return userStore.themeScheme;
  },
  set(val) {
    userStore.setThemeScheme(val);
  },
});

const language = computed({
  get() {
    return userStore.lang;
  },
  set(val) {
    userStore.setLang(val);
  },
});
</script>

<style lang="scss" scoped>
.panel-wrapper {
  padding: 1.25rem;
  .title {
    margin-bottom: 20px;
    line-height: 26px;
    font-weight: 500;
    font-size: 16px;
    .el-icon {
      cursor: pointer;
    }
  }
}
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
.setting li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  .el-select {
    max-width: 180px;
  }
}
.divider {
  border-color: #f2f4f7;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  width: 100%;
  min-width: 100%;
  margin: 24px 0;
  border-top: 1px solid rgba(16, 24, 40, 0.06);
}
.info {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}
</style>
