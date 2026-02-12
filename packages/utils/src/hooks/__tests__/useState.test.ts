import { describe, it, expect } from "vitest"
import { useState } from "../useState"

describe("useState", () => {
  describe("基本用法", () => {
    it("应该使用初始值创建状态", () => {
      const [count, setCount] = useState(0)
      expect(count.value).toBe(0)
    })

    it("应该使用字符串初始值创建状态", () => {
      const [text, setText] = useState("hello")
      expect(text.value).toBe("hello")
    })

    it("应该使用布尔值初始值创建状态", () => {
      const [loading, setLoading] = useState(false)
      expect(loading.value).toBe(false)
    })

    it("应该使用对象初始值创建状态", () => {
      const [user, setUser] = useState({ name: "John", age: 25 })
      expect(user.value).toEqual({ name: "John", age: 25 })
    })

    it("应该使用数组初始值创建状态", () => {
      const [items, setItems] = useState([1, 2, 3])
      expect(items.value).toEqual([1, 2, 3])
    })

    it("应该支持 null 初始值", () => {
      const [data, setData] = useState<string | null>(null)
      expect(data.value).toBe(null)
    })

    it("应该支持 undefined 初始值", () => {
      const [data, setData] = useState<number | undefined>(undefined)
      expect(data.value).toBe(undefined)
    })
  })

  describe("使用函数初始化", () => {
    it("应该使用函数返回值作为初始状态", () => {
      const [count, setCount] = useState(() => 10)
      expect(count.value).toBe(10)
    })

    it("应该只调用初始化函数一次", () => {
      let callCount = 0
      const [value, setValue] = useState(() => {
        callCount++
        return 100
      })
      expect(callCount).toBe(1)
      expect(value.value).toBe(100)
    })

    it("应该使用函数初始化复杂对象", () => {
      const [user, setUser] = useState(() => ({
        id: 1,
        name: "John",
        email: "john@example.com",
        createdAt: new Date("2024-01-01"),
      }))
      expect(user.value).toEqual({
        id: 1,
        name: "John",
        email: "john@example.com",
        createdAt: new Date("2024-01-01"),
      })
    })

    it("应该使用函数初始化数组", () => {
      const [items, setItems] = useState(() => [1, 2, 3, 4, 5])
      expect(items.value).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe("setState 设置新值", () => {
    it("应该能够更新数字状态", () => {
      const [count, setCount] = useState(0)
      setCount(10)
      expect(count.value).toBe(10)
    })

    it("应该能够更新字符串状态", () => {
      const [text, setText] = useState("hello")
      setText("world")
      expect(text.value).toBe("world")
    })

    it("应该能够更新布尔值状态", () => {
      const [loading, setLoading] = useState(false)
      setLoading(true)
      expect(loading.value).toBe(true)
    })

    it("应该能够更新对象状态", () => {
      const [user, setUser] = useState({ name: "John", age: 25 })
      setUser({ name: "Jane", age: 30 })
      expect(user.value).toEqual({ name: "Jane", age: 30 })
    })

    it("应该能够更新数组状态", () => {
      const [items, setItems] = useState([1, 2, 3])
      setItems([4, 5, 6])
      expect(items.value).toEqual([4, 5, 6])
    })

    it("应该能够多次更新状态", () => {
      const [count, setCount] = useState(0)
      setCount(1)
      expect(count.value).toBe(1)
      setCount(2)
      expect(count.value).toBe(2)
      setCount(3)
      expect(count.value).toBe(3)
    })
  })

  describe("setState 使用函数更新", () => {
    it("应该能够使用函数更新数字状态", () => {
      const [count, setCount] = useState(0)
      setCount((prev) => prev + 1)
      expect(count.value).toBe(1)
    })

    it("应该能够使用函数多次更新状态", () => {
      const [count, setCount] = useState(0)
      setCount((prev) => prev + 1)
      expect(count.value).toBe(1)
      setCount((prev) => prev + 2)
      expect(count.value).toBe(3)
      setCount((prev) => prev * 2)
      expect(count.value).toBe(6)
    })

    it("应该能够使用函数更新字符串状态", () => {
      const [text, setText] = useState("hello")
      setText((prev) => prev + " world")
      expect(text.value).toBe("hello world")
    })

    it("应该能够使用函数更新对象状态", () => {
      const [user, setUser] = useState({ name: "John", age: 25 })
      setUser((prev) => ({ ...prev, age: prev.age + 1 }))
      expect(user.value).toEqual({ name: "John", age: 26 })
    })

    it("应该能够使用函数更新数组状态", () => {
      const [items, setItems] = useState([1, 2, 3])
      setItems((prev) => [...prev, 4])
      expect(items.value).toEqual([1, 2, 3, 4])
    })

    it("应该能够使用函数过滤数组", () => {
      const [items, setItems] = useState([1, 2, 3, 4, 5])
      setItems((prev) => prev.filter((item) => item % 2 === 0))
      expect(items.value).toEqual([2, 4])
    })

    it("应该能够使用函数映射数组", () => {
      const [items, setItems] = useState([1, 2, 3])
      setItems((prev) => prev.map((item) => item * 2))
      expect(items.value).toEqual([2, 4, 6])
    })
  })

  describe("混合使用 setState", () => {
    it("应该能够混合使用值和函数更新状态", () => {
      const [count, setCount] = useState(0)
      setCount(5)
      expect(count.value).toBe(5)
      setCount((prev) => prev + 3)
      expect(count.value).toBe(8)
      setCount(10)
      expect(count.value).toBe(10)
      setCount((prev) => prev * 2)
      expect(count.value).toBe(20)
    })

    it("应该能够混合使用值和函数更新对象状态", () => {
      const [user, setUser] = useState({ name: "John", age: 25 })
      setUser({ name: "Jane", age: 30 })
      expect(user.value).toEqual({ name: "Jane", age: 30 })
      setUser((prev) => ({ ...prev, age: prev.age + 1 }))
      expect(user.value).toEqual({ name: "Jane", age: 31 })
    })
  })

  describe("特殊场景", () => {
    it("应该能够设置为 null", () => {
      const [data, setData] = useState<string | null>("hello")
      setData(null)
      expect(data.value).toBe(null)
    })

    it("应该能够设置为 undefined", () => {
      const [data, setData] = useState<number | undefined>(10)
      setData(undefined)
      expect(data.value).toBe(undefined)
    })

    it("应该能够使用函数返回 null", () => {
      const [data, setData] = useState<string | null>("hello")
      setData(() => null)
      expect(data.value).toBe(null)
    })

    it("应该能够使用函数返回 undefined", () => {
      const [data, setData] = useState<number | undefined>(10)
      setData(() => undefined)
      expect(data.value).toBe(undefined)
    })

    it("应该能够处理空对象", () => {
      const [obj, setObj] = useState({})
      expect(obj.value).toEqual({})
      setObj({ key: "value" })
      expect(obj.value).toEqual({ key: "value" })
    })

    it("应该能够处理空数组", () => {
      const [arr, setArr] = useState<number[]>([])
      expect(arr.value).toEqual([])
      setArr([1, 2, 3])
      expect(arr.value).toEqual([1, 2, 3])
    })
  })

  describe("类型推断", () => {
    it("应该正确推断数字类型", () => {
      const [count, setCount] = useState(0)
      count.value
      setCount(1)
      setCount((prev) => prev + 1)
    })

    it("应该正确推断字符串类型", () => {
      const [text, setText] = useState("")
      text.value
      setText("hello")
      setText((prev) => prev + " world")
    })

    it("应该正确推断对象类型", () => {
      const [user, setUser] = useState({ name: "", age: 0 })
      user.value
      setUser({ name: "John", age: 25 })
      setUser((prev) => ({ ...prev, age: prev.age + 1 }))
    })

    it("应该支持显式泛型类型", () => {
      const [loading, setLoading] = useState<boolean>(false)
      loading.value
      setLoading(true)
      setLoading((prev) => !prev)
    })
  })
})
