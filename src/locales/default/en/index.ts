import common from "./common"
import topic from "./topic"
import components from "./components"

const resources = {
  ...common,
  ...topic,
  ...components,
} as const

export default resources
