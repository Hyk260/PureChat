<template>
  <el-dialog
    ref="editRef"
    :modal="true"
    v-model="showdialog"
    :append-to-body="true"
    @close="onClose"
    title="导航栏编辑"
    width="450px"
  >
    <div class="draggable flex">
      <div class="container" v-for="item in list" :key="item.title">
        <p class="left-text">{{ item.title }}</p>
        <div class="edit-area h-full" :class="item.class">
          <el-scrollbar>
            <draggable
              class="dragArea list-group w-full"
              :list="fnSelect(item.list)"
              tag="transition-group"
              filter=".fixed"
              :move="onMove"
              @update="onUpdate"
              @remove="onRemove"
              @start="onStart"
              @end="onEnd"
              :group="fnSelect(item.group)"
              ghostClass="ghost"
              dragClass="chosen"
              animation="300"
            >
              <!-- leftEdit rightEdit -->
              <template v-for="element in fnSelect(item.type)" :key="element.only">
                <div class="list-group-item" :class="element?.class">
                  <!-- 删除 -->
                  <FontIcon iconName="RemoveFilled" class="reduce" @click="reduce(element)" />
                  <!-- 添加 -->
                  <FontIcon iconName="CirclePlusFilled" class="add" @click="increase(element)" />
                  <!-- 图标 -->
                  <FontIcon
                    v-if="element?.type == 'el-icon'"
                    :iconName="element.icon"
                    class="style-svg"
                  />
                  <svg-icon v-else :iconClass="element.icon" class="style-svg" />
                  <span>{{ element.title }}</span>
                  <svg-icon iconClass="drag" class="dragIcon" />
                </div>
              </template>
            </draggable>
            <div class="empty h-full" v-if="fnSelect(item.type).length == 0">
              全部都显示在侧边栏了
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import emitter from "@/utils/mitt-bus";
import { cloneDeep, uniqBy } from "lodash-es";
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { mapState } from "vuex";

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      list: [
        {
          class: "left-edit-area",
          title: "显示在导航栏上",
          button: "reduce",
          type: "leftEdit",
          list: "leftEdit",
          group: "outsideGroup", // 用于分组，同一组的不同list可以相互拖动
        },
        {
          class: "right-edit-area",
          title: "更多",
          button: "add",
          type: "rightEdit",
          list: "rightEdit",
          group: "insideGroup",
        },
      ],
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
      showdialog: false,
      enabled: true,
      dragging: false,
      cache: {
        deepLeft: [],
        deepRight: [],
      },
    };
  },
  computed: {
    ...mapState({
      outsideList: (state) => state.sidebar.outsideList,
      moreList: (state) => state.sidebar.moreList,
    }),
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
  methods: {
    record() {
      const { leftEdit, rightEdit } = this.fnRepeat();
      this.cache["deepLeft"] = leftEdit;
      this.cache["deepRight"] = rightEdit;
    },
    onRemove() {},
    onStart() {},
    onUpdate() {},
    callback() {
      this.$nextTick(() => {
        this.$store.commit("SET_OUT_SIDE_LIST", this.leftEdit);
        this.$store.commit("SET_MORE_LIST", this.rightEdit);
      });
    },
    onEnd() {
      this.callback();
    },
    fnRepeat() {
      const left = this.outsideList.filter((t) => t.only !== "more" && t?.show !== "hide");
      const right = this.moreList;
      return {
        leftEdit: uniqBy(left, "only"),
        rightEdit: uniqBy(right, "only"),
      };
    },
    init() {
      const { leftEdit: left, rightEdit: right } = this.fnRepeat();
      this.leftEdit = cloneDeep(left);
      this.rightEdit = cloneDeep(right);
    },
    fnSelect(type) {
      return this[type];
    },
    // 删除
    reduce(item) {
      if (item.if_fixed == 1) return;
      const index = this.leftEdit.indexOf(item);
      this.leftEdit.splice(index, 1);
      this.rightEdit.push(item);
      this.callback();
    },
    // 添加
    increase(item) {
      const index = this.rightEdit.indexOf(item);
      this.rightEdit.splice(index, 1);
      this.leftEdit.push(item);
      this.callback();
    },
    onMove(e) {
      if (e.relatedContext.element.if_fixed == 1) return false;
      return true;
    },
    reduction() {
      this.leftEdit = cloneDeep(this.cache["deepLeft"]);
      this.rightEdit = cloneDeep(this.cache["deepRight"]);
      this.callback();
    },
    // 确定
    handleConfirm() {
      this.setDialog(false);
    },
    // 取消
    handleCancel() {
      this.setDialog(false);
      this.reduction();
    },
    // 关闭弹框回调
    onClose() {
      if (!this.showdialog) return;
      this.reduction();
    },
    setDialog(flg) {
      this.showdialog = flg;
    },
  },
});
</script>

<style lang="scss" scoped>
.left-edit-area {
  .add {
    display: none;
  }
  .reduce {
    color: #f44336;
  }
}
.right-edit-area {
  .reduce {
    display: none;
  }
  .add {
    color: #1890ff;
  }
}
.style-svg {
  margin-right: 10px;
}
.draggable {
  justify-content: space-between;
  // height: 200px;
  .container {
    border-radius: 4px;
    width: 195px;
    .left-text {
      padding-bottom: 10px;
    }
  }
  .edit-area {
    background-color: var(--color-draggable-body);
    height: 384px;
    .chosen {
      color: black;
    }
    .ghost {
      opacity: 0 !important;
    }
  }
  .fixed {
    opacity: 0.5;
    cursor: not-allowed !important;
    .svg-icon {
      cursor: not-allowed;
    }
  }
  .list-group-item {
    padding: 0 20px;
    display: flex;
    height: 45px;
    align-items: center;
    cursor: pointer;
    .el-icon {
      font-size: 17px;
      margin-right: 5px;
    }
    .dragIcon {
      cursor: grab;
      margin-left: auto;
    }
  }
}
.empty {
  @include flex-center;
  opacity: 0.5;
  height: 384px;
  user-select: none;
}
</style>
