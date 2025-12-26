import { describe, expect, it, beforeEach, vi } from "vitest"
import {
  abortMap,
  addAbortController,
  removeAbortController,
  abortCompletion,
  createAbortPromise,
} from "./abortController"

describe("abortController", () => {
  beforeEach(() => {
    abortMap.clear()
  })

  describe("addAbortController", () => {
    it("should add a single abort function to the map", () => {
      const id = "test-id"
      const abortFn = vi.fn()

      addAbortController(id, abortFn)

      expect(abortMap.has(id)).toBe(true)
      expect(abortMap.get(id)).toEqual([abortFn])
    })

    it("should add multiple abort functions to the same id", () => {
      const id = "test-id"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id, abortFn1)
      addAbortController(id, abortFn2)

      expect(abortMap.get(id)).toEqual([abortFn1, abortFn2])
    })

    it("should add abort functions to different ids independently", () => {
      const id1 = "test-id-1"
      const id2 = "test-id-2"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id1, abortFn1)
      addAbortController(id2, abortFn2)

      expect(abortMap.get(id1)).toEqual([abortFn1])
      expect(abortMap.get(id2)).toEqual([abortFn2])
    })
  })

  describe("removeAbortController", () => {
    it("should remove a specific abort function from the map", () => {
      const id = "test-id"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id, abortFn1)
      addAbortController(id, abortFn2)
      removeAbortController(id, abortFn1)

      expect(abortMap.get(id)).toEqual([abortFn2])
    })

    it("should delete the entire id group when no abortFn is provided", () => {
      const id = "test-id"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id, abortFn1)
      addAbortController(id, abortFn2)
      removeAbortController(id)

      expect(abortMap.has(id)).toBe(false)
    })

    it("should do nothing if the id does not exist", () => {
      const id = "non-existent-id"
      const abortFn = vi.fn()

      expect(() => removeAbortController(id, abortFn)).not.toThrow()
      expect(abortMap.has(id)).toBe(false)
    })

    it("should do nothing if the abortFn does not exist in the group", () => {
      const id = "test-id"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id, abortFn1)
      removeAbortController(id, abortFn2)

      expect(abortMap.get(id)).toEqual([abortFn1])
    })
  })

  describe("abortCompletion", () => {
    it("should execute all abort functions for a given id and remove them", () => {
      const id = "test-id"
      const abortFn1 = vi.fn()
      const abortFn2 = vi.fn()

      addAbortController(id, abortFn1)
      addAbortController(id, abortFn2)
      abortCompletion(id)

      expect(abortFn1).toHaveBeenCalledTimes(1)
      expect(abortFn2).toHaveBeenCalledTimes(1)
      expect(abortMap.has(id)).toBe(false)
    })

    it("should do nothing if the id does not exist", () => {
      const id = "non-existent-id"

      expect(() => abortCompletion(id)).not.toThrow()
    })

    it("should do nothing if the id exists but has no abort functions", () => {
      const id = "test-id"
      abortMap.set(id, [])

      expect(() => abortCompletion(id)).not.toThrow()
    })
  })

  describe("createAbortPromise", () => {
    it("should reject immediately if signal is already aborted", async () => {
      const controller = new AbortController()
      controller.abort()
      const finallyPromise = Promise.resolve("test")

      await expect(createAbortPromise(controller.signal, finallyPromise)).rejects.toThrow(DOMException)
    })

    it("should reject when signal is aborted during execution", async () => {
      const controller = new AbortController()
      const finallyPromise = new Promise<string>(() => {
        // 这个Promise永远不会resolve，用于测试abort场景
      })
      const abortPromise = createAbortPromise(controller.signal, finallyPromise)

      // 立即中断
      controller.abort()

      await expect(abortPromise).rejects.toThrow(DOMException)
    })

    it("should clean up event listener when finallyPromise resolves", async () => {
      const controller = new AbortController()
      const addEventListenerSpy = vi.spyOn(controller.signal, "addEventListener")
      const removeEventListenerSpy = vi.spyOn(controller.signal, "removeEventListener")
      const finallyPromise = Promise.resolve("test")

      // 创建promise但不使用它，因为我们只关心cleanup
      createAbortPromise(controller.signal, finallyPromise)

      // 等待finallyPromise完成
      await finallyPromise

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    })
  })
})
