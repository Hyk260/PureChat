/**
 * @description: 指定类型判断
 * @param {*}
 * @return {*}
 * isType('Array',[])
 */
export function isType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * 深克隆函数，支持函数、日期、正则表达式等特殊类型的对象
 * @param {*} target - 要克隆的对象
 * @param {WeakMap} [map] - 循环引用处理的 WeakMap
 * @returns {*} 克隆出的对象
 */
export function deepClone(target, map = new WeakMap()) {
  // 如果是原始值类型或者 null，则直接返回
  if (target === null || typeof target !== "object") {
    return target;
  }
  // 循环引用处理，如果已经克隆过该对象，则直接返回已有的克隆对象
  if (map.get(target)) {
    return target;
  }

  const Ctor = target.constructor;
  const ctorName = Ctor.name;

  // 对于内置对象处理，如 RegExp、Date、Number、String、Boolean、Error
  if (/^(RegExp|Date|Number|String|Boolean|Error)$/i.test(ctorName)) {
    return new Ctor(target);
  }

  // Symbol 对象的处理，创建一个新的 Symbol 对象并返回
  if (ctorName === "Symbol") {
    return Object(Object.prototype.valueOf.call(target));
  }

  // Map 对象的处理
  if (ctorName === "Map") {
    let cloneMap = new Map();
    map.set(target, true);

    // 递归克隆 Map 对象的每个键值对
    target.forEach((value, key) => {
      cloneMap.set(deepClone(key, map), deepClone(value, map));
    });
    return cloneMap;
  }

  // Set 对象处理
  if (ctorName === "Set") {
    let cloneSet = new Set();
    map.set(target, true);

    // 递归克隆 Set 对象的每个元素
    target.forEach(value => {
      cloneSet.add(deepClone(value, map));
    });
    return cloneSet;
  }

  // 处理普通的对象或数组
  map.set(target, true);

  let cloneResult = isType("Array", target) ? [] : {};

  // 不克隆原型链上的属性 只克隆对象本身属性
  // 使用 Object.getOwnPropertyNames 获取对象本身所有属性的属性名组成的数组
  Object.getOwnPropertyNames(target).forEach(key => {
    cloneResult[key] = deepClone(target[key], map);
  });

  return cloneResult;
}

const map = new Map();
map.set("name", "botaoxy");

const set = new Set();
set.add("billows");

const obj = {
  field: 1,
  fieldUn: undefined,
  fieldObj: {
    age: 28,
  },
  fieldArr: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  fun: () => {
    console.log("Hello Botaoxy!");
  },
  fun1: function (a, b) {
    return a + b;
  },
};
// 测试
// const copy = deepClone(obj);
// console.log(copy)

// obj.field = 3
// console.log(obj)
