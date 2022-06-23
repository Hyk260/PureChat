<template>
  <div>
    <template v-for="item in props.tree" :key="item.id">
      <el-menu-item
        :class="{ 'active-item': $route.name === item.name }"
        v-if="fn(item)"
        :index="item.url"
      >
        <font-icon v-if="item.meta.icon" :iconName="item.meta.icon" />
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.url">
        <template #title>
          <font-icon v-if="item.meta.icon" :iconName="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </template>
        <SideItem :tree="item.children" :hidden="false" />
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  tree: {
    type: Object,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: true,
  },
});

const isCollapse = computed(() => {
  return store.state.data.isCollapse;
});
const disappear = computed(() => {
  return props.hidden;
});

const fn = (item) => {
  return !item.children || item.children.length === 0;
};
</script>

<style lang="scss" scoped></style>
