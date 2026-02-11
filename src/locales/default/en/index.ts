import common from "./common"
import topic from "./topic"
import chat from "./chat"
import welcome from "./welcome"
import components from "./components"

const resources = {
  ...common,
  ...chat,
  ...topic,
  ...welcome,
  ...components,
} as const

export default resources
