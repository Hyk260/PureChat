import { computed } from "vue";
import { mapGetters, mapState, useStore, createNamespacedHelpers } from "vuex";
// import store from "@/store";
// createNamespacedHelpers 函数获取模块中的属性

const useMapper = (mapper, mapFn) => {
  const store = useStore();
  const storeStateFns = mapFn(mapper);
  const storeState = {};
  Object.keys(storeStateFns).forEach((keyFn) => {
    const fn = storeStateFns[keyFn].bind({ $store: store });
    storeState[keyFn] = computed(fn);
  });
  return storeState;
};

/**
 * 使用方法
 *
 * const { currentMessageList } = useState({
 *  currentMessageList: (state) => state.conversation.currentMessageList,
 * });
 *
 */
export const useState = (moduleName, mapper) => {
  let mapperFn = mapState;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};

export const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};
