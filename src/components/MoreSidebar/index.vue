<template>
  <el-dialog
    ref="editRef"
    v-model="dialogVisible"
    :modal="true"
    :append-to-body="true"
    :lock-scroll="false"
    :close-on-click-modal="true"
    title="导航栏编辑"
    width="450"
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
                  <CircleMinus size="15" class="icon-item text-[#f44336]" @click="reduce(item)" />
                  <!-- 图标 -->
                  <el-icon v-if="item?.type == 'el-icon'" class="icon-size">
                    <component :is="item.icon" />
                  </el-icon>
                  <SvgIcon v-else :local-icon="item.icon" class="svg-icon" />
                  <span class="title">{{ item.title }}</span>
                  <GripVertical :size="18" class="drag-icon" />
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
                  <CirclePlus :size="15" class="icon-item text-[#1890ff]" @click="increase(item)" />
                  <!-- 图标 -->
                  <el-icon v-if="item?.type == 'el-icon'">
                    <component :is="item.icon" />
                  </el-icon>
                  <sSvgIcon v-else :local-icon="item.icon" class="svg-icon" />
                  <span class="title">{{ item.title }}</span>
                  <GripVertical :size="18" class="drag-icon" />
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

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue"
import { VueDraggableNext } from "vue-draggable-next"
import { CircleMinus, CirclePlus, GripVertical } from "lucide-vue-next"

import { cloneDeep, uniqBy } from "lodash-es"

import { useSidebarStore } from "@/stores/modules/sidebar/index"
import emitter from "@/utils/mitt-bus"

const dialogVisible = ref(false)
const cursorStyle = ref("")
const leftEdit = ref([])
const rightEdit = ref([])
const editRef = ref(null)

const sidebarStore = useSidebarStore()

const outsideList = computed(() => sidebarStore.outsideList)
const moreList = computed(() => sidebarStore.moreList)

const outsideGroup = ref({
  name: "draggable",
  put: true,
  pull: true,
})

const insideGroup = ref({
  name: "draggable",
  put: true,
  pull: (e) => {
    if (e.el.id == "right") return
    return true
  },
})

const cache = ref({
  deepLeft: [],
  deepRight: [],
})

function record() {
  const { leftEdit: left, rightEdit: right } = fnRepeat()
  cache.value.deepLeft = cloneDeep(left)
  cache.value.deepRight = cloneDeep(right)
}

function onRemove(e) {
  console.log(e)
}

function onStart() {
  cursorStyle.value = "drag-cursor"
}

function onEnd() {
  cursorStyle.value = ""
  callback()
}

function onUpdate() {}

function reset() {
  sidebarStore.$reset()
  init()
}

function callback() {
  nextTick(() => {
    sidebarStore.setOutsideList(leftEdit.value)
    sidebarStore.setMoreList(rightEdit.value)
  })
}

function fnRepeat() {
  const left = outsideList.value.filter((t) => t.id !== "more" && t?.show !== "hide")
  const right = moreList.value
  return {
    leftEdit: uniqBy(left, "id"),
    rightEdit: uniqBy(right, "id"),
  }
}

function init() {
  const { leftEdit: left, rightEdit: right } = fnRepeat()
  leftEdit.value = left
  rightEdit.value = right
}

function reduce(item) {
  if (item.if_fixed == 1) return
  const index = leftEdit.value.indexOf(item)
  leftEdit.value.splice(index, 1)
  rightEdit.value.push(item)
  callback()
}

function increase(item) {
  const index = rightEdit.value.indexOf(item)
  rightEdit.value.splice(index, 1)
  leftEdit.value.push(item)
  callback()
}

function onMove(e) {
  if (e.relatedContext.element?.if_fixed == 1) return false
  return true
}

function handleConfirm() {
  setDialog(false)
}

function handleCancel() {
  setDialog(false)
}

function onClose() {}

function setDialog(flg) {
  dialogVisible.value = flg
}

onMounted(() => {
  init()
  emitter.on("SidebarEditDialog", (val) => {
    setDialog(val)
    record()
  })
})

onUnmounted(() => {
  emitter.off("SidebarEditDialog")
})
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
    .icon-size {
      margin-right: 5px;
      font-size: 17px !important;
    }
    .icon-item {
      margin-right: 5px;
      font-size: 15px !important;
      cursor: pointer;
    }
    .title {
      user-select: none;
    }
    .el-icon {
      font-size: 1px;
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
