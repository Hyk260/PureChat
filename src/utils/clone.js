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
 * @description: 深克隆
 * @param { target: any, map: WeakMap }
 * @return {*}
 * WeakMap 内置对象来做对象循环引用的处理 针对其他内置对象(Date RegExp String)等做处理
 */
export function deepClone(target, map = new WeakMap()) {
  // 如果是原始值 类型 则直接返回
  if (target === null || typeof target !== "object") {
    return target;
  }
  // 循环引用处理
  if (map.get(target)) {
    return target;
  }

  const Ctor = target.constructor;
  const ctorName = Ctor.name;
  // 对于内置对象处理
  if (/^(RegExp|Date|Number|String|Boolean|Error)$/i.test(ctorName)) {
    return new Ctor(target);
  }
  // Symbol 对象的创建 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  if (ctorName === "Symbol") {
    return Object(Object.prototype.valueOf.call(target));
  }
  // Map 对象的处理
  if (ctorName === "Map") {
    let cloneMap = new Map();
    map.set(target, true);
    target.forEach((value, key) => {
      cloneMap.set(deepClone(key, map), deepClone(value, map));
    });
    return cloneMap;
  }
  // Set 对象处理
  if (ctorName === "Set") {
    let cloneSet = new Set();
    map.set(target, true);

    target.forEach((value) => {
      cloneSet.add(deepClone(value, map));
    });
    return cloneSet;
  }

  map.set(target, true);

  let cloneResult = isType("Array", target) ? [] : {};
  // 不克隆原型链上的属性 只克隆对象本身属性
  // Object.getOwnPropertyNames 指定对象的所有自身属性的属性名(包括不可枚举属性但不包括 Symbol 值作为名称的属性)组成的数组
  Object.getOwnPropertyNames(target).forEach((key) => {
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
