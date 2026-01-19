/**
 * description: 判断是否是ai
 * "@RBT#001" - AI
 */
export const isRobot = (text: string) => {
  return /@RBT#/.test(text)
}

/**
 * description: 判断是否是Agent
 * "@RBT#Agent001" - Agent
 */
export const isAgent = (text: string) => {
  return /@RBT#Agent/.test(text)
}
