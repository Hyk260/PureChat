##### Commitlint 提交规范

**1、格式**

```
git commit -m <type>[optional scope]: <description>

type ：提交的改动类型
optional scope ：修改范围
description ： 主要内容
```

**2、type**

| 类型         | 描述                                                  |
| ------------ | ----------------------------------------------------- |
| **feat**     | 新功能（feature）                                     |
| **fix**      | 修补 bug                                              |
| **perf**     | 性能优化                                              |
| **refactor** | 优化重构（即不是新增功能，也不是修改 bug 的代码变动） |
| **style**    | 格式（不影响代码运行的变动）                          |
| **docs**     | 文档（documentation）                                 |
| **test**     | 增加测试                                              |
| **revert**   | 回滚                                                  |
| **config**   | 配置文件辅助工具变动                                  |
| **chore**    | 其他变动                                              |
| **release**  | 版本发布                                              |

**3、例子**

```
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
```
