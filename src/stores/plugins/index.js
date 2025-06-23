import { cloneDeep } from 'lodash-es';

export const SetupStoreId = {
  App: 'app',
  Auth: 'auth',
  Chat: 'chat',
  Group: 'group',
  Robot: 'robot',
  Sidebar: 'sidebar',
  Theme: 'theme',
  Tools: 'tools',
  User: 'user',
  WebSearch: 'webSearch',
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
