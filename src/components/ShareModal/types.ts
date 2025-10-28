import { ImageType } from "@/hooks/useScreenshot"

/**
 * 分享设置选项接口
 * 用于管理截图分享的各项配置
 */
export interface ShareOptions {
  /**
   * 是否显示页脚
   */
  showFooter: boolean

  /**
   * 是否显示二维码
   */
  showQrCode: boolean

  /**
   * 是否包含助手提示词
   */
  includePrompt: boolean

  /**
   * 选中的图片类型
   */
  selectedImageType: ImageType
}
