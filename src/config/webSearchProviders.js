// import TavilyLogo from "@/assets/images/search/tavily.png";

// export const PROVIDER_IDS = {
//   TEST: "test",
//   TAVILY: "tavily",
//   EXA: "exa",
//   google: "google"
// };

// const PROVIDER_LOGOS = {
//   "tavily": TavilyLogo,
//   // "exa": ExaLogo
// };

// export function getWebSearchProviderLogo(id) {
//   return PROVIDER_LOGOS[id] ?? "";
// }

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
  },
  'local-google': {
    websites: {
      official: 'https://www.google.com'
    }
  },
  'local-bing': {
    websites: {
      official: 'https://www.bing.com'
    }
  },
  'local-baidu': {
    websites: {
      official: 'https://www.baidu.com'
    }
  }
}

