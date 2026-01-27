/**
 * CDN字体托管配置
 * 提供多种字体托管方案以优化加载性能
 */

export interface CDNFontConfig {
  /** CDN提供商 */
  provider: "jsdelivr" | "unpkg" | "cdnjs" | "custom"
  /** 字体文件URL */
  url: string
  /** 字体族名称 */
  fontFamily: string
  /** 字体权重 */
  fontWeight: string | number
  /** 字体样式 */
  fontStyle: string
  /** 是否启用 */
  enabled: boolean
  /** 优先级 */
  priority: number
}

/**
 * CDN字体配置列表
 */
export const CDN_FONT_CONFIGS: CDNFontConfig[] = [
  {
    provider: "jsdelivr",
    url: "https://cdn.jsdelivr.net/gh/fontsource/fonts@main/files/alimama-fangyuan-thin/AlimamaFangYuanTiVF-Thin-normal-100.woff2",
    fontFamily: "AlimamaFangYuanTiVF-Thin",
    fontWeight: 100,
    fontStyle: "normal",
    enabled: true,
    priority: 1,
  },
  {
    provider: "unpkg",
    url: "https://unpkg.com/@fontsource/alimama-fangyuan-thin@latest/files/alimama-fangyuan-thin-normal-100.woff2",
    fontFamily: "AlimamaFangYuanTiVF-Thin",
    fontWeight: 100,
    fontStyle: "normal",
    enabled: true,
    priority: 2,
  },
  {
    provider: "custom",
    url: "/src/assets/fonts/subset/AlimamaFangYuanTiVF-Thin-subset.woff2",
    fontFamily: "AliFangYuan",
    fontWeight: 100,
    fontStyle: "normal",
    enabled: true,
    priority: 3,
  },
]

/**
 * 字体回退方案配置
 */
export const FONT_FALLBACK_CONFIG = {
  /** 系统字体回退链 */
  systemFonts: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    '"PingFang SC"',
    '"Hiragino Sans GB"',
    '"Microsoft YaHei"',
    '"Helvetica Neue"',
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  /** 中文字体回退链 */
  chineseFonts: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"WenQuanYi Micro Hei"', "sans-serif"],
  /** 英文字体回退链 */
  englishFonts: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    '"Helvetica Neue"',
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
}

/**
 * 生成字体回退CSS
 */
export function generateFontFallbackCSS(): string {
  const { systemFonts, chineseFonts, englishFonts } = FONT_FALLBACK_CONFIG

  return `
/* 系统字体回退 */
.font-system {
  font-family: ${systemFonts.join(", ")};
}

/* 中文字体回退 */
.font-chinese {
  font-family: ${chineseFonts.join(", ")};
}

/* 英文字体回退 */
.font-english {
  font-family: ${englishFonts.join(", ")};
}

/* 渐进式字体加载 */
.font-progressive {
  font-family: ${systemFonts.join(", ")};
  transition: font-family 0.3s ease;
}

.font-progressive.font-loaded {
  font-family: 'AliFangYuan', ${systemFonts.join(", ")};
}

/* 字体加载失败时的回退 */
.font-error {
  font-family: ${systemFonts.join(", ")};
  color: var(--text-color-fallback, #666);
}
`
}

/**
 * CDN字体加载器
 */
export class CDNFontLoader {
  private loadedFonts = new Set<string>()
  private failedFonts = new Set<string>()
  private loadingPromises = new Map<string, Promise<boolean>>()

  /**
   * 尝试从CDN加载字体
   */
  async loadFontFromCDN(config: CDNFontConfig): Promise<boolean> {
    const fontKey = `${config.provider}-${config.fontFamily}`

    if (this.loadedFonts.has(fontKey)) {
      return true
    }

    if (this.failedFonts.has(fontKey)) {
      return false
    }

    if (this.loadingPromises.has(fontKey)) {
      return this.loadingPromises.get(fontKey)
    }

    const loadPromise = this.attemptFontLoad(config)
    this.loadingPromises.set(fontKey, loadPromise)

    try {
      const success = await loadPromise
      if (success) {
        this.loadedFonts.add(fontKey)
      } else {
        this.failedFonts.add(fontKey)
      }
      return success
    } finally {
      this.loadingPromises.delete(fontKey)
    }
  }

  /**
   * 尝试加载字体
   */
  private async attemptFontLoad(config: CDNFontConfig): Promise<boolean> {
    try {
      // 检查字体文件是否可访问
      const response = await fetch(config.url, {
        method: "HEAD",
        mode: "cors",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      // 创建字体对象
      const fontFace = new FontFace(config.fontFamily, `url(${config.url})`, {
        weight: config.fontWeight,
        style: config.fontStyle,
        display: "swap",
      })

      // 加载字体
      const loadedFont = await fontFace.load()
      document.fonts.add(loadedFont)

      console.log(`✅ CDN字体加载成功: ${config.provider} - ${config.fontFamily}`)
      return true
    } catch (error) {
      console.warn(`❌ CDN字体加载失败: ${config.provider} - ${config.fontFamily}`, error)
      return false
    }
  }

  /**
   * 批量尝试加载字体
   */
  async loadFontsWithFallback(): Promise<boolean> {
    // 按优先级排序
    const sortedConfigs = CDN_FONT_CONFIGS.filter((config) => config.enabled).sort((a, b) => a.priority - b.priority)

    for (const config of sortedConfigs) {
      const success = await this.loadFontFromCDN(config)
      if (success) {
        // 成功加载后，添加字体加载完成的类名
        document.documentElement.classList.add("font-loaded")
        return true
      }
    }

    // 所有CDN都失败，使用系统字体
    console.warn("所有CDN字体加载失败，使用系统字体回退")
    document.documentElement.classList.add("font-fallback")
    return false
  }

  /**
   * 检查字体是否已加载
   */
  isFontLoaded(fontFamily: string): boolean {
    return this.loadedFonts.has(fontFamily)
  }

  /**
   * 获取加载状态
   */
  getLoadStatus(): {
    loaded: string[]
    failed: string[]
    loading: string[]
  } {
    return {
      loaded: Array.from(this.loadedFonts),
      failed: Array.from(this.failedFonts),
      loading: Array.from(this.loadingPromises.keys()),
    }
  }
}

// 创建全局CDN字体加载器实例
export const cdnFontLoader = new CDNFontLoader()

/**
 * 初始化CDN字体加载
 */
export async function initCDNFontLoading(): Promise<void> {
  try {
    await cdnFontLoader.loadFontsWithFallback()
  } catch (error) {
    console.error("CDN字体初始化失败:", error)
    document.documentElement.classList.add("font-fallback")
  }
}

/**
 * 生成字体预加载HTML
 */
export function generateFontPreloadHTML(): string {
  const enabledConfigs = CDN_FONT_CONFIGS.filter((config) => config.enabled)

  return enabledConfigs
    .map((config) => `<link rel="preload" href="${config.url}" as="font" type="font/woff2" crossorigin="anonymous">`)
    .join("\n")
}

export default cdnFontLoader
