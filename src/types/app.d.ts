/** The global namespace for the app */
declare namespace App {
  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type LangType = 'en' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type $T = (key: string) => string;
  }
}
