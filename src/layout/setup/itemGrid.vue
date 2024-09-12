<template>
  <div class="panel-group-panel-wrapper w-full">
    <div class="title">
      <span>{{ item.title }}</span>
      <FontIcon class="icon-hover" iconName="CloseBold" @click="emit('onClose')" />
    </div>
    <div v-if="item.icon === 'Operation'">
      <ul class="setting w-full">
        <li>
          <span>{{ $t("common.theme") }}</span>
          <el-select v-model="themecolor" placeholder="主题颜色">
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
              @click="onBlur"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li class="logout">
          <el-button @click="logout" type="primary">
            {{ $t("login.logout") }}
          </el-button>
        </li>
      </ul>
    </div>
    <div v-else-if="item.icon === 'Warning'">
      <div class="ui-row">
        <div class="flex">
          <div>
            <img src="@/assets/images/log.png" alt="" />
          </div>
          <div class="ui-col">
            <div class="col-title">{{ title }}</div>
            <div class="version">v{{ version }}</div>
          </div>
        </div>
        <div>
          <el-button @click="log"> 更新日志 </el-button>
        </div>
      </div>
      <div class="divider"></div>
      <!-- <div class="info">
        <div>其他信息</div>
      </div> -->
    </div>
    <div v-else-if="item.icon === 'Postcard'">
      <ul class="setting w-full">
        <li>
          <span> 默认模型 </span>
          <el-select v-model="assistant" @change="onChange">
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
import { setTheme } from "@/utils/common";
import { localStg } from "@/utils/storage";
import { useState } from "@/utils/hooks/useMapper";
import { computed, ref } from "vue";
import { changeLocale } from "@/locales/index";
import { useStore } from "vuex";
import { languages, options, optionsModel } from "./enums";
import { isDev } from "@/config/env";

const {docs ,name: title, version} = __APP_INFO__.pkg;

const emit = defineEmits(["onClose", "onItem"]);
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const assistant = ref(localStg.get("default-assistant") || "GPT")

const { commit, dispatch } = useStore();
const { themeScheme, lang } = useState({
  themeScheme: (state) => state.user.themeScheme,
  lang: (state) => state.user.lang,
});

function onBlur() {
  emit("onItem");
}

function log() {
  open(`${docs}/other/logs.html`);
}

function logout() {
  emit("onClose");
  dispatch("LOG_OUT");
}

const onChange = (val) => {
  assistant.value = val;
  localStg.set("default-assistant", val);
}

const themecolor = computed({
  get() {
    return themeScheme.value;
  },
  set(val) {
    commit("setThemeScheme", val);
    setTheme(val);
  },
});

const language = computed({
  get() {
    return lang.value;
  },
  set(val) {
    commit("setLang", val);
    changeLocale(val);
  },
});
</script>

<style lang="scss" scoped>
.panel-group-panel-wrapper {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 20px;
    line-height: 26px;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    .el-icon {
      cursor: pointer;
    }
  }
}
.ui-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 52px;
    height: 52px;
  }
  .ui-col {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
