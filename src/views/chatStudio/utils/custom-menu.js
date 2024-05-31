import { Boot } from "@wangeditor/editor";
import ctrlEnterModule from "@/utils/wangEditor/plugin-ctrl-enter/index";
import mentionModule from "@/utils/wangEditor/plugin-mention/index";
import fileModule from "@/utils/wangEditor/plugin-file/index";

// 注册插件
Boot.registerModule(fileModule); // 文件
Boot.registerModule(mentionModule); // @提及
Boot.registerModule(ctrlEnterModule); // ctrl+Enter 换行
