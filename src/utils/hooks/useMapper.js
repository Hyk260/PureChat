import { computed } from "vue";
import { mapGetters, mapState, useStore, createNamespacedHelpers } from "vuex";

/**
 * 使用指定的映射函数，将 Vuex store 中的 state 解构到组件中。
 * @param {object} mapper - 将要映射的 state 属性对象，每个属性值应该是一个 getter 函数。
 * @param {function} mapFn - Vuex 对象的映射函数，如 mapState、mapGetters 等。
 * @returns {object} - 包含映射的 state 属性的对象。
 */
const useMapper = (mapper, mapFn) => {
  const store = useStore();
  const storeStateFns = mapFn(mapper);
  const storeState = {};
  Object.keys(storeStateFns).forEach((keyFn) => {
    // 绑定 getter 函数的上下文到 Vuex store 上，并将其包装为 computed property。
    const fn = storeStateFns[keyFn].bind({ $store: store });
    storeState[keyFn] = computed(fn);
  });
  return storeState;
};;

export const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};
