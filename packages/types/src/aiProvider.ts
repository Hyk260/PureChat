/**
 * fadeIn: 淡入效果
 * smooth: 平滑效果
 * none: 无效果
 */
export type ResponseAnimationStyle = "smooth" | "fadeIn" | "none"
export type ResponseAnimation =
  | {
      speed?: number
      text?: ResponseAnimationStyle
    }
  | ResponseAnimationStyle
