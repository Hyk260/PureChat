<template>
  <div>
    <template v-for="item in props.tree" :key="item.id">
      <el-menu-item 
        :class="{ 'active-item': $route.name === item.name }"
        v-if="!item.children || item.children.length === 0" 
        :index="item.url">
          <font-icon v-if="item.meta.icon" :iconName="item.meta.icon"/>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.url">
        <template #title>
          <!-- {{disappear.value}}  v-show="disappear.value" -->
          <font-icon v-if="item.meta.icon" :iconName="item.meta.icon"/>
          <span>{{ item.meta.title }}</span>
        </template>
        <SideItem :tree="item.children" :hidden="false"/>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import storeLocal from 'storejs'
  import FontIcon from '@/layout/FontIcon/indx.vue';
  const props = defineProps({
    tree: {
      type: Object,
      required: true,
    },
    hidden:{
      type: Boolean,
      default: true,
    }
  });
  const disappear = computed(()=>{
    return props.hidden
  })
  // console.log(props.hidden)
  // console.log(disappear.value)
</script>

<style lang="scss" scoped>

</style>