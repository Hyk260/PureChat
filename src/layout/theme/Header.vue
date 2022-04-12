<template>
  <div class="fixed-header">

    <div class="navbar">
      <div :class="classes.container" :title="!isActive ? '点击折叠' : '点击展开'" @click="toggleClick">
         <FontIcon :class="{'active':true,rotate:isActive}" iconName="Expand"/>
      </div>
      <div class="el-breadcrumb">
        <span class="el-breadcrumb__item">
          <span class="no-redirect">
            首页
          </span>
        </span>
        <span class="el-breadcrumb__inner">
          <span class="el-breadcrumb__separator">
            <!-- <a href="">/</a> -->
          </span>
        </span>
      </div>
    </div>

    <div class="tags-view">
      <div class="arrow-left"></div>
      
      <div class="arrow-right"></div>
      
    </div>
  </div>
</template>

<script setup>
  // import {
  //   Expand,
  // } from '@element-plus/icons-vue'
  import { reactive } from '@vue/reactivity'
  import { useStore } from 'vuex'
  import { computed } from 'vue';
  import FontIcon from '@/layout/FontIcon/indx.vue';

  const state = reactive({
    isActive: false,
  })
  const store = useStore();

  const isActive = computed(() => {
    return store.state.isCollapse
  })
  

  const toggleClick = () => {
    store.commit('setCollapse');
    console.log(store.state.isCollapse)
  }
</script>

<style module="classes" scoped>
  .container {
    padding: 0 15px;
    line-height: 48px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .icon {
    cursor: pointer;
  }
</style>
<style lang="scss" scoped>
  .navbar {
    display: flex;
    height: 48px;
  }
  .tags-view {
    height: 38px;
    box-shadow: 0 0 1px #888;
  }
  .active {
    &:hover{
      color: #409EFF;
    }
  }
  .rotate{
    transform: rotate(180deg);
  }
  .el-breadcrumb{
    font-size: 14px;
    line-height: 48px;
    .breadcrumb__item{
      display: flex;
      align-items: center;
    }
  }
  

</style>