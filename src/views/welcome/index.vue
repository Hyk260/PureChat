<template>
  <div class="welcome">
    <el-card class="top-content">
      <div class="left-mark">
        <img :src="avatars" title="直达仓库地址" @click="openDepot" />
        <span>{{ greetings }}</span>
      </div>
    </el-card>

    <el-row :gutter="16" style="margin: 20px">
      <el-col>
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              GitHub饼图信息
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <div></div>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import avatars from "@/assets/images/picture.jpg";
import { useI18n } from "vue-i18n";
let loading = ref(true);
const date = new Date();
const { t } = useI18n();
console.log(t('common.play'))

let greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return "上午阳光明媚，祝你薪水翻倍🌞！";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午小风娇好，愿你青春不老😃！";
  } else {
    return "折一根天使羽毛，愿拂去您的疲惫烦恼忧伤🌛！";
  }
});

const openDepot = () => {
  window.open("https://gitee.com/H260788");
};
</script>
<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.welcome {
  height: 200%;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #fff;

    .left-mark {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
