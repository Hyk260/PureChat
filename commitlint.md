##### Commitlint 提交规范

**1、格式**

```
git commit -m <type>[optional scope]: <description>

type：提交的改动类型
optional scope：修改范围
description：主要内容
```

**2、type**

- feat：新增功能（feature）
- fix：修复 bug
- perf：性能优化
- refactor：优化重构，即对代码进行优化而不是新增功能或修复 bug
- style：代码风格、格式调整，不影响代码运行
- docs：文档相关的变动
- test：增加测试
- revert：回滚先前的提交
- config：配置文件的变动
- chore：其他不涉及代码变动的修改
- release：版本发布相关的变动

**3、例子**

```
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
```
