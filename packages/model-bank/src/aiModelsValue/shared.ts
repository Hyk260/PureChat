import type { Model } from "../types/aiModel"

type SliderOverrides = Partial<{ min: number; max: number; step: number }>

export interface ModelValueField {
  ID: string
  labelKey: string
  descKey: string
  defaultValue: string | number
  step?: number
  min?: number
  max?: number
  Placeholder?: string
  placeholderKey?: string
  providerNameKey?: string
  apiKey?: string
  doubt?: string
  apiHost?: string
  collapse?: string[]
  options?: {
    id: string
    name?: string
    icon?: string
    chatModels?: Model[]
  }
}

const I18N = {
  modelList: {
    labelKey: "settingModel.modelList.title",
    descKey: "settingModel.modelList.desc",
  },
  apiUrl: {
    default: "settingModel.apiUrl.title",
    ollama: "settingModel.apiUrl.ollamaTitle",
    github: "settingModel.apiUrl.githubTitle",
    descKey: "settingModel.apiUrl.desc",
  },
  checkPoint: {
    labelKey: "settingModel.checkPoint.title",
    descKey: "settingModel.checkPoint.desc",
  },
  token: {
    title: "settingModel.token.title",
    desc: "settingModel.token.desc",
    placeholder: "settingModel.token.placeholder",
    githubPatTitle: "settingModel.token.githubPatTitle",
    githubPatDesc: "settingModel.token.githubPatDesc",
    githubPatPlaceholder: "settingModel.token.githubPatPlaceholder",
  },
  temperature: {
    labelKey: "settingModel.temperature.title",
    descKey: "settingModel.temperature.desc",
  },
  topP: {
    labelKey: "settingModel.topP.title",
    descKey: "settingModel.topP.desc",
  },
  presencePenalty: {
    labelKey: "settingModel.presencePenalty.title",
    descKey: "settingModel.presencePenalty.desc",
  },
  frequencyPenalty: {
    labelKey: "settingModel.frequencyPenalty.title",
    descKey: "settingModel.frequencyPenalty.desc",
  },
  historyCount: {
    labelKey: "settingModel.historyCount.title",
    descKey: "settingModel.historyCount.desc",
  },
  maxTokens: {
    labelKey: "settingModel.maxTokens.title",
    descKey: "settingModel.maxTokens.desc",
  },
} as const

function createSliderField(
  id: string,
  labelKey: string,
  descKey: string,
  slider: { min: number; max: number; step: number },
  overrides?: SliderOverrides
): ModelValueField {
  return {
    ID: id,
    labelKey,
    descKey,
    defaultValue: "",
    ...slider,
    ...overrides,
  }
}

export function createModel(options: { collapse: string[]; options: ModelValueField["options"] }): ModelValueField {
  return {
    ID: "model",
    labelKey: I18N.modelList.labelKey,
    descKey: I18N.modelList.descKey,
    defaultValue: "",
    collapse: options.collapse,
    options: options.options,
  }
}

export function createOpenaiUrl(options: {
  placeholder: string
  apiHost: string
  variant?: "default" | "ollama" | "github"
  doubt?: string
}): ModelValueField {
  const labelKeyMap = {
    default: I18N.apiUrl.default,
    ollama: I18N.apiUrl.ollama,
    github: I18N.apiUrl.github,
  }
  const variant = options.variant ?? "default"

  return {
    ID: "openaiUrl",
    labelKey: labelKeyMap[variant],
    descKey: I18N.apiUrl.descKey,
    Placeholder: options.placeholder,
    apiHost: options.apiHost,
    defaultValue: "",
    ...(options.doubt ? { doubt: options.doubt } : {}),
  }
}

export function createToken(
  options:
    | {
        provider: string
        apiKey?: string
        doubt?: string
        variant?: "default"
      }
    | {
        variant: "pat"
      }
): ModelValueField {
  if (options.variant === "pat") {
    return {
      ID: "token",
      labelKey: I18N.token.githubPatTitle,
      descKey: I18N.token.githubPatDesc,
      placeholderKey: I18N.token.githubPatPlaceholder,
      defaultValue: "",
    }
  }

  const provider = options.provider
  return {
    ID: "token",
    labelKey: I18N.token.title,
    descKey: I18N.token.desc,
    placeholderKey: I18N.token.placeholder,
    providerNameKey: provider,
    defaultValue: "",
    ...(options.apiKey ? { apiKey: options.apiKey } : {}),
    ...(options.doubt ? { doubt: options.doubt } : {}),
  }
}

export function createCheckPoint(defaultValue: string): ModelValueField {
  return {
    ID: "checkPoint",
    labelKey: I18N.checkPoint.labelKey,
    descKey: I18N.checkPoint.descKey,
    defaultValue,
  }
}

export function createTemperature(overrides?: SliderOverrides): ModelValueField {
  return createSliderField(
    "temperature",
    I18N.temperature.labelKey,
    I18N.temperature.descKey,
    { min: 0, max: 2, step: 0.1 },
    overrides
  )
}

export function createTopP(overrides?: SliderOverrides): ModelValueField {
  return createSliderField("top_p", I18N.topP.labelKey, I18N.topP.descKey, { min: 0, max: 1, step: 0.1 }, overrides)
}

export function createPresencePenalty(overrides?: SliderOverrides): ModelValueField {
  return createSliderField(
    "presence_penalty",
    I18N.presencePenalty.labelKey,
    I18N.presencePenalty.descKey,
    { min: -2, max: 2, step: 0.1 },
    overrides
  )
}

export function createFrequencyPenalty(overrides?: SliderOverrides): ModelValueField {
  return createSliderField(
    "frequency_penalty",
    I18N.frequencyPenalty.labelKey,
    I18N.frequencyPenalty.descKey,
    { min: -2, max: 2, step: 0.1 },
    overrides
  )
}

export function createHistoryMessageCount(overrides?: SliderOverrides): ModelValueField {
  return createSliderField(
    "historyCount",
    I18N.historyCount.labelKey,
    I18N.historyCount.descKey,
    { min: 1, max: 64, step: 1 },
    overrides
  )
}

export function createMaxTokens(overrides?: SliderOverrides): ModelValueField {
  return createSliderField(
    "max_tokens",
    I18N.maxTokens.labelKey,
    I18N.maxTokens.descKey,
    { min: 0, max: 32000, step: 1 },
    overrides
  )
}
