---
name: create-skill
description: 在当前仓库中创建新技能。当用户想要创建/添加新技能，或提到从头创建技能时使用。此技能遵循 .agents/skills/README.md 中定义的工作流程，帮助搭建、验证和同步新技能。
---

# 创建技能

按照 `.agents/skills/README.md` 中定义的工作流程，在 `.agents/skills/<skill-name>/` 中创建新技能。

## 工作流程

### 步骤 1：收集意图

在创建任何内容之前，询问用户：

1. **技能名称**：技能应该叫什么？（仅小写字母、数字和连字符，例如 `gh-create-pr`、`prepare-release`）
2. **描述**：此技能应该做什么？包含具体的触发上下文（例如，"当用户要求创建 PR 时使用"）
3. **这是公共技能吗？**：是否应同步到 `.claude/skills/` 以供共享使用？（默认：否，仅私有）
4. **测试用例**（可选）：用户是否希望为此技能设置评估？

如果用户提供部分信息（例如，仅名称），使用合理的默认值继续并要求确认。

### 步骤 2：阅读指南

创建新技能前，始终阅读 `.agents/skills/README.md` 以确保符合当前工作流程。

### 步骤 3：创建技能结构

创建以下目录结构：

```
.agents/skills/<skill-name>/
└── SKILL.md
```

**SKILL.md 模板：**

```markdown
---
name: <skill-name>
description: <description>
---

# <技能名称>

[技能说明]
```

**Frontmatter 字段：**

- `name`：技能标识符（小写字母、数字、连字符）
- `description`：何时触发（技能功能 + 具体上下文）

### 步骤 4：同步（如果是公共技能）

如果用户想要**公共技能**，在验证之前：

1. 将技能名称添加到 `.agents/skills/public-skills.txt`（每行一个，无内联注释）
2. 运行同步：
   ```bash
   pnpm skills:sync
   ```

这会在 `.claude/skills/<skill-name>/` 创建指向 `.agents/skills/<skill-name>/` 的符号链接。

**注意**：`pnpm skills:check` 主要验证公共技能（`public-skills.txt` 中的技能），同时也验证相关治理文件，因此必须先同步再验证。

### 步骤 5：验证

运行验证命令：

```bash
pnpm skills:check
```

如果有问题，修复后重新运行。

### 步骤 6：总结

向用户展示：

- 创建的文件
- 验证结果
- 后续步骤（如何使用技能）

## 命名规则

- 仅使用小写字母、数字和连字符
- 偏好简短、面向动作的名称（例如 `gh-create-pr`）

## 公共与私有技能

| 类型 | 位置              | 同步 | 要求                                                 |
| ---- | ----------------- | ---- | ---------------------------------------------------- |
| 私有 | `.agents/skills/` | 否   | 只需创建文件夹                                       |
| 公共 | 两者              | 是   | 添加到 `public-skills.txt` + 运行 `pnpm skills:sync` |

## 命令参考

```bash
# 验证技能结构
pnpm skills:check

# 将公共技能同步到 Claude
pnpm skills:sync
```

## 约束

- 切勿在 `.agents/skills/<skill-name>/` 之外创建技能
- 完成前始终运行 `pnpm skills:check`
- 公共技能需要同时添加到 `public-skills.txt` 并运行 `pnpm skills:sync`
- 如果 skill-creator 技能可用，可用于高级技能开发（评估、迭代），但此技能处理基本创建工作流程。
