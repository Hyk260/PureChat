import { $t } from "@/locales/index";
import { computed } from "vue";
import { ModelProvider } from "@/ai/constant";

export const list = computed(() => {
  return [
    {
      title: $t("common.currency"),
      icon: "Operation",
    },
    {
      title: "默认助手",
      icon: "Postcard",
    },
    {
      title: `${$t("common.about")}`,
      icon: "Warning",
    },
    // {
    //   title: "外观",
    //   icon: "IceCreamRound",
    // },
  ];
});

export const options = computed(() => {
  return [
    {
      value: "auto",
      label: $t("common.auto"),
    },
    {
      value: "light",
      label: $t("common.light"),
    },
    {
      value: "dark",
      label: $t("common.dark"),
    },
  ];
});

export const optionsModel = computed(() => {
  return [
    {
      value: ModelProvider.GPT,
      label: "GPT",
    },
    {
      value: ModelProvider.ChatGLM,
      label: "ChatGLM",
    },
    {
      value: ModelProvider.ZeroOne,
      label: "ZeroOne",
    },
    {
      value: ModelProvider.Ollama,
      label: "Ollama",
    },
  ];
});

export const languages = [
  {
    value: "zh-CN",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
];
