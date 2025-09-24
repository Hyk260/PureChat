import { aW as rr, aX as Er, aY as nr, aZ as ar, a_ as ir, a$ as se, b0 as Lr, _ as h, g as Ar, s as Ir, t as Wr, q as Or, a as Hr, b as Nr, c as _t, d as Zt, e as Vr, b1 as at, l as Kt, k as Pr, j as zr, z as Rr, u as qr } from "./mermaid.core-CmI31nLO.js";
import { g as we } from "./index-CFDAYDAs.js";
import { b as Zr, t as Oe, c as Br, a as Xr, l as Gr } from "./linear-XIVU_aNH.js";
import { i as $r } from "./init-DjUOC4st.js";
var Xt = { exports: {} }, Qr = Xt.exports, He;
function jr() {
  return He || (He = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(Qr, function() {
      return function(r, n) {
        var a = n.prototype, i = a.format;
        a.format = function(s) {
          var y = this, _ = this.$locale();
          if (!this.isValid()) return i.bind(this)(s);
          var p = this.$utils(), g = (s || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(E) {
            switch (E) {
              case "Q":
                return Math.ceil((y.$M + 1) / 3);
              case "Do":
                return _.ordinal(y.$D);
              case "gggg":
                return y.weekYear();
              case "GGGG":
                return y.isoWeekYear();
              case "wo":
                return _.ordinal(y.week(), "W");
              case "w":
              case "ww":
                return p.s(y.week(), E === "w" ? 1 : 2, "0");
              case "W":
              case "WW":
                return p.s(y.isoWeek(), E === "W" ? 1 : 2, "0");
              case "k":
              case "kk":
                return p.s(String(y.$H === 0 ? 24 : y.$H), E === "k" ? 1 : 2, "0");
              case "X":
                return Math.floor(y.$d.getTime() / 1e3);
              case "x":
                return y.$d.getTime();
              case "z":
                return "[" + y.offsetName() + "]";
              case "zzz":
                return "[" + y.offsetName("long") + "]";
              default:
                return E;
            }
          });
          return i.bind(this)(g);
        };
      };
    });
  }(Xt)), Xt.exports;
}
var Jr = jr(), Kr = /* @__PURE__ */ we(Jr), Gt = { exports: {} }, tn = Gt.exports, Ne;
function en() {
  return Ne || (Ne = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(tn, function() {
      var r = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, a = /\d/, i = /\d\d/, s = /\d\d?/, y = /\d*[^-_:/,()\s\d]+/, _ = {}, p = function(M) {
        return (M = +M) + (M > 68 ? 1900 : 2e3);
      }, g = function(M) {
        return function(I) {
          this[M] = +I;
        };
      }, E = [/[+-]\d\d:?(\d\d)?|Z/, function(M) {
        (this.zone || (this.zone = {})).offset = function(I) {
          if (!I || I === "Z") return 0;
          var V = I.match(/([+-]|\d\d)/g), W = 60 * V[1] + (+V[2] || 0);
          return W === 0 ? 0 : V[0] === "+" ? -W : W;
        }(M);
      }], C = function(M) {
        var I = _[M];
        return I && (I.indexOf ? I : I.s.concat(I.f));
      }, x = function(M, I) {
        var V, W = _.meridiem;
        if (W) {
          for (var Z = 1; Z <= 24; Z += 1) if (M.indexOf(W(Z, 0, I)) > -1) {
            V = Z > 12;
            break;
          }
        } else V = M === (I ? "pm" : "PM");
        return V;
      }, X = { A: [y, function(M) {
        this.afternoon = x(M, !1);
      }], a: [y, function(M) {
        this.afternoon = x(M, !0);
      }], Q: [a, function(M) {
        this.month = 3 * (M - 1) + 1;
      }], S: [a, function(M) {
        this.milliseconds = 100 * +M;
      }], SS: [i, function(M) {
        this.milliseconds = 10 * +M;
      }], SSS: [/\d{3}/, function(M) {
        this.milliseconds = +M;
      }], s: [s, g("seconds")], ss: [s, g("seconds")], m: [s, g("minutes")], mm: [s, g("minutes")], H: [s, g("hours")], h: [s, g("hours")], HH: [s, g("hours")], hh: [s, g("hours")], D: [s, g("day")], DD: [i, g("day")], Do: [y, function(M) {
        var I = _.ordinal, V = M.match(/\d+/);
        if (this.day = V[0], I) for (var W = 1; W <= 31; W += 1) I(W).replace(/\[|\]/g, "") === M && (this.day = W);
      }], w: [s, g("week")], ww: [i, g("week")], M: [s, g("month")], MM: [i, g("month")], MMM: [y, function(M) {
        var I = C("months"), V = (C("monthsShort") || I.map(function(W) {
          return W.slice(0, 3);
        })).indexOf(M) + 1;
        if (V < 1) throw new Error();
        this.month = V % 12 || V;
      }], MMMM: [y, function(M) {
        var I = C("months").indexOf(M) + 1;
        if (I < 1) throw new Error();
        this.month = I % 12 || I;
      }], Y: [/[+-]?\d+/, g("year")], YY: [i, function(M) {
        this.year = p(M);
      }], YYYY: [/\d{4}/, g("year")], Z: E, ZZ: E };
      function O(M) {
        var I, V;
        I = M, V = _ && _.formats;
        for (var W = (M = I.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(F, S, v) {
          var U = v && v.toUpperCase();
          return S || V[v] || r[v] || V[U].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(l, m, T) {
            return m || T.slice(1);
          });
        })).match(n), Z = W.length, Q = 0; Q < Z; Q += 1) {
          var D = W[Q], H = X[D], b = H && H[0], Y = H && H[1];
          W[Q] = Y ? { regex: b, parser: Y } : D.replace(/^\[|\]$/g, "");
        }
        return function(F) {
          for (var S = {}, v = 0, U = 0; v < Z; v += 1) {
            var l = W[v];
            if (typeof l == "string") U += l.length;
            else {
              var m = l.regex, T = l.parser, d = F.slice(U), w = m.exec(d)[0];
              T.call(S, w), F = F.replace(w, "");
            }
          }
          return function(c) {
            var u = c.afternoon;
            if (u !== void 0) {
              var o = c.hours;
              u ? o < 12 && (c.hours += 12) : o === 12 && (c.hours = 0), delete c.afternoon;
            }
          }(S), S;
        };
      }
      return function(M, I, V) {
        V.p.customParseFormat = !0, M && M.parseTwoDigitYear && (p = M.parseTwoDigitYear);
        var W = I.prototype, Z = W.parse;
        W.parse = function(Q) {
          var D = Q.date, H = Q.utc, b = Q.args;
          this.$u = H;
          var Y = b[1];
          if (typeof Y == "string") {
            var F = b[2] === !0, S = b[3] === !0, v = F || S, U = b[2];
            S && (U = b[2]), _ = this.$locale(), !F && U && (_ = V.Ls[U]), this.$d = function(d, w, c, u) {
              try {
                if (["x", "X"].indexOf(w) > -1) return new Date((w === "X" ? 1e3 : 1) * d);
                var o = O(w)(d), z = o.year, P = o.month, R = o.day, K = o.hours, G = o.minutes, j = o.seconds, it = o.milliseconds, k = o.zone, A = o.week, N = /* @__PURE__ */ new Date(), f = R || (z || P ? 1 : N.getDate()), J = z || N.getFullYear(), L = 0;
                z && !P || (L = P > 0 ? P - 1 : N.getMonth());
                var $, B = K || 0, nt = G || 0, st = j || 0, pt = it || 0;
                return k ? new Date(Date.UTC(J, L, f, B, nt, st, pt + 60 * k.offset * 1e3)) : c ? new Date(Date.UTC(J, L, f, B, nt, st, pt)) : ($ = new Date(J, L, f, B, nt, st, pt), A && ($ = u($).week(A).toDate()), $);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(D, Y, H, V), this.init(), U && U !== !0 && (this.$L = this.locale(U).$L), v && D != this.format(Y) && (this.$d = /* @__PURE__ */ new Date("")), _ = {};
          } else if (Y instanceof Array) for (var l = Y.length, m = 1; m <= l; m += 1) {
            b[1] = Y[m - 1];
            var T = V.apply(this, b);
            if (T.isValid()) {
              this.$d = T.$d, this.$L = T.$L, this.init();
              break;
            }
            m === l && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else Z.call(this, Q);
        };
      };
    });
  }(Gt)), Gt.exports;
}
var rn = en(), nn = /* @__PURE__ */ we(rn);
function an(t, e) {
  let r;
  if (e === void 0)
    for (const n of t)
      n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let a of t)
      (a = e(a, ++n, t)) != null && (r < a || r === void 0 && a >= a) && (r = a);
  }
  return r;
}
function sn(t, e) {
  let r;
  if (e === void 0)
    for (const n of t)
      n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let a of t)
      (a = e(a, ++n, t)) != null && (r > a || r === void 0 && a >= a) && (r = a);
  }
  return r;
}
function on(t) {
  return t;
}
var $t = 1, oe = 2, ke = 3, Bt = 4, Ve = 1e-6;
function cn(t) {
  return "translate(" + t + ",0)";
}
function un(t) {
  return "translate(0," + t + ")";
}
function ln(t) {
  return (e) => +t(e);
}
function fn(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (r) => +t(r) + e;
}
function hn() {
  return !this.__axis;
}
function sr(t, e) {
  var r = [], n = null, a = null, i = 6, s = 6, y = 3, _ = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, p = t === $t || t === Bt ? -1 : 1, g = t === Bt || t === oe ? "x" : "y", E = t === $t || t === ke ? cn : un;
  function C(x) {
    var X = n ?? (e.ticks ? e.ticks.apply(e, r) : e.domain()), O = a ?? (e.tickFormat ? e.tickFormat.apply(e, r) : on), M = Math.max(i, 0) + y, I = e.range(), V = +I[0] + _, W = +I[I.length - 1] + _, Z = (e.bandwidth ? fn : ln)(e.copy(), _), Q = x.selection ? x.selection() : x, D = Q.selectAll(".domain").data([null]), H = Q.selectAll(".tick").data(X, e).order(), b = H.exit(), Y = H.enter().append("g").attr("class", "tick"), F = H.select("line"), S = H.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), H = H.merge(Y), F = F.merge(Y.append("line").attr("stroke", "currentColor").attr(g + "2", p * i)), S = S.merge(Y.append("text").attr("fill", "currentColor").attr(g, p * M).attr("dy", t === $t ? "0em" : t === ke ? "0.71em" : "0.32em")), x !== Q && (D = D.transition(x), H = H.transition(x), F = F.transition(x), S = S.transition(x), b = b.transition(x).attr("opacity", Ve).attr("transform", function(v) {
      return isFinite(v = Z(v)) ? E(v + _) : this.getAttribute("transform");
    }), Y.attr("opacity", Ve).attr("transform", function(v) {
      var U = this.parentNode.__axis;
      return E((U && isFinite(U = U(v)) ? U : Z(v)) + _);
    })), b.remove(), D.attr("d", t === Bt || t === oe ? s ? "M" + p * s + "," + V + "H" + _ + "V" + W + "H" + p * s : "M" + _ + "," + V + "V" + W : s ? "M" + V + "," + p * s + "V" + _ + "H" + W + "V" + p * s : "M" + V + "," + _ + "H" + W), H.attr("opacity", 1).attr("transform", function(v) {
      return E(Z(v) + _);
    }), F.attr(g + "2", p * i), S.attr(g, p * M).text(O), Q.filter(hn).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === oe ? "start" : t === Bt ? "end" : "middle"), Q.each(function() {
      this.__axis = Z;
    });
  }
  return C.scale = function(x) {
    return arguments.length ? (e = x, C) : e;
  }, C.ticks = function() {
    return r = Array.from(arguments), C;
  }, C.tickArguments = function(x) {
    return arguments.length ? (r = x == null ? [] : Array.from(x), C) : r.slice();
  }, C.tickValues = function(x) {
    return arguments.length ? (n = x == null ? null : Array.from(x), C) : n && n.slice();
  }, C.tickFormat = function(x) {
    return arguments.length ? (a = x, C) : a;
  }, C.tickSize = function(x) {
    return arguments.length ? (i = s = +x, C) : i;
  }, C.tickSizeInner = function(x) {
    return arguments.length ? (i = +x, C) : i;
  }, C.tickSizeOuter = function(x) {
    return arguments.length ? (s = +x, C) : s;
  }, C.tickPadding = function(x) {
    return arguments.length ? (y = +x, C) : y;
  }, C.offset = function(x) {
    return arguments.length ? (_ = +x, C) : _;
  }, C;
}
function dn(t) {
  return sr($t, t);
}
function mn(t) {
  return sr(ke, t);
}
const gn = Math.PI / 180, yn = 180 / Math.PI, te = 18, or = 0.96422, cr = 1, ur = 0.82521, lr = 4 / 29, St = 6 / 29, fr = 3 * St * St, kn = St * St * St;
function hr(t) {
  if (t instanceof ft) return new ft(t.l, t.a, t.b, t.opacity);
  if (t instanceof dt) return dr(t);
  t instanceof rr || (t = Er(t));
  var e = fe(t.r), r = fe(t.g), n = fe(t.b), a = ce((0.2225045 * e + 0.7168786 * r + 0.0606169 * n) / cr), i, s;
  return e === r && r === n ? i = s = a : (i = ce((0.4360747 * e + 0.3850649 * r + 0.1430804 * n) / or), s = ce((0.0139322 * e + 0.0971045 * r + 0.7141733 * n) / ur)), new ft(116 * a - 16, 500 * (i - a), 200 * (a - s), t.opacity);
}
function pn(t, e, r, n) {
  return arguments.length === 1 ? hr(t) : new ft(t, e, r, n ?? 1);
}
function ft(t, e, r, n) {
  this.l = +t, this.a = +e, this.b = +r, this.opacity = +n;
}
nr(ft, pn, ar(ir, {
  brighter(t) {
    return new ft(this.l + te * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new ft(this.l - te * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, r = isNaN(this.b) ? t : t - this.b / 200;
    return e = or * ue(e), t = cr * ue(t), r = ur * ue(r), new rr(
      le(3.1338561 * e - 1.6168667 * t - 0.4906146 * r),
      le(-0.9787684 * e + 1.9161415 * t + 0.033454 * r),
      le(0.0719453 * e - 0.2289914 * t + 1.4052427 * r),
      this.opacity
    );
  }
}));
function ce(t) {
  return t > kn ? Math.pow(t, 1 / 3) : t / fr + lr;
}
function ue(t) {
  return t > St ? t * t * t : fr * (t - lr);
}
function le(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function fe(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function vn(t) {
  if (t instanceof dt) return new dt(t.h, t.c, t.l, t.opacity);
  if (t instanceof ft || (t = hr(t)), t.a === 0 && t.b === 0) return new dt(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * yn;
  return new dt(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function pe(t, e, r, n) {
  return arguments.length === 1 ? vn(t) : new dt(t, e, r, n ?? 1);
}
function dt(t, e, r, n) {
  this.h = +t, this.c = +e, this.l = +r, this.opacity = +n;
}
function dr(t) {
  if (isNaN(t.h)) return new ft(t.l, 0, 0, t.opacity);
  var e = t.h * gn;
  return new ft(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
nr(dt, pe, ar(ir, {
  brighter(t) {
    return new dt(this.h, this.c, this.l + te * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new dt(this.h, this.c, this.l - te * (t ?? 1), this.opacity);
  },
  rgb() {
    return dr(this).rgb();
  }
}));
function Tn(t) {
  return function(e, r) {
    var n = t((e = pe(e)).h, (r = pe(r)).h), a = se(e.c, r.c), i = se(e.l, r.l), s = se(e.opacity, r.opacity);
    return function(y) {
      return e.h = n(y), e.c = a(y), e.l = i(y), e.opacity = s(y), e + "";
    };
  };
}
var xn = Tn(Lr);
function bn(t, e) {
  t = t.slice();
  var r = 0, n = t.length - 1, a = t[r], i = t[n], s;
  return i < a && (s = r, r = n, n = s, s = a, a = i, i = s), t[r] = e.floor(a), t[n] = e.ceil(i), t;
}
const he = /* @__PURE__ */ new Date(), de = /* @__PURE__ */ new Date();
function et(t, e, r, n) {
  function a(i) {
    return t(i = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+i)), i;
  }
  return a.floor = (i) => (t(i = /* @__PURE__ */ new Date(+i)), i), a.ceil = (i) => (t(i = new Date(i - 1)), e(i, 1), t(i), i), a.round = (i) => {
    const s = a(i), y = a.ceil(i);
    return i - s < y - i ? s : y;
  }, a.offset = (i, s) => (e(i = /* @__PURE__ */ new Date(+i), s == null ? 1 : Math.floor(s)), i), a.range = (i, s, y) => {
    const _ = [];
    if (i = a.ceil(i), y = y == null ? 1 : Math.floor(y), !(i < s) || !(y > 0)) return _;
    let p;
    do
      _.push(p = /* @__PURE__ */ new Date(+i)), e(i, y), t(i);
    while (p < i && i < s);
    return _;
  }, a.filter = (i) => et((s) => {
    if (s >= s) for (; t(s), !i(s); ) s.setTime(s - 1);
  }, (s, y) => {
    if (s >= s)
      if (y < 0) for (; ++y <= 0; )
        for (; e(s, -1), !i(s); )
          ;
      else for (; --y >= 0; )
        for (; e(s, 1), !i(s); )
          ;
  }), r && (a.count = (i, s) => (he.setTime(+i), de.setTime(+s), t(he), t(de), Math.floor(r(he, de))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (s) => n(s) % i === 0 : (s) => a.count(0, s) % i === 0) : a)), a;
}
const Yt = et(() => {
}, (t, e) => {
  t.setTime(+t + e);
}, (t, e) => e - t);
Yt.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? et((e) => {
  e.setTime(Math.floor(e / t) * t);
}, (e, r) => {
  e.setTime(+e + r * t);
}, (e, r) => (r - e) / t) : Yt);
Yt.range;
const mt = 1e3, ct = mt * 60, gt = ct * 60, yt = gt * 24, De = yt * 7, Pe = yt * 30, me = yt * 365, vt = et((t) => {
  t.setTime(t - t.getMilliseconds());
}, (t, e) => {
  t.setTime(+t + e * mt);
}, (t, e) => (e - t) / mt, (t) => t.getUTCSeconds());
vt.range;
const Wt = et((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * mt);
}, (t, e) => {
  t.setTime(+t + e * ct);
}, (t, e) => (e - t) / ct, (t) => t.getMinutes());
Wt.range;
const wn = et((t) => {
  t.setUTCSeconds(0, 0);
}, (t, e) => {
  t.setTime(+t + e * ct);
}, (t, e) => (e - t) / ct, (t) => t.getUTCMinutes());
wn.range;
const Ot = et((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * mt - t.getMinutes() * ct);
}, (t, e) => {
  t.setTime(+t + e * gt);
}, (t, e) => (e - t) / gt, (t) => t.getHours());
Ot.range;
const Dn = et((t) => {
  t.setUTCMinutes(0, 0, 0);
}, (t, e) => {
  t.setTime(+t + e * gt);
}, (t, e) => (e - t) / gt, (t) => t.getUTCHours());
Dn.range;
const Tt = et(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ct) / yt,
  (t) => t.getDate() - 1
);
Tt.range;
const Ce = et((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / yt, (t) => t.getUTCDate() - 1);
Ce.range;
const Cn = et((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / yt, (t) => Math.floor(t / yt));
Cn.range;
function wt(t) {
  return et((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7);
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * ct) / De);
}
const Vt = wt(0), Ht = wt(1), mr = wt(2), gr = wt(3), xt = wt(4), yr = wt(5), kr = wt(6);
Vt.range;
Ht.range;
mr.range;
gr.range;
xt.range;
yr.range;
kr.range;
function Dt(t) {
  return et((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7);
  }, (e, r) => (r - e) / De);
}
const pr = Dt(0), ee = Dt(1), Mn = Dt(2), _n = Dt(3), Ut = Dt(4), Sn = Dt(5), Fn = Dt(6);
pr.range;
ee.range;
Mn.range;
_n.range;
Ut.range;
Sn.range;
Fn.range;
const Nt = et((t) => {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setMonth(t.getMonth() + e);
}, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, (t) => t.getMonth());
Nt.range;
const Yn = et((t) => {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCMonth(t.getUTCMonth() + e);
}, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, (t) => t.getUTCMonth());
Yn.range;
const kt = et((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
kt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : et((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t);
});
kt.range;
const bt = et((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
bt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : et((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t);
});
bt.range;
function Un(t, e, r, n, a, i) {
  const s = [
    [vt, 1, mt],
    [vt, 5, 5 * mt],
    [vt, 15, 15 * mt],
    [vt, 30, 30 * mt],
    [i, 1, ct],
    [i, 5, 5 * ct],
    [i, 15, 15 * ct],
    [i, 30, 30 * ct],
    [a, 1, gt],
    [a, 3, 3 * gt],
    [a, 6, 6 * gt],
    [a, 12, 12 * gt],
    [n, 1, yt],
    [n, 2, 2 * yt],
    [r, 1, De],
    [e, 1, Pe],
    [e, 3, 3 * Pe],
    [t, 1, me]
  ];
  function y(p, g, E) {
    const C = g < p;
    C && ([p, g] = [g, p]);
    const x = E && typeof E.range == "function" ? E : _(p, g, E), X = x ? x.range(p, +g + 1) : [];
    return C ? X.reverse() : X;
  }
  function _(p, g, E) {
    const C = Math.abs(g - p) / E, x = Zr(([, , M]) => M).right(s, C);
    if (x === s.length) return t.every(Oe(p / me, g / me, E));
    if (x === 0) return Yt.every(Math.max(Oe(p, g, E), 1));
    const [X, O] = s[C / s[x - 1][2] < s[x][2] / C ? x - 1 : x];
    return X.every(O);
  }
  return [y, _];
}
const [En, Ln] = Un(kt, Nt, Vt, Tt, Ot, Wt);
function ge(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function ye(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Lt(t, e, r) {
  return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function An(t) {
  var e = t.dateTime, r = t.date, n = t.time, a = t.periods, i = t.days, s = t.shortDays, y = t.months, _ = t.shortMonths, p = At(a), g = It(a), E = At(i), C = It(i), x = At(s), X = It(s), O = At(y), M = It(y), I = At(_), V = It(_), W = {
    a: d,
    A: w,
    b: c,
    B: u,
    c: null,
    d: Xe,
    e: Xe,
    f: na,
    g: da,
    G: ga,
    H: ta,
    I: ea,
    j: ra,
    L: vr,
    m: aa,
    M: ia,
    p: o,
    q: z,
    Q: Qe,
    s: je,
    S: sa,
    u: oa,
    U: ca,
    V: ua,
    w: la,
    W: fa,
    x: null,
    X: null,
    y: ha,
    Y: ma,
    Z: ya,
    "%": $e
  }, Z = {
    a: P,
    A: R,
    b: K,
    B: G,
    c: null,
    d: Ge,
    e: Ge,
    f: Ta,
    g: Ya,
    G: Ea,
    H: ka,
    I: pa,
    j: va,
    L: xr,
    m: xa,
    M: ba,
    p: j,
    q: it,
    Q: Qe,
    s: je,
    S: wa,
    u: Da,
    U: Ca,
    V: Ma,
    w: _a,
    W: Sa,
    x: null,
    X: null,
    y: Fa,
    Y: Ua,
    Z: La,
    "%": $e
  }, Q = {
    a: F,
    A: S,
    b: v,
    B: U,
    c: l,
    d: Ze,
    e: Ze,
    f: Qn,
    g: qe,
    G: Re,
    H: Be,
    I: Be,
    j: Bn,
    L: $n,
    m: Zn,
    M: Xn,
    p: Y,
    q: qn,
    Q: Jn,
    s: Kn,
    S: Gn,
    u: Nn,
    U: Vn,
    V: Pn,
    w: Hn,
    W: zn,
    x: m,
    X: T,
    y: qe,
    Y: Re,
    Z: Rn,
    "%": jn
  };
  W.x = D(r, W), W.X = D(n, W), W.c = D(e, W), Z.x = D(r, Z), Z.X = D(n, Z), Z.c = D(e, Z);
  function D(k, A) {
    return function(N) {
      var f = [], J = -1, L = 0, $ = k.length, B, nt, st;
      for (N instanceof Date || (N = /* @__PURE__ */ new Date(+N)); ++J < $; )
        k.charCodeAt(J) === 37 && (f.push(k.slice(L, J)), (nt = ze[B = k.charAt(++J)]) != null ? B = k.charAt(++J) : nt = B === "e" ? " " : "0", (st = A[B]) && (B = st(N, nt)), f.push(B), L = J + 1);
      return f.push(k.slice(L, J)), f.join("");
    };
  }
  function H(k, A) {
    return function(N) {
      var f = Lt(1900, void 0, 1), J = b(f, k, N += "", 0), L, $;
      if (J != N.length) return null;
      if ("Q" in f) return new Date(f.Q);
      if ("s" in f) return new Date(f.s * 1e3 + ("L" in f ? f.L : 0));
      if (A && !("Z" in f) && (f.Z = 0), "p" in f && (f.H = f.H % 12 + f.p * 12), f.m === void 0 && (f.m = "q" in f ? f.q : 0), "V" in f) {
        if (f.V < 1 || f.V > 53) return null;
        "w" in f || (f.w = 1), "Z" in f ? (L = ye(Lt(f.y, 0, 1)), $ = L.getUTCDay(), L = $ > 4 || $ === 0 ? ee.ceil(L) : ee(L), L = Ce.offset(L, (f.V - 1) * 7), f.y = L.getUTCFullYear(), f.m = L.getUTCMonth(), f.d = L.getUTCDate() + (f.w + 6) % 7) : (L = ge(Lt(f.y, 0, 1)), $ = L.getDay(), L = $ > 4 || $ === 0 ? Ht.ceil(L) : Ht(L), L = Tt.offset(L, (f.V - 1) * 7), f.y = L.getFullYear(), f.m = L.getMonth(), f.d = L.getDate() + (f.w + 6) % 7);
      } else ("W" in f || "U" in f) && ("w" in f || (f.w = "u" in f ? f.u % 7 : "W" in f ? 1 : 0), $ = "Z" in f ? ye(Lt(f.y, 0, 1)).getUTCDay() : ge(Lt(f.y, 0, 1)).getDay(), f.m = 0, f.d = "W" in f ? (f.w + 6) % 7 + f.W * 7 - ($ + 5) % 7 : f.w + f.U * 7 - ($ + 6) % 7);
      return "Z" in f ? (f.H += f.Z / 100 | 0, f.M += f.Z % 100, ye(f)) : ge(f);
    };
  }
  function b(k, A, N, f) {
    for (var J = 0, L = A.length, $ = N.length, B, nt; J < L; ) {
      if (f >= $) return -1;
      if (B = A.charCodeAt(J++), B === 37) {
        if (B = A.charAt(J++), nt = Q[B in ze ? A.charAt(J++) : B], !nt || (f = nt(k, N, f)) < 0) return -1;
      } else if (B != N.charCodeAt(f++))
        return -1;
    }
    return f;
  }
  function Y(k, A, N) {
    var f = p.exec(A.slice(N));
    return f ? (k.p = g.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function F(k, A, N) {
    var f = x.exec(A.slice(N));
    return f ? (k.w = X.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function S(k, A, N) {
    var f = E.exec(A.slice(N));
    return f ? (k.w = C.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function v(k, A, N) {
    var f = I.exec(A.slice(N));
    return f ? (k.m = V.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function U(k, A, N) {
    var f = O.exec(A.slice(N));
    return f ? (k.m = M.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function l(k, A, N) {
    return b(k, e, A, N);
  }
  function m(k, A, N) {
    return b(k, r, A, N);
  }
  function T(k, A, N) {
    return b(k, n, A, N);
  }
  function d(k) {
    return s[k.getDay()];
  }
  function w(k) {
    return i[k.getDay()];
  }
  function c(k) {
    return _[k.getMonth()];
  }
  function u(k) {
    return y[k.getMonth()];
  }
  function o(k) {
    return a[+(k.getHours() >= 12)];
  }
  function z(k) {
    return 1 + ~~(k.getMonth() / 3);
  }
  function P(k) {
    return s[k.getUTCDay()];
  }
  function R(k) {
    return i[k.getUTCDay()];
  }
  function K(k) {
    return _[k.getUTCMonth()];
  }
  function G(k) {
    return y[k.getUTCMonth()];
  }
  function j(k) {
    return a[+(k.getUTCHours() >= 12)];
  }
  function it(k) {
    return 1 + ~~(k.getUTCMonth() / 3);
  }
  return {
    format: function(k) {
      var A = D(k += "", W);
      return A.toString = function() {
        return k;
      }, A;
    },
    parse: function(k) {
      var A = H(k += "", !1);
      return A.toString = function() {
        return k;
      }, A;
    },
    utcFormat: function(k) {
      var A = D(k += "", Z);
      return A.toString = function() {
        return k;
      }, A;
    },
    utcParse: function(k) {
      var A = H(k += "", !0);
      return A.toString = function() {
        return k;
      }, A;
    }
  };
}
var ze = { "-": "", _: " ", 0: "0" }, rt = /^\s*\d+/, In = /^%/, Wn = /[\\^$*+?|[\]().{}]/g;
function q(t, e, r) {
  var n = t < 0 ? "-" : "", a = (n ? -t : t) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(e) + a : a);
}
function On(t) {
  return t.replace(Wn, "\\$&");
}
function At(t) {
  return new RegExp("^(?:" + t.map(On).join("|") + ")", "i");
}
function It(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]));
}
function Hn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1;
}
function Nn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1;
}
function Vn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1;
}
function Pn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1;
}
function zn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1;
}
function Re(t, e, r) {
  var n = rt.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1;
}
function qe(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function Rn(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function qn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function Zn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1;
}
function Ze(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1;
}
function Bn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1;
}
function Be(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1;
}
function Xn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1;
}
function Gn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1;
}
function $n(t, e, r) {
  var n = rt.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1;
}
function Qn(t, e, r) {
  var n = rt.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function jn(t, e, r) {
  var n = In.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function Jn(t, e, r) {
  var n = rt.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1;
}
function Kn(t, e, r) {
  var n = rt.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1;
}
function Xe(t, e) {
  return q(t.getDate(), e, 2);
}
function ta(t, e) {
  return q(t.getHours(), e, 2);
}
function ea(t, e) {
  return q(t.getHours() % 12 || 12, e, 2);
}
function ra(t, e) {
  return q(1 + Tt.count(kt(t), t), e, 3);
}
function vr(t, e) {
  return q(t.getMilliseconds(), e, 3);
}
function na(t, e) {
  return vr(t, e) + "000";
}
function aa(t, e) {
  return q(t.getMonth() + 1, e, 2);
}
function ia(t, e) {
  return q(t.getMinutes(), e, 2);
}
function sa(t, e) {
  return q(t.getSeconds(), e, 2);
}
function oa(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function ca(t, e) {
  return q(Vt.count(kt(t) - 1, t), e, 2);
}
function Tr(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? xt(t) : xt.ceil(t);
}
function ua(t, e) {
  return t = Tr(t), q(xt.count(kt(t), t) + (kt(t).getDay() === 4), e, 2);
}
function la(t) {
  return t.getDay();
}
function fa(t, e) {
  return q(Ht.count(kt(t) - 1, t), e, 2);
}
function ha(t, e) {
  return q(t.getFullYear() % 100, e, 2);
}
function da(t, e) {
  return t = Tr(t), q(t.getFullYear() % 100, e, 2);
}
function ma(t, e) {
  return q(t.getFullYear() % 1e4, e, 4);
}
function ga(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? xt(t) : xt.ceil(t), q(t.getFullYear() % 1e4, e, 4);
}
function ya(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + q(e / 60 | 0, "0", 2) + q(e % 60, "0", 2);
}
function Ge(t, e) {
  return q(t.getUTCDate(), e, 2);
}
function ka(t, e) {
  return q(t.getUTCHours(), e, 2);
}
function pa(t, e) {
  return q(t.getUTCHours() % 12 || 12, e, 2);
}
function va(t, e) {
  return q(1 + Ce.count(bt(t), t), e, 3);
}
function xr(t, e) {
  return q(t.getUTCMilliseconds(), e, 3);
}
function Ta(t, e) {
  return xr(t, e) + "000";
}
function xa(t, e) {
  return q(t.getUTCMonth() + 1, e, 2);
}
function ba(t, e) {
  return q(t.getUTCMinutes(), e, 2);
}
function wa(t, e) {
  return q(t.getUTCSeconds(), e, 2);
}
function Da(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Ca(t, e) {
  return q(pr.count(bt(t) - 1, t), e, 2);
}
function br(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ut(t) : Ut.ceil(t);
}
function Ma(t, e) {
  return t = br(t), q(Ut.count(bt(t), t) + (bt(t).getUTCDay() === 4), e, 2);
}
function _a(t) {
  return t.getUTCDay();
}
function Sa(t, e) {
  return q(ee.count(bt(t) - 1, t), e, 2);
}
function Fa(t, e) {
  return q(t.getUTCFullYear() % 100, e, 2);
}
function Ya(t, e) {
  return t = br(t), q(t.getUTCFullYear() % 100, e, 2);
}
function Ua(t, e) {
  return q(t.getUTCFullYear() % 1e4, e, 4);
}
function Ea(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ut(t) : Ut.ceil(t), q(t.getUTCFullYear() % 1e4, e, 4);
}
function La() {
  return "+0000";
}
function $e() {
  return "%";
}
function Qe(t) {
  return +t;
}
function je(t) {
  return Math.floor(+t / 1e3);
}
var Mt, re;
Aa({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Aa(t) {
  return Mt = An(t), re = Mt.format, Mt.parse, Mt.utcFormat, Mt.utcParse, Mt;
}
function Ia(t) {
  return new Date(t);
}
function Wa(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function wr(t, e, r, n, a, i, s, y, _, p) {
  var g = Br(), E = g.invert, C = g.domain, x = p(".%L"), X = p(":%S"), O = p("%I:%M"), M = p("%I %p"), I = p("%a %d"), V = p("%b %d"), W = p("%B"), Z = p("%Y");
  function Q(D) {
    return (_(D) < D ? x : y(D) < D ? X : s(D) < D ? O : i(D) < D ? M : n(D) < D ? a(D) < D ? I : V : r(D) < D ? W : Z)(D);
  }
  return g.invert = function(D) {
    return new Date(E(D));
  }, g.domain = function(D) {
    return arguments.length ? C(Array.from(D, Wa)) : C().map(Ia);
  }, g.ticks = function(D) {
    var H = C();
    return t(H[0], H[H.length - 1], D ?? 10);
  }, g.tickFormat = function(D, H) {
    return H == null ? Q : p(H);
  }, g.nice = function(D) {
    var H = C();
    return (!D || typeof D.range != "function") && (D = e(H[0], H[H.length - 1], D ?? 10)), D ? C(bn(H, D)) : g;
  }, g.copy = function() {
    return Xr(g, wr(t, e, r, n, a, i, s, y, _, p));
  }, g;
}
function Oa() {
  return $r.apply(wr(En, Ln, kt, Nt, Vt, Tt, Ot, Wt, vt, re).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var Qt = { exports: {} }, Ha = Qt.exports, Je;
function Na() {
  return Je || (Je = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(Ha, function() {
      var r = "day";
      return function(n, a, i) {
        var s = function(p) {
          return p.add(4 - p.isoWeekday(), r);
        }, y = a.prototype;
        y.isoWeekYear = function() {
          return s(this).year();
        }, y.isoWeek = function(p) {
          if (!this.$utils().u(p)) return this.add(7 * (p - this.isoWeek()), r);
          var g, E, C, x, X = s(this), O = (g = this.isoWeekYear(), E = this.$u, C = (E ? i.utc : i)().year(g).startOf("year"), x = 4 - C.isoWeekday(), C.isoWeekday() > 4 && (x += 7), C.add(x, r));
          return X.diff(O, "week") + 1;
        }, y.isoWeekday = function(p) {
          return this.$utils().u(p) ? this.day() || 7 : this.day(this.day() % 7 ? p : p - 7);
        };
        var _ = y.startOf;
        y.startOf = function(p, g) {
          var E = this.$utils(), C = !!E.u(g) || g;
          return E.p(p) === "isoweek" ? C ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : _.bind(this)(p, g);
        };
      };
    });
  }(Qt)), Qt.exports;
}
var Va = Na(), Pa = /* @__PURE__ */ we(Va), ve = function() {
  var t = /* @__PURE__ */ h(function(U, l, m, T) {
    for (m = m || {}, T = U.length; T--; m[U[T]] = l) ;
    return m;
  }, "o"), e = [6, 8, 10, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 35, 36, 38, 40], r = [1, 26], n = [1, 27], a = [1, 28], i = [1, 29], s = [1, 30], y = [1, 31], _ = [1, 32], p = [1, 33], g = [1, 34], E = [1, 9], C = [1, 10], x = [1, 11], X = [1, 12], O = [1, 13], M = [1, 14], I = [1, 15], V = [1, 16], W = [1, 19], Z = [1, 20], Q = [1, 21], D = [1, 22], H = [1, 23], b = [1, 25], Y = [1, 35], F = {
    trace: /* @__PURE__ */ h(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, gantt: 4, document: 5, EOF: 6, line: 7, SPACE: 8, statement: 9, NL: 10, weekday: 11, weekday_monday: 12, weekday_tuesday: 13, weekday_wednesday: 14, weekday_thursday: 15, weekday_friday: 16, weekday_saturday: 17, weekday_sunday: 18, weekend: 19, weekend_friday: 20, weekend_saturday: 21, dateFormat: 22, inclusiveEndDates: 23, topAxis: 24, axisFormat: 25, tickInterval: 26, excludes: 27, includes: 28, todayMarker: 29, title: 30, acc_title: 31, acc_title_value: 32, acc_descr: 33, acc_descr_value: 34, acc_descr_multiline_value: 35, section: 36, clickStatement: 37, taskTxt: 38, taskData: 39, click: 40, callbackname: 41, callbackargs: 42, href: 43, clickStatementDebug: 44, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "gantt", 6: "EOF", 8: "SPACE", 10: "NL", 12: "weekday_monday", 13: "weekday_tuesday", 14: "weekday_wednesday", 15: "weekday_thursday", 16: "weekday_friday", 17: "weekday_saturday", 18: "weekday_sunday", 20: "weekend_friday", 21: "weekend_saturday", 22: "dateFormat", 23: "inclusiveEndDates", 24: "topAxis", 25: "axisFormat", 26: "tickInterval", 27: "excludes", 28: "includes", 29: "todayMarker", 30: "title", 31: "acc_title", 32: "acc_title_value", 33: "acc_descr", 34: "acc_descr_value", 35: "acc_descr_multiline_value", 36: "section", 38: "taskTxt", 39: "taskData", 40: "click", 41: "callbackname", 42: "callbackargs", 43: "href" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [19, 1], [19, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 2], [9, 2], [9, 1], [9, 1], [9, 1], [9, 2], [37, 2], [37, 3], [37, 3], [37, 4], [37, 3], [37, 4], [37, 2], [44, 2], [44, 3], [44, 3], [44, 4], [44, 3], [44, 4], [44, 2]],
    performAction: /* @__PURE__ */ h(function(l, m, T, d, w, c, u) {
      var o = c.length - 1;
      switch (w) {
        case 1:
          return c[o - 1];
        case 2:
          this.$ = [];
          break;
        case 3:
          c[o - 1].push(c[o]), this.$ = c[o - 1];
          break;
        case 4:
        case 5:
          this.$ = c[o];
          break;
        case 6:
        case 7:
          this.$ = [];
          break;
        case 8:
          d.setWeekday("monday");
          break;
        case 9:
          d.setWeekday("tuesday");
          break;
        case 10:
          d.setWeekday("wednesday");
          break;
        case 11:
          d.setWeekday("thursday");
          break;
        case 12:
          d.setWeekday("friday");
          break;
        case 13:
          d.setWeekday("saturday");
          break;
        case 14:
          d.setWeekday("sunday");
          break;
        case 15:
          d.setWeekend("friday");
          break;
        case 16:
          d.setWeekend("saturday");
          break;
        case 17:
          d.setDateFormat(c[o].substr(11)), this.$ = c[o].substr(11);
          break;
        case 18:
          d.enableInclusiveEndDates(), this.$ = c[o].substr(18);
          break;
        case 19:
          d.TopAxis(), this.$ = c[o].substr(8);
          break;
        case 20:
          d.setAxisFormat(c[o].substr(11)), this.$ = c[o].substr(11);
          break;
        case 21:
          d.setTickInterval(c[o].substr(13)), this.$ = c[o].substr(13);
          break;
        case 22:
          d.setExcludes(c[o].substr(9)), this.$ = c[o].substr(9);
          break;
        case 23:
          d.setIncludes(c[o].substr(9)), this.$ = c[o].substr(9);
          break;
        case 24:
          d.setTodayMarker(c[o].substr(12)), this.$ = c[o].substr(12);
          break;
        case 27:
          d.setDiagramTitle(c[o].substr(6)), this.$ = c[o].substr(6);
          break;
        case 28:
          this.$ = c[o].trim(), d.setAccTitle(this.$);
          break;
        case 29:
        case 30:
          this.$ = c[o].trim(), d.setAccDescription(this.$);
          break;
        case 31:
          d.addSection(c[o].substr(8)), this.$ = c[o].substr(8);
          break;
        case 33:
          d.addTask(c[o - 1], c[o]), this.$ = "task";
          break;
        case 34:
          this.$ = c[o - 1], d.setClickEvent(c[o - 1], c[o], null);
          break;
        case 35:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o - 1], c[o]);
          break;
        case 36:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o - 1], null), d.setLink(c[o - 2], c[o]);
          break;
        case 37:
          this.$ = c[o - 3], d.setClickEvent(c[o - 3], c[o - 2], c[o - 1]), d.setLink(c[o - 3], c[o]);
          break;
        case 38:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o], null), d.setLink(c[o - 2], c[o - 1]);
          break;
        case 39:
          this.$ = c[o - 3], d.setClickEvent(c[o - 3], c[o - 1], c[o]), d.setLink(c[o - 3], c[o - 2]);
          break;
        case 40:
          this.$ = c[o - 1], d.setLink(c[o - 1], c[o]);
          break;
        case 41:
        case 47:
          this.$ = c[o - 1] + " " + c[o];
          break;
        case 42:
        case 43:
        case 45:
          this.$ = c[o - 2] + " " + c[o - 1] + " " + c[o];
          break;
        case 44:
        case 46:
          this.$ = c[o - 3] + " " + c[o - 2] + " " + c[o - 1] + " " + c[o];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, t(e, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: 17, 12: r, 13: n, 14: a, 15: i, 16: s, 17: y, 18: _, 19: 18, 20: p, 21: g, 22: E, 23: C, 24: x, 25: X, 26: O, 27: M, 28: I, 29: V, 30: W, 31: Z, 33: Q, 35: D, 36: H, 37: 24, 38: b, 40: Y }, t(e, [2, 7], { 1: [2, 1] }), t(e, [2, 3]), { 9: 36, 11: 17, 12: r, 13: n, 14: a, 15: i, 16: s, 17: y, 18: _, 19: 18, 20: p, 21: g, 22: E, 23: C, 24: x, 25: X, 26: O, 27: M, 28: I, 29: V, 30: W, 31: Z, 33: Q, 35: D, 36: H, 37: 24, 38: b, 40: Y }, t(e, [2, 5]), t(e, [2, 6]), t(e, [2, 17]), t(e, [2, 18]), t(e, [2, 19]), t(e, [2, 20]), t(e, [2, 21]), t(e, [2, 22]), t(e, [2, 23]), t(e, [2, 24]), t(e, [2, 25]), t(e, [2, 26]), t(e, [2, 27]), { 32: [1, 37] }, { 34: [1, 38] }, t(e, [2, 30]), t(e, [2, 31]), t(e, [2, 32]), { 39: [1, 39] }, t(e, [2, 8]), t(e, [2, 9]), t(e, [2, 10]), t(e, [2, 11]), t(e, [2, 12]), t(e, [2, 13]), t(e, [2, 14]), t(e, [2, 15]), t(e, [2, 16]), { 41: [1, 40], 43: [1, 41] }, t(e, [2, 4]), t(e, [2, 28]), t(e, [2, 29]), t(e, [2, 33]), t(e, [2, 34], { 42: [1, 42], 43: [1, 43] }), t(e, [2, 40], { 41: [1, 44] }), t(e, [2, 35], { 43: [1, 45] }), t(e, [2, 36]), t(e, [2, 38], { 42: [1, 46] }), t(e, [2, 37]), t(e, [2, 39])],
    defaultActions: {},
    parseError: /* @__PURE__ */ h(function(l, m) {
      if (m.recoverable)
        this.trace(l);
      else {
        var T = new Error(l);
        throw T.hash = m, T;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ h(function(l) {
      var m = this, T = [0], d = [], w = [null], c = [], u = this.table, o = "", z = 0, P = 0, R = 2, K = 1, G = c.slice.call(arguments, 1), j = Object.create(this.lexer), it = { yy: {} };
      for (var k in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, k) && (it.yy[k] = this.yy[k]);
      j.setInput(l, it.yy), it.yy.lexer = j, it.yy.parser = this, typeof j.yylloc > "u" && (j.yylloc = {});
      var A = j.yylloc;
      c.push(A);
      var N = j.options && j.options.ranges;
      typeof it.yy.parseError == "function" ? this.parseError = it.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function f(ot) {
        T.length = T.length - 2 * ot, w.length = w.length - ot, c.length = c.length - ot;
      }
      h(f, "popStack");
      function J() {
        var ot;
        return ot = d.pop() || j.lex() || K, typeof ot != "number" && (ot instanceof Array && (d = ot, ot = d.pop()), ot = m.symbols_[ot] || ot), ot;
      }
      h(J, "lex");
      for (var L, $, B, nt, st = {}, pt, ut, We, qt; ; ) {
        if ($ = T[T.length - 1], this.defaultActions[$] ? B = this.defaultActions[$] : ((L === null || typeof L > "u") && (L = J()), B = u[$] && u[$][L]), typeof B > "u" || !B.length || !B[0]) {
          var ie = "";
          qt = [];
          for (pt in u[$])
            this.terminals_[pt] && pt > R && qt.push("'" + this.terminals_[pt] + "'");
          j.showPosition ? ie = "Parse error on line " + (z + 1) + `:
` + j.showPosition() + `
Expecting ` + qt.join(", ") + ", got '" + (this.terminals_[L] || L) + "'" : ie = "Parse error on line " + (z + 1) + ": Unexpected " + (L == K ? "end of input" : "'" + (this.terminals_[L] || L) + "'"), this.parseError(ie, {
            text: j.match,
            token: this.terminals_[L] || L,
            line: j.yylineno,
            loc: A,
            expected: qt
          });
        }
        if (B[0] instanceof Array && B.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + $ + ", token: " + L);
        switch (B[0]) {
          case 1:
            T.push(L), w.push(j.yytext), c.push(j.yylloc), T.push(B[1]), L = null, P = j.yyleng, o = j.yytext, z = j.yylineno, A = j.yylloc;
            break;
          case 2:
            if (ut = this.productions_[B[1]][1], st.$ = w[w.length - ut], st._$ = {
              first_line: c[c.length - (ut || 1)].first_line,
              last_line: c[c.length - 1].last_line,
              first_column: c[c.length - (ut || 1)].first_column,
              last_column: c[c.length - 1].last_column
            }, N && (st._$.range = [
              c[c.length - (ut || 1)].range[0],
              c[c.length - 1].range[1]
            ]), nt = this.performAction.apply(st, [
              o,
              P,
              z,
              it.yy,
              B[1],
              w,
              c
            ].concat(G)), typeof nt < "u")
              return nt;
            ut && (T = T.slice(0, -1 * ut * 2), w = w.slice(0, -1 * ut), c = c.slice(0, -1 * ut)), T.push(this.productions_[B[1]][0]), w.push(st.$), c.push(st._$), We = u[T[T.length - 2]][T[T.length - 1]], T.push(We);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }, "parse")
  }, S = /* @__PURE__ */ function() {
    var U = {
      EOF: 1,
      parseError: /* @__PURE__ */ h(function(m, T) {
        if (this.yy.parser)
          this.yy.parser.parseError(m, T);
        else
          throw new Error(m);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ h(function(l, m) {
        return this.yy = m || this.yy || {}, this._input = l, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ h(function() {
        var l = this._input[0];
        this.yytext += l, this.yyleng++, this.offset++, this.match += l, this.matched += l;
        var m = l.match(/(?:\r\n?|\n).*/g);
        return m ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), l;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ h(function(l) {
        var m = l.length, T = l.split(/(?:\r\n?|\n)/g);
        this._input = l + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - m), this.offset -= m;
        var d = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), T.length - 1 && (this.yylineno -= T.length - 1);
        var w = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: T ? (T.length === d.length ? this.yylloc.first_column : 0) + d[d.length - T.length].length - T[0].length : this.yylloc.first_column - m
        }, this.options.ranges && (this.yylloc.range = [w[0], w[0] + this.yyleng - m]), this.yyleng = this.yytext.length, this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ h(function() {
        return this._more = !0, this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ h(function() {
        if (this.options.backtrack_lexer)
          this._backtrack = !0;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: /* @__PURE__ */ h(function(l) {
        this.unput(this.match.slice(l));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ h(function() {
        var l = this.matched.substr(0, this.matched.length - this.match.length);
        return (l.length > 20 ? "..." : "") + l.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ h(function() {
        var l = this.match;
        return l.length < 20 && (l += this._input.substr(0, 20 - l.length)), (l.substr(0, 20) + (l.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ h(function() {
        var l = this.pastInput(), m = new Array(l.length + 1).join("-");
        return l + this.upcomingInput() + `
` + m + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ h(function(l, m) {
        var T, d, w;
        if (this.options.backtrack_lexer && (w = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (w.yylloc.range = this.yylloc.range.slice(0))), d = l[0].match(/(?:\r\n?|\n).*/g), d && (this.yylineno += d.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: d ? d[d.length - 1].length - d[d.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + l[0].length
        }, this.yytext += l[0], this.match += l[0], this.matches = l, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(l[0].length), this.matched += l[0], T = this.performAction.call(this, this.yy, this, m, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), T)
          return T;
        if (this._backtrack) {
          for (var c in w)
            this[c] = w[c];
          return !1;
        }
        return !1;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ h(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var l, m, T, d;
        this._more || (this.yytext = "", this.match = "");
        for (var w = this._currentRules(), c = 0; c < w.length; c++)
          if (T = this._input.match(this.rules[w[c]]), T && (!m || T[0].length > m[0].length)) {
            if (m = T, d = c, this.options.backtrack_lexer) {
              if (l = this.test_match(T, w[c]), l !== !1)
                return l;
              if (this._backtrack) {
                m = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return m ? (l = this.test_match(m, w[d]), l !== !1 ? l : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ h(function() {
        var m = this.next();
        return m || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ h(function(m) {
        this.conditionStack.push(m);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ h(function() {
        var m = this.conditionStack.length - 1;
        return m > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ h(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ h(function(m) {
        return m = this.conditionStack.length - 1 - Math.abs(m || 0), m >= 0 ? this.conditionStack[m] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ h(function(m) {
        this.begin(m);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ h(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": !0 },
      performAction: /* @__PURE__ */ h(function(m, T, d, w) {
        switch (d) {
          case 0:
            return this.begin("open_directive"), "open_directive";
          case 1:
            return this.begin("acc_title"), 31;
          case 2:
            return this.popState(), "acc_title_value";
          case 3:
            return this.begin("acc_descr"), 33;
          case 4:
            return this.popState(), "acc_descr_value";
          case 5:
            this.begin("acc_descr_multiline");
            break;
          case 6:
            this.popState();
            break;
          case 7:
            return "acc_descr_multiline_value";
          case 8:
            break;
          case 9:
            break;
          case 10:
            break;
          case 11:
            return 10;
          case 12:
            break;
          case 13:
            break;
          case 14:
            this.begin("href");
            break;
          case 15:
            this.popState();
            break;
          case 16:
            return 43;
          case 17:
            this.begin("callbackname");
            break;
          case 18:
            this.popState();
            break;
          case 19:
            this.popState(), this.begin("callbackargs");
            break;
          case 20:
            return 41;
          case 21:
            this.popState();
            break;
          case 22:
            return 42;
          case 23:
            this.begin("click");
            break;
          case 24:
            this.popState();
            break;
          case 25:
            return 40;
          case 26:
            return 4;
          case 27:
            return 22;
          case 28:
            return 23;
          case 29:
            return 24;
          case 30:
            return 25;
          case 31:
            return 26;
          case 32:
            return 28;
          case 33:
            return 27;
          case 34:
            return 29;
          case 35:
            return 12;
          case 36:
            return 13;
          case 37:
            return 14;
          case 38:
            return 15;
          case 39:
            return 16;
          case 40:
            return 17;
          case 41:
            return 18;
          case 42:
            return 20;
          case 43:
            return 21;
          case 44:
            return "date";
          case 45:
            return 30;
          case 46:
            return "accDescription";
          case 47:
            return 36;
          case 48:
            return 38;
          case 49:
            return 39;
          case 50:
            return ":";
          case 51:
            return 6;
          case 52:
            return "INVALID";
        }
      }, "anonymous"),
      rules: [/^(?:%%\{)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:%%(?!\{)*[^\n]*)/i, /^(?:[^\}]%%*[^\n]*)/i, /^(?:%%*[^\n]*[\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:%[^\n]*)/i, /^(?:href[\s]+["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:call[\s]+)/i, /^(?:\([\s]*\))/i, /^(?:\()/i, /^(?:[^(]*)/i, /^(?:\))/i, /^(?:[^)]*)/i, /^(?:click[\s]+)/i, /^(?:[\s\n])/i, /^(?:[^\s\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:inclusiveEndDates\b)/i, /^(?:topAxis\b)/i, /^(?:axisFormat\s[^#\n;]+)/i, /^(?:tickInterval\s[^#\n;]+)/i, /^(?:includes\s[^#\n;]+)/i, /^(?:excludes\s[^#\n;]+)/i, /^(?:todayMarker\s[^\n;]+)/i, /^(?:weekday\s+monday\b)/i, /^(?:weekday\s+tuesday\b)/i, /^(?:weekday\s+wednesday\b)/i, /^(?:weekday\s+thursday\b)/i, /^(?:weekday\s+friday\b)/i, /^(?:weekday\s+saturday\b)/i, /^(?:weekday\s+sunday\b)/i, /^(?:weekend\s+friday\b)/i, /^(?:weekend\s+saturday\b)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^\n]+)/i, /^(?:accDescription\s[^#\n;]+)/i, /^(?:section\s[^\n]+)/i, /^(?:[^:\n]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [6, 7], inclusive: !1 }, acc_descr: { rules: [4], inclusive: !1 }, acc_title: { rules: [2], inclusive: !1 }, callbackargs: { rules: [21, 22], inclusive: !1 }, callbackname: { rules: [18, 19, 20], inclusive: !1 }, href: { rules: [15, 16], inclusive: !1 }, click: { rules: [24, 25], inclusive: !1 }, INITIAL: { rules: [0, 1, 3, 5, 8, 9, 10, 11, 12, 13, 14, 17, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], inclusive: !0 } }
    };
    return U;
  }();
  F.lexer = S;
  function v() {
    this.yy = {};
  }
  return h(v, "Parser"), v.prototype = F, F.Parser = v, new v();
}();
ve.parser = ve;
var za = ve;
at.extend(Pa);
at.extend(nn);
at.extend(Kr);
var Ke = { friday: 5, saturday: 6 }, lt = "", Me = "", _e = void 0, Se = "", Pt = [], zt = [], Fe = /* @__PURE__ */ new Map(), Ye = [], ne = [], Et = "", Ue = "", Dr = ["active", "done", "crit", "milestone", "vert"], Ee = [], Rt = !1, Le = !1, Ae = "sunday", ae = "saturday", Te = 0, Ra = /* @__PURE__ */ h(function() {
  Ye = [], ne = [], Et = "", Ee = [], jt = 0, be = void 0, Jt = void 0, tt = [], lt = "", Me = "", Ue = "", _e = void 0, Se = "", Pt = [], zt = [], Rt = !1, Le = !1, Te = 0, Fe = /* @__PURE__ */ new Map(), Rr(), Ae = "sunday", ae = "saturday";
}, "clear"), qa = /* @__PURE__ */ h(function(t) {
  Me = t;
}, "setAxisFormat"), Za = /* @__PURE__ */ h(function() {
  return Me;
}, "getAxisFormat"), Ba = /* @__PURE__ */ h(function(t) {
  _e = t;
}, "setTickInterval"), Xa = /* @__PURE__ */ h(function() {
  return _e;
}, "getTickInterval"), Ga = /* @__PURE__ */ h(function(t) {
  Se = t;
}, "setTodayMarker"), $a = /* @__PURE__ */ h(function() {
  return Se;
}, "getTodayMarker"), Qa = /* @__PURE__ */ h(function(t) {
  lt = t;
}, "setDateFormat"), ja = /* @__PURE__ */ h(function() {
  Rt = !0;
}, "enableInclusiveEndDates"), Ja = /* @__PURE__ */ h(function() {
  return Rt;
}, "endDatesAreInclusive"), Ka = /* @__PURE__ */ h(function() {
  Le = !0;
}, "enableTopAxis"), ti = /* @__PURE__ */ h(function() {
  return Le;
}, "topAxisEnabled"), ei = /* @__PURE__ */ h(function(t) {
  Ue = t;
}, "setDisplayMode"), ri = /* @__PURE__ */ h(function() {
  return Ue;
}, "getDisplayMode"), ni = /* @__PURE__ */ h(function() {
  return lt;
}, "getDateFormat"), ai = /* @__PURE__ */ h(function(t) {
  Pt = t.toLowerCase().split(/[\s,]+/);
}, "setIncludes"), ii = /* @__PURE__ */ h(function() {
  return Pt;
}, "getIncludes"), si = /* @__PURE__ */ h(function(t) {
  zt = t.toLowerCase().split(/[\s,]+/);
}, "setExcludes"), oi = /* @__PURE__ */ h(function() {
  return zt;
}, "getExcludes"), ci = /* @__PURE__ */ h(function() {
  return Fe;
}, "getLinks"), ui = /* @__PURE__ */ h(function(t) {
  Et = t, Ye.push(t);
}, "addSection"), li = /* @__PURE__ */ h(function() {
  return Ye;
}, "getSections"), fi = /* @__PURE__ */ h(function() {
  let t = tr();
  const e = 10;
  let r = 0;
  for (; !t && r < e; )
    t = tr(), r++;
  return ne = tt, ne;
}, "getTasks"), Cr = /* @__PURE__ */ h(function(t, e, r, n) {
  const a = t.format(e.trim()), i = t.format("YYYY-MM-DD");
  return n.includes(a) || n.includes(i) ? !1 : r.includes("weekends") && (t.isoWeekday() === Ke[ae] || t.isoWeekday() === Ke[ae] + 1) || r.includes(t.format("dddd").toLowerCase()) ? !0 : r.includes(a) || r.includes(i);
}, "isInvalidDate"), hi = /* @__PURE__ */ h(function(t) {
  Ae = t;
}, "setWeekday"), di = /* @__PURE__ */ h(function() {
  return Ae;
}, "getWeekday"), mi = /* @__PURE__ */ h(function(t) {
  ae = t;
}, "setWeekend"), Mr = /* @__PURE__ */ h(function(t, e, r, n) {
  if (!r.length || t.manualEndTime)
    return;
  let a;
  t.startTime instanceof Date ? a = at(t.startTime) : a = at(t.startTime, e, !0), a = a.add(1, "d");
  let i;
  t.endTime instanceof Date ? i = at(t.endTime) : i = at(t.endTime, e, !0);
  const [s, y] = gi(
    a,
    i,
    e,
    r,
    n
  );
  t.endTime = s.toDate(), t.renderEndTime = y;
}, "checkTaskDates"), gi = /* @__PURE__ */ h(function(t, e, r, n, a) {
  let i = !1, s = null;
  for (; t <= e; )
    i || (s = e.toDate()), i = Cr(t, r, n, a), i && (e = e.add(1, "d")), t = t.add(1, "d");
  return [e, s];
}, "fixTaskDates"), xe = /* @__PURE__ */ h(function(t, e, r) {
  if (r = r.trim(), (e.trim() === "x" || e.trim() === "X") && /^\d+$/.test(r))
    return new Date(Number(r));
  const a = /^after\s+(?<ids>[\d\w- ]+)/.exec(r);
  if (a !== null) {
    let s = null;
    for (const _ of a.groups.ids.split(" ")) {
      let p = Ct(_);
      p !== void 0 && (!s || p.endTime > s.endTime) && (s = p);
    }
    if (s)
      return s.endTime;
    const y = /* @__PURE__ */ new Date();
    return y.setHours(0, 0, 0, 0), y;
  }
  let i = at(r, e.trim(), !0);
  if (i.isValid())
    return i.toDate();
  {
    Kt.debug("Invalid date:" + r), Kt.debug("With date format:" + e.trim());
    const s = new Date(r);
    if (s === void 0 || isNaN(s.getTime()) || // WebKit browsers can mis-parse invalid dates to be ridiculously
    // huge numbers, e.g. new Date('202304') gets parsed as January 1, 202304.
    // This can cause virtually infinite loops while rendering, so for the
    // purposes of Gantt charts we'll just treat any date beyond 10,000 AD/BC as
    // invalid.
    s.getFullYear() < -1e4 || s.getFullYear() > 1e4)
      throw new Error("Invalid date:" + r);
    return s;
  }
}, "getStartDate"), _r = /* @__PURE__ */ h(function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, "parseDuration"), Sr = /* @__PURE__ */ h(function(t, e, r, n = !1) {
  r = r.trim();
  const i = /^until\s+(?<ids>[\d\w- ]+)/.exec(r);
  if (i !== null) {
    let g = null;
    for (const C of i.groups.ids.split(" ")) {
      let x = Ct(C);
      x !== void 0 && (!g || x.startTime < g.startTime) && (g = x);
    }
    if (g)
      return g.startTime;
    const E = /* @__PURE__ */ new Date();
    return E.setHours(0, 0, 0, 0), E;
  }
  let s = at(r, e.trim(), !0);
  if (s.isValid())
    return n && (s = s.add(1, "d")), s.toDate();
  let y = at(t);
  const [_, p] = _r(r);
  if (!Number.isNaN(_)) {
    const g = y.add(_, p);
    g.isValid() && (y = g);
  }
  return y.toDate();
}, "getEndDate"), jt = 0, Ft = /* @__PURE__ */ h(function(t) {
  return t === void 0 ? (jt = jt + 1, "task" + jt) : t;
}, "parseId"), yi = /* @__PURE__ */ h(function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), a = {};
  Ie(n, a, Dr);
  for (let s = 0; s < n.length; s++)
    n[s] = n[s].trim();
  let i = "";
  switch (n.length) {
    case 1:
      a.id = Ft(), a.startTime = t.endTime, i = n[0];
      break;
    case 2:
      a.id = Ft(), a.startTime = xe(void 0, lt, n[0]), i = n[1];
      break;
    case 3:
      a.id = Ft(n[0]), a.startTime = xe(void 0, lt, n[1]), i = n[2];
      break;
  }
  return i && (a.endTime = Sr(a.startTime, lt, i, Rt), a.manualEndTime = at(i, "YYYY-MM-DD", !0).isValid(), Mr(a, lt, zt, Pt)), a;
}, "compileData"), ki = /* @__PURE__ */ h(function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), a = {};
  Ie(n, a, Dr);
  for (let i = 0; i < n.length; i++)
    n[i] = n[i].trim();
  switch (n.length) {
    case 1:
      a.id = Ft(), a.startTime = {
        type: "prevTaskEnd",
        id: t
      }, a.endTime = {
        data: n[0]
      };
      break;
    case 2:
      a.id = Ft(), a.startTime = {
        type: "getStartDate",
        startData: n[0]
      }, a.endTime = {
        data: n[1]
      };
      break;
    case 3:
      a.id = Ft(n[0]), a.startTime = {
        type: "getStartDate",
        startData: n[1]
      }, a.endTime = {
        data: n[2]
      };
      break;
  }
  return a;
}, "parseData"), be, Jt, tt = [], Fr = {}, pi = /* @__PURE__ */ h(function(t, e) {
  const r = {
    section: Et,
    type: Et,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, n = ki(Jt, e);
  r.raw.startTime = n.startTime, r.raw.endTime = n.endTime, r.id = n.id, r.prevTaskId = Jt, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.vert = n.vert, r.order = Te, Te++;
  const a = tt.push(r);
  Jt = r.id, Fr[r.id] = a - 1;
}, "addTask"), Ct = /* @__PURE__ */ h(function(t) {
  const e = Fr[t];
  return tt[e];
}, "findTaskById"), vi = /* @__PURE__ */ h(function(t, e) {
  const r = {
    section: Et,
    type: Et,
    description: t,
    task: t,
    classes: []
  }, n = yi(be, e);
  r.startTime = n.startTime, r.endTime = n.endTime, r.id = n.id, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.vert = n.vert, be = r, ne.push(r);
}, "addTaskOrg"), tr = /* @__PURE__ */ h(function() {
  const t = /* @__PURE__ */ h(function(r) {
    const n = tt[r];
    let a = "";
    switch (tt[r].raw.startTime.type) {
      case "prevTaskEnd": {
        const i = Ct(n.prevTaskId);
        n.startTime = i.endTime;
        break;
      }
      case "getStartDate":
        a = xe(void 0, lt, tt[r].raw.startTime.startData), a && (tt[r].startTime = a);
        break;
    }
    return tt[r].startTime && (tt[r].endTime = Sr(
      tt[r].startTime,
      lt,
      tt[r].raw.endTime.data,
      Rt
    ), tt[r].endTime && (tt[r].processed = !0, tt[r].manualEndTime = at(
      tt[r].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), Mr(tt[r], lt, zt, Pt))), tt[r].processed;
  }, "compileTask");
  let e = !0;
  for (const [r, n] of tt.entries())
    t(r), e = e && n.processed;
  return e;
}, "compileTasks"), Ti = /* @__PURE__ */ h(function(t, e) {
  let r = e;
  _t().securityLevel !== "loose" && (r = zr.sanitizeUrl(e)), t.split(",").forEach(function(n) {
    Ct(n) !== void 0 && (Ur(n, () => {
      window.open(r, "_self");
    }), Fe.set(n, r));
  }), Yr(t, "clickable");
}, "setLink"), Yr = /* @__PURE__ */ h(function(t, e) {
  t.split(",").forEach(function(r) {
    let n = Ct(r);
    n !== void 0 && n.classes.push(e);
  });
}, "setClass"), xi = /* @__PURE__ */ h(function(t, e, r) {
  if (_t().securityLevel !== "loose" || e === void 0)
    return;
  let n = [];
  if (typeof r == "string") {
    n = r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let i = 0; i < n.length; i++) {
      let s = n[i].trim();
      s.startsWith('"') && s.endsWith('"') && (s = s.substr(1, s.length - 2)), n[i] = s;
    }
  }
  n.length === 0 && n.push(t), Ct(t) !== void 0 && Ur(t, () => {
    qr.runFunc(e, ...n);
  });
}, "setClickFun"), Ur = /* @__PURE__ */ h(function(t, e) {
  Ee.push(
    function() {
      const r = document.querySelector(`[id="${t}"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    },
    function() {
      const r = document.querySelector(`[id="${t}-text"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    }
  );
}, "pushFun"), bi = /* @__PURE__ */ h(function(t, e, r) {
  t.split(",").forEach(function(n) {
    xi(n, e, r);
  }), Yr(t, "clickable");
}, "setClickEvent"), wi = /* @__PURE__ */ h(function(t) {
  Ee.forEach(function(e) {
    e(t);
  });
}, "bindFunctions"), Di = {
  getConfig: /* @__PURE__ */ h(() => _t().gantt, "getConfig"),
  clear: Ra,
  setDateFormat: Qa,
  getDateFormat: ni,
  enableInclusiveEndDates: ja,
  endDatesAreInclusive: Ja,
  enableTopAxis: Ka,
  topAxisEnabled: ti,
  setAxisFormat: qa,
  getAxisFormat: Za,
  setTickInterval: Ba,
  getTickInterval: Xa,
  setTodayMarker: Ga,
  getTodayMarker: $a,
  setAccTitle: Nr,
  getAccTitle: Hr,
  setDiagramTitle: Or,
  getDiagramTitle: Wr,
  setDisplayMode: ei,
  getDisplayMode: ri,
  setAccDescription: Ir,
  getAccDescription: Ar,
  addSection: ui,
  getSections: li,
  getTasks: fi,
  addTask: pi,
  findTaskById: Ct,
  addTaskOrg: vi,
  setIncludes: ai,
  getIncludes: ii,
  setExcludes: si,
  getExcludes: oi,
  setClickEvent: bi,
  setLink: Ti,
  getLinks: ci,
  bindFunctions: wi,
  parseDuration: _r,
  isInvalidDate: Cr,
  setWeekday: hi,
  getWeekday: di,
  setWeekend: mi
};
function Ie(t, e, r) {
  let n = !0;
  for (; n; )
    n = !1, r.forEach(function(a) {
      const i = "^\\s*" + a + "\\s*$", s = new RegExp(i);
      t[0].match(s) && (e[a] = !0, t.shift(1), n = !0);
    });
}
h(Ie, "getTaskTags");
var Ci = /* @__PURE__ */ h(function() {
  Kt.debug("Something is calling, setConf, remove the call");
}, "setConf"), er = {
  monday: Ht,
  tuesday: mr,
  wednesday: gr,
  thursday: xt,
  friday: yr,
  saturday: kr,
  sunday: Vt
}, Mi = /* @__PURE__ */ h((t, e) => {
  let r = [...t].map(() => -1 / 0), n = [...t].sort((i, s) => i.startTime - s.startTime || i.order - s.order), a = 0;
  for (const i of n)
    for (let s = 0; s < r.length; s++)
      if (i.startTime >= r[s]) {
        r[s] = i.endTime, i.order = s + e, s > a && (a = s);
        break;
      }
  return a;
}, "getMaxIntersections"), ht, _i = /* @__PURE__ */ h(function(t, e, r, n) {
  const a = _t().gantt, i = _t().securityLevel;
  let s;
  i === "sandbox" && (s = Zt("#i" + e));
  const y = i === "sandbox" ? Zt(s.nodes()[0].contentDocument.body) : Zt("body"), _ = i === "sandbox" ? s.nodes()[0].contentDocument : document, p = _.getElementById(e);
  ht = p.parentElement.offsetWidth, ht === void 0 && (ht = 1200), a.useWidth !== void 0 && (ht = a.useWidth);
  const g = n.db.getTasks();
  let E = [];
  for (const b of g)
    E.push(b.type);
  E = H(E);
  const C = {};
  let x = 2 * a.topPadding;
  if (n.db.getDisplayMode() === "compact" || a.displayMode === "compact") {
    const b = {};
    for (const F of g)
      b[F.section] === void 0 ? b[F.section] = [F] : b[F.section].push(F);
    let Y = 0;
    for (const F of Object.keys(b)) {
      const S = Mi(b[F], Y) + 1;
      Y += S, x += S * (a.barHeight + a.barGap), C[F] = S;
    }
  } else {
    x += g.length * (a.barHeight + a.barGap);
    for (const b of E)
      C[b] = g.filter((Y) => Y.type === b).length;
  }
  p.setAttribute("viewBox", "0 0 " + ht + " " + x);
  const X = y.select(`[id="${e}"]`), O = Oa().domain([
    sn(g, function(b) {
      return b.startTime;
    }),
    an(g, function(b) {
      return b.endTime;
    })
  ]).rangeRound([0, ht - a.leftPadding - a.rightPadding]);
  function M(b, Y) {
    const F = b.startTime, S = Y.startTime;
    let v = 0;
    return F > S ? v = 1 : F < S && (v = -1), v;
  }
  h(M, "taskCompare"), g.sort(M), I(g, ht, x), Vr(X, x, ht, a.useMaxWidth), X.append("text").text(n.db.getDiagramTitle()).attr("x", ht / 2).attr("y", a.titleTopMargin).attr("class", "titleText");
  function I(b, Y, F) {
    const S = a.barHeight, v = S + a.barGap, U = a.topPadding, l = a.leftPadding, m = Gr().domain([0, E.length]).range(["#00B9FA", "#F95002"]).interpolate(xn);
    W(
      v,
      U,
      l,
      Y,
      F,
      b,
      n.db.getExcludes(),
      n.db.getIncludes()
    ), Z(l, U, Y, F), V(b, v, U, l, S, m, Y), Q(v, U), D(l, U, Y, F);
  }
  h(I, "makeGantt");
  function V(b, Y, F, S, v, U, l) {
    b.sort((u, o) => u.vert === o.vert ? 0 : u.vert ? 1 : -1);
    const T = [...new Set(b.map((u) => u.order))].map((u) => b.find((o) => o.order === u));
    X.append("g").selectAll("rect").data(T).enter().append("rect").attr("x", 0).attr("y", function(u, o) {
      return o = u.order, o * Y + F - 2;
    }).attr("width", function() {
      return l - a.rightPadding / 2;
    }).attr("height", Y).attr("class", function(u) {
      for (const [o, z] of E.entries())
        if (u.type === z)
          return "section section" + o % a.numberSectionStyles;
      return "section section0";
    }).enter();
    const d = X.append("g").selectAll("rect").data(b).enter(), w = n.db.getLinks();
    if (d.append("rect").attr("id", function(u) {
      return u.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(u) {
      return u.milestone ? O(u.startTime) + S + 0.5 * (O(u.endTime) - O(u.startTime)) - 0.5 * v : O(u.startTime) + S;
    }).attr("y", function(u, o) {
      return o = u.order, u.vert ? a.gridLineStartPadding : o * Y + F;
    }).attr("width", function(u) {
      return u.milestone ? v : u.vert ? 0.08 * v : O(u.renderEndTime || u.endTime) - O(u.startTime);
    }).attr("height", function(u) {
      return u.vert ? g.length * (a.barHeight + a.barGap) + a.barHeight * 2 : v;
    }).attr("transform-origin", function(u, o) {
      return o = u.order, (O(u.startTime) + S + 0.5 * (O(u.endTime) - O(u.startTime))).toString() + "px " + (o * Y + F + 0.5 * v).toString() + "px";
    }).attr("class", function(u) {
      const o = "task";
      let z = "";
      u.classes.length > 0 && (z = u.classes.join(" "));
      let P = 0;
      for (const [K, G] of E.entries())
        u.type === G && (P = K % a.numberSectionStyles);
      let R = "";
      return u.active ? u.crit ? R += " activeCrit" : R = " active" : u.done ? u.crit ? R = " doneCrit" : R = " done" : u.crit && (R += " crit"), R.length === 0 && (R = " task"), u.milestone && (R = " milestone " + R), u.vert && (R = " vert " + R), R += P, R += " " + z, o + R;
    }), d.append("text").attr("id", function(u) {
      return u.id + "-text";
    }).text(function(u) {
      return u.task;
    }).attr("font-size", a.fontSize).attr("x", function(u) {
      let o = O(u.startTime), z = O(u.renderEndTime || u.endTime);
      if (u.milestone && (o += 0.5 * (O(u.endTime) - O(u.startTime)) - 0.5 * v, z = o + v), u.vert)
        return O(u.startTime) + S;
      const P = this.getBBox().width;
      return P > z - o ? z + P + 1.5 * a.leftPadding > l ? o + S - 5 : z + S + 5 : (z - o) / 2 + o + S;
    }).attr("y", function(u, o) {
      return u.vert ? a.gridLineStartPadding + g.length * (a.barHeight + a.barGap) + 60 : (o = u.order, o * Y + a.barHeight / 2 + (a.fontSize / 2 - 2) + F);
    }).attr("text-height", v).attr("class", function(u) {
      const o = O(u.startTime);
      let z = O(u.endTime);
      u.milestone && (z = o + v);
      const P = this.getBBox().width;
      let R = "";
      u.classes.length > 0 && (R = u.classes.join(" "));
      let K = 0;
      for (const [j, it] of E.entries())
        u.type === it && (K = j % a.numberSectionStyles);
      let G = "";
      return u.active && (u.crit ? G = "activeCritText" + K : G = "activeText" + K), u.done ? u.crit ? G = G + " doneCritText" + K : G = G + " doneText" + K : u.crit && (G = G + " critText" + K), u.milestone && (G += " milestoneText"), u.vert && (G += " vertText"), P > z - o ? z + P + 1.5 * a.leftPadding > l ? R + " taskTextOutsideLeft taskTextOutside" + K + " " + G : R + " taskTextOutsideRight taskTextOutside" + K + " " + G + " width-" + P : R + " taskText taskText" + K + " " + G + " width-" + P;
    }), _t().securityLevel === "sandbox") {
      let u;
      u = Zt("#i" + e);
      const o = u.nodes()[0].contentDocument;
      d.filter(function(z) {
        return w.has(z.id);
      }).each(function(z) {
        var P = o.querySelector("#" + z.id), R = o.querySelector("#" + z.id + "-text");
        const K = P.parentNode;
        var G = o.createElement("a");
        G.setAttribute("xlink:href", w.get(z.id)), G.setAttribute("target", "_top"), K.appendChild(G), G.appendChild(P), G.appendChild(R);
      });
    }
  }
  h(V, "drawRects");
  function W(b, Y, F, S, v, U, l, m) {
    if (l.length === 0 && m.length === 0)
      return;
    let T, d;
    for (const { startTime: P, endTime: R } of U)
      (T === void 0 || P < T) && (T = P), (d === void 0 || R > d) && (d = R);
    if (!T || !d)
      return;
    if (at(d).diff(at(T), "year") > 5) {
      Kt.warn(
        "The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days."
      );
      return;
    }
    const w = n.db.getDateFormat(), c = [];
    let u = null, o = at(T);
    for (; o.valueOf() <= d; )
      n.db.isInvalidDate(o, w, l, m) ? u ? u.end = o : u = {
        start: o,
        end: o
      } : u && (c.push(u), u = null), o = o.add(1, "d");
    X.append("g").selectAll("rect").data(c).enter().append("rect").attr("id", (P) => "exclude-" + P.start.format("YYYY-MM-DD")).attr("x", (P) => O(P.start.startOf("day")) + F).attr("y", a.gridLineStartPadding).attr("width", (P) => O(P.end.endOf("day")) - O(P.start.startOf("day"))).attr("height", v - Y - a.gridLineStartPadding).attr("transform-origin", function(P, R) {
      return (O(P.start) + F + 0.5 * (O(P.end) - O(P.start))).toString() + "px " + (R * b + 0.5 * v).toString() + "px";
    }).attr("class", "exclude-range");
  }
  h(W, "drawExcludeDays");
  function Z(b, Y, F, S) {
    const v = n.db.getDateFormat(), U = n.db.getAxisFormat();
    let l;
    U ? l = U : v === "D" ? l = "%d" : l = a.axisFormat ?? "%Y-%m-%d";
    let m = mn(O).tickSize(-S + Y + a.gridLineStartPadding).tickFormat(re(l));
    const d = /^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(
      n.db.getTickInterval() || a.tickInterval
    );
    if (d !== null) {
      const w = d[1], c = d[2], u = n.db.getWeekday() || a.weekday;
      switch (c) {
        case "millisecond":
          m.ticks(Yt.every(w));
          break;
        case "second":
          m.ticks(vt.every(w));
          break;
        case "minute":
          m.ticks(Wt.every(w));
          break;
        case "hour":
          m.ticks(Ot.every(w));
          break;
        case "day":
          m.ticks(Tt.every(w));
          break;
        case "week":
          m.ticks(er[u].every(w));
          break;
        case "month":
          m.ticks(Nt.every(w));
          break;
      }
    }
    if (X.append("g").attr("class", "grid").attr("transform", "translate(" + b + ", " + (S - 50) + ")").call(m).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), n.db.topAxisEnabled() || a.topAxis) {
      let w = dn(O).tickSize(-S + Y + a.gridLineStartPadding).tickFormat(re(l));
      if (d !== null) {
        const c = d[1], u = d[2], o = n.db.getWeekday() || a.weekday;
        switch (u) {
          case "millisecond":
            w.ticks(Yt.every(c));
            break;
          case "second":
            w.ticks(vt.every(c));
            break;
          case "minute":
            w.ticks(Wt.every(c));
            break;
          case "hour":
            w.ticks(Ot.every(c));
            break;
          case "day":
            w.ticks(Tt.every(c));
            break;
          case "week":
            w.ticks(er[o].every(c));
            break;
          case "month":
            w.ticks(Nt.every(c));
            break;
        }
      }
      X.append("g").attr("class", "grid").attr("transform", "translate(" + b + ", " + Y + ")").call(w).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  h(Z, "makeGrid");
  function Q(b, Y) {
    let F = 0;
    const S = Object.keys(C).map((v) => [v, C[v]]);
    X.append("g").selectAll("text").data(S).enter().append(function(v) {
      const U = v[0].split(Pr.lineBreakRegex), l = -(U.length - 1) / 2, m = _.createElementNS("http://www.w3.org/2000/svg", "text");
      m.setAttribute("dy", l + "em");
      for (const [T, d] of U.entries()) {
        const w = _.createElementNS("http://www.w3.org/2000/svg", "tspan");
        w.setAttribute("alignment-baseline", "central"), w.setAttribute("x", "10"), T > 0 && w.setAttribute("dy", "1em"), w.textContent = d, m.appendChild(w);
      }
      return m;
    }).attr("x", 10).attr("y", function(v, U) {
      if (U > 0)
        for (let l = 0; l < U; l++)
          return F += S[U - 1][1], v[1] * b / 2 + F * b + Y;
      else
        return v[1] * b / 2 + Y;
    }).attr("font-size", a.sectionFontSize).attr("class", function(v) {
      for (const [U, l] of E.entries())
        if (v[0] === l)
          return "sectionTitle sectionTitle" + U % a.numberSectionStyles;
      return "sectionTitle";
    });
  }
  h(Q, "vertLabels");
  function D(b, Y, F, S) {
    const v = n.db.getTodayMarker();
    if (v === "off")
      return;
    const U = X.append("g").attr("class", "today"), l = /* @__PURE__ */ new Date(), m = U.append("line");
    m.attr("x1", O(l) + b).attr("x2", O(l) + b).attr("y1", a.titleTopMargin).attr("y2", S - a.titleTopMargin).attr("class", "today"), v !== "" && m.attr("style", v.replace(/,/g, ";"));
  }
  h(D, "drawToday");
  function H(b) {
    const Y = {}, F = [];
    for (let S = 0, v = b.length; S < v; ++S)
      Object.prototype.hasOwnProperty.call(Y, b[S]) || (Y[b[S]] = !0, F.push(b[S]));
    return F;
  }
  h(H, "checkUnique");
}, "draw"), Si = {
  setConf: Ci,
  draw: _i
}, Fi = /* @__PURE__ */ h((t) => `
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor || t.textColor};
    font-family: ${t.fontFamily};
  }
`, "getStyles"), Yi = Fi, Ii = {
  parser: za,
  db: Di,
  renderer: Si,
  styles: Yi
};
export {
  Ii as diagram
};
