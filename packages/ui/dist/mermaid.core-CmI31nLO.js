import { g as Xp, c as pi, J as Il, d as ds, A as vn, E as Rl, F as Pl, f as wn, K as Nl, M as Wl, L as Vp, B as zl, N as Kp, O as ql, i as Zp, P as Hl, Q as Qp, R as Jp, T as tg, a as _o } from "./index-CFDAYDAs.js";
var Ni = { exports: {} }, eg = Ni.exports, vo;
function rg() {
  return vo || (vo = 1, function(e, t) {
    (function(r, i) {
      e.exports = i();
    })(eg, function() {
      var r = 1e3, i = 6e4, a = 36e5, n = "millisecond", o = "second", s = "minute", l = "hour", c = "day", h = "week", u = "month", f = "quarter", d = "year", g = "date", m = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
        var L = ["th", "st", "nd", "rd"], B = A % 100;
        return "[" + A + (L[(B - 20) % 10] || L[B] || L[0]) + "]";
      } }, _ = function(A, L, B) {
        var F = String(A);
        return !F || F.length >= L ? A : "" + Array(L + 1 - F.length).join(B) + A;
      }, S = { s: _, z: function(A) {
        var L = -A.utcOffset(), B = Math.abs(L), F = Math.floor(B / 60), M = B % 60;
        return (L <= 0 ? "+" : "-") + _(F, 2, "0") + ":" + _(M, 2, "0");
      }, m: function A(L, B) {
        if (L.date() < B.date()) return -A(B, L);
        var F = 12 * (B.year() - L.year()) + (B.month() - L.month()), M = L.clone().add(F, u), z = B - M < 0, X = L.clone().add(F + (z ? -1 : 1), u);
        return +(-(F + (B - M) / (z ? M - X : X - M)) || 0);
      }, a: function(A) {
        return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
      }, p: function(A) {
        return { M: u, y: d, w: h, d: c, D: g, h: l, m: s, s: o, ms: n, Q: f }[A] || String(A || "").toLowerCase().replace(/s$/, "");
      }, u: function(A) {
        return A === void 0;
      } }, w = "en", C = {};
      C[w] = b;
      var T = "$isDayjsObject", D = function(A) {
        return A instanceof W || !(!A || !A[T]);
      }, P = function A(L, B, F) {
        var M;
        if (!L) return w;
        if (typeof L == "string") {
          var z = L.toLowerCase();
          C[z] && (M = z), B && (C[z] = B, M = z);
          var X = L.split("-");
          if (!M && X.length > 1) return A(X[0]);
        } else {
          var H = L.name;
          C[H] = L, M = H;
        }
        return !F && M && (w = M), M || !F && w;
      }, I = function(A, L) {
        if (D(A)) return A.clone();
        var B = typeof L == "object" ? L : {};
        return B.date = A, B.args = arguments, new W(B);
      }, E = S;
      E.l = P, E.i = D, E.w = function(A, L) {
        return I(A, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
      };
      var W = function() {
        function A(B) {
          this.$L = P(B.locale, null, !0), this.parse(B), this.$x = this.$x || B.x || {}, this[T] = !0;
        }
        var L = A.prototype;
        return L.parse = function(B) {
          this.$d = function(F) {
            var M = F.date, z = F.utc;
            if (M === null) return /* @__PURE__ */ new Date(NaN);
            if (E.u(M)) return /* @__PURE__ */ new Date();
            if (M instanceof Date) return new Date(M);
            if (typeof M == "string" && !/Z$/i.test(M)) {
              var X = M.match(y);
              if (X) {
                var H = X[2] - 1 || 0, ut = (X[7] || "0").substring(0, 3);
                return z ? new Date(Date.UTC(X[1], H, X[3] || 1, X[4] || 0, X[5] || 0, X[6] || 0, ut)) : new Date(X[1], H, X[3] || 1, X[4] || 0, X[5] || 0, X[6] || 0, ut);
              }
            }
            return new Date(M);
          }(B), this.init();
        }, L.init = function() {
          var B = this.$d;
          this.$y = B.getFullYear(), this.$M = B.getMonth(), this.$D = B.getDate(), this.$W = B.getDay(), this.$H = B.getHours(), this.$m = B.getMinutes(), this.$s = B.getSeconds(), this.$ms = B.getMilliseconds();
        }, L.$utils = function() {
          return E;
        }, L.isValid = function() {
          return this.$d.toString() !== m;
        }, L.isSame = function(B, F) {
          var M = I(B);
          return this.startOf(F) <= M && M <= this.endOf(F);
        }, L.isAfter = function(B, F) {
          return I(B) < this.startOf(F);
        }, L.isBefore = function(B, F) {
          return this.endOf(F) < I(B);
        }, L.$g = function(B, F, M) {
          return E.u(B) ? this[F] : this.set(M, B);
        }, L.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, L.valueOf = function() {
          return this.$d.getTime();
        }, L.startOf = function(B, F) {
          var M = this, z = !!E.u(F) || F, X = E.p(B), H = function(pt, gt) {
            var Ct = E.w(M.$u ? Date.UTC(M.$y, gt, pt) : new Date(M.$y, gt, pt), M);
            return z ? Ct : Ct.endOf(c);
          }, ut = function(pt, gt) {
            return E.w(M.toDate()[pt].apply(M.toDate("s"), (z ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(gt)), M);
          }, at = this.$W, dt = this.$M, st = this.$D, nt = "set" + (this.$u ? "UTC" : "");
          switch (X) {
            case d:
              return z ? H(1, 0) : H(31, 11);
            case u:
              return z ? H(1, dt) : H(0, dt + 1);
            case h:
              var ct = this.$locale().weekStart || 0, xt = (at < ct ? at + 7 : at) - ct;
              return H(z ? st - xt : st + (6 - xt), dt);
            case c:
            case g:
              return ut(nt + "Hours", 0);
            case l:
              return ut(nt + "Minutes", 1);
            case s:
              return ut(nt + "Seconds", 2);
            case o:
              return ut(nt + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, L.endOf = function(B) {
          return this.startOf(B, !1);
        }, L.$set = function(B, F) {
          var M, z = E.p(B), X = "set" + (this.$u ? "UTC" : ""), H = (M = {}, M[c] = X + "Date", M[g] = X + "Date", M[u] = X + "Month", M[d] = X + "FullYear", M[l] = X + "Hours", M[s] = X + "Minutes", M[o] = X + "Seconds", M[n] = X + "Milliseconds", M)[z], ut = z === c ? this.$D + (F - this.$W) : F;
          if (z === u || z === d) {
            var at = this.clone().set(g, 1);
            at.$d[H](ut), at.init(), this.$d = at.set(g, Math.min(this.$D, at.daysInMonth())).$d;
          } else H && this.$d[H](ut);
          return this.init(), this;
        }, L.set = function(B, F) {
          return this.clone().$set(B, F);
        }, L.get = function(B) {
          return this[E.p(B)]();
        }, L.add = function(B, F) {
          var M, z = this;
          B = Number(B);
          var X = E.p(F), H = function(dt) {
            var st = I(z);
            return E.w(st.date(st.date() + Math.round(dt * B)), z);
          };
          if (X === u) return this.set(u, this.$M + B);
          if (X === d) return this.set(d, this.$y + B);
          if (X === c) return H(1);
          if (X === h) return H(7);
          var ut = (M = {}, M[s] = i, M[l] = a, M[o] = r, M)[X] || 1, at = this.$d.getTime() + B * ut;
          return E.w(at, this);
        }, L.subtract = function(B, F) {
          return this.add(-1 * B, F);
        }, L.format = function(B) {
          var F = this, M = this.$locale();
          if (!this.isValid()) return M.invalidDate || m;
          var z = B || "YYYY-MM-DDTHH:mm:ssZ", X = E.z(this), H = this.$H, ut = this.$m, at = this.$M, dt = M.weekdays, st = M.months, nt = M.meridiem, ct = function(gt, Ct, Rt, se) {
            return gt && (gt[Ct] || gt(F, z)) || Rt[Ct].slice(0, se);
          }, xt = function(gt) {
            return E.s(H % 12 || 12, gt, "0");
          }, pt = nt || function(gt, Ct, Rt) {
            var se = gt < 12 ? "AM" : "PM";
            return Rt ? se.toLowerCase() : se;
          };
          return z.replace(x, function(gt, Ct) {
            return Ct || function(Rt) {
              switch (Rt) {
                case "YY":
                  return String(F.$y).slice(-2);
                case "YYYY":
                  return E.s(F.$y, 4, "0");
                case "M":
                  return at + 1;
                case "MM":
                  return E.s(at + 1, 2, "0");
                case "MMM":
                  return ct(M.monthsShort, at, st, 3);
                case "MMMM":
                  return ct(st, at);
                case "D":
                  return F.$D;
                case "DD":
                  return E.s(F.$D, 2, "0");
                case "d":
                  return String(F.$W);
                case "dd":
                  return ct(M.weekdaysMin, F.$W, dt, 2);
                case "ddd":
                  return ct(M.weekdaysShort, F.$W, dt, 3);
                case "dddd":
                  return dt[F.$W];
                case "H":
                  return String(H);
                case "HH":
                  return E.s(H, 2, "0");
                case "h":
                  return xt(1);
                case "hh":
                  return xt(2);
                case "a":
                  return pt(H, ut, !0);
                case "A":
                  return pt(H, ut, !1);
                case "m":
                  return String(ut);
                case "mm":
                  return E.s(ut, 2, "0");
                case "s":
                  return String(F.$s);
                case "ss":
                  return E.s(F.$s, 2, "0");
                case "SSS":
                  return E.s(F.$ms, 3, "0");
                case "Z":
                  return X;
              }
              return null;
            }(gt) || X.replace(":", "");
          });
        }, L.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, L.diff = function(B, F, M) {
          var z, X = this, H = E.p(F), ut = I(B), at = (ut.utcOffset() - this.utcOffset()) * i, dt = this - ut, st = function() {
            return E.m(X, ut);
          };
          switch (H) {
            case d:
              z = st() / 12;
              break;
            case u:
              z = st();
              break;
            case f:
              z = st() / 3;
              break;
            case h:
              z = (dt - at) / 6048e5;
              break;
            case c:
              z = (dt - at) / 864e5;
              break;
            case l:
              z = dt / a;
              break;
            case s:
              z = dt / i;
              break;
            case o:
              z = dt / r;
              break;
            default:
              z = dt;
          }
          return M ? z : E.a(z);
        }, L.daysInMonth = function() {
          return this.endOf(u).$D;
        }, L.$locale = function() {
          return C[this.$L];
        }, L.locale = function(B, F) {
          if (!B) return this.$L;
          var M = this.clone(), z = P(B, F, !0);
          return z && (M.$L = z), M;
        }, L.clone = function() {
          return E.w(this.$d, this);
        }, L.toDate = function() {
          return new Date(this.valueOf());
        }, L.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, L.toISOString = function() {
          return this.$d.toISOString();
        }, L.toString = function() {
          return this.$d.toUTCString();
        }, A;
      }(), O = W.prototype;
      return I.prototype = O, [["$ms", n], ["$s", o], ["$m", s], ["$H", l], ["$W", c], ["$M", u], ["$y", d], ["$D", g]].forEach(function(A) {
        O[A[1]] = function(L) {
          return this.$g(L, A[0], A[1]);
        };
      }), I.extend = function(A, L) {
        return A.$i || (A(L, W, I), A.$i = !0), I;
      }, I.locale = P, I.isDayjs = D, I.unix = function(A) {
        return I(1e3 * A);
      }, I.en = C[w], I.Ls = C, I.p = {}, I;
    });
  }(Ni)), Ni.exports;
}
var ig = rg(), ag = /* @__PURE__ */ Xp(ig);
function Yl(e) {
  return e;
}
var wo = Object.create, ng = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!pi(t))
      return {};
    if (wo)
      return wo(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function sg(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function og(e, t) {
  var r = -1, i = e.length;
  for (t || (t = Array(i)); ++r < i; )
    t[r] = e[r];
  return t;
}
var lg = 800, cg = 16, hg = Date.now;
function ug(e) {
  var t = 0, r = 0;
  return function() {
    var i = hg(), a = cg - (i - r);
    if (r = i, a > 0) {
      if (++t >= lg)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function fg(e) {
  return function() {
    return e;
  };
}
var Zi = function() {
  try {
    var e = Il(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), dg = Zi ? function(e, t) {
  return Zi(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: fg(t),
    writable: !0
  });
} : Yl, pg = ug(dg), gg = 9007199254740991, mg = /^(?:0|[1-9]\d*)$/;
function Ul(e, t) {
  var r = typeof e;
  return t = t ?? gg, !!t && (r == "number" || r != "symbol" && mg.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ps(e, t, r) {
  t == "__proto__" && Zi ? Zi(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Ba(e, t) {
  return e === t || e !== e && t !== t;
}
var yg = Object.prototype, xg = yg.hasOwnProperty;
function bg(e, t, r) {
  var i = e[t];
  (!(xg.call(e, t) && Ba(i, r)) || r === void 0 && !(t in e)) && ps(e, t, r);
}
function Cg(e, t, r, i) {
  var a = !r;
  r || (r = {});
  for (var n = -1, o = t.length; ++n < o; ) {
    var s = t[n], l = void 0;
    l === void 0 && (l = e[s]), a ? ps(r, s, l) : bg(r, s, l);
  }
  return r;
}
var So = Math.max;
function _g(e, t, r) {
  return t = So(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var i = arguments, a = -1, n = So(i.length - t, 0), o = Array(n); ++a < n; )
      o[a] = i[t + a];
    a = -1;
    for (var s = Array(t + 1); ++a < t; )
      s[a] = i[a];
    return s[t] = r(o), sg(e, this, s);
  };
}
function vg(e, t) {
  return pg(_g(e, t, Yl), e + "");
}
function wg(e, t, r) {
  if (!pi(r))
    return !1;
  var i = typeof t;
  return (i == "number" ? ds(r) && Ul(t, r.length) : i == "string" && t in r) ? Ba(r[t], e) : !1;
}
function Sg(e) {
  return vg(function(t, r) {
    var i = -1, a = r.length, n = a > 1 ? r[a - 1] : void 0, o = a > 2 ? r[2] : void 0;
    for (n = e.length > 3 && typeof n == "function" ? (a--, n) : void 0, o && wg(r[0], r[1], o) && (n = a < 3 ? void 0 : n, a = 1), t = Object(t); ++i < a; ) {
      var s = r[i];
      s && e(t, s, i, n);
    }
    return t;
  });
}
function kg(e, t) {
  for (var r = -1, i = Array(e); ++r < e; )
    i[r] = t(r);
  return i;
}
var Tg = Object.prototype, Bg = Tg.hasOwnProperty;
function Lg(e, t) {
  var r = wn(e), i = !r && vn(e), a = !r && !i && Rl(e), n = !r && !i && !a && Pl(e), o = r || i || a || n, s = o ? kg(e.length, String) : [], l = s.length;
  for (var c in e)
    (t || Bg.call(e, c)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    n && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    Ul(c, l))) && s.push(c);
  return s;
}
function Mg(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Ag = Object.prototype, Eg = Ag.hasOwnProperty;
function Fg(e) {
  if (!pi(e))
    return Mg(e);
  var t = Nl(e), r = [];
  for (var i in e)
    i == "constructor" && (t || !Eg.call(e, i)) || r.push(i);
  return r;
}
function jl(e) {
  return ds(e) ? Lg(e, !0) : Fg(e);
}
var ii = Il(Object, "create");
function $g() {
  this.__data__ = ii ? ii(null) : {}, this.size = 0;
}
function Dg(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Og = "__lodash_hash_undefined__", Ig = Object.prototype, Rg = Ig.hasOwnProperty;
function Pg(e) {
  var t = this.__data__;
  if (ii) {
    var r = t[e];
    return r === Og ? void 0 : r;
  }
  return Rg.call(t, e) ? t[e] : void 0;
}
var Ng = Object.prototype, Wg = Ng.hasOwnProperty;
function zg(e) {
  var t = this.__data__;
  return ii ? t[e] !== void 0 : Wg.call(t, e);
}
var qg = "__lodash_hash_undefined__";
function Hg(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ii && t === void 0 ? qg : t, this;
}
function Ve(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
Ve.prototype.clear = $g;
Ve.prototype.delete = Dg;
Ve.prototype.get = Pg;
Ve.prototype.has = zg;
Ve.prototype.set = Hg;
function Yg() {
  this.__data__ = [], this.size = 0;
}
function La(e, t) {
  for (var r = e.length; r--; )
    if (Ba(e[r][0], t))
      return r;
  return -1;
}
var Ug = Array.prototype, jg = Ug.splice;
function Gg(e) {
  var t = this.__data__, r = La(t, e);
  if (r < 0)
    return !1;
  var i = t.length - 1;
  return r == i ? t.pop() : jg.call(t, r, 1), --this.size, !0;
}
function Xg(e) {
  var t = this.__data__, r = La(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Vg(e) {
  return La(this.__data__, e) > -1;
}
function Kg(e, t) {
  var r = this.__data__, i = La(r, e);
  return i < 0 ? (++this.size, r.push([e, t])) : r[i][1] = t, this;
}
function Te(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
Te.prototype.clear = Yg;
Te.prototype.delete = Gg;
Te.prototype.get = Xg;
Te.prototype.has = Vg;
Te.prototype.set = Kg;
function Zg() {
  this.size = 0, this.__data__ = {
    hash: new Ve(),
    map: new (Wl || Te)(),
    string: new Ve()
  };
}
function Qg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ma(e, t) {
  var r = e.__data__;
  return Qg(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Jg(e) {
  var t = Ma(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function tm(e) {
  return Ma(this, e).get(e);
}
function em(e) {
  return Ma(this, e).has(e);
}
function rm(e, t) {
  var r = Ma(this, e), i = r.size;
  return r.set(e, t), this.size += r.size == i ? 0 : 1, this;
}
function De(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
De.prototype.clear = Zg;
De.prototype.delete = Jg;
De.prototype.get = tm;
De.prototype.has = em;
De.prototype.set = rm;
var im = "Expected a function";
function gi(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(im);
  var r = function() {
    var i = arguments, a = t ? t.apply(this, i) : i[0], n = r.cache;
    if (n.has(a))
      return n.get(a);
    var o = e.apply(this, i);
    return r.cache = n.set(a, o) || n, o;
  };
  return r.cache = new (gi.Cache || De)(), r;
}
gi.Cache = De;
var Gl = Vp(Object.getPrototypeOf, Object), am = "[object Object]", nm = Function.prototype, sm = Object.prototype, Xl = nm.toString, om = sm.hasOwnProperty, lm = Xl.call(Object);
function cm(e) {
  if (!zl(e) || Kp(e) != am)
    return !1;
  var t = Gl(e);
  if (t === null)
    return !0;
  var r = om.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Xl.call(r) == lm;
}
function hm() {
  this.__data__ = new Te(), this.size = 0;
}
function um(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function fm(e) {
  return this.__data__.get(e);
}
function dm(e) {
  return this.__data__.has(e);
}
var pm = 200;
function gm(e, t) {
  var r = this.__data__;
  if (r instanceof Te) {
    var i = r.__data__;
    if (!Wl || i.length < pm - 1)
      return i.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new De(i);
  }
  return r.set(e, t), this.size = r.size, this;
}
function Ar(e) {
  var t = this.__data__ = new Te(e);
  this.size = t.size;
}
Ar.prototype.clear = hm;
Ar.prototype.delete = um;
Ar.prototype.get = fm;
Ar.prototype.has = dm;
Ar.prototype.set = gm;
var Vl = typeof exports == "object" && exports && !exports.nodeType && exports, ko = Vl && typeof module == "object" && module && !module.nodeType && module, mm = ko && ko.exports === Vl, To = mm ? ql.Buffer : void 0, Bo = To ? To.allocUnsafe : void 0;
function ym(e, t) {
  if (t)
    return e.slice();
  var r = e.length, i = Bo ? Bo(r) : new e.constructor(r);
  return e.copy(i), i;
}
var Lo = ql.Uint8Array;
function xm(e) {
  var t = new e.constructor(e.byteLength);
  return new Lo(t).set(new Lo(e)), t;
}
function bm(e, t) {
  var r = t ? xm(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function Cm(e) {
  return typeof e.constructor == "function" && !Nl(e) ? ng(Gl(e)) : {};
}
function _m(e) {
  return function(t, r, i) {
    for (var a = -1, n = Object(t), o = i(t), s = o.length; s--; ) {
      var l = o[++a];
      if (r(n[l], l, n) === !1)
        break;
    }
    return t;
  };
}
var vm = _m();
function Sn(e, t, r) {
  (r !== void 0 && !Ba(e[t], r) || r === void 0 && !(t in e)) && ps(e, t, r);
}
function wm(e) {
  return zl(e) && ds(e);
}
function kn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Sm(e) {
  return Cg(e, jl(e));
}
function km(e, t, r, i, a, n, o) {
  var s = kn(e, r), l = kn(t, r), c = o.get(l);
  if (c) {
    Sn(e, r, c);
    return;
  }
  var h = n ? n(s, l, r + "", e, t, o) : void 0, u = h === void 0;
  if (u) {
    var f = wn(l), d = !f && Rl(l), g = !f && !d && Pl(l);
    h = l, f || d || g ? wn(s) ? h = s : wm(s) ? h = og(s) : d ? (u = !1, h = ym(l, !0)) : g ? (u = !1, h = bm(l, !0)) : h = [] : cm(l) || vn(l) ? (h = s, vn(s) ? h = Sm(s) : (!pi(s) || Zp(s)) && (h = Cm(l))) : u = !1;
  }
  u && (o.set(l, h), a(h, l, i, n, o), o.delete(l)), Sn(e, r, h);
}
function Kl(e, t, r, i, a) {
  e !== t && vm(t, function(n, o) {
    if (a || (a = new Ar()), pi(n))
      km(e, t, o, r, Kl, i, a);
    else {
      var s = i ? i(kn(e, o), n, o + "", e, t, a) : void 0;
      s === void 0 && (s = n), Sn(e, o, s);
    }
  }, jl);
}
var Tm = Sg(function(e, t, r) {
  Kl(e, t, r);
}), Mo = {
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
}, Zl = Object.defineProperty, p = (e, t) => Zl(e, "name", { value: t, configurable: !0 }), Bm = (e, t) => {
  for (var r in t)
    Zl(e, r, { get: t[r], enumerable: !0 });
}, ye = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, $ = {
  trace: /* @__PURE__ */ p((...e) => {
  }, "trace"),
  debug: /* @__PURE__ */ p((...e) => {
  }, "debug"),
  info: /* @__PURE__ */ p((...e) => {
  }, "info"),
  warn: /* @__PURE__ */ p((...e) => {
  }, "warn"),
  error: /* @__PURE__ */ p((...e) => {
  }, "error"),
  fatal: /* @__PURE__ */ p((...e) => {
  }, "fatal")
}, gs = /* @__PURE__ */ p(function(e = "fatal") {
  let t = ye.fatal;
  typeof e == "string" ? e.toLowerCase() in ye && (t = ye[e]) : typeof e == "number" && (t = e), $.trace = () => {
  }, $.debug = () => {
  }, $.info = () => {
  }, $.warn = () => {
  }, $.error = () => {
  }, $.fatal = () => {
  }, t <= ye.fatal && ($.fatal = console.error ? console.error.bind(console, Zt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", Zt("FATAL"))), t <= ye.error && ($.error = console.error ? console.error.bind(console, Zt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", Zt("ERROR"))), t <= ye.warn && ($.warn = console.warn ? console.warn.bind(console, Zt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", Zt("WARN"))), t <= ye.info && ($.info = console.info ? console.info.bind(console, Zt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", Zt("INFO"))), t <= ye.debug && ($.debug = console.debug ? console.debug.bind(console, Zt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Zt("DEBUG"))), t <= ye.trace && ($.trace = console.debug ? console.debug.bind(console, Zt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Zt("TRACE")));
}, "setLogLevel"), Zt = /* @__PURE__ */ p((e) => `%c${ag().format("ss.SSS")} : ${e} : `, "format");
const Wi = {
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
    r: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    g: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    b: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    h: (e) => e % 360,
    s: (e) => e >= 100 ? 100 : e < 0 ? 0 : e,
    l: (e) => e >= 100 ? 100 : e < 0 ? 0 : e,
    a: (e) => e >= 1 ? 1 : e < 0 ? 0 : e
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (e) => {
    const t = e / 255;
    return e > 0.03928 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (e, t, r) => (r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * 6 * r : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e),
  hsl2rgb: ({ h: e, s: t, l: r }, i) => {
    if (!t)
      return r * 2.55;
    e /= 360, t /= 100, r /= 100;
    const a = r < 0.5 ? r * (1 + t) : r + t - r * t, n = 2 * r - a;
    switch (i) {
      case "r":
        return Wi.hue2rgb(n, a, e + 1 / 3) * 255;
      case "g":
        return Wi.hue2rgb(n, a, e) * 255;
      case "b":
        return Wi.hue2rgb(n, a, e - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: e, g: t, b: r }, i) => {
    e /= 255, t /= 255, r /= 255;
    const a = Math.max(e, t, r), n = Math.min(e, t, r), o = (a + n) / 2;
    if (i === "l")
      return o * 100;
    if (a === n)
      return 0;
    const s = a - n, l = o > 0.5 ? s / (2 - a - n) : s / (a + n);
    if (i === "s")
      return l * 100;
    switch (a) {
      case e:
        return ((t - r) / s + (t < r ? 6 : 0)) * 60;
      case t:
        return ((r - e) / s + 2) * 60;
      case r:
        return ((e - t) / s + 4) * 60;
      default:
        return -1;
    }
  }
}, Lm = {
  /* API */
  clamp: (e, t, r) => t > r ? Math.min(t, Math.max(r, e)) : Math.min(r, Math.max(t, e)),
  round: (e) => Math.round(e * 1e10) / 1e10
}, Mm = {
  /* API */
  dec2hex: (e) => {
    const t = Math.round(e).toString(16);
    return t.length > 1 ? t : `0${t}`;
  }
}, it = {
  channel: Wi,
  lang: Lm,
  unit: Mm
}, Be = {};
for (let e = 0; e <= 255; e++)
  Be[e] = it.unit.dec2hex(e);
const Et = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Am {
  constructor() {
    this.type = Et.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(t) {
    if (this.type && this.type !== t)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = t;
  }
  reset() {
    this.type = Et.ALL;
  }
  is(t) {
    return this.type === t;
  }
}
class Em {
  /* CONSTRUCTOR */
  constructor(t, r) {
    this.color = r, this.changed = !1, this.data = t, this.type = new Am();
  }
  /* API */
  set(t, r) {
    return this.color = r, this.changed = !1, this.data = t, this.type.type = Et.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const t = this.data, { h: r, s: i, l: a } = t;
    r === void 0 && (t.h = it.channel.rgb2hsl(t, "h")), i === void 0 && (t.s = it.channel.rgb2hsl(t, "s")), a === void 0 && (t.l = it.channel.rgb2hsl(t, "l"));
  }
  _ensureRGB() {
    const t = this.data, { r, g: i, b: a } = t;
    r === void 0 && (t.r = it.channel.hsl2rgb(t, "r")), i === void 0 && (t.g = it.channel.hsl2rgb(t, "g")), a === void 0 && (t.b = it.channel.hsl2rgb(t, "b"));
  }
  /* GETTERS */
  get r() {
    const t = this.data, r = t.r;
    return !this.type.is(Et.HSL) && r !== void 0 ? r : (this._ensureHSL(), it.channel.hsl2rgb(t, "r"));
  }
  get g() {
    const t = this.data, r = t.g;
    return !this.type.is(Et.HSL) && r !== void 0 ? r : (this._ensureHSL(), it.channel.hsl2rgb(t, "g"));
  }
  get b() {
    const t = this.data, r = t.b;
    return !this.type.is(Et.HSL) && r !== void 0 ? r : (this._ensureHSL(), it.channel.hsl2rgb(t, "b"));
  }
  get h() {
    const t = this.data, r = t.h;
    return !this.type.is(Et.RGB) && r !== void 0 ? r : (this._ensureRGB(), it.channel.rgb2hsl(t, "h"));
  }
  get s() {
    const t = this.data, r = t.s;
    return !this.type.is(Et.RGB) && r !== void 0 ? r : (this._ensureRGB(), it.channel.rgb2hsl(t, "s"));
  }
  get l() {
    const t = this.data, r = t.l;
    return !this.type.is(Et.RGB) && r !== void 0 ? r : (this._ensureRGB(), it.channel.rgb2hsl(t, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(t) {
    this.type.set(Et.RGB), this.changed = !0, this.data.r = t;
  }
  set g(t) {
    this.type.set(Et.RGB), this.changed = !0, this.data.g = t;
  }
  set b(t) {
    this.type.set(Et.RGB), this.changed = !0, this.data.b = t;
  }
  set h(t) {
    this.type.set(Et.HSL), this.changed = !0, this.data.h = t;
  }
  set s(t) {
    this.type.set(Et.HSL), this.changed = !0, this.data.s = t;
  }
  set l(t) {
    this.type.set(Et.HSL), this.changed = !0, this.data.l = t;
  }
  set a(t) {
    this.changed = !0, this.data.a = t;
  }
}
const Aa = new Em({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), dr = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (e) => {
    if (e.charCodeAt(0) !== 35)
      return;
    const t = e.match(dr.re);
    if (!t)
      return;
    const r = t[1], i = parseInt(r, 16), a = r.length, n = a % 4 === 0, o = a > 4, s = o ? 1 : 17, l = o ? 8 : 4, c = n ? 0 : -1, h = o ? 255 : 15;
    return Aa.set({
      r: (i >> l * (c + 3) & h) * s,
      g: (i >> l * (c + 2) & h) * s,
      b: (i >> l * (c + 1) & h) * s,
      a: n ? (i & h) * s / 255 : 1
    }, e);
  },
  stringify: (e) => {
    const { r: t, g: r, b: i, a } = e;
    return a < 1 ? `#${Be[Math.round(t)]}${Be[Math.round(r)]}${Be[Math.round(i)]}${Be[Math.round(a * 255)]}` : `#${Be[Math.round(t)]}${Be[Math.round(r)]}${Be[Math.round(i)]}`;
  }
}, qe = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (e) => {
    const t = e.match(qe.hueRe);
    if (t) {
      const [, r, i] = t;
      switch (i) {
        case "grad":
          return it.channel.clamp.h(parseFloat(r) * 0.9);
        case "rad":
          return it.channel.clamp.h(parseFloat(r) * 180 / Math.PI);
        case "turn":
          return it.channel.clamp.h(parseFloat(r) * 360);
      }
    }
    return it.channel.clamp.h(parseFloat(e));
  },
  /* API */
  parse: (e) => {
    const t = e.charCodeAt(0);
    if (t !== 104 && t !== 72)
      return;
    const r = e.match(qe.re);
    if (!r)
      return;
    const [, i, a, n, o, s] = r;
    return Aa.set({
      h: qe._hue2deg(i),
      s: it.channel.clamp.s(parseFloat(a)),
      l: it.channel.clamp.l(parseFloat(n)),
      a: o ? it.channel.clamp.a(s ? parseFloat(o) / 100 : parseFloat(o)) : 1
    }, e);
  },
  stringify: (e) => {
    const { h: t, s: r, l: i, a } = e;
    return a < 1 ? `hsla(${it.lang.round(t)}, ${it.lang.round(r)}%, ${it.lang.round(i)}%, ${a})` : `hsl(${it.lang.round(t)}, ${it.lang.round(r)}%, ${it.lang.round(i)}%)`;
  }
}, Jr = {
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
  parse: (e) => {
    e = e.toLowerCase();
    const t = Jr.colors[e];
    if (t)
      return dr.parse(t);
  },
  stringify: (e) => {
    const t = dr.stringify(e);
    for (const r in Jr.colors)
      if (Jr.colors[r] === t)
        return r;
  }
}, Ur = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (e) => {
    const t = e.charCodeAt(0);
    if (t !== 114 && t !== 82)
      return;
    const r = e.match(Ur.re);
    if (!r)
      return;
    const [, i, a, n, o, s, l, c, h] = r;
    return Aa.set({
      r: it.channel.clamp.r(a ? parseFloat(i) * 2.55 : parseFloat(i)),
      g: it.channel.clamp.g(o ? parseFloat(n) * 2.55 : parseFloat(n)),
      b: it.channel.clamp.b(l ? parseFloat(s) * 2.55 : parseFloat(s)),
      a: c ? it.channel.clamp.a(h ? parseFloat(c) / 100 : parseFloat(c)) : 1
    }, e);
  },
  stringify: (e) => {
    const { r: t, g: r, b: i, a } = e;
    return a < 1 ? `rgba(${it.lang.round(t)}, ${it.lang.round(r)}, ${it.lang.round(i)}, ${it.lang.round(a)})` : `rgb(${it.lang.round(t)}, ${it.lang.round(r)}, ${it.lang.round(i)})`;
  }
}, ue = {
  /* VARIABLES */
  format: {
    keyword: Jr,
    hex: dr,
    rgb: Ur,
    rgba: Ur,
    hsl: qe,
    hsla: qe
  },
  /* API */
  parse: (e) => {
    if (typeof e != "string")
      return e;
    const t = dr.parse(e) || Ur.parse(e) || qe.parse(e) || Jr.parse(e);
    if (t)
      return t;
    throw new Error(`Unsupported color format: "${e}"`);
  },
  stringify: (e) => !e.changed && e.color ? e.color : e.type.is(Et.HSL) || e.data.r === void 0 ? qe.stringify(e) : e.a < 1 || !Number.isInteger(e.r) || !Number.isInteger(e.g) || !Number.isInteger(e.b) ? Ur.stringify(e) : dr.stringify(e)
}, Ql = (e, t) => {
  const r = ue.parse(e);
  for (const i in t)
    r[i] = it.channel.clamp[i](t[i]);
  return ue.stringify(r);
}, ti = (e, t, r = 0, i = 1) => {
  if (typeof e != "number")
    return Ql(e, { a: t });
  const a = Aa.set({
    r: it.channel.clamp.r(e),
    g: it.channel.clamp.g(t),
    b: it.channel.clamp.b(r),
    a: it.channel.clamp.a(i)
  });
  return ue.stringify(a);
}, Fm = (e) => {
  const { r: t, g: r, b: i } = ue.parse(e), a = 0.2126 * it.channel.toLinear(t) + 0.7152 * it.channel.toLinear(r) + 0.0722 * it.channel.toLinear(i);
  return it.lang.round(a);
}, $m = (e) => Fm(e) >= 0.5, mi = (e) => !$m(e), Jl = (e, t, r) => {
  const i = ue.parse(e), a = i[t], n = it.channel.clamp[t](a + r);
  return a !== n && (i[t] = n), ue.stringify(i);
}, Y = (e, t) => Jl(e, "l", t), J = (e, t) => Jl(e, "l", -t), k = (e, t) => {
  const r = ue.parse(e), i = {};
  for (const a in t)
    t[a] && (i[a] = r[a] + t[a]);
  return Ql(e, i);
}, Dm = (e, t, r = 50) => {
  const { r: i, g: a, b: n, a: o } = ue.parse(e), { r: s, g: l, b: c, a: h } = ue.parse(t), u = r / 100, f = u * 2 - 1, d = o - h, m = ((f * d === -1 ? f : (f + d) / (1 + f * d)) + 1) / 2, y = 1 - m, x = i * m + s * y, b = a * m + l * y, _ = n * m + c * y, S = o * u + h * (1 - u);
  return ti(x, b, _, S);
}, N = (e, t = 100) => {
  const r = ue.parse(e);
  return r.r = 255 - r.r, r.g = 255 - r.g, r.b = 255 - r.b, Dm(r, e, t);
};
/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */
const {
  entries: tc,
  setPrototypeOf: Ao,
  isFrozen: Om,
  getPrototypeOf: Im,
  getOwnPropertyDescriptor: Rm
} = Object;
let {
  freeze: zt,
  seal: Qt,
  create: ec
} = Object, {
  apply: Tn,
  construct: Bn
} = typeof Reflect < "u" && Reflect;
zt || (zt = function(t) {
  return t;
});
Qt || (Qt = function(t) {
  return t;
});
Tn || (Tn = function(t, r) {
  for (var i = arguments.length, a = new Array(i > 2 ? i - 2 : 0), n = 2; n < i; n++)
    a[n - 2] = arguments[n];
  return t.apply(r, a);
});
Bn || (Bn = function(t) {
  for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
    i[a - 1] = arguments[a];
  return new t(...i);
});
const Mi = qt(Array.prototype.forEach), Pm = qt(Array.prototype.lastIndexOf), Eo = qt(Array.prototype.pop), Ir = qt(Array.prototype.push), Nm = qt(Array.prototype.splice), zi = qt(String.prototype.toLowerCase), an = qt(String.prototype.toString), nn = qt(String.prototype.match), Rr = qt(String.prototype.replace), Wm = qt(String.prototype.indexOf), zm = qt(String.prototype.trim), ee = qt(Object.prototype.hasOwnProperty), Pt = qt(RegExp.prototype.test), Pr = qm(TypeError);
function qt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      i[a - 1] = arguments[a];
    return Tn(e, t, i);
  };
}
function qm(e) {
  return function() {
    for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++)
      r[i] = arguments[i];
    return Bn(e, r);
  };
}
function ot(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : zi;
  Ao && Ao(e, null);
  let i = t.length;
  for (; i--; ) {
    let a = t[i];
    if (typeof a == "string") {
      const n = r(a);
      n !== a && (Om(t) || (t[i] = n), a = n);
    }
    e[a] = !0;
  }
  return e;
}
function Hm(e) {
  for (let t = 0; t < e.length; t++)
    ee(e, t) || (e[t] = null);
  return e;
}
function be(e) {
  const t = ec(null);
  for (const [r, i] of tc(e))
    ee(e, r) && (Array.isArray(i) ? t[r] = Hm(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = be(i) : t[r] = i);
  return t;
}
function Nr(e, t) {
  for (; e !== null; ) {
    const i = Rm(e, t);
    if (i) {
      if (i.get)
        return qt(i.get);
      if (typeof i.value == "function")
        return qt(i.value);
    }
    e = Im(e);
  }
  function r() {
    return null;
  }
  return r;
}
const Fo = zt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), sn = zt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), on = zt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ym = zt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ln = zt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Um = zt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), $o = zt(["#text"]), Do = zt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), cn = zt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Oo = zt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ai = zt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), jm = Qt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Gm = Qt(/<%[\w\W]*|[\w\W]*%>/gm), Xm = Qt(/\$\{[\w\W]*/gm), Vm = Qt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Km = Qt(/^aria-[\-\w]+$/), rc = Qt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zm = Qt(/^(?:\w+script|data):/i), Qm = Qt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ic = Qt(/^html$/i), Jm = Qt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Io = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Km,
  ATTR_WHITESPACE: Qm,
  CUSTOM_ELEMENT: Jm,
  DATA_ATTR: Vm,
  DOCTYPE_NAME: ic,
  ERB_EXPR: Gm,
  IS_ALLOWED_URI: rc,
  IS_SCRIPT_OR_DATA: Zm,
  MUSTACHE_EXPR: jm,
  TMPLIT_EXPR: Xm
});
const Wr = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, t0 = function() {
  return typeof window > "u" ? null : window;
}, e0 = function(t, r) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let i = null;
  const a = "data-tt-policy-suffix";
  r && r.hasAttribute(a) && (i = r.getAttribute(a));
  const n = "dompurify" + (i ? "#" + i : "");
  try {
    return t.createPolicy(n, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + n + " could not be created."), null;
  }
}, Ro = function() {
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
function ac() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : t0();
  const t = (Q) => ac(Q);
  if (t.version = "3.2.7", t.removed = [], !e || !e.document || e.document.nodeType !== Wr.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: r
  } = e;
  const i = r, a = i.currentScript, {
    DocumentFragment: n,
    HTMLTemplateElement: o,
    Node: s,
    Element: l,
    NodeFilter: c,
    NamedNodeMap: h = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: u,
    DOMParser: f,
    trustedTypes: d
  } = e, g = l.prototype, m = Nr(g, "cloneNode"), y = Nr(g, "remove"), x = Nr(g, "nextSibling"), b = Nr(g, "childNodes"), _ = Nr(g, "parentNode");
  if (typeof o == "function") {
    const Q = r.createElement("template");
    Q.content && Q.content.ownerDocument && (r = Q.content.ownerDocument);
  }
  let S, w = "";
  const {
    implementation: C,
    createNodeIterator: T,
    createDocumentFragment: D,
    getElementsByTagName: P
  } = r, {
    importNode: I
  } = i;
  let E = Ro();
  t.isSupported = typeof tc == "function" && typeof _ == "function" && C && C.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: W,
    ERB_EXPR: O,
    TMPLIT_EXPR: A,
    DATA_ATTR: L,
    ARIA_ATTR: B,
    IS_SCRIPT_OR_DATA: F,
    ATTR_WHITESPACE: M,
    CUSTOM_ELEMENT: z
  } = Io;
  let {
    IS_ALLOWED_URI: X
  } = Io, H = null;
  const ut = ot({}, [...Fo, ...sn, ...on, ...ln, ...$o]);
  let at = null;
  const dt = ot({}, [...Do, ...cn, ...Oo, ...Ai]);
  let st = Object.seal(ec(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), nt = null, ct = null, xt = !0, pt = !0, gt = !1, Ct = !0, Rt = !1, se = !0, te = !1, Xa = !1, Va = !1, rr = !1, wi = !1, Si = !1, ro = !0, io = !1;
  const Wp = "user-content-";
  let Ka = !0, Dr = !1, ir = {}, ar = null;
  const ao = ot({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let no = null;
  const so = ot({}, ["audio", "video", "img", "source", "image", "track"]);
  let Za = null;
  const oo = ot({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ki = "http://www.w3.org/1998/Math/MathML", Ti = "http://www.w3.org/2000/svg", pe = "http://www.w3.org/1999/xhtml";
  let nr = pe, Qa = !1, Ja = null;
  const zp = ot({}, [ki, Ti, pe], an);
  let Bi = ot({}, ["mi", "mo", "mn", "ms", "mtext"]), Li = ot({}, ["annotation-xml"]);
  const qp = ot({}, ["title", "style", "font", "a", "script"]);
  let Or = null;
  const Hp = ["application/xhtml+xml", "text/html"], Yp = "text/html";
  let Tt = null, sr = null;
  const Up = r.createElement("form"), lo = function(v) {
    return v instanceof RegExp || v instanceof Function;
  }, tn = function() {
    let v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(sr && sr === v)) {
      if ((!v || typeof v != "object") && (v = {}), v = be(v), Or = // eslint-disable-next-line unicorn/prefer-includes
      Hp.indexOf(v.PARSER_MEDIA_TYPE) === -1 ? Yp : v.PARSER_MEDIA_TYPE, Tt = Or === "application/xhtml+xml" ? an : zi, H = ee(v, "ALLOWED_TAGS") ? ot({}, v.ALLOWED_TAGS, Tt) : ut, at = ee(v, "ALLOWED_ATTR") ? ot({}, v.ALLOWED_ATTR, Tt) : dt, Ja = ee(v, "ALLOWED_NAMESPACES") ? ot({}, v.ALLOWED_NAMESPACES, an) : zp, Za = ee(v, "ADD_URI_SAFE_ATTR") ? ot(be(oo), v.ADD_URI_SAFE_ATTR, Tt) : oo, no = ee(v, "ADD_DATA_URI_TAGS") ? ot(be(so), v.ADD_DATA_URI_TAGS, Tt) : so, ar = ee(v, "FORBID_CONTENTS") ? ot({}, v.FORBID_CONTENTS, Tt) : ao, nt = ee(v, "FORBID_TAGS") ? ot({}, v.FORBID_TAGS, Tt) : be({}), ct = ee(v, "FORBID_ATTR") ? ot({}, v.FORBID_ATTR, Tt) : be({}), ir = ee(v, "USE_PROFILES") ? v.USE_PROFILES : !1, xt = v.ALLOW_ARIA_ATTR !== !1, pt = v.ALLOW_DATA_ATTR !== !1, gt = v.ALLOW_UNKNOWN_PROTOCOLS || !1, Ct = v.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Rt = v.SAFE_FOR_TEMPLATES || !1, se = v.SAFE_FOR_XML !== !1, te = v.WHOLE_DOCUMENT || !1, rr = v.RETURN_DOM || !1, wi = v.RETURN_DOM_FRAGMENT || !1, Si = v.RETURN_TRUSTED_TYPE || !1, Va = v.FORCE_BODY || !1, ro = v.SANITIZE_DOM !== !1, io = v.SANITIZE_NAMED_PROPS || !1, Ka = v.KEEP_CONTENT !== !1, Dr = v.IN_PLACE || !1, X = v.ALLOWED_URI_REGEXP || rc, nr = v.NAMESPACE || pe, Bi = v.MATHML_TEXT_INTEGRATION_POINTS || Bi, Li = v.HTML_INTEGRATION_POINTS || Li, st = v.CUSTOM_ELEMENT_HANDLING || {}, v.CUSTOM_ELEMENT_HANDLING && lo(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (st.tagNameCheck = v.CUSTOM_ELEMENT_HANDLING.tagNameCheck), v.CUSTOM_ELEMENT_HANDLING && lo(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (st.attributeNameCheck = v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), v.CUSTOM_ELEMENT_HANDLING && typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (st.allowCustomizedBuiltInElements = v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Rt && (pt = !1), wi && (rr = !0), ir && (H = ot({}, $o), at = [], ir.html === !0 && (ot(H, Fo), ot(at, Do)), ir.svg === !0 && (ot(H, sn), ot(at, cn), ot(at, Ai)), ir.svgFilters === !0 && (ot(H, on), ot(at, cn), ot(at, Ai)), ir.mathMl === !0 && (ot(H, ln), ot(at, Oo), ot(at, Ai))), v.ADD_TAGS && (H === ut && (H = be(H)), ot(H, v.ADD_TAGS, Tt)), v.ADD_ATTR && (at === dt && (at = be(at)), ot(at, v.ADD_ATTR, Tt)), v.ADD_URI_SAFE_ATTR && ot(Za, v.ADD_URI_SAFE_ATTR, Tt), v.FORBID_CONTENTS && (ar === ao && (ar = be(ar)), ot(ar, v.FORBID_CONTENTS, Tt)), Ka && (H["#text"] = !0), te && ot(H, ["html", "head", "body"]), H.table && (ot(H, ["tbody"]), delete nt.tbody), v.TRUSTED_TYPES_POLICY) {
        if (typeof v.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Pr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof v.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Pr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        S = v.TRUSTED_TYPES_POLICY, w = S.createHTML("");
      } else
        S === void 0 && (S = e0(d, a)), S !== null && typeof w == "string" && (w = S.createHTML(""));
      zt && zt(v), sr = v;
    }
  }, co = ot({}, [...sn, ...on, ...Ym]), ho = ot({}, [...ln, ...Um]), jp = function(v) {
    let R = _(v);
    (!R || !R.tagName) && (R = {
      namespaceURI: nr,
      tagName: "template"
    });
    const K = zi(v.tagName), mt = zi(R.tagName);
    return Ja[v.namespaceURI] ? v.namespaceURI === Ti ? R.namespaceURI === pe ? K === "svg" : R.namespaceURI === ki ? K === "svg" && (mt === "annotation-xml" || Bi[mt]) : !!co[K] : v.namespaceURI === ki ? R.namespaceURI === pe ? K === "math" : R.namespaceURI === Ti ? K === "math" && Li[mt] : !!ho[K] : v.namespaceURI === pe ? R.namespaceURI === Ti && !Li[mt] || R.namespaceURI === ki && !Bi[mt] ? !1 : !ho[K] && (qp[K] || !co[K]) : !!(Or === "application/xhtml+xml" && Ja[v.namespaceURI]) : !1;
  }, oe = function(v) {
    Ir(t.removed, {
      element: v
    });
    try {
      _(v).removeChild(v);
    } catch {
      y(v);
    }
  }, Pe = function(v, R) {
    try {
      Ir(t.removed, {
        attribute: R.getAttributeNode(v),
        from: R
      });
    } catch {
      Ir(t.removed, {
        attribute: null,
        from: R
      });
    }
    if (R.removeAttribute(v), v === "is")
      if (rr || wi)
        try {
          oe(R);
        } catch {
        }
      else
        try {
          R.setAttribute(v, "");
        } catch {
        }
  }, uo = function(v) {
    let R = null, K = null;
    if (Va)
      v = "<remove></remove>" + v;
    else {
      const _t = nn(v, /^[\r\n\t ]+/);
      K = _t && _t[0];
    }
    Or === "application/xhtml+xml" && nr === pe && (v = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + v + "</body></html>");
    const mt = S ? S.createHTML(v) : v;
    if (nr === pe)
      try {
        R = new f().parseFromString(mt, Or);
      } catch {
      }
    if (!R || !R.documentElement) {
      R = C.createDocument(nr, "template", null);
      try {
        R.documentElement.innerHTML = Qa ? w : mt;
      } catch {
      }
    }
    const At = R.body || R.documentElement;
    return v && K && At.insertBefore(r.createTextNode(K), At.childNodes[0] || null), nr === pe ? P.call(R, te ? "html" : "body")[0] : te ? R.documentElement : At;
  }, fo = function(v) {
    return T.call(
      v.ownerDocument || v,
      v,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, en = function(v) {
    return v instanceof u && (typeof v.nodeName != "string" || typeof v.textContent != "string" || typeof v.removeChild != "function" || !(v.attributes instanceof h) || typeof v.removeAttribute != "function" || typeof v.setAttribute != "function" || typeof v.namespaceURI != "string" || typeof v.insertBefore != "function" || typeof v.hasChildNodes != "function");
  }, po = function(v) {
    return typeof s == "function" && v instanceof s;
  };
  function ge(Q, v, R) {
    Mi(Q, (K) => {
      K.call(t, v, R, sr);
    });
  }
  const go = function(v) {
    let R = null;
    if (ge(E.beforeSanitizeElements, v, null), en(v))
      return oe(v), !0;
    const K = Tt(v.nodeName);
    if (ge(E.uponSanitizeElement, v, {
      tagName: K,
      allowedTags: H
    }), se && v.hasChildNodes() && !po(v.firstElementChild) && Pt(/<[/\w!]/g, v.innerHTML) && Pt(/<[/\w!]/g, v.textContent) || v.nodeType === Wr.progressingInstruction || se && v.nodeType === Wr.comment && Pt(/<[/\w]/g, v.data))
      return oe(v), !0;
    if (!H[K] || nt[K]) {
      if (!nt[K] && yo(K) && (st.tagNameCheck instanceof RegExp && Pt(st.tagNameCheck, K) || st.tagNameCheck instanceof Function && st.tagNameCheck(K)))
        return !1;
      if (Ka && !ar[K]) {
        const mt = _(v) || v.parentNode, At = b(v) || v.childNodes;
        if (At && mt) {
          const _t = At.length;
          for (let Ht = _t - 1; Ht >= 0; --Ht) {
            const me = m(At[Ht], !0);
            me.__removalCount = (v.__removalCount || 0) + 1, mt.insertBefore(me, x(v));
          }
        }
      }
      return oe(v), !0;
    }
    return v instanceof l && !jp(v) || (K === "noscript" || K === "noembed" || K === "noframes") && Pt(/<\/no(script|embed|frames)/i, v.innerHTML) ? (oe(v), !0) : (Rt && v.nodeType === Wr.text && (R = v.textContent, Mi([W, O, A], (mt) => {
      R = Rr(R, mt, " ");
    }), v.textContent !== R && (Ir(t.removed, {
      element: v.cloneNode()
    }), v.textContent = R)), ge(E.afterSanitizeElements, v, null), !1);
  }, mo = function(v, R, K) {
    if (ro && (R === "id" || R === "name") && (K in r || K in Up))
      return !1;
    if (!(pt && !ct[R] && Pt(L, R))) {
      if (!(xt && Pt(B, R))) {
        if (!at[R] || ct[R]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(yo(v) && (st.tagNameCheck instanceof RegExp && Pt(st.tagNameCheck, v) || st.tagNameCheck instanceof Function && st.tagNameCheck(v)) && (st.attributeNameCheck instanceof RegExp && Pt(st.attributeNameCheck, R) || st.attributeNameCheck instanceof Function && st.attributeNameCheck(R, v)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            R === "is" && st.allowCustomizedBuiltInElements && (st.tagNameCheck instanceof RegExp && Pt(st.tagNameCheck, K) || st.tagNameCheck instanceof Function && st.tagNameCheck(K)))
          ) return !1;
        } else if (!Za[R]) {
          if (!Pt(X, Rr(K, M, ""))) {
            if (!((R === "src" || R === "xlink:href" || R === "href") && v !== "script" && Wm(K, "data:") === 0 && no[v])) {
              if (!(gt && !Pt(F, Rr(K, M, "")))) {
                if (K)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, yo = function(v) {
    return v !== "annotation-xml" && nn(v, z);
  }, xo = function(v) {
    ge(E.beforeSanitizeAttributes, v, null);
    const {
      attributes: R
    } = v;
    if (!R || en(v))
      return;
    const K = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: at,
      forceKeepAttr: void 0
    };
    let mt = R.length;
    for (; mt--; ) {
      const At = R[mt], {
        name: _t,
        namespaceURI: Ht,
        value: me
      } = At, or = Tt(_t), rn = me;
      let Bt = _t === "value" ? rn : zm(rn);
      if (K.attrName = or, K.attrValue = Bt, K.keepAttr = !0, K.forceKeepAttr = void 0, ge(E.uponSanitizeAttribute, v, K), Bt = K.attrValue, io && (or === "id" || or === "name") && (Pe(_t, v), Bt = Wp + Bt), se && Pt(/((--!?|])>)|<\/(style|title|textarea)/i, Bt)) {
        Pe(_t, v);
        continue;
      }
      if (or === "attributename" && nn(Bt, "href")) {
        Pe(_t, v);
        continue;
      }
      if (K.forceKeepAttr)
        continue;
      if (!K.keepAttr) {
        Pe(_t, v);
        continue;
      }
      if (!Ct && Pt(/\/>/i, Bt)) {
        Pe(_t, v);
        continue;
      }
      Rt && Mi([W, O, A], (Co) => {
        Bt = Rr(Bt, Co, " ");
      });
      const bo = Tt(v.nodeName);
      if (!mo(bo, or, Bt)) {
        Pe(_t, v);
        continue;
      }
      if (S && typeof d == "object" && typeof d.getAttributeType == "function" && !Ht)
        switch (d.getAttributeType(bo, or)) {
          case "TrustedHTML": {
            Bt = S.createHTML(Bt);
            break;
          }
          case "TrustedScriptURL": {
            Bt = S.createScriptURL(Bt);
            break;
          }
        }
      if (Bt !== rn)
        try {
          Ht ? v.setAttributeNS(Ht, _t, Bt) : v.setAttribute(_t, Bt), en(v) ? oe(v) : Eo(t.removed);
        } catch {
          Pe(_t, v);
        }
    }
    ge(E.afterSanitizeAttributes, v, null);
  }, Gp = function Q(v) {
    let R = null;
    const K = fo(v);
    for (ge(E.beforeSanitizeShadowDOM, v, null); R = K.nextNode(); )
      ge(E.uponSanitizeShadowNode, R, null), go(R), xo(R), R.content instanceof n && Q(R.content);
    ge(E.afterSanitizeShadowDOM, v, null);
  };
  return t.sanitize = function(Q) {
    let v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, R = null, K = null, mt = null, At = null;
    if (Qa = !Q, Qa && (Q = "<!-->"), typeof Q != "string" && !po(Q))
      if (typeof Q.toString == "function") {
        if (Q = Q.toString(), typeof Q != "string")
          throw Pr("dirty is not a string, aborting");
      } else
        throw Pr("toString is not a function");
    if (!t.isSupported)
      return Q;
    if (Xa || tn(v), t.removed = [], typeof Q == "string" && (Dr = !1), Dr) {
      if (Q.nodeName) {
        const me = Tt(Q.nodeName);
        if (!H[me] || nt[me])
          throw Pr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (Q instanceof s)
      R = uo("<!---->"), K = R.ownerDocument.importNode(Q, !0), K.nodeType === Wr.element && K.nodeName === "BODY" || K.nodeName === "HTML" ? R = K : R.appendChild(K);
    else {
      if (!rr && !Rt && !te && // eslint-disable-next-line unicorn/prefer-includes
      Q.indexOf("<") === -1)
        return S && Si ? S.createHTML(Q) : Q;
      if (R = uo(Q), !R)
        return rr ? null : Si ? w : "";
    }
    R && Va && oe(R.firstChild);
    const _t = fo(Dr ? Q : R);
    for (; mt = _t.nextNode(); )
      go(mt), xo(mt), mt.content instanceof n && Gp(mt.content);
    if (Dr)
      return Q;
    if (rr) {
      if (wi)
        for (At = D.call(R.ownerDocument); R.firstChild; )
          At.appendChild(R.firstChild);
      else
        At = R;
      return (at.shadowroot || at.shadowrootmode) && (At = I.call(i, At, !0)), At;
    }
    let Ht = te ? R.outerHTML : R.innerHTML;
    return te && H["!doctype"] && R.ownerDocument && R.ownerDocument.doctype && R.ownerDocument.doctype.name && Pt(ic, R.ownerDocument.doctype.name) && (Ht = "<!DOCTYPE " + R.ownerDocument.doctype.name + `>
` + Ht), Rt && Mi([W, O, A], (me) => {
      Ht = Rr(Ht, me, " ");
    }), S && Si ? S.createHTML(Ht) : Ht;
  }, t.setConfig = function() {
    let Q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    tn(Q), Xa = !0;
  }, t.clearConfig = function() {
    sr = null, Xa = !1;
  }, t.isValidAttribute = function(Q, v, R) {
    sr || tn({});
    const K = Tt(Q), mt = Tt(v);
    return mo(K, mt, R);
  }, t.addHook = function(Q, v) {
    typeof v == "function" && Ir(E[Q], v);
  }, t.removeHook = function(Q, v) {
    if (v !== void 0) {
      const R = Pm(E[Q], v);
      return R === -1 ? void 0 : Nm(E[Q], R, 1)[0];
    }
    return Eo(E[Q]);
  }, t.removeHooks = function(Q) {
    E[Q] = [];
  }, t.removeAllHooks = function() {
    E = Ro();
  }, t;
}
var wr = ac(), nc = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s, ei = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, r0 = /\s*%%.*\n/gm, gr, sc = (gr = class extends Error {
  constructor(t) {
    super(t), this.name = "UnknownDiagramError";
  }
}, p(gr, "UnknownDiagramError"), gr), Ke = {}, ms = /* @__PURE__ */ p(function(e, t) {
  e = e.replace(nc, "").replace(ei, "").replace(r0, `
`);
  for (const [r, { detector: i }] of Object.entries(Ke))
    if (i(e, t))
      return r;
  throw new sc(
    `No diagram type detected matching given configuration for text: ${e}`
  );
}, "detectType"), Ln = /* @__PURE__ */ p((...e) => {
  for (const { id: t, detector: r, loader: i } of e)
    oc(t, r, i);
}, "registerLazyLoadedDiagrams"), oc = /* @__PURE__ */ p((e, t, r) => {
  Ke[e] && $.warn(`Detector with key ${e} already exists. Overwriting.`), Ke[e] = { detector: t, loader: r }, $.debug(`Detector with key ${e} added${r ? " with loader" : ""}`);
}, "addDetector"), i0 = /* @__PURE__ */ p((e) => Ke[e].loader, "getDiagramLoader"), Mn = /* @__PURE__ */ p((e, t, { depth: r = 2, clobber: i = !1 } = {}) => {
  const a = { depth: r, clobber: i };
  return Array.isArray(t) && !Array.isArray(e) ? (t.forEach((n) => Mn(e, n, a)), e) : Array.isArray(t) && Array.isArray(e) ? (t.forEach((n) => {
    e.includes(n) || e.push(n);
  }), e) : e === void 0 || r <= 0 ? e != null && typeof e == "object" && typeof t == "object" ? Object.assign(e, t) : t : (t !== void 0 && typeof e == "object" && typeof t == "object" && Object.keys(t).forEach((n) => {
    typeof t[n] == "object" && (e[n] === void 0 || typeof e[n] == "object") ? (e[n] === void 0 && (e[n] = Array.isArray(t[n]) ? [] : {}), e[n] = Mn(e[n], t[n], { depth: r - 1, clobber: i })) : (i || typeof e[n] != "object" && typeof t[n] != "object") && (e[n] = t[n]);
  }), e);
}, "assignWithDepth"), wt = Mn, Ea = "#ffffff", Fa = "#f2f2f2", Nt = /* @__PURE__ */ p((e, t) => t ? k(e, { s: -40, l: 10 }) : k(e, { s: -40, l: -10 }), "mkBorder"), mr, a0 = (mr = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    var r, i, a, n, o, s, l, c, h, u, f, d, g, m, y, x, b, _, S, w, C;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || k(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || k(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Nt(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Nt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Nt(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Nt(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || N(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || N(this.tertiaryColor), this.lineColor = this.lineColor || N(this.background), this.arrowheadColor = this.arrowheadColor || N(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? J(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || J(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || N(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || Y(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.vertLineColor = this.vertLineColor || "navy", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.darkMode ? (this.rowOdd = this.rowOdd || J(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || J(this.mainBkg, 10)) : (this.rowOdd = this.rowOdd || Y(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || Y(this.mainBkg, 5)), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || k(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || k(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || k(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || k(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || k(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || k(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || k(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || k(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || k(this.primaryColor, { h: 330 }), this.darkMode)
      for (let T = 0; T < this.THEME_COLOR_LIMIT; T++)
        this["cScale" + T] = J(this["cScale" + T], 75);
    else
      for (let T = 0; T < this.THEME_COLOR_LIMIT; T++)
        this["cScale" + T] = J(this["cScale" + T], 25);
    for (let T = 0; T < this.THEME_COLOR_LIMIT; T++)
      this["cScaleInv" + T] = this["cScaleInv" + T] || N(this["cScale" + T]);
    for (let T = 0; T < this.THEME_COLOR_LIMIT; T++)
      this.darkMode ? this["cScalePeer" + T] = this["cScalePeer" + T] || Y(this["cScale" + T], 10) : this["cScalePeer" + T] = this["cScalePeer" + T] || J(this["cScale" + T], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let T = 0; T < this.THEME_COLOR_LIMIT; T++)
      this["cScaleLabel" + T] = this["cScaleLabel" + T] || this.scaleLabelColor;
    const t = this.darkMode ? -4 : -1;
    for (let T = 0; T < 5; T++)
      this["surface" + T] = this["surface" + T] || k(this.mainBkg, { h: 180, s: -15, l: t * (5 + T * 3) }), this["surfacePeer" + T] = this["surfacePeer" + T] || k(this.mainBkg, { h: 180, s: -15, l: t * (8 + T * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || k(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || k(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || k(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || k(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || k(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || k(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || k(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || k(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || k(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || k(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || k(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || k(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || k(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || k(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || k(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.radar = {
      axisColor: ((r = this.radar) == null ? void 0 : r.axisColor) || this.lineColor,
      axisStrokeWidth: ((i = this.radar) == null ? void 0 : i.axisStrokeWidth) || 2,
      axisLabelFontSize: ((a = this.radar) == null ? void 0 : a.axisLabelFontSize) || 12,
      curveOpacity: ((n = this.radar) == null ? void 0 : n.curveOpacity) || 0.5,
      curveStrokeWidth: ((o = this.radar) == null ? void 0 : o.curveStrokeWidth) || 2,
      graticuleColor: ((s = this.radar) == null ? void 0 : s.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((l = this.radar) == null ? void 0 : l.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((c = this.radar) == null ? void 0 : c.graticuleOpacity) || 0.3,
      legendBoxSize: ((h = this.radar) == null ? void 0 : h.legendBoxSize) || 12,
      legendFontSize: ((u = this.radar) == null ? void 0 : u.legendFontSize) || 12
    }, this.archEdgeColor = this.archEdgeColor || "#777", this.archEdgeArrowColor = this.archEdgeArrowColor || "#777", this.archEdgeWidth = this.archEdgeWidth || "3", this.archGroupBorderColor = this.archGroupBorderColor || "#000", this.archGroupBorderWidth = this.archGroupBorderWidth || "2px", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || k(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || k(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || k(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || k(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || k(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || k(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? Y(this.quadrant1Fill) : J(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((f = this.xyChart) == null ? void 0 : f.backgroundColor) || this.background,
      titleColor: ((d = this.xyChart) == null ? void 0 : d.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((g = this.xyChart) == null ? void 0 : g.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((m = this.xyChart) == null ? void 0 : m.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((y = this.xyChart) == null ? void 0 : y.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((x = this.xyChart) == null ? void 0 : x.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((b = this.xyChart) == null ? void 0 : b.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((_ = this.xyChart) == null ? void 0 : _.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((S = this.xyChart) == null ? void 0 : S.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((w = this.xyChart) == null ? void 0 : w.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((C = this.xyChart) == null ? void 0 : C.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? J(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || k(this.primaryColor, { h: -30 }), this.git4 = this.git4 || k(this.primaryColor, { h: -60 }), this.git5 = this.git5 || k(this.primaryColor, { h: -90 }), this.git6 = this.git6 || k(this.primaryColor, { h: 60 }), this.git7 = this.git7 || k(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)) : (this.git0 = J(this.git0, 25), this.git1 = J(this.git1, 25), this.git2 = J(this.git2, 25), this.git3 = J(this.git3, 25), this.git4 = J(this.git4, 25), this.git5 = J(this.git5, 25), this.git6 = J(this.git6, 25), this.git7 = J(this.git7, 25)), this.gitInv0 = this.gitInv0 || N(this.git0), this.gitInv1 = this.gitInv1 || N(this.git1), this.gitInv2 = this.gitInv2 || N(this.git2), this.gitInv3 = this.gitInv3 || N(this.git3), this.gitInv4 = this.gitInv4 || N(this.git4), this.gitInv5 = this.gitInv5 || N(this.git5), this.gitInv6 = this.gitInv6 || N(this.git6), this.gitInv7 = this.gitInv7 || N(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ea, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Fa;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    const r = Object.keys(t);
    r.forEach((i) => {
      this[i] = t[i];
    }), this.updateColors(), r.forEach((i) => {
      this[i] = t[i];
    });
  }
}, p(mr, "Theme"), mr), n0 = /* @__PURE__ */ p((e) => {
  const t = new a0();
  return t.calculate(e), t;
}, "getThemeVariables"), yr, s0 = (yr = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = Y(this.primaryColor, 16), this.tertiaryColor = k(this.primaryColor, { h: -160 }), this.primaryBorderColor = N(this.background), this.secondaryBorderColor = Nt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Nt(this.tertiaryColor, this.darkMode), this.primaryTextColor = N(this.primaryColor), this.secondaryTextColor = N(this.secondaryColor), this.tertiaryTextColor = N(this.tertiaryColor), this.lineColor = N(this.background), this.textColor = N(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = Y(N("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#ccc", this.border2 = ti(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = J("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = J(this.sectionBkgColor, 10), this.taskBorderColor = ti(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = ti(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = this.rowOdd || Y(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || J(this.mainBkg, 10), this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    var t, r, i, a, n, o, s, l, c, h, u, f, d, g, m, y, x, b, _, S, w;
    this.secondBkg = Y(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = Y(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.actorBorder, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = Y(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = k(this.primaryColor, { h: 64 }), this.fillType3 = k(this.secondaryColor, { h: 64 }), this.fillType4 = k(this.primaryColor, { h: -64 }), this.fillType5 = k(this.secondaryColor, { h: -64 }), this.fillType6 = k(this.primaryColor, { h: 128 }), this.fillType7 = k(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || k(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || k(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || k(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || k(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || k(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || k(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || k(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || k(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || k(this.primaryColor, { h: 330 });
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleInv" + C] = this["cScaleInv" + C] || N(this["cScale" + C]);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScalePeer" + C] = this["cScalePeer" + C] || Y(this["cScale" + C], 10);
    for (let C = 0; C < 5; C++)
      this["surface" + C] = this["surface" + C] || k(this.mainBkg, { h: 30, s: -30, l: -(-10 + C * 4) }), this["surfacePeer" + C] = this["surfacePeer" + C] || k(this.mainBkg, { h: 30, s: -30, l: -(-7 + C * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleLabel" + C] = this["cScaleLabel" + C] || this.scaleLabelColor;
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["pie" + C] = this["cScale" + C];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || k(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || k(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || k(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || k(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || k(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || k(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? Y(this.quadrant1Fill) : J(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((t = this.xyChart) == null ? void 0 : t.backgroundColor) || this.background,
      titleColor: ((r = this.xyChart) == null ? void 0 : r.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((a = this.xyChart) == null ? void 0 : a.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((o = this.xyChart) == null ? void 0 : o.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((s = this.xyChart) == null ? void 0 : s.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((c = this.xyChart) == null ? void 0 : c.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((h = this.xyChart) == null ? void 0 : h.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((u = this.xyChart) == null ? void 0 : u.plotColorPalette) || "#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22"
    }, this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.background
    }, this.radar = {
      axisColor: ((f = this.radar) == null ? void 0 : f.axisColor) || this.lineColor,
      axisStrokeWidth: ((d = this.radar) == null ? void 0 : d.axisStrokeWidth) || 2,
      axisLabelFontSize: ((g = this.radar) == null ? void 0 : g.axisLabelFontSize) || 12,
      curveOpacity: ((m = this.radar) == null ? void 0 : m.curveOpacity) || 0.5,
      curveStrokeWidth: ((y = this.radar) == null ? void 0 : y.curveStrokeWidth) || 2,
      graticuleColor: ((x = this.radar) == null ? void 0 : x.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((b = this.radar) == null ? void 0 : b.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_ = this.radar) == null ? void 0 : _.graticuleOpacity) || 0.3,
      legendBoxSize: ((S = this.radar) == null ? void 0 : S.legendBoxSize) || 12,
      legendFontSize: ((w = this.radar) == null ? void 0 : w.legendFontSize) || 12
    }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? J(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = Y(this.secondaryColor, 20), this.git1 = Y(this.pie2 || this.secondaryColor, 20), this.git2 = Y(this.pie3 || this.tertiaryColor, 20), this.git3 = Y(this.pie4 || k(this.primaryColor, { h: -30 }), 20), this.git4 = Y(this.pie5 || k(this.primaryColor, { h: -60 }), 20), this.git5 = Y(this.pie6 || k(this.primaryColor, { h: -90 }), 10), this.git6 = Y(this.pie7 || k(this.primaryColor, { h: 60 }), 10), this.git7 = Y(this.pie8 || k(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || N(this.git0), this.gitInv1 = this.gitInv1 || N(this.git1), this.gitInv2 = this.gitInv2 || N(this.git2), this.gitInv3 = this.gitInv3 || N(this.git3), this.gitInv4 = this.gitInv4 || N(this.git4), this.gitInv5 = this.gitInv5 || N(this.git5), this.gitInv6 = this.gitInv6 || N(this.git6), this.gitInv7 = this.gitInv7 || N(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || N(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || N(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Y(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Y(this.background, 2), this.nodeBorder = this.nodeBorder || "#999";
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    const r = Object.keys(t);
    r.forEach((i) => {
      this[i] = t[i];
    }), this.updateColors(), r.forEach((i) => {
      this[i] = t[i];
    });
  }
}, p(yr, "Theme"), yr), o0 = /* @__PURE__ */ p((e) => {
  const t = new s0();
  return t.calculate(e), t;
}, "getThemeVariables"), xr, l0 = (xr = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = k(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = k(this.primaryColor, { h: -160 }), this.primaryBorderColor = Nt(this.primaryColor, this.darkMode), this.secondaryBorderColor = Nt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Nt(this.tertiaryColor, this.darkMode), this.primaryTextColor = N(this.primaryColor), this.secondaryTextColor = N(this.secondaryColor), this.tertiaryTextColor = N(this.tertiaryColor), this.lineColor = N(this.background), this.textColor = N(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "rgba(232,232,232, 0.8)", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.sectionBkgColor = ti(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "navy", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = "calculated", this.rowEven = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    var t, r, i, a, n, o, s, l, c, h, u, f, d, g, m, y, x, b, _, S, w;
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || k(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || k(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || k(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || k(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || k(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || k(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || k(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || k(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || k(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || J(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || J(this.tertiaryColor, 40);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScale" + C] = J(this["cScale" + C], 10), this["cScalePeer" + C] = this["cScalePeer" + C] || J(this["cScale" + C], 25);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleInv" + C] = this["cScaleInv" + C] || k(this["cScale" + C], { h: 180 });
    for (let C = 0; C < 5; C++)
      this["surface" + C] = this["surface" + C] || k(this.mainBkg, { h: 30, l: -(5 + C * 5) }), this["surfacePeer" + C] = this["surfacePeer" + C] || k(this.mainBkg, { h: 30, l: -(7 + C * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || N(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || N(this.labelTextColor);
      for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
        this["cScaleLabel" + C] = this["cScaleLabel" + C] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = Y(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || Y(this.primaryColor, 75) || "#ffffff", this.rowEven = this.rowEven || Y(this.primaryColor, 1), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = k(this.primaryColor, { h: 64 }), this.fillType3 = k(this.secondaryColor, { h: 64 }), this.fillType4 = k(this.primaryColor, { h: -64 }), this.fillType5 = k(this.secondaryColor, { h: -64 }), this.fillType6 = k(this.primaryColor, { h: 128 }), this.fillType7 = k(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || k(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || k(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || k(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || k(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || k(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || k(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || k(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || k(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || k(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || k(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || k(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || k(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || k(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || k(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || k(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || k(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? Y(this.quadrant1Fill) : J(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.radar = {
      axisColor: ((t = this.radar) == null ? void 0 : t.axisColor) || this.lineColor,
      axisStrokeWidth: ((r = this.radar) == null ? void 0 : r.axisStrokeWidth) || 2,
      axisLabelFontSize: ((i = this.radar) == null ? void 0 : i.axisLabelFontSize) || 12,
      curveOpacity: ((a = this.radar) == null ? void 0 : a.curveOpacity) || 0.5,
      curveStrokeWidth: ((n = this.radar) == null ? void 0 : n.curveStrokeWidth) || 2,
      graticuleColor: ((o = this.radar) == null ? void 0 : o.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((s = this.radar) == null ? void 0 : s.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((l = this.radar) == null ? void 0 : l.graticuleOpacity) || 0.3,
      legendBoxSize: ((c = this.radar) == null ? void 0 : c.legendBoxSize) || 12,
      legendFontSize: ((h = this.radar) == null ? void 0 : h.legendFontSize) || 12
    }, this.xyChart = {
      backgroundColor: ((u = this.xyChart) == null ? void 0 : u.backgroundColor) || this.background,
      titleColor: ((f = this.xyChart) == null ? void 0 : f.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((d = this.xyChart) == null ? void 0 : d.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((g = this.xyChart) == null ? void 0 : g.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((m = this.xyChart) == null ? void 0 : m.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((y = this.xyChart) == null ? void 0 : y.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((x = this.xyChart) == null ? void 0 : x.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((b = this.xyChart) == null ? void 0 : b.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_ = this.xyChart) == null ? void 0 : _.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((S = this.xyChart) == null ? void 0 : S.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((w = this.xyChart) == null ? void 0 : w.plotColorPalette) || "#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || k(this.primaryColor, { h: -30 }), this.git4 = this.git4 || k(this.primaryColor, { h: -60 }), this.git5 = this.git5 || k(this.primaryColor, { h: -90 }), this.git6 = this.git6 || k(this.primaryColor, { h: 60 }), this.git7 = this.git7 || k(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)) : (this.git0 = J(this.git0, 25), this.git1 = J(this.git1, 25), this.git2 = J(this.git2, 25), this.git3 = J(this.git3, 25), this.git4 = J(this.git4, 25), this.git5 = J(this.git5, 25), this.git6 = J(this.git6, 25), this.git7 = J(this.git7, 25)), this.gitInv0 = this.gitInv0 || J(N(this.git0), 25), this.gitInv1 = this.gitInv1 || N(this.git1), this.gitInv2 = this.gitInv2 || N(this.git2), this.gitInv3 = this.gitInv3 || N(this.git3), this.gitInv4 = this.gitInv4 || N(this.git4), this.gitInv5 = this.gitInv5 || N(this.git5), this.gitInv6 = this.gitInv6 || N(this.git6), this.gitInv7 = this.gitInv7 || N(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || N(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || N(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ea, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Fa;
  }
  calculate(t) {
    if (Object.keys(this).forEach((i) => {
      this[i] === "calculated" && (this[i] = void 0);
    }), typeof t != "object") {
      this.updateColors();
      return;
    }
    const r = Object.keys(t);
    r.forEach((i) => {
      this[i] = t[i];
    }), this.updateColors(), r.forEach((i) => {
      this[i] = t[i];
    });
  }
}, p(xr, "Theme"), xr), c0 = /* @__PURE__ */ p((e) => {
  const t = new l0();
  return t.calculate(e), t;
}, "getThemeVariables"), br, h0 = (br = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = Y("#cde498", 10), this.primaryBorderColor = Nt(this.primaryColor, this.darkMode), this.secondaryBorderColor = Nt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Nt(this.tertiaryColor, this.darkMode), this.primaryTextColor = N(this.primaryColor), this.secondaryTextColor = N(this.secondaryColor), this.tertiaryTextColor = N(this.primaryColor), this.lineColor = N(this.background), this.textColor = N(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var t, r, i, a, n, o, s, l, c, h, u, f, d, g, m, y, x, b, _, S, w;
    this.actorBorder = J(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || k(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || k(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || k(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || k(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || k(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || k(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || k(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || k(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || k(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || J(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || J(this.tertiaryColor, 40);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScale" + C] = J(this["cScale" + C], 10), this["cScalePeer" + C] = this["cScalePeer" + C] || J(this["cScale" + C], 25);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleInv" + C] = this["cScaleInv" + C] || k(this["cScale" + C], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleLabel" + C] = this["cScaleLabel" + C] || this.scaleLabelColor;
    for (let C = 0; C < 5; C++)
      this["surface" + C] = this["surface" + C] || k(this.mainBkg, { h: 30, s: -30, l: -(5 + C * 5) }), this["surfacePeer" + C] = this["surfacePeer" + C] || k(this.mainBkg, { h: 30, s: -30, l: -(8 + C * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || Y(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || Y(this.mainBkg, 20), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = k(this.primaryColor, { h: 64 }), this.fillType3 = k(this.secondaryColor, { h: 64 }), this.fillType4 = k(this.primaryColor, { h: -64 }), this.fillType5 = k(this.secondaryColor, { h: -64 }), this.fillType6 = k(this.primaryColor, { h: 128 }), this.fillType7 = k(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || k(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || k(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || k(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || k(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || k(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || k(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || k(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || k(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || k(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || k(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || k(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || k(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || k(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || k(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || k(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? Y(this.quadrant1Fill) : J(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.mainBkg
    }, this.radar = {
      axisColor: ((t = this.radar) == null ? void 0 : t.axisColor) || this.lineColor,
      axisStrokeWidth: ((r = this.radar) == null ? void 0 : r.axisStrokeWidth) || 2,
      axisLabelFontSize: ((i = this.radar) == null ? void 0 : i.axisLabelFontSize) || 12,
      curveOpacity: ((a = this.radar) == null ? void 0 : a.curveOpacity) || 0.5,
      curveStrokeWidth: ((n = this.radar) == null ? void 0 : n.curveStrokeWidth) || 2,
      graticuleColor: ((o = this.radar) == null ? void 0 : o.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((s = this.radar) == null ? void 0 : s.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((l = this.radar) == null ? void 0 : l.graticuleOpacity) || 0.3,
      legendBoxSize: ((c = this.radar) == null ? void 0 : c.legendBoxSize) || 12,
      legendFontSize: ((h = this.radar) == null ? void 0 : h.legendFontSize) || 12
    }, this.xyChart = {
      backgroundColor: ((u = this.xyChart) == null ? void 0 : u.backgroundColor) || this.background,
      titleColor: ((f = this.xyChart) == null ? void 0 : f.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((d = this.xyChart) == null ? void 0 : d.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((g = this.xyChart) == null ? void 0 : g.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((m = this.xyChart) == null ? void 0 : m.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((y = this.xyChart) == null ? void 0 : y.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((x = this.xyChart) == null ? void 0 : x.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((b = this.xyChart) == null ? void 0 : b.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((_ = this.xyChart) == null ? void 0 : _.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((S = this.xyChart) == null ? void 0 : S.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((w = this.xyChart) == null ? void 0 : w.plotColorPalette) || "#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || k(this.primaryColor, { h: -30 }), this.git4 = this.git4 || k(this.primaryColor, { h: -60 }), this.git5 = this.git5 || k(this.primaryColor, { h: -90 }), this.git6 = this.git6 || k(this.primaryColor, { h: 60 }), this.git7 = this.git7 || k(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)) : (this.git0 = J(this.git0, 25), this.git1 = J(this.git1, 25), this.git2 = J(this.git2, 25), this.git3 = J(this.git3, 25), this.git4 = J(this.git4, 25), this.git5 = J(this.git5, 25), this.git6 = J(this.git6, 25), this.git7 = J(this.git7, 25)), this.gitInv0 = this.gitInv0 || N(this.git0), this.gitInv1 = this.gitInv1 || N(this.git1), this.gitInv2 = this.gitInv2 || N(this.git2), this.gitInv3 = this.gitInv3 || N(this.git3), this.gitInv4 = this.gitInv4 || N(this.git4), this.gitInv5 = this.gitInv5 || N(this.git5), this.gitInv6 = this.gitInv6 || N(this.git6), this.gitInv7 = this.gitInv7 || N(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || N(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || N(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ea, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Fa;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    const r = Object.keys(t);
    r.forEach((i) => {
      this[i] = t[i];
    }), this.updateColors(), r.forEach((i) => {
      this[i] = t[i];
    });
  }
}, p(br, "Theme"), br), u0 = /* @__PURE__ */ p((e) => {
  const t = new h0();
  return t.calculate(e), t;
}, "getThemeVariables"), Cr, f0 = (Cr = class {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = Y(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = k(this.primaryColor, { h: -160 }), this.primaryBorderColor = Nt(this.primaryColor, this.darkMode), this.secondaryBorderColor = Nt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Nt(this.tertiaryColor, this.darkMode), this.primaryTextColor = N(this.primaryColor), this.secondaryTextColor = N(this.secondaryColor), this.tertiaryTextColor = N(this.tertiaryColor), this.lineColor = N(this.background), this.textColor = N(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = this.actorBorder, this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = this.rowOdd || Y(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || "#f4f4f4", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var t, r, i, a, n, o, s, l, c, h, u, f, d, g, m, y, x, b, _, S, w;
    this.secondBkg = Y(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = Y(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.actorBorder, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleInv" + C] = this["cScaleInv" + C] || N(this["cScale" + C]);
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this.darkMode ? this["cScalePeer" + C] = this["cScalePeer" + C] || Y(this["cScale" + C], 10) : this["cScalePeer" + C] = this["cScalePeer" + C] || J(this["cScale" + C], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["cScaleLabel" + C] = this["cScaleLabel" + C] || this.scaleLabelColor;
    for (let C = 0; C < 5; C++)
      this["surface" + C] = this["surface" + C] || k(this.mainBkg, { l: -(5 + C * 5) }), this["surfacePeer" + C] = this["surfacePeer" + C] || k(this.mainBkg, { l: -(8 + C * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = Y(this.contrast, 30), this.sectionBkgColor2 = Y(this.contrast, 30), this.taskBorderColor = J(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = Y(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = J(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.vertLineColor = this.critBkgColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = k(this.primaryColor, { h: 64 }), this.fillType3 = k(this.secondaryColor, { h: 64 }), this.fillType4 = k(this.primaryColor, { h: -64 }), this.fillType5 = k(this.secondaryColor, { h: -64 }), this.fillType6 = k(this.primaryColor, { h: 128 }), this.fillType7 = k(this.secondaryColor, { h: 128 });
    for (let C = 0; C < this.THEME_COLOR_LIMIT; C++)
      this["pie" + C] = this["cScale" + C];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || k(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || k(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || k(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || k(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || k(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || k(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? Y(this.quadrant1Fill) : J(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((t = this.xyChart) == null ? void 0 : t.backgroundColor) || this.background,
      titleColor: ((r = this.xyChart) == null ? void 0 : r.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((a = this.xyChart) == null ? void 0 : a.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((o = this.xyChart) == null ? void 0 : o.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((s = this.xyChart) == null ? void 0 : s.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((c = this.xyChart) == null ? void 0 : c.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((h = this.xyChart) == null ? void 0 : h.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((u = this.xyChart) == null ? void 0 : u.plotColorPalette) || "#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0"
    }, this.radar = {
      axisColor: ((f = this.radar) == null ? void 0 : f.axisColor) || this.lineColor,
      axisStrokeWidth: ((d = this.radar) == null ? void 0 : d.axisStrokeWidth) || 2,
      axisLabelFontSize: ((g = this.radar) == null ? void 0 : g.axisLabelFontSize) || 12,
      curveOpacity: ((m = this.radar) == null ? void 0 : m.curveOpacity) || 0.5,
      curveStrokeWidth: ((y = this.radar) == null ? void 0 : y.curveStrokeWidth) || 2,
      graticuleColor: ((x = this.radar) == null ? void 0 : x.graticuleColor) || "#DEDEDE",
      graticuleStrokeWidth: ((b = this.radar) == null ? void 0 : b.graticuleStrokeWidth) || 1,
      graticuleOpacity: ((_ = this.radar) == null ? void 0 : _.graticuleOpacity) || 0.3,
      legendBoxSize: ((S = this.radar) == null ? void 0 : S.legendBoxSize) || 12,
      legendFontSize: ((w = this.radar) == null ? void 0 : w.legendFontSize) || 12
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = J(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || k(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || k(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || k(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || k(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || k(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || N(this.git0), this.gitInv1 = this.gitInv1 || N(this.git1), this.gitInv2 = this.gitInv2 || N(this.git2), this.gitInv3 = this.gitInv3 || N(this.git3), this.gitInv4 = this.gitInv4 || N(this.git4), this.gitInv5 = this.gitInv5 || N(this.git5), this.gitInv6 = this.gitInv6 || N(this.git6), this.gitInv7 = this.gitInv7 || N(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ea, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Fa;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    const r = Object.keys(t);
    r.forEach((i) => {
      this[i] = t[i];
    }), this.updateColors(), r.forEach((i) => {
      this[i] = t[i];
    });
  }
}, p(Cr, "Theme"), Cr), d0 = /* @__PURE__ */ p((e) => {
  const t = new f0();
  return t.calculate(e), t;
}, "getThemeVariables"), ve = {
  base: {
    getThemeVariables: n0
  },
  dark: {
    getThemeVariables: o0
  },
  default: {
    getThemeVariables: c0
  },
  forest: {
    getThemeVariables: u0
  },
  neutral: {
    getThemeVariables: d0
  }
}, le = {
  flowchart: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    subGraphTitleMargin: {
      top: 0,
      bottom: 0
    },
    diagramPadding: 8,
    htmlLabels: !0,
    nodeSpacing: 50,
    rankSpacing: 50,
    curve: "basis",
    padding: 15,
    defaultRenderer: "dagre-wrapper",
    wrappingWidth: 200,
    inheritDir: !1
  },
  sequence: {
    useMaxWidth: !0,
    hideUnusedParticipants: !1,
    activationWidth: 10,
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    mirrorActors: !0,
    forceMenus: !1,
    bottomMarginAdj: 1,
    rightAngles: !1,
    showSequenceNumbers: !1,
    actorFontSize: 14,
    actorFontFamily: '"Open Sans", sans-serif',
    actorFontWeight: 400,
    noteFontSize: 14,
    noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    noteFontWeight: 400,
    noteAlign: "center",
    messageFontSize: 16,
    messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    messageFontWeight: 400,
    wrap: !1,
    wrapPadding: 10,
    labelBoxWidth: 50,
    labelBoxHeight: 20
  },
  gantt: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    rightPadding: 75,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    sectionFontSize: 11,
    numberSectionStyles: 4,
    axisFormat: "%Y-%m-%d",
    topAxis: !1,
    displayMode: "",
    weekday: "sunday"
  },
  journey: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    maxLabelWidth: 360,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ],
    titleColor: "",
    titleFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    titleFontSize: "4ex"
  },
  class: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    arrowMarkerAbsolute: !1,
    dividerMargin: 10,
    padding: 5,
    textHeight: 10,
    defaultRenderer: "dagre-wrapper",
    htmlLabels: !1,
    hideEmptyMembersBox: !1
  },
  state: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    dividerMargin: 10,
    sizeUnit: 5,
    padding: 8,
    textHeight: 10,
    titleShift: -15,
    noteMargin: 10,
    forkWidth: 70,
    forkHeight: 7,
    miniPadding: 2,
    fontSizeFactor: 5.02,
    fontSize: 24,
    labelHeight: 16,
    edgeLengthFactor: "20",
    compositTitleSize: 35,
    radius: 5,
    defaultRenderer: "dagre-wrapper"
  },
  er: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    diagramPadding: 20,
    layoutDirection: "TB",
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    nodeSpacing: 140,
    rankSpacing: 80,
    stroke: "gray",
    fill: "honeydew",
    fontSize: 12
  },
  pie: {
    useMaxWidth: !0,
    textPosition: 0.75
  },
  quadrantChart: {
    useMaxWidth: !0,
    chartWidth: 500,
    chartHeight: 500,
    titleFontSize: 20,
    titlePadding: 10,
    quadrantPadding: 5,
    xAxisLabelPadding: 5,
    yAxisLabelPadding: 5,
    xAxisLabelFontSize: 16,
    yAxisLabelFontSize: 16,
    quadrantLabelFontSize: 16,
    quadrantTextTopPadding: 5,
    pointTextPadding: 5,
    pointLabelFontSize: 12,
    pointRadius: 5,
    xAxisPosition: "top",
    yAxisPosition: "left",
    quadrantInternalBorderStrokeWidth: 1,
    quadrantExternalBorderStrokeWidth: 2
  },
  xyChart: {
    useMaxWidth: !0,
    width: 700,
    height: 500,
    titleFontSize: 20,
    titlePadding: 10,
    showDataLabel: !1,
    showTitle: !0,
    xAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2
    },
    yAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2
    },
    chartOrientation: "vertical",
    plotReservedSpacePercent: 50
  },
  requirement: {
    useMaxWidth: !0,
    rect_fill: "#f9f9f9",
    text_color: "#333",
    rect_border_size: "0.5px",
    rect_border_color: "#bbb",
    rect_min_width: 200,
    rect_min_height: 200,
    fontSize: 14,
    rect_padding: 10,
    line_height: 20
  },
  mindmap: {
    useMaxWidth: !0,
    padding: 10,
    maxNodeWidth: 200,
    layoutAlgorithm: "cose-bilkent"
  },
  kanban: {
    useMaxWidth: !0,
    padding: 8,
    sectionWidth: 200,
    ticketBaseUrl: ""
  },
  timeline: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ],
    disableMulticolor: !1
  },
  gitGraph: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    diagramPadding: 8,
    nodeLabel: {
      width: 75,
      height: 100,
      x: -25,
      y: 0
    },
    mainBranchName: "main",
    mainBranchOrder: 0,
    showCommitLabel: !0,
    showBranches: !0,
    rotateCommitLabel: !0,
    parallelCommits: !1,
    arrowMarkerAbsolute: !1
  },
  c4: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    c4ShapeMargin: 50,
    c4ShapePadding: 20,
    width: 216,
    height: 60,
    boxMargin: 10,
    c4ShapeInRow: 4,
    nextLinePaddingX: 0,
    c4BoundaryInRow: 2,
    personFontSize: 14,
    personFontFamily: '"Open Sans", sans-serif',
    personFontWeight: "normal",
    external_personFontSize: 14,
    external_personFontFamily: '"Open Sans", sans-serif',
    external_personFontWeight: "normal",
    systemFontSize: 14,
    systemFontFamily: '"Open Sans", sans-serif',
    systemFontWeight: "normal",
    external_systemFontSize: 14,
    external_systemFontFamily: '"Open Sans", sans-serif',
    external_systemFontWeight: "normal",
    system_dbFontSize: 14,
    system_dbFontFamily: '"Open Sans", sans-serif',
    system_dbFontWeight: "normal",
    external_system_dbFontSize: 14,
    external_system_dbFontFamily: '"Open Sans", sans-serif',
    external_system_dbFontWeight: "normal",
    system_queueFontSize: 14,
    system_queueFontFamily: '"Open Sans", sans-serif',
    system_queueFontWeight: "normal",
    external_system_queueFontSize: 14,
    external_system_queueFontFamily: '"Open Sans", sans-serif',
    external_system_queueFontWeight: "normal",
    boundaryFontSize: 14,
    boundaryFontFamily: '"Open Sans", sans-serif',
    boundaryFontWeight: "normal",
    messageFontSize: 12,
    messageFontFamily: '"Open Sans", sans-serif',
    messageFontWeight: "normal",
    containerFontSize: 14,
    containerFontFamily: '"Open Sans", sans-serif',
    containerFontWeight: "normal",
    external_containerFontSize: 14,
    external_containerFontFamily: '"Open Sans", sans-serif',
    external_containerFontWeight: "normal",
    container_dbFontSize: 14,
    container_dbFontFamily: '"Open Sans", sans-serif',
    container_dbFontWeight: "normal",
    external_container_dbFontSize: 14,
    external_container_dbFontFamily: '"Open Sans", sans-serif',
    external_container_dbFontWeight: "normal",
    container_queueFontSize: 14,
    container_queueFontFamily: '"Open Sans", sans-serif',
    container_queueFontWeight: "normal",
    external_container_queueFontSize: 14,
    external_container_queueFontFamily: '"Open Sans", sans-serif',
    external_container_queueFontWeight: "normal",
    componentFontSize: 14,
    componentFontFamily: '"Open Sans", sans-serif',
    componentFontWeight: "normal",
    external_componentFontSize: 14,
    external_componentFontFamily: '"Open Sans", sans-serif',
    external_componentFontWeight: "normal",
    component_dbFontSize: 14,
    component_dbFontFamily: '"Open Sans", sans-serif',
    component_dbFontWeight: "normal",
    external_component_dbFontSize: 14,
    external_component_dbFontFamily: '"Open Sans", sans-serif',
    external_component_dbFontWeight: "normal",
    component_queueFontSize: 14,
    component_queueFontFamily: '"Open Sans", sans-serif',
    component_queueFontWeight: "normal",
    external_component_queueFontSize: 14,
    external_component_queueFontFamily: '"Open Sans", sans-serif',
    external_component_queueFontWeight: "normal",
    wrap: !0,
    wrapPadding: 10,
    person_bg_color: "#08427B",
    person_border_color: "#073B6F",
    external_person_bg_color: "#686868",
    external_person_border_color: "#8A8A8A",
    system_bg_color: "#1168BD",
    system_border_color: "#3C7FC0",
    system_db_bg_color: "#1168BD",
    system_db_border_color: "#3C7FC0",
    system_queue_bg_color: "#1168BD",
    system_queue_border_color: "#3C7FC0",
    external_system_bg_color: "#999999",
    external_system_border_color: "#8A8A8A",
    external_system_db_bg_color: "#999999",
    external_system_db_border_color: "#8A8A8A",
    external_system_queue_bg_color: "#999999",
    external_system_queue_border_color: "#8A8A8A",
    container_bg_color: "#438DD5",
    container_border_color: "#3C7FC0",
    container_db_bg_color: "#438DD5",
    container_db_border_color: "#3C7FC0",
    container_queue_bg_color: "#438DD5",
    container_queue_border_color: "#3C7FC0",
    external_container_bg_color: "#B3B3B3",
    external_container_border_color: "#A6A6A6",
    external_container_db_bg_color: "#B3B3B3",
    external_container_db_border_color: "#A6A6A6",
    external_container_queue_bg_color: "#B3B3B3",
    external_container_queue_border_color: "#A6A6A6",
    component_bg_color: "#85BBF0",
    component_border_color: "#78A8D8",
    component_db_bg_color: "#85BBF0",
    component_db_border_color: "#78A8D8",
    component_queue_bg_color: "#85BBF0",
    component_queue_border_color: "#78A8D8",
    external_component_bg_color: "#CCCCCC",
    external_component_border_color: "#BFBFBF",
    external_component_db_bg_color: "#CCCCCC",
    external_component_db_border_color: "#BFBFBF",
    external_component_queue_bg_color: "#CCCCCC",
    external_component_queue_border_color: "#BFBFBF"
  },
  sankey: {
    useMaxWidth: !0,
    width: 600,
    height: 400,
    linkColor: "gradient",
    nodeAlignment: "justify",
    showValues: !0,
    prefix: "",
    suffix: ""
  },
  block: {
    useMaxWidth: !0,
    padding: 8
  },
  packet: {
    useMaxWidth: !0,
    rowHeight: 32,
    bitWidth: 32,
    bitsPerRow: 32,
    showBits: !0,
    paddingX: 5,
    paddingY: 5
  },
  architecture: {
    useMaxWidth: !0,
    padding: 40,
    iconSize: 80,
    fontSize: 16
  },
  radar: {
    useMaxWidth: !0,
    width: 600,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
    axisScaleFactor: 1,
    axisLabelFactor: 1.05,
    curveTension: 0.17
  },
  theme: "default",
  look: "classic",
  handDrawnSeed: 0,
  layout: "dagre",
  maxTextSize: 5e4,
  maxEdges: 500,
  darkMode: !1,
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
  logLevel: 5,
  securityLevel: "strict",
  startOnLoad: !0,
  arrowMarkerAbsolute: !1,
  secure: [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "suppressErrorRendering",
    "maxEdges"
  ],
  legacyMathML: !1,
  forceLegacyMathML: !1,
  deterministicIds: !1,
  fontSize: 16,
  markdownAutoWrap: !0,
  suppressErrorRendering: !1
}, lc = {
  ...le,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  elk: {
    // mergeEdges is needed here to be considered
    mergeEdges: !1,
    nodePlacementStrategy: "BRANDES_KOEPF",
    forceNodeModelOrder: !1,
    considerModelOrder: "NODES_AND_EDGES"
  },
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: ve.default.getThemeVariables(),
  sequence: {
    ...le.sequence,
    messageFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont"),
    noteFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.noteFontFamily,
        fontSize: this.noteFontSize,
        fontWeight: this.noteFontWeight
      };
    }, "noteFont"),
    actorFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.actorFontFamily,
        fontSize: this.actorFontSize,
        fontWeight: this.actorFontWeight
      };
    }, "actorFont")
  },
  class: {
    hideEmptyMembersBox: !1
  },
  gantt: {
    ...le.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...le.c4,
    useWidth: void 0,
    personFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.personFontFamily,
        fontSize: this.personFontSize,
        fontWeight: this.personFontWeight
      };
    }, "personFont"),
    flowchart: {
      ...le.flowchart,
      inheritDir: !1
      // default to legacy behavior
    },
    external_personFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_personFontFamily,
        fontSize: this.external_personFontSize,
        fontWeight: this.external_personFontWeight
      };
    }, "external_personFont"),
    systemFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.systemFontFamily,
        fontSize: this.systemFontSize,
        fontWeight: this.systemFontWeight
      };
    }, "systemFont"),
    external_systemFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_systemFontFamily,
        fontSize: this.external_systemFontSize,
        fontWeight: this.external_systemFontWeight
      };
    }, "external_systemFont"),
    system_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.system_dbFontFamily,
        fontSize: this.system_dbFontSize,
        fontWeight: this.system_dbFontWeight
      };
    }, "system_dbFont"),
    external_system_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_system_dbFontFamily,
        fontSize: this.external_system_dbFontSize,
        fontWeight: this.external_system_dbFontWeight
      };
    }, "external_system_dbFont"),
    system_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.system_queueFontFamily,
        fontSize: this.system_queueFontSize,
        fontWeight: this.system_queueFontWeight
      };
    }, "system_queueFont"),
    external_system_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_system_queueFontFamily,
        fontSize: this.external_system_queueFontSize,
        fontWeight: this.external_system_queueFontWeight
      };
    }, "external_system_queueFont"),
    containerFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.containerFontFamily,
        fontSize: this.containerFontSize,
        fontWeight: this.containerFontWeight
      };
    }, "containerFont"),
    external_containerFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_containerFontFamily,
        fontSize: this.external_containerFontSize,
        fontWeight: this.external_containerFontWeight
      };
    }, "external_containerFont"),
    container_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.container_dbFontFamily,
        fontSize: this.container_dbFontSize,
        fontWeight: this.container_dbFontWeight
      };
    }, "container_dbFont"),
    external_container_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_container_dbFontFamily,
        fontSize: this.external_container_dbFontSize,
        fontWeight: this.external_container_dbFontWeight
      };
    }, "external_container_dbFont"),
    container_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.container_queueFontFamily,
        fontSize: this.container_queueFontSize,
        fontWeight: this.container_queueFontWeight
      };
    }, "container_queueFont"),
    external_container_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_container_queueFontFamily,
        fontSize: this.external_container_queueFontSize,
        fontWeight: this.external_container_queueFontWeight
      };
    }, "external_container_queueFont"),
    componentFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.componentFontFamily,
        fontSize: this.componentFontSize,
        fontWeight: this.componentFontWeight
      };
    }, "componentFont"),
    external_componentFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_componentFontFamily,
        fontSize: this.external_componentFontSize,
        fontWeight: this.external_componentFontWeight
      };
    }, "external_componentFont"),
    component_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.component_dbFontFamily,
        fontSize: this.component_dbFontSize,
        fontWeight: this.component_dbFontWeight
      };
    }, "component_dbFont"),
    external_component_dbFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_component_dbFontFamily,
        fontSize: this.external_component_dbFontSize,
        fontWeight: this.external_component_dbFontWeight
      };
    }, "external_component_dbFont"),
    component_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.component_queueFontFamily,
        fontSize: this.component_queueFontSize,
        fontWeight: this.component_queueFontWeight
      };
    }, "component_queueFont"),
    external_component_queueFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.external_component_queueFontFamily,
        fontSize: this.external_component_queueFontSize,
        fontWeight: this.external_component_queueFontWeight
      };
    }, "external_component_queueFont"),
    boundaryFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.boundaryFontFamily,
        fontSize: this.boundaryFontSize,
        fontWeight: this.boundaryFontWeight
      };
    }, "boundaryFont"),
    messageFont: /* @__PURE__ */ p(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont")
  },
  pie: {
    ...le.pie,
    useWidth: 984
  },
  xyChart: {
    ...le.xyChart,
    useWidth: void 0
  },
  requirement: {
    ...le.requirement,
    useWidth: void 0
  },
  packet: {
    ...le.packet
  },
  radar: {
    ...le.radar
  },
  treemap: {
    useMaxWidth: !0,
    padding: 10,
    diagramPadding: 8,
    showValues: !0,
    nodeWidth: 100,
    nodeHeight: 40,
    borderWidth: 1,
    valueFontSize: 12,
    labelFontSize: 14,
    valueFormat: ","
  }
}, cc = /* @__PURE__ */ p((e, t = "") => Object.keys(e).reduce((r, i) => Array.isArray(e[i]) ? r : typeof e[i] == "object" && e[i] !== null ? [...r, t + i, ...cc(e[i], "")] : [...r, t + i], []), "keyify"), p0 = new Set(cc(lc, "")), hc = lc, Qi = /* @__PURE__ */ p((e) => {
  if ($.debug("sanitizeDirective called with", e), !(typeof e != "object" || e == null)) {
    if (Array.isArray(e)) {
      e.forEach((t) => Qi(t));
      return;
    }
    for (const t of Object.keys(e)) {
      if ($.debug("Checking key", t), t.startsWith("__") || t.includes("proto") || t.includes("constr") || !p0.has(t) || e[t] == null) {
        $.debug("sanitize deleting key: ", t), delete e[t];
        continue;
      }
      if (typeof e[t] == "object") {
        $.debug("sanitizing object", t), Qi(e[t]);
        continue;
      }
      const r = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const i of r)
        t.includes(i) && ($.debug("sanitizing css option", t), e[t] = g0(e[t]));
    }
    if (e.themeVariables)
      for (const t of Object.keys(e.themeVariables)) {
        const r = e.themeVariables[t];
        r != null && r.match && !r.match(/^[\d "#%(),.;A-Za-z]+$/) && (e.themeVariables[t] = "");
      }
    $.debug("After sanitization", e);
  }
}, "sanitizeDirective"), g0 = /* @__PURE__ */ p((e) => {
  let t = 0, r = 0;
  for (const i of e) {
    if (t < r)
      return "{ /* ERROR: Unbalanced CSS */ }";
    i === "{" ? t++ : i === "}" && r++;
  }
  return t !== r ? "{ /* ERROR: Unbalanced CSS */ }" : e;
}, "sanitizeCss"), Sr = Object.freeze(hc), Ut = wt({}, Sr), Ji, Ze = [], ri = wt({}, Sr), $a = /* @__PURE__ */ p((e, t) => {
  let r = wt({}, e), i = {};
  for (const a of t)
    dc(a), i = wt(i, a);
  if (r = wt(r, i), i.theme && i.theme in ve) {
    const a = wt({}, Ji), n = wt(
      a.themeVariables || {},
      i.themeVariables
    );
    r.theme && r.theme in ve && (r.themeVariables = ve[r.theme].getThemeVariables(n));
  }
  return ri = r, pc(ri), ri;
}, "updateCurrentConfig"), m0 = /* @__PURE__ */ p((e) => (Ut = wt({}, Sr), Ut = wt(Ut, e), e.theme && ve[e.theme] && (Ut.themeVariables = ve[e.theme].getThemeVariables(e.themeVariables)), $a(Ut, Ze), Ut), "setSiteConfig"), y0 = /* @__PURE__ */ p((e) => {
  Ji = wt({}, e);
}, "saveConfigFromInitialize"), x0 = /* @__PURE__ */ p((e) => (Ut = wt(Ut, e), $a(Ut, Ze), Ut), "updateSiteConfig"), uc = /* @__PURE__ */ p(() => wt({}, Ut), "getSiteConfig"), fc = /* @__PURE__ */ p((e) => (pc(e), wt(ri, e), $t()), "setConfig"), $t = /* @__PURE__ */ p(() => wt({}, ri), "getConfig"), dc = /* @__PURE__ */ p((e) => {
  e && (["secure", ...Ut.secure ?? []].forEach((t) => {
    Object.hasOwn(e, t) && ($.debug(`Denied attempt to modify a secure key ${t}`, e[t]), delete e[t]);
  }), Object.keys(e).forEach((t) => {
    t.startsWith("__") && delete e[t];
  }), Object.keys(e).forEach((t) => {
    typeof e[t] == "string" && (e[t].includes("<") || e[t].includes(">") || e[t].includes("url(data:")) && delete e[t], typeof e[t] == "object" && dc(e[t]);
  }));
}, "sanitize"), b0 = /* @__PURE__ */ p((e) => {
  var t;
  Qi(e), e.fontFamily && !((t = e.themeVariables) != null && t.fontFamily) && (e.themeVariables = {
    ...e.themeVariables,
    fontFamily: e.fontFamily
  }), Ze.push(e), $a(Ut, Ze);
}, "addDirective"), ta = /* @__PURE__ */ p((e = Ut) => {
  Ze = [], $a(e, Ze);
}, "reset"), C0 = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, Po = {}, _0 = /* @__PURE__ */ p((e) => {
  Po[e] || ($.warn(C0[e]), Po[e] = !0);
}, "issueWarning"), pc = /* @__PURE__ */ p((e) => {
  e && (e.lazyLoadedDiagrams || e.loadExternalDiagramsAtStartup) && _0("LAZY_LOAD_DEPRECATED");
}, "checkConfig"), AS = /* @__PURE__ */ p(() => {
  let e = {};
  Ji && (e = wt(e, Ji));
  for (const t of Ze)
    e = wt(e, t);
  return e;
}, "getUserDefinedConfig"), yi = /<br\s*\/?>/gi, v0 = /* @__PURE__ */ p((e) => e ? yc(e).replace(/\\n/g, "#br#").split("#br#") : [""], "getRows"), w0 = /* @__PURE__ */ (() => {
  let e = !1;
  return () => {
    e || (gc(), e = !0);
  };
})();
function gc() {
  const e = "data-temp-href-target";
  wr.addHook("beforeSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute("target") && t.setAttribute(e, t.getAttribute("target") ?? "");
  }), wr.addHook("afterSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute(e) && (t.setAttribute("target", t.getAttribute(e) ?? ""), t.removeAttribute(e), t.getAttribute("target") === "_blank" && t.setAttribute("rel", "noopener"));
  });
}
p(gc, "setupDompurifyHooks");
var mc = /* @__PURE__ */ p((e) => (w0(), wr.sanitize(e)), "removeScript"), No = /* @__PURE__ */ p((e, t) => {
  var r;
  if (((r = t.flowchart) == null ? void 0 : r.htmlLabels) !== !1) {
    const i = t.securityLevel;
    i === "antiscript" || i === "strict" ? e = mc(e) : i !== "loose" && (e = yc(e), e = e.replace(/</g, "&lt;").replace(/>/g, "&gt;"), e = e.replace(/=/g, "&equals;"), e = B0(e));
  }
  return e;
}, "sanitizeMore"), Jt = /* @__PURE__ */ p((e, t) => e && (t.dompurifyConfig ? e = wr.sanitize(No(e, t), t.dompurifyConfig).toString() : e = wr.sanitize(No(e, t), {
  FORBID_TAGS: ["style"]
}).toString(), e), "sanitizeText"), S0 = /* @__PURE__ */ p((e, t) => typeof e == "string" ? Jt(e, t) : e.flat().map((r) => Jt(r, t)), "sanitizeTextOrArray"), k0 = /* @__PURE__ */ p((e) => yi.test(e), "hasBreaks"), T0 = /* @__PURE__ */ p((e) => e.split(yi), "splitBreaks"), B0 = /* @__PURE__ */ p((e) => e.replace(/#br#/g, "<br/>"), "placeholderToBreak"), yc = /* @__PURE__ */ p((e) => e.replace(yi, "#br#"), "breakToPlaceholder"), L0 = /* @__PURE__ */ p((e) => {
  let t = "";
  return e && (t = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, t = CSS.escape(t)), t;
}, "getUrl"), kt = /* @__PURE__ */ p((e) => !(e === !1 || ["false", "null", "0"].includes(String(e).trim().toLowerCase())), "evaluate"), M0 = /* @__PURE__ */ p(function(...e) {
  const t = e.filter((r) => !isNaN(r));
  return Math.max(...t);
}, "getMax"), A0 = /* @__PURE__ */ p(function(...e) {
  const t = e.filter((r) => !isNaN(r));
  return Math.min(...t);
}, "getMin"), Wo = /* @__PURE__ */ p(function(e) {
  const t = e.split(/(,)/), r = [];
  for (let i = 0; i < t.length; i++) {
    let a = t[i];
    if (a === "," && i > 0 && i + 1 < t.length) {
      const n = t[i - 1], o = t[i + 1];
      E0(n, o) && (a = n + "," + o, i++, r.pop());
    }
    r.push(F0(a));
  }
  return r.join("");
}, "parseGenericTypes"), An = /* @__PURE__ */ p((e, t) => Math.max(0, e.split(t).length - 1), "countOccurrence"), E0 = /* @__PURE__ */ p((e, t) => {
  const r = An(e, "~"), i = An(t, "~");
  return r === 1 && i === 1;
}, "shouldCombineSets"), F0 = /* @__PURE__ */ p((e) => {
  const t = An(e, "~");
  let r = !1;
  if (t <= 1)
    return e;
  t % 2 !== 0 && e.startsWith("~") && (e = e.substring(1), r = !0);
  const i = [...e];
  let a = i.indexOf("~"), n = i.lastIndexOf("~");
  for (; a !== -1 && n !== -1 && a !== n; )
    i[a] = "<", i[n] = ">", a = i.indexOf("~"), n = i.lastIndexOf("~");
  return r && i.unshift("~"), i.join("");
}, "processSet"), zo = /* @__PURE__ */ p(() => window.MathMLElement !== void 0, "isMathMLSupported"), En = /\$\$(.*)\$\$/g, kr = /* @__PURE__ */ p((e) => {
  var t;
  return (((t = e.match(En)) == null ? void 0 : t.length) ?? 0) > 0;
}, "hasKatex"), ES = /* @__PURE__ */ p(async (e, t) => {
  const r = document.createElement("div");
  r.innerHTML = await ys(e, t), r.id = "katex-temp", r.style.visibility = "hidden", r.style.position = "absolute", r.style.top = "0";
  const i = document.querySelector("body");
  i == null || i.insertAdjacentElement("beforeend", r);
  const a = { width: r.clientWidth, height: r.clientHeight };
  return r.remove(), a;
}, "calculateMathMLDimensions"), $0 = /* @__PURE__ */ p(async (e, t) => {
  if (!kr(e))
    return e;
  if (!(zo() || t.legacyMathML || t.forceLegacyMathML))
    return e.replace(En, "MathML is unsupported in this environment.");
  {
    const { default: r } = await import("./index-CFDAYDAs.js").then(function(a) {
      return a.V;
    }), i = t.forceLegacyMathML || !zo() && t.legacyMathML ? "htmlAndMathml" : "mathml";
    return e.split(yi).map(
      (a) => kr(a) ? `<div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">${a}</div>` : `<div>${a}</div>`
    ).join("").replace(
      En,
      (a, n) => r.renderToString(n, {
        throwOnError: !0,
        displayMode: !0,
        output: i
      }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
    );
  }
}, "renderKatexUnsanitized"), ys = /* @__PURE__ */ p(async (e, t) => Jt(await $0(e, t), t), "renderKatexSanitized"), Er = {
  getRows: v0,
  sanitizeText: Jt,
  sanitizeTextOrArray: S0,
  hasBreaks: k0,
  splitBreaks: T0,
  lineBreakRegex: yi,
  removeScript: mc,
  getUrl: L0,
  evaluate: kt,
  getMax: M0,
  getMin: A0
}, D0 = /* @__PURE__ */ p(function(e, t) {
  for (let r of t)
    e.attr(r[0], r[1]);
}, "d3Attrs"), O0 = /* @__PURE__ */ p(function(e, t, r) {
  let i = /* @__PURE__ */ new Map();
  return r ? (i.set("width", "100%"), i.set("style", `max-width: ${t}px;`)) : (i.set("height", e), i.set("width", t)), i;
}, "calculateSvgSizeAttrs"), xc = /* @__PURE__ */ p(function(e, t, r, i) {
  const a = O0(t, r, i);
  D0(e, a);
}, "configureSvgSize"), I0 = /* @__PURE__ */ p(function(e, t, r, i) {
  const a = t.node().getBBox(), n = a.width, o = a.height;
  $.info(`SVG bounds: ${n}x${o}`, a);
  let s = 0, l = 0;
  $.info(`Graph bounds: ${s}x${l}`, e), s = n + r * 2, l = o + r * 2, $.info(`Calculated bounds: ${s}x${l}`), xc(t, l, s, i);
  const c = `${a.x - r} ${a.y - r} ${a.width + 2 * r} ${a.height + 2 * r}`;
  t.attr("viewBox", c);
}, "setupGraphViewbox"), qi = {}, R0 = /* @__PURE__ */ p((e, t, r) => {
  let i = "";
  return e in qi && qi[e] ? i = qi[e](r) : $.warn(`No theme found for ${e}`), ` & {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
    fill: ${r.textColor}
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
    fill: ${r.errorBkgColor};
  }
  & .error-text {
    fill: ${r.errorTextColor};
    stroke: ${r.errorTextColor};
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
    fill: ${r.lineColor};
    stroke: ${r.lineColor};
  }
  & .marker.cross {
    stroke: ${r.lineColor};
  }

  & svg {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
  }
   & p {
    margin: 0
   }

  ${i}

  ${t}
`;
}, "getStyles"), P0 = /* @__PURE__ */ p((e, t) => {
  t !== void 0 && (qi[e] = t);
}, "addStylesForDiagram"), N0 = R0, bc = {};
Bm(bc, {
  clear: () => W0,
  getAccDescription: () => Y0,
  getAccTitle: () => q0,
  getDiagramTitle: () => j0,
  setAccDescription: () => H0,
  setAccTitle: () => z0,
  setDiagramTitle: () => U0
});
var xs = "", bs = "", Cs = "", _s = /* @__PURE__ */ p((e) => Jt(e, $t()), "sanitizeText"), W0 = /* @__PURE__ */ p(() => {
  xs = "", Cs = "", bs = "";
}, "clear"), z0 = /* @__PURE__ */ p((e) => {
  xs = _s(e).replace(/^\s+/g, "");
}, "setAccTitle"), q0 = /* @__PURE__ */ p(() => xs, "getAccTitle"), H0 = /* @__PURE__ */ p((e) => {
  Cs = _s(e).replace(/\n\s+/g, `
`);
}, "setAccDescription"), Y0 = /* @__PURE__ */ p(() => Cs, "getAccDescription"), U0 = /* @__PURE__ */ p((e) => {
  bs = _s(e);
}, "setDiagramTitle"), j0 = /* @__PURE__ */ p(() => bs, "getDiagramTitle"), qo = $, G0 = gs, ft = $t, FS = fc, $S = Sr, vs = /* @__PURE__ */ p((e) => Jt(e, ft()), "sanitizeText"), X0 = I0, V0 = /* @__PURE__ */ p(() => bc, "getCommonDb"), ea = {}, ra = /* @__PURE__ */ p((e, t, r) => {
  var i;
  ea[e] && qo.warn(`Diagram with id ${e} already registered. Overwriting.`), ea[e] = t, r && oc(e, r), P0(e, t.styles), (i = t.injectUtils) == null || i.call(
    t,
    qo,
    G0,
    ft,
    vs,
    X0,
    V0(),
    () => {
    }
  );
}, "registerDiagram"), Fn = /* @__PURE__ */ p((e) => {
  if (e in ea)
    return ea[e];
  throw new K0(e);
}, "getDiagram"), _r, K0 = (_r = class extends Error {
  constructor(t) {
    super(`Diagram ${t} not found.`);
  }
}, p(_r, "DiagramNotFoundError"), _r), Z0 = { value: () => {
} };
function Cc() {
  for (var e = 0, t = arguments.length, r = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in r || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    r[i] = [];
  }
  return new Hi(r);
}
function Hi(e) {
  this._ = e;
}
function Q0(e, t) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var i = "", a = r.indexOf(".");
    if (a >= 0 && (i = r.slice(a + 1), r = r.slice(0, a)), r && !t.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: i };
  });
}
Hi.prototype = Cc.prototype = {
  constructor: Hi,
  on: function(e, t) {
    var r = this._, i = Q0(e + "", r), a, n = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++n < o; ) if ((a = (e = i[n]).type) && (a = J0(r[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++n < o; )
      if (a = (e = i[n]).type) r[a] = Ho(r[a], e.name, t);
      else if (t == null) for (a in r) r[a] = Ho(r[a], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var r in t) e[r] = t[r].slice();
    return new Hi(e);
  },
  call: function(e, t) {
    if ((a = arguments.length - 2) > 0) for (var r = new Array(a), i = 0, a, n; i < a; ++i) r[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (n = this._[e], i = 0, a = n.length; i < a; ++i) n[i].value.apply(t, r);
  },
  apply: function(e, t, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], a = 0, n = i.length; a < n; ++a) i[a].value.apply(t, r);
  }
};
function J0(e, t) {
  for (var r = 0, i = e.length, a; r < i; ++r)
    if ((a = e[r]).name === t)
      return a.value;
}
function Ho(e, t, r) {
  for (var i = 0, a = e.length; i < a; ++i)
    if (e[i].name === t) {
      e[i] = Z0, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var $n = "http://www.w3.org/1999/xhtml", Yo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: $n,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Da(e) {
  var t = e += "", r = t.indexOf(":");
  return r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Yo.hasOwnProperty(t) ? { space: Yo[t], local: e } : e;
}
function ty(e) {
  return function() {
    var t = this.ownerDocument, r = this.namespaceURI;
    return r === $n && t.documentElement.namespaceURI === $n ? t.createElement(e) : t.createElementNS(r, e);
  };
}
function ey(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function _c(e) {
  var t = Da(e);
  return (t.local ? ey : ty)(t);
}
function ry() {
}
function ws(e) {
  return e == null ? ry : function() {
    return this.querySelector(e);
  };
}
function iy(e) {
  typeof e != "function" && (e = ws(e));
  for (var t = this._groups, r = t.length, i = new Array(r), a = 0; a < r; ++a)
    for (var n = t[a], o = n.length, s = i[a] = new Array(o), l, c, h = 0; h < o; ++h)
      (l = n[h]) && (c = e.call(l, l.__data__, h, n)) && ("__data__" in l && (c.__data__ = l.__data__), s[h] = c);
  return new Kt(i, this._parents);
}
function ay(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ny() {
  return [];
}
function vc(e) {
  return e == null ? ny : function() {
    return this.querySelectorAll(e);
  };
}
function sy(e) {
  return function() {
    return ay(e.apply(this, arguments));
  };
}
function oy(e) {
  typeof e == "function" ? e = sy(e) : e = vc(e);
  for (var t = this._groups, r = t.length, i = [], a = [], n = 0; n < r; ++n)
    for (var o = t[n], s = o.length, l, c = 0; c < s; ++c)
      (l = o[c]) && (i.push(e.call(l, l.__data__, c, o)), a.push(l));
  return new Kt(i, a);
}
function wc(e) {
  return function() {
    return this.matches(e);
  };
}
function Sc(e) {
  return function(t) {
    return t.matches(e);
  };
}
var ly = Array.prototype.find;
function cy(e) {
  return function() {
    return ly.call(this.children, e);
  };
}
function hy() {
  return this.firstElementChild;
}
function uy(e) {
  return this.select(e == null ? hy : cy(typeof e == "function" ? e : Sc(e)));
}
var fy = Array.prototype.filter;
function dy() {
  return Array.from(this.children);
}
function py(e) {
  return function() {
    return fy.call(this.children, e);
  };
}
function gy(e) {
  return this.selectAll(e == null ? dy : py(typeof e == "function" ? e : Sc(e)));
}
function my(e) {
  typeof e != "function" && (e = wc(e));
  for (var t = this._groups, r = t.length, i = new Array(r), a = 0; a < r; ++a)
    for (var n = t[a], o = n.length, s = i[a] = [], l, c = 0; c < o; ++c)
      (l = n[c]) && e.call(l, l.__data__, c, n) && s.push(l);
  return new Kt(i, this._parents);
}
function kc(e) {
  return new Array(e.length);
}
function yy() {
  return new Kt(this._enter || this._groups.map(kc), this._parents);
}
function ia(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ia.prototype = {
  constructor: ia,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function xy(e) {
  return function() {
    return e;
  };
}
function by(e, t, r, i, a, n) {
  for (var o = 0, s, l = t.length, c = n.length; o < c; ++o)
    (s = t[o]) ? (s.__data__ = n[o], i[o] = s) : r[o] = new ia(e, n[o]);
  for (; o < l; ++o)
    (s = t[o]) && (a[o] = s);
}
function Cy(e, t, r, i, a, n, o) {
  var s, l, c = /* @__PURE__ */ new Map(), h = t.length, u = n.length, f = new Array(h), d;
  for (s = 0; s < h; ++s)
    (l = t[s]) && (f[s] = d = o.call(l, l.__data__, s, t) + "", c.has(d) ? a[s] = l : c.set(d, l));
  for (s = 0; s < u; ++s)
    d = o.call(e, n[s], s, n) + "", (l = c.get(d)) ? (i[s] = l, l.__data__ = n[s], c.delete(d)) : r[s] = new ia(e, n[s]);
  for (s = 0; s < h; ++s)
    (l = t[s]) && c.get(f[s]) === l && (a[s] = l);
}
function _y(e) {
  return e.__data__;
}
function vy(e, t) {
  if (!arguments.length) return Array.from(this, _y);
  var r = t ? Cy : by, i = this._parents, a = this._groups;
  typeof e != "function" && (e = xy(e));
  for (var n = a.length, o = new Array(n), s = new Array(n), l = new Array(n), c = 0; c < n; ++c) {
    var h = i[c], u = a[c], f = u.length, d = wy(e.call(h, h && h.__data__, c, i)), g = d.length, m = s[c] = new Array(g), y = o[c] = new Array(g), x = l[c] = new Array(f);
    r(h, u, m, y, x, d, t);
    for (var b = 0, _ = 0, S, w; b < g; ++b)
      if (S = m[b]) {
        for (b >= _ && (_ = b + 1); !(w = y[_]) && ++_ < g; ) ;
        S._next = w || null;
      }
  }
  return o = new Kt(o, i), o._enter = s, o._exit = l, o;
}
function wy(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Sy() {
  return new Kt(this._exit || this._groups.map(kc), this._parents);
}
function ky(e, t, r) {
  var i = this.enter(), a = this, n = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (a = t(a), a && (a = a.selection())), r == null ? n.remove() : r(n), i && a ? i.merge(a).order() : a;
}
function Ty(e) {
  for (var t = e.selection ? e.selection() : e, r = this._groups, i = t._groups, a = r.length, n = i.length, o = Math.min(a, n), s = new Array(a), l = 0; l < o; ++l)
    for (var c = r[l], h = i[l], u = c.length, f = s[l] = new Array(u), d, g = 0; g < u; ++g)
      (d = c[g] || h[g]) && (f[g] = d);
  for (; l < a; ++l)
    s[l] = r[l];
  return new Kt(s, this._parents);
}
function By() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var i = e[t], a = i.length - 1, n = i[a], o; --a >= 0; )
      (o = i[a]) && (n && o.compareDocumentPosition(n) ^ 4 && n.parentNode.insertBefore(o, n), n = o);
  return this;
}
function Ly(e) {
  e || (e = My);
  function t(u, f) {
    return u && f ? e(u.__data__, f.__data__) : !u - !f;
  }
  for (var r = this._groups, i = r.length, a = new Array(i), n = 0; n < i; ++n) {
    for (var o = r[n], s = o.length, l = a[n] = new Array(s), c, h = 0; h < s; ++h)
      (c = o[h]) && (l[h] = c);
    l.sort(t);
  }
  return new Kt(a, this._parents).order();
}
function My(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ay() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ey() {
  return Array.from(this);
}
function Fy() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var i = e[t], a = 0, n = i.length; a < n; ++a) {
      var o = i[a];
      if (o) return o;
    }
  return null;
}
function $y() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Dy() {
  return !this.node();
}
function Oy(e) {
  for (var t = this._groups, r = 0, i = t.length; r < i; ++r)
    for (var a = t[r], n = 0, o = a.length, s; n < o; ++n)
      (s = a[n]) && e.call(s, s.__data__, n, a);
  return this;
}
function Iy(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ry(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Py(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Ny(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Wy(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function zy(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function qy(e, t) {
  var r = Da(e);
  if (arguments.length < 2) {
    var i = this.node();
    return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
  }
  return this.each((t == null ? r.local ? Ry : Iy : typeof t == "function" ? r.local ? zy : Wy : r.local ? Ny : Py)(r, t));
}
function Tc(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Hy(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Yy(e, t, r) {
  return function() {
    this.style.setProperty(e, t, r);
  };
}
function Uy(e, t, r) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, r);
  };
}
function jy(e, t, r) {
  return arguments.length > 1 ? this.each((t == null ? Hy : typeof t == "function" ? Uy : Yy)(e, t, r ?? "")) : Tr(this.node(), e);
}
function Tr(e, t) {
  return e.style.getPropertyValue(t) || Tc(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Gy(e) {
  return function() {
    delete this[e];
  };
}
function Xy(e, t) {
  return function() {
    this[e] = t;
  };
}
function Vy(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function Ky(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Gy : typeof t == "function" ? Vy : Xy)(e, t)) : this.node()[e];
}
function Bc(e) {
  return e.trim().split(/^|\s+/);
}
function Ss(e) {
  return e.classList || new Lc(e);
}
function Lc(e) {
  this._node = e, this._names = Bc(e.getAttribute("class") || "");
}
Lc.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Mc(e, t) {
  for (var r = Ss(e), i = -1, a = t.length; ++i < a; ) r.add(t[i]);
}
function Ac(e, t) {
  for (var r = Ss(e), i = -1, a = t.length; ++i < a; ) r.remove(t[i]);
}
function Zy(e) {
  return function() {
    Mc(this, e);
  };
}
function Qy(e) {
  return function() {
    Ac(this, e);
  };
}
function Jy(e, t) {
  return function() {
    (t.apply(this, arguments) ? Mc : Ac)(this, e);
  };
}
function tx(e, t) {
  var r = Bc(e + "");
  if (arguments.length < 2) {
    for (var i = Ss(this.node()), a = -1, n = r.length; ++a < n; ) if (!i.contains(r[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Jy : t ? Zy : Qy)(r, t));
}
function ex() {
  this.textContent = "";
}
function rx(e) {
  return function() {
    this.textContent = e;
  };
}
function ix(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ax(e) {
  return arguments.length ? this.each(e == null ? ex : (typeof e == "function" ? ix : rx)(e)) : this.node().textContent;
}
function nx() {
  this.innerHTML = "";
}
function sx(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ox(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function lx(e) {
  return arguments.length ? this.each(e == null ? nx : (typeof e == "function" ? ox : sx)(e)) : this.node().innerHTML;
}
function cx() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function hx() {
  return this.each(cx);
}
function ux() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fx() {
  return this.each(ux);
}
function dx(e) {
  var t = typeof e == "function" ? e : _c(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function px() {
  return null;
}
function gx(e, t) {
  var r = typeof e == "function" ? e : _c(e), i = t == null ? px : typeof t == "function" ? t : ws(t);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function mx() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function yx() {
  return this.each(mx);
}
function xx() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function bx() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cx(e) {
  return this.select(e ? bx : xx);
}
function _x(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function vx(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function wx(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var r = "", i = t.indexOf(".");
    return i >= 0 && (r = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: r };
  });
}
function Sx(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var r = 0, i = -1, a = t.length, n; r < a; ++r)
        n = t[r], (!e.type || n.type === e.type) && n.name === e.name ? this.removeEventListener(n.type, n.listener, n.options) : t[++i] = n;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function kx(e, t, r) {
  return function() {
    var i = this.__on, a, n = vx(t);
    if (i) {
      for (var o = 0, s = i.length; o < s; ++o)
        if ((a = i[o]).type === e.type && a.name === e.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = n, a.options = r), a.value = t;
          return;
        }
    }
    this.addEventListener(e.type, n, r), a = { type: e.type, name: e.name, value: t, listener: n, options: r }, i ? i.push(a) : this.__on = [a];
  };
}
function Tx(e, t, r) {
  var i = wx(e + ""), a, n = i.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var l = 0, c = s.length, h; l < c; ++l)
        for (a = 0, h = s[l]; a < n; ++a)
          if ((o = i[a]).type === h.type && o.name === h.name)
            return h.value;
    }
    return;
  }
  for (s = t ? kx : Sx, a = 0; a < n; ++a) this.each(s(i[a], t, r));
  return this;
}
function Ec(e, t, r) {
  var i = Tc(e), a = i.CustomEvent;
  typeof a == "function" ? a = new a(t, r) : (a = i.document.createEvent("Event"), r ? (a.initEvent(t, r.bubbles, r.cancelable), a.detail = r.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
}
function Bx(e, t) {
  return function() {
    return Ec(this, e, t);
  };
}
function Lx(e, t) {
  return function() {
    return Ec(this, e, t.apply(this, arguments));
  };
}
function Mx(e, t) {
  return this.each((typeof t == "function" ? Lx : Bx)(e, t));
}
function* Ax() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var i = e[t], a = 0, n = i.length, o; a < n; ++a)
      (o = i[a]) && (yield o);
}
var Fc = [null];
function Kt(e, t) {
  this._groups = e, this._parents = t;
}
function xi() {
  return new Kt([[document.documentElement]], Fc);
}
function Ex() {
  return this;
}
Kt.prototype = xi.prototype = {
  constructor: Kt,
  select: iy,
  selectAll: oy,
  selectChild: uy,
  selectChildren: gy,
  filter: my,
  data: vy,
  enter: yy,
  exit: Sy,
  join: ky,
  merge: Ty,
  selection: Ex,
  order: By,
  sort: Ly,
  call: Ay,
  nodes: Ey,
  node: Fy,
  size: $y,
  empty: Dy,
  each: Oy,
  attr: qy,
  style: jy,
  property: Ky,
  classed: tx,
  text: ax,
  html: lx,
  raise: hx,
  lower: fx,
  append: dx,
  insert: gx,
  remove: yx,
  clone: Cx,
  datum: _x,
  on: Tx,
  dispatch: Mx,
  [Symbol.iterator]: Ax
};
function ht(e) {
  return typeof e == "string" ? new Kt([[document.querySelector(e)]], [document.documentElement]) : new Kt([[e]], Fc);
}
function ks(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function $c(e, t) {
  var r = Object.create(e.prototype);
  for (var i in t) r[i] = t[i];
  return r;
}
function bi() {
}
var ai = 0.7, aa = 1 / ai, pr = "\\s*([+-]?\\d+)\\s*", ni = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", he = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Fx = /^#([0-9a-f]{3,8})$/, $x = new RegExp(`^rgb\\(${pr},${pr},${pr}\\)$`), Dx = new RegExp(`^rgb\\(${he},${he},${he}\\)$`), Ox = new RegExp(`^rgba\\(${pr},${pr},${pr},${ni}\\)$`), Ix = new RegExp(`^rgba\\(${he},${he},${he},${ni}\\)$`), Rx = new RegExp(`^hsl\\(${ni},${he},${he}\\)$`), Px = new RegExp(`^hsla\\(${ni},${he},${he},${ni}\\)$`), Uo = {
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
ks(bi, si, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: jo,
  // Deprecated! Use color.formatHex.
  formatHex: jo,
  formatHex8: Nx,
  formatHsl: Wx,
  formatRgb: Go,
  toString: Go
});
function jo() {
  return this.rgb().formatHex();
}
function Nx() {
  return this.rgb().formatHex8();
}
function Wx() {
  return Dc(this).formatHsl();
}
function Go() {
  return this.rgb().formatRgb();
}
function si(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = Fx.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Xo(t) : r === 3 ? new Gt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Ei(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Ei(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = $x.exec(e)) ? new Gt(t[1], t[2], t[3], 1) : (t = Dx.exec(e)) ? new Gt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ox.exec(e)) ? Ei(t[1], t[2], t[3], t[4]) : (t = Ix.exec(e)) ? Ei(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Rx.exec(e)) ? Zo(t[1], t[2] / 100, t[3] / 100, 1) : (t = Px.exec(e)) ? Zo(t[1], t[2] / 100, t[3] / 100, t[4]) : Uo.hasOwnProperty(e) ? Xo(Uo[e]) : e === "transparent" ? new Gt(NaN, NaN, NaN, 0) : null;
}
function Xo(e) {
  return new Gt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ei(e, t, r, i) {
  return i <= 0 && (e = t = r = NaN), new Gt(e, t, r, i);
}
function zx(e) {
  return e instanceof bi || (e = si(e)), e ? (e = e.rgb(), new Gt(e.r, e.g, e.b, e.opacity)) : new Gt();
}
function Dn(e, t, r, i) {
  return arguments.length === 1 ? zx(e) : new Gt(e, t, r, i ?? 1);
}
function Gt(e, t, r, i) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +i;
}
ks(Gt, Dn, $c(bi, {
  brighter(e) {
    return e = e == null ? aa : Math.pow(aa, e), new Gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ai : Math.pow(ai, e), new Gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Gt(Ge(this.r), Ge(this.g), Ge(this.b), na(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Vo,
  // Deprecated! Use color.formatHex.
  formatHex: Vo,
  formatHex8: qx,
  formatRgb: Ko,
  toString: Ko
}));
function Vo() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}`;
}
function qx() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}${He((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ko() {
  const e = na(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ge(this.r)}, ${Ge(this.g)}, ${Ge(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function na(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ge(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function He(e) {
  return e = Ge(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Zo(e, t, r, i) {
  return i <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new re(e, t, r, i);
}
function Dc(e) {
  if (e instanceof re) return new re(e.h, e.s, e.l, e.opacity);
  if (e instanceof bi || (e = si(e)), !e) return new re();
  if (e instanceof re) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, i = e.b / 255, a = Math.min(t, r, i), n = Math.max(t, r, i), o = NaN, s = n - a, l = (n + a) / 2;
  return s ? (t === n ? o = (r - i) / s + (r < i) * 6 : r === n ? o = (i - t) / s + 2 : o = (t - r) / s + 4, s /= l < 0.5 ? n + a : 2 - n - a, o *= 60) : s = l > 0 && l < 1 ? 0 : o, new re(o, s, l, e.opacity);
}
function Hx(e, t, r, i) {
  return arguments.length === 1 ? Dc(e) : new re(e, t, r, i ?? 1);
}
function re(e, t, r, i) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +i;
}
ks(re, Hx, $c(bi, {
  brighter(e) {
    return e = e == null ? aa : Math.pow(aa, e), new re(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ai : Math.pow(ai, e), new re(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, i = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - i;
    return new Gt(
      hn(e >= 240 ? e - 240 : e + 120, a, i),
      hn(e, a, i),
      hn(e < 120 ? e + 240 : e - 120, a, i),
      this.opacity
    );
  },
  clamp() {
    return new re(Qo(this.h), Fi(this.s), Fi(this.l), na(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = na(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Qo(this.h)}, ${Fi(this.s) * 100}%, ${Fi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Qo(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Fi(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function hn(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
var Ts = (e) => () => e;
function Oc(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function Yx(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(i) {
    return Math.pow(e + i * t, r);
  };
}
function DS(e, t) {
  var r = t - e;
  return r ? Oc(e, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r) : Ts(isNaN(e) ? t : e);
}
function Ux(e) {
  return (e = +e) == 1 ? Ic : function(t, r) {
    return r - t ? Yx(t, r, e) : Ts(isNaN(t) ? r : t);
  };
}
function Ic(e, t) {
  var r = t - e;
  return r ? Oc(e, r) : Ts(isNaN(e) ? t : e);
}
var Jo = function e(t) {
  var r = Ux(t);
  function i(a, n) {
    var o = r((a = Dn(a)).r, (n = Dn(n)).r), s = r(a.g, n.g), l = r(a.b, n.b), c = Ic(a.opacity, n.opacity);
    return function(h) {
      return a.r = o(h), a.g = s(h), a.b = l(h), a.opacity = c(h), a + "";
    };
  }
  return i.gamma = e, i;
}(1);
function Le(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
var On = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, un = new RegExp(On.source, "g");
function jx(e) {
  return function() {
    return e;
  };
}
function Gx(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Xx(e, t) {
  var r = On.lastIndex = un.lastIndex = 0, i, a, n, o = -1, s = [], l = [];
  for (e = e + "", t = t + ""; (i = On.exec(e)) && (a = un.exec(t)); )
    (n = a.index) > r && (n = t.slice(r, n), s[o] ? s[o] += n : s[++o] = n), (i = i[0]) === (a = a[0]) ? s[o] ? s[o] += a : s[++o] = a : (s[++o] = null, l.push({ i: o, x: Le(i, a) })), r = un.lastIndex;
  return r < t.length && (n = t.slice(r), s[o] ? s[o] += n : s[++o] = n), s.length < 2 ? l[0] ? Gx(l[0].x) : jx(t) : (t = l.length, function(c) {
    for (var h = 0, u; h < t; ++h) s[(u = l[h]).i] = u.x(c);
    return s.join("");
  });
}
var tl = 180 / Math.PI, In = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Rc(e, t, r, i, a, n) {
  var o, s, l;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (l = e * r + t * i) && (r -= e * l, i -= t * l), (s = Math.sqrt(r * r + i * i)) && (r /= s, i /= s, l /= s), e * i < t * r && (e = -e, t = -t, l = -l, o = -o), {
    translateX: a,
    translateY: n,
    rotate: Math.atan2(t, e) * tl,
    skewX: Math.atan(l) * tl,
    scaleX: o,
    scaleY: s
  };
}
var $i;
function Vx(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? In : Rc(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Kx(e) {
  return e == null || ($i || ($i = document.createElementNS("http://www.w3.org/2000/svg", "g")), $i.setAttribute("transform", e), !(e = $i.transform.baseVal.consolidate())) ? In : (e = e.matrix, Rc(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Pc(e, t, r, i) {
  function a(c) {
    return c.length ? c.pop() + " " : "";
  }
  function n(c, h, u, f, d, g) {
    if (c !== u || h !== f) {
      var m = d.push("translate(", null, t, null, r);
      g.push({ i: m - 4, x: Le(c, u) }, { i: m - 2, x: Le(h, f) });
    } else (u || f) && d.push("translate(" + u + t + f + r);
  }
  function o(c, h, u, f) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), f.push({ i: u.push(a(u) + "rotate(", null, i) - 2, x: Le(c, h) })) : h && u.push(a(u) + "rotate(" + h + i);
  }
  function s(c, h, u, f) {
    c !== h ? f.push({ i: u.push(a(u) + "skewX(", null, i) - 2, x: Le(c, h) }) : h && u.push(a(u) + "skewX(" + h + i);
  }
  function l(c, h, u, f, d, g) {
    if (c !== u || h !== f) {
      var m = d.push(a(d) + "scale(", null, ",", null, ")");
      g.push({ i: m - 4, x: Le(c, u) }, { i: m - 2, x: Le(h, f) });
    } else (u !== 1 || f !== 1) && d.push(a(d) + "scale(" + u + "," + f + ")");
  }
  return function(c, h) {
    var u = [], f = [];
    return c = e(c), h = e(h), n(c.translateX, c.translateY, h.translateX, h.translateY, u, f), o(c.rotate, h.rotate, u, f), s(c.skewX, h.skewX, u, f), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, u, f), c = h = null, function(d) {
      for (var g = -1, m = f.length, y; ++g < m; ) u[(y = f[g]).i] = y.x(d);
      return u.join("");
    };
  };
}
var Zx = Pc(Vx, "px, ", "px)", "deg)"), Qx = Pc(Kx, ", ", ")", ")"), Br = 0, jr = 0, zr = 0, Nc = 1e3, sa, Gr, oa = 0, Qe = 0, Oa = 0, oi = typeof performance == "object" && performance.now ? performance : Date, Wc = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Bs() {
  return Qe || (Wc(Jx), Qe = oi.now() + Oa);
}
function Jx() {
  Qe = 0;
}
function la() {
  this._call = this._time = this._next = null;
}
la.prototype = zc.prototype = {
  constructor: la,
  restart: function(e, t, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Bs() : +r) + (t == null ? 0 : +t), !this._next && Gr !== this && (Gr ? Gr._next = this : sa = this, Gr = this), this._call = e, this._time = r, Rn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Rn());
  }
};
function zc(e, t, r) {
  var i = new la();
  return i.restart(e, t, r), i;
}
function tb() {
  Bs(), ++Br;
  for (var e = sa, t; e; )
    (t = Qe - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Br;
}
function el() {
  Qe = (oa = oi.now()) + Oa, Br = jr = 0;
  try {
    tb();
  } finally {
    Br = 0, rb(), Qe = 0;
  }
}
function eb() {
  var e = oi.now(), t = e - oa;
  t > Nc && (Oa -= t, oa = e);
}
function rb() {
  for (var e, t = sa, r, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (r = t._next, t._next = null, t = e ? e._next = r : sa = r);
  Gr = e, Rn(i);
}
function Rn(e) {
  if (!Br) {
    jr && (jr = clearTimeout(jr));
    var t = e - Qe;
    t > 24 ? (e < 1 / 0 && (jr = setTimeout(el, e - oi.now() - Oa)), zr && (zr = clearInterval(zr))) : (zr || (oa = oi.now(), zr = setInterval(eb, Nc)), Br = 1, Wc(el));
  }
}
function rl(e, t, r) {
  var i = new la();
  return t = t == null ? 0 : +t, i.restart((a) => {
    i.stop(), e(a + t);
  }, t, r), i;
}
var ib = Cc("start", "end", "cancel", "interrupt"), ab = [], qc = 0, il = 1, Pn = 2, Yi = 3, al = 4, Nn = 5, Ui = 6;
function Ia(e, t, r, i, a, n) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (r in o) return;
  nb(e, r, {
    name: t,
    index: i,
    // For context during callback.
    group: a,
    // For context during callback.
    on: ib,
    tween: ab,
    time: n.time,
    delay: n.delay,
    duration: n.duration,
    ease: n.ease,
    timer: null,
    state: qc
  });
}
function Ls(e, t) {
  var r = ne(e, t);
  if (r.state > qc) throw new Error("too late; already scheduled");
  return r;
}
function de(e, t) {
  var r = ne(e, t);
  if (r.state > Yi) throw new Error("too late; already running");
  return r;
}
function ne(e, t) {
  var r = e.__transition;
  if (!r || !(r = r[t])) throw new Error("transition not found");
  return r;
}
function nb(e, t, r) {
  var i = e.__transition, a;
  i[t] = r, r.timer = zc(n, 0, r.time);
  function n(c) {
    r.state = il, r.timer.restart(o, r.delay, r.time), r.delay <= c && o(c - r.delay);
  }
  function o(c) {
    var h, u, f, d;
    if (r.state !== il) return l();
    for (h in i)
      if (d = i[h], d.name === r.name) {
        if (d.state === Yi) return rl(o);
        d.state === al ? (d.state = Ui, d.timer.stop(), d.on.call("interrupt", e, e.__data__, d.index, d.group), delete i[h]) : +h < t && (d.state = Ui, d.timer.stop(), d.on.call("cancel", e, e.__data__, d.index, d.group), delete i[h]);
      }
    if (rl(function() {
      r.state === Yi && (r.state = al, r.timer.restart(s, r.delay, r.time), s(c));
    }), r.state = Pn, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Pn) {
      for (r.state = Yi, a = new Array(f = r.tween.length), h = 0, u = -1; h < f; ++h)
        (d = r.tween[h].value.call(e, e.__data__, r.index, r.group)) && (a[++u] = d);
      a.length = u + 1;
    }
  }
  function s(c) {
    for (var h = c < r.duration ? r.ease.call(null, c / r.duration) : (r.timer.restart(l), r.state = Nn, 1), u = -1, f = a.length; ++u < f; )
      a[u].call(e, h);
    r.state === Nn && (r.on.call("end", e, e.__data__, r.index, r.group), l());
  }
  function l() {
    r.state = Ui, r.timer.stop(), delete i[t];
    for (var c in i) return;
    delete e.__transition;
  }
}
function sb(e, t) {
  var r = e.__transition, i, a, n = !0, o;
  if (r) {
    t = t == null ? null : t + "";
    for (o in r) {
      if ((i = r[o]).name !== t) {
        n = !1;
        continue;
      }
      a = i.state > Pn && i.state < Nn, i.state = Ui, i.timer.stop(), i.on.call(a ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete r[o];
    }
    n && delete e.__transition;
  }
}
function ob(e) {
  return this.each(function() {
    sb(this, e);
  });
}
function lb(e, t) {
  var r, i;
  return function() {
    var a = de(this, e), n = a.tween;
    if (n !== r) {
      i = r = n;
      for (var o = 0, s = i.length; o < s; ++o)
        if (i[o].name === t) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    a.tween = i;
  };
}
function cb(e, t, r) {
  var i, a;
  if (typeof r != "function") throw new Error();
  return function() {
    var n = de(this, e), o = n.tween;
    if (o !== i) {
      a = (i = o).slice();
      for (var s = { name: t, value: r }, l = 0, c = a.length; l < c; ++l)
        if (a[l].name === t) {
          a[l] = s;
          break;
        }
      l === c && a.push(s);
    }
    n.tween = a;
  };
}
function hb(e, t) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = ne(this.node(), r).tween, a = 0, n = i.length, o; a < n; ++a)
      if ((o = i[a]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? lb : cb)(r, e, t));
}
function Ms(e, t, r) {
  var i = e._id;
  return e.each(function() {
    var a = de(this, i);
    (a.value || (a.value = {}))[t] = r.apply(this, arguments);
  }), function(a) {
    return ne(a, i).value[t];
  };
}
function Hc(e, t) {
  var r;
  return (typeof t == "number" ? Le : t instanceof si ? Jo : (r = si(t)) ? (t = r, Jo) : Xx)(e, t);
}
function ub(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function fb(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function db(e, t, r) {
  var i, a = r + "", n;
  return function() {
    var o = this.getAttribute(e);
    return o === a ? null : o === i ? n : n = t(i = o, r);
  };
}
function pb(e, t, r) {
  var i, a = r + "", n;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === a ? null : o === i ? n : n = t(i = o, r);
  };
}
function gb(e, t, r) {
  var i, a, n;
  return function() {
    var o, s = r(this), l;
    return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), l = s + "", o === l ? null : o === i && l === a ? n : (a = l, n = t(i = o, s)));
  };
}
function mb(e, t, r) {
  var i, a, n;
  return function() {
    var o, s = r(this), l;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), l = s + "", o === l ? null : o === i && l === a ? n : (a = l, n = t(i = o, s)));
  };
}
function yb(e, t) {
  var r = Da(e), i = r === "transform" ? Qx : Hc;
  return this.attrTween(e, typeof t == "function" ? (r.local ? mb : gb)(r, i, Ms(this, "attr." + e, t)) : t == null ? (r.local ? fb : ub)(r) : (r.local ? pb : db)(r, i, t));
}
function xb(e, t) {
  return function(r) {
    this.setAttribute(e, t.call(this, r));
  };
}
function bb(e, t) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, t.call(this, r));
  };
}
function Cb(e, t) {
  var r, i;
  function a() {
    var n = t.apply(this, arguments);
    return n !== i && (r = (i = n) && bb(e, n)), r;
  }
  return a._value = t, a;
}
function _b(e, t) {
  var r, i;
  function a() {
    var n = t.apply(this, arguments);
    return n !== i && (r = (i = n) && xb(e, n)), r;
  }
  return a._value = t, a;
}
function vb(e, t) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  var i = Da(e);
  return this.tween(r, (i.local ? Cb : _b)(i, t));
}
function wb(e, t) {
  return function() {
    Ls(this, e).delay = +t.apply(this, arguments);
  };
}
function Sb(e, t) {
  return t = +t, function() {
    Ls(this, e).delay = t;
  };
}
function kb(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? wb : Sb)(t, e)) : ne(this.node(), t).delay;
}
function Tb(e, t) {
  return function() {
    de(this, e).duration = +t.apply(this, arguments);
  };
}
function Bb(e, t) {
  return t = +t, function() {
    de(this, e).duration = t;
  };
}
function Lb(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Tb : Bb)(t, e)) : ne(this.node(), t).duration;
}
function Mb(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    de(this, e).ease = t;
  };
}
function Ab(e) {
  var t = this._id;
  return arguments.length ? this.each(Mb(t, e)) : ne(this.node(), t).ease;
}
function Eb(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    de(this, e).ease = r;
  };
}
function Fb(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Eb(this._id, e));
}
function $b(e) {
  typeof e != "function" && (e = wc(e));
  for (var t = this._groups, r = t.length, i = new Array(r), a = 0; a < r; ++a)
    for (var n = t[a], o = n.length, s = i[a] = [], l, c = 0; c < o; ++c)
      (l = n[c]) && e.call(l, l.__data__, c, n) && s.push(l);
  return new Se(i, this._parents, this._name, this._id);
}
function Db(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, r = e._groups, i = t.length, a = r.length, n = Math.min(i, a), o = new Array(i), s = 0; s < n; ++s)
    for (var l = t[s], c = r[s], h = l.length, u = o[s] = new Array(h), f, d = 0; d < h; ++d)
      (f = l[d] || c[d]) && (u[d] = f);
  for (; s < i; ++s)
    o[s] = t[s];
  return new Se(o, this._parents, this._name, this._id);
}
function Ob(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var r = t.indexOf(".");
    return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
  });
}
function Ib(e, t, r) {
  var i, a, n = Ob(t) ? Ls : de;
  return function() {
    var o = n(this, e), s = o.on;
    s !== i && (a = (i = s).copy()).on(t, r), o.on = a;
  };
}
function Rb(e, t) {
  var r = this._id;
  return arguments.length < 2 ? ne(this.node(), r).on.on(e) : this.each(Ib(r, e, t));
}
function Pb(e) {
  return function() {
    var t = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    t && t.removeChild(this);
  };
}
function Nb() {
  return this.on("end.remove", Pb(this._id));
}
function Wb(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = ws(e));
  for (var i = this._groups, a = i.length, n = new Array(a), o = 0; o < a; ++o)
    for (var s = i[o], l = s.length, c = n[o] = new Array(l), h, u, f = 0; f < l; ++f)
      (h = s[f]) && (u = e.call(h, h.__data__, f, s)) && ("__data__" in h && (u.__data__ = h.__data__), c[f] = u, Ia(c[f], t, r, f, c, ne(h, r)));
  return new Se(n, this._parents, t, r);
}
function zb(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = vc(e));
  for (var i = this._groups, a = i.length, n = [], o = [], s = 0; s < a; ++s)
    for (var l = i[s], c = l.length, h, u = 0; u < c; ++u)
      if (h = l[u]) {
        for (var f = e.call(h, h.__data__, u, l), d, g = ne(h, r), m = 0, y = f.length; m < y; ++m)
          (d = f[m]) && Ia(d, t, r, m, f, g);
        n.push(f), o.push(h);
      }
  return new Se(n, o, t, r);
}
var qb = xi.prototype.constructor;
function Hb() {
  return new qb(this._groups, this._parents);
}
function Yb(e, t) {
  var r, i, a;
  return function() {
    var n = Tr(this, e), o = (this.style.removeProperty(e), Tr(this, e));
    return n === o ? null : n === r && o === i ? a : a = t(r = n, i = o);
  };
}
function Yc(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ub(e, t, r) {
  var i, a = r + "", n;
  return function() {
    var o = Tr(this, e);
    return o === a ? null : o === i ? n : n = t(i = o, r);
  };
}
function jb(e, t, r) {
  var i, a, n;
  return function() {
    var o = Tr(this, e), s = r(this), l = s + "";
    return s == null && (l = s = (this.style.removeProperty(e), Tr(this, e))), o === l ? null : o === i && l === a ? n : (a = l, n = t(i = o, s));
  };
}
function Gb(e, t) {
  var r, i, a, n = "style." + t, o = "end." + n, s;
  return function() {
    var l = de(this, e), c = l.on, h = l.value[n] == null ? s || (s = Yc(t)) : void 0;
    (c !== r || a !== h) && (i = (r = c).copy()).on(o, a = h), l.on = i;
  };
}
function Xb(e, t, r) {
  var i = (e += "") == "transform" ? Zx : Hc;
  return t == null ? this.styleTween(e, Yb(e, i)).on("end.style." + e, Yc(e)) : typeof t == "function" ? this.styleTween(e, jb(e, i, Ms(this, "style." + e, t))).each(Gb(this._id, e)) : this.styleTween(e, Ub(e, i, t), r).on("end.style." + e, null);
}
function Vb(e, t, r) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), r);
  };
}
function Kb(e, t, r) {
  var i, a;
  function n() {
    var o = t.apply(this, arguments);
    return o !== a && (i = (a = o) && Vb(e, o, r)), i;
  }
  return n._value = t, n;
}
function Zb(e, t, r) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Kb(e, t, r ?? ""));
}
function Qb(e) {
  return function() {
    this.textContent = e;
  };
}
function Jb(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function t1(e) {
  return this.tween("text", typeof e == "function" ? Jb(Ms(this, "text", e)) : Qb(e == null ? "" : e + ""));
}
function e1(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function r1(e) {
  var t, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (t = (r = a) && e1(a)), t;
  }
  return i._value = e, i;
}
function i1(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, r1(e));
}
function a1() {
  for (var e = this._name, t = this._id, r = Uc(), i = this._groups, a = i.length, n = 0; n < a; ++n)
    for (var o = i[n], s = o.length, l, c = 0; c < s; ++c)
      if (l = o[c]) {
        var h = ne(l, t);
        Ia(l, e, r, c, o, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Se(i, this._parents, e, r);
}
function n1() {
  var e, t, r = this, i = r._id, a = r.size();
  return new Promise(function(n, o) {
    var s = { value: o }, l = { value: function() {
      --a === 0 && n();
    } };
    r.each(function() {
      var c = de(this, i), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(l)), c.on = t;
    }), a === 0 && n();
  });
}
var s1 = 0;
function Se(e, t, r, i) {
  this._groups = e, this._parents = t, this._name = r, this._id = i;
}
function Uc() {
  return ++s1;
}
var xe = xi.prototype;
Se.prototype = {
  constructor: Se,
  select: Wb,
  selectAll: zb,
  selectChild: xe.selectChild,
  selectChildren: xe.selectChildren,
  filter: $b,
  merge: Db,
  selection: Hb,
  transition: a1,
  call: xe.call,
  nodes: xe.nodes,
  node: xe.node,
  size: xe.size,
  empty: xe.empty,
  each: xe.each,
  on: Rb,
  attr: yb,
  attrTween: vb,
  style: Xb,
  styleTween: Zb,
  text: t1,
  textTween: i1,
  remove: Nb,
  tween: hb,
  delay: kb,
  duration: Lb,
  ease: Ab,
  easeVarying: Fb,
  end: n1,
  [Symbol.iterator]: xe[Symbol.iterator]
};
function o1(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var l1 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: o1
};
function c1(e, t) {
  for (var r; !(r = e.__transition) || !(r = r[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return r;
}
function h1(e) {
  var t, r;
  e instanceof Se ? (t = e._id, e = e._name) : (t = Uc(), (r = l1).time = Bs(), e = e == null ? null : e + "");
  for (var i = this._groups, a = i.length, n = 0; n < a; ++n)
    for (var o = i[n], s = o.length, l, c = 0; c < s; ++c)
      (l = o[c]) && Ia(l, e, t, c, o, r || c1(l, t));
  return new Se(i, this._parents, e, t);
}
xi.prototype.interrupt = ob;
xi.prototype.transition = h1;
const Wn = Math.PI, zn = 2 * Wn, We = 1e-6, u1 = zn - We;
function jc(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function f1(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return jc;
  const r = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let a = 1, n = i.length; a < n; ++a)
      this._ += Math.round(arguments[a] * r) / r + i[a];
  };
}
class d1 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? jc : f1(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, i, a) {
    this._append`Q${+t},${+r},${this._x1 = +i},${this._y1 = +a}`;
  }
  bezierCurveTo(t, r, i, a, n, o) {
    this._append`C${+t},${+r},${+i},${+a},${this._x1 = +n},${this._y1 = +o}`;
  }
  arcTo(t, r, i, a, n) {
    if (t = +t, r = +r, i = +i, a = +a, n = +n, n < 0) throw new Error(`negative radius: ${n}`);
    let o = this._x1, s = this._y1, l = i - t, c = a - r, h = o - t, u = s - r, f = h * h + u * u;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (f > We) if (!(Math.abs(u * l - c * h) > We) || !n)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let d = i - o, g = a - s, m = l * l + c * c, y = d * d + g * g, x = Math.sqrt(m), b = Math.sqrt(f), _ = n * Math.tan((Wn - Math.acos((m + f - y) / (2 * x * b))) / 2), S = _ / b, w = _ / x;
      Math.abs(S - 1) > We && this._append`L${t + S * h},${r + S * u}`, this._append`A${n},${n},0,0,${+(u * d > h * g)},${this._x1 = t + w * l},${this._y1 = r + w * c}`;
    }
  }
  arc(t, r, i, a, n, o) {
    if (t = +t, r = +r, i = +i, o = !!o, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(a), l = i * Math.sin(a), c = t + s, h = r + l, u = 1 ^ o, f = o ? a - n : n - a;
    this._x1 === null ? this._append`M${c},${h}` : (Math.abs(this._x1 - c) > We || Math.abs(this._y1 - h) > We) && this._append`L${c},${h}`, i && (f < 0 && (f = f % zn + zn), f > u1 ? this._append`A${i},${i},0,1,${u},${t - s},${r - l}A${i},${i},0,1,${u},${this._x1 = c},${this._y1 = h}` : f > We && this._append`A${i},${i},0,${+(f >= Wn)},${u},${this._x1 = t + i * Math.cos(n)},${this._y1 = r + i * Math.sin(n)}`);
  }
  rect(t, r, i, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${i = +i}v${+a}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function lr(e) {
  return function() {
    return e;
  };
}
const OS = Math.abs, IS = Math.atan2, RS = Math.cos, PS = Math.max, NS = Math.min, WS = Math.sin, zS = Math.sqrt, nl = 1e-12, As = Math.PI, sl = As / 2, qS = 2 * As;
function HS(e) {
  return e > 1 ? 0 : e < -1 ? As : Math.acos(e);
}
function YS(e) {
  return e >= 1 ? sl : e <= -1 ? -sl : Math.asin(e);
}
function p1(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const i = Math.floor(r);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = i;
    }
    return e;
  }, () => new d1(t);
}
function g1(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Gc(e) {
  this._context = e;
}
Gc.prototype = {
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
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function ca(e) {
  return new Gc(e);
}
function m1(e) {
  return e[0];
}
function y1(e) {
  return e[1];
}
function x1(e, t) {
  var r = lr(!0), i = null, a = ca, n = null, o = p1(s);
  e = typeof e == "function" ? e : e === void 0 ? m1 : lr(e), t = typeof t == "function" ? t : t === void 0 ? y1 : lr(t);
  function s(l) {
    var c, h = (l = g1(l)).length, u, f = !1, d;
    for (i == null && (n = a(d = o())), c = 0; c <= h; ++c)
      !(c < h && r(u = l[c], c, l)) === f && ((f = !f) ? n.lineStart() : n.lineEnd()), f && n.point(+e(u, c, l), +t(u, c, l));
    if (d) return n = null, d + "" || null;
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : lr(+l), s) : e;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : lr(+l), s) : t;
  }, s.defined = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : lr(!!l), s) : r;
  }, s.curve = function(l) {
    return arguments.length ? (a = l, i != null && (n = a(i)), s) : a;
  }, s.context = function(l) {
    return arguments.length ? (l == null ? i = n = null : n = a(i = l), s) : i;
  }, s;
}
class Xc {
  constructor(t, r) {
    this._context = t, this._x = r;
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
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function Vc(e) {
  return new Xc(e, !0);
}
function Kc(e) {
  return new Xc(e, !1);
}
function Ae() {
}
function ha(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Ra(e) {
  this._context = e;
}
Ra.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        ha(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        ha(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function ji(e) {
  return new Ra(e);
}
function Zc(e) {
  this._context = e;
}
Zc.prototype = {
  areaStart: Ae,
  areaEnd: Ae,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        ha(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function b1(e) {
  return new Zc(e);
}
function Qc(e) {
  this._context = e;
}
Qc.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, i = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, i) : this._context.moveTo(r, i);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        ha(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function C1(e) {
  return new Qc(e);
}
function Jc(e, t) {
  this._basis = new Ra(e), this._beta = t;
}
Jc.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length - 1;
    if (r > 0)
      for (var i = e[0], a = t[0], n = e[r] - i, o = t[r] - a, s = -1, l; ++s <= r; )
        l = s / r, this._basis.point(
          this._beta * e[s] + (1 - this._beta) * (i + l * n),
          this._beta * t[s] + (1 - this._beta) * (a + l * o)
        );
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
var _1 = function e(t) {
  function r(i) {
    return t === 1 ? new Ra(i) : new Jc(i, t);
  }
  return r.beta = function(i) {
    return e(+i);
  }, r;
}(0.85);
function ua(e, t, r) {
  e._context.bezierCurveTo(
    e._x1 + e._k * (e._x2 - e._x0),
    e._y1 + e._k * (e._y2 - e._y0),
    e._x2 + e._k * (e._x1 - t),
    e._y2 + e._k * (e._y1 - r),
    e._x2,
    e._y2
  );
}
function Es(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Es.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        ua(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2, this._x1 = e, this._y1 = t;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        ua(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var th = function e(t) {
  function r(i) {
    return new Es(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
}(0);
function Fs(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Fs.prototype = {
  areaStart: Ae,
  areaEnd: Ae,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        ua(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var v1 = function e(t) {
  function r(i) {
    return new Fs(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
}(0);
function $s(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
$s.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        ua(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var w1 = function e(t) {
  function r(i) {
    return new $s(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
}(0);
function Ds(e, t, r) {
  var i = e._x1, a = e._y1, n = e._x2, o = e._y2;
  if (e._l01_a > nl) {
    var s = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a, l = 3 * e._l01_a * (e._l01_a + e._l12_a);
    i = (i * s - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / l, a = (a * s - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / l;
  }
  if (e._l23_a > nl) {
    var c = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a, h = 3 * e._l23_a * (e._l23_a + e._l12_a);
    n = (n * c + e._x1 * e._l23_2a - t * e._l12_2a) / h, o = (o * c + e._y1 * e._l23_2a - r * e._l12_2a) / h;
  }
  e._context.bezierCurveTo(i, a, n, o, e._x2, e._y2);
}
function eh(e, t) {
  this._context = e, this._alpha = t;
}
eh.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
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
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        Ds(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var rh = function e(t) {
  function r(i) {
    return t ? new eh(i, t) : new Es(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
}(0.5);
function ih(e, t) {
  this._context = e, this._alpha = t;
}
ih.prototype = {
  areaStart: Ae,
  areaEnd: Ae,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        Ds(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var S1 = function e(t) {
  function r(i) {
    return t ? new ih(i, t) : new Fs(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
}(0.5);
function ah(e, t) {
  this._context = e, this._alpha = t;
}
ah.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        Ds(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
var k1 = function e(t) {
  function r(i) {
    return t ? new ah(i, t) : new $s(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
}(0.5);
function nh(e) {
  this._context = e;
}
nh.prototype = {
  areaStart: Ae,
  areaEnd: Ae,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function T1(e) {
  return new nh(e);
}
function ol(e) {
  return e < 0 ? -1 : 1;
}
function ll(e, t, r) {
  var i = e._x1 - e._x0, a = t - e._x1, n = (e._y1 - e._y0) / (i || a < 0 && -0), o = (r - e._y1) / (a || i < 0 && -0), s = (n * a + o * i) / (i + a);
  return (ol(n) + ol(o)) * Math.min(Math.abs(n), Math.abs(o), 0.5 * Math.abs(s)) || 0;
}
function cl(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function fn(e, t, r) {
  var i = e._x0, a = e._y0, n = e._x1, o = e._y1, s = (n - i) / 3;
  e._context.bezierCurveTo(i + s, a + s * t, n - s, o - s * r, n, o);
}
function fa(e) {
  this._context = e;
}
fa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        fn(this, this._t0, cl(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, fn(this, cl(this, r = ll(this, e, t)), r);
          break;
        default:
          fn(this, this._t0, r = ll(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function sh(e) {
  this._context = new oh(e);
}
(sh.prototype = Object.create(fa.prototype)).point = function(e, t) {
  fa.prototype.point.call(this, t, e);
};
function oh(e) {
  this._context = e;
}
oh.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, i, a, n) {
    this._context.bezierCurveTo(t, e, i, r, n, a);
  }
};
function lh(e) {
  return new fa(e);
}
function ch(e) {
  return new sh(e);
}
function hh(e) {
  this._context = e;
}
hh.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var i = hl(e), a = hl(t), n = 0, o = 1; o < r; ++n, ++o)
          this._context.bezierCurveTo(i[0][n], a[0][n], i[1][n], a[1][n], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function hl(e) {
  var t, r = e.length - 1, i, a = new Array(r), n = new Array(r), o = new Array(r);
  for (a[0] = 0, n[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, n[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, n[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) i = a[t] / n[t - 1], n[t] -= i, o[t] -= i * o[t - 1];
  for (a[r - 1] = o[r - 1] / n[r - 1], t = r - 2; t >= 0; --t) a[t] = (o[t] - a[t + 1]) / n[t];
  for (n[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) n[t] = 2 * e[t + 1] - a[t + 1];
  return [a, n];
}
function uh(e) {
  return new hh(e);
}
function Pa(e, t) {
  this._context = e, this._t = t;
}
Pa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function fh(e) {
  return new Pa(e, 0.5);
}
function dh(e) {
  return new Pa(e, 0);
}
function ph(e) {
  return new Pa(e, 1);
}
function Xr(e, t, r) {
  this.k = e, this.x = t, this.y = r;
}
Xr.prototype = {
  constructor: Xr,
  scale: function(e) {
    return e === 1 ? this : new Xr(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Xr(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Xr.prototype;
var B1 = /* @__PURE__ */ p((e) => {
  var a;
  const { securityLevel: t } = ft();
  let r = ht("body");
  if (t === "sandbox") {
    const o = ((a = ht(`#i${e}`).node()) == null ? void 0 : a.contentDocument) ?? document;
    r = ht(o.body);
  }
  return r.select(`#${e}`);
}, "selectSvgElement");
function Os(e) {
  return typeof e > "u" || e === null;
}
p(Os, "isNothing");
function gh(e) {
  return typeof e == "object" && e !== null;
}
p(gh, "isObject");
function mh(e) {
  return Array.isArray(e) ? e : Os(e) ? [] : [e];
}
p(mh, "toArray");
function yh(e, t) {
  var r, i, a, n;
  if (t)
    for (n = Object.keys(t), r = 0, i = n.length; r < i; r += 1)
      a = n[r], e[a] = t[a];
  return e;
}
p(yh, "extend");
function xh(e, t) {
  var r = "", i;
  for (i = 0; i < t; i += 1)
    r += e;
  return r;
}
p(xh, "repeat");
function bh(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
p(bh, "isNegativeZero");
var L1 = Os, M1 = gh, A1 = mh, E1 = xh, F1 = bh, $1 = yh, St = {
  isNothing: L1,
  isObject: M1,
  toArray: A1,
  repeat: E1,
  isNegativeZero: F1,
  extend: $1
};
function Is(e, t) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
p(Is, "formatError");
function Lr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Is(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
p(Lr, "YAMLException$1");
Lr.prototype = Object.create(Error.prototype);
Lr.prototype.constructor = Lr;
Lr.prototype.toString = /* @__PURE__ */ p(function(t) {
  return this.name + ": " + Is(this, t);
}, "toString");
var jt = Lr;
function Gi(e, t, r, i, a) {
  var n = "", o = "", s = Math.floor(a / 2) - 1;
  return i - t > s && (n = " ... ", t = i - s + n.length), r - i > s && (o = " ...", r = i + s - o.length), {
    str: n + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: i - t + n.length
    // relative position
  };
}
p(Gi, "getLine");
function Xi(e, t) {
  return St.repeat(" ", t - e.length) + e;
}
p(Xi, "padStart");
function Ch(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], a = [], n, o = -1; n = r.exec(e.buffer); )
    a.push(n.index), i.push(n.index + n[0].length), e.position <= n.index && o < 0 && (o = i.length - 2);
  o < 0 && (o = i.length - 1);
  var s = "", l, c, h = Math.min(e.line + t.linesAfter, a.length).toString().length, u = t.maxLength - (t.indent + h + 3);
  for (l = 1; l <= t.linesBefore && !(o - l < 0); l++)
    c = Gi(
      e.buffer,
      i[o - l],
      a[o - l],
      e.position - (i[o] - i[o - l]),
      u
    ), s = St.repeat(" ", t.indent) + Xi((e.line - l + 1).toString(), h) + " | " + c.str + `
` + s;
  for (c = Gi(e.buffer, i[o], a[o], e.position, u), s += St.repeat(" ", t.indent) + Xi((e.line + 1).toString(), h) + " | " + c.str + `
`, s += St.repeat("-", t.indent + h + 3 + c.pos) + `^
`, l = 1; l <= t.linesAfter && !(o + l >= a.length); l++)
    c = Gi(
      e.buffer,
      i[o + l],
      a[o + l],
      e.position - (i[o] - i[o + l]),
      u
    ), s += St.repeat(" ", t.indent) + Xi((e.line + l + 1).toString(), h) + " | " + c.str + `
`;
  return s.replace(/\n$/, "");
}
p(Ch, "makeSnippet");
var D1 = Ch, O1 = [
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
], I1 = [
  "scalar",
  "sequence",
  "mapping"
];
function _h(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      t[String(i)] = r;
    });
  }), t;
}
p(_h, "compileStyleAliases");
function vh(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (O1.indexOf(r) === -1)
      throw new jt('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = _h(t.styleAliases || null), I1.indexOf(this.kind) === -1)
    throw new jt('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
p(vh, "Type$1");
var Dt = vh;
function qn(e, t) {
  var r = [];
  return e[t].forEach(function(i) {
    var a = r.length;
    r.forEach(function(n, o) {
      n.tag === i.tag && n.kind === i.kind && n.multi === i.multi && (a = o);
    }), r[a] = i;
  }), r;
}
p(qn, "compileList");
function wh() {
  var e = {
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
  }, t, r;
  function i(a) {
    a.multi ? (e.multi[a.kind].push(a), e.multi.fallback.push(a)) : e[a.kind][a.tag] = e.fallback[a.tag] = a;
  }
  for (p(i, "collectType"), t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(i);
  return e;
}
p(wh, "compileMap");
function da(e) {
  return this.extend(e);
}
p(da, "Schema$1");
da.prototype.extend = /* @__PURE__ */ p(function(t) {
  var r = [], i = [];
  if (t instanceof Dt)
    i.push(t);
  else if (Array.isArray(t))
    i = i.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (i = i.concat(t.explicit));
  else
    throw new jt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(n) {
    if (!(n instanceof Dt))
      throw new jt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (n.loadKind && n.loadKind !== "scalar")
      throw new jt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (n.multi)
      throw new jt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(n) {
    if (!(n instanceof Dt))
      throw new jt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var a = Object.create(da.prototype);
  return a.implicit = (this.implicit || []).concat(r), a.explicit = (this.explicit || []).concat(i), a.compiledImplicit = qn(a, "implicit"), a.compiledExplicit = qn(a, "explicit"), a.compiledTypeMap = wh(a.compiledImplicit, a.compiledExplicit), a;
}, "extend");
var R1 = da, P1 = new Dt("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: /* @__PURE__ */ p(function(e) {
    return e !== null ? e : "";
  }, "construct")
}), N1 = new Dt("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: /* @__PURE__ */ p(function(e) {
    return e !== null ? e : [];
  }, "construct")
}), W1 = new Dt("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: /* @__PURE__ */ p(function(e) {
    return e !== null ? e : {};
  }, "construct")
}), z1 = new R1({
  explicit: [
    P1,
    N1,
    W1
  ]
});
function Sh(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
p(Sh, "resolveYamlNull");
function kh() {
  return null;
}
p(kh, "constructYamlNull");
function Th(e) {
  return e === null;
}
p(Th, "isNull");
var q1 = new Dt("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Sh,
  construct: kh,
  predicate: Th,
  represent: {
    canonical: /* @__PURE__ */ p(function() {
      return "~";
    }, "canonical"),
    lowercase: /* @__PURE__ */ p(function() {
      return "null";
    }, "lowercase"),
    uppercase: /* @__PURE__ */ p(function() {
      return "NULL";
    }, "uppercase"),
    camelcase: /* @__PURE__ */ p(function() {
      return "Null";
    }, "camelcase"),
    empty: /* @__PURE__ */ p(function() {
      return "";
    }, "empty")
  },
  defaultStyle: "lowercase"
});
function Bh(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
p(Bh, "resolveYamlBoolean");
function Lh(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
p(Lh, "constructYamlBoolean");
function Mh(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
p(Mh, "isBoolean");
var H1 = new Dt("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Bh,
  construct: Lh,
  predicate: Mh,
  represent: {
    lowercase: /* @__PURE__ */ p(function(e) {
      return e ? "true" : "false";
    }, "lowercase"),
    uppercase: /* @__PURE__ */ p(function(e) {
      return e ? "TRUE" : "FALSE";
    }, "uppercase"),
    camelcase: /* @__PURE__ */ p(function(e) {
      return e ? "True" : "False";
    }, "camelcase")
  },
  defaultStyle: "lowercase"
});
function Ah(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
p(Ah, "isHexCode");
function Eh(e) {
  return 48 <= e && e <= 55;
}
p(Eh, "isOctCode");
function Fh(e) {
  return 48 <= e && e <= 57;
}
p(Fh, "isDecCode");
function $h(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, i = !1, a;
  if (!t) return !1;
  if (a = e[r], (a === "-" || a === "+") && (a = e[++r]), a === "0") {
    if (r + 1 === t) return !0;
    if (a = e[++r], a === "b") {
      for (r++; r < t; r++)
        if (a = e[r], a !== "_") {
          if (a !== "0" && a !== "1") return !1;
          i = !0;
        }
      return i && a !== "_";
    }
    if (a === "x") {
      for (r++; r < t; r++)
        if (a = e[r], a !== "_") {
          if (!Ah(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && a !== "_";
    }
    if (a === "o") {
      for (r++; r < t; r++)
        if (a = e[r], a !== "_") {
          if (!Eh(e.charCodeAt(r))) return !1;
          i = !0;
        }
      return i && a !== "_";
    }
  }
  if (a === "_") return !1;
  for (; r < t; r++)
    if (a = e[r], a !== "_") {
      if (!Fh(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || a === "_");
}
p($h, "resolveYamlInteger");
function Dh(e) {
  var t = e, r = 1, i;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), i = t[0], (i === "-" || i === "+") && (i === "-" && (r = -1), t = t.slice(1), i = t[0]), t === "0") return 0;
  if (i === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
p(Dh, "constructYamlInteger");
function Oh(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !St.isNegativeZero(e);
}
p(Oh, "isInteger");
var Y1 = new Dt("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: $h,
  construct: Dh,
  predicate: Oh,
  represent: {
    binary: /* @__PURE__ */ p(function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    }, "binary"),
    octal: /* @__PURE__ */ p(function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    }, "octal"),
    decimal: /* @__PURE__ */ p(function(e) {
      return e.toString(10);
    }, "decimal"),
    /* eslint-disable max-len */
    hexadecimal: /* @__PURE__ */ p(function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }, "hexadecimal")
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), U1 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ih(e) {
  return !(e === null || !U1.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
p(Ih, "resolveYamlFloat");
function Rh(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
p(Rh, "constructYamlFloat");
var j1 = /^[-+]?[0-9]+e/;
function Ph(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (St.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), j1.test(r) ? r.replace("e", ".e") : r;
}
p(Ph, "representYamlFloat");
function Nh(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || St.isNegativeZero(e));
}
p(Nh, "isFloat");
var G1 = new Dt("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ih,
  construct: Rh,
  predicate: Nh,
  represent: Ph,
  defaultStyle: "lowercase"
}), Wh = z1.extend({
  implicit: [
    q1,
    H1,
    Y1,
    G1
  ]
}), X1 = Wh, zh = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), qh = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Hh(e) {
  return e === null ? !1 : zh.exec(e) !== null || qh.exec(e) !== null;
}
p(Hh, "resolveYamlTimestamp");
function Yh(e) {
  var t, r, i, a, n, o, s, l = 0, c = null, h, u, f;
  if (t = zh.exec(e), t === null && (t = qh.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], i = +t[2] - 1, a = +t[3], !t[4])
    return new Date(Date.UTC(r, i, a));
  if (n = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (h = +t[10], u = +(t[11] || 0), c = (h * 60 + u) * 6e4, t[9] === "-" && (c = -c)), f = new Date(Date.UTC(r, i, a, n, o, s, l)), c && f.setTime(f.getTime() - c), f;
}
p(Yh, "constructYamlTimestamp");
function Uh(e) {
  return e.toISOString();
}
p(Uh, "representYamlTimestamp");
var V1 = new Dt("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Hh,
  construct: Yh,
  instanceOf: Date,
  represent: Uh
});
function jh(e) {
  return e === "<<" || e === null;
}
p(jh, "resolveYamlMerge");
var K1 = new Dt("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: jh
}), Rs = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Gh(e) {
  if (e === null) return !1;
  var t, r, i = 0, a = e.length, n = Rs;
  for (r = 0; r < a; r++)
    if (t = n.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
p(Gh, "resolveYamlBinary");
function Xh(e) {
  var t, r, i = e.replace(/[\r\n=]/g, ""), a = i.length, n = Rs, o = 0, s = [];
  for (t = 0; t < a; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | n.indexOf(i.charAt(t));
  return r = a % 4 * 6, r === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : r === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : r === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
p(Xh, "constructYamlBinary");
function Vh(e) {
  var t = "", r = 0, i, a, n = e.length, o = Rs;
  for (i = 0; i < n; i++)
    i % 3 === 0 && i && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[i];
  return a = n % 3, a === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : a === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : a === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
p(Vh, "representYamlBinary");
function Kh(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
p(Kh, "isBinary");
var Z1 = new Dt("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Gh,
  construct: Xh,
  predicate: Kh,
  represent: Vh
}), Q1 = Object.prototype.hasOwnProperty, J1 = Object.prototype.toString;
function Zh(e) {
  if (e === null) return !0;
  var t = [], r, i, a, n, o, s = e;
  for (r = 0, i = s.length; r < i; r += 1) {
    if (a = s[r], o = !1, J1.call(a) !== "[object Object]") return !1;
    for (n in a)
      if (Q1.call(a, n))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(n) === -1) t.push(n);
    else return !1;
  }
  return !0;
}
p(Zh, "resolveYamlOmap");
function Qh(e) {
  return e !== null ? e : [];
}
p(Qh, "constructYamlOmap");
var t2 = new Dt("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Zh,
  construct: Qh
}), e2 = Object.prototype.toString;
function Jh(e) {
  if (e === null) return !0;
  var t, r, i, a, n, o = e;
  for (n = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (i = o[t], e2.call(i) !== "[object Object]" || (a = Object.keys(i), a.length !== 1)) return !1;
    n[t] = [a[0], i[a[0]]];
  }
  return !0;
}
p(Jh, "resolveYamlPairs");
function tu(e) {
  if (e === null) return [];
  var t, r, i, a, n, o = e;
  for (n = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    i = o[t], a = Object.keys(i), n[t] = [a[0], i[a[0]]];
  return n;
}
p(tu, "constructYamlPairs");
var r2 = new Dt("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Jh,
  construct: tu
}), i2 = Object.prototype.hasOwnProperty;
function eu(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (i2.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
p(eu, "resolveYamlSet");
function ru(e) {
  return e !== null ? e : {};
}
p(ru, "constructYamlSet");
var a2 = new Dt("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: eu,
  construct: ru
}), iu = X1.extend({
  implicit: [
    V1,
    K1
  ],
  explicit: [
    Z1,
    t2,
    r2,
    a2
  ]
}), Ee = Object.prototype.hasOwnProperty, pa = 1, au = 2, nu = 3, ga = 4, dn = 1, n2 = 2, ul = 3, s2 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, o2 = /[\x85\u2028\u2029]/, l2 = /[,\[\]\{\}]/, su = /^(?:!|!!|![a-z\-]+!)$/i, ou = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Hn(e) {
  return Object.prototype.toString.call(e);
}
p(Hn, "_class");
function ae(e) {
  return e === 10 || e === 13;
}
p(ae, "is_EOL");
function Me(e) {
  return e === 9 || e === 32;
}
p(Me, "is_WHITE_SPACE");
function Wt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
p(Wt, "is_WS_OR_EOL");
function Ye(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
p(Ye, "is_FLOW_INDICATOR");
function lu(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
p(lu, "fromHexCode");
function cu(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
p(cu, "escapedHexLen");
function hu(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
p(hu, "fromDecimalCode");
function Yn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
p(Yn, "simpleEscapeSequence");
function uu(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
p(uu, "charFromCodepoint");
var fu = new Array(256), du = new Array(256);
for (Ne = 0; Ne < 256; Ne++)
  fu[Ne] = Yn(Ne) ? 1 : 0, du[Ne] = Yn(Ne);
var Ne;
function pu(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || iu, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
p(pu, "State$1");
function Ps(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = D1(r), new jt(t, r);
}
p(Ps, "generateError");
function Z(e, t) {
  throw Ps(e, t);
}
p(Z, "throwError");
function li(e, t) {
  e.onWarning && e.onWarning.call(null, Ps(e, t));
}
p(li, "throwWarning");
var fl = {
  YAML: /* @__PURE__ */ p(function(t, r, i) {
    var a, n, o;
    t.version !== null && Z(t, "duplication of %YAML directive"), i.length !== 1 && Z(t, "YAML directive accepts exactly one argument"), a = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), a === null && Z(t, "ill-formed argument of the YAML directive"), n = parseInt(a[1], 10), o = parseInt(a[2], 10), n !== 1 && Z(t, "unacceptable YAML version of the document"), t.version = i[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && li(t, "unsupported YAML version of the document");
  }, "handleYamlDirective"),
  TAG: /* @__PURE__ */ p(function(t, r, i) {
    var a, n;
    i.length !== 2 && Z(t, "TAG directive accepts exactly two arguments"), a = i[0], n = i[1], su.test(a) || Z(t, "ill-formed tag handle (first argument) of the TAG directive"), Ee.call(t.tagMap, a) && Z(t, 'there is a previously declared suffix for "' + a + '" tag handle'), ou.test(n) || Z(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      n = decodeURIComponent(n);
    } catch {
      Z(t, "tag prefix is malformed: " + n);
    }
    t.tagMap[a] = n;
  }, "handleTagDirective")
};
function we(e, t, r, i) {
  var a, n, o, s;
  if (t < r) {
    if (s = e.input.slice(t, r), i)
      for (a = 0, n = s.length; a < n; a += 1)
        o = s.charCodeAt(a), o === 9 || 32 <= o && o <= 1114111 || Z(e, "expected valid JSON character");
    else s2.test(s) && Z(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
p(we, "captureSegment");
function Un(e, t, r, i) {
  var a, n, o, s;
  for (St.isObject(r) || Z(e, "cannot merge mappings; the provided source object is unacceptable"), a = Object.keys(r), o = 0, s = a.length; o < s; o += 1)
    n = a[o], Ee.call(t, n) || (t[n] = r[n], i[n] = !0);
}
p(Un, "mergeMappings");
function Ue(e, t, r, i, a, n, o, s, l) {
  var c, h;
  if (Array.isArray(a))
    for (a = Array.prototype.slice.call(a), c = 0, h = a.length; c < h; c += 1)
      Array.isArray(a[c]) && Z(e, "nested arrays are not supported inside keys"), typeof a == "object" && Hn(a[c]) === "[object Object]" && (a[c] = "[object Object]");
  if (typeof a == "object" && Hn(a) === "[object Object]" && (a = "[object Object]"), a = String(a), t === null && (t = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(n))
      for (c = 0, h = n.length; c < h; c += 1)
        Un(e, t, n[c], r);
    else
      Un(e, t, n, r);
  else
    !e.json && !Ee.call(r, a) && Ee.call(t, a) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, Z(e, "duplicated mapping key")), a === "__proto__" ? Object.defineProperty(t, a, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: n
    }) : t[a] = n, delete r[a];
  return t;
}
p(Ue, "storeMappingPair");
function Na(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : Z(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
p(Na, "readLineBreak");
function bt(e, t, r) {
  for (var i = 0, a = e.input.charCodeAt(e.position); a !== 0; ) {
    for (; Me(a); )
      a === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), a = e.input.charCodeAt(++e.position);
    if (t && a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (a !== 10 && a !== 13 && a !== 0);
    if (ae(a))
      for (Na(e), a = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; a === 32; )
        e.lineIndent++, a = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && li(e, "deficient indentation"), i;
}
p(bt, "skipSeparationSpace");
function Ci(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Wt(r)));
}
p(Ci, "testDocumentSeparator");
function Wa(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += St.repeat(`
`, t - 1));
}
p(Wa, "writeFoldedLines");
function gu(e, t, r) {
  var i, a, n, o, s, l, c, h, u = e.kind, f = e.result, d;
  if (d = e.input.charCodeAt(e.position), Wt(d) || Ye(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (a = e.input.charCodeAt(e.position + 1), Wt(a) || r && Ye(a)))
    return !1;
  for (e.kind = "scalar", e.result = "", n = o = e.position, s = !1; d !== 0; ) {
    if (d === 58) {
      if (a = e.input.charCodeAt(e.position + 1), Wt(a) || r && Ye(a))
        break;
    } else if (d === 35) {
      if (i = e.input.charCodeAt(e.position - 1), Wt(i))
        break;
    } else {
      if (e.position === e.lineStart && Ci(e) || r && Ye(d))
        break;
      if (ae(d))
        if (l = e.line, c = e.lineStart, h = e.lineIndent, bt(e, !1, -1), e.lineIndent >= t) {
          s = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = l, e.lineStart = c, e.lineIndent = h;
          break;
        }
    }
    s && (we(e, n, o, !1), Wa(e, e.line - l), n = o = e.position, s = !1), Me(d) || (o = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return we(e, n, o, !1), e.result ? !0 : (e.kind = u, e.result = f, !1);
}
p(gu, "readPlainScalar");
function mu(e, t) {
  var r, i, a;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = a = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (we(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, a = e.position;
      else
        return !0;
    else ae(r) ? (we(e, i, a, !0), Wa(e, bt(e, !1, t)), i = a = e.position) : e.position === e.lineStart && Ci(e) ? Z(e, "unexpected end of the document within a single quoted scalar") : (e.position++, a = e.position);
  Z(e, "unexpected end of the stream within a single quoted scalar");
}
p(mu, "readSingleQuotedScalar");
function yu(e, t) {
  var r, i, a, n, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return we(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (we(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), ae(s))
        bt(e, !1, t);
      else if (s < 256 && fu[s])
        e.result += du[s], e.position++;
      else if ((o = cu(s)) > 0) {
        for (a = o, n = 0; a > 0; a--)
          s = e.input.charCodeAt(++e.position), (o = lu(s)) >= 0 ? n = (n << 4) + o : Z(e, "expected hexadecimal character");
        e.result += uu(n), e.position++;
      } else
        Z(e, "unknown escape sequence");
      r = i = e.position;
    } else ae(s) ? (we(e, r, i, !0), Wa(e, bt(e, !1, t)), r = i = e.position) : e.position === e.lineStart && Ci(e) ? Z(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  Z(e, "unexpected end of the stream within a double quoted scalar");
}
p(yu, "readDoubleQuotedScalar");
function xu(e, t) {
  var r = !0, i, a, n, o = e.tag, s, l = e.anchor, c, h, u, f, d, g = /* @__PURE__ */ Object.create(null), m, y, x, b;
  if (b = e.input.charCodeAt(e.position), b === 91)
    h = 93, d = !1, s = [];
  else if (b === 123)
    h = 125, d = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (bt(e, !0, t), b = e.input.charCodeAt(e.position), b === h)
      return e.position++, e.tag = o, e.anchor = l, e.kind = d ? "mapping" : "sequence", e.result = s, !0;
    r ? b === 44 && Z(e, "expected the node content, but found ','") : Z(e, "missed comma between flow collection entries"), y = m = x = null, u = f = !1, b === 63 && (c = e.input.charCodeAt(e.position + 1), Wt(c) && (u = f = !0, e.position++, bt(e, !0, t))), i = e.line, a = e.lineStart, n = e.position, Je(e, t, pa, !1, !0), y = e.tag, m = e.result, bt(e, !0, t), b = e.input.charCodeAt(e.position), (f || e.line === i) && b === 58 && (u = !0, b = e.input.charCodeAt(++e.position), bt(e, !0, t), Je(e, t, pa, !1, !0), x = e.result), d ? Ue(e, s, g, y, m, x, i, a, n) : u ? s.push(Ue(e, null, g, y, m, x, i, a, n)) : s.push(m), bt(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (r = !0, b = e.input.charCodeAt(++e.position)) : r = !1;
  }
  Z(e, "unexpected end of the stream within a flow collection");
}
p(xu, "readFlowCollection");
function bu(e, t) {
  var r, i, a = dn, n = !1, o = !1, s = t, l = 0, c = !1, h, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    i = !1;
  else if (u === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      dn === a ? a = u === 43 ? ul : n2 : Z(e, "repeat of a chomping mode identifier");
    else if ((h = hu(u)) >= 0)
      h === 0 ? Z(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? Z(e, "repeat of an indentation width identifier") : (s = t + h - 1, o = !0);
    else
      break;
  if (Me(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (Me(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!ae(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Na(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), ae(u)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      a === ul ? e.result += St.repeat(`
`, n ? 1 + l : l) : a === dn && n && (e.result += `
`);
      break;
    }
    for (i ? Me(u) ? (c = !0, e.result += St.repeat(`
`, n ? 1 + l : l)) : c ? (c = !1, e.result += St.repeat(`
`, l + 1)) : l === 0 ? n && (e.result += " ") : e.result += St.repeat(`
`, l) : e.result += St.repeat(`
`, n ? 1 + l : l), n = !0, o = !0, l = 0, r = e.position; !ae(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    we(e, r, e.position, !1);
  }
  return !0;
}
p(bu, "readBlockScalar");
function jn(e, t) {
  var r, i = e.tag, a = e.anchor, n = [], o, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = n), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), !(l !== 45 || (o = e.input.charCodeAt(e.position + 1), !Wt(o)))); ) {
    if (s = !0, e.position++, bt(e, !0, -1) && e.lineIndent <= t) {
      n.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Je(e, t, nu, !1, !0), n.push(e.result), bt(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      Z(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = i, e.anchor = a, e.kind = "sequence", e.result = n, !0) : !1;
}
p(jn, "readBlockSequence");
function Cu(e, t, r) {
  var i, a, n, o, s, l, c = e.tag, h = e.anchor, u = {}, f = /* @__PURE__ */ Object.create(null), d = null, g = null, m = null, y = !1, x = !1, b;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), b = e.input.charCodeAt(e.position); b !== 0; ) {
    if (!y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), n = e.line, (b === 63 || b === 58) && Wt(i))
      b === 63 ? (y && (Ue(e, u, f, d, g, null, o, s, l), d = g = m = null), x = !0, y = !0, a = !0) : y ? (y = !1, a = !0) : Z(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, b = i;
    else {
      if (o = e.line, s = e.lineStart, l = e.position, !Je(e, r, au, !1, !0))
        break;
      if (e.line === n) {
        for (b = e.input.charCodeAt(e.position); Me(b); )
          b = e.input.charCodeAt(++e.position);
        if (b === 58)
          b = e.input.charCodeAt(++e.position), Wt(b) || Z(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (Ue(e, u, f, d, g, null, o, s, l), d = g = m = null), x = !0, y = !1, a = !1, d = e.tag, g = e.result;
        else if (x)
          Z(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = h, !0;
      } else if (x)
        Z(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = h, !0;
    }
    if ((e.line === n || e.lineIndent > t) && (y && (o = e.line, s = e.lineStart, l = e.position), Je(e, t, ga, !0, a) && (y ? g = e.result : m = e.result), y || (Ue(e, u, f, d, g, m, o, s, l), d = g = m = null), bt(e, !0, -1), b = e.input.charCodeAt(e.position)), (e.line === n || e.lineIndent > t) && b !== 0)
      Z(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return y && Ue(e, u, f, d, g, null, o, s, l), x && (e.tag = c, e.anchor = h, e.kind = "mapping", e.result = u), x;
}
p(Cu, "readBlockMapping");
function _u(e) {
  var t, r = !1, i = !1, a, n, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && Z(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (i = !0, a = "!!", o = e.input.charCodeAt(++e.position)) : a = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (n = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : Z(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Wt(o); )
      o === 33 && (i ? Z(e, "tag suffix cannot contain exclamation marks") : (a = e.input.slice(t - 1, e.position + 1), su.test(a) || Z(e, "named tag handle cannot contain such characters"), i = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    n = e.input.slice(t, e.position), l2.test(n) && Z(e, "tag suffix cannot contain flow indicator characters");
  }
  n && !ou.test(n) && Z(e, "tag name cannot contain such characters: " + n);
  try {
    n = decodeURIComponent(n);
  } catch {
    Z(e, "tag name is malformed: " + n);
  }
  return r ? e.tag = n : Ee.call(e.tagMap, a) ? e.tag = e.tagMap[a] + n : a === "!" ? e.tag = "!" + n : a === "!!" ? e.tag = "tag:yaml.org,2002:" + n : Z(e, 'undeclared tag handle "' + a + '"'), !0;
}
p(_u, "readTagProperty");
function vu(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && Z(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Wt(r) && !Ye(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
p(vu, "readAnchorProperty");
function wu(e) {
  var t, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), t = e.position; i !== 0 && !Wt(i) && !Ye(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Ee.call(e.anchorMap, r) || Z(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], bt(e, !0, -1), !0;
}
p(wu, "readAlias");
function Je(e, t, r, i, a) {
  var n, o, s, l = 1, c = !1, h = !1, u, f, d, g, m, y;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, n = o = s = ga === r || nu === r, i && bt(e, !0, -1) && (c = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; _u(e) || vu(e); )
      bt(e, !0, -1) ? (c = !0, s = n, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = c || a), (l === 1 || ga === r) && (pa === r || au === r ? m = t : m = t + 1, y = e.position - e.lineStart, l === 1 ? s && (jn(e, y) || Cu(e, y, m)) || xu(e, m) ? h = !0 : (o && bu(e, m) || mu(e, m) || yu(e, m) ? h = !0 : wu(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && Z(e, "alias node should not have any properties")) : gu(e, m, pa === r) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (h = s && jn(e, y))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && Z(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, f = e.implicitTypes.length; u < f; u += 1)
      if (g = e.implicitTypes[u], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Ee.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, d = e.typeMap.multi[e.kind || "fallback"], u = 0, f = d.length; u < f; u += 1)
        if (e.tag.slice(0, d[u].tag.length) === d[u].tag) {
          g = d[u];
          break;
        }
    g || Z(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && Z(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : Z(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || h;
}
p(Je, "composeNode");
function Su(e) {
  var t = e.position, r, i, a, n = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (bt(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (n = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !Wt(o); )
      o = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), a = [], i.length < 1 && Z(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; Me(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !ae(o));
        break;
      }
      if (ae(o)) break;
      for (r = e.position; o !== 0 && !Wt(o); )
        o = e.input.charCodeAt(++e.position);
      a.push(e.input.slice(r, e.position));
    }
    o !== 0 && Na(e), Ee.call(fl, i) ? fl[i](e, i, a) : li(e, 'unknown document directive "' + i + '"');
  }
  if (bt(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, bt(e, !0, -1)) : n && Z(e, "directives end mark is expected"), Je(e, e.lineIndent - 1, ga, !1, !0), bt(e, !0, -1), e.checkLineBreaks && o2.test(e.input.slice(t, e.position)) && li(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ci(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, bt(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    Z(e, "end of the stream or a document separator is expected");
  else
    return;
}
p(Su, "readDocument");
function Ns(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new pu(e, t), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, Z(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Su(r);
  return r.documents;
}
p(Ns, "loadDocuments");
function c2(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var i = Ns(e, r);
  if (typeof t != "function")
    return i;
  for (var a = 0, n = i.length; a < n; a += 1)
    t(i[a]);
}
p(c2, "loadAll$1");
function ku(e, t) {
  var r = Ns(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new jt("expected a single document in the stream, but found more");
  }
}
p(ku, "load$1");
var h2 = ku, u2 = {
  load: h2
}, Tu = Object.prototype.toString, Bu = Object.prototype.hasOwnProperty, Ws = 65279, f2 = 9, ci = 10, d2 = 13, p2 = 32, g2 = 33, m2 = 34, Gn = 35, y2 = 37, x2 = 38, b2 = 39, C2 = 42, Lu = 44, _2 = 45, ma = 58, v2 = 61, w2 = 62, S2 = 63, k2 = 64, Mu = 91, Au = 93, T2 = 96, Eu = 123, B2 = 124, Fu = 125, It = {};
It[0] = "\\0";
It[7] = "\\a";
It[8] = "\\b";
It[9] = "\\t";
It[10] = "\\n";
It[11] = "\\v";
It[12] = "\\f";
It[13] = "\\r";
It[27] = "\\e";
It[34] = '\\"';
It[92] = "\\\\";
It[133] = "\\N";
It[160] = "\\_";
It[8232] = "\\L";
It[8233] = "\\P";
var L2 = [
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
], M2 = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function $u(e, t) {
  var r, i, a, n, o, s, l;
  if (t === null) return {};
  for (r = {}, i = Object.keys(t), a = 0, n = i.length; a < n; a += 1)
    o = i[a], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), l = e.compiledTypeMap.fallback[o], l && Bu.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[o] = s;
  return r;
}
p($u, "compileStyleMap");
function Du(e) {
  var t, r, i;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new jt("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + St.repeat("0", i - t.length) + t;
}
p(Du, "encodeHex");
var A2 = 1, hi = 2;
function Ou(e) {
  this.schema = e.schema || iu, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = St.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = $u(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? hi : A2, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
p(Ou, "State");
function Xn(e, t) {
  for (var r = St.repeat(" ", t), i = 0, a = -1, n = "", o, s = e.length; i < s; )
    a = e.indexOf(`
`, i), a === -1 ? (o = e.slice(i), i = s) : (o = e.slice(i, a + 1), i = a + 1), o.length && o !== `
` && (n += r), n += o;
  return n;
}
p(Xn, "indentString");
function ya(e, t) {
  return `
` + St.repeat(" ", e.indent * t);
}
p(ya, "generateNextLine");
function Iu(e, t) {
  var r, i, a;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (a = e.implicitTypes[r], a.resolve(t))
      return !0;
  return !1;
}
p(Iu, "testImplicitResolving");
function ui(e) {
  return e === p2 || e === f2;
}
p(ui, "isWhitespace");
function Mr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ws || 65536 <= e && e <= 1114111;
}
p(Mr, "isPrintable");
function Vn(e) {
  return Mr(e) && e !== Ws && e !== d2 && e !== ci;
}
p(Vn, "isNsCharOrWhitespace");
function Kn(e, t, r) {
  var i = Vn(e), a = i && !ui(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== Lu && e !== Mu && e !== Au && e !== Eu && e !== Fu) && e !== Gn && !(t === ma && !a) || Vn(t) && !ui(t) && e === Gn || t === ma && a
  );
}
p(Kn, "isPlainSafe");
function Ru(e) {
  return Mr(e) && e !== Ws && !ui(e) && e !== _2 && e !== S2 && e !== ma && e !== Lu && e !== Mu && e !== Au && e !== Eu && e !== Fu && e !== Gn && e !== x2 && e !== C2 && e !== g2 && e !== B2 && e !== v2 && e !== w2 && e !== b2 && e !== m2 && e !== y2 && e !== k2 && e !== T2;
}
p(Ru, "isPlainSafeFirst");
function Pu(e) {
  return !ui(e) && e !== ma;
}
p(Pu, "isPlainSafeLast");
function fr(e, t) {
  var r = e.charCodeAt(t), i;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (i = e.charCodeAt(t + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
p(fr, "codePointAt");
function zs(e) {
  var t = /^\n* /;
  return t.test(e);
}
p(zs, "needIndentIndicator");
var Nu = 1, Zn = 2, Wu = 3, zu = 4, hr = 5;
function qu(e, t, r, i, a, n, o, s) {
  var l, c = 0, h = null, u = !1, f = !1, d = i !== -1, g = -1, m = Ru(fr(e, 0)) && Pu(fr(e, e.length - 1));
  if (t || o)
    for (l = 0; l < e.length; c >= 65536 ? l += 2 : l++) {
      if (c = fr(e, l), !Mr(c))
        return hr;
      m = m && Kn(c, h, s), h = c;
    }
  else {
    for (l = 0; l < e.length; c >= 65536 ? l += 2 : l++) {
      if (c = fr(e, l), c === ci)
        u = !0, d && (f = f || // Foldable line = too long, and not more-indented.
        l - g - 1 > i && e[g + 1] !== " ", g = l);
      else if (!Mr(c))
        return hr;
      m = m && Kn(c, h, s), h = c;
    }
    f = f || d && l - g - 1 > i && e[g + 1] !== " ";
  }
  return !u && !f ? m && !o && !a(e) ? Nu : n === hi ? hr : Zn : r > 9 && zs(e) ? hr : o ? n === hi ? hr : Zn : f ? zu : Wu;
}
p(qu, "chooseScalarStyle");
function Hu(e, t, r, i, a) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === hi ? '""' : "''";
    if (!e.noCompatMode && (L2.indexOf(t) !== -1 || M2.test(t)))
      return e.quotingType === hi ? '"' + t + '"' : "'" + t + "'";
    var n = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - n), s = i || e.flowLevel > -1 && r >= e.flowLevel;
    function l(c) {
      return Iu(e, c);
    }
    switch (p(l, "testAmbiguity"), qu(
      t,
      s,
      e.indent,
      o,
      l,
      e.quotingType,
      e.forceQuotes && !i,
      a
    )) {
      case Nu:
        return t;
      case Zn:
        return "'" + t.replace(/'/g, "''") + "'";
      case Wu:
        return "|" + Qn(t, e.indent) + Jn(Xn(t, n));
      case zu:
        return ">" + Qn(t, e.indent) + Jn(Xn(Yu(t, o), n));
      case hr:
        return '"' + Uu(t) + '"';
      default:
        throw new jt("impossible error: invalid scalar style");
    }
  }();
}
p(Hu, "writeScalar");
function Qn(e, t) {
  var r = zs(e) ? String(t) : "", i = e[e.length - 1] === `
`, a = i && (e[e.length - 2] === `
` || e === `
`), n = a ? "+" : i ? "" : "-";
  return r + n + `
`;
}
p(Qn, "blockHeader");
function Jn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
p(Jn, "dropEndingNewline");
function Yu(e, t) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, r.lastIndex = c, ts(e.slice(0, c), t);
  }(), a = e[0] === `
` || e[0] === " ", n, o; o = r.exec(e); ) {
    var s = o[1], l = o[2];
    n = l[0] === " ", i += s + (!a && !n && l !== "" ? `
` : "") + ts(l, t), a = n;
  }
  return i;
}
p(Yu, "foldString");
function ts(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, i, a = 0, n, o = 0, s = 0, l = ""; i = r.exec(e); )
    s = i.index, s - a > t && (n = o > a ? o : s, l += `
` + e.slice(a, n), a = n + 1), o = s;
  return l += `
`, e.length - a > t && o > a ? l += e.slice(a, o) + `
` + e.slice(o + 1) : l += e.slice(a), l.slice(1);
}
p(ts, "foldLine");
function Uu(e) {
  for (var t = "", r = 0, i, a = 0; a < e.length; r >= 65536 ? a += 2 : a++)
    r = fr(e, a), i = It[r], !i && Mr(r) ? (t += e[a], r >= 65536 && (t += e[a + 1])) : t += i || Du(r);
  return t;
}
p(Uu, "escapeString");
function ju(e, t, r) {
  var i = "", a = e.tag, n, o, s;
  for (n = 0, o = r.length; n < o; n += 1)
    s = r[n], e.replacer && (s = e.replacer.call(r, String(n), s)), (fe(e, t, s, !1, !1) || typeof s > "u" && fe(e, t, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = a, e.dump = "[" + i + "]";
}
p(ju, "writeFlowSequence");
function es(e, t, r, i) {
  var a = "", n = e.tag, o, s, l;
  for (o = 0, s = r.length; o < s; o += 1)
    l = r[o], e.replacer && (l = e.replacer.call(r, String(o), l)), (fe(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && fe(e, t + 1, null, !0, !0, !1, !0)) && ((!i || a !== "") && (a += ya(e, t)), e.dump && ci === e.dump.charCodeAt(0) ? a += "-" : a += "- ", a += e.dump);
  e.tag = n, e.dump = a || "[]";
}
p(es, "writeBlockSequence");
function Gu(e, t, r) {
  var i = "", a = e.tag, n = Object.keys(r), o, s, l, c, h;
  for (o = 0, s = n.length; o < s; o += 1)
    h = "", i !== "" && (h += ", "), e.condenseFlow && (h += '"'), l = n[o], c = r[l], e.replacer && (c = e.replacer.call(r, l, c)), fe(e, t, l, !1, !1) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), fe(e, t, c, !1, !1) && (h += e.dump, i += h));
  e.tag = a, e.dump = "{" + i + "}";
}
p(Gu, "writeFlowMapping");
function Xu(e, t, r, i) {
  var a = "", n = e.tag, o = Object.keys(r), s, l, c, h, u, f;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new jt("sortKeys must be a boolean or a function");
  for (s = 0, l = o.length; s < l; s += 1)
    f = "", (!i || a !== "") && (f += ya(e, t)), c = o[s], h = r[c], e.replacer && (h = e.replacer.call(r, c, h)), fe(e, t + 1, c, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && ci === e.dump.charCodeAt(0) ? f += "?" : f += "? "), f += e.dump, u && (f += ya(e, t)), fe(e, t + 1, h, !0, u) && (e.dump && ci === e.dump.charCodeAt(0) ? f += ":" : f += ": ", f += e.dump, a += f));
  e.tag = n, e.dump = a || "{}";
}
p(Xu, "writeBlockMapping");
function rs(e, t, r) {
  var i, a, n, o, s, l;
  for (a = r ? e.explicitTypes : e.implicitTypes, n = 0, o = a.length; n < o; n += 1)
    if (s = a[n], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, Tu.call(s.represent) === "[object Function]")
          i = s.represent(t, l);
        else if (Bu.call(s.represent, l))
          i = s.represent[l](t, l);
        else
          throw new jt("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
p(rs, "detectType");
function fe(e, t, r, i, a, n, o) {
  e.tag = null, e.dump = r, rs(e, r, !1) || rs(e, r, !0);
  var s = Tu.call(e.dump), l = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > t);
  var h = s === "[object Object]" || s === "[object Array]", u, f;
  if (h && (u = e.duplicates.indexOf(r), f = u !== -1), (e.tag !== null && e.tag !== "?" || f || e.indent !== 2 && t > 0) && (a = !1), f && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (h && f && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (Xu(e, t, e.dump, a), f && (e.dump = "&ref_" + u + e.dump)) : (Gu(e, t, e.dump), f && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? es(e, t - 1, e.dump, a) : es(e, t, e.dump, a), f && (e.dump = "&ref_" + u + e.dump)) : (ju(e, t, e.dump), f && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && Hu(e, e.dump, t, n, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new jt("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
p(fe, "writeNode");
function Vu(e, t) {
  var r = [], i = [], a, n;
  for (xa(e, r, i), a = 0, n = i.length; a < n; a += 1)
    t.duplicates.push(r[i[a]]);
  t.usedDuplicates = new Array(n);
}
p(Vu, "getDuplicateReferences");
function xa(e, t, r) {
  var i, a, n;
  if (e !== null && typeof e == "object")
    if (a = t.indexOf(e), a !== -1)
      r.indexOf(a) === -1 && r.push(a);
    else if (t.push(e), Array.isArray(e))
      for (a = 0, n = e.length; a < n; a += 1)
        xa(e[a], t, r);
    else
      for (i = Object.keys(e), a = 0, n = i.length; a < n; a += 1)
        xa(e[i[a]], t, r);
}
p(xa, "inspectNode");
function E2(e, t) {
  t = t || {};
  var r = new Ou(t);
  r.noRefs || Vu(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), fe(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
p(E2, "dump$1");
function F2(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
p(F2, "renamed");
var $2 = Wh, D2 = u2.load;
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
var Ft = {
  aggregation: 17.25,
  extension: 17.25,
  composition: 17.25,
  dependency: 6,
  lollipop: 13.5,
  arrow_point: 4
  //arrow_cross: 24,
}, dl = {
  arrow_point: 9,
  arrow_cross: 12.5,
  arrow_circle: 12.5
};
function Vr(e, t) {
  if (e === void 0 || t === void 0)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  e = yt(e), t = yt(t);
  const [r, i] = [e.x, e.y], [a, n] = [t.x, t.y], o = a - r, s = n - i;
  return { angle: Math.atan(s / o), deltaX: o, deltaY: s };
}
p(Vr, "calculateDeltaAndAngle");
var yt = /* @__PURE__ */ p((e) => Array.isArray(e) ? { x: e[0], y: e[1] } : e, "pointTransformer"), O2 = /* @__PURE__ */ p((e) => ({
  x: /* @__PURE__ */ p(function(t, r, i) {
    let a = 0;
    const n = yt(i[0]).x < yt(i[i.length - 1]).x ? "left" : "right";
    if (r === 0 && Object.hasOwn(Ft, e.arrowTypeStart)) {
      const { angle: d, deltaX: g } = Vr(i[0], i[1]);
      a = Ft[e.arrowTypeStart] * Math.cos(d) * (g >= 0 ? 1 : -1);
    } else if (r === i.length - 1 && Object.hasOwn(Ft, e.arrowTypeEnd)) {
      const { angle: d, deltaX: g } = Vr(
        i[i.length - 1],
        i[i.length - 2]
      );
      a = Ft[e.arrowTypeEnd] * Math.cos(d) * (g >= 0 ? 1 : -1);
    }
    const o = Math.abs(
      yt(t).x - yt(i[i.length - 1]).x
    ), s = Math.abs(
      yt(t).y - yt(i[i.length - 1]).y
    ), l = Math.abs(yt(t).x - yt(i[0]).x), c = Math.abs(yt(t).y - yt(i[0]).y), h = Ft[e.arrowTypeStart], u = Ft[e.arrowTypeEnd], f = 1;
    if (o < u && o > 0 && s < u) {
      let d = u + f - o;
      d *= n === "right" ? -1 : 1, a -= d;
    }
    if (l < h && l > 0 && c < h) {
      let d = h + f - l;
      d *= n === "right" ? -1 : 1, a += d;
    }
    return yt(t).x + a;
  }, "x"),
  y: /* @__PURE__ */ p(function(t, r, i) {
    let a = 0;
    const n = yt(i[0]).y < yt(i[i.length - 1]).y ? "down" : "up";
    if (r === 0 && Object.hasOwn(Ft, e.arrowTypeStart)) {
      const { angle: d, deltaY: g } = Vr(i[0], i[1]);
      a = Ft[e.arrowTypeStart] * Math.abs(Math.sin(d)) * (g >= 0 ? 1 : -1);
    } else if (r === i.length - 1 && Object.hasOwn(Ft, e.arrowTypeEnd)) {
      const { angle: d, deltaY: g } = Vr(
        i[i.length - 1],
        i[i.length - 2]
      );
      a = Ft[e.arrowTypeEnd] * Math.abs(Math.sin(d)) * (g >= 0 ? 1 : -1);
    }
    const o = Math.abs(
      yt(t).y - yt(i[i.length - 1]).y
    ), s = Math.abs(
      yt(t).x - yt(i[i.length - 1]).x
    ), l = Math.abs(yt(t).y - yt(i[0]).y), c = Math.abs(yt(t).x - yt(i[0]).x), h = Ft[e.arrowTypeStart], u = Ft[e.arrowTypeEnd], f = 1;
    if (o < u && o > 0 && s < u) {
      let d = u + f - o;
      d *= n === "up" ? -1 : 1, a -= d;
    }
    if (l < h && l > 0 && c < h) {
      let d = h + f - l;
      d *= n === "up" ? -1 : 1, a += d;
    }
    return yt(t).y + a;
  }, "y")
}), "getLineFunctionsWithOffset"), qs = /* @__PURE__ */ p(({
  flowchart: e
}) => {
  var a, n;
  const t = ((a = e == null ? void 0 : e.subGraphTitleMargin) == null ? void 0 : a.top) ?? 0, r = ((n = e == null ? void 0 : e.subGraphTitleMargin) == null ? void 0 : n.bottom) ?? 0, i = t + r;
  return {
    subGraphTitleTopMargin: t,
    subGraphTitleBottomMargin: r,
    subGraphTitleTotalMargin: i
  };
}, "getSubGraphTitleMargins"), I2 = /* @__PURE__ */ p((e) => {
  const { handDrawnSeed: t } = ft();
  return {
    fill: e,
    hachureAngle: 120,
    // angle of hachure,
    hachureGap: 4,
    fillWeight: 2,
    roughness: 0.7,
    stroke: e,
    seed: t
  };
}, "solidStateFill"), Fr = /* @__PURE__ */ p((e) => {
  const t = R2([
    ...e.cssCompiledStyles || [],
    ...e.cssStyles || [],
    ...e.labelStyle || []
  ]);
  return { stylesMap: t, stylesArray: [...t] };
}, "compileStyles"), R2 = /* @__PURE__ */ p((e) => {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    const [i, a] = r.split(":");
    t.set(i.trim(), a == null ? void 0 : a.trim());
  }), t;
}, "styles2Map"), Ku = /* @__PURE__ */ p((e) => e === "color" || e === "font-size" || e === "font-family" || e === "font-weight" || e === "font-style" || e === "text-decoration" || e === "text-align" || e === "text-transform" || e === "line-height" || e === "letter-spacing" || e === "word-spacing" || e === "text-shadow" || e === "text-overflow" || e === "white-space" || e === "word-wrap" || e === "word-break" || e === "overflow-wrap" || e === "hyphens", "isLabelStyle"), G = /* @__PURE__ */ p((e) => {
  const { stylesArray: t } = Fr(e), r = [], i = [], a = [], n = [];
  return t.forEach((o) => {
    const s = o[0];
    Ku(s) ? r.push(o.join(":") + " !important") : (i.push(o.join(":") + " !important"), s.includes("stroke") && a.push(o.join(":") + " !important"), s === "fill" && n.push(o.join(":") + " !important"));
  }), {
    labelStyles: r.join(";"),
    nodeStyles: i.join(";"),
    stylesArray: t,
    borderStyles: a,
    backgroundStyles: n
  };
}, "styles2String"), j = /* @__PURE__ */ p((e, t) => {
  var l;
  const { themeVariables: r, handDrawnSeed: i } = ft(), { nodeBorder: a, mainBkg: n } = r, { stylesMap: o } = Fr(e);
  return Object.assign(
    {
      roughness: 0.7,
      fill: o.get("fill") || n,
      fillStyle: "hachure",
      // solid fill
      fillWeight: 4,
      hachureGap: 5.2,
      stroke: o.get("stroke") || a,
      seed: i,
      strokeWidth: ((l = o.get("stroke-width")) == null ? void 0 : l.replace("px", "")) || 1.3,
      fillLineDash: [0, 0],
      strokeLineDash: P2(o.get("stroke-dasharray"))
    },
    t
  );
}, "userNodeOverrides"), P2 = /* @__PURE__ */ p((e) => {
  if (!e)
    return [0, 0];
  const t = e.trim().split(/\s+/).map(Number);
  if (t.length === 1) {
    const a = isNaN(t[0]) ? 0 : t[0];
    return [a, a];
  }
  const r = isNaN(t[0]) ? 0 : t[0], i = isNaN(t[1]) ? 0 : t[1];
  return [r, i];
}, "getStrokeDashArray"), qr = {}, vt = {}, pl;
function N2() {
  return pl || (pl = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.BLANK_URL = vt.relativeFirstCharacters = vt.whitespaceEscapeCharsRegex = vt.urlSchemeRegex = vt.ctrlCharactersRegex = vt.htmlCtrlEntityRegex = vt.htmlEntitiesRegex = vt.invalidProtocolRegex = void 0, vt.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im, vt.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g, vt.htmlCtrlEntityRegex = /&(newline|tab);/gi, vt.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, vt.urlSchemeRegex = /^.+(:|&colon;)/gim, vt.whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g, vt.relativeFirstCharacters = [".", "/"], vt.BLANK_URL = "about:blank"), vt;
}
var gl;
function W2() {
  if (gl) return qr;
  gl = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.sanitizeUrl = void 0;
  var e = N2();
  function t(o) {
    return e.relativeFirstCharacters.indexOf(o[0]) > -1;
  }
  function r(o) {
    var s = o.replace(e.ctrlCharactersRegex, "");
    return s.replace(e.htmlEntitiesRegex, function(l, c) {
      return String.fromCharCode(c);
    });
  }
  function i(o) {
    return URL.canParse(o);
  }
  function a(o) {
    try {
      return decodeURIComponent(o);
    } catch {
      return o;
    }
  }
  function n(o) {
    if (!o)
      return e.BLANK_URL;
    var s, l = a(o.trim());
    do
      l = r(l).replace(e.htmlCtrlEntityRegex, "").replace(e.ctrlCharactersRegex, "").replace(e.whitespaceEscapeCharsRegex, "").trim(), l = a(l), s = l.match(e.ctrlCharactersRegex) || l.match(e.htmlEntitiesRegex) || l.match(e.htmlCtrlEntityRegex) || l.match(e.whitespaceEscapeCharsRegex);
    while (s && s.length > 0);
    var c = l;
    if (!c)
      return e.BLANK_URL;
    if (t(c))
      return c;
    var h = c.trimStart(), u = h.match(e.urlSchemeRegex);
    if (!u)
      return c;
    var f = u[0].toLowerCase().trim();
    if (e.invalidProtocolRegex.test(f))
      return e.BLANK_URL;
    var d = h.replace(/\\/g, "/");
    if (f === "mailto:" || f.includes("://"))
      return d;
    if (f === "http:" || f === "https:") {
      if (!i(d))
        return e.BLANK_URL;
      var g = new URL(d);
      return g.protocol = g.protocol.toLowerCase(), g.hostname = g.hostname.toLowerCase(), g.toString();
    }
    return d;
  }
  return qr.sanitizeUrl = n, qr;
}
var z2 = W2(), q2 = "​", H2 = {
  curveBasis: ji,
  curveBasisClosed: b1,
  curveBasisOpen: C1,
  curveBumpX: Vc,
  curveBumpY: Kc,
  curveBundle: _1,
  curveCardinalClosed: v1,
  curveCardinalOpen: w1,
  curveCardinal: th,
  curveCatmullRomClosed: S1,
  curveCatmullRomOpen: k1,
  curveCatmullRom: rh,
  curveLinear: ca,
  curveLinearClosed: T1,
  curveMonotoneX: lh,
  curveMonotoneY: ch,
  curveNatural: uh,
  curveStep: fh,
  curveStepAfter: ph,
  curveStepBefore: dh
}, Y2 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, U2 = /* @__PURE__ */ p(function(e, t) {
  const r = Zu(e, /(?:init\b)|(?:initialize\b)/);
  let i = {};
  if (Array.isArray(r)) {
    const o = r.map((s) => s.args);
    Qi(o), i = wt(i, [...o]);
  } else
    i = r.args;
  if (!i)
    return;
  let a = ms(e, t);
  const n = "config";
  return i[n] !== void 0 && (a === "flowchart-v2" && (a = "flowchart"), i[a] = i[n], delete i[n]), i;
}, "detectInit"), Zu = /* @__PURE__ */ p(function(e, t = null) {
  var r, i;
  try {
    const a = new RegExp(
      `[%]{2}(?![{]${Y2.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    e = e.trim().replace(a, "").replace(/'/gm, '"'), $.debug(
      `Detecting diagram directive${t !== null ? " type:" + t : ""} based on the text:${e}`
    );
    let n;
    const o = [];
    for (; (n = ei.exec(e)) !== null; )
      if (n.index === ei.lastIndex && ei.lastIndex++, n && !t || t && ((r = n[1]) != null && r.match(t)) || t && ((i = n[2]) != null && i.match(t))) {
        const s = n[1] ? n[1] : n[2], l = n[3] ? n[3].trim() : n[4] ? JSON.parse(n[4].trim()) : null;
        o.push({ type: s, args: l });
      }
    return o.length === 0 ? { type: e, args: null } : o.length === 1 ? o[0] : o;
  } catch (a) {
    return $.error(
      `ERROR: ${a.message} - Unable to parse directive type: '${t}' based on the text: '${e}'`
    ), { type: void 0, args: null };
  }
}, "detectDirective"), j2 = /* @__PURE__ */ p(function(e) {
  return e.replace(ei, "");
}, "removeDirectives"), G2 = /* @__PURE__ */ p(function(e, t) {
  for (const [r, i] of t.entries())
    if (i.match(e))
      return r;
  return -1;
}, "isSubstringInArray");
function Hs(e, t) {
  if (!e)
    return t;
  const r = `curve${e.charAt(0).toUpperCase() + e.slice(1)}`;
  return H2[r] ?? t;
}
p(Hs, "interpolateToCurve");
function Qu(e, t) {
  const r = e.trim();
  if (r)
    return t.securityLevel !== "loose" ? z2.sanitizeUrl(r) : r;
}
p(Qu, "formatUrl");
var X2 = /* @__PURE__ */ p((e, ...t) => {
  const r = e.split("."), i = r.length - 1, a = r[i];
  let n = window;
  for (let o = 0; o < i; o++)
    if (n = n[r[o]], !n) {
      $.error(`Function name: ${e} not found in window`);
      return;
    }
  n[a](...t);
}, "runFunc");
function Ys(e, t) {
  return !e || !t ? 0 : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
p(Ys, "distance");
function Ju(e) {
  let t, r = 0;
  e.forEach((a) => {
    r += Ys(a, t), t = a;
  });
  const i = r / 2;
  return Us(e, i);
}
p(Ju, "traverseEdge");
function tf(e) {
  return e.length === 1 ? e[0] : Ju(e);
}
p(tf, "calcLabelPosition");
var ml = /* @__PURE__ */ p((e, t = 2) => {
  const r = Math.pow(10, t);
  return Math.round(e * r) / r;
}, "roundNumber"), Us = /* @__PURE__ */ p((e, t) => {
  let r, i = t;
  for (const a of e) {
    if (r) {
      const n = Ys(a, r);
      if (n === 0)
        return r;
      if (n < i)
        i -= n;
      else {
        const o = i / n;
        if (o <= 0)
          return r;
        if (o >= 1)
          return { x: a.x, y: a.y };
        if (o > 0 && o < 1)
          return {
            x: ml((1 - o) * r.x + o * a.x, 5),
            y: ml((1 - o) * r.y + o * a.y, 5)
          };
      }
    }
    r = a;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint"), V2 = /* @__PURE__ */ p((e, t, r) => {
  $.info(`our points ${JSON.stringify(t)}`), t[0] !== r && (t = t.reverse());
  const a = Us(t, 25), n = e ? 10 : 5, o = Math.atan2(t[0].y - a.y, t[0].x - a.x), s = { x: 0, y: 0 };
  return s.x = Math.sin(o) * n + (t[0].x + a.x) / 2, s.y = -Math.cos(o) * n + (t[0].y + a.y) / 2, s;
}, "calcCardinalityPosition");
function ef(e, t, r) {
  const i = structuredClone(r);
  $.info("our points", i), t !== "start_left" && t !== "start_right" && i.reverse();
  const a = 25 + e, n = Us(i, a), o = 10 + e * 0.5, s = Math.atan2(i[0].y - n.y, i[0].x - n.x), l = { x: 0, y: 0 };
  return t === "start_left" ? (l.x = Math.sin(s + Math.PI) * o + (i[0].x + n.x) / 2, l.y = -Math.cos(s + Math.PI) * o + (i[0].y + n.y) / 2) : t === "end_right" ? (l.x = Math.sin(s - Math.PI) * o + (i[0].x + n.x) / 2 - 5, l.y = -Math.cos(s - Math.PI) * o + (i[0].y + n.y) / 2 - 5) : t === "end_left" ? (l.x = Math.sin(s) * o + (i[0].x + n.x) / 2 - 5, l.y = -Math.cos(s) * o + (i[0].y + n.y) / 2 - 5) : (l.x = Math.sin(s) * o + (i[0].x + n.x) / 2, l.y = -Math.cos(s) * o + (i[0].y + n.y) / 2), l;
}
p(ef, "calcTerminalLabelPosition");
function rf(e) {
  let t = "", r = "";
  for (const i of e)
    i !== void 0 && (i.startsWith("color:") || i.startsWith("text-align:") ? r = r + i + ";" : t = t + i + ";");
  return { style: t, labelStyle: r };
}
p(rf, "getStylesFromArray");
var yl = 0, K2 = /* @__PURE__ */ p(() => (yl++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + yl), "generateId");
function af(e) {
  let t = "";
  const r = "0123456789abcdef", i = r.length;
  for (let a = 0; a < e; a++)
    t += r.charAt(Math.floor(Math.random() * i));
  return t;
}
p(af, "makeRandomHex");
var Z2 = /* @__PURE__ */ p((e) => af(e.length), "random"), Q2 = /* @__PURE__ */ p(function() {
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
}, "getTextObj"), J2 = /* @__PURE__ */ p(function(e, t) {
  const r = t.text.replace(Er.lineBreakRegex, " "), [, i] = za(t.fontSize), a = e.append("text");
  a.attr("x", t.x), a.attr("y", t.y), a.style("text-anchor", t.anchor), a.style("font-family", t.fontFamily), a.style("font-size", i), a.style("font-weight", t.fontWeight), a.attr("fill", t.fill), t.class !== void 0 && a.attr("class", t.class);
  const n = a.append("tspan");
  return n.attr("x", t.x + t.textMargin * 2), n.attr("fill", t.fill), n.text(r), a;
}, "drawSimpleText"), tC = gi(
  (e, t, r) => {
    if (!e || (r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      r
    ), Er.lineBreakRegex.test(e)))
      return e;
    const i = e.split(" ").filter(Boolean), a = [];
    let n = "";
    return i.forEach((o, s) => {
      const l = ke(`${o} `, r), c = ke(n, r);
      if (l > t) {
        const { hyphenatedStrings: f, remainingWord: d } = eC(o, t, "-", r);
        a.push(n, ...f), n = d;
      } else c + l >= t ? (a.push(n), n = o) : n = [n, o].filter(Boolean).join(" ");
      s + 1 === i.length && a.push(n);
    }), a.filter((o) => o !== "").join(r.joinWith);
  },
  (e, t, r) => `${e}${t}${r.fontSize}${r.fontWeight}${r.fontFamily}${r.joinWith}`
), eC = gi(
  (e, t, r = "-", i) => {
    i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      i
    );
    const a = [...e], n = [];
    let o = "";
    return a.forEach((s, l) => {
      const c = `${o}${s}`;
      if (ke(c, i) >= t) {
        const u = l + 1, f = a.length === u, d = `${c}${r}`;
        n.push(f ? c : d), o = "";
      } else
        o = c;
    }), { hyphenatedStrings: n, remainingWord: o };
  },
  (e, t, r = "-", i) => `${e}${t}${r}${i.fontSize}${i.fontWeight}${i.fontFamily}`
);
function nf(e, t) {
  return js(e, t).height;
}
p(nf, "calculateTextHeight");
function ke(e, t) {
  return js(e, t).width;
}
p(ke, "calculateTextWidth");
var js = gi(
  (e, t) => {
    const { fontSize: r = 12, fontFamily: i = "Arial", fontWeight: a = 400 } = t;
    if (!e)
      return { width: 0, height: 0 };
    const [, n] = za(r), o = ["sans-serif", i], s = e.split(Er.lineBreakRegex), l = [], c = ht("body");
    if (!c.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const h = c.append("svg");
    for (const f of o) {
      let d = 0;
      const g = { width: 0, height: 0, lineHeight: 0 };
      for (const m of s) {
        const y = Q2();
        y.text = m || q2;
        const x = J2(h, y).style("font-size", n).style("font-weight", a).style("font-family", f), b = (x._groups || x)[0][0].getBBox();
        if (b.width === 0 && b.height === 0)
          throw new Error("svg element not in render tree");
        g.width = Math.round(Math.max(g.width, b.width)), d = Math.round(b.height), g.height += d, g.lineHeight = Math.round(Math.max(g.lineHeight, d));
      }
      l.push(g);
    }
    h.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (e, t) => `${e}${t.fontSize}${t.fontWeight}${t.fontFamily}`
), vr, rC = (vr = class {
  constructor(t = !1, r) {
    this.count = 0, this.count = r ? r.length : 0, this.next = t ? () => this.count++ : () => Date.now();
  }
}, p(vr, "InitIDGenerator"), vr), Di, iC = /* @__PURE__ */ p(function(e) {
  return Di = Di || document.createElement("div"), e = escape(e).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Di.innerHTML = e, unescape(Di.textContent);
}, "entityDecode");
function Gs(e) {
  return "str" in e;
}
p(Gs, "isDetailedError");
var aC = /* @__PURE__ */ p((e, t, r, i) => {
  var n;
  if (!i)
    return;
  const a = (n = e.node()) == null ? void 0 : n.getBBox();
  a && e.append("text").text(i).attr("text-anchor", "middle").attr("x", a.x + a.width / 2).attr("y", -r).attr("class", t);
}, "insertTitle"), za = /* @__PURE__ */ p((e) => {
  if (typeof e == "number")
    return [e, e + "px"];
  const t = parseInt(e ?? "", 10);
  return Number.isNaN(t) ? [void 0, void 0] : e === String(t) ? [t, e + "px"] : [t, e];
}, "parseFontSize");
function Xs(e, t) {
  return Tm({}, e, t);
}
p(Xs, "cleanAndMerge");
var ie = {
  assignWithDepth: wt,
  wrapLabel: tC,
  calculateTextHeight: nf,
  calculateTextWidth: ke,
  calculateTextDimensions: js,
  cleanAndMerge: Xs,
  detectInit: U2,
  detectDirective: Zu,
  isSubstringInArray: G2,
  interpolateToCurve: Hs,
  calcLabelPosition: tf,
  calcCardinalityPosition: V2,
  calcTerminalLabelPosition: ef,
  formatUrl: Qu,
  getStylesFromArray: rf,
  generateId: K2,
  random: Z2,
  runFunc: X2,
  entityDecode: iC,
  insertTitle: aC,
  isLabelCoordinateInPath: sf,
  parseFontSize: za,
  InitIDGenerator: rC
}, nC = /* @__PURE__ */ p(function(e) {
  let t = e;
  return t = t.replace(/style.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/classDef.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/#\w+;/g, function(r) {
    const i = r.substring(1, r.length - 1);
    return /^\+?\d+$/.test(i) ? "ﬂ°°" + i + "¶ß" : "ﬂ°" + i + "¶ß";
  }), t;
}, "encodeEntities"), er = /* @__PURE__ */ p(function(e) {
  return e.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities"), US = /* @__PURE__ */ p((e, t, {
  counter: r = 0,
  prefix: i,
  suffix: a
}, n) => n || `${i ? `${i}_` : ""}${e}_${t}_${r}${a ? `_${a}` : ""}`, "getEdgeId");
function Ot(e) {
  return e ?? null;
}
p(Ot, "handleUndefinedAttr");
function sf(e, t) {
  const r = Math.round(e.x), i = Math.round(e.y), a = t.replace(
    /(\d+\.\d+)/g,
    (n) => Math.round(parseFloat(n)).toString()
  );
  return a.includes(r.toString()) || a.includes(i.toString());
}
p(sf, "isLabelCoordinateInPath");
const sC = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
}), ba = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), of = Object.freeze({
  ...sC,
  ...ba
}), oC = Object.freeze({
  ...of,
  body: "",
  hidden: !1
}), lC = Object.freeze({
  width: null,
  height: null
}), cC = Object.freeze({
  ...lC,
  ...ba
}), hC = (e, t, r, i = "") => {
  const a = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (a.length < 2 || a.length > 3) return null;
    i = a.shift().slice(1);
  }
  if (a.length > 3 || !a.length) return null;
  if (a.length > 1) {
    const s = a.pop(), l = a.pop(), c = {
      provider: a.length > 0 ? a[0] : i,
      prefix: l,
      name: s
    };
    return pn(c) ? c : null;
  }
  const n = a[0], o = n.split("-");
  if (o.length > 1) {
    const s = {
      provider: i,
      prefix: o.shift(),
      name: o.join("-")
    };
    return pn(s) ? s : null;
  }
  if (r && i === "") {
    const s = {
      provider: i,
      prefix: "",
      name: n
    };
    return pn(s, r) ? s : null;
  }
  return null;
}, pn = (e, t) => e ? !!((t && e.prefix === "" || e.prefix) && e.name) : !1;
function uC(e, t) {
  const r = {};
  !e.hFlip != !t.hFlip && (r.hFlip = !0), !e.vFlip != !t.vFlip && (r.vFlip = !0);
  const i = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return i && (r.rotate = i), r;
}
function xl(e, t) {
  const r = uC(e, t);
  for (const i in oC) i in ba ? i in e && !(i in r) && (r[i] = ba[i]) : i in t ? r[i] = t[i] : i in e && (r[i] = e[i]);
  return r;
}
function fC(e, t) {
  const r = e.icons, i = e.aliases || /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  function n(o) {
    if (r[o]) return a[o] = [];
    if (!(o in a)) {
      a[o] = null;
      const s = i[o] && i[o].parent, l = s && n(s);
      l && (a[o] = [s].concat(l));
    }
    return a[o];
  }
  return (t || Object.keys(r).concat(Object.keys(i))).forEach(n), a;
}
function bl(e, t, r) {
  const i = e.icons, a = e.aliases || /* @__PURE__ */ Object.create(null);
  let n = {};
  function o(s) {
    n = xl(i[s] || a[s], n);
  }
  return o(t), r.forEach(o), xl(e, n);
}
function dC(e, t) {
  if (e.icons[t]) return bl(e, t, []);
  const r = fC(e, [t])[t];
  return r ? bl(e, t, r) : null;
}
const pC = /(-?[0-9.]*[0-9]+[0-9.]*)/g, gC = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Cl(e, t, r) {
  if (t === 1) return e;
  if (r = r || 100, typeof e == "number") return Math.ceil(e * t * r) / r;
  if (typeof e != "string") return e;
  const i = e.split(pC);
  if (i === null || !i.length) return e;
  const a = [];
  let n = i.shift(), o = gC.test(n);
  for (; ; ) {
    if (o) {
      const s = parseFloat(n);
      isNaN(s) ? a.push(n) : a.push(Math.ceil(s * t * r) / r);
    } else a.push(n);
    if (n = i.shift(), n === void 0) return a.join("");
    o = !o;
  }
}
function mC(e, t = "defs") {
  let r = "";
  const i = e.indexOf("<" + t);
  for (; i >= 0; ) {
    const a = e.indexOf(">", i), n = e.indexOf("</" + t);
    if (a === -1 || n === -1) break;
    const o = e.indexOf(">", n);
    if (o === -1) break;
    r += e.slice(a + 1, n).trim(), e = e.slice(0, i).trim() + e.slice(o + 1);
  }
  return {
    defs: r,
    content: e
  };
}
function yC(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function xC(e, t, r) {
  const i = mC(e);
  return yC(i.defs, t + i.content + r);
}
const bC = (e) => e === "unset" || e === "undefined" || e === "none";
function CC(e, t) {
  const r = {
    ...of,
    ...e
  }, i = {
    ...cC,
    ...t
  }, a = {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height
  };
  let n = r.body;
  [r, i].forEach((m) => {
    const y = [], x = m.hFlip, b = m.vFlip;
    let _ = m.rotate;
    x ? b ? _ += 2 : (y.push("translate(" + (a.width + a.left).toString() + " " + (0 - a.top).toString() + ")"), y.push("scale(-1 1)"), a.top = a.left = 0) : b && (y.push("translate(" + (0 - a.left).toString() + " " + (a.height + a.top).toString() + ")"), y.push("scale(1 -1)"), a.top = a.left = 0);
    let S;
    switch (_ < 0 && (_ -= Math.floor(_ / 4) * 4), _ = _ % 4, _) {
      case 1:
        S = a.height / 2 + a.top, y.unshift("rotate(90 " + S.toString() + " " + S.toString() + ")");
        break;
      case 2:
        y.unshift("rotate(180 " + (a.width / 2 + a.left).toString() + " " + (a.height / 2 + a.top).toString() + ")");
        break;
      case 3:
        S = a.width / 2 + a.left, y.unshift("rotate(-90 " + S.toString() + " " + S.toString() + ")");
        break;
    }
    _ % 2 === 1 && (a.left !== a.top && (S = a.left, a.left = a.top, a.top = S), a.width !== a.height && (S = a.width, a.width = a.height, a.height = S)), y.length && (n = xC(n, '<g transform="' + y.join(" ") + '">', "</g>"));
  });
  const o = i.width, s = i.height, l = a.width, c = a.height;
  let h, u;
  o === null ? (u = s === null ? "1em" : s === "auto" ? c : s, h = Cl(u, l / c)) : (h = o === "auto" ? l : o, u = s === null ? Cl(h, c / l) : s === "auto" ? c : s);
  const f = {}, d = (m, y) => {
    bC(y) || (f[m] = y.toString());
  };
  d("width", h), d("height", u);
  const g = [
    a.left,
    a.top,
    l,
    c
  ];
  return f.viewBox = g.join(" "), {
    attributes: f,
    viewBox: g,
    body: n
  };
}
const _C = /\sid="(\S+)"/g, vC = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let wC = 0;
function SC(e, t = vC) {
  const r = [];
  let i;
  for (; i = _C.exec(e); ) r.push(i[1]);
  if (!r.length) return e;
  const a = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return r.forEach((n) => {
    const o = typeof t == "function" ? t(n) : t + (wC++).toString(), s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"), "$1" + o + a + "$3");
  }), e = e.replace(new RegExp(a, "g"), ""), e;
}
function kC(e, t) {
  let r = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const i in t) r += " " + i + '="' + t[i] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + r + ">" + e + "</svg>";
}
function lf(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var i = Array.from(typeof e == "string" ? [e] : e);
  i[i.length - 1] = i[i.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a = i.reduce(function(s, l) {
    var c = l.match(/\n([\t ]+|(?!\s).)/g);
    return c ? s.concat(c.map(function(h) {
      var u, f;
      return (f = (u = h.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && f !== void 0 ? f : 0;
    })) : s;
  }, []);
  if (a.length) {
    var n = new RegExp(`
[	 ]{` + Math.min.apply(Math, a) + "}", "g");
    i = i.map(function(s) {
      return s.replace(n, `
`);
    });
  }
  i[0] = i[0].replace(/^\r?\n/, "");
  var o = i[0];
  return t.forEach(function(s, l) {
    var c = o.match(/(?:^|\n)( *)$/), h = c ? c[1] : "", u = s;
    typeof s == "string" && s.includes(`
`) && (u = String(s).split(`
`).map(function(f, d) {
      return d === 0 ? f : "" + h + f;
    }).join(`
`)), o += u + i[l + 1];
  }), o;
}
var TC = {
  body: '<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/><text transform="translate(21.16 64.67)" style="fill: #fff; font-family: ArialMT, Arial; font-size: 67.75px;"><tspan x="0" y="0">?</tspan></text></g>',
  height: 80,
  width: 80
}, is = /* @__PURE__ */ new Map(), cf = /* @__PURE__ */ new Map(), BC = /* @__PURE__ */ p((e) => {
  for (const t of e) {
    if (!t.name)
      throw new Error(
        'Invalid icon loader. Must have a "name" property with non-empty string value.'
      );
    if ($.debug("Registering icon pack:", t.name), "loader" in t)
      cf.set(t.name, t.loader);
    else if ("icons" in t)
      is.set(t.name, t.icons);
    else
      throw $.error("Invalid icon loader:", t), new Error('Invalid icon loader. Must have either "icons" or "loader" property.');
  }
}, "registerIconPacks"), hf = /* @__PURE__ */ p(async (e, t) => {
  const r = hC(e, !0, t !== void 0);
  if (!r)
    throw new Error(`Invalid icon name: ${e}`);
  const i = r.prefix || t;
  if (!i)
    throw new Error(`Icon name must contain a prefix: ${e}`);
  let a = is.get(i);
  if (!a) {
    const o = cf.get(i);
    if (!o)
      throw new Error(`Icon set not found: ${r.prefix}`);
    try {
      a = { ...await o(), prefix: i }, is.set(i, a);
    } catch (s) {
      throw $.error(s), new Error(`Failed to load icon set: ${r.prefix}`);
    }
  }
  const n = dC(a, r.name);
  if (!n)
    throw new Error(`Icon not found: ${e}`);
  return n;
}, "getRegisteredIconData"), LC = /* @__PURE__ */ p(async (e) => {
  try {
    return await hf(e), !0;
  } catch {
    return !1;
  }
}, "isIconAvailable"), _i = /* @__PURE__ */ p(async (e, t, r) => {
  let i;
  try {
    i = await hf(e, t == null ? void 0 : t.fallbackPrefix);
  } catch (o) {
    $.error(o), i = TC;
  }
  const a = CC(i, t), n = kC(SC(a.body), {
    ...a.attributes,
    ...r
  });
  return Jt(n, $t());
}, "getIconSVG");
function uf(e, { markdownAutoWrap: t }) {
  const i = e.replace(/<br\/>/g, `
`).replace(/\n{2,}/g, `
`), a = lf(i);
  return t === !1 ? a.replace(/ /g, "&nbsp;") : a;
}
p(uf, "preprocessMarkdown");
function ff(e, t = {}) {
  const r = uf(e, t), i = Hl.lexer(r), a = [[]];
  let n = 0;
  function o(s, l = "normal") {
    s.type === "text" ? s.text.split(`
`).forEach((h, u) => {
      u !== 0 && (n++, a.push([])), h.split(" ").forEach((f) => {
        f = f.replace(/&#39;/g, "'"), f && a[n].push({ content: f, type: l });
      });
    }) : s.type === "strong" || s.type === "em" ? s.tokens.forEach((c) => {
      o(c, s.type);
    }) : s.type === "html" && a[n].push({ content: s.text, type: "normal" });
  }
  return p(o, "processNode"), i.forEach((s) => {
    var l;
    s.type === "paragraph" ? (l = s.tokens) == null || l.forEach((c) => {
      o(c);
    }) : s.type === "html" ? a[n].push({ content: s.text, type: "normal" }) : a[n].push({ content: s.raw, type: "normal" });
  }), a;
}
p(ff, "markdownToLines");
function df(e, { markdownAutoWrap: t } = {}) {
  const r = Hl.lexer(e);
  function i(a) {
    var n, o, s;
    return a.type === "text" ? t === !1 ? a.text.replace(/\n */g, "<br/>").replace(/ /g, "&nbsp;") : a.text.replace(/\n */g, "<br/>") : a.type === "strong" ? `<strong>${(n = a.tokens) == null ? void 0 : n.map(i).join("")}</strong>` : a.type === "em" ? `<em>${(o = a.tokens) == null ? void 0 : o.map(i).join("")}</em>` : a.type === "paragraph" ? `<p>${(s = a.tokens) == null ? void 0 : s.map(i).join("")}</p>` : a.type === "space" ? "" : a.type === "html" ? `${a.text}` : a.type === "escape" ? a.text : ($.warn(`Unsupported markdown: ${a.type}`), a.raw);
  }
  return p(i, "output"), r.map(i).join("");
}
p(df, "markdownToHTML");
function pf(e) {
  return Intl.Segmenter ? [...new Intl.Segmenter().segment(e)].map((t) => t.segment) : [...e];
}
p(pf, "splitTextToChars");
function gf(e, t) {
  const r = pf(t.content);
  return Vs(e, [], r, t.type);
}
p(gf, "splitWordToFitWidth");
function Vs(e, t, r, i) {
  if (r.length === 0)
    return [
      { content: t.join(""), type: i },
      { content: "", type: i }
    ];
  const [a, ...n] = r, o = [...t, a];
  return e([{ content: o.join(""), type: i }]) ? Vs(e, o, n, i) : (t.length === 0 && a && (t.push(a), r.shift()), [
    { content: t.join(""), type: i },
    { content: r.join(""), type: i }
  ]);
}
p(Vs, "splitWordToFitWidthRecursion");
function mf(e, t) {
  if (e.some(({ content: r }) => r.includes(`
`)))
    throw new Error("splitLineToFitWidth does not support newlines in the line");
  return Ca(e, t);
}
p(mf, "splitLineToFitWidth");
function Ca(e, t, r = [], i = []) {
  if (e.length === 0)
    return i.length > 0 && r.push(i), r.length > 0 ? r : [];
  let a = "";
  e[0].content === " " && (a = " ", e.shift());
  const n = e.shift() ?? { content: " ", type: "normal" }, o = [...i];
  if (a !== "" && o.push({ content: a, type: "normal" }), o.push(n), t(o))
    return Ca(e, t, r, o);
  if (i.length > 0)
    r.push(i), e.unshift(n);
  else if (n.content) {
    const [s, l] = gf(t, n);
    r.push([s]), l.content && e.unshift(l);
  }
  return Ca(e, t, r);
}
p(Ca, "splitLineToFitWidthRecursion");
function as(e, t) {
  t && e.attr("style", t);
}
p(as, "applyStyle");
async function yf(e, t, r, i, a = !1, n = $t()) {
  const o = e.append("foreignObject");
  o.attr("width", `${10 * r}px`), o.attr("height", `${10 * r}px`);
  const s = o.append("xhtml:div"), l = kr(t.label) ? await ys(t.label.replace(Er.lineBreakRegex, `
`), n) : Jt(t.label, n), c = t.isNode ? "nodeLabel" : "edgeLabel", h = s.append("span");
  h.html(l), as(h, t.labelStyle), h.attr("class", `${c} ${i}`), as(s, t.labelStyle), s.style("display", "table-cell"), s.style("white-space", "nowrap"), s.style("line-height", "1.5"), s.style("max-width", r + "px"), s.style("text-align", "center"), s.attr("xmlns", "http://www.w3.org/1999/xhtml"), a && s.attr("class", "labelBkg");
  let u = s.node().getBoundingClientRect();
  return u.width === r && (s.style("display", "table"), s.style("white-space", "break-spaces"), s.style("width", r + "px"), u = s.node().getBoundingClientRect()), o.node();
}
p(yf, "addHtmlSpan");
function qa(e, t, r) {
  return e.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", t * r - 0.1 + "em").attr("dy", r + "em");
}
p(qa, "createTspan");
function xf(e, t, r) {
  const i = e.append("text"), a = qa(i, 1, t);
  Ha(a, r);
  const n = a.node().getComputedTextLength();
  return i.remove(), n;
}
p(xf, "computeWidthOfText");
function MC(e, t, r) {
  var o;
  const i = e.append("text"), a = qa(i, 1, t);
  Ha(a, [{ content: r, type: "normal" }]);
  const n = (o = a.node()) == null ? void 0 : o.getBoundingClientRect();
  return n && i.remove(), n;
}
p(MC, "computeDimensionOfText");
function bf(e, t, r, i = !1) {
  const n = t.append("g"), o = n.insert("rect").attr("class", "background").attr("style", "stroke: none"), s = n.append("text").attr("y", "-10.1");
  let l = 0;
  for (const c of r) {
    const h = /* @__PURE__ */ p((f) => xf(n, 1.1, f) <= e, "checkWidth"), u = h(c) ? [c] : mf(c, h);
    for (const f of u) {
      const d = qa(s, l, 1.1);
      Ha(d, f), l++;
    }
  }
  if (i) {
    const c = s.node().getBBox(), h = 2;
    return o.attr("x", c.x - h).attr("y", c.y - h).attr("width", c.width + 2 * h).attr("height", c.height + 2 * h), n.node();
  } else
    return s.node();
}
p(bf, "createFormattedText");
function Ha(e, t) {
  e.text(""), t.forEach((r, i) => {
    const a = e.append("tspan").attr("font-style", r.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", r.type === "strong" ? "bold" : "normal");
    i === 0 ? a.text(r.content) : a.text(" " + r.content);
  });
}
p(Ha, "updateTextContentAndStyles");
async function Cf(e, t = {}) {
  const r = [];
  e.replace(/(fa[bklrs]?):fa-([\w-]+)/g, (a, n, o) => (r.push(
    (async () => {
      const s = `${n}:${o}`;
      return await LC(s) ? await _i(s, void 0, { class: "label-icon" }) : `<i class='${Jt(a, t).replace(":", " ")}'></i>`;
    })()
  ), a));
  const i = await Promise.all(r);
  return e.replace(/(fa[bklrs]?):fa-([\w-]+)/g, () => i.shift() ?? "");
}
p(Cf, "replaceIconSubstring");
var Oe = /* @__PURE__ */ p(async (e, t = "", {
  style: r = "",
  isTitle: i = !1,
  classes: a = "",
  useHtmlLabels: n = !0,
  isNode: o = !0,
  width: s = 200,
  addSvgBackground: l = !1
} = {}, c) => {
  if ($.debug(
    "XYZ createText",
    t,
    r,
    i,
    a,
    n,
    o,
    "addSvgBackground: ",
    l
  ), n) {
    const h = df(t, c), u = await Cf(er(h), c), f = t.replace(/\\\\/g, "\\"), d = {
      isNode: o,
      label: kr(t) ? f : u,
      labelStyle: r.replace("fill:", "color:")
    };
    return await yf(e, d, s, a, l, c);
  } else {
    const h = t.replace(/<br\s*\/?>/g, "<br/>"), u = ff(h.replace("<br>", "<br/>"), c), f = bf(
      s,
      e,
      u,
      t ? l : !1
    );
    if (o) {
      /stroke:/.exec(r) && (r = r.replace("stroke:", "lineColor:"));
      const d = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      ht(f).attr("style", d);
    } else {
      const d = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/background:/g, "fill:");
      ht(f).select("rect").attr("style", d.replace(/background:/g, "fill:"));
      const g = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      ht(f).select("text").attr("style", g);
    }
    return f;
  }
}, "createText");
function gn(e, t, r) {
  if (e && e.length) {
    const [i, a] = t, n = Math.PI / 180 * r, o = Math.cos(n), s = Math.sin(n);
    for (const l of e) {
      const [c, h] = l;
      l[0] = (c - i) * o - (h - a) * s + i, l[1] = (c - i) * s + (h - a) * o + a;
    }
  }
}
function AC(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function EC(e, t, r, i = 1) {
  const a = r, n = Math.max(t, 0.1), o = e[0] && e[0][0] && typeof e[0][0] == "number" ? [e] : e, s = [0, 0];
  if (a) for (const c of o) gn(c, s, a);
  const l = function(c, h, u) {
    const f = [];
    for (const b of c) {
      const _ = [...b];
      AC(_[0], _[_.length - 1]) || _.push([_[0][0], _[0][1]]), _.length > 2 && f.push(_);
    }
    const d = [];
    h = Math.max(h, 0.1);
    const g = [];
    for (const b of f) for (let _ = 0; _ < b.length - 1; _++) {
      const S = b[_], w = b[_ + 1];
      if (S[1] !== w[1]) {
        const C = Math.min(S[1], w[1]);
        g.push({ ymin: C, ymax: Math.max(S[1], w[1]), x: C === S[1] ? S[0] : w[0], islope: (w[0] - S[0]) / (w[1] - S[1]) });
      }
    }
    if (g.sort((b, _) => b.ymin < _.ymin ? -1 : b.ymin > _.ymin ? 1 : b.x < _.x ? -1 : b.x > _.x ? 1 : b.ymax === _.ymax ? 0 : (b.ymax - _.ymax) / Math.abs(b.ymax - _.ymax)), !g.length) return d;
    let m = [], y = g[0].ymin, x = 0;
    for (; m.length || g.length; ) {
      if (g.length) {
        let b = -1;
        for (let _ = 0; _ < g.length && !(g[_].ymin > y); _++) b = _;
        g.splice(0, b + 1).forEach((_) => {
          m.push({ s: y, edge: _ });
        });
      }
      if (m = m.filter((b) => !(b.edge.ymax <= y)), m.sort((b, _) => b.edge.x === _.edge.x ? 0 : (b.edge.x - _.edge.x) / Math.abs(b.edge.x - _.edge.x)), (u !== 1 || x % h == 0) && m.length > 1) for (let b = 0; b < m.length; b += 2) {
        const _ = b + 1;
        if (_ >= m.length) break;
        const S = m[b].edge, w = m[_].edge;
        d.push([[Math.round(S.x), y], [Math.round(w.x), y]]);
      }
      y += u, m.forEach((b) => {
        b.edge.x = b.edge.x + u * b.edge.islope;
      }), x++;
    }
    return d;
  }(o, n, i);
  if (a) {
    for (const c of o) gn(c, s, -a);
    (function(c, h, u) {
      const f = [];
      c.forEach((d) => f.push(...d)), gn(f, h, u);
    })(l, s, -a);
  }
  return l;
}
function vi(e, t) {
  var r;
  const i = t.hachureAngle + 90;
  let a = t.hachureGap;
  a < 0 && (a = 4 * t.strokeWidth), a = Math.round(Math.max(a, 0.1));
  let n = 1;
  return t.roughness >= 1 && (((r = t.randomizer) === null || r === void 0 ? void 0 : r.next()) || Math.random()) > 0.7 && (n = a), EC(e, a, i, n || 1);
}
class Ks {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    return this._fillPolygons(t, r);
  }
  _fillPolygons(t, r) {
    const i = vi(t, r);
    return { type: "fillSketch", ops: this.renderLines(i, r) };
  }
  renderLines(t, r) {
    const i = [];
    for (const a of t) i.push(...this.helper.doubleLineOps(a[0][0], a[0][1], a[1][0], a[1][1], r));
    return i;
  }
}
function Ya(e) {
  const t = e[0], r = e[1];
  return Math.sqrt(Math.pow(t[0] - r[0], 2) + Math.pow(t[1] - r[1], 2));
}
class FC extends Ks {
  fillPolygons(t, r) {
    let i = r.hachureGap;
    i < 0 && (i = 4 * r.strokeWidth), i = Math.max(i, 0.1);
    const a = vi(t, Object.assign({}, r, { hachureGap: i })), n = Math.PI / 180 * r.hachureAngle, o = [], s = 0.5 * i * Math.cos(n), l = 0.5 * i * Math.sin(n);
    for (const [c, h] of a) Ya([c, h]) && o.push([[c[0] - s, c[1] + l], [...h]], [[c[0] + s, c[1] - l], [...h]]);
    return { type: "fillSketch", ops: this.renderLines(o, r) };
  }
}
class $C extends Ks {
  fillPolygons(t, r) {
    const i = this._fillPolygons(t, r), a = Object.assign({}, r, { hachureAngle: r.hachureAngle + 90 }), n = this._fillPolygons(t, a);
    return i.ops = i.ops.concat(n.ops), i;
  }
}
class DC {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = vi(t, r = Object.assign({}, r, { hachureAngle: 0 }));
    return this.dotsOnLines(i, r);
  }
  dotsOnLines(t, r) {
    const i = [];
    let a = r.hachureGap;
    a < 0 && (a = 4 * r.strokeWidth), a = Math.max(a, 0.1);
    let n = r.fillWeight;
    n < 0 && (n = r.strokeWidth / 2);
    const o = a / 4;
    for (const s of t) {
      const l = Ya(s), c = l / a, h = Math.ceil(c) - 1, u = l - h * a, f = (s[0][0] + s[1][0]) / 2 - a / 4, d = Math.min(s[0][1], s[1][1]);
      for (let g = 0; g < h; g++) {
        const m = d + u + g * a, y = f - o + 2 * Math.random() * o, x = m - o + 2 * Math.random() * o, b = this.helper.ellipse(y, x, n, n, r);
        i.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: i };
  }
}
class OC {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = vi(t, r);
    return { type: "fillSketch", ops: this.dashedLine(i, r) };
  }
  dashedLine(t, r) {
    const i = r.dashOffset < 0 ? r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap : r.dashOffset, a = r.dashGap < 0 ? r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap : r.dashGap, n = [];
    return t.forEach((o) => {
      const s = Ya(o), l = Math.floor(s / (i + a)), c = (s + a - l * (i + a)) / 2;
      let h = o[0], u = o[1];
      h[0] > u[0] && (h = o[1], u = o[0]);
      const f = Math.atan((u[1] - h[1]) / (u[0] - h[0]));
      for (let d = 0; d < l; d++) {
        const g = d * (i + a), m = g + i, y = [h[0] + g * Math.cos(f) + c * Math.cos(f), h[1] + g * Math.sin(f) + c * Math.sin(f)], x = [h[0] + m * Math.cos(f) + c * Math.cos(f), h[1] + m * Math.sin(f) + c * Math.sin(f)];
        n.push(...this.helper.doubleLineOps(y[0], y[1], x[0], x[1], r));
      }
    }), n;
  }
}
class IC {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap, a = r.zigzagOffset < 0 ? i : r.zigzagOffset, n = vi(t, r = Object.assign({}, r, { hachureGap: i + a }));
    return { type: "fillSketch", ops: this.zigzagLines(n, a, r) };
  }
  zigzagLines(t, r, i) {
    const a = [];
    return t.forEach((n) => {
      const o = Ya(n), s = Math.round(o / (2 * r));
      let l = n[0], c = n[1];
      l[0] > c[0] && (l = n[1], c = n[0]);
      const h = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let u = 0; u < s; u++) {
        const f = 2 * u * r, d = 2 * (u + 1) * r, g = Math.sqrt(2 * Math.pow(r, 2)), m = [l[0] + f * Math.cos(h), l[1] + f * Math.sin(h)], y = [l[0] + d * Math.cos(h), l[1] + d * Math.sin(h)], x = [m[0] + g * Math.cos(h + Math.PI / 4), m[1] + g * Math.sin(h + Math.PI / 4)];
        a.push(...this.helper.doubleLineOps(m[0], m[1], x[0], x[1], i), ...this.helper.doubleLineOps(x[0], x[1], y[0], y[1], i));
      }
    }), a;
  }
}
const Yt = {};
class RC {
  constructor(t) {
    this.seed = t;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const PC = 0, mn = 1, _l = 2, Oi = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function yn(e, t) {
  return e.type === t;
}
function Zs(e) {
  const t = [], r = function(o) {
    const s = new Array();
    for (; o !== ""; ) if (o.match(/^([ \t\r\n,]+)/)) o = o.substr(RegExp.$1.length);
    else if (o.match(/^([aAcChHlLmMqQsStTvVzZ])/)) s[s.length] = { type: PC, text: RegExp.$1 }, o = o.substr(RegExp.$1.length);
    else {
      if (!o.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      s[s.length] = { type: mn, text: `${parseFloat(RegExp.$1)}` }, o = o.substr(RegExp.$1.length);
    }
    return s[s.length] = { type: _l, text: "" }, s;
  }(e);
  let i = "BOD", a = 0, n = r[a];
  for (; !yn(n, _l); ) {
    let o = 0;
    const s = [];
    if (i === "BOD") {
      if (n.text !== "M" && n.text !== "m") return Zs("M0,0" + e);
      a++, o = Oi[n.text], i = n.text;
    } else yn(n, mn) ? o = Oi[i] : (a++, o = Oi[n.text], i = n.text);
    if (!(a + o < r.length)) throw new Error("Path data ended short");
    for (let l = a; l < a + o; l++) {
      const c = r[l];
      if (!yn(c, mn)) throw new Error("Param not a number: " + i + "," + c.text);
      s[s.length] = +c.text;
    }
    if (typeof Oi[i] != "number") throw new Error("Bad segment: " + i);
    {
      const l = { key: i, data: s };
      t.push(l), a += o, n = r[a], i === "M" && (i = "L"), i === "m" && (i = "l");
    }
  }
  return t;
}
function _f(e) {
  let t = 0, r = 0, i = 0, a = 0;
  const n = [];
  for (const { key: o, data: s } of e) switch (o) {
    case "M":
      n.push({ key: "M", data: [...s] }), [t, r] = s, [i, a] = s;
      break;
    case "m":
      t += s[0], r += s[1], n.push({ key: "M", data: [t, r] }), i = t, a = r;
      break;
    case "L":
      n.push({ key: "L", data: [...s] }), [t, r] = s;
      break;
    case "l":
      t += s[0], r += s[1], n.push({ key: "L", data: [t, r] });
      break;
    case "C":
      n.push({ key: "C", data: [...s] }), t = s[4], r = s[5];
      break;
    case "c": {
      const l = s.map((c, h) => h % 2 ? c + r : c + t);
      n.push({ key: "C", data: l }), t = l[4], r = l[5];
      break;
    }
    case "Q":
      n.push({ key: "Q", data: [...s] }), t = s[2], r = s[3];
      break;
    case "q": {
      const l = s.map((c, h) => h % 2 ? c + r : c + t);
      n.push({ key: "Q", data: l }), t = l[2], r = l[3];
      break;
    }
    case "A":
      n.push({ key: "A", data: [...s] }), t = s[5], r = s[6];
      break;
    case "a":
      t += s[5], r += s[6], n.push({ key: "A", data: [s[0], s[1], s[2], s[3], s[4], t, r] });
      break;
    case "H":
      n.push({ key: "H", data: [...s] }), t = s[0];
      break;
    case "h":
      t += s[0], n.push({ key: "H", data: [t] });
      break;
    case "V":
      n.push({ key: "V", data: [...s] }), r = s[0];
      break;
    case "v":
      r += s[0], n.push({ key: "V", data: [r] });
      break;
    case "S":
      n.push({ key: "S", data: [...s] }), t = s[2], r = s[3];
      break;
    case "s": {
      const l = s.map((c, h) => h % 2 ? c + r : c + t);
      n.push({ key: "S", data: l }), t = l[2], r = l[3];
      break;
    }
    case "T":
      n.push({ key: "T", data: [...s] }), t = s[0], r = s[1];
      break;
    case "t":
      t += s[0], r += s[1], n.push({ key: "T", data: [t, r] });
      break;
    case "Z":
    case "z":
      n.push({ key: "Z", data: [] }), t = i, r = a;
  }
  return n;
}
function vf(e) {
  const t = [];
  let r = "", i = 0, a = 0, n = 0, o = 0, s = 0, l = 0;
  for (const { key: c, data: h } of e) {
    switch (c) {
      case "M":
        t.push({ key: "M", data: [...h] }), [i, a] = h, [n, o] = h;
        break;
      case "C":
        t.push({ key: "C", data: [...h] }), i = h[4], a = h[5], s = h[2], l = h[3];
        break;
      case "L":
        t.push({ key: "L", data: [...h] }), [i, a] = h;
        break;
      case "H":
        i = h[0], t.push({ key: "L", data: [i, a] });
        break;
      case "V":
        a = h[0], t.push({ key: "L", data: [i, a] });
        break;
      case "S": {
        let u = 0, f = 0;
        r === "C" || r === "S" ? (u = i + (i - s), f = a + (a - l)) : (u = i, f = a), t.push({ key: "C", data: [u, f, ...h] }), s = h[0], l = h[1], i = h[2], a = h[3];
        break;
      }
      case "T": {
        const [u, f] = h;
        let d = 0, g = 0;
        r === "Q" || r === "T" ? (d = i + (i - s), g = a + (a - l)) : (d = i, g = a);
        const m = i + 2 * (d - i) / 3, y = a + 2 * (g - a) / 3, x = u + 2 * (d - u) / 3, b = f + 2 * (g - f) / 3;
        t.push({ key: "C", data: [m, y, x, b, u, f] }), s = d, l = g, i = u, a = f;
        break;
      }
      case "Q": {
        const [u, f, d, g] = h, m = i + 2 * (u - i) / 3, y = a + 2 * (f - a) / 3, x = d + 2 * (u - d) / 3, b = g + 2 * (f - g) / 3;
        t.push({ key: "C", data: [m, y, x, b, d, g] }), s = u, l = f, i = d, a = g;
        break;
      }
      case "A": {
        const u = Math.abs(h[0]), f = Math.abs(h[1]), d = h[2], g = h[3], m = h[4], y = h[5], x = h[6];
        u === 0 || f === 0 ? (t.push({ key: "C", data: [i, a, y, x, y, x] }), i = y, a = x) : (i !== y || a !== x) && (wf(i, a, y, x, u, f, d, g, m).forEach(function(b) {
          t.push({ key: "C", data: b });
        }), i = y, a = x);
        break;
      }
      case "Z":
        t.push({ key: "Z", data: [] }), i = n, a = o;
    }
    r = c;
  }
  return t;
}
function Hr(e, t, r) {
  return [e * Math.cos(r) - t * Math.sin(r), e * Math.sin(r) + t * Math.cos(r)];
}
function wf(e, t, r, i, a, n, o, s, l, c) {
  const h = (u = o, Math.PI * u / 180);
  var u;
  let f = [], d = 0, g = 0, m = 0, y = 0;
  if (c) [d, g, m, y] = c;
  else {
    [e, t] = Hr(e, t, -h), [r, i] = Hr(r, i, -h);
    const O = (e - r) / 2, A = (t - i) / 2;
    let L = O * O / (a * a) + A * A / (n * n);
    L > 1 && (L = Math.sqrt(L), a *= L, n *= L);
    const B = a * a, F = n * n, M = B * F - B * A * A - F * O * O, z = B * A * A + F * O * O, X = (s === l ? -1 : 1) * Math.sqrt(Math.abs(M / z));
    m = X * a * A / n + (e + r) / 2, y = X * -n * O / a + (t + i) / 2, d = Math.asin(parseFloat(((t - y) / n).toFixed(9))), g = Math.asin(parseFloat(((i - y) / n).toFixed(9))), e < m && (d = Math.PI - d), r < m && (g = Math.PI - g), d < 0 && (d = 2 * Math.PI + d), g < 0 && (g = 2 * Math.PI + g), l && d > g && (d -= 2 * Math.PI), !l && g > d && (g -= 2 * Math.PI);
  }
  let x = g - d;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const O = g, A = r, L = i;
    g = l && g > d ? d + 120 * Math.PI / 180 * 1 : d + 120 * Math.PI / 180 * -1, f = wf(r = m + a * Math.cos(g), i = y + n * Math.sin(g), A, L, a, n, o, 0, l, [g, O, m, y]);
  }
  x = g - d;
  const b = Math.cos(d), _ = Math.sin(d), S = Math.cos(g), w = Math.sin(g), C = Math.tan(x / 4), T = 4 / 3 * a * C, D = 4 / 3 * n * C, P = [e, t], I = [e + T * _, t - D * b], E = [r + T * w, i - D * S], W = [r, i];
  if (I[0] = 2 * P[0] - I[0], I[1] = 2 * P[1] - I[1], c) return [I, E, W].concat(f);
  {
    f = [I, E, W].concat(f);
    const O = [];
    for (let A = 0; A < f.length; A += 3) {
      const L = Hr(f[A][0], f[A][1], h), B = Hr(f[A + 1][0], f[A + 1][1], h), F = Hr(f[A + 2][0], f[A + 2][1], h);
      O.push([L[0], L[1], B[0], B[1], F[0], F[1]]);
    }
    return O;
  }
}
const NC = { randOffset: function(e, t) {
  return rt(e, t);
}, randOffsetWithRange: function(e, t, r) {
  return _a(e, t, r);
}, ellipse: function(e, t, r, i, a) {
  const n = kf(r, i, a);
  return ns(e, t, a, n).opset;
}, doubleLineOps: function(e, t, r, i, a) {
  return Fe(e, t, r, i, a, !0);
} };
function Sf(e, t, r, i, a) {
  return { type: "path", ops: Fe(e, t, r, i, a) };
}
function Vi(e, t, r) {
  const i = (e || []).length;
  if (i > 2) {
    const a = [];
    for (let n = 0; n < i - 1; n++) a.push(...Fe(e[n][0], e[n][1], e[n + 1][0], e[n + 1][1], r));
    return t && a.push(...Fe(e[i - 1][0], e[i - 1][1], e[0][0], e[0][1], r)), { type: "path", ops: a };
  }
  return i === 2 ? Sf(e[0][0], e[0][1], e[1][0], e[1][1], r) : { type: "path", ops: [] };
}
function WC(e, t, r, i, a) {
  return function(n, o) {
    return Vi(n, !0, o);
  }([[e, t], [e + r, t], [e + r, t + i], [e, t + i]], a);
}
function vl(e, t) {
  if (e.length) {
    const r = typeof e[0][0] == "number" ? [e] : e, i = Ii(r[0], 1 * (1 + 0.2 * t.roughness), t), a = t.disableMultiStroke ? [] : Ii(r[0], 1.5 * (1 + 0.22 * t.roughness), kl(t));
    for (let n = 1; n < r.length; n++) {
      const o = r[n];
      if (o.length) {
        const s = Ii(o, 1 * (1 + 0.2 * t.roughness), t), l = t.disableMultiStroke ? [] : Ii(o, 1.5 * (1 + 0.22 * t.roughness), kl(t));
        for (const c of s) c.op !== "move" && i.push(c);
        for (const c of l) c.op !== "move" && a.push(c);
      }
    }
    return { type: "path", ops: i.concat(a) };
  }
  return { type: "path", ops: [] };
}
function kf(e, t, r) {
  const i = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(e / 2, 2) + Math.pow(t / 2, 2)) / 2)), a = Math.ceil(Math.max(r.curveStepCount, r.curveStepCount / Math.sqrt(200) * i)), n = 2 * Math.PI / a;
  let o = Math.abs(e / 2), s = Math.abs(t / 2);
  const l = 1 - r.curveFitting;
  return o += rt(o * l, r), s += rt(s * l, r), { increment: n, rx: o, ry: s };
}
function ns(e, t, r, i) {
  const [a, n] = Tl(i.increment, e, t, i.rx, i.ry, 1, i.increment * _a(0.1, _a(0.4, 1, r), r), r);
  let o = va(a, null, r);
  if (!r.disableMultiStroke && r.roughness !== 0) {
    const [s] = Tl(i.increment, e, t, i.rx, i.ry, 1.5, 0, r), l = va(s, null, r);
    o = o.concat(l);
  }
  return { estimatedPoints: n, opset: { type: "path", ops: o } };
}
function wl(e, t, r, i, a, n, o, s, l) {
  const c = e, h = t;
  let u = Math.abs(r / 2), f = Math.abs(i / 2);
  u += rt(0.01 * u, l), f += rt(0.01 * f, l);
  let d = a, g = n;
  for (; d < 0; ) d += 2 * Math.PI, g += 2 * Math.PI;
  g - d > 2 * Math.PI && (d = 0, g = 2 * Math.PI);
  const m = 2 * Math.PI / l.curveStepCount, y = Math.min(m / 2, (g - d) / 2), x = Bl(y, c, h, u, f, d, g, 1, l);
  if (!l.disableMultiStroke) {
    const b = Bl(y, c, h, u, f, d, g, 1.5, l);
    x.push(...b);
  }
  return o && (s ? x.push(...Fe(c, h, c + u * Math.cos(d), h + f * Math.sin(d), l), ...Fe(c, h, c + u * Math.cos(g), h + f * Math.sin(g), l)) : x.push({ op: "lineTo", data: [c, h] }, { op: "lineTo", data: [c + u * Math.cos(d), h + f * Math.sin(d)] })), { type: "path", ops: x };
}
function Sl(e, t) {
  const r = vf(_f(Zs(e))), i = [];
  let a = [0, 0], n = [0, 0];
  for (const { key: o, data: s } of r) switch (o) {
    case "M":
      n = [s[0], s[1]], a = [s[0], s[1]];
      break;
    case "L":
      i.push(...Fe(n[0], n[1], s[0], s[1], t)), n = [s[0], s[1]];
      break;
    case "C": {
      const [l, c, h, u, f, d] = s;
      i.push(...zC(l, c, h, u, f, d, n, t)), n = [f, d];
      break;
    }
    case "Z":
      i.push(...Fe(n[0], n[1], a[0], a[1], t)), n = [a[0], a[1]];
  }
  return { type: "path", ops: i };
}
function xn(e, t) {
  const r = [];
  for (const i of e) if (i.length) {
    const a = t.maxRandomnessOffset || 0, n = i.length;
    if (n > 2) {
      r.push({ op: "move", data: [i[0][0] + rt(a, t), i[0][1] + rt(a, t)] });
      for (let o = 1; o < n; o++) r.push({ op: "lineTo", data: [i[o][0] + rt(a, t), i[o][1] + rt(a, t)] });
    }
  }
  return { type: "fillPath", ops: r };
}
function cr(e, t) {
  return function(r, i) {
    let a = r.fillStyle || "hachure";
    if (!Yt[a]) switch (a) {
      case "zigzag":
        Yt[a] || (Yt[a] = new FC(i));
        break;
      case "cross-hatch":
        Yt[a] || (Yt[a] = new $C(i));
        break;
      case "dots":
        Yt[a] || (Yt[a] = new DC(i));
        break;
      case "dashed":
        Yt[a] || (Yt[a] = new OC(i));
        break;
      case "zigzag-line":
        Yt[a] || (Yt[a] = new IC(i));
        break;
      default:
        a = "hachure", Yt[a] || (Yt[a] = new Ks(i));
    }
    return Yt[a];
  }(t, NC).fillPolygons(e, t);
}
function kl(e) {
  const t = Object.assign({}, e);
  return t.randomizer = void 0, e.seed && (t.seed = e.seed + 1), t;
}
function Tf(e) {
  return e.randomizer || (e.randomizer = new RC(e.seed || 0)), e.randomizer.next();
}
function _a(e, t, r, i = 1) {
  return r.roughness * i * (Tf(r) * (t - e) + e);
}
function rt(e, t, r = 1) {
  return _a(-e, e, t, r);
}
function Fe(e, t, r, i, a, n = !1) {
  const o = n ? a.disableMultiStrokeFill : a.disableMultiStroke, s = ss(e, t, r, i, a, !0, !1);
  if (o) return s;
  const l = ss(e, t, r, i, a, !0, !0);
  return s.concat(l);
}
function ss(e, t, r, i, a, n, o) {
  const s = Math.pow(e - r, 2) + Math.pow(t - i, 2), l = Math.sqrt(s);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let h = a.maxRandomnessOffset || 0;
  h * h * 100 > s && (h = l / 10);
  const u = h / 2, f = 0.2 + 0.2 * Tf(a);
  let d = a.bowing * a.maxRandomnessOffset * (i - t) / 200, g = a.bowing * a.maxRandomnessOffset * (e - r) / 200;
  d = rt(d, a, c), g = rt(g, a, c);
  const m = [], y = () => rt(u, a, c), x = () => rt(h, a, c), b = a.preserveVertices;
  return o ? m.push({ op: "move", data: [e + (b ? 0 : y()), t + (b ? 0 : y())] }) : m.push({ op: "move", data: [e + (b ? 0 : rt(h, a, c)), t + (b ? 0 : rt(h, a, c))] }), o ? m.push({ op: "bcurveTo", data: [d + e + (r - e) * f + y(), g + t + (i - t) * f + y(), d + e + 2 * (r - e) * f + y(), g + t + 2 * (i - t) * f + y(), r + (b ? 0 : y()), i + (b ? 0 : y())] }) : m.push({ op: "bcurveTo", data: [d + e + (r - e) * f + x(), g + t + (i - t) * f + x(), d + e + 2 * (r - e) * f + x(), g + t + 2 * (i - t) * f + x(), r + (b ? 0 : x()), i + (b ? 0 : x())] }), m;
}
function Ii(e, t, r) {
  if (!e.length) return [];
  const i = [];
  i.push([e[0][0] + rt(t, r), e[0][1] + rt(t, r)]), i.push([e[0][0] + rt(t, r), e[0][1] + rt(t, r)]);
  for (let a = 1; a < e.length; a++) i.push([e[a][0] + rt(t, r), e[a][1] + rt(t, r)]), a === e.length - 1 && i.push([e[a][0] + rt(t, r), e[a][1] + rt(t, r)]);
  return va(i, null, r);
}
function va(e, t, r) {
  const i = e.length, a = [];
  if (i > 3) {
    const n = [], o = 1 - r.curveTightness;
    a.push({ op: "move", data: [e[1][0], e[1][1]] });
    for (let s = 1; s + 2 < i; s++) {
      const l = e[s];
      n[0] = [l[0], l[1]], n[1] = [l[0] + (o * e[s + 1][0] - o * e[s - 1][0]) / 6, l[1] + (o * e[s + 1][1] - o * e[s - 1][1]) / 6], n[2] = [e[s + 1][0] + (o * e[s][0] - o * e[s + 2][0]) / 6, e[s + 1][1] + (o * e[s][1] - o * e[s + 2][1]) / 6], n[3] = [e[s + 1][0], e[s + 1][1]], a.push({ op: "bcurveTo", data: [n[1][0], n[1][1], n[2][0], n[2][1], n[3][0], n[3][1]] });
    }
  } else i === 3 ? (a.push({ op: "move", data: [e[1][0], e[1][1]] }), a.push({ op: "bcurveTo", data: [e[1][0], e[1][1], e[2][0], e[2][1], e[2][0], e[2][1]] })) : i === 2 && a.push(...ss(e[0][0], e[0][1], e[1][0], e[1][1], r, !0, !0));
  return a;
}
function Tl(e, t, r, i, a, n, o, s) {
  const l = [], c = [];
  if (s.roughness === 0) {
    e /= 4, c.push([t + i * Math.cos(-e), r + a * Math.sin(-e)]);
    for (let h = 0; h <= 2 * Math.PI; h += e) {
      const u = [t + i * Math.cos(h), r + a * Math.sin(h)];
      l.push(u), c.push(u);
    }
    c.push([t + i * Math.cos(0), r + a * Math.sin(0)]), c.push([t + i * Math.cos(e), r + a * Math.sin(e)]);
  } else {
    const h = rt(0.5, s) - Math.PI / 2;
    c.push([rt(n, s) + t + 0.9 * i * Math.cos(h - e), rt(n, s) + r + 0.9 * a * Math.sin(h - e)]);
    const u = 2 * Math.PI + h - 0.01;
    for (let f = h; f < u; f += e) {
      const d = [rt(n, s) + t + i * Math.cos(f), rt(n, s) + r + a * Math.sin(f)];
      l.push(d), c.push(d);
    }
    c.push([rt(n, s) + t + i * Math.cos(h + 2 * Math.PI + 0.5 * o), rt(n, s) + r + a * Math.sin(h + 2 * Math.PI + 0.5 * o)]), c.push([rt(n, s) + t + 0.98 * i * Math.cos(h + o), rt(n, s) + r + 0.98 * a * Math.sin(h + o)]), c.push([rt(n, s) + t + 0.9 * i * Math.cos(h + 0.5 * o), rt(n, s) + r + 0.9 * a * Math.sin(h + 0.5 * o)]);
  }
  return [c, l];
}
function Bl(e, t, r, i, a, n, o, s, l) {
  const c = n + rt(0.1, l), h = [];
  h.push([rt(s, l) + t + 0.9 * i * Math.cos(c - e), rt(s, l) + r + 0.9 * a * Math.sin(c - e)]);
  for (let u = c; u <= o; u += e) h.push([rt(s, l) + t + i * Math.cos(u), rt(s, l) + r + a * Math.sin(u)]);
  return h.push([t + i * Math.cos(o), r + a * Math.sin(o)]), h.push([t + i * Math.cos(o), r + a * Math.sin(o)]), va(h, null, l);
}
function zC(e, t, r, i, a, n, o, s) {
  const l = [], c = [s.maxRandomnessOffset || 1, (s.maxRandomnessOffset || 1) + 0.3];
  let h = [0, 0];
  const u = s.disableMultiStroke ? 1 : 2, f = s.preserveVertices;
  for (let d = 0; d < u; d++) d === 0 ? l.push({ op: "move", data: [o[0], o[1]] }) : l.push({ op: "move", data: [o[0] + (f ? 0 : rt(c[0], s)), o[1] + (f ? 0 : rt(c[0], s))] }), h = f ? [a, n] : [a + rt(c[d], s), n + rt(c[d], s)], l.push({ op: "bcurveTo", data: [e + rt(c[d], s), t + rt(c[d], s), r + rt(c[d], s), i + rt(c[d], s), h[0], h[1]] });
  return l;
}
function Yr(e) {
  return [...e];
}
function Ll(e, t = 0) {
  const r = e.length;
  if (r < 3) throw new Error("A curve must have at least three points.");
  const i = [];
  if (r === 3) i.push(Yr(e[0]), Yr(e[1]), Yr(e[2]), Yr(e[2]));
  else {
    const a = [];
    a.push(e[0], e[0]);
    for (let s = 1; s < e.length; s++) a.push(e[s]), s === e.length - 1 && a.push(e[s]);
    const n = [], o = 1 - t;
    i.push(Yr(a[0]));
    for (let s = 1; s + 2 < a.length; s++) {
      const l = a[s];
      n[0] = [l[0], l[1]], n[1] = [l[0] + (o * a[s + 1][0] - o * a[s - 1][0]) / 6, l[1] + (o * a[s + 1][1] - o * a[s - 1][1]) / 6], n[2] = [a[s + 1][0] + (o * a[s][0] - o * a[s + 2][0]) / 6, a[s + 1][1] + (o * a[s][1] - o * a[s + 2][1]) / 6], n[3] = [a[s + 1][0], a[s + 1][1]], i.push(n[1], n[2], n[3]);
    }
  }
  return i;
}
function Ki(e, t) {
  return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
}
function qC(e, t, r) {
  const i = Ki(t, r);
  if (i === 0) return Ki(e, t);
  let a = ((e[0] - t[0]) * (r[0] - t[0]) + (e[1] - t[1]) * (r[1] - t[1])) / i;
  return a = Math.max(0, Math.min(1, a)), Ki(e, ze(t, r, a));
}
function ze(e, t, r) {
  return [e[0] + (t[0] - e[0]) * r, e[1] + (t[1] - e[1]) * r];
}
function os(e, t, r, i) {
  const a = i || [];
  if (function(s, l) {
    const c = s[l + 0], h = s[l + 1], u = s[l + 2], f = s[l + 3];
    let d = 3 * h[0] - 2 * c[0] - f[0];
    d *= d;
    let g = 3 * h[1] - 2 * c[1] - f[1];
    g *= g;
    let m = 3 * u[0] - 2 * f[0] - c[0];
    m *= m;
    let y = 3 * u[1] - 2 * f[1] - c[1];
    return y *= y, d < m && (d = m), g < y && (g = y), d + g;
  }(e, t) < r) {
    const s = e[t + 0];
    a.length ? (n = a[a.length - 1], o = s, Math.sqrt(Ki(n, o)) > 1 && a.push(s)) : a.push(s), a.push(e[t + 3]);
  } else {
    const l = e[t + 0], c = e[t + 1], h = e[t + 2], u = e[t + 3], f = ze(l, c, 0.5), d = ze(c, h, 0.5), g = ze(h, u, 0.5), m = ze(f, d, 0.5), y = ze(d, g, 0.5), x = ze(m, y, 0.5);
    os([l, f, m, x], 0, r, a), os([x, y, g, u], 0, r, a);
  }
  var n, o;
  return a;
}
function HC(e, t) {
  return wa(e, 0, e.length, t);
}
function wa(e, t, r, i, a) {
  const n = a || [], o = e[t], s = e[r - 1];
  let l = 0, c = 1;
  for (let h = t + 1; h < r - 1; ++h) {
    const u = qC(e[h], o, s);
    u > l && (l = u, c = h);
  }
  return Math.sqrt(l) > i ? (wa(e, t, c + 1, i, n), wa(e, c, r, i, n)) : (n.length || n.push(o), n.push(s)), n;
}
function bn(e, t = 0.15, r) {
  const i = [], a = (e.length - 1) / 3;
  for (let n = 0; n < a; n++)
    os(e, 3 * n, t, i);
  return r && r > 0 ? wa(i, 0, i.length, r) : i;
}
const Xt = "none";
class Sa {
  constructor(t) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: !1, disableMultiStrokeFill: !1, preserveVertices: !1, fillShapeRoughnessGain: 0.8 }, this.config = t || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(t) {
    return t ? Object.assign({}, this.defaultOptions, t) : this.defaultOptions;
  }
  _d(t, r, i) {
    return { shape: t, sets: r || [], options: i || this.defaultOptions };
  }
  line(t, r, i, a, n) {
    const o = this._o(n);
    return this._d("line", [Sf(t, r, i, a, o)], o);
  }
  rectangle(t, r, i, a, n) {
    const o = this._o(n), s = [], l = WC(t, r, i, a, o);
    if (o.fill) {
      const c = [[t, r], [t + i, r], [t + i, r + a], [t, r + a]];
      o.fillStyle === "solid" ? s.push(xn([c], o)) : s.push(cr([c], o));
    }
    return o.stroke !== Xt && s.push(l), this._d("rectangle", s, o);
  }
  ellipse(t, r, i, a, n) {
    const o = this._o(n), s = [], l = kf(i, a, o), c = ns(t, r, o, l);
    if (o.fill) if (o.fillStyle === "solid") {
      const h = ns(t, r, o, l).opset;
      h.type = "fillPath", s.push(h);
    } else s.push(cr([c.estimatedPoints], o));
    return o.stroke !== Xt && s.push(c.opset), this._d("ellipse", s, o);
  }
  circle(t, r, i, a) {
    const n = this.ellipse(t, r, i, i, a);
    return n.shape = "circle", n;
  }
  linearPath(t, r) {
    const i = this._o(r);
    return this._d("linearPath", [Vi(t, !1, i)], i);
  }
  arc(t, r, i, a, n, o, s = !1, l) {
    const c = this._o(l), h = [], u = wl(t, r, i, a, n, o, s, !0, c);
    if (s && c.fill) if (c.fillStyle === "solid") {
      const f = Object.assign({}, c);
      f.disableMultiStroke = !0;
      const d = wl(t, r, i, a, n, o, !0, !1, f);
      d.type = "fillPath", h.push(d);
    } else h.push(function(f, d, g, m, y, x, b) {
      const _ = f, S = d;
      let w = Math.abs(g / 2), C = Math.abs(m / 2);
      w += rt(0.01 * w, b), C += rt(0.01 * C, b);
      let T = y, D = x;
      for (; T < 0; ) T += 2 * Math.PI, D += 2 * Math.PI;
      D - T > 2 * Math.PI && (T = 0, D = 2 * Math.PI);
      const P = (D - T) / b.curveStepCount, I = [];
      for (let E = T; E <= D; E += P) I.push([_ + w * Math.cos(E), S + C * Math.sin(E)]);
      return I.push([_ + w * Math.cos(D), S + C * Math.sin(D)]), I.push([_, S]), cr([I], b);
    }(t, r, i, a, n, o, c));
    return c.stroke !== Xt && h.push(u), this._d("arc", h, c);
  }
  curve(t, r) {
    const i = this._o(r), a = [], n = vl(t, i);
    if (i.fill && i.fill !== Xt) if (i.fillStyle === "solid") {
      const o = vl(t, Object.assign(Object.assign({}, i), { disableMultiStroke: !0, roughness: i.roughness ? i.roughness + i.fillShapeRoughnessGain : 0 }));
      a.push({ type: "fillPath", ops: this._mergedShape(o.ops) });
    } else {
      const o = [], s = t;
      if (s.length) {
        const l = typeof s[0][0] == "number" ? [s] : s;
        for (const c of l) c.length < 3 ? o.push(...c) : c.length === 3 ? o.push(...bn(Ll([c[0], c[0], c[1], c[2]]), 10, (1 + i.roughness) / 2)) : o.push(...bn(Ll(c), 10, (1 + i.roughness) / 2));
      }
      o.length && a.push(cr([o], i));
    }
    return i.stroke !== Xt && a.push(n), this._d("curve", a, i);
  }
  polygon(t, r) {
    const i = this._o(r), a = [], n = Vi(t, !0, i);
    return i.fill && (i.fillStyle === "solid" ? a.push(xn([t], i)) : a.push(cr([t], i))), i.stroke !== Xt && a.push(n), this._d("polygon", a, i);
  }
  path(t, r) {
    const i = this._o(r), a = [];
    if (!t) return this._d("path", a, i);
    t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const n = i.fill && i.fill !== "transparent" && i.fill !== Xt, o = i.stroke !== Xt, s = !!(i.simplification && i.simplification < 1), l = function(h, u, f) {
      const d = vf(_f(Zs(h))), g = [];
      let m = [], y = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && m.push(...bn(x, u)), x = [];
      }, _ = () => {
        b(), m.length && (g.push(m), m = []);
      };
      for (const { key: w, data: C } of d) switch (w) {
        case "M":
          _(), y = [C[0], C[1]], m.push(y);
          break;
        case "L":
          b(), m.push([C[0], C[1]]);
          break;
        case "C":
          if (!x.length) {
            const T = m.length ? m[m.length - 1] : y;
            x.push([T[0], T[1]]);
          }
          x.push([C[0], C[1]]), x.push([C[2], C[3]]), x.push([C[4], C[5]]);
          break;
        case "Z":
          b(), m.push([y[0], y[1]]);
      }
      if (_(), !f) return g;
      const S = [];
      for (const w of g) {
        const C = HC(w, f);
        C.length && S.push(C);
      }
      return S;
    }(t, 1, s ? 4 - 4 * (i.simplification || 1) : (1 + i.roughness) / 2), c = Sl(t, i);
    if (n) if (i.fillStyle === "solid") if (l.length === 1) {
      const h = Sl(t, Object.assign(Object.assign({}, i), { disableMultiStroke: !0, roughness: i.roughness ? i.roughness + i.fillShapeRoughnessGain : 0 }));
      a.push({ type: "fillPath", ops: this._mergedShape(h.ops) });
    } else a.push(xn(l, i));
    else a.push(cr(l, i));
    return o && (s ? l.forEach((h) => {
      a.push(Vi(h, !1, i));
    }) : a.push(c)), this._d("path", a, i);
  }
  opsToPath(t, r) {
    let i = "";
    for (const a of t.ops) {
      const n = typeof r == "number" && r >= 0 ? a.data.map((o) => +o.toFixed(r)) : a.data;
      switch (a.op) {
        case "move":
          i += `M${n[0]} ${n[1]} `;
          break;
        case "bcurveTo":
          i += `C${n[0]} ${n[1]}, ${n[2]} ${n[3]}, ${n[4]} ${n[5]} `;
          break;
        case "lineTo":
          i += `L${n[0]} ${n[1]} `;
      }
    }
    return i.trim();
  }
  toPaths(t) {
    const r = t.sets || [], i = t.options || this.defaultOptions, a = [];
    for (const n of r) {
      let o = null;
      switch (n.type) {
        case "path":
          o = { d: this.opsToPath(n), stroke: i.stroke, strokeWidth: i.strokeWidth, fill: Xt };
          break;
        case "fillPath":
          o = { d: this.opsToPath(n), stroke: Xt, strokeWidth: 0, fill: i.fill || Xt };
          break;
        case "fillSketch":
          o = this.fillSketch(n, i);
      }
      o && a.push(o);
    }
    return a;
  }
  fillSketch(t, r) {
    let i = r.fillWeight;
    return i < 0 && (i = r.strokeWidth / 2), { d: this.opsToPath(t), stroke: r.fill || Xt, strokeWidth: i, fill: Xt };
  }
  _mergedShape(t) {
    return t.filter((r, i) => i === 0 || r.op !== "move");
  }
}
class YC {
  constructor(t, r) {
    this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.gen = new Sa(r);
  }
  draw(t) {
    const r = t.sets || [], i = t.options || this.getDefaultOptions(), a = this.ctx, n = t.options.fixedDecimalPlaceDigits;
    for (const o of r) switch (o.type) {
      case "path":
        a.save(), a.strokeStyle = i.stroke === "none" ? "transparent" : i.stroke, a.lineWidth = i.strokeWidth, i.strokeLineDash && a.setLineDash(i.strokeLineDash), i.strokeLineDashOffset && (a.lineDashOffset = i.strokeLineDashOffset), this._drawToContext(a, o, n), a.restore();
        break;
      case "fillPath": {
        a.save(), a.fillStyle = i.fill || "";
        const s = t.shape === "curve" || t.shape === "polygon" || t.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(a, o, n, s), a.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(a, o, i);
    }
  }
  fillSketch(t, r, i) {
    let a = i.fillWeight;
    a < 0 && (a = i.strokeWidth / 2), t.save(), i.fillLineDash && t.setLineDash(i.fillLineDash), i.fillLineDashOffset && (t.lineDashOffset = i.fillLineDashOffset), t.strokeStyle = i.fill || "", t.lineWidth = a, this._drawToContext(t, r, i.fixedDecimalPlaceDigits), t.restore();
  }
  _drawToContext(t, r, i, a = "nonzero") {
    t.beginPath();
    for (const n of r.ops) {
      const o = typeof i == "number" && i >= 0 ? n.data.map((s) => +s.toFixed(i)) : n.data;
      switch (n.op) {
        case "move":
          t.moveTo(o[0], o[1]);
          break;
        case "bcurveTo":
          t.bezierCurveTo(o[0], o[1], o[2], o[3], o[4], o[5]);
          break;
        case "lineTo":
          t.lineTo(o[0], o[1]);
      }
    }
    r.type === "fillPath" ? t.fill(a) : t.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(t, r, i, a, n) {
    const o = this.gen.line(t, r, i, a, n);
    return this.draw(o), o;
  }
  rectangle(t, r, i, a, n) {
    const o = this.gen.rectangle(t, r, i, a, n);
    return this.draw(o), o;
  }
  ellipse(t, r, i, a, n) {
    const o = this.gen.ellipse(t, r, i, a, n);
    return this.draw(o), o;
  }
  circle(t, r, i, a) {
    const n = this.gen.circle(t, r, i, a);
    return this.draw(n), n;
  }
  linearPath(t, r) {
    const i = this.gen.linearPath(t, r);
    return this.draw(i), i;
  }
  polygon(t, r) {
    const i = this.gen.polygon(t, r);
    return this.draw(i), i;
  }
  arc(t, r, i, a, n, o, s = !1, l) {
    const c = this.gen.arc(t, r, i, a, n, o, s, l);
    return this.draw(c), c;
  }
  curve(t, r) {
    const i = this.gen.curve(t, r);
    return this.draw(i), i;
  }
  path(t, r) {
    const i = this.gen.path(t, r);
    return this.draw(i), i;
  }
}
const Ri = "http://www.w3.org/2000/svg";
class UC {
  constructor(t, r) {
    this.svg = t, this.gen = new Sa(r);
  }
  draw(t) {
    const r = t.sets || [], i = t.options || this.getDefaultOptions(), a = this.svg.ownerDocument || window.document, n = a.createElementNS(Ri, "g"), o = t.options.fixedDecimalPlaceDigits;
    for (const s of r) {
      let l = null;
      switch (s.type) {
        case "path":
          l = a.createElementNS(Ri, "path"), l.setAttribute("d", this.opsToPath(s, o)), l.setAttribute("stroke", i.stroke), l.setAttribute("stroke-width", i.strokeWidth + ""), l.setAttribute("fill", "none"), i.strokeLineDash && l.setAttribute("stroke-dasharray", i.strokeLineDash.join(" ").trim()), i.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${i.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = a.createElementNS(Ri, "path"), l.setAttribute("d", this.opsToPath(s, o)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", i.fill || ""), t.shape !== "curve" && t.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          l = this.fillSketch(a, s, i);
      }
      l && n.appendChild(l);
    }
    return n;
  }
  fillSketch(t, r, i) {
    let a = i.fillWeight;
    a < 0 && (a = i.strokeWidth / 2);
    const n = t.createElementNS(Ri, "path");
    return n.setAttribute("d", this.opsToPath(r, i.fixedDecimalPlaceDigits)), n.setAttribute("stroke", i.fill || ""), n.setAttribute("stroke-width", a + ""), n.setAttribute("fill", "none"), i.fillLineDash && n.setAttribute("stroke-dasharray", i.fillLineDash.join(" ").trim()), i.fillLineDashOffset && n.setAttribute("stroke-dashoffset", `${i.fillLineDashOffset}`), n;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(t, r) {
    return this.gen.opsToPath(t, r);
  }
  line(t, r, i, a, n) {
    const o = this.gen.line(t, r, i, a, n);
    return this.draw(o);
  }
  rectangle(t, r, i, a, n) {
    const o = this.gen.rectangle(t, r, i, a, n);
    return this.draw(o);
  }
  ellipse(t, r, i, a, n) {
    const o = this.gen.ellipse(t, r, i, a, n);
    return this.draw(o);
  }
  circle(t, r, i, a) {
    const n = this.gen.circle(t, r, i, a);
    return this.draw(n);
  }
  linearPath(t, r) {
    const i = this.gen.linearPath(t, r);
    return this.draw(i);
  }
  polygon(t, r) {
    const i = this.gen.polygon(t, r);
    return this.draw(i);
  }
  arc(t, r, i, a, n, o, s = !1, l) {
    const c = this.gen.arc(t, r, i, a, n, o, s, l);
    return this.draw(c);
  }
  curve(t, r) {
    const i = this.gen.curve(t, r);
    return this.draw(i);
  }
  path(t, r) {
    const i = this.gen.path(t, r);
    return this.draw(i);
  }
}
var U = { canvas: (e, t) => new YC(e, t), svg: (e, t) => new UC(e, t), generator: (e) => new Sa(e), newSeed: () => Sa.newSeed() }, et = /* @__PURE__ */ p(async (e, t, r) => {
  var u, f;
  let i;
  const a = t.useHtmlLabels || kt((u = ft()) == null ? void 0 : u.htmlLabels);
  r ? i = r : i = "node default";
  const n = e.insert("g").attr("class", i).attr("id", t.domId || t.id), o = n.insert("g").attr("class", "label").attr("style", Ot(t.labelStyle));
  let s;
  t.label === void 0 ? s = "" : s = typeof t.label == "string" ? t.label : t.label[0];
  const l = await Oe(o, Jt(er(s), ft()), {
    useHtmlLabels: a,
    width: t.width || ((f = ft().flowchart) == null ? void 0 : f.wrappingWidth),
    // @ts-expect-error -- This is currently not used. Should this be `classes` instead?
    cssClasses: "markdown-node-label",
    style: t.labelStyle,
    addSvgBackground: !!t.icon || !!t.img
  });
  let c = l.getBBox();
  const h = ((t == null ? void 0 : t.padding) ?? 0) / 2;
  if (a) {
    const d = l.children[0], g = ht(l), m = d.getElementsByTagName("img");
    if (m) {
      const y = s.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...m].map(
          (x) => new Promise((b) => {
            function _() {
              if (x.style.display = "flex", x.style.flexDirection = "column", y) {
                const S = ft().fontSize ? ft().fontSize : window.getComputedStyle(document.body).fontSize, w = 5, [C = hc.fontSize] = za(S), T = C * w + "px";
                x.style.minWidth = T, x.style.maxWidth = T;
              } else
                x.style.width = "100%";
              b(x);
            }
            p(_, "setupImage"), setTimeout(() => {
              x.complete && _();
            }), x.addEventListener("error", _), x.addEventListener("load", _);
          })
        )
      );
    }
    c = d.getBoundingClientRect(), g.attr("width", c.width), g.attr("height", c.height);
  }
  return a ? o.attr("transform", "translate(" + -c.width / 2 + ", " + -c.height / 2 + ")") : o.attr("transform", "translate(0, " + -c.height / 2 + ")"), t.centerLabel && o.attr("transform", "translate(" + -c.width / 2 + ", " + -c.height / 2 + ")"), o.insert("rect", ":first-child"), { shapeSvg: n, bbox: c, halfPadding: h, label: o };
}, "labelHelper"), Cn = /* @__PURE__ */ p(async (e, t, r) => {
  var l, c, h, u, f, d;
  const i = r.useHtmlLabels || kt((c = (l = ft()) == null ? void 0 : l.flowchart) == null ? void 0 : c.htmlLabels), a = e.insert("g").attr("class", "label").attr("style", r.labelStyle || ""), n = await Oe(a, Jt(er(t), ft()), {
    useHtmlLabels: i,
    width: r.width || ((u = (h = ft()) == null ? void 0 : h.flowchart) == null ? void 0 : u.wrappingWidth),
    style: r.labelStyle,
    addSvgBackground: !!r.icon || !!r.img
  });
  let o = n.getBBox();
  const s = r.padding / 2;
  if (kt((d = (f = ft()) == null ? void 0 : f.flowchart) == null ? void 0 : d.htmlLabels)) {
    const g = n.children[0], m = ht(n);
    o = g.getBoundingClientRect(), m.attr("width", o.width), m.attr("height", o.height);
  }
  return i ? a.attr("transform", "translate(" + -o.width / 2 + ", " + -o.height / 2 + ")") : a.attr("transform", "translate(0, " + -o.height / 2 + ")"), r.centerLabel && a.attr("transform", "translate(" + -o.width / 2 + ", " + -o.height / 2 + ")"), a.insert("rect", ":first-child"), { shapeSvg: e, bbox: o, halfPadding: s, label: a };
}, "insertLabel"), V = /* @__PURE__ */ p((e, t) => {
  const r = t.node().getBBox();
  e.width = r.width, e.height = r.height;
}, "updateNodeBounds"), tt = /* @__PURE__ */ p((e, t) => (e.look === "handDrawn" ? "rough-node" : "node") + " " + e.cssClasses + " " + (t || ""), "getNodeClasses");
function lt(e) {
  const t = e.map((r, i) => `${i === 0 ? "M" : "L"}${r.x},${r.y}`);
  return t.push("Z"), t.join(" ");
}
p(lt, "createPathFromPoints");
function $e(e, t, r, i, a, n) {
  const o = [], l = r - e, c = i - t, h = l / n, u = 2 * Math.PI / h, f = t + c / 2;
  for (let d = 0; d <= 50; d++) {
    const g = d / 50, m = e + g * l, y = f + a * Math.sin(u * (m - e));
    o.push({ x: m, y });
  }
  return o;
}
p($e, "generateFullSineWavePoints");
function fi(e, t, r, i, a, n) {
  const o = [], s = a * Math.PI / 180, h = (n * Math.PI / 180 - s) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = s + u * h, d = e + r * Math.cos(f), g = t + r * Math.sin(f);
    o.push({ x: -d, y: -g });
  }
  return o;
}
p(fi, "generateCirclePoints");
var jC = /* @__PURE__ */ p((e, t) => {
  var r = e.x, i = e.y, a = t.x - r, n = t.y - i, o = e.width / 2, s = e.height / 2, l, c;
  return Math.abs(n) * o > Math.abs(a) * s ? (n < 0 && (s = -s), l = n === 0 ? 0 : s * a / n, c = s) : (a < 0 && (o = -o), l = o, c = a === 0 ? 0 : o * n / a), { x: r + l, y: i + c };
}, "intersectRect"), $r = jC;
function Bf(e, t) {
  t && e.attr("style", t);
}
p(Bf, "applyStyle");
async function Lf(e) {
  const t = ht(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")), r = t.append("xhtml:div"), i = ft();
  let a = e.label;
  e.label && kr(e.label) && (a = await ys(e.label.replace(Er.lineBreakRegex, `
`), i));
  const o = '<span class="' + (e.isNode ? "nodeLabel" : "edgeLabel") + '" ' + (e.labelStyle ? 'style="' + e.labelStyle + '"' : "") + // codeql [js/html-constructed-from-input] : false positive
  ">" + a + "</span>";
  return r.html(Jt(o, i)), Bf(r, e.labelStyle), r.style("display", "inline-block"), r.style("padding-right", "1px"), r.style("white-space", "nowrap"), r.attr("xmlns", "http://www.w3.org/1999/xhtml"), t.node();
}
p(Lf, "addHtmlLabel");
var GC = /* @__PURE__ */ p(async (e, t, r, i) => {
  let a = e || "";
  if (typeof a == "object" && (a = a[0]), kt(ft().flowchart.htmlLabels)) {
    a = a.replace(/\\n|\n/g, "<br />"), $.info("vertexText" + a);
    const n = {
      isNode: i,
      label: er(a).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s) => `<i class='${s.replace(":", " ")}'></i>`
      ),
      labelStyle: t && t.replace("fill:", "color:")
    };
    return await Lf(n);
  } else {
    const n = document.createElementNS("http://www.w3.org/2000/svg", "text");
    n.setAttribute("style", t.replace("color:", "fill:"));
    let o = [];
    typeof a == "string" ? o = a.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(a) ? o = a : o = [];
    for (const s of o) {
      const l = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      l.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), l.setAttribute("dy", "1em"), l.setAttribute("x", "0"), r ? l.setAttribute("class", "title-row") : l.setAttribute("class", "row"), l.textContent = s.trim(), n.appendChild(l);
    }
    return n;
  }
}, "createLabel"), je = GC, Ie = /* @__PURE__ */ p((e, t, r, i, a) => [
  "M",
  e + a,
  t,
  // Move to the first point
  "H",
  e + r - a,
  // Draw horizontal line to the beginning of the right corner
  "A",
  a,
  a,
  0,
  0,
  1,
  e + r,
  t + a,
  // Draw arc to the right top corner
  "V",
  t + i - a,
  // Draw vertical line down to the beginning of the right bottom corner
  "A",
  a,
  a,
  0,
  0,
  1,
  e + r - a,
  t + i,
  // Draw arc to the right bottom corner
  "H",
  e + a,
  // Draw horizontal line to the beginning of the left bottom corner
  "A",
  a,
  a,
  0,
  0,
  1,
  e,
  t + i - a,
  // Draw arc to the left bottom corner
  "V",
  t + a,
  // Draw vertical line up to the beginning of the left top corner
  "A",
  a,
  a,
  0,
  0,
  1,
  e + a,
  t,
  // Draw arc to the left top corner
  "Z"
  // Close the path
].join(" "), "createRoundedRectPathD"), Mf = /* @__PURE__ */ p(async (e, t) => {
  $.info("Creating subgraph rect for ", t.id, t);
  const r = ft(), { themeVariables: i, handDrawnSeed: a } = r, { clusterBkg: n, clusterBorder: o } = i, { labelStyles: s, nodeStyles: l, borderStyles: c, backgroundStyles: h } = G(t), u = e.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.id).attr("data-look", t.look), f = kt(r.flowchart.htmlLabels), d = u.insert("g").attr("class", "cluster-label "), g = await Oe(d, t.label, {
    style: t.labelStyle,
    useHtmlLabels: f,
    isNode: !0
  });
  let m = g.getBBox();
  if (kt(r.flowchart.htmlLabels)) {
    const T = g.children[0], D = ht(g);
    m = T.getBoundingClientRect(), D.attr("width", m.width), D.attr("height", m.height);
  }
  const y = t.width <= m.width + t.padding ? m.width + t.padding : t.width;
  t.width <= m.width + t.padding ? t.diff = (y - t.width) / 2 - t.padding : t.diff = -t.padding;
  const x = t.height, b = t.x - y / 2, _ = t.y - x / 2;
  $.trace("Data ", t, JSON.stringify(t));
  let S;
  if (t.look === "handDrawn") {
    const T = U.svg(u), D = j(t, {
      roughness: 0.7,
      fill: n,
      // fill: 'red',
      stroke: o,
      fillWeight: 3,
      seed: a
    }), P = T.path(Ie(b, _, y, x, 0), D);
    S = u.insert(() => ($.debug("Rough node insert CXC", P), P), ":first-child"), S.select("path:nth-child(2)").attr("style", c.join(";")), S.select("path").attr("style", h.join(";").replace("fill", "stroke"));
  } else
    S = u.insert("rect", ":first-child"), S.attr("style", l).attr("rx", t.rx).attr("ry", t.ry).attr("x", b).attr("y", _).attr("width", y).attr("height", x);
  const { subGraphTitleTopMargin: w } = qs(r);
  if (d.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${t.x - m.width / 2}, ${t.y - t.height / 2 + w})`
  ), s) {
    const T = d.select("span");
    T && T.attr("style", s);
  }
  const C = S.node().getBBox();
  return t.offsetX = 0, t.width = C.width, t.height = C.height, t.offsetY = m.height - t.padding / 2, t.intersect = function(T) {
    return $r(t, T);
  }, { cluster: u, labelBBox: m };
}, "rect"), XC = /* @__PURE__ */ p((e, t) => {
  const r = e.insert("g").attr("class", "note-cluster").attr("id", t.id), i = r.insert("rect", ":first-child"), a = 0 * t.padding, n = a / 2;
  i.attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - t.width / 2 - n).attr("y", t.y - t.height / 2 - n).attr("width", t.width + a).attr("height", t.height + a).attr("fill", "none");
  const o = i.node().getBBox();
  return t.width = o.width, t.height = o.height, t.intersect = function(s) {
    return $r(t, s);
  }, { cluster: r, labelBBox: { width: 0, height: 0 } };
}, "noteGroup"), VC = /* @__PURE__ */ p(async (e, t) => {
  const r = ft(), { themeVariables: i, handDrawnSeed: a } = r, { altBackground: n, compositeBackground: o, compositeTitleBackground: s, nodeBorder: l } = i, c = e.insert("g").attr("class", t.cssClasses).attr("id", t.id).attr("data-id", t.id).attr("data-look", t.look), h = c.insert("g", ":first-child"), u = c.insert("g").attr("class", "cluster-label");
  let f = c.append("rect");
  const d = u.node().appendChild(await je(t.label, t.labelStyle, void 0, !0));
  let g = d.getBBox();
  if (kt(r.flowchart.htmlLabels)) {
    const P = d.children[0], I = ht(d);
    g = P.getBoundingClientRect(), I.attr("width", g.width), I.attr("height", g.height);
  }
  const m = 0 * t.padding, y = m / 2, x = (t.width <= g.width + t.padding ? g.width + t.padding : t.width) + m;
  t.width <= g.width + t.padding ? t.diff = (x - t.width) / 2 - t.padding : t.diff = -t.padding;
  const b = t.height + m, _ = t.height + m - g.height - 6, S = t.x - x / 2, w = t.y - b / 2;
  t.width = x;
  const C = t.y - t.height / 2 - y + g.height + 2;
  let T;
  if (t.look === "handDrawn") {
    const P = t.cssClasses.includes("statediagram-cluster-alt"), I = U.svg(c), E = t.rx || t.ry ? I.path(Ie(S, w, x, b, 10), {
      roughness: 0.7,
      fill: s,
      fillStyle: "solid",
      stroke: l,
      seed: a
    }) : I.rectangle(S, w, x, b, { seed: a });
    T = c.insert(() => E, ":first-child");
    const W = I.rectangle(S, C, x, _, {
      fill: P ? n : o,
      fillStyle: P ? "hachure" : "solid",
      stroke: l,
      seed: a
    });
    T = c.insert(() => E, ":first-child"), f = c.insert(() => W);
  } else
    T = h.insert("rect", ":first-child"), T.attr("class", "outer").attr("x", S).attr("y", w).attr("width", x).attr("height", b).attr("data-look", t.look), f.attr("class", "inner").attr("x", S).attr("y", C).attr("width", x).attr("height", _);
  u.attr(
    "transform",
    `translate(${t.x - g.width / 2}, ${w + 1 - (kt(r.flowchart.htmlLabels) ? 0 : 3)})`
  );
  const D = T.node().getBBox();
  return t.height = D.height, t.offsetX = 0, t.offsetY = g.height - t.padding / 2, t.labelBBox = g, t.intersect = function(P) {
    return $r(t, P);
  }, { cluster: c, labelBBox: g };
}, "roundedWithTitle"), KC = /* @__PURE__ */ p(async (e, t) => {
  $.info("Creating subgraph rect for ", t.id, t);
  const r = ft(), { themeVariables: i, handDrawnSeed: a } = r, { clusterBkg: n, clusterBorder: o } = i, { labelStyles: s, nodeStyles: l, borderStyles: c, backgroundStyles: h } = G(t), u = e.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.id).attr("data-look", t.look), f = kt(r.flowchart.htmlLabels), d = u.insert("g").attr("class", "cluster-label "), g = await Oe(d, t.label, {
    style: t.labelStyle,
    useHtmlLabels: f,
    isNode: !0,
    width: t.width
  });
  let m = g.getBBox();
  if (kt(r.flowchart.htmlLabels)) {
    const T = g.children[0], D = ht(g);
    m = T.getBoundingClientRect(), D.attr("width", m.width), D.attr("height", m.height);
  }
  const y = t.width <= m.width + t.padding ? m.width + t.padding : t.width;
  t.width <= m.width + t.padding ? t.diff = (y - t.width) / 2 - t.padding : t.diff = -t.padding;
  const x = t.height, b = t.x - y / 2, _ = t.y - x / 2;
  $.trace("Data ", t, JSON.stringify(t));
  let S;
  if (t.look === "handDrawn") {
    const T = U.svg(u), D = j(t, {
      roughness: 0.7,
      fill: n,
      // fill: 'red',
      stroke: o,
      fillWeight: 4,
      seed: a
    }), P = T.path(Ie(b, _, y, x, t.rx), D);
    S = u.insert(() => ($.debug("Rough node insert CXC", P), P), ":first-child"), S.select("path:nth-child(2)").attr("style", c.join(";")), S.select("path").attr("style", h.join(";").replace("fill", "stroke"));
  } else
    S = u.insert("rect", ":first-child"), S.attr("style", l).attr("rx", t.rx).attr("ry", t.ry).attr("x", b).attr("y", _).attr("width", y).attr("height", x);
  const { subGraphTitleTopMargin: w } = qs(r);
  if (d.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${t.x - m.width / 2}, ${t.y - t.height / 2 + w})`
  ), s) {
    const T = d.select("span");
    T && T.attr("style", s);
  }
  const C = S.node().getBBox();
  return t.offsetX = 0, t.width = C.width, t.height = C.height, t.offsetY = m.height - t.padding / 2, t.intersect = function(T) {
    return $r(t, T);
  }, { cluster: u, labelBBox: m };
}, "kanbanSection"), ZC = /* @__PURE__ */ p((e, t) => {
  const r = ft(), { themeVariables: i, handDrawnSeed: a } = r, { nodeBorder: n } = i, o = e.insert("g").attr("class", t.cssClasses).attr("id", t.id).attr("data-look", t.look), s = o.insert("g", ":first-child"), l = 0 * t.padding, c = t.width + l;
  t.diff = -t.padding;
  const h = t.height + l, u = t.x - c / 2, f = t.y - h / 2;
  t.width = c;
  let d;
  if (t.look === "handDrawn") {
    const y = U.svg(o).rectangle(u, f, c, h, {
      fill: "lightgrey",
      roughness: 0.5,
      strokeLineDash: [5],
      stroke: n,
      seed: a
    });
    d = o.insert(() => y, ":first-child");
  } else
    d = s.insert("rect", ":first-child"), d.attr("class", "divider").attr("x", u).attr("y", f).attr("width", c).attr("height", h).attr("data-look", t.look);
  const g = d.node().getBBox();
  return t.height = g.height, t.offsetX = 0, t.offsetY = 0, t.intersect = function(m) {
    return $r(t, m);
  }, { cluster: o, labelBBox: {} };
}, "divider"), QC = Mf, JC = {
  rect: Mf,
  squareRect: QC,
  roundedWithTitle: VC,
  noteGroup: XC,
  divider: ZC,
  kanbanSection: KC
}, Af = /* @__PURE__ */ new Map(), t_ = /* @__PURE__ */ p(async (e, t) => {
  const r = t.shape || "rect", i = await JC[r](e, t);
  return Af.set(t.id, i), i;
}, "insertCluster"), jS = /* @__PURE__ */ p(() => {
  Af = /* @__PURE__ */ new Map();
}, "clear");
function Ef(e, t) {
  return e.intersect(t);
}
p(Ef, "intersectNode");
var e_ = Ef;
function Ff(e, t, r, i) {
  var a = e.x, n = e.y, o = a - i.x, s = n - i.y, l = Math.sqrt(t * t * s * s + r * r * o * o), c = Math.abs(t * r * o / l);
  i.x < a && (c = -c);
  var h = Math.abs(t * r * s / l);
  return i.y < n && (h = -h), { x: a + c, y: n + h };
}
p(Ff, "intersectEllipse");
var $f = Ff;
function Df(e, t, r) {
  return $f(e, t, t, r);
}
p(Df, "intersectCircle");
var r_ = Df;
function Of(e, t, r, i) {
  {
    const a = t.y - e.y, n = e.x - t.x, o = t.x * e.y - e.x * t.y, s = a * r.x + n * r.y + o, l = a * i.x + n * i.y + o, c = 1e-6;
    if (s !== 0 && l !== 0 && ls(s, l))
      return;
    const h = i.y - r.y, u = r.x - i.x, f = i.x * r.y - r.x * i.y, d = h * e.x + u * e.y + f, g = h * t.x + u * t.y + f;
    if (Math.abs(d) < c && Math.abs(g) < c && ls(d, g))
      return;
    const m = a * u - h * n;
    if (m === 0)
      return;
    const y = Math.abs(m / 2);
    let x = n * f - u * o;
    const b = x < 0 ? (x - y) / m : (x + y) / m;
    x = h * o - a * f;
    const _ = x < 0 ? (x - y) / m : (x + y) / m;
    return { x: b, y: _ };
  }
}
p(Of, "intersectLine");
function ls(e, t) {
  return e * t > 0;
}
p(ls, "sameSign");
var i_ = Of;
function If(e, t, r) {
  let i = e.x, a = e.y, n = [], o = Number.POSITIVE_INFINITY, s = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(h) {
    o = Math.min(o, h.x), s = Math.min(s, h.y);
  }) : (o = Math.min(o, t.x), s = Math.min(s, t.y));
  let l = i - e.width / 2 - o, c = a - e.height / 2 - s;
  for (let h = 0; h < t.length; h++) {
    let u = t[h], f = t[h < t.length - 1 ? h + 1 : 0], d = i_(
      e,
      r,
      { x: l + u.x, y: c + u.y },
      { x: l + f.x, y: c + f.y }
    );
    d && n.push(d);
  }
  return n.length ? (n.length > 1 && n.sort(function(h, u) {
    let f = h.x - r.x, d = h.y - r.y, g = Math.sqrt(f * f + d * d), m = u.x - r.x, y = u.y - r.y, x = Math.sqrt(m * m + y * y);
    return g < x ? -1 : g === x ? 0 : 1;
  }), n[0]) : e;
}
p(If, "intersectPolygon");
var a_ = If, q = {
  node: e_,
  circle: r_,
  ellipse: $f,
  polygon: a_,
  rect: $r
};
function Rf(e, t) {
  const { labelStyles: r } = G(t);
  t.labelStyle = r;
  const i = tt(t);
  let a = i;
  i || (a = "anchor");
  const n = e.insert("g").attr("class", a).attr("id", t.domId || t.id), o = 1, { cssStyles: s } = t, l = U.svg(n), c = j(t, { fill: "black", stroke: "none", fillStyle: "solid" });
  t.look !== "handDrawn" && (c.roughness = 0);
  const h = l.circle(0, 0, o * 2, c), u = n.insert(() => h, ":first-child");
  return u.attr("class", "anchor").attr("style", Ot(s)), V(t, u), t.intersect = function(f) {
    return $.info("Circle intersect", t, o, f), q.circle(t, o, f);
  }, n;
}
p(Rf, "anchor");
function cs(e, t, r, i, a, n, o) {
  const l = (e + r) / 2, c = (t + i) / 2, h = Math.atan2(i - t, r - e), u = (r - e) / 2, f = (i - t) / 2, d = u / a, g = f / n, m = Math.sqrt(d ** 2 + g ** 2);
  if (m > 1)
    throw new Error("The given radii are too small to create an arc between the points.");
  const y = Math.sqrt(1 - m ** 2), x = l + y * n * Math.sin(h) * (o ? -1 : 1), b = c - y * a * Math.cos(h) * (o ? -1 : 1), _ = Math.atan2((t - b) / n, (e - x) / a);
  let w = Math.atan2((i - b) / n, (r - x) / a) - _;
  o && w < 0 && (w += 2 * Math.PI), !o && w > 0 && (w -= 2 * Math.PI);
  const C = [];
  for (let T = 0; T < 20; T++) {
    const D = T / 19, P = _ + D * w, I = x + a * Math.cos(P), E = b + n * Math.sin(P);
    C.push({ x: I, y: E });
  }
  return C;
}
p(cs, "generateArcPoints");
async function Pf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.width + t.padding + 20, s = n.height + t.padding, l = s / 2, c = l / (2.5 + s / 50), { cssStyles: h } = t, u = [
    { x: o / 2, y: -s / 2 },
    { x: -o / 2, y: -s / 2 },
    ...cs(-o / 2, -s / 2, -o / 2, s / 2, c, l, !1),
    { x: o / 2, y: s / 2 },
    ...cs(o / 2, s / 2, o / 2, -s / 2, c, l, !0)
  ], f = U.svg(a), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = lt(u), m = f.path(g, d), y = a.insert(() => m, ":first-child");
  return y.attr("class", "basic label-container"), h && t.look !== "handDrawn" && y.selectAll("path").attr("style", h), i && t.look !== "handDrawn" && y.selectAll("path").attr("style", i), y.attr("transform", `translate(${c / 2}, 0)`), V(t, y), t.intersect = function(x) {
    return q.polygon(t, u, x);
  }, a;
}
p(Pf, "bowTieRect");
function Re(e, t, r, i) {
  return e.insert("polygon", ":first-child").attr(
    "points",
    i.map(function(a) {
      return a.x + "," + a.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + r / 2 + ")");
}
p(Re, "insertPolygonShape");
async function Nf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.height + t.padding, s = 12, l = n.width + t.padding + s, c = 0, h = l, u = -o, f = 0, d = [
    { x: c + s, y: u },
    { x: h, y: u },
    { x: h, y: f },
    { x: c, y: f },
    { x: c, y: u + s },
    { x: c + s, y: u }
  ];
  let g;
  const { cssStyles: m } = t;
  if (t.look === "handDrawn") {
    const y = U.svg(a), x = j(t, {}), b = lt(d), _ = y.path(b, x);
    g = a.insert(() => _, ":first-child").attr("transform", `translate(${-l / 2}, ${o / 2})`), m && g.attr("style", m);
  } else
    g = Re(a, l, o, d);
  return i && g.attr("style", i), V(t, g), t.intersect = function(y) {
    return q.polygon(t, d, y);
  }, a;
}
p(Nf, "card");
function Wf(e, t) {
  const { nodeStyles: r } = G(t);
  t.label = "";
  const i = e.insert("g").attr("class", tt(t)).attr("id", t.domId ?? t.id), { cssStyles: a } = t, n = Math.max(28, t.width ?? 0), o = [
    { x: 0, y: n / 2 },
    { x: n / 2, y: 0 },
    { x: 0, y: -n / 2 },
    { x: -n / 2, y: 0 }
  ], s = U.svg(i), l = j(t, {});
  t.look !== "handDrawn" && (l.roughness = 0, l.fillStyle = "solid");
  const c = lt(o), h = s.path(c, l), u = i.insert(() => h, ":first-child");
  return a && t.look !== "handDrawn" && u.selectAll("path").attr("style", a), r && t.look !== "handDrawn" && u.selectAll("path").attr("style", r), t.width = 28, t.height = 28, t.intersect = function(f) {
    return q.polygon(t, o, f);
  }, i;
}
p(Wf, "choice");
async function Qs(e, t, r) {
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.labelStyle = i;
  const { shapeSvg: n, bbox: o, halfPadding: s } = await et(e, t, tt(t)), l = (r == null ? void 0 : r.padding) ?? s, c = o.width / 2 + l;
  let h;
  const { cssStyles: u } = t;
  if (t.look === "handDrawn") {
    const f = U.svg(n), d = j(t, {}), g = f.circle(0, 0, c * 2, d);
    h = n.insert(() => g, ":first-child"), h.attr("class", "basic label-container").attr("style", Ot(u));
  } else
    h = n.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", a).attr("r", c).attr("cx", 0).attr("cy", 0);
  return V(t, h), t.calcIntersect = function(f, d) {
    const g = f.width / 2;
    return q.circle(f, g, d);
  }, t.intersect = function(f) {
    return $.info("Circle intersect", t, c, f), q.circle(t, c, f);
  }, n;
}
p(Qs, "circle");
function zf(e) {
  const t = Math.cos(Math.PI / 4), r = Math.sin(Math.PI / 4), i = e * 2, a = { x: i / 2 * t, y: i / 2 * r }, n = { x: -(i / 2) * t, y: i / 2 * r }, o = { x: -(i / 2) * t, y: -(i / 2) * r }, s = { x: i / 2 * t, y: -(i / 2) * r };
  return `M ${n.x},${n.y} L ${s.x},${s.y}
                   M ${a.x},${a.y} L ${o.x},${o.y}`;
}
p(zf, "createLine");
function qf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r, t.label = "";
  const a = e.insert("g").attr("class", tt(t)).attr("id", t.domId ?? t.id), n = Math.max(30, (t == null ? void 0 : t.width) ?? 0), { cssStyles: o } = t, s = U.svg(a), l = j(t, {});
  t.look !== "handDrawn" && (l.roughness = 0, l.fillStyle = "solid");
  const c = s.circle(0, 0, n * 2, l), h = zf(n), u = s.path(h, l), f = a.insert(() => c, ":first-child");
  return f.insert(() => u), o && t.look !== "handDrawn" && f.selectAll("path").attr("style", o), i && t.look !== "handDrawn" && f.selectAll("path").attr("style", i), V(t, f), t.intersect = function(d) {
    return $.info("crossedCircle intersect", t, { radius: n, point: d }), q.circle(t, n, d);
  }, a;
}
p(qf, "crossedCircle");
function Ce(e, t, r, i = 100, a = 0, n = 180) {
  const o = [], s = a * Math.PI / 180, h = (n * Math.PI / 180 - s) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = s + u * h, d = e + r * Math.cos(f), g = t + r * Math.sin(f);
    o.push({ x: -d, y: -g });
  }
  return o;
}
p(Ce, "generateCirclePoints");
async function Hf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = n.width + (t.padding ?? 0), l = n.height + (t.padding ?? 0), c = Math.max(5, l * 0.1), { cssStyles: h } = t, u = [
    ...Ce(s / 2, -l / 2, c, 30, -90, 0),
    { x: -s / 2 - c, y: c },
    ...Ce(s / 2 + c * 2, -c, c, 20, -180, -270),
    ...Ce(s / 2 + c * 2, c, c, 20, -90, -180),
    { x: -s / 2 - c, y: -l / 2 },
    ...Ce(s / 2, l / 2, c, 20, 0, 90)
  ], f = [
    { x: s / 2, y: -l / 2 - c },
    { x: -s / 2, y: -l / 2 - c },
    ...Ce(s / 2, -l / 2, c, 20, -90, 0),
    { x: -s / 2 - c, y: -c },
    ...Ce(s / 2 + s * 0.1, -c, c, 20, -180, -270),
    ...Ce(s / 2 + s * 0.1, c, c, 20, -90, -180),
    { x: -s / 2 - c, y: l / 2 },
    ...Ce(s / 2, l / 2, c, 20, 0, 90),
    { x: -s / 2, y: l / 2 + c },
    { x: s / 2, y: l / 2 + c }
  ], d = U.svg(a), g = j(t, { fill: "none" });
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const y = lt(u).replace("Z", ""), x = d.path(y, g), b = lt(f), _ = d.path(b, { ...g }), S = a.insert("g", ":first-child");
  return S.insert(() => _, ":first-child").attr("stroke-opacity", 0), S.insert(() => x, ":first-child"), S.attr("class", "text"), h && t.look !== "handDrawn" && S.selectAll("path").attr("style", h), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), S.attr("transform", `translate(${c}, 0)`), o.attr(
    "transform",
    `translate(${-s / 2 + c - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, S), t.intersect = function(w) {
    return q.polygon(t, f, w);
  }, a;
}
p(Hf, "curlyBraceLeft");
function _e(e, t, r, i = 100, a = 0, n = 180) {
  const o = [], s = a * Math.PI / 180, h = (n * Math.PI / 180 - s) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = s + u * h, d = e + r * Math.cos(f), g = t + r * Math.sin(f);
    o.push({ x: d, y: g });
  }
  return o;
}
p(_e, "generateCirclePoints");
async function Yf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = n.width + (t.padding ?? 0), l = n.height + (t.padding ?? 0), c = Math.max(5, l * 0.1), { cssStyles: h } = t, u = [
    ..._e(s / 2, -l / 2, c, 20, -90, 0),
    { x: s / 2 + c, y: -c },
    ..._e(s / 2 + c * 2, -c, c, 20, -180, -270),
    ..._e(s / 2 + c * 2, c, c, 20, -90, -180),
    { x: s / 2 + c, y: l / 2 },
    ..._e(s / 2, l / 2, c, 20, 0, 90)
  ], f = [
    { x: -s / 2, y: -l / 2 - c },
    { x: s / 2, y: -l / 2 - c },
    ..._e(s / 2, -l / 2, c, 20, -90, 0),
    { x: s / 2 + c, y: -c },
    ..._e(s / 2 + c * 2, -c, c, 20, -180, -270),
    ..._e(s / 2 + c * 2, c, c, 20, -90, -180),
    { x: s / 2 + c, y: l / 2 },
    ..._e(s / 2, l / 2, c, 20, 0, 90),
    { x: s / 2, y: l / 2 + c },
    { x: -s / 2, y: l / 2 + c }
  ], d = U.svg(a), g = j(t, { fill: "none" });
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const y = lt(u).replace("Z", ""), x = d.path(y, g), b = lt(f), _ = d.path(b, { ...g }), S = a.insert("g", ":first-child");
  return S.insert(() => _, ":first-child").attr("stroke-opacity", 0), S.insert(() => x, ":first-child"), S.attr("class", "text"), h && t.look !== "handDrawn" && S.selectAll("path").attr("style", h), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), S.attr("transform", `translate(${-c}, 0)`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) / 2 - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, S), t.intersect = function(w) {
    return q.polygon(t, f, w);
  }, a;
}
p(Yf, "curlyBraceRight");
function Lt(e, t, r, i = 100, a = 0, n = 180) {
  const o = [], s = a * Math.PI / 180, h = (n * Math.PI / 180 - s) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = s + u * h, d = e + r * Math.cos(f), g = t + r * Math.sin(f);
    o.push({ x: -d, y: -g });
  }
  return o;
}
p(Lt, "generateCirclePoints");
async function Uf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = n.width + (t.padding ?? 0), l = n.height + (t.padding ?? 0), c = Math.max(5, l * 0.1), { cssStyles: h } = t, u = [
    ...Lt(s / 2, -l / 2, c, 30, -90, 0),
    { x: -s / 2 - c, y: c },
    ...Lt(s / 2 + c * 2, -c, c, 20, -180, -270),
    ...Lt(s / 2 + c * 2, c, c, 20, -90, -180),
    { x: -s / 2 - c, y: -l / 2 },
    ...Lt(s / 2, l / 2, c, 20, 0, 90)
  ], f = [
    ...Lt(-s / 2 + c + c / 2, -l / 2, c, 20, -90, -180),
    { x: s / 2 - c / 2, y: c },
    ...Lt(-s / 2 - c / 2, -c, c, 20, 0, 90),
    ...Lt(-s / 2 - c / 2, c, c, 20, -90, 0),
    { x: s / 2 - c / 2, y: -c },
    ...Lt(-s / 2 + c + c / 2, l / 2, c, 30, -180, -270)
  ], d = [
    { x: s / 2, y: -l / 2 - c },
    { x: -s / 2, y: -l / 2 - c },
    ...Lt(s / 2, -l / 2, c, 20, -90, 0),
    { x: -s / 2 - c, y: -c },
    ...Lt(s / 2 + c * 2, -c, c, 20, -180, -270),
    ...Lt(s / 2 + c * 2, c, c, 20, -90, -180),
    { x: -s / 2 - c, y: l / 2 },
    ...Lt(s / 2, l / 2, c, 20, 0, 90),
    { x: -s / 2, y: l / 2 + c },
    { x: s / 2 - c - c / 2, y: l / 2 + c },
    ...Lt(-s / 2 + c + c / 2, -l / 2, c, 20, -90, -180),
    { x: s / 2 - c / 2, y: c },
    ...Lt(-s / 2 - c / 2, -c, c, 20, 0, 90),
    ...Lt(-s / 2 - c / 2, c, c, 20, -90, 0),
    { x: s / 2 - c / 2, y: -c },
    ...Lt(-s / 2 + c + c / 2, l / 2, c, 30, -180, -270)
  ], g = U.svg(a), m = j(t, { fill: "none" });
  t.look !== "handDrawn" && (m.roughness = 0, m.fillStyle = "solid");
  const x = lt(u).replace("Z", ""), b = g.path(x, m), S = lt(f).replace("Z", ""), w = g.path(S, m), C = lt(d), T = g.path(C, { ...m }), D = a.insert("g", ":first-child");
  return D.insert(() => T, ":first-child").attr("stroke-opacity", 0), D.insert(() => b, ":first-child"), D.insert(() => w, ":first-child"), D.attr("class", "text"), h && t.look !== "handDrawn" && D.selectAll("path").attr("style", h), i && t.look !== "handDrawn" && D.selectAll("path").attr("style", i), D.attr("transform", `translate(${c - c / 4}, 0)`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) / 2 - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, D), t.intersect = function(P) {
    return q.polygon(t, d, P);
  }, a;
}
p(Uf, "curlyBraces");
async function jf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = 80, s = 20, l = Math.max(o, (n.width + (t.padding ?? 0) * 2) * 1.25, (t == null ? void 0 : t.width) ?? 0), c = Math.max(s, n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), h = c / 2, { cssStyles: u } = t, f = U.svg(a), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = l, m = c, y = g - h, x = m / 4, b = [
    { x: y, y: 0 },
    { x, y: 0 },
    { x: 0, y: m / 2 },
    { x, y: m },
    { x: y, y: m },
    ...fi(-y, -m / 2, h, 50, 270, 90)
  ], _ = lt(b), S = f.path(_, d), w = a.insert(() => S, ":first-child");
  return w.attr("class", "basic label-container"), u && t.look !== "handDrawn" && w.selectChildren("path").attr("style", u), i && t.look !== "handDrawn" && w.selectChildren("path").attr("style", i), w.attr("transform", `translate(${-l / 2}, ${-c / 2})`), V(t, w), t.intersect = function(C) {
    return q.polygon(t, b, C);
  }, a;
}
p(jf, "curvedTrapezoid");
var n_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [
  `M${e},${t + n}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `a${a},${n} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `l0,${-i}`
].join(" "), "createCylinderPathD"), s_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [
  `M${e},${t + n}`,
  `M${e + r},${t + n}`,
  `a${a},${n} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `l0,${-i}`
].join(" "), "createOuterCylinderPathD"), o_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [`M${e - r / 2},${-i / 2}`, `a${a},${n} 0,0,0 ${r},0`].join(" "), "createInnerCylinderPathD");
async function Gf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + t.padding, t.width ?? 0), l = s / 2, c = l / (2.5 + s / 50), h = Math.max(n.height + c + t.padding, t.height ?? 0);
  let u;
  const { cssStyles: f } = t;
  if (t.look === "handDrawn") {
    const d = U.svg(a), g = s_(0, 0, s, h, l, c), m = o_(0, c, s, h, l, c), y = d.path(g, j(t, {})), x = d.path(m, j(t, { fill: "none" }));
    u = a.insert(() => x, ":first-child"), u = a.insert(() => y, ":first-child"), u.attr("class", "basic label-container"), f && u.attr("style", f);
  } else {
    const d = n_(0, 0, s, h, l, c);
    u = a.insert("path", ":first-child").attr("d", d).attr("class", "basic label-container").attr("style", Ot(f)).attr("style", i);
  }
  return u.attr("label-offset-y", c), u.attr("transform", `translate(${-s / 2}, ${-(h / 2 + c)})`), V(t, u), o.attr(
    "transform",
    `translate(${-(n.width / 2) - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + (t.padding ?? 0) / 1.5 - (n.y - (n.top ?? 0))})`
  ), t.intersect = function(d) {
    const g = q.rect(t, d), m = g.x - (t.x ?? 0);
    if (l != 0 && (Math.abs(m) < (t.width ?? 0) / 2 || Math.abs(m) == (t.width ?? 0) / 2 && Math.abs(g.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - c)) {
      let y = c * c * (1 - m * m / (l * l));
      y > 0 && (y = Math.sqrt(y)), y = c - y, d.y - (t.y ?? 0) > 0 && (y = -y), g.y += y;
    }
    return g;
  }, a;
}
p(Gf, "cylinder");
async function Xf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = n.width + t.padding, l = n.height + t.padding, c = l * 0.2, h = -s / 2, u = -l / 2 - c / 2, { cssStyles: f } = t, d = U.svg(a), g = j(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const m = [
    { x: h, y: u + c },
    { x: -h, y: u + c },
    { x: -h, y: -u },
    { x: h, y: -u },
    { x: h, y: u },
    { x: -h, y: u },
    { x: -h, y: u + c }
  ], y = d.polygon(
    m.map((b) => [b.x, b.y]),
    g
  ), x = a.insert(() => y, ":first-child");
  return x.attr("class", "basic label-container"), f && t.look !== "handDrawn" && x.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && x.selectAll("path").attr("style", i), o.attr(
    "transform",
    `translate(${h + (t.padding ?? 0) / 2 - (n.x - (n.left ?? 0))}, ${u + c + (t.padding ?? 0) / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, x), t.intersect = function(b) {
    return q.rect(t, b);
  }, a;
}
p(Xf, "dividedRectangle");
async function Vf(e, t) {
  var f, d;
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, halfPadding: o } = await et(e, t, tt(t)), l = n.width / 2 + o + 5, c = n.width / 2 + o;
  let h;
  const { cssStyles: u } = t;
  if (t.look === "handDrawn") {
    const g = U.svg(a), m = j(t, { roughness: 0.2, strokeWidth: 2.5 }), y = j(t, { roughness: 0.2, strokeWidth: 1.5 }), x = g.circle(0, 0, l * 2, m), b = g.circle(0, 0, c * 2, y);
    h = a.insert("g", ":first-child"), h.attr("class", Ot(t.cssClasses)).attr("style", Ot(u)), (f = h.node()) == null || f.appendChild(x), (d = h.node()) == null || d.appendChild(b);
  } else {
    h = a.insert("g", ":first-child");
    const g = h.insert("circle", ":first-child"), m = h.insert("circle");
    h.attr("class", "basic label-container").attr("style", i), g.attr("class", "outer-circle").attr("style", i).attr("r", l).attr("cx", 0).attr("cy", 0), m.attr("class", "inner-circle").attr("style", i).attr("r", c).attr("cx", 0).attr("cy", 0);
  }
  return V(t, h), t.intersect = function(g) {
    return $.info("DoubleCircle intersect", t, l, g), q.circle(t, l, g);
  }, a;
}
p(Vf, "doublecircle");
function Kf(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.label = "", t.labelStyle = i;
  const n = e.insert("g").attr("class", tt(t)).attr("id", t.domId ?? t.id), o = 7, { cssStyles: s } = t, l = U.svg(n), { nodeBorder: c } = r, h = j(t, { fillStyle: "solid" });
  t.look !== "handDrawn" && (h.roughness = 0);
  const u = l.circle(0, 0, o * 2, h), f = n.insert(() => u, ":first-child");
  return f.selectAll("path").attr("style", `fill: ${c} !important;`), s && s.length > 0 && t.look !== "handDrawn" && f.selectAll("path").attr("style", s), a && t.look !== "handDrawn" && f.selectAll("path").attr("style", a), V(t, f), t.intersect = function(d) {
    return $.info("filledCircle intersect", t, { radius: o, point: d }), q.circle(t, o, d);
  }, n;
}
p(Kf, "filledCircle");
async function Zf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = n.width + (t.padding ?? 0), l = s + n.height, c = s + n.height, h = [
    { x: 0, y: -l },
    { x: c, y: -l },
    { x: c / 2, y: 0 }
  ], { cssStyles: u } = t, f = U.svg(a), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = lt(h), m = f.path(g, d), y = a.insert(() => m, ":first-child").attr("transform", `translate(${-l / 2}, ${l / 2})`);
  return u && t.look !== "handDrawn" && y.selectChildren("path").attr("style", u), i && t.look !== "handDrawn" && y.selectChildren("path").attr("style", i), t.width = s, t.height = l, V(t, y), o.attr(
    "transform",
    `translate(${-n.width / 2 - (n.x - (n.left ?? 0))}, ${-l / 2 + (t.padding ?? 0) / 2 + (n.y - (n.top ?? 0))})`
  ), t.intersect = function(x) {
    return $.info("Triangle intersect", t, h, x), q.polygon(t, h, x);
  }, a;
}
p(Zf, "flippedTriangle");
function Qf(e, t, { dir: r, config: { state: i, themeVariables: a } }) {
  const { nodeStyles: n } = G(t);
  t.label = "";
  const o = e.insert("g").attr("class", tt(t)).attr("id", t.domId ?? t.id), { cssStyles: s } = t;
  let l = Math.max(70, (t == null ? void 0 : t.width) ?? 0), c = Math.max(10, (t == null ? void 0 : t.height) ?? 0);
  r === "LR" && (l = Math.max(10, (t == null ? void 0 : t.width) ?? 0), c = Math.max(70, (t == null ? void 0 : t.height) ?? 0));
  const h = -1 * l / 2, u = -1 * c / 2, f = U.svg(o), d = j(t, {
    stroke: a.lineColor,
    fill: a.lineColor
  });
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = f.rectangle(h, u, l, c, d), m = o.insert(() => g, ":first-child");
  s && t.look !== "handDrawn" && m.selectAll("path").attr("style", s), n && t.look !== "handDrawn" && m.selectAll("path").attr("style", n), V(t, m);
  const y = (i == null ? void 0 : i.padding) ?? 0;
  return t.width && t.height && (t.width += y / 2 || 0, t.height += y / 2 || 0), t.intersect = function(x) {
    return q.rect(t, x);
  }, o;
}
p(Qf, "forkJoin");
async function Jf(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const a = 80, n = 50, { shapeSvg: o, bbox: s } = await et(e, t, tt(t)), l = Math.max(a, s.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), c = Math.max(n, s.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), h = c / 2, { cssStyles: u } = t, f = U.svg(o), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = [
    { x: -l / 2, y: -c / 2 },
    { x: l / 2 - h, y: -c / 2 },
    ...fi(-l / 2 + h, 0, h, 50, 90, 270),
    { x: l / 2 - h, y: c / 2 },
    { x: -l / 2, y: c / 2 }
  ], m = lt(g), y = f.path(m, d), x = o.insert(() => y, ":first-child");
  return x.attr("class", "basic label-container"), u && t.look !== "handDrawn" && x.selectChildren("path").attr("style", u), i && t.look !== "handDrawn" && x.selectChildren("path").attr("style", i), V(t, x), t.intersect = function(b) {
    return $.info("Pill intersect", t, { radius: h, point: b }), q.polygon(t, g, b);
  }, o;
}
p(Jf, "halfRoundedRectangle");
async function td(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.height + (t.padding ?? 0), s = n.width + (t.padding ?? 0) * 2.5, { cssStyles: l } = t, c = U.svg(a), h = j(t, {});
  t.look !== "handDrawn" && (h.roughness = 0, h.fillStyle = "solid");
  let u = s / 2;
  const f = u / 6;
  u = u + f;
  const d = o / 2, g = d / 2, m = u - g, y = [
    { x: -m, y: -d },
    { x: 0, y: -d },
    { x: m, y: -d },
    { x: u, y: 0 },
    { x: m, y: d },
    { x: 0, y: d },
    { x: -m, y: d },
    { x: -u, y: 0 }
  ], x = lt(y), b = c.path(x, h), _ = a.insert(() => b, ":first-child");
  return _.attr("class", "basic label-container"), l && t.look !== "handDrawn" && _.selectChildren("path").attr("style", l), i && t.look !== "handDrawn" && _.selectChildren("path").attr("style", i), t.width = s, t.height = o, V(t, _), t.intersect = function(S) {
    return q.polygon(t, y, S);
  }, a;
}
p(td, "hexagon");
async function ed(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.label = "", t.labelStyle = r;
  const { shapeSvg: a } = await et(e, t, tt(t)), n = Math.max(30, (t == null ? void 0 : t.width) ?? 0), o = Math.max(30, (t == null ? void 0 : t.height) ?? 0), { cssStyles: s } = t, l = U.svg(a), c = j(t, {});
  t.look !== "handDrawn" && (c.roughness = 0, c.fillStyle = "solid");
  const h = [
    { x: 0, y: 0 },
    { x: n, y: 0 },
    { x: 0, y: o },
    { x: n, y: o }
  ], u = lt(h), f = l.path(u, c), d = a.insert(() => f, ":first-child");
  return d.attr("class", "basic label-container"), s && t.look !== "handDrawn" && d.selectChildren("path").attr("style", s), i && t.look !== "handDrawn" && d.selectChildren("path").attr("style", i), d.attr("transform", `translate(${-n / 2}, ${-o / 2})`), V(t, d), t.intersect = function(g) {
    return $.info("Pill intersect", t, { points: h }), q.polygon(t, h, g);
  }, a;
}
p(ed, "hourglass");
async function rd(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: a } = G(t);
  t.labelStyle = a;
  const n = t.assetHeight ?? 48, o = t.assetWidth ?? 48, s = Math.max(n, o), l = i == null ? void 0 : i.wrappingWidth;
  t.width = Math.max(s, l ?? 0);
  const { shapeSvg: c, bbox: h, label: u } = await et(e, t, "icon-shape default"), f = t.pos === "t", d = s, g = s, { nodeBorder: m } = r, { stylesMap: y } = Fr(t), x = -g / 2, b = -d / 2, _ = t.label ? 8 : 0, S = U.svg(c), w = j(t, { stroke: "none", fill: "none" });
  t.look !== "handDrawn" && (w.roughness = 0, w.fillStyle = "solid");
  const C = S.rectangle(x, b, g, d, w), T = Math.max(g, h.width), D = d + h.height + _, P = S.rectangle(-T / 2, -D / 2, T, D, {
    ...w,
    fill: "transparent",
    stroke: "none"
  }), I = c.insert(() => C, ":first-child"), E = c.insert(() => P);
  if (t.icon) {
    const W = c.append("g");
    W.html(
      `<g>${await _i(t.icon, {
        height: s,
        width: s,
        fallbackPrefix: ""
      })}</g>`
    );
    const O = W.node().getBBox(), A = O.width, L = O.height, B = O.x, F = O.y;
    W.attr(
      "transform",
      `translate(${-A / 2 - B},${f ? h.height / 2 + _ / 2 - L / 2 - F : -h.height / 2 - _ / 2 - L / 2 - F})`
    ), W.attr("style", `color: ${y.get("stroke") ?? m};`);
  }
  return u.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${f ? -D / 2 : D / 2 - h.height})`
  ), I.attr(
    "transform",
    `translate(0,${f ? h.height / 2 + _ / 2 : -h.height / 2 - _ / 2})`
  ), V(t, E), t.intersect = function(W) {
    if ($.info("iconSquare intersect", t, W), !t.label)
      return q.rect(t, W);
    const O = t.x ?? 0, A = t.y ?? 0, L = t.height ?? 0;
    let B = [];
    return f ? B = [
      { x: O - h.width / 2, y: A - L / 2 },
      { x: O + h.width / 2, y: A - L / 2 },
      { x: O + h.width / 2, y: A - L / 2 + h.height + _ },
      { x: O + g / 2, y: A - L / 2 + h.height + _ },
      { x: O + g / 2, y: A + L / 2 },
      { x: O - g / 2, y: A + L / 2 },
      { x: O - g / 2, y: A - L / 2 + h.height + _ },
      { x: O - h.width / 2, y: A - L / 2 + h.height + _ }
    ] : B = [
      { x: O - g / 2, y: A - L / 2 },
      { x: O + g / 2, y: A - L / 2 },
      { x: O + g / 2, y: A - L / 2 + d },
      { x: O + h.width / 2, y: A - L / 2 + d },
      { x: O + h.width / 2 / 2, y: A + L / 2 },
      { x: O - h.width / 2, y: A + L / 2 },
      { x: O - h.width / 2, y: A - L / 2 + d },
      { x: O - g / 2, y: A - L / 2 + d }
    ], q.polygon(t, B, W);
  }, c;
}
p(rd, "icon");
async function id(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: a } = G(t);
  t.labelStyle = a;
  const n = t.assetHeight ?? 48, o = t.assetWidth ?? 48, s = Math.max(n, o), l = i == null ? void 0 : i.wrappingWidth;
  t.width = Math.max(s, l ?? 0);
  const { shapeSvg: c, bbox: h, label: u } = await et(e, t, "icon-shape default"), f = 20, d = t.label ? 8 : 0, g = t.pos === "t", { nodeBorder: m, mainBkg: y } = r, { stylesMap: x } = Fr(t), b = U.svg(c), _ = j(t, {});
  t.look !== "handDrawn" && (_.roughness = 0, _.fillStyle = "solid");
  const S = x.get("fill");
  _.stroke = S ?? y;
  const w = c.append("g");
  t.icon && w.html(
    `<g>${await _i(t.icon, {
      height: s,
      width: s,
      fallbackPrefix: ""
    })}</g>`
  );
  const C = w.node().getBBox(), T = C.width, D = C.height, P = C.x, I = C.y, E = Math.max(T, D) * Math.SQRT2 + f * 2, W = b.circle(0, 0, E, _), O = Math.max(E, h.width), A = E + h.height + d, L = b.rectangle(-O / 2, -A / 2, O, A, {
    ..._,
    fill: "transparent",
    stroke: "none"
  }), B = c.insert(() => W, ":first-child"), F = c.insert(() => L);
  return w.attr(
    "transform",
    `translate(${-T / 2 - P},${g ? h.height / 2 + d / 2 - D / 2 - I : -h.height / 2 - d / 2 - D / 2 - I})`
  ), w.attr("style", `color: ${x.get("stroke") ?? m};`), u.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${g ? -A / 2 : A / 2 - h.height})`
  ), B.attr(
    "transform",
    `translate(0,${g ? h.height / 2 + d / 2 : -h.height / 2 - d / 2})`
  ), V(t, F), t.intersect = function(M) {
    return $.info("iconSquare intersect", t, M), q.rect(t, M);
  }, c;
}
p(id, "iconCircle");
async function ad(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: a } = G(t);
  t.labelStyle = a;
  const n = t.assetHeight ?? 48, o = t.assetWidth ?? 48, s = Math.max(n, o), l = i == null ? void 0 : i.wrappingWidth;
  t.width = Math.max(s, l ?? 0);
  const { shapeSvg: c, bbox: h, halfPadding: u, label: f } = await et(
    e,
    t,
    "icon-shape default"
  ), d = t.pos === "t", g = s + u * 2, m = s + u * 2, { nodeBorder: y, mainBkg: x } = r, { stylesMap: b } = Fr(t), _ = -m / 2, S = -g / 2, w = t.label ? 8 : 0, C = U.svg(c), T = j(t, {});
  t.look !== "handDrawn" && (T.roughness = 0, T.fillStyle = "solid");
  const D = b.get("fill");
  T.stroke = D ?? x;
  const P = C.path(Ie(_, S, m, g, 5), T), I = Math.max(m, h.width), E = g + h.height + w, W = C.rectangle(-I / 2, -E / 2, I, E, {
    ...T,
    fill: "transparent",
    stroke: "none"
  }), O = c.insert(() => P, ":first-child").attr("class", "icon-shape2"), A = c.insert(() => W);
  if (t.icon) {
    const L = c.append("g");
    L.html(
      `<g>${await _i(t.icon, {
        height: s,
        width: s,
        fallbackPrefix: ""
      })}</g>`
    );
    const B = L.node().getBBox(), F = B.width, M = B.height, z = B.x, X = B.y;
    L.attr(
      "transform",
      `translate(${-F / 2 - z},${d ? h.height / 2 + w / 2 - M / 2 - X : -h.height / 2 - w / 2 - M / 2 - X})`
    ), L.attr("style", `color: ${b.get("stroke") ?? y};`);
  }
  return f.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${d ? -E / 2 : E / 2 - h.height})`
  ), O.attr(
    "transform",
    `translate(0,${d ? h.height / 2 + w / 2 : -h.height / 2 - w / 2})`
  ), V(t, A), t.intersect = function(L) {
    if ($.info("iconSquare intersect", t, L), !t.label)
      return q.rect(t, L);
    const B = t.x ?? 0, F = t.y ?? 0, M = t.height ?? 0;
    let z = [];
    return d ? z = [
      { x: B - h.width / 2, y: F - M / 2 },
      { x: B + h.width / 2, y: F - M / 2 },
      { x: B + h.width / 2, y: F - M / 2 + h.height + w },
      { x: B + m / 2, y: F - M / 2 + h.height + w },
      { x: B + m / 2, y: F + M / 2 },
      { x: B - m / 2, y: F + M / 2 },
      { x: B - m / 2, y: F - M / 2 + h.height + w },
      { x: B - h.width / 2, y: F - M / 2 + h.height + w }
    ] : z = [
      { x: B - m / 2, y: F - M / 2 },
      { x: B + m / 2, y: F - M / 2 },
      { x: B + m / 2, y: F - M / 2 + g },
      { x: B + h.width / 2, y: F - M / 2 + g },
      { x: B + h.width / 2 / 2, y: F + M / 2 },
      { x: B - h.width / 2, y: F + M / 2 },
      { x: B - h.width / 2, y: F - M / 2 + g },
      { x: B - m / 2, y: F - M / 2 + g }
    ], q.polygon(t, z, L);
  }, c;
}
p(ad, "iconRounded");
async function nd(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: a } = G(t);
  t.labelStyle = a;
  const n = t.assetHeight ?? 48, o = t.assetWidth ?? 48, s = Math.max(n, o), l = i == null ? void 0 : i.wrappingWidth;
  t.width = Math.max(s, l ?? 0);
  const { shapeSvg: c, bbox: h, halfPadding: u, label: f } = await et(
    e,
    t,
    "icon-shape default"
  ), d = t.pos === "t", g = s + u * 2, m = s + u * 2, { nodeBorder: y, mainBkg: x } = r, { stylesMap: b } = Fr(t), _ = -m / 2, S = -g / 2, w = t.label ? 8 : 0, C = U.svg(c), T = j(t, {});
  t.look !== "handDrawn" && (T.roughness = 0, T.fillStyle = "solid");
  const D = b.get("fill");
  T.stroke = D ?? x;
  const P = C.path(Ie(_, S, m, g, 0.1), T), I = Math.max(m, h.width), E = g + h.height + w, W = C.rectangle(-I / 2, -E / 2, I, E, {
    ...T,
    fill: "transparent",
    stroke: "none"
  }), O = c.insert(() => P, ":first-child"), A = c.insert(() => W);
  if (t.icon) {
    const L = c.append("g");
    L.html(
      `<g>${await _i(t.icon, {
        height: s,
        width: s,
        fallbackPrefix: ""
      })}</g>`
    );
    const B = L.node().getBBox(), F = B.width, M = B.height, z = B.x, X = B.y;
    L.attr(
      "transform",
      `translate(${-F / 2 - z},${d ? h.height / 2 + w / 2 - M / 2 - X : -h.height / 2 - w / 2 - M / 2 - X})`
    ), L.attr("style", `color: ${b.get("stroke") ?? y};`);
  }
  return f.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${d ? -E / 2 : E / 2 - h.height})`
  ), O.attr(
    "transform",
    `translate(0,${d ? h.height / 2 + w / 2 : -h.height / 2 - w / 2})`
  ), V(t, A), t.intersect = function(L) {
    if ($.info("iconSquare intersect", t, L), !t.label)
      return q.rect(t, L);
    const B = t.x ?? 0, F = t.y ?? 0, M = t.height ?? 0;
    let z = [];
    return d ? z = [
      { x: B - h.width / 2, y: F - M / 2 },
      { x: B + h.width / 2, y: F - M / 2 },
      { x: B + h.width / 2, y: F - M / 2 + h.height + w },
      { x: B + m / 2, y: F - M / 2 + h.height + w },
      { x: B + m / 2, y: F + M / 2 },
      { x: B - m / 2, y: F + M / 2 },
      { x: B - m / 2, y: F - M / 2 + h.height + w },
      { x: B - h.width / 2, y: F - M / 2 + h.height + w }
    ] : z = [
      { x: B - m / 2, y: F - M / 2 },
      { x: B + m / 2, y: F - M / 2 },
      { x: B + m / 2, y: F - M / 2 + g },
      { x: B + h.width / 2, y: F - M / 2 + g },
      { x: B + h.width / 2 / 2, y: F + M / 2 },
      { x: B - h.width / 2, y: F + M / 2 },
      { x: B - h.width / 2, y: F - M / 2 + g },
      { x: B - m / 2, y: F - M / 2 + g }
    ], q.polygon(t, z, L);
  }, c;
}
p(nd, "iconSquare");
async function sd(e, t, { config: { flowchart: r } }) {
  const i = new Image();
  i.src = (t == null ? void 0 : t.img) ?? "", await i.decode();
  const a = Number(i.naturalWidth.toString().replace("px", "")), n = Number(i.naturalHeight.toString().replace("px", ""));
  t.imageAspectRatio = a / n;
  const { labelStyles: o } = G(t);
  t.labelStyle = o;
  const s = r == null ? void 0 : r.wrappingWidth;
  t.defaultWidth = r == null ? void 0 : r.wrappingWidth;
  const l = Math.max(
    t.label ? s ?? 0 : 0,
    (t == null ? void 0 : t.assetWidth) ?? a
  ), c = t.constraint === "on" && t != null && t.assetHeight ? t.assetHeight * t.imageAspectRatio : l, h = t.constraint === "on" ? c / t.imageAspectRatio : (t == null ? void 0 : t.assetHeight) ?? n;
  t.width = Math.max(c, s ?? 0);
  const { shapeSvg: u, bbox: f, label: d } = await et(e, t, "image-shape default"), g = t.pos === "t", m = -c / 2, y = -h / 2, x = t.label ? 8 : 0, b = U.svg(u), _ = j(t, {});
  t.look !== "handDrawn" && (_.roughness = 0, _.fillStyle = "solid");
  const S = b.rectangle(m, y, c, h, _), w = Math.max(c, f.width), C = h + f.height + x, T = b.rectangle(-w / 2, -C / 2, w, C, {
    ..._,
    fill: "none",
    stroke: "none"
  }), D = u.insert(() => S, ":first-child"), P = u.insert(() => T);
  if (t.img) {
    const I = u.append("image");
    I.attr("href", t.img), I.attr("width", c), I.attr("height", h), I.attr("preserveAspectRatio", "none"), I.attr(
      "transform",
      `translate(${-c / 2},${g ? C / 2 - h : -C / 2})`
    );
  }
  return d.attr(
    "transform",
    `translate(${-f.width / 2 - (f.x - (f.left ?? 0))},${g ? -h / 2 - f.height / 2 - x / 2 : h / 2 - f.height / 2 + x / 2})`
  ), D.attr(
    "transform",
    `translate(0,${g ? f.height / 2 + x / 2 : -f.height / 2 - x / 2})`
  ), V(t, P), t.intersect = function(I) {
    if ($.info("iconSquare intersect", t, I), !t.label)
      return q.rect(t, I);
    const E = t.x ?? 0, W = t.y ?? 0, O = t.height ?? 0;
    let A = [];
    return g ? A = [
      { x: E - f.width / 2, y: W - O / 2 },
      { x: E + f.width / 2, y: W - O / 2 },
      { x: E + f.width / 2, y: W - O / 2 + f.height + x },
      { x: E + c / 2, y: W - O / 2 + f.height + x },
      { x: E + c / 2, y: W + O / 2 },
      { x: E - c / 2, y: W + O / 2 },
      { x: E - c / 2, y: W - O / 2 + f.height + x },
      { x: E - f.width / 2, y: W - O / 2 + f.height + x }
    ] : A = [
      { x: E - c / 2, y: W - O / 2 },
      { x: E + c / 2, y: W - O / 2 },
      { x: E + c / 2, y: W - O / 2 + h },
      { x: E + f.width / 2, y: W - O / 2 + h },
      { x: E + f.width / 2 / 2, y: W + O / 2 },
      { x: E - f.width / 2, y: W + O / 2 },
      { x: E - f.width / 2, y: W - O / 2 + h },
      { x: E - c / 2, y: W - O / 2 + h }
    ], q.polygon(t, A, I);
  }, u;
}
p(sd, "imageSquare");
async function od(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), s = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), l = [
    { x: 0, y: 0 },
    { x: o, y: 0 },
    { x: o + 3 * s / 6, y: -s },
    { x: -3 * s / 6, y: -s }
  ];
  let c;
  const { cssStyles: h } = t;
  if (t.look === "handDrawn") {
    const u = U.svg(a), f = j(t, {}), d = lt(l), g = u.path(d, f);
    c = a.insert(() => g, ":first-child").attr("transform", `translate(${-o / 2}, ${s / 2})`), h && c.attr("style", h);
  } else
    c = Re(a, o, s, l);
  return i && c.attr("style", i), t.width = o, t.height = s, V(t, c), t.intersect = function(u) {
    return q.polygon(t, l, u);
  }, a;
}
p(od, "inv_trapezoid");
async function Ua(e, t, r) {
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.labelStyle = i;
  const { shapeSvg: n, bbox: o } = await et(e, t, tt(t)), s = Math.max(o.width + r.labelPaddingX * 2, (t == null ? void 0 : t.width) || 0), l = Math.max(o.height + r.labelPaddingY * 2, (t == null ? void 0 : t.height) || 0), c = -s / 2, h = -l / 2;
  let u, { rx: f, ry: d } = t;
  const { cssStyles: g } = t;
  if (r != null && r.rx && r.ry && (f = r.rx, d = r.ry), t.look === "handDrawn") {
    const m = U.svg(n), y = j(t, {}), x = f || d ? m.path(Ie(c, h, s, l, f || 0), y) : m.rectangle(c, h, s, l, y);
    u = n.insert(() => x, ":first-child"), u.attr("class", "basic label-container").attr("style", Ot(g));
  } else
    u = n.insert("rect", ":first-child"), u.attr("class", "basic label-container").attr("style", a).attr("rx", Ot(f)).attr("ry", Ot(d)).attr("x", c).attr("y", h).attr("width", s).attr("height", l);
  return V(t, u), t.calcIntersect = function(m, y) {
    return q.rect(m, y);
  }, t.intersect = function(m) {
    return q.rect(t, m);
  }, n;
}
p(Ua, "drawRect");
async function ld(e, t) {
  const { shapeSvg: r, bbox: i, label: a } = await et(e, t, "label"), n = r.insert("rect", ":first-child");
  return n.attr("width", 0.1).attr("height", 0.1), r.attr("class", "label edgeLabel"), a.attr(
    "transform",
    `translate(${-(i.width / 2) - (i.x - (i.left ?? 0))}, ${-(i.height / 2) - (i.y - (i.top ?? 0))})`
  ), V(t, n), t.intersect = function(l) {
    return q.rect(t, l);
  }, r;
}
p(ld, "labelRect");
async function cd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = Math.max(n.width + (t.padding ?? 0), (t == null ? void 0 : t.width) ?? 0), s = Math.max(n.height + (t.padding ?? 0), (t == null ? void 0 : t.height) ?? 0), l = [
    { x: 0, y: 0 },
    { x: o + 3 * s / 6, y: 0 },
    { x: o, y: -s },
    { x: -(3 * s) / 6, y: -s }
  ];
  let c;
  const { cssStyles: h } = t;
  if (t.look === "handDrawn") {
    const u = U.svg(a), f = j(t, {}), d = lt(l), g = u.path(d, f);
    c = a.insert(() => g, ":first-child").attr("transform", `translate(${-o / 2}, ${s / 2})`), h && c.attr("style", h);
  } else
    c = Re(a, o, s, l);
  return i && c.attr("style", i), t.width = o, t.height = s, V(t, c), t.intersect = function(u) {
    return q.polygon(t, l, u);
  }, a;
}
p(cd, "lean_left");
async function hd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = Math.max(n.width + (t.padding ?? 0), (t == null ? void 0 : t.width) ?? 0), s = Math.max(n.height + (t.padding ?? 0), (t == null ? void 0 : t.height) ?? 0), l = [
    { x: -3 * s / 6, y: 0 },
    { x: o, y: 0 },
    { x: o + 3 * s / 6, y: -s },
    { x: 0, y: -s }
  ];
  let c;
  const { cssStyles: h } = t;
  if (t.look === "handDrawn") {
    const u = U.svg(a), f = j(t, {}), d = lt(l), g = u.path(d, f);
    c = a.insert(() => g, ":first-child").attr("transform", `translate(${-o / 2}, ${s / 2})`), h && c.attr("style", h);
  } else
    c = Re(a, o, s, l);
  return i && c.attr("style", i), t.width = o, t.height = s, V(t, c), t.intersect = function(u) {
    return q.polygon(t, l, u);
  }, a;
}
p(hd, "lean_right");
function ud(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.label = "", t.labelStyle = r;
  const a = e.insert("g").attr("class", tt(t)).attr("id", t.domId ?? t.id), { cssStyles: n } = t, o = Math.max(35, (t == null ? void 0 : t.width) ?? 0), s = Math.max(35, (t == null ? void 0 : t.height) ?? 0), l = 7, c = [
    { x: o, y: 0 },
    { x: 0, y: s + l / 2 },
    { x: o - 2 * l, y: s + l / 2 },
    { x: 0, y: 2 * s },
    { x: o, y: s - l / 2 },
    { x: 2 * l, y: s - l / 2 }
  ], h = U.svg(a), u = j(t, {});
  t.look !== "handDrawn" && (u.roughness = 0, u.fillStyle = "solid");
  const f = lt(c), d = h.path(f, u), g = a.insert(() => d, ":first-child");
  return n && t.look !== "handDrawn" && g.selectAll("path").attr("style", n), i && t.look !== "handDrawn" && g.selectAll("path").attr("style", i), g.attr("transform", `translate(-${o / 2},${-s})`), V(t, g), t.intersect = function(m) {
    return $.info("lightningBolt intersect", t, m), q.polygon(t, c, m);
  }, a;
}
p(ud, "lightningBolt");
var l_ = /* @__PURE__ */ p((e, t, r, i, a, n, o) => [
  `M${e},${t + n}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `a${a},${n} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `l0,${-i}`,
  `M${e},${t + n + o}`,
  `a${a},${n} 0,0,0 ${r},0`
].join(" "), "createCylinderPathD"), c_ = /* @__PURE__ */ p((e, t, r, i, a, n, o) => [
  `M${e},${t + n}`,
  `M${e + r},${t + n}`,
  `a${a},${n} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${a},${n} 0,0,0 ${r},0`,
  `l0,${-i}`,
  `M${e},${t + n + o}`,
  `a${a},${n} 0,0,0 ${r},0`
].join(" "), "createOuterCylinderPathD"), h_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [`M${e - r / 2},${-i / 2}`, `a${a},${n} 0,0,0 ${r},0`].join(" "), "createInnerCylinderPathD");
async function fd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0), t.width ?? 0), l = s / 2, c = l / (2.5 + s / 50), h = Math.max(n.height + c + (t.padding ?? 0), t.height ?? 0), u = h * 0.1;
  let f;
  const { cssStyles: d } = t;
  if (t.look === "handDrawn") {
    const g = U.svg(a), m = c_(0, 0, s, h, l, c, u), y = h_(0, c, s, h, l, c), x = j(t, {}), b = g.path(m, x), _ = g.path(y, x);
    a.insert(() => _, ":first-child").attr("class", "line"), f = a.insert(() => b, ":first-child"), f.attr("class", "basic label-container"), d && f.attr("style", d);
  } else {
    const g = l_(0, 0, s, h, l, c, u);
    f = a.insert("path", ":first-child").attr("d", g).attr("class", "basic label-container").attr("style", Ot(d)).attr("style", i);
  }
  return f.attr("label-offset-y", c), f.attr("transform", `translate(${-s / 2}, ${-(h / 2 + c)})`), V(t, f), o.attr(
    "transform",
    `translate(${-(n.width / 2) - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + c - (n.y - (n.top ?? 0))})`
  ), t.intersect = function(g) {
    const m = q.rect(t, g), y = m.x - (t.x ?? 0);
    if (l != 0 && (Math.abs(y) < (t.width ?? 0) / 2 || Math.abs(y) == (t.width ?? 0) / 2 && Math.abs(m.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - c)) {
      let x = c * c * (1 - y * y / (l * l));
      x > 0 && (x = Math.sqrt(x)), x = c - x, g.y - (t.y ?? 0) > 0 && (x = -x), m.y += x;
    }
    return m;
  }, a;
}
p(fd, "linedCylinder");
async function dd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = l / 4, h = l + c, { cssStyles: u } = t, f = U.svg(a), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = [
    { x: -s / 2 - s / 2 * 0.1, y: -h / 2 },
    { x: -s / 2 - s / 2 * 0.1, y: h / 2 },
    ...$e(
      -s / 2 - s / 2 * 0.1,
      h / 2,
      s / 2 + s / 2 * 0.1,
      h / 2,
      c,
      0.8
    ),
    { x: s / 2 + s / 2 * 0.1, y: -h / 2 },
    { x: -s / 2 - s / 2 * 0.1, y: -h / 2 },
    { x: -s / 2, y: -h / 2 },
    { x: -s / 2, y: h / 2 * 1.1 },
    { x: -s / 2, y: -h / 2 }
  ], m = f.polygon(
    g.map((x) => [x.x, x.y]),
    d
  ), y = a.insert(() => m, ":first-child");
  return y.attr("class", "basic label-container"), u && t.look !== "handDrawn" && y.selectAll("path").attr("style", u), i && t.look !== "handDrawn" && y.selectAll("path").attr("style", i), y.attr("transform", `translate(0,${-c / 2})`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) + s / 2 * 0.1 / 2 - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) - c / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, y), t.intersect = function(x) {
    return q.polygon(t, g, x);
  }, a;
}
p(dd, "linedWaveEdgedRect");
async function pd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = 5, h = -s / 2, u = -l / 2, { cssStyles: f } = t, d = U.svg(a), g = j(t, {}), m = [
    { x: h - c, y: u + c },
    { x: h - c, y: u + l + c },
    { x: h + s - c, y: u + l + c },
    { x: h + s - c, y: u + l },
    { x: h + s, y: u + l },
    { x: h + s, y: u + l - c },
    { x: h + s + c, y: u + l - c },
    { x: h + s + c, y: u - c },
    { x: h + c, y: u - c },
    { x: h + c, y: u },
    { x: h, y: u },
    { x: h, y: u + c }
  ], y = [
    { x: h, y: u + c },
    { x: h + s - c, y: u + c },
    { x: h + s - c, y: u + l },
    { x: h + s, y: u + l },
    { x: h + s, y: u },
    { x: h, y: u }
  ];
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const x = lt(m), b = d.path(x, g), _ = lt(y), S = d.path(_, { ...g, fill: "none" }), w = a.insert(() => S, ":first-child");
  return w.insert(() => b, ":first-child"), w.attr("class", "basic label-container"), f && t.look !== "handDrawn" && w.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && w.selectAll("path").attr("style", i), o.attr(
    "transform",
    `translate(${-(n.width / 2) - c - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + c - (n.y - (n.top ?? 0))})`
  ), V(t, w), t.intersect = function(C) {
    return q.polygon(t, m, C);
  }, a;
}
p(pd, "multiRect");
async function gd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = l / 4, h = l + c, u = -s / 2, f = -h / 2, d = 5, { cssStyles: g } = t, m = $e(
    u - d,
    f + h + d,
    u + s - d,
    f + h + d,
    c,
    0.8
  ), y = m == null ? void 0 : m[m.length - 1], x = [
    { x: u - d, y: f + d },
    { x: u - d, y: f + h + d },
    ...m,
    { x: u + s - d, y: y.y - d },
    { x: u + s, y: y.y - d },
    { x: u + s, y: y.y - 2 * d },
    { x: u + s + d, y: y.y - 2 * d },
    { x: u + s + d, y: f - d },
    { x: u + d, y: f - d },
    { x: u + d, y: f },
    { x: u, y: f },
    { x: u, y: f + d }
  ], b = [
    { x: u, y: f + d },
    { x: u + s - d, y: f + d },
    { x: u + s - d, y: y.y - d },
    { x: u + s, y: y.y - d },
    { x: u + s, y: f },
    { x: u, y: f }
  ], _ = U.svg(a), S = j(t, {});
  t.look !== "handDrawn" && (S.roughness = 0, S.fillStyle = "solid");
  const w = lt(x), C = _.path(w, S), T = lt(b), D = _.path(T, S), P = a.insert(() => C, ":first-child");
  return P.insert(() => D), P.attr("class", "basic label-container"), g && t.look !== "handDrawn" && P.selectAll("path").attr("style", g), i && t.look !== "handDrawn" && P.selectAll("path").attr("style", i), P.attr("transform", `translate(0,${-c / 2})`), o.attr(
    "transform",
    `translate(${-(n.width / 2) - d - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + d - c / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, P), t.intersect = function(I) {
    return q.polygon(t, x, I);
  }, a;
}
p(gd, "multiWaveEdgedRectangle");
async function md(e, t, { config: { themeVariables: r } }) {
  var b;
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.labelStyle = i, t.useHtmlLabels || ((b = $t().flowchart) == null ? void 0 : b.htmlLabels) !== !1 || (t.centerLabel = !0);
  const { shapeSvg: o, bbox: s, label: l } = await et(e, t, tt(t)), c = Math.max(s.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), h = Math.max(s.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), u = -c / 2, f = -h / 2, { cssStyles: d } = t, g = U.svg(o), m = j(t, {
    fill: r.noteBkgColor,
    stroke: r.noteBorderColor
  });
  t.look !== "handDrawn" && (m.roughness = 0, m.fillStyle = "solid");
  const y = g.rectangle(u, f, c, h, m), x = o.insert(() => y, ":first-child");
  return x.attr("class", "basic label-container"), d && t.look !== "handDrawn" && x.selectAll("path").attr("style", d), a && t.look !== "handDrawn" && x.selectAll("path").attr("style", a), l.attr(
    "transform",
    `translate(${-s.width / 2 - (s.x - (s.left ?? 0))}, ${-(s.height / 2) - (s.y - (s.top ?? 0))})`
  ), V(t, x), t.intersect = function(_) {
    return q.rect(t, _);
  }, o;
}
p(md, "note");
var u_ = /* @__PURE__ */ p((e, t, r) => [
  `M${e + r / 2},${t}`,
  `L${e + r},${t - r / 2}`,
  `L${e + r / 2},${t - r}`,
  `L${e},${t - r / 2}`,
  "Z"
].join(" "), "createDecisionBoxPathD");
async function yd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.width + t.padding, s = n.height + t.padding, l = o + s, c = 0.5, h = [
    { x: l / 2, y: 0 },
    { x: l, y: -l / 2 },
    { x: l / 2, y: -l },
    { x: 0, y: -l / 2 }
  ];
  let u;
  const { cssStyles: f } = t;
  if (t.look === "handDrawn") {
    const d = U.svg(a), g = j(t, {}), m = u_(0, 0, l), y = d.path(m, g);
    u = a.insert(() => y, ":first-child").attr("transform", `translate(${-l / 2 + c}, ${l / 2})`), f && u.attr("style", f);
  } else
    u = Re(a, l, l, h), u.attr("transform", `translate(${-l / 2 + c}, ${l / 2})`);
  return i && u.attr("style", i), V(t, u), t.calcIntersect = function(d, g) {
    const m = d.width, y = [
      { x: m / 2, y: 0 },
      { x: m, y: -m / 2 },
      { x: m / 2, y: -m },
      { x: 0, y: -m / 2 }
    ], x = q.polygon(d, y, g);
    return { x: x.x - 0.5, y: x.y - 0.5 };
  }, t.intersect = function(d) {
    return this.calcIntersect(t, d);
  }, a;
}
p(yd, "question");
async function xd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0), (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0), (t == null ? void 0 : t.height) ?? 0), c = -s / 2, h = -l / 2, u = h / 2, f = [
    { x: c + u, y: h },
    { x: c, y: 0 },
    { x: c + u, y: -h },
    { x: -c, y: -h },
    { x: -c, y: h }
  ], { cssStyles: d } = t, g = U.svg(a), m = j(t, {});
  t.look !== "handDrawn" && (m.roughness = 0, m.fillStyle = "solid");
  const y = lt(f), x = g.path(y, m), b = a.insert(() => x, ":first-child");
  return b.attr("class", "basic label-container"), d && t.look !== "handDrawn" && b.selectAll("path").attr("style", d), i && t.look !== "handDrawn" && b.selectAll("path").attr("style", i), b.attr("transform", `translate(${-u / 2},0)`), o.attr(
    "transform",
    `translate(${-u / 2 - n.width / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) - (n.y - (n.top ?? 0))})`
  ), V(t, b), t.intersect = function(_) {
    return q.polygon(t, f, _);
  }, a;
}
p(xd, "rect_left_inv_arrow");
async function bd(e, t) {
  var D, P;
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  let a;
  t.cssClasses ? a = "node " + t.cssClasses : a = "node default";
  const n = e.insert("g").attr("class", a).attr("id", t.domId || t.id), o = n.insert("g"), s = n.insert("g").attr("class", "label").attr("style", i), l = t.description, c = t.label, h = s.node().appendChild(await je(c, t.labelStyle, !0, !0));
  let u = { width: 0, height: 0 };
  if (kt((P = (D = ft()) == null ? void 0 : D.flowchart) == null ? void 0 : P.htmlLabels)) {
    const I = h.children[0], E = ht(h);
    u = I.getBoundingClientRect(), E.attr("width", u.width), E.attr("height", u.height);
  }
  $.info("Text 2", l);
  const f = l || [], d = h.getBBox(), g = s.node().appendChild(
    await je(
      f.join ? f.join("<br/>") : f,
      t.labelStyle,
      !0,
      !0
    )
  ), m = g.children[0], y = ht(g);
  u = m.getBoundingClientRect(), y.attr("width", u.width), y.attr("height", u.height);
  const x = (t.padding || 0) / 2;
  ht(g).attr(
    "transform",
    "translate( " + (u.width > d.width ? 0 : (d.width - u.width) / 2) + ", " + (d.height + x + 5) + ")"
  ), ht(h).attr(
    "transform",
    "translate( " + (u.width < d.width ? 0 : -(d.width - u.width) / 2) + ", 0)"
  ), u = s.node().getBBox(), s.attr(
    "transform",
    "translate(" + -u.width / 2 + ", " + (-u.height / 2 - x + 3) + ")"
  );
  const b = u.width + (t.padding || 0), _ = u.height + (t.padding || 0), S = -u.width / 2 - x, w = -u.height / 2 - x;
  let C, T;
  if (t.look === "handDrawn") {
    const I = U.svg(n), E = j(t, {}), W = I.path(
      Ie(S, w, b, _, t.rx || 0),
      E
    ), O = I.line(
      -u.width / 2 - x,
      -u.height / 2 - x + d.height + x,
      u.width / 2 + x,
      -u.height / 2 - x + d.height + x,
      E
    );
    T = n.insert(() => ($.debug("Rough node insert CXC", W), O), ":first-child"), C = n.insert(() => ($.debug("Rough node insert CXC", W), W), ":first-child");
  } else
    C = o.insert("rect", ":first-child"), T = o.insert("line"), C.attr("class", "outer title-state").attr("style", i).attr("x", -u.width / 2 - x).attr("y", -u.height / 2 - x).attr("width", u.width + (t.padding || 0)).attr("height", u.height + (t.padding || 0)), T.attr("class", "divider").attr("x1", -u.width / 2 - x).attr("x2", u.width / 2 + x).attr("y1", -u.height / 2 - x + d.height + x).attr("y2", -u.height / 2 - x + d.height + x);
  return V(t, C), t.intersect = function(I) {
    return q.rect(t, I);
  }, n;
}
p(bd, "rectWithTitle");
function Kr(e, t, r, i, a, n, o) {
  const l = (e + r) / 2, c = (t + i) / 2, h = Math.atan2(i - t, r - e), u = (r - e) / 2, f = (i - t) / 2, d = u / a, g = f / n, m = Math.sqrt(d ** 2 + g ** 2);
  if (m > 1)
    throw new Error("The given radii are too small to create an arc between the points.");
  const y = Math.sqrt(1 - m ** 2), x = l + y * n * Math.sin(h) * (o ? -1 : 1), b = c - y * a * Math.cos(h) * (o ? -1 : 1), _ = Math.atan2((t - b) / n, (e - x) / a);
  let w = Math.atan2((i - b) / n, (r - x) / a) - _;
  o && w < 0 && (w += 2 * Math.PI), !o && w > 0 && (w -= 2 * Math.PI);
  const C = [];
  for (let T = 0; T < 20; T++) {
    const D = T / 19, P = _ + D * w, I = x + a * Math.cos(P), E = b + n * Math.sin(P);
    C.push({ x: I, y: E });
  }
  return C;
}
p(Kr, "generateArcPoints");
async function Cd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = (t == null ? void 0 : t.padding) ?? 0, s = (t == null ? void 0 : t.padding) ?? 0, l = (t != null && t.width ? t == null ? void 0 : t.width : n.width) + o * 2, c = (t != null && t.height ? t == null ? void 0 : t.height : n.height) + s * 2, h = t.radius || 5, u = t.taper || 5, { cssStyles: f } = t, d = U.svg(a), g = j(t, {});
  t.stroke && (g.stroke = t.stroke), t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const m = [
    // Top edge (left to right)
    { x: -l / 2 + u, y: -c / 2 },
    // Top-left corner start (1)
    { x: l / 2 - u, y: -c / 2 },
    // Top-right corner start (2)
    ...Kr(l / 2 - u, -c / 2, l / 2, -c / 2 + u, h, h, !0),
    // Top-left arc (2 to 3)
    // Right edge (top to bottom)
    { x: l / 2, y: -c / 2 + u },
    // Top-right taper point (3)
    { x: l / 2, y: c / 2 - u },
    // Bottom-right taper point (4)
    ...Kr(l / 2, c / 2 - u, l / 2 - u, c / 2, h, h, !0),
    // Top-left arc (4 to 5)
    // Bottom edge (right to left)
    { x: l / 2 - u, y: c / 2 },
    // Bottom-right corner start (5)
    { x: -l / 2 + u, y: c / 2 },
    // Bottom-left corner start (6)
    ...Kr(-l / 2 + u, c / 2, -l / 2, c / 2 - u, h, h, !0),
    // Top-left arc (4 to 5)
    // Left edge (bottom to top)
    { x: -l / 2, y: c / 2 - u },
    // Bottom-left taper point (7)
    { x: -l / 2, y: -c / 2 + u },
    // Top-left taper point (8)
    ...Kr(-l / 2, -c / 2 + u, -l / 2 + u, -c / 2, h, h, !0)
    // Top-left arc (4 to 5)
  ], y = lt(m), x = d.path(y, g), b = a.insert(() => x, ":first-child");
  return b.attr("class", "basic label-container outer-path"), f && t.look !== "handDrawn" && b.selectChildren("path").attr("style", f), i && t.look !== "handDrawn" && b.selectChildren("path").attr("style", i), V(t, b), t.intersect = function(_) {
    return q.polygon(t, m, _);
  }, a;
}
p(Cd, "roundedRect");
async function _d(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = (t == null ? void 0 : t.padding) ?? 0, l = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), c = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), h = -n.width / 2 - s, u = -n.height / 2 - s, { cssStyles: f } = t, d = U.svg(a), g = j(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const m = [
    { x: h, y: u },
    { x: h + l + 8, y: u },
    { x: h + l + 8, y: u + c },
    { x: h - 8, y: u + c },
    { x: h - 8, y: u },
    { x: h, y: u },
    { x: h, y: u + c }
  ], y = d.polygon(
    m.map((b) => [b.x, b.y]),
    g
  ), x = a.insert(() => y, ":first-child");
  return x.attr("class", "basic label-container").attr("style", Ot(f)), i && t.look !== "handDrawn" && x.selectAll("path").attr("style", i), f && t.look !== "handDrawn" && x.selectAll("path").attr("style", i), o.attr(
    "transform",
    `translate(${-l / 2 + 4 + (t.padding ?? 0) - (n.x - (n.left ?? 0))},${-c / 2 + (t.padding ?? 0) - (n.y - (n.top ?? 0))})`
  ), V(t, x), t.intersect = function(b) {
    return q.rect(t, b);
  }, a;
}
p(_d, "shadedProcess");
async function vd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = -s / 2, h = -l / 2, { cssStyles: u } = t, f = U.svg(a), d = j(t, {});
  t.look !== "handDrawn" && (d.roughness = 0, d.fillStyle = "solid");
  const g = [
    { x: c, y: h },
    { x: c, y: h + l },
    { x: c + s, y: h + l },
    { x: c + s, y: h - l / 2 }
  ], m = lt(g), y = f.path(m, d), x = a.insert(() => y, ":first-child");
  return x.attr("class", "basic label-container"), u && t.look !== "handDrawn" && x.selectChildren("path").attr("style", u), i && t.look !== "handDrawn" && x.selectChildren("path").attr("style", i), x.attr("transform", `translate(0, ${l / 4})`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) - (n.x - (n.left ?? 0))}, ${-l / 4 + (t.padding ?? 0) - (n.y - (n.top ?? 0))})`
  ), V(t, x), t.intersect = function(b) {
    return q.polygon(t, g, b);
  }, a;
}
p(vd, "slopedRect");
async function wd(e, t) {
  const r = {
    rx: 0,
    ry: 0,
    labelPaddingX: t.labelPaddingX ?? ((t == null ? void 0 : t.padding) || 0) * 2,
    labelPaddingY: ((t == null ? void 0 : t.padding) || 0) * 1
  };
  return Ua(e, t, r);
}
p(wd, "squareRect");
async function Sd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.height + t.padding, s = n.width + o / 4 + t.padding, l = o / 2, { cssStyles: c } = t, h = U.svg(a), u = j(t, {});
  t.look !== "handDrawn" && (u.roughness = 0, u.fillStyle = "solid");
  const f = [
    { x: -s / 2 + l, y: -o / 2 },
    { x: s / 2 - l, y: -o / 2 },
    ...fi(-s / 2 + l, 0, l, 50, 90, 270),
    { x: s / 2 - l, y: o / 2 },
    ...fi(s / 2 - l, 0, l, 50, 270, 450)
  ], d = lt(f), g = h.path(d, u), m = a.insert(() => g, ":first-child");
  return m.attr("class", "basic label-container outer-path"), c && t.look !== "handDrawn" && m.selectChildren("path").attr("style", c), i && t.look !== "handDrawn" && m.selectChildren("path").attr("style", i), V(t, m), t.intersect = function(y) {
    return q.polygon(t, f, y);
  }, a;
}
p(Sd, "stadium");
async function kd(e, t) {
  return Ua(e, t, {
    rx: 5,
    ry: 5
  });
}
p(kd, "state");
function Td(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.labelStyle = i;
  const { cssStyles: n } = t, { lineColor: o, stateBorder: s, nodeBorder: l } = r, c = e.insert("g").attr("class", "node default").attr("id", t.domId || t.id), h = U.svg(c), u = j(t, {});
  t.look !== "handDrawn" && (u.roughness = 0, u.fillStyle = "solid");
  const f = h.circle(0, 0, 14, {
    ...u,
    stroke: o,
    strokeWidth: 2
  }), d = s ?? l, g = h.circle(0, 0, 5, {
    ...u,
    fill: d,
    stroke: d,
    strokeWidth: 2,
    fillStyle: "solid"
  }), m = c.insert(() => f, ":first-child");
  return m.insert(() => g), n && m.selectAll("path").attr("style", n), a && m.selectAll("path").attr("style", a), V(t, m), t.intersect = function(y) {
    return q.circle(t, 7, y);
  }, c;
}
p(Td, "stateEnd");
function Bd(e, t, { config: { themeVariables: r } }) {
  const { lineColor: i } = r, a = e.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let n;
  if (t.look === "handDrawn") {
    const s = U.svg(a).circle(0, 0, 14, I2(i));
    n = a.insert(() => s), n.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
  } else
    n = a.insert("circle", ":first-child"), n.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
  return V(t, n), t.intersect = function(o) {
    return q.circle(t, 7, o);
  }, a;
}
p(Bd, "stateStart");
async function Ld(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = ((t == null ? void 0 : t.padding) || 0) / 2, s = n.width + t.padding, l = n.height + t.padding, c = -n.width / 2 - o, h = -n.height / 2 - o, u = [
    { x: 0, y: 0 },
    { x: s, y: 0 },
    { x: s, y: -l },
    { x: 0, y: -l },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: s + 8, y: 0 },
    { x: s + 8, y: -l },
    { x: -8, y: -l },
    { x: -8, y: 0 }
  ];
  if (t.look === "handDrawn") {
    const f = U.svg(a), d = j(t, {}), g = f.rectangle(c - 8, h, s + 16, l, d), m = f.line(c, h, c, h + l, d), y = f.line(c + s, h, c + s, h + l, d);
    a.insert(() => m, ":first-child"), a.insert(() => y, ":first-child");
    const x = a.insert(() => g, ":first-child"), { cssStyles: b } = t;
    x.attr("class", "basic label-container").attr("style", Ot(b)), V(t, x);
  } else {
    const f = Re(a, s, l, u);
    i && f.attr("style", i), V(t, f);
  }
  return t.intersect = function(f) {
    return q.polygon(t, u, f);
  }, a;
}
p(Ld, "subroutine");
async function Md(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), s = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), l = -o / 2, c = -s / 2, h = 0.2 * s, u = 0.2 * s, { cssStyles: f } = t, d = U.svg(a), g = j(t, {}), m = [
    { x: l - h / 2, y: c },
    { x: l + o + h / 2, y: c },
    { x: l + o + h / 2, y: c + s },
    { x: l - h / 2, y: c + s }
  ], y = [
    { x: l + o - h / 2, y: c + s },
    { x: l + o + h / 2, y: c + s },
    { x: l + o + h / 2, y: c + s - u }
  ];
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const x = lt(m), b = d.path(x, g), _ = lt(y), S = d.path(_, { ...g, fillStyle: "solid" }), w = a.insert(() => S, ":first-child");
  return w.insert(() => b, ":first-child"), w.attr("class", "basic label-container"), f && t.look !== "handDrawn" && w.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && w.selectAll("path").attr("style", i), V(t, w), t.intersect = function(C) {
    return q.polygon(t, m, C);
  }, a;
}
p(Md, "taggedRect");
async function Ad(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = l / 4, h = 0.2 * s, u = 0.2 * l, f = l + c, { cssStyles: d } = t, g = U.svg(a), m = j(t, {});
  t.look !== "handDrawn" && (m.roughness = 0, m.fillStyle = "solid");
  const y = [
    { x: -s / 2 - s / 2 * 0.1, y: f / 2 },
    ...$e(
      -s / 2 - s / 2 * 0.1,
      f / 2,
      s / 2 + s / 2 * 0.1,
      f / 2,
      c,
      0.8
    ),
    { x: s / 2 + s / 2 * 0.1, y: -f / 2 },
    { x: -s / 2 - s / 2 * 0.1, y: -f / 2 }
  ], x = -s / 2 + s / 2 * 0.1, b = -f / 2 - u * 0.4, _ = [
    { x: x + s - h, y: (b + l) * 1.4 },
    { x: x + s, y: b + l - u },
    { x: x + s, y: (b + l) * 0.9 },
    ...$e(
      x + s,
      (b + l) * 1.3,
      x + s - h,
      (b + l) * 1.5,
      -l * 0.03,
      0.5
    )
  ], S = lt(y), w = g.path(S, m), C = lt(_), T = g.path(C, {
    ...m,
    fillStyle: "solid"
  }), D = a.insert(() => T, ":first-child");
  return D.insert(() => w, ":first-child"), D.attr("class", "basic label-container"), d && t.look !== "handDrawn" && D.selectAll("path").attr("style", d), i && t.look !== "handDrawn" && D.selectAll("path").attr("style", i), D.attr("transform", `translate(0,${-c / 2})`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) - c / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, D), t.intersect = function(P) {
    return q.polygon(t, y, P);
  }, a;
}
p(Ad, "taggedWaveEdgedRectangle");
async function Ed(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = Math.max(n.width + t.padding, (t == null ? void 0 : t.width) || 0), s = Math.max(n.height + t.padding, (t == null ? void 0 : t.height) || 0), l = -o / 2, c = -s / 2, h = a.insert("rect", ":first-child");
  return h.attr("class", "text").attr("style", i).attr("rx", 0).attr("ry", 0).attr("x", l).attr("y", c).attr("width", o).attr("height", s), V(t, h), t.intersect = function(u) {
    return q.rect(t, u);
  }, a;
}
p(Ed, "text");
var f_ = /* @__PURE__ */ p((e, t, r, i, a, n) => `M${e},${t}
    a${a},${n} 0,0,1 0,${-i}
    l${r},0
    a${a},${n} 0,0,1 0,${i}
    M${r},${-i}
    a${a},${n} 0,0,0 0,${i}
    l${-r},0`, "createCylinderPathD"), d_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [
  `M${e},${t}`,
  `M${e + r},${t}`,
  `a${a},${n} 0,0,0 0,${-i}`,
  `l${-r},0`,
  `a${a},${n} 0,0,0 0,${i}`,
  `l${r},0`
].join(" "), "createOuterCylinderPathD"), p_ = /* @__PURE__ */ p((e, t, r, i, a, n) => [`M${e + r / 2},${-i / 2}`, `a${a},${n} 0,0,0 0,${i}`].join(" "), "createInnerCylinderPathD");
async function Fd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o, halfPadding: s } = await et(
    e,
    t,
    tt(t)
  ), l = t.look === "neo" ? s * 2 : s, c = n.height + l, h = c / 2, u = h / (2.5 + c / 50), f = n.width + u + l, { cssStyles: d } = t;
  let g;
  if (t.look === "handDrawn") {
    const m = U.svg(a), y = d_(0, 0, f, c, u, h), x = p_(0, 0, f, c, u, h), b = m.path(y, j(t, {})), _ = m.path(x, j(t, { fill: "none" }));
    g = a.insert(() => _, ":first-child"), g = a.insert(() => b, ":first-child"), g.attr("class", "basic label-container"), d && g.attr("style", d);
  } else {
    const m = f_(0, 0, f, c, u, h);
    g = a.insert("path", ":first-child").attr("d", m).attr("class", "basic label-container").attr("style", Ot(d)).attr("style", i), g.attr("class", "basic label-container"), d && g.selectAll("path").attr("style", d), i && g.selectAll("path").attr("style", i);
  }
  return g.attr("label-offset-x", u), g.attr("transform", `translate(${-f / 2}, ${c / 2} )`), o.attr(
    "transform",
    `translate(${-(n.width / 2) - u - (n.x - (n.left ?? 0))}, ${-(n.height / 2) - (n.y - (n.top ?? 0))})`
  ), V(t, g), t.intersect = function(m) {
    const y = q.rect(t, m), x = y.y - (t.y ?? 0);
    if (h != 0 && (Math.abs(x) < (t.height ?? 0) / 2 || Math.abs(x) == (t.height ?? 0) / 2 && Math.abs(y.x - (t.x ?? 0)) > (t.width ?? 0) / 2 - u)) {
      let b = u * u * (1 - x * x / (h * h));
      b != 0 && (b = Math.sqrt(Math.abs(b))), b = u - b, m.x - (t.x ?? 0) > 0 && (b = -b), y.x += b;
    }
    return y;
  }, a;
}
p(Fd, "tiltedCylinder");
async function $d(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = n.width + t.padding, s = n.height + t.padding, l = [
    { x: -3 * s / 6, y: 0 },
    { x: o + 3 * s / 6, y: 0 },
    { x: o, y: -s },
    { x: 0, y: -s }
  ];
  let c;
  const { cssStyles: h } = t;
  if (t.look === "handDrawn") {
    const u = U.svg(a), f = j(t, {}), d = lt(l), g = u.path(d, f);
    c = a.insert(() => g, ":first-child").attr("transform", `translate(${-o / 2}, ${s / 2})`), h && c.attr("style", h);
  } else
    c = Re(a, o, s, l);
  return i && c.attr("style", i), t.width = o, t.height = s, V(t, c), t.intersect = function(u) {
    return q.polygon(t, l, u);
  }, a;
}
p($d, "trapezoid");
async function Dd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = 60, s = 20, l = Math.max(o, n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), c = Math.max(s, n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), { cssStyles: h } = t, u = U.svg(a), f = j(t, {});
  t.look !== "handDrawn" && (f.roughness = 0, f.fillStyle = "solid");
  const d = [
    { x: -l / 2 * 0.8, y: -c / 2 },
    { x: l / 2 * 0.8, y: -c / 2 },
    { x: l / 2, y: -c / 2 * 0.6 },
    { x: l / 2, y: c / 2 },
    { x: -l / 2, y: c / 2 },
    { x: -l / 2, y: -c / 2 * 0.6 }
  ], g = lt(d), m = u.path(g, f), y = a.insert(() => m, ":first-child");
  return y.attr("class", "basic label-container"), h && t.look !== "handDrawn" && y.selectChildren("path").attr("style", h), i && t.look !== "handDrawn" && y.selectChildren("path").attr("style", i), V(t, y), t.intersect = function(x) {
    return q.polygon(t, d, x);
  }, a;
}
p(Dd, "trapezoidalPentagon");
async function Od(e, t) {
  var b;
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = kt((b = ft().flowchart) == null ? void 0 : b.htmlLabels), l = n.width + (t.padding ?? 0), c = l + n.height, h = l + n.height, u = [
    { x: 0, y: 0 },
    { x: h, y: 0 },
    { x: h / 2, y: -c }
  ], { cssStyles: f } = t, d = U.svg(a), g = j(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const m = lt(u), y = d.path(m, g), x = a.insert(() => y, ":first-child").attr("transform", `translate(${-c / 2}, ${c / 2})`);
  return f && t.look !== "handDrawn" && x.selectChildren("path").attr("style", f), i && t.look !== "handDrawn" && x.selectChildren("path").attr("style", i), t.width = l, t.height = c, V(t, x), o.attr(
    "transform",
    `translate(${-n.width / 2 - (n.x - (n.left ?? 0))}, ${c / 2 - (n.height + (t.padding ?? 0) / (s ? 2 : 1) - (n.y - (n.top ?? 0)))})`
  ), t.intersect = function(_) {
    return $.info("Triangle intersect", t, u, _), q.polygon(t, u, _);
  }, a;
}
p(Od, "triangle");
async function Id(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = l / 8, h = l + c, { cssStyles: u } = t, d = 70 - s, g = d > 0 ? d / 2 : 0, m = U.svg(a), y = j(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = [
    { x: -s / 2 - g, y: h / 2 },
    ...$e(
      -s / 2 - g,
      h / 2,
      s / 2 + g,
      h / 2,
      c,
      0.8
    ),
    { x: s / 2 + g, y: -h / 2 },
    { x: -s / 2 - g, y: -h / 2 }
  ], b = lt(x), _ = m.path(b, y), S = a.insert(() => _, ":first-child");
  return S.attr("class", "basic label-container"), u && t.look !== "handDrawn" && S.selectAll("path").attr("style", u), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), S.attr("transform", `translate(0,${-c / 2})`), o.attr(
    "transform",
    `translate(${-s / 2 + (t.padding ?? 0) - (n.x - (n.left ?? 0))},${-l / 2 + (t.padding ?? 0) - c - (n.y - (n.top ?? 0))})`
  ), V(t, S), t.intersect = function(w) {
    return q.polygon(t, x, w);
  }, a;
}
p(Id, "waveEdgedRectangle");
async function Rd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n } = await et(e, t, tt(t)), o = 100, s = 50, l = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), c = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), h = l / c;
  let u = l, f = c;
  u > f * h ? f = u / h : u = f * h, u = Math.max(u, o), f = Math.max(f, s);
  const d = Math.min(f * 0.2, f / 4), g = f + d * 2, { cssStyles: m } = t, y = U.svg(a), x = j(t, {});
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const b = [
    { x: -u / 2, y: g / 2 },
    ...$e(-u / 2, g / 2, u / 2, g / 2, d, 1),
    { x: u / 2, y: -g / 2 },
    ...$e(u / 2, -g / 2, -u / 2, -g / 2, d, -1)
  ], _ = lt(b), S = y.path(_, x), w = a.insert(() => S, ":first-child");
  return w.attr("class", "basic label-container"), m && t.look !== "handDrawn" && w.selectAll("path").attr("style", m), i && t.look !== "handDrawn" && w.selectAll("path").attr("style", i), V(t, w), t.intersect = function(C) {
    return q.polygon(t, b, C);
  }, a;
}
p(Rd, "waveRectangle");
async function Pd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, label: o } = await et(e, t, tt(t)), s = Math.max(n.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), l = Math.max(n.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), c = 5, h = -s / 2, u = -l / 2, { cssStyles: f } = t, d = U.svg(a), g = j(t, {}), m = [
    { x: h - c, y: u - c },
    { x: h - c, y: u + l },
    { x: h + s, y: u + l },
    { x: h + s, y: u - c }
  ], y = `M${h - c},${u - c} L${h + s},${u - c} L${h + s},${u + l} L${h - c},${u + l} L${h - c},${u - c}
                M${h - c},${u} L${h + s},${u}
                M${h},${u - c} L${h},${u + l}`;
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const x = d.path(y, g), b = a.insert(() => x, ":first-child");
  return b.attr("transform", `translate(${c / 2}, ${c / 2})`), b.attr("class", "basic label-container"), f && t.look !== "handDrawn" && b.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && b.selectAll("path").attr("style", i), o.attr(
    "transform",
    `translate(${-(n.width / 2) + c / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + c / 2 - (n.y - (n.top ?? 0))})`
  ), V(t, b), t.intersect = function(_) {
    return q.polygon(t, m, _);
  }, a;
}
p(Pd, "windowPane");
async function Js(e, t) {
  var ut, at, dt, st;
  const r = t;
  if (r.alias && (t.label = r.alias), t.look === "handDrawn") {
    const { themeVariables: nt } = $t(), { background: ct } = nt, xt = {
      ...t,
      id: t.id + "-background",
      look: "default",
      cssStyles: ["stroke: none", `fill: ${ct}`]
    };
    await Js(e, xt);
  }
  const i = $t();
  t.useHtmlLabels = i.htmlLabels;
  let a = ((ut = i.er) == null ? void 0 : ut.diagramPadding) ?? 10, n = ((at = i.er) == null ? void 0 : at.entityPadding) ?? 6;
  const { cssStyles: o } = t, { labelStyles: s, nodeStyles: l } = G(t);
  if (r.attributes.length === 0 && t.label) {
    const nt = {
      rx: 0,
      ry: 0,
      labelPaddingX: a,
      labelPaddingY: a * 1.5
    };
    ke(t.label, i) + nt.labelPaddingX * 2 < i.er.minEntityWidth && (t.width = i.er.minEntityWidth);
    const ct = await Ua(e, t, nt);
    if (!kt(i.htmlLabels)) {
      const xt = ct.select("text"), pt = (dt = xt.node()) == null ? void 0 : dt.getBBox();
      xt.attr("transform", `translate(${-pt.width / 2}, 0)`);
    }
    return ct;
  }
  i.htmlLabels || (a *= 1.25, n *= 1.25);
  let c = tt(t);
  c || (c = "node default");
  const h = e.insert("g").attr("class", c).attr("id", t.domId || t.id), u = await ur(h, t.label ?? "", i, 0, 0, ["name"], s);
  u.height += n;
  let f = 0;
  const d = [], g = [];
  let m = 0, y = 0, x = 0, b = 0, _ = !0, S = !0;
  for (const nt of r.attributes) {
    const ct = await ur(
      h,
      nt.type,
      i,
      0,
      f,
      ["attribute-type"],
      s
    );
    m = Math.max(m, ct.width + a);
    const xt = await ur(
      h,
      nt.name,
      i,
      0,
      f,
      ["attribute-name"],
      s
    );
    y = Math.max(y, xt.width + a);
    const pt = await ur(
      h,
      nt.keys.join(),
      i,
      0,
      f,
      ["attribute-keys"],
      s
    );
    x = Math.max(x, pt.width + a);
    const gt = await ur(
      h,
      nt.comment,
      i,
      0,
      f,
      ["attribute-comment"],
      s
    );
    b = Math.max(b, gt.width + a);
    const Ct = Math.max(ct.height, xt.height, pt.height, gt.height) + n;
    g.push({ yOffset: f, rowHeight: Ct }), f += Ct;
  }
  let w = 4;
  x <= a && (_ = !1, x = 0, w--), b <= a && (S = !1, b = 0, w--);
  const C = h.node().getBBox();
  if (u.width + a * 2 - (m + y + x + b) > 0) {
    const nt = u.width + a * 2 - (m + y + x + b);
    m += nt / w, y += nt / w, x > 0 && (x += nt / w), b > 0 && (b += nt / w);
  }
  const T = m + y + x + b, D = U.svg(h), P = j(t, {});
  t.look !== "handDrawn" && (P.roughness = 0, P.fillStyle = "solid");
  let I = 0;
  g.length > 0 && (I = g.reduce((nt, ct) => nt + ((ct == null ? void 0 : ct.rowHeight) ?? 0), 0));
  const E = Math.max(C.width + a * 2, (t == null ? void 0 : t.width) || 0, T), W = Math.max((I ?? 0) + u.height, (t == null ? void 0 : t.height) || 0), O = -E / 2, A = -W / 2;
  h.selectAll("g:not(:first-child)").each((nt, ct, xt) => {
    const pt = ht(xt[ct]), gt = pt.attr("transform");
    let Ct = 0, Rt = 0;
    if (gt) {
      const te = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(gt);
      te && (Ct = parseFloat(te[1]), Rt = parseFloat(te[2]), pt.attr("class").includes("attribute-name") ? Ct += m : pt.attr("class").includes("attribute-keys") ? Ct += m + y : pt.attr("class").includes("attribute-comment") && (Ct += m + y + x));
    }
    pt.attr(
      "transform",
      `translate(${O + a / 2 + Ct}, ${Rt + A + u.height + n / 2})`
    );
  }), h.select(".name").attr("transform", "translate(" + -u.width / 2 + ", " + (A + n / 2) + ")");
  const L = D.rectangle(O, A, E, W, P), B = h.insert(() => L, ":first-child").attr("style", o.join("")), { themeVariables: F } = $t(), { rowEven: M, rowOdd: z, nodeBorder: X } = F;
  d.push(0);
  for (const [nt, ct] of g.entries()) {
    const pt = (nt + 1) % 2 === 0 && ct.yOffset !== 0, gt = D.rectangle(O, u.height + A + (ct == null ? void 0 : ct.yOffset), E, ct == null ? void 0 : ct.rowHeight, {
      ...P,
      fill: pt ? M : z,
      stroke: X
    });
    h.insert(() => gt, "g.label").attr("style", o.join("")).attr("class", `row-rect-${pt ? "even" : "odd"}`);
  }
  let H = D.line(O, u.height + A, E + O, u.height + A, P);
  h.insert(() => H).attr("class", "divider"), H = D.line(m + O, u.height + A, m + O, W + A, P), h.insert(() => H).attr("class", "divider"), _ && (H = D.line(
    m + y + O,
    u.height + A,
    m + y + O,
    W + A,
    P
  ), h.insert(() => H).attr("class", "divider")), S && (H = D.line(
    m + y + x + O,
    u.height + A,
    m + y + x + O,
    W + A,
    P
  ), h.insert(() => H).attr("class", "divider"));
  for (const nt of d)
    H = D.line(
      O,
      u.height + A + nt,
      E + O,
      u.height + A + nt,
      P
    ), h.insert(() => H).attr("class", "divider");
  if (V(t, B), l && t.look !== "handDrawn") {
    const nt = l.split(";"), ct = (st = nt == null ? void 0 : nt.filter((xt) => xt.includes("stroke"))) == null ? void 0 : st.map((xt) => `${xt}`).join("; ");
    h.selectAll("path").attr("style", ct ?? ""), h.selectAll(".row-rect-even path").attr("style", l);
  }
  return t.intersect = function(nt) {
    return q.rect(t, nt);
  }, h;
}
p(Js, "erBox");
async function ur(e, t, r, i = 0, a = 0, n = [], o = "") {
  const s = e.insert("g").attr("class", `label ${n.join(" ")}`).attr("transform", `translate(${i}, ${a})`).attr("style", o);
  t !== Wo(t) && (t = Wo(t), t = t.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
  const l = s.node().appendChild(
    await Oe(
      s,
      t,
      {
        width: ke(t, r) + 100,
        style: o,
        useHtmlLabels: r.htmlLabels
      },
      r
    )
  );
  if (t.includes("&lt;") || t.includes("&gt;")) {
    let h = l.children[0];
    for (h.textContent = h.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">"); h.childNodes[0]; )
      h = h.childNodes[0], h.textContent = h.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  }
  let c = l.getBBox();
  if (kt(r.htmlLabels)) {
    const h = l.children[0];
    h.style.textAlign = "start";
    const u = ht(l);
    c = h.getBoundingClientRect(), u.attr("width", c.width), u.attr("height", c.height);
  }
  return c;
}
p(ur, "addText");
async function Nd(e, t, r, i, a = r.class.padding ?? 12) {
  const n = i ? 0 : 3, o = e.insert("g").attr("class", tt(t)).attr("id", t.domId || t.id);
  let s = null, l = null, c = null, h = null, u = 0, f = 0, d = 0;
  if (s = o.insert("g").attr("class", "annotation-group text"), t.annotations.length > 0) {
    const b = t.annotations[0];
    await Zr(s, { text: `«${b}»` }, 0), u = s.node().getBBox().height;
  }
  l = o.insert("g").attr("class", "label-group text"), await Zr(l, t, 0, ["font-weight: bolder"]);
  const g = l.node().getBBox();
  f = g.height, c = o.insert("g").attr("class", "members-group text");
  let m = 0;
  for (const b of t.members) {
    const _ = await Zr(c, b, m, [b.parseClassifier()]);
    m += _ + n;
  }
  d = c.node().getBBox().height, d <= 0 && (d = a / 2), h = o.insert("g").attr("class", "methods-group text");
  let y = 0;
  for (const b of t.methods) {
    const _ = await Zr(h, b, y, [b.parseClassifier()]);
    y += _ + n;
  }
  let x = o.node().getBBox();
  if (s !== null) {
    const b = s.node().getBBox();
    s.attr("transform", `translate(${-b.width / 2})`);
  }
  return l.attr("transform", `translate(${-g.width / 2}, ${u})`), x = o.node().getBBox(), c.attr(
    "transform",
    `translate(0, ${u + f + a * 2})`
  ), x = o.node().getBBox(), h.attr(
    "transform",
    `translate(0, ${u + f + (d ? d + a * 4 : a * 2)})`
  ), x = o.node().getBBox(), { shapeSvg: o, bbox: x };
}
p(Nd, "textHelper");
async function Zr(e, t, r, i = []) {
  const a = e.insert("g").attr("class", "label").attr("style", i.join("; ")), n = $t();
  let o = "useHtmlLabels" in t ? t.useHtmlLabels : kt(n.htmlLabels) ?? !0, s = "";
  "text" in t ? s = t.text : s = t.label, !o && s.startsWith("\\") && (s = s.substring(1)), kr(s) && (o = !0);
  const l = await Oe(
    a,
    vs(er(s)),
    {
      width: ke(s, n) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels: o
    },
    n
  );
  let c, h = 1;
  if (o) {
    const u = l.children[0], f = ht(l);
    h = u.innerHTML.split("<br>").length, u.innerHTML.includes("</math>") && (h += u.innerHTML.split("<mrow>").length - 1);
    const d = u.getElementsByTagName("img");
    if (d) {
      const g = s.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...d].map(
          (m) => new Promise((y) => {
            function x() {
              var b;
              if (m.style.display = "flex", m.style.flexDirection = "column", g) {
                const _ = ((b = n.fontSize) == null ? void 0 : b.toString()) ?? window.getComputedStyle(document.body).fontSize, w = parseInt(_, 10) * 5 + "px";
                m.style.minWidth = w, m.style.maxWidth = w;
              } else
                m.style.width = "100%";
              y(m);
            }
            p(x, "setupImage"), setTimeout(() => {
              m.complete && x();
            }), m.addEventListener("error", x), m.addEventListener("load", x);
          })
        )
      );
    }
    c = u.getBoundingClientRect(), f.attr("width", c.width), f.attr("height", c.height);
  } else {
    i.includes("font-weight: bolder") && ht(l).selectAll("tspan").attr("font-weight", ""), h = l.children.length;
    const u = l.children[0];
    (l.textContent === "" || l.textContent.includes("&gt")) && (u.textContent = s[0] + s.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim(), s[1] === " " && (u.textContent = u.textContent[0] + " " + u.textContent.substring(1))), u.textContent === "undefined" && (u.textContent = ""), c = l.getBBox();
  }
  return a.attr("transform", "translate(0," + (-c.height / (2 * h) + r) + ")"), c.height;
}
p(Zr, "addText");
async function Wd(e, t) {
  var P, I;
  const r = ft(), i = r.class.padding ?? 12, a = i, n = t.useHtmlLabels ?? kt(r.htmlLabels) ?? !0, o = t;
  o.annotations = o.annotations ?? [], o.members = o.members ?? [], o.methods = o.methods ?? [];
  const { shapeSvg: s, bbox: l } = await Nd(e, t, r, n, a), { labelStyles: c, nodeStyles: h } = G(t);
  t.labelStyle = c, t.cssStyles = o.styles || "";
  const u = ((P = o.styles) == null ? void 0 : P.join(";")) || h || "";
  t.cssStyles || (t.cssStyles = u.replaceAll("!important", "").split(";"));
  const f = o.members.length === 0 && o.methods.length === 0 && !((I = r.class) != null && I.hideEmptyMembersBox), d = U.svg(s), g = j(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  const m = l.width;
  let y = l.height;
  o.members.length === 0 && o.methods.length === 0 ? y += a : o.members.length > 0 && o.methods.length === 0 && (y += a * 2);
  const x = -m / 2, b = -y / 2, _ = d.rectangle(
    x - i,
    b - i - (f ? i : o.members.length === 0 && o.methods.length === 0 ? -i / 2 : 0),
    m + 2 * i,
    y + 2 * i + (f ? i * 2 : o.members.length === 0 && o.methods.length === 0 ? -i : 0),
    g
  ), S = s.insert(() => _, ":first-child");
  S.attr("class", "basic label-container");
  const w = S.node().getBBox();
  s.selectAll(".text").each((E, W, O) => {
    var z;
    const A = ht(O[W]), L = A.attr("transform");
    let B = 0;
    if (L) {
      const H = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(L);
      H && (B = parseFloat(H[2]));
    }
    let F = B + b + i - (f ? i : o.members.length === 0 && o.methods.length === 0 ? -i / 2 : 0);
    n || (F -= 4);
    let M = x;
    (A.attr("class").includes("label-group") || A.attr("class").includes("annotation-group")) && (M = -((z = A.node()) == null ? void 0 : z.getBBox().width) / 2 || 0, s.selectAll("text").each(function(X, H, ut) {
      window.getComputedStyle(ut[H]).textAnchor === "middle" && (M = 0);
    })), A.attr("transform", `translate(${M}, ${F})`);
  });
  const C = s.select(".annotation-group").node().getBBox().height - (f ? i / 2 : 0) || 0, T = s.select(".label-group").node().getBBox().height - (f ? i / 2 : 0) || 0, D = s.select(".members-group").node().getBBox().height - (f ? i / 2 : 0) || 0;
  if (o.members.length > 0 || o.methods.length > 0 || f) {
    const E = d.line(
      w.x,
      C + T + b + i,
      w.x + w.width,
      C + T + b + i,
      g
    );
    s.insert(() => E).attr("class", "divider").attr("style", u);
  }
  if (f || o.members.length > 0 || o.methods.length > 0) {
    const E = d.line(
      w.x,
      C + T + D + b + a * 2 + i,
      w.x + w.width,
      C + T + D + b + i + a * 2,
      g
    );
    s.insert(() => E).attr("class", "divider").attr("style", u);
  }
  if (o.look !== "handDrawn" && s.selectAll("path").attr("style", u), S.select(":nth-child(2)").attr("style", u), s.selectAll(".divider").select("path").attr("style", u), t.labelStyle ? s.selectAll("span").attr("style", t.labelStyle) : s.selectAll("span").attr("style", u), !n) {
    const E = RegExp(/color\s*:\s*([^;]*)/), W = E.exec(u);
    if (W) {
      const O = W[0].replace("color", "fill");
      s.selectAll("tspan").attr("style", O);
    } else if (c) {
      const O = E.exec(c);
      if (O) {
        const A = O[0].replace("color", "fill");
        s.selectAll("tspan").attr("style", A);
      }
    }
  }
  return V(t, S), t.intersect = function(E) {
    return q.rect(t, E);
  }, s;
}
p(Wd, "classBox");
async function zd(e, t) {
  var C, T;
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const a = t, n = t, o = 20, s = 20, l = "verifyMethod" in t, c = tt(t), h = e.insert("g").attr("class", c).attr("id", t.domId ?? t.id);
  let u;
  l ? u = await ce(
    h,
    `&lt;&lt;${a.type}&gt;&gt;`,
    0,
    t.labelStyle
  ) : u = await ce(h, "&lt;&lt;Element&gt;&gt;", 0, t.labelStyle);
  let f = u;
  const d = await ce(
    h,
    a.name,
    f,
    t.labelStyle + "; font-weight: bold;"
  );
  if (f += d + s, l) {
    const D = await ce(
      h,
      `${a.requirementId ? `ID: ${a.requirementId}` : ""}`,
      f,
      t.labelStyle
    );
    f += D;
    const P = await ce(
      h,
      `${a.text ? `Text: ${a.text}` : ""}`,
      f,
      t.labelStyle
    );
    f += P;
    const I = await ce(
      h,
      `${a.risk ? `Risk: ${a.risk}` : ""}`,
      f,
      t.labelStyle
    );
    f += I, await ce(
      h,
      `${a.verifyMethod ? `Verification: ${a.verifyMethod}` : ""}`,
      f,
      t.labelStyle
    );
  } else {
    const D = await ce(
      h,
      `${n.type ? `Type: ${n.type}` : ""}`,
      f,
      t.labelStyle
    );
    f += D, await ce(
      h,
      `${n.docRef ? `Doc Ref: ${n.docRef}` : ""}`,
      f,
      t.labelStyle
    );
  }
  const g = (((C = h.node()) == null ? void 0 : C.getBBox().width) ?? 200) + o, m = (((T = h.node()) == null ? void 0 : T.getBBox().height) ?? 200) + o, y = -g / 2, x = -m / 2, b = U.svg(h), _ = j(t, {});
  t.look !== "handDrawn" && (_.roughness = 0, _.fillStyle = "solid");
  const S = b.rectangle(y, x, g, m, _), w = h.insert(() => S, ":first-child");
  if (w.attr("class", "basic label-container").attr("style", i), h.selectAll(".label").each((D, P, I) => {
    const E = ht(I[P]), W = E.attr("transform");
    let O = 0, A = 0;
    if (W) {
      const M = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(W);
      M && (O = parseFloat(M[1]), A = parseFloat(M[2]));
    }
    const L = A - m / 2;
    let B = y + o / 2;
    (P === 0 || P === 1) && (B = O), E.attr("transform", `translate(${B}, ${L + o})`);
  }), f > u + d + s) {
    const D = b.line(
      y,
      x + u + d + s,
      y + g,
      x + u + d + s,
      _
    );
    h.insert(() => D).attr("style", i);
  }
  return V(t, w), t.intersect = function(D) {
    return q.rect(t, D);
  }, h;
}
p(zd, "requirementBox");
async function ce(e, t, r, i = "") {
  if (t === "")
    return 0;
  const a = e.insert("g").attr("class", "label").attr("style", i), n = ft(), o = n.htmlLabels ?? !0, s = await Oe(
    a,
    vs(er(t)),
    {
      width: ke(t, n) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels: o,
      style: i
    },
    n
  );
  let l;
  if (o) {
    const c = s.children[0], h = ht(s);
    l = c.getBoundingClientRect(), h.attr("width", l.width), h.attr("height", l.height);
  } else {
    const c = s.children[0];
    for (const h of c.children)
      h.textContent = h.textContent.replaceAll("&gt;", ">").replaceAll("&lt;", "<"), i && h.setAttribute("style", i);
    l = s.getBBox(), l.height += 6;
  }
  return a.attr("transform", `translate(${-l.width / 2},${-l.height / 2 + r})`), l.height;
}
p(ce, "addText");
var g_ = /* @__PURE__ */ p((e) => {
  switch (e) {
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
async function qd(e, t, { config: r }) {
  var W, O;
  const { labelStyles: i, nodeStyles: a } = G(t);
  t.labelStyle = i || "";
  const n = 10, o = t.width;
  t.width = (t.width ?? 200) - 10;
  const {
    shapeSvg: s,
    bbox: l,
    label: c
  } = await et(e, t, tt(t)), h = t.padding || 10;
  let u = "", f;
  "ticket" in t && t.ticket && ((W = r == null ? void 0 : r.kanban) != null && W.ticketBaseUrl) && (u = (O = r == null ? void 0 : r.kanban) == null ? void 0 : O.ticketBaseUrl.replace("#TICKET#", t.ticket), f = s.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", u).attr("target", "_blank"));
  const d = {
    useHtmlLabels: t.useHtmlLabels,
    labelStyle: t.labelStyle || "",
    width: t.width,
    img: t.img,
    padding: t.padding || 8,
    centerLabel: !1
  };
  let g, m;
  f ? { label: g, bbox: m } = await Cn(
    f,
    "ticket" in t && t.ticket || "",
    d
  ) : { label: g, bbox: m } = await Cn(
    s,
    "ticket" in t && t.ticket || "",
    d
  );
  const { label: y, bbox: x } = await Cn(
    s,
    "assigned" in t && t.assigned || "",
    d
  );
  t.width = o;
  const b = 10, _ = (t == null ? void 0 : t.width) || 0, S = Math.max(m.height, x.height) / 2, w = Math.max(l.height + b * 2, (t == null ? void 0 : t.height) || 0) + S, C = -_ / 2, T = -w / 2;
  c.attr(
    "transform",
    "translate(" + (h - _ / 2) + ", " + (-S - l.height / 2) + ")"
  ), g.attr(
    "transform",
    "translate(" + (h - _ / 2) + ", " + (-S + l.height / 2) + ")"
  ), y.attr(
    "transform",
    "translate(" + (h + _ / 2 - x.width - 2 * n) + ", " + (-S + l.height / 2) + ")"
  );
  let D;
  const { rx: P, ry: I } = t, { cssStyles: E } = t;
  if (t.look === "handDrawn") {
    const A = U.svg(s), L = j(t, {}), B = P || I ? A.path(Ie(C, T, _, w, P || 0), L) : A.rectangle(C, T, _, w, L);
    D = s.insert(() => B, ":first-child"), D.attr("class", "basic label-container").attr("style", E || null);
  } else {
    D = s.insert("rect", ":first-child"), D.attr("class", "basic label-container __APA__").attr("style", a).attr("rx", P ?? 5).attr("ry", I ?? 5).attr("x", C).attr("y", T).attr("width", _).attr("height", w);
    const A = "priority" in t && t.priority;
    if (A) {
      const L = s.append("line"), B = C + 2, F = T + Math.floor((P ?? 0) / 2), M = T + w - Math.floor((P ?? 0) / 2);
      L.attr("x1", B).attr("y1", F).attr("x2", B).attr("y2", M).attr("stroke-width", "4").attr("stroke", g_(A));
    }
  }
  return V(t, D), t.height = w, t.intersect = function(A) {
    return q.rect(t, A);
  }, s;
}
p(qd, "kanbanItem");
async function Hd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, halfPadding: o, label: s } = await et(
    e,
    t,
    tt(t)
  ), l = n.width + 10 * o, c = n.height + 8 * o, h = 0.15 * l, { cssStyles: u } = t, f = n.width + 20, d = n.height + 20, g = Math.max(l, f), m = Math.max(c, d);
  s.attr("transform", `translate(${-n.width / 2}, ${-n.height / 2})`);
  let y;
  const x = `M0 0 
    a${h},${h} 1 0,0 ${g * 0.25},${-1 * m * 0.1}
    a${h},${h} 1 0,0 ${g * 0.25},0
    a${h},${h} 1 0,0 ${g * 0.25},0
    a${h},${h} 1 0,0 ${g * 0.25},${m * 0.1}

    a${h},${h} 1 0,0 ${g * 0.15},${m * 0.33}
    a${h * 0.8},${h * 0.8} 1 0,0 0,${m * 0.34}
    a${h},${h} 1 0,0 ${-1 * g * 0.15},${m * 0.33}

    a${h},${h} 1 0,0 ${-1 * g * 0.25},${m * 0.15}
    a${h},${h} 1 0,0 ${-1 * g * 0.25},0
    a${h},${h} 1 0,0 ${-1 * g * 0.25},0
    a${h},${h} 1 0,0 ${-1 * g * 0.25},${-1 * m * 0.15}

    a${h},${h} 1 0,0 ${-1 * g * 0.1},${-1 * m * 0.33}
    a${h * 0.8},${h * 0.8} 1 0,0 0,${-1 * m * 0.34}
    a${h},${h} 1 0,0 ${g * 0.1},${-1 * m * 0.33}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    const b = U.svg(a), _ = j(t, {}), S = b.path(x, _);
    y = a.insert(() => S, ":first-child"), y.attr("class", "basic label-container").attr("style", Ot(u));
  } else
    y = a.insert("path", ":first-child").attr("class", "basic label-container").attr("style", i).attr("d", x);
  return y.attr("transform", `translate(${-g / 2}, ${-m / 2})`), V(t, y), t.calcIntersect = function(b, _) {
    return q.rect(b, _);
  }, t.intersect = function(b) {
    return $.info("Bang intersect", t, b), q.rect(t, b);
  }, a;
}
p(Hd, "bang");
async function Yd(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, halfPadding: o, label: s } = await et(
    e,
    t,
    tt(t)
  ), l = n.width + 2 * o, c = n.height + 2 * o, h = 0.15 * l, u = 0.25 * l, f = 0.35 * l, d = 0.2 * l, { cssStyles: g } = t;
  let m;
  const y = `M0 0 
    a${h},${h} 0 0,1 ${l * 0.25},${-1 * l * 0.1}
    a${f},${f} 1 0,1 ${l * 0.4},${-1 * l * 0.1}
    a${u},${u} 1 0,1 ${l * 0.35},${l * 0.2}

    a${h},${h} 1 0,1 ${l * 0.15},${c * 0.35}
    a${d},${d} 1 0,1 ${-1 * l * 0.15},${c * 0.65}

    a${u},${h} 1 0,1 ${-1 * l * 0.25},${l * 0.15}
    a${f},${f} 1 0,1 ${-1 * l * 0.5},0
    a${h},${h} 1 0,1 ${-1 * l * 0.25},${-1 * l * 0.15}

    a${h},${h} 1 0,1 ${-1 * l * 0.1},${-1 * c * 0.35}
    a${d},${d} 1 0,1 ${l * 0.1},${-1 * c * 0.65}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    const x = U.svg(a), b = j(t, {}), _ = x.path(y, b);
    m = a.insert(() => _, ":first-child"), m.attr("class", "basic label-container").attr("style", Ot(g));
  } else
    m = a.insert("path", ":first-child").attr("class", "basic label-container").attr("style", i).attr("d", y);
  return s.attr("transform", `translate(${-n.width / 2}, ${-n.height / 2})`), m.attr("transform", `translate(${-l / 2}, ${-c / 2})`), V(t, m), t.calcIntersect = function(x, b) {
    return q.rect(x, b);
  }, t.intersect = function(x) {
    return $.info("Cloud intersect", t, x), q.rect(t, x);
  }, a;
}
p(Yd, "cloud");
async function Ud(e, t) {
  const { labelStyles: r, nodeStyles: i } = G(t);
  t.labelStyle = r;
  const { shapeSvg: a, bbox: n, halfPadding: o, label: s } = await et(
    e,
    t,
    tt(t)
  ), l = n.width + 8 * o, c = n.height + 2 * o, h = 5, u = `
    M${-l / 2} ${c / 2 - h}
    v${-c + 2 * h}
    q0,-${h} ${h},-${h}
    h${l - 2 * h}
    q${h},0 ${h},${h}
    v${c - 2 * h}
    q0,${h} -${h},${h}
    h${-l + 2 * h}
    q-${h},0 -${h},-${h}
    Z
  `, f = a.append("path").attr("id", "node-" + t.id).attr("class", "node-bkg node-" + t.type).attr("style", i).attr("d", u);
  return a.append("line").attr("class", "node-line-").attr("x1", -l / 2).attr("y1", c / 2).attr("x2", l / 2).attr("y2", c / 2), s.attr("transform", `translate(${-n.width / 2}, ${-n.height / 2})`), a.append(() => s.node()), V(t, f), t.calcIntersect = function(d, g) {
    return q.rect(d, g);
  }, t.intersect = function(d) {
    return q.rect(t, d);
  }, a;
}
p(Ud, "defaultMindmapNode");
async function jd(e, t) {
  const r = {
    padding: t.padding ?? 0
  };
  return Qs(e, t, r);
}
p(jd, "mindmapCircle");
var m_ = [
  {
    semanticName: "Process",
    name: "Rectangle",
    shortName: "rect",
    description: "Standard process shape",
    aliases: ["proc", "process", "rectangle"],
    internalAliases: ["squareRect"],
    handler: wd
  },
  {
    semanticName: "Event",
    name: "Rounded Rectangle",
    shortName: "rounded",
    description: "Represents an event",
    aliases: ["event"],
    internalAliases: ["roundedRect"],
    handler: Cd
  },
  {
    semanticName: "Terminal Point",
    name: "Stadium",
    shortName: "stadium",
    description: "Terminal point",
    aliases: ["terminal", "pill"],
    handler: Sd
  },
  {
    semanticName: "Subprocess",
    name: "Framed Rectangle",
    shortName: "fr-rect",
    description: "Subprocess",
    aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"],
    handler: Ld
  },
  {
    semanticName: "Database",
    name: "Cylinder",
    shortName: "cyl",
    description: "Database storage",
    aliases: ["db", "database", "cylinder"],
    handler: Gf
  },
  {
    semanticName: "Start",
    name: "Circle",
    shortName: "circle",
    description: "Starting point",
    aliases: ["circ"],
    handler: Qs
  },
  {
    semanticName: "Bang",
    name: "Bang",
    shortName: "bang",
    description: "Bang",
    aliases: ["bang"],
    handler: Hd
  },
  {
    semanticName: "Cloud",
    name: "Cloud",
    shortName: "cloud",
    description: "cloud",
    aliases: ["cloud"],
    handler: Yd
  },
  {
    semanticName: "Decision",
    name: "Diamond",
    shortName: "diam",
    description: "Decision-making step",
    aliases: ["decision", "diamond", "question"],
    handler: yd
  },
  {
    semanticName: "Prepare Conditional",
    name: "Hexagon",
    shortName: "hex",
    description: "Preparation or condition step",
    aliases: ["hexagon", "prepare"],
    handler: td
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Right",
    shortName: "lean-r",
    description: "Represents input or output",
    aliases: ["lean-right", "in-out"],
    internalAliases: ["lean_right"],
    handler: hd
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Left",
    shortName: "lean-l",
    description: "Represents output or input",
    aliases: ["lean-left", "out-in"],
    internalAliases: ["lean_left"],
    handler: cd
  },
  {
    semanticName: "Priority Action",
    name: "Trapezoid Base Bottom",
    shortName: "trap-b",
    description: "Priority action",
    aliases: ["priority", "trapezoid-bottom", "trapezoid"],
    handler: $d
  },
  {
    semanticName: "Manual Operation",
    name: "Trapezoid Base Top",
    shortName: "trap-t",
    description: "Represents a manual task",
    aliases: ["manual", "trapezoid-top", "inv-trapezoid"],
    internalAliases: ["inv_trapezoid"],
    handler: od
  },
  {
    semanticName: "Stop",
    name: "Double Circle",
    shortName: "dbl-circ",
    description: "Represents a stop point",
    aliases: ["double-circle"],
    internalAliases: ["doublecircle"],
    handler: Vf
  },
  {
    semanticName: "Text Block",
    name: "Text Block",
    shortName: "text",
    description: "Text block",
    handler: Ed
  },
  {
    semanticName: "Card",
    name: "Notched Rectangle",
    shortName: "notch-rect",
    description: "Represents a card",
    aliases: ["card", "notched-rectangle"],
    handler: Nf
  },
  {
    semanticName: "Lined/Shaded Process",
    name: "Lined Rectangle",
    shortName: "lin-rect",
    description: "Lined process shape",
    aliases: ["lined-rectangle", "lined-process", "lin-proc", "shaded-process"],
    handler: _d
  },
  {
    semanticName: "Start",
    name: "Small Circle",
    shortName: "sm-circ",
    description: "Small starting point",
    aliases: ["start", "small-circle"],
    internalAliases: ["stateStart"],
    handler: Bd
  },
  {
    semanticName: "Stop",
    name: "Framed Circle",
    shortName: "fr-circ",
    description: "Stop point",
    aliases: ["stop", "framed-circle"],
    internalAliases: ["stateEnd"],
    handler: Td
  },
  {
    semanticName: "Fork/Join",
    name: "Filled Rectangle",
    shortName: "fork",
    description: "Fork or join in process flow",
    aliases: ["join"],
    internalAliases: ["forkJoin"],
    handler: Qf
  },
  {
    semanticName: "Collate",
    name: "Hourglass",
    shortName: "hourglass",
    description: "Represents a collate operation",
    aliases: ["hourglass", "collate"],
    handler: ed
  },
  {
    semanticName: "Comment",
    name: "Curly Brace",
    shortName: "brace",
    description: "Adds a comment",
    aliases: ["comment", "brace-l"],
    handler: Hf
  },
  {
    semanticName: "Comment Right",
    name: "Curly Brace",
    shortName: "brace-r",
    description: "Adds a comment",
    handler: Yf
  },
  {
    semanticName: "Comment with braces on both sides",
    name: "Curly Braces",
    shortName: "braces",
    description: "Adds a comment",
    handler: Uf
  },
  {
    semanticName: "Com Link",
    name: "Lightning Bolt",
    shortName: "bolt",
    description: "Communication link",
    aliases: ["com-link", "lightning-bolt"],
    handler: ud
  },
  {
    semanticName: "Document",
    name: "Document",
    shortName: "doc",
    description: "Represents a document",
    aliases: ["doc", "document"],
    handler: Id
  },
  {
    semanticName: "Delay",
    name: "Half-Rounded Rectangle",
    shortName: "delay",
    description: "Represents a delay",
    aliases: ["half-rounded-rectangle"],
    handler: Jf
  },
  {
    semanticName: "Direct Access Storage",
    name: "Horizontal Cylinder",
    shortName: "h-cyl",
    description: "Direct access storage",
    aliases: ["das", "horizontal-cylinder"],
    handler: Fd
  },
  {
    semanticName: "Disk Storage",
    name: "Lined Cylinder",
    shortName: "lin-cyl",
    description: "Disk storage",
    aliases: ["disk", "lined-cylinder"],
    handler: fd
  },
  {
    semanticName: "Display",
    name: "Curved Trapezoid",
    shortName: "curv-trap",
    description: "Represents a display",
    aliases: ["curved-trapezoid", "display"],
    handler: jf
  },
  {
    semanticName: "Divided Process",
    name: "Divided Rectangle",
    shortName: "div-rect",
    description: "Divided process shape",
    aliases: ["div-proc", "divided-rectangle", "divided-process"],
    handler: Xf
  },
  {
    semanticName: "Extract",
    name: "Triangle",
    shortName: "tri",
    description: "Extraction process",
    aliases: ["extract", "triangle"],
    handler: Od
  },
  {
    semanticName: "Internal Storage",
    name: "Window Pane",
    shortName: "win-pane",
    description: "Internal storage",
    aliases: ["internal-storage", "window-pane"],
    handler: Pd
  },
  {
    semanticName: "Junction",
    name: "Filled Circle",
    shortName: "f-circ",
    description: "Junction point",
    aliases: ["junction", "filled-circle"],
    handler: Kf
  },
  {
    semanticName: "Loop Limit",
    name: "Trapezoidal Pentagon",
    shortName: "notch-pent",
    description: "Loop limit step",
    aliases: ["loop-limit", "notched-pentagon"],
    handler: Dd
  },
  {
    semanticName: "Manual File",
    name: "Flipped Triangle",
    shortName: "flip-tri",
    description: "Manual file operation",
    aliases: ["manual-file", "flipped-triangle"],
    handler: Zf
  },
  {
    semanticName: "Manual Input",
    name: "Sloped Rectangle",
    shortName: "sl-rect",
    description: "Manual input step",
    aliases: ["manual-input", "sloped-rectangle"],
    handler: vd
  },
  {
    semanticName: "Multi-Document",
    name: "Stacked Document",
    shortName: "docs",
    description: "Multiple documents",
    aliases: ["documents", "st-doc", "stacked-document"],
    handler: gd
  },
  {
    semanticName: "Multi-Process",
    name: "Stacked Rectangle",
    shortName: "st-rect",
    description: "Multiple processes",
    aliases: ["procs", "processes", "stacked-rectangle"],
    handler: pd
  },
  {
    semanticName: "Stored Data",
    name: "Bow Tie Rectangle",
    shortName: "bow-rect",
    description: "Stored data",
    aliases: ["stored-data", "bow-tie-rectangle"],
    handler: Pf
  },
  {
    semanticName: "Summary",
    name: "Crossed Circle",
    shortName: "cross-circ",
    description: "Summary",
    aliases: ["summary", "crossed-circle"],
    handler: qf
  },
  {
    semanticName: "Tagged Document",
    name: "Tagged Document",
    shortName: "tag-doc",
    description: "Tagged document",
    aliases: ["tag-doc", "tagged-document"],
    handler: Ad
  },
  {
    semanticName: "Tagged Process",
    name: "Tagged Rectangle",
    shortName: "tag-rect",
    description: "Tagged process",
    aliases: ["tagged-rectangle", "tag-proc", "tagged-process"],
    handler: Md
  },
  {
    semanticName: "Paper Tape",
    name: "Flag",
    shortName: "flag",
    description: "Paper tape",
    aliases: ["paper-tape"],
    handler: Rd
  },
  {
    semanticName: "Odd",
    name: "Odd",
    shortName: "odd",
    description: "Odd shape",
    internalAliases: ["rect_left_inv_arrow"],
    handler: xd
  },
  {
    semanticName: "Lined Document",
    name: "Lined Document",
    shortName: "lin-doc",
    description: "Lined document",
    aliases: ["lined-document"],
    handler: dd
  }
], y_ = /* @__PURE__ */ p(() => {
  const t = [
    ...Object.entries({
      // States
      state: kd,
      choice: Wf,
      note: md,
      // Rectangles
      rectWithTitle: bd,
      labelRect: ld,
      // Icons
      iconSquare: nd,
      iconCircle: id,
      icon: rd,
      iconRounded: ad,
      imageSquare: sd,
      anchor: Rf,
      // Kanban diagram
      kanbanItem: qd,
      //Mindmap diagram
      mindmapCircle: jd,
      defaultMindmapNode: Ud,
      // class diagram
      classBox: Wd,
      // er diagram
      erBox: Js,
      // Requirement diagram
      requirementBox: zd
    }),
    ...m_.flatMap((r) => [
      r.shortName,
      ..."aliases" in r ? r.aliases : [],
      ..."internalAliases" in r ? r.internalAliases : []
    ].map((a) => [a, r.handler]))
  ];
  return Object.fromEntries(t);
}, "generateShapeMap"), Gd = y_();
function x_(e) {
  return e in Gd;
}
p(x_, "isValidShape");
var ja = /* @__PURE__ */ new Map();
async function Xd(e, t, r) {
  let i, a;
  t.shape === "rect" && (t.rx && t.ry ? t.shape = "roundedRect" : t.shape = "squareRect");
  const n = t.shape ? Gd[t.shape] : void 0;
  if (!n)
    throw new Error(`No such shape: ${t.shape}. Please check your syntax.`);
  if (t.link) {
    let o;
    r.config.securityLevel === "sandbox" ? o = "_top" : t.linkTarget && (o = t.linkTarget || "_blank"), i = e.insert("svg:a").attr("xlink:href", t.link).attr("target", o ?? null), a = await n(i, t, r);
  } else
    a = await n(e, t, r), i = a;
  return t.tooltip && a.attr("title", t.tooltip), ja.set(t.id, i), t.haveCallback && i.attr("class", i.attr("class") + " clickable"), i;
}
p(Xd, "insertNode");
var GS = /* @__PURE__ */ p((e, t) => {
  ja.set(t.id, e);
}, "setNodeElem"), XS = /* @__PURE__ */ p(() => {
  ja.clear();
}, "clear"), VS = /* @__PURE__ */ p((e) => {
  const t = ja.get(e.id);
  $.trace(
    "Transforming node",
    e.diff,
    e,
    "translate(" + (e.x - e.width / 2 - 5) + ", " + e.width / 2 + ")"
  );
  const r = 8, i = e.diff || 0;
  return e.clusterNode ? t.attr(
    "transform",
    "translate(" + (e.x + i - e.width / 2) + ", " + (e.y - e.height / 2 - r) + ")"
  ) : t.attr("transform", "translate(" + e.x + ", " + e.y + ")"), i;
}, "positionNode"), b_ = /* @__PURE__ */ p((e, t, r, i, a, n) => {
  t.arrowTypeStart && Ml(e, "start", t.arrowTypeStart, r, i, a, n), t.arrowTypeEnd && Ml(e, "end", t.arrowTypeEnd, r, i, a, n);
}, "addEdgeMarkers"), C_ = {
  arrow_cross: { type: "cross", fill: !1 },
  arrow_point: { type: "point", fill: !0 },
  arrow_barb: { type: "barb", fill: !0 },
  arrow_circle: { type: "circle", fill: !1 },
  aggregation: { type: "aggregation", fill: !1 },
  extension: { type: "extension", fill: !1 },
  composition: { type: "composition", fill: !0 },
  dependency: { type: "dependency", fill: !0 },
  lollipop: { type: "lollipop", fill: !1 },
  only_one: { type: "onlyOne", fill: !1 },
  zero_or_one: { type: "zeroOrOne", fill: !1 },
  one_or_more: { type: "oneOrMore", fill: !1 },
  zero_or_more: { type: "zeroOrMore", fill: !1 },
  requirement_arrow: { type: "requirement_arrow", fill: !1 },
  requirement_contains: { type: "requirement_contains", fill: !1 }
}, Ml = /* @__PURE__ */ p((e, t, r, i, a, n, o) => {
  var u;
  const s = C_[r];
  if (!s) {
    $.warn(`Unknown arrow type: ${r}`);
    return;
  }
  const l = s.type, h = `${a}_${n}-${l}${t === "start" ? "Start" : "End"}`;
  if (o && o.trim() !== "") {
    const f = o.replace(/[^\dA-Za-z]/g, "_"), d = `${h}_${f}`;
    if (!document.getElementById(d)) {
      const g = document.getElementById(h);
      if (g) {
        const m = g.cloneNode(!0);
        m.id = d, m.querySelectorAll("path, circle, line").forEach((x) => {
          x.setAttribute("stroke", o), s.fill && x.setAttribute("fill", o);
        }), (u = g.parentNode) == null || u.appendChild(m);
      }
    }
    e.attr(`marker-${t}`, `url(${i}#${d})`);
  } else
    e.attr(`marker-${t}`, `url(${i}#${h})`);
}, "addEdgeMarker"), ka = /* @__PURE__ */ new Map(), Mt = /* @__PURE__ */ new Map(), KS = /* @__PURE__ */ p(() => {
  ka.clear(), Mt.clear();
}, "clear"), Pi = /* @__PURE__ */ p((e) => e ? e.reduce((r, i) => r + ";" + i, "") : "", "getLabelStyles"), __ = /* @__PURE__ */ p(async (e, t) => {
  let r = kt(ft().flowchart.htmlLabels);
  const { labelStyles: i } = G(t);
  t.labelStyle = i;
  const a = await Oe(e, t.label, {
    style: t.labelStyle,
    useHtmlLabels: r,
    addSvgBackground: !0,
    isNode: !1
  });
  $.info("abc82", t, t.labelType);
  const n = e.insert("g").attr("class", "edgeLabel"), o = n.insert("g").attr("class", "label").attr("data-id", t.id);
  o.node().appendChild(a);
  let s = a.getBBox();
  if (r) {
    const c = a.children[0], h = ht(a);
    s = c.getBoundingClientRect(), h.attr("width", s.width), h.attr("height", s.height);
  }
  o.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")"), ka.set(t.id, n), t.width = s.width, t.height = s.height;
  let l;
  if (t.startLabelLeft) {
    const c = await je(
      t.startLabelLeft,
      Pi(t.labelStyle)
    ), h = e.insert("g").attr("class", "edgeTerminals"), u = h.insert("g").attr("class", "inner");
    l = u.node().appendChild(c);
    const f = c.getBBox();
    u.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), Mt.get(t.id) || Mt.set(t.id, {}), Mt.get(t.id).startLeft = h, Qr(l, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    const c = await je(
      t.startLabelRight,
      Pi(t.labelStyle)
    ), h = e.insert("g").attr("class", "edgeTerminals"), u = h.insert("g").attr("class", "inner");
    l = h.node().appendChild(c), u.node().appendChild(c);
    const f = c.getBBox();
    u.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), Mt.get(t.id) || Mt.set(t.id, {}), Mt.get(t.id).startRight = h, Qr(l, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    const c = await je(t.endLabelLeft, Pi(t.labelStyle)), h = e.insert("g").attr("class", "edgeTerminals"), u = h.insert("g").attr("class", "inner");
    l = u.node().appendChild(c);
    const f = c.getBBox();
    u.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), h.node().appendChild(c), Mt.get(t.id) || Mt.set(t.id, {}), Mt.get(t.id).endLeft = h, Qr(l, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    const c = await je(t.endLabelRight, Pi(t.labelStyle)), h = e.insert("g").attr("class", "edgeTerminals"), u = h.insert("g").attr("class", "inner");
    l = u.node().appendChild(c);
    const f = c.getBBox();
    u.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), h.node().appendChild(c), Mt.get(t.id) || Mt.set(t.id, {}), Mt.get(t.id).endRight = h, Qr(l, t.endLabelRight);
  }
  return a;
}, "insertEdgeLabel");
function Qr(e, t) {
  ft().flowchart.htmlLabels && e && (e.style.width = t.length * 9 + "px", e.style.height = "12px");
}
p(Qr, "setTerminalWidth");
var v_ = /* @__PURE__ */ p((e, t) => {
  $.debug("Moving label abc88 ", e.id, e.label, ka.get(e.id), t);
  let r = t.updatedPath ? t.updatedPath : t.originalPath;
  const i = ft(), { subGraphTitleTotalMargin: a } = qs(i);
  if (e.label) {
    const n = ka.get(e.id);
    let o = e.x, s = e.y;
    if (r) {
      const l = ie.calcLabelPosition(r);
      $.debug(
        "Moving label " + e.label + " from (",
        o,
        ",",
        s,
        ") to (",
        l.x,
        ",",
        l.y,
        ") abc88"
      ), t.updatedPath && (o = l.x, s = l.y);
    }
    n.attr("transform", `translate(${o}, ${s + a / 2})`);
  }
  if (e.startLabelLeft) {
    const n = Mt.get(e.id).startLeft;
    let o = e.x, s = e.y;
    if (r) {
      const l = ie.calcTerminalLabelPosition(e.arrowTypeStart ? 10 : 0, "start_left", r);
      o = l.x, s = l.y;
    }
    n.attr("transform", `translate(${o}, ${s})`);
  }
  if (e.startLabelRight) {
    const n = Mt.get(e.id).startRight;
    let o = e.x, s = e.y;
    if (r) {
      const l = ie.calcTerminalLabelPosition(
        e.arrowTypeStart ? 10 : 0,
        "start_right",
        r
      );
      o = l.x, s = l.y;
    }
    n.attr("transform", `translate(${o}, ${s})`);
  }
  if (e.endLabelLeft) {
    const n = Mt.get(e.id).endLeft;
    let o = e.x, s = e.y;
    if (r) {
      const l = ie.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_left", r);
      o = l.x, s = l.y;
    }
    n.attr("transform", `translate(${o}, ${s})`);
  }
  if (e.endLabelRight) {
    const n = Mt.get(e.id).endRight;
    let o = e.x, s = e.y;
    if (r) {
      const l = ie.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_right", r);
      o = l.x, s = l.y;
    }
    n.attr("transform", `translate(${o}, ${s})`);
  }
}, "positionEdgeLabel"), w_ = /* @__PURE__ */ p((e, t) => {
  const r = e.x, i = e.y, a = Math.abs(t.x - r), n = Math.abs(t.y - i), o = e.width / 2, s = e.height / 2;
  return a >= o || n >= s;
}, "outsideNode"), S_ = /* @__PURE__ */ p((e, t, r) => {
  $.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(r)}
  node        : x:${e.x} y:${e.y} w:${e.width} h:${e.height}`);
  const i = e.x, a = e.y, n = Math.abs(i - r.x), o = e.width / 2;
  let s = r.x < t.x ? o - n : o + n;
  const l = e.height / 2, c = Math.abs(t.y - r.y), h = Math.abs(t.x - r.x);
  if (Math.abs(a - t.y) * o > Math.abs(i - t.x) * l) {
    let u = r.y < t.y ? t.y - l - a : a - l - t.y;
    s = h * u / c;
    const f = {
      x: r.x < t.x ? r.x + s : r.x - h + s,
      y: r.y < t.y ? r.y + c - u : r.y - c + u
    };
    return s === 0 && (f.x = t.x, f.y = t.y), h === 0 && (f.x = t.x), c === 0 && (f.y = t.y), $.debug(`abc89 top/bottom calc, Q ${c}, q ${u}, R ${h}, r ${s}`, f), f;
  } else {
    r.x < t.x ? s = t.x - o - i : s = i - o - t.x;
    let u = c * s / h, f = r.x < t.x ? r.x + h - s : r.x - h + s, d = r.y < t.y ? r.y + u : r.y - u;
    return $.debug(`sides calc abc89, Q ${c}, q ${u}, R ${h}, r ${s}`, { _x: f, _y: d }), s === 0 && (f = t.x, d = t.y), h === 0 && (f = t.x), c === 0 && (d = t.y), { x: f, y: d };
  }
}, "intersection"), Al = /* @__PURE__ */ p((e, t) => {
  $.warn("abc88 cutPathAtIntersect", e, t);
  let r = [], i = e[0], a = !1;
  return e.forEach((n) => {
    if ($.info("abc88 checking point", n, t), !w_(t, n) && !a) {
      const o = S_(t, i, n);
      $.debug("abc88 inside", n, i, o), $.debug("abc88 intersection", o, t);
      let s = !1;
      r.forEach((l) => {
        s = s || l.x === o.x && l.y === o.y;
      }), r.some((l) => l.x === o.x && l.y === o.y) ? $.warn("abc88 no intersect", o, r) : r.push(o), a = !0;
    } else
      $.warn("abc88 outside", n, i), i = n, a || r.push(n);
  }), $.debug("returning points", r), r;
}, "cutPathAtIntersect");
function Vd(e) {
  const t = [], r = [];
  for (let i = 1; i < e.length - 1; i++) {
    const a = e[i - 1], n = e[i], o = e[i + 1];
    (a.x === n.x && n.y === o.y && Math.abs(n.x - o.x) > 5 && Math.abs(n.y - a.y) > 5 || a.y === n.y && n.x === o.x && Math.abs(n.x - a.x) > 5 && Math.abs(n.y - o.y) > 5) && (t.push(n), r.push(i));
  }
  return { cornerPoints: t, cornerPointPositions: r };
}
p(Vd, "extractCornerPoints");
var El = /* @__PURE__ */ p(function(e, t, r) {
  const i = t.x - e.x, a = t.y - e.y, n = Math.sqrt(i * i + a * a), o = r / n;
  return { x: t.x - o * i, y: t.y - o * a };
}, "findAdjacentPoint"), k_ = /* @__PURE__ */ p(function(e) {
  const { cornerPointPositions: t } = Vd(e), r = [];
  for (let i = 0; i < e.length; i++)
    if (t.includes(i)) {
      const a = e[i - 1], n = e[i + 1], o = e[i], s = El(a, o, 5), l = El(n, o, 5), c = l.x - s.x, h = l.y - s.y;
      r.push(s);
      const u = Math.sqrt(2) * 2;
      let f = { x: o.x, y: o.y };
      if (Math.abs(n.x - a.x) > 10 && Math.abs(n.y - a.y) >= 10) {
        $.debug(
          "Corner point fixing",
          Math.abs(n.x - a.x),
          Math.abs(n.y - a.y)
        );
        const d = 5;
        o.x === s.x ? f = {
          x: c < 0 ? s.x - d + u : s.x + d - u,
          y: h < 0 ? s.y - u : s.y + u
        } : f = {
          x: c < 0 ? s.x - u : s.x + u,
          y: h < 0 ? s.y - d + u : s.y + d - u
        };
      } else
        $.debug(
          "Corner point skipping fixing",
          Math.abs(n.x - a.x),
          Math.abs(n.y - a.y)
        );
      r.push(f, l);
    } else
      r.push(e[i]);
  return r;
}, "fixCorners"), T_ = /* @__PURE__ */ p((e, t, r) => {
  const i = e - t - r, a = 2, n = 2, o = a + n, s = Math.floor(i / o), l = Array(s).fill(`${a} ${n}`).join(" ");
  return `0 ${t} ${l} ${r}`;
}, "generateDashArray"), B_ = /* @__PURE__ */ p(function(e, t, r, i, a, n, o, s = !1) {
  var A;
  const { handDrawnSeed: l } = ft();
  let c = t.points, h = !1;
  const u = a;
  var f = n;
  const d = [];
  for (const L in t.cssCompiledStyles)
    Ku(L) || d.push(t.cssCompiledStyles[L]);
  $.debug("UIO intersect check", t.points, f.x, u.x), f.intersect && u.intersect && !s && (c = c.slice(1, t.points.length - 1), c.unshift(u.intersect(c[0])), $.debug(
    "Last point UIO",
    t.start,
    "-->",
    t.end,
    c[c.length - 1],
    f,
    f.intersect(c[c.length - 1])
  ), c.push(f.intersect(c[c.length - 1])));
  const g = btoa(JSON.stringify(c));
  t.toCluster && ($.info("to cluster abc88", r.get(t.toCluster)), c = Al(t.points, r.get(t.toCluster).node), h = !0), t.fromCluster && ($.debug(
    "from cluster abc88",
    r.get(t.fromCluster),
    JSON.stringify(c, null, 2)
  ), c = Al(c.reverse(), r.get(t.fromCluster).node).reverse(), h = !0);
  let m = c.filter((L) => !Number.isNaN(L.y));
  m = k_(m);
  let y = ji;
  switch (y = ca, t.curve) {
    case "linear":
      y = ca;
      break;
    case "basis":
      y = ji;
      break;
    case "cardinal":
      y = th;
      break;
    case "bumpX":
      y = Vc;
      break;
    case "bumpY":
      y = Kc;
      break;
    case "catmullRom":
      y = rh;
      break;
    case "monotoneX":
      y = lh;
      break;
    case "monotoneY":
      y = ch;
      break;
    case "natural":
      y = uh;
      break;
    case "step":
      y = fh;
      break;
    case "stepAfter":
      y = ph;
      break;
    case "stepBefore":
      y = dh;
      break;
    default:
      y = ji;
  }
  const { x, y: b } = O2(t), _ = x1().x(x).y(b).curve(y);
  let S;
  switch (t.thickness) {
    case "normal":
      S = "edge-thickness-normal";
      break;
    case "thick":
      S = "edge-thickness-thick";
      break;
    case "invisible":
      S = "edge-thickness-invisible";
      break;
    default:
      S = "edge-thickness-normal";
  }
  switch (t.pattern) {
    case "solid":
      S += " edge-pattern-solid";
      break;
    case "dotted":
      S += " edge-pattern-dotted";
      break;
    case "dashed":
      S += " edge-pattern-dashed";
      break;
    default:
      S += " edge-pattern-solid";
  }
  let w, C = t.curve === "rounded" ? Kd(Zd(m, t), 5) : _(m);
  const T = Array.isArray(t.style) ? t.style : [t.style];
  let D = T.find((L) => L == null ? void 0 : L.startsWith("stroke:")), P = !1;
  if (t.look === "handDrawn") {
    const L = U.svg(e);
    Object.assign([], m);
    const B = L.path(C, {
      roughness: 0.3,
      seed: l
    });
    S += " transition", w = ht(B).select("path").attr("id", t.id).attr("class", " " + S + (t.classes ? " " + t.classes : "")).attr("style", T ? T.reduce((M, z) => M + ";" + z, "") : "");
    let F = w.attr("d");
    w.attr("d", F), e.node().appendChild(w.node());
  } else {
    const L = d.join(";"), B = T ? T.reduce((at, dt) => at + dt + ";", "") : "";
    let F = "";
    t.animate && (F = " edge-animation-fast"), t.animation && (F = " edge-animation-" + t.animation);
    const M = (L ? L + ";" + B + ";" : B) + ";" + (T ? T.reduce((at, dt) => at + ";" + dt, "") : "");
    w = e.append("path").attr("d", C).attr("id", t.id).attr(
      "class",
      " " + S + (t.classes ? " " + t.classes : "") + (F ?? "")
    ).attr("style", M), D = (A = M.match(/stroke:([^;]+)/)) == null ? void 0 : A[1], P = t.animate === !0 || !!t.animation || L.includes("animation");
    const z = w.node(), X = typeof z.getTotalLength == "function" ? z.getTotalLength() : 0, H = dl[t.arrowTypeStart] || 0, ut = dl[t.arrowTypeEnd] || 0;
    if (t.look === "neo" && !P) {
      const dt = `stroke-dasharray: ${t.pattern === "dotted" || t.pattern === "dashed" ? T_(X, H, ut) : `0 ${H} ${X - H - ut} ${ut}`}; stroke-dashoffset: 0;`;
      w.attr("style", dt + w.attr("style"));
    }
  }
  w.attr("data-edge", !0), w.attr("data-et", "edge"), w.attr("data-id", t.id), w.attr("data-points", g), t.showPoints && m.forEach((L) => {
    e.append("circle").style("stroke", "red").style("fill", "red").attr("r", 1).attr("cx", L.x).attr("cy", L.y);
  });
  let I = "";
  (ft().flowchart.arrowMarkerAbsolute || ft().state.arrowMarkerAbsolute) && (I = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, I = I.replace(/\(/g, "\\(").replace(/\)/g, "\\)")), $.info("arrowTypeStart", t.arrowTypeStart), $.info("arrowTypeEnd", t.arrowTypeEnd), b_(w, t, I, o, i, D);
  const E = Math.floor(c.length / 2), W = c[E];
  ie.isLabelCoordinateInPath(W, w.attr("d")) || (h = !0);
  let O = {};
  return h && (O.updatedPath = c), O.originalPath = t.points, O;
}, "insertEdge");
function Kd(e, t) {
  if (e.length < 2)
    return "";
  let r = "";
  const i = e.length, a = 1e-5;
  for (let n = 0; n < i; n++) {
    const o = e[n], s = e[n - 1], l = e[n + 1];
    if (n === 0)
      r += `M${o.x},${o.y}`;
    else if (n === i - 1)
      r += `L${o.x},${o.y}`;
    else {
      const c = o.x - s.x, h = o.y - s.y, u = l.x - o.x, f = l.y - o.y, d = Math.hypot(c, h), g = Math.hypot(u, f);
      if (d < a || g < a) {
        r += `L${o.x},${o.y}`;
        continue;
      }
      const m = c / d, y = h / d, x = u / g, b = f / g, _ = m * x + y * b, S = Math.max(-1, Math.min(1, _)), w = Math.acos(S);
      if (w < a || Math.abs(Math.PI - w) < a) {
        r += `L${o.x},${o.y}`;
        continue;
      }
      const C = Math.min(t / Math.sin(w / 2), d / 2, g / 2), T = o.x - m * C, D = o.y - y * C, P = o.x + x * C, I = o.y + b * C;
      r += `L${T},${D}`, r += `Q${o.x},${o.y} ${P},${I}`;
    }
  }
  return r;
}
p(Kd, "generateRoundedPath");
function hs(e, t) {
  if (!e || !t)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  const r = t.x - e.x, i = t.y - e.y;
  return { angle: Math.atan2(i, r), deltaX: r, deltaY: i };
}
p(hs, "calculateDeltaAndAngle");
function Zd(e, t) {
  const r = e.map((a) => ({ ...a }));
  if (e.length >= 2 && Ft[t.arrowTypeStart]) {
    const a = Ft[t.arrowTypeStart], n = e[0], o = e[1], { angle: s } = hs(n, o), l = a * Math.cos(s), c = a * Math.sin(s);
    r[0].x = n.x + l, r[0].y = n.y + c;
  }
  const i = e.length;
  if (i >= 2 && Ft[t.arrowTypeEnd]) {
    const a = Ft[t.arrowTypeEnd], n = e[i - 1], o = e[i - 2], { angle: s } = hs(o, n), l = a * Math.cos(s), c = a * Math.sin(s);
    r[i - 1].x = n.x - l, r[i - 1].y = n.y - c;
  }
  return r;
}
p(Zd, "applyMarkerOffsetsToPoints");
var L_ = /* @__PURE__ */ p((e, t, r, i) => {
  t.forEach((a) => {
    Y_[a](e, r, i);
  });
}, "insertMarkers"), M_ = /* @__PURE__ */ p((e, t, r) => {
  $.trace("Making markers for ", r), e.append("defs").append("marker").attr("id", r + "_" + t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, "extension"), A_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "composition"), E_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "aggregation"), F_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "dependency"), $_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, "lollipop"), D_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "point"), O_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "circle"), I_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, "cross"), R_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "barb"), P_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneStart").attr("class", "marker onlyOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18"), e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneEnd").attr("class", "marker onlyOne " + t).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18");
}, "only_one"), N_ = /* @__PURE__ */ p((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  i.append("circle").attr("fill", "white").attr("cx", 21).attr("cy", 9).attr("r", 6), i.append("path").attr("d", "M9,0 L9,18");
  const a = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + t).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  a.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 9).attr("r", 6), a.append("path").attr("d", "M21,0 L21,18");
}, "zero_or_one"), W_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreStart").attr("class", "marker oneOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"), e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + t).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18");
}, "one_or_more"), z_ = /* @__PURE__ */ p((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  i.append("circle").attr("fill", "white").attr("cx", 48).attr("cy", 18).attr("r", 6), i.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18");
  const a = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + t).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  a.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 18).attr("r", 6), a.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18");
}, "zero_or_more"), q_ = /* @__PURE__ */ p((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("path").attr(
    "d",
    `M0,0
      L20,10
      M20,10
      L0,20`
  );
}, "requirement_arrow"), H_ = /* @__PURE__ */ p((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("g");
  i.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none"), i.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10), i.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10);
}, "requirement_contains"), Y_ = {
  extension: M_,
  composition: A_,
  aggregation: E_,
  dependency: F_,
  lollipop: $_,
  point: D_,
  circle: O_,
  cross: I_,
  barb: R_,
  only_one: P_,
  zero_or_one: N_,
  one_or_more: W_,
  zero_or_more: z_,
  requirement_arrow: q_,
  requirement_contains: H_
}, U_ = L_, j_ = {
  common: Er,
  getConfig: $t,
  insertCluster: t_,
  insertEdge: B_,
  insertEdgeLabel: __,
  insertMarkers: U_,
  insertNode: Xd,
  interpolateToCurve: Hs,
  labelHelper: et,
  log: $,
  positionEdgeLabel: v_
}, di = {}, Qd = /* @__PURE__ */ p((e) => {
  for (const t of e)
    di[t.name] = t;
}, "registerLayoutLoaders"), G_ = /* @__PURE__ */ p(() => {
  Qd([
    {
      name: "dagre",
      loader: /* @__PURE__ */ p(async () => await import("./dagre-6UL2VRFP-Dtv6iNW8.js"), "loader")
    },
    {
      name: "cose-bilkent",
      loader: /* @__PURE__ */ p(async () => await import("./cose-bilkent-S5V4N54A-DIx7Wzsm.js"), "loader")
    }
  ]);
}, "registerDefaultLayoutLoaders");
G_();
var ZS = /* @__PURE__ */ p(async (e, t) => {
  if (!(e.layoutAlgorithm in di))
    throw new Error(`Unknown layout algorithm: ${e.layoutAlgorithm}`);
  const r = di[e.layoutAlgorithm];
  return (await r.loader()).render(e, t, j_, {
    algorithm: r.algorithm
  });
}, "render"), QS = /* @__PURE__ */ p((e = "", { fallback: t = "dagre" } = {}) => {
  if (e in di)
    return e;
  if (t in di)
    return $.warn(`Layout algorithm ${e} is not registered. Using ${t} as fallback.`), t;
  throw new Error(`Both layout algorithms ${e} and ${t} are not registered.`);
}, "getRegisteredLayoutAlgorithm"), Jd = "c4", X_ = /* @__PURE__ */ p((e) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(e), "detector"), V_ = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./c4Diagram-YG6GDRKO-CoSt5dak.js");
  return { id: Jd, diagram: e };
}, "loader"), K_ = {
  id: Jd,
  detector: X_,
  loader: V_
}, Z_ = K_, tp = "flowchart", Q_ = /* @__PURE__ */ p((e, t) => {
  var r, i;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || ((i = t == null ? void 0 : t.flowchart) == null ? void 0 : i.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(e);
}, "detector"), J_ = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./flowDiagram-NV44I4VS-IFGr84bw.js");
  return { id: tp, diagram: e };
}, "loader"), tv = {
  id: tp,
  detector: Q_,
  loader: J_
}, ev = tv, ep = "flowchart-v2", rv = /* @__PURE__ */ p((e, t) => {
  var r, i, a;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-d3" ? !1 : (((i = t == null ? void 0 : t.flowchart) == null ? void 0 : i.defaultRenderer) === "elk" && (t.layout = "elk"), /^\s*graph/.test(e) && ((a = t == null ? void 0 : t.flowchart) == null ? void 0 : a.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(e));
}, "detector"), iv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./flowDiagram-NV44I4VS-IFGr84bw.js");
  return { id: ep, diagram: e };
}, "loader"), av = {
  id: ep,
  detector: rv,
  loader: iv
}, nv = av, rp = "er", sv = /* @__PURE__ */ p((e) => /^\s*erDiagram/.test(e), "detector"), ov = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./erDiagram-Q2GNP2WA-BmqIUyqB.js");
  return { id: rp, diagram: e };
}, "loader"), lv = {
  id: rp,
  detector: sv,
  loader: ov
}, cv = lv, ip = "gitGraph", hv = /* @__PURE__ */ p((e) => /^\s*gitGraph/.test(e), "detector"), uv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./gitGraphDiagram-NY62KEGX-DRT5RQmg.js");
  return { id: ip, diagram: e };
}, "loader"), fv = {
  id: ip,
  detector: hv,
  loader: uv
}, dv = fv, ap = "gantt", pv = /* @__PURE__ */ p((e) => /^\s*gantt/.test(e), "detector"), gv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./ganttDiagram-LVOFAZNH-xNJO-jDr.js");
  return { id: ap, diagram: e };
}, "loader"), mv = {
  id: ap,
  detector: pv,
  loader: gv
}, yv = mv, np = "info", xv = /* @__PURE__ */ p((e) => /^\s*info/.test(e), "detector"), bv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./infoDiagram-F6ZHWCRC-D8wVCH9Z.js");
  return { id: np, diagram: e };
}, "loader"), Cv = {
  id: np,
  detector: xv,
  loader: bv
}, sp = "pie", _v = /* @__PURE__ */ p((e) => /^\s*pie/.test(e), "detector"), vv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./pieDiagram-ADFJNKIX-Bqxt5fJ0.js");
  return { id: sp, diagram: e };
}, "loader"), wv = {
  id: sp,
  detector: _v,
  loader: vv
}, op = "quadrantChart", Sv = /* @__PURE__ */ p((e) => /^\s*quadrantChart/.test(e), "detector"), kv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./quadrantDiagram-AYHSOK5B-BjwL3IZ8.js");
  return { id: op, diagram: e };
}, "loader"), Tv = {
  id: op,
  detector: Sv,
  loader: kv
}, Bv = Tv, lp = "xychart", Lv = /* @__PURE__ */ p((e) => /^\s*xychart(-beta)?/.test(e), "detector"), Mv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./xychartDiagram-PRI3JC2R-DSSY_NwW.js");
  return { id: lp, diagram: e };
}, "loader"), Av = {
  id: lp,
  detector: Lv,
  loader: Mv
}, Ev = Av, cp = "requirement", Fv = /* @__PURE__ */ p((e) => /^\s*requirement(Diagram)?/.test(e), "detector"), $v = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./requirementDiagram-UZGBJVZJ-BaQ5fMXL.js");
  return { id: cp, diagram: e };
}, "loader"), Dv = {
  id: cp,
  detector: Fv,
  loader: $v
}, Ov = Dv, hp = "sequence", Iv = /* @__PURE__ */ p((e) => /^\s*sequenceDiagram/.test(e), "detector"), Rv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./sequenceDiagram-WL72ISMW-CV13_N71.js");
  return { id: hp, diagram: e };
}, "loader"), Pv = {
  id: hp,
  detector: Iv,
  loader: Rv
}, Nv = Pv, up = "class", Wv = /* @__PURE__ */ p((e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(e);
}, "detector"), zv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./classDiagram-2ON5EDUG-DXBNWU5h.js");
  return { id: up, diagram: e };
}, "loader"), qv = {
  id: up,
  detector: Wv,
  loader: zv
}, Hv = qv, fp = "classDiagram", Yv = /* @__PURE__ */ p((e, t) => {
  var r;
  return /^\s*classDiagram/.test(e) && ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(e);
}, "detector"), Uv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./classDiagram-v2-WZHVMYZB-DXBNWU5h.js");
  return { id: fp, diagram: e };
}, "loader"), jv = {
  id: fp,
  detector: Yv,
  loader: Uv
}, Gv = jv, dp = "state", Xv = /* @__PURE__ */ p((e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(e);
}, "detector"), Vv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./stateDiagram-FKZM4ZOC-CqRGcfzY.js");
  return { id: dp, diagram: e };
}, "loader"), Kv = {
  id: dp,
  detector: Xv,
  loader: Vv
}, Zv = Kv, pp = "stateDiagram", Qv = /* @__PURE__ */ p((e, t) => {
  var r;
  return !!(/^\s*stateDiagram-v2/.test(e) || /^\s*stateDiagram/.test(e) && ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper");
}, "detector"), Jv = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./stateDiagram-v2-4FDKWEC3-DcqoyRXh.js");
  return { id: pp, diagram: e };
}, "loader"), tw = {
  id: pp,
  detector: Qv,
  loader: Jv
}, ew = tw, gp = "journey", rw = /* @__PURE__ */ p((e) => /^\s*journey/.test(e), "detector"), iw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./journeyDiagram-XKPGCS4Q-Cv3TiMk9.js");
  return { id: gp, diagram: e };
}, "loader"), aw = {
  id: gp,
  detector: rw,
  loader: iw
}, nw = aw, sw = /* @__PURE__ */ p((e, t, r) => {
  $.debug(`rendering svg for syntax error
`);
  const i = B1(t), a = i.append("g");
  i.attr("viewBox", "0 0 2412 512"), xc(i, 100, 512, !0), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  ), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  ), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  ), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  ), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  ), a.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  ), a.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), a.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${r}`);
}, "draw"), mp = { draw: sw }, ow = mp, lw = {
  db: {},
  renderer: mp,
  parser: {
    parse: /* @__PURE__ */ p(() => {
    }, "parse")
  }
}, cw = lw, yp = "flowchart-elk", hw = /* @__PURE__ */ p((e, t = {}) => {
  var r;
  return (
    // If diagram explicitly states flowchart-elk
    /^\s*flowchart-elk/.test(e) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*(flowchart|graph)/.test(e) && ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? (t.layout = "elk", !0) : !1
  );
}, "detector"), uw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./flowDiagram-NV44I4VS-IFGr84bw.js");
  return { id: yp, diagram: e };
}, "loader"), fw = {
  id: yp,
  detector: hw,
  loader: uw
}, dw = fw, xp = "timeline", pw = /* @__PURE__ */ p((e) => /^\s*timeline/.test(e), "detector"), gw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./timeline-definition-IT6M3QCI-C8WtBGDt.js");
  return { id: xp, diagram: e };
}, "loader"), mw = {
  id: xp,
  detector: pw,
  loader: gw
}, yw = mw, bp = "mindmap", xw = /* @__PURE__ */ p((e) => /^\s*mindmap/.test(e), "detector"), bw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./mindmap-definition-VGOIOE7T-CHdhnHzD.js");
  return { id: bp, diagram: e };
}, "loader"), Cw = {
  id: bp,
  detector: xw,
  loader: bw
}, _w = Cw, Cp = "kanban", vw = /* @__PURE__ */ p((e) => /^\s*kanban/.test(e), "detector"), ww = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./kanban-definition-3W4ZIXB7-DRYmDRVn.js");
  return { id: Cp, diagram: e };
}, "loader"), Sw = {
  id: Cp,
  detector: vw,
  loader: ww
}, kw = Sw, _p = "sankey", Tw = /* @__PURE__ */ p((e) => /^\s*sankey(-beta)?/.test(e), "detector"), Bw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./sankeyDiagram-TZEHDZUN-DmTuBCAB.js");
  return { id: _p, diagram: e };
}, "loader"), Lw = {
  id: _p,
  detector: Tw,
  loader: Bw
}, Mw = Lw, vp = "packet", Aw = /* @__PURE__ */ p((e) => /^\s*packet(-beta)?/.test(e), "detector"), Ew = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./diagram-S2PKOQOG-D-Nlx9D9.js");
  return { id: vp, diagram: e };
}, "loader"), Fw = {
  id: vp,
  detector: Aw,
  loader: Ew
}, wp = "radar", $w = /* @__PURE__ */ p((e) => /^\s*radar-beta/.test(e), "detector"), Dw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./diagram-QEK2KX5R-D_7joXo1.js");
  return { id: wp, diagram: e };
}, "loader"), Ow = {
  id: wp,
  detector: $w,
  loader: Dw
}, Sp = "block", Iw = /* @__PURE__ */ p((e) => /^\s*block(-beta)?/.test(e), "detector"), Rw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./blockDiagram-VD42YOAC-CiLyFXwn.js");
  return { id: Sp, diagram: e };
}, "loader"), Pw = {
  id: Sp,
  detector: Iw,
  loader: Rw
}, Nw = Pw, kp = "architecture", Ww = /* @__PURE__ */ p((e) => /^\s*architecture/.test(e), "detector"), zw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./architectureDiagram-VXUJARFQ-pFrdzvG_.js");
  return { id: kp, diagram: e };
}, "loader"), qw = {
  id: kp,
  detector: Ww,
  loader: zw
}, Hw = qw, Tp = "treemap", Yw = /* @__PURE__ */ p((e) => /^\s*treemap/.test(e), "detector"), Uw = /* @__PURE__ */ p(async () => {
  const { diagram: e } = await import("./diagram-PSM6KHXK-CRz1yEV2.js");
  return { id: Tp, diagram: e };
}, "loader"), jw = {
  id: Tp,
  detector: Yw,
  loader: Uw
}, Fl = !1, Ga = /* @__PURE__ */ p(() => {
  Fl || (Fl = !0, ra("error", cw, (e) => e.toLowerCase().trim() === "error"), ra(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: /* @__PURE__ */ p(() => {
        }, "clear")
      },
      styles: {},
      // should never be used
      renderer: {
        draw: /* @__PURE__ */ p(() => {
        }, "draw")
      },
      parser: {
        parse: /* @__PURE__ */ p(() => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }, "parse")
      },
      init: /* @__PURE__ */ p(() => null, "init")
      // no op
    },
    (e) => e.toLowerCase().trimStart().startsWith("---")
  ), Ln(dw, _w, Hw), Ln(
    Z_,
    kw,
    Gv,
    Hv,
    cv,
    yv,
    Cv,
    wv,
    Ov,
    Nv,
    nv,
    ev,
    yw,
    dv,
    ew,
    Zv,
    nw,
    Bv,
    Mw,
    Fw,
    Ev,
    Nw,
    Ow,
    jw
  ));
}, "addDiagrams"), Gw = /* @__PURE__ */ p(async () => {
  $.debug("Loading registered diagrams");
  const t = (await Promise.allSettled(
    Object.entries(Ke).map(async ([r, { detector: i, loader: a }]) => {
      if (a)
        try {
          Fn(r);
        } catch {
          try {
            const { diagram: n, id: o } = await a();
            ra(o, n, i);
          } catch (n) {
            throw $.error(`Failed to load external diagram with key ${r}. Removing from detectors.`), delete Ke[r], n;
          }
        }
    })
  )).filter((r) => r.status === "rejected");
  if (t.length > 0) {
    $.error(`Failed to load ${t.length} external diagrams`);
    for (const r of t)
      $.error(r);
    throw new Error(`Failed to load ${t.length} external diagrams`);
  }
}, "loadRegisteredDiagrams"), Xw = "graphics-document document";
function Bp(e, t) {
  e.attr("role", Xw), t !== "" && e.attr("aria-roledescription", t);
}
p(Bp, "setA11yDiagramInfo");
function Lp(e, t, r, i) {
  if (e.insert !== void 0) {
    if (r) {
      const a = `chart-desc-${i}`;
      e.attr("aria-describedby", a), e.insert("desc", ":first-child").attr("id", a).text(r);
    }
    if (t) {
      const a = `chart-title-${i}`;
      e.attr("aria-labelledby", a), e.insert("title", ":first-child").attr("id", a).text(t);
    }
  }
}
p(Lp, "addSVGa11yTitleDescription");
var Xe, us = (Xe = class {
  constructor(t, r, i, a, n) {
    this.type = t, this.text = r, this.db = i, this.parser = a, this.renderer = n;
  }
  static async fromText(t, r = {}) {
    var c, h;
    const i = $t(), a = ms(t, i);
    t = nC(t) + `
`;
    try {
      Fn(a);
    } catch {
      const u = i0(a);
      if (!u)
        throw new sc(`Diagram ${a} not found.`);
      const { id: f, diagram: d } = await u();
      ra(f, d);
    }
    const { db: n, parser: o, renderer: s, init: l } = Fn(a);
    return o.parser && (o.parser.yy = n), (c = n.clear) == null || c.call(n), l == null || l(i), r.title && ((h = n.setDiagramTitle) == null || h.call(n, r.title)), await o.parse(t), new Xe(a, t, n, o, s);
  }
  async render(t, r) {
    await this.renderer.draw(this.text, t, r, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, p(Xe, "Diagram"), Xe), $l = [], Vw = /* @__PURE__ */ p(() => {
  $l.forEach((e) => {
    e();
  }), $l = [];
}, "attachFunctions"), Kw = /* @__PURE__ */ p((e) => e.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function Mp(e) {
  const t = e.match(nc);
  if (!t)
    return {
      text: e,
      metadata: {}
    };
  let r = D2(t[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: $2
  }) ?? {};
  r = typeof r == "object" && !Array.isArray(r) ? r : {};
  const i = {};
  return r.displayMode && (i.displayMode = r.displayMode.toString()), r.title && (i.title = r.title.toString()), r.config && (i.config = r.config), {
    text: e.slice(t[0].length),
    metadata: i
  };
}
p(Mp, "extractFrontMatter");
var Zw = /* @__PURE__ */ p((e) => e.replace(/\r\n?/g, `
`).replace(
  /<(\w+)([^>]*)>/g,
  (t, r, i) => "<" + r + i.replace(/="([^"]*)"/g, "='$1'") + ">"
), "cleanupText"), Qw = /* @__PURE__ */ p((e) => {
  const { text: t, metadata: r } = Mp(e), { displayMode: i, title: a, config: n = {} } = r;
  return i && (n.gantt || (n.gantt = {}), n.gantt.displayMode = i), { title: a, config: n, text: t };
}, "processFrontmatter"), Jw = /* @__PURE__ */ p((e) => {
  const t = ie.detectInit(e) ?? {}, r = ie.detectDirective(e, "wrap");
  return Array.isArray(r) ? t.wrap = r.some(({ type: i }) => i === "wrap") : (r == null ? void 0 : r.type) === "wrap" && (t.wrap = !0), {
    text: j2(e),
    directive: t
  };
}, "processDirectives");
function to(e) {
  const t = Zw(e), r = Qw(t), i = Jw(r.text), a = Xs(r.config, i.directive);
  return e = Kw(i.text), {
    code: e,
    title: r.title,
    config: a
  };
}
p(to, "preprocessDiagram");
function Ap(e) {
  const t = new TextEncoder().encode(e), r = Array.from(t, (i) => String.fromCodePoint(i)).join("");
  return btoa(r);
}
p(Ap, "toBase64");
var tS = 5e4, eS = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", rS = "sandbox", iS = "loose", aS = "http://www.w3.org/2000/svg", nS = "http://www.w3.org/1999/xlink", sS = "http://www.w3.org/1999/xhtml", oS = "100%", lS = "100%", cS = "border:0;margin:0;", hS = "margin:0", uS = "allow-top-navigation-by-user-activation allow-popups", fS = 'The "iframe" tag is not supported by your browser.', dS = ["foreignobject"], pS = ["dominant-baseline"];
function eo(e) {
  const t = to(e);
  return ta(), b0(t.config ?? {}), t;
}
p(eo, "processAndSetConfigs");
async function Ep(e, t) {
  Ga();
  try {
    const { code: r, config: i } = eo(e);
    return { diagramType: (await $p(r)).type, config: i };
  } catch (r) {
    if (t != null && t.suppressErrors)
      return !1;
    throw r;
  }
}
p(Ep, "parse");
var Dl = /* @__PURE__ */ p((e, t, r = []) => `
.${e} ${t} { ${r.join(" !important; ")} !important; }`, "cssImportantStyles"), gS = /* @__PURE__ */ p((e, t = /* @__PURE__ */ new Map()) => {
  var i;
  let r = "";
  if (e.themeCSS !== void 0 && (r += `
${e.themeCSS}`), e.fontFamily !== void 0 && (r += `
:root { --mermaid-font-family: ${e.fontFamily}}`), e.altFontFamily !== void 0 && (r += `
:root { --mermaid-alt-font-family: ${e.altFontFamily}}`), t instanceof Map) {
    const s = e.htmlLabels ?? ((i = e.flowchart) == null ? void 0 : i.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    t.forEach((l) => {
      _o(l.styles) || s.forEach((c) => {
        r += Dl(l.id, c, l.styles);
      }), _o(l.textStyles) || (r += Dl(
        l.id,
        "tspan",
        ((l == null ? void 0 : l.textStyles) || []).map((c) => c.replace("color", "fill"))
      ));
    });
  }
  return r;
}, "createCssStyles"), mS = /* @__PURE__ */ p((e, t, r, i) => {
  const a = gS(e, r), n = N0(t, a, e.themeVariables);
  return Qp(tg(`${i}{${n}}`), Jp);
}, "createUserStyles"), yS = /* @__PURE__ */ p((e = "", t, r) => {
  let i = e;
  return !r && !t && (i = i.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), i = er(i), i = i.replace(/<br>/g, "<br/>"), i;
}, "cleanUpSvgCode"), xS = /* @__PURE__ */ p((e = "", t) => {
  var a, n;
  const r = (n = (a = t == null ? void 0 : t.viewBox) == null ? void 0 : a.baseVal) != null && n.height ? t.viewBox.baseVal.height + "px" : lS, i = Ap(`<body style="${hS}">${e}</body>`);
  return `<iframe style="width:${oS};height:${r};${cS}" src="data:text/html;charset=UTF-8;base64,${i}" sandbox="${uS}">
  ${fS}
</iframe>`;
}, "putIntoIFrame"), Ol = /* @__PURE__ */ p((e, t, r, i, a) => {
  const n = e.append("div");
  n.attr("id", r), i && n.attr("style", i);
  const o = n.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", aS);
  return a && o.attr("xmlns:xlink", a), o.append("g"), e;
}, "appendDivSvgG");
function fs(e, t) {
  return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
p(fs, "sandboxedIframe");
var bS = /* @__PURE__ */ p((e, t, r, i) => {
  var a, n, o;
  (a = e.getElementById(t)) == null || a.remove(), (n = e.getElementById(r)) == null || n.remove(), (o = e.getElementById(i)) == null || o.remove();
}, "removeExistingElements"), CS = /* @__PURE__ */ p(async function(e, t, r) {
  var W, O, A, L, B, F;
  Ga();
  const i = eo(t);
  t = i.code;
  const a = $t();
  $.debug(a), t.length > ((a == null ? void 0 : a.maxTextSize) ?? tS) && (t = eS);
  const n = "#" + e, o = "i" + e, s = "#" + o, l = "d" + e, c = "#" + l, h = /* @__PURE__ */ p(() => {
    const z = ht(f ? s : c).node();
    z && "remove" in z && z.remove();
  }, "removeTempElements");
  let u = ht("body");
  const f = a.securityLevel === rS, d = a.securityLevel === iS, g = a.fontFamily;
  if (r !== void 0) {
    if (r && (r.innerHTML = ""), f) {
      const M = fs(ht(r), o);
      u = ht(M.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = ht(r);
    Ol(u, e, l, `font-family: ${g}`, nS);
  } else {
    if (bS(document, e, l, o), f) {
      const M = fs(ht("body"), o);
      u = ht(M.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = ht("body");
    Ol(u, e, l);
  }
  let m, y;
  try {
    m = await us.fromText(t, { title: i.title });
  } catch (M) {
    if (a.suppressErrorRendering)
      throw h(), M;
    m = await us.fromText("error"), y = M;
  }
  const x = u.select(c).node(), b = m.type, _ = x.firstChild, S = _.firstChild, w = (O = (W = m.renderer).getClasses) == null ? void 0 : O.call(W, t, m), C = mS(a, b, w, n), T = document.createElement("style");
  T.innerHTML = C, _.insertBefore(T, S);
  try {
    await m.renderer.draw(t, e, Mo.version, m);
  } catch (M) {
    throw a.suppressErrorRendering ? h() : ow.draw(t, e, Mo.version), M;
  }
  const D = u.select(`${c} svg`), P = (L = (A = m.db).getAccTitle) == null ? void 0 : L.call(A), I = (F = (B = m.db).getAccDescription) == null ? void 0 : F.call(B);
  Dp(b, D, P, I), u.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", sS);
  let E = u.select(c).node().innerHTML;
  if ($.debug("config.arrowMarkerAbsolute", a.arrowMarkerAbsolute), E = yS(E, f, kt(a.arrowMarkerAbsolute)), f) {
    const M = u.select(c + " svg").node();
    E = xS(E, M);
  } else d || (E = wr.sanitize(E, {
    ADD_TAGS: dS,
    ADD_ATTR: pS,
    HTML_INTEGRATION_POINTS: { foreignobject: !0 }
  }));
  if (Vw(), y)
    throw y;
  return h(), {
    diagramType: b,
    svg: E,
    bindFunctions: m.db.bindFunctions
  };
}, "render");
function Fp(e = {}) {
  var i;
  const t = wt({}, e);
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), y0(t), t != null && t.theme && t.theme in ve ? t.themeVariables = ve[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = ve.default.getThemeVariables(t.themeVariables));
  const r = typeof t == "object" ? m0(t) : uc();
  gs(r.logLevel), Ga();
}
p(Fp, "initialize");
var $p = /* @__PURE__ */ p((e, t = {}) => {
  const { code: r } = to(e);
  return us.fromText(r, t);
}, "getDiagramFromText");
function Dp(e, t, r, i) {
  Bp(t, e), Lp(t, r, i, t.attr("id"));
}
p(Dp, "addA11yInfo");
var tr = Object.freeze({
  render: CS,
  parse: Ep,
  getDiagramFromText: $p,
  initialize: Fp,
  getConfig: $t,
  setConfig: fc,
  getSiteConfig: uc,
  updateSiteConfig: x0,
  reset: /* @__PURE__ */ p(() => {
    ta();
  }, "reset"),
  globalReset: /* @__PURE__ */ p(() => {
    ta(Sr);
  }, "globalReset"),
  defaultConfig: Sr
});
gs($t().logLevel);
ta($t());
var _S = /* @__PURE__ */ p((e, t, r) => {
  $.warn(e), Gs(e) ? (r && r(e.str, e.hash), t.push({ ...e, message: e.str, error: e })) : (r && r(e), e instanceof Error && t.push({
    str: e.message,
    message: e.message,
    hash: e.name,
    error: e
  }));
}, "handleError"), Op = /* @__PURE__ */ p(async function(e = {
  querySelector: ".mermaid"
}) {
  try {
    await vS(e);
  } catch (t) {
    if (Gs(t) && $.error(t.str), Vt.parseError && Vt.parseError(t), !e.suppressErrors)
      throw $.error("Use the suppressErrors option to suppress these errors"), t;
  }
}, "run"), vS = /* @__PURE__ */ p(async function({ postRenderCallback: e, querySelector: t, nodes: r } = {
  querySelector: ".mermaid"
}) {
  const i = tr.getConfig();
  $.debug(`${e ? "" : "No "}Callback function found`);
  let a;
  if (r)
    a = r;
  else if (t)
    a = document.querySelectorAll(t);
  else
    throw new Error("Nodes and querySelector are both undefined");
  $.debug(`Found ${a.length} diagrams`), (i == null ? void 0 : i.startOnLoad) !== void 0 && ($.debug("Start On Load: " + (i == null ? void 0 : i.startOnLoad)), tr.updateSiteConfig({ startOnLoad: i == null ? void 0 : i.startOnLoad }));
  const n = new ie.InitIDGenerator(i.deterministicIds, i.deterministicIDSeed);
  let o;
  const s = [];
  for (const l of Array.from(a)) {
    if ($.info("Rendering diagram: " + l.id), l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const c = `mermaid-${n.next()}`;
    o = l.innerHTML, o = lf(ie.entityDecode(o)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const h = ie.detectInit(o);
    h && $.debug("Detected early reinit: ", h);
    try {
      const { svg: u, bindFunctions: f } = await Np(c, o, l);
      l.innerHTML = u, e && await e(c), f && f(l);
    } catch (u) {
      _S(u, s, Vt.parseError);
    }
  }
  if (s.length > 0)
    throw s[0];
}, "runThrowsErrors"), Ip = /* @__PURE__ */ p(function(e) {
  tr.initialize(e);
}, "initialize"), wS = /* @__PURE__ */ p(async function(e, t, r) {
  $.warn("mermaid.init is deprecated. Please use run instead."), e && Ip(e);
  const i = { postRenderCallback: r, querySelector: ".mermaid" };
  typeof t == "string" ? i.querySelector = t : t && (t instanceof HTMLElement ? i.nodes = [t] : i.nodes = t), await Op(i);
}, "init"), SS = /* @__PURE__ */ p(async (e, {
  lazyLoad: t = !0
} = {}) => {
  Ga(), Ln(...e), t === !1 && await Gw();
}, "registerExternalDiagrams"), Rp = /* @__PURE__ */ p(function() {
  if (Vt.startOnLoad) {
    const { startOnLoad: e } = tr.getConfig();
    e && Vt.run().catch((t) => $.error("Mermaid failed to initialize", t));
  }
}, "contentLoaded");
typeof document < "u" && window.addEventListener("load", Rp, !1);
var kS = /* @__PURE__ */ p(function(e) {
  Vt.parseError = e;
}, "setParseErrorHandler"), Ta = [], _n = !1, Pp = /* @__PURE__ */ p(async () => {
  if (!_n) {
    for (_n = !0; Ta.length > 0; ) {
      const e = Ta.shift();
      if (e)
        try {
          await e();
        } catch (t) {
          $.error("Error executing queue", t);
        }
    }
    _n = !1;
  }
}, "executeQueue"), TS = /* @__PURE__ */ p(async (e, t) => new Promise((r, i) => {
  const a = /* @__PURE__ */ p(() => new Promise((n, o) => {
    tr.parse(e, t).then(
      (s) => {
        n(s), r(s);
      },
      (s) => {
        var l;
        $.error("Error parsing", s), (l = Vt.parseError) == null || l.call(Vt, s), o(s), i(s);
      }
    );
  }), "performCall");
  Ta.push(a), Pp().catch(i);
}), "parse"), Np = /* @__PURE__ */ p((e, t, r) => new Promise((i, a) => {
  const n = /* @__PURE__ */ p(() => new Promise((o, s) => {
    tr.render(e, t, r).then(
      (l) => {
        o(l), i(l);
      },
      (l) => {
        var c;
        $.error("Error parsing", l), (c = Vt.parseError) == null || c.call(Vt, l), s(l), a(l);
      }
    );
  }), "performCall");
  Ta.push(n), Pp().catch(a);
}), "render"), BS = /* @__PURE__ */ p(() => Object.keys(Ke).map((e) => ({
  id: e
})), "getRegisteredDiagramsMetadata"), Vt = {
  startOnLoad: !0,
  mermaidAPI: tr,
  parse: TS,
  render: Np,
  init: wS,
  run: Op,
  registerExternalDiagrams: SS,
  registerLayoutLoaders: Qd,
  initialize: Ip,
  parseError: void 0,
  contentLoaded: Rp,
  setParseErrorHandler: kS,
  detectType: ms,
  registerIconPacks: BC,
  getRegisteredDiagramsMetadata: BS
}, LS = Vt;
/*! Check if previously processed */
/*!
 * Wait for document loaded before starting the execution
 */
var JS = /* @__PURE__ */ Object.freeze({ __proto__: null, default: LS });
export {
  PS as $,
  $S as A,
  ti as B,
  ue as C,
  Bm as D,
  X0 as E,
  Xs as F,
  $t as G,
  hc as H,
  Z2 as I,
  $2 as J,
  B1 as K,
  Mo as L,
  p1 as M,
  As as N,
  RS as O,
  WS as P,
  lr as Q,
  sl as R,
  nl as S,
  qS as T,
  it as U,
  zS as V,
  NS as W,
  OS as X,
  IS as Y,
  YS as Z,
  p as _,
  q0 as a,
  Ic as a$,
  HS as a0,
  c0 as a1,
  kr as a2,
  ES as a3,
  za as a4,
  q2 as a5,
  L0 as a6,
  ys as a7,
  Wo as a8,
  x1 as a9,
  B_ as aA,
  v_ as aB,
  __ as aC,
  MC as aD,
  g1 as aE,
  AS as aF,
  _i as aG,
  BC as aH,
  TC as aI,
  wg as aJ,
  jl as aK,
  Ba as aL,
  Yl as aM,
  Ul as aN,
  bg as aO,
  Ts as aP,
  Le as aQ,
  Jo as aR,
  Xx as aS,
  si as aT,
  G as aU,
  Ku as aV,
  Gt as aW,
  zx as aX,
  ks as aY,
  $c as aZ,
  bi as a_,
  ji as aa,
  K2 as ab,
  I0 as ac,
  mi as ad,
  Y as ae,
  J as af,
  bc as ag,
  t_ as ah,
  Xd as ai,
  VS as aj,
  O2 as ak,
  kt as al,
  Oe as am,
  qs as an,
  Cf as ao,
  er as ap,
  rf as aq,
  vg as ar,
  wm as as,
  fg as at,
  U_ as au,
  XS as av,
  KS as aw,
  jS as ax,
  V as ay,
  GS as az,
  z0 as b,
  DS as b0,
  ag as b1,
  pg as b2,
  _g as b3,
  vm as b4,
  ps as b5,
  Tm as b6,
  Lg as b7,
  gi as b8,
  Cg as b9,
  Gl as ba,
  xm as bb,
  bm as bc,
  og as bd,
  ym as be,
  Cm as bf,
  Ar as bg,
  De as bh,
  Lo as bi,
  Sg as bj,
  JS as bk,
  ft as c,
  ht as d,
  xc as e,
  wt as f,
  Y0 as g,
  ke as h,
  Jt as i,
  z2 as j,
  Er as k,
  $ as l,
  nf as m,
  yi as n,
  FS as o,
  QS as p,
  U0 as q,
  ZS as r,
  H0 as s,
  j0 as t,
  ie as u,
  D2 as v,
  tC as w,
  x_ as x,
  US as y,
  W0 as z
};
