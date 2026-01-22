import common from "./common"
import topic from "./topic"
import chat from "./chat"
import components from "./components"

const resources = {
  ...common,
  ...chat,
  ...topic,
  ...components,
} as const

export default resources
