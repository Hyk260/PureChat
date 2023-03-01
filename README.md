<p align="center">
  <a>
    <img src="./images/log.png" alt="logo" width="168" height="168">
  </a>
  <h2 
     align="center" 
     style="font-weight: 600;font: bold 200% Consolas, Monaco, monospace;color: #999;"
     >
    PURE ADMIN
  </h2>
  <p align="center">
    使用 vue3 + Element-Plus开发 用于学习参考
    <br />
    <a href="https://pureadmin.cn" target="blank">
      <strong>🌎 在线预览</strong>
    </a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://jq.qq.com/?_wv=1027&k=Cd4Ihd2J" target="blank">
      <strong>💬 联系作者</strong>
    </a> 
    <br />
    <br />
  </p>
</p>

[![GitHub license](https://img.shields.io/github/license/Hyk260/PureAdmin)](https://github.com/Hyk260/PureAdmin/blob/master/LICENSE)

### 🎉 特性

- 📦️ 使用 Vue CLI 5 构建
- 📃 RBAC 模型 + JWT 权限控制
  - 后端路由动态渲染 `express`
- ☁️ 聊天工作室 `基于IM即时通讯sdk`
  - @好友功能
  - 支持消息撤回
  - 截图功能(开发中)
  - 动态水印
  - 链接识别
  - 检查当前网络环境
  - 聊天消息多选转发功能(开发中)
  - 支持「文字」「图片」「动态表情包」「自定义」格式消息发送
  - 消息输入框使用富文本框 `wangEditor 5`开发(后续支持多类型消息混发)。
- 🎮 九宫格拼图游戏(自动拼图)
- 🌚 光明/黑暗 模式切换`自动根据系统主题改变`(完善中)
- ⚡️ 自定义 SVG 图标组件`svg-sprite-loader`
- 🔴 国际化`vue-i18n`(开发中)
  - vscode 扩展插件 `i18n-ally`自动翻译
- ⚙️ .vscode 配置文件
  - vue3.0 vue3.2 快速度生成模板语法配置 `.code-snippets`
  - vscode 扩展插件推荐 `extensions`
- 🔧 Prettier + ESLint 规范 `自动格式化`
- 🛠 更多特性开发中

### ✨ 安装使用

本项目由 [node-admin](https://gitee.com/H260788/node-admin) 提供 API。本地运行 node-admin，或者将 API [部署至 Vercel](https://vercel.com)

Clone 这个 project

```bash
git clone git@gitee.com:H260788/PureAdmin.git
```

安装依赖

```
yarn install
```

运行服务器 需全局安装 `nodemon` 或者 `node app`

```
yarn app
```

启动项目

```
yarn serve
```

打包

```
yarn build
```

### 🎨 目录结构

```
├── vscode                     // 编辑器配置
├── dist                       // 打包文件
├── locales                    // 国际化语言包
├── node_modules               // 依赖包
├── public                     // 静态目录
├── server                     // 服务器
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题字体图片svg icons等静态资源
│   ├── components             // 全局公用组件
│   ├── mock                   // mock服务
│   ├── plugins				         // 插件
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // view 页面目录
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
├── browserslistrc             // 配置兼容浏览器
├── eslintignore               // eslint 忽略项
├── eslintrc.js                // eslint 配置项
├── env.development            // 开发环境变量
├── env.production			       // 生产环境变量
├── gitignore                  // git 忽略项
├── prettierrc                 // prettier 配置
├── babel.config.js            // babel-loader 配置
├── commitlint.md              // Commitlint 提交规范
├── README.md                  // 说明
├── jsconfig.json              // JavaScript配置
├── LICENSE                    // 开源协议
├── package.json               // 项目名称 项目版本 项目描述 项目运行的一些脚本(依赖)
└── vue.config.js              // vue配置文件
```

### 🖼️ 截图

<img src="./images/login.png">

<img src="./images/about.png">

<img src="./images/chat.png">
