import { c as O, e as m, k as p, g as P, h as c, j as w, l as x, t as N, m as A } from "./_baseUniq-BHp_s2Iz.js";
import { ar as M, aJ as E, aK as F, aL as _, aM as $, aN as B, aO as T } from "./mermaid.core-CmI31nLO.js";
import { b as I, c as g, d as l, e as y, f as L } from "./index-CFDAYDAs.js";
var S = /\s/;
function G(n) {
  for (var r = n.length; r-- && S.test(n.charAt(r)); )
    ;
  return r;
}
var H = /^\s+/;
function K(n) {
  return n && n.slice(0, G(n) + 1).replace(H, "");
}
var o = NaN, R = /^[-+]0x[0-9a-f]+$/i, q = /^0b[01]+$/i, z = /^0o[0-7]+$/i, C = parseInt;
function J(n) {
  if (typeof n == "number")
    return n;
  if (I(n))
    return o;
  if (g(n)) {
    var r = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = g(r) ? r + "" : r;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = K(n);
  var t = q.test(n);
  return t || z.test(n) ? C(n.slice(2), t ? 2 : 8) : R.test(n) ? o : +n;
}
var v = 1 / 0, W = 17976931348623157e292;
function X(n) {
  if (!n)
    return n === 0 ? n : 0;
  if (n = J(n), n === v || n === -v) {
    var r = n < 0 ? -1 : 1;
    return r * W;
  }
  return n === n ? n : 0;
}
function Y(n) {
  var r = X(n), t = r % 1;
  return r === r ? t ? r - t : r : 0;
}
function dn(n) {
  var r = n == null ? 0 : n.length;
  return r ? O(n) : [];
}
var b = Object.prototype, D = b.hasOwnProperty, un = M(function(n, r) {
  n = Object(n);
  var t = -1, i = r.length, a = i > 2 ? r[2] : void 0;
  for (a && E(r[0], r[1], a) && (i = 1); ++t < i; )
    for (var f = r[t], e = F(f), s = -1, d = e.length; ++s < d; ) {
      var u = e[s], h = n[u];
      (h === void 0 || _(h, b[u]) && !D.call(n, u)) && (n[u] = f[u]);
    }
  return n;
});
function hn(n) {
  var r = n == null ? 0 : n.length;
  return r ? n[r - 1] : void 0;
}
function Q(n) {
  return function(r, t, i) {
    var a = Object(r);
    if (!l(r)) {
      var f = m(t);
      r = p(r), t = function(s) {
        return f(a[s], s, a);
      };
    }
    var e = n(r, t, i);
    return e > -1 ? a[f ? r[e] : e] : void 0;
  };
}
var U = Math.max;
function Z(n, r, t) {
  var i = n == null ? 0 : n.length;
  if (!i)
    return -1;
  var a = t == null ? 0 : Y(t);
  return a < 0 && (a = U(i + a, 0)), P(n, m(r), a);
}
var gn = Q(Z);
function V(n, r) {
  var t = -1, i = l(n) ? Array(n.length) : [];
  return c(n, function(a, f, e) {
    i[++t] = r(a, f, e);
  }), i;
}
function mn(n, r) {
  var t = L(n) ? y : V;
  return t(n, m(r));
}
var j = Object.prototype, k = j.hasOwnProperty;
function nn(n, r) {
  return n != null && k.call(n, r);
}
function on(n, r) {
  return n != null && w(n, r, nn);
}
function rn(n, r) {
  return n < r;
}
function tn(n, r, t) {
  for (var i = -1, a = n.length; ++i < a; ) {
    var f = n[i], e = r(f);
    if (e != null && (s === void 0 ? e === e && !I(e) : t(e, s)))
      var s = e, d = f;
  }
  return d;
}
function vn(n) {
  return n && n.length ? tn(n, $, rn) : void 0;
}
function an(n, r, t, i) {
  if (!g(n))
    return n;
  r = x(r, n);
  for (var a = -1, f = r.length, e = f - 1, s = n; s != null && ++a < f; ) {
    var d = N(r[a]), u = t;
    if (d === "__proto__" || d === "constructor" || d === "prototype")
      return n;
    if (a != e) {
      var h = s[d];
      u = void 0, u === void 0 && (u = g(h) ? h : B(r[a + 1]) ? [] : {});
    }
    T(s, d, u), s = s[d];
  }
  return n;
}
function xn(n, r, t) {
  for (var i = -1, a = r.length, f = {}; ++i < a; ) {
    var e = r[i], s = A(n, e);
    t(s, e) && an(f, x(e, n), s);
  }
  return f;
}
export {
  rn as a,
  tn as b,
  V as c,
  xn as d,
  vn as e,
  dn as f,
  gn as g,
  on as h,
  un as i,
  Y as j,
  hn as l,
  mn as m,
  X as t
};
