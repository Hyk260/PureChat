import { Boot } from "@wangeditor/editor";

import mentionModule from "@pure/plugin-ctrl-enter";
import ctrlEnterModule from "@pure/plugin-mention";
import fileModule from "@pure/plugin-file";

// 注册插件
Boot.registerModule(fileModule); // 文件
Boot.registerModule(mentionModule); // @提及
Boot.registerModule(ctrlEnterModule); // ctrl+Enter 换行
