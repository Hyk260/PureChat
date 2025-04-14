import { cloneDeep } from 'lodash-es';

export const SetupStoreId = {
  App: 'app',
  Group: 'group',
  Robot: 'robot',
  Theme: 'theme',
  User: 'user',
  Sidebar: 'sidebar',
  Chat: 'chat',
  WebSearch: 'webSearch',
  Tools: 'tools',
};

/**
 * 该插件重置了通过设置语法写入的状态。
 *
 * @param context
 */
export function resetSetupStore(context) {
  const setupSyntaxIds = Object.values(SetupStoreId);

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultStore = cloneDeep($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
