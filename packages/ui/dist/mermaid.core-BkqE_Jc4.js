var _a, _b, _c, _d, _e, _f, _g, _h, _i;
import { g as getDefaultExportFromCjs, c as isObject$1, M as getNative, d as isArrayLike, A as isArguments, E as isBuffer, F as isTypedArray, f as isArray, J as isPrototype, N as Map$1, O as overArg, B as isObjectLike, L as baseGetTag, P as root$1, i as isFunction, Q as d$1, R as serialize, T as stringify, U as compile, a as isEmpty } from "./index-DL22tfk0.js";
var dayjs_min$1 = { exports: {} };
var dayjs_min = dayjs_min$1.exports;
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min) return dayjs_min$1.exports;
  hasRequiredDayjs_min = 1;
  (function(module2, exports2) {
    !(function(t2, e2) {
      module2.exports = e2();
    })(dayjs_min, (function() {
      var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d2 = "date", l2 = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
        return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
      } }, m2 = function(t3, e3, n3) {
        var r3 = String(t3);
        return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
      }, v2 = { s: m2, z: function(t3) {
        var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
        return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i3, 2, "0");
      }, m: function t3(e3, n3) {
        if (e3.date() < n3.date()) return -t3(n3, e3);
        var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r3, c2), s3 = n3 - i3 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
        return +(-(r3 + (n3 - i3) / (s3 ? i3 - u3 : u3 - i3)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c2, y: h2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g2 = "en", D2 = {};
      D2[g2] = M2;
      var p2 = "$isDayjsObject", S2 = function(t3) {
        return t3 instanceof _2 || !(!t3 || !t3[p2]);
      }, w2 = function t3(e3, n3, r3) {
        var i3;
        if (!e3) return g2;
        if ("string" == typeof e3) {
          var s3 = e3.toLowerCase();
          D2[s3] && (i3 = s3), n3 && (D2[s3] = n3, i3 = s3);
          var u3 = e3.split("-");
          if (!i3 && u3.length > 1) return t3(u3[0]);
        } else {
          var a3 = e3.name;
          D2[a3] = e3, i3 = a3;
        }
        return !r3 && i3 && (g2 = i3), i3 || !r3 && g2;
      }, O2 = function(t3, e3) {
        if (S2(t3)) return t3.clone();
        var n3 = "object" == typeof e3 ? e3 : {};
        return n3.date = t3, n3.args = arguments, new _2(n3);
      }, b2 = v2;
      b2.l = w2, b2.i = S2, b2.w = function(t3, e3) {
        return O2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _2 = (function() {
        function M3(t3) {
          this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p2] = true;
        }
        var m3 = M3.prototype;
        return m3.parse = function(t3) {
          this.$d = (function(t4) {
            var e3 = t4.date, n3 = t4.utc;
            if (null === e3) return /* @__PURE__ */ new Date(NaN);
            if (b2.u(e3)) return /* @__PURE__ */ new Date();
            if (e3 instanceof Date) return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match($2);
              if (r3) {
                var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
              }
            }
            return new Date(e3);
          })(t3), this.init();
        }, m3.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m3.$utils = function() {
          return b2;
        }, m3.isValid = function() {
          return !(this.$d.toString() === l2);
        }, m3.isSame = function(t3, e3) {
          var n3 = O2(t3);
          return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
        }, m3.isAfter = function(t3, e3) {
          return O2(t3) < this.startOf(e3);
        }, m3.isBefore = function(t3, e3) {
          return this.endOf(e3) < O2(t3);
        }, m3.$g = function(t3, e3, n3) {
          return b2.u(t3) ? this[e3] : this.set(n3, t3);
        }, m3.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m3.valueOf = function() {
          return this.$d.getTime();
        }, m3.startOf = function(t3, e3) {
          var n3 = this, r3 = !!b2.u(e3) || e3, f3 = b2.p(t3), l3 = function(t4, e4) {
            var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
            return r3 ? i3 : i3.endOf(a2);
          }, $3 = function(t4, e4) {
            return b2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
          }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
          switch (f3) {
            case h2:
              return r3 ? l3(1, 0) : l3(31, 11);
            case c2:
              return r3 ? l3(1, M4) : l3(0, M4 + 1);
            case o2:
              var g3 = this.$locale().weekStart || 0, D3 = (y3 < g3 ? y3 + 7 : y3) - g3;
              return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
            case a2:
            case d2:
              return $3(v3 + "Hours", 0);
            case u2:
              return $3(v3 + "Minutes", 1);
            case s2:
              return $3(v3 + "Seconds", 2);
            case i2:
              return $3(v3 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m3.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m3.$set = function(t3, e3) {
          var n3, o3 = b2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f3 + "Date", n3[d2] = f3 + "Date", n3[c2] = f3 + "Month", n3[h2] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o3], $3 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
          if (o3 === c2 || o3 === h2) {
            var y3 = this.clone().set(d2, 1);
            y3.$d[l3]($3), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
          } else l3 && this.$d[l3]($3);
          return this.init(), this;
        }, m3.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m3.get = function(t3) {
          return this[b2.p(t3)]();
        }, m3.add = function(r3, f3) {
          var d3, l3 = this;
          r3 = Number(r3);
          var $3 = b2.p(f3), y3 = function(t3) {
            var e3 = O2(l3);
            return b2.w(e3.date(e3.date() + Math.round(t3 * r3)), l3);
          };
          if ($3 === c2) return this.set(c2, this.$M + r3);
          if ($3 === h2) return this.set(h2, this.$y + r3);
          if ($3 === a2) return y3(1);
          if ($3 === o2) return y3(7);
          var M4 = (d3 = {}, d3[s2] = e2, d3[u2] = n2, d3[i2] = t2, d3)[$3] || 1, m4 = this.$d.getTime() + r3 * M4;
          return b2.w(m4, this);
        }, m3.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m3.format = function(t3) {
          var e3 = this, n3 = this.$locale();
          if (!this.isValid()) return n3.invalidDate || l2;
          var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, c3 = n3.months, f3 = n3.meridiem, h3 = function(t4, n4, i4, s4) {
            return t4 && (t4[n4] || t4(e3, r3)) || i4[n4].slice(0, s4);
          }, d3 = function(t4) {
            return b2.s(s3 % 12 || 12, t4, "0");
          }, $3 = f3 || function(t4, e4, n4) {
            var r4 = t4 < 12 ? "AM" : "PM";
            return n4 ? r4.toLowerCase() : r4;
          };
          return r3.replace(y2, (function(t4, r4) {
            return r4 || (function(t5) {
              switch (t5) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return b2.s(e3.$y, 4, "0");
                case "M":
                  return a3 + 1;
                case "MM":
                  return b2.s(a3 + 1, 2, "0");
                case "MMM":
                  return h3(n3.monthsShort, a3, c3, 3);
                case "MMMM":
                  return h3(c3, a3);
                case "D":
                  return e3.$D;
                case "DD":
                  return b2.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h3(n3.weekdaysMin, e3.$W, o3, 2);
                case "ddd":
                  return h3(n3.weekdaysShort, e3.$W, o3, 3);
                case "dddd":
                  return o3[e3.$W];
                case "H":
                  return String(s3);
                case "HH":
                  return b2.s(s3, 2, "0");
                case "h":
                  return d3(1);
                case "hh":
                  return d3(2);
                case "a":
                  return $3(s3, u3, true);
                case "A":
                  return $3(s3, u3, false);
                case "m":
                  return String(u3);
                case "mm":
                  return b2.s(u3, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return b2.s(e3.$s, 2, "0");
                case "SSS":
                  return b2.s(e3.$ms, 3, "0");
                case "Z":
                  return i3;
              }
              return null;
            })(t4) || i3.replace(":", "");
          }));
        }, m3.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m3.diff = function(r3, d3, l3) {
          var $3, y3 = this, M4 = b2.p(d3), m4 = O2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e2, g3 = this - m4, D3 = function() {
            return b2.m(y3, m4);
          };
          switch (M4) {
            case h2:
              $3 = D3() / 12;
              break;
            case c2:
              $3 = D3();
              break;
            case f2:
              $3 = D3() / 3;
              break;
            case o2:
              $3 = (g3 - v3) / 6048e5;
              break;
            case a2:
              $3 = (g3 - v3) / 864e5;
              break;
            case u2:
              $3 = g3 / n2;
              break;
            case s2:
              $3 = g3 / e2;
              break;
            case i2:
              $3 = g3 / t2;
              break;
            default:
              $3 = g3;
          }
          return l3 ? $3 : b2.a($3);
        }, m3.daysInMonth = function() {
          return this.endOf(c2).$D;
        }, m3.$locale = function() {
          return D2[this.$L];
        }, m3.locale = function(t3, e3) {
          if (!t3) return this.$L;
          var n3 = this.clone(), r3 = w2(t3, e3, true);
          return r3 && (n3.$L = r3), n3;
        }, m3.clone = function() {
          return b2.w(this.$d, this);
        }, m3.toDate = function() {
          return new Date(this.valueOf());
        }, m3.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m3.toISOString = function() {
          return this.$d.toISOString();
        }, m3.toString = function() {
          return this.$d.toUTCString();
        }, M3;
      })(), k2 = _2.prototype;
      return O2.prototype = k2, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", c2], ["$y", h2], ["$D", d2]].forEach((function(t3) {
        k2[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      })), O2.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _2, O2), t3.$i = true), O2;
      }, O2.locale = w2, O2.isDayjs = S2, O2.unix = function(t3) {
        return O2(1e3 * t3);
      }, O2.en = D2[g2], O2.Ls = D2, O2.p = {}, O2;
    }));
  })(dayjs_min$1);
  return dayjs_min$1.exports;
}
var dayjs_minExports = requireDayjs_min();
var dayjs2 = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
function identity$1(value) {
  return value;
}
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ (function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
})();
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array2) {
  var index = -1, length = source.length;
  array2 || (array2 = Array(length));
  while (++index < length) {
    array2[index] = source[index];
  }
  return array2;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant$3(value) {
  return function() {
    return value;
  };
}
var defineProperty = (function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
})();
var baseSetToString = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant$3(string),
    "writable": true
  });
};
var setToString = shortOut(baseSetToString);
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type2 = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start2, transform) {
  start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start2, 0), array2 = Array(length);
    while (++index < length) {
      array2[index] = args[start2 + index];
    }
    index = -1;
    var otherArgs = Array(start2 + 1);
    while (++index < start2) {
      otherArgs[index] = args[index];
    }
    otherArgs[start2] = transform(array2);
    return apply$1(func, this, otherArgs);
  };
}
function baseRest(func, start2) {
  return setToString(overRest(func, start2, identity$1), func + "");
}
function isIterateeCall(value, index, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type2 = typeof index;
  if (type2 == "number" ? isArrayLike(object) && isIndex(index, object.length) : type2 == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
function baseTimes(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array2, key) {
  var length = array2.length;
  while (length--) {
    if (eq(array2[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type2 = typeof value;
  return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs2 = data.__data__;
    if (!Map$1 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
      pairs2.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs2);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries2) {
  var data = this.__data__ = new ListCache(entries2);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$1(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var merge$1 = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var package_default = {
  name: "mermaid",
  version: "11.12.0",
  description: "Markdown-ish syntax for generating flowcharts, mindmaps, sequence diagrams, class diagrams, gantt charts, git graphs and more.",
  type: "module",
  module: "./dist/mermaid.core.mjs",
  types: "./dist/mermaid.d.ts",
  exports: {
    ".": {
      types: "./dist/mermaid.d.ts",
      import: "./dist/mermaid.core.mjs",
      default: "./dist/mermaid.core.mjs"
    },
    "./*": "./*"
  },
  keywords: [
    "diagram",
    "markdown",
    "flowchart",
    "sequence diagram",
    "gantt",
    "class diagram",
    "git graph",
    "mindmap",
    "packet diagram",
    "c4 diagram",
    "er diagram",
    "pie chart",
    "pie diagram",
    "quadrant chart",
    "requirement diagram",
    "graph"
  ],
  scripts: {
    clean: "rimraf dist",
    dev: "pnpm -w dev",
    "docs:code": "typedoc src/defaultConfig.ts src/config.ts src/mermaid.ts && prettier --write ./src/docs/config/setup",
    "docs:build": "rimraf ../../docs && pnpm docs:code && pnpm docs:spellcheck && tsx scripts/docs.cli.mts",
    "docs:verify": "pnpm docs:code && pnpm docs:spellcheck && tsx scripts/docs.cli.mts --verify",
    "docs:pre:vitepress": "pnpm --filter ./src/docs prefetch && rimraf src/vitepress && pnpm docs:code && tsx scripts/docs.cli.mts --vitepress && pnpm --filter ./src/vitepress install --no-frozen-lockfile --ignore-scripts",
    "docs:build:vitepress": "pnpm docs:pre:vitepress && (cd src/vitepress && pnpm run build) && cpy --flat src/docs/landing/ ./src/vitepress/.vitepress/dist/landing",
    "docs:dev": 'pnpm docs:pre:vitepress && concurrently "pnpm --filter ./src/vitepress dev" "tsx scripts/docs.cli.mts --watch --vitepress"',
    "docs:dev:docker": 'pnpm docs:pre:vitepress && concurrently "pnpm --filter ./src/vitepress dev:docker" "tsx scripts/docs.cli.mts --watch --vitepress"',
    "docs:serve": "pnpm docs:build:vitepress && vitepress serve src/vitepress",
    "docs:spellcheck": 'cspell "src/docs/**/*.md"',
    "docs:release-version": "tsx scripts/update-release-version.mts",
    "docs:verify-version": "tsx scripts/update-release-version.mts --verify",
    "types:build-config": "tsx scripts/create-types-from-json-schema.mts",
    "types:verify-config": "tsx scripts/create-types-from-json-schema.mts --verify",
    checkCircle: "npx madge --circular ./src",
    prepublishOnly: "pnpm docs:verify-version"
  },
  repository: {
    type: "git",
    url: "https://github.com/mermaid-js/mermaid"
  },
  author: "Knut Sveidqvist",
  license: "MIT",
  standard: {
    ignore: [
      "**/parser/*.js",
      "dist/**/*.js",
      "cypress/**/*.js"
    ],
    globals: [
      "page"
    ]
  },
  dependencies: {
    "@braintree/sanitize-url": "^7.1.1",
    "@iconify/utils": "^3.0.1",
    "@mermaid-js/parser": "workspace:^",
    "@types/d3": "^7.4.3",
    cytoscape: "^3.29.3",
    "cytoscape-cose-bilkent": "^4.1.0",
    "cytoscape-fcose": "^2.2.0",
    d3: "^7.9.0",
    "d3-sankey": "^0.12.3",
    "dagre-d3-es": "7.0.11",
    dayjs: "^1.11.18",
    dompurify: "^3.2.5",
    katex: "^0.16.22",
    khroma: "^2.1.0",
    "lodash-es": "^4.17.21",
    marked: "^16.2.1",
    roughjs: "^4.6.6",
    stylis: "^4.3.6",
    "ts-dedent": "^2.2.0",
    uuid: "^11.1.0"
  },
  devDependencies: {
    "@adobe/jsonschema2md": "^8.0.5",
    "@iconify/types": "^2.0.0",
    "@types/cytoscape": "^3.21.9",
    "@types/cytoscape-fcose": "^2.2.4",
    "@types/d3-sankey": "^0.12.4",
    "@types/d3-scale": "^4.0.9",
    "@types/d3-scale-chromatic": "^3.1.0",
    "@types/d3-selection": "^3.0.11",
    "@types/d3-shape": "^3.1.7",
    "@types/jsdom": "^21.1.7",
    "@types/katex": "^0.16.7",
    "@types/lodash-es": "^4.17.12",
    "@types/micromatch": "^4.0.9",
    "@types/stylis": "^4.2.7",
    "@types/uuid": "^10.0.0",
    ajv: "^8.17.1",
    canvas: "^3.1.2",
    chokidar: "3.6.0",
    concurrently: "^9.1.2",
    "csstree-validator": "^4.0.1",
    globby: "^14.1.0",
    jison: "^0.4.18",
    "js-base64": "^3.7.8",
    jsdom: "^26.1.0",
    "json-schema-to-typescript": "^15.0.4",
    micromatch: "^4.0.8",
    "path-browserify": "^1.0.1",
    prettier: "^3.5.3",
    remark: "^15.0.1",
    "remark-frontmatter": "^5.0.0",
    "remark-gfm": "^4.0.1",
    rimraf: "^6.0.1",
    "start-server-and-test": "^2.0.13",
    "type-fest": "^4.35.0",
    typedoc: "^0.28.12",
    "typedoc-plugin-markdown": "^4.8.1",
    typescript: "~5.7.3",
    "unist-util-flatmap": "^1.0.0",
    "unist-util-visit": "^5.0.0",
    vitepress: "^1.6.4",
    "vitepress-plugin-search": "1.0.4-alpha.22"
  },
  files: [
    "dist/",
    "README.md"
  ],
  publishConfig: {
    access: "public"
  }
};
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var LEVELS = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};
var log = {
  trace: /* @__PURE__ */ __name((..._args) => {
  }, "trace"),
  debug: /* @__PURE__ */ __name((..._args) => {
  }, "debug"),
  info: /* @__PURE__ */ __name((..._args) => {
  }, "info"),
  warn: /* @__PURE__ */ __name((..._args) => {
  }, "warn"),
  error: /* @__PURE__ */ __name((..._args) => {
  }, "error"),
  fatal: /* @__PURE__ */ __name((..._args) => {
  }, "fatal")
};
var setLogLevel = /* @__PURE__ */ __name(function(level = "fatal") {
  let numericLevel = LEVELS.fatal;
  if (typeof level === "string") {
    if (level.toLowerCase() in LEVELS) {
      numericLevel = LEVELS[level];
    }
  } else if (typeof level === "number") {
    numericLevel = level;
  }
  log.trace = () => {
  };
  log.debug = () => {
  };
  log.info = () => {
  };
  log.warn = () => {
  };
  log.error = () => {
  };
  log.fatal = () => {
  };
  if (numericLevel <= LEVELS.fatal) {
    log.fatal = console.error ? console.error.bind(console, format("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", format("FATAL"));
  }
  if (numericLevel <= LEVELS.error) {
    log.error = console.error ? console.error.bind(console, format("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", format("ERROR"));
  }
  if (numericLevel <= LEVELS.warn) {
    log.warn = console.warn ? console.warn.bind(console, format("WARN"), "color: orange") : console.log.bind(console, `\x1B[33m`, format("WARN"));
  }
  if (numericLevel <= LEVELS.info) {
    log.info = console.info ? console.info.bind(console, format("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", format("INFO"));
  }
  if (numericLevel <= LEVELS.debug) {
    log.debug = console.debug ? console.debug.bind(console, format("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", format("DEBUG"));
  }
  if (numericLevel <= LEVELS.trace) {
    log.trace = console.debug ? console.debug.bind(console, format("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", format("TRACE"));
  }
}, "setLogLevel");
var format = /* @__PURE__ */ __name((level) => {
  const time = dayjs2().format("ss.SSS");
  return `%c${time} : ${level} : `;
}, "format");
const Channel = {
  /* CLAMP */
  min: {
    r: 0,
    g: 0,
    b: 0,
    s: 0,
    l: 0,
    a: 0
  },
  max: {
    r: 255,
    g: 255,
    b: 255,
    h: 360,
    s: 100,
    l: 100,
    a: 1
  },
  clamp: {
    r: (r2) => r2 >= 255 ? 255 : r2 < 0 ? 0 : r2,
    g: (g2) => g2 >= 255 ? 255 : g2 < 0 ? 0 : g2,
    b: (b2) => b2 >= 255 ? 255 : b2 < 0 ? 0 : b2,
    h: (h2) => h2 % 360,
    s: (s2) => s2 >= 100 ? 100 : s2 < 0 ? 0 : s2,
    l: (l2) => l2 >= 100 ? 100 : l2 < 0 ? 0 : l2,
    a: (a2) => a2 >= 1 ? 1 : a2 < 0 ? 0 : a2
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (c2) => {
    const n2 = c2 / 255;
    return c2 > 0.03928 ? Math.pow((n2 + 0.055) / 1.055, 2.4) : n2 / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (p2, q2, t2) => {
    if (t2 < 0)
      t2 += 1;
    if (t2 > 1)
      t2 -= 1;
    if (t2 < 1 / 6)
      return p2 + (q2 - p2) * 6 * t2;
    if (t2 < 1 / 2)
      return q2;
    if (t2 < 2 / 3)
      return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
    return p2;
  },
  hsl2rgb: ({ h: h2, s: s2, l: l2 }, channel) => {
    if (!s2)
      return l2 * 2.55;
    h2 /= 360;
    s2 /= 100;
    l2 /= 100;
    const q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    const p2 = 2 * l2 - q2;
    switch (channel) {
      case "r":
        return Channel.hue2rgb(p2, q2, h2 + 1 / 3) * 255;
      case "g":
        return Channel.hue2rgb(p2, q2, h2) * 255;
      case "b":
        return Channel.hue2rgb(p2, q2, h2 - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: r2, g: g2, b: b2 }, channel) => {
    r2 /= 255;
    g2 /= 255;
    b2 /= 255;
    const max2 = Math.max(r2, g2, b2);
    const min2 = Math.min(r2, g2, b2);
    const l2 = (max2 + min2) / 2;
    if (channel === "l")
      return l2 * 100;
    if (max2 === min2)
      return 0;
    const d2 = max2 - min2;
    const s2 = l2 > 0.5 ? d2 / (2 - max2 - min2) : d2 / (max2 + min2);
    if (channel === "s")
      return s2 * 100;
    switch (max2) {
      case r2:
        return ((g2 - b2) / d2 + (g2 < b2 ? 6 : 0)) * 60;
      case g2:
        return ((b2 - r2) / d2 + 2) * 60;
      case b2:
        return ((r2 - g2) / d2 + 4) * 60;
      default:
        return -1;
    }
  }
};
const Lang = {
  /* API */
  clamp: (number, lower2, upper) => {
    if (lower2 > upper)
      return Math.min(lower2, Math.max(upper, number));
    return Math.min(upper, Math.max(lower2, number));
  },
  round: (number) => {
    return Math.round(number * 1e10) / 1e10;
  }
};
const Unit = {
  /* API */
  dec2hex: (dec) => {
    const hex2 = Math.round(dec).toString(16);
    return hex2.length > 1 ? hex2 : `0${hex2}`;
  }
};
const Utils = {
  channel: Channel,
  lang: Lang,
  unit: Unit
};
const DEC2HEX = {};
for (let i2 = 0; i2 <= 255; i2++)
  DEC2HEX[i2] = Utils.unit.dec2hex(i2);
const TYPE = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Type {
  constructor() {
    this.type = TYPE.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(type2) {
    if (this.type && this.type !== type2)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = type2;
  }
  reset() {
    this.type = TYPE.ALL;
  }
  is(type2) {
    return this.type === type2;
  }
}
class Channels {
  /* CONSTRUCTOR */
  constructor(data, color2) {
    this.color = color2;
    this.changed = false;
    this.data = data;
    this.type = new Type();
  }
  /* API */
  set(data, color2) {
    this.color = color2;
    this.changed = false;
    this.data = data;
    this.type.type = TYPE.ALL;
    return this;
  }
  /* HELPERS */
  _ensureHSL() {
    const data = this.data;
    const { h: h2, s: s2, l: l2 } = data;
    if (h2 === void 0)
      data.h = Utils.channel.rgb2hsl(data, "h");
    if (s2 === void 0)
      data.s = Utils.channel.rgb2hsl(data, "s");
    if (l2 === void 0)
      data.l = Utils.channel.rgb2hsl(data, "l");
  }
  _ensureRGB() {
    const data = this.data;
    const { r: r2, g: g2, b: b2 } = data;
    if (r2 === void 0)
      data.r = Utils.channel.hsl2rgb(data, "r");
    if (g2 === void 0)
      data.g = Utils.channel.hsl2rgb(data, "g");
    if (b2 === void 0)
      data.b = Utils.channel.hsl2rgb(data, "b");
  }
  /* GETTERS */
  get r() {
    const data = this.data;
    const r2 = data.r;
    if (!this.type.is(TYPE.HSL) && r2 !== void 0)
      return r2;
    this._ensureHSL();
    return Utils.channel.hsl2rgb(data, "r");
  }
  get g() {
    const data = this.data;
    const g2 = data.g;
    if (!this.type.is(TYPE.HSL) && g2 !== void 0)
      return g2;
    this._ensureHSL();
    return Utils.channel.hsl2rgb(data, "g");
  }
  get b() {
    const data = this.data;
    const b2 = data.b;
    if (!this.type.is(TYPE.HSL) && b2 !== void 0)
      return b2;
    this._ensureHSL();
    return Utils.channel.hsl2rgb(data, "b");
  }
  get h() {
    const data = this.data;
    const h2 = data.h;
    if (!this.type.is(TYPE.RGB) && h2 !== void 0)
      return h2;
    this._ensureRGB();
    return Utils.channel.rgb2hsl(data, "h");
  }
  get s() {
    const data = this.data;
    const s2 = data.s;
    if (!this.type.is(TYPE.RGB) && s2 !== void 0)
      return s2;
    this._ensureRGB();
    return Utils.channel.rgb2hsl(data, "s");
  }
  get l() {
    const data = this.data;
    const l2 = data.l;
    if (!this.type.is(TYPE.RGB) && l2 !== void 0)
      return l2;
    this._ensureRGB();
    return Utils.channel.rgb2hsl(data, "l");
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(r2) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.r = r2;
  }
  set g(g2) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.g = g2;
  }
  set b(b2) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.b = b2;
  }
  set h(h2) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.h = h2;
  }
  set s(s2) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.s = s2;
  }
  set l(l2) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.l = l2;
  }
  set a(a2) {
    this.changed = true;
    this.data.a = a2;
  }
}
const channels = new Channels({ r: 0, g: 0, b: 0, a: 0 }, "transparent");
const Hex = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (color2) => {
    if (color2.charCodeAt(0) !== 35)
      return;
    const match = color2.match(Hex.re);
    if (!match)
      return;
    const hex2 = match[1];
    const dec = parseInt(hex2, 16);
    const length = hex2.length;
    const hasAlpha = length % 4 === 0;
    const isFullLength = length > 4;
    const multiplier = isFullLength ? 1 : 17;
    const bits = isFullLength ? 8 : 4;
    const bitsOffset = hasAlpha ? 0 : -1;
    const mask = isFullLength ? 255 : 15;
    return channels.set({
      r: (dec >> bits * (bitsOffset + 3) & mask) * multiplier,
      g: (dec >> bits * (bitsOffset + 2) & mask) * multiplier,
      b: (dec >> bits * (bitsOffset + 1) & mask) * multiplier,
      a: hasAlpha ? (dec & mask) * multiplier / 255 : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { r: r2, g: g2, b: b2, a: a2 } = channels2;
    if (a2 < 1) {
      return `#${DEC2HEX[Math.round(r2)]}${DEC2HEX[Math.round(g2)]}${DEC2HEX[Math.round(b2)]}${DEC2HEX[Math.round(a2 * 255)]}`;
    } else {
      return `#${DEC2HEX[Math.round(r2)]}${DEC2HEX[Math.round(g2)]}${DEC2HEX[Math.round(b2)]}`;
    }
  }
};
const HSL = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (hue2) => {
    const match = hue2.match(HSL.hueRe);
    if (match) {
      const [, number, unit] = match;
      switch (unit) {
        case "grad":
          return Utils.channel.clamp.h(parseFloat(number) * 0.9);
        case "rad":
          return Utils.channel.clamp.h(parseFloat(number) * 180 / Math.PI);
        case "turn":
          return Utils.channel.clamp.h(parseFloat(number) * 360);
      }
    }
    return Utils.channel.clamp.h(parseFloat(hue2));
  },
  /* API */
  parse: (color2) => {
    const charCode = color2.charCodeAt(0);
    if (charCode !== 104 && charCode !== 72)
      return;
    const match = color2.match(HSL.re);
    if (!match)
      return;
    const [, h2, s2, l2, a2, isAlphaPercentage] = match;
    return channels.set({
      h: HSL._hue2deg(h2),
      s: Utils.channel.clamp.s(parseFloat(s2)),
      l: Utils.channel.clamp.l(parseFloat(l2)),
      a: a2 ? Utils.channel.clamp.a(isAlphaPercentage ? parseFloat(a2) / 100 : parseFloat(a2)) : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { h: h2, s: s2, l: l2, a: a2 } = channels2;
    if (a2 < 1) {
      return `hsla(${Utils.lang.round(h2)}, ${Utils.lang.round(s2)}%, ${Utils.lang.round(l2)}%, ${a2})`;
    } else {
      return `hsl(${Utils.lang.round(h2)}, ${Utils.lang.round(s2)}%, ${Utils.lang.round(l2)}%)`;
    }
  }
};
const Keyword = {
  /* VARIABLES */
  colors: {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyanaqua: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    transparent: "#00000000",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  },
  /* API */
  parse: (color2) => {
    color2 = color2.toLowerCase();
    const hex2 = Keyword.colors[color2];
    if (!hex2)
      return;
    return Hex.parse(hex2);
  },
  stringify: (channels2) => {
    const hex2 = Hex.stringify(channels2);
    for (const name in Keyword.colors) {
      if (Keyword.colors[name] === hex2)
        return name;
    }
    return;
  }
};
const RGB = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (color2) => {
    const charCode = color2.charCodeAt(0);
    if (charCode !== 114 && charCode !== 82)
      return;
    const match = color2.match(RGB.re);
    if (!match)
      return;
    const [, r2, isRedPercentage, g2, isGreenPercentage, b2, isBluePercentage, a2, isAlphaPercentage] = match;
    return channels.set({
      r: Utils.channel.clamp.r(isRedPercentage ? parseFloat(r2) * 2.55 : parseFloat(r2)),
      g: Utils.channel.clamp.g(isGreenPercentage ? parseFloat(g2) * 2.55 : parseFloat(g2)),
      b: Utils.channel.clamp.b(isBluePercentage ? parseFloat(b2) * 2.55 : parseFloat(b2)),
      a: a2 ? Utils.channel.clamp.a(isAlphaPercentage ? parseFloat(a2) / 100 : parseFloat(a2)) : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { r: r2, g: g2, b: b2, a: a2 } = channels2;
    if (a2 < 1) {
      return `rgba(${Utils.lang.round(r2)}, ${Utils.lang.round(g2)}, ${Utils.lang.round(b2)}, ${Utils.lang.round(a2)})`;
    } else {
      return `rgb(${Utils.lang.round(r2)}, ${Utils.lang.round(g2)}, ${Utils.lang.round(b2)})`;
    }
  }
};
const Color$1 = {
  /* VARIABLES */
  format: {
    keyword: Keyword,
    hex: Hex,
    rgb: RGB,
    rgba: RGB,
    hsl: HSL,
    hsla: HSL
  },
  /* API */
  parse: (color2) => {
    if (typeof color2 !== "string")
      return color2;
    const channels2 = Hex.parse(color2) || RGB.parse(color2) || HSL.parse(color2) || Keyword.parse(color2);
    if (channels2)
      return channels2;
    throw new Error(`Unsupported color format: "${color2}"`);
  },
  stringify: (channels2) => {
    if (!channels2.changed && channels2.color)
      return channels2.color;
    if (channels2.type.is(TYPE.HSL) || channels2.data.r === void 0) {
      return HSL.stringify(channels2);
    } else if (channels2.a < 1 || !Number.isInteger(channels2.r) || !Number.isInteger(channels2.g) || !Number.isInteger(channels2.b)) {
      return RGB.stringify(channels2);
    } else {
      return Hex.stringify(channels2);
    }
  }
};
const change = (color2, channels2) => {
  const ch = Color$1.parse(color2);
  for (const c2 in channels2) {
    ch[c2] = Utils.channel.clamp[c2](channels2[c2]);
  }
  return Color$1.stringify(ch);
};
const rgba$1 = (r2, g2, b2 = 0, a2 = 1) => {
  if (typeof r2 !== "number")
    return change(r2, { a: g2 });
  const channels$1 = channels.set({
    r: Utils.channel.clamp.r(r2),
    g: Utils.channel.clamp.g(g2),
    b: Utils.channel.clamp.b(b2),
    a: Utils.channel.clamp.a(a2)
  });
  return Color$1.stringify(channels$1);
};
const luminance = (color2) => {
  const { r: r2, g: g2, b: b2 } = Color$1.parse(color2);
  const luminance2 = 0.2126 * Utils.channel.toLinear(r2) + 0.7152 * Utils.channel.toLinear(g2) + 0.0722 * Utils.channel.toLinear(b2);
  return Utils.lang.round(luminance2);
};
const isLight = (color2) => {
  return luminance(color2) >= 0.5;
};
const isDark = (color2) => {
  return !isLight(color2);
};
const adjustChannel = (color2, channel, amount) => {
  const channels2 = Color$1.parse(color2);
  const amountCurrent = channels2[channel];
  const amountNext = Utils.channel.clamp[channel](amountCurrent + amount);
  if (amountCurrent !== amountNext)
    channels2[channel] = amountNext;
  return Color$1.stringify(channels2);
};
const lighten = (color2, amount) => {
  return adjustChannel(color2, "l", amount);
};
const darken = (color2, amount) => {
  return adjustChannel(color2, "l", -amount);
};
const adjust = (color2, channels2) => {
  const ch = Color$1.parse(color2);
  const changes = {};
  for (const c2 in channels2) {
    if (!channels2[c2])
      continue;
    changes[c2] = ch[c2] + channels2[c2];
  }
  return change(color2, changes);
};
const mix = (color1, color2, weight = 50) => {
  const { r: r1, g: g1, b: b1, a: a1 } = Color$1.parse(color1);
  const { r: r2, g: g2, b: b2, a: a2 } = Color$1.parse(color2);
  const weightScale = weight / 100;
  const weightNormalized = weightScale * 2 - 1;
  const alphaDelta = a1 - a2;
  const weight1combined = weightNormalized * alphaDelta === -1 ? weightNormalized : (weightNormalized + alphaDelta) / (1 + weightNormalized * alphaDelta);
  const weight1 = (weight1combined + 1) / 2;
  const weight2 = 1 - weight1;
  const r3 = r1 * weight1 + r2 * weight2;
  const g3 = g1 * weight1 + g2 * weight2;
  const b3 = b1 * weight1 + b2 * weight2;
  const a3 = a1 * weightScale + a2 * (1 - weightScale);
  return rgba$1(r3, g3, b3, a3);
};
const invert = (color2, weight = 100) => {
  const inverse = Color$1.parse(color2);
  inverse.r = 255 - inverse.r;
  inverse.g = 255 - inverse.g;
  inverse.b = 255 - inverse.b;
  return mix(inverse, color2, weight);
};
/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create: create$1
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x2) {
    return x2;
  };
}
if (!seal) {
  seal = function seal2(x2) {
    return x2;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set2, array2) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set2, null);
  }
  let l2 = array2.length;
  while (l2--) {
    let element = array2[l2];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array2)) {
          array2[l2] = lcElement;
        }
        element = lcElement;
      }
    }
    set2[element] = true;
  }
  return set2;
}
function cleanArray(array2) {
  for (let index = 0; index < array2.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array2, index);
    if (!isPropertyExist) {
      array2[index] = null;
    }
  }
  return array2;
}
function clone(object) {
  const newObject = create$1(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text$1 = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root2) => createDOMPurify(root2);
  DOMPurify.version = "3.2.7";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove2 = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text$1]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create$1(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text$1);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_2) {
      remove2(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_2) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root2) {
    return createNodeIterator.call(
      root2.ownerDocument || root2,
      root2,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i2 = childCount - 1; i2 >= 0; --i2) {
            const childClone = cloneNode(childNodes[i2], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l2 = attributes.length;
    while (l2--) {
      const attr = attributes[l2];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_2) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
var frontMatterRegex = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s;
var directiveRegex = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var anyCommentRegex = /\s*%%.*\n/gm;
var UnknownDiagramError = (_a = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UnknownDiagramError";
  }
}, __name(_a, "UnknownDiagramError"), _a);
var detectors = {};
var detectType$1 = /* @__PURE__ */ __name(function(text2, config2) {
  text2 = text2.replace(frontMatterRegex, "").replace(directiveRegex, "").replace(anyCommentRegex, "\n");
  for (const [key, { detector: detector28 }] of Object.entries(detectors)) {
    const diagram2 = detector28(text2, config2);
    if (diagram2) {
      return key;
    }
  }
  throw new UnknownDiagramError(
    `No diagram type detected matching given configuration for text: ${text2}`
  );
}, "detectType");
var registerLazyLoadedDiagrams = /* @__PURE__ */ __name((...diagrams2) => {
  for (const { id: id28, detector: detector28, loader: loader28 } of diagrams2) {
    addDetector(id28, detector28, loader28);
  }
}, "registerLazyLoadedDiagrams");
var addDetector = /* @__PURE__ */ __name((key, detector28, loader28) => {
  if (detectors[key]) {
    log.warn(`Detector with key ${key} already exists. Overwriting.`);
  }
  detectors[key] = { detector: detector28, loader: loader28 };
  log.debug(`Detector with key ${key} added${loader28 ? " with loader" : ""}`);
}, "addDetector");
var getDiagramLoader = /* @__PURE__ */ __name((key) => {
  return detectors[key].loader;
}, "getDiagramLoader");
var assignWithDepth = /* @__PURE__ */ __name((dst, src, { depth = 2, clobber = false } = {}) => {
  const config2 = { depth, clobber };
  if (Array.isArray(src) && !Array.isArray(dst)) {
    src.forEach((s2) => assignWithDepth(dst, s2, config2));
    return dst;
  } else if (Array.isArray(src) && Array.isArray(dst)) {
    src.forEach((s2) => {
      if (!dst.includes(s2)) {
        dst.push(s2);
      }
    });
    return dst;
  }
  if (dst === void 0 || depth <= 0) {
    if (dst !== void 0 && dst !== null && typeof dst === "object" && typeof src === "object") {
      return Object.assign(dst, src);
    } else {
      return src;
    }
  }
  if (src !== void 0 && typeof dst === "object" && typeof src === "object") {
    Object.keys(src).forEach((key) => {
      if (typeof src[key] === "object" && (dst[key] === void 0 || typeof dst[key] === "object")) {
        if (dst[key] === void 0) {
          dst[key] = Array.isArray(src[key]) ? [] : {};
        }
        dst[key] = assignWithDepth(dst[key], src[key], { depth: depth - 1, clobber });
      } else if (clobber || typeof dst[key] !== "object" && typeof src[key] !== "object") {
        dst[key] = src[key];
      }
    });
  }
  return dst;
}, "assignWithDepth");
var assignWithDepth_default = assignWithDepth;
var oldAttributeBackgroundColorOdd = "#ffffff";
var oldAttributeBackgroundColorEven = "#f2f2f2";
var mkBorder = /* @__PURE__ */ __name((col, darkMode) => darkMode ? adjust(col, { s: -40, l: 10 }) : adjust(col, { s: -40, l: -10 }), "mkBorder");
var Theme = (_b = class {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#fff4dd";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "#333";
    this.THEME_COLOR_LIMIT = 12;
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
  }
  updateColors() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333");
    this.secondaryColor = this.secondaryColor || adjust(this.primaryColor, { h: -120 });
    this.tertiaryColor = this.tertiaryColor || adjust(this.primaryColor, { h: 180, l: 5 });
    this.primaryBorderColor = this.primaryBorderColor || mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = this.secondaryBorderColor || mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = this.tertiaryBorderColor || mkBorder(this.tertiaryColor, this.darkMode);
    this.noteBorderColor = this.noteBorderColor || mkBorder(this.noteBkgColor, this.darkMode);
    this.noteBkgColor = this.noteBkgColor || "#fff5ad";
    this.noteTextColor = this.noteTextColor || "#333";
    this.secondaryTextColor = this.secondaryTextColor || invert(this.secondaryColor);
    this.tertiaryTextColor = this.tertiaryTextColor || invert(this.tertiaryColor);
    this.lineColor = this.lineColor || invert(this.background);
    this.arrowheadColor = this.arrowheadColor || invert(this.background);
    this.textColor = this.textColor || this.primaryTextColor;
    this.border2 = this.border2 || this.tertiaryBorderColor;
    this.nodeBkg = this.nodeBkg || this.primaryColor;
    this.mainBkg = this.mainBkg || this.primaryColor;
    this.nodeBorder = this.nodeBorder || this.primaryBorderColor;
    this.clusterBkg = this.clusterBkg || this.tertiaryColor;
    this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor;
    this.defaultLinkColor = this.defaultLinkColor || this.lineColor;
    this.titleColor = this.titleColor || this.tertiaryTextColor;
    this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? darken(this.secondaryColor, 30) : this.secondaryColor);
    this.nodeTextColor = this.nodeTextColor || this.primaryTextColor;
    this.actorBorder = this.actorBorder || this.primaryBorderColor;
    this.actorBkg = this.actorBkg || this.mainBkg;
    this.actorTextColor = this.actorTextColor || this.primaryTextColor;
    this.actorLineColor = this.actorLineColor || this.actorBorder;
    this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg;
    this.signalColor = this.signalColor || this.textColor;
    this.signalTextColor = this.signalTextColor || this.textColor;
    this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder;
    this.labelTextColor = this.labelTextColor || this.actorTextColor;
    this.loopTextColor = this.loopTextColor || this.actorTextColor;
    this.activationBorderColor = this.activationBorderColor || darken(this.secondaryColor, 10);
    this.activationBkgColor = this.activationBkgColor || this.secondaryColor;
    this.sequenceNumberColor = this.sequenceNumberColor || invert(this.lineColor);
    this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor;
    this.altSectionBkgColor = this.altSectionBkgColor || "white";
    this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor;
    this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor;
    this.excludeBkgColor = this.excludeBkgColor || "#eeeeee";
    this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor;
    this.taskBkgColor = this.taskBkgColor || this.primaryColor;
    this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor;
    this.activeTaskBkgColor = this.activeTaskBkgColor || lighten(this.primaryColor, 23);
    this.gridColor = this.gridColor || "lightgrey";
    this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey";
    this.doneTaskBorderColor = this.doneTaskBorderColor || "grey";
    this.critBorderColor = this.critBorderColor || "#ff8888";
    this.critBkgColor = this.critBkgColor || "red";
    this.todayLineColor = this.todayLineColor || "red";
    this.vertLineColor = this.vertLineColor || "navy";
    this.taskTextColor = this.taskTextColor || this.textColor;
    this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor;
    this.taskTextLightColor = this.taskTextLightColor || this.textColor;
    this.taskTextColor = this.taskTextColor || this.primaryTextColor;
    this.taskTextDarkColor = this.taskTextDarkColor || this.textColor;
    this.taskTextClickableColor = this.taskTextClickableColor || "#003163";
    this.personBorder = this.personBorder || this.primaryBorderColor;
    this.personBkg = this.personBkg || this.mainBkg;
    if (this.darkMode) {
      this.rowOdd = this.rowOdd || darken(this.mainBkg, 5) || "#ffffff";
      this.rowEven = this.rowEven || darken(this.mainBkg, 10);
    } else {
      this.rowOdd = this.rowOdd || lighten(this.mainBkg, 75) || "#ffffff";
      this.rowEven = this.rowEven || lighten(this.mainBkg, 5);
    }
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || this.tertiaryColor;
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.nodeBorder;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.specialStateColor = this.lineColor;
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust(this.primaryColor, { h: 210, l: 150 });
    this.cScale9 = this.cScale9 || adjust(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust(this.primaryColor, { h: 330 });
    if (this.darkMode) {
      for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
        this["cScale" + i2] = darken(this["cScale" + i2], 75);
      }
    } else {
      for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
        this["cScale" + i2] = darken(this["cScale" + i2], 25);
      }
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleInv" + i2] = this["cScaleInv" + i2] || invert(this["cScale" + i2]);
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      if (this.darkMode) {
        this["cScalePeer" + i2] = this["cScalePeer" + i2] || lighten(this["cScale" + i2], 10);
      } else {
        this["cScalePeer" + i2] = this["cScalePeer" + i2] || darken(this["cScale" + i2], 10);
      }
    }
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleLabel" + i2] = this["cScaleLabel" + i2] || this.scaleLabelColor;
    }
    const multiplier = this.darkMode ? -4 : -1;
    for (let i2 = 0; i2 < 5; i2++) {
      this["surface" + i2] = this["surface" + i2] || adjust(this.mainBkg, { h: 180, s: -15, l: multiplier * (5 + i2 * 3) });
      this["surfacePeer" + i2] = this["surfacePeer" + i2] || adjust(this.mainBkg, { h: 180, s: -15, l: multiplier * (8 + i2 * 3) });
    }
    this.classText = this.classText || this.textColor;
    this.fillType0 = this.fillType0 || this.primaryColor;
    this.fillType1 = this.fillType1 || this.secondaryColor;
    this.fillType2 = this.fillType2 || adjust(this.primaryColor, { h: 64 });
    this.fillType3 = this.fillType3 || adjust(this.secondaryColor, { h: 64 });
    this.fillType4 = this.fillType4 || adjust(this.primaryColor, { h: -64 });
    this.fillType5 = this.fillType5 || adjust(this.secondaryColor, { h: -64 });
    this.fillType6 = this.fillType6 || adjust(this.primaryColor, { h: 128 });
    this.fillType7 = this.fillType7 || adjust(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || this.tertiaryColor;
    this.pie4 = this.pie4 || adjust(this.primaryColor, { l: -10 });
    this.pie5 = this.pie5 || adjust(this.secondaryColor, { l: -10 });
    this.pie6 = this.pie6 || adjust(this.tertiaryColor, { l: -10 });
    this.pie7 = this.pie7 || adjust(this.primaryColor, { h: 60, l: -10 });
    this.pie8 = this.pie8 || adjust(this.primaryColor, { h: -60, l: -10 });
    this.pie9 = this.pie9 || adjust(this.primaryColor, { h: 120, l: 0 });
    this.pie10 = this.pie10 || adjust(this.primaryColor, { h: 60, l: -20 });
    this.pie11 = this.pie11 || adjust(this.primaryColor, { h: -60, l: -20 });
    this.pie12 = this.pie12 || adjust(this.primaryColor, { h: 120, l: -10 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px";
    this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.radar = {
      axisColor: ((_a2 = this.radar) == null ? void 0 : _a2.axisColor) || this.lineColor,
      axisStrokeWidth: ((_b2 = this.radar) == null ? void 0 : _b2.axisStrokeWidth) || 2,
      axisLabelFontSize: ((_c2 = this.radar) == null ? void 0 : _c2.axisLabelFontSize) || 12,
      curveOpacity: ((_d2 = this.radar) == null ? void 0 : _d2.curveOpacity) || 0.5,
      curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2,
      graticuleColor: ((_f2 = this.radar) == null ? void 0 : _f2.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((_g2 = this.radar) == null ? void 0 : _g2.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_h2 = this.radar) == null ? void 0 : _h2.graticuleOpacity) || 0.3,
      legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12,
      legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12
    };
    this.archEdgeColor = this.archEdgeColor || "#777";
    this.archEdgeArrowColor = this.archEdgeArrowColor || "#777";
    this.archEdgeWidth = this.archEdgeWidth || "3";
    this.archGroupBorderColor = this.archGroupBorderColor || "#000";
    this.archGroupBorderWidth = this.archGroupBorderWidth || "2px";
    this.quadrant1Fill = this.quadrant1Fill || this.primaryColor;
    this.quadrant2Fill = this.quadrant2Fill || adjust(this.primaryColor, { r: 5, g: 5, b: 5 });
    this.quadrant3Fill = this.quadrant3Fill || adjust(this.primaryColor, { r: 10, g: 10, b: 10 });
    this.quadrant4Fill = this.quadrant4Fill || adjust(this.primaryColor, { r: 15, g: 15, b: 15 });
    this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor;
    this.quadrant2TextFill = this.quadrant2TextFill || adjust(this.primaryTextColor, { r: -5, g: -5, b: -5 });
    this.quadrant3TextFill = this.quadrant3TextFill || adjust(this.primaryTextColor, { r: -10, g: -10, b: -10 });
    this.quadrant4TextFill = this.quadrant4TextFill || adjust(this.primaryTextColor, { r: -15, g: -15, b: -15 });
    this.quadrantPointFill = this.quadrantPointFill || isDark(this.quadrant1Fill) ? lighten(this.quadrant1Fill) : darken(this.quadrant1Fill);
    this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor;
    this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor;
    this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor;
    this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor;
    this.xyChart = {
      backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background,
      titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((_m = this.xyChart) == null ? void 0 : _m.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((_o = this.xyChart) == null ? void 0 : _o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((_q = this.xyChart) == null ? void 0 : _q.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((_u = this.xyChart) == null ? void 0 : _u.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    };
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || "1";
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? darken(this.secondaryColor, 30) : this.secondaryColor);
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten(this.git0, 25);
      this.git1 = lighten(this.git1, 25);
      this.git2 = lighten(this.git2, 25);
      this.git3 = lighten(this.git3, 25);
      this.git4 = lighten(this.git4, 25);
      this.git5 = lighten(this.git5, 25);
      this.git6 = lighten(this.git6, 25);
      this.git7 = lighten(this.git7, 25);
    } else {
      this.git0 = darken(this.git0, 25);
      this.git1 = darken(this.git1, 25);
      this.git2 = darken(this.git2, 25);
      this.git3 = darken(this.git3, 25);
      this.git4 = darken(this.git4, 25);
      this.git5 = darken(this.git5, 25);
      this.git6 = darken(this.git6, 25);
      this.git7 = darken(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || invert(this.git0);
    this.gitInv1 = this.gitInv1 || invert(this.git1);
    this.gitInv2 = this.gitInv2 || invert(this.git2);
    this.gitInv3 = this.gitInv3 || invert(this.git3);
    this.gitInv4 = this.gitInv4 || invert(this.git4);
    this.gitInv5 = this.gitInv5 || invert(this.git5);
    this.gitInv6 = this.gitInv6 || invert(this.git6);
    this.gitInv7 = this.gitInv7 || invert(this.git7);
    this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor;
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor;
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
    this.updateColors();
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
  }
}, __name(_b, "Theme"), _b);
var getThemeVariables = /* @__PURE__ */ __name((userOverrides) => {
  const theme = new Theme();
  theme.calculate(userOverrides);
  return theme;
}, "getThemeVariables");
var Theme2 = (_c = class {
  constructor() {
    this.background = "#333";
    this.primaryColor = "#1f2020";
    this.secondaryColor = lighten(this.primaryColor, 16);
    this.tertiaryColor = adjust(this.primaryColor, { h: -160 });
    this.primaryBorderColor = invert(this.background);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert(this.primaryColor);
    this.secondaryTextColor = invert(this.secondaryColor);
    this.tertiaryTextColor = invert(this.tertiaryColor);
    this.lineColor = invert(this.background);
    this.textColor = invert(this.background);
    this.mainBkg = "#1f2020";
    this.secondBkg = "calculated";
    this.mainContrastColor = "lightgrey";
    this.darkTextColor = lighten(invert("#323D47"), 10);
    this.lineColor = "calculated";
    this.border1 = "#ccc";
    this.border2 = rgba$1(255, 255, 255, 0.25);
    this.arrowheadColor = "calculated";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.labelBackground = "#181818";
    this.textColor = "#ccc";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "#F9FFFE";
    this.edgeLabelBackground = "calculated";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "calculated";
    this.actorLineColor = "calculated";
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "calculated";
    this.activationBkgColor = "calculated";
    this.sequenceNumberColor = "black";
    this.sectionBkgColor = darken("#EAE8D9", 30);
    this.altSectionBkgColor = "calculated";
    this.sectionBkgColor2 = "#EAE8D9";
    this.excludeBkgColor = darken(this.sectionBkgColor, 10);
    this.taskBorderColor = rgba$1(255, 255, 255, 70);
    this.taskBkgColor = "calculated";
    this.taskTextColor = "calculated";
    this.taskTextLightColor = "calculated";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = rgba$1(255, 255, 255, 50);
    this.activeTaskBkgColor = "#81B1DB";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#E83737";
    this.critBkgColor = "#E83737";
    this.taskTextDarkColor = "calculated";
    this.todayLineColor = "#DB5757";
    this.vertLineColor = "#00BFFF";
    this.personBorder = this.primaryBorderColor;
    this.personBkg = this.mainBkg;
    this.archEdgeColor = "calculated";
    this.archEdgeArrowColor = "calculated";
    this.archEdgeWidth = "3";
    this.archGroupBorderColor = this.primaryBorderColor;
    this.archGroupBorderWidth = "2px";
    this.rowOdd = this.rowOdd || lighten(this.mainBkg, 5) || "#ffffff";
    this.rowEven = this.rowEven || darken(this.mainBkg, 10);
    this.labelColor = "calculated";
    this.errorBkgColor = "#a44141";
    this.errorTextColor = "#ddd";
  }
  updateColors() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    this.secondBkg = lighten(this.mainBkg, 16);
    this.lineColor = this.mainContrastColor;
    this.arrowheadColor = this.mainContrastColor;
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.edgeLabelBackground = lighten(this.labelBackground, 25);
    this.actorBorder = this.border1;
    this.actorBkg = this.mainBkg;
    this.actorTextColor = this.mainContrastColor;
    this.actorLineColor = this.actorBorder;
    this.signalColor = this.mainContrastColor;
    this.signalTextColor = this.mainContrastColor;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.mainContrastColor;
    this.loopTextColor = this.mainContrastColor;
    this.noteBorderColor = this.secondaryBorderColor;
    this.noteBkgColor = this.secondBkg;
    this.noteTextColor = this.secondaryTextColor;
    this.activationBorderColor = this.border1;
    this.activationBkgColor = this.secondBkg;
    this.altSectionBkgColor = this.background;
    this.taskBkgColor = lighten(this.mainBkg, 23);
    this.taskTextColor = this.darkTextColor;
    this.taskTextLightColor = this.mainContrastColor;
    this.taskTextOutsideColor = this.taskTextLightColor;
    this.gridColor = this.mainContrastColor;
    this.doneTaskBkgColor = this.mainContrastColor;
    this.taskTextDarkColor = this.darkTextColor;
    this.archEdgeColor = this.lineColor;
    this.archEdgeArrowColor = this.lineColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#555";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = "#f4f4f4";
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust(this.primaryColor, { h: 64 });
    this.fillType3 = adjust(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust(this.primaryColor, { h: -64 });
    this.fillType5 = adjust(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust(this.primaryColor, { h: 128 });
    this.fillType7 = adjust(this.secondaryColor, { h: 128 });
    this.cScale1 = this.cScale1 || "#0b0000";
    this.cScale2 = this.cScale2 || "#4d1037";
    this.cScale3 = this.cScale3 || "#3f5258";
    this.cScale4 = this.cScale4 || "#4f2f1b";
    this.cScale5 = this.cScale5 || "#6e0a0a";
    this.cScale6 = this.cScale6 || "#3b0048";
    this.cScale7 = this.cScale7 || "#995a01";
    this.cScale8 = this.cScale8 || "#154706";
    this.cScale9 = this.cScale9 || "#161722";
    this.cScale10 = this.cScale10 || "#00296f";
    this.cScale11 = this.cScale11 || "#01629c";
    this.cScale12 = this.cScale12 || "#010029";
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust(this.primaryColor, { h: 330 });
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleInv" + i2] = this["cScaleInv" + i2] || invert(this["cScale" + i2]);
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScalePeer" + i2] = this["cScalePeer" + i2] || lighten(this["cScale" + i2], 10);
    }
    for (let i2 = 0; i2 < 5; i2++) {
      this["surface" + i2] = this["surface" + i2] || adjust(this.mainBkg, { h: 30, s: -30, l: -(-10 + i2 * 4) });
      this["surfacePeer" + i2] = this["surfacePeer" + i2] || adjust(this.mainBkg, { h: 30, s: -30, l: -(-7 + i2 * 4) });
    }
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleLabel" + i2] = this["cScaleLabel" + i2] || this.scaleLabelColor;
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["pie" + i2] = this["cScale" + i2];
    }
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px";
    this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.quadrant1Fill = this.quadrant1Fill || this.primaryColor;
    this.quadrant2Fill = this.quadrant2Fill || adjust(this.primaryColor, { r: 5, g: 5, b: 5 });
    this.quadrant3Fill = this.quadrant3Fill || adjust(this.primaryColor, { r: 10, g: 10, b: 10 });
    this.quadrant4Fill = this.quadrant4Fill || adjust(this.primaryColor, { r: 15, g: 15, b: 15 });
    this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor;
    this.quadrant2TextFill = this.quadrant2TextFill || adjust(this.primaryTextColor, { r: -5, g: -5, b: -5 });
    this.quadrant3TextFill = this.quadrant3TextFill || adjust(this.primaryTextColor, { r: -10, g: -10, b: -10 });
    this.quadrant4TextFill = this.quadrant4TextFill || adjust(this.primaryTextColor, { r: -15, g: -15, b: -15 });
    this.quadrantPointFill = this.quadrantPointFill || isDark(this.quadrant1Fill) ? lighten(this.quadrant1Fill) : darken(this.quadrant1Fill);
    this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor;
    this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor;
    this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor;
    this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor;
    this.xyChart = {
      backgroundColor: ((_a2 = this.xyChart) == null ? void 0 : _a2.backgroundColor) || this.background,
      titleColor: ((_b2 = this.xyChart) == null ? void 0 : _b2.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((_c2 = this.xyChart) == null ? void 0 : _c2.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((_d2 = this.xyChart) == null ? void 0 : _d2.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((_f2 = this.xyChart) == null ? void 0 : _f2.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((_g2 = this.xyChart) == null ? void 0 : _g2.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_h2 = this.xyChart) == null ? void 0 : _h2.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22"
    };
    this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.background
    };
    this.radar = {
      axisColor: ((_l = this.radar) == null ? void 0 : _l.axisColor) || this.lineColor,
      axisStrokeWidth: ((_m = this.radar) == null ? void 0 : _m.axisStrokeWidth) || 2,
      axisLabelFontSize: ((_n = this.radar) == null ? void 0 : _n.axisLabelFontSize) || 12,
      curveOpacity: ((_o = this.radar) == null ? void 0 : _o.curveOpacity) || 0.5,
      curveStrokeWidth: ((_p = this.radar) == null ? void 0 : _p.curveStrokeWidth) || 2,
      graticuleColor: ((_q = this.radar) == null ? void 0 : _q.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((_r = this.radar) == null ? void 0 : _r.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_s = this.radar) == null ? void 0 : _s.graticuleOpacity) || 0.3,
      legendBoxSize: ((_t = this.radar) == null ? void 0 : _t.legendBoxSize) || 12,
      legendFontSize: ((_u = this.radar) == null ? void 0 : _u.legendFontSize) || 12
    };
    this.classText = this.primaryTextColor;
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || "1";
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? darken(this.secondaryColor, 30) : this.secondaryColor);
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = lighten(this.secondaryColor, 20);
    this.git1 = lighten(this.pie2 || this.secondaryColor, 20);
    this.git2 = lighten(this.pie3 || this.tertiaryColor, 20);
    this.git3 = lighten(this.pie4 || adjust(this.primaryColor, { h: -30 }), 20);
    this.git4 = lighten(this.pie5 || adjust(this.primaryColor, { h: -60 }), 20);
    this.git5 = lighten(this.pie6 || adjust(this.primaryColor, { h: -90 }), 10);
    this.git6 = lighten(this.pie7 || adjust(this.primaryColor, { h: 60 }), 10);
    this.git7 = lighten(this.pie8 || adjust(this.primaryColor, { h: 120 }), 20);
    this.gitInv0 = this.gitInv0 || invert(this.git0);
    this.gitInv1 = this.gitInv1 || invert(this.git1);
    this.gitInv2 = this.gitInv2 || invert(this.git2);
    this.gitInv3 = this.gitInv3 || invert(this.git3);
    this.gitInv4 = this.gitInv4 || invert(this.git4);
    this.gitInv5 = this.gitInv5 || invert(this.git5);
    this.gitInv6 = this.gitInv6 || invert(this.git6);
    this.gitInv7 = this.gitInv7 || invert(this.git7);
    this.gitBranchLabel0 = this.gitBranchLabel0 || invert(this.labelTextColor);
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || invert(this.labelTextColor);
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || lighten(this.background, 12);
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || lighten(this.background, 2);
    this.nodeBorder = this.nodeBorder || "#999";
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
    this.updateColors();
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
  }
}, __name(_c, "Theme"), _c);
var getThemeVariables2 = /* @__PURE__ */ __name((userOverrides) => {
  const theme = new Theme2();
  theme.calculate(userOverrides);
  return theme;
}, "getThemeVariables");
var Theme3 = (_d = class {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#ECECFF";
    this.secondaryColor = adjust(this.primaryColor, { h: 120 });
    this.secondaryColor = "#ffffde";
    this.tertiaryColor = adjust(this.primaryColor, { h: -160 });
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert(this.primaryColor);
    this.secondaryTextColor = invert(this.secondaryColor);
    this.tertiaryTextColor = invert(this.tertiaryColor);
    this.lineColor = invert(this.background);
    this.textColor = invert(this.background);
    this.background = "white";
    this.mainBkg = "#ECECFF";
    this.secondBkg = "#ffffde";
    this.lineColor = "#333333";
    this.border1 = "#9370DB";
    this.border2 = "#aaaa33";
    this.arrowheadColor = "#333333";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.labelBackground = "rgba(232,232,232, 0.8)";
    this.textColor = "#333";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "calculated";
    this.edgeLabelBackground = "calculated";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "black";
    this.actorLineColor = "calculated";
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "calculated";
    this.altSectionBkgColor = "calculated";
    this.sectionBkgColor2 = "calculated";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "calculated";
    this.taskTextLightColor = "calculated";
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextDarkColor = "calculated";
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.taskTextClickableColor = "calculated";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "calculated";
    this.critBorderColor = "calculated";
    this.critBkgColor = "calculated";
    this.todayLineColor = "calculated";
    this.vertLineColor = "calculated";
    this.sectionBkgColor = rgba$1(102, 102, 255, 0.49);
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "#fff400";
    this.taskBorderColor = "#534fbc";
    this.taskBkgColor = "#8a90dd";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "black";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "#534fbc";
    this.activeTaskBkgColor = "#bfc7ff";
    this.gridColor = "lightgrey";
    this.doneTaskBkgColor = "lightgrey";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#ff8888";
    this.critBkgColor = "red";
    this.todayLineColor = "red";
    this.vertLineColor = "navy";
    this.personBorder = this.primaryBorderColor;
    this.personBkg = this.mainBkg;
    this.archEdgeColor = "calculated";
    this.archEdgeArrowColor = "calculated";
    this.archEdgeWidth = "3";
    this.archGroupBorderColor = this.primaryBorderColor;
    this.archGroupBorderWidth = "2px";
    this.rowOdd = "calculated";
    this.rowEven = "calculated";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
    this.updateColors();
  }
  updateColors() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust(this.primaryColor, { h: 330 });
    this["cScalePeer1"] = this["cScalePeer1"] || darken(this.secondaryColor, 45);
    this["cScalePeer2"] = this["cScalePeer2"] || darken(this.tertiaryColor, 40);
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScale" + i2] = darken(this["cScale" + i2], 10);
      this["cScalePeer" + i2] = this["cScalePeer" + i2] || darken(this["cScale" + i2], 25);
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleInv" + i2] = this["cScaleInv" + i2] || adjust(this["cScale" + i2], { h: 180 });
    }
    for (let i2 = 0; i2 < 5; i2++) {
      this["surface" + i2] = this["surface" + i2] || adjust(this.mainBkg, { h: 30, l: -(5 + i2 * 5) });
      this["surfacePeer" + i2] = this["surfacePeer" + i2] || adjust(this.mainBkg, { h: 30, l: -(7 + i2 * 5) });
    }
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    if (this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || invert(this.labelTextColor);
      this.cScaleLabel3 = this.cScaleLabel3 || invert(this.labelTextColor);
      for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
        this["cScaleLabel" + i2] = this["cScaleLabel" + i2] || this.labelTextColor;
      }
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.titleColor = this.textColor;
    this.edgeLabelBackground = this.labelBackground;
    this.actorBorder = lighten(this.border1, 23);
    this.actorBkg = this.mainBkg;
    this.labelBoxBkgColor = this.actorBkg;
    this.signalColor = this.textColor;
    this.signalTextColor = this.textColor;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.actorTextColor;
    this.loopTextColor = this.actorTextColor;
    this.noteBorderColor = this.border2;
    this.noteTextColor = this.actorTextColor;
    this.actorLineColor = this.actorBorder;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.archEdgeColor = this.lineColor;
    this.archEdgeArrowColor = this.lineColor;
    this.rowOdd = this.rowOdd || lighten(this.primaryColor, 75) || "#ffffff";
    this.rowEven = this.rowEven || lighten(this.primaryColor, 1);
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f0f0f0";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.nodeBorder;
    this.specialStateColor = this.lineColor;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust(this.primaryColor, { h: 64 });
    this.fillType3 = adjust(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust(this.primaryColor, { h: -64 });
    this.fillType5 = adjust(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust(this.primaryColor, { h: 128 });
    this.fillType7 = adjust(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || adjust(this.tertiaryColor, { l: -40 });
    this.pie4 = this.pie4 || adjust(this.primaryColor, { l: -10 });
    this.pie5 = this.pie5 || adjust(this.secondaryColor, { l: -30 });
    this.pie6 = this.pie6 || adjust(this.tertiaryColor, { l: -20 });
    this.pie7 = this.pie7 || adjust(this.primaryColor, { h: 60, l: -20 });
    this.pie8 = this.pie8 || adjust(this.primaryColor, { h: -60, l: -40 });
    this.pie9 = this.pie9 || adjust(this.primaryColor, { h: 120, l: -40 });
    this.pie10 = this.pie10 || adjust(this.primaryColor, { h: 60, l: -40 });
    this.pie11 = this.pie11 || adjust(this.primaryColor, { h: -90, l: -40 });
    this.pie12 = this.pie12 || adjust(this.primaryColor, { h: 120, l: -30 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px";
    this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.quadrant1Fill = this.quadrant1Fill || this.primaryColor;
    this.quadrant2Fill = this.quadrant2Fill || adjust(this.primaryColor, { r: 5, g: 5, b: 5 });
    this.quadrant3Fill = this.quadrant3Fill || adjust(this.primaryColor, { r: 10, g: 10, b: 10 });
    this.quadrant4Fill = this.quadrant4Fill || adjust(this.primaryColor, { r: 15, g: 15, b: 15 });
    this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor;
    this.quadrant2TextFill = this.quadrant2TextFill || adjust(this.primaryTextColor, { r: -5, g: -5, b: -5 });
    this.quadrant3TextFill = this.quadrant3TextFill || adjust(this.primaryTextColor, { r: -10, g: -10, b: -10 });
    this.quadrant4TextFill = this.quadrant4TextFill || adjust(this.primaryTextColor, { r: -15, g: -15, b: -15 });
    this.quadrantPointFill = this.quadrantPointFill || isDark(this.quadrant1Fill) ? lighten(this.quadrant1Fill) : darken(this.quadrant1Fill);
    this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor;
    this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor;
    this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor;
    this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor;
    this.radar = {
      axisColor: ((_a2 = this.radar) == null ? void 0 : _a2.axisColor) || this.lineColor,
      axisStrokeWidth: ((_b2 = this.radar) == null ? void 0 : _b2.axisStrokeWidth) || 2,
      axisLabelFontSize: ((_c2 = this.radar) == null ? void 0 : _c2.axisLabelFontSize) || 12,
      curveOpacity: ((_d2 = this.radar) == null ? void 0 : _d2.curveOpacity) || 0.5,
      curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2,
      graticuleColor: ((_f2 = this.radar) == null ? void 0 : _f2.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((_g2 = this.radar) == null ? void 0 : _g2.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_h2 = this.radar) == null ? void 0 : _h2.graticuleOpacity) || 0.3,
      legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12,
      legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12
    };
    this.xyChart = {
      backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background,
      titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((_m = this.xyChart) == null ? void 0 : _m.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((_o = this.xyChart) == null ? void 0 : _o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((_q = this.xyChart) == null ? void 0 : _q.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((_u = this.xyChart) == null ? void 0 : _u.plotColorPalette) || "#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3"
    };
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || "1";
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.labelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten(this.git0, 25);
      this.git1 = lighten(this.git1, 25);
      this.git2 = lighten(this.git2, 25);
      this.git3 = lighten(this.git3, 25);
      this.git4 = lighten(this.git4, 25);
      this.git5 = lighten(this.git5, 25);
      this.git6 = lighten(this.git6, 25);
      this.git7 = lighten(this.git7, 25);
    } else {
      this.git0 = darken(this.git0, 25);
      this.git1 = darken(this.git1, 25);
      this.git2 = darken(this.git2, 25);
      this.git3 = darken(this.git3, 25);
      this.git4 = darken(this.git4, 25);
      this.git5 = darken(this.git5, 25);
      this.git6 = darken(this.git6, 25);
      this.git7 = darken(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || darken(invert(this.git0), 25);
    this.gitInv1 = this.gitInv1 || invert(this.git1);
    this.gitInv2 = this.gitInv2 || invert(this.git2);
    this.gitInv3 = this.gitInv3 || invert(this.git3);
    this.gitInv4 = this.gitInv4 || invert(this.git4);
    this.gitInv5 = this.gitInv5 || invert(this.git5);
    this.gitInv6 = this.gitInv6 || invert(this.git6);
    this.gitInv7 = this.gitInv7 || invert(this.git7);
    this.gitBranchLabel0 = this.gitBranchLabel0 || invert(this.labelTextColor);
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || invert(this.labelTextColor);
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    Object.keys(this).forEach((k2) => {
      if (this[k2] === "calculated") {
        this[k2] = void 0;
      }
    });
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
    this.updateColors();
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
  }
}, __name(_d, "Theme"), _d);
var getThemeVariables3 = /* @__PURE__ */ __name((userOverrides) => {
  const theme = new Theme3();
  theme.calculate(userOverrides);
  return theme;
}, "getThemeVariables");
var Theme4 = (_e = class {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#cde498";
    this.secondaryColor = "#cdffb2";
    this.background = "white";
    this.mainBkg = "#cde498";
    this.secondBkg = "#cdffb2";
    this.lineColor = "green";
    this.border1 = "#13540c";
    this.border2 = "#6eaa49";
    this.arrowheadColor = "green";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.tertiaryColor = lighten("#cde498", 10);
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert(this.primaryColor);
    this.secondaryTextColor = invert(this.secondaryColor);
    this.tertiaryTextColor = invert(this.primaryColor);
    this.lineColor = invert(this.background);
    this.textColor = invert(this.background);
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "#333";
    this.edgeLabelBackground = "#e8e8e8";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "black";
    this.actorLineColor = "calculated";
    this.signalColor = "#333";
    this.signalTextColor = "#333";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "#326932";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "#6eaa49";
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "#6eaa49";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "#487e3a";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "black";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "lightgrey";
    this.doneTaskBkgColor = "lightgrey";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#ff8888";
    this.critBkgColor = "red";
    this.todayLineColor = "red";
    this.vertLineColor = "#00BFFF";
    this.personBorder = this.primaryBorderColor;
    this.personBkg = this.mainBkg;
    this.archEdgeColor = "calculated";
    this.archEdgeArrowColor = "calculated";
    this.archEdgeWidth = "3";
    this.archGroupBorderColor = this.primaryBorderColor;
    this.archGroupBorderWidth = "2px";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
  }
  updateColors() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    this.actorBorder = darken(this.mainBkg, 20);
    this.actorBkg = this.mainBkg;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelTextColor = this.actorTextColor;
    this.loopTextColor = this.actorTextColor;
    this.noteBorderColor = this.border2;
    this.noteTextColor = this.actorTextColor;
    this.actorLineColor = this.actorBorder;
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust(this.primaryColor, { h: 330 });
    this["cScalePeer1"] = this["cScalePeer1"] || darken(this.secondaryColor, 45);
    this["cScalePeer2"] = this["cScalePeer2"] || darken(this.tertiaryColor, 40);
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScale" + i2] = darken(this["cScale" + i2], 10);
      this["cScalePeer" + i2] = this["cScalePeer" + i2] || darken(this["cScale" + i2], 25);
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleInv" + i2] = this["cScaleInv" + i2] || adjust(this["cScale" + i2], { h: 180 });
    }
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleLabel" + i2] = this["cScaleLabel" + i2] || this.scaleLabelColor;
    }
    for (let i2 = 0; i2 < 5; i2++) {
      this["surface" + i2] = this["surface" + i2] || adjust(this.mainBkg, { h: 30, s: -30, l: -(5 + i2 * 5) });
      this["surfacePeer" + i2] = this["surfacePeer" + i2] || adjust(this.mainBkg, { h: 30, s: -30, l: -(8 + i2 * 5) });
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.taskBorderColor = this.border1;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.activeTaskBorderColor = this.taskBorderColor;
    this.activeTaskBkgColor = this.mainBkg;
    this.archEdgeColor = this.lineColor;
    this.archEdgeArrowColor = this.lineColor;
    this.rowOdd = this.rowOdd || lighten(this.mainBkg, 75) || "#ffffff";
    this.rowEven = this.rowEven || lighten(this.mainBkg, 20);
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f0f0f0";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = this.lineColor;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust(this.primaryColor, { h: 64 });
    this.fillType3 = adjust(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust(this.primaryColor, { h: -64 });
    this.fillType5 = adjust(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust(this.primaryColor, { h: 128 });
    this.fillType7 = adjust(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || this.tertiaryColor;
    this.pie4 = this.pie4 || adjust(this.primaryColor, { l: -30 });
    this.pie5 = this.pie5 || adjust(this.secondaryColor, { l: -30 });
    this.pie6 = this.pie6 || adjust(this.tertiaryColor, { h: 40, l: -40 });
    this.pie7 = this.pie7 || adjust(this.primaryColor, { h: 60, l: -10 });
    this.pie8 = this.pie8 || adjust(this.primaryColor, { h: -60, l: -10 });
    this.pie9 = this.pie9 || adjust(this.primaryColor, { h: 120, l: 0 });
    this.pie10 = this.pie10 || adjust(this.primaryColor, { h: 60, l: -50 });
    this.pie11 = this.pie11 || adjust(this.primaryColor, { h: -60, l: -50 });
    this.pie12 = this.pie12 || adjust(this.primaryColor, { h: 120, l: -50 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px";
    this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.quadrant1Fill = this.quadrant1Fill || this.primaryColor;
    this.quadrant2Fill = this.quadrant2Fill || adjust(this.primaryColor, { r: 5, g: 5, b: 5 });
    this.quadrant3Fill = this.quadrant3Fill || adjust(this.primaryColor, { r: 10, g: 10, b: 10 });
    this.quadrant4Fill = this.quadrant4Fill || adjust(this.primaryColor, { r: 15, g: 15, b: 15 });
    this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor;
    this.quadrant2TextFill = this.quadrant2TextFill || adjust(this.primaryTextColor, { r: -5, g: -5, b: -5 });
    this.quadrant3TextFill = this.quadrant3TextFill || adjust(this.primaryTextColor, { r: -10, g: -10, b: -10 });
    this.quadrant4TextFill = this.quadrant4TextFill || adjust(this.primaryTextColor, { r: -15, g: -15, b: -15 });
    this.quadrantPointFill = this.quadrantPointFill || isDark(this.quadrant1Fill) ? lighten(this.quadrant1Fill) : darken(this.quadrant1Fill);
    this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor;
    this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor;
    this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor;
    this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor;
    this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.mainBkg
    };
    this.radar = {
      axisColor: ((_a2 = this.radar) == null ? void 0 : _a2.axisColor) || this.lineColor,
      axisStrokeWidth: ((_b2 = this.radar) == null ? void 0 : _b2.axisStrokeWidth) || 2,
      axisLabelFontSize: ((_c2 = this.radar) == null ? void 0 : _c2.axisLabelFontSize) || 12,
      curveOpacity: ((_d2 = this.radar) == null ? void 0 : _d2.curveOpacity) || 0.5,
      curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2,
      graticuleColor: ((_f2 = this.radar) == null ? void 0 : _f2.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((_g2 = this.radar) == null ? void 0 : _g2.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_h2 = this.radar) == null ? void 0 : _h2.graticuleOpacity) || 0.3,
      legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12,
      legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12
    };
    this.xyChart = {
      backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background,
      titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((_m = this.xyChart) == null ? void 0 : _m.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((_o = this.xyChart) == null ? void 0 : _o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((_q = this.xyChart) == null ? void 0 : _q.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((_u = this.xyChart) == null ? void 0 : _u.plotColorPalette) || "#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176"
    };
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || "1";
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten(this.git0, 25);
      this.git1 = lighten(this.git1, 25);
      this.git2 = lighten(this.git2, 25);
      this.git3 = lighten(this.git3, 25);
      this.git4 = lighten(this.git4, 25);
      this.git5 = lighten(this.git5, 25);
      this.git6 = lighten(this.git6, 25);
      this.git7 = lighten(this.git7, 25);
    } else {
      this.git0 = darken(this.git0, 25);
      this.git1 = darken(this.git1, 25);
      this.git2 = darken(this.git2, 25);
      this.git3 = darken(this.git3, 25);
      this.git4 = darken(this.git4, 25);
      this.git5 = darken(this.git5, 25);
      this.git6 = darken(this.git6, 25);
      this.git7 = darken(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || invert(this.git0);
    this.gitInv1 = this.gitInv1 || invert(this.git1);
    this.gitInv2 = this.gitInv2 || invert(this.git2);
    this.gitInv3 = this.gitInv3 || invert(this.git3);
    this.gitInv4 = this.gitInv4 || invert(this.git4);
    this.gitInv5 = this.gitInv5 || invert(this.git5);
    this.gitInv6 = this.gitInv6 || invert(this.git6);
    this.gitInv7 = this.gitInv7 || invert(this.git7);
    this.gitBranchLabel0 = this.gitBranchLabel0 || invert(this.labelTextColor);
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || invert(this.labelTextColor);
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
    this.updateColors();
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
  }
}, __name(_e, "Theme"), _e);
var getThemeVariables4 = /* @__PURE__ */ __name((userOverrides) => {
  const theme = new Theme4();
  theme.calculate(userOverrides);
  return theme;
}, "getThemeVariables");
var Theme5 = (_f = class {
  constructor() {
    this.primaryColor = "#eee";
    this.contrast = "#707070";
    this.secondaryColor = lighten(this.contrast, 55);
    this.background = "#ffffff";
    this.tertiaryColor = adjust(this.primaryColor, { h: -160 });
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert(this.primaryColor);
    this.secondaryTextColor = invert(this.secondaryColor);
    this.tertiaryTextColor = invert(this.tertiaryColor);
    this.lineColor = invert(this.background);
    this.textColor = invert(this.background);
    this.mainBkg = "#eee";
    this.secondBkg = "calculated";
    this.lineColor = "#666";
    this.border1 = "#999";
    this.border2 = "calculated";
    this.note = "#ffa";
    this.text = "#333";
    this.critical = "#d42";
    this.done = "#bbb";
    this.arrowheadColor = "#333333";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "calculated";
    this.edgeLabelBackground = "white";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "calculated";
    this.actorLineColor = this.actorBorder;
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "calculated";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "calculated";
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "calculated";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "calculated";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "calculated";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "calculated";
    this.critBkgColor = "calculated";
    this.critBorderColor = "calculated";
    this.todayLineColor = "calculated";
    this.vertLineColor = "calculated";
    this.personBorder = this.primaryBorderColor;
    this.personBkg = this.mainBkg;
    this.archEdgeColor = "calculated";
    this.archEdgeArrowColor = "calculated";
    this.archEdgeWidth = "3";
    this.archGroupBorderColor = this.primaryBorderColor;
    this.archGroupBorderWidth = "2px";
    this.rowOdd = this.rowOdd || lighten(this.mainBkg, 75) || "#ffffff";
    this.rowEven = this.rowEven || "#f4f4f4";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
  }
  updateColors() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    this.secondBkg = lighten(this.contrast, 55);
    this.border2 = this.contrast;
    this.actorBorder = lighten(this.border1, 23);
    this.actorBkg = this.mainBkg;
    this.actorTextColor = this.text;
    this.actorLineColor = this.actorBorder;
    this.signalColor = this.text;
    this.signalTextColor = this.text;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.text;
    this.loopTextColor = this.text;
    this.noteBorderColor = "#999";
    this.noteBkgColor = "#666";
    this.noteTextColor = "#fff";
    this.cScale0 = this.cScale0 || "#555";
    this.cScale1 = this.cScale1 || "#F4F4F4";
    this.cScale2 = this.cScale2 || "#555";
    this.cScale3 = this.cScale3 || "#BBB";
    this.cScale4 = this.cScale4 || "#777";
    this.cScale5 = this.cScale5 || "#999";
    this.cScale6 = this.cScale6 || "#DDD";
    this.cScale7 = this.cScale7 || "#FFF";
    this.cScale8 = this.cScale8 || "#DDD";
    this.cScale9 = this.cScale9 || "#BBB";
    this.cScale10 = this.cScale10 || "#999";
    this.cScale11 = this.cScale11 || "#777";
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleInv" + i2] = this["cScaleInv" + i2] || invert(this["cScale" + i2]);
    }
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      if (this.darkMode) {
        this["cScalePeer" + i2] = this["cScalePeer" + i2] || lighten(this["cScale" + i2], 10);
      } else {
        this["cScalePeer" + i2] = this["cScalePeer" + i2] || darken(this["cScale" + i2], 10);
      }
    }
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1;
    this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["cScaleLabel" + i2] = this["cScaleLabel" + i2] || this.scaleLabelColor;
    }
    for (let i2 = 0; i2 < 5; i2++) {
      this["surface" + i2] = this["surface" + i2] || adjust(this.mainBkg, { l: -(5 + i2 * 5) });
      this["surfacePeer" + i2] = this["surfacePeer" + i2] || adjust(this.mainBkg, { l: -(8 + i2 * 5) });
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.titleColor = this.text;
    this.sectionBkgColor = lighten(this.contrast, 30);
    this.sectionBkgColor2 = lighten(this.contrast, 30);
    this.taskBorderColor = darken(this.contrast, 10);
    this.taskBkgColor = this.contrast;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextDarkColor = this.text;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.activeTaskBorderColor = this.taskBorderColor;
    this.activeTaskBkgColor = this.mainBkg;
    this.gridColor = lighten(this.border1, 30);
    this.doneTaskBkgColor = this.done;
    this.doneTaskBorderColor = this.lineColor;
    this.critBkgColor = this.critical;
    this.critBorderColor = darken(this.critBkgColor, 10);
    this.todayLineColor = this.critBkgColor;
    this.vertLineColor = this.critBkgColor;
    this.archEdgeColor = this.lineColor;
    this.archEdgeArrowColor = this.lineColor;
    this.transitionColor = this.transitionColor || "#000";
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f4f4f4";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.stateBorder = this.stateBorder || "#000";
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = "#222";
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust(this.primaryColor, { h: 64 });
    this.fillType3 = adjust(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust(this.primaryColor, { h: -64 });
    this.fillType5 = adjust(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust(this.primaryColor, { h: 128 });
    this.fillType7 = adjust(this.secondaryColor, { h: 128 });
    for (let i2 = 0; i2 < this.THEME_COLOR_LIMIT; i2++) {
      this["pie" + i2] = this["cScale" + i2];
    }
    this.pie12 = this.pie0;
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px";
    this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.quadrant1Fill = this.quadrant1Fill || this.primaryColor;
    this.quadrant2Fill = this.quadrant2Fill || adjust(this.primaryColor, { r: 5, g: 5, b: 5 });
    this.quadrant3Fill = this.quadrant3Fill || adjust(this.primaryColor, { r: 10, g: 10, b: 10 });
    this.quadrant4Fill = this.quadrant4Fill || adjust(this.primaryColor, { r: 15, g: 15, b: 15 });
    this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor;
    this.quadrant2TextFill = this.quadrant2TextFill || adjust(this.primaryTextColor, { r: -5, g: -5, b: -5 });
    this.quadrant3TextFill = this.quadrant3TextFill || adjust(this.primaryTextColor, { r: -10, g: -10, b: -10 });
    this.quadrant4TextFill = this.quadrant4TextFill || adjust(this.primaryTextColor, { r: -15, g: -15, b: -15 });
    this.quadrantPointFill = this.quadrantPointFill || isDark(this.quadrant1Fill) ? lighten(this.quadrant1Fill) : darken(this.quadrant1Fill);
    this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor;
    this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor;
    this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor;
    this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor;
    this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor;
    this.xyChart = {
      backgroundColor: ((_a2 = this.xyChart) == null ? void 0 : _a2.backgroundColor) || this.background,
      titleColor: ((_b2 = this.xyChart) == null ? void 0 : _b2.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((_c2 = this.xyChart) == null ? void 0 : _c2.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((_d2 = this.xyChart) == null ? void 0 : _d2.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((_f2 = this.xyChart) == null ? void 0 : _f2.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((_g2 = this.xyChart) == null ? void 0 : _g2.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_h2 = this.xyChart) == null ? void 0 : _h2.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0"
    };
    this.radar = {
      axisColor: ((_l = this.radar) == null ? void 0 : _l.axisColor) || this.lineColor,
      axisStrokeWidth: ((_m = this.radar) == null ? void 0 : _m.axisStrokeWidth) || 2,
      axisLabelFontSize: ((_n = this.radar) == null ? void 0 : _n.axisLabelFontSize) || 12,
      curveOpacity: ((_o = this.radar) == null ? void 0 : _o.curveOpacity) || 0.5,
      curveStrokeWidth: ((_p = this.radar) == null ? void 0 : _p.curveStrokeWidth) || 2,
      graticuleColor: ((_q = this.radar) == null ? void 0 : _q.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((_r = this.radar) == null ? void 0 : _r.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_s = this.radar) == null ? void 0 : _s.graticuleOpacity) || 0.3,
      legendBoxSize: ((_t = this.radar) == null ? void 0 : _t.legendBoxSize) || 12,
      legendFontSize: ((_u = this.radar) == null ? void 0 : _u.legendFontSize) || 12
    };
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || "1";
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = darken(this.pie1, 25) || this.primaryColor;
    this.git1 = this.pie2 || this.secondaryColor;
    this.git2 = this.pie3 || this.tertiaryColor;
    this.git3 = this.pie4 || adjust(this.primaryColor, { h: -30 });
    this.git4 = this.pie5 || adjust(this.primaryColor, { h: -60 });
    this.git5 = this.pie6 || adjust(this.primaryColor, { h: -90 });
    this.git6 = this.pie7 || adjust(this.primaryColor, { h: 60 });
    this.git7 = this.pie8 || adjust(this.primaryColor, { h: 120 });
    this.gitInv0 = this.gitInv0 || invert(this.git0);
    this.gitInv1 = this.gitInv1 || invert(this.git1);
    this.gitInv2 = this.gitInv2 || invert(this.git2);
    this.gitInv3 = this.gitInv3 || invert(this.git3);
    this.gitInv4 = this.gitInv4 || invert(this.git4);
    this.gitInv5 = this.gitInv5 || invert(this.git5);
    this.gitInv6 = this.gitInv6 || invert(this.git6);
    this.gitInv7 = this.gitInv7 || invert(this.git7);
    this.branchLabelColor = this.branchLabelColor || this.labelTextColor;
    this.gitBranchLabel0 = this.branchLabelColor;
    this.gitBranchLabel1 = "white";
    this.gitBranchLabel2 = this.branchLabelColor;
    this.gitBranchLabel3 = "white";
    this.gitBranchLabel4 = this.branchLabelColor;
    this.gitBranchLabel5 = this.branchLabelColor;
    this.gitBranchLabel6 = this.branchLabelColor;
    this.gitBranchLabel7 = this.branchLabelColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
    this.updateColors();
    keys.forEach((k2) => {
      this[k2] = overrides[k2];
    });
  }
}, __name(_f, "Theme"), _f);
var getThemeVariables5 = /* @__PURE__ */ __name((userOverrides) => {
  const theme = new Theme5();
  theme.calculate(userOverrides);
  return theme;
}, "getThemeVariables");
var themes_default = {
  base: {
    getThemeVariables
  },
  dark: {
    getThemeVariables: getThemeVariables2
  },
  default: {
    getThemeVariables: getThemeVariables3
  },
  forest: {
    getThemeVariables: getThemeVariables4
  },
  neutral: {
    getThemeVariables: getThemeVariables5
  }
};
var config_schema_default = {
  "flowchart": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "subGraphTitleMargin": {
      "top": 0,
      "bottom": 0
    },
    "diagramPadding": 8,
    "htmlLabels": true,
    "nodeSpacing": 50,
    "rankSpacing": 50,
    "curve": "basis",
    "padding": 15,
    "defaultRenderer": "dagre-wrapper",
    "wrappingWidth": 200,
    "inheritDir": false
  },
  "sequence": {
    "useMaxWidth": true,
    "hideUnusedParticipants": false,
    "activationWidth": 10,
    "diagramMarginX": 50,
    "diagramMarginY": 10,
    "actorMargin": 50,
    "width": 150,
    "height": 65,
    "boxMargin": 10,
    "boxTextMargin": 5,
    "noteMargin": 10,
    "messageMargin": 35,
    "messageAlign": "center",
    "mirrorActors": true,
    "forceMenus": false,
    "bottomMarginAdj": 1,
    "rightAngles": false,
    "showSequenceNumbers": false,
    "actorFontSize": 14,
    "actorFontFamily": '"Open Sans", sans-serif',
    "actorFontWeight": 400,
    "noteFontSize": 14,
    "noteFontFamily": '"trebuchet ms", verdana, arial, sans-serif',
    "noteFontWeight": 400,
    "noteAlign": "center",
    "messageFontSize": 16,
    "messageFontFamily": '"trebuchet ms", verdana, arial, sans-serif',
    "messageFontWeight": 400,
    "wrap": false,
    "wrapPadding": 10,
    "labelBoxWidth": 50,
    "labelBoxHeight": 20
  },
  "gantt": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "barHeight": 20,
    "barGap": 4,
    "topPadding": 50,
    "rightPadding": 75,
    "leftPadding": 75,
    "gridLineStartPadding": 35,
    "fontSize": 11,
    "sectionFontSize": 11,
    "numberSectionStyles": 4,
    "axisFormat": "%Y-%m-%d",
    "topAxis": false,
    "displayMode": "",
    "weekday": "sunday"
  },
  "journey": {
    "useMaxWidth": true,
    "diagramMarginX": 50,
    "diagramMarginY": 10,
    "leftMargin": 150,
    "maxLabelWidth": 360,
    "width": 150,
    "height": 50,
    "boxMargin": 10,
    "boxTextMargin": 5,
    "noteMargin": 10,
    "messageMargin": 35,
    "messageAlign": "center",
    "bottomMarginAdj": 1,
    "rightAngles": false,
    "taskFontSize": 14,
    "taskFontFamily": '"Open Sans", sans-serif',
    "taskMargin": 50,
    "activationWidth": 10,
    "textPlacement": "fo",
    "actorColours": [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    "sectionFills": [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    "sectionColours": [
      "#fff"
    ],
    "titleColor": "",
    "titleFontFamily": '"trebuchet ms", verdana, arial, sans-serif',
    "titleFontSize": "4ex"
  },
  "class": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "arrowMarkerAbsolute": false,
    "dividerMargin": 10,
    "padding": 5,
    "textHeight": 10,
    "defaultRenderer": "dagre-wrapper",
    "htmlLabels": false,
    "hideEmptyMembersBox": false
  },
  "state": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "dividerMargin": 10,
    "sizeUnit": 5,
    "padding": 8,
    "textHeight": 10,
    "titleShift": -15,
    "noteMargin": 10,
    "forkWidth": 70,
    "forkHeight": 7,
    "miniPadding": 2,
    "fontSizeFactor": 5.02,
    "fontSize": 24,
    "labelHeight": 16,
    "edgeLengthFactor": "20",
    "compositTitleSize": 35,
    "radius": 5,
    "defaultRenderer": "dagre-wrapper"
  },
  "er": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "diagramPadding": 20,
    "layoutDirection": "TB",
    "minEntityWidth": 100,
    "minEntityHeight": 75,
    "entityPadding": 15,
    "nodeSpacing": 140,
    "rankSpacing": 80,
    "stroke": "gray",
    "fill": "honeydew",
    "fontSize": 12
  },
  "pie": {
    "useMaxWidth": true,
    "textPosition": 0.75
  },
  "quadrantChart": {
    "useMaxWidth": true,
    "chartWidth": 500,
    "chartHeight": 500,
    "titleFontSize": 20,
    "titlePadding": 10,
    "quadrantPadding": 5,
    "xAxisLabelPadding": 5,
    "yAxisLabelPadding": 5,
    "xAxisLabelFontSize": 16,
    "yAxisLabelFontSize": 16,
    "quadrantLabelFontSize": 16,
    "quadrantTextTopPadding": 5,
    "pointTextPadding": 5,
    "pointLabelFontSize": 12,
    "pointRadius": 5,
    "xAxisPosition": "top",
    "yAxisPosition": "left",
    "quadrantInternalBorderStrokeWidth": 1,
    "quadrantExternalBorderStrokeWidth": 2
  },
  "xyChart": {
    "useMaxWidth": true,
    "width": 700,
    "height": 500,
    "titleFontSize": 20,
    "titlePadding": 10,
    "showDataLabel": false,
    "showTitle": true,
    "xAxis": {
      "$ref": "#/$defs/XYChartAxisConfig",
      "showLabel": true,
      "labelFontSize": 14,
      "labelPadding": 5,
      "showTitle": true,
      "titleFontSize": 16,
      "titlePadding": 5,
      "showTick": true,
      "tickLength": 5,
      "tickWidth": 2,
      "showAxisLine": true,
      "axisLineWidth": 2
    },
    "yAxis": {
      "$ref": "#/$defs/XYChartAxisConfig",
      "showLabel": true,
      "labelFontSize": 14,
      "labelPadding": 5,
      "showTitle": true,
      "titleFontSize": 16,
      "titlePadding": 5,
      "showTick": true,
      "tickLength": 5,
      "tickWidth": 2,
      "showAxisLine": true,
      "axisLineWidth": 2
    },
    "chartOrientation": "vertical",
    "plotReservedSpacePercent": 50
  },
  "requirement": {
    "useMaxWidth": true,
    "rect_fill": "#f9f9f9",
    "text_color": "#333",
    "rect_border_size": "0.5px",
    "rect_border_color": "#bbb",
    "rect_min_width": 200,
    "rect_min_height": 200,
    "fontSize": 14,
    "rect_padding": 10,
    "line_height": 20
  },
  "mindmap": {
    "useMaxWidth": true,
    "padding": 10,
    "maxNodeWidth": 200,
    "layoutAlgorithm": "cose-bilkent"
  },
  "kanban": {
    "useMaxWidth": true,
    "padding": 8,
    "sectionWidth": 200,
    "ticketBaseUrl": ""
  },
  "timeline": {
    "useMaxWidth": true,
    "diagramMarginX": 50,
    "diagramMarginY": 10,
    "leftMargin": 150,
    "width": 150,
    "height": 50,
    "boxMargin": 10,
    "boxTextMargin": 5,
    "noteMargin": 10,
    "messageMargin": 35,
    "messageAlign": "center",
    "bottomMarginAdj": 1,
    "rightAngles": false,
    "taskFontSize": 14,
    "taskFontFamily": '"Open Sans", sans-serif',
    "taskMargin": 50,
    "activationWidth": 10,
    "textPlacement": "fo",
    "actorColours": [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    "sectionFills": [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    "sectionColours": [
      "#fff"
    ],
    "disableMulticolor": false
  },
  "gitGraph": {
    "useMaxWidth": true,
    "titleTopMargin": 25,
    "diagramPadding": 8,
    "nodeLabel": {
      "width": 75,
      "height": 100,
      "x": -25,
      "y": 0
    },
    "mainBranchName": "main",
    "mainBranchOrder": 0,
    "showCommitLabel": true,
    "showBranches": true,
    "rotateCommitLabel": true,
    "parallelCommits": false,
    "arrowMarkerAbsolute": false
  },
  "c4": {
    "useMaxWidth": true,
    "diagramMarginX": 50,
    "diagramMarginY": 10,
    "c4ShapeMargin": 50,
    "c4ShapePadding": 20,
    "width": 216,
    "height": 60,
    "boxMargin": 10,
    "c4ShapeInRow": 4,
    "nextLinePaddingX": 0,
    "c4BoundaryInRow": 2,
    "personFontSize": 14,
    "personFontFamily": '"Open Sans", sans-serif',
    "personFontWeight": "normal",
    "external_personFontSize": 14,
    "external_personFontFamily": '"Open Sans", sans-serif',
    "external_personFontWeight": "normal",
    "systemFontSize": 14,
    "systemFontFamily": '"Open Sans", sans-serif',
    "systemFontWeight": "normal",
    "external_systemFontSize": 14,
    "external_systemFontFamily": '"Open Sans", sans-serif',
    "external_systemFontWeight": "normal",
    "system_dbFontSize": 14,
    "system_dbFontFamily": '"Open Sans", sans-serif',
    "system_dbFontWeight": "normal",
    "external_system_dbFontSize": 14,
    "external_system_dbFontFamily": '"Open Sans", sans-serif',
    "external_system_dbFontWeight": "normal",
    "system_queueFontSize": 14,
    "system_queueFontFamily": '"Open Sans", sans-serif',
    "system_queueFontWeight": "normal",
    "external_system_queueFontSize": 14,
    "external_system_queueFontFamily": '"Open Sans", sans-serif',
    "external_system_queueFontWeight": "normal",
    "boundaryFontSize": 14,
    "boundaryFontFamily": '"Open Sans", sans-serif',
    "boundaryFontWeight": "normal",
    "messageFontSize": 12,
    "messageFontFamily": '"Open Sans", sans-serif',
    "messageFontWeight": "normal",
    "containerFontSize": 14,
    "containerFontFamily": '"Open Sans", sans-serif',
    "containerFontWeight": "normal",
    "external_containerFontSize": 14,
    "external_containerFontFamily": '"Open Sans", sans-serif',
    "external_containerFontWeight": "normal",
    "container_dbFontSize": 14,
    "container_dbFontFamily": '"Open Sans", sans-serif',
    "container_dbFontWeight": "normal",
    "external_container_dbFontSize": 14,
    "external_container_dbFontFamily": '"Open Sans", sans-serif',
    "external_container_dbFontWeight": "normal",
    "container_queueFontSize": 14,
    "container_queueFontFamily": '"Open Sans", sans-serif',
    "container_queueFontWeight": "normal",
    "external_container_queueFontSize": 14,
    "external_container_queueFontFamily": '"Open Sans", sans-serif',
    "external_container_queueFontWeight": "normal",
    "componentFontSize": 14,
    "componentFontFamily": '"Open Sans", sans-serif',
    "componentFontWeight": "normal",
    "external_componentFontSize": 14,
    "external_componentFontFamily": '"Open Sans", sans-serif',
    "external_componentFontWeight": "normal",
    "component_dbFontSize": 14,
    "component_dbFontFamily": '"Open Sans", sans-serif',
    "component_dbFontWeight": "normal",
    "external_component_dbFontSize": 14,
    "external_component_dbFontFamily": '"Open Sans", sans-serif',
    "external_component_dbFontWeight": "normal",
    "component_queueFontSize": 14,
    "component_queueFontFamily": '"Open Sans", sans-serif',
    "component_queueFontWeight": "normal",
    "external_component_queueFontSize": 14,
    "external_component_queueFontFamily": '"Open Sans", sans-serif',
    "external_component_queueFontWeight": "normal",
    "wrap": true,
    "wrapPadding": 10,
    "person_bg_color": "#08427B",
    "person_border_color": "#073B6F",
    "external_person_bg_color": "#686868",
    "external_person_border_color": "#8A8A8A",
    "system_bg_color": "#1168BD",
    "system_border_color": "#3C7FC0",
    "system_db_bg_color": "#1168BD",
    "system_db_border_color": "#3C7FC0",
    "system_queue_bg_color": "#1168BD",
    "system_queue_border_color": "#3C7FC0",
    "external_system_bg_color": "#999999",
    "external_system_border_color": "#8A8A8A",
    "external_system_db_bg_color": "#999999",
    "external_system_db_border_color": "#8A8A8A",
    "external_system_queue_bg_color": "#999999",
    "external_system_queue_border_color": "#8A8A8A",
    "container_bg_color": "#438DD5",
    "container_border_color": "#3C7FC0",
    "container_db_bg_color": "#438DD5",
    "container_db_border_color": "#3C7FC0",
    "container_queue_bg_color": "#438DD5",
    "container_queue_border_color": "#3C7FC0",
    "external_container_bg_color": "#B3B3B3",
    "external_container_border_color": "#A6A6A6",
    "external_container_db_bg_color": "#B3B3B3",
    "external_container_db_border_color": "#A6A6A6",
    "external_container_queue_bg_color": "#B3B3B3",
    "external_container_queue_border_color": "#A6A6A6",
    "component_bg_color": "#85BBF0",
    "component_border_color": "#78A8D8",
    "component_db_bg_color": "#85BBF0",
    "component_db_border_color": "#78A8D8",
    "component_queue_bg_color": "#85BBF0",
    "component_queue_border_color": "#78A8D8",
    "external_component_bg_color": "#CCCCCC",
    "external_component_border_color": "#BFBFBF",
    "external_component_db_bg_color": "#CCCCCC",
    "external_component_db_border_color": "#BFBFBF",
    "external_component_queue_bg_color": "#CCCCCC",
    "external_component_queue_border_color": "#BFBFBF"
  },
  "sankey": {
    "useMaxWidth": true,
    "width": 600,
    "height": 400,
    "linkColor": "gradient",
    "nodeAlignment": "justify",
    "showValues": true,
    "prefix": "",
    "suffix": ""
  },
  "block": {
    "useMaxWidth": true,
    "padding": 8
  },
  "packet": {
    "useMaxWidth": true,
    "rowHeight": 32,
    "bitWidth": 32,
    "bitsPerRow": 32,
    "showBits": true,
    "paddingX": 5,
    "paddingY": 5
  },
  "architecture": {
    "useMaxWidth": true,
    "padding": 40,
    "iconSize": 80,
    "fontSize": 16
  },
  "radar": {
    "useMaxWidth": true,
    "width": 600,
    "height": 600,
    "marginTop": 50,
    "marginRight": 50,
    "marginBottom": 50,
    "marginLeft": 50,
    "axisScaleFactor": 1,
    "axisLabelFactor": 1.05,
    "curveTension": 0.17
  },
  "theme": "default",
  "look": "classic",
  "handDrawnSeed": 0,
  "layout": "dagre",
  "maxTextSize": 5e4,
  "maxEdges": 500,
  "darkMode": false,
  "fontFamily": '"trebuchet ms", verdana, arial, sans-serif;',
  "logLevel": 5,
  "securityLevel": "strict",
  "startOnLoad": true,
  "arrowMarkerAbsolute": false,
  "secure": [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "suppressErrorRendering",
    "maxEdges"
  ],
  "legacyMathML": false,
  "forceLegacyMathML": false,
  "deterministicIds": false,
  "fontSize": 16,
  "markdownAutoWrap": true,
  "suppressErrorRendering": false
};
var config = {
  ...config_schema_default,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  elk: {
    // mergeEdges is needed here to be considered
    mergeEdges: false,
    nodePlacementStrategy: "BRANDES_KOEPF",
    forceNodeModelOrder: false,
    considerModelOrder: "NODES_AND_EDGES"
  },
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: themes_default.default.getThemeVariables(),
  sequence: {
    ...config_schema_default.sequence,
    messageFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont"),
    noteFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.noteFontFamily,
        fontSize: this.noteFontSize,
        fontWeight: this.noteFontWeight
      };
    }, "noteFont"),
    actorFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.actorFontFamily,
        fontSize: this.actorFontSize,
        fontWeight: this.actorFontWeight
      };
    }, "actorFont")
  },
  class: {
    hideEmptyMembersBox: false
  },
  gantt: {
    ...config_schema_default.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...config_schema_default.c4,
    useWidth: void 0,
    personFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.personFontFamily,
        fontSize: this.personFontSize,
        fontWeight: this.personFontWeight
      };
    }, "personFont"),
    flowchart: {
      ...config_schema_default.flowchart,
      inheritDir: false
      // default to legacy behavior
    },
    external_personFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_personFontFamily,
        fontSize: this.external_personFontSize,
        fontWeight: this.external_personFontWeight
      };
    }, "external_personFont"),
    systemFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.systemFontFamily,
        fontSize: this.systemFontSize,
        fontWeight: this.systemFontWeight
      };
    }, "systemFont"),
    external_systemFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_systemFontFamily,
        fontSize: this.external_systemFontSize,
        fontWeight: this.external_systemFontWeight
      };
    }, "external_systemFont"),
    system_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.system_dbFontFamily,
        fontSize: this.system_dbFontSize,
        fontWeight: this.system_dbFontWeight
      };
    }, "system_dbFont"),
    external_system_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_system_dbFontFamily,
        fontSize: this.external_system_dbFontSize,
        fontWeight: this.external_system_dbFontWeight
      };
    }, "external_system_dbFont"),
    system_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.system_queueFontFamily,
        fontSize: this.system_queueFontSize,
        fontWeight: this.system_queueFontWeight
      };
    }, "system_queueFont"),
    external_system_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_system_queueFontFamily,
        fontSize: this.external_system_queueFontSize,
        fontWeight: this.external_system_queueFontWeight
      };
    }, "external_system_queueFont"),
    containerFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.containerFontFamily,
        fontSize: this.containerFontSize,
        fontWeight: this.containerFontWeight
      };
    }, "containerFont"),
    external_containerFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_containerFontFamily,
        fontSize: this.external_containerFontSize,
        fontWeight: this.external_containerFontWeight
      };
    }, "external_containerFont"),
    container_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.container_dbFontFamily,
        fontSize: this.container_dbFontSize,
        fontWeight: this.container_dbFontWeight
      };
    }, "container_dbFont"),
    external_container_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_container_dbFontFamily,
        fontSize: this.external_container_dbFontSize,
        fontWeight: this.external_container_dbFontWeight
      };
    }, "external_container_dbFont"),
    container_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.container_queueFontFamily,
        fontSize: this.container_queueFontSize,
        fontWeight: this.container_queueFontWeight
      };
    }, "container_queueFont"),
    external_container_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_container_queueFontFamily,
        fontSize: this.external_container_queueFontSize,
        fontWeight: this.external_container_queueFontWeight
      };
    }, "external_container_queueFont"),
    componentFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.componentFontFamily,
        fontSize: this.componentFontSize,
        fontWeight: this.componentFontWeight
      };
    }, "componentFont"),
    external_componentFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_componentFontFamily,
        fontSize: this.external_componentFontSize,
        fontWeight: this.external_componentFontWeight
      };
    }, "external_componentFont"),
    component_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.component_dbFontFamily,
        fontSize: this.component_dbFontSize,
        fontWeight: this.component_dbFontWeight
      };
    }, "component_dbFont"),
    external_component_dbFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_component_dbFontFamily,
        fontSize: this.external_component_dbFontSize,
        fontWeight: this.external_component_dbFontWeight
      };
    }, "external_component_dbFont"),
    component_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.component_queueFontFamily,
        fontSize: this.component_queueFontSize,
        fontWeight: this.component_queueFontWeight
      };
    }, "component_queueFont"),
    external_component_queueFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.external_component_queueFontFamily,
        fontSize: this.external_component_queueFontSize,
        fontWeight: this.external_component_queueFontWeight
      };
    }, "external_component_queueFont"),
    boundaryFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.boundaryFontFamily,
        fontSize: this.boundaryFontSize,
        fontWeight: this.boundaryFontWeight
      };
    }, "boundaryFont"),
    messageFont: /* @__PURE__ */ __name(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont")
  },
  pie: {
    ...config_schema_default.pie,
    useWidth: 984
  },
  xyChart: {
    ...config_schema_default.xyChart,
    useWidth: void 0
  },
  requirement: {
    ...config_schema_default.requirement,
    useWidth: void 0
  },
  packet: {
    ...config_schema_default.packet
  },
  radar: {
    ...config_schema_default.radar
  },
  treemap: {
    useMaxWidth: true,
    padding: 10,
    diagramPadding: 8,
    showValues: true,
    nodeWidth: 100,
    nodeHeight: 40,
    borderWidth: 1,
    valueFontSize: 12,
    labelFontSize: 14,
    valueFormat: ","
  }
};
var keyify = /* @__PURE__ */ __name((obj, prefix = "") => Object.keys(obj).reduce((res, el) => {
  if (Array.isArray(obj[el])) {
    return res;
  } else if (typeof obj[el] === "object" && obj[el] !== null) {
    return [...res, prefix + el, ...keyify(obj[el], "")];
  }
  return [...res, prefix + el];
}, []), "keyify");
var configKeys = new Set(keyify(config, ""));
var defaultConfig_default = config;
var sanitizeDirective = /* @__PURE__ */ __name((args) => {
  log.debug("sanitizeDirective called with", args);
  if (typeof args !== "object" || args == null) {
    return;
  }
  if (Array.isArray(args)) {
    args.forEach((arg) => sanitizeDirective(arg));
    return;
  }
  for (const key of Object.keys(args)) {
    log.debug("Checking key", key);
    if (key.startsWith("__") || key.includes("proto") || key.includes("constr") || !configKeys.has(key) || args[key] == null) {
      log.debug("sanitize deleting key: ", key);
      delete args[key];
      continue;
    }
    if (typeof args[key] === "object") {
      log.debug("sanitizing object", key);
      sanitizeDirective(args[key]);
      continue;
    }
    const cssMatchers = ["themeCSS", "fontFamily", "altFontFamily"];
    for (const cssKey of cssMatchers) {
      if (key.includes(cssKey)) {
        log.debug("sanitizing css option", key);
        args[key] = sanitizeCss(args[key]);
      }
    }
  }
  if (args.themeVariables) {
    for (const k2 of Object.keys(args.themeVariables)) {
      const val = args.themeVariables[k2];
      if ((val == null ? void 0 : val.match) && !val.match(/^[\d "#%(),.;A-Za-z]+$/)) {
        args.themeVariables[k2] = "";
      }
    }
  }
  log.debug("After sanitization", args);
}, "sanitizeDirective");
var sanitizeCss = /* @__PURE__ */ __name((str2) => {
  let startCnt = 0;
  let endCnt = 0;
  for (const element of str2) {
    if (startCnt < endCnt) {
      return "{ /* ERROR: Unbalanced CSS */ }";
    }
    if (element === "{") {
      startCnt++;
    } else if (element === "}") {
      endCnt++;
    }
  }
  if (startCnt !== endCnt) {
    return "{ /* ERROR: Unbalanced CSS */ }";
  }
  return str2;
}, "sanitizeCss");
var defaultConfig = Object.freeze(defaultConfig_default);
var siteConfig = assignWithDepth_default({}, defaultConfig);
var configFromInitialize;
var directives = [];
var currentConfig = assignWithDepth_default({}, defaultConfig);
var updateCurrentConfig = /* @__PURE__ */ __name((siteCfg, _directives) => {
  let cfg = assignWithDepth_default({}, siteCfg);
  let sumOfDirectives = {};
  for (const d2 of _directives) {
    sanitize(d2);
    sumOfDirectives = assignWithDepth_default(sumOfDirectives, d2);
  }
  cfg = assignWithDepth_default(cfg, sumOfDirectives);
  if (sumOfDirectives.theme && sumOfDirectives.theme in themes_default) {
    const tmpConfigFromInitialize = assignWithDepth_default({}, configFromInitialize);
    const themeVariables = assignWithDepth_default(
      tmpConfigFromInitialize.themeVariables || {},
      sumOfDirectives.themeVariables
    );
    if (cfg.theme && cfg.theme in themes_default) {
      cfg.themeVariables = themes_default[cfg.theme].getThemeVariables(themeVariables);
    }
  }
  currentConfig = cfg;
  checkConfig(currentConfig);
  return currentConfig;
}, "updateCurrentConfig");
var setSiteConfig = /* @__PURE__ */ __name((conf) => {
  siteConfig = assignWithDepth_default({}, defaultConfig);
  siteConfig = assignWithDepth_default(siteConfig, conf);
  if (conf.theme && themes_default[conf.theme]) {
    siteConfig.themeVariables = themes_default[conf.theme].getThemeVariables(conf.themeVariables);
  }
  updateCurrentConfig(siteConfig, directives);
  return siteConfig;
}, "setSiteConfig");
var saveConfigFromInitialize = /* @__PURE__ */ __name((conf) => {
  configFromInitialize = assignWithDepth_default({}, conf);
}, "saveConfigFromInitialize");
var updateSiteConfig = /* @__PURE__ */ __name((conf) => {
  siteConfig = assignWithDepth_default(siteConfig, conf);
  updateCurrentConfig(siteConfig, directives);
  return siteConfig;
}, "updateSiteConfig");
var getSiteConfig = /* @__PURE__ */ __name(() => {
  return assignWithDepth_default({}, siteConfig);
}, "getSiteConfig");
var setConfig = /* @__PURE__ */ __name((conf) => {
  checkConfig(conf);
  assignWithDepth_default(currentConfig, conf);
  return getConfig();
}, "setConfig");
var getConfig = /* @__PURE__ */ __name(() => {
  return assignWithDepth_default({}, currentConfig);
}, "getConfig");
var sanitize = /* @__PURE__ */ __name((options) => {
  if (!options) {
    return;
  }
  ["secure", ...siteConfig.secure ?? []].forEach((key) => {
    if (Object.hasOwn(options, key)) {
      log.debug(`Denied attempt to modify a secure key ${key}`, options[key]);
      delete options[key];
    }
  });
  Object.keys(options).forEach((key) => {
    if (key.startsWith("__")) {
      delete options[key];
    }
  });
  Object.keys(options).forEach((key) => {
    if (typeof options[key] === "string" && (options[key].includes("<") || options[key].includes(">") || options[key].includes("url(data:"))) {
      delete options[key];
    }
    if (typeof options[key] === "object") {
      sanitize(options[key]);
    }
  });
}, "sanitize");
var addDirective = /* @__PURE__ */ __name((directive) => {
  var _a2;
  sanitizeDirective(directive);
  if (directive.fontFamily && !((_a2 = directive.themeVariables) == null ? void 0 : _a2.fontFamily)) {
    directive.themeVariables = {
      ...directive.themeVariables,
      fontFamily: directive.fontFamily
    };
  }
  directives.push(directive);
  updateCurrentConfig(siteConfig, directives);
}, "addDirective");
var reset = /* @__PURE__ */ __name((config2 = siteConfig) => {
  directives = [];
  updateCurrentConfig(config2, directives);
}, "reset");
var ConfigWarning = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
};
var issuedWarnings = {};
var issueWarning = /* @__PURE__ */ __name((warning) => {
  if (issuedWarnings[warning]) {
    return;
  }
  log.warn(ConfigWarning[warning]);
  issuedWarnings[warning] = true;
}, "issueWarning");
var checkConfig = /* @__PURE__ */ __name((config2) => {
  if (!config2) {
    return;
  }
  if (config2.lazyLoadedDiagrams || config2.loadExternalDiagramsAtStartup) {
    issueWarning("LAZY_LOAD_DEPRECATED");
  }
}, "checkConfig");
var getUserDefinedConfig = /* @__PURE__ */ __name(() => {
  let userConfig = {};
  if (configFromInitialize) {
    userConfig = assignWithDepth_default(userConfig, configFromInitialize);
  }
  for (const d2 of directives) {
    userConfig = assignWithDepth_default(userConfig, d2);
  }
  return userConfig;
}, "getUserDefinedConfig");
var lineBreakRegex = /<br\s*\/?>/gi;
var getRows = /* @__PURE__ */ __name((s2) => {
  if (!s2) {
    return [""];
  }
  const str2 = breakToPlaceholder(s2).replace(/\\n/g, "#br#");
  return str2.split("#br#");
}, "getRows");
var setupDompurifyHooksIfNotSetup = /* @__PURE__ */ (() => {
  let setup = false;
  return () => {
    if (!setup) {
      setupDompurifyHooks();
      setup = true;
    }
  };
})();
function setupDompurifyHooks() {
  const TEMPORARY_ATTRIBUTE = "data-temp-href-target";
  purify.addHook("beforeSanitizeAttributes", (node) => {
    if (node.tagName === "A" && node.hasAttribute("target")) {
      node.setAttribute(TEMPORARY_ATTRIBUTE, node.getAttribute("target") ?? "");
    }
  });
  purify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A" && node.hasAttribute(TEMPORARY_ATTRIBUTE)) {
      node.setAttribute("target", node.getAttribute(TEMPORARY_ATTRIBUTE) ?? "");
      node.removeAttribute(TEMPORARY_ATTRIBUTE);
      if (node.getAttribute("target") === "_blank") {
        node.setAttribute("rel", "noopener");
      }
    }
  });
}
__name(setupDompurifyHooks, "setupDompurifyHooks");
var removeScript = /* @__PURE__ */ __name((txt) => {
  setupDompurifyHooksIfNotSetup();
  const sanitizedText = purify.sanitize(txt);
  return sanitizedText;
}, "removeScript");
var sanitizeMore = /* @__PURE__ */ __name((text2, config2) => {
  var _a2;
  if (((_a2 = config2.flowchart) == null ? void 0 : _a2.htmlLabels) !== false) {
    const level = config2.securityLevel;
    if (level === "antiscript" || level === "strict") {
      text2 = removeScript(text2);
    } else if (level !== "loose") {
      text2 = breakToPlaceholder(text2);
      text2 = text2.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      text2 = text2.replace(/=/g, "&equals;");
      text2 = placeholderToBreak(text2);
    }
  }
  return text2;
}, "sanitizeMore");
var sanitizeText = /* @__PURE__ */ __name((text2, config2) => {
  if (!text2) {
    return text2;
  }
  if (config2.dompurifyConfig) {
    text2 = purify.sanitize(sanitizeMore(text2, config2), config2.dompurifyConfig).toString();
  } else {
    text2 = purify.sanitize(sanitizeMore(text2, config2), {
      FORBID_TAGS: ["style"]
    }).toString();
  }
  return text2;
}, "sanitizeText");
var sanitizeTextOrArray = /* @__PURE__ */ __name((a2, config2) => {
  if (typeof a2 === "string") {
    return sanitizeText(a2, config2);
  }
  return a2.flat().map((x2) => sanitizeText(x2, config2));
}, "sanitizeTextOrArray");
var hasBreaks = /* @__PURE__ */ __name((text2) => {
  return lineBreakRegex.test(text2);
}, "hasBreaks");
var splitBreaks = /* @__PURE__ */ __name((text2) => {
  return text2.split(lineBreakRegex);
}, "splitBreaks");
var placeholderToBreak = /* @__PURE__ */ __name((s2) => {
  return s2.replace(/#br#/g, "<br/>");
}, "placeholderToBreak");
var breakToPlaceholder = /* @__PURE__ */ __name((s2) => {
  return s2.replace(lineBreakRegex, "#br#");
}, "breakToPlaceholder");
var getUrl = /* @__PURE__ */ __name((useAbsolute) => {
  let url = "";
  if (useAbsolute) {
    url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
    url = CSS.escape(url);
  }
  return url;
}, "getUrl");
var evaluate = /* @__PURE__ */ __name((val) => val === false || ["false", "null", "0"].includes(String(val).trim().toLowerCase()) ? false : true, "evaluate");
var getMax = /* @__PURE__ */ __name(function(...values) {
  const newValues = values.filter((value) => {
    return !isNaN(value);
  });
  return Math.max(...newValues);
}, "getMax");
var getMin = /* @__PURE__ */ __name(function(...values) {
  const newValues = values.filter((value) => {
    return !isNaN(value);
  });
  return Math.min(...newValues);
}, "getMin");
var parseGenericTypes = /* @__PURE__ */ __name(function(input) {
  const inputSets = input.split(/(,)/);
  const output = [];
  for (let i2 = 0; i2 < inputSets.length; i2++) {
    let thisSet = inputSets[i2];
    if (thisSet === "," && i2 > 0 && i2 + 1 < inputSets.length) {
      const previousSet = inputSets[i2 - 1];
      const nextSet = inputSets[i2 + 1];
      if (shouldCombineSets(previousSet, nextSet)) {
        thisSet = previousSet + "," + nextSet;
        i2++;
        output.pop();
      }
    }
    output.push(processSet(thisSet));
  }
  return output.join("");
}, "parseGenericTypes");
var countOccurrence = /* @__PURE__ */ __name((string, substring) => {
  return Math.max(0, string.split(substring).length - 1);
}, "countOccurrence");
var shouldCombineSets = /* @__PURE__ */ __name((previousSet, nextSet) => {
  const prevCount = countOccurrence(previousSet, "~");
  const nextCount = countOccurrence(nextSet, "~");
  return prevCount === 1 && nextCount === 1;
}, "shouldCombineSets");
var processSet = /* @__PURE__ */ __name((input) => {
  const tildeCount = countOccurrence(input, "~");
  let hasStartingTilde = false;
  if (tildeCount <= 1) {
    return input;
  }
  if (tildeCount % 2 !== 0 && input.startsWith("~")) {
    input = input.substring(1);
    hasStartingTilde = true;
  }
  const chars = [...input];
  let first = chars.indexOf("~");
  let last = chars.lastIndexOf("~");
  while (first !== -1 && last !== -1 && first !== last) {
    chars[first] = "<";
    chars[last] = ">";
    first = chars.indexOf("~");
    last = chars.lastIndexOf("~");
  }
  if (hasStartingTilde) {
    chars.unshift("~");
  }
  return chars.join("");
}, "processSet");
var isMathMLSupported = /* @__PURE__ */ __name(() => window.MathMLElement !== void 0, "isMathMLSupported");
var katexRegex = /\$\$(.*)\$\$/g;
var hasKatex = /* @__PURE__ */ __name((text2) => {
  var _a2;
  return (((_a2 = text2.match(katexRegex)) == null ? void 0 : _a2.length) ?? 0) > 0;
}, "hasKatex");
var calculateMathMLDimensions = /* @__PURE__ */ __name(async (text2, config2) => {
  const divElem = document.createElement("div");
  divElem.innerHTML = await renderKatexSanitized(text2, config2);
  divElem.id = "katex-temp";
  divElem.style.visibility = "hidden";
  divElem.style.position = "absolute";
  divElem.style.top = "0";
  const body = document.querySelector("body");
  body == null ? void 0 : body.insertAdjacentElement("beforeend", divElem);
  const dim = { width: divElem.clientWidth, height: divElem.clientHeight };
  divElem.remove();
  return dim;
}, "calculateMathMLDimensions");
var renderKatexUnsanitized = /* @__PURE__ */ __name(async (text2, config2) => {
  if (!hasKatex(text2)) {
    return text2;
  }
  if (!(isMathMLSupported() || config2.legacyMathML || config2.forceLegacyMathML)) {
    return text2.replace(katexRegex, "MathML is unsupported in this environment.");
  }
  {
    const { default: katex } = await import("./index-DL22tfk0.js").then(function(n2) {
      return n2.X;
    });
    const outputMode = config2.forceLegacyMathML || !isMathMLSupported() && config2.legacyMathML ? "htmlAndMathml" : "mathml";
    return text2.split(lineBreakRegex).map(
      (line2) => hasKatex(line2) ? `<div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">${line2}</div>` : `<div>${line2}</div>`
    ).join("").replace(
      katexRegex,
      (_2, c2) => katex.renderToString(c2, {
        throwOnError: true,
        displayMode: true,
        output: outputMode
      }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
    );
  }
}, "renderKatexUnsanitized");
var renderKatexSanitized = /* @__PURE__ */ __name(async (text2, config2) => {
  return sanitizeText(await renderKatexUnsanitized(text2, config2), config2);
}, "renderKatexSanitized");
var common_default = {
  getRows,
  sanitizeText,
  sanitizeTextOrArray,
  hasBreaks,
  splitBreaks,
  lineBreakRegex,
  removeScript,
  getUrl,
  evaluate,
  getMax,
  getMin
};
var d3Attrs = /* @__PURE__ */ __name(function(d3Elem, attrs) {
  for (let attr of attrs) {
    d3Elem.attr(attr[0], attr[1]);
  }
}, "d3Attrs");
var calculateSvgSizeAttrs = /* @__PURE__ */ __name(function(height, width, useMaxWidth) {
  let attrs = /* @__PURE__ */ new Map();
  if (useMaxWidth) {
    attrs.set("width", "100%");
    attrs.set("style", `max-width: ${width}px;`);
  } else {
    attrs.set("height", height);
    attrs.set("width", width);
  }
  return attrs;
}, "calculateSvgSizeAttrs");
var configureSvgSize = /* @__PURE__ */ __name(function(svgElem, height, width, useMaxWidth) {
  const attrs = calculateSvgSizeAttrs(height, width, useMaxWidth);
  d3Attrs(svgElem, attrs);
}, "configureSvgSize");
var setupGraphViewbox = /* @__PURE__ */ __name(function(graph, svgElem, padding, useMaxWidth) {
  const svgBounds = svgElem.node().getBBox();
  const sWidth = svgBounds.width;
  const sHeight = svgBounds.height;
  log.info(`SVG bounds: ${sWidth}x${sHeight}`, svgBounds);
  let width = 0;
  let height = 0;
  log.info(`Graph bounds: ${width}x${height}`, graph);
  width = sWidth + padding * 2;
  height = sHeight + padding * 2;
  log.info(`Calculated bounds: ${width}x${height}`);
  configureSvgSize(svgElem, height, width, useMaxWidth);
  const vBox = `${svgBounds.x - padding} ${svgBounds.y - padding} ${svgBounds.width + 2 * padding} ${svgBounds.height + 2 * padding}`;
  svgElem.attr("viewBox", vBox);
}, "setupGraphViewbox");
var themes = {};
var getStyles = /* @__PURE__ */ __name((type2, userStyles, options) => {
  let diagramStyles = "";
  if (type2 in themes && themes[type2]) {
    diagramStyles = themes[type2](options);
  } else {
    log.warn(`No theme found for ${type2}`);
  }
  return ` & {
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize};
    fill: ${options.textColor}
  }
  @keyframes edge-animation-frame {
    from {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
  & .edge-animation-slow {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 50s linear infinite;
    stroke-linecap: round;
  }
  & .edge-animation-fast {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 20s linear infinite;
    stroke-linecap: round;
  }
  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${options.errorBkgColor};
  }
  & .error-text {
    fill: ${options.errorTextColor};
    stroke: ${options.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: 1px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }
  & .edge-thickness-invisible {
    stroke-width: 0;
    fill: none;
  }
  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${options.lineColor};
    stroke: ${options.lineColor};
  }
  & .marker.cross {
    stroke: ${options.lineColor};
  }

  & svg {
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize};
  }
   & p {
    margin: 0
   }

  ${diagramStyles}

  ${userStyles}
`;
}, "getStyles");
var addStylesForDiagram = /* @__PURE__ */ __name((type2, diagramTheme) => {
  if (diagramTheme !== void 0) {
    themes[type2] = diagramTheme;
  }
}, "addStylesForDiagram");
var styles_default = getStyles;
var commonDb_exports = {};
__export(commonDb_exports, {
  clear: () => clear$2,
  getAccDescription: () => getAccDescription,
  getAccTitle: () => getAccTitle,
  getDiagramTitle: () => getDiagramTitle,
  setAccDescription: () => setAccDescription,
  setAccTitle: () => setAccTitle,
  setDiagramTitle: () => setDiagramTitle
});
var accTitle = "";
var diagramTitle = "";
var accDescription = "";
var sanitizeText2 = /* @__PURE__ */ __name((txt) => sanitizeText(txt, getConfig()), "sanitizeText");
var clear$2 = /* @__PURE__ */ __name(() => {
  accTitle = "";
  accDescription = "";
  diagramTitle = "";
}, "clear");
var setAccTitle = /* @__PURE__ */ __name((txt) => {
  accTitle = sanitizeText2(txt).replace(/^\s+/g, "");
}, "setAccTitle");
var getAccTitle = /* @__PURE__ */ __name(() => accTitle, "getAccTitle");
var setAccDescription = /* @__PURE__ */ __name((txt) => {
  accDescription = sanitizeText2(txt).replace(/\n\s+/g, "\n");
}, "setAccDescription");
var getAccDescription = /* @__PURE__ */ __name(() => accDescription, "getAccDescription");
var setDiagramTitle = /* @__PURE__ */ __name((txt) => {
  diagramTitle = sanitizeText2(txt);
}, "setDiagramTitle");
var getDiagramTitle = /* @__PURE__ */ __name(() => diagramTitle, "getDiagramTitle");
var log2 = log;
var setLogLevel2 = setLogLevel;
var getConfig2 = getConfig;
var setConfig2 = setConfig;
var defaultConfig2 = defaultConfig;
var sanitizeText3 = /* @__PURE__ */ __name((text2) => sanitizeText(text2, getConfig2()), "sanitizeText");
var setupGraphViewbox2 = setupGraphViewbox;
var getCommonDb = /* @__PURE__ */ __name(() => {
  return commonDb_exports;
}, "getCommonDb");
var diagrams = {};
var registerDiagram = /* @__PURE__ */ __name((id28, diagram2, detector28) => {
  var _a2;
  if (diagrams[id28]) {
    log2.warn(`Diagram with id ${id28} already registered. Overwriting.`);
  }
  diagrams[id28] = diagram2;
  if (detector28) {
    addDetector(id28, detector28);
  }
  addStylesForDiagram(id28, diagram2.styles);
  (_a2 = diagram2.injectUtils) == null ? void 0 : _a2.call(
    diagram2,
    log2,
    setLogLevel2,
    getConfig2,
    sanitizeText3,
    setupGraphViewbox2,
    getCommonDb(),
    () => {
    }
  );
}, "registerDiagram");
var getDiagram = /* @__PURE__ */ __name((name) => {
  if (name in diagrams) {
    return diagrams[name];
  }
  throw new DiagramNotFoundError(name);
}, "getDiagram");
var DiagramNotFoundError = (_g = class extends Error {
  constructor(name) {
    super(`Diagram ${name} not found.`);
  }
}, __name(_g, "DiagramNotFoundError"), _g);
var noop$1 = { value: () => {
} };
function dispatch() {
  for (var i2 = 0, n2 = arguments.length, _2 = {}, t2; i2 < n2; ++i2) {
    if (!(t2 = arguments[i2] + "") || t2 in _2 || /[\s.]/.test(t2)) throw new Error("illegal type: " + t2);
    _2[t2] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t2) {
    var name = "", i2 = t2.indexOf(".");
    if (i2 >= 0) name = t2.slice(i2 + 1), t2 = t2.slice(0, i2);
    if (t2 && !types.hasOwnProperty(t2)) throw new Error("unknown type: " + t2);
    return { type: t2, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T2 = parseTypenames$1(typename + "", _2), t2, i2 = -1, n2 = T2.length;
    if (arguments.length < 2) {
      while (++i2 < n2) if ((t2 = (typename = T2[i2]).type) && (t2 = get$1(_2[t2], typename.name))) return t2;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i2 < n2) {
      if (t2 = (typename = T2[i2]).type) _2[t2] = set$2(_2[t2], typename.name, callback);
      else if (callback == null) for (t2 in _2) _2[t2] = set$2(_2[t2], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _2 = this._;
    for (var t2 in _2) copy[t2] = _2[t2].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n2 = arguments.length - 2) > 0) for (var args = new Array(n2), i2 = 0, n2, t2; i2 < n2; ++i2) args[i2] = arguments[i2 + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t2 = this._[type2], i2 = 0, n2 = t2.length; i2 < n2; ++i2) t2[i2].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t2 = this._[type2], i2 = 0, n2 = t2.length; i2 < n2; ++i2) t2[i2].value.apply(that, args);
  }
};
function get$1(type2, name) {
  for (var i2 = 0, n2 = type2.length, c2; i2 < n2; ++i2) {
    if ((c2 = type2[i2]).name === name) {
      return c2.value;
    }
  }
}
function set$2(type2, name, callback) {
  for (var i2 = 0, n2 = type2.length; i2 < n2; ++i2) {
    if (type2[i2].name === name) {
      type2[i2] = noop$1, type2 = type2.slice(0, i2).concat(type2.slice(i2 + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
  var prefix = name += "", i2 = prefix.indexOf(":");
  if (i2 >= 0 && (prefix = name.slice(0, i2)) !== "xmlns") name = name.slice(i2 + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector(selector2) {
  return selector2 == null ? none : function() {
    return this.querySelector(selector2);
  };
}
function selection_select(select2) {
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, subgroup = subgroups[j2] = new Array(n2), node, subnode, i2 = 0; i2 < n2; ++i2) {
      if ((node = group[i2]) && (subnode = select2.call(node, node.__data__, i2, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i2] = subnode;
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function array$1(x2) {
  return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
}
function empty() {
  return [];
}
function selectorAll(selector2) {
  return selector2 == null ? empty : function() {
    return this.querySelectorAll(selector2);
  };
}
function arrayAll(select2) {
  return function() {
    return array$1(select2.apply(this, arguments));
  };
}
function selection_selectAll(select2) {
  if (typeof select2 === "function") select2 = arrayAll(select2);
  else select2 = selectorAll(select2);
  for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, node, i2 = 0; i2 < n2; ++i2) {
      if (node = group[i2]) {
        subgroups.push(select2.call(node, node.__data__, i2, group));
        parents.push(node);
      }
    }
  }
  return new Selection$1(subgroups, parents);
}
function matcher(selector2) {
  return function() {
    return this.matches(selector2);
  };
}
function childMatcher(selector2) {
  return function(node) {
    return node.matches(selector2);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, subgroup = subgroups[j2] = [], node, i2 = 0; i2 < n2; ++i2) {
      if ((node = group[i2]) && match.call(node, node.__data__, i2, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
  return new Array(update.length);
}
function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector2) {
    return this._parent.querySelector(selector2);
  },
  querySelectorAll: function(selector2) {
    return this._parent.querySelectorAll(selector2);
  }
};
function constant$2(x2) {
  return function() {
    return x2;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i2 = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i2 < dataLength; ++i2) {
    if (node = group[i2]) {
      node.__data__ = data[i2];
      update[i2] = node;
    } else {
      enter[i2] = new EnterNode(parent, data[i2]);
    }
  }
  for (; i2 < groupLength; ++i2) {
    if (node = group[i2]) {
      exit[i2] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i2, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i2 = 0; i2 < groupLength; ++i2) {
    if (node = group[i2]) {
      keyValues[i2] = keyValue = key.call(node, node.__data__, i2, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i2] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i2 = 0; i2 < dataLength; ++i2) {
    keyValue = key.call(parent, data[i2], i2, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i2] = node;
      node.__data__ = data[i2];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i2] = new EnterNode(parent, data[i2]);
    }
  }
  for (i2 = 0; i2 < groupLength; ++i2) {
    if ((node = group[i2]) && nodeByKeyValue.get(keyValues[i2]) === node) {
      exit[i2] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant$2(value);
  for (var m2 = groups.length, update = new Array(m2), enter = new Array(m2), exit = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    var parent = parents[j2], group = groups[j2], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j2, parents)), dataLength = data.length, enterGroup = enter[j2] = new Array(dataLength), updateGroup = update[j2] = new Array(dataLength), exitGroup = exit[j2] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m2; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n2 = group0.length, merge2 = merges[j2] = new Array(n2), node, i2 = 0; i2 < n2; ++i2) {
      if (node = group0[i2] || group1[i2]) {
        merge2[i2] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Selection$1(merges, this._parents);
}
function selection_order() {
  for (var groups = this._groups, j2 = -1, m2 = groups.length; ++j2 < m2; ) {
    for (var group = groups[j2], i2 = group.length - 1, next = group[i2], node; --i2 >= 0; ) {
      if (node = group[i2]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function selection_sort(compare) {
  if (!compare) compare = ascending;
  function compareNode(a2, b2) {
    return a2 && b2 ? compare(a2.__data__, b2.__data__) : !a2 - !b2;
  }
  for (var groups = this._groups, m2 = groups.length, sortgroups = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, sortgroup = sortgroups[j2] = new Array(n2), node, i2 = 0; i2 < n2; ++i2) {
      if (node = group[i2]) {
        sortgroup[i2] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a2, b2) {
  return a2 < b2 ? -1 : a2 > b2 ? 1 : a2 >= b2 ? 0 : NaN;
}
function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function selection_nodes() {
  return Array.from(this);
}
function selection_node() {
  for (var groups = this._groups, j2 = 0, m2 = groups.length; j2 < m2; ++j2) {
    for (var group = groups[j2], i2 = 0, n2 = group.length; i2 < n2; ++i2) {
      var node = group[i2];
      if (node) return node;
    }
  }
  return null;
}
function selection_size() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}
function selection_empty() {
  return !this.node();
}
function selection_each(callback) {
  for (var groups = this._groups, j2 = 0, m2 = groups.length; j2 < m2; ++j2) {
    for (var group = groups[j2], i2 = 0, n2 = group.length, node; i2 < n2; ++i2) {
      if (node = group[i2]) callback.call(node, node.__data__, i2, group);
    }
  }
  return this;
}
function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction$1(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null) this.removeAttribute(name);
    else this.setAttribute(name, v2);
  };
}
function attrFunctionNS$1(fullname, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v2);
  };
}
function selection_attr(name, value) {
  var fullname = namespace(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction$1(name, value, priority) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v2, priority);
  };
}
function selection_style(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null) delete this[name];
    else this[name] = v2;
  };
}
function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i2 = this._names.indexOf(name);
    if (i2 < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i2 = this._names.indexOf(name);
    if (i2 >= 0) {
      this._names.splice(i2, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i2 = -1, n2 = names.length;
  while (++i2 < n2) list.add(names[i2]);
}
function classedRemove(node, names) {
  var list = classList(node), i2 = -1, n2 = names.length;
  while (++i2 < n2) list.remove(names[i2]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function selection_classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i2 = -1, n2 = names.length;
    while (++i2 < n2) if (!list.contains(names[i2])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction$1(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.textContent = v2 == null ? "" : v2;
  };
}
function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.innerHTML = v2 == null ? "" : v2;
  };
}
function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function selection_raise() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
  return this.each(lower);
}
function selection_append(name) {
  var create2 = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function selection_insert(name, before) {
  var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function selection_remove() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone2 = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
}
function selection_cloneDeep() {
  var clone2 = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
}
function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t2) {
    var name = "", i2 = t2.indexOf(".");
    if (i2 >= 0) name = t2.slice(i2 + 1), t2 = t2.slice(0, i2);
    return { type: t2, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j2 = 0, i2 = -1, m2 = on.length, o2; j2 < m2; ++j2) {
      if (o2 = on[j2], (!typename.type || o2.type === typename.type) && o2.name === typename.name) {
        this.removeEventListener(o2.type, o2.listener, o2.options);
      } else {
        on[++i2] = o2;
      }
    }
    if (++i2) on.length = i2;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o2, listener = contextListener(value);
    if (on) for (var j2 = 0, m2 = on.length; j2 < m2; ++j2) {
      if ((o2 = on[j2]).type === typename.type && o2.name === typename.name) {
        this.removeEventListener(o2.type, o2.listener, o2.options);
        this.addEventListener(o2.type, o2.listener = listener, o2.options = options);
        o2.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o2 = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o2];
    else on.push(o2);
  };
}
function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i2, n2 = typenames.length, t2;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j2 = 0, m2 = on.length, o2; j2 < m2; ++j2) {
      for (i2 = 0, o2 = on[j2]; i2 < n2; ++i2) {
        if ((t2 = typenames[i2]).type === o2.type && t2.name === o2.name) {
          return o2.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i2 = 0; i2 < n2; ++i2) this.each(on(typenames[i2], value, options));
  return this;
}
function dispatchEvent(node, type2, params) {
  var window2 = defaultView(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function selection_dispatch(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}
function* selection_iterator() {
  for (var groups = this._groups, j2 = 0, m2 = groups.length; j2 < m2; ++j2) {
    for (var group = groups[j2], i2 = 0, n2 = group.length, node; i2 < n2; ++i2) {
      if (node = group[i2]) yield node;
    }
  }
}
var root = [null];
function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};
function select(selector2) {
  return typeof selector2 === "string" ? new Selection$1([[document.querySelector(selector2)]], [document.documentElement]) : new Selection$1([[selector2]], root);
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend$1(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels2) {
    return Object.assign(new this.constructor(), this, channels2);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m2, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m2 = reHex.exec(format2)) ? (l2 = m2[1].length, m2 = parseInt(m2[1], 16), l2 === 6 ? rgbn(m2) : l2 === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l2 === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l2 === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r2, g2, b2, a2) {
  if (a2 <= 0) r2 = g2 = b2 = NaN;
  return new Rgb(r2, g2, b2, a2);
}
function rgbConvert(o2) {
  if (!(o2 instanceof Color)) o2 = color(o2);
  if (!o2) return new Rgb();
  o2 = o2.rgb();
  return new Rgb(o2.r, o2.g, o2.b, o2.opacity);
}
function rgb(r2, g2, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g2, b2, opacity == null ? 1 : opacity);
}
function Rgb(r2, g2, b2, opacity) {
  this.r = +r2;
  this.g = +g2;
  this.b = +b2;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend$1(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s2, l2, a2) {
  if (a2 <= 0) h2 = s2 = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1) h2 = s2 = NaN;
  else if (s2 <= 0) h2 = NaN;
  return new Hsl(h2, s2, l2, a2);
}
function hslConvert(o2) {
  if (o2 instanceof Hsl) return new Hsl(o2.h, o2.s, o2.l, o2.opacity);
  if (!(o2 instanceof Color)) o2 = color(o2);
  if (!o2) return new Hsl();
  if (o2 instanceof Hsl) return o2;
  o2 = o2.rgb();
  var r2 = o2.r / 255, g2 = o2.g / 255, b2 = o2.b / 255, min2 = Math.min(r2, g2, b2), max2 = Math.max(r2, g2, b2), h2 = NaN, s2 = max2 - min2, l2 = (max2 + min2) / 2;
  if (s2) {
    if (r2 === max2) h2 = (g2 - b2) / s2 + (g2 < b2) * 6;
    else if (g2 === max2) h2 = (b2 - r2) / s2 + 2;
    else h2 = (r2 - g2) / s2 + 4;
    s2 /= l2 < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h2 *= 60;
  } else {
    s2 = l2 > 0 && l2 < 1 ? 0 : h2;
  }
  return new Hsl(h2, s2, l2, o2.opacity);
}
function hsl(h2, s2, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s2, l2, opacity == null ? 1 : opacity);
}
function Hsl(h2, s2, l2, opacity) {
  this.h = +h2;
  this.s = +s2;
  this.l = +l2;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend$1(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s2, m1 = 2 * l2 - m2;
    return new Rgb(
      hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2),
      hsl2rgb(h2, m1, m2),
      hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}
var constant$1 = (x2) => () => x2;
function linear(a2, d2) {
  return function(t2) {
    return a2 + t2 * d2;
  };
}
function exponential(a2, b2, y2) {
  return a2 = Math.pow(a2, y2), b2 = Math.pow(b2, y2) - a2, y2 = 1 / y2, function(t2) {
    return Math.pow(a2 + t2 * b2, y2);
  };
}
function hue(a2, b2) {
  var d2 = b2 - a2;
  return d2 ? linear(a2, d2 > 180 || d2 < -180 ? d2 - 360 * Math.round(d2 / 360) : d2) : constant$1(isNaN(a2) ? b2 : a2);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b2) {
    return b2 - a2 ? exponential(a2, b2, y2) : constant$1(isNaN(a2) ? b2 : a2);
  };
}
function nogamma(a2, b2) {
  var d2 = b2 - a2;
  return d2 ? linear(a2, d2) : constant$1(isNaN(a2) ? b2 : a2);
}
var interpolateRgb = (function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb$1(start2, end) {
    var r2 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g2 = color2(start2.g, end.g), b2 = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t2) {
      start2.r = r2(t2);
      start2.g = g2(t2);
      start2.b = b2(t2);
      start2.opacity = opacity(t2);
      return start2 + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
})(1);
function interpolateNumber(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t2) {
    return a2 * (1 - t2) + b2 * t2;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b2) {
  return function() {
    return b2;
  };
}
function one(b2) {
  return function(t2) {
    return b2(t2) + "";
  };
}
function interpolateString(a2, b2) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i2 = -1, s2 = [], q2 = [];
  a2 = a2 + "", b2 = b2 + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b2))) {
    if ((bs = bm.index) > bi) {
      bs = b2.slice(bi, bs);
      if (s2[i2]) s2[i2] += bs;
      else s2[++i2] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i2]) s2[i2] += bm;
      else s2[++i2] = bm;
    } else {
      s2[++i2] = null;
      q2.push({ i: i2, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b2.length) {
    bs = b2.slice(bi);
    if (s2[i2]) s2[i2] += bs;
    else s2[++i2] = bs;
  }
  return s2.length < 2 ? q2[0] ? one(q2[0].x) : zero(b2) : (b2 = q2.length, function(t2) {
    for (var i3 = 0, o2; i3 < b2; ++i3) s2[(o2 = q2[i3]).i] = o2.x(t2);
    return s2.join("");
  });
}
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose(a2, b2, c2, d2, e2, f2) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b2 * b2)) a2 /= scaleX, b2 /= scaleX;
  if (skewX = a2 * c2 + b2 * d2) c2 -= a2 * skewX, d2 -= b2 * skewX;
  if (scaleY = Math.sqrt(c2 * c2 + d2 * d2)) c2 /= scaleY, d2 /= scaleY, skewX /= scaleY;
  if (a2 * d2 < b2 * c2) a2 = -a2, b2 = -b2, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e2,
    translateY: f2,
    rotate: Math.atan2(b2, a2) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m2 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m2.isIdentity ? identity : decompose(m2.a, m2.b, m2.c, m2.d, m2.e, m2.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse3, pxComma, pxParen, degParen) {
  function pop(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q2) {
    if (xa !== xb || ya !== yb) {
      var i2 = s2.push("translate(", null, pxComma, null, pxParen);
      q2.push({ i: i2 - 4, x: interpolateNumber(xa, xb) }, { i: i2 - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b2, s2, q2) {
    if (a2 !== b2) {
      if (a2 - b2 > 180) b2 += 360;
      else if (b2 - a2 > 180) a2 += 360;
      q2.push({ i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: interpolateNumber(a2, b2) });
    } else if (b2) {
      s2.push(pop(s2) + "rotate(" + b2 + degParen);
    }
  }
  function skewX(a2, b2, s2, q2) {
    if (a2 !== b2) {
      q2.push({ i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: interpolateNumber(a2, b2) });
    } else if (b2) {
      s2.push(pop(s2) + "skewX(" + b2 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s2, q2) {
    if (xa !== xb || ya !== yb) {
      var i2 = s2.push(pop(s2) + "scale(", null, ",", null, ")");
      q2.push({ i: i2 - 4, x: interpolateNumber(xa, xb) }, { i: i2 - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b2) {
    var s2 = [], q2 = [];
    a2 = parse3(a2), b2 = parse3(b2);
    translate(a2.translateX, a2.translateY, b2.translateX, b2.translateY, s2, q2);
    rotate(a2.rotate, b2.rotate, s2, q2);
    skewX(a2.skewX, b2.skewX, s2, q2);
    scale(a2.scaleX, a2.scaleY, b2.scaleX, b2.scaleY, s2, q2);
    a2 = b2 = null;
    return function(t2) {
      var i2 = -1, n2 = q2.length, o2;
      while (++i2 < n2) s2[(o2 = q2[i2]).i] = o2.x(t2);
      return s2.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f2) {
  setTimeout(f2, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t2 = new Timer();
  t2.restart(callback, delay, time);
  return t2;
}
function timerFlush() {
  now();
  ++frame;
  var t2 = taskHead, e2;
  while (t2) {
    if ((e2 = clockNow - t2._time) >= 0) t2._call.call(void 0, e2);
    t2 = t2._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout(callback, delay, time) {
  var t2 = new Timer();
  delay = delay == null ? 0 : +delay;
  t2.restart((elapsed) => {
    t2.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t2;
}
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id28, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id28 in schedules) return;
  create(node, id28, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init$1(node, id28) {
  var schedule2 = get(node, id28);
  if (schedule2.state > CREATED) throw new Error("too late; already scheduled");
  return schedule2;
}
function set$1(node, id28) {
  var schedule2 = get(node, id28);
  if (schedule2.state > STARTED) throw new Error("too late; already running");
  return schedule2;
}
function get(node, id28) {
  var schedule2 = node.__transition;
  if (!schedule2 || !(schedule2 = schedule2[id28])) throw new Error("transition not found");
  return schedule2;
}
function create(node, id28, self) {
  var schedules = node.__transition, tween;
  schedules[id28] = self;
  self.timer = timer(schedule2, 0, self.time);
  function schedule2(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i2, j2, n2, o2;
    if (self.state !== SCHEDULED) return stop();
    for (i2 in schedules) {
      o2 = schedules[i2];
      if (o2.name !== self.name) continue;
      if (o2.state === STARTED) return timeout(start2);
      if (o2.state === RUNNING) {
        o2.state = ENDED;
        o2.timer.stop();
        o2.on.call("interrupt", node, node.__data__, o2.index, o2.group);
        delete schedules[i2];
      } else if (+i2 < id28) {
        o2.state = ENDED;
        o2.timer.stop();
        o2.on.call("cancel", node, node.__data__, o2.index, o2.group);
        delete schedules[i2];
      }
    }
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n2 = self.tween.length);
    for (i2 = 0, j2 = -1; i2 < n2; ++i2) {
      if (o2 = self.tween[i2].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j2] = o2;
      }
    }
    tween.length = j2 + 1;
  }
  function tick(elapsed) {
    var t2 = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i2 = -1, n2 = tween.length;
    while (++i2 < n2) {
      tween[i2].call(node, t2);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id28];
    for (var i2 in schedules) return;
    delete node.__transition;
  }
}
function interrupt(node, name) {
  var schedules = node.__transition, schedule2, active, empty2 = true, i2;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i2 in schedules) {
    if ((schedule2 = schedules[i2]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule2.state > STARTING && schedule2.state < ENDING;
    schedule2.state = ENDED;
    schedule2.timer.stop();
    schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
    delete schedules[i2];
  }
  if (empty2) delete node.__transition;
}
function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}
function tweenRemove(id28, name) {
  var tween0, tween1;
  return function() {
    var schedule2 = set$1(this, id28), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i2 = 0, n2 = tween1.length; i2 < n2; ++i2) {
        if (tween1[i2].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i2, 1);
          break;
        }
      }
    }
    schedule2.tween = tween1;
  };
}
function tweenFunction(id28, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule2 = set$1(this, id28), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t2 = { name, value }, i2 = 0, n2 = tween1.length; i2 < n2; ++i2) {
        if (tween1[i2].name === name) {
          tween1[i2] = t2;
          break;
        }
      }
      if (i2 === n2) tween1.push(t2);
    }
    schedule2.tween = tween1;
  };
}
function transition_tween(name, value) {
  var id28 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id28).tween;
    for (var i2 = 0, n2 = tween.length, t2; i2 < n2; ++i2) {
      if ((t2 = tween[i2]).name === name) {
        return t2.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id28, name, value));
}
function tweenValue(transition, name, value) {
  var id28 = transition._id;
  transition.each(function() {
    var schedule2 = set$1(this, id28);
    (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get(node, id28).value[name];
  };
}
function interpolate(a2, b2) {
  var c2;
  return (typeof b2 === "number" ? interpolateNumber : b2 instanceof color ? interpolateRgb : (c2 = color(b2)) ? (b2 = c2, interpolateRgb) : interpolateString)(a2, b2);
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function transition_attr(name, value) {
  var fullname = namespace(name), i2 = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i2, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i2, value));
}
function attrInterpolate(name, i2) {
  return function(t2) {
    this.setAttribute(name, i2.call(this, t2));
  };
}
function attrInterpolateNS(fullname, i2) {
  return function(t2) {
    this.setAttributeNS(fullname.space, fullname.local, i2.call(this, t2));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i2 = value.apply(this, arguments);
    if (i2 !== i0) t0 = (i0 = i2) && attrInterpolateNS(fullname, i2);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i2 = value.apply(this, arguments);
    if (i2 !== i0) t0 = (i0 = i2) && attrInterpolate(name, i2);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id28, value) {
  return function() {
    init$1(this, id28).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id28, value) {
  return value = +value, function() {
    init$1(this, id28).delay = value;
  };
}
function transition_delay(value) {
  var id28 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id28, value)) : get(this.node(), id28).delay;
}
function durationFunction(id28, value) {
  return function() {
    set$1(this, id28).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id28, value) {
  return value = +value, function() {
    set$1(this, id28).duration = value;
  };
}
function transition_duration(value) {
  var id28 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id28, value)) : get(this.node(), id28).duration;
}
function easeConstant(id28, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set$1(this, id28).ease = value;
  };
}
function transition_ease(value) {
  var id28 = this._id;
  return arguments.length ? this.each(easeConstant(id28, value)) : get(this.node(), id28).ease;
}
function easeVarying(id28, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (typeof v2 !== "function") throw new Error();
    set$1(this, id28).ease = v2;
  };
}
function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, subgroup = subgroups[j2] = [], node, i2 = 0; i2 < n2; ++i2) {
      if ((node = group[i2]) && match.call(node, node.__data__, i2, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m2; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n2 = group0.length, merge2 = merges[j2] = new Array(n2), node, i2 = 0; i2 < n2; ++i2) {
      if (node = group0[i2] || group1[i2]) {
        merge2[i2] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t2) {
    var i2 = t2.indexOf(".");
    if (i2 >= 0) t2 = t2.slice(0, i2);
    return !t2 || t2 === "start";
  });
}
function onFunction(id28, name, listener) {
  var on0, on1, sit = start(name) ? init$1 : set$1;
  return function() {
    var schedule2 = sit(this, id28), on = schedule2.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule2.on = on1;
  };
}
function transition_on(name, listener) {
  var id28 = this._id;
  return arguments.length < 2 ? get(this.node(), id28).on.on(name) : this.each(onFunction(id28, name, listener));
}
function removeFunction(id28) {
  return function() {
    var parent = this.parentNode;
    for (var i2 in this.__transition) if (+i2 !== id28) return;
    if (parent) parent.removeChild(this);
  };
}
function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select2) {
  var name = this._name, id28 = this._id;
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, subgroup = subgroups[j2] = new Array(n2), node, subnode, i2 = 0; i2 < n2; ++i2) {
      if ((node = group[i2]) && (subnode = select2.call(node, node.__data__, i2, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i2] = subnode;
        schedule(subgroup[i2], name, id28, i2, subgroup, get(node, id28));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id28);
}
function transition_selectAll(select2) {
  var name = this._name, id28 = this._id;
  if (typeof select2 !== "function") select2 = selectorAll(select2);
  for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, node, i2 = 0; i2 < n2; ++i2) {
      if (node = group[i2]) {
        for (var children2 = select2.call(node, node.__data__, i2, group), child, inherit2 = get(node, id28), k2 = 0, l2 = children2.length; k2 < l2; ++k2) {
          if (child = children2[k2]) {
            schedule(child, name, id28, k2, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id28);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
  return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function styleMaybeRemove(id28, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule2 = set$1(this, id28), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule2.on = on1;
  };
}
function transition_style(name, value, priority) {
  var i2 = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i2)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i2, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i2, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i2, priority) {
  return function(t2) {
    this.style.setProperty(name, i2.call(this, t2), priority);
  };
}
function styleTween(name, value, priority) {
  var t2, i0;
  function tween() {
    var i2 = value.apply(this, arguments);
    if (i2 !== i0) t2 = (i0 = i2) && styleInterpolate(name, i2, priority);
    return t2;
  }
  tween._value = value;
  return tween;
}
function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i2) {
  return function(t2) {
    this.textContent = i2.call(this, t2);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i2 = value.apply(this, arguments);
    if (i2 !== i0) t0 = (i0 = i2) && textInterpolate(i2);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
function transition_transition() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m2 = groups.length, j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, node, i2 = 0; i2 < n2; ++i2) {
      if (node = group[i2]) {
        var inherit2 = get(node, id0);
        schedule(node, name, id1, i2, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
  var on0, on1, that = this, id28 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule2 = set$1(this, id28), on = schedule2.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule2.on = on1;
    });
    if (size === 0) resolve();
  });
}
var id$1 = 0;
function Transition(groups, parents, name, id28) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id28;
}
function newId() {
  return ++id$1;
}
var selection_prototype = selection.prototype;
Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t2) {
  return ((t2 *= 2) <= 1 ? t2 * t2 * t2 : (t2 -= 2) * t2 * t2 + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id28) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id28])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id28} not found`);
    }
  }
  return timing;
}
function selection_transition(name) {
  var id28, timing;
  if (name instanceof Transition) {
    id28 = name._id, name = name._name;
  } else {
    id28 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m2 = groups.length, j2 = 0; j2 < m2; ++j2) {
    for (var group = groups[j2], n2 = group.length, node, i2 = 0; i2 < n2; ++i2) {
      if (node = group[i2]) {
        schedule(node, name, id28, i2, group, timing || inherit(node, id28));
      }
    }
  }
  return new Transition(groups, this._parents, name, id28);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
const pi$1 = Math.PI, tau$1 = 2 * pi$1, epsilon$1 = 1e-6, tauEpsilon = tau$1 - epsilon$1;
function append(strings) {
  this._ += strings[0];
  for (let i2 = 1, n2 = strings.length; i2 < n2; ++i2) {
    this._ += arguments[i2] + strings[i2];
  }
}
function appendRound(digits) {
  let d2 = Math.floor(digits);
  if (!(d2 >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d2 > 15) return append;
  const k2 = 10 ** d2;
  return function(strings) {
    this._ += strings[0];
    for (let i2 = 1, n2 = strings.length; i2 < n2; ++i2) {
      this._ += Math.round(arguments[i2] * k2) / k2 + strings[i2];
    }
  };
}
class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r2) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r2 = +r2;
    if (r2 < 0) throw new Error(`negative radius: ${r2}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon$1)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r2) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l2 = r2 * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l2 / l01, t21 = l2 / l21;
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r2},${r2},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r2, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r2 = +r2, ccw = !!ccw;
    if (r2 < 0) throw new Error(`negative radius: ${r2}`);
    let dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._append`L${x0},${y0}`;
    }
    if (!r2) return;
    if (da < 0) da = da % tau$1 + tau$1;
    if (da > tauEpsilon) {
      this._append`A${r2},${r2},0,1,${cw},${x2 - dx},${y2 - dy}A${r2},${r2},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon$1) {
      this._append`A${r2},${r2},0,${+(da >= pi$1)},${cw},${this._x1 = x2 + r2 * Math.cos(a1)},${this._y1 = y2 + r2 * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w2, h2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w2 = +w2}v${+h2}h${-w2}Z`;
  }
  toString() {
    return this._;
  }
}
function constant(x2) {
  return function constant2() {
    return x2;
  };
}
const abs = Math.abs;
const atan2 = Math.atan2;
const cos = Math.cos;
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const sqrt = Math.sqrt;
const epsilon = 1e-12;
const pi = Math.PI;
const halfPi = pi / 2;
const tau = 2 * pi;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
}
function asin(x2) {
  return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
}
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_2) {
    if (!arguments.length) return digits;
    if (_2 == null) {
      digits = null;
    } else {
      const d2 = Math.floor(_2);
      if (!(d2 >= 0)) throw new RangeError(`invalid digits: ${_2}`);
      digits = d2;
    }
    return shape;
  };
  return () => new Path(digits);
}
function array(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function curveLinear(context) {
  return new Linear(context);
}
function x$1(p2) {
  return p2[0];
}
function y$1(p2) {
  return p2[1];
}
function line(x2, y2) {
  var defined = constant(true), context = null, curve = curveLinear, output = null, path = withPath(line2);
  x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x$1 : constant(x2);
  y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y$1 : constant(y2);
  function line2(data) {
    var i2, n2 = (data = array(data)).length, d2, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path());
    for (i2 = 0; i2 <= n2; ++i2) {
      if (!(i2 < n2 && defined(d2 = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x2(d2, i2, data), +y2(d2, i2, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line2.x = function(_2) {
    return arguments.length ? (x2 = typeof _2 === "function" ? _2 : constant(+_2), line2) : x2;
  };
  line2.y = function(_2) {
    return arguments.length ? (y2 = typeof _2 === "function" ? _2 : constant(+_2), line2) : y2;
  };
  line2.defined = function(_2) {
    return arguments.length ? (defined = typeof _2 === "function" ? _2 : constant(!!_2), line2) : defined;
  };
  line2.curve = function(_2) {
    return arguments.length ? (curve = _2, context != null && (output = curve(context)), line2) : curve;
  };
  line2.context = function(_2) {
    return arguments.length ? (_2 == null ? context = output = null : output = curve(context = _2), line2) : context;
  };
  return line2;
}
class Bump {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x2, y2);
        else this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function bumpY(context) {
  return new Bump(context, false);
}
function noop() {
}
function point$4(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point$4(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        point$4(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasis(context) {
  return new Basis(context);
}
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point$4(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisClosed(context) {
  return new BasisClosed(context);
}
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point$4(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisOpen(context) {
  return new BasisOpen(context);
}
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, j2 = x2.length - 1;
    if (j2 > 0) {
      var x0 = x2[0], y0 = y2[0], dx = x2[j2] - x0, dy = y2[j2] - y0, i2 = -1, t2;
      while (++i2 <= j2) {
        t2 = i2 / j2;
        this._basis.point(
          this._beta * x2[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y2[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
var curveBundle = (function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
})(0.85);
function point$3(that, x2, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
    that._y2 + that._k * (that._y1 - y2),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point$3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCardinal = (function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
})(0);
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCardinalClosed = (function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
})(0);
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCardinalOpen = (function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
})(0);
function point$2(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m2 = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x2 * that._l12_2a) / m2;
    y22 = (y22 * b2 + that._y1 * that._l23_2a - y2 * that._l12_2a) / m2;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point$2(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCatmullRom = (function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
})(0.5);
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCatmullRomClosed = (function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
})(0.5);
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point$2(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var curveCatmullRomOpen = (function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
})(0.5);
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) this._context.lineTo(x2, y2);
    else this._point = 1, this._context.moveTo(x2, y2);
  }
};
function curveLinearClosed(context) {
  return new LinearClosed(context);
}
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t2) / 2 : t2;
}
function point$1(that, t0, t1) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point$1(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t1 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point$1(this, slope2(this, t1 = slope3(this, x2, y2)), t1);
        break;
      default:
        point$1(this, this._t0, t1 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t1;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n2 = x2.length;
    if (n2) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n2 === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i2, n2 = x2.length - 1, m2, a2 = new Array(n2), b2 = new Array(n2), r2 = new Array(n2);
  a2[0] = 0, b2[0] = 2, r2[0] = x2[0] + 2 * x2[1];
  for (i2 = 1; i2 < n2 - 1; ++i2) a2[i2] = 1, b2[i2] = 4, r2[i2] = 4 * x2[i2] + 2 * x2[i2 + 1];
  a2[n2 - 1] = 2, b2[n2 - 1] = 7, r2[n2 - 1] = 8 * x2[n2 - 1] + x2[n2];
  for (i2 = 1; i2 < n2; ++i2) m2 = a2[i2] / b2[i2 - 1], b2[i2] -= m2, r2[i2] -= m2 * r2[i2 - 1];
  a2[n2 - 1] = r2[n2 - 1] / b2[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2) a2[i2] = (r2[i2] - a2[i2 + 1]) / b2[i2];
  b2[n2 - 1] = (x2[n2] + a2[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2) b2[i2] = 2 * x2[i2 + 1] - a2[i2 + 1];
  return [a2, b2];
}
function curveNatural(context) {
  return new Natural(context);
}
function Step(context, t2) {
  this._context = context;
  this._t = t2;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};
function curveStep(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
function Transform(k2, x2, y2) {
  this.k = k2;
  this.x = x2;
  this.y = y2;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k2) {
    return k2 === 1 ? this : new Transform(this.k * k2, this.x, this.y);
  },
  translate: function(x2, y2) {
    return x2 === 0 & y2 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y2);
  },
  apply: function(point2) {
    return [point2[0] * this.k + this.x, point2[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y2) {
    return y2 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y2) {
    return (y2 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y2) {
    return y2.copy().domain(y2.range().map(this.invertY, this).map(y2.invert, y2));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Transform.prototype;
var selectSvgElement = /* @__PURE__ */ __name((id28) => {
  var _a2;
  const { securityLevel } = getConfig2();
  let root2 = select("body");
  if (securityLevel === "sandbox") {
    const sandboxElement = select(`#i${id28}`);
    const doc = ((_a2 = sandboxElement.node()) == null ? void 0 : _a2.contentDocument) ?? document;
    root2 = select(doc.body);
  }
  const svg2 = root2.select(`#${id28}`);
  return svg2;
}, "selectSvgElement");
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
__name(isNothing, "isNothing");
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
__name(isObject, "isObject");
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
__name(toArray, "toArray");
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
__name(extend, "extend");
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
__name(repeat, "repeat");
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
__name(isNegativeZero, "isNegativeZero");
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
__name(formatError, "formatError");
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
__name(YAMLException$1, "YAMLException$1");
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = /* @__PURE__ */ __name(function toString(compact) {
  return this.name + ": " + formatError(this, compact);
}, "toString");
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
__name(getLine, "getLine");
function padStart(string, max2) {
  return common.repeat(" ", max2 - string.length) + string;
}
__name(padStart, "padStart");
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i2, line2;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i2 = 1; i2 <= options.linesBefore; i2++) {
    if (foundLineNo - i2 < 0) break;
    line2 = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i2],
      lineEnds[foundLineNo - i2],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i2]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i2 + 1).toString(), lineNoLength) + " | " + line2.str + "\n" + result;
  }
  line2 = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line2.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line2.pos) + "^\n";
  for (i2 = 1; i2 <= options.linesAfter; i2++) {
    if (foundLineNo + i2 >= lineEnds.length) break;
    line2 = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i2],
      lineEnds[foundLineNo + i2],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i2]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i2 + 1).toString(), lineNoLength) + " | " + line2.str + "\n";
  }
  return result.replace(/\n$/, "");
}
__name(makeSnippet, "makeSnippet");
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
__name(compileStyleAliases, "compileStyleAliases");
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
__name(Type$1, "Type$1");
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
__name(compileList, "compileList");
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  __name(collectType, "collectType");
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
__name(compileMap, "compileMap");
function Schema$1(definition) {
  return this.extend(definition);
}
__name(Schema$1, "Schema$1");
Schema$1.prototype.extend = /* @__PURE__ */ __name(function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
}, "extend");
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: /* @__PURE__ */ __name(function(data) {
    return data !== null ? data : "";
  }, "construct")
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: /* @__PURE__ */ __name(function(data) {
    return data !== null ? data : [];
  }, "construct")
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: /* @__PURE__ */ __name(function(data) {
    return data !== null ? data : {};
  }, "construct")
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max2 = data.length;
  return max2 === 1 && data === "~" || max2 === 4 && (data === "null" || data === "Null" || data === "NULL");
}
__name(resolveYamlNull, "resolveYamlNull");
function constructYamlNull() {
  return null;
}
__name(constructYamlNull, "constructYamlNull");
function isNull(object) {
  return object === null;
}
__name(isNull, "isNull");
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: /* @__PURE__ */ __name(function() {
      return "~";
    }, "canonical"),
    lowercase: /* @__PURE__ */ __name(function() {
      return "null";
    }, "lowercase"),
    uppercase: /* @__PURE__ */ __name(function() {
      return "NULL";
    }, "uppercase"),
    camelcase: /* @__PURE__ */ __name(function() {
      return "Null";
    }, "camelcase"),
    empty: /* @__PURE__ */ __name(function() {
      return "";
    }, "empty")
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max2 = data.length;
  return max2 === 4 && (data === "true" || data === "True" || data === "TRUE") || max2 === 5 && (data === "false" || data === "False" || data === "FALSE");
}
__name(resolveYamlBoolean, "resolveYamlBoolean");
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
__name(constructYamlBoolean, "constructYamlBoolean");
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
__name(isBoolean, "isBoolean");
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: /* @__PURE__ */ __name(function(object) {
      return object ? "true" : "false";
    }, "lowercase"),
    uppercase: /* @__PURE__ */ __name(function(object) {
      return object ? "TRUE" : "FALSE";
    }, "uppercase"),
    camelcase: /* @__PURE__ */ __name(function(object) {
      return object ? "True" : "False";
    }, "camelcase")
  },
  defaultStyle: "lowercase"
});
function isHexCode(c2) {
  return 48 <= c2 && c2 <= 57 || 65 <= c2 && c2 <= 70 || 97 <= c2 && c2 <= 102;
}
__name(isHexCode, "isHexCode");
function isOctCode(c2) {
  return 48 <= c2 && c2 <= 55;
}
__name(isOctCode, "isOctCode");
function isDecCode(c2) {
  return 48 <= c2 && c2 <= 57;
}
__name(isDecCode, "isDecCode");
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max2 = data.length, index = 0, hasDigits = false, ch;
  if (!max2) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max2) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max2; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max2; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max2; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max2; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
__name(resolveYamlInteger, "resolveYamlInteger");
function constructYamlInteger(data) {
  var value = data, sign2 = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign2 = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign2 * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign2 * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign2 * parseInt(value.slice(2), 8);
  }
  return sign2 * parseInt(value, 10);
}
__name(constructYamlInteger, "constructYamlInteger");
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
__name(isInteger, "isInteger");
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: /* @__PURE__ */ __name(function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    }, "binary"),
    octal: /* @__PURE__ */ __name(function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    }, "octal"),
    decimal: /* @__PURE__ */ __name(function(obj) {
      return obj.toString(10);
    }, "decimal"),
    /* eslint-disable max-len */
    hexadecimal: /* @__PURE__ */ __name(function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }, "hexadecimal")
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
__name(resolveYamlFloat, "resolveYamlFloat");
function constructYamlFloat(data) {
  var value, sign2;
  value = data.replace(/_/g, "").toLowerCase();
  sign2 = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign2 === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign2 * parseFloat(value, 10);
}
__name(constructYamlFloat, "constructYamlFloat");
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
__name(representYamlFloat, "representYamlFloat");
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
__name(isFloat, "isFloat");
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
__name(resolveYamlTimestamp, "resolveYamlTimestamp");
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
__name(constructYamlTimestamp, "constructYamlTimestamp");
function representYamlTimestamp(object) {
  return object.toISOString();
}
__name(representYamlTimestamp, "representYamlTimestamp");
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
__name(resolveYamlMerge, "resolveYamlMerge");
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max2 = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max2; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
__name(resolveYamlBinary, "resolveYamlBinary");
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max2 = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max2; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max2 % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
__name(constructYamlBinary, "constructYamlBinary");
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max2 = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max2; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max2 % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
__name(representYamlBinary, "representYamlBinary");
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
__name(isBinary, "isBinary");
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
__name(resolveYamlOmap, "resolveYamlOmap");
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
__name(constructYamlOmap, "constructYamlOmap");
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
__name(resolveYamlPairs, "resolveYamlPairs");
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
__name(constructYamlPairs, "constructYamlPairs");
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
__name(resolveYamlSet, "resolveYamlSet");
function constructYamlSet(data) {
  return data !== null ? data : {};
}
__name(constructYamlSet, "constructYamlSet");
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
__name(_class, "_class");
function is_EOL(c2) {
  return c2 === 10 || c2 === 13;
}
__name(is_EOL, "is_EOL");
function is_WHITE_SPACE(c2) {
  return c2 === 9 || c2 === 32;
}
__name(is_WHITE_SPACE, "is_WHITE_SPACE");
function is_WS_OR_EOL(c2) {
  return c2 === 9 || c2 === 32 || c2 === 10 || c2 === 13;
}
__name(is_WS_OR_EOL, "is_WS_OR_EOL");
function is_FLOW_INDICATOR(c2) {
  return c2 === 44 || c2 === 91 || c2 === 93 || c2 === 123 || c2 === 125;
}
__name(is_FLOW_INDICATOR, "is_FLOW_INDICATOR");
function fromHexCode(c2) {
  var lc;
  if (48 <= c2 && c2 <= 57) {
    return c2 - 48;
  }
  lc = c2 | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
__name(fromHexCode, "fromHexCode");
function escapedHexLen(c2) {
  if (c2 === 120) {
    return 2;
  }
  if (c2 === 117) {
    return 4;
  }
  if (c2 === 85) {
    return 8;
  }
  return 0;
}
__name(escapedHexLen, "escapedHexLen");
function fromDecimalCode(c2) {
  if (48 <= c2 && c2 <= 57) {
    return c2 - 48;
  }
  return -1;
}
__name(fromDecimalCode, "fromDecimalCode");
function simpleEscapeSequence(c2) {
  return c2 === 48 ? "\0" : c2 === 97 ? "\x07" : c2 === 98 ? "\b" : c2 === 116 ? "	" : c2 === 9 ? "	" : c2 === 110 ? "\n" : c2 === 118 ? "\v" : c2 === 102 ? "\f" : c2 === 114 ? "\r" : c2 === 101 ? "\x1B" : c2 === 32 ? " " : c2 === 34 ? '"' : c2 === 47 ? "/" : c2 === 92 ? "\\" : c2 === 78 ? "" : c2 === 95 ? " " : c2 === 76 ? "\u2028" : c2 === 80 ? "\u2029" : "";
}
__name(simpleEscapeSequence, "simpleEscapeSequence");
function charFromCodepoint(c2) {
  if (c2 <= 65535) {
    return String.fromCharCode(c2);
  }
  return String.fromCharCode(
    (c2 - 65536 >> 10) + 55296,
    (c2 - 65536 & 1023) + 56320
  );
}
__name(charFromCodepoint, "charFromCodepoint");
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i$1 = 0; i$1 < 256; i$1++) {
  simpleEscapeCheck[i$1] = simpleEscapeSequence(i$1) ? 1 : 0;
  simpleEscapeMap[i$1] = simpleEscapeSequence(i$1);
}
var i$1;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
__name(State$1, "State$1");
function generateError(state2, message) {
  var mark = {
    name: state2.filename,
    buffer: state2.input.slice(0, -1),
    // omit trailing \0
    position: state2.position,
    line: state2.line,
    column: state2.position - state2.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
__name(generateError, "generateError");
function throwError(state2, message) {
  throw generateError(state2, message);
}
__name(throwError, "throwError");
function throwWarning(state2, message) {
  if (state2.onWarning) {
    state2.onWarning.call(null, generateError(state2, message));
  }
}
__name(throwWarning, "throwWarning");
var directiveHandlers = {
  YAML: /* @__PURE__ */ __name(function handleYamlDirective(state2, name, args) {
    var match, major, minor;
    if (state2.version !== null) {
      throwError(state2, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state2, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state2, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state2, "unacceptable YAML version of the document");
    }
    state2.version = args[0];
    state2.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state2, "unsupported YAML version of the document");
    }
  }, "handleYamlDirective"),
  TAG: /* @__PURE__ */ __name(function handleTagDirective(state2, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state2, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state2, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state2.tagMap, handle)) {
      throwError(state2, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state2, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state2, "tag prefix is malformed: " + prefix);
    }
    state2.tagMap[handle] = prefix;
  }, "handleTagDirective")
};
function captureSegment(state2, start2, end, checkJson) {
  var _position, _length, _character, _result;
  if (start2 < end) {
    _result = state2.input.slice(start2, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state2, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state2, "the stream contains non-printable characters");
    }
    state2.result += _result;
  }
}
__name(captureSegment, "captureSegment");
function mergeMappings(state2, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state2, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
__name(mergeMappings, "mergeMappings");
function storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state2, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state2, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state2, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state2.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state2.line = startLine || state2.line;
      state2.lineStart = startLineStart || state2.lineStart;
      state2.position = startPos || state2.position;
      throwError(state2, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
__name(storeMappingPair, "storeMappingPair");
function readLineBreak(state2) {
  var ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch === 10) {
    state2.position++;
  } else if (ch === 13) {
    state2.position++;
    if (state2.input.charCodeAt(state2.position) === 10) {
      state2.position++;
    }
  } else {
    throwError(state2, "a line break is expected");
  }
  state2.line += 1;
  state2.lineStart = state2.position;
  state2.firstTabInLine = -1;
}
__name(readLineBreak, "readLineBreak");
function skipSeparationSpace(state2, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state2.input.charCodeAt(state2.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state2.firstTabInLine === -1) {
        state2.firstTabInLine = state2.position;
      }
      ch = state2.input.charCodeAt(++state2.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state2.input.charCodeAt(++state2.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state2);
      ch = state2.input.charCodeAt(state2.position);
      lineBreaks++;
      state2.lineIndent = 0;
      while (ch === 32) {
        state2.lineIndent++;
        ch = state2.input.charCodeAt(++state2.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state2.lineIndent < checkIndent) {
    throwWarning(state2, "deficient indentation");
  }
  return lineBreaks;
}
__name(skipSeparationSpace, "skipSeparationSpace");
function testDocumentSeparator(state2) {
  var _position = state2.position, ch;
  ch = state2.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state2.input.charCodeAt(_position + 1) && ch === state2.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state2.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
__name(testDocumentSeparator, "testDocumentSeparator");
function writeFoldedLines(state2, count) {
  if (count === 1) {
    state2.result += " ";
  } else if (count > 1) {
    state2.result += common.repeat("\n", count - 1);
  }
}
__name(writeFoldedLines, "writeFoldedLines");
function readPlainScalar(state2, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state2.kind, _result = state2.result, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state2.input.charCodeAt(state2.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state2.kind = "scalar";
  state2.result = "";
  captureStart = captureEnd = state2.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state2.input.charCodeAt(state2.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state2.input.charCodeAt(state2.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state2.position === state2.lineStart && testDocumentSeparator(state2) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state2.line;
      _lineStart = state2.lineStart;
      _lineIndent = state2.lineIndent;
      skipSeparationSpace(state2, false, -1);
      if (state2.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state2.input.charCodeAt(state2.position);
        continue;
      } else {
        state2.position = captureEnd;
        state2.line = _line;
        state2.lineStart = _lineStart;
        state2.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state2, captureStart, captureEnd, false);
      writeFoldedLines(state2, state2.line - _line);
      captureStart = captureEnd = state2.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state2.position + 1;
    }
    ch = state2.input.charCodeAt(++state2.position);
  }
  captureSegment(state2, captureStart, captureEnd, false);
  if (state2.result) {
    return true;
  }
  state2.kind = _kind;
  state2.result = _result;
  return false;
}
__name(readPlainScalar, "readPlainScalar");
function readSingleQuotedScalar(state2, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state2.input.charCodeAt(state2.position);
  if (ch !== 39) {
    return false;
  }
  state2.kind = "scalar";
  state2.result = "";
  state2.position++;
  captureStart = captureEnd = state2.position;
  while ((ch = state2.input.charCodeAt(state2.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state2, captureStart, state2.position, true);
      ch = state2.input.charCodeAt(++state2.position);
      if (ch === 39) {
        captureStart = state2.position;
        state2.position++;
        captureEnd = state2.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state2, captureStart, captureEnd, true);
      writeFoldedLines(state2, skipSeparationSpace(state2, false, nodeIndent));
      captureStart = captureEnd = state2.position;
    } else if (state2.position === state2.lineStart && testDocumentSeparator(state2)) {
      throwError(state2, "unexpected end of the document within a single quoted scalar");
    } else {
      state2.position++;
      captureEnd = state2.position;
    }
  }
  throwError(state2, "unexpected end of the stream within a single quoted scalar");
}
__name(readSingleQuotedScalar, "readSingleQuotedScalar");
function readDoubleQuotedScalar(state2, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch !== 34) {
    return false;
  }
  state2.kind = "scalar";
  state2.result = "";
  state2.position++;
  captureStart = captureEnd = state2.position;
  while ((ch = state2.input.charCodeAt(state2.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state2, captureStart, state2.position, true);
      state2.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state2, captureStart, state2.position, true);
      ch = state2.input.charCodeAt(++state2.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state2, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state2.result += simpleEscapeMap[ch];
        state2.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state2.input.charCodeAt(++state2.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state2, "expected hexadecimal character");
          }
        }
        state2.result += charFromCodepoint(hexResult);
        state2.position++;
      } else {
        throwError(state2, "unknown escape sequence");
      }
      captureStart = captureEnd = state2.position;
    } else if (is_EOL(ch)) {
      captureSegment(state2, captureStart, captureEnd, true);
      writeFoldedLines(state2, skipSeparationSpace(state2, false, nodeIndent));
      captureStart = captureEnd = state2.position;
    } else if (state2.position === state2.lineStart && testDocumentSeparator(state2)) {
      throwError(state2, "unexpected end of the document within a double quoted scalar");
    } else {
      state2.position++;
      captureEnd = state2.position;
    }
  }
  throwError(state2, "unexpected end of the stream within a double quoted scalar");
}
__name(readDoubleQuotedScalar, "readDoubleQuotedScalar");
function readFlowCollection(state2, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state2.tag, _result, _anchor = state2.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state2.anchor !== null) {
    state2.anchorMap[state2.anchor] = _result;
  }
  ch = state2.input.charCodeAt(++state2.position);
  while (ch !== 0) {
    skipSeparationSpace(state2, true, nodeIndent);
    ch = state2.input.charCodeAt(state2.position);
    if (ch === terminator) {
      state2.position++;
      state2.tag = _tag;
      state2.anchor = _anchor;
      state2.kind = isMapping ? "mapping" : "sequence";
      state2.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state2, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state2, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state2.input.charCodeAt(state2.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state2.position++;
        skipSeparationSpace(state2, true, nodeIndent);
      }
    }
    _line = state2.line;
    _lineStart = state2.lineStart;
    _pos = state2.position;
    composeNode(state2, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state2.tag;
    keyNode = state2.result;
    skipSeparationSpace(state2, true, nodeIndent);
    ch = state2.input.charCodeAt(state2.position);
    if ((isExplicitPair || state2.line === _line) && ch === 58) {
      isPair = true;
      ch = state2.input.charCodeAt(++state2.position);
      skipSeparationSpace(state2, true, nodeIndent);
      composeNode(state2, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state2.result;
    }
    if (isMapping) {
      storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state2, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state2, true, nodeIndent);
    ch = state2.input.charCodeAt(state2.position);
    if (ch === 44) {
      readNext = true;
      ch = state2.input.charCodeAt(++state2.position);
    } else {
      readNext = false;
    }
  }
  throwError(state2, "unexpected end of the stream within a flow collection");
}
__name(readFlowCollection, "readFlowCollection");
function readBlockScalar(state2, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state2.kind = "scalar";
  state2.result = "";
  while (ch !== 0) {
    ch = state2.input.charCodeAt(++state2.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state2, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state2, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state2, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state2.input.charCodeAt(++state2.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state2.input.charCodeAt(++state2.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state2);
    state2.lineIndent = 0;
    ch = state2.input.charCodeAt(state2.position);
    while ((!detectedIndent || state2.lineIndent < textIndent) && ch === 32) {
      state2.lineIndent++;
      ch = state2.input.charCodeAt(++state2.position);
    }
    if (!detectedIndent && state2.lineIndent > textIndent) {
      textIndent = state2.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state2.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state2.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state2.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state2.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state2.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state2.result += " ";
        }
      } else {
        state2.result += common.repeat("\n", emptyLines);
      }
    } else {
      state2.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state2.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state2.input.charCodeAt(++state2.position);
    }
    captureSegment(state2, captureStart, state2.position, false);
  }
  return true;
}
__name(readBlockScalar, "readBlockScalar");
function readBlockSequence(state2, nodeIndent) {
  var _line, _tag = state2.tag, _anchor = state2.anchor, _result = [], following, detected = false, ch;
  if (state2.firstTabInLine !== -1) return false;
  if (state2.anchor !== null) {
    state2.anchorMap[state2.anchor] = _result;
  }
  ch = state2.input.charCodeAt(state2.position);
  while (ch !== 0) {
    if (state2.firstTabInLine !== -1) {
      state2.position = state2.firstTabInLine;
      throwError(state2, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state2.input.charCodeAt(state2.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state2.position++;
    if (skipSeparationSpace(state2, true, -1)) {
      if (state2.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state2.input.charCodeAt(state2.position);
        continue;
      }
    }
    _line = state2.line;
    composeNode(state2, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state2.result);
    skipSeparationSpace(state2, true, -1);
    ch = state2.input.charCodeAt(state2.position);
    if ((state2.line === _line || state2.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state2, "bad indentation of a sequence entry");
    } else if (state2.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state2.tag = _tag;
    state2.anchor = _anchor;
    state2.kind = "sequence";
    state2.result = _result;
    return true;
  }
  return false;
}
__name(readBlockSequence, "readBlockSequence");
function readBlockMapping(state2, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state2.tag, _anchor = state2.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state2.firstTabInLine !== -1) return false;
  if (state2.anchor !== null) {
    state2.anchorMap[state2.anchor] = _result;
  }
  ch = state2.input.charCodeAt(state2.position);
  while (ch !== 0) {
    if (!atExplicitKey && state2.firstTabInLine !== -1) {
      state2.position = state2.firstTabInLine;
      throwError(state2, "tab characters must not be used in indentation");
    }
    following = state2.input.charCodeAt(state2.position + 1);
    _line = state2.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state2, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state2.position += 1;
      ch = following;
    } else {
      _keyLine = state2.line;
      _keyLineStart = state2.lineStart;
      _keyPos = state2.position;
      if (!composeNode(state2, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state2.line === _line) {
        ch = state2.input.charCodeAt(state2.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state2.input.charCodeAt(++state2.position);
        }
        if (ch === 58) {
          ch = state2.input.charCodeAt(++state2.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state2, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state2.tag;
          keyNode = state2.result;
        } else if (detected) {
          throwError(state2, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state2.tag = _tag;
          state2.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state2, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state2.tag = _tag;
        state2.anchor = _anchor;
        return true;
      }
    }
    if (state2.line === _line || state2.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state2.line;
        _keyLineStart = state2.lineStart;
        _keyPos = state2.position;
      }
      if (composeNode(state2, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state2.result;
        } else {
          valueNode = state2.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state2, true, -1);
      ch = state2.input.charCodeAt(state2.position);
    }
    if ((state2.line === _line || state2.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state2, "bad indentation of a mapping entry");
    } else if (state2.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state2, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state2.tag = _tag;
    state2.anchor = _anchor;
    state2.kind = "mapping";
    state2.result = _result;
  }
  return detected;
}
__name(readBlockMapping, "readBlockMapping");
function readTagProperty(state2) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch !== 33) return false;
  if (state2.tag !== null) {
    throwError(state2, "duplication of a tag property");
  }
  ch = state2.input.charCodeAt(++state2.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state2.input.charCodeAt(++state2.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state2.input.charCodeAt(++state2.position);
  } else {
    tagHandle = "!";
  }
  _position = state2.position;
  if (isVerbatim) {
    do {
      ch = state2.input.charCodeAt(++state2.position);
    } while (ch !== 0 && ch !== 62);
    if (state2.position < state2.length) {
      tagName = state2.input.slice(_position, state2.position);
      ch = state2.input.charCodeAt(++state2.position);
    } else {
      throwError(state2, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state2.input.slice(_position - 1, state2.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state2, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state2.position + 1;
        } else {
          throwError(state2, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state2.input.charCodeAt(++state2.position);
    }
    tagName = state2.input.slice(_position, state2.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state2, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state2, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state2, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state2.tag = tagName;
  } else if (_hasOwnProperty$1.call(state2.tagMap, tagHandle)) {
    state2.tag = state2.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state2.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state2.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state2, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
__name(readTagProperty, "readTagProperty");
function readAnchorProperty(state2) {
  var _position, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch !== 38) return false;
  if (state2.anchor !== null) {
    throwError(state2, "duplication of an anchor property");
  }
  ch = state2.input.charCodeAt(++state2.position);
  _position = state2.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state2.input.charCodeAt(++state2.position);
  }
  if (state2.position === _position) {
    throwError(state2, "name of an anchor node must contain at least one character");
  }
  state2.anchor = state2.input.slice(_position, state2.position);
  return true;
}
__name(readAnchorProperty, "readAnchorProperty");
function readAlias(state2) {
  var _position, alias, ch;
  ch = state2.input.charCodeAt(state2.position);
  if (ch !== 42) return false;
  ch = state2.input.charCodeAt(++state2.position);
  _position = state2.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state2.input.charCodeAt(++state2.position);
  }
  if (state2.position === _position) {
    throwError(state2, "name of an alias node must contain at least one character");
  }
  alias = state2.input.slice(_position, state2.position);
  if (!_hasOwnProperty$1.call(state2.anchorMap, alias)) {
    throwError(state2, 'unidentified alias "' + alias + '"');
  }
  state2.result = state2.anchorMap[alias];
  skipSeparationSpace(state2, true, -1);
  return true;
}
__name(readAlias, "readAlias");
function composeNode(state2, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state2.listener !== null) {
    state2.listener("open", state2);
  }
  state2.tag = null;
  state2.anchor = null;
  state2.kind = null;
  state2.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state2, true, -1)) {
      atNewLine = true;
      if (state2.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state2.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state2.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state2) || readAnchorProperty(state2)) {
      if (skipSeparationSpace(state2, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state2.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state2.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state2.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state2.position - state2.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state2, blockIndent) || readBlockMapping(state2, blockIndent, flowIndent)) || readFlowCollection(state2, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state2, flowIndent) || readSingleQuotedScalar(state2, flowIndent) || readDoubleQuotedScalar(state2, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state2)) {
          hasContent = true;
          if (state2.tag !== null || state2.anchor !== null) {
            throwError(state2, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state2, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state2.tag === null) {
            state2.tag = "?";
          }
        }
        if (state2.anchor !== null) {
          state2.anchorMap[state2.anchor] = state2.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state2, blockIndent);
    }
  }
  if (state2.tag === null) {
    if (state2.anchor !== null) {
      state2.anchorMap[state2.anchor] = state2.result;
    }
  } else if (state2.tag === "?") {
    if (state2.result !== null && state2.kind !== "scalar") {
      throwError(state2, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state2.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state2.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state2.implicitTypes[typeIndex];
      if (type2.resolve(state2.result)) {
        state2.result = type2.construct(state2.result);
        state2.tag = type2.tag;
        if (state2.anchor !== null) {
          state2.anchorMap[state2.anchor] = state2.result;
        }
        break;
      }
    }
  } else if (state2.tag !== "!") {
    if (_hasOwnProperty$1.call(state2.typeMap[state2.kind || "fallback"], state2.tag)) {
      type2 = state2.typeMap[state2.kind || "fallback"][state2.tag];
    } else {
      type2 = null;
      typeList = state2.typeMap.multi[state2.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state2.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state2, "unknown tag !<" + state2.tag + ">");
    }
    if (state2.result !== null && type2.kind !== state2.kind) {
      throwError(state2, "unacceptable node kind for !<" + state2.tag + '> tag; it should be "' + type2.kind + '", not "' + state2.kind + '"');
    }
    if (!type2.resolve(state2.result, state2.tag)) {
      throwError(state2, "cannot resolve a node with !<" + state2.tag + "> explicit tag");
    } else {
      state2.result = type2.construct(state2.result, state2.tag);
      if (state2.anchor !== null) {
        state2.anchorMap[state2.anchor] = state2.result;
      }
    }
  }
  if (state2.listener !== null) {
    state2.listener("close", state2);
  }
  return state2.tag !== null || state2.anchor !== null || hasContent;
}
__name(composeNode, "composeNode");
function readDocument(state2) {
  var documentStart = state2.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state2.version = null;
  state2.checkLineBreaks = state2.legacy;
  state2.tagMap = /* @__PURE__ */ Object.create(null);
  state2.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state2.input.charCodeAt(state2.position)) !== 0) {
    skipSeparationSpace(state2, true, -1);
    ch = state2.input.charCodeAt(state2.position);
    if (state2.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state2.input.charCodeAt(++state2.position);
    _position = state2.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state2.input.charCodeAt(++state2.position);
    }
    directiveName = state2.input.slice(_position, state2.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state2, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state2.input.charCodeAt(++state2.position);
      }
      if (ch === 35) {
        do {
          ch = state2.input.charCodeAt(++state2.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state2.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state2.input.charCodeAt(++state2.position);
      }
      directiveArgs.push(state2.input.slice(_position, state2.position));
    }
    if (ch !== 0) readLineBreak(state2);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state2, directiveName, directiveArgs);
    } else {
      throwWarning(state2, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state2, true, -1);
  if (state2.lineIndent === 0 && state2.input.charCodeAt(state2.position) === 45 && state2.input.charCodeAt(state2.position + 1) === 45 && state2.input.charCodeAt(state2.position + 2) === 45) {
    state2.position += 3;
    skipSeparationSpace(state2, true, -1);
  } else if (hasDirectives) {
    throwError(state2, "directives end mark is expected");
  }
  composeNode(state2, state2.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state2, true, -1);
  if (state2.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state2.input.slice(documentStart, state2.position))) {
    throwWarning(state2, "non-ASCII line breaks are interpreted as content");
  }
  state2.documents.push(state2.result);
  if (state2.position === state2.lineStart && testDocumentSeparator(state2)) {
    if (state2.input.charCodeAt(state2.position) === 46) {
      state2.position += 3;
      skipSeparationSpace(state2, true, -1);
    }
    return;
  }
  if (state2.position < state2.length - 1) {
    throwError(state2, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
__name(readDocument, "readDocument");
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state2 = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state2.position = nullpos;
    throwError(state2, "null byte is not allowed in input");
  }
  state2.input += "\0";
  while (state2.input.charCodeAt(state2.position) === 32) {
    state2.lineIndent += 1;
    state2.position += 1;
  }
  while (state2.position < state2.length - 1) {
    readDocument(state2);
  }
  return state2.documents;
}
__name(loadDocuments, "loadDocuments");
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
__name(loadAll$1, "loadAll$1");
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
__name(load$1, "load$1");
var load_1 = load$1;
var loader$1 = {
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
__name(compileStyleMap, "compileStyleMap");
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
__name(encodeHex, "encodeHex");
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
__name(State, "State");
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line2, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line2 = string.slice(position);
      position = length;
    } else {
      line2 = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line2.length && line2 !== "\n") result += ind;
    result += line2;
  }
  return result;
}
__name(indentString, "indentString");
function generateNextLine(state2, level) {
  return "\n" + common.repeat(" ", state2.indent * level);
}
__name(generateNextLine, "generateNextLine");
function testImplicitResolving(state2, str2) {
  var index, length, type2;
  for (index = 0, length = state2.implicitTypes.length; index < length; index += 1) {
    type2 = state2.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
__name(testImplicitResolving, "testImplicitResolving");
function isWhitespace(c2) {
  return c2 === CHAR_SPACE || c2 === CHAR_TAB;
}
__name(isWhitespace, "isWhitespace");
function isPrintable(c2) {
  return 32 <= c2 && c2 <= 126 || 161 <= c2 && c2 <= 55295 && c2 !== 8232 && c2 !== 8233 || 57344 <= c2 && c2 <= 65533 && c2 !== CHAR_BOM || 65536 <= c2 && c2 <= 1114111;
}
__name(isPrintable, "isPrintable");
function isNsCharOrWhitespace(c2) {
  return isPrintable(c2) && c2 !== CHAR_BOM && c2 !== CHAR_CARRIAGE_RETURN && c2 !== CHAR_LINE_FEED;
}
__name(isNsCharOrWhitespace, "isNsCharOrWhitespace");
function isPlainSafe(c2, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c2);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c2);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c2 !== CHAR_COMMA && c2 !== CHAR_LEFT_SQUARE_BRACKET && c2 !== CHAR_RIGHT_SQUARE_BRACKET && c2 !== CHAR_LEFT_CURLY_BRACKET && c2 !== CHAR_RIGHT_CURLY_BRACKET) && c2 !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c2 === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
__name(isPlainSafe, "isPlainSafe");
function isPlainSafeFirst(c2) {
  return isPrintable(c2) && c2 !== CHAR_BOM && !isWhitespace(c2) && c2 !== CHAR_MINUS && c2 !== CHAR_QUESTION && c2 !== CHAR_COLON && c2 !== CHAR_COMMA && c2 !== CHAR_LEFT_SQUARE_BRACKET && c2 !== CHAR_RIGHT_SQUARE_BRACKET && c2 !== CHAR_LEFT_CURLY_BRACKET && c2 !== CHAR_RIGHT_CURLY_BRACKET && c2 !== CHAR_SHARP && c2 !== CHAR_AMPERSAND && c2 !== CHAR_ASTERISK && c2 !== CHAR_EXCLAMATION && c2 !== CHAR_VERTICAL_LINE && c2 !== CHAR_EQUALS && c2 !== CHAR_GREATER_THAN && c2 !== CHAR_SINGLE_QUOTE && c2 !== CHAR_DOUBLE_QUOTE && c2 !== CHAR_PERCENT && c2 !== CHAR_COMMERCIAL_AT && c2 !== CHAR_GRAVE_ACCENT;
}
__name(isPlainSafeFirst, "isPlainSafeFirst");
function isPlainSafeLast(c2) {
  return !isWhitespace(c2) && c2 !== CHAR_COLON;
}
__name(isPlainSafeLast, "isPlainSafeLast");
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
__name(codePointAt, "codePointAt");
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
__name(needIndentIndicator, "needIndentIndicator");
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i2;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
      char = codePointAt(string, i2);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
      char = codePointAt(string, i2);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i2;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
__name(chooseScalarStyle, "chooseScalarStyle");
function writeScalar(state2, string, level, iskey, inblock) {
  state2.dump = (function() {
    if (string.length === 0) {
      return state2.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state2.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state2.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state2.indent * Math.max(1, level);
    var lineWidth = state2.lineWidth === -1 ? -1 : Math.max(Math.min(state2.lineWidth, 40), state2.lineWidth - indent);
    var singleLineOnly = iskey || state2.flowLevel > -1 && level >= state2.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state2, string2);
    }
    __name(testAmbiguity, "testAmbiguity");
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state2.indent,
      lineWidth,
      testAmbiguity,
      state2.quotingType,
      state2.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state2.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state2.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  })();
}
__name(writeScalar, "writeScalar");
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
__name(blockHeader, "blockHeader");
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
__name(dropEndingNewline, "dropEndingNewline");
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = (function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  })();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line2 = match[2];
    moreIndented = line2[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line2 !== "" ? "\n" : "") + foldLine(line2, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
__name(foldString, "foldString");
function foldLine(line2, width) {
  if (line2 === "" || line2[0] === " ") return line2;
  var breakRe = / [^ ]/g;
  var match;
  var start2 = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line2)) {
    next = match.index;
    if (next - start2 > width) {
      end = curr > start2 ? curr : next;
      result += "\n" + line2.slice(start2, end);
      start2 = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line2.length - start2 > width && curr > start2) {
    result += line2.slice(start2, curr) + "\n" + line2.slice(curr + 1);
  } else {
    result += line2.slice(start2);
  }
  return result.slice(1);
}
__name(foldLine, "foldLine");
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
    char = codePointAt(string, i2);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i2];
      if (char >= 65536) result += string[i2 + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
__name(escapeString, "escapeString");
function writeFlowSequence(state2, level, object) {
  var _result = "", _tag = state2.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state2.replacer) {
      value = state2.replacer.call(object, String(index), value);
    }
    if (writeNode(state2, level, value, false, false) || typeof value === "undefined" && writeNode(state2, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state2.condenseFlow ? " " : "");
      _result += state2.dump;
    }
  }
  state2.tag = _tag;
  state2.dump = "[" + _result + "]";
}
__name(writeFlowSequence, "writeFlowSequence");
function writeBlockSequence(state2, level, object, compact) {
  var _result = "", _tag = state2.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state2.replacer) {
      value = state2.replacer.call(object, String(index), value);
    }
    if (writeNode(state2, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state2, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state2, level);
      }
      if (state2.dump && CHAR_LINE_FEED === state2.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state2.dump;
    }
  }
  state2.tag = _tag;
  state2.dump = _result || "[]";
}
__name(writeBlockSequence, "writeBlockSequence");
function writeFlowMapping(state2, level, object) {
  var _result = "", _tag = state2.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state2.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state2.replacer) {
      objectValue = state2.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state2, level, objectKey, false, false)) {
      continue;
    }
    if (state2.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state2.dump + (state2.condenseFlow ? '"' : "") + ":" + (state2.condenseFlow ? "" : " ");
    if (!writeNode(state2, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state2.dump;
    _result += pairBuffer;
  }
  state2.tag = _tag;
  state2.dump = "{" + _result + "}";
}
__name(writeFlowMapping, "writeFlowMapping");
function writeBlockMapping(state2, level, object, compact) {
  var _result = "", _tag = state2.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state2.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state2.sortKeys === "function") {
    objectKeyList.sort(state2.sortKeys);
  } else if (state2.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state2, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state2.replacer) {
      objectValue = state2.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state2, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state2.tag !== null && state2.tag !== "?" || state2.dump && state2.dump.length > 1024;
    if (explicitPair) {
      if (state2.dump && CHAR_LINE_FEED === state2.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state2.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state2, level);
    }
    if (!writeNode(state2, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state2.dump && CHAR_LINE_FEED === state2.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state2.dump;
    _result += pairBuffer;
  }
  state2.tag = _tag;
  state2.dump = _result || "{}";
}
__name(writeBlockMapping, "writeBlockMapping");
function detectType(state2, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state2.explicitTypes : state2.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state2.tag = type2.representName(object);
        } else {
          state2.tag = type2.tag;
        }
      } else {
        state2.tag = "?";
      }
      if (type2.represent) {
        style = state2.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state2.dump = _result;
      }
      return true;
    }
  }
  return false;
}
__name(detectType, "detectType");
function writeNode(state2, level, object, block, compact, iskey, isblockseq) {
  state2.tag = null;
  state2.dump = object;
  if (!detectType(state2, object, false)) {
    detectType(state2, object, true);
  }
  var type2 = _toString.call(state2.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state2.flowLevel < 0 || state2.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state2.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state2.tag !== null && state2.tag !== "?" || duplicate || state2.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state2.usedDuplicates[duplicateIndex]) {
    state2.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state2.usedDuplicates[duplicateIndex]) {
      state2.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state2.dump).length !== 0) {
        writeBlockMapping(state2, level, state2.dump, compact);
        if (duplicate) {
          state2.dump = "&ref_" + duplicateIndex + state2.dump;
        }
      } else {
        writeFlowMapping(state2, level, state2.dump);
        if (duplicate) {
          state2.dump = "&ref_" + duplicateIndex + " " + state2.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state2.dump.length !== 0) {
        if (state2.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state2, level - 1, state2.dump, compact);
        } else {
          writeBlockSequence(state2, level, state2.dump, compact);
        }
        if (duplicate) {
          state2.dump = "&ref_" + duplicateIndex + state2.dump;
        }
      } else {
        writeFlowSequence(state2, level, state2.dump);
        if (duplicate) {
          state2.dump = "&ref_" + duplicateIndex + " " + state2.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state2.tag !== "?") {
        writeScalar(state2, state2.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state2.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state2.tag !== null && state2.tag !== "?") {
      tagStr = encodeURI(
        state2.tag[0] === "!" ? state2.tag.slice(1) : state2.tag
      ).replace(/!/g, "%21");
      if (state2.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state2.dump = tagStr + " " + state2.dump;
    }
  }
  return true;
}
__name(writeNode, "writeNode");
function getDuplicateReferences(object, state2) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state2.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state2.usedDuplicates = new Array(length);
}
__name(getDuplicateReferences, "getDuplicateReferences");
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
__name(inspectNode, "inspectNode");
function dump$1(input, options) {
  options = options || {};
  var state2 = new State(options);
  if (!state2.noRefs) getDuplicateReferences(input, state2);
  var value = input;
  if (state2.replacer) {
    value = state2.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state2, 0, value, true, true)) return state2.dump + "\n";
  return "";
}
__name(dump$1, "dump$1");
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
__name(renamed, "renamed");
var JSON_SCHEMA = json;
var load = loader$1.load;
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
var markerOffsets = {
  aggregation: 17.25,
  extension: 17.25,
  composition: 17.25,
  dependency: 6,
  lollipop: 13.5,
  arrow_point: 4
  //arrow_cross: 24,
};
var markerOffsets2 = {
  arrow_point: 9,
  arrow_cross: 12.5,
  arrow_circle: 12.5
};
function calculateDeltaAndAngle$1(point1, point2) {
  if (point1 === void 0 || point2 === void 0) {
    return { angle: 0, deltaX: 0, deltaY: 0 };
  }
  point1 = pointTransformer(point1);
  point2 = pointTransformer(point2);
  const [x1, y1] = [point1.x, point1.y];
  const [x2, y2] = [point2.x, point2.y];
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return { angle: Math.atan(deltaY / deltaX), deltaX, deltaY };
}
__name(calculateDeltaAndAngle$1, "calculateDeltaAndAngle");
var pointTransformer = /* @__PURE__ */ __name((data) => {
  if (Array.isArray(data)) {
    return { x: data[0], y: data[1] };
  }
  return data;
}, "pointTransformer");
var getLineFunctionsWithOffset = /* @__PURE__ */ __name((edge) => {
  return {
    x: /* @__PURE__ */ __name(function(d2, i2, data) {
      let offset = 0;
      const DIRECTION = pointTransformer(data[0]).x < pointTransformer(data[data.length - 1]).x ? "left" : "right";
      if (i2 === 0 && Object.hasOwn(markerOffsets, edge.arrowTypeStart)) {
        const { angle, deltaX } = calculateDeltaAndAngle$1(data[0], data[1]);
        offset = markerOffsets[edge.arrowTypeStart] * Math.cos(angle) * (deltaX >= 0 ? 1 : -1);
      } else if (i2 === data.length - 1 && Object.hasOwn(markerOffsets, edge.arrowTypeEnd)) {
        const { angle, deltaX } = calculateDeltaAndAngle$1(
          data[data.length - 1],
          data[data.length - 2]
        );
        offset = markerOffsets[edge.arrowTypeEnd] * Math.cos(angle) * (deltaX >= 0 ? 1 : -1);
      }
      const differenceToEnd = Math.abs(
        pointTransformer(d2).x - pointTransformer(data[data.length - 1]).x
      );
      const differenceInYEnd = Math.abs(
        pointTransformer(d2).y - pointTransformer(data[data.length - 1]).y
      );
      const differenceToStart = Math.abs(pointTransformer(d2).x - pointTransformer(data[0]).x);
      const differenceInYStart = Math.abs(pointTransformer(d2).y - pointTransformer(data[0]).y);
      const startMarkerHeight = markerOffsets[edge.arrowTypeStart];
      const endMarkerHeight = markerOffsets[edge.arrowTypeEnd];
      const extraRoom = 1;
      if (differenceToEnd < endMarkerHeight && differenceToEnd > 0 && differenceInYEnd < endMarkerHeight) {
        let adjustment = endMarkerHeight + extraRoom - differenceToEnd;
        adjustment *= DIRECTION === "right" ? -1 : 1;
        offset -= adjustment;
      }
      if (differenceToStart < startMarkerHeight && differenceToStart > 0 && differenceInYStart < startMarkerHeight) {
        let adjustment = startMarkerHeight + extraRoom - differenceToStart;
        adjustment *= DIRECTION === "right" ? -1 : 1;
        offset += adjustment;
      }
      return pointTransformer(d2).x + offset;
    }, "x"),
    y: /* @__PURE__ */ __name(function(d2, i2, data) {
      let offset = 0;
      const DIRECTION = pointTransformer(data[0]).y < pointTransformer(data[data.length - 1]).y ? "down" : "up";
      if (i2 === 0 && Object.hasOwn(markerOffsets, edge.arrowTypeStart)) {
        const { angle, deltaY } = calculateDeltaAndAngle$1(data[0], data[1]);
        offset = markerOffsets[edge.arrowTypeStart] * Math.abs(Math.sin(angle)) * (deltaY >= 0 ? 1 : -1);
      } else if (i2 === data.length - 1 && Object.hasOwn(markerOffsets, edge.arrowTypeEnd)) {
        const { angle, deltaY } = calculateDeltaAndAngle$1(
          data[data.length - 1],
          data[data.length - 2]
        );
        offset = markerOffsets[edge.arrowTypeEnd] * Math.abs(Math.sin(angle)) * (deltaY >= 0 ? 1 : -1);
      }
      const differenceToEnd = Math.abs(
        pointTransformer(d2).y - pointTransformer(data[data.length - 1]).y
      );
      const differenceInXEnd = Math.abs(
        pointTransformer(d2).x - pointTransformer(data[data.length - 1]).x
      );
      const differenceToStart = Math.abs(pointTransformer(d2).y - pointTransformer(data[0]).y);
      const differenceInXStart = Math.abs(pointTransformer(d2).x - pointTransformer(data[0]).x);
      const startMarkerHeight = markerOffsets[edge.arrowTypeStart];
      const endMarkerHeight = markerOffsets[edge.arrowTypeEnd];
      const extraRoom = 1;
      if (differenceToEnd < endMarkerHeight && differenceToEnd > 0 && differenceInXEnd < endMarkerHeight) {
        let adjustment = endMarkerHeight + extraRoom - differenceToEnd;
        adjustment *= DIRECTION === "up" ? -1 : 1;
        offset -= adjustment;
      }
      if (differenceToStart < startMarkerHeight && differenceToStart > 0 && differenceInXStart < startMarkerHeight) {
        let adjustment = startMarkerHeight + extraRoom - differenceToStart;
        adjustment *= DIRECTION === "up" ? -1 : 1;
        offset += adjustment;
      }
      return pointTransformer(d2).y + offset;
    }, "y")
  };
}, "getLineFunctionsWithOffset");
var getSubGraphTitleMargins = /* @__PURE__ */ __name(({
  flowchart
}) => {
  var _a2, _b2;
  const subGraphTitleTopMargin = ((_a2 = flowchart == null ? void 0 : flowchart.subGraphTitleMargin) == null ? void 0 : _a2.top) ?? 0;
  const subGraphTitleBottomMargin = ((_b2 = flowchart == null ? void 0 : flowchart.subGraphTitleMargin) == null ? void 0 : _b2.bottom) ?? 0;
  const subGraphTitleTotalMargin = subGraphTitleTopMargin + subGraphTitleBottomMargin;
  return {
    subGraphTitleTopMargin,
    subGraphTitleBottomMargin,
    subGraphTitleTotalMargin
  };
}, "getSubGraphTitleMargins");
var solidStateFill = /* @__PURE__ */ __name((color2) => {
  const { handDrawnSeed } = getConfig2();
  return {
    fill: color2,
    hachureAngle: 120,
    // angle of hachure,
    hachureGap: 4,
    fillWeight: 2,
    roughness: 0.7,
    stroke: color2,
    seed: handDrawnSeed
  };
}, "solidStateFill");
var compileStyles = /* @__PURE__ */ __name((node) => {
  const stylesMap = styles2Map([
    ...node.cssCompiledStyles || [],
    ...node.cssStyles || [],
    ...node.labelStyle || []
  ]);
  return { stylesMap, stylesArray: [...stylesMap] };
}, "compileStyles");
var styles2Map = /* @__PURE__ */ __name((styles) => {
  const styleMap = /* @__PURE__ */ new Map();
  styles.forEach((style) => {
    const [key, value] = style.split(":");
    styleMap.set(key.trim(), value == null ? void 0 : value.trim());
  });
  return styleMap;
}, "styles2Map");
var isLabelStyle = /* @__PURE__ */ __name((key) => {
  return key === "color" || key === "font-size" || key === "font-family" || key === "font-weight" || key === "font-style" || key === "text-decoration" || key === "text-align" || key === "text-transform" || key === "line-height" || key === "letter-spacing" || key === "word-spacing" || key === "text-shadow" || key === "text-overflow" || key === "white-space" || key === "word-wrap" || key === "word-break" || key === "overflow-wrap" || key === "hyphens";
}, "isLabelStyle");
var styles2String = /* @__PURE__ */ __name((node) => {
  const { stylesArray } = compileStyles(node);
  const labelStyles = [];
  const nodeStyles = [];
  const borderStyles = [];
  const backgroundStyles = [];
  stylesArray.forEach((style) => {
    const key = style[0];
    if (isLabelStyle(key)) {
      labelStyles.push(style.join(":") + " !important");
    } else {
      nodeStyles.push(style.join(":") + " !important");
      if (key.includes("stroke")) {
        borderStyles.push(style.join(":") + " !important");
      }
      if (key === "fill") {
        backgroundStyles.push(style.join(":") + " !important");
      }
    }
  });
  return {
    labelStyles: labelStyles.join(";"),
    nodeStyles: nodeStyles.join(";"),
    stylesArray,
    borderStyles,
    backgroundStyles
  };
}, "styles2String");
var userNodeOverrides = /* @__PURE__ */ __name((node, options) => {
  var _a2;
  const { themeVariables, handDrawnSeed } = getConfig2();
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const result = Object.assign(
    {
      roughness: 0.7,
      fill: stylesMap.get("fill") || mainBkg,
      fillStyle: "hachure",
      // solid fill
      fillWeight: 4,
      hachureGap: 5.2,
      stroke: stylesMap.get("stroke") || nodeBorder,
      seed: handDrawnSeed,
      strokeWidth: ((_a2 = stylesMap.get("stroke-width")) == null ? void 0 : _a2.replace("px", "")) || 1.3,
      fillLineDash: [0, 0],
      strokeLineDash: getStrokeDashArray(stylesMap.get("stroke-dasharray"))
    },
    options
  );
  return result;
}, "userNodeOverrides");
var getStrokeDashArray = /* @__PURE__ */ __name((strokeDasharrayStyle) => {
  if (!strokeDasharrayStyle) {
    return [0, 0];
  }
  const dashArray = strokeDasharrayStyle.trim().split(/\s+/).map(Number);
  if (dashArray.length === 1) {
    const val = isNaN(dashArray[0]) ? 0 : dashArray[0];
    return [val, val];
  }
  const first = isNaN(dashArray[0]) ? 0 : dashArray[0];
  const second = isNaN(dashArray[1]) ? 0 : dashArray[1];
  return [first, second];
}, "getStrokeDashArray");
var dist = {};
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  Object.defineProperty(constants, "__esModule", { value: true });
  constants.BLANK_URL = constants.relativeFirstCharacters = constants.whitespaceEscapeCharsRegex = constants.urlSchemeRegex = constants.ctrlCharactersRegex = constants.htmlCtrlEntityRegex = constants.htmlEntitiesRegex = constants.invalidProtocolRegex = void 0;
  constants.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
  constants.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
  constants.htmlCtrlEntityRegex = /&(newline|tab);/gi;
  constants.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
  constants.urlSchemeRegex = /^.+(:|&colon;)/gim;
  constants.whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
  constants.relativeFirstCharacters = [".", "/"];
  constants.BLANK_URL = "about:blank";
  return constants;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  Object.defineProperty(dist, "__esModule", { value: true });
  dist.sanitizeUrl = void 0;
  var constants_1 = requireConstants();
  function isRelativeUrlWithoutProtocol(url) {
    return constants_1.relativeFirstCharacters.indexOf(url[0]) > -1;
  }
  function decodeHtmlCharacters(str2) {
    var removedNullByte = str2.replace(constants_1.ctrlCharactersRegex, "");
    return removedNullByte.replace(constants_1.htmlEntitiesRegex, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
  function isValidUrl(url) {
    return URL.canParse(url);
  }
  function decodeURI(uri) {
    try {
      return decodeURIComponent(uri);
    } catch (e2) {
      return uri;
    }
  }
  function sanitizeUrl(url) {
    if (!url) {
      return constants_1.BLANK_URL;
    }
    var charsToDecode;
    var decodedUrl = decodeURI(url.trim());
    do {
      decodedUrl = decodeHtmlCharacters(decodedUrl).replace(constants_1.htmlCtrlEntityRegex, "").replace(constants_1.ctrlCharactersRegex, "").replace(constants_1.whitespaceEscapeCharsRegex, "").trim();
      decodedUrl = decodeURI(decodedUrl);
      charsToDecode = decodedUrl.match(constants_1.ctrlCharactersRegex) || decodedUrl.match(constants_1.htmlEntitiesRegex) || decodedUrl.match(constants_1.htmlCtrlEntityRegex) || decodedUrl.match(constants_1.whitespaceEscapeCharsRegex);
    } while (charsToDecode && charsToDecode.length > 0);
    var sanitizedUrl = decodedUrl;
    if (!sanitizedUrl) {
      return constants_1.BLANK_URL;
    }
    if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
      return sanitizedUrl;
    }
    var trimmedUrl = sanitizedUrl.trimStart();
    var urlSchemeParseResults = trimmedUrl.match(constants_1.urlSchemeRegex);
    if (!urlSchemeParseResults) {
      return sanitizedUrl;
    }
    var urlScheme = urlSchemeParseResults[0].toLowerCase().trim();
    if (constants_1.invalidProtocolRegex.test(urlScheme)) {
      return constants_1.BLANK_URL;
    }
    var backSanitized = trimmedUrl.replace(/\\/g, "/");
    if (urlScheme === "mailto:" || urlScheme.includes("://")) {
      return backSanitized;
    }
    if (urlScheme === "http:" || urlScheme === "https:") {
      if (!isValidUrl(backSanitized)) {
        return constants_1.BLANK_URL;
      }
      var url_1 = new URL(backSanitized);
      url_1.protocol = url_1.protocol.toLowerCase();
      url_1.hostname = url_1.hostname.toLowerCase();
      return url_1.toString();
    }
    return backSanitized;
  }
  dist.sanitizeUrl = sanitizeUrl;
  return dist;
}
var distExports = requireDist();
var ZERO_WIDTH_SPACE = "​";
var d3CurveTypes = {
  curveBasis,
  curveBasisClosed,
  curveBasisOpen,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveBundle,
  curveCardinalClosed,
  curveCardinalOpen,
  curveCardinal,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveCatmullRom,
  curveLinear,
  curveLinearClosed,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural,
  curveStep,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var directiveWithoutOpen = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var detectInit = /* @__PURE__ */ __name(function(text2, config2) {
  const inits = detectDirective(text2, /(?:init\b)|(?:initialize\b)/);
  let results = {};
  if (Array.isArray(inits)) {
    const args = inits.map((init2) => init2.args);
    sanitizeDirective(args);
    results = assignWithDepth_default(results, [...args]);
  } else {
    results = inits.args;
  }
  if (!results) {
    return;
  }
  let type2 = detectType$1(text2, config2);
  const prop = "config";
  if (results[prop] !== void 0) {
    if (type2 === "flowchart-v2") {
      type2 = "flowchart";
    }
    results[type2] = results[prop];
    delete results[prop];
  }
  return results;
}, "detectInit");
var detectDirective = /* @__PURE__ */ __name(function(text2, type2 = null) {
  var _a2, _b2;
  try {
    const commentWithoutDirectives = new RegExp(
      `[%]{2}(?![{]${directiveWithoutOpen.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    text2 = text2.trim().replace(commentWithoutDirectives, "").replace(/'/gm, '"');
    log.debug(
      `Detecting diagram directive${type2 !== null ? " type:" + type2 : ""} based on the text:${text2}`
    );
    let match;
    const result = [];
    while ((match = directiveRegex.exec(text2)) !== null) {
      if (match.index === directiveRegex.lastIndex) {
        directiveRegex.lastIndex++;
      }
      if (match && !type2 || type2 && ((_a2 = match[1]) == null ? void 0 : _a2.match(type2)) || type2 && ((_b2 = match[2]) == null ? void 0 : _b2.match(type2))) {
        const type22 = match[1] ? match[1] : match[2];
        const args = match[3] ? match[3].trim() : match[4] ? JSON.parse(match[4].trim()) : null;
        result.push({ type: type22, args });
      }
    }
    if (result.length === 0) {
      return { type: text2, args: null };
    }
    return result.length === 1 ? result[0] : result;
  } catch (error) {
    log.error(
      `ERROR: ${error.message} - Unable to parse directive type: '${type2}' based on the text: '${text2}'`
    );
    return { type: void 0, args: null };
  }
}, "detectDirective");
var removeDirectives = /* @__PURE__ */ __name(function(text2) {
  return text2.replace(directiveRegex, "");
}, "removeDirectives");
var isSubstringInArray = /* @__PURE__ */ __name(function(str2, arr) {
  for (const [i2, element] of arr.entries()) {
    if (element.match(str2)) {
      return i2;
    }
  }
  return -1;
}, "isSubstringInArray");
function interpolateToCurve(interpolate2, defaultCurve) {
  if (!interpolate2) {
    return defaultCurve;
  }
  const curveName = `curve${interpolate2.charAt(0).toUpperCase() + interpolate2.slice(1)}`;
  return d3CurveTypes[curveName] ?? defaultCurve;
}
__name(interpolateToCurve, "interpolateToCurve");
function formatUrl(linkStr, config2) {
  const url = linkStr.trim();
  if (!url) {
    return void 0;
  }
  if (config2.securityLevel !== "loose") {
    return distExports.sanitizeUrl(url);
  }
  return url;
}
__name(formatUrl, "formatUrl");
var runFunc = /* @__PURE__ */ __name((functionName, ...params) => {
  const arrPaths = functionName.split(".");
  const len = arrPaths.length - 1;
  const fnName = arrPaths[len];
  let obj = window;
  for (let i2 = 0; i2 < len; i2++) {
    obj = obj[arrPaths[i2]];
    if (!obj) {
      log.error(`Function name: ${functionName} not found in window`);
      return;
    }
  }
  obj[fnName](...params);
}, "runFunc");
function distance(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
__name(distance, "distance");
function traverseEdge(points) {
  let prevPoint;
  let totalDistance = 0;
  points.forEach((point2) => {
    totalDistance += distance(point2, prevPoint);
    prevPoint = point2;
  });
  const remainingDistance = totalDistance / 2;
  return calculatePoint(points, remainingDistance);
}
__name(traverseEdge, "traverseEdge");
function calcLabelPosition(points) {
  if (points.length === 1) {
    return points[0];
  }
  return traverseEdge(points);
}
__name(calcLabelPosition, "calcLabelPosition");
var roundNumber = /* @__PURE__ */ __name((num, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}, "roundNumber");
var calculatePoint = /* @__PURE__ */ __name((points, distanceToTraverse) => {
  let prevPoint = void 0;
  let remainingDistance = distanceToTraverse;
  for (const point2 of points) {
    if (prevPoint) {
      const vectorDistance = distance(point2, prevPoint);
      if (vectorDistance === 0) {
        return prevPoint;
      }
      if (vectorDistance < remainingDistance) {
        remainingDistance -= vectorDistance;
      } else {
        const distanceRatio = remainingDistance / vectorDistance;
        if (distanceRatio <= 0) {
          return prevPoint;
        }
        if (distanceRatio >= 1) {
          return { x: point2.x, y: point2.y };
        }
        if (distanceRatio > 0 && distanceRatio < 1) {
          return {
            x: roundNumber((1 - distanceRatio) * prevPoint.x + distanceRatio * point2.x, 5),
            y: roundNumber((1 - distanceRatio) * prevPoint.y + distanceRatio * point2.y, 5)
          };
        }
      }
    }
    prevPoint = point2;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint");
var calcCardinalityPosition = /* @__PURE__ */ __name((isRelationTypePresent, points, initialPosition) => {
  log.info(`our points ${JSON.stringify(points)}`);
  if (points[0] !== initialPosition) {
    points = points.reverse();
  }
  const distanceToCardinalityPoint = 25;
  const center = calculatePoint(points, distanceToCardinalityPoint);
  const d2 = isRelationTypePresent ? 10 : 5;
  const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
  const cardinalityPosition = { x: 0, y: 0 };
  cardinalityPosition.x = Math.sin(angle) * d2 + (points[0].x + center.x) / 2;
  cardinalityPosition.y = -Math.cos(angle) * d2 + (points[0].y + center.y) / 2;
  return cardinalityPosition;
}, "calcCardinalityPosition");
function calcTerminalLabelPosition(terminalMarkerSize, position, _points) {
  const points = structuredClone(_points);
  log.info("our points", points);
  if (position !== "start_left" && position !== "start_right") {
    points.reverse();
  }
  const distanceToCardinalityPoint = 25 + terminalMarkerSize;
  const center = calculatePoint(points, distanceToCardinalityPoint);
  const d2 = 10 + terminalMarkerSize * 0.5;
  const angle = Math.atan2(points[0].y - center.y, points[0].x - center.x);
  const cardinalityPosition = { x: 0, y: 0 };
  if (position === "start_left") {
    cardinalityPosition.x = Math.sin(angle + Math.PI) * d2 + (points[0].x + center.x) / 2;
    cardinalityPosition.y = -Math.cos(angle + Math.PI) * d2 + (points[0].y + center.y) / 2;
  } else if (position === "end_right") {
    cardinalityPosition.x = Math.sin(angle - Math.PI) * d2 + (points[0].x + center.x) / 2 - 5;
    cardinalityPosition.y = -Math.cos(angle - Math.PI) * d2 + (points[0].y + center.y) / 2 - 5;
  } else if (position === "end_left") {
    cardinalityPosition.x = Math.sin(angle) * d2 + (points[0].x + center.x) / 2 - 5;
    cardinalityPosition.y = -Math.cos(angle) * d2 + (points[0].y + center.y) / 2 - 5;
  } else {
    cardinalityPosition.x = Math.sin(angle) * d2 + (points[0].x + center.x) / 2;
    cardinalityPosition.y = -Math.cos(angle) * d2 + (points[0].y + center.y) / 2;
  }
  return cardinalityPosition;
}
__name(calcTerminalLabelPosition, "calcTerminalLabelPosition");
function getStylesFromArray(arr) {
  let style = "";
  let labelStyle = "";
  for (const element of arr) {
    if (element !== void 0) {
      if (element.startsWith("color:") || element.startsWith("text-align:")) {
        labelStyle = labelStyle + element + ";";
      } else {
        style = style + element + ";";
      }
    }
  }
  return { style, labelStyle };
}
__name(getStylesFromArray, "getStylesFromArray");
var cnt = 0;
var generateId = /* @__PURE__ */ __name(() => {
  cnt++;
  return "id-" + Math.random().toString(36).substr(2, 12) + "-" + cnt;
}, "generateId");
function makeRandomHex(length) {
  let result = "";
  const characters = "0123456789abcdef";
  const charactersLength = characters.length;
  for (let i2 = 0; i2 < length; i2++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
__name(makeRandomHex, "makeRandomHex");
var random = /* @__PURE__ */ __name((options) => {
  return makeRandomHex(options.length);
}, "random");
var getTextObj = /* @__PURE__ */ __name(function() {
  return {
    x: 0,
    y: 0,
    fill: void 0,
    anchor: "start",
    style: "#666",
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0,
    valign: void 0,
    text: ""
  };
}, "getTextObj");
var drawSimpleText = /* @__PURE__ */ __name(function(elem, textData) {
  const nText = textData.text.replace(common_default.lineBreakRegex, " ");
  const [, _fontSizePx] = parseFontSize(textData.fontSize);
  const textElem = elem.append("text");
  textElem.attr("x", textData.x);
  textElem.attr("y", textData.y);
  textElem.style("text-anchor", textData.anchor);
  textElem.style("font-family", textData.fontFamily);
  textElem.style("font-size", _fontSizePx);
  textElem.style("font-weight", textData.fontWeight);
  textElem.attr("fill", textData.fill);
  if (textData.class !== void 0) {
    textElem.attr("class", textData.class);
  }
  const span = textElem.append("tspan");
  span.attr("x", textData.x + textData.textMargin * 2);
  span.attr("fill", textData.fill);
  span.text(nText);
  return textElem;
}, "drawSimpleText");
var wrapLabel = memoize(
  (label, maxWidth, config2) => {
    if (!label) {
      return label;
    }
    config2 = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      config2
    );
    if (common_default.lineBreakRegex.test(label)) {
      return label;
    }
    const words = label.split(" ").filter(Boolean);
    const completedLines = [];
    let nextLine = "";
    words.forEach((word, index) => {
      const wordLength = calculateTextWidth(`${word} `, config2);
      const nextLineLength = calculateTextWidth(nextLine, config2);
      if (wordLength > maxWidth) {
        const { hyphenatedStrings, remainingWord } = breakString(word, maxWidth, "-", config2);
        completedLines.push(nextLine, ...hyphenatedStrings);
        nextLine = remainingWord;
      } else if (nextLineLength + wordLength >= maxWidth) {
        completedLines.push(nextLine);
        nextLine = word;
      } else {
        nextLine = [nextLine, word].filter(Boolean).join(" ");
      }
      const currentWord = index + 1;
      const isLastWord = currentWord === words.length;
      if (isLastWord) {
        completedLines.push(nextLine);
      }
    });
    return completedLines.filter((line2) => line2 !== "").join(config2.joinWith);
  },
  (label, maxWidth, config2) => `${label}${maxWidth}${config2.fontSize}${config2.fontWeight}${config2.fontFamily}${config2.joinWith}`
);
var breakString = memoize(
  (word, maxWidth, hyphenCharacter = "-", config2) => {
    config2 = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      config2
    );
    const characters = [...word];
    const lines = [];
    let currentLine = "";
    characters.forEach((character, index) => {
      const nextLine = `${currentLine}${character}`;
      const lineWidth = calculateTextWidth(nextLine, config2);
      if (lineWidth >= maxWidth) {
        const currentCharacter = index + 1;
        const isLastLine = characters.length === currentCharacter;
        const hyphenatedNextLine = `${nextLine}${hyphenCharacter}`;
        lines.push(isLastLine ? nextLine : hyphenatedNextLine);
        currentLine = "";
      } else {
        currentLine = nextLine;
      }
    });
    return { hyphenatedStrings: lines, remainingWord: currentLine };
  },
  (word, maxWidth, hyphenCharacter = "-", config2) => `${word}${maxWidth}${hyphenCharacter}${config2.fontSize}${config2.fontWeight}${config2.fontFamily}`
);
function calculateTextHeight(text2, config2) {
  return calculateTextDimensions(text2, config2).height;
}
__name(calculateTextHeight, "calculateTextHeight");
function calculateTextWidth(text2, config2) {
  return calculateTextDimensions(text2, config2).width;
}
__name(calculateTextWidth, "calculateTextWidth");
var calculateTextDimensions = memoize(
  (text2, config2) => {
    const { fontSize = 12, fontFamily = "Arial", fontWeight = 400 } = config2;
    if (!text2) {
      return { width: 0, height: 0 };
    }
    const [, _fontSizePx] = parseFontSize(fontSize);
    const fontFamilies = ["sans-serif", fontFamily];
    const lines = text2.split(common_default.lineBreakRegex);
    const dims = [];
    const body = select("body");
    if (!body.remove) {
      return { width: 0, height: 0, lineHeight: 0 };
    }
    const g2 = body.append("svg");
    for (const fontFamily2 of fontFamilies) {
      let cHeight = 0;
      const dim = { width: 0, height: 0, lineHeight: 0 };
      for (const line2 of lines) {
        const textObj = getTextObj();
        textObj.text = line2 || ZERO_WIDTH_SPACE;
        const textElem = drawSimpleText(g2, textObj).style("font-size", _fontSizePx).style("font-weight", fontWeight).style("font-family", fontFamily2);
        const bBox = (textElem._groups || textElem)[0][0].getBBox();
        if (bBox.width === 0 && bBox.height === 0) {
          throw new Error("svg element not in render tree");
        }
        dim.width = Math.round(Math.max(dim.width, bBox.width));
        cHeight = Math.round(bBox.height);
        dim.height += cHeight;
        dim.lineHeight = Math.round(Math.max(dim.lineHeight, cHeight));
      }
      dims.push(dim);
    }
    g2.remove();
    const index = isNaN(dims[1].height) || isNaN(dims[1].width) || isNaN(dims[1].lineHeight) || dims[0].height > dims[1].height && dims[0].width > dims[1].width && dims[0].lineHeight > dims[1].lineHeight ? 0 : 1;
    return dims[index];
  },
  (text2, config2) => `${text2}${config2.fontSize}${config2.fontWeight}${config2.fontFamily}`
);
var InitIDGenerator = (_h = class {
  constructor(deterministic = false, seed) {
    this.count = 0;
    this.count = seed ? seed.length : 0;
    this.next = deterministic ? () => this.count++ : () => Date.now();
  }
}, __name(_h, "InitIDGenerator"), _h);
var decoder;
var entityDecode = /* @__PURE__ */ __name(function(html2) {
  decoder = decoder || document.createElement("div");
  html2 = escape(html2).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";");
  decoder.innerHTML = html2;
  return unescape(decoder.textContent);
}, "entityDecode");
function isDetailedError(error) {
  return "str" in error;
}
__name(isDetailedError, "isDetailedError");
var insertTitle = /* @__PURE__ */ __name((parent, cssClass, titleTopMargin, title) => {
  var _a2;
  if (!title) {
    return;
  }
  const bounds = (_a2 = parent.node()) == null ? void 0 : _a2.getBBox();
  if (!bounds) {
    return;
  }
  parent.append("text").text(title).attr("text-anchor", "middle").attr("x", bounds.x + bounds.width / 2).attr("y", -titleTopMargin).attr("class", cssClass);
}, "insertTitle");
var parseFontSize = /* @__PURE__ */ __name((fontSize) => {
  if (typeof fontSize === "number") {
    return [fontSize, fontSize + "px"];
  }
  const fontSizeNumber = parseInt(fontSize ?? "", 10);
  if (Number.isNaN(fontSizeNumber)) {
    return [void 0, void 0];
  } else if (fontSize === String(fontSizeNumber)) {
    return [fontSizeNumber, fontSize + "px"];
  } else {
    return [fontSizeNumber, fontSize];
  }
}, "parseFontSize");
function cleanAndMerge(defaultData, data) {
  return merge$1({}, defaultData, data);
}
__name(cleanAndMerge, "cleanAndMerge");
var utils_default = {
  assignWithDepth: assignWithDepth_default,
  wrapLabel,
  calculateTextHeight,
  calculateTextWidth,
  calculateTextDimensions,
  cleanAndMerge,
  detectInit,
  detectDirective,
  isSubstringInArray,
  interpolateToCurve,
  calcLabelPosition,
  calcCardinalityPosition,
  calcTerminalLabelPosition,
  formatUrl,
  getStylesFromArray,
  generateId,
  random,
  runFunc,
  entityDecode,
  insertTitle,
  isLabelCoordinateInPath,
  parseFontSize,
  InitIDGenerator
};
var encodeEntities = /* @__PURE__ */ __name(function(text2) {
  let txt = text2;
  txt = txt.replace(/style.*:\S*#.*;/g, function(s2) {
    return s2.substring(0, s2.length - 1);
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, function(s2) {
    return s2.substring(0, s2.length - 1);
  });
  txt = txt.replace(/#\w+;/g, function(s2) {
    const innerTxt = s2.substring(1, s2.length - 1);
    const isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return "ﬂ°°" + innerTxt + "¶ß";
    } else {
      return "ﬂ°" + innerTxt + "¶ß";
    }
  });
  return txt;
}, "encodeEntities");
var decodeEntities = /* @__PURE__ */ __name(function(text2) {
  return text2.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities");
var getEdgeId = /* @__PURE__ */ __name((from, to, {
  counter: counter2 = 0,
  prefix,
  suffix
}, id28) => {
  if (id28) {
    return id28;
  }
  return `${prefix ? `${prefix}_` : ""}${from}_${to}_${counter2}${suffix ? `_${suffix}` : ""}`;
}, "getEdgeId");
function handleUndefinedAttr(attrValue) {
  return attrValue ?? null;
}
__name(handleUndefinedAttr, "handleUndefinedAttr");
function isLabelCoordinateInPath(point2, dAttr) {
  const roundedX = Math.round(point2.x);
  const roundedY = Math.round(point2.y);
  const sanitizedD = dAttr.replace(
    /(\d+\.\d+)/g,
    (match) => Math.round(parseFloat(match)).toString()
  );
  return sanitizedD.includes(roundedX.toString()) || sanitizedD.includes(roundedY.toString());
}
__name(isLabelCoordinateInPath, "isLabelCoordinateInPath");
const defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  ...defaultIconSizeCustomisations,
  ...defaultIconTransformations
});
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) return null;
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) return null;
  if (colonSeparated.length > 1) {
    const name$1 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name$1
    };
    return !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon2, allowSimpleName) => {
  if (!icon2) return false;
  return !!((allowSimpleName && icon2.prefix === "" || !!icon2.prefix) && !!icon2.name);
};
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
  if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) result.rotate = rotate;
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations) {
    if (key in parent && !(key in result)) result[key] = defaultIconTransformations[key];
  } else if (key in child) result[key] = child[key];
  else if (key in parent) result[key] = parent[key];
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) return resolved[name] = [];
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) resolved[name] = [parent].concat(value);
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse3(name$1) {
    currentProps = mergeIconData(icons[name$1] || aliases[name$1], currentProps);
  }
  parse3(name);
  tree.forEach(parse3);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) return internalGetIconData(data, name, []);
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) return size;
  precision = precision || 100;
  if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
  if (typeof size !== "string") return size;
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) return size;
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) newParts.push(code);
      else newParts.push(Math.ceil(num * ratio * precision) / precision);
    } else newParts.push(code);
    code = oldParts.shift();
    if (code === void 0) return newParts.join("");
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start2 = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start2 === -1 || end === -1) break;
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) break;
    defs += content.slice(start2 + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start2, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start2 + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon2, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon2
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) if (vFlip) rotation += 2;
    else {
      transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
      transformations.push("scale(-1 1)");
      box.top = box.left = 0;
    }
    else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) body = wrapSVGContent(body, '<g transform="' + transformations.join(" ") + '">', "</g>");
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) attributes[prop] = value.toString();
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [
    box.left,
    box.top,
    boxWidth,
    boxHeight
  ];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) ids.push(match[1]);
  if (!ids.length) return body;
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id28) => {
    const newID = typeof prefix === "function" ? prefix(id28) : prefix + (counter++).toString();
    const escapedID = id28.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + suffix + "$3");
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function dedent(templ) {
  var values = [];
  for (var _i2 = 1; _i2 < arguments.length; _i2++) {
    values[_i2 - 1] = arguments[_i2];
  }
  var strings = Array.from(typeof templ === "string" ? [templ] : templ);
  strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var indentLengths = strings.reduce(function(arr, str2) {
    var matches = str2.match(/\n([\t ]+|(?!\s).)/g);
    if (matches) {
      return arr.concat(matches.map(function(match) {
        var _a2, _b2;
        return (_b2 = (_a2 = match.match(/[\t ]/g)) === null || _a2 === void 0 ? void 0 : _a2.length) !== null && _b2 !== void 0 ? _b2 : 0;
      }));
    }
    return arr;
  }, []);
  if (indentLengths.length) {
    var pattern_1 = new RegExp("\n[	 ]{" + Math.min.apply(Math, indentLengths) + "}", "g");
    strings = strings.map(function(str2) {
      return str2.replace(pattern_1, "\n");
    });
  }
  strings[0] = strings[0].replace(/^\r?\n/, "");
  var string = strings[0];
  values.forEach(function(value, i2) {
    var endentations = string.match(/(?:^|\n)( *)$/);
    var endentation = endentations ? endentations[1] : "";
    var indentedValue = value;
    if (typeof value === "string" && value.includes("\n")) {
      indentedValue = String(value).split("\n").map(function(str2, i3) {
        return i3 === 0 ? str2 : "" + endentation + str2;
      }).join("\n");
    }
    string += indentedValue + strings[i2 + 1];
  });
  return string;
}
var unknownIcon = {
  body: '<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/><text transform="translate(21.16 64.67)" style="fill: #fff; font-family: ArialMT, Arial; font-size: 67.75px;"><tspan x="0" y="0">?</tspan></text></g>',
  height: 80,
  width: 80
};
var iconsStore = /* @__PURE__ */ new Map();
var loaderStore = /* @__PURE__ */ new Map();
var registerIconPacks = /* @__PURE__ */ __name((iconLoaders) => {
  for (const iconLoader of iconLoaders) {
    if (!iconLoader.name) {
      throw new Error(
        'Invalid icon loader. Must have a "name" property with non-empty string value.'
      );
    }
    log.debug("Registering icon pack:", iconLoader.name);
    if ("loader" in iconLoader) {
      loaderStore.set(iconLoader.name, iconLoader.loader);
    } else if ("icons" in iconLoader) {
      iconsStore.set(iconLoader.name, iconLoader.icons);
    } else {
      log.error("Invalid icon loader:", iconLoader);
      throw new Error('Invalid icon loader. Must have either "icons" or "loader" property.');
    }
  }
}, "registerIconPacks");
var getRegisteredIconData = /* @__PURE__ */ __name(async (iconName, fallbackPrefix) => {
  const data = stringToIcon(iconName, true, fallbackPrefix !== void 0);
  if (!data) {
    throw new Error(`Invalid icon name: ${iconName}`);
  }
  const prefix = data.prefix || fallbackPrefix;
  if (!prefix) {
    throw new Error(`Icon name must contain a prefix: ${iconName}`);
  }
  let icons = iconsStore.get(prefix);
  if (!icons) {
    const loader28 = loaderStore.get(prefix);
    if (!loader28) {
      throw new Error(`Icon set not found: ${data.prefix}`);
    }
    try {
      const loaded = await loader28();
      icons = { ...loaded, prefix };
      iconsStore.set(prefix, icons);
    } catch (e2) {
      log.error(e2);
      throw new Error(`Failed to load icon set: ${data.prefix}`);
    }
  }
  const iconData = getIconData(icons, data.name);
  if (!iconData) {
    throw new Error(`Icon not found: ${iconName}`);
  }
  return iconData;
}, "getRegisteredIconData");
var isIconAvailable = /* @__PURE__ */ __name(async (iconName) => {
  try {
    await getRegisteredIconData(iconName);
    return true;
  } catch {
    return false;
  }
}, "isIconAvailable");
var getIconSVG = /* @__PURE__ */ __name(async (iconName, customisations, extraAttributes) => {
  let iconData;
  try {
    iconData = await getRegisteredIconData(iconName, customisations == null ? void 0 : customisations.fallbackPrefix);
  } catch (e2) {
    log.error(e2);
    iconData = unknownIcon;
  }
  const renderData = iconToSVG(iconData, customisations);
  const svg2 = iconToHTML(replaceIDs(renderData.body), {
    ...renderData.attributes,
    ...extraAttributes
  });
  return sanitizeText(svg2, getConfig());
}, "getIconSVG");
function preprocessMarkdown(markdown, { markdownAutoWrap }) {
  const withoutBR = markdown.replace(/<br\/>/g, "\n");
  const withoutMultipleNewlines = withoutBR.replace(/\n{2,}/g, "\n");
  const withoutExtraSpaces = dedent(withoutMultipleNewlines);
  if (markdownAutoWrap === false) {
    return withoutExtraSpaces.replace(/ /g, "&nbsp;");
  }
  return withoutExtraSpaces;
}
__name(preprocessMarkdown, "preprocessMarkdown");
function markdownToLines(markdown, config2 = {}) {
  const preprocessedMarkdown = preprocessMarkdown(markdown, config2);
  const nodes = d$1.lexer(preprocessedMarkdown);
  const lines = [[]];
  let currentLine = 0;
  function processNode(node, parentType = "normal") {
    if (node.type === "text") {
      const textLines = node.text.split("\n");
      textLines.forEach((textLine, index) => {
        if (index !== 0) {
          currentLine++;
          lines.push([]);
        }
        textLine.split(" ").forEach((word) => {
          word = word.replace(/&#39;/g, `'`);
          if (word) {
            lines[currentLine].push({ content: word, type: parentType });
          }
        });
      });
    } else if (node.type === "strong" || node.type === "em") {
      node.tokens.forEach((contentNode) => {
        processNode(contentNode, node.type);
      });
    } else if (node.type === "html") {
      lines[currentLine].push({ content: node.text, type: "normal" });
    }
  }
  __name(processNode, "processNode");
  nodes.forEach((treeNode) => {
    var _a2;
    if (treeNode.type === "paragraph") {
      (_a2 = treeNode.tokens) == null ? void 0 : _a2.forEach((contentNode) => {
        processNode(contentNode);
      });
    } else if (treeNode.type === "html") {
      lines[currentLine].push({ content: treeNode.text, type: "normal" });
    } else {
      lines[currentLine].push({ content: treeNode.raw, type: "normal" });
    }
  });
  return lines;
}
__name(markdownToLines, "markdownToLines");
function markdownToHTML(markdown, { markdownAutoWrap } = {}) {
  const nodes = d$1.lexer(markdown);
  function output(node) {
    var _a2, _b2, _c2;
    if (node.type === "text") {
      if (markdownAutoWrap === false) {
        return node.text.replace(/\n */g, "<br/>").replace(/ /g, "&nbsp;");
      }
      return node.text.replace(/\n */g, "<br/>");
    } else if (node.type === "strong") {
      return `<strong>${(_a2 = node.tokens) == null ? void 0 : _a2.map(output).join("")}</strong>`;
    } else if (node.type === "em") {
      return `<em>${(_b2 = node.tokens) == null ? void 0 : _b2.map(output).join("")}</em>`;
    } else if (node.type === "paragraph") {
      return `<p>${(_c2 = node.tokens) == null ? void 0 : _c2.map(output).join("")}</p>`;
    } else if (node.type === "space") {
      return "";
    } else if (node.type === "html") {
      return `${node.text}`;
    } else if (node.type === "escape") {
      return node.text;
    }
    log.warn(`Unsupported markdown: ${node.type}`);
    return node.raw;
  }
  __name(output, "output");
  return nodes.map(output).join("");
}
__name(markdownToHTML, "markdownToHTML");
function splitTextToChars(text2) {
  if (Intl.Segmenter) {
    return [...new Intl.Segmenter().segment(text2)].map((s2) => s2.segment);
  }
  return [...text2];
}
__name(splitTextToChars, "splitTextToChars");
function splitWordToFitWidth(checkFit, word) {
  const characters = splitTextToChars(word.content);
  return splitWordToFitWidthRecursion(checkFit, [], characters, word.type);
}
__name(splitWordToFitWidth, "splitWordToFitWidth");
function splitWordToFitWidthRecursion(checkFit, usedChars, remainingChars, type2) {
  if (remainingChars.length === 0) {
    return [
      { content: usedChars.join(""), type: type2 },
      { content: "", type: type2 }
    ];
  }
  const [nextChar, ...rest] = remainingChars;
  const newWord = [...usedChars, nextChar];
  if (checkFit([{ content: newWord.join(""), type: type2 }])) {
    return splitWordToFitWidthRecursion(checkFit, newWord, rest, type2);
  }
  if (usedChars.length === 0 && nextChar) {
    usedChars.push(nextChar);
    remainingChars.shift();
  }
  return [
    { content: usedChars.join(""), type: type2 },
    { content: remainingChars.join(""), type: type2 }
  ];
}
__name(splitWordToFitWidthRecursion, "splitWordToFitWidthRecursion");
function splitLineToFitWidth(line2, checkFit) {
  if (line2.some(({ content }) => content.includes("\n"))) {
    throw new Error("splitLineToFitWidth does not support newlines in the line");
  }
  return splitLineToFitWidthRecursion(line2, checkFit);
}
__name(splitLineToFitWidth, "splitLineToFitWidth");
function splitLineToFitWidthRecursion(words, checkFit, lines = [], newLine = []) {
  if (words.length === 0) {
    if (newLine.length > 0) {
      lines.push(newLine);
    }
    return lines.length > 0 ? lines : [];
  }
  let joiner = "";
  if (words[0].content === " ") {
    joiner = " ";
    words.shift();
  }
  const nextWord = words.shift() ?? { content: " ", type: "normal" };
  const lineWithNextWord = [...newLine];
  if (joiner !== "") {
    lineWithNextWord.push({ content: joiner, type: "normal" });
  }
  lineWithNextWord.push(nextWord);
  if (checkFit(lineWithNextWord)) {
    return splitLineToFitWidthRecursion(words, checkFit, lines, lineWithNextWord);
  }
  if (newLine.length > 0) {
    lines.push(newLine);
    words.unshift(nextWord);
  } else if (nextWord.content) {
    const [line2, rest] = splitWordToFitWidth(checkFit, nextWord);
    lines.push([line2]);
    if (rest.content) {
      words.unshift(rest);
    }
  }
  return splitLineToFitWidthRecursion(words, checkFit, lines);
}
__name(splitLineToFitWidthRecursion, "splitLineToFitWidthRecursion");
function applyStyle$1(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
__name(applyStyle$1, "applyStyle");
async function addHtmlSpan(element, node, width, classes, addBackground = false, config2 = getConfig()) {
  const fo = element.append("foreignObject");
  fo.attr("width", `${10 * width}px`);
  fo.attr("height", `${10 * width}px`);
  const div = fo.append("xhtml:div");
  const sanitizedLabel = hasKatex(node.label) ? await renderKatexSanitized(node.label.replace(common_default.lineBreakRegex, "\n"), config2) : sanitizeText(node.label, config2);
  const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
  const span = div.append("span");
  span.html(sanitizedLabel);
  applyStyle$1(span, node.labelStyle);
  span.attr("class", `${labelClass} ${classes}`);
  applyStyle$1(div, node.labelStyle);
  div.style("display", "table-cell");
  div.style("white-space", "nowrap");
  div.style("line-height", "1.5");
  div.style("max-width", width + "px");
  div.style("text-align", "center");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  if (addBackground) {
    div.attr("class", "labelBkg");
  }
  let bbox = div.node().getBoundingClientRect();
  if (bbox.width === width) {
    div.style("display", "table");
    div.style("white-space", "break-spaces");
    div.style("width", width + "px");
    bbox = div.node().getBoundingClientRect();
  }
  return fo.node();
}
__name(addHtmlSpan, "addHtmlSpan");
function createTspan(textElement, lineIndex, lineHeight) {
  return textElement.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", lineIndex * lineHeight - 0.1 + "em").attr("dy", lineHeight + "em");
}
__name(createTspan, "createTspan");
function computeWidthOfText(parentNode, lineHeight, line2) {
  const testElement = parentNode.append("text");
  const testSpan = createTspan(testElement, 1, lineHeight);
  updateTextContentAndStyles(testSpan, line2);
  const textLength = testSpan.node().getComputedTextLength();
  testElement.remove();
  return textLength;
}
__name(computeWidthOfText, "computeWidthOfText");
function computeDimensionOfText(parentNode, lineHeight, text2) {
  var _a2;
  const testElement = parentNode.append("text");
  const testSpan = createTspan(testElement, 1, lineHeight);
  updateTextContentAndStyles(testSpan, [{ content: text2, type: "normal" }]);
  const textDimension = (_a2 = testSpan.node()) == null ? void 0 : _a2.getBoundingClientRect();
  if (textDimension) {
    testElement.remove();
  }
  return textDimension;
}
__name(computeDimensionOfText, "computeDimensionOfText");
function createFormattedText(width, g2, structuredText, addBackground = false) {
  const lineHeight = 1.1;
  const labelGroup = g2.append("g");
  const bkg = labelGroup.insert("rect").attr("class", "background").attr("style", "stroke: none");
  const textElement = labelGroup.append("text").attr("y", "-10.1");
  let lineIndex = 0;
  for (const line2 of structuredText) {
    const checkWidth = /* @__PURE__ */ __name((line22) => computeWidthOfText(labelGroup, lineHeight, line22) <= width, "checkWidth");
    const linesUnderWidth = checkWidth(line2) ? [line2] : splitLineToFitWidth(line2, checkWidth);
    for (const preparedLine of linesUnderWidth) {
      const tspan = createTspan(textElement, lineIndex, lineHeight);
      updateTextContentAndStyles(tspan, preparedLine);
      lineIndex++;
    }
  }
  if (addBackground) {
    const bbox = textElement.node().getBBox();
    const padding = 2;
    bkg.attr("x", bbox.x - padding).attr("y", bbox.y - padding).attr("width", bbox.width + 2 * padding).attr("height", bbox.height + 2 * padding);
    return labelGroup.node();
  } else {
    return textElement.node();
  }
}
__name(createFormattedText, "createFormattedText");
function updateTextContentAndStyles(tspan, wrappedLine) {
  tspan.text("");
  wrappedLine.forEach((word, index) => {
    const innerTspan = tspan.append("tspan").attr("font-style", word.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", word.type === "strong" ? "bold" : "normal");
    if (index === 0) {
      innerTspan.text(word.content);
    } else {
      innerTspan.text(" " + word.content);
    }
  });
}
__name(updateTextContentAndStyles, "updateTextContentAndStyles");
async function replaceIconSubstring(text2, config2 = {}) {
  const pendingReplacements = [];
  text2.replace(/(fa[bklrs]?):fa-([\w-]+)/g, (fullMatch, prefix, iconName) => {
    pendingReplacements.push(
      (async () => {
        const registeredIconName = `${prefix}:${iconName}`;
        if (await isIconAvailable(registeredIconName)) {
          return await getIconSVG(registeredIconName, void 0, { class: "label-icon" });
        } else {
          return `<i class='${sanitizeText(fullMatch, config2).replace(":", " ")}'></i>`;
        }
      })()
    );
    return fullMatch;
  });
  const replacements = await Promise.all(pendingReplacements);
  return text2.replace(/(fa[bklrs]?):fa-([\w-]+)/g, () => replacements.shift() ?? "");
}
__name(replaceIconSubstring, "replaceIconSubstring");
var createText = /* @__PURE__ */ __name(async (el, text2 = "", {
  style = "",
  isTitle = false,
  classes = "",
  useHtmlLabels = true,
  isNode = true,
  width = 200,
  addSvgBackground = false
} = {}, config2) => {
  log.debug(
    "XYZ createText",
    text2,
    style,
    isTitle,
    classes,
    useHtmlLabels,
    isNode,
    "addSvgBackground: ",
    addSvgBackground
  );
  if (useHtmlLabels) {
    const htmlText = markdownToHTML(text2, config2);
    const decodedReplacedText = await replaceIconSubstring(decodeEntities(htmlText), config2);
    const inputForKatex = text2.replace(/\\\\/g, "\\");
    const node = {
      isNode,
      label: hasKatex(text2) ? inputForKatex : decodedReplacedText,
      labelStyle: style.replace("fill:", "color:")
    };
    const vertexNode = await addHtmlSpan(el, node, width, classes, addSvgBackground, config2);
    return vertexNode;
  } else {
    const sanitizeBR = text2.replace(/<br\s*\/?>/g, "<br/>");
    const structuredText = markdownToLines(sanitizeBR.replace("<br>", "<br/>"), config2);
    const svgLabel = createFormattedText(
      width,
      el,
      structuredText,
      text2 ? addSvgBackground : false
    );
    if (isNode) {
      if (/stroke:/.exec(style)) {
        style = style.replace("stroke:", "lineColor:");
      }
      const nodeLabelTextStyle = style.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      select(svgLabel).attr("style", nodeLabelTextStyle);
    } else {
      const edgeLabelRectStyle = style.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/background:/g, "fill:");
      select(svgLabel).select("rect").attr("style", edgeLabelRectStyle.replace(/background:/g, "fill:"));
      const edgeLabelTextStyle = style.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      select(svgLabel).select("text").attr("style", edgeLabelTextStyle);
    }
    return svgLabel;
  }
}, "createText");
function t(t2, e2, s2) {
  if (t2 && t2.length) {
    const [n2, o2] = e2, a2 = Math.PI / 180 * s2, h2 = Math.cos(a2), r2 = Math.sin(a2);
    for (const e3 of t2) {
      const [t3, s3] = e3;
      e3[0] = (t3 - n2) * h2 - (s3 - o2) * r2 + n2, e3[1] = (t3 - n2) * r2 + (s3 - o2) * h2 + o2;
    }
  }
}
function e(t2, e2) {
  return t2[0] === e2[0] && t2[1] === e2[1];
}
function s(s2, n2, o2, a2 = 1) {
  const h2 = o2, r2 = Math.max(n2, 0.1), i2 = s2[0] && s2[0][0] && "number" == typeof s2[0][0] ? [s2] : s2, c2 = [0, 0];
  if (h2) for (const e2 of i2) t(e2, c2, h2);
  const l2 = (function(t2, s3, n3) {
    const o3 = [];
    for (const s4 of t2) {
      const t3 = [...s4];
      e(t3[0], t3[t3.length - 1]) || t3.push([t3[0][0], t3[0][1]]), t3.length > 2 && o3.push(t3);
    }
    const a3 = [];
    s3 = Math.max(s3, 0.1);
    const h3 = [];
    for (const t3 of o3) for (let e2 = 0; e2 < t3.length - 1; e2++) {
      const s4 = t3[e2], n4 = t3[e2 + 1];
      if (s4[1] !== n4[1]) {
        const t4 = Math.min(s4[1], n4[1]);
        h3.push({ ymin: t4, ymax: Math.max(s4[1], n4[1]), x: t4 === s4[1] ? s4[0] : n4[0], islope: (n4[0] - s4[0]) / (n4[1] - s4[1]) });
      }
    }
    if (h3.sort(((t3, e2) => t3.ymin < e2.ymin ? -1 : t3.ymin > e2.ymin ? 1 : t3.x < e2.x ? -1 : t3.x > e2.x ? 1 : t3.ymax === e2.ymax ? 0 : (t3.ymax - e2.ymax) / Math.abs(t3.ymax - e2.ymax))), !h3.length) return a3;
    let r3 = [], i3 = h3[0].ymin, c3 = 0;
    for (; r3.length || h3.length; ) {
      if (h3.length) {
        let t3 = -1;
        for (let e2 = 0; e2 < h3.length && !(h3[e2].ymin > i3); e2++) t3 = e2;
        h3.splice(0, t3 + 1).forEach(((t4) => {
          r3.push({ s: i3, edge: t4 });
        }));
      }
      if (r3 = r3.filter(((t3) => !(t3.edge.ymax <= i3))), r3.sort(((t3, e2) => t3.edge.x === e2.edge.x ? 0 : (t3.edge.x - e2.edge.x) / Math.abs(t3.edge.x - e2.edge.x))), (1 !== n3 || c3 % s3 == 0) && r3.length > 1) for (let t3 = 0; t3 < r3.length; t3 += 2) {
        const e2 = t3 + 1;
        if (e2 >= r3.length) break;
        const s4 = r3[t3].edge, n4 = r3[e2].edge;
        a3.push([[Math.round(s4.x), i3], [Math.round(n4.x), i3]]);
      }
      i3 += n3, r3.forEach(((t3) => {
        t3.edge.x = t3.edge.x + n3 * t3.edge.islope;
      })), c3++;
    }
    return a3;
  })(i2, r2, a2);
  if (h2) {
    for (const e2 of i2) t(e2, c2, -h2);
    !(function(e2, s3, n3) {
      const o3 = [];
      e2.forEach(((t2) => o3.push(...t2))), t(o3, s3, n3);
    })(l2, c2, -h2);
  }
  return l2;
}
function n(t2, e2) {
  var n2;
  const o2 = e2.hachureAngle + 90;
  let a2 = e2.hachureGap;
  a2 < 0 && (a2 = 4 * e2.strokeWidth), a2 = Math.round(Math.max(a2, 0.1));
  let h2 = 1;
  return e2.roughness >= 1 && ((null === (n2 = e2.randomizer) || void 0 === n2 ? void 0 : n2.next()) || Math.random()) > 0.7 && (h2 = a2), s(t2, a2, o2, h2 || 1);
}
class o {
  constructor(t2) {
    this.helper = t2;
  }
  fillPolygons(t2, e2) {
    return this._fillPolygons(t2, e2);
  }
  _fillPolygons(t2, e2) {
    const s2 = n(t2, e2);
    return { type: "fillSketch", ops: this.renderLines(s2, e2) };
  }
  renderLines(t2, e2) {
    const s2 = [];
    for (const n2 of t2) s2.push(...this.helper.doubleLineOps(n2[0][0], n2[0][1], n2[1][0], n2[1][1], e2));
    return s2;
  }
}
function a(t2) {
  const e2 = t2[0], s2 = t2[1];
  return Math.sqrt(Math.pow(e2[0] - s2[0], 2) + Math.pow(e2[1] - s2[1], 2));
}
class h extends o {
  fillPolygons(t2, e2) {
    let s2 = e2.hachureGap;
    s2 < 0 && (s2 = 4 * e2.strokeWidth), s2 = Math.max(s2, 0.1);
    const o2 = n(t2, Object.assign({}, e2, { hachureGap: s2 })), h2 = Math.PI / 180 * e2.hachureAngle, r2 = [], i2 = 0.5 * s2 * Math.cos(h2), c2 = 0.5 * s2 * Math.sin(h2);
    for (const [t3, e3] of o2) a([t3, e3]) && r2.push([[t3[0] - i2, t3[1] + c2], [...e3]], [[t3[0] + i2, t3[1] - c2], [...e3]]);
    return { type: "fillSketch", ops: this.renderLines(r2, e2) };
  }
}
class r extends o {
  fillPolygons(t2, e2) {
    const s2 = this._fillPolygons(t2, e2), n2 = Object.assign({}, e2, { hachureAngle: e2.hachureAngle + 90 }), o2 = this._fillPolygons(t2, n2);
    return s2.ops = s2.ops.concat(o2.ops), s2;
  }
}
class i {
  constructor(t2) {
    this.helper = t2;
  }
  fillPolygons(t2, e2) {
    const s2 = n(t2, e2 = Object.assign({}, e2, { hachureAngle: 0 }));
    return this.dotsOnLines(s2, e2);
  }
  dotsOnLines(t2, e2) {
    const s2 = [];
    let n2 = e2.hachureGap;
    n2 < 0 && (n2 = 4 * e2.strokeWidth), n2 = Math.max(n2, 0.1);
    let o2 = e2.fillWeight;
    o2 < 0 && (o2 = e2.strokeWidth / 2);
    const h2 = n2 / 4;
    for (const r2 of t2) {
      const t3 = a(r2), i2 = t3 / n2, c2 = Math.ceil(i2) - 1, l2 = t3 - c2 * n2, u2 = (r2[0][0] + r2[1][0]) / 2 - n2 / 4, p2 = Math.min(r2[0][1], r2[1][1]);
      for (let t4 = 0; t4 < c2; t4++) {
        const a2 = p2 + l2 + t4 * n2, r3 = u2 - h2 + 2 * Math.random() * h2, i3 = a2 - h2 + 2 * Math.random() * h2, c3 = this.helper.ellipse(r3, i3, o2, o2, e2);
        s2.push(...c3.ops);
      }
    }
    return { type: "fillSketch", ops: s2 };
  }
}
class c {
  constructor(t2) {
    this.helper = t2;
  }
  fillPolygons(t2, e2) {
    const s2 = n(t2, e2);
    return { type: "fillSketch", ops: this.dashedLine(s2, e2) };
  }
  dashedLine(t2, e2) {
    const s2 = e2.dashOffset < 0 ? e2.hachureGap < 0 ? 4 * e2.strokeWidth : e2.hachureGap : e2.dashOffset, n2 = e2.dashGap < 0 ? e2.hachureGap < 0 ? 4 * e2.strokeWidth : e2.hachureGap : e2.dashGap, o2 = [];
    return t2.forEach(((t3) => {
      const h2 = a(t3), r2 = Math.floor(h2 / (s2 + n2)), i2 = (h2 + n2 - r2 * (s2 + n2)) / 2;
      let c2 = t3[0], l2 = t3[1];
      c2[0] > l2[0] && (c2 = t3[1], l2 = t3[0]);
      const u2 = Math.atan((l2[1] - c2[1]) / (l2[0] - c2[0]));
      for (let t4 = 0; t4 < r2; t4++) {
        const a2 = t4 * (s2 + n2), h3 = a2 + s2, r3 = [c2[0] + a2 * Math.cos(u2) + i2 * Math.cos(u2), c2[1] + a2 * Math.sin(u2) + i2 * Math.sin(u2)], l3 = [c2[0] + h3 * Math.cos(u2) + i2 * Math.cos(u2), c2[1] + h3 * Math.sin(u2) + i2 * Math.sin(u2)];
        o2.push(...this.helper.doubleLineOps(r3[0], r3[1], l3[0], l3[1], e2));
      }
    })), o2;
  }
}
class l {
  constructor(t2) {
    this.helper = t2;
  }
  fillPolygons(t2, e2) {
    const s2 = e2.hachureGap < 0 ? 4 * e2.strokeWidth : e2.hachureGap, o2 = e2.zigzagOffset < 0 ? s2 : e2.zigzagOffset, a2 = n(t2, e2 = Object.assign({}, e2, { hachureGap: s2 + o2 }));
    return { type: "fillSketch", ops: this.zigzagLines(a2, o2, e2) };
  }
  zigzagLines(t2, e2, s2) {
    const n2 = [];
    return t2.forEach(((t3) => {
      const o2 = a(t3), h2 = Math.round(o2 / (2 * e2));
      let r2 = t3[0], i2 = t3[1];
      r2[0] > i2[0] && (r2 = t3[1], i2 = t3[0]);
      const c2 = Math.atan((i2[1] - r2[1]) / (i2[0] - r2[0]));
      for (let t4 = 0; t4 < h2; t4++) {
        const o3 = 2 * t4 * e2, a2 = 2 * (t4 + 1) * e2, h3 = Math.sqrt(2 * Math.pow(e2, 2)), i3 = [r2[0] + o3 * Math.cos(c2), r2[1] + o3 * Math.sin(c2)], l2 = [r2[0] + a2 * Math.cos(c2), r2[1] + a2 * Math.sin(c2)], u2 = [i3[0] + h3 * Math.cos(c2 + Math.PI / 4), i3[1] + h3 * Math.sin(c2 + Math.PI / 4)];
        n2.push(...this.helper.doubleLineOps(i3[0], i3[1], u2[0], u2[1], s2), ...this.helper.doubleLineOps(u2[0], u2[1], l2[0], l2[1], s2));
      }
    })), n2;
  }
}
const u = {};
class p {
  constructor(t2) {
    this.seed = t2;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const f = 0, d = 1, g = 2, M = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function k(t2, e2) {
  return t2.type === e2;
}
function b(t2) {
  const e2 = [], s2 = (function(t3) {
    const e3 = new Array();
    for (; "" !== t3; ) if (t3.match(/^([ \t\r\n,]+)/)) t3 = t3.substr(RegExp.$1.length);
    else if (t3.match(/^([aAcChHlLmMqQsStTvVzZ])/)) e3[e3.length] = { type: f, text: RegExp.$1 }, t3 = t3.substr(RegExp.$1.length);
    else {
      if (!t3.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      e3[e3.length] = { type: d, text: `${parseFloat(RegExp.$1)}` }, t3 = t3.substr(RegExp.$1.length);
    }
    return e3[e3.length] = { type: g, text: "" }, e3;
  })(t2);
  let n2 = "BOD", o2 = 0, a2 = s2[o2];
  for (; !k(a2, g); ) {
    let h2 = 0;
    const r2 = [];
    if ("BOD" === n2) {
      if ("M" !== a2.text && "m" !== a2.text) return b("M0,0" + t2);
      o2++, h2 = M[a2.text], n2 = a2.text;
    } else k(a2, d) ? h2 = M[n2] : (o2++, h2 = M[a2.text], n2 = a2.text);
    if (!(o2 + h2 < s2.length)) throw new Error("Path data ended short");
    for (let t3 = o2; t3 < o2 + h2; t3++) {
      const e3 = s2[t3];
      if (!k(e3, d)) throw new Error("Param not a number: " + n2 + "," + e3.text);
      r2[r2.length] = +e3.text;
    }
    if ("number" != typeof M[n2]) throw new Error("Bad segment: " + n2);
    {
      const t3 = { key: n2, data: r2 };
      e2.push(t3), o2 += h2, a2 = s2[o2], "M" === n2 && (n2 = "L"), "m" === n2 && (n2 = "l");
    }
  }
  return e2;
}
function y(t2) {
  let e2 = 0, s2 = 0, n2 = 0, o2 = 0;
  const a2 = [];
  for (const { key: h2, data: r2 } of t2) switch (h2) {
    case "M":
      a2.push({ key: "M", data: [...r2] }), [e2, s2] = r2, [n2, o2] = r2;
      break;
    case "m":
      e2 += r2[0], s2 += r2[1], a2.push({ key: "M", data: [e2, s2] }), n2 = e2, o2 = s2;
      break;
    case "L":
      a2.push({ key: "L", data: [...r2] }), [e2, s2] = r2;
      break;
    case "l":
      e2 += r2[0], s2 += r2[1], a2.push({ key: "L", data: [e2, s2] });
      break;
    case "C":
      a2.push({ key: "C", data: [...r2] }), e2 = r2[4], s2 = r2[5];
      break;
    case "c": {
      const t3 = r2.map(((t4, n3) => n3 % 2 ? t4 + s2 : t4 + e2));
      a2.push({ key: "C", data: t3 }), e2 = t3[4], s2 = t3[5];
      break;
    }
    case "Q":
      a2.push({ key: "Q", data: [...r2] }), e2 = r2[2], s2 = r2[3];
      break;
    case "q": {
      const t3 = r2.map(((t4, n3) => n3 % 2 ? t4 + s2 : t4 + e2));
      a2.push({ key: "Q", data: t3 }), e2 = t3[2], s2 = t3[3];
      break;
    }
    case "A":
      a2.push({ key: "A", data: [...r2] }), e2 = r2[5], s2 = r2[6];
      break;
    case "a":
      e2 += r2[5], s2 += r2[6], a2.push({ key: "A", data: [r2[0], r2[1], r2[2], r2[3], r2[4], e2, s2] });
      break;
    case "H":
      a2.push({ key: "H", data: [...r2] }), e2 = r2[0];
      break;
    case "h":
      e2 += r2[0], a2.push({ key: "H", data: [e2] });
      break;
    case "V":
      a2.push({ key: "V", data: [...r2] }), s2 = r2[0];
      break;
    case "v":
      s2 += r2[0], a2.push({ key: "V", data: [s2] });
      break;
    case "S":
      a2.push({ key: "S", data: [...r2] }), e2 = r2[2], s2 = r2[3];
      break;
    case "s": {
      const t3 = r2.map(((t4, n3) => n3 % 2 ? t4 + s2 : t4 + e2));
      a2.push({ key: "S", data: t3 }), e2 = t3[2], s2 = t3[3];
      break;
    }
    case "T":
      a2.push({ key: "T", data: [...r2] }), e2 = r2[0], s2 = r2[1];
      break;
    case "t":
      e2 += r2[0], s2 += r2[1], a2.push({ key: "T", data: [e2, s2] });
      break;
    case "Z":
    case "z":
      a2.push({ key: "Z", data: [] }), e2 = n2, s2 = o2;
  }
  return a2;
}
function m(t2) {
  const e2 = [];
  let s2 = "", n2 = 0, o2 = 0, a2 = 0, h2 = 0, r2 = 0, i2 = 0;
  for (const { key: c2, data: l2 } of t2) {
    switch (c2) {
      case "M":
        e2.push({ key: "M", data: [...l2] }), [n2, o2] = l2, [a2, h2] = l2;
        break;
      case "C":
        e2.push({ key: "C", data: [...l2] }), n2 = l2[4], o2 = l2[5], r2 = l2[2], i2 = l2[3];
        break;
      case "L":
        e2.push({ key: "L", data: [...l2] }), [n2, o2] = l2;
        break;
      case "H":
        n2 = l2[0], e2.push({ key: "L", data: [n2, o2] });
        break;
      case "V":
        o2 = l2[0], e2.push({ key: "L", data: [n2, o2] });
        break;
      case "S": {
        let t3 = 0, a3 = 0;
        "C" === s2 || "S" === s2 ? (t3 = n2 + (n2 - r2), a3 = o2 + (o2 - i2)) : (t3 = n2, a3 = o2), e2.push({ key: "C", data: [t3, a3, ...l2] }), r2 = l2[0], i2 = l2[1], n2 = l2[2], o2 = l2[3];
        break;
      }
      case "T": {
        const [t3, a3] = l2;
        let h3 = 0, c3 = 0;
        "Q" === s2 || "T" === s2 ? (h3 = n2 + (n2 - r2), c3 = o2 + (o2 - i2)) : (h3 = n2, c3 = o2);
        const u2 = n2 + 2 * (h3 - n2) / 3, p2 = o2 + 2 * (c3 - o2) / 3, f2 = t3 + 2 * (h3 - t3) / 3, d2 = a3 + 2 * (c3 - a3) / 3;
        e2.push({ key: "C", data: [u2, p2, f2, d2, t3, a3] }), r2 = h3, i2 = c3, n2 = t3, o2 = a3;
        break;
      }
      case "Q": {
        const [t3, s3, a3, h3] = l2, c3 = n2 + 2 * (t3 - n2) / 3, u2 = o2 + 2 * (s3 - o2) / 3, p2 = a3 + 2 * (t3 - a3) / 3, f2 = h3 + 2 * (s3 - h3) / 3;
        e2.push({ key: "C", data: [c3, u2, p2, f2, a3, h3] }), r2 = t3, i2 = s3, n2 = a3, o2 = h3;
        break;
      }
      case "A": {
        const t3 = Math.abs(l2[0]), s3 = Math.abs(l2[1]), a3 = l2[2], h3 = l2[3], r3 = l2[4], i3 = l2[5], c3 = l2[6];
        if (0 === t3 || 0 === s3) e2.push({ key: "C", data: [n2, o2, i3, c3, i3, c3] }), n2 = i3, o2 = c3;
        else if (n2 !== i3 || o2 !== c3) {
          x(n2, o2, i3, c3, t3, s3, a3, h3, r3).forEach((function(t4) {
            e2.push({ key: "C", data: t4 });
          })), n2 = i3, o2 = c3;
        }
        break;
      }
      case "Z":
        e2.push({ key: "Z", data: [] }), n2 = a2, o2 = h2;
    }
    s2 = c2;
  }
  return e2;
}
function w(t2, e2, s2) {
  return [t2 * Math.cos(s2) - e2 * Math.sin(s2), t2 * Math.sin(s2) + e2 * Math.cos(s2)];
}
function x(t2, e2, s2, n2, o2, a2, h2, r2, i2, c2) {
  const l2 = (u2 = h2, Math.PI * u2 / 180);
  var u2;
  let p2 = [], f2 = 0, d2 = 0, g2 = 0, M2 = 0;
  if (c2) [f2, d2, g2, M2] = c2;
  else {
    [t2, e2] = w(t2, e2, -l2), [s2, n2] = w(s2, n2, -l2);
    const h3 = (t2 - s2) / 2, c3 = (e2 - n2) / 2;
    let u3 = h3 * h3 / (o2 * o2) + c3 * c3 / (a2 * a2);
    u3 > 1 && (u3 = Math.sqrt(u3), o2 *= u3, a2 *= u3);
    const p3 = o2 * o2, k3 = a2 * a2, b3 = p3 * k3 - p3 * c3 * c3 - k3 * h3 * h3, y3 = p3 * c3 * c3 + k3 * h3 * h3, m3 = (r2 === i2 ? -1 : 1) * Math.sqrt(Math.abs(b3 / y3));
    g2 = m3 * o2 * c3 / a2 + (t2 + s2) / 2, M2 = m3 * -a2 * h3 / o2 + (e2 + n2) / 2, f2 = Math.asin(parseFloat(((e2 - M2) / a2).toFixed(9))), d2 = Math.asin(parseFloat(((n2 - M2) / a2).toFixed(9))), t2 < g2 && (f2 = Math.PI - f2), s2 < g2 && (d2 = Math.PI - d2), f2 < 0 && (f2 = 2 * Math.PI + f2), d2 < 0 && (d2 = 2 * Math.PI + d2), i2 && f2 > d2 && (f2 -= 2 * Math.PI), !i2 && d2 > f2 && (d2 -= 2 * Math.PI);
  }
  let k2 = d2 - f2;
  if (Math.abs(k2) > 120 * Math.PI / 180) {
    const t3 = d2, e3 = s2, r3 = n2;
    d2 = i2 && d2 > f2 ? f2 + 120 * Math.PI / 180 * 1 : f2 + 120 * Math.PI / 180 * -1, p2 = x(s2 = g2 + o2 * Math.cos(d2), n2 = M2 + a2 * Math.sin(d2), e3, r3, o2, a2, h2, 0, i2, [d2, t3, g2, M2]);
  }
  k2 = d2 - f2;
  const b2 = Math.cos(f2), y2 = Math.sin(f2), m2 = Math.cos(d2), P2 = Math.sin(d2), v2 = Math.tan(k2 / 4), S2 = 4 / 3 * o2 * v2, O2 = 4 / 3 * a2 * v2, L2 = [t2, e2], T2 = [t2 + S2 * y2, e2 - O2 * b2], D2 = [s2 + S2 * P2, n2 - O2 * m2], A2 = [s2, n2];
  if (T2[0] = 2 * L2[0] - T2[0], T2[1] = 2 * L2[1] - T2[1], c2) return [T2, D2, A2].concat(p2);
  {
    p2 = [T2, D2, A2].concat(p2);
    const t3 = [];
    for (let e3 = 0; e3 < p2.length; e3 += 3) {
      const s3 = w(p2[e3][0], p2[e3][1], l2), n3 = w(p2[e3 + 1][0], p2[e3 + 1][1], l2), o3 = w(p2[e3 + 2][0], p2[e3 + 2][1], l2);
      t3.push([s3[0], s3[1], n3[0], n3[1], o3[0], o3[1]]);
    }
    return t3;
  }
}
const P = { randOffset: function(t2, e2) {
  return G(t2, e2);
}, randOffsetWithRange: function(t2, e2, s2) {
  return E(t2, e2, s2);
}, ellipse: function(t2, e2, s2, n2, o2) {
  const a2 = T(s2, n2, o2);
  return D(t2, e2, o2, a2).opset;
}, doubleLineOps: function(t2, e2, s2, n2, o2) {
  return $(t2, e2, s2, n2, o2, true);
} };
function v(t2, e2, s2, n2, o2) {
  return { type: "path", ops: $(t2, e2, s2, n2, o2) };
}
function S(t2, e2, s2) {
  const n2 = (t2 || []).length;
  if (n2 > 2) {
    const o2 = [];
    for (let e3 = 0; e3 < n2 - 1; e3++) o2.push(...$(t2[e3][0], t2[e3][1], t2[e3 + 1][0], t2[e3 + 1][1], s2));
    return e2 && o2.push(...$(t2[n2 - 1][0], t2[n2 - 1][1], t2[0][0], t2[0][1], s2)), { type: "path", ops: o2 };
  }
  return 2 === n2 ? v(t2[0][0], t2[0][1], t2[1][0], t2[1][1], s2) : { type: "path", ops: [] };
}
function O(t2, e2, s2, n2, o2) {
  return (function(t3, e3) {
    return S(t3, true, e3);
  })([[t2, e2], [t2 + s2, e2], [t2 + s2, e2 + n2], [t2, e2 + n2]], o2);
}
function L(t2, e2) {
  if (t2.length) {
    const s2 = "number" == typeof t2[0][0] ? [t2] : t2, n2 = j(s2[0], 1 * (1 + 0.2 * e2.roughness), e2), o2 = e2.disableMultiStroke ? [] : j(s2[0], 1.5 * (1 + 0.22 * e2.roughness), z(e2));
    for (let t3 = 1; t3 < s2.length; t3++) {
      const a2 = s2[t3];
      if (a2.length) {
        const t4 = j(a2, 1 * (1 + 0.2 * e2.roughness), e2), s3 = e2.disableMultiStroke ? [] : j(a2, 1.5 * (1 + 0.22 * e2.roughness), z(e2));
        for (const e3 of t4) "move" !== e3.op && n2.push(e3);
        for (const t5 of s3) "move" !== t5.op && o2.push(t5);
      }
    }
    return { type: "path", ops: n2.concat(o2) };
  }
  return { type: "path", ops: [] };
}
function T(t2, e2, s2) {
  const n2 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t2 / 2, 2) + Math.pow(e2 / 2, 2)) / 2)), o2 = Math.ceil(Math.max(s2.curveStepCount, s2.curveStepCount / Math.sqrt(200) * n2)), a2 = 2 * Math.PI / o2;
  let h2 = Math.abs(t2 / 2), r2 = Math.abs(e2 / 2);
  const i2 = 1 - s2.curveFitting;
  return h2 += G(h2 * i2, s2), r2 += G(r2 * i2, s2), { increment: a2, rx: h2, ry: r2 };
}
function D(t2, e2, s2, n2) {
  const [o2, a2] = F(n2.increment, t2, e2, n2.rx, n2.ry, 1, n2.increment * E(0.1, E(0.4, 1, s2), s2), s2);
  let h2 = q(o2, null, s2);
  if (!s2.disableMultiStroke && 0 !== s2.roughness) {
    const [o3] = F(n2.increment, t2, e2, n2.rx, n2.ry, 1.5, 0, s2), a3 = q(o3, null, s2);
    h2 = h2.concat(a3);
  }
  return { estimatedPoints: a2, opset: { type: "path", ops: h2 } };
}
function A(t2, e2, s2, n2, o2, a2, h2, r2, i2) {
  const c2 = t2, l2 = e2;
  let u2 = Math.abs(s2 / 2), p2 = Math.abs(n2 / 2);
  u2 += G(0.01 * u2, i2), p2 += G(0.01 * p2, i2);
  let f2 = o2, d2 = a2;
  for (; f2 < 0; ) f2 += 2 * Math.PI, d2 += 2 * Math.PI;
  d2 - f2 > 2 * Math.PI && (f2 = 0, d2 = 2 * Math.PI);
  const g2 = 2 * Math.PI / i2.curveStepCount, M2 = Math.min(g2 / 2, (d2 - f2) / 2), k2 = V(M2, c2, l2, u2, p2, f2, d2, 1, i2);
  if (!i2.disableMultiStroke) {
    const t3 = V(M2, c2, l2, u2, p2, f2, d2, 1.5, i2);
    k2.push(...t3);
  }
  return h2 && (r2 ? k2.push(...$(c2, l2, c2 + u2 * Math.cos(f2), l2 + p2 * Math.sin(f2), i2), ...$(c2, l2, c2 + u2 * Math.cos(d2), l2 + p2 * Math.sin(d2), i2)) : k2.push({ op: "lineTo", data: [c2, l2] }, { op: "lineTo", data: [c2 + u2 * Math.cos(f2), l2 + p2 * Math.sin(f2)] })), { type: "path", ops: k2 };
}
function _(t2, e2) {
  const s2 = m(y(b(t2))), n2 = [];
  let o2 = [0, 0], a2 = [0, 0];
  for (const { key: t3, data: h2 } of s2) switch (t3) {
    case "M":
      a2 = [h2[0], h2[1]], o2 = [h2[0], h2[1]];
      break;
    case "L":
      n2.push(...$(a2[0], a2[1], h2[0], h2[1], e2)), a2 = [h2[0], h2[1]];
      break;
    case "C": {
      const [t4, s3, o3, r2, i2, c2] = h2;
      n2.push(...Z(t4, s3, o3, r2, i2, c2, a2, e2)), a2 = [i2, c2];
      break;
    }
    case "Z":
      n2.push(...$(a2[0], a2[1], o2[0], o2[1], e2)), a2 = [o2[0], o2[1]];
  }
  return { type: "path", ops: n2 };
}
function I(t2, e2) {
  const s2 = [];
  for (const n2 of t2) if (n2.length) {
    const t3 = e2.maxRandomnessOffset || 0, o2 = n2.length;
    if (o2 > 2) {
      s2.push({ op: "move", data: [n2[0][0] + G(t3, e2), n2[0][1] + G(t3, e2)] });
      for (let a2 = 1; a2 < o2; a2++) s2.push({ op: "lineTo", data: [n2[a2][0] + G(t3, e2), n2[a2][1] + G(t3, e2)] });
    }
  }
  return { type: "fillPath", ops: s2 };
}
function C(t2, e2) {
  return (function(t3, e3) {
    let s2 = t3.fillStyle || "hachure";
    if (!u[s2]) switch (s2) {
      case "zigzag":
        u[s2] || (u[s2] = new h(e3));
        break;
      case "cross-hatch":
        u[s2] || (u[s2] = new r(e3));
        break;
      case "dots":
        u[s2] || (u[s2] = new i(e3));
        break;
      case "dashed":
        u[s2] || (u[s2] = new c(e3));
        break;
      case "zigzag-line":
        u[s2] || (u[s2] = new l(e3));
        break;
      default:
        s2 = "hachure", u[s2] || (u[s2] = new o(e3));
    }
    return u[s2];
  })(e2, P).fillPolygons(t2, e2);
}
function z(t2) {
  const e2 = Object.assign({}, t2);
  return e2.randomizer = void 0, t2.seed && (e2.seed = t2.seed + 1), e2;
}
function W(t2) {
  return t2.randomizer || (t2.randomizer = new p(t2.seed || 0)), t2.randomizer.next();
}
function E(t2, e2, s2, n2 = 1) {
  return s2.roughness * n2 * (W(s2) * (e2 - t2) + t2);
}
function G(t2, e2, s2 = 1) {
  return E(-t2, t2, e2, s2);
}
function $(t2, e2, s2, n2, o2, a2 = false) {
  const h2 = a2 ? o2.disableMultiStrokeFill : o2.disableMultiStroke, r2 = R(t2, e2, s2, n2, o2, true, false);
  if (h2) return r2;
  const i2 = R(t2, e2, s2, n2, o2, true, true);
  return r2.concat(i2);
}
function R(t2, e2, s2, n2, o2, a2, h2) {
  const r2 = Math.pow(t2 - s2, 2) + Math.pow(e2 - n2, 2), i2 = Math.sqrt(r2);
  let c2 = 1;
  c2 = i2 < 200 ? 1 : i2 > 500 ? 0.4 : -16668e-7 * i2 + 1.233334;
  let l2 = o2.maxRandomnessOffset || 0;
  l2 * l2 * 100 > r2 && (l2 = i2 / 10);
  const u2 = l2 / 2, p2 = 0.2 + 0.2 * W(o2);
  let f2 = o2.bowing * o2.maxRandomnessOffset * (n2 - e2) / 200, d2 = o2.bowing * o2.maxRandomnessOffset * (t2 - s2) / 200;
  f2 = G(f2, o2, c2), d2 = G(d2, o2, c2);
  const g2 = [], M2 = () => G(u2, o2, c2), k2 = () => G(l2, o2, c2), b2 = o2.preserveVertices;
  return h2 ? g2.push({ op: "move", data: [t2 + (b2 ? 0 : M2()), e2 + (b2 ? 0 : M2())] }) : g2.push({ op: "move", data: [t2 + (b2 ? 0 : G(l2, o2, c2)), e2 + (b2 ? 0 : G(l2, o2, c2))] }), h2 ? g2.push({ op: "bcurveTo", data: [f2 + t2 + (s2 - t2) * p2 + M2(), d2 + e2 + (n2 - e2) * p2 + M2(), f2 + t2 + 2 * (s2 - t2) * p2 + M2(), d2 + e2 + 2 * (n2 - e2) * p2 + M2(), s2 + (b2 ? 0 : M2()), n2 + (b2 ? 0 : M2())] }) : g2.push({ op: "bcurveTo", data: [f2 + t2 + (s2 - t2) * p2 + k2(), d2 + e2 + (n2 - e2) * p2 + k2(), f2 + t2 + 2 * (s2 - t2) * p2 + k2(), d2 + e2 + 2 * (n2 - e2) * p2 + k2(), s2 + (b2 ? 0 : k2()), n2 + (b2 ? 0 : k2())] }), g2;
}
function j(t2, e2, s2) {
  if (!t2.length) return [];
  const n2 = [];
  n2.push([t2[0][0] + G(e2, s2), t2[0][1] + G(e2, s2)]), n2.push([t2[0][0] + G(e2, s2), t2[0][1] + G(e2, s2)]);
  for (let o2 = 1; o2 < t2.length; o2++) n2.push([t2[o2][0] + G(e2, s2), t2[o2][1] + G(e2, s2)]), o2 === t2.length - 1 && n2.push([t2[o2][0] + G(e2, s2), t2[o2][1] + G(e2, s2)]);
  return q(n2, null, s2);
}
function q(t2, e2, s2) {
  const n2 = t2.length, o2 = [];
  if (n2 > 3) {
    const a2 = [], h2 = 1 - s2.curveTightness;
    o2.push({ op: "move", data: [t2[1][0], t2[1][1]] });
    for (let e3 = 1; e3 + 2 < n2; e3++) {
      const s3 = t2[e3];
      a2[0] = [s3[0], s3[1]], a2[1] = [s3[0] + (h2 * t2[e3 + 1][0] - h2 * t2[e3 - 1][0]) / 6, s3[1] + (h2 * t2[e3 + 1][1] - h2 * t2[e3 - 1][1]) / 6], a2[2] = [t2[e3 + 1][0] + (h2 * t2[e3][0] - h2 * t2[e3 + 2][0]) / 6, t2[e3 + 1][1] + (h2 * t2[e3][1] - h2 * t2[e3 + 2][1]) / 6], a2[3] = [t2[e3 + 1][0], t2[e3 + 1][1]], o2.push({ op: "bcurveTo", data: [a2[1][0], a2[1][1], a2[2][0], a2[2][1], a2[3][0], a2[3][1]] });
    }
  } else 3 === n2 ? (o2.push({ op: "move", data: [t2[1][0], t2[1][1]] }), o2.push({ op: "bcurveTo", data: [t2[1][0], t2[1][1], t2[2][0], t2[2][1], t2[2][0], t2[2][1]] })) : 2 === n2 && o2.push(...R(t2[0][0], t2[0][1], t2[1][0], t2[1][1], s2, true, true));
  return o2;
}
function F(t2, e2, s2, n2, o2, a2, h2, r2) {
  const i2 = [], c2 = [];
  if (0 === r2.roughness) {
    t2 /= 4, c2.push([e2 + n2 * Math.cos(-t2), s2 + o2 * Math.sin(-t2)]);
    for (let a3 = 0; a3 <= 2 * Math.PI; a3 += t2) {
      const t3 = [e2 + n2 * Math.cos(a3), s2 + o2 * Math.sin(a3)];
      i2.push(t3), c2.push(t3);
    }
    c2.push([e2 + n2 * Math.cos(0), s2 + o2 * Math.sin(0)]), c2.push([e2 + n2 * Math.cos(t2), s2 + o2 * Math.sin(t2)]);
  } else {
    const l2 = G(0.5, r2) - Math.PI / 2;
    c2.push([G(a2, r2) + e2 + 0.9 * n2 * Math.cos(l2 - t2), G(a2, r2) + s2 + 0.9 * o2 * Math.sin(l2 - t2)]);
    const u2 = 2 * Math.PI + l2 - 0.01;
    for (let h3 = l2; h3 < u2; h3 += t2) {
      const t3 = [G(a2, r2) + e2 + n2 * Math.cos(h3), G(a2, r2) + s2 + o2 * Math.sin(h3)];
      i2.push(t3), c2.push(t3);
    }
    c2.push([G(a2, r2) + e2 + n2 * Math.cos(l2 + 2 * Math.PI + 0.5 * h2), G(a2, r2) + s2 + o2 * Math.sin(l2 + 2 * Math.PI + 0.5 * h2)]), c2.push([G(a2, r2) + e2 + 0.98 * n2 * Math.cos(l2 + h2), G(a2, r2) + s2 + 0.98 * o2 * Math.sin(l2 + h2)]), c2.push([G(a2, r2) + e2 + 0.9 * n2 * Math.cos(l2 + 0.5 * h2), G(a2, r2) + s2 + 0.9 * o2 * Math.sin(l2 + 0.5 * h2)]);
  }
  return [c2, i2];
}
function V(t2, e2, s2, n2, o2, a2, h2, r2, i2) {
  const c2 = a2 + G(0.1, i2), l2 = [];
  l2.push([G(r2, i2) + e2 + 0.9 * n2 * Math.cos(c2 - t2), G(r2, i2) + s2 + 0.9 * o2 * Math.sin(c2 - t2)]);
  for (let a3 = c2; a3 <= h2; a3 += t2) l2.push([G(r2, i2) + e2 + n2 * Math.cos(a3), G(r2, i2) + s2 + o2 * Math.sin(a3)]);
  return l2.push([e2 + n2 * Math.cos(h2), s2 + o2 * Math.sin(h2)]), l2.push([e2 + n2 * Math.cos(h2), s2 + o2 * Math.sin(h2)]), q(l2, null, i2);
}
function Z(t2, e2, s2, n2, o2, a2, h2, r2) {
  const i2 = [], c2 = [r2.maxRandomnessOffset || 1, (r2.maxRandomnessOffset || 1) + 0.3];
  let l2 = [0, 0];
  const u2 = r2.disableMultiStroke ? 1 : 2, p2 = r2.preserveVertices;
  for (let f2 = 0; f2 < u2; f2++) 0 === f2 ? i2.push({ op: "move", data: [h2[0], h2[1]] }) : i2.push({ op: "move", data: [h2[0] + (p2 ? 0 : G(c2[0], r2)), h2[1] + (p2 ? 0 : G(c2[0], r2))] }), l2 = p2 ? [o2, a2] : [o2 + G(c2[f2], r2), a2 + G(c2[f2], r2)], i2.push({ op: "bcurveTo", data: [t2 + G(c2[f2], r2), e2 + G(c2[f2], r2), s2 + G(c2[f2], r2), n2 + G(c2[f2], r2), l2[0], l2[1]] });
  return i2;
}
function Q(t2) {
  return [...t2];
}
function H(t2, e2 = 0) {
  const s2 = t2.length;
  if (s2 < 3) throw new Error("A curve must have at least three points.");
  const n2 = [];
  if (3 === s2) n2.push(Q(t2[0]), Q(t2[1]), Q(t2[2]), Q(t2[2]));
  else {
    const s3 = [];
    s3.push(t2[0], t2[0]);
    for (let e3 = 1; e3 < t2.length; e3++) s3.push(t2[e3]), e3 === t2.length - 1 && s3.push(t2[e3]);
    const o2 = [], a2 = 1 - e2;
    n2.push(Q(s3[0]));
    for (let t3 = 1; t3 + 2 < s3.length; t3++) {
      const e3 = s3[t3];
      o2[0] = [e3[0], e3[1]], o2[1] = [e3[0] + (a2 * s3[t3 + 1][0] - a2 * s3[t3 - 1][0]) / 6, e3[1] + (a2 * s3[t3 + 1][1] - a2 * s3[t3 - 1][1]) / 6], o2[2] = [s3[t3 + 1][0] + (a2 * s3[t3][0] - a2 * s3[t3 + 2][0]) / 6, s3[t3 + 1][1] + (a2 * s3[t3][1] - a2 * s3[t3 + 2][1]) / 6], o2[3] = [s3[t3 + 1][0], s3[t3 + 1][1]], n2.push(o2[1], o2[2], o2[3]);
    }
  }
  return n2;
}
function N(t2, e2) {
  return Math.pow(t2[0] - e2[0], 2) + Math.pow(t2[1] - e2[1], 2);
}
function B(t2, e2, s2) {
  const n2 = N(e2, s2);
  if (0 === n2) return N(t2, e2);
  let o2 = ((t2[0] - e2[0]) * (s2[0] - e2[0]) + (t2[1] - e2[1]) * (s2[1] - e2[1])) / n2;
  return o2 = Math.max(0, Math.min(1, o2)), N(t2, J(e2, s2, o2));
}
function J(t2, e2, s2) {
  return [t2[0] + (e2[0] - t2[0]) * s2, t2[1] + (e2[1] - t2[1]) * s2];
}
function K(t2, e2, s2, n2) {
  const o2 = n2 || [];
  if ((function(t3, e3) {
    const s3 = t3[e3 + 0], n3 = t3[e3 + 1], o3 = t3[e3 + 2], a3 = t3[e3 + 3];
    let h3 = 3 * n3[0] - 2 * s3[0] - a3[0];
    h3 *= h3;
    let r2 = 3 * n3[1] - 2 * s3[1] - a3[1];
    r2 *= r2;
    let i2 = 3 * o3[0] - 2 * a3[0] - s3[0];
    i2 *= i2;
    let c2 = 3 * o3[1] - 2 * a3[1] - s3[1];
    return c2 *= c2, h3 < i2 && (h3 = i2), r2 < c2 && (r2 = c2), h3 + r2;
  })(t2, e2) < s2) {
    const s3 = t2[e2 + 0];
    if (o2.length) {
      (a2 = o2[o2.length - 1], h2 = s3, Math.sqrt(N(a2, h2))) > 1 && o2.push(s3);
    } else o2.push(s3);
    o2.push(t2[e2 + 3]);
  } else {
    const n3 = 0.5, a3 = t2[e2 + 0], h3 = t2[e2 + 1], r2 = t2[e2 + 2], i2 = t2[e2 + 3], c2 = J(a3, h3, n3), l2 = J(h3, r2, n3), u2 = J(r2, i2, n3), p2 = J(c2, l2, n3), f2 = J(l2, u2, n3), d2 = J(p2, f2, n3);
    K([a3, c2, p2, d2], 0, s2, o2), K([d2, f2, u2, i2], 0, s2, o2);
  }
  var a2, h2;
  return o2;
}
function U(t2, e2) {
  return X(t2, 0, t2.length, e2);
}
function X(t2, e2, s2, n2, o2) {
  const a2 = o2 || [], h2 = t2[e2], r2 = t2[s2 - 1];
  let i2 = 0, c2 = 1;
  for (let n3 = e2 + 1; n3 < s2 - 1; ++n3) {
    const e3 = B(t2[n3], h2, r2);
    e3 > i2 && (i2 = e3, c2 = n3);
  }
  return Math.sqrt(i2) > n2 ? (X(t2, e2, c2 + 1, n2, a2), X(t2, c2, s2, n2, a2)) : (a2.length || a2.push(h2), a2.push(r2)), a2;
}
function Y(t2, e2 = 0.15, s2) {
  const n2 = [], o2 = (t2.length - 1) / 3;
  for (let s3 = 0; s3 < o2; s3++) {
    K(t2, 3 * s3, e2, n2);
  }
  return s2 && s2 > 0 ? X(n2, 0, n2.length, s2) : n2;
}
const tt = "none";
class et {
  constructor(t2) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: false, disableMultiStrokeFill: false, preserveVertices: false, fillShapeRoughnessGain: 0.8 }, this.config = t2 || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(t2) {
    return t2 ? Object.assign({}, this.defaultOptions, t2) : this.defaultOptions;
  }
  _d(t2, e2, s2) {
    return { shape: t2, sets: e2 || [], options: s2 || this.defaultOptions };
  }
  line(t2, e2, s2, n2, o2) {
    const a2 = this._o(o2);
    return this._d("line", [v(t2, e2, s2, n2, a2)], a2);
  }
  rectangle(t2, e2, s2, n2, o2) {
    const a2 = this._o(o2), h2 = [], r2 = O(t2, e2, s2, n2, a2);
    if (a2.fill) {
      const o3 = [[t2, e2], [t2 + s2, e2], [t2 + s2, e2 + n2], [t2, e2 + n2]];
      "solid" === a2.fillStyle ? h2.push(I([o3], a2)) : h2.push(C([o3], a2));
    }
    return a2.stroke !== tt && h2.push(r2), this._d("rectangle", h2, a2);
  }
  ellipse(t2, e2, s2, n2, o2) {
    const a2 = this._o(o2), h2 = [], r2 = T(s2, n2, a2), i2 = D(t2, e2, a2, r2);
    if (a2.fill) if ("solid" === a2.fillStyle) {
      const s3 = D(t2, e2, a2, r2).opset;
      s3.type = "fillPath", h2.push(s3);
    } else h2.push(C([i2.estimatedPoints], a2));
    return a2.stroke !== tt && h2.push(i2.opset), this._d("ellipse", h2, a2);
  }
  circle(t2, e2, s2, n2) {
    const o2 = this.ellipse(t2, e2, s2, s2, n2);
    return o2.shape = "circle", o2;
  }
  linearPath(t2, e2) {
    const s2 = this._o(e2);
    return this._d("linearPath", [S(t2, false, s2)], s2);
  }
  arc(t2, e2, s2, n2, o2, a2, h2 = false, r2) {
    const i2 = this._o(r2), c2 = [], l2 = A(t2, e2, s2, n2, o2, a2, h2, true, i2);
    if (h2 && i2.fill) if ("solid" === i2.fillStyle) {
      const h3 = Object.assign({}, i2);
      h3.disableMultiStroke = true;
      const r3 = A(t2, e2, s2, n2, o2, a2, true, false, h3);
      r3.type = "fillPath", c2.push(r3);
    } else c2.push((function(t3, e3, s3, n3, o3, a3, h3) {
      const r3 = t3, i3 = e3;
      let c3 = Math.abs(s3 / 2), l3 = Math.abs(n3 / 2);
      c3 += G(0.01 * c3, h3), l3 += G(0.01 * l3, h3);
      let u2 = o3, p2 = a3;
      for (; u2 < 0; ) u2 += 2 * Math.PI, p2 += 2 * Math.PI;
      p2 - u2 > 2 * Math.PI && (u2 = 0, p2 = 2 * Math.PI);
      const f2 = (p2 - u2) / h3.curveStepCount, d2 = [];
      for (let t4 = u2; t4 <= p2; t4 += f2) d2.push([r3 + c3 * Math.cos(t4), i3 + l3 * Math.sin(t4)]);
      return d2.push([r3 + c3 * Math.cos(p2), i3 + l3 * Math.sin(p2)]), d2.push([r3, i3]), C([d2], h3);
    })(t2, e2, s2, n2, o2, a2, i2));
    return i2.stroke !== tt && c2.push(l2), this._d("arc", c2, i2);
  }
  curve(t2, e2) {
    const s2 = this._o(e2), n2 = [], o2 = L(t2, s2);
    if (s2.fill && s2.fill !== tt) if ("solid" === s2.fillStyle) {
      const e3 = L(t2, Object.assign(Object.assign({}, s2), { disableMultiStroke: true, roughness: s2.roughness ? s2.roughness + s2.fillShapeRoughnessGain : 0 }));
      n2.push({ type: "fillPath", ops: this._mergedShape(e3.ops) });
    } else {
      const e3 = [], o3 = t2;
      if (o3.length) {
        const t3 = "number" == typeof o3[0][0] ? [o3] : o3;
        for (const n3 of t3) n3.length < 3 ? e3.push(...n3) : 3 === n3.length ? e3.push(...Y(H([n3[0], n3[0], n3[1], n3[2]]), 10, (1 + s2.roughness) / 2)) : e3.push(...Y(H(n3), 10, (1 + s2.roughness) / 2));
      }
      e3.length && n2.push(C([e3], s2));
    }
    return s2.stroke !== tt && n2.push(o2), this._d("curve", n2, s2);
  }
  polygon(t2, e2) {
    const s2 = this._o(e2), n2 = [], o2 = S(t2, true, s2);
    return s2.fill && ("solid" === s2.fillStyle ? n2.push(I([t2], s2)) : n2.push(C([t2], s2))), s2.stroke !== tt && n2.push(o2), this._d("polygon", n2, s2);
  }
  path(t2, e2) {
    const s2 = this._o(e2), n2 = [];
    if (!t2) return this._d("path", n2, s2);
    t2 = (t2 || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const o2 = s2.fill && "transparent" !== s2.fill && s2.fill !== tt, a2 = s2.stroke !== tt, h2 = !!(s2.simplification && s2.simplification < 1), r2 = (function(t3, e3, s3) {
      const n3 = m(y(b(t3))), o3 = [];
      let a3 = [], h3 = [0, 0], r3 = [];
      const i3 = () => {
        r3.length >= 4 && a3.push(...Y(r3, e3)), r3 = [];
      }, c2 = () => {
        i3(), a3.length && (o3.push(a3), a3 = []);
      };
      for (const { key: t4, data: e4 } of n3) switch (t4) {
        case "M":
          c2(), h3 = [e4[0], e4[1]], a3.push(h3);
          break;
        case "L":
          i3(), a3.push([e4[0], e4[1]]);
          break;
        case "C":
          if (!r3.length) {
            const t5 = a3.length ? a3[a3.length - 1] : h3;
            r3.push([t5[0], t5[1]]);
          }
          r3.push([e4[0], e4[1]]), r3.push([e4[2], e4[3]]), r3.push([e4[4], e4[5]]);
          break;
        case "Z":
          i3(), a3.push([h3[0], h3[1]]);
      }
      if (c2(), !s3) return o3;
      const l2 = [];
      for (const t4 of o3) {
        const e4 = U(t4, s3);
        e4.length && l2.push(e4);
      }
      return l2;
    })(t2, 1, h2 ? 4 - 4 * (s2.simplification || 1) : (1 + s2.roughness) / 2), i2 = _(t2, s2);
    if (o2) if ("solid" === s2.fillStyle) if (1 === r2.length) {
      const e3 = _(t2, Object.assign(Object.assign({}, s2), { disableMultiStroke: true, roughness: s2.roughness ? s2.roughness + s2.fillShapeRoughnessGain : 0 }));
      n2.push({ type: "fillPath", ops: this._mergedShape(e3.ops) });
    } else n2.push(I(r2, s2));
    else n2.push(C(r2, s2));
    return a2 && (h2 ? r2.forEach(((t3) => {
      n2.push(S(t3, false, s2));
    })) : n2.push(i2)), this._d("path", n2, s2);
  }
  opsToPath(t2, e2) {
    let s2 = "";
    for (const n2 of t2.ops) {
      const t3 = "number" == typeof e2 && e2 >= 0 ? n2.data.map(((t4) => +t4.toFixed(e2))) : n2.data;
      switch (n2.op) {
        case "move":
          s2 += `M${t3[0]} ${t3[1]} `;
          break;
        case "bcurveTo":
          s2 += `C${t3[0]} ${t3[1]}, ${t3[2]} ${t3[3]}, ${t3[4]} ${t3[5]} `;
          break;
        case "lineTo":
          s2 += `L${t3[0]} ${t3[1]} `;
      }
    }
    return s2.trim();
  }
  toPaths(t2) {
    const e2 = t2.sets || [], s2 = t2.options || this.defaultOptions, n2 = [];
    for (const t3 of e2) {
      let e3 = null;
      switch (t3.type) {
        case "path":
          e3 = { d: this.opsToPath(t3), stroke: s2.stroke, strokeWidth: s2.strokeWidth, fill: tt };
          break;
        case "fillPath":
          e3 = { d: this.opsToPath(t3), stroke: tt, strokeWidth: 0, fill: s2.fill || tt };
          break;
        case "fillSketch":
          e3 = this.fillSketch(t3, s2);
      }
      e3 && n2.push(e3);
    }
    return n2;
  }
  fillSketch(t2, e2) {
    let s2 = e2.fillWeight;
    return s2 < 0 && (s2 = e2.strokeWidth / 2), { d: this.opsToPath(t2), stroke: e2.fill || tt, strokeWidth: s2, fill: tt };
  }
  _mergedShape(t2) {
    return t2.filter(((t3, e2) => 0 === e2 || "move" !== t3.op));
  }
}
class st {
  constructor(t2, e2) {
    this.canvas = t2, this.ctx = this.canvas.getContext("2d"), this.gen = new et(e2);
  }
  draw(t2) {
    const e2 = t2.sets || [], s2 = t2.options || this.getDefaultOptions(), n2 = this.ctx, o2 = t2.options.fixedDecimalPlaceDigits;
    for (const a2 of e2) switch (a2.type) {
      case "path":
        n2.save(), n2.strokeStyle = "none" === s2.stroke ? "transparent" : s2.stroke, n2.lineWidth = s2.strokeWidth, s2.strokeLineDash && n2.setLineDash(s2.strokeLineDash), s2.strokeLineDashOffset && (n2.lineDashOffset = s2.strokeLineDashOffset), this._drawToContext(n2, a2, o2), n2.restore();
        break;
      case "fillPath": {
        n2.save(), n2.fillStyle = s2.fill || "";
        const e3 = "curve" === t2.shape || "polygon" === t2.shape || "path" === t2.shape ? "evenodd" : "nonzero";
        this._drawToContext(n2, a2, o2, e3), n2.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(n2, a2, s2);
    }
  }
  fillSketch(t2, e2, s2) {
    let n2 = s2.fillWeight;
    n2 < 0 && (n2 = s2.strokeWidth / 2), t2.save(), s2.fillLineDash && t2.setLineDash(s2.fillLineDash), s2.fillLineDashOffset && (t2.lineDashOffset = s2.fillLineDashOffset), t2.strokeStyle = s2.fill || "", t2.lineWidth = n2, this._drawToContext(t2, e2, s2.fixedDecimalPlaceDigits), t2.restore();
  }
  _drawToContext(t2, e2, s2, n2 = "nonzero") {
    t2.beginPath();
    for (const n3 of e2.ops) {
      const e3 = "number" == typeof s2 && s2 >= 0 ? n3.data.map(((t3) => +t3.toFixed(s2))) : n3.data;
      switch (n3.op) {
        case "move":
          t2.moveTo(e3[0], e3[1]);
          break;
        case "bcurveTo":
          t2.bezierCurveTo(e3[0], e3[1], e3[2], e3[3], e3[4], e3[5]);
          break;
        case "lineTo":
          t2.lineTo(e3[0], e3[1]);
      }
    }
    "fillPath" === e2.type ? t2.fill(n2) : t2.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(t2, e2, s2, n2, o2) {
    const a2 = this.gen.line(t2, e2, s2, n2, o2);
    return this.draw(a2), a2;
  }
  rectangle(t2, e2, s2, n2, o2) {
    const a2 = this.gen.rectangle(t2, e2, s2, n2, o2);
    return this.draw(a2), a2;
  }
  ellipse(t2, e2, s2, n2, o2) {
    const a2 = this.gen.ellipse(t2, e2, s2, n2, o2);
    return this.draw(a2), a2;
  }
  circle(t2, e2, s2, n2) {
    const o2 = this.gen.circle(t2, e2, s2, n2);
    return this.draw(o2), o2;
  }
  linearPath(t2, e2) {
    const s2 = this.gen.linearPath(t2, e2);
    return this.draw(s2), s2;
  }
  polygon(t2, e2) {
    const s2 = this.gen.polygon(t2, e2);
    return this.draw(s2), s2;
  }
  arc(t2, e2, s2, n2, o2, a2, h2 = false, r2) {
    const i2 = this.gen.arc(t2, e2, s2, n2, o2, a2, h2, r2);
    return this.draw(i2), i2;
  }
  curve(t2, e2) {
    const s2 = this.gen.curve(t2, e2);
    return this.draw(s2), s2;
  }
  path(t2, e2) {
    const s2 = this.gen.path(t2, e2);
    return this.draw(s2), s2;
  }
}
const nt = "http://www.w3.org/2000/svg";
class ot {
  constructor(t2, e2) {
    this.svg = t2, this.gen = new et(e2);
  }
  draw(t2) {
    const e2 = t2.sets || [], s2 = t2.options || this.getDefaultOptions(), n2 = this.svg.ownerDocument || window.document, o2 = n2.createElementNS(nt, "g"), a2 = t2.options.fixedDecimalPlaceDigits;
    for (const h2 of e2) {
      let e3 = null;
      switch (h2.type) {
        case "path":
          e3 = n2.createElementNS(nt, "path"), e3.setAttribute("d", this.opsToPath(h2, a2)), e3.setAttribute("stroke", s2.stroke), e3.setAttribute("stroke-width", s2.strokeWidth + ""), e3.setAttribute("fill", "none"), s2.strokeLineDash && e3.setAttribute("stroke-dasharray", s2.strokeLineDash.join(" ").trim()), s2.strokeLineDashOffset && e3.setAttribute("stroke-dashoffset", `${s2.strokeLineDashOffset}`);
          break;
        case "fillPath":
          e3 = n2.createElementNS(nt, "path"), e3.setAttribute("d", this.opsToPath(h2, a2)), e3.setAttribute("stroke", "none"), e3.setAttribute("stroke-width", "0"), e3.setAttribute("fill", s2.fill || ""), "curve" !== t2.shape && "polygon" !== t2.shape || e3.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          e3 = this.fillSketch(n2, h2, s2);
      }
      e3 && o2.appendChild(e3);
    }
    return o2;
  }
  fillSketch(t2, e2, s2) {
    let n2 = s2.fillWeight;
    n2 < 0 && (n2 = s2.strokeWidth / 2);
    const o2 = t2.createElementNS(nt, "path");
    return o2.setAttribute("d", this.opsToPath(e2, s2.fixedDecimalPlaceDigits)), o2.setAttribute("stroke", s2.fill || ""), o2.setAttribute("stroke-width", n2 + ""), o2.setAttribute("fill", "none"), s2.fillLineDash && o2.setAttribute("stroke-dasharray", s2.fillLineDash.join(" ").trim()), s2.fillLineDashOffset && o2.setAttribute("stroke-dashoffset", `${s2.fillLineDashOffset}`), o2;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(t2, e2) {
    return this.gen.opsToPath(t2, e2);
  }
  line(t2, e2, s2, n2, o2) {
    const a2 = this.gen.line(t2, e2, s2, n2, o2);
    return this.draw(a2);
  }
  rectangle(t2, e2, s2, n2, o2) {
    const a2 = this.gen.rectangle(t2, e2, s2, n2, o2);
    return this.draw(a2);
  }
  ellipse(t2, e2, s2, n2, o2) {
    const a2 = this.gen.ellipse(t2, e2, s2, n2, o2);
    return this.draw(a2);
  }
  circle(t2, e2, s2, n2) {
    const o2 = this.gen.circle(t2, e2, s2, n2);
    return this.draw(o2);
  }
  linearPath(t2, e2) {
    const s2 = this.gen.linearPath(t2, e2);
    return this.draw(s2);
  }
  polygon(t2, e2) {
    const s2 = this.gen.polygon(t2, e2);
    return this.draw(s2);
  }
  arc(t2, e2, s2, n2, o2, a2, h2 = false, r2) {
    const i2 = this.gen.arc(t2, e2, s2, n2, o2, a2, h2, r2);
    return this.draw(i2);
  }
  curve(t2, e2) {
    const s2 = this.gen.curve(t2, e2);
    return this.draw(s2);
  }
  path(t2, e2) {
    const s2 = this.gen.path(t2, e2);
    return this.draw(s2);
  }
}
var at = { canvas: (t2, e2) => new st(t2, e2), svg: (t2, e2) => new ot(t2, e2), generator: (t2) => new et(t2), newSeed: () => et.newSeed() };
var labelHelper = /* @__PURE__ */ __name(async (parent, node, _classes) => {
  var _a2, _b2;
  let cssClasses;
  const useHtmlLabels = node.useHtmlLabels || evaluate((_a2 = getConfig2()) == null ? void 0 : _a2.htmlLabels);
  if (!_classes) {
    cssClasses = "node default";
  } else {
    cssClasses = _classes;
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const labelEl = shapeSvg.insert("g").attr("class", "label").attr("style", handleUndefinedAttr(node.labelStyle));
  let label;
  if (node.label === void 0) {
    label = "";
  } else {
    label = typeof node.label === "string" ? node.label : node.label[0];
  }
  const text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig2()), {
    useHtmlLabels,
    width: node.width || ((_b2 = getConfig2().flowchart) == null ? void 0 : _b2.wrappingWidth),
    // @ts-expect-error -- This is currently not used. Should this be `classes` instead?
    cssClasses: "markdown-node-label",
    style: node.labelStyle,
    addSvgBackground: !!node.icon || !!node.img
  });
  let bbox = text2.getBBox();
  const halfPadding = ((node == null ? void 0 : node.padding) ?? 0) / 2;
  if (useHtmlLabels) {
    const div = text2.children[0];
    const dv = select(text2);
    const images = div.getElementsByTagName("img");
    if (images) {
      const noImgText = label.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...images].map(
          (img) => new Promise((res) => {
            function setupImage() {
              img.style.display = "flex";
              img.style.flexDirection = "column";
              if (noImgText) {
                const bodyFontSize = getConfig2().fontSize ? getConfig2().fontSize : window.getComputedStyle(document.body).fontSize;
                const enlargingFactor = 5;
                const [parsedBodyFontSize = defaultConfig_default.fontSize] = parseFontSize(bodyFontSize);
                const width = parsedBodyFontSize * enlargingFactor + "px";
                img.style.minWidth = width;
                img.style.maxWidth = width;
              } else {
                img.style.width = "100%";
              }
              res(img);
            }
            __name(setupImage, "setupImage");
            setTimeout(() => {
              if (img.complete) {
                setupImage();
              }
            });
            img.addEventListener("error", setupImage);
            img.addEventListener("load", setupImage);
          })
        )
      );
    }
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  if (useHtmlLabels) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  } else {
    labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
  }
  if (node.centerLabel) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  }
  labelEl.insert("rect", ":first-child");
  return { shapeSvg, bbox, halfPadding, label: labelEl };
}, "labelHelper");
var insertLabel = /* @__PURE__ */ __name(async (parent, label, options) => {
  var _a2, _b2, _c2, _d2, _e2, _f2;
  const useHtmlLabels = options.useHtmlLabels || evaluate((_b2 = (_a2 = getConfig2()) == null ? void 0 : _a2.flowchart) == null ? void 0 : _b2.htmlLabels);
  const labelEl = parent.insert("g").attr("class", "label").attr("style", options.labelStyle || "");
  const text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig2()), {
    useHtmlLabels,
    width: options.width || ((_d2 = (_c2 = getConfig2()) == null ? void 0 : _c2.flowchart) == null ? void 0 : _d2.wrappingWidth),
    style: options.labelStyle,
    addSvgBackground: !!options.icon || !!options.img
  });
  let bbox = text2.getBBox();
  const halfPadding = options.padding / 2;
  if (evaluate((_f2 = (_e2 = getConfig2()) == null ? void 0 : _e2.flowchart) == null ? void 0 : _f2.htmlLabels)) {
    const div = text2.children[0];
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  if (useHtmlLabels) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  } else {
    labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
  }
  if (options.centerLabel) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  }
  labelEl.insert("rect", ":first-child");
  return { shapeSvg: parent, bbox, halfPadding, label: labelEl };
}, "insertLabel");
var updateNodeBounds = /* @__PURE__ */ __name((node, element) => {
  const bbox = element.node().getBBox();
  node.width = bbox.width;
  node.height = bbox.height;
}, "updateNodeBounds");
var getNodeClasses = /* @__PURE__ */ __name((node, extra) => (node.look === "handDrawn" ? "rough-node" : "node") + " " + node.cssClasses + " " + (extra || ""), "getNodeClasses");
function createPathFromPoints(points) {
  const pointStrings = points.map((p2, i2) => `${i2 === 0 ? "M" : "L"}${p2.x},${p2.y}`);
  pointStrings.push("Z");
  return pointStrings.join(" ");
}
__name(createPathFromPoints, "createPathFromPoints");
function generateFullSineWavePoints(x1, y1, x2, y2, amplitude, numCycles) {
  const points = [];
  const steps = 50;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const cycleLength = deltaX / numCycles;
  const frequency = 2 * Math.PI / cycleLength;
  const midY = y1 + deltaY / 2;
  for (let i2 = 0; i2 <= steps; i2++) {
    const t2 = i2 / steps;
    const x3 = x1 + t2 * deltaX;
    const y3 = midY + amplitude * Math.sin(frequency * (x3 - x1));
    points.push({ x: x3, y: y3 });
  }
  return points;
}
__name(generateFullSineWavePoints, "generateFullSineWavePoints");
function generateCirclePoints(centerX, centerY, radius, numPoints, startAngle, endAngle) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i2 = 0; i2 < numPoints; i2++) {
    const angle = startAngleRad + i2 * angleStep;
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    points.push({ x: -x2, y: -y2 });
  }
  return points;
}
__name(generateCirclePoints, "generateCirclePoints");
var intersectRect = /* @__PURE__ */ __name((node, point2) => {
  var x2 = node.x;
  var y2 = node.y;
  var dx = point2.x - x2;
  var dy = point2.y - y2;
  var w2 = node.width / 2;
  var h2 = node.height / 2;
  var sx, sy;
  if (Math.abs(dy) * w2 > Math.abs(dx) * h2) {
    if (dy < 0) {
      h2 = -h2;
    }
    sx = dy === 0 ? 0 : h2 * dx / dy;
    sy = h2;
  } else {
    if (dx < 0) {
      w2 = -w2;
    }
    sx = w2;
    sy = dx === 0 ? 0 : w2 * dy / dx;
  }
  return { x: x2 + sx, y: y2 + sy };
}, "intersectRect");
var intersect_rect_default = intersectRect;
function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
__name(applyStyle, "applyStyle");
async function addHtmlLabel(node) {
  const fo = select(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"));
  const div = fo.append("xhtml:div");
  const config2 = getConfig2();
  let label = node.label;
  if (node.label && hasKatex(node.label)) {
    label = await renderKatexSanitized(node.label.replace(common_default.lineBreakRegex, "\n"), config2);
  }
  const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
  const labelSpan = '<span class="' + labelClass + '" ' + (node.labelStyle ? 'style="' + node.labelStyle + '"' : "") + // codeql [js/html-constructed-from-input] : false positive
  ">" + label + "</span>";
  div.html(sanitizeText(labelSpan, config2));
  applyStyle(div, node.labelStyle);
  div.style("display", "inline-block");
  div.style("padding-right", "1px");
  div.style("white-space", "nowrap");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  return fo.node();
}
__name(addHtmlLabel, "addHtmlLabel");
var createLabel = /* @__PURE__ */ __name(async (_vertexText, style, isTitle, isNode) => {
  let vertexText = _vertexText || "";
  if (typeof vertexText === "object") {
    vertexText = vertexText[0];
  }
  if (evaluate(getConfig2().flowchart.htmlLabels)) {
    vertexText = vertexText.replace(/\\n|\n/g, "<br />");
    log.info("vertexText" + vertexText);
    const node = {
      isNode,
      label: decodeEntities(vertexText).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s2) => `<i class='${s2.replace(":", " ")}'></i>`
      ),
      labelStyle: style ? style.replace("fill:", "color:") : style
    };
    let vertexNode = await addHtmlLabel(node);
    return vertexNode;
  } else {
    const svgLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgLabel.setAttribute("style", style.replace("color:", "fill:"));
    let rows = [];
    if (typeof vertexText === "string") {
      rows = vertexText.split(/\\n|\n|<br\s*\/?>/gi);
    } else if (Array.isArray(vertexText)) {
      rows = vertexText;
    } else {
      rows = [];
    }
    for (const row of rows) {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
      tspan.setAttribute("dy", "1em");
      tspan.setAttribute("x", "0");
      if (isTitle) {
        tspan.setAttribute("class", "title-row");
      } else {
        tspan.setAttribute("class", "row");
      }
      tspan.textContent = row.trim();
      svgLabel.appendChild(tspan);
    }
    return svgLabel;
  }
}, "createLabel");
var createLabel_default = createLabel;
var createRoundedRectPathD = /* @__PURE__ */ __name((x2, y2, totalWidth, totalHeight, radius) => [
  "M",
  x2 + radius,
  y2,
  // Move to the first point
  "H",
  x2 + totalWidth - radius,
  // Draw horizontal line to the beginning of the right corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x2 + totalWidth,
  y2 + radius,
  // Draw arc to the right top corner
  "V",
  y2 + totalHeight - radius,
  // Draw vertical line down to the beginning of the right bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x2 + totalWidth - radius,
  y2 + totalHeight,
  // Draw arc to the right bottom corner
  "H",
  x2 + radius,
  // Draw horizontal line to the beginning of the left bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x2,
  y2 + totalHeight - radius,
  // Draw arc to the left bottom corner
  "V",
  y2 + radius,
  // Draw vertical line up to the beginning of the left top corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x2 + radius,
  y2,
  // Draw arc to the left top corner
  "Z"
  // Close the path
].join(" "), "createRoundedRectPathD");
var rect = /* @__PURE__ */ __name(async (parent, node) => {
  log.info("Creating subgraph rect for ", node.id, node);
  const siteConfig2 = getConfig2();
  const { themeVariables, handDrawnSeed } = siteConfig2;
  const { clusterBkg, clusterBorder } = themeVariables;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.id).attr("data-look", node.look);
  const useHtmlLabels = evaluate(siteConfig2.flowchart.htmlLabels);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
  const text2 = await createText(labelEl, node.label, {
    style: node.labelStyle,
    useHtmlLabels,
    isNode: true
  });
  let bbox = text2.getBBox();
  if (evaluate(siteConfig2.flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x2 = node.x - width / 2;
  const y2 = node.y - height / 2;
  log.trace("Data ", node, JSON.stringify(node));
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {
      roughness: 0.7,
      fill: clusterBkg,
      // fill: 'red',
      stroke: clusterBorder,
      fillWeight: 3,
      seed: handDrawnSeed
    });
    const roughNode = rc.path(createRoundedRectPathD(x2, y2, width, height, 0), options);
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
    rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
    rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x2).attr("y", y2).attr("width", width).attr("height", height);
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig2);
  labelEl.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
  );
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  const rectBox = rect2.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "rect");
var noteGroup = /* @__PURE__ */ __name((parent, node) => {
  const shapeSvg = parent.insert("g").attr("class", "note-cluster").attr("id", node.id);
  const rect2 = shapeSvg.insert("rect", ":first-child");
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  rect2.attr("rx", node.rx).attr("ry", node.ry).attr("x", node.x - node.width / 2 - halfPadding).attr("y", node.y - node.height / 2 - halfPadding).attr("width", node.width + padding).attr("height", node.height + padding).attr("fill", "none");
  const rectBox = rect2.node().getBBox();
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: { width: 0, height: 0 } };
}, "noteGroup");
var roundedWithTitle = /* @__PURE__ */ __name(async (parent, node) => {
  const siteConfig2 = getConfig2();
  const { themeVariables, handDrawnSeed } = siteConfig2;
  const { altBackground, compositeBackground, compositeTitleBackground, nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-id", node.id).attr("data-look", node.look);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const label = shapeSvg.insert("g").attr("class", "cluster-label");
  let innerRect = shapeSvg.append("rect");
  const text2 = label.node().appendChild(await createLabel_default(node.label, node.labelStyle, void 0, true));
  let bbox = text2.getBBox();
  if (evaluate(siteConfig2.flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  const width = (node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width) + padding;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height + padding;
  const innerHeight = node.height + padding - bbox.height - 6;
  const x2 = node.x - width / 2;
  const y2 = node.y - height / 2;
  node.width = width;
  const innerY = node.y - node.height / 2 - halfPadding + bbox.height + 2;
  let rect2;
  if (node.look === "handDrawn") {
    const isAlt = node.cssClasses.includes("statediagram-cluster-alt");
    const rc = at.svg(shapeSvg);
    const roughOuterNode = node.rx || node.ry ? rc.path(createRoundedRectPathD(x2, y2, width, height, 10), {
      roughness: 0.7,
      fill: compositeTitleBackground,
      fillStyle: "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    }) : rc.rectangle(x2, y2, width, height, { seed: handDrawnSeed });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    const roughInnerNode = rc.rectangle(x2, innerY, width, innerHeight, {
      fill: isAlt ? altBackground : compositeBackground,
      fillStyle: isAlt ? "hachure" : "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    innerRect = shapeSvg.insert(() => roughInnerNode);
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    const outerRectClass = "outer";
    rect2.attr("class", outerRectClass).attr("x", x2).attr("y", y2).attr("width", width).attr("height", height).attr("data-look", node.look);
    innerRect.attr("class", "inner").attr("x", x2).attr("y", innerY).attr("width", width).attr("height", innerHeight);
  }
  label.attr(
    "transform",
    `translate(${node.x - bbox.width / 2}, ${y2 + 1 - (evaluate(siteConfig2.flowchart.htmlLabels) ? 0 : 3)})`
  );
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = bbox.height - node.padding / 2;
  node.labelBBox = bbox;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "roundedWithTitle");
var kanbanSection = /* @__PURE__ */ __name(async (parent, node) => {
  log.info("Creating subgraph rect for ", node.id, node);
  const siteConfig2 = getConfig2();
  const { themeVariables, handDrawnSeed } = siteConfig2;
  const { clusterBkg, clusterBorder } = themeVariables;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.id).attr("data-look", node.look);
  const useHtmlLabels = evaluate(siteConfig2.flowchart.htmlLabels);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
  const text2 = await createText(labelEl, node.label, {
    style: node.labelStyle,
    useHtmlLabels,
    isNode: true,
    width: node.width
  });
  let bbox = text2.getBBox();
  if (evaluate(siteConfig2.flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x2 = node.x - width / 2;
  const y2 = node.y - height / 2;
  log.trace("Data ", node, JSON.stringify(node));
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {
      roughness: 0.7,
      fill: clusterBkg,
      // fill: 'red',
      stroke: clusterBorder,
      fillWeight: 4,
      seed: handDrawnSeed
    });
    const roughNode = rc.path(createRoundedRectPathD(x2, y2, width, height, node.rx), options);
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
    rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
    rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x2).attr("y", y2).attr("width", width).attr("height", height);
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig2);
  labelEl.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
  );
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  const rectBox = rect2.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "kanbanSection");
var divider = /* @__PURE__ */ __name((parent, node) => {
  const siteConfig2 = getConfig2();
  const { themeVariables, handDrawnSeed } = siteConfig2;
  const { nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-look", node.look);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const padding = 0 * node.padding;
  const width = node.width + padding;
  node.diff = -node.padding;
  const height = node.height + padding;
  const x2 = node.x - width / 2;
  const y2 = node.y - height / 2;
  node.width = width;
  let rect2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughOuterNode = rc.rectangle(x2, y2, width, height, {
      fill: "lightgrey",
      roughness: 0.5,
      strokeLineDash: [5],
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    const outerRectClass = "divider";
    rect2.attr("class", outerRectClass).attr("x", x2).attr("y", y2).attr("width", width).attr("height", height).attr("data-look", node.look);
  }
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = 0;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: {} };
}, "divider");
var squareRect = rect;
var shapes = {
  rect,
  squareRect,
  roundedWithTitle,
  noteGroup,
  divider,
  kanbanSection
};
var clusterElems = /* @__PURE__ */ new Map();
var insertCluster = /* @__PURE__ */ __name(async (elem, node) => {
  const shape = node.shape || "rect";
  const cluster = await shapes[shape](elem, node);
  clusterElems.set(node.id, cluster);
  return cluster;
}, "insertCluster");
var clear$1 = /* @__PURE__ */ __name(() => {
  clusterElems = /* @__PURE__ */ new Map();
}, "clear");
function intersectNode(node, point2) {
  return node.intersect(point2);
}
__name(intersectNode, "intersectNode");
var intersect_node_default = intersectNode;
function intersectEllipse(node, rx, ry, point2) {
  var cx = node.x;
  var cy = node.y;
  var px = cx - point2.x;
  var py = cy - point2.y;
  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);
  var dx = Math.abs(rx * ry * px / det);
  if (point2.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point2.y < cy) {
    dy = -dy;
  }
  return { x: cx + dx, y: cy + dy };
}
__name(intersectEllipse, "intersectEllipse");
var intersect_ellipse_default = intersectEllipse;
function intersectCircle(node, rx, point2) {
  return intersect_ellipse_default(node, rx, rx, point2);
}
__name(intersectCircle, "intersectCircle");
var intersect_circle_default = intersectCircle;
function intersectLine(p1, p2, q1, q2) {
  {
    const a1 = p2.y - p1.y;
    const b1 = p1.x - p2.x;
    const c1 = p2.x * p1.y - p1.x * p2.y;
    const r3 = a1 * q1.x + b1 * q1.y + c1;
    const r4 = a1 * q2.x + b1 * q2.y + c1;
    const epsilon2 = 1e-6;
    if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
      return;
    }
    const a2 = q2.y - q1.y;
    const b2 = q1.x - q2.x;
    const c2 = q2.x * q1.y - q1.x * q2.y;
    const r1 = a2 * p1.x + b2 * p1.y + c2;
    const r2 = a2 * p2.x + b2 * p2.y + c2;
    if (Math.abs(r1) < epsilon2 && Math.abs(r2) < epsilon2 && sameSign(r1, r2)) {
      return;
    }
    const denom = a1 * b2 - a2 * b1;
    if (denom === 0) {
      return;
    }
    const offset = Math.abs(denom / 2);
    let num = b1 * c2 - b2 * c1;
    const x2 = num < 0 ? (num - offset) / denom : (num + offset) / denom;
    num = a2 * c1 - a1 * c2;
    const y2 = num < 0 ? (num - offset) / denom : (num + offset) / denom;
    return { x: x2, y: y2 };
  }
}
__name(intersectLine, "intersectLine");
function sameSign(r1, r2) {
  return r1 * r2 > 0;
}
__name(sameSign, "sameSign");
var intersect_line_default = intersectLine;
function intersectPolygon(node, polyPoints, point2) {
  let x1 = node.x;
  let y1 = node.y;
  let intersections = [];
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  if (typeof polyPoints.forEach === "function") {
    polyPoints.forEach(function(entry) {
      minX = Math.min(minX, entry.x);
      minY = Math.min(minY, entry.y);
    });
  } else {
    minX = Math.min(minX, polyPoints.x);
    minY = Math.min(minY, polyPoints.y);
  }
  let left = x1 - node.width / 2 - minX;
  let top = y1 - node.height / 2 - minY;
  for (let i2 = 0; i2 < polyPoints.length; i2++) {
    let p1 = polyPoints[i2];
    let p2 = polyPoints[i2 < polyPoints.length - 1 ? i2 + 1 : 0];
    let intersect = intersect_line_default(
      node,
      point2,
      { x: left + p1.x, y: top + p1.y },
      { x: left + p2.x, y: top + p2.y }
    );
    if (intersect) {
      intersections.push(intersect);
    }
  }
  if (!intersections.length) {
    return node;
  }
  if (intersections.length > 1) {
    intersections.sort(function(p2, q2) {
      let pdx = p2.x - point2.x;
      let pdy = p2.y - point2.y;
      let distp = Math.sqrt(pdx * pdx + pdy * pdy);
      let qdx = q2.x - point2.x;
      let qdy = q2.y - point2.y;
      let distq = Math.sqrt(qdx * qdx + qdy * qdy);
      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
}
__name(intersectPolygon, "intersectPolygon");
var intersect_polygon_default = intersectPolygon;
var intersect_default = {
  node: intersect_node_default,
  circle: intersect_circle_default,
  ellipse: intersect_ellipse_default,
  polygon: intersect_polygon_default,
  rect: intersect_rect_default
};
function anchor(parent, node) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const classes = getNodeClasses(node);
  let cssClasses = classes;
  if (!classes) {
    cssClasses = "anchor";
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const radius = 1;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "black", stroke: "none", fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const roughNode = rc.circle(0, 0, radius * 2, options);
  const circleElem = shapeSvg.insert(() => roughNode, ":first-child");
  circleElem.attr("class", "anchor").attr("style", handleUndefinedAttr(cssStyles));
  updateNodeBounds(node, circleElem);
  node.intersect = function(point2) {
    log.info("Circle intersect", node, radius, point2);
    return intersect_default.circle(node, radius, point2);
  };
  return shapeSvg;
}
__name(anchor, "anchor");
function generateArcPoints(x1, y1, x2, y2, rx, ry, clockwise) {
  const numPoints = 20;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const dx = (x2 - x1) / 2;
  const dy = (y2 - y1) / 2;
  const transformedX = dx / rx;
  const transformedY = dy / ry;
  const distance2 = Math.sqrt(transformedX ** 2 + transformedY ** 2);
  if (distance2 > 1) {
    throw new Error("The given radii are too small to create an arc between the points.");
  }
  const scaledCenterDistance = Math.sqrt(1 - distance2 ** 2);
  const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
  const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
  const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
  const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
  let angleRange = endAngle - startAngle;
  if (clockwise && angleRange < 0) {
    angleRange += 2 * Math.PI;
  }
  if (!clockwise && angleRange > 0) {
    angleRange -= 2 * Math.PI;
  }
  const points = [];
  for (let i2 = 0; i2 < numPoints; i2++) {
    const t2 = i2 / (numPoints - 1);
    const angle2 = startAngle + t2 * angleRange;
    const x3 = centerX + rx * Math.cos(angle2);
    const y3 = centerY + ry * Math.sin(angle2);
    points.push({ x: x3, y: y3 });
  }
  return points;
}
__name(generateArcPoints, "generateArcPoints");
async function bowTieRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + node.padding + 20;
  const h2 = bbox.height + node.padding;
  const ry = h2 / 2;
  const rx = ry / (2.5 + h2 / 50);
  const { cssStyles } = node;
  const points = [
    { x: w2 / 2, y: -h2 / 2 },
    { x: -w2 / 2, y: -h2 / 2 },
    ...generateArcPoints(-w2 / 2, -h2 / 2, -w2 / 2, h2 / 2, rx, ry, false),
    { x: w2 / 2, y: h2 / 2 },
    ...generateArcPoints(w2 / 2, h2 / 2, w2 / 2, -h2 / 2, rx, ry, true)
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const bowTieRectPath = createPathFromPoints(points);
  const bowTieRectShapePath = rc.path(bowTieRectPath, options);
  const bowTieRectShape = shapeSvg.insert(() => bowTieRectShapePath, ":first-child");
  bowTieRectShape.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", nodeStyles);
  }
  bowTieRectShape.attr("transform", `translate(${rx / 2}, 0)`);
  updateNodeBounds(node, bowTieRectShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(bowTieRect, "bowTieRect");
function insertPolygonShape(parent, w2, h2, points) {
  return parent.insert("polygon", ":first-child").attr(
    "points",
    points.map(function(d2) {
      return d2.x + "," + d2.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -w2 / 2 + "," + h2 / 2 + ")");
}
__name(insertPolygonShape, "insertPolygonShape");
async function card(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h2 = bbox.height + node.padding;
  const padding = 12;
  const w2 = bbox.width + node.padding + padding;
  const left = 0;
  const right = w2;
  const top = -h2;
  const bottom = 0;
  const points = [
    { x: left + padding, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: left, y: top + padding },
    { x: left + padding, y: top }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w2 / 2}, ${h2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w2, h2, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(card, "card");
function choice(parent, node) {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const s2 = Math.max(28, node.width ?? 0);
  const points = [
    { x: 0, y: s2 / 2 },
    { x: s2 / 2, y: 0 },
    { x: 0, y: -s2 / 2 },
    { x: -s2 / 2, y: 0 }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const choicePath = createPathFromPoints(points);
  const roughNode = rc.path(choicePath, options);
  const choiceShape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", nodeStyles);
  }
  node.width = 28;
  node.height = 28;
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(choice, "choice");
async function circle$1(parent, node, options) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const padding = (options == null ? void 0 : options.padding) ?? halfPadding;
  const radius = bbox.width / 2 + padding;
  let circleElem;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(node, {});
    const roughNode = rc.circle(0, 0, radius * 2, options2);
    circleElem = shapeSvg.insert(() => roughNode, ":first-child");
    circleElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    circleElem = shapeSvg.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("r", radius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleElem);
  node.calcIntersect = function(bounds, point2) {
    const radius2 = bounds.width / 2;
    return intersect_default.circle(bounds, radius2, point2);
  };
  node.intersect = function(point2) {
    log.info("Circle intersect", node, radius, point2);
    return intersect_default.circle(node, radius, point2);
  };
  return shapeSvg;
}
__name(circle$1, "circle");
function createLine(r2) {
  const xAxis45 = Math.cos(Math.PI / 4);
  const yAxis45 = Math.sin(Math.PI / 4);
  const lineLength = r2 * 2;
  const pointQ1 = { x: lineLength / 2 * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ2 = { x: -(lineLength / 2) * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ3 = { x: -(lineLength / 2) * xAxis45, y: -(lineLength / 2) * yAxis45 };
  const pointQ4 = { x: lineLength / 2 * xAxis45, y: -(lineLength / 2) * yAxis45 };
  return `M ${pointQ2.x},${pointQ2.y} L ${pointQ4.x},${pointQ4.y}
                   M ${pointQ1.x},${pointQ1.y} L ${pointQ3.x},${pointQ3.y}`;
}
__name(createLine, "createLine");
function crossedCircle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = Math.max(30, (node == null ? void 0 : node.width) ?? 0);
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const linePath = createLine(radius);
  const lineNode = rc.path(linePath, options);
  const crossedCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  crossedCircle2.insert(() => lineNode);
  if (cssStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, crossedCircle2);
  node.intersect = function(point2) {
    log.info("crossedCircle intersect", node, { radius, point: point2 });
    const pos = intersect_default.circle(node, radius, point2);
    return pos;
  };
  return shapeSvg;
}
__name(crossedCircle, "crossedCircle");
function generateCirclePoints2(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i2 = 0; i2 < numPoints; i2++) {
    const angle = startAngleRad + i2 * angleStep;
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    points.push({ x: -x2, y: -y2 });
  }
  return points;
}
__name(generateCirclePoints2, "generateCirclePoints");
async function curlyBraceLeft(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + (node.padding ?? 0);
  const h2 = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h2 * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints2(w2 / 2, -h2 / 2, radius, 30, -90, 0),
    { x: -w2 / 2 - radius, y: radius },
    ...generateCirclePoints2(w2 / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w2 / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w2 / 2 - radius, y: -h2 / 2 },
    ...generateCirclePoints2(w2 / 2, h2 / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: w2 / 2, y: -h2 / 2 - radius },
    { x: -w2 / 2, y: -h2 / 2 - radius },
    ...generateCirclePoints2(w2 / 2, -h2 / 2, radius, 20, -90, 0),
    { x: -w2 / 2 - radius, y: -radius },
    ...generateCirclePoints2(w2 / 2 + w2 * 0.1, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w2 / 2 + w2 * 0.1, radius, radius, 20, -90, -180),
    { x: -w2 / 2 - radius, y: h2 / 2 },
    ...generateCirclePoints2(w2 / 2, h2 / 2, radius, 20, 0, 90),
    { x: -w2 / 2, y: h2 / 2 + radius },
    { x: w2 / 2, y: h2 / 2 + radius }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceLeftPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceLeftPath.replace("Z", "");
  const curlyBraceLeftNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceLeftShape = shapeSvg.insert("g", ":first-child");
  curlyBraceLeftShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceLeftShape.insert(() => curlyBraceLeftNode, ":first-child");
  curlyBraceLeftShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceLeftShape.attr("transform", `translate(${radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + radius - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceLeftShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraceLeft, "curlyBraceLeft");
function generateCirclePoints3(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i2 = 0; i2 < numPoints; i2++) {
    const angle = startAngleRad + i2 * angleStep;
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    points.push({ x: x2, y: y2 });
  }
  return points;
}
__name(generateCirclePoints3, "generateCirclePoints");
async function curlyBraceRight(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + (node.padding ?? 0);
  const h2 = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h2 * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints3(w2 / 2, -h2 / 2, radius, 20, -90, 0),
    { x: w2 / 2 + radius, y: -radius },
    ...generateCirclePoints3(w2 / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w2 / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w2 / 2 + radius, y: h2 / 2 },
    ...generateCirclePoints3(w2 / 2, h2 / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: -w2 / 2, y: -h2 / 2 - radius },
    { x: w2 / 2, y: -h2 / 2 - radius },
    ...generateCirclePoints3(w2 / 2, -h2 / 2, radius, 20, -90, 0),
    { x: w2 / 2 + radius, y: -radius },
    ...generateCirclePoints3(w2 / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w2 / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w2 / 2 + radius, y: h2 / 2 },
    ...generateCirclePoints3(w2 / 2, h2 / 2, radius, 20, 0, 90),
    { x: w2 / 2, y: h2 / 2 + radius },
    { x: -w2 / 2, y: h2 / 2 + radius }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceRightPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceRightPath.replace("Z", "");
  const curlyBraceRightNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceRightShape = shapeSvg.insert("g", ":first-child");
  curlyBraceRightShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceRightShape.insert(() => curlyBraceRightNode, ":first-child");
  curlyBraceRightShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceRightShape.attr("transform", `translate(${-radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceRightShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraceRight, "curlyBraceRight");
function generateCirclePoints4(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i2 = 0; i2 < numPoints; i2++) {
    const angle = startAngleRad + i2 * angleStep;
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    points.push({ x: -x2, y: -y2 });
  }
  return points;
}
__name(generateCirclePoints4, "generateCirclePoints");
async function curlyBraces(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + (node.padding ?? 0);
  const h2 = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h2 * 0.1);
  const { cssStyles } = node;
  const leftCurlyBracePoints = [
    ...generateCirclePoints4(w2 / 2, -h2 / 2, radius, 30, -90, 0),
    { x: -w2 / 2 - radius, y: radius },
    ...generateCirclePoints4(w2 / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w2 / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w2 / 2 - radius, y: -h2 / 2 },
    ...generateCirclePoints4(w2 / 2, h2 / 2, radius, 20, 0, 90)
  ];
  const rightCurlyBracePoints = [
    ...generateCirclePoints4(-w2 / 2 + radius + radius / 2, -h2 / 2, radius, 20, -90, -180),
    { x: w2 / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w2 / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w2 / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w2 / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w2 / 2 + radius + radius / 2, h2 / 2, radius, 30, -180, -270)
  ];
  const rectPoints = [
    { x: w2 / 2, y: -h2 / 2 - radius },
    { x: -w2 / 2, y: -h2 / 2 - radius },
    ...generateCirclePoints4(w2 / 2, -h2 / 2, radius, 20, -90, 0),
    { x: -w2 / 2 - radius, y: -radius },
    ...generateCirclePoints4(w2 / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w2 / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w2 / 2 - radius, y: h2 / 2 },
    ...generateCirclePoints4(w2 / 2, h2 / 2, radius, 20, 0, 90),
    { x: -w2 / 2, y: h2 / 2 + radius },
    { x: w2 / 2 - radius - radius / 2, y: h2 / 2 + radius },
    ...generateCirclePoints4(-w2 / 2 + radius + radius / 2, -h2 / 2, radius, 20, -90, -180),
    { x: w2 / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w2 / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w2 / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w2 / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w2 / 2 + radius + radius / 2, h2 / 2, radius, 30, -180, -270)
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const leftCurlyBracePath = createPathFromPoints(leftCurlyBracePoints);
  const newLeftCurlyBracePath = leftCurlyBracePath.replace("Z", "");
  const leftCurlyBraceNode = rc.path(newLeftCurlyBracePath, options);
  const rightCurlyBracePath = createPathFromPoints(rightCurlyBracePoints);
  const newRightCurlyBracePath = rightCurlyBracePath.replace("Z", "");
  const rightCurlyBraceNode = rc.path(newRightCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBracesShape = shapeSvg.insert("g", ":first-child");
  curlyBracesShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBracesShape.insert(() => leftCurlyBraceNode, ":first-child");
  curlyBracesShape.insert(() => rightCurlyBraceNode, ":first-child");
  curlyBracesShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBracesShape.attr("transform", `translate(${radius - radius / 4}, 0)`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBracesShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(curlyBraces, "curlyBraces");
async function curvedTrapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 80, minHeight = 20;
  const w2 = Math.max(minWidth, (bbox.width + (node.padding ?? 0) * 2) * 1.25, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const radius = h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const totalWidth = w2, totalHeight = h2;
  const rw = totalWidth - radius;
  const tw = totalHeight / 4;
  const points = [
    { x: rw, y: 0 },
    { x: tw, y: 0 },
    { x: 0, y: totalHeight / 2 },
    { x: tw, y: totalHeight },
    { x: rw, y: totalHeight },
    ...generateCirclePoints(-rw, -totalHeight / 2, radius, 50, 270, 90)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w2 / 2}, ${-h2 / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(curvedTrapezoid, "curvedTrapezoid");
var createCylinderPathD = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [
    `M${x2},${y2 + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [
    `M${x2},${y2 + ry}`,
    `M${x2 + width},${y2 + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [`M${x2 - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
async function cylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + node.padding, node.width ?? 0);
  const rx = w2 / 2;
  const ry = rx / (2.5 + w2 / 50);
  const h2 = Math.max(bbox.height + ry + node.padding, node.height ?? 0);
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD(0, 0, w2, h2, rx, ry);
    const innerPathData = createInnerCylinderPathD(0, ry, w2, h2, rx, ry);
    const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD(0, 0, w2, h2, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w2 / 2}, ${-(h2 / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + (node.padding ?? 0) / 1.5 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const x2 = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x2) < (node.width ?? 0) / 2 || Math.abs(x2) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y2 = ry * ry * (1 - x2 * x2 / (rx * rx));
      if (y2 > 0) {
        y2 = Math.sqrt(y2);
      }
      y2 = ry - y2;
      if (point2.y - (node.y ?? 0) > 0) {
        y2 = -y2;
      }
      pos.y += y2;
    }
    return pos;
  };
  return shapeSvg;
}
__name(cylinder, "cylinder");
async function dividedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + node.padding;
  const h2 = bbox.height + node.padding;
  const rectOffset = h2 * 0.2;
  const x2 = -w2 / 2;
  const y2 = -h2 / 2 - rectOffset / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pts = [
    { x: x2, y: y2 + rectOffset },
    { x: -x2, y: y2 + rectOffset },
    { x: -x2, y: -y2 },
    { x: x2, y: -y2 },
    { x: x2, y: y2 },
    { x: -x2, y: y2 },
    { x: -x2, y: y2 + rectOffset }
  ];
  const poly = rc.polygon(
    pts.map((p2) => [p2.x, p2.y]),
    options
  );
  const polygon = shapeSvg.insert(() => poly, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${x2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))}, ${y2 + rectOffset + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    return pos;
  };
  return shapeSvg;
}
__name(dividedRectangle, "dividedRectangle");
async function doublecircle(parent, node) {
  var _a2, _b2;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const gap = 5;
  const outerRadius = bbox.width / 2 + halfPadding + gap;
  const innerRadius = bbox.width / 2 + halfPadding;
  let circleGroup;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 2.5 });
    const innerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 1.5 });
    const outerRoughNode = rc.circle(0, 0, outerRadius * 2, outerOptions);
    const innerRoughNode = rc.circle(0, 0, innerRadius * 2, innerOptions);
    circleGroup = shapeSvg.insert("g", ":first-child");
    circleGroup.attr("class", handleUndefinedAttr(node.cssClasses)).attr("style", handleUndefinedAttr(cssStyles));
    (_a2 = circleGroup.node()) == null ? void 0 : _a2.appendChild(outerRoughNode);
    (_b2 = circleGroup.node()) == null ? void 0 : _b2.appendChild(innerRoughNode);
  } else {
    circleGroup = shapeSvg.insert("g", ":first-child");
    const outerCircle = circleGroup.insert("circle", ":first-child");
    const innerCircle = circleGroup.insert("circle");
    circleGroup.attr("class", "basic label-container").attr("style", nodeStyles);
    outerCircle.attr("class", "outer-circle").attr("style", nodeStyles).attr("r", outerRadius).attr("cx", 0).attr("cy", 0);
    innerCircle.attr("class", "inner-circle").attr("style", nodeStyles).attr("r", innerRadius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleGroup);
  node.intersect = function(point2) {
    log.info("DoubleCircle intersect", node, outerRadius, point2);
    return intersect_default.circle(node, outerRadius, point2);
  };
  return shapeSvg;
}
__name(doublecircle, "doublecircle");
function filledCircle(parent, node, { config: { themeVariables } }) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = 7;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const { nodeBorder } = themeVariables;
  const options = userNodeOverrides(node, { fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const filledCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  filledCircle2.selectAll("path").attr("style", `fill: ${nodeBorder} !important;`);
  if (cssStyles && cssStyles.length > 0 && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, filledCircle2);
  node.intersect = function(point2) {
    log.info("filledCircle intersect", node, { radius, point: point2 });
    const pos = intersect_default.circle(node, radius, point2);
    return pos;
  };
  return shapeSvg;
}
__name(filledCircle, "filledCircle");
async function flippedTriangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + (node.padding ?? 0);
  const h2 = w2 + bbox.height;
  const tw = w2 + bbox.height;
  const points = [
    { x: 0, y: -h2 },
    { x: tw, y: -h2 },
    { x: tw / 2, y: 0 }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const flippedTriangle2 = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h2 / 2}, ${h2 / 2})`);
  if (cssStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, flippedTriangle2);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-h2 / 2 + (node.padding ?? 0) / 2 + (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    log.info("Triangle intersect", node, points, point2);
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(flippedTriangle, "flippedTriangle");
function forkJoin(parent, node, { dir, config: { state: state2, themeVariables } }) {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  let width = Math.max(70, (node == null ? void 0 : node.width) ?? 0);
  let height = Math.max(10, (node == null ? void 0 : node.height) ?? 0);
  if (dir === "LR") {
    width = Math.max(10, (node == null ? void 0 : node.width) ?? 0);
    height = Math.max(70, (node == null ? void 0 : node.height) ?? 0);
  }
  const x2 = -1 * width / 2;
  const y2 = -1 * height / 2;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    stroke: themeVariables.lineColor,
    fill: themeVariables.lineColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.rectangle(x2, y2, width, height, options);
  const shape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, shape);
  const padding = (state2 == null ? void 0 : state2.padding) ?? 0;
  if (node.width && node.height) {
    node.width += padding / 2 || 0;
    node.height += padding / 2 || 0;
  }
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(forkJoin, "forkJoin");
async function halfRoundedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const minWidth = 80, minHeight = 50;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const radius = h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2, y: -h2 / 2 },
    { x: w2 / 2 - radius, y: -h2 / 2 },
    ...generateCirclePoints(-w2 / 2 + radius, 0, radius, 50, 90, 270),
    { x: w2 / 2 - radius, y: h2 / 2 },
    { x: -w2 / 2, y: h2 / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    log.info("Pill intersect", node, { radius, point: point2 });
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(halfRoundedRectangle, "halfRoundedRectangle");
async function hexagon(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h2 = bbox.height + (node.padding ?? 0);
  const w2 = bbox.width + (node.padding ?? 0) * 2.5;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  let halfWidth = w2 / 2;
  const m2 = halfWidth / 6;
  halfWidth = halfWidth + m2;
  const halfHeight = h2 / 2;
  const fixedLength = halfHeight / 2;
  const deducedWidth = halfWidth - fixedLength;
  const points = [
    { x: -deducedWidth, y: -halfHeight },
    { x: 0, y: -halfHeight },
    { x: deducedWidth, y: -halfHeight },
    { x: halfWidth, y: 0 },
    { x: deducedWidth, y: halfHeight },
    { x: 0, y: halfHeight },
    { x: -deducedWidth, y: halfHeight },
    { x: -halfWidth, y: 0 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(hexagon, "hexagon");
async function hourglass(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const { shapeSvg } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(30, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(30, (node == null ? void 0 : node.height) ?? 0);
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: 0, y: 0 },
    { x: w2, y: 0 },
    { x: 0, y: h2 },
    { x: w2, y: h2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w2 / 2}, ${-h2 / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    log.info("Pill intersect", node, { points });
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(hourglass, "hourglass");
async function icon(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const topLabel = node.pos === "t";
  const height = iconSize;
  const width = iconSize;
  const { nodeBorder } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x2 = -width / 2;
  const y2 = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: "none", fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconNode = rc.rectangle(x2, y2, width, height, options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(icon, "icon");
async function iconCircle(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const padding = 20;
  const labelPadding = node.label ? 8 : 0;
  const topLabel = node.pos === "t";
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconElem = shapeSvg.append("g");
  if (node.icon) {
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
  }
  const iconBBox = iconElem.node().getBBox();
  const iconWidth = iconBBox.width;
  const iconHeight = iconBBox.height;
  const iconX = iconBBox.x;
  const iconY = iconBBox.y;
  const diameter = Math.max(iconWidth, iconHeight) * Math.SQRT2 + padding * 2;
  const iconNode = rc.circle(0, 0, diameter, options);
  const outerWidth = Math.max(diameter, bbox.width);
  const outerHeight = diameter + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  iconElem.attr(
    "transform",
    `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
  );
  iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    const pos = intersect_default.rect(node, point2);
    return pos;
  };
  return shapeSvg;
}
__name(iconCircle, "iconCircle");
async function iconRounded(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x2 = -width / 2;
  const y2 = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconNode = rc.path(createRoundedRectPathD(x2, y2, width, height, 5), options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child").attr("class", "icon-shape2");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(iconRounded, "iconRounded");
async function iconSquare(parent, node, { config: { themeVariables, flowchart } }) {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x2 = -width / 2;
  const y2 = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const fill = stylesMap.get("fill");
  options.stroke = fill ?? mainBkg;
  const iconNode = rc.path(createRoundedRectPathD(x2, y2, width, height, 0.1), options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.attr("style", `color: ${stylesMap.get("stroke") ?? nodeBorder};`);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(iconSquare, "iconSquare");
async function imageSquare(parent, node, { config: { flowchart } }) {
  const img = new Image();
  img.src = (node == null ? void 0 : node.img) ?? "";
  await img.decode();
  const imageNaturalWidth = Number(img.naturalWidth.toString().replace("px", ""));
  const imageNaturalHeight = Number(img.naturalHeight.toString().replace("px", ""));
  node.imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  node.defaultWidth = flowchart == null ? void 0 : flowchart.wrappingWidth;
  const imageRawWidth = Math.max(
    node.label ? defaultWidth ?? 0 : 0,
    (node == null ? void 0 : node.assetWidth) ?? imageNaturalWidth
  );
  const imageWidth = node.constraint === "on" ? (node == null ? void 0 : node.assetHeight) ? node.assetHeight * node.imageAspectRatio : imageRawWidth : imageRawWidth;
  const imageHeight = node.constraint === "on" ? imageWidth / node.imageAspectRatio : (node == null ? void 0 : node.assetHeight) ?? imageNaturalHeight;
  node.width = Math.max(imageWidth, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "image-shape default");
  const topLabel = node.pos === "t";
  const x2 = -imageWidth / 2;
  const y2 = -imageHeight / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const imageNode = rc.rectangle(x2, y2, imageWidth, imageHeight, options);
  const outerWidth = Math.max(imageWidth, bbox.width);
  const outerHeight = imageHeight + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "none",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => imageNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.img) {
    const image = shapeSvg.append("image");
    image.attr("href", node.img);
    image.attr("width", imageWidth);
    image.attr("height", imageHeight);
    image.attr("preserveAspectRatio", "none");
    image.attr(
      "transform",
      `translate(${-imageWidth / 2},${topLabel ? outerHeight / 2 - imageHeight : -outerHeight / 2})`
    );
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -imageHeight / 2 - bbox.height / 2 - labelPadding / 2 : imageHeight / 2 - bbox.height / 2 + labelPadding / 2})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(imageSquare, "imageSquare");
async function inv_trapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const points = [
    { x: 0, y: 0 },
    { x: w2, y: 0 },
    { x: w2 + 3 * h2 / 6, y: -h2 },
    { x: -3 * h2 / 6, y: -h2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w2 / 2}, ${h2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w2, h2, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(inv_trapezoid, "inv_trapezoid");
async function drawRect(parent, node, options) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + options.labelPaddingX * 2, (node == null ? void 0 : node.width) || 0);
  const totalHeight = Math.max(bbox.height + options.labelPaddingY * 2, (node == null ? void 0 : node.height) || 0);
  const x2 = -totalWidth / 2;
  const y2 = -totalHeight / 2;
  let rect2;
  let { rx, ry } = node;
  const { cssStyles } = node;
  if ((options == null ? void 0 : options.rx) && options.ry) {
    rx = options.rx;
    ry = options.ry;
  }
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(node, {});
    const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x2, y2, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x2, y2, totalWidth, totalHeight, options2);
    rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", handleUndefinedAttr(rx)).attr("ry", handleUndefinedAttr(ry)).attr("x", x2).attr("y", y2).attr("width", totalWidth).attr("height", totalHeight);
  }
  updateNodeBounds(node, rect2);
  node.calcIntersect = function(bounds, point2) {
    return intersect_default.rect(bounds, point2);
  };
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(drawRect, "drawRect");
async function labelRect(parent, node) {
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "label");
  const rect2 = shapeSvg.insert("rect", ":first-child");
  const totalWidth = 0.1;
  const totalHeight = 0.1;
  rect2.attr("width", totalWidth).attr("height", totalHeight);
  shapeSvg.attr("class", "label edgeLabel");
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(labelRect, "labelRect");
async function lean_left(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0), (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0), (node == null ? void 0 : node.height) ?? 0);
  const points = [
    { x: 0, y: 0 },
    { x: w2 + 3 * h2 / 6, y: 0 },
    { x: w2, y: -h2 },
    { x: -(3 * h2) / 6, y: -h2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w2 / 2}, ${h2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w2, h2, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(lean_left, "lean_left");
async function lean_right(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0), (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0), (node == null ? void 0 : node.height) ?? 0);
  const points = [
    { x: -3 * h2 / 6, y: 0 },
    { x: w2, y: 0 },
    { x: w2 + 3 * h2 / 6, y: -h2 },
    { x: 0, y: -h2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w2 / 2}, ${h2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w2, h2, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(lean_right, "lean_right");
function lightningBolt(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const width = Math.max(35, (node == null ? void 0 : node.width) ?? 0);
  const height = Math.max(35, (node == null ? void 0 : node.height) ?? 0);
  const gap = 7;
  const points = [
    { x: width, y: 0 },
    { x: 0, y: height + gap / 2 },
    { x: width - 2 * gap, y: height + gap / 2 },
    { x: 0, y: 2 * height },
    { x: width, y: height - gap / 2 },
    { x: 2 * gap, y: height - gap / 2 }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const linePath = createPathFromPoints(points);
  const lineNode = rc.path(linePath, options);
  const lightningBolt2 = shapeSvg.insert(() => lineNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", nodeStyles);
  }
  lightningBolt2.attr("transform", `translate(-${width / 2},${-height})`);
  updateNodeBounds(node, lightningBolt2);
  node.intersect = function(point2) {
    log.info("lightningBolt intersect", node, point2);
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(lightningBolt, "lightningBolt");
var createCylinderPathD2 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry, outerOffset) => {
  return [
    `M${x2},${y2 + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x2},${y2 + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD2 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry, outerOffset) => {
  return [
    `M${x2},${y2 + ry}`,
    `M${x2 + width},${y2 + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x2},${y2 + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD2 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [`M${x2 - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
async function linedCylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0), node.width ?? 0);
  const rx = w2 / 2;
  const ry = rx / (2.5 + w2 / 50);
  const h2 = Math.max(bbox.height + ry + (node.padding ?? 0), node.height ?? 0);
  const outerOffset = h2 * 0.1;
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD2(0, 0, w2, h2, rx, ry, outerOffset);
    const innerPathData = createInnerCylinderPathD2(0, ry, w2, h2, rx, ry);
    const options = userNodeOverrides(node, {});
    const outerNode = rc.path(outerPathData, options);
    const innerLine = rc.path(innerPathData, options);
    const innerLineEl = shapeSvg.insert(() => innerLine, ":first-child");
    innerLineEl.attr("class", "line");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD2(0, 0, w2, h2, rx, ry, outerOffset);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w2 / 2}, ${-(h2 / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + ry - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const x2 = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x2) < (node.width ?? 0) / 2 || Math.abs(x2) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y2 = ry * ry * (1 - x2 * x2 / (rx * rx));
      if (y2 > 0) {
        y2 = Math.sqrt(y2);
      }
      y2 = ry - y2;
      if (point2.y - (node.y ?? 0) > 0) {
        y2 = -y2;
      }
      pos.y += y2;
    }
    return pos;
  };
  return shapeSvg;
}
__name(linedCylinder, "linedCylinder");
async function linedWaveEdgedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const waveAmplitude = h2 / 4;
  const finalH = h2 + waveAmplitude;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2 - w2 / 2 * 0.1, y: -finalH / 2 },
    { x: -w2 / 2 - w2 / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w2 / 2 - w2 / 2 * 0.1,
      finalH / 2,
      w2 / 2 + w2 / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w2 / 2 + w2 / 2 * 0.1, y: -finalH / 2 },
    { x: -w2 / 2 - w2 / 2 * 0.1, y: -finalH / 2 },
    { x: -w2 / 2, y: -finalH / 2 },
    { x: -w2 / 2, y: finalH / 2 * 1.1 },
    { x: -w2 / 2, y: -finalH / 2 }
  ];
  const poly = rc.polygon(
    points.map((p2) => [p2.x, p2.y]),
    options
  );
  const waveEdgeRect = shapeSvg.insert(() => poly, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) + w2 / 2 * 0.1 / 2 - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(linedWaveEdgedRect, "linedWaveEdgedRect");
async function multiRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const rectOffset = 5;
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x2 - rectOffset, y: y2 + rectOffset },
    { x: x2 - rectOffset, y: y2 + h2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: y2 + h2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: y2 + h2 },
    { x: x2 + w2, y: y2 + h2 },
    { x: x2 + w2, y: y2 + h2 - rectOffset },
    { x: x2 + w2 + rectOffset, y: y2 + h2 - rectOffset },
    { x: x2 + w2 + rectOffset, y: y2 - rectOffset },
    { x: x2 + rectOffset, y: y2 - rectOffset },
    { x: x2 + rectOffset, y: y2 },
    { x: x2, y: y2 },
    { x: x2, y: y2 + rectOffset }
  ];
  const innerPathPoints = [
    { x: x2, y: y2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: y2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: y2 + h2 },
    { x: x2 + w2, y: y2 + h2 },
    { x: x2 + w2, y: y2 },
    { x: x2, y: y2 }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  const outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  const innerNode = rc.path(innerPath, { ...options, fill: "none" });
  const multiRect2 = shapeSvg.insert(() => innerNode, ":first-child");
  multiRect2.insert(() => outerNode, ":first-child");
  multiRect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, multiRect2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(multiRect, "multiRect");
async function multiWaveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const waveAmplitude = h2 / 4;
  const finalH = h2 + waveAmplitude;
  const x2 = -w2 / 2;
  const y2 = -finalH / 2;
  const rectOffset = 5;
  const { cssStyles } = node;
  const wavePoints = generateFullSineWavePoints(
    x2 - rectOffset,
    y2 + finalH + rectOffset,
    x2 + w2 - rectOffset,
    y2 + finalH + rectOffset,
    waveAmplitude,
    0.8
  );
  const lastWavePoint = wavePoints == null ? void 0 : wavePoints[wavePoints.length - 1];
  const outerPathPoints = [
    { x: x2 - rectOffset, y: y2 + rectOffset },
    { x: x2 - rectOffset, y: y2 + finalH + rectOffset },
    ...wavePoints,
    { x: x2 + w2 - rectOffset, y: lastWavePoint.y - rectOffset },
    { x: x2 + w2, y: lastWavePoint.y - rectOffset },
    { x: x2 + w2, y: lastWavePoint.y - 2 * rectOffset },
    { x: x2 + w2 + rectOffset, y: lastWavePoint.y - 2 * rectOffset },
    { x: x2 + w2 + rectOffset, y: y2 - rectOffset },
    { x: x2 + rectOffset, y: y2 - rectOffset },
    { x: x2 + rectOffset, y: y2 },
    { x: x2, y: y2 },
    { x: x2, y: y2 + rectOffset }
  ];
  const innerPathPoints = [
    { x: x2, y: y2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: y2 + rectOffset },
    { x: x2 + w2 - rectOffset, y: lastWavePoint.y - rectOffset },
    { x: x2 + w2, y: lastWavePoint.y - rectOffset },
    { x: x2 + w2, y: y2 },
    { x: x2, y: y2 }
  ];
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  const outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  const innerNode = rc.path(innerPath, options);
  const shape = shapeSvg.insert(() => outerNode, ":first-child");
  shape.insert(() => innerNode);
  shape.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  shape.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, shape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(multiWaveEdgedRectangle, "multiWaveEdgedRectangle");
async function note(parent, node, { config: { themeVariables } }) {
  var _a2;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const useHtmlLabels = node.useHtmlLabels || ((_a2 = getConfig().flowchart) == null ? void 0 : _a2.htmlLabels) !== false;
  if (!useHtmlLabels) {
    node.centerLabel = true;
  }
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const totalHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const x2 = -totalWidth / 2;
  const y2 = -totalHeight / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    fill: themeVariables.noteBkgColor,
    stroke: themeVariables.noteBorderColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const noteShapeNode = rc.rectangle(x2, y2, totalWidth, totalHeight, options);
  const rect2 = shapeSvg.insert(() => noteShapeNode, ":first-child");
  rect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(note, "note");
var createDecisionBoxPathD = /* @__PURE__ */ __name((x2, y2, size) => {
  return [
    `M${x2 + size / 2},${y2}`,
    `L${x2 + size},${y2 - size / 2}`,
    `L${x2 + size / 2},${y2 - size}`,
    `L${x2},${y2 - size / 2}`,
    "Z"
  ].join(" ");
}, "createDecisionBoxPathD");
async function question(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + node.padding;
  const h2 = bbox.height + node.padding;
  const s2 = w2 + h2;
  const adjustment = 0.5;
  const points = [
    { x: s2 / 2, y: 0 },
    { x: s2, y: -s2 / 2 },
    { x: s2 / 2, y: -s2 },
    { x: 0, y: -s2 / 2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createDecisionBoxPathD(0, 0, s2);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-s2 / 2 + adjustment}, ${s2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, s2, s2, points);
    polygon.attr("transform", `translate(${-s2 / 2 + adjustment}, ${s2 / 2})`);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.calcIntersect = function(bounds, point2) {
    const s22 = bounds.width;
    const points2 = [
      { x: s22 / 2, y: 0 },
      { x: s22, y: -s22 / 2 },
      { x: s22 / 2, y: -s22 },
      { x: 0, y: -s22 / 2 }
    ];
    const res = intersect_default.polygon(bounds, points2, point2);
    return { x: res.x - 0.5, y: res.y - 0.5 };
  };
  node.intersect = function(point2) {
    return this.calcIntersect(node, point2);
  };
  return shapeSvg;
}
__name(question, "question");
async function rect_left_inv_arrow(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0), (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0), (node == null ? void 0 : node.height) ?? 0);
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const notch = y2 / 2;
  const points = [
    { x: x2 + notch, y: y2 },
    { x: x2, y: 0 },
    { x: x2 + notch, y: -y2 },
    { x: -x2, y: -y2 },
    { x: -x2, y: y2 }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-notch / 2},0)`);
  label.attr(
    "transform",
    `translate(${-notch / 2 - bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(rect_left_inv_arrow, "rect_left_inv_arrow");
async function rectWithTitle(parent, node) {
  var _a2, _b2;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  let classes;
  if (!node.cssClasses) {
    classes = "node default";
  } else {
    classes = "node " + node.cssClasses;
  }
  const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId || node.id);
  const g2 = shapeSvg.insert("g");
  const label = shapeSvg.insert("g").attr("class", "label").attr("style", nodeStyles);
  const description = node.description;
  const title = node.label;
  const text2 = label.node().appendChild(await createLabel_default(title, node.labelStyle, true, true));
  let bbox = { width: 0, height: 0 };
  if (evaluate((_b2 = (_a2 = getConfig2()) == null ? void 0 : _a2.flowchart) == null ? void 0 : _b2.htmlLabels)) {
    const div2 = text2.children[0];
    const dv2 = select(text2);
    bbox = div2.getBoundingClientRect();
    dv2.attr("width", bbox.width);
    dv2.attr("height", bbox.height);
  }
  log.info("Text 2", description);
  const textRows = description || [];
  const titleBox = text2.getBBox();
  const descr = label.node().appendChild(
    await createLabel_default(
      textRows.join ? textRows.join("<br/>") : textRows,
      node.labelStyle,
      true,
      true
    )
  );
  const div = descr.children[0];
  const dv = select(descr);
  bbox = div.getBoundingClientRect();
  dv.attr("width", bbox.width);
  dv.attr("height", bbox.height);
  const halfPadding = (node.padding || 0) / 2;
  select(descr).attr(
    "transform",
    "translate( " + (bbox.width > titleBox.width ? 0 : (titleBox.width - bbox.width) / 2) + ", " + (titleBox.height + halfPadding + 5) + ")"
  );
  select(text2).attr(
    "transform",
    "translate( " + (bbox.width < titleBox.width ? 0 : -(titleBox.width - bbox.width) / 2) + ", 0)"
  );
  bbox = label.node().getBBox();
  label.attr(
    "transform",
    "translate(" + -bbox.width / 2 + ", " + (-bbox.height / 2 - halfPadding + 3) + ")"
  );
  const totalWidth = bbox.width + (node.padding || 0);
  const totalHeight = bbox.height + (node.padding || 0);
  const x2 = -bbox.width / 2 - halfPadding;
  const y2 = -bbox.height / 2 - halfPadding;
  let rect2;
  let innerLine;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(
      createRoundedRectPathD(x2, y2, totalWidth, totalHeight, node.rx || 0),
      options
    );
    const roughLine = rc.line(
      -bbox.width / 2 - halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      bbox.width / 2 + halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      options
    );
    innerLine = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughLine;
    }, ":first-child");
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
  } else {
    rect2 = g2.insert("rect", ":first-child");
    innerLine = g2.insert("line");
    rect2.attr("class", "outer title-state").attr("style", nodeStyles).attr("x", -bbox.width / 2 - halfPadding).attr("y", -bbox.height / 2 - halfPadding).attr("width", bbox.width + (node.padding || 0)).attr("height", bbox.height + (node.padding || 0));
    innerLine.attr("class", "divider").attr("x1", -bbox.width / 2 - halfPadding).attr("x2", bbox.width / 2 + halfPadding).attr("y1", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding).attr("y2", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(rectWithTitle, "rectWithTitle");
function generateArcPoints2(x1, y1, x2, y2, rx, ry, clockwise) {
  const numPoints = 20;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const dx = (x2 - x1) / 2;
  const dy = (y2 - y1) / 2;
  const transformedX = dx / rx;
  const transformedY = dy / ry;
  const distance2 = Math.sqrt(transformedX ** 2 + transformedY ** 2);
  if (distance2 > 1) {
    throw new Error("The given radii are too small to create an arc between the points.");
  }
  const scaledCenterDistance = Math.sqrt(1 - distance2 ** 2);
  const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
  const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
  const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
  const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
  let angleRange = endAngle - startAngle;
  if (clockwise && angleRange < 0) {
    angleRange += 2 * Math.PI;
  }
  if (!clockwise && angleRange > 0) {
    angleRange -= 2 * Math.PI;
  }
  const points = [];
  for (let i2 = 0; i2 < numPoints; i2++) {
    const t2 = i2 / (numPoints - 1);
    const angle2 = startAngle + t2 * angleRange;
    const x3 = centerX + rx * Math.cos(angle2);
    const y3 = centerY + ry * Math.sin(angle2);
    points.push({ x: x3, y: y3 });
  }
  return points;
}
__name(generateArcPoints2, "generateArcPoints");
async function roundedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const labelPaddingX = (node == null ? void 0 : node.padding) ?? 0;
  const labelPaddingY = (node == null ? void 0 : node.padding) ?? 0;
  const w2 = ((node == null ? void 0 : node.width) ? node == null ? void 0 : node.width : bbox.width) + labelPaddingX * 2;
  const h2 = ((node == null ? void 0 : node.height) ? node == null ? void 0 : node.height : bbox.height) + labelPaddingY * 2;
  const radius = node.radius || 5;
  const taper = node.taper || 5;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.stroke) {
    options.stroke = node.stroke;
  }
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    // Top edge (left to right)
    { x: -w2 / 2 + taper, y: -h2 / 2 },
    // Top-left corner start (1)
    { x: w2 / 2 - taper, y: -h2 / 2 },
    // Top-right corner start (2)
    ...generateArcPoints2(w2 / 2 - taper, -h2 / 2, w2 / 2, -h2 / 2 + taper, radius, radius, true),
    // Top-left arc (2 to 3)
    // Right edge (top to bottom)
    { x: w2 / 2, y: -h2 / 2 + taper },
    // Top-right taper point (3)
    { x: w2 / 2, y: h2 / 2 - taper },
    // Bottom-right taper point (4)
    ...generateArcPoints2(w2 / 2, h2 / 2 - taper, w2 / 2 - taper, h2 / 2, radius, radius, true),
    // Top-left arc (4 to 5)
    // Bottom edge (right to left)
    { x: w2 / 2 - taper, y: h2 / 2 },
    // Bottom-right corner start (5)
    { x: -w2 / 2 + taper, y: h2 / 2 },
    // Bottom-left corner start (6)
    ...generateArcPoints2(-w2 / 2 + taper, h2 / 2, -w2 / 2, h2 / 2 - taper, radius, radius, true),
    // Top-left arc (4 to 5)
    // Left edge (bottom to top)
    { x: -w2 / 2, y: h2 / 2 - taper },
    // Bottom-left taper point (7)
    { x: -w2 / 2, y: -h2 / 2 + taper },
    // Top-left taper point (8)
    ...generateArcPoints2(-w2 / 2, -h2 / 2 + taper, -w2 / 2 + taper, -h2 / 2, radius, radius, true)
    // Top-left arc (4 to 5)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(roundedRect, "roundedRect");
async function shadedProcess(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const halfPadding = (node == null ? void 0 : node.padding) ?? 0;
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const x2 = -bbox.width / 2 - halfPadding;
  const y2 = -bbox.height / 2 - halfPadding;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: x2, y: y2 },
    { x: x2 + w2 + 8, y: y2 },
    { x: x2 + w2 + 8, y: y2 + h2 },
    { x: x2 - 8, y: y2 + h2 },
    { x: x2 - 8, y: y2 },
    { x: x2, y: y2 },
    { x: x2, y: y2 + h2 }
  ];
  const roughNode = rc.polygon(
    points.map((p2) => [p2.x, p2.y]),
    options
  );
  const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
  rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  if (nodeStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  if (cssStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-w2 / 2 + 4 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(shadedProcess, "shadedProcess");
async function slopedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: x2, y: y2 },
    { x: x2, y: y2 + h2 },
    { x: x2 + w2, y: y2 + h2 },
    { x: x2 + w2, y: y2 - h2 / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(0, ${h2 / 4})`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))}, ${-h2 / 4 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(slopedRect, "slopedRect");
async function squareRect2(parent, node) {
  const options = {
    rx: 0,
    ry: 0,
    labelPaddingX: node.labelPaddingX ?? ((node == null ? void 0 : node.padding) || 0) * 2,
    labelPaddingY: ((node == null ? void 0 : node.padding) || 0) * 1
  };
  return drawRect(parent, node, options);
}
__name(squareRect2, "squareRect");
async function stadium(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h2 = bbox.height + node.padding;
  const w2 = bbox.width + h2 / 4 + node.padding;
  const radius = h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2 + radius, y: -h2 / 2 },
    { x: w2 / 2 - radius, y: -h2 / 2 },
    ...generateCirclePoints(-w2 / 2 + radius, 0, radius, 50, 90, 270),
    { x: w2 / 2 - radius, y: h2 / 2 },
    ...generateCirclePoints(w2 / 2 - radius, 0, radius, 50, 270, 450)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container outer-path");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(stadium, "stadium");
async function state(parent, node) {
  const options = {
    rx: 5,
    ry: 5
  };
  return drawRect(parent, node, options);
}
__name(state, "state");
function stateEnd(parent, node, { config: { themeVariables } }) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { cssStyles } = node;
  const { lineColor, stateBorder, nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.circle(0, 0, 14, {
    ...options,
    stroke: lineColor,
    strokeWidth: 2
  });
  const innerFill = stateBorder ?? nodeBorder;
  const roughInnerNode = rc.circle(0, 0, 5, {
    ...options,
    fill: innerFill,
    stroke: innerFill,
    strokeWidth: 2,
    fillStyle: "solid"
  });
  const circle2 = shapeSvg.insert(() => roughNode, ":first-child");
  circle2.insert(() => roughInnerNode);
  if (cssStyles) {
    circle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles) {
    circle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, circle2);
  node.intersect = function(point2) {
    return intersect_default.circle(node, 7, point2);
  };
  return shapeSvg;
}
__name(stateEnd, "stateEnd");
function stateStart(parent, node, { config: { themeVariables } }) {
  const { lineColor } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
  let circle2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const roughNode = rc.circle(0, 0, 14, solidStateFill(lineColor));
    circle2 = shapeSvg.insert(() => roughNode);
    circle2.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
  } else {
    circle2 = shapeSvg.insert("circle", ":first-child");
    circle2.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
  }
  updateNodeBounds(node, circle2);
  node.intersect = function(point2) {
    return intersect_default.circle(node, 7, point2);
  };
  return shapeSvg;
}
__name(stateStart, "stateStart");
async function subroutine(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const halfPadding = ((node == null ? void 0 : node.padding) || 0) / 2;
  const w2 = bbox.width + node.padding;
  const h2 = bbox.height + node.padding;
  const x2 = -bbox.width / 2 - halfPadding;
  const y2 = -bbox.height / 2 - halfPadding;
  const points = [
    { x: 0, y: 0 },
    { x: w2, y: 0 },
    { x: w2, y: -h2 },
    { x: 0, y: -h2 },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: w2 + 8, y: 0 },
    { x: w2 + 8, y: -h2 },
    { x: -8, y: -h2 },
    { x: -8, y: 0 }
  ];
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.rectangle(x2 - 8, y2, w2 + 16, h2, options);
    const l1 = rc.line(x2, y2, x2, y2 + h2, options);
    const l2 = rc.line(x2 + w2, y2, x2 + w2, y2 + h2, options);
    shapeSvg.insert(() => l1, ":first-child");
    shapeSvg.insert(() => l2, ":first-child");
    const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    const { cssStyles } = node;
    rect2.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
    updateNodeBounds(node, rect2);
  } else {
    const el = insertPolygonShape(shapeSvg, w2, h2, points);
    if (nodeStyles) {
      el.attr("style", nodeStyles);
    }
    updateNodeBounds(node, el);
  }
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(subroutine, "subroutine");
async function taggedRect(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const tagWidth = 0.2 * h2;
  const tagHeight = 0.2 * h2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const rectPoints = [
    { x: x2 - tagWidth / 2, y: y2 },
    { x: x2 + w2 + tagWidth / 2, y: y2 },
    { x: x2 + w2 + tagWidth / 2, y: y2 + h2 },
    { x: x2 - tagWidth / 2, y: y2 + h2 }
  ];
  const tagPoints = [
    { x: x2 + w2 - tagWidth / 2, y: y2 + h2 },
    { x: x2 + w2 + tagWidth / 2, y: y2 + h2 },
    { x: x2 + w2 + tagWidth / 2, y: y2 + h2 - tagHeight }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const rectPath = createPathFromPoints(rectPoints);
  const rectNode = rc.path(rectPath, options);
  const tagPath = createPathFromPoints(tagPoints);
  const tagNode = rc.path(tagPath, { ...options, fillStyle: "solid" });
  const taggedRect2 = shapeSvg.insert(() => tagNode, ":first-child");
  taggedRect2.insert(() => rectNode, ":first-child");
  taggedRect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, taggedRect2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(taggedRect, "taggedRect");
async function taggedWaveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const waveAmplitude = h2 / 4;
  const tagWidth = 0.2 * w2;
  const tagHeight = 0.2 * h2;
  const finalH = h2 + waveAmplitude;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2 - w2 / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w2 / 2 - w2 / 2 * 0.1,
      finalH / 2,
      w2 / 2 + w2 / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w2 / 2 + w2 / 2 * 0.1, y: -finalH / 2 },
    { x: -w2 / 2 - w2 / 2 * 0.1, y: -finalH / 2 }
  ];
  const x2 = -w2 / 2 + w2 / 2 * 0.1;
  const y2 = -finalH / 2 - tagHeight * 0.4;
  const tagPoints = [
    { x: x2 + w2 - tagWidth, y: (y2 + h2) * 1.4 },
    { x: x2 + w2, y: y2 + h2 - tagHeight },
    { x: x2 + w2, y: (y2 + h2) * 0.9 },
    ...generateFullSineWavePoints(
      x2 + w2,
      (y2 + h2) * 1.3,
      x2 + w2 - tagWidth,
      (y2 + h2) * 1.5,
      -h2 * 0.03,
      0.5
    )
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const taggedWaveEdgeRectPath = createPathFromPoints(tagPoints);
  const taggedWaveEdgeRectNode = rc.path(taggedWaveEdgeRectPath, {
    ...options,
    fillStyle: "solid"
  });
  const waveEdgeRect = shapeSvg.insert(() => taggedWaveEdgeRectNode, ":first-child");
  waveEdgeRect.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(taggedWaveEdgedRectangle, "taggedWaveEdgedRectangle");
async function text(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + node.padding, (node == null ? void 0 : node.width) || 0);
  const totalHeight = Math.max(bbox.height + node.padding, (node == null ? void 0 : node.height) || 0);
  const x2 = -totalWidth / 2;
  const y2 = -totalHeight / 2;
  const rect2 = shapeSvg.insert("rect", ":first-child");
  rect2.attr("class", "text").attr("style", nodeStyles).attr("rx", 0).attr("ry", 0).attr("x", x2).attr("y", y2).attr("width", totalWidth).attr("height", totalHeight);
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(text, "text");
var createCylinderPathD3 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return `M${x2},${y2}
    a${rx},${ry} 0,0,1 ${0},${-height}
    l${width},${0}
    a${rx},${ry} 0,0,1 ${0},${height}
    M${width},${-height}
    a${rx},${ry} 0,0,0 ${0},${height}
    l${-width},${0}`;
}, "createCylinderPathD");
var createOuterCylinderPathD3 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [
    `M${x2},${y2}`,
    `M${x2 + width},${y2}`,
    `a${rx},${ry} 0,0,0 ${0},${-height}`,
    `l${-width},0`,
    `a${rx},${ry} 0,0,0 ${0},${height}`,
    `l${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD3 = /* @__PURE__ */ __name((x2, y2, width, height, rx, ry) => {
  return [`M${x2 + width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 0,${height}`].join(" ");
}, "createInnerCylinderPathD");
async function tiltedCylinder(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label, halfPadding } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const labelPadding = node.look === "neo" ? halfPadding * 2 : halfPadding;
  const h2 = bbox.height + labelPadding;
  const ry = h2 / 2;
  const rx = ry / (2.5 + h2 / 50);
  const w2 = bbox.width + rx + labelPadding;
  const { cssStyles } = node;
  let cylinder2;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD3(0, 0, w2, h2, rx, ry);
    const innerPathData = createInnerCylinderPathD3(0, 0, w2, h2, rx, ry);
    const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD3(0, 0, w2, h2, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles)).attr("style", nodeStyles);
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.selectAll("path").attr("style", cssStyles);
    }
    if (nodeStyles) {
      cylinder2.selectAll("path").attr("style", nodeStyles);
    }
  }
  cylinder2.attr("label-offset-x", rx);
  cylinder2.attr("transform", `translate(${-w2 / 2}, ${h2 / 2} )`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rx - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, cylinder2);
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const y2 = pos.y - (node.y ?? 0);
    if (ry != 0 && (Math.abs(y2) < (node.height ?? 0) / 2 || Math.abs(y2) == (node.height ?? 0) / 2 && Math.abs(pos.x - (node.x ?? 0)) > (node.width ?? 0) / 2 - rx)) {
      let x2 = rx * rx * (1 - y2 * y2 / (ry * ry));
      if (x2 != 0) {
        x2 = Math.sqrt(Math.abs(x2));
      }
      x2 = rx - x2;
      if (point2.x - (node.x ?? 0) > 0) {
        x2 = -x2;
      }
      pos.x += x2;
    }
    return pos;
  };
  return shapeSvg;
}
__name(tiltedCylinder, "tiltedCylinder");
async function trapezoid(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = bbox.width + node.padding;
  const h2 = bbox.height + node.padding;
  const points = [
    { x: -3 * h2 / 6, y: 0 },
    { x: w2 + 3 * h2 / 6, y: 0 },
    { x: w2, y: -h2 },
    { x: 0, y: -h2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w2 / 2}, ${h2 / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w2, h2, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(trapezoid, "trapezoid");
async function trapezoidalPentagon(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 60, minHeight = 20;
  const w2 = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2 * 0.8, y: -h2 / 2 },
    { x: w2 / 2 * 0.8, y: -h2 / 2 },
    { x: w2 / 2, y: -h2 / 2 * 0.6 },
    { x: w2 / 2, y: h2 / 2 },
    { x: -w2 / 2, y: h2 / 2 },
    { x: -w2 / 2, y: -h2 / 2 * 0.6 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(trapezoidalPentagon, "trapezoidalPentagon");
async function triangle(parent, node) {
  var _a2;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const useHtmlLabels = evaluate((_a2 = getConfig2().flowchart) == null ? void 0 : _a2.htmlLabels);
  const w2 = bbox.width + (node.padding ?? 0);
  const h2 = w2 + bbox.height;
  const tw = w2 + bbox.height;
  const points = [
    { x: 0, y: 0 },
    { x: tw, y: 0 },
    { x: tw / 2, y: -h2 }
  ];
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h2 / 2}, ${h2 / 2})`);
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w2;
  node.height = h2;
  updateNodeBounds(node, polygon);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${h2 / 2 - (bbox.height + (node.padding ?? 0) / (useHtmlLabels ? 2 : 1) - (bbox.y - (bbox.top ?? 0)))})`
  );
  node.intersect = function(point2) {
    log.info("Triangle intersect", node, points, point2);
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(triangle, "triangle");
async function waveEdgedRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const waveAmplitude = h2 / 8;
  const finalH = h2 + waveAmplitude;
  const { cssStyles } = node;
  const minWidth = 70;
  const widthDif = minWidth - w2;
  const extraW = widthDif > 0 ? widthDif / 2 : 0;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2 - extraW, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w2 / 2 - extraW,
      finalH / 2,
      w2 / 2 + extraW,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w2 / 2 + extraW, y: -finalH / 2 },
    { x: -w2 / 2 - extraW, y: -finalH / 2 }
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const waveEdgeRect = shapeSvg.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w2 / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h2 / 2 + (node.padding ?? 0) - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(waveEdgedRectangle, "waveEdgedRectangle");
async function waveRectangle(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 100;
  const minHeight = 50;
  const baseWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const baseHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const aspectRatio = baseWidth / baseHeight;
  let w2 = baseWidth;
  let h2 = baseHeight;
  if (w2 > h2 * aspectRatio) {
    h2 = w2 / aspectRatio;
  } else {
    w2 = h2 * aspectRatio;
  }
  w2 = Math.max(w2, minWidth);
  h2 = Math.max(h2, minHeight);
  const waveAmplitude = Math.min(h2 * 0.2, h2 / 4);
  const finalH = h2 + waveAmplitude * 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w2 / 2, y: finalH / 2 },
    ...generateFullSineWavePoints(-w2 / 2, finalH / 2, w2 / 2, finalH / 2, waveAmplitude, 1),
    { x: w2 / 2, y: -finalH / 2 },
    ...generateFullSineWavePoints(w2 / 2, -finalH / 2, -w2 / 2, -finalH / 2, waveAmplitude, -1)
  ];
  const waveRectPath = createPathFromPoints(points);
  const waveRectNode = rc.path(waveRectPath, options);
  const waveRect = shapeSvg.insert(() => waveRectNode, ":first-child");
  waveRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, waveRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}
__name(waveRectangle, "waveRectangle");
async function windowPane(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w2 = Math.max(bbox.width + (node.padding ?? 0) * 2, (node == null ? void 0 : node.width) ?? 0);
  const h2 = Math.max(bbox.height + (node.padding ?? 0) * 2, (node == null ? void 0 : node.height) ?? 0);
  const rectOffset = 5;
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const { cssStyles } = node;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x2 - rectOffset, y: y2 - rectOffset },
    { x: x2 - rectOffset, y: y2 + h2 },
    { x: x2 + w2, y: y2 + h2 },
    { x: x2 + w2, y: y2 - rectOffset }
  ];
  const path = `M${x2 - rectOffset},${y2 - rectOffset} L${x2 + w2},${y2 - rectOffset} L${x2 + w2},${y2 + h2} L${x2 - rectOffset},${y2 + h2} L${x2 - rectOffset},${y2 - rectOffset}
                M${x2 - rectOffset},${y2} L${x2 + w2},${y2}
                M${x2},${y2 - rectOffset} L${x2},${y2 + h2}`;
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const no = rc.path(path, options);
  const windowPane2 = shapeSvg.insert(() => no, ":first-child");
  windowPane2.attr("transform", `translate(${rectOffset / 2}, ${rectOffset / 2})`);
  windowPane2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) + rectOffset / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, windowPane2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}
__name(windowPane, "windowPane");
async function erBox(parent, node) {
  var _a2, _b2, _c2, _d2;
  const entityNode = node;
  if (entityNode.alias) {
    node.label = entityNode.alias;
  }
  if (node.look === "handDrawn") {
    const { themeVariables: themeVariables2 } = getConfig();
    const { background } = themeVariables2;
    const backgroundNode = {
      ...node,
      id: node.id + "-background",
      look: "default",
      cssStyles: ["stroke: none", `fill: ${background}`]
    };
    await erBox(parent, backgroundNode);
  }
  const config2 = getConfig();
  node.useHtmlLabels = config2.htmlLabels;
  let PADDING = ((_a2 = config2.er) == null ? void 0 : _a2.diagramPadding) ?? 10;
  let TEXT_PADDING = ((_b2 = config2.er) == null ? void 0 : _b2.entityPadding) ?? 6;
  const { cssStyles } = node;
  const { labelStyles, nodeStyles } = styles2String(node);
  if (entityNode.attributes.length === 0 && node.label) {
    const options2 = {
      rx: 0,
      ry: 0,
      labelPaddingX: PADDING,
      labelPaddingY: PADDING * 1.5
    };
    if (calculateTextWidth(node.label, config2) + options2.labelPaddingX * 2 < config2.er.minEntityWidth) {
      node.width = config2.er.minEntityWidth;
    }
    const shapeSvg2 = await drawRect(parent, node, options2);
    if (!evaluate(config2.htmlLabels)) {
      const textElement = shapeSvg2.select("text");
      const bbox = (_c2 = textElement.node()) == null ? void 0 : _c2.getBBox();
      textElement.attr("transform", `translate(${-bbox.width / 2}, 0)`);
    }
    return shapeSvg2;
  }
  if (!config2.htmlLabels) {
    PADDING *= 1.25;
    TEXT_PADDING *= 1.25;
  }
  let cssClasses = getNodeClasses(node);
  if (!cssClasses) {
    cssClasses = "node default";
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const nameBBox = await addText(shapeSvg, node.label ?? "", config2, 0, 0, ["name"], labelStyles);
  nameBBox.height += TEXT_PADDING;
  let yOffset = 0;
  const yOffsets = [];
  const rows = [];
  let maxTypeWidth = 0;
  let maxNameWidth = 0;
  let maxKeysWidth = 0;
  let maxCommentWidth = 0;
  let keysPresent = true;
  let commentPresent = true;
  for (const attribute of entityNode.attributes) {
    const typeBBox = await addText(
      shapeSvg,
      attribute.type,
      config2,
      0,
      yOffset,
      ["attribute-type"],
      labelStyles
    );
    maxTypeWidth = Math.max(maxTypeWidth, typeBBox.width + PADDING);
    const nameBBox2 = await addText(
      shapeSvg,
      attribute.name,
      config2,
      0,
      yOffset,
      ["attribute-name"],
      labelStyles
    );
    maxNameWidth = Math.max(maxNameWidth, nameBBox2.width + PADDING);
    const keysBBox = await addText(
      shapeSvg,
      attribute.keys.join(),
      config2,
      0,
      yOffset,
      ["attribute-keys"],
      labelStyles
    );
    maxKeysWidth = Math.max(maxKeysWidth, keysBBox.width + PADDING);
    const commentBBox = await addText(
      shapeSvg,
      attribute.comment,
      config2,
      0,
      yOffset,
      ["attribute-comment"],
      labelStyles
    );
    maxCommentWidth = Math.max(maxCommentWidth, commentBBox.width + PADDING);
    const rowHeight = Math.max(typeBBox.height, nameBBox2.height, keysBBox.height, commentBBox.height) + TEXT_PADDING;
    rows.push({ yOffset, rowHeight });
    yOffset += rowHeight;
  }
  let totalWidthSections = 4;
  if (maxKeysWidth <= PADDING) {
    keysPresent = false;
    maxKeysWidth = 0;
    totalWidthSections--;
  }
  if (maxCommentWidth <= PADDING) {
    commentPresent = false;
    maxCommentWidth = 0;
    totalWidthSections--;
  }
  const shapeBBox = shapeSvg.node().getBBox();
  if (nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth) > 0) {
    const difference = nameBBox.width + PADDING * 2 - (maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth);
    maxTypeWidth += difference / totalWidthSections;
    maxNameWidth += difference / totalWidthSections;
    if (maxKeysWidth > 0) {
      maxKeysWidth += difference / totalWidthSections;
    }
    if (maxCommentWidth > 0) {
      maxCommentWidth += difference / totalWidthSections;
    }
  }
  const maxWidth = maxTypeWidth + maxNameWidth + maxKeysWidth + maxCommentWidth;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  let totalShapeBBoxHeight = 0;
  if (rows.length > 0) {
    totalShapeBBoxHeight = rows.reduce((sum, row) => sum + ((row == null ? void 0 : row.rowHeight) ?? 0), 0);
  }
  const w2 = Math.max(shapeBBox.width + PADDING * 2, (node == null ? void 0 : node.width) || 0, maxWidth);
  const h2 = Math.max((totalShapeBBoxHeight ?? 0) + nameBBox.height, (node == null ? void 0 : node.height) || 0);
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  shapeSvg.selectAll("g:not(:first-child)").each((_2, i2, nodes) => {
    const text2 = select(nodes[i2]);
    const transform = text2.attr("transform");
    let translateX = 0;
    let translateY = 0;
    if (transform) {
      const regex2 = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex2.exec(transform);
      if (translate) {
        translateX = parseFloat(translate[1]);
        translateY = parseFloat(translate[2]);
        if (text2.attr("class").includes("attribute-name")) {
          translateX += maxTypeWidth;
        } else if (text2.attr("class").includes("attribute-keys")) {
          translateX += maxTypeWidth + maxNameWidth;
        } else if (text2.attr("class").includes("attribute-comment")) {
          translateX += maxTypeWidth + maxNameWidth + maxKeysWidth;
        }
      }
    }
    text2.attr(
      "transform",
      `translate(${x2 + PADDING / 2 + translateX}, ${translateY + y2 + nameBBox.height + TEXT_PADDING / 2})`
    );
  });
  shapeSvg.select(".name").attr("transform", "translate(" + -nameBBox.width / 2 + ", " + (y2 + TEXT_PADDING / 2) + ")");
  const roughRect = rc.rectangle(x2, y2, w2, h2, options);
  const rect2 = shapeSvg.insert(() => roughRect, ":first-child").attr("style", cssStyles.join(""));
  const { themeVariables } = getConfig();
  const { rowEven, rowOdd, nodeBorder } = themeVariables;
  yOffsets.push(0);
  for (const [i2, row] of rows.entries()) {
    const contentRowIndex = i2 + 1;
    const isEven = contentRowIndex % 2 === 0 && row.yOffset !== 0;
    const roughRect2 = rc.rectangle(x2, nameBBox.height + y2 + (row == null ? void 0 : row.yOffset), w2, row == null ? void 0 : row.rowHeight, {
      ...options,
      fill: isEven ? rowEven : rowOdd,
      stroke: nodeBorder
    });
    shapeSvg.insert(() => roughRect2, "g.label").attr("style", cssStyles.join("")).attr("class", `row-rect-${isEven ? "even" : "odd"}`);
  }
  let roughLine = rc.line(x2, nameBBox.height + y2, w2 + x2, nameBBox.height + y2, options);
  shapeSvg.insert(() => roughLine).attr("class", "divider");
  roughLine = rc.line(maxTypeWidth + x2, nameBBox.height + y2, maxTypeWidth + x2, h2 + y2, options);
  shapeSvg.insert(() => roughLine).attr("class", "divider");
  if (keysPresent) {
    roughLine = rc.line(
      maxTypeWidth + maxNameWidth + x2,
      nameBBox.height + y2,
      maxTypeWidth + maxNameWidth + x2,
      h2 + y2,
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  if (commentPresent) {
    roughLine = rc.line(
      maxTypeWidth + maxNameWidth + maxKeysWidth + x2,
      nameBBox.height + y2,
      maxTypeWidth + maxNameWidth + maxKeysWidth + x2,
      h2 + y2,
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  for (const yOffset2 of yOffsets) {
    roughLine = rc.line(
      x2,
      nameBBox.height + y2 + yOffset2,
      w2 + x2,
      nameBBox.height + y2 + yOffset2,
      options
    );
    shapeSvg.insert(() => roughLine).attr("class", "divider");
  }
  updateNodeBounds(node, rect2);
  if (nodeStyles && node.look !== "handDrawn") {
    const allStyle = nodeStyles.split(";");
    const strokeStyles = (_d2 = allStyle == null ? void 0 : allStyle.filter((e2) => {
      return e2.includes("stroke");
    })) == null ? void 0 : _d2.map((s2) => `${s2}`).join("; ");
    shapeSvg.selectAll("path").attr("style", strokeStyles ?? "");
    shapeSvg.selectAll(".row-rect-even path").attr("style", nodeStyles);
  }
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(erBox, "erBox");
async function addText(shapeSvg, labelText, config2, translateX = 0, translateY = 0, classes = [], style = "") {
  const label = shapeSvg.insert("g").attr("class", `label ${classes.join(" ")}`).attr("transform", `translate(${translateX}, ${translateY})`).attr("style", style);
  if (labelText !== parseGenericTypes(labelText)) {
    labelText = parseGenericTypes(labelText);
    labelText = labelText.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  const text2 = label.node().appendChild(
    await createText(
      label,
      labelText,
      {
        width: calculateTextWidth(labelText, config2) + 100,
        style,
        useHtmlLabels: config2.htmlLabels
      },
      config2
    )
  );
  if (labelText.includes("&lt;") || labelText.includes("&gt;")) {
    let child = text2.children[0];
    child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    while (child.childNodes[0]) {
      child = child.childNodes[0];
      child.textContent = child.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    }
  }
  let bbox = text2.getBBox();
  if (evaluate(config2.htmlLabels)) {
    const div = text2.children[0];
    div.style.textAlign = "start";
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  return bbox;
}
__name(addText, "addText");
async function textHelper(parent, node, config2, useHtmlLabels, GAP = config2.class.padding ?? 12) {
  const TEXT_PADDING = !useHtmlLabels ? 3 : 0;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId || node.id);
  let annotationGroup = null;
  let labelGroup = null;
  let membersGroup = null;
  let methodsGroup = null;
  let annotationGroupHeight = 0;
  let labelGroupHeight = 0;
  let membersGroupHeight = 0;
  annotationGroup = shapeSvg.insert("g").attr("class", "annotation-group text");
  if (node.annotations.length > 0) {
    const annotation = node.annotations[0];
    await addText2(annotationGroup, { text: `«${annotation}»` }, 0);
    const annotationGroupBBox = annotationGroup.node().getBBox();
    annotationGroupHeight = annotationGroupBBox.height;
  }
  labelGroup = shapeSvg.insert("g").attr("class", "label-group text");
  await addText2(labelGroup, node, 0, ["font-weight: bolder"]);
  const labelGroupBBox = labelGroup.node().getBBox();
  labelGroupHeight = labelGroupBBox.height;
  membersGroup = shapeSvg.insert("g").attr("class", "members-group text");
  let yOffset = 0;
  for (const member of node.members) {
    const height = await addText2(membersGroup, member, yOffset, [member.parseClassifier()]);
    yOffset += height + TEXT_PADDING;
  }
  membersGroupHeight = membersGroup.node().getBBox().height;
  if (membersGroupHeight <= 0) {
    membersGroupHeight = GAP / 2;
  }
  methodsGroup = shapeSvg.insert("g").attr("class", "methods-group text");
  let methodsYOffset = 0;
  for (const method of node.methods) {
    const height = await addText2(methodsGroup, method, methodsYOffset, [method.parseClassifier()]);
    methodsYOffset += height + TEXT_PADDING;
  }
  let bbox = shapeSvg.node().getBBox();
  if (annotationGroup !== null) {
    const annotationGroupBBox = annotationGroup.node().getBBox();
    annotationGroup.attr("transform", `translate(${-annotationGroupBBox.width / 2})`);
  }
  labelGroup.attr("transform", `translate(${-labelGroupBBox.width / 2}, ${annotationGroupHeight})`);
  bbox = shapeSvg.node().getBBox();
  membersGroup.attr(
    "transform",
    `translate(${0}, ${annotationGroupHeight + labelGroupHeight + GAP * 2})`
  );
  bbox = shapeSvg.node().getBBox();
  methodsGroup.attr(
    "transform",
    `translate(${0}, ${annotationGroupHeight + labelGroupHeight + (membersGroupHeight ? membersGroupHeight + GAP * 4 : GAP * 2)})`
  );
  bbox = shapeSvg.node().getBBox();
  return { shapeSvg, bbox };
}
__name(textHelper, "textHelper");
async function addText2(parentGroup, node, yOffset, styles = []) {
  const textEl = parentGroup.insert("g").attr("class", "label").attr("style", styles.join("; "));
  const config2 = getConfig();
  let useHtmlLabels = "useHtmlLabels" in node ? node.useHtmlLabels : evaluate(config2.htmlLabels) ?? true;
  let textContent = "";
  if ("text" in node) {
    textContent = node.text;
  } else {
    textContent = node.label;
  }
  if (!useHtmlLabels && textContent.startsWith("\\")) {
    textContent = textContent.substring(1);
  }
  if (hasKatex(textContent)) {
    useHtmlLabels = true;
  }
  const text2 = await createText(
    textEl,
    sanitizeText3(decodeEntities(textContent)),
    {
      width: calculateTextWidth(textContent, config2) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels
    },
    config2
  );
  let bbox;
  let numberOfLines = 1;
  if (!useHtmlLabels) {
    if (styles.includes("font-weight: bolder")) {
      select(text2).selectAll("tspan").attr("font-weight", "");
    }
    numberOfLines = text2.children.length;
    const textChild = text2.children[0];
    if (text2.textContent === "" || text2.textContent.includes("&gt")) {
      textChild.textContent = textContent[0] + textContent.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim();
      const preserveSpace = textContent[1] === " ";
      if (preserveSpace) {
        textChild.textContent = textChild.textContent[0] + " " + textChild.textContent.substring(1);
      }
    }
    if (textChild.textContent === "undefined") {
      textChild.textContent = "";
    }
    bbox = text2.getBBox();
  } else {
    const div = text2.children[0];
    const dv = select(text2);
    numberOfLines = div.innerHTML.split("<br>").length;
    if (div.innerHTML.includes("</math>")) {
      numberOfLines += div.innerHTML.split("<mrow>").length - 1;
    }
    const images = div.getElementsByTagName("img");
    if (images) {
      const noImgText = textContent.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...images].map(
          (img) => new Promise((res) => {
            function setupImage() {
              var _a2;
              img.style.display = "flex";
              img.style.flexDirection = "column";
              if (noImgText) {
                const bodyFontSize = ((_a2 = config2.fontSize) == null ? void 0 : _a2.toString()) ?? window.getComputedStyle(document.body).fontSize;
                const enlargingFactor = 5;
                const width = parseInt(bodyFontSize, 10) * enlargingFactor + "px";
                img.style.minWidth = width;
                img.style.maxWidth = width;
              } else {
                img.style.width = "100%";
              }
              res(img);
            }
            __name(setupImage, "setupImage");
            setTimeout(() => {
              if (img.complete) {
                setupImage();
              }
            });
            img.addEventListener("error", setupImage);
            img.addEventListener("load", setupImage);
          })
        )
      );
    }
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  textEl.attr("transform", "translate(0," + (-bbox.height / (2 * numberOfLines) + yOffset) + ")");
  return bbox.height;
}
__name(addText2, "addText");
async function classBox(parent, node) {
  var _a2, _b2;
  const config2 = getConfig2();
  const PADDING = config2.class.padding ?? 12;
  const GAP = PADDING;
  const useHtmlLabels = node.useHtmlLabels ?? evaluate(config2.htmlLabels) ?? true;
  const classNode = node;
  classNode.annotations = classNode.annotations ?? [];
  classNode.members = classNode.members ?? [];
  classNode.methods = classNode.methods ?? [];
  const { shapeSvg, bbox } = await textHelper(parent, node, config2, useHtmlLabels, GAP);
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  node.cssStyles = classNode.styles || "";
  const styles = ((_a2 = classNode.styles) == null ? void 0 : _a2.join(";")) || nodeStyles || "";
  if (!node.cssStyles) {
    node.cssStyles = styles.replaceAll("!important", "").split(";");
  }
  const renderExtraBox = classNode.members.length === 0 && classNode.methods.length === 0 && !((_b2 = config2.class) == null ? void 0 : _b2.hideEmptyMembersBox);
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const w2 = bbox.width;
  let h2 = bbox.height;
  if (classNode.members.length === 0 && classNode.methods.length === 0) {
    h2 += GAP;
  } else if (classNode.members.length > 0 && classNode.methods.length === 0) {
    h2 += GAP * 2;
  }
  const x2 = -w2 / 2;
  const y2 = -h2 / 2;
  const roughRect = rc.rectangle(
    x2 - PADDING,
    y2 - PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0),
    w2 + 2 * PADDING,
    h2 + 2 * PADDING + (renderExtraBox ? PADDING * 2 : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING : 0),
    options
  );
  const rect2 = shapeSvg.insert(() => roughRect, ":first-child");
  rect2.attr("class", "basic label-container");
  const rectBBox = rect2.node().getBBox();
  shapeSvg.selectAll(".text").each((_2, i2, nodes) => {
    var _a3;
    const text2 = select(nodes[i2]);
    const transform = text2.attr("transform");
    let translateY = 0;
    if (transform) {
      const regex2 = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex2.exec(transform);
      if (translate) {
        translateY = parseFloat(translate[2]);
      }
    }
    let newTranslateY = translateY + y2 + PADDING - (renderExtraBox ? PADDING : classNode.members.length === 0 && classNode.methods.length === 0 ? -PADDING / 2 : 0);
    if (!useHtmlLabels) {
      newTranslateY -= 4;
    }
    let newTranslateX = x2;
    if (text2.attr("class").includes("label-group") || text2.attr("class").includes("annotation-group")) {
      newTranslateX = -((_a3 = text2.node()) == null ? void 0 : _a3.getBBox().width) / 2 || 0;
      shapeSvg.selectAll("text").each(function(_22, i22, nodes2) {
        if (window.getComputedStyle(nodes2[i22]).textAnchor === "middle") {
          newTranslateX = 0;
        }
      });
    }
    text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY})`);
  });
  const annotationGroupHeight = shapeSvg.select(".annotation-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  const labelGroupHeight = shapeSvg.select(".label-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  const membersGroupHeight = shapeSvg.select(".members-group").node().getBBox().height - (renderExtraBox ? PADDING / 2 : 0) || 0;
  if (classNode.members.length > 0 || classNode.methods.length > 0 || renderExtraBox) {
    const roughLine = rc.line(
      rectBBox.x,
      annotationGroupHeight + labelGroupHeight + y2 + PADDING,
      rectBBox.x + rectBBox.width,
      annotationGroupHeight + labelGroupHeight + y2 + PADDING,
      options
    );
    const line2 = shapeSvg.insert(() => roughLine);
    line2.attr("class", "divider").attr("style", styles);
  }
  if (renderExtraBox || classNode.members.length > 0 || classNode.methods.length > 0) {
    const roughLine = rc.line(
      rectBBox.x,
      annotationGroupHeight + labelGroupHeight + membersGroupHeight + y2 + GAP * 2 + PADDING,
      rectBBox.x + rectBBox.width,
      annotationGroupHeight + labelGroupHeight + membersGroupHeight + y2 + PADDING + GAP * 2,
      options
    );
    const line2 = shapeSvg.insert(() => roughLine);
    line2.attr("class", "divider").attr("style", styles);
  }
  if (classNode.look !== "handDrawn") {
    shapeSvg.selectAll("path").attr("style", styles);
  }
  rect2.select(":nth-child(2)").attr("style", styles);
  shapeSvg.selectAll(".divider").select("path").attr("style", styles);
  if (node.labelStyle) {
    shapeSvg.selectAll("span").attr("style", node.labelStyle);
  } else {
    shapeSvg.selectAll("span").attr("style", styles);
  }
  if (!useHtmlLabels) {
    const colorRegex = RegExp(/color\s*:\s*([^;]*)/);
    const match = colorRegex.exec(styles);
    if (match) {
      const colorStyle = match[0].replace("color", "fill");
      shapeSvg.selectAll("tspan").attr("style", colorStyle);
    } else if (labelStyles) {
      const match2 = colorRegex.exec(labelStyles);
      if (match2) {
        const colorStyle = match2[0].replace("color", "fill");
        shapeSvg.selectAll("tspan").attr("style", colorStyle);
      }
    }
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(classBox, "classBox");
async function requirementBox(parent, node) {
  var _a2, _b2;
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const requirementNode = node;
  const elementNode = node;
  const padding = 20;
  const gap = 20;
  const isRequirementNode = "verifyMethod" in node;
  const classes = getNodeClasses(node);
  const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId ?? node.id);
  let typeHeight;
  if (isRequirementNode) {
    typeHeight = await addText3(
      shapeSvg,
      `&lt;&lt;${requirementNode.type}&gt;&gt;`,
      0,
      node.labelStyle
    );
  } else {
    typeHeight = await addText3(shapeSvg, "&lt;&lt;Element&gt;&gt;", 0, node.labelStyle);
  }
  let accumulativeHeight = typeHeight;
  const nameHeight = await addText3(
    shapeSvg,
    requirementNode.name,
    accumulativeHeight,
    node.labelStyle + "; font-weight: bold;"
  );
  accumulativeHeight += nameHeight + gap;
  if (isRequirementNode) {
    const idHeight = await addText3(
      shapeSvg,
      `${requirementNode.requirementId ? `ID: ${requirementNode.requirementId}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
    accumulativeHeight += idHeight;
    const textHeight = await addText3(
      shapeSvg,
      `${requirementNode.text ? `Text: ${requirementNode.text}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
    accumulativeHeight += textHeight;
    const riskHeight = await addText3(
      shapeSvg,
      `${requirementNode.risk ? `Risk: ${requirementNode.risk}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
    accumulativeHeight += riskHeight;
    await addText3(
      shapeSvg,
      `${requirementNode.verifyMethod ? `Verification: ${requirementNode.verifyMethod}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
  } else {
    const typeHeight2 = await addText3(
      shapeSvg,
      `${elementNode.type ? `Type: ${elementNode.type}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
    accumulativeHeight += typeHeight2;
    await addText3(
      shapeSvg,
      `${elementNode.docRef ? `Doc Ref: ${elementNode.docRef}` : ""}`,
      accumulativeHeight,
      node.labelStyle
    );
  }
  const totalWidth = (((_a2 = shapeSvg.node()) == null ? void 0 : _a2.getBBox().width) ?? 200) + padding;
  const totalHeight = (((_b2 = shapeSvg.node()) == null ? void 0 : _b2.getBBox().height) ?? 200) + padding;
  const x2 = -totalWidth / 2;
  const y2 = -totalHeight / 2;
  const rc = at.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughRect = rc.rectangle(x2, y2, totalWidth, totalHeight, options);
  const rect2 = shapeSvg.insert(() => roughRect, ":first-child");
  rect2.attr("class", "basic label-container").attr("style", nodeStyles);
  shapeSvg.selectAll(".label").each((_2, i2, nodes) => {
    const text2 = select(nodes[i2]);
    const transform = text2.attr("transform");
    let translateX = 0;
    let translateY = 0;
    if (transform) {
      const regex2 = RegExp(/translate\(([^,]+),([^)]+)\)/);
      const translate = regex2.exec(transform);
      if (translate) {
        translateX = parseFloat(translate[1]);
        translateY = parseFloat(translate[2]);
      }
    }
    const newTranslateY = translateY - totalHeight / 2;
    let newTranslateX = x2 + padding / 2;
    if (i2 === 0 || i2 === 1) {
      newTranslateX = translateX;
    }
    text2.attr("transform", `translate(${newTranslateX}, ${newTranslateY + padding})`);
  });
  if (accumulativeHeight > typeHeight + nameHeight + gap) {
    const roughLine = rc.line(
      x2,
      y2 + typeHeight + nameHeight + gap,
      x2 + totalWidth,
      y2 + typeHeight + nameHeight + gap,
      options
    );
    const dividerLine = shapeSvg.insert(() => roughLine);
    dividerLine.attr("style", nodeStyles);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(requirementBox, "requirementBox");
async function addText3(parentGroup, inputText, yOffset, style = "") {
  if (inputText === "") {
    return 0;
  }
  const textEl = parentGroup.insert("g").attr("class", "label").attr("style", style);
  const config2 = getConfig2();
  const useHtmlLabels = config2.htmlLabels ?? true;
  const text2 = await createText(
    textEl,
    sanitizeText3(decodeEntities(inputText)),
    {
      width: calculateTextWidth(inputText, config2) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels,
      style
    },
    config2
  );
  let bbox;
  if (!useHtmlLabels) {
    const textChild = text2.children[0];
    for (const child of textChild.children) {
      child.textContent = child.textContent.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
      if (style) {
        child.setAttribute("style", style);
      }
    }
    bbox = text2.getBBox();
    bbox.height += 6;
  } else {
    const div = text2.children[0];
    const dv = select(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  textEl.attr("transform", `translate(${-bbox.width / 2},${-bbox.height / 2 + yOffset})`);
  return bbox.height;
}
__name(addText3, "addText");
var colorFromPriority = /* @__PURE__ */ __name((priority) => {
  switch (priority) {
    case "Very High":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return null;
    // no stroke
    case "Low":
      return "blue";
    case "Very Low":
      return "lightblue";
  }
}, "colorFromPriority");
async function kanbanItem(parent, kanbanNode, { config: config2 }) {
  var _a2, _b2;
  const { labelStyles, nodeStyles } = styles2String(kanbanNode);
  kanbanNode.labelStyle = labelStyles || "";
  const labelPaddingX = 10;
  const orgWidth = kanbanNode.width;
  kanbanNode.width = (kanbanNode.width ?? 200) - 10;
  const {
    shapeSvg,
    bbox,
    label: labelElTitle
  } = await labelHelper(parent, kanbanNode, getNodeClasses(kanbanNode));
  const padding = kanbanNode.padding || 10;
  let ticketUrl = "";
  let link;
  if ("ticket" in kanbanNode && kanbanNode.ticket && ((_a2 = config2 == null ? void 0 : config2.kanban) == null ? void 0 : _a2.ticketBaseUrl)) {
    ticketUrl = (_b2 = config2 == null ? void 0 : config2.kanban) == null ? void 0 : _b2.ticketBaseUrl.replace("#TICKET#", kanbanNode.ticket);
    link = shapeSvg.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", ticketUrl).attr("target", "_blank");
  }
  const options = {
    useHtmlLabels: kanbanNode.useHtmlLabels,
    labelStyle: kanbanNode.labelStyle || "",
    width: kanbanNode.width,
    img: kanbanNode.img,
    padding: kanbanNode.padding || 8,
    centerLabel: false
  };
  let labelEl, bbox2;
  if (link) {
    ({ label: labelEl, bbox: bbox2 } = await insertLabel(
      link,
      "ticket" in kanbanNode && kanbanNode.ticket || "",
      options
    ));
  } else {
    ({ label: labelEl, bbox: bbox2 } = await insertLabel(
      shapeSvg,
      "ticket" in kanbanNode && kanbanNode.ticket || "",
      options
    ));
  }
  const { label: labelElAssigned, bbox: bboxAssigned } = await insertLabel(
    shapeSvg,
    "assigned" in kanbanNode && kanbanNode.assigned || "",
    options
  );
  kanbanNode.width = orgWidth;
  const labelPaddingY = 10;
  const totalWidth = (kanbanNode == null ? void 0 : kanbanNode.width) || 0;
  const heightAdj = Math.max(bbox2.height, bboxAssigned.height) / 2;
  const totalHeight = Math.max(bbox.height + labelPaddingY * 2, (kanbanNode == null ? void 0 : kanbanNode.height) || 0) + heightAdj;
  const x2 = -totalWidth / 2;
  const y2 = -totalHeight / 2;
  labelElTitle.attr(
    "transform",
    "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj - bbox.height / 2) + ")"
  );
  labelEl.attr(
    "transform",
    "translate(" + (padding - totalWidth / 2) + ", " + (-heightAdj + bbox.height / 2) + ")"
  );
  labelElAssigned.attr(
    "transform",
    "translate(" + (padding + totalWidth / 2 - bboxAssigned.width - 2 * labelPaddingX) + ", " + (-heightAdj + bbox.height / 2) + ")"
  );
  let rect2;
  const { rx, ry } = kanbanNode;
  const { cssStyles } = kanbanNode;
  if (kanbanNode.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options2 = userNodeOverrides(kanbanNode, {});
    const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x2, y2, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x2, y2, totalWidth, totalHeight, options2);
    rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    rect2.attr("class", "basic label-container").attr("style", cssStyles ? cssStyles : null);
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("class", "basic label-container __APA__").attr("style", nodeStyles).attr("rx", rx ?? 5).attr("ry", ry ?? 5).attr("x", x2).attr("y", y2).attr("width", totalWidth).attr("height", totalHeight);
    const priority = "priority" in kanbanNode && kanbanNode.priority;
    if (priority) {
      const line2 = shapeSvg.append("line");
      const lineX = x2 + 2;
      const y1 = y2 + Math.floor((rx ?? 0) / 2);
      const y22 = y2 + totalHeight - Math.floor((rx ?? 0) / 2);
      line2.attr("x1", lineX).attr("y1", y1).attr("x2", lineX).attr("y2", y22).attr("stroke-width", "4").attr("stroke", colorFromPriority(priority));
    }
  }
  updateNodeBounds(kanbanNode, rect2);
  kanbanNode.height = totalHeight;
  kanbanNode.intersect = function(point2) {
    return intersect_default.rect(kanbanNode, point2);
  };
  return shapeSvg;
}
__name(kanbanItem, "kanbanItem");
async function bang(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w2 = bbox.width + 10 * halfPadding;
  const h2 = bbox.height + 8 * halfPadding;
  const r2 = 0.15 * w2;
  const { cssStyles } = node;
  const minWidth = bbox.width + 20;
  const minHeight = bbox.height + 20;
  const effectiveWidth = Math.max(w2, minWidth);
  const effectiveHeight = Math.max(h2, minHeight);
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  let bangElem;
  const path = `M0 0 
    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.25},${-1 * effectiveHeight * 0.1}
    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.25},${0}
    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.25},${0}
    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.25},${effectiveHeight * 0.1}

    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.15},${effectiveHeight * 0.33}
    a${r2 * 0.8},${r2 * 0.8} 1 0,0 0,${effectiveHeight * 0.34}
    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.15},${effectiveHeight * 0.33}

    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.25},${effectiveHeight * 0.15}
    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.25},0
    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.25},0
    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.25},${-1 * effectiveHeight * 0.15}

    a${r2},${r2} 1 0,0 ${-1 * effectiveWidth * 0.1},${-1 * effectiveHeight * 0.33}
    a${r2 * 0.8},${r2 * 0.8} 1 0,0 0,${-1 * effectiveHeight * 0.34}
    a${r2},${r2} 1 0,0 ${effectiveWidth * 0.1},${-1 * effectiveHeight * 0.33}
  H0 V0 Z`;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(path, options);
    bangElem = shapeSvg.insert(() => roughNode, ":first-child");
    bangElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    bangElem = shapeSvg.insert("path", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("d", path);
  }
  bangElem.attr("transform", `translate(${-effectiveWidth / 2}, ${-effectiveHeight / 2})`);
  updateNodeBounds(node, bangElem);
  node.calcIntersect = function(bounds, point2) {
    return intersect_default.rect(bounds, point2);
  };
  node.intersect = function(point2) {
    log.info("Bang intersect", node, point2);
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(bang, "bang");
async function cloud(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w2 = bbox.width + 2 * halfPadding;
  const h2 = bbox.height + 2 * halfPadding;
  const r1 = 0.15 * w2;
  const r2 = 0.25 * w2;
  const r3 = 0.35 * w2;
  const r4 = 0.2 * w2;
  const { cssStyles } = node;
  let cloudElem;
  const path = `M0 0 
    a${r1},${r1} 0 0,1 ${w2 * 0.25},${-1 * w2 * 0.1}
    a${r3},${r3} 1 0,1 ${w2 * 0.4},${-1 * w2 * 0.1}
    a${r2},${r2} 1 0,1 ${w2 * 0.35},${w2 * 0.2}

    a${r1},${r1} 1 0,1 ${w2 * 0.15},${h2 * 0.35}
    a${r4},${r4} 1 0,1 ${-1 * w2 * 0.15},${h2 * 0.65}

    a${r2},${r1} 1 0,1 ${-1 * w2 * 0.25},${w2 * 0.15}
    a${r3},${r3} 1 0,1 ${-1 * w2 * 0.5},0
    a${r1},${r1} 1 0,1 ${-1 * w2 * 0.25},${-1 * w2 * 0.15}

    a${r1},${r1} 1 0,1 ${-1 * w2 * 0.1},${-1 * h2 * 0.35}
    a${r4},${r4} 1 0,1 ${w2 * 0.1},${-1 * h2 * 0.65}
  H0 V0 Z`;
  if (node.look === "handDrawn") {
    const rc = at.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(path, options);
    cloudElem = shapeSvg.insert(() => roughNode, ":first-child");
    cloudElem.attr("class", "basic label-container").attr("style", handleUndefinedAttr(cssStyles));
  } else {
    cloudElem = shapeSvg.insert("path", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("d", path);
  }
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  cloudElem.attr("transform", `translate(${-w2 / 2}, ${-h2 / 2})`);
  updateNodeBounds(node, cloudElem);
  node.calcIntersect = function(bounds, point2) {
    return intersect_default.rect(bounds, point2);
  };
  node.intersect = function(point2) {
    log.info("Cloud intersect", node, point2);
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(cloud, "cloud");
async function defaultMindmapNode(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const w2 = bbox.width + 8 * halfPadding;
  const h2 = bbox.height + 2 * halfPadding;
  const rd = 5;
  const rectPath = `
    M${-w2 / 2} ${h2 / 2 - rd}
    v${-h2 + 2 * rd}
    q0,-${rd} ${rd},-${rd}
    h${w2 - 2 * rd}
    q${rd},0 ${rd},${rd}
    v${h2 - 2 * rd}
    q0,${rd} -${rd},${rd}
    h${-w2 + 2 * rd}
    q-${rd},0 -${rd},-${rd}
    Z
  `;
  const bg = shapeSvg.append("path").attr("id", "node-" + node.id).attr("class", "node-bkg node-" + node.type).attr("style", nodeStyles).attr("d", rectPath);
  shapeSvg.append("line").attr("class", "node-line-").attr("x1", -w2 / 2).attr("y1", h2 / 2).attr("x2", w2 / 2).attr("y2", h2 / 2);
  label.attr("transform", `translate(${-bbox.width / 2}, ${-bbox.height / 2})`);
  shapeSvg.append(() => label.node());
  updateNodeBounds(node, bg);
  node.calcIntersect = function(bounds, point2) {
    return intersect_default.rect(bounds, point2);
  };
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(defaultMindmapNode, "defaultMindmapNode");
async function mindmapCircle(parent, node) {
  const options = {
    padding: node.padding ?? 0
  };
  return circle$1(parent, node, options);
}
__name(mindmapCircle, "mindmapCircle");
var shapesDefs = [
  {
    semanticName: "Process",
    name: "Rectangle",
    shortName: "rect",
    description: "Standard process shape",
    aliases: ["proc", "process", "rectangle"],
    internalAliases: ["squareRect"],
    handler: squareRect2
  },
  {
    semanticName: "Event",
    name: "Rounded Rectangle",
    shortName: "rounded",
    description: "Represents an event",
    aliases: ["event"],
    internalAliases: ["roundedRect"],
    handler: roundedRect
  },
  {
    semanticName: "Terminal Point",
    name: "Stadium",
    shortName: "stadium",
    description: "Terminal point",
    aliases: ["terminal", "pill"],
    handler: stadium
  },
  {
    semanticName: "Subprocess",
    name: "Framed Rectangle",
    shortName: "fr-rect",
    description: "Subprocess",
    aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"],
    handler: subroutine
  },
  {
    semanticName: "Database",
    name: "Cylinder",
    shortName: "cyl",
    description: "Database storage",
    aliases: ["db", "database", "cylinder"],
    handler: cylinder
  },
  {
    semanticName: "Start",
    name: "Circle",
    shortName: "circle",
    description: "Starting point",
    aliases: ["circ"],
    handler: circle$1
  },
  {
    semanticName: "Bang",
    name: "Bang",
    shortName: "bang",
    description: "Bang",
    aliases: ["bang"],
    handler: bang
  },
  {
    semanticName: "Cloud",
    name: "Cloud",
    shortName: "cloud",
    description: "cloud",
    aliases: ["cloud"],
    handler: cloud
  },
  {
    semanticName: "Decision",
    name: "Diamond",
    shortName: "diam",
    description: "Decision-making step",
    aliases: ["decision", "diamond", "question"],
    handler: question
  },
  {
    semanticName: "Prepare Conditional",
    name: "Hexagon",
    shortName: "hex",
    description: "Preparation or condition step",
    aliases: ["hexagon", "prepare"],
    handler: hexagon
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Right",
    shortName: "lean-r",
    description: "Represents input or output",
    aliases: ["lean-right", "in-out"],
    internalAliases: ["lean_right"],
    handler: lean_right
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Left",
    shortName: "lean-l",
    description: "Represents output or input",
    aliases: ["lean-left", "out-in"],
    internalAliases: ["lean_left"],
    handler: lean_left
  },
  {
    semanticName: "Priority Action",
    name: "Trapezoid Base Bottom",
    shortName: "trap-b",
    description: "Priority action",
    aliases: ["priority", "trapezoid-bottom", "trapezoid"],
    handler: trapezoid
  },
  {
    semanticName: "Manual Operation",
    name: "Trapezoid Base Top",
    shortName: "trap-t",
    description: "Represents a manual task",
    aliases: ["manual", "trapezoid-top", "inv-trapezoid"],
    internalAliases: ["inv_trapezoid"],
    handler: inv_trapezoid
  },
  {
    semanticName: "Stop",
    name: "Double Circle",
    shortName: "dbl-circ",
    description: "Represents a stop point",
    aliases: ["double-circle"],
    internalAliases: ["doublecircle"],
    handler: doublecircle
  },
  {
    semanticName: "Text Block",
    name: "Text Block",
    shortName: "text",
    description: "Text block",
    handler: text
  },
  {
    semanticName: "Card",
    name: "Notched Rectangle",
    shortName: "notch-rect",
    description: "Represents a card",
    aliases: ["card", "notched-rectangle"],
    handler: card
  },
  {
    semanticName: "Lined/Shaded Process",
    name: "Lined Rectangle",
    shortName: "lin-rect",
    description: "Lined process shape",
    aliases: ["lined-rectangle", "lined-process", "lin-proc", "shaded-process"],
    handler: shadedProcess
  },
  {
    semanticName: "Start",
    name: "Small Circle",
    shortName: "sm-circ",
    description: "Small starting point",
    aliases: ["start", "small-circle"],
    internalAliases: ["stateStart"],
    handler: stateStart
  },
  {
    semanticName: "Stop",
    name: "Framed Circle",
    shortName: "fr-circ",
    description: "Stop point",
    aliases: ["stop", "framed-circle"],
    internalAliases: ["stateEnd"],
    handler: stateEnd
  },
  {
    semanticName: "Fork/Join",
    name: "Filled Rectangle",
    shortName: "fork",
    description: "Fork or join in process flow",
    aliases: ["join"],
    internalAliases: ["forkJoin"],
    handler: forkJoin
  },
  {
    semanticName: "Collate",
    name: "Hourglass",
    shortName: "hourglass",
    description: "Represents a collate operation",
    aliases: ["hourglass", "collate"],
    handler: hourglass
  },
  {
    semanticName: "Comment",
    name: "Curly Brace",
    shortName: "brace",
    description: "Adds a comment",
    aliases: ["comment", "brace-l"],
    handler: curlyBraceLeft
  },
  {
    semanticName: "Comment Right",
    name: "Curly Brace",
    shortName: "brace-r",
    description: "Adds a comment",
    handler: curlyBraceRight
  },
  {
    semanticName: "Comment with braces on both sides",
    name: "Curly Braces",
    shortName: "braces",
    description: "Adds a comment",
    handler: curlyBraces
  },
  {
    semanticName: "Com Link",
    name: "Lightning Bolt",
    shortName: "bolt",
    description: "Communication link",
    aliases: ["com-link", "lightning-bolt"],
    handler: lightningBolt
  },
  {
    semanticName: "Document",
    name: "Document",
    shortName: "doc",
    description: "Represents a document",
    aliases: ["doc", "document"],
    handler: waveEdgedRectangle
  },
  {
    semanticName: "Delay",
    name: "Half-Rounded Rectangle",
    shortName: "delay",
    description: "Represents a delay",
    aliases: ["half-rounded-rectangle"],
    handler: halfRoundedRectangle
  },
  {
    semanticName: "Direct Access Storage",
    name: "Horizontal Cylinder",
    shortName: "h-cyl",
    description: "Direct access storage",
    aliases: ["das", "horizontal-cylinder"],
    handler: tiltedCylinder
  },
  {
    semanticName: "Disk Storage",
    name: "Lined Cylinder",
    shortName: "lin-cyl",
    description: "Disk storage",
    aliases: ["disk", "lined-cylinder"],
    handler: linedCylinder
  },
  {
    semanticName: "Display",
    name: "Curved Trapezoid",
    shortName: "curv-trap",
    description: "Represents a display",
    aliases: ["curved-trapezoid", "display"],
    handler: curvedTrapezoid
  },
  {
    semanticName: "Divided Process",
    name: "Divided Rectangle",
    shortName: "div-rect",
    description: "Divided process shape",
    aliases: ["div-proc", "divided-rectangle", "divided-process"],
    handler: dividedRectangle
  },
  {
    semanticName: "Extract",
    name: "Triangle",
    shortName: "tri",
    description: "Extraction process",
    aliases: ["extract", "triangle"],
    handler: triangle
  },
  {
    semanticName: "Internal Storage",
    name: "Window Pane",
    shortName: "win-pane",
    description: "Internal storage",
    aliases: ["internal-storage", "window-pane"],
    handler: windowPane
  },
  {
    semanticName: "Junction",
    name: "Filled Circle",
    shortName: "f-circ",
    description: "Junction point",
    aliases: ["junction", "filled-circle"],
    handler: filledCircle
  },
  {
    semanticName: "Loop Limit",
    name: "Trapezoidal Pentagon",
    shortName: "notch-pent",
    description: "Loop limit step",
    aliases: ["loop-limit", "notched-pentagon"],
    handler: trapezoidalPentagon
  },
  {
    semanticName: "Manual File",
    name: "Flipped Triangle",
    shortName: "flip-tri",
    description: "Manual file operation",
    aliases: ["manual-file", "flipped-triangle"],
    handler: flippedTriangle
  },
  {
    semanticName: "Manual Input",
    name: "Sloped Rectangle",
    shortName: "sl-rect",
    description: "Manual input step",
    aliases: ["manual-input", "sloped-rectangle"],
    handler: slopedRect
  },
  {
    semanticName: "Multi-Document",
    name: "Stacked Document",
    shortName: "docs",
    description: "Multiple documents",
    aliases: ["documents", "st-doc", "stacked-document"],
    handler: multiWaveEdgedRectangle
  },
  {
    semanticName: "Multi-Process",
    name: "Stacked Rectangle",
    shortName: "st-rect",
    description: "Multiple processes",
    aliases: ["procs", "processes", "stacked-rectangle"],
    handler: multiRect
  },
  {
    semanticName: "Stored Data",
    name: "Bow Tie Rectangle",
    shortName: "bow-rect",
    description: "Stored data",
    aliases: ["stored-data", "bow-tie-rectangle"],
    handler: bowTieRect
  },
  {
    semanticName: "Summary",
    name: "Crossed Circle",
    shortName: "cross-circ",
    description: "Summary",
    aliases: ["summary", "crossed-circle"],
    handler: crossedCircle
  },
  {
    semanticName: "Tagged Document",
    name: "Tagged Document",
    shortName: "tag-doc",
    description: "Tagged document",
    aliases: ["tag-doc", "tagged-document"],
    handler: taggedWaveEdgedRectangle
  },
  {
    semanticName: "Tagged Process",
    name: "Tagged Rectangle",
    shortName: "tag-rect",
    description: "Tagged process",
    aliases: ["tagged-rectangle", "tag-proc", "tagged-process"],
    handler: taggedRect
  },
  {
    semanticName: "Paper Tape",
    name: "Flag",
    shortName: "flag",
    description: "Paper tape",
    aliases: ["paper-tape"],
    handler: waveRectangle
  },
  {
    semanticName: "Odd",
    name: "Odd",
    shortName: "odd",
    description: "Odd shape",
    internalAliases: ["rect_left_inv_arrow"],
    handler: rect_left_inv_arrow
  },
  {
    semanticName: "Lined Document",
    name: "Lined Document",
    shortName: "lin-doc",
    description: "Lined document",
    aliases: ["lined-document"],
    handler: linedWaveEdgedRect
  }
];
var generateShapeMap = /* @__PURE__ */ __name(() => {
  const undocumentedShapes = {
    // States
    state,
    choice,
    note,
    // Rectangles
    rectWithTitle,
    labelRect,
    // Icons
    iconSquare,
    iconCircle,
    icon,
    iconRounded,
    imageSquare,
    anchor,
    // Kanban diagram
    kanbanItem,
    //Mindmap diagram
    mindmapCircle,
    defaultMindmapNode,
    // class diagram
    classBox,
    // er diagram
    erBox,
    // Requirement diagram
    requirementBox
  };
  const entries2 = [
    ...Object.entries(undocumentedShapes),
    ...shapesDefs.flatMap((shape) => {
      const aliases = [
        shape.shortName,
        ..."aliases" in shape ? shape.aliases : [],
        ..."internalAliases" in shape ? shape.internalAliases : []
      ];
      return aliases.map((alias) => [alias, shape.handler]);
    })
  ];
  return Object.fromEntries(entries2);
}, "generateShapeMap");
var shapes2 = generateShapeMap();
function isValidShape(shape) {
  return shape in shapes2;
}
__name(isValidShape, "isValidShape");
var nodeElems = /* @__PURE__ */ new Map();
async function insertNode(elem, node, renderOptions) {
  let newEl;
  let el;
  if (node.shape === "rect") {
    if (node.rx && node.ry) {
      node.shape = "roundedRect";
    } else {
      node.shape = "squareRect";
    }
  }
  const shapeHandler = node.shape ? shapes2[node.shape] : void 0;
  if (!shapeHandler) {
    throw new Error(`No such shape: ${node.shape}. Please check your syntax.`);
  }
  if (node.link) {
    let target;
    if (renderOptions.config.securityLevel === "sandbox") {
      target = "_top";
    } else if (node.linkTarget) {
      target = node.linkTarget || "_blank";
    }
    newEl = elem.insert("svg:a").attr("xlink:href", node.link).attr("target", target ?? null);
    el = await shapeHandler(newEl, node, renderOptions);
  } else {
    el = await shapeHandler(elem, node, renderOptions);
    newEl = el;
  }
  if (node.tooltip) {
    el.attr("title", node.tooltip);
  }
  nodeElems.set(node.id, newEl);
  if (node.haveCallback) {
    newEl.attr("class", newEl.attr("class") + " clickable");
  }
  return newEl;
}
__name(insertNode, "insertNode");
var setNodeElem = /* @__PURE__ */ __name((elem, node) => {
  nodeElems.set(node.id, elem);
}, "setNodeElem");
var clear2 = /* @__PURE__ */ __name(() => {
  nodeElems.clear();
}, "clear");
var positionNode = /* @__PURE__ */ __name((node) => {
  const el = nodeElems.get(node.id);
  log.trace(
    "Transforming node",
    node.diff,
    node,
    "translate(" + (node.x - node.width / 2 - 5) + ", " + node.width / 2 + ")"
  );
  const padding = 8;
  const diff = node.diff || 0;
  if (node.clusterNode) {
    el.attr(
      "transform",
      "translate(" + (node.x + diff - node.width / 2) + ", " + (node.y - node.height / 2 - padding) + ")"
    );
  } else {
    el.attr("transform", "translate(" + node.x + ", " + node.y + ")");
  }
  return diff;
}, "positionNode");
var addEdgeMarkers = /* @__PURE__ */ __name((svgPath, edge, url, id28, diagramType, strokeColor) => {
  if (edge.arrowTypeStart) {
    addEdgeMarker(svgPath, "start", edge.arrowTypeStart, url, id28, diagramType, strokeColor);
  }
  if (edge.arrowTypeEnd) {
    addEdgeMarker(svgPath, "end", edge.arrowTypeEnd, url, id28, diagramType, strokeColor);
  }
}, "addEdgeMarkers");
var arrowTypesMap = {
  arrow_cross: { type: "cross", fill: false },
  arrow_point: { type: "point", fill: true },
  arrow_barb: { type: "barb", fill: true },
  arrow_circle: { type: "circle", fill: false },
  aggregation: { type: "aggregation", fill: false },
  extension: { type: "extension", fill: false },
  composition: { type: "composition", fill: true },
  dependency: { type: "dependency", fill: true },
  lollipop: { type: "lollipop", fill: false },
  only_one: { type: "onlyOne", fill: false },
  zero_or_one: { type: "zeroOrOne", fill: false },
  one_or_more: { type: "oneOrMore", fill: false },
  zero_or_more: { type: "zeroOrMore", fill: false },
  requirement_arrow: { type: "requirement_arrow", fill: false },
  requirement_contains: { type: "requirement_contains", fill: false }
};
var addEdgeMarker = /* @__PURE__ */ __name((svgPath, position, arrowType, url, id28, diagramType, strokeColor) => {
  var _a2;
  const arrowTypeInfo = arrowTypesMap[arrowType];
  if (!arrowTypeInfo) {
    log.warn(`Unknown arrow type: ${arrowType}`);
    return;
  }
  const endMarkerType = arrowTypeInfo.type;
  const suffix = position === "start" ? "Start" : "End";
  const originalMarkerId = `${id28}_${diagramType}-${endMarkerType}${suffix}`;
  if (strokeColor && strokeColor.trim() !== "") {
    const colorId = strokeColor.replace(/[^\dA-Za-z]/g, "_");
    const coloredMarkerId = `${originalMarkerId}_${colorId}`;
    if (!document.getElementById(coloredMarkerId)) {
      const originalMarker = document.getElementById(originalMarkerId);
      if (originalMarker) {
        const coloredMarker = originalMarker.cloneNode(true);
        coloredMarker.id = coloredMarkerId;
        const paths = coloredMarker.querySelectorAll("path, circle, line");
        paths.forEach((path) => {
          path.setAttribute("stroke", strokeColor);
          if (arrowTypeInfo.fill) {
            path.setAttribute("fill", strokeColor);
          }
        });
        (_a2 = originalMarker.parentNode) == null ? void 0 : _a2.appendChild(coloredMarker);
      }
    }
    svgPath.attr(`marker-${position}`, `url(${url}#${coloredMarkerId})`);
  } else {
    svgPath.attr(`marker-${position}`, `url(${url}#${originalMarkerId})`);
  }
}, "addEdgeMarker");
var edgeLabels = /* @__PURE__ */ new Map();
var terminalLabels = /* @__PURE__ */ new Map();
var clear = /* @__PURE__ */ __name(() => {
  edgeLabels.clear();
  terminalLabels.clear();
}, "clear");
var getLabelStyles = /* @__PURE__ */ __name((styleArray) => {
  let styles = styleArray ? styleArray.reduce((acc, style) => acc + ";" + style, "") : "";
  return styles;
}, "getLabelStyles");
var insertEdgeLabel = /* @__PURE__ */ __name(async (elem, edge) => {
  let useHtmlLabels = evaluate(getConfig2().flowchart.htmlLabels);
  const { labelStyles } = styles2String(edge);
  edge.labelStyle = labelStyles;
  const labelElement = await createText(elem, edge.label, {
    style: edge.labelStyle,
    useHtmlLabels,
    addSvgBackground: true,
    isNode: false
  });
  log.info("abc82", edge, edge.labelType);
  const edgeLabel = elem.insert("g").attr("class", "edgeLabel");
  const label = edgeLabel.insert("g").attr("class", "label").attr("data-id", edge.id);
  label.node().appendChild(labelElement);
  let bbox = labelElement.getBBox();
  if (useHtmlLabels) {
    const div = labelElement.children[0];
    const dv = select(labelElement);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  label.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  edgeLabels.set(edge.id, edgeLabel);
  edge.width = bbox.width;
  edge.height = bbox.height;
  let fo;
  if (edge.startLabelLeft) {
    const startLabelElement = await createLabel_default(
      edge.startLabelLeft,
      getLabelStyles(edge.labelStyle)
    );
    const startEdgeLabelLeft = elem.insert("g").attr("class", "edgeTerminals");
    const inner = startEdgeLabelLeft.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(startLabelElement);
    const slBox = startLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).startLeft = startEdgeLabelLeft;
    setTerminalWidth(fo, edge.startLabelLeft);
  }
  if (edge.startLabelRight) {
    const startLabelElement = await createLabel_default(
      edge.startLabelRight,
      getLabelStyles(edge.labelStyle)
    );
    const startEdgeLabelRight = elem.insert("g").attr("class", "edgeTerminals");
    const inner = startEdgeLabelRight.insert("g").attr("class", "inner");
    fo = startEdgeLabelRight.node().appendChild(startLabelElement);
    inner.node().appendChild(startLabelElement);
    const slBox = startLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).startRight = startEdgeLabelRight;
    setTerminalWidth(fo, edge.startLabelRight);
  }
  if (edge.endLabelLeft) {
    const endLabelElement = await createLabel_default(edge.endLabelLeft, getLabelStyles(edge.labelStyle));
    const endEdgeLabelLeft = elem.insert("g").attr("class", "edgeTerminals");
    const inner = endEdgeLabelLeft.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(endLabelElement);
    const slBox = endLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    endEdgeLabelLeft.node().appendChild(endLabelElement);
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).endLeft = endEdgeLabelLeft;
    setTerminalWidth(fo, edge.endLabelLeft);
  }
  if (edge.endLabelRight) {
    const endLabelElement = await createLabel_default(edge.endLabelRight, getLabelStyles(edge.labelStyle));
    const endEdgeLabelRight = elem.insert("g").attr("class", "edgeTerminals");
    const inner = endEdgeLabelRight.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(endLabelElement);
    const slBox = endLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    endEdgeLabelRight.node().appendChild(endLabelElement);
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).endRight = endEdgeLabelRight;
    setTerminalWidth(fo, edge.endLabelRight);
  }
  return labelElement;
}, "insertEdgeLabel");
function setTerminalWidth(fo, value) {
  if (getConfig2().flowchart.htmlLabels && fo) {
    fo.style.width = value.length * 9 + "px";
    fo.style.height = "12px";
  }
}
__name(setTerminalWidth, "setTerminalWidth");
var positionEdgeLabel = /* @__PURE__ */ __name((edge, paths) => {
  log.debug("Moving label abc88 ", edge.id, edge.label, edgeLabels.get(edge.id), paths);
  let path = paths.updatedPath ? paths.updatedPath : paths.originalPath;
  const siteConfig2 = getConfig2();
  const { subGraphTitleTotalMargin } = getSubGraphTitleMargins(siteConfig2);
  if (edge.label) {
    const el = edgeLabels.get(edge.id);
    let x2 = edge.x;
    let y2 = edge.y;
    if (path) {
      const pos = utils_default.calcLabelPosition(path);
      log.debug(
        "Moving label " + edge.label + " from (",
        x2,
        ",",
        y2,
        ") to (",
        pos.x,
        ",",
        pos.y,
        ") abc88"
      );
      if (paths.updatedPath) {
        x2 = pos.x;
        y2 = pos.y;
      }
    }
    el.attr("transform", `translate(${x2}, ${y2 + subGraphTitleTotalMargin / 2})`);
  }
  if (edge.startLabelLeft) {
    const el = terminalLabels.get(edge.id).startLeft;
    let x2 = edge.x;
    let y2 = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeStart ? 10 : 0, "start_left", path);
      x2 = pos.x;
      y2 = pos.y;
    }
    el.attr("transform", `translate(${x2}, ${y2})`);
  }
  if (edge.startLabelRight) {
    const el = terminalLabels.get(edge.id).startRight;
    let x2 = edge.x;
    let y2 = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(
        edge.arrowTypeStart ? 10 : 0,
        "start_right",
        path
      );
      x2 = pos.x;
      y2 = pos.y;
    }
    el.attr("transform", `translate(${x2}, ${y2})`);
  }
  if (edge.endLabelLeft) {
    const el = terminalLabels.get(edge.id).endLeft;
    let x2 = edge.x;
    let y2 = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeEnd ? 10 : 0, "end_left", path);
      x2 = pos.x;
      y2 = pos.y;
    }
    el.attr("transform", `translate(${x2}, ${y2})`);
  }
  if (edge.endLabelRight) {
    const el = terminalLabels.get(edge.id).endRight;
    let x2 = edge.x;
    let y2 = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeEnd ? 10 : 0, "end_right", path);
      x2 = pos.x;
      y2 = pos.y;
    }
    el.attr("transform", `translate(${x2}, ${y2})`);
  }
}, "positionEdgeLabel");
var outsideNode = /* @__PURE__ */ __name((node, point2) => {
  const x2 = node.x;
  const y2 = node.y;
  const dx = Math.abs(point2.x - x2);
  const dy = Math.abs(point2.y - y2);
  const w2 = node.width / 2;
  const h2 = node.height / 2;
  return dx >= w2 || dy >= h2;
}, "outsideNode");
var intersection = /* @__PURE__ */ __name((node, outsidePoint, insidePoint) => {
  log.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(outsidePoint)}
  insidePoint : ${JSON.stringify(insidePoint)}
  node        : x:${node.x} y:${node.y} w:${node.width} h:${node.height}`);
  const x2 = node.x;
  const y2 = node.y;
  const dx = Math.abs(x2 - insidePoint.x);
  const w2 = node.width / 2;
  let r2 = insidePoint.x < outsidePoint.x ? w2 - dx : w2 + dx;
  const h2 = node.height / 2;
  const Q2 = Math.abs(outsidePoint.y - insidePoint.y);
  const R2 = Math.abs(outsidePoint.x - insidePoint.x);
  if (Math.abs(y2 - outsidePoint.y) * w2 > Math.abs(x2 - outsidePoint.x) * h2) {
    let q2 = insidePoint.y < outsidePoint.y ? outsidePoint.y - h2 - y2 : y2 - h2 - outsidePoint.y;
    r2 = R2 * q2 / Q2;
    const res = {
      x: insidePoint.x < outsidePoint.x ? insidePoint.x + r2 : insidePoint.x - R2 + r2,
      y: insidePoint.y < outsidePoint.y ? insidePoint.y + Q2 - q2 : insidePoint.y - Q2 + q2
    };
    if (r2 === 0) {
      res.x = outsidePoint.x;
      res.y = outsidePoint.y;
    }
    if (R2 === 0) {
      res.x = outsidePoint.x;
    }
    if (Q2 === 0) {
      res.y = outsidePoint.y;
    }
    log.debug(`abc89 top/bottom calc, Q ${Q2}, q ${q2}, R ${R2}, r ${r2}`, res);
    return res;
  } else {
    if (insidePoint.x < outsidePoint.x) {
      r2 = outsidePoint.x - w2 - x2;
    } else {
      r2 = x2 - w2 - outsidePoint.x;
    }
    let q2 = Q2 * r2 / R2;
    let _x = insidePoint.x < outsidePoint.x ? insidePoint.x + R2 - r2 : insidePoint.x - R2 + r2;
    let _y = insidePoint.y < outsidePoint.y ? insidePoint.y + q2 : insidePoint.y - q2;
    log.debug(`sides calc abc89, Q ${Q2}, q ${q2}, R ${R2}, r ${r2}`, { _x, _y });
    if (r2 === 0) {
      _x = outsidePoint.x;
      _y = outsidePoint.y;
    }
    if (R2 === 0) {
      _x = outsidePoint.x;
    }
    if (Q2 === 0) {
      _y = outsidePoint.y;
    }
    return { x: _x, y: _y };
  }
}, "intersection");
var cutPathAtIntersect = /* @__PURE__ */ __name((_points, boundaryNode) => {
  log.warn("abc88 cutPathAtIntersect", _points, boundaryNode);
  let points = [];
  let lastPointOutside = _points[0];
  let isInside = false;
  _points.forEach((point2) => {
    log.info("abc88 checking point", point2, boundaryNode);
    if (!outsideNode(boundaryNode, point2) && !isInside) {
      const inter = intersection(boundaryNode, lastPointOutside, point2);
      log.debug("abc88 inside", point2, lastPointOutside, inter);
      log.debug("abc88 intersection", inter, boundaryNode);
      let pointPresent = false;
      points.forEach((p2) => {
        pointPresent = pointPresent || p2.x === inter.x && p2.y === inter.y;
      });
      if (!points.some((e2) => e2.x === inter.x && e2.y === inter.y)) {
        points.push(inter);
      } else {
        log.warn("abc88 no intersect", inter, points);
      }
      isInside = true;
    } else {
      log.warn("abc88 outside", point2, lastPointOutside);
      lastPointOutside = point2;
      if (!isInside) {
        points.push(point2);
      }
    }
  });
  log.debug("returning points", points);
  return points;
}, "cutPathAtIntersect");
function extractCornerPoints(points) {
  const cornerPoints = [];
  const cornerPointPositions = [];
  for (let i2 = 1; i2 < points.length - 1; i2++) {
    const prev = points[i2 - 1];
    const curr = points[i2];
    const next = points[i2 + 1];
    if (prev.x === curr.x && curr.y === next.y && Math.abs(curr.x - next.x) > 5 && Math.abs(curr.y - prev.y) > 5) {
      cornerPoints.push(curr);
      cornerPointPositions.push(i2);
    } else if (prev.y === curr.y && curr.x === next.x && Math.abs(curr.x - prev.x) > 5 && Math.abs(curr.y - next.y) > 5) {
      cornerPoints.push(curr);
      cornerPointPositions.push(i2);
    }
  }
  return { cornerPoints, cornerPointPositions };
}
__name(extractCornerPoints, "extractCornerPoints");
var findAdjacentPoint = /* @__PURE__ */ __name(function(pointA, pointB, distance2) {
  const xDiff = pointB.x - pointA.x;
  const yDiff = pointB.y - pointA.y;
  const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const ratio = distance2 / length;
  return { x: pointB.x - ratio * xDiff, y: pointB.y - ratio * yDiff };
}, "findAdjacentPoint");
var fixCorners = /* @__PURE__ */ __name(function(lineData) {
  const { cornerPointPositions } = extractCornerPoints(lineData);
  const newLineData = [];
  for (let i2 = 0; i2 < lineData.length; i2++) {
    if (cornerPointPositions.includes(i2)) {
      const prevPoint = lineData[i2 - 1];
      const nextPoint = lineData[i2 + 1];
      const cornerPoint = lineData[i2];
      const newPrevPoint = findAdjacentPoint(prevPoint, cornerPoint, 5);
      const newNextPoint = findAdjacentPoint(nextPoint, cornerPoint, 5);
      const xDiff = newNextPoint.x - newPrevPoint.x;
      const yDiff = newNextPoint.y - newPrevPoint.y;
      newLineData.push(newPrevPoint);
      const a2 = Math.sqrt(2) * 2;
      let newCornerPoint = { x: cornerPoint.x, y: cornerPoint.y };
      if (Math.abs(nextPoint.x - prevPoint.x) > 10 && Math.abs(nextPoint.y - prevPoint.y) >= 10) {
        log.debug(
          "Corner point fixing",
          Math.abs(nextPoint.x - prevPoint.x),
          Math.abs(nextPoint.y - prevPoint.y)
        );
        const r2 = 5;
        if (cornerPoint.x === newPrevPoint.x) {
          newCornerPoint = {
            x: xDiff < 0 ? newPrevPoint.x - r2 + a2 : newPrevPoint.x + r2 - a2,
            y: yDiff < 0 ? newPrevPoint.y - a2 : newPrevPoint.y + a2
          };
        } else {
          newCornerPoint = {
            x: xDiff < 0 ? newPrevPoint.x - a2 : newPrevPoint.x + a2,
            y: yDiff < 0 ? newPrevPoint.y - r2 + a2 : newPrevPoint.y + r2 - a2
          };
        }
      } else {
        log.debug(
          "Corner point skipping fixing",
          Math.abs(nextPoint.x - prevPoint.x),
          Math.abs(nextPoint.y - prevPoint.y)
        );
      }
      newLineData.push(newCornerPoint, newNextPoint);
    } else {
      newLineData.push(lineData[i2]);
    }
  }
  return newLineData;
}, "fixCorners");
var generateDashArray = /* @__PURE__ */ __name((len, oValueS, oValueE) => {
  const middleLength = len - oValueS - oValueE;
  const dashLength = 2;
  const gapLength = 2;
  const dashGapPairLength = dashLength + gapLength;
  const numberOfPairs = Math.floor(middleLength / dashGapPairLength);
  const middlePattern = Array(numberOfPairs).fill(`${dashLength} ${gapLength}`).join(" ");
  const dashArray = `0 ${oValueS} ${middlePattern} ${oValueE}`;
  return dashArray;
}, "generateDashArray");
var insertEdge = /* @__PURE__ */ __name(function(elem, edge, clusterDb, diagramType, startNode, endNode, id28, skipIntersect = false) {
  var _a2;
  const { handDrawnSeed } = getConfig2();
  let points = edge.points;
  let pointsHasChanged = false;
  const tail = startNode;
  var head = endNode;
  const edgeClassStyles = [];
  for (const key in edge.cssCompiledStyles) {
    if (isLabelStyle(key)) {
      continue;
    }
    edgeClassStyles.push(edge.cssCompiledStyles[key]);
  }
  log.debug("UIO intersect check", edge.points, head.x, tail.x);
  if (head.intersect && tail.intersect && !skipIntersect) {
    points = points.slice(1, edge.points.length - 1);
    points.unshift(tail.intersect(points[0]));
    log.debug(
      "Last point UIO",
      edge.start,
      "-->",
      edge.end,
      points[points.length - 1],
      head,
      head.intersect(points[points.length - 1])
    );
    points.push(head.intersect(points[points.length - 1]));
  }
  const pointsStr = btoa(JSON.stringify(points));
  if (edge.toCluster) {
    log.info("to cluster abc88", clusterDb.get(edge.toCluster));
    points = cutPathAtIntersect(edge.points, clusterDb.get(edge.toCluster).node);
    pointsHasChanged = true;
  }
  if (edge.fromCluster) {
    log.debug(
      "from cluster abc88",
      clusterDb.get(edge.fromCluster),
      JSON.stringify(points, null, 2)
    );
    points = cutPathAtIntersect(points.reverse(), clusterDb.get(edge.fromCluster).node).reverse();
    pointsHasChanged = true;
  }
  let lineData = points.filter((p2) => !Number.isNaN(p2.y));
  lineData = fixCorners(lineData);
  let curve = curveBasis;
  curve = curveLinear;
  switch (edge.curve) {
    case "linear":
      curve = curveLinear;
      break;
    case "basis":
      curve = curveBasis;
      break;
    case "cardinal":
      curve = curveCardinal;
      break;
    case "bumpX":
      curve = bumpX;
      break;
    case "bumpY":
      curve = bumpY;
      break;
    case "catmullRom":
      curve = curveCatmullRom;
      break;
    case "monotoneX":
      curve = monotoneX;
      break;
    case "monotoneY":
      curve = monotoneY;
      break;
    case "natural":
      curve = curveNatural;
      break;
    case "step":
      curve = curveStep;
      break;
    case "stepAfter":
      curve = stepAfter;
      break;
    case "stepBefore":
      curve = stepBefore;
      break;
    default:
      curve = curveBasis;
  }
  const { x: x2, y: y2 } = getLineFunctionsWithOffset(edge);
  const lineFunction = line().x(x2).y(y2).curve(curve);
  let strokeClasses;
  switch (edge.thickness) {
    case "normal":
      strokeClasses = "edge-thickness-normal";
      break;
    case "thick":
      strokeClasses = "edge-thickness-thick";
      break;
    case "invisible":
      strokeClasses = "edge-thickness-invisible";
      break;
    default:
      strokeClasses = "edge-thickness-normal";
  }
  switch (edge.pattern) {
    case "solid":
      strokeClasses += " edge-pattern-solid";
      break;
    case "dotted":
      strokeClasses += " edge-pattern-dotted";
      break;
    case "dashed":
      strokeClasses += " edge-pattern-dashed";
      break;
    default:
      strokeClasses += " edge-pattern-solid";
  }
  let svgPath;
  let linePath = edge.curve === "rounded" ? generateRoundedPath(applyMarkerOffsetsToPoints(lineData, edge), 5) : lineFunction(lineData);
  const edgeStyles = Array.isArray(edge.style) ? edge.style : [edge.style];
  let strokeColor = edgeStyles.find((style) => style == null ? void 0 : style.startsWith("stroke:"));
  let animatedEdge = false;
  if (edge.look === "handDrawn") {
    const rc = at.svg(elem);
    Object.assign([], lineData);
    const svgPathNode = rc.path(linePath, {
      roughness: 0.3,
      seed: handDrawnSeed
    });
    strokeClasses += " transition";
    svgPath = select(svgPathNode).select("path").attr("id", edge.id).attr("class", " " + strokeClasses + (edge.classes ? " " + edge.classes : "")).attr("style", edgeStyles ? edgeStyles.reduce((acc, style) => acc + ";" + style, "") : "");
    let d2 = svgPath.attr("d");
    svgPath.attr("d", d2);
    elem.node().appendChild(svgPath.node());
  } else {
    const stylesFromClasses = edgeClassStyles.join(";");
    const styles = edgeStyles ? edgeStyles.reduce((acc, style) => acc + style + ";", "") : "";
    let animationClass = "";
    if (edge.animate) {
      animationClass = " edge-animation-fast";
    }
    if (edge.animation) {
      animationClass = " edge-animation-" + edge.animation;
    }
    const pathStyle = (stylesFromClasses ? stylesFromClasses + ";" + styles + ";" : styles) + ";" + (edgeStyles ? edgeStyles.reduce((acc, style) => acc + ";" + style, "") : "");
    svgPath = elem.append("path").attr("d", linePath).attr("id", edge.id).attr(
      "class",
      " " + strokeClasses + (edge.classes ? " " + edge.classes : "") + (animationClass ?? "")
    ).attr("style", pathStyle);
    strokeColor = (_a2 = pathStyle.match(/stroke:([^;]+)/)) == null ? void 0 : _a2[1];
    animatedEdge = edge.animate === true || !!edge.animation || stylesFromClasses.includes("animation");
    const pathNode = svgPath.node();
    const len = typeof pathNode.getTotalLength === "function" ? pathNode.getTotalLength() : 0;
    const oValueS = markerOffsets2[edge.arrowTypeStart] || 0;
    const oValueE = markerOffsets2[edge.arrowTypeEnd] || 0;
    if (edge.look === "neo" && !animatedEdge) {
      const dashArray = edge.pattern === "dotted" || edge.pattern === "dashed" ? generateDashArray(len, oValueS, oValueE) : `0 ${oValueS} ${len - oValueS - oValueE} ${oValueE}`;
      const mOffset = `stroke-dasharray: ${dashArray}; stroke-dashoffset: 0;`;
      svgPath.attr("style", mOffset + svgPath.attr("style"));
    }
  }
  svgPath.attr("data-edge", true);
  svgPath.attr("data-et", "edge");
  svgPath.attr("data-id", edge.id);
  svgPath.attr("data-points", pointsStr);
  if (edge.showPoints) {
    lineData.forEach((point3) => {
      elem.append("circle").style("stroke", "red").style("fill", "red").attr("r", 1).attr("cx", point3.x).attr("cy", point3.y);
    });
  }
  let url = "";
  if (getConfig2().flowchart.arrowMarkerAbsolute || getConfig2().state.arrowMarkerAbsolute) {
    url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }
  log.info("arrowTypeStart", edge.arrowTypeStart);
  log.info("arrowTypeEnd", edge.arrowTypeEnd);
  addEdgeMarkers(svgPath, edge, url, id28, diagramType, strokeColor);
  const midIndex = Math.floor(points.length / 2);
  const point2 = points[midIndex];
  if (!utils_default.isLabelCoordinateInPath(point2, svgPath.attr("d"))) {
    pointsHasChanged = true;
  }
  let paths = {};
  if (pointsHasChanged) {
    paths.updatedPath = points;
  }
  paths.originalPath = edge.points;
  return paths;
}, "insertEdge");
function generateRoundedPath(points, radius) {
  if (points.length < 2) {
    return "";
  }
  let path = "";
  const size = points.length;
  const epsilon2 = 1e-5;
  for (let i2 = 0; i2 < size; i2++) {
    const currPoint = points[i2];
    const prevPoint = points[i2 - 1];
    const nextPoint = points[i2 + 1];
    if (i2 === 0) {
      path += `M${currPoint.x},${currPoint.y}`;
    } else if (i2 === size - 1) {
      path += `L${currPoint.x},${currPoint.y}`;
    } else {
      const dx1 = currPoint.x - prevPoint.x;
      const dy1 = currPoint.y - prevPoint.y;
      const dx2 = nextPoint.x - currPoint.x;
      const dy2 = nextPoint.y - currPoint.y;
      const len1 = Math.hypot(dx1, dy1);
      const len2 = Math.hypot(dx2, dy2);
      if (len1 < epsilon2 || len2 < epsilon2) {
        path += `L${currPoint.x},${currPoint.y}`;
        continue;
      }
      const nx1 = dx1 / len1;
      const ny1 = dy1 / len1;
      const nx2 = dx2 / len2;
      const ny2 = dy2 / len2;
      const dot = nx1 * nx2 + ny1 * ny2;
      const clampedDot = Math.max(-1, Math.min(1, dot));
      const angle = Math.acos(clampedDot);
      if (angle < epsilon2 || Math.abs(Math.PI - angle) < epsilon2) {
        path += `L${currPoint.x},${currPoint.y}`;
        continue;
      }
      const cutLen = Math.min(radius / Math.sin(angle / 2), len1 / 2, len2 / 2);
      const startX = currPoint.x - nx1 * cutLen;
      const startY = currPoint.y - ny1 * cutLen;
      const endX = currPoint.x + nx2 * cutLen;
      const endY = currPoint.y + ny2 * cutLen;
      path += `L${startX},${startY}`;
      path += `Q${currPoint.x},${currPoint.y} ${endX},${endY}`;
    }
  }
  return path;
}
__name(generateRoundedPath, "generateRoundedPath");
function calculateDeltaAndAngle(point1, point2) {
  if (!point1 || !point2) {
    return { angle: 0, deltaX: 0, deltaY: 0 };
  }
  const deltaX = point2.x - point1.x;
  const deltaY = point2.y - point1.y;
  const angle = Math.atan2(deltaY, deltaX);
  return { angle, deltaX, deltaY };
}
__name(calculateDeltaAndAngle, "calculateDeltaAndAngle");
function applyMarkerOffsetsToPoints(points, edge) {
  const newPoints = points.map((point2) => ({ ...point2 }));
  if (points.length >= 2 && markerOffsets[edge.arrowTypeStart]) {
    const offsetValue = markerOffsets[edge.arrowTypeStart];
    const point1 = points[0];
    const point2 = points[1];
    const { angle } = calculateDeltaAndAngle(point1, point2);
    const offsetX = offsetValue * Math.cos(angle);
    const offsetY = offsetValue * Math.sin(angle);
    newPoints[0].x = point1.x + offsetX;
    newPoints[0].y = point1.y + offsetY;
  }
  const n2 = points.length;
  if (n2 >= 2 && markerOffsets[edge.arrowTypeEnd]) {
    const offsetValue = markerOffsets[edge.arrowTypeEnd];
    const point1 = points[n2 - 1];
    const point2 = points[n2 - 2];
    const { angle } = calculateDeltaAndAngle(point2, point1);
    const offsetX = offsetValue * Math.cos(angle);
    const offsetY = offsetValue * Math.sin(angle);
    newPoints[n2 - 1].x = point1.x - offsetX;
    newPoints[n2 - 1].y = point1.y - offsetY;
  }
  return newPoints;
}
__name(applyMarkerOffsetsToPoints, "applyMarkerOffsetsToPoints");
var insertMarkers = /* @__PURE__ */ __name((elem, markerArray, type2, id28) => {
  markerArray.forEach((markerName) => {
    markers[markerName](elem, type2, id28);
  });
}, "insertMarkers");
var extension = /* @__PURE__ */ __name((elem, type2, id28) => {
  log.trace("Making markers for ", id28);
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-extensionStart").attr("class", "marker extension " + type2).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-extensionEnd").attr("class", "marker extension " + type2).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, "extension");
var composition = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-compositionStart").attr("class", "marker composition " + type2).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-compositionEnd").attr("class", "marker composition " + type2).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "composition");
var aggregation = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-aggregationStart").attr("class", "marker aggregation " + type2).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-aggregationEnd").attr("class", "marker aggregation " + type2).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "aggregation");
var dependency = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-dependencyStart").attr("class", "marker dependency " + type2).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-dependencyEnd").attr("class", "marker dependency " + type2).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "dependency");
var lollipop = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-lollipopStart").attr("class", "marker lollipop " + type2).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-lollipopEnd").attr("class", "marker lollipop " + type2).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, "lollipop");
var point = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("marker").attr("id", id28 + "_" + type2 + "-pointEnd").attr("class", "marker " + type2).attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id28 + "_" + type2 + "-pointStart").attr("class", "marker " + type2).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "point");
var circle = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("marker").attr("id", id28 + "_" + type2 + "-circleEnd").attr("class", "marker " + type2).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id28 + "_" + type2 + "-circleStart").attr("class", "marker " + type2).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "circle");
var cross = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("marker").attr("id", id28 + "_" + type2 + "-crossEnd").attr("class", "marker cross " + type2).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id28 + "_" + type2 + "-crossStart").attr("class", "marker cross " + type2).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, "cross");
var barb = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "barb");
var only_one = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-onlyOneStart").attr("class", "marker onlyOne " + type2).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-onlyOneEnd").attr("class", "marker onlyOne " + type2).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18");
}, "only_one");
var zero_or_one = /* @__PURE__ */ __name((elem, type2, id28) => {
  const startMarker = elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + type2).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  startMarker.append("circle").attr("fill", "white").attr("cx", 21).attr("cy", 9).attr("r", 6);
  startMarker.append("path").attr("d", "M9,0 L9,18");
  const endMarker = elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + type2).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  endMarker.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 9).attr("r", 6);
  endMarker.append("path").attr("d", "M21,0 L21,18");
}, "zero_or_one");
var one_or_more = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-oneOrMoreStart").attr("class", "marker oneOrMore " + type2).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27");
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + type2).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18");
}, "one_or_more");
var zero_or_more = /* @__PURE__ */ __name((elem, type2, id28) => {
  const startMarker = elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + type2).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  startMarker.append("circle").attr("fill", "white").attr("cx", 48).attr("cy", 18).attr("r", 6);
  startMarker.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18");
  const endMarker = elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + type2).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  endMarker.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 18).attr("r", 6);
  endMarker.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18");
}, "zero_or_more");
var requirement_arrow = /* @__PURE__ */ __name((elem, type2, id28) => {
  elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("path").attr(
    "d",
    `M0,0
      L20,10
      M20,10
      L0,20`
  );
}, "requirement_arrow");
var requirement_contains = /* @__PURE__ */ __name((elem, type2, id28) => {
  const containsNode = elem.append("defs").append("marker").attr("id", id28 + "_" + type2 + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("g");
  containsNode.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none");
  containsNode.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10);
  containsNode.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10);
}, "requirement_contains");
var markers = {
  extension,
  composition,
  aggregation,
  dependency,
  lollipop,
  point,
  circle,
  cross,
  barb,
  only_one,
  zero_or_one,
  one_or_more,
  zero_or_more,
  requirement_arrow,
  requirement_contains
};
var markers_default = insertMarkers;
var internalHelpers = {
  common: common_default,
  getConfig,
  insertCluster,
  insertEdge,
  insertEdgeLabel,
  insertMarkers: markers_default,
  insertNode,
  interpolateToCurve,
  labelHelper,
  log,
  positionEdgeLabel
};
var layoutAlgorithms = {};
var registerLayoutLoaders = /* @__PURE__ */ __name((loaders) => {
  for (const loader28 of loaders) {
    layoutAlgorithms[loader28.name] = loader28;
  }
}, "registerLayoutLoaders");
var registerDefaultLayoutLoaders = /* @__PURE__ */ __name(() => {
  registerLayoutLoaders([
    {
      name: "dagre",
      loader: /* @__PURE__ */ __name(async () => await import("./dagre-6UL2VRFP-B3el3WV_.js"), "loader")
    },
    ...[
      {
        name: "cose-bilkent",
        loader: /* @__PURE__ */ __name(async () => await import("./cose-bilkent-S5V4N54A-vSqDgxZ4.js"), "loader")
      }
    ]
  ]);
}, "registerDefaultLayoutLoaders");
registerDefaultLayoutLoaders();
var render$1 = /* @__PURE__ */ __name(async (data4Layout, svg2) => {
  if (!(data4Layout.layoutAlgorithm in layoutAlgorithms)) {
    throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
  }
  const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
  const layoutRenderer = await layoutDefinition.loader();
  return layoutRenderer.render(data4Layout, svg2, internalHelpers, {
    algorithm: layoutDefinition.algorithm
  });
}, "render");
var getRegisteredLayoutAlgorithm = /* @__PURE__ */ __name((algorithm = "", { fallback = "dagre" } = {}) => {
  if (algorithm in layoutAlgorithms) {
    return algorithm;
  }
  if (fallback in layoutAlgorithms) {
    log.warn(`Layout algorithm ${algorithm} is not registered. Using ${fallback} as fallback.`);
    return fallback;
  }
  throw new Error(`Both layout algorithms ${algorithm} and ${fallback} are not registered.`);
}, "getRegisteredLayoutAlgorithm");
var id = "c4";
var detector = /* @__PURE__ */ __name((txt) => {
  return /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(txt);
}, "detector");
var loader = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./c4Diagram-YG6GDRKO-DXeARsIZ.js");
  return { id, diagram: diagram2 };
}, "loader");
var plugin = {
  id,
  detector,
  loader
};
var c4Detector_default = plugin;
var id2 = "flowchart";
var detector2 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2, _b2;
  if (((_a2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper" || ((_b2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _b2.defaultRenderer) === "elk") {
    return false;
  }
  return /^\s*graph/.test(txt);
}, "detector");
var loader2 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-NV44I4VS-DI83HoJ0.js");
  return { id: id2, diagram: diagram2 };
}, "loader");
var plugin2 = {
  id: id2,
  detector: detector2,
  loader: loader2
};
var flowDetector_default = plugin2;
var id3 = "flowchart-v2";
var detector3 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2, _b2, _c2;
  if (((_a2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _a2.defaultRenderer) === "dagre-d3") {
    return false;
  }
  if (((_b2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _b2.defaultRenderer) === "elk") {
    config2.layout = "elk";
  }
  if (/^\s*graph/.test(txt) && ((_c2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _c2.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return /^\s*flowchart/.test(txt);
}, "detector");
var loader3 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-NV44I4VS-DI83HoJ0.js");
  return { id: id3, diagram: diagram2 };
}, "loader");
var plugin3 = {
  id: id3,
  detector: detector3,
  loader: loader3
};
var flowDetector_v2_default = plugin3;
var id4 = "er";
var detector4 = /* @__PURE__ */ __name((txt) => {
  return /^\s*erDiagram/.test(txt);
}, "detector");
var loader4 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./erDiagram-Q2GNP2WA-BBV3kTVo.js");
  return { id: id4, diagram: diagram2 };
}, "loader");
var plugin4 = {
  id: id4,
  detector: detector4,
  loader: loader4
};
var erDetector_default = plugin4;
var id5 = "gitGraph";
var detector5 = /* @__PURE__ */ __name((txt) => {
  return /^\s*gitGraph/.test(txt);
}, "detector");
var loader5 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./gitGraphDiagram-NY62KEGX-CRCdt49d.js");
  return { id: id5, diagram: diagram2 };
}, "loader");
var plugin5 = {
  id: id5,
  detector: detector5,
  loader: loader5
};
var gitGraphDetector_default = plugin5;
var id6 = "gantt";
var detector6 = /* @__PURE__ */ __name((txt) => {
  return /^\s*gantt/.test(txt);
}, "detector");
var loader6 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./ganttDiagram-LVOFAZNH-N24nDseh.js");
  return { id: id6, diagram: diagram2 };
}, "loader");
var plugin6 = {
  id: id6,
  detector: detector6,
  loader: loader6
};
var ganttDetector_default = plugin6;
var id7 = "info";
var detector7 = /* @__PURE__ */ __name((txt) => {
  return /^\s*info/.test(txt);
}, "detector");
var loader7 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./infoDiagram-F6ZHWCRC-BiXbSUDY.js");
  return { id: id7, diagram: diagram2 };
}, "loader");
var info = {
  id: id7,
  detector: detector7,
  loader: loader7
};
var id8 = "pie";
var detector8 = /* @__PURE__ */ __name((txt) => {
  return /^\s*pie/.test(txt);
}, "detector");
var loader8 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./pieDiagram-ADFJNKIX-DUqy5Vbl.js");
  return { id: id8, diagram: diagram2 };
}, "loader");
var pie = {
  id: id8,
  detector: detector8,
  loader: loader8
};
var id9 = "quadrantChart";
var detector9 = /* @__PURE__ */ __name((txt) => {
  return /^\s*quadrantChart/.test(txt);
}, "detector");
var loader9 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./quadrantDiagram-AYHSOK5B-Dp3YZcuc.js");
  return { id: id9, diagram: diagram2 };
}, "loader");
var plugin7 = {
  id: id9,
  detector: detector9,
  loader: loader9
};
var quadrantDetector_default = plugin7;
var id10 = "xychart";
var detector10 = /* @__PURE__ */ __name((txt) => {
  return /^\s*xychart(-beta)?/.test(txt);
}, "detector");
var loader10 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./xychartDiagram-PRI3JC2R-CMELMIiG.js");
  return { id: id10, diagram: diagram2 };
}, "loader");
var plugin8 = {
  id: id10,
  detector: detector10,
  loader: loader10
};
var xychartDetector_default = plugin8;
var id11 = "requirement";
var detector11 = /* @__PURE__ */ __name((txt) => {
  return /^\s*requirement(Diagram)?/.test(txt);
}, "detector");
var loader11 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./requirementDiagram-UZGBJVZJ-CUaMlFk3.js");
  return { id: id11, diagram: diagram2 };
}, "loader");
var plugin9 = {
  id: id11,
  detector: detector11,
  loader: loader11
};
var requirementDetector_default = plugin9;
var id12 = "sequence";
var detector12 = /* @__PURE__ */ __name((txt) => {
  return /^\s*sequenceDiagram/.test(txt);
}, "detector");
var loader12 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./sequenceDiagram-WL72ISMW-CkARvXIf.js");
  return { id: id12, diagram: diagram2 };
}, "loader");
var plugin10 = {
  id: id12,
  detector: detector12,
  loader: loader12
};
var sequenceDetector_default = plugin10;
var id13 = "class";
var detector13 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2;
  if (((_a2 = config2 == null ? void 0 : config2.class) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return /^\s*classDiagram/.test(txt);
}, "detector");
var loader13 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./classDiagram-2ON5EDUG-TvEl7Z91.js");
  return { id: id13, diagram: diagram2 };
}, "loader");
var plugin11 = {
  id: id13,
  detector: detector13,
  loader: loader13
};
var classDetector_default = plugin11;
var id14 = "classDiagram";
var detector14 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2;
  if (/^\s*classDiagram/.test(txt) && ((_a2 = config2 == null ? void 0 : config2.class) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return /^\s*classDiagram-v2/.test(txt);
}, "detector");
var loader14 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./classDiagram-v2-WZHVMYZB-TvEl7Z91.js");
  return { id: id14, diagram: diagram2 };
}, "loader");
var plugin12 = {
  id: id14,
  detector: detector14,
  loader: loader14
};
var classDetector_V2_default = plugin12;
var id15 = "state";
var detector15 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2;
  if (((_a2 = config2 == null ? void 0 : config2.state) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return /^\s*stateDiagram/.test(txt);
}, "detector");
var loader15 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-FKZM4ZOC-B4D2TQBk.js");
  return { id: id15, diagram: diagram2 };
}, "loader");
var plugin13 = {
  id: id15,
  detector: detector15,
  loader: loader15
};
var stateDetector_default = plugin13;
var id16 = "stateDiagram";
var detector16 = /* @__PURE__ */ __name((txt, config2) => {
  var _a2;
  if (/^\s*stateDiagram-v2/.test(txt)) {
    return true;
  }
  if (/^\s*stateDiagram/.test(txt) && ((_a2 = config2 == null ? void 0 : config2.state) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return false;
}, "detector");
var loader16 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-v2-4FDKWEC3-DVfHrpWW.js");
  return { id: id16, diagram: diagram2 };
}, "loader");
var plugin14 = {
  id: id16,
  detector: detector16,
  loader: loader16
};
var stateDetector_V2_default = plugin14;
var id17 = "journey";
var detector17 = /* @__PURE__ */ __name((txt) => {
  return /^\s*journey/.test(txt);
}, "detector");
var loader17 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./journeyDiagram-XKPGCS4Q-BlcK7T-j.js");
  return { id: id17, diagram: diagram2 };
}, "loader");
var plugin15 = {
  id: id17,
  detector: detector17,
  loader: loader17
};
var journeyDetector_default = plugin15;
var draw = /* @__PURE__ */ __name((_text, id28, version) => {
  log.debug("rendering svg for syntax error\n");
  const svg2 = selectSvgElement(id28);
  const g2 = svg2.append("g");
  svg2.attr("viewBox", "0 0 2412 512");
  configureSvgSize(svg2, 100, 512, true);
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  );
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  );
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  );
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  );
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  );
  g2.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  );
  g2.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
  g2.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${version}`);
}, "draw");
var renderer = { draw };
var errorRenderer_default = renderer;
var diagram = {
  db: {},
  renderer,
  parser: {
    parse: /* @__PURE__ */ __name(() => {
      return;
    }, "parse")
  }
};
var errorDiagram_default = diagram;
var id18 = "flowchart-elk";
var detector18 = /* @__PURE__ */ __name((txt, config2 = {}) => {
  var _a2;
  if (
    // If diagram explicitly states flowchart-elk
    /^\s*flowchart-elk/.test(txt) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*(flowchart|graph)/.test(txt) && ((_a2 = config2 == null ? void 0 : config2.flowchart) == null ? void 0 : _a2.defaultRenderer) === "elk"
  ) {
    config2.layout = "elk";
    return true;
  }
  return false;
}, "detector");
var loader18 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-NV44I4VS-DI83HoJ0.js");
  return { id: id18, diagram: diagram2 };
}, "loader");
var plugin16 = {
  id: id18,
  detector: detector18,
  loader: loader18
};
var detector_default = plugin16;
var id19 = "timeline";
var detector19 = /* @__PURE__ */ __name((txt) => {
  return /^\s*timeline/.test(txt);
}, "detector");
var loader19 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./timeline-definition-IT6M3QCI-BgA_55FZ.js");
  return { id: id19, diagram: diagram2 };
}, "loader");
var plugin17 = {
  id: id19,
  detector: detector19,
  loader: loader19
};
var detector_default2 = plugin17;
var id20 = "mindmap";
var detector20 = /* @__PURE__ */ __name((txt) => {
  return /^\s*mindmap/.test(txt);
}, "detector");
var loader20 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./mindmap-definition-VGOIOE7T-ChAdAfz3.js");
  return { id: id20, diagram: diagram2 };
}, "loader");
var plugin18 = {
  id: id20,
  detector: detector20,
  loader: loader20
};
var detector_default3 = plugin18;
var id21 = "kanban";
var detector21 = /* @__PURE__ */ __name((txt) => {
  return /^\s*kanban/.test(txt);
}, "detector");
var loader21 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./kanban-definition-3W4ZIXB7-iwURXgP4.js");
  return { id: id21, diagram: diagram2 };
}, "loader");
var plugin19 = {
  id: id21,
  detector: detector21,
  loader: loader21
};
var detector_default4 = plugin19;
var id22 = "sankey";
var detector22 = /* @__PURE__ */ __name((txt) => {
  return /^\s*sankey(-beta)?/.test(txt);
}, "detector");
var loader22 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./sankeyDiagram-TZEHDZUN-DCeYqOUd.js");
  return { id: id22, diagram: diagram2 };
}, "loader");
var plugin20 = {
  id: id22,
  detector: detector22,
  loader: loader22
};
var sankeyDetector_default = plugin20;
var id23 = "packet";
var detector23 = /* @__PURE__ */ __name((txt) => {
  return /^\s*packet(-beta)?/.test(txt);
}, "detector");
var loader23 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-S2PKOQOG-CGZloNci.js");
  return { id: id23, diagram: diagram2 };
}, "loader");
var packet = {
  id: id23,
  detector: detector23,
  loader: loader23
};
var id24 = "radar";
var detector24 = /* @__PURE__ */ __name((txt) => {
  return /^\s*radar-beta/.test(txt);
}, "detector");
var loader24 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-QEK2KX5R-LzenLeSw.js");
  return { id: id24, diagram: diagram2 };
}, "loader");
var radar = {
  id: id24,
  detector: detector24,
  loader: loader24
};
var id25 = "block";
var detector25 = /* @__PURE__ */ __name((txt) => {
  return /^\s*block(-beta)?/.test(txt);
}, "detector");
var loader25 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./blockDiagram-VD42YOAC-Dgt-ZCd2.js");
  return { id: id25, diagram: diagram2 };
}, "loader");
var plugin21 = {
  id: id25,
  detector: detector25,
  loader: loader25
};
var blockDetector_default = plugin21;
var id26 = "architecture";
var detector26 = /* @__PURE__ */ __name((txt) => {
  return /^\s*architecture/.test(txt);
}, "detector");
var loader26 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./architectureDiagram-VXUJARFQ-BnJsOa1l.js");
  return { id: id26, diagram: diagram2 };
}, "loader");
var architecture = {
  id: id26,
  detector: detector26,
  loader: loader26
};
var architectureDetector_default = architecture;
var id27 = "treemap";
var detector27 = /* @__PURE__ */ __name((txt) => {
  return /^\s*treemap/.test(txt);
}, "detector");
var loader27 = /* @__PURE__ */ __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-PSM6KHXK-SVsoEHxq.js");
  return { id: id27, diagram: diagram2 };
}, "loader");
var treemap = {
  id: id27,
  detector: detector27,
  loader: loader27
};
var hasLoadedDiagrams = false;
var addDiagrams = /* @__PURE__ */ __name(() => {
  if (hasLoadedDiagrams) {
    return;
  }
  hasLoadedDiagrams = true;
  registerDiagram("error", errorDiagram_default, (text2) => {
    return text2.toLowerCase().trim() === "error";
  });
  registerDiagram(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: /* @__PURE__ */ __name(() => {
        }, "clear")
      },
      styles: {},
      // should never be used
      renderer: {
        draw: /* @__PURE__ */ __name(() => {
        }, "draw")
      },
      parser: {
        parse: /* @__PURE__ */ __name(() => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }, "parse")
      },
      init: /* @__PURE__ */ __name(() => null, "init")
      // no op
    },
    (text2) => {
      return text2.toLowerCase().trimStart().startsWith("---");
    }
  );
  {
    registerLazyLoadedDiagrams(detector_default, detector_default3, architectureDetector_default);
  }
  registerLazyLoadedDiagrams(
    c4Detector_default,
    detector_default4,
    classDetector_V2_default,
    classDetector_default,
    erDetector_default,
    ganttDetector_default,
    info,
    pie,
    requirementDetector_default,
    sequenceDetector_default,
    flowDetector_v2_default,
    flowDetector_default,
    detector_default2,
    gitGraphDetector_default,
    stateDetector_V2_default,
    stateDetector_default,
    journeyDetector_default,
    quadrantDetector_default,
    sankeyDetector_default,
    packet,
    xychartDetector_default,
    blockDetector_default,
    radar,
    treemap
  );
}, "addDiagrams");
var loadRegisteredDiagrams = /* @__PURE__ */ __name(async () => {
  log.debug(`Loading registered diagrams`);
  const results = await Promise.allSettled(
    Object.entries(detectors).map(async ([key, { detector: detector28, loader: loader28 }]) => {
      if (!loader28) {
        return;
      }
      try {
        getDiagram(key);
      } catch {
        try {
          const { diagram: diagram2, id: id28 } = await loader28();
          registerDiagram(id28, diagram2, detector28);
        } catch (err) {
          log.error(`Failed to load external diagram with key ${key}. Removing from detectors.`);
          delete detectors[key];
          throw err;
        }
      }
    })
  );
  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    log.error(`Failed to load ${failed.length} external diagrams`);
    for (const res of failed) {
      log.error(res);
    }
    throw new Error(`Failed to load ${failed.length} external diagrams`);
  }
}, "loadRegisteredDiagrams");
var SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg2, diagramType) {
  svg2.attr("role", SVG_ROLE);
  if (diagramType !== "") {
    svg2.attr("aria-roledescription", diagramType);
  }
}
__name(setA11yDiagramInfo, "setA11yDiagramInfo");
function addSVGa11yTitleDescription(svg2, a11yTitle, a11yDesc, baseId) {
  if (svg2.insert === void 0) {
    return;
  }
  if (a11yDesc) {
    const descId = `chart-desc-${baseId}`;
    svg2.attr("aria-describedby", descId);
    svg2.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
  }
  if (a11yTitle) {
    const titleId = `chart-title-${baseId}`;
    svg2.attr("aria-labelledby", titleId);
    svg2.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
  }
}
__name(addSVGa11yTitleDescription, "addSVGa11yTitleDescription");
var Diagram = (_i = class {
  constructor(type2, text2, db, parser, renderer2) {
    this.type = type2;
    this.text = text2;
    this.db = db;
    this.parser = parser;
    this.renderer = renderer2;
  }
  static async fromText(text2, metadata = {}) {
    var _a2, _b2;
    const config2 = getConfig();
    const type2 = detectType$1(text2, config2);
    text2 = encodeEntities(text2) + "\n";
    try {
      getDiagram(type2);
    } catch {
      const loader28 = getDiagramLoader(type2);
      if (!loader28) {
        throw new UnknownDiagramError(`Diagram ${type2} not found.`);
      }
      const { id: id28, diagram: diagram2 } = await loader28();
      registerDiagram(id28, diagram2);
    }
    const { db, parser, renderer: renderer2, init: init2 } = getDiagram(type2);
    if (parser.parser) {
      parser.parser.yy = db;
    }
    (_a2 = db.clear) == null ? void 0 : _a2.call(db);
    init2 == null ? void 0 : init2(config2);
    if (metadata.title) {
      (_b2 = db.setDiagramTitle) == null ? void 0 : _b2.call(db, metadata.title);
    }
    await parser.parse(text2);
    return new _i(type2, text2, db, parser, renderer2);
  }
  async render(id28, version) {
    await this.renderer.draw(this.text, id28, version, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, __name(_i, "Diagram"), _i);
var interactionFunctions = [];
var attachFunctions = /* @__PURE__ */ __name(() => {
  interactionFunctions.forEach((f2) => {
    f2();
  });
  interactionFunctions = [];
}, "attachFunctions");
var cleanupComments = /* @__PURE__ */ __name((text2) => {
  return text2.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
}, "cleanupComments");
function extractFrontMatter(text2) {
  const matches = text2.match(frontMatterRegex);
  if (!matches) {
    return {
      text: text2,
      metadata: {}
    };
  }
  let parsed = load(matches[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: JSON_SCHEMA
  }) ?? {};
  parsed = typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  const metadata = {};
  if (parsed.displayMode) {
    metadata.displayMode = parsed.displayMode.toString();
  }
  if (parsed.title) {
    metadata.title = parsed.title.toString();
  }
  if (parsed.config) {
    metadata.config = parsed.config;
  }
  return {
    text: text2.slice(matches[0].length),
    metadata
  };
}
__name(extractFrontMatter, "extractFrontMatter");
var cleanupText = /* @__PURE__ */ __name((code) => {
  return code.replace(/\r\n?/g, "\n").replace(
    /<(\w+)([^>]*)>/g,
    (match, tag, attributes) => "<" + tag + attributes.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
}, "cleanupText");
var processFrontmatter = /* @__PURE__ */ __name((code) => {
  const { text: text2, metadata } = extractFrontMatter(code);
  const { displayMode, title, config: config2 = {} } = metadata;
  if (displayMode) {
    if (!config2.gantt) {
      config2.gantt = {};
    }
    config2.gantt.displayMode = displayMode;
  }
  return { title, config: config2, text: text2 };
}, "processFrontmatter");
var processDirectives = /* @__PURE__ */ __name((code) => {
  const initDirective = utils_default.detectInit(code) ?? {};
  const wrapDirectives = utils_default.detectDirective(code, "wrap");
  if (Array.isArray(wrapDirectives)) {
    initDirective.wrap = wrapDirectives.some(({ type: type2 }) => type2 === "wrap");
  } else if ((wrapDirectives == null ? void 0 : wrapDirectives.type) === "wrap") {
    initDirective.wrap = true;
  }
  return {
    text: removeDirectives(code),
    directive: initDirective
  };
}, "processDirectives");
function preprocessDiagram(code) {
  const cleanedCode = cleanupText(code);
  const frontMatterResult = processFrontmatter(cleanedCode);
  const directiveResult = processDirectives(frontMatterResult.text);
  const config2 = cleanAndMerge(frontMatterResult.config, directiveResult.directive);
  code = cleanupComments(directiveResult.text);
  return {
    code,
    title: frontMatterResult.title,
    config: config2
  };
}
__name(preprocessDiagram, "preprocessDiagram");
function toBase64(str2) {
  const utf8Bytes = new TextEncoder().encode(str2);
  const utf8Str = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(utf8Str);
}
__name(toBase64, "toBase64");
var MAX_TEXTLENGTH = 5e4;
var MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var SECURITY_LVL_SANDBOX = "sandbox";
var SECURITY_LVL_LOOSE = "loose";
var XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
var XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
var XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
var IFRAME_WIDTH = "100%";
var IFRAME_HEIGHT = "100%";
var IFRAME_STYLES = "border:0;margin:0;";
var IFRAME_BODY_STYLE = "margin:0";
var IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
var IFRAME_NOT_SUPPORTED_MSG = 'The "iframe" tag is not supported by your browser.';
var DOMPURIFY_TAGS = ["foreignobject"];
var DOMPURIFY_ATTR = ["dominant-baseline"];
function processAndSetConfigs(text2) {
  const processed = preprocessDiagram(text2);
  reset();
  addDirective(processed.config ?? {});
  return processed;
}
__name(processAndSetConfigs, "processAndSetConfigs");
async function parse(text2, parseOptions) {
  addDiagrams();
  try {
    const { code, config: config2 } = processAndSetConfigs(text2);
    const diagram2 = await getDiagramFromText(code);
    return { diagramType: diagram2.type, config: config2 };
  } catch (error) {
    if (parseOptions == null ? void 0 : parseOptions.suppressErrors) {
      return false;
    }
    throw error;
  }
}
__name(parse, "parse");
var cssImportantStyles = /* @__PURE__ */ __name((cssClass, element, cssClasses = []) => {
  return `
.${cssClass} ${element} { ${cssClasses.join(" !important; ")} !important; }`;
}, "cssImportantStyles");
var createCssStyles = /* @__PURE__ */ __name((config2, classDefs = /* @__PURE__ */ new Map()) => {
  var _a2;
  let cssStyles = "";
  if (config2.themeCSS !== void 0) {
    cssStyles += `
${config2.themeCSS}`;
  }
  if (config2.fontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-font-family: ${config2.fontFamily}}`;
  }
  if (config2.altFontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-alt-font-family: ${config2.altFontFamily}}`;
  }
  if (classDefs instanceof Map) {
    const htmlLabels = config2.htmlLabels ?? ((_a2 = config2.flowchart) == null ? void 0 : _a2.htmlLabels);
    const cssHtmlElements = ["> *", "span"];
    const cssShapeElements = ["rect", "polygon", "ellipse", "circle", "path"];
    const cssElements = htmlLabels ? cssHtmlElements : cssShapeElements;
    classDefs.forEach((styleClassDef) => {
      if (!isEmpty(styleClassDef.styles)) {
        cssElements.forEach((cssElement) => {
          cssStyles += cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles);
        });
      }
      if (!isEmpty(styleClassDef.textStyles)) {
        cssStyles += cssImportantStyles(
          styleClassDef.id,
          "tspan",
          ((styleClassDef == null ? void 0 : styleClassDef.textStyles) || []).map((s2) => s2.replace("color", "fill"))
        );
      }
    });
  }
  return cssStyles;
}, "createCssStyles");
var createUserStyles = /* @__PURE__ */ __name((config2, graphType, classDefs, svgId) => {
  const userCSSstyles = createCssStyles(config2, classDefs);
  const allStyles = styles_default(graphType, userCSSstyles, config2.themeVariables);
  return serialize(compile(`${svgId}{${allStyles}}`), stringify);
}, "createUserStyles");
var cleanUpSvgCode = /* @__PURE__ */ __name((svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
  let cleanedUpSvg = svgCode;
  if (!useArrowMarkerUrls && !inSandboxMode) {
    cleanedUpSvg = cleanedUpSvg.replace(
      /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
      'marker-end="url(#'
    );
  }
  cleanedUpSvg = decodeEntities(cleanedUpSvg);
  cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
  return cleanedUpSvg;
}, "cleanUpSvgCode");
var putIntoIFrame = /* @__PURE__ */ __name((svgCode = "", svgElement) => {
  var _a2, _b2;
  const height = ((_b2 = (_a2 = svgElement == null ? void 0 : svgElement.viewBox) == null ? void 0 : _a2.baseVal) == null ? void 0 : _b2.height) ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT;
  const base64encodedSrc = toBase64(`<body style="${IFRAME_BODY_STYLE}">${svgCode}</body>`);
  return `<iframe style="width:${IFRAME_WIDTH};height:${height};${IFRAME_STYLES}" src="data:text/html;charset=UTF-8;base64,${base64encodedSrc}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
}, "putIntoIFrame");
var appendDivSvgG = /* @__PURE__ */ __name((parentRoot, id28, enclosingDivId, divStyle, svgXlink) => {
  const enclosingDiv = parentRoot.append("div");
  enclosingDiv.attr("id", enclosingDivId);
  if (divStyle) {
    enclosingDiv.attr("style", divStyle);
  }
  const svgNode2 = enclosingDiv.append("svg").attr("id", id28).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
  if (svgXlink) {
    svgNode2.attr("xmlns:xlink", svgXlink);
  }
  svgNode2.append("g");
  return parentRoot;
}, "appendDivSvgG");
function sandboxedIframe(parentNode, iFrameId) {
  return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
__name(sandboxedIframe, "sandboxedIframe");
var removeExistingElements = /* @__PURE__ */ __name((doc, id28, divId, iFrameId) => {
  var _a2, _b2, _c2;
  (_a2 = doc.getElementById(id28)) == null ? void 0 : _a2.remove();
  (_b2 = doc.getElementById(divId)) == null ? void 0 : _b2.remove();
  (_c2 = doc.getElementById(iFrameId)) == null ? void 0 : _c2.remove();
}, "removeExistingElements");
var render = /* @__PURE__ */ __name(async function(id28, text2, svgContainingElement) {
  var _a2, _b2, _c2, _d2, _e2, _f2;
  addDiagrams();
  const processed = processAndSetConfigs(text2);
  text2 = processed.code;
  const config2 = getConfig();
  log.debug(config2);
  if (text2.length > ((config2 == null ? void 0 : config2.maxTextSize) ?? MAX_TEXTLENGTH)) {
    text2 = MAX_TEXTLENGTH_EXCEEDED_MSG;
  }
  const idSelector = "#" + id28;
  const iFrameID = "i" + id28;
  const iFrameID_selector = "#" + iFrameID;
  const enclosingDivID = "d" + id28;
  const enclosingDivID_selector = "#" + enclosingDivID;
  const removeTempElements = /* @__PURE__ */ __name(() => {
    const tmpElementSelector = isSandboxed ? iFrameID_selector : enclosingDivID_selector;
    const node = select(tmpElementSelector).node();
    if (node && "remove" in node) {
      node.remove();
    }
  }, "removeTempElements");
  let root2 = select("body");
  const isSandboxed = config2.securityLevel === SECURITY_LVL_SANDBOX;
  const isLooseSecurityLevel = config2.securityLevel === SECURITY_LVL_LOOSE;
  const fontFamily = config2.fontFamily;
  if (svgContainingElement !== void 0) {
    if (svgContainingElement) {
      svgContainingElement.innerHTML = "";
    }
    if (isSandboxed) {
      const iframe = sandboxedIframe(select(svgContainingElement), iFrameID);
      root2 = select(iframe.nodes()[0].contentDocument.body);
      root2.node().style.margin = 0;
    } else {
      root2 = select(svgContainingElement);
    }
    appendDivSvgG(root2, id28, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
  } else {
    removeExistingElements(document, id28, enclosingDivID, iFrameID);
    if (isSandboxed) {
      const iframe = sandboxedIframe(select("body"), iFrameID);
      root2 = select(iframe.nodes()[0].contentDocument.body);
      root2.node().style.margin = 0;
    } else {
      root2 = select("body");
    }
    appendDivSvgG(root2, id28, enclosingDivID);
  }
  let diag;
  let parseEncounteredException;
  try {
    diag = await Diagram.fromText(text2, { title: processed.title });
  } catch (error) {
    if (config2.suppressErrorRendering) {
      removeTempElements();
      throw error;
    }
    diag = await Diagram.fromText("error");
    parseEncounteredException = error;
  }
  const element = root2.select(enclosingDivID_selector).node();
  const diagramType = diag.type;
  const svg2 = element.firstChild;
  const firstChild = svg2.firstChild;
  const diagramClassDefs = (_b2 = (_a2 = diag.renderer).getClasses) == null ? void 0 : _b2.call(_a2, text2, diag);
  const rules = createUserStyles(config2, diagramType, diagramClassDefs, idSelector);
  const style1 = document.createElement("style");
  style1.innerHTML = rules;
  svg2.insertBefore(style1, firstChild);
  try {
    await diag.renderer.draw(text2, id28, package_default.version, diag);
  } catch (e2) {
    if (config2.suppressErrorRendering) {
      removeTempElements();
    } else {
      errorRenderer_default.draw(text2, id28, package_default.version);
    }
    throw e2;
  }
  const svgNode2 = root2.select(`${enclosingDivID_selector} svg`);
  const a11yTitle = (_d2 = (_c2 = diag.db).getAccTitle) == null ? void 0 : _d2.call(_c2);
  const a11yDescr = (_f2 = (_e2 = diag.db).getAccDescription) == null ? void 0 : _f2.call(_e2);
  addA11yInfo(diagramType, svgNode2, a11yTitle, a11yDescr);
  root2.select(`[id="${id28}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
  let svgCode = root2.select(enclosingDivID_selector).node().innerHTML;
  log.debug("config.arrowMarkerAbsolute", config2.arrowMarkerAbsolute);
  svgCode = cleanUpSvgCode(svgCode, isSandboxed, evaluate(config2.arrowMarkerAbsolute));
  if (isSandboxed) {
    const svgEl = root2.select(enclosingDivID_selector + " svg").node();
    svgCode = putIntoIFrame(svgCode, svgEl);
  } else if (!isLooseSecurityLevel) {
    svgCode = purify.sanitize(svgCode, {
      ADD_TAGS: DOMPURIFY_TAGS,
      ADD_ATTR: DOMPURIFY_ATTR,
      HTML_INTEGRATION_POINTS: { foreignobject: true }
    });
  }
  attachFunctions();
  if (parseEncounteredException) {
    throw parseEncounteredException;
  }
  removeTempElements();
  return {
    diagramType,
    svg: svgCode,
    bindFunctions: diag.db.bindFunctions
  };
}, "render");
function initialize(userOptions = {}) {
  var _a2;
  const options = assignWithDepth_default({}, userOptions);
  if ((options == null ? void 0 : options.fontFamily) && !((_a2 = options.themeVariables) == null ? void 0 : _a2.fontFamily)) {
    if (!options.themeVariables) {
      options.themeVariables = {};
    }
    options.themeVariables.fontFamily = options.fontFamily;
  }
  saveConfigFromInitialize(options);
  if ((options == null ? void 0 : options.theme) && options.theme in themes_default) {
    options.themeVariables = themes_default[options.theme].getThemeVariables(
      options.themeVariables
    );
  } else if (options) {
    options.themeVariables = themes_default.default.getThemeVariables(options.themeVariables);
  }
  const config2 = typeof options === "object" ? setSiteConfig(options) : getSiteConfig();
  setLogLevel(config2.logLevel);
  addDiagrams();
}
__name(initialize, "initialize");
var getDiagramFromText = /* @__PURE__ */ __name((text2, metadata = {}) => {
  const { code } = preprocessDiagram(text2);
  return Diagram.fromText(code, metadata);
}, "getDiagramFromText");
function addA11yInfo(diagramType, svgNode2, a11yTitle, a11yDescr) {
  setA11yDiagramInfo(svgNode2, diagramType);
  addSVGa11yTitleDescription(svgNode2, a11yTitle, a11yDescr, svgNode2.attr("id"));
}
__name(addA11yInfo, "addA11yInfo");
var mermaidAPI = Object.freeze({
  render,
  parse,
  getDiagramFromText,
  initialize,
  getConfig,
  setConfig,
  getSiteConfig,
  updateSiteConfig,
  reset: /* @__PURE__ */ __name(() => {
    reset();
  }, "reset"),
  globalReset: /* @__PURE__ */ __name(() => {
    reset(defaultConfig);
  }, "globalReset"),
  defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
var handleError = /* @__PURE__ */ __name((error, errors, parseError) => {
  log.warn(error);
  if (isDetailedError(error)) {
    if (parseError) {
      parseError(error.str, error.hash);
    }
    errors.push({ ...error, message: error.str, error });
  } else {
    if (parseError) {
      parseError(error);
    }
    if (error instanceof Error) {
      errors.push({
        str: error.message,
        message: error.message,
        hash: error.name,
        error
      });
    }
  }
}, "handleError");
var run = /* @__PURE__ */ __name(async function(options = {
  querySelector: ".mermaid"
}) {
  try {
    await runThrowsErrors(options);
  } catch (e2) {
    if (isDetailedError(e2)) {
      log.error(e2.str);
    }
    if (mermaid.parseError) {
      mermaid.parseError(e2);
    }
    if (!options.suppressErrors) {
      log.error("Use the suppressErrors option to suppress these errors");
      throw e2;
    }
  }
}, "run");
var runThrowsErrors = /* @__PURE__ */ __name(async function({ postRenderCallback, querySelector, nodes } = {
  querySelector: ".mermaid"
}) {
  const conf = mermaidAPI.getConfig();
  log.debug(`${!postRenderCallback ? "No " : ""}Callback function found`);
  let nodesToProcess;
  if (nodes) {
    nodesToProcess = nodes;
  } else if (querySelector) {
    nodesToProcess = document.querySelectorAll(querySelector);
  } else {
    throw new Error("Nodes and querySelector are both undefined");
  }
  log.debug(`Found ${nodesToProcess.length} diagrams`);
  if ((conf == null ? void 0 : conf.startOnLoad) !== void 0) {
    log.debug("Start On Load: " + (conf == null ? void 0 : conf.startOnLoad));
    mermaidAPI.updateSiteConfig({ startOnLoad: conf == null ? void 0 : conf.startOnLoad });
  }
  const idGenerator = new utils_default.InitIDGenerator(conf.deterministicIds, conf.deterministicIDSeed);
  let txt;
  const errors = [];
  for (const element of Array.from(nodesToProcess)) {
    log.info("Rendering diagram: " + element.id);
    if (element.getAttribute("data-processed")) {
      continue;
    }
    element.setAttribute("data-processed", "true");
    const id28 = `mermaid-${idGenerator.next()}`;
    txt = element.innerHTML;
    txt = dedent(utils_default.entityDecode(txt)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const init2 = utils_default.detectInit(txt);
    if (init2) {
      log.debug("Detected early reinit: ", init2);
    }
    try {
      const { svg: svg2, bindFunctions } = await render2(id28, txt, element);
      element.innerHTML = svg2;
      if (postRenderCallback) {
        await postRenderCallback(id28);
      }
      if (bindFunctions) {
        bindFunctions(element);
      }
    } catch (error) {
      handleError(error, errors, mermaid.parseError);
    }
  }
  if (errors.length > 0) {
    throw errors[0];
  }
}, "runThrowsErrors");
var initialize2 = /* @__PURE__ */ __name(function(config2) {
  mermaidAPI.initialize(config2);
}, "initialize");
var init = /* @__PURE__ */ __name(async function(config2, nodes, callback) {
  log.warn("mermaid.init is deprecated. Please use run instead.");
  if (config2) {
    initialize2(config2);
  }
  const runOptions = { postRenderCallback: callback, querySelector: ".mermaid" };
  if (typeof nodes === "string") {
    runOptions.querySelector = nodes;
  } else if (nodes) {
    if (nodes instanceof HTMLElement) {
      runOptions.nodes = [nodes];
    } else {
      runOptions.nodes = nodes;
    }
  }
  await run(runOptions);
}, "init");
var registerExternalDiagrams = /* @__PURE__ */ __name(async (diagrams2, {
  lazyLoad = true
} = {}) => {
  addDiagrams();
  registerLazyLoadedDiagrams(...diagrams2);
  if (lazyLoad === false) {
    await loadRegisteredDiagrams();
  }
}, "registerExternalDiagrams");
var contentLoaded = /* @__PURE__ */ __name(function() {
  if (mermaid.startOnLoad) {
    const { startOnLoad } = mermaidAPI.getConfig();
    if (startOnLoad) {
      mermaid.run().catch((err) => log.error("Mermaid failed to initialize", err));
    }
  }
}, "contentLoaded");
if (typeof document !== "undefined") {
  window.addEventListener("load", contentLoaded, false);
}
var setParseErrorHandler = /* @__PURE__ */ __name(function(parseErrorHandler) {
  mermaid.parseError = parseErrorHandler;
}, "setParseErrorHandler");
var executionQueue = [];
var executionQueueRunning = false;
var executeQueue = /* @__PURE__ */ __name(async () => {
  if (executionQueueRunning) {
    return;
  }
  executionQueueRunning = true;
  while (executionQueue.length > 0) {
    const f2 = executionQueue.shift();
    if (f2) {
      try {
        await f2();
      } catch (e2) {
        log.error("Error executing queue", e2);
      }
    }
  }
  executionQueueRunning = false;
}, "executeQueue");
var parse2 = /* @__PURE__ */ __name(async (text2, parseOptions) => {
  return new Promise((resolve, reject) => {
    const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
      mermaidAPI.parse(text2, parseOptions).then(
        (r2) => {
          res(r2);
          resolve(r2);
        },
        (e2) => {
          var _a2;
          log.error("Error parsing", e2);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e2);
          rej(e2);
          reject(e2);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "parse");
var render2 = /* @__PURE__ */ __name((id28, text2, container) => {
  return new Promise((resolve, reject) => {
    const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
      mermaidAPI.render(id28, text2, container).then(
        (r2) => {
          res(r2);
          resolve(r2);
        },
        (e2) => {
          var _a2;
          log.error("Error parsing", e2);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e2);
          rej(e2);
          reject(e2);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "render");
var getRegisteredDiagramsMetadata = /* @__PURE__ */ __name(() => {
  return Object.keys(detectors).map((id28) => ({
    id: id28
  }));
}, "getRegisteredDiagramsMetadata");
var mermaid = {
  startOnLoad: true,
  mermaidAPI,
  parse: parse2,
  render: render2,
  init,
  run,
  registerExternalDiagrams,
  registerLayoutLoaders,
  initialize: initialize2,
  parseError: void 0,
  contentLoaded,
  setParseErrorHandler,
  detectType: detectType$1,
  registerIconPacks,
  getRegisteredDiagramsMetadata
};
var mermaid_default = mermaid;
/*! Check if previously processed */
/*!
 * Wait for document loaded before starting the execution
 */
var mermaid_core = /* @__PURE__ */ Object.freeze({ __proto__: null, default: mermaid_default });
export {
  max as $,
  defaultConfig2 as A,
  rgba$1 as B,
  Color$1 as C,
  __export as D,
  setupGraphViewbox2 as E,
  cleanAndMerge as F,
  getConfig as G,
  defaultConfig_default as H,
  random as I,
  JSON_SCHEMA as J,
  selectSvgElement as K,
  package_default as L,
  withPath as M,
  pi as N,
  cos as O,
  sin as P,
  constant as Q,
  halfPi as R,
  epsilon as S,
  tau as T,
  Utils as U,
  sqrt as V,
  min as W,
  abs as X,
  atan2 as Y,
  asin as Z,
  __name as _,
  getAccTitle as a,
  nogamma as a$,
  acos as a0,
  getThemeVariables3 as a1,
  hasKatex as a2,
  calculateMathMLDimensions as a3,
  parseFontSize as a4,
  ZERO_WIDTH_SPACE as a5,
  getUrl as a6,
  renderKatexSanitized as a7,
  parseGenericTypes as a8,
  line as a9,
  insertEdge as aA,
  positionEdgeLabel as aB,
  insertEdgeLabel as aC,
  computeDimensionOfText as aD,
  array as aE,
  getUserDefinedConfig as aF,
  getIconSVG as aG,
  registerIconPacks as aH,
  unknownIcon as aI,
  isIterateeCall as aJ,
  keysIn as aK,
  eq as aL,
  identity$1 as aM,
  isIndex as aN,
  assignValue as aO,
  constant$1 as aP,
  interpolateNumber as aQ,
  interpolateRgb as aR,
  interpolateString as aS,
  color as aT,
  styles2String as aU,
  isLabelStyle as aV,
  Rgb as aW,
  rgbConvert as aX,
  define as aY,
  extend$1 as aZ,
  Color as a_,
  curveBasis as aa,
  generateId as ab,
  setupGraphViewbox as ac,
  isDark as ad,
  lighten as ae,
  darken as af,
  commonDb_exports as ag,
  insertCluster as ah,
  insertNode as ai,
  positionNode as aj,
  getLineFunctionsWithOffset as ak,
  evaluate as al,
  createText as am,
  getSubGraphTitleMargins as an,
  replaceIconSubstring as ao,
  decodeEntities as ap,
  getStylesFromArray as aq,
  baseRest as ar,
  isArrayLikeObject as as,
  constant$3 as at,
  markers_default as au,
  clear2 as av,
  clear as aw,
  clear$1 as ax,
  updateNodeBounds as ay,
  setNodeElem as az,
  setAccTitle as b,
  hue as b0,
  dayjs2 as b1,
  setToString as b2,
  overRest as b3,
  baseFor as b4,
  baseAssignValue as b5,
  merge$1 as b6,
  arrayLikeKeys as b7,
  memoize as b8,
  copyObject as b9,
  getPrototype as ba,
  cloneArrayBuffer as bb,
  cloneTypedArray as bc,
  copyArray as bd,
  cloneBuffer as be,
  initCloneObject as bf,
  Stack as bg,
  MapCache as bh,
  Uint8Array$1 as bi,
  createAssigner as bj,
  mermaid_core as bk,
  getConfig2 as c,
  select as d,
  configureSvgSize as e,
  assignWithDepth_default as f,
  getAccDescription as g,
  calculateTextWidth as h,
  sanitizeText as i,
  distExports as j,
  common_default as k,
  log as l,
  calculateTextHeight as m,
  lineBreakRegex as n,
  setConfig2 as o,
  getRegisteredLayoutAlgorithm as p,
  setDiagramTitle as q,
  render$1 as r,
  setAccDescription as s,
  getDiagramTitle as t,
  utils_default as u,
  load as v,
  wrapLabel as w,
  isValidShape as x,
  getEdgeId as y,
  clear$2 as z
};
