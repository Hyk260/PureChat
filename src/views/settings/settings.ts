import { computed } from "vue"
import {
  Cloud,
  Brain,
  Globe,
  Settings2 as Settings,
  CircleAlert,
  Sun,
  Moon,
  Monitor,
  Zap,
  Waves,
  CircleOff,
} from "@lucide/vue"

import { ModelProvider } from "model-bank"
import type { ResponseAnimation } from "@pure/types"
import { $t } from "@/locales"
import type { ResponseAnimationSpeed } from "@/stores/modules/app/type"

export const list = computed(() => {
  return [
    {
      id: "currency",
      title: "通用设置",
      icon: Settings,
    },
    {
      id: "webSearch",
      title: $t("settings.webSearch.title"),
      icon: Globe,
      hide: !__LOCAL_MODE__,
    },
    {
      id: "aiProvider",
      title: "AI服务商",
      hide: true,
      icon: Brain,
    },
    {
      id: "provider",
      title: $t("settings.provider.title"),
      icon: Cloud,
    },
    {
      id: "about",
      title: $t("common.about"),
      icon: CircleAlert,
    },
  ].filter((item) => !item.hide)
})

export const options = computed(() => {
  return [
    {
      value: "auto",
      icon: Monitor,
      label: $t("common.auto"),
    },
    {
      value: "light",
      icon: Sun,
      label: $t("common.light"),
    },
    {
      value: "dark",
      icon: Moon,
      label: $t("common.dark"),
    },
  ]
})

export const optionsModel = computed(() => {
  return Object.entries(ModelProvider).map(([_, value]) => {
    return {
      value,
      label: value,
    }
  })
})

export const languages = [
  {
    value: "zh-CN",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
]

/** 响应动画速度选项 */
export const animationSpeedOptions = computed(() => {
  return [
    { value: "disabled", label: "关闭", icon: CircleOff },
    { value: "agile", label: "敏捷", icon: Zap },
    { value: "elegant", label: "优雅", icon: Waves },
  ]
})

/** 将动画速度预设映射为 ResponseAnimation 对象 */
export const animationSpeedMap: Record<ResponseAnimationSpeed, ResponseAnimation> = {
  disabled: { text: "none" },
  agile: { text: "fadeIn" },
  elegant: { text: "smooth" },
}
