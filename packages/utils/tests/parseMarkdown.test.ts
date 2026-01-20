import { describe, it, expect } from "vitest"
import { parseMarkdown } from "../src/parseMarkdown"

describe("parseMarkdown", () => {
  it("parses basic markdown to HTML", async () => {
    const md = "# Hello **World**"
    const html = await parseMarkdown(md)
    console.log(html)
    expect(html).toContain("<h1")
    expect(html).toContain("Hello")
    expect(html).toContain("<strong>World</strong>")
  })
})
