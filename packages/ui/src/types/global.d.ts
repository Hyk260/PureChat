import { LobeCustomStylish } from './customStylish';
import { LobeCustomToken } from './customToken';

import 'antd-style';

declare module 'antd-style' {

  export interface CustomToken extends LobeCustomToken {}

  export interface CustomStylish extends LobeCustomStylish {}
}
