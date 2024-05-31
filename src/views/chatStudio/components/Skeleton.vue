<template>
  <el-skeleton :loading="loading" :throttle="50" animated :count="10">
    <template #template>
      <div class="message-skeleton">
        <div>
          <el-skeleton-item variant="image" class="image" />
        </div>
        <div class="message-skeleton-item">
          <div class="flex justify-between">
            <el-skeleton-item style="width: 40%" variant="text" />
            <el-skeleton-item style="width: 15%" variant="text" />
          </div>
          <el-skeleton-item variant="text" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  name: "Skeleton",
  components: {},
  computed: {},
  props: {
    list: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.message-skeleton {
  @include flex-center;
  padding: 12px 12px 12px 16px;
  height: 64px;
  box-sizing: border-box;
  .message-skeleton-item {
    width: 200px;
    margin-left: 14px;
    height: 44px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .image {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
}
</style>
