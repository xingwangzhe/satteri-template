# Satteri Plugin Template

[中文文档](README_CN.md) | [English](#)

> Quick-start template for creating and publishing [Satteri](https://satteri.bruits.org/) plugins to npm.

## Features

- **Vite 8** — library mode, ESM + CJS output
- **Vitest** — unit tests out of the box
- **oxlint + oxfmt** — Rust-fast linting and formatting
- **CI/CD** — GitHub Actions with npm OIDC trusted publishing
- **Bilingual** — English & Chinese README included
- **MDAST + HAST** — templates for both plugin types

## Quick Start

```bash
# 1. Clone and re-init
git clone https://github.com/xingwangzhe/satteri-template.git my-plugin
cd my-plugin
rm -rf .git && git init

# 2. Rename package
# Edit package.json: name, description, author, repository, keywords

# 3. Install
bun install

# 4. Write your plugin
# Edit src/plugin.ts — choose MDAST or HAST, delete the other

# 5. Test
bun run test

# 6. Publish (push a v* tag, CI handles the rest)
git tag -a v0.1.0 -m "v0.1.0"
git push --tags
```

## Plugin Types

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

## Project Structure

```
src/
  index.ts          # public exports
  plugin.ts         # your plugin
test/
  plugin.test.ts    # vitest tests
.github/workflows/
  check.yml         # lint + test on PR/push
  release.yml       # npm publish + GitHub Release on v* tag
```

## Usage in Astro

```js
// astro.config.mjs
import { myPlugin } from "satteri-my-plugin";

export default defineConfig({
  markdown: {
    processor: satteri({
      mdastPlugins: [myPlugin], // for MDAST
      hastPlugins: [myPlugin], // for HAST
    }),
  },
});
```

## Toolchain

| Tool                          | Purpose                   |
| ----------------------------- | ------------------------- |
| [Vite 8](https://vite.dev/)   | Library build (ESM + CJS) |
| [Vitest](https://vitest.dev/) | Unit tests                |
| [oxlint](https://oxc.rs/)     | Linting                   |
| [oxfmt](https://oxc.rs/)      | Formatting                |
| [bun](https://bun.sh/)        | Package manager           |

## License

MIT
