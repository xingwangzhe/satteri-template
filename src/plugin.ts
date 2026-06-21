import { defineMdastPlugin, defineHastPlugin } from "satteri";

// ============================================================
// MDAST plugin template (operates on Markdown AST)
// ============================================================
// Delete the one you don't need, rename to your plugin name

export const myMdastPlugin = defineMdastPlugin({
  name: "my-plugin",

  // Fires after frontmatter (YAML/TOML) is processed — reset state here
  yaml() {},

  // Code blocks
  code(_node) {
    // _node.type === "code"
    // _node.lang, _node.value, _node.meta
    // return { rawHtml: "<pre>...</pre>" } to emit raw HTML
    // return { raw: "markdown" } to re-parse as Markdown
  },

  // Other common node types
  paragraph() {},
  heading() {},
  image(_node, _ctx) {
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
});

// ============================================================
// HAST plugin template (operates on HTML AST)
// ============================================================

export const myHastPlugin = defineHastPlugin({
  name: "my-hast-plugin",

  // Filtered element visitor — only fires for matching tagNames
  element: {
    filter: ["img", "a"],
    visit(_node, _ctx) {
      // _node.tagName, _node.properties, _node.children
      // _ctx.wrapNode(), _ctx.replaceNode(), _ctx.removeNode() ...
    },
  },

  text(_node) {},
  comment(_node) {},
  raw(_node) {},
});
