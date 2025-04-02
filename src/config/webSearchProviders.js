import TavilyLogo from "@/assets/images/search/tavily.png";

export const PROVIDER_IDS = {
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
  defaultProvider: PROVIDER_IDS.TAVILY,
  providers: [
    {
      id: PROVIDER_IDS.TAVILY,
      name: "Tavily",
      apiKey: "",
      websites: {
        official: "https://tavily.com",
        apiKey: "https://app.tavily.com/home"
      }
    },
    // 需要时添加 EXA 配置
  ],
  searchWithTime: true,
  maxResults: 5,
  excludeDomains: []
};

