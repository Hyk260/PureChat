<template>
    <el-dialog
      ref="editRef"
      v-model="dialogVisible"
      :modal="true"
      :append-to-body="true"
      :lock-scroll="false"
      :close-on-click-modal="true"
      title="导航栏编辑"
      width="450px"
      @close="onClose"
    >
      <div class="draggable flex-bc">
        <div class="draggable-container">
          <p class="left-text">显示在导航栏上</p>
          <div class="edit-area h-full">
            <el-scrollbar>
              <VueDraggableNext
                class="drag-area"
                filter=".fix-ed"
                :move="onMove"
                :list="leftEdit"
                :group="outsideGroup"
                :force-fallback="true"
                ghost-class="ghost"
                drag-class="chosen"
                animation="200"
                @update="onUpdate"
                @remove="onRemove"
                @start="onStart"
                @end="onEnd"
              >
                <template v-for="item in leftEdit" :key="item.id">
                  <div class="list-group-item flex-ac" :class="item?.class">
                    <!-- 删除 -->
                    <FontIcon
                      icon-name="RemoveFilled"
                      class="reduce text-[#f44336]"
                      @click="reduce(item)"
                    />
                    <!-- 图标 -->
                    <FontIcon v-if="item?.type == 'el-icon'" :icon-name="item.icon" />
                    <svg-icon v-else :local-icon="item.icon" class="svg-icon" />
                    <span class="title">{{ item.title }}</span>
                    <svg-icon local-icon="drag" class="dragIcon" />
                  </div>
                </template>
              </VueDraggableNext>
            </el-scrollbar>
          </div>
        </div>
        <div class="draggable-container">
          <p class="left-text">更多</p>
          <div class="edit-area h-full">
            <el-scrollbar>
              <VueDraggableNext
                class="drag-area"
                filter=".fix-ed"
                :move="onMove"
                :list="rightEdit"
                :group="insideGroup"
                :force-fallback="true"
                ghost-class="ghost"
                drag-class="chosen"
                animation="200"
                @update="onUpdate"
                @remove="onRemove"
                @start="onStart"
                @end="onEnd"
              >
                <template v-for="item in rightEdit" :key="item.id">
                  <div class="list-group-item flex-ac" :class="item?.class">
                    <!-- 添加 -->
                    <FontIcon
                      icon-name="CirclePlusFilled"
                      class="add text-[#1890ff]"
                      @click="increase(item)"
                    />
                    <!-- 图标 -->
                    <FontIcon v-if="item?.type == 'el-icon'" :icon-name="item.icon" />
                    <svg-icon v-else :local-icon="item.icon" class="svg-icon" />
                    <span class="title">{{ item.title }}</span>
                    <svg-icon local-icon="drag" class="dragIcon" />
                  </div>
                </template>
              </VueDraggableNext>
              <div v-if="rightEdit.length == 0" class="empty h-full">全部都显示在侧边栏了</div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <template #footer>
        <span>
          <el-button @click="reset"> {{ $t("common.reset") }} </el-button>
          <!-- <el-button @click="handleCancel"> {{ $t("common.cancel") }} </el-button> -->
          <el-button type="primary" @click="handleConfirm"> {{ $t("common.confirm") }} </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { cloneDeep, uniqBy } from "lodash-es";
import { VueDraggableNext } from "vue-draggable-next";
import { mapState, mapActions } from "pinia";
import { useSidebarStore } from "@/stores/modules/sidebar/index";
import emitter from "@/utils/mitt-bus";

export default defineComponent({
  components: {
    VueDraggableNext,
  },
  data() {
    return {
      dialogVisible: false,
      cursorStyle: "",
      outsideGroup: {
        name: "draggable",
        put: true,
        pull: true,
      },
      insideGroup: {
        name: "draggable",
        put: true,
        pull: (e) => {
          if (e.el.id == "right") return;
          return true;
        },
      },
      leftEdit: [],
      rightEdit: [],
      cache: {
        deepLeft: [],
        deepRight: [],
      },
    };
  },
  computed: {
    ...mapState(useSidebarStore, ["outsideList", "moreList"]),
  },
  created() {
    this.init();
  },
  mounted() {
    emitter.on("SidebarEditDialog", (val) => {
      this.setDialog(val);
      this.record();
    });
  },
  unmounted() {
    emitter.off("SidebarEditDialog");
  },
  methods: {
    ...mapActions(useSidebarStore, ["setOutsideList", "setMoreList"]),
    record() {
      const { leftEdit, rightEdit } = this.fnRepeat();
      this.cache["deepLeft"] = leftEdit;
      this.cache["deepRight"] = rightEdit;
    },
    onRemove(e) {
      console.log(e);
    },
    onStart() {
      this.cursorStyle = "drag-cursor";
    },
    onEnd() {
      this.cursorStyle = "";
      this.callback();
    },
    onUpdate() {},
    reset() {
      useSidebarStore().$reset();
      this.init();
    },
    callback() {
      this.$nextTick(() => {
        this.setOutsideList(this.leftEdit);
        this.setMoreList(this.rightEdit);
      });
    },
    fnRepeat() {
      const left = this.outsideList.filter((t) => t.id !== "more" && t?.show !== "hide");
      const right = this.moreList;
      return {
        leftEdit: uniqBy(left, "id"),
        rightEdit: uniqBy(right, "id"),
      };
    },
    init() {
      const { leftEdit: left, rightEdit: right } = this.fnRepeat();
      this.leftEdit = cloneDeep(left);
      this.rightEdit = cloneDeep(right);
    },
    reduce(item) {
      if (item.if_fixed == 1) return;
      const index = this.leftEdit.indexOf(item);
      this.leftEdit.splice(index, 1);
      this.rightEdit.push(item);
      this.callback();
    },
    increase(item) {
      const index = this.rightEdit.indexOf(item);
      this.rightEdit.splice(index, 1);
      this.leftEdit.push(item);
      this.callback();
    },
    onMove(e) {
      if (e.relatedContext.element?.if_fixed == 1) return false;
      return true;
    },
    handleConfirm() {
      this.setDialog(false);
    },
    handleCancel() {
      this.setDialog(false);
    },
    onClose() {},
    setDialog(flg) {
      this.dialogVisible = flg;
    },
  },
});
</script>

<style lang="scss" scoped>
$draggable-height: 384px;

.svg-icon {
  margin-right: 5px;
}
.draggable {
  .draggable-container {
    width: 195px;
    .left-text {
      user-select: none;
      padding: 0 0 10px 0;
    }
  }
  .drag-cursor {
    cursor: grab;
  }
  .edit-area {
    position: relative;
    height: $draggable-height;
    border-radius: 6px;
    background-color: var(--color-draggable-body);
    .drag-area {
      height: $draggable-height;
    }
    .chosen {
      color: black;
      width: 200px !important;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.09) !important;
    }
    .ghost {
      opacity: 0 !important;
    }
  }
  .fix-ed {
    opacity: 0.5;
    cursor: not-allowed !important;
    .svg-icon {
      cursor: not-allowed !important;
    }
  }
  .list-group-item {
    padding: 0 20px;
    height: 45px;
    cursor: grab;
    .title {
      user-select: none;
    }
    .el-icon {
      font-size: 17px;
      margin-right: 5px;
      cursor: pointer;
    }
    .dragIcon {
      cursor: grab;
      margin-left: auto;
    }
  }
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  opacity: 0.5;
  width: 100%;
  height: $draggable-height;
  user-select: none;
}
</style>
