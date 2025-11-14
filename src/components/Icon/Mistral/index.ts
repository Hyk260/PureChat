import Avatar from "./components/Avatar.vue"
import Combine from "./components/Combine.vue"
import Mono from "./components/Mono.vue"
import Text from "./components/Text.vue"
import { COLOR_PRIMARY, TITLE } from "./style"

export type CompoundedIcon = typeof Mono & {
  Avatar: typeof Avatar
  Combine: typeof Combine
  Text: typeof Text
  colorPrimary: string
  title: string
}

const Icons = Mono as unknown as CompoundedIcon

Icons.Text = Text
Icons.Combine = Combine
Icons.Avatar = Avatar
Icons.colorPrimary = COLOR_PRIMARY
Icons.title = TITLE

export default Icons
