import { MessageHandler } from "element-plus";

export interface AppState {
  message: MessageHandler | null;
}

export interface MessageOptions {
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
}