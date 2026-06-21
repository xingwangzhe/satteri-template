import { describe, expect, it } from "vitest";
import { myMdastPlugin, myHastPlugin } from "../src/plugin";

// Replace with your own plugin tests
// bun run test

describe("myMdastPlugin", () => {
  it("has a valid name", () => {
    expect(myMdastPlugin.name).toBeTruthy();
  });

  it("has visitor functions", () => {
    expect(myMdastPlugin).toBeDefined();
  });

  // Example: testing a code block visitor
  it("processes code blocks", () => {
    const fn = myMdastPlugin.code;
    expect(typeof fn).toBe("function");
  });
});

describe("myHastPlugin", () => {
  it("has a valid name", () => {
    expect(myHastPlugin.name).toBeTruthy();
  });

  it("has visitor functions", () => {
    expect(myHastPlugin).toBeDefined();
  });
});
