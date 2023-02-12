<template>
  <el-scrollbar>
    <el-card class="top-content">
      <div class="left-mark">
        <!-- <img :src="avatars" title="直达仓库地址" @click="openDepot" /> -->
        <Portrait :size="45" @click="openDepot" />
        <span class="style-text">{{ greetings }}</span>
      </div>
    </el-card>

    <el-row :gutter="16" class="style-row">
      <el-col>
        <el-card>
          <template #header>
            <span class="style-text"> GitHub饼图信息 </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <div></div>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="style-row">
      <el-col>
        <el-card>
          <template #header>
            <span class="style-text"> GitHub饼图信息 </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <div>测试</div>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import avatars from "@/assets/images/picture.jpg";

let loading = ref(true);
const date = new Date();

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
  window.open("https://github.com/Hyk260");
};
</script>
<style lang="scss" scoped>
.style-row {
  margin: 20px !important;
}
// .main-content {
//   margin: 0 !important;
// }
.style-text {
  color: var(--color-text);
}
.top-content {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  height: 60px;
  border: none;
  // background: #fff;

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
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
