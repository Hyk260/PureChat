import common from "./common"
import topic from "./topic"
import chat from "./chat"
import welcome from "./welcome"
import components from "./components"
import setting from "./setting"

const resources = {
  ...common,
  ...chat,
  ...topic,
  ...welcome,
  ...components,
  ...setting,
} as const

export default resources
