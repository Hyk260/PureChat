/** The storage namespace */
declare namespace StorageType {
  interface Session {
    /** The theme color */
    themeColor: string;
  }

  interface Local {
    [key: string]: any;
    /** The i18n language */
    lang: "en" | "zh-CN";
    /** The token */
    token: string;
    /** The theme scheme */
    themeScheme: 'light' | 'dark' | 'auto';
    timProxy: any;
    "Emoji-Recently": string[];
    /** The user model */
    "User-Model": object;
    /** The font family */
    'font-family': string;
    /** The access token */
    'Access-Token': string;
    /** The refresh token */
    'Refresh-Token': string;
    /** The theme color */
    themeColor: string;
    /** The dark mode */
    darkMode: boolean;
  }
}
