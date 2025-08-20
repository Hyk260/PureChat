import { MessageHandler } from "element-plus";

export interface AppState {
  message: MessageHandler | null;
  lang: App.I18n.LangType;
  timeline: boolean;
  markdownRender: boolean;
}

export interface MessageOptions {
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
}
