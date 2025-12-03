// import FingerprintJS, { type GetResult } from "@fingerprintjs/fingerprintjs"

// export interface FingerprintData {
//   // FingerprintJS 核心数据
//   visitorId: string
//   confidence: number

//   // 浏览器信息
//   userAgent: string
//   language: string
//   platform: string
//   vendor: string
//   cookieEnabled: boolean

//   // 屏幕信息
//   screenWidth: number
//   screenHeight: number
//   screenColorDepth: number
//   screenPixelRatio: number

//   // 时区信息
//   timezone: string
//   timezoneOffset: number

//   // 硬件信息
//   hardwareConcurrency: number
//   deviceMemory: number | null
//   maxTouchPoints: number

//   // FingerprintJS 组件
//   components: Record<string, { value: unknown; duration: number }>

//   // 最终指纹
//   fingerprintHash: string
// }

// /**
//  * 局部类型：FingerprintJS 组件项的常见结构
//  */
// type FPComponent = { value: unknown; duration?: number } | unknown

// class FingerprintService {
//   private static agentPromise: Promise<(typeof import("@fingerprintjs/fingerprintjs"))["default"]> | null = null

//   /**
//    * 加载并缓存 FingerprintJS agent
//    */
//   private static loadAgent() {
//     if (!this.agentPromise) {
//       this.agentPromise = FingerprintJS.load()
//     }
//     return this.agentPromise
//   }

//   /**
//    * 从 GetResult 安全提取 confidence 值（兼容不同版本结构）
//    */
//   private static getConfidence(result: GetResult): number {
//     const c = (result as any).confidence
//     if (c == null) return 0
//     if (typeof c === "number") return c
//     if (typeof c === "object" && "score" in c) return Number((c as any).score) || 0
//     return 0
//   }

//   /**
//    * 把 FingerprintJS 的 components 转换为我们期望的记录结构
//    */
//   private static normalizeComponents(components: Record<string, FPComponent> | undefined) {
//     if (!components) return {}
//     return Object.fromEntries(
//       Object.entries(components).map(([k, v]) => {
//         const comp = (v as any) ?? {}
//         return [k, { value: comp.value, duration: typeof comp.duration === "number" ? comp.duration : 0 }]
//       })
//     ) as Record<string, { value: unknown; duration: number }>
//   }

//   /**
//    * 生成指纹（对浏览器全局对象做了 SSR 保护）
//    */
//   public static async generateFingerprint(): Promise<FingerprintData> {
//     try {
//       const agent = await this.loadAgent()
//       const result: GetResult = await agent.get()

//       // SSR 安全的全局对象访问
//       const nav = typeof navigator !== "undefined" ? (navigator as Navigator & Record<string, any>) : ({} as any)
//       const scr = typeof screen !== "undefined" ? (screen as Screen & Record<string, any>) : ({} as any)
//       const win = typeof window !== "undefined" ? (window as Window & Record<string, any>) : ({} as any)

//       const components = this.normalizeComponents(result.components)

//       const data: FingerprintData = {
//         // FingerprintJS 核心数据
//         visitorId: result.visitorId ?? "",
//         confidence: this.getConfidence(result),

//         // 浏览器信息
//         userAgent: nav.userAgent ?? "",
//         language: nav.language ?? "",
//         platform: nav.platform ?? "",
//         vendor: (nav as any).vendor ?? "",
//         cookieEnabled: typeof nav.cookieEnabled === "boolean" ? nav.cookieEnabled : false,

//         // 屏幕信息
//         screenWidth: typeof scr.width === "number" ? scr.width : 0,
//         screenHeight: typeof scr.height === "number" ? scr.height : 0,
//         screenColorDepth: typeof scr.colorDepth === "number" ? scr.colorDepth : 0,
//         screenPixelRatio: typeof win.devicePixelRatio === "number" ? win.devicePixelRatio : 1,

//         // 时区信息
//         timezone:
//           typeof Intl !== "undefined" && Intl.DateTimeFormat
//             ? (Intl.DateTimeFormat().resolvedOptions().timeZone ?? "")
//             : "",
//         timezoneOffset: typeof Date !== "undefined" ? new Date().getTimezoneOffset() : 0,

//         // 硬件信息
//         hardwareConcurrency: typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : 0,
//         deviceMemory: typeof (nav as any).deviceMemory === "number" ? (nav as any).deviceMemory : null,
//         maxTouchPoints: typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : 0,

//         // FingerprintJS 组件
//         components,

//         // 最终指纹（使用 visitorId）
//         fingerprintHash: result.visitorId ?? "",
//       }

//       return data
//     } catch (err) {
//       // 可在此处统一埋点或上报错误
//       // 仍然抛出，让调用方决定如何处理
//       throw new Error(`generateFingerprint failed: ${(err as Error)?.message ?? String(err)}`)
//     }
//   }
// }

// /**
//  * 导出的便利函数，向后兼容原来的调用方式
//  */
// export async function generateFingerprint(): Promise<FingerprintData> {
//   return FingerprintService.generateFingerprint()
// }
