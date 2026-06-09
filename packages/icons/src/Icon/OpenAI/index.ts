import Mono from "./components/Mono.vue"
import Text from "./components/Text.vue"
import Avatar from "./components/Avatar.vue"
import {
  COLOR_GPT_3,
  COLOR_GPT_4,
  COLOR_GPT_5,
  COLOR_OSS,
  COLOR_O_1,
  COLOR_PLATFORM,
  COLOR_PRIMARY,
  TITLE,
  COMBINE_TEXT_MULTIPLE,
} from "./style"
import { createIcon } from "../shared/createIcon"
import { createCombineComponent } from "../shared/createCombineComponent"

const Combine = createCombineComponent("OpenAICombine", Mono, Text, COMBINE_TEXT_MULTIPLE, TITLE)

export default createIcon(
  Mono,
  Text,
  Combine,
  Avatar,
  {
    colorPrimary: COLOR_PRIMARY,
    colorGpt3: COLOR_GPT_3,
    colorGpt4: COLOR_GPT_4,
    colorGpt5: COLOR_GPT_5,
    colorO1: COLOR_O_1,
    colorO3: COLOR_O_1,
    colorOss: COLOR_OSS,
    colorPlatform: COLOR_PLATFORM,
  },
  TITLE
)
