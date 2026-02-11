import common from "./common"
import topic from "./topic"
import chat from "./chat"
import welcome from "./welcome"
import components from "./components"

const resources = {
  ...common,
  ...welcome,
  ...chat,
  ...topic,
  ...components,
} as const

export default resources
