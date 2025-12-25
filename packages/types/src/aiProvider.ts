export type ResponseAnimationStyle = "smooth" | "fadeIn" | "none"
export type ResponseAnimation =
  | {
      speed?: number
      text?: ResponseAnimationStyle
    }
  | ResponseAnimationStyle
