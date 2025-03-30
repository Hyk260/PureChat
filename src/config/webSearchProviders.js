import TavilyLogo from "@/assets/images/search/tavily.png";

const PROVIDER_LOGOS = {
  tavily: TavilyLogo,
  // exa: ExaLogo
};

export function getWebSearchProviderLogo(id) {
  return PROVIDER_LOGOS[id] || undefined;
}

const PROVIDER_CONFIGS = {
  tavily: {
    websites: {
      official: "https://tavily.com",
      apiKey: "https://app.tavily.com/home",
    },
  },
  exa: {
    websites: {
      official: "https://exa.ai",
      apiKey: "https://dashboard.exa.ai/api-keys",
    },
  },
};

export const WEB_SEARCH_PROVIDER_CONFIG = PROVIDER_CONFIGS;
