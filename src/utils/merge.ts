import { mergeWith } from "lodash-es";

/**
 * 用于合并对象，如果是数组则直接替换
 * @param target
 * @param source
 */
export const merge = (target: any, source: any) => {
  return mergeWith({}, target, source, (obj, src) => {
    if (Array.isArray(obj)) return src;
  });
};
