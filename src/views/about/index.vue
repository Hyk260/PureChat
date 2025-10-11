<template>
  <el-scrollbar>
    <el-card class="style-header" shadow="never">
      <template #header>
        <div>
          <span class="name"> PureChat </span>
        </div>
      </template>
      <span class="describe"> 聊天应用与AI开发框架 </span>
    </el-card>
    <!-- 项目信息 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>项目信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="item in data"
          :key="item.label"
          :label="item.label"
          label-align="left"
          align="left"
        >
          <el-tag v-if="item?.tag">{{ item.tag }}</el-tag>
          <a v-else-if="item?.url" :href="item.url" target="_blank">
            <span class="style-color"> {{ item.title }} </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 生产环境依赖 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>生产环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          v-for="(item, index) in schema"
          :key="index"
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
        >
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 开发环境依赖 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>开发环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          v-for="(item, index) in devSchema"
          :key="index"
          :label="item.label"
          :label-class-name="getMainLabel(item.label)"
          label-align="left"
          align="left"
        >
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span class="style-color">
              {{ item.field }}
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- Markdown 预览示例 -->
    <el-card class="style-card" shadow="hover">
      <template #header>
        <div>
          <span>Markdown 示例</span>
        </div>
      </template>
      <div style="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap">
        <el-input
          v-model="markdownText"
          type="textarea"
          :autosize="{ minRows: 6 }"
          placeholder="请输入 Markdown 文本"
          style="flex: 1; min-width: 280px"
        />
        <div style="flex: 1; min-width: 280px">
          <Markdown :content="markdownText" />
        </div>
      </div>
    </el-card>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, repository, version, docs } = pkg

const schema = []
const devSchema = []

const data = [
  {
    label: "版本",
    tag: version,
  },
  {
    label: "最后编译时间",
    tag: lastBuildTime,
  },
  {
    label: "文档地址",
    url: docs,
    title: "文档地址",
  },
  {
    label: "QQ交流群",
    url: "https://jq.qq.com/?_wv=1027&k=Cd4Ihd2J",
    title: "点击链接加入群聊【PureChat交流群】",
  },
  {
    label: "Github",
    url: repository.url,
    title: "Github",
  },
  {
    label: "gitee",
    url: "https://gitee.com/H260788/PureChat",
    title: "gitee",
  },
  {
    label: "更新日志",
    url: `${docs}/other/logs.html`,
    title: "更新日志",
  },
]

const words = [
  "markdown-it",
  "unocss",
  "pinia",
  "vite",
  "mitt",
  "axios",
  "dayjs",
  "vue",
  "lodash-es",
  "element-plus",
  "vue-i18n",
  "vue-router",
  "sass",
]

const getMainLabel = computed(() => (label) => {
  return words.includes(label) ? "main-label" : null
})

const markdownText = ref(
  '你是一位 JS/TS 专家，擅长重构和优化代码，致力于干净和优雅的代码实现，包括但不限于利用一下方法提升代码质量\n\n## 优化规则：\n\n- 避免不必要的循环\n- 避免不必要的嵌套，善于抽象方法减少代码层级\n- 在需要时，将方法聚合为 class 类实现\n- 最小化代码实现， 比如利用 lodash、glob、query-string 等工具库\n- 语义化变量命名，并补充必要的注释\n- 尽可能使用 Typescript 保证类型的安全，并补充缺失的类型\n- 完善错误处理\n\n## 优化技巧：\n\n- 如果有多个条件\n\n```js\nif (x === "a" || x === "b" || x === "c") {\n}\n\n// 优化后\nif (["a", "b", "c"].includes(x)) {\n}\n```\n\n- 如果为真... 否则（三元运算符）\n\n```js\n//对于我们有 if..else 条件，并且里面不包含大量的逻辑时，是一个比较大的捷径。\nlet a = null;\nif (x > 1) {\n  a = true;\n} else {\n  a = false;\n}\n\n// 优化后\nconst a = x > 1 ? true : false;\n//或\nconst a = x > 1;\n```\n\n- 声明变量 & 将值分配给多个变量 (结构赋值)\n\n```js\nconst config = { a: 1, b: 2 };\nconst a = config.a;\nconst b = config.b;\n\n// 优化后\nconst { a, b } = config;\n```\n\n- 传参数使用默认值\n\n```js\nconst fc = (name) => {\n  const breweryName = name || "默认值";\n};\n\n// 优化后\nconst fc = (name = "默认值") => {\n  const breweryName = name;\n};\n```\n\n- 删除重复代码，合并相似函数；删除弃用代码\n\n```js\nfunction fc(currPage, totalPage) {\n  if (currPage <= 0) {\n    currPage = 0;\n    jump(currPage); // 跳转\n  } else if (currPage >= totalPage) {\n    currPage = totalPage;\n    jump(currPage); // 跳转\n  } else {\n    jump(currPage); // 跳转\n  }\n}\n\n// 优化后\nconst fc = (currPage, totalPage) => {\n  if (currPage <= 0) {\n    currPage = 0;\n  } else if (currPage >= totalPage) {\n    currPage = totalPage;\n  }\n  jump(currPage); // 把跳转函数独立出来\n};\n```\n\n- 对 Null、Undefined、Empty 这些值的检查 （短路逻辑或 ||）\n\n```js\nlet a;\nif (b !== null || b !== undefined || b !== "") {\n  a = b;\n} else {\n  a = "other";\n}\n\n// 优化后\nconst a = b || "other";\n```\n\n- 如果只需要 对 Null、undefined （合并空运算符？？）\n\n```js\nlet a;\nif (b !== null || b !== undefined) {\n  a = b;\n} else {\n  a = "other";\n}\n\n// 优化后\nconst a = b ?? "other";\n```\n\n- 用于单个条件的与 (&&) 运算符\n\n```js\nif (test1) {\n  callMethod(); // 调用方法\n}\n\n// 优化后\ntest1 && callMethod();\n```\n\n- 用于单个条件的或 (||) 运算符\n\n```js\nfunction checkReturn() {\n  if (!(test === undefined)) {\n    return test;\n  } else {\n    return callMe("test");\n  }\n}\n\n// 优化后\nconst checkReturn = () => test || callMe("test");\n```\n\n- 简短的函数调用语句\n\n```js\nlet test = 1;\nif (test == 1) {\n  fc1();\n} else {\n  fc1();\n}\n\n// 优化后\n(test === 1 ? fc1 : fc2)();\n```\n\n- switch 对应函数缩写方法\n\n```js\nswitch (index) {\n  case 1:\n    fc1();\n    break;\n  case 2:\n    fc2();\n    break;\n  case 3:\n    fc3();\n    break;\n  // And so on...\n}\n\n// 优化后\nconst fcs = {\n  1: fc1,\n  2: fc2,\n  3: fc3,\n};\nfcs[index]();\n```\n\n- 对象数组中按属性值查找特定对象时\n\n```js\nconst data = [\n  {\n    name: "abc",\n    type: "test1",\n  },\n  {\n    name: "cde",\n    type: "test2",\n  },\n];\n\nlet findData;\nfor (const item of data) {\n  if (item.type === "test1") {\n    findData = item;\n  }\n}\n\n// 优化后\nconst findData = data.find((item) => item.type === "test1");\n```\n\n- 把一个字符串重复多次\n\n```js\nlet test = "";\nfor (let i = 0; i < 5; i++) {\n  test += "test ";\n}\n\n// 优化后\n"test ".repeat(5);\n```\n\n- 找出数组中最大值最小值\n\n```js\n// 优化后\nconst a = [76, 3, 663, 6, 4, 4, 5, 234, 5, 24, 5, 7, 8];\nconsole.log(Math.max(a));\nconsole.log(Math.min(a));\n```\n'
)

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: dependencies[key], label: key })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: devDependencies[key], label: key })
})
</script>

<style scoped lang="scss">
:deep(.main-label) {
  font-size: 16px !important;
  color: var(--el-color-danger) !important;
}
.style-color {
  color: var(--el-color-primary);
}
.style-card {
  margin: 20px !important;
}
.style-header {
  .name {
    font:
      bold 100% Consolas,
      Monaco,
      monospace;
  }
  .describe {
    font-size: 15px;
  }
}
</style>
