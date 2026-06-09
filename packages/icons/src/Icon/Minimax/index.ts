import Mono from "./components/Mono.vue"
import Text from "./components/Text.vue"
import Avatar from "./components/Avatar.vue"
import Color from "./components/Color.vue"
import { COLOR_GRADIENT, COLOR_PRIMARY, TITLE, COMBINE_TEXT_MULTIPLE } from "./style"
import { createIcon } from "../shared/createIcon"
import { createCombineComponent } from "../shared/createCombineComponent"

const Combine = createCombineComponent("MinimaxCombine", Mono, Text, COMBINE_TEXT_MULTIPLE, TITLE)

const icon = createIcon(
  Mono,
  Text,
  Combine,
  Avatar,
  { colorGradient: COLOR_GRADIENT, colorPrimary: COLOR_PRIMARY },
  TITLE
) as ReturnType<typeof createIcon> & { Color: typeof Color }

icon.Color = Color

export default icon
