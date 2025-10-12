import numeral from "numeral"

export const formatTokenNumber = (num: number): string => {
  if (!num && num !== 0) return "--"

  if (num > 0 && num < 1024) return "1K"

  let kiloToken = Math.floor(num / 1024)
  if ((num >= 1024 && num < 1024 * 41) || num >= 128_000) {
    kiloToken = Math.floor(num / 1000)
  }
  if (num === 131_072) return "128K"
  return kiloToken < 1000 ? `${kiloToken}K` : `${Math.floor(kiloToken / 1000)}M`
}

export function formatTokenTip(item: { tokens: number }) {
  const token = item.tokens === 0 ? "∞" : numeral(item.tokens).format("0,0")
  return `该模型单个会话最多支持 {{tokens}} Tokens`.replace("{{tokens}}", token)
}
