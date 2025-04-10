import TavilyLogo from "@/assets/images/search/tavily.png";

export const PROVIDER_IDS = {
  TEST: "test",
  TAVILY: "tavily",
  EXA: "exa"
};

const PROVIDER_LOGOS = {
  [PROVIDER_IDS.TAVILY]: TavilyLogo,
  // [PROVIDER_IDS.EXA]: ExaLogo
};

export function getWebSearchProviderLogo(id) {
  return PROVIDER_LOGOS[id] ?? "";
}

export const WEB_SEARCH_PROVIDER_CONFIG = {
  test: {
    websites: {
      official: '',
      apiKey: ''
    }
  },
  tavily: {
    websites: {
      official: 'https://tavily.com',
      apiKey: 'https://app.tavily.com/home'
    }
  },
  exa: {
    websites: {
      official: 'https://exa.ai',
      apiKey: 'https://dashboard.exa.ai/api-keys'
    }
  }
}

