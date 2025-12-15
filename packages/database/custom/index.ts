import { WarningCustomMessage, LoadingCustomMessage } from "./types"
export * from "./types"

export const loading: LoadingCustomMessage = {
  body: {
    bodyType: "loadingBody",
    text: {
      loadingIcon: "",
      value: "正在输入中...",
    },
  },
}

export const warning: WarningCustomMessage = {
  body: {
    bodyType: "alertBody",
    text: {
      provider: "openai",
      value: "Hello World",
    },
  },
}
