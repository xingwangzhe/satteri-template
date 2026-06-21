# Satteri 插件模板

[English](README.md) | [中文文档](#)

> 快速创建并发布 [Satteri](https://satteri.bruits.org/) 插件到 npm 的启动模板。

## 特性

- **Vite 8** — 库模式，输出 ESM + CJS
- **Vitest** — 开箱即用的单元测试
- **oxlint + oxfmt** — Rust 编写的高速 linting 和格式化
- **CI/CD** — GitHub Actions + npm OIDC 免密发布
- **双语** — 中英文 README 自带
- **MDAST + HAST** — 两种插件类型的模板代码

## 快速开始

```bash
# 1. 克隆并重新初始化
git clone https://github.com/xingwangzhe/satteri-template.git my-plugin
cd my-plugin
rm -rf .git && git init

# 2. 重命名包
# 编辑 package.json: name, description, author, repository, keywords

# 3. 安装
bun install

# 4. 编写插件
# 编辑 src/plugin.ts — 选择 MDAST 或 HAST，删掉不需要的

# 5. 测试
bun run test

# 6. 发布（推送 v* tag，CI 自动处理）
git tag -a v0.1.0 -m "v0.1.0"
git push --tags
```

## 插件类型

### MDAST — Markdown AST

```ts
import { defineMdastPlugin } from "satteri";

export const myPlugin = defineMdastPlugin({
  name: "my-plugin",
  heading(node, ctx) { /* ... */ },
  code(node) { /* ... */ },
  image(node, ctx) {
    ctx.wrapNode(node, { type: "element", tagName: "figure", ... });
  },
});
```

### HAST — HTML AST

```ts
import { defineHastPlugin } from "satteri";

export const myPlugin = defineHastPlugin({
  name: "my-plugin",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      ctx.wrapNode(node, wrapper);
    },
  },
});
```

## 目录结构

```
src/
  index.ts          # 公共导出
  plugin.ts         # 插件代码
test/
  plugin.test.ts    # vitest 测试
.github/workflows/
  check.yml         # PR/push 时运行 lint + test
  release.yml       # v* tag 时发布 npm + GitHub Release
```

## 在 Astro 中使用

```js
// astro.config.mjs
import { myPlugin } from "satteri-my-plugin";

export default defineConfig({
  markdown: {
    processor: satteri({
      mdastPlugins: [myPlugin],      // MDAST 插件
      hastPlugins: [myPlugin],       // HAST 插件
    }),
  },
});
```

## 工具链

| 工具 | 用途 |
|------|------|
| [Vite 8](https://vite.dev/) | 库构建（ESM + CJS） |
| [Vitest](https://vitest.dev/) | 单元测试 |
| [oxlint](https://oxc.rs/) | Linting |
| [oxfmt](https://oxc.rs/) | 格式化 |
| [bun](https://bun.sh/) | 包管理器 |

## 许可

MIT
