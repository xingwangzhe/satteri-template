import { defineMdastPlugin, defineHastPlugin } from "satteri";
import type { MdastPluginInput, HastPluginInput } from "satteri";

// ============================================================
// MDAST plugin template (operates on Markdown AST)
// ============================================================
// Delete the one you don't need, rename to your plugin name

const mdastDefinition = {
  name: "my-plugin",

  // Fires after frontmatter (YAML/TOML) is processed — reset state here
  yaml() {},

  // Code blocks
  code(_node: any) {
    // _node.type === "code"
    // _node.lang, _node.value, _node.meta
    // return { rawHtml: "<pre>...</pre>" } to emit raw HTML
    // return { raw: "markdown" } to re-parse as Markdown
  },

  // Other common node types
  paragraph() {},
  heading() {},
  image(_node: any, _ctx: any) {
    // _ctx.wrapNode(_node, wrapper) — wrap with a parent node
    // _ctx.replaceNode(_node, replacement) — swap the node
    // _ctx.removeNode(_node) — delete the node
    // _ctx.textContent(_node) — extract plain text
    // _ctx.parent(_node) — get the parent node
  },
  link() {},
  html() {},
  thematicBreak() {},
  blockquote() {},
  list() {},
  math() {},
  inlineMath() {},
} satisfies MdastPluginInput;

// ============================================================
// HAST plugin template (operates on HTML AST)
// ============================================================

const hastDefinition = {
  name: "my-hast-plugin",

  // Filtered element visitor — only fires for matching tagNames
  element: {
    filter: ["img", "a"],
    visit(_node: any, _ctx: any) {
      // _node.tagName, _node.properties, _node.children
      // _ctx.wrapNode(), _ctx.replaceNode(), _ctx.removeNode() ...
    },
  },

  text(_node: any) {},
  comment(_node: any) {},
  raw(_node: any) {},
} satisfies HastPluginInput;

export const myMdastPlugin = defineMdastPlugin(mdastDefinition);
export const myHastPlugin = defineHastPlugin(hastDefinition);
