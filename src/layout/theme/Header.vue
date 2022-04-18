<template>
  <div class="fixed-header">

    <div class="navbar">
      <div
        :class="classes.container"
        :title="!isActive ? '点击折叠' : '点击展开'"
        @click="toggleClick"
      >
        <FontIcon
          :class="{'active':true,rotate:isActive}"
          iconName="Expand"
        />
      </div>
      <!-- 面包屑 -->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          :key="value.title"
          v-for="value in route.matched.map((item) => item.meta)"
        >
          {{value.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="arrow-setup">
        <!-- <div>

        </div> -->
        <div class="setup">
          <el-dropdown>
            <span class="el-dropdown-link">
              <FontIcon iconName="switch-button" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="tags-view">
      <div>
        <div class="arrow-left">
          <FontIcon iconName="arrow-left" class="cursor-w"/>
        </div>
        <div class="scroll-container">
          <el-tag
            :type="CurTitle === '首页'?'':'info'"
            @click="tagClick('/home')"
            class="mx-1"
          >
            首页
          </el-tag>
          <el-tag
            :type="CurTitle === tag.title?'':'info'"
            v-for="tag in tags"
            :key="tag.title"
            class="mx-1"
            closable
            @click.native="tagClick(tag.path)"
            @close="handleClose(tag)"
          >
            {{ tag.title }}
          </el-tag>
        </div>
        <div class="arrow-right">
          <FontIcon iconName="arrow-right" class="cursor-w"/>
        </div>
      </div>
      <div class="dropdown">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <FontIcon iconName="arrow-down" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                class="Left-rotation"
                :icon="Upload"
                @click="closing('left')"
              >关闭左侧</el-dropdown-item>
              <el-dropdown-item
                class="Right-rotation"
                :icon="Upload"
                @click="closing('right')"
              >关闭右侧</el-dropdown-item>
              <el-dropdown-item
                :icon="Minus"
                @click="closing('other')"
              >关闭其他</el-dropdown-item>
              <el-dropdown-item
                :icon="Close"
                @click="closing('all')"
              >全部关闭</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Upload, Minus, Close, Plus, ArrowRight } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import storeLocal from 'storejs'
import FontIcon from '@/layout/FontIcon/indx.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

// const current = ref(null)
// const tags = ref([])

const tags = computed(() => {
  return store.state.data.elTag
})

watch(
  () => router.currentRoute.value.path,
  () => {
    const Tag = router.currentRoute.value.meta?.title
    const index = tags.value.findIndex((t) => {
      return t?.title === Tag
    })
    if (Tag === '首页') return
    if (router.currentRoute.value.path === '/login') return
    if (index < 0) {
      tags.value.push({
        title: Tag,
        path: router.currentRoute.value.path,
      })
      store.commit('updateData', {
        key: 'elTag',
        value: tags.value,
      })
    }
    // console.log(tags.value)
  }
)

const isActive = computed(() => {
  return store.state.isCollapse
})

const CurTitle = computed(() => {
  return router.currentRoute.value.meta?.title
})

const handleClose = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}
// 退出登录
const Logout = () => {
  ElMessageBox.confirm(
    '确定退出登录?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      store.dispatch('logout')
    })
    .catch(() => {})
}

const closing = (tag) => {
  const find = tags.value.findIndex((t) => {
    return t?.title === CurTitle.value
  })
  switch (tag) {
    case 'left':
      tags.value.splice(0, find)
      break
    case 'right':
      tags.value.splice(find + 1, tags.value.length)
      break
    case 'other':
      tags.value.splice(0, tags.value.length)
      tags.value.push({
        title: CurTitle.value,
        path: router.currentRoute.value.path,
      })
      break
    case 'all':
      tags.value.splice(0, tags.value.length)
      break
  }
  store.commit('updateData', {
    key: 'elTag',
    value: tags.value,
  })
}

const tagClick = (path) => {
  router.push(path)
}

// 侧边栏 展开 折叠
const toggleClick = () => {
  store.commit('setCollapse')
}
</script>
<style lang="scss">
</style>
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
.cursor-w{
  cursor: w-resize;
}
::v-deep.el-dropdown-menu{
.Left-rotation .el-icon {
  transform: rotate(-90deg);
}
.Right-rotation .el-icon{
  transform: rotate(90deg);
}
}
.navbar {
  display: flex;
  height: 48px;

  .arrow-setup {
    flex: 1;
    color: #00000073;
    display: flex;
    justify-content: right;
    align-items: center;

    .setup {
      width: 40px;
      text-align: center;
      // &:hover{
      // background: #f6f6f6;
      // }
    }
  }
}

.tags-view {
  width: 100%;
  height: 38px;
  box-shadow: 0 0 1px #888;
  display: flex;
  & > div {
    width: calc(100% - 40px);
    display: flex;
  }
  .arrow-left {
    box-shadow: 5px 0 5px -6px #ccc;
    cursor: e-resize;
  }

  .arrow-right {
    box-shadow: -5px 0 5px -6px #ccc;
    border-right: 1px solid #ccc;
    cursor: e-resize;
  }

  .scroll-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 5px;

    span {
      cursor: pointer;
      margin-right: 3px;
    }
  }

  .arrow-left,
  .dropdown,
  .arrow-right {
    width: 40px;
    height: 38px;
    color: #00000073;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.active {
  &:hover {
    color: #409eff;
  }
}

.rotate {
  transform: rotate(180deg);
}

.el-breadcrumb {
  font-size: 14px;
  line-height: 48px;

  .breadcrumb__item {
    display: flex;
    align-items: center;
  }
}
</style>