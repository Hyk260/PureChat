import { describe, expect, it } from "vitest"

import { cleanObject, prettyObject } from "../src/object"

describe("cleanObject", () => {
  it("should remove null, undefined and empty string fields", () => {
    const input = { a: 1, b: null, c: undefined, d: "", e: 0, f: false } as const
    const res = cleanObject({ ...input })
    expect(res).toEqual({ a: 1, e: 0, f: false })
  })
})

describe("prettyObject", () => {
  it("should return JSON string wrapped in code block", () => {
    const input = { a: 1, b: 2 }
    const res = prettyObject(input)
    expect(res).toBe('```json\n{\n  "a": 1,\n  "b": 2\n}\n```')
  })

  it("should return empty object as string", () => {
    const input = {}
    const res = prettyObject(input)
    expect(res).toBe("[object Object]")
  })

  it("should return string starting with ```json as is", () => {
    const input = '```json\n{"a": 1}\n```'
    const res = prettyObject(input)
    expect(res).toBe(input)
  })

  it("should wrap string in code block", () => {
    const input = '{"a": 1}'
    const res = prettyObject(input)
    expect(res).toBe('```json\n{"a": 1}\n```')
  })
})
