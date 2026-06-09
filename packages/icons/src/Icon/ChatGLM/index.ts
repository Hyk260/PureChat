import Mono from "./components/Mono.vue"
import Text from "./components/Text.vue"
import Avatar from "./components/Avatar.vue"
import { COLOR_GRADIENT, COLOR_PRIMARY, TITLE, COMBINE_TEXT_MULTIPLE } from "./style"
import { createIcon } from "../shared/createIcon"
import { createCombineComponent } from "../shared/createCombineComponent"

const Combine = createCombineComponent("ChatGLMCombine", Mono, Text, COMBINE_TEXT_MULTIPLE, TITLE)

const colors: Record<string, string> = {
  colorGradient: COLOR_GRADIENT,
  colorPrimary: COLOR_PRIMARY,
}

export default createIcon(Mono, Text, Combine, Avatar, colors, TITLE)
