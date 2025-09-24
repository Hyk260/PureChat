var wc = Object.defineProperty;
var _c = (n, e, t) => e in n ? wc(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var Ze = (n, e, t) => _c(n, typeof e != "symbol" ? e + "" : e, t);
import { bj as Lc, b9 as Oc, aO as bc, ar as Pc, as as ga, b5 as Mc, aM as ya } from "./mermaid.core-CmI31nLO.js";
import { K as Dc, d as xl, f as te, U as Sl, B as Il, N as Cl, v as Fc, D as Ta, e as Gc, i as Et, a as D, c as Uc } from "./index-CFDAYDAs.js";
import { k as Xt, h as Us, e as rn, S as Bc, q as Vc, s as Kc, c as Nl, v as z, u as wl, w as Wc, x as Hc, y as jc, z as zc, a as _l, d as C, i as Ye, r as le, f as $e, A as Y } from "./_baseUniq-BHp_s2Iz.js";
import { j as Bs, m as x, d as qc, f as Ne, g as Jt, h as N, i as Vs, l as Qt, e as Yc } from "./_basePickBy-C9ImJ-iA.js";
import { c as re } from "./clone-C0KSqVIs.js";
var Xc = Object.prototype, Jc = Xc.hasOwnProperty, ke = Lc(function(n, e) {
  if (Dc(e) || xl(e)) {
    Oc(e, Xt(e), n);
    return;
  }
  for (var t in e)
    Jc.call(e, t) && bc(n, t, e[t]);
});
function Zn(n) {
  for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
    var s = n[e];
    s && (i[r++] = s);
  }
  return i;
}
function Qc(n, e, t, r) {
  for (var i = -1, s = n == null ? 0 : n.length; ++i < s; ) {
    var a = n[i];
    e(r, a, t(a), n);
  }
  return r;
}
function Zc(n, e, t, r) {
  return Us(n, function(i, s, a) {
    e(r, i, t(i), a);
  }), r;
}
function ed(n, e) {
  return function(t, r) {
    var i = te(t) ? Qc : Zc, s = e ? e() : {};
    return i(t, n, rn(r), s);
  };
}
var td = 200;
function nd(n, e, t, r) {
  var i = -1, s = Vc, a = !0, o = n.length, l = [], u = e.length;
  if (!o)
    return l;
  e.length >= td && (s = Kc, a = !1, e = new Bc(e));
  e:
    for (; ++i < o; ) {
      var c = n[i], d = c;
      if (c = c !== 0 ? c : 0, a && d === d) {
        for (var h = u; h--; )
          if (e[h] === d)
            continue e;
        l.push(c);
      } else s(e, d, r) || l.push(c);
    }
  return l;
}
var hi = Pc(function(n, e) {
  return ga(n) ? nd(n, Nl(e, 1, ga, !0)) : [];
});
function Q(n, e, t) {
  var r = n == null ? 0 : n.length;
  return r ? (e = e === void 0 ? 1 : Bs(e), Sl(n, e < 0 ? 0 : e, r)) : [];
}
function Yn(n, e, t) {
  var r = n == null ? 0 : n.length;
  return r ? (e = e === void 0 ? 1 : Bs(e), e = r - e, Sl(n, 0, e < 0 ? 0 : e)) : [];
}
function rd(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (!e(n[t], t, n))
      return !1;
  return !0;
}
function id(n, e) {
  var t = !0;
  return Us(n, function(r, i, s) {
    return t = !!e(r, i, s), t;
  }), t;
}
function be(n, e, t) {
  var r = te(n) ? rd : id;
  return r(n, rn(e));
}
function Pe(n) {
  return n && n.length ? n[0] : void 0;
}
function Ee(n, e) {
  return Nl(x(n, e));
}
var sd = Object.prototype, ad = sd.hasOwnProperty, od = ed(function(n, e, t) {
  ad.call(n, t) ? n[t].push(e) : Mc(n, t, [e]);
}), ld = "[object String]";
function he(n) {
  return typeof n == "string" || !te(n) && Il(n) && Cl(n) == ld;
}
var ud = Math.max;
function de(n, e, t, r) {
  n = xl(n) ? n : z(n), t = t ? Bs(t) : 0;
  var i = n.length;
  return t < 0 && (t = ud(i + t, 0)), he(n) ? t <= i && n.indexOf(e, t) > -1 : !!i && wl(n, e, t) > -1;
}
function Ra(n, e, t) {
  var r = n == null ? 0 : n.length;
  if (!r)
    return -1;
  var i = 0;
  return wl(n, e, i);
}
var cd = "[object RegExp]";
function dd(n) {
  return Il(n) && Cl(n) == cd;
}
var va = Ta && Ta.isRegExp, Xe = va ? Fc(va) : dd, fd = "Expected a function";
function hd(n) {
  if (typeof n != "function")
    throw new TypeError(fd);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !n.call(this);
      case 1:
        return !n.call(this, e[0]);
      case 2:
        return !n.call(this, e[0], e[1]);
      case 3:
        return !n.call(this, e[0], e[1], e[2]);
    }
    return !n.apply(this, e);
  };
}
function Me(n, e) {
  if (n == null)
    return {};
  var t = Gc(Wc(n), function(r) {
    return [r];
  });
  return e = rn(e), qc(n, t, function(r, i) {
    return e(r, i[0]);
  });
}
function pi(n, e) {
  var t = te(n) ? Hc : jc;
  return t(n, hd(rn(e)));
}
function pd(n, e) {
  var t;
  return Us(n, function(r, i, s) {
    return t = e(r, i, s), !t;
  }), !!t;
}
function Ll(n, e, t) {
  var r = te(n) ? zc : pd;
  return r(n, rn(e));
}
function Ks(n) {
  return n && n.length ? _l(n) : [];
}
function md(n, e) {
  return n && n.length ? _l(n, rn(e)) : [];
}
function ae(n) {
  return typeof n == "object" && n !== null && typeof n.$type == "string";
}
function Ue(n) {
  return typeof n == "object" && n !== null && typeof n.$refText == "string";
}
function gd(n) {
  return typeof n == "object" && n !== null && typeof n.name == "string" && typeof n.type == "string" && typeof n.path == "string";
}
function Nr(n) {
  return typeof n == "object" && n !== null && ae(n.container) && Ue(n.reference) && typeof n.message == "string";
}
class Ol {
  constructor() {
    this.subtypes = {}, this.allSubtypes = {};
  }
  isInstance(e, t) {
    return ae(e) && this.isSubtype(e.$type, t);
  }
  isSubtype(e, t) {
    if (e === t)
      return !0;
    let r = this.subtypes[e];
    r || (r = this.subtypes[e] = {});
    const i = r[t];
    if (i !== void 0)
      return i;
    {
      const s = this.computeIsSubtype(e, t);
      return r[t] = s, s;
    }
  }
  getAllSubTypes(e) {
    const t = this.allSubtypes[e];
    if (t)
      return t;
    {
      const r = this.getAllTypes(), i = [];
      for (const s of r)
        this.isSubtype(s, e) && i.push(s);
      return this.allSubtypes[e] = i, i;
    }
  }
}
function Xn(n) {
  return typeof n == "object" && n !== null && Array.isArray(n.content);
}
function bl(n) {
  return typeof n == "object" && n !== null && typeof n.tokenType == "object";
}
function Pl(n) {
  return Xn(n) && typeof n.fullText == "string";
}
class Z {
  constructor(e, t) {
    this.startFn = e, this.nextFn = t;
  }
  iterator() {
    const e = {
      state: this.startFn(),
      next: () => this.nextFn(e.state),
      [Symbol.iterator]: () => e
    };
    return e;
  }
  [Symbol.iterator]() {
    return this.iterator();
  }
  isEmpty() {
    return !!this.iterator().next().done;
  }
  count() {
    const e = this.iterator();
    let t = 0, r = e.next();
    for (; !r.done; )
      t++, r = e.next();
    return t;
  }
  toArray() {
    const e = [], t = this.iterator();
    let r;
    do
      r = t.next(), r.value !== void 0 && e.push(r.value);
    while (!r.done);
    return e;
  }
  toSet() {
    return new Set(this);
  }
  toMap(e, t) {
    const r = this.map((i) => [
      e ? e(i) : i,
      t ? t(i) : i
    ]);
    return new Map(r);
  }
  toString() {
    return this.join();
  }
  concat(e) {
    return new Z(() => ({ first: this.startFn(), firstDone: !1, iterator: e[Symbol.iterator]() }), (t) => {
      let r;
      if (!t.firstDone) {
        do
          if (r = this.nextFn(t.first), !r.done)
            return r;
        while (!r.done);
        t.firstDone = !0;
      }
      do
        if (r = t.iterator.next(), !r.done)
          return r;
      while (!r.done);
      return ve;
    });
  }
  join(e = ",") {
    const t = this.iterator();
    let r = "", i, s = !1;
    do
      i = t.next(), i.done || (s && (r += e), r += yd(i.value)), s = !0;
    while (!i.done);
    return r;
  }
  indexOf(e, t = 0) {
    const r = this.iterator();
    let i = 0, s = r.next();
    for (; !s.done; ) {
      if (i >= t && s.value === e)
        return i;
      s = r.next(), i++;
    }
    return -1;
  }
  every(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (!e(r.value))
        return !1;
      r = t.next();
    }
    return !0;
  }
  some(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (e(r.value))
        return !0;
      r = t.next();
    }
    return !1;
  }
  forEach(e) {
    const t = this.iterator();
    let r = 0, i = t.next();
    for (; !i.done; )
      e(i.value, r), i = t.next(), r++;
  }
  map(e) {
    return new Z(this.startFn, (t) => {
      const { done: r, value: i } = this.nextFn(t);
      return r ? ve : { done: !1, value: e(i) };
    });
  }
  filter(e) {
    return new Z(this.startFn, (t) => {
      let r;
      do
        if (r = this.nextFn(t), !r.done && e(r.value))
          return r;
      while (!r.done);
      return ve;
    });
  }
  nonNullable() {
    return this.filter((e) => e != null);
  }
  reduce(e, t) {
    const r = this.iterator();
    let i = t, s = r.next();
    for (; !s.done; )
      i === void 0 ? i = s.value : i = e(i, s.value), s = r.next();
    return i;
  }
  reduceRight(e, t) {
    return this.recursiveReduce(this.iterator(), e, t);
  }
  recursiveReduce(e, t, r) {
    const i = e.next();
    if (i.done)
      return r;
    const s = this.recursiveReduce(e, t, r);
    return s === void 0 ? i.value : t(s, i.value);
  }
  find(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (e(r.value))
        return r.value;
      r = t.next();
    }
  }
  findIndex(e) {
    const t = this.iterator();
    let r = 0, i = t.next();
    for (; !i.done; ) {
      if (e(i.value))
        return r;
      i = t.next(), r++;
    }
    return -1;
  }
  includes(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (r.value === e)
        return !0;
      r = t.next();
    }
    return !1;
  }
  flatMap(e) {
    return new Z(() => ({ this: this.startFn() }), (t) => {
      do {
        if (t.iterator) {
          const s = t.iterator.next();
          if (s.done)
            t.iterator = void 0;
          else
            return s;
        }
        const { done: r, value: i } = this.nextFn(t.this);
        if (!r) {
          const s = e(i);
          if (Wr(s))
            t.iterator = s[Symbol.iterator]();
          else
            return { done: !1, value: s };
        }
      } while (t.iterator);
      return ve;
    });
  }
  flat(e) {
    if (e === void 0 && (e = 1), e <= 0)
      return this;
    const t = e > 1 ? this.flat(e - 1) : this;
    return new Z(() => ({ this: t.startFn() }), (r) => {
      do {
        if (r.iterator) {
          const a = r.iterator.next();
          if (a.done)
            r.iterator = void 0;
          else
            return a;
        }
        const { done: i, value: s } = t.nextFn(r.this);
        if (!i)
          if (Wr(s))
            r.iterator = s[Symbol.iterator]();
          else
            return { done: !1, value: s };
      } while (r.iterator);
      return ve;
    });
  }
  head() {
    const t = this.iterator().next();
    if (!t.done)
      return t.value;
  }
  tail(e = 1) {
    return new Z(() => {
      const t = this.startFn();
      for (let r = 0; r < e; r++)
        if (this.nextFn(t).done)
          return t;
      return t;
    }, this.nextFn);
  }
  limit(e) {
    return new Z(() => ({ size: 0, state: this.startFn() }), (t) => (t.size++, t.size > e ? ve : this.nextFn(t.state)));
  }
  distinct(e) {
    return new Z(() => ({ set: /* @__PURE__ */ new Set(), internalState: this.startFn() }), (t) => {
      let r;
      do
        if (r = this.nextFn(t.internalState), !r.done) {
          const i = e ? e(r.value) : r.value;
          if (!t.set.has(i))
            return t.set.add(i), r;
        }
      while (!r.done);
      return ve;
    });
  }
  exclude(e, t) {
    const r = /* @__PURE__ */ new Set();
    for (const i of e) {
      const s = t ? t(i) : i;
      r.add(s);
    }
    return this.filter((i) => {
      const s = t ? t(i) : i;
      return !r.has(s);
    });
  }
}
function yd(n) {
  return typeof n == "string" ? n : typeof n > "u" ? "undefined" : typeof n.toString == "function" ? n.toString() : Object.prototype.toString.call(n);
}
function Wr(n) {
  return !!n && typeof n[Symbol.iterator] == "function";
}
const Td = new Z(() => {
}, () => ve), ve = Object.freeze({ done: !0, value: void 0 });
function ee(...n) {
  if (n.length === 1) {
    const e = n[0];
    if (e instanceof Z)
      return e;
    if (Wr(e))
      return new Z(() => e[Symbol.iterator](), (t) => t.next());
    if (typeof e.length == "number")
      return new Z(() => ({ index: 0 }), (t) => t.index < e.length ? { done: !1, value: e[t.index++] } : ve);
  }
  return n.length > 1 ? new Z(() => ({ collIndex: 0, arrIndex: 0 }), (e) => {
    do {
      if (e.iterator) {
        const t = e.iterator.next();
        if (!t.done)
          return t;
        e.iterator = void 0;
      }
      if (e.array) {
        if (e.arrIndex < e.array.length)
          return { done: !1, value: e.array[e.arrIndex++] };
        e.array = void 0, e.arrIndex = 0;
      }
      if (e.collIndex < n.length) {
        const t = n[e.collIndex++];
        Wr(t) ? e.iterator = t[Symbol.iterator]() : t && typeof t.length == "number" && (e.array = t);
      }
    } while (e.iterator || e.array || e.collIndex < n.length);
    return ve;
  }) : Td;
}
class Ws extends Z {
  constructor(e, t, r) {
    super(() => ({
      iterators: r != null && r.includeRoot ? [[e][Symbol.iterator]()] : [t(e)[Symbol.iterator]()],
      pruned: !1
    }), (i) => {
      for (i.pruned && (i.iterators.pop(), i.pruned = !1); i.iterators.length > 0; ) {
        const a = i.iterators[i.iterators.length - 1].next();
        if (a.done)
          i.iterators.pop();
        else
          return i.iterators.push(t(a.value)[Symbol.iterator]()), a;
      }
      return ve;
    });
  }
  iterator() {
    const e = {
      state: this.startFn(),
      next: () => this.nextFn(e.state),
      prune: () => {
        e.state.pruned = !0;
      },
      [Symbol.iterator]: () => e
    };
    return e;
  }
}
var is;
(function(n) {
  function e(s) {
    return s.reduce((a, o) => a + o, 0);
  }
  n.sum = e;
  function t(s) {
    return s.reduce((a, o) => a * o, 0);
  }
  n.product = t;
  function r(s) {
    return s.reduce((a, o) => Math.min(a, o));
  }
  n.min = r;
  function i(s) {
    return s.reduce((a, o) => Math.max(a, o));
  }
  n.max = i;
})(is || (is = {}));
function ss(n) {
  return new Ws(n, (e) => Xn(e) ? e.content : [], { includeRoot: !0 });
}
function Rd(n, e) {
  for (; n.container; )
    if (n = n.container, n === e)
      return !0;
  return !1;
}
function as(n) {
  return {
    start: {
      character: n.startColumn - 1,
      line: n.startLine - 1
    },
    end: {
      character: n.endColumn,
      // endColumn uses the correct index
      line: n.endLine - 1
    }
  };
}
function Hr(n) {
  if (!n)
    return;
  const { offset: e, end: t, range: r } = n;
  return {
    range: r,
    offset: e,
    end: t,
    length: t - e
  };
}
var je;
(function(n) {
  n[n.Before = 0] = "Before", n[n.After = 1] = "After", n[n.OverlapFront = 2] = "OverlapFront", n[n.OverlapBack = 3] = "OverlapBack", n[n.Inside = 4] = "Inside", n[n.Outside = 5] = "Outside";
})(je || (je = {}));
function vd(n, e) {
  if (n.end.line < e.start.line || n.end.line === e.start.line && n.end.character <= e.start.character)
    return je.Before;
  if (n.start.line > e.end.line || n.start.line === e.end.line && n.start.character >= e.end.character)
    return je.After;
  const t = n.start.line > e.start.line || n.start.line === e.start.line && n.start.character >= e.start.character, r = n.end.line < e.end.line || n.end.line === e.end.line && n.end.character <= e.end.character;
  return t && r ? je.Inside : t ? je.OverlapBack : r ? je.OverlapFront : je.Outside;
}
function Ad(n, e) {
  return vd(n, e) > je.After;
}
const Ed = /^[\w\p{L}]$/u;
function kd(n, e) {
  if (n) {
    const t = $d(n, !0);
    if (t && Aa(t, e))
      return t;
    if (Pl(n)) {
      const r = n.content.findIndex((i) => !i.hidden);
      for (let i = r - 1; i >= 0; i--) {
        const s = n.content[i];
        if (Aa(s, e))
          return s;
      }
    }
  }
}
function Aa(n, e) {
  return bl(n) && e.includes(n.tokenType.name);
}
function $d(n, e = !0) {
  for (; n.container; ) {
    const t = n.container;
    let r = t.content.indexOf(n);
    for (; r > 0; ) {
      r--;
      const i = t.content[r];
      if (e || !i.hidden)
        return i;
    }
    n = t;
  }
}
class Ml extends Error {
  constructor(e, t) {
    super(e ? `${t} at ${e.range.start.line}:${e.range.start.character}` : t);
  }
}
function er(n) {
  throw new Error("Error! The input value was not handled.");
}
const or = "AbstractRule", lr = "AbstractType", wi = "Condition", Ea = "TypeDefinition", _i = "ValueLiteral", fn = "AbstractElement";
function xd(n) {
  return M.isInstance(n, fn);
}
const ur = "ArrayLiteral", cr = "ArrayType", hn = "BooleanLiteral";
function Sd(n) {
  return M.isInstance(n, hn);
}
const pn = "Conjunction";
function Id(n) {
  return M.isInstance(n, pn);
}
const mn = "Disjunction";
function Cd(n) {
  return M.isInstance(n, mn);
}
const dr = "Grammar", Li = "GrammarImport", gn = "InferredType";
function Dl(n) {
  return M.isInstance(n, gn);
}
const yn = "Interface";
function Fl(n) {
  return M.isInstance(n, yn);
}
const Oi = "NamedArgument", Tn = "Negation";
function Nd(n) {
  return M.isInstance(n, Tn);
}
const fr = "NumberLiteral", hr = "Parameter", Rn = "ParameterReference";
function wd(n) {
  return M.isInstance(n, Rn);
}
const vn = "ParserRule";
function we(n) {
  return M.isInstance(n, vn);
}
const pr = "ReferenceType", wr = "ReturnType";
function _d(n) {
  return M.isInstance(n, wr);
}
const An = "SimpleType";
function Ld(n) {
  return M.isInstance(n, An);
}
const mr = "StringLiteral", Nt = "TerminalRule";
function kt(n) {
  return M.isInstance(n, Nt);
}
const En = "Type";
function Gl(n) {
  return M.isInstance(n, En);
}
const bi = "TypeAttribute", gr = "UnionType", kn = "Action";
function mi(n) {
  return M.isInstance(n, kn);
}
const $n = "Alternatives";
function Ul(n) {
  return M.isInstance(n, $n);
}
const xn = "Assignment";
function gt(n) {
  return M.isInstance(n, xn);
}
const Sn = "CharacterRange";
function Od(n) {
  return M.isInstance(n, Sn);
}
const In = "CrossReference";
function Hs(n) {
  return M.isInstance(n, In);
}
const Cn = "EndOfFile";
function bd(n) {
  return M.isInstance(n, Cn);
}
const Nn = "Group";
function js(n) {
  return M.isInstance(n, Nn);
}
const wn = "Keyword";
function yt(n) {
  return M.isInstance(n, wn);
}
const _n = "NegatedToken";
function Pd(n) {
  return M.isInstance(n, _n);
}
const Ln = "RegexToken";
function Md(n) {
  return M.isInstance(n, Ln);
}
const On = "RuleCall";
function Tt(n) {
  return M.isInstance(n, On);
}
const bn = "TerminalAlternatives";
function Dd(n) {
  return M.isInstance(n, bn);
}
const Pn = "TerminalGroup";
function Fd(n) {
  return M.isInstance(n, Pn);
}
const Mn = "TerminalRuleCall";
function Gd(n) {
  return M.isInstance(n, Mn);
}
const Dn = "UnorderedGroup";
function Bl(n) {
  return M.isInstance(n, Dn);
}
const Fn = "UntilToken";
function Ud(n) {
  return M.isInstance(n, Fn);
}
const Gn = "Wildcard";
function Bd(n) {
  return M.isInstance(n, Gn);
}
class Vl extends Ol {
  getAllTypes() {
    return [fn, or, lr, kn, $n, ur, cr, xn, hn, Sn, wi, pn, In, mn, Cn, dr, Li, Nn, gn, yn, wn, Oi, _n, Tn, fr, hr, Rn, vn, pr, Ln, wr, On, An, mr, bn, Pn, Nt, Mn, En, bi, Ea, gr, Dn, Fn, _i, Gn];
  }
  computeIsSubtype(e, t) {
    switch (e) {
      case kn:
      case $n:
      case xn:
      case Sn:
      case In:
      case Cn:
      case Nn:
      case wn:
      case _n:
      case Ln:
      case On:
      case bn:
      case Pn:
      case Mn:
      case Dn:
      case Fn:
      case Gn:
        return this.isSubtype(fn, t);
      case ur:
      case fr:
      case mr:
        return this.isSubtype(_i, t);
      case cr:
      case pr:
      case An:
      case gr:
        return this.isSubtype(Ea, t);
      case hn:
        return this.isSubtype(wi, t) || this.isSubtype(_i, t);
      case pn:
      case mn:
      case Tn:
      case Rn:
        return this.isSubtype(wi, t);
      case gn:
      case yn:
      case En:
        return this.isSubtype(lr, t);
      case vn:
        return this.isSubtype(or, t) || this.isSubtype(lr, t);
      case Nt:
        return this.isSubtype(or, t);
      default:
        return !1;
    }
  }
  getReferenceType(e) {
    const t = `${e.container.$type}:${e.property}`;
    switch (t) {
      case "Action:type":
      case "CrossReference:type":
      case "Interface:superTypes":
      case "ParserRule:returnType":
      case "SimpleType:typeRef":
        return lr;
      case "Grammar:hiddenTokens":
      case "ParserRule:hiddenTokens":
      case "RuleCall:rule":
        return or;
      case "Grammar:usedGrammars":
        return dr;
      case "NamedArgument:parameter":
      case "ParameterReference:parameter":
        return hr;
      case "TerminalRuleCall:rule":
        return Nt;
      default:
        throw new Error(`${t} is not a valid reference id.`);
    }
  }
  getTypeMetaData(e) {
    switch (e) {
      case fn:
        return {
          name: fn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      case ur:
        return {
          name: ur,
          properties: [
            { name: "elements", defaultValue: [] }
          ]
        };
      case cr:
        return {
          name: cr,
          properties: [
            { name: "elementType" }
          ]
        };
      case hn:
        return {
          name: hn,
          properties: [
            { name: "true", defaultValue: !1 }
          ]
        };
      case pn:
        return {
          name: pn,
          properties: [
            { name: "left" },
            { name: "right" }
          ]
        };
      case mn:
        return {
          name: mn,
          properties: [
            { name: "left" },
            { name: "right" }
          ]
        };
      case dr:
        return {
          name: dr,
          properties: [
            { name: "definesHiddenTokens", defaultValue: !1 },
            { name: "hiddenTokens", defaultValue: [] },
            { name: "imports", defaultValue: [] },
            { name: "interfaces", defaultValue: [] },
            { name: "isDeclared", defaultValue: !1 },
            { name: "name" },
            { name: "rules", defaultValue: [] },
            { name: "types", defaultValue: [] },
            { name: "usedGrammars", defaultValue: [] }
          ]
        };
      case Li:
        return {
          name: Li,
          properties: [
            { name: "path" }
          ]
        };
      case gn:
        return {
          name: gn,
          properties: [
            { name: "name" }
          ]
        };
      case yn:
        return {
          name: yn,
          properties: [
            { name: "attributes", defaultValue: [] },
            { name: "name" },
            { name: "superTypes", defaultValue: [] }
          ]
        };
      case Oi:
        return {
          name: Oi,
          properties: [
            { name: "calledByName", defaultValue: !1 },
            { name: "parameter" },
            { name: "value" }
          ]
        };
      case Tn:
        return {
          name: Tn,
          properties: [
            { name: "value" }
          ]
        };
      case fr:
        return {
          name: fr,
          properties: [
            { name: "value" }
          ]
        };
      case hr:
        return {
          name: hr,
          properties: [
            { name: "name" }
          ]
        };
      case Rn:
        return {
          name: Rn,
          properties: [
            { name: "parameter" }
          ]
        };
      case vn:
        return {
          name: vn,
          properties: [
            { name: "dataType" },
            { name: "definesHiddenTokens", defaultValue: !1 },
            { name: "definition" },
            { name: "entry", defaultValue: !1 },
            { name: "fragment", defaultValue: !1 },
            { name: "hiddenTokens", defaultValue: [] },
            { name: "inferredType" },
            { name: "name" },
            { name: "parameters", defaultValue: [] },
            { name: "returnType" },
            { name: "wildcard", defaultValue: !1 }
          ]
        };
      case pr:
        return {
          name: pr,
          properties: [
            { name: "referenceType" }
          ]
        };
      case wr:
        return {
          name: wr,
          properties: [
            { name: "name" }
          ]
        };
      case An:
        return {
          name: An,
          properties: [
            { name: "primitiveType" },
            { name: "stringType" },
            { name: "typeRef" }
          ]
        };
      case mr:
        return {
          name: mr,
          properties: [
            { name: "value" }
          ]
        };
      case Nt:
        return {
          name: Nt,
          properties: [
            { name: "definition" },
            { name: "fragment", defaultValue: !1 },
            { name: "hidden", defaultValue: !1 },
            { name: "name" },
            { name: "type" }
          ]
        };
      case En:
        return {
          name: En,
          properties: [
            { name: "name" },
            { name: "type" }
          ]
        };
      case bi:
        return {
          name: bi,
          properties: [
            { name: "defaultValue" },
            { name: "isOptional", defaultValue: !1 },
            { name: "name" },
            { name: "type" }
          ]
        };
      case gr:
        return {
          name: gr,
          properties: [
            { name: "types", defaultValue: [] }
          ]
        };
      case kn:
        return {
          name: kn,
          properties: [
            { name: "cardinality" },
            { name: "feature" },
            { name: "inferredType" },
            { name: "lookahead" },
            { name: "operator" },
            { name: "type" }
          ]
        };
      case $n:
        return {
          name: $n,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case xn:
        return {
          name: xn,
          properties: [
            { name: "cardinality" },
            { name: "feature" },
            { name: "lookahead" },
            { name: "operator" },
            { name: "terminal" }
          ]
        };
      case Sn:
        return {
          name: Sn,
          properties: [
            { name: "cardinality" },
            { name: "left" },
            { name: "lookahead" },
            { name: "right" }
          ]
        };
      case In:
        return {
          name: In,
          properties: [
            { name: "cardinality" },
            { name: "deprecatedSyntax", defaultValue: !1 },
            { name: "lookahead" },
            { name: "terminal" },
            { name: "type" }
          ]
        };
      case Cn:
        return {
          name: Cn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      case Nn:
        return {
          name: Nn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "guardCondition" },
            { name: "lookahead" }
          ]
        };
      case wn:
        return {
          name: wn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "value" }
          ]
        };
      case _n:
        return {
          name: _n,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "terminal" }
          ]
        };
      case Ln:
        return {
          name: Ln,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "regex" }
          ]
        };
      case On:
        return {
          name: On,
          properties: [
            { name: "arguments", defaultValue: [] },
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "rule" }
          ]
        };
      case bn:
        return {
          name: bn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case Pn:
        return {
          name: Pn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case Mn:
        return {
          name: Mn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "rule" }
          ]
        };
      case Dn:
        return {
          name: Dn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case Fn:
        return {
          name: Fn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "terminal" }
          ]
        };
      case Gn:
        return {
          name: Gn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      default:
        return {
          name: e,
          properties: []
        };
    }
  }
}
const M = new Vl();
function Vd(n) {
  for (const [e, t] of Object.entries(n))
    e.startsWith("$") || (Array.isArray(t) ? t.forEach((r, i) => {
      ae(r) && (r.$container = n, r.$containerProperty = e, r.$containerIndex = i);
    }) : ae(t) && (t.$container = n, t.$containerProperty = e));
}
function gi(n, e) {
  let t = n;
  for (; t; ) {
    if (e(t))
      return t;
    t = t.$container;
  }
}
function et(n) {
  const t = os(n).$document;
  if (!t)
    throw new Error("AST node has no document.");
  return t;
}
function os(n) {
  for (; n.$container; )
    n = n.$container;
  return n;
}
function zs(n, e) {
  if (!n)
    throw new Error("Node must be an AstNode.");
  const t = e == null ? void 0 : e.range;
  return new Z(() => ({
    keys: Object.keys(n),
    keyIndex: 0,
    arrayIndex: 0
  }), (r) => {
    for (; r.keyIndex < r.keys.length; ) {
      const i = r.keys[r.keyIndex];
      if (!i.startsWith("$")) {
        const s = n[i];
        if (ae(s)) {
          if (r.keyIndex++, ka(s, t))
            return { done: !1, value: s };
        } else if (Array.isArray(s)) {
          for (; r.arrayIndex < s.length; ) {
            const a = r.arrayIndex++, o = s[a];
            if (ae(o) && ka(o, t))
              return { done: !1, value: o };
          }
          r.arrayIndex = 0;
        }
      }
      r.keyIndex++;
    }
    return ve;
  });
}
function tr(n, e) {
  if (!n)
    throw new Error("Root node must be an AstNode.");
  return new Ws(n, (t) => zs(t, e));
}
function _t(n, e) {
  if (!n)
    throw new Error("Root node must be an AstNode.");
  return new Ws(n, (t) => zs(t, e), { includeRoot: !0 });
}
function ka(n, e) {
  var t;
  if (!e)
    return !0;
  const r = (t = n.$cstNode) === null || t === void 0 ? void 0 : t.range;
  return r ? Ad(r, e) : !1;
}
function Kl(n) {
  return new Z(() => ({
    keys: Object.keys(n),
    keyIndex: 0,
    arrayIndex: 0
  }), (e) => {
    for (; e.keyIndex < e.keys.length; ) {
      const t = e.keys[e.keyIndex];
      if (!t.startsWith("$")) {
        const r = n[t];
        if (Ue(r))
          return e.keyIndex++, { done: !1, value: { reference: r, container: n, property: t } };
        if (Array.isArray(r)) {
          for (; e.arrayIndex < r.length; ) {
            const i = e.arrayIndex++, s = r[i];
            if (Ue(s))
              return { done: !1, value: { reference: s, container: n, property: t, index: i } };
          }
          e.arrayIndex = 0;
        }
      }
      e.keyIndex++;
    }
    return ve;
  });
}
function Kd(n, e) {
  const t = n.getTypeMetaData(e.$type), r = e;
  for (const i of t.properties)
    i.defaultValue !== void 0 && r[i.name] === void 0 && (r[i.name] = Wl(i.defaultValue));
}
function Wl(n) {
  return Array.isArray(n) ? [...n.map(Wl)] : n;
}
function w(n) {
  return n.charCodeAt(0);
}
function Pi(n, e) {
  Array.isArray(n) ? n.forEach(function(t) {
    e.push(t);
  }) : e.push(n);
}
function un(n, e) {
  if (n[e] === !0)
    throw "duplicate flag " + e;
  n[e], n[e] = !0;
}
function Ct(n) {
  if (n === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
function Wd() {
  throw Error("Internal Error - Should never get here!");
}
function $a(n) {
  return n.type === "Character";
}
const jr = [];
for (let n = w("0"); n <= w("9"); n++)
  jr.push(n);
const zr = [w("_")].concat(jr);
for (let n = w("a"); n <= w("z"); n++)
  zr.push(n);
for (let n = w("A"); n <= w("Z"); n++)
  zr.push(n);
const xa = [
  w(" "),
  w("\f"),
  w(`
`),
  w("\r"),
  w("	"),
  w("\v"),
  w("	"),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w("\u2028"),
  w("\u2029"),
  w(" "),
  w(" "),
  w("　"),
  w("\uFEFF")
], Hd = /[0-9a-fA-F]/, yr = /[0-9]/, jd = /[1-9]/;
class Hl {
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    const t = this.disjunction();
    this.consumeChar("/");
    const r = {
      type: "Flags",
      loc: { begin: this.idx, end: e.length },
      global: !1,
      ignoreCase: !1,
      multiLine: !1,
      unicode: !1,
      sticky: !1
    };
    for (; this.isRegExpFlag(); )
      switch (this.popChar()) {
        case "g":
          un(r, "global");
          break;
        case "i":
          un(r, "ignoreCase");
          break;
        case "m":
          un(r, "multiLine");
          break;
        case "u":
          un(r, "unicode");
          break;
        case "y":
          un(r, "sticky");
          break;
      }
    if (this.idx !== this.input.length)
      throw Error("Redundant input: " + this.input.substring(this.idx));
    return {
      type: "Pattern",
      flags: r,
      value: t,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const e = [], t = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; )
      this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(t) };
  }
  alternative() {
    const e = [], t = this.idx;
    for (; this.isTerm(); )
      e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(t) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    const e = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(e)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      // '\b' or '\B'
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(e)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(e)
            };
        }
        throw Error("Invalid Assertion Escape");
      // '(?=' or '(?!'
      case "(":
        this.consumeChar("?");
        let t;
        switch (this.popChar()) {
          case "=":
            t = "Lookahead";
            break;
          case "!":
            t = "NegativeLookahead";
            break;
        }
        Ct(t);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: t,
          value: r,
          loc: this.loc(e)
        };
    }
    return Wd();
  }
  quantifier(e = !1) {
    let t;
    const r = this.idx;
    switch (this.popChar()) {
      case "*":
        t = {
          atLeast: 0,
          atMost: 1 / 0
        };
        break;
      case "+":
        t = {
          atLeast: 1,
          atMost: 1 / 0
        };
        break;
      case "?":
        t = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const i = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            t = {
              atLeast: i,
              atMost: i
            };
            break;
          case ",":
            let s;
            this.isDigit() ? (s = this.integerIncludingZero(), t = {
              atLeast: i,
              atMost: s
            }) : t = {
              atLeast: i,
              atMost: 1 / 0
            }, this.consumeChar("}");
            break;
        }
        if (e === !0 && t === void 0)
          return;
        Ct(t);
        break;
    }
    if (!(e === !0 && t === void 0) && Ct(t))
      return this.peekChar(0) === "?" ? (this.consumeChar("?"), t.greedy = !1) : t.greedy = !0, t.type = "Quantifier", t.loc = this.loc(r), t;
  }
  atom() {
    let e;
    const t = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), Ct(e))
      return e.loc = this.loc(t), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
  }
  dotAll() {
    return this.consumeChar("."), {
      type: "Set",
      complement: !0,
      value: [w(`
`), w("\r"), w("\u2028"), w("\u2029")]
    };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, t = !1;
    switch (this.popChar()) {
      case "d":
        e = jr;
        break;
      case "D":
        e = jr, t = !0;
        break;
      case "s":
        e = xa;
        break;
      case "S":
        e = xa, t = !0;
        break;
      case "w":
        e = zr;
        break;
      case "W":
        e = zr, t = !0;
        break;
    }
    if (Ct(e))
      return { type: "Set", value: e, complement: t };
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = w("\f");
        break;
      case "n":
        e = w(`
`);
        break;
      case "r":
        e = w("\r");
        break;
      case "t":
        e = w("	");
        break;
      case "v":
        e = w("\v");
        break;
    }
    if (Ct(e))
      return { type: "Character", value: e };
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const e = this.popChar();
    if (/[a-zA-Z]/.test(e) === !1)
      throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: w("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const e = this.popChar();
    return { type: "Character", value: w(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case "]":
        throw Error("TBD");
      default:
        const e = this.popChar();
        return { type: "Character", value: w(e) };
    }
  }
  characterClass() {
    const e = [];
    let t = !1;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), t = !0); this.isClassAtom(); ) {
      const r = this.classAtom();
      if (r.type, $a(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const i = this.classAtom();
        if (i.type, $a(i)) {
          if (i.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: i.value });
        } else
          Pi(r.value, e), e.push(w("-")), Pi(i.value, e);
      } else
        Pi(r.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: t, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case "]":
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      // Matches a backspace.
      // (Not to be confused with \b word boundary outside characterClass)
      case "b":
        return this.consumeChar("b"), { type: "Character", value: w("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = !0;
    switch (this.consumeChar("("), this.peekChar(0)) {
      case "?":
        this.consumeChar("?"), this.consumeChar(":"), e = !1;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const t = this.disjunction();
    this.consumeChar(")");
    const r = {
      type: "Group",
      capturing: e,
      value: t
    };
    return e && (r.idx = this.groupIdx), r;
  }
  positiveInteger() {
    let e = this.popChar();
    if (jd.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; yr.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (yr.test(e) === !1)
      throw Error("Expecting an integer");
    for (; yr.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    const e = this.popChar();
    switch (e) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "^":
      // istanbul ignore next
      case "$":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case ".":
      // istanbul ignore next
      case "*":
      // istanbul ignore next
      case "+":
      // istanbul ignore next
      case "?":
      // istanbul ignore next
      case "(":
      // istanbul ignore next
      case ")":
      // istanbul ignore next
      case "[":
      // istanbul ignore next
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: w(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return !0;
      default:
        return !1;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return yr.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter())
      return !0;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      // atomEscape
      case "[":
      // characterClass
      // TODO: isAtom must be called before isAssertion - disambiguate
      case "(":
        return !0;
      default:
        return !1;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return !0;
      // '\b' or '\B'
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return !0;
          default:
            return !1;
        }
      // '(?=' or '(?!'
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
      default:
        return !1;
    }
  }
  isQuantifier() {
    const e = this.saveState();
    try {
      return this.quantifier(!0) !== void 0;
    } catch {
      return !1;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  parseHexDigits(e) {
    let t = "";
    for (let i = 0; i < e; i++) {
      const s = this.popChar();
      if (Hd.test(s) === !1)
        throw Error("Expecting a HexDecimal digits");
      t += s;
    }
    return { type: "Character", value: parseInt(t, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    const e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e)
      throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length)
      throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}
class yi {
  visitChildren(e) {
    for (const t in e) {
      const r = e[t];
      e.hasOwnProperty(t) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((i) => {
        this.visit(i);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  // Assertion
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  // atoms
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}
const zd = /\r?\n/gm, qd = new Hl();
class Yd extends yi {
  constructor() {
    super(...arguments), this.isStarting = !0, this.endRegexpStack = [], this.multiline = !1;
  }
  get endRegex() {
    return this.endRegexpStack.join("");
  }
  reset(e) {
    this.multiline = !1, this.regex = e, this.startRegexp = "", this.isStarting = !0, this.endRegexpStack = [];
  }
  visitGroup(e) {
    e.quantifier && (this.isStarting = !1, this.endRegexpStack = []);
  }
  visitCharacter(e) {
    const t = String.fromCharCode(e.value);
    if (!this.multiline && t === `
` && (this.multiline = !0), e.quantifier)
      this.isStarting = !1, this.endRegexpStack = [];
    else {
      const r = Ti(t);
      this.endRegexpStack.push(r), this.isStarting && (this.startRegexp += r);
    }
  }
  visitSet(e) {
    if (!this.multiline) {
      const t = this.regex.substring(e.loc.begin, e.loc.end), r = new RegExp(t);
      this.multiline = !!`
`.match(r);
    }
    if (e.quantifier)
      this.isStarting = !1, this.endRegexpStack = [];
    else {
      const t = this.regex.substring(e.loc.begin, e.loc.end);
      this.endRegexpStack.push(t), this.isStarting && (this.startRegexp += t);
    }
  }
  visitChildren(e) {
    e.type === "Group" && e.quantifier || super.visitChildren(e);
  }
}
const Mi = new Yd();
function Xd(n) {
  try {
    return typeof n == "string" && (n = new RegExp(n)), n = n.toString(), Mi.reset(n), Mi.visit(qd.pattern(n)), Mi.multiline;
  } catch {
    return !1;
  }
}
const Jd = `\f
\r	\v              \u2028\u2029  　\uFEFF`.split("");
function ls(n) {
  const e = typeof n == "string" ? new RegExp(n) : n;
  return Jd.some((t) => e.test(t));
}
function Ti(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Qd(n) {
  return Array.prototype.map.call(n, (e) => /\w/.test(e) ? `[${e.toLowerCase()}${e.toUpperCase()}]` : Ti(e)).join("");
}
function Zd(n, e) {
  const t = ef(n), r = e.match(t);
  return !!r && r[0].length > 0;
}
function ef(n) {
  typeof n == "string" && (n = new RegExp(n));
  const e = n, t = n.source;
  let r = 0;
  function i() {
    let s = "", a;
    function o(u) {
      s += t.substr(r, u), r += u;
    }
    function l(u) {
      s += "(?:" + t.substr(r, u) + "|$)", r += u;
    }
    for (; r < t.length; )
      switch (t[r]) {
        case "\\":
          switch (t[r + 1]) {
            case "c":
              l(3);
              break;
            case "x":
              l(4);
              break;
            case "u":
              e.unicode ? t[r + 2] === "{" ? l(t.indexOf("}", r) - r + 1) : l(6) : l(2);
              break;
            case "p":
            case "P":
              e.unicode ? l(t.indexOf("}", r) - r + 1) : l(2);
              break;
            case "k":
              l(t.indexOf(">", r) - r + 1);
              break;
            default:
              l(2);
              break;
          }
          break;
        case "[":
          a = /\[(?:\\.|.)*?\]/g, a.lastIndex = r, a = a.exec(t) || [], l(a[0].length);
          break;
        case "|":
        case "^":
        case "$":
        case "*":
        case "+":
        case "?":
          o(1);
          break;
        case "{":
          a = /\{\d+,?\d*\}/g, a.lastIndex = r, a = a.exec(t), a ? o(a[0].length) : l(1);
          break;
        case "(":
          if (t[r + 1] === "?")
            switch (t[r + 2]) {
              case ":":
                s += "(?:", r += 3, s += i() + "|$)";
                break;
              case "=":
                s += "(?=", r += 3, s += i() + ")";
                break;
              case "!":
                a = r, r += 3, i(), s += t.substr(a, r - a);
                break;
              case "<":
                switch (t[r + 3]) {
                  case "=":
                  case "!":
                    a = r, r += 4, i(), s += t.substr(a, r - a);
                    break;
                  default:
                    o(t.indexOf(">", r) - r + 1), s += i() + "|$)";
                    break;
                }
                break;
            }
          else
            o(1), s += i() + "|$)";
          break;
        case ")":
          return ++r, s;
        default:
          l(1);
          break;
      }
    return s;
  }
  return new RegExp(i(), n.flags);
}
function tf(n) {
  return n.rules.find((e) => we(e) && e.entry);
}
function nf(n) {
  return n.rules.filter((e) => kt(e) && e.hidden);
}
function jl(n, e) {
  const t = /* @__PURE__ */ new Set(), r = tf(n);
  if (!r)
    return new Set(n.rules);
  const i = [r].concat(nf(n));
  for (const a of i)
    zl(a, t, e);
  const s = /* @__PURE__ */ new Set();
  for (const a of n.rules)
    (t.has(a.name) || kt(a) && a.hidden) && s.add(a);
  return s;
}
function zl(n, e, t) {
  e.add(n.name), tr(n).forEach((r) => {
    if (Tt(r) || t) {
      const i = r.rule.ref;
      i && !e.has(i.name) && zl(i, e, t);
    }
  });
}
function rf(n) {
  if (n.terminal)
    return n.terminal;
  if (n.type.ref) {
    const e = Yl(n.type.ref);
    return e == null ? void 0 : e.terminal;
  }
}
function sf(n) {
  return n.hidden && !ls(Js(n));
}
function af(n, e) {
  return !n || !e ? [] : qs(n, e, n.astNode, !0);
}
function ql(n, e, t) {
  if (!n || !e)
    return;
  const r = qs(n, e, n.astNode, !0);
  if (r.length !== 0)
    return t !== void 0 ? t = Math.max(0, Math.min(t, r.length - 1)) : t = 0, r[t];
}
function qs(n, e, t, r) {
  if (!r) {
    const i = gi(n.grammarSource, gt);
    if (i && i.feature === e)
      return [n];
  }
  return Xn(n) && n.astNode === t ? n.content.flatMap((i) => qs(i, e, t, !1)) : [];
}
function of(n, e, t) {
  if (!n)
    return;
  const r = lf(n, e, n == null ? void 0 : n.astNode);
  if (r.length !== 0)
    return t !== void 0 ? t = Math.max(0, Math.min(t, r.length - 1)) : t = 0, r[t];
}
function lf(n, e, t) {
  if (n.astNode !== t)
    return [];
  if (yt(n.grammarSource) && n.grammarSource.value === e)
    return [n];
  const r = ss(n).iterator();
  let i;
  const s = [];
  do
    if (i = r.next(), !i.done) {
      const a = i.value;
      a.astNode === t ? yt(a.grammarSource) && a.grammarSource.value === e && s.push(a) : r.prune();
    }
  while (!i.done);
  return s;
}
function uf(n) {
  var e;
  const t = n.astNode;
  for (; t === ((e = n.container) === null || e === void 0 ? void 0 : e.astNode); ) {
    const r = gi(n.grammarSource, gt);
    if (r)
      return r;
    n = n.container;
  }
}
function Yl(n) {
  let e = n;
  return Dl(e) && (mi(e.$container) ? e = e.$container.$container : we(e.$container) ? e = e.$container : er(e.$container)), Xl(n, e, /* @__PURE__ */ new Map());
}
function Xl(n, e, t) {
  var r;
  function i(s, a) {
    let o;
    return gi(s, gt) || (o = Xl(a, a, t)), t.set(n, o), o;
  }
  if (t.has(n))
    return t.get(n);
  t.set(n, void 0);
  for (const s of tr(e)) {
    if (gt(s) && s.feature.toLowerCase() === "name")
      return t.set(n, s), s;
    if (Tt(s) && we(s.rule.ref))
      return i(s, s.rule.ref);
    if (Ld(s) && (!((r = s.typeRef) === null || r === void 0) && r.ref))
      return i(s, s.typeRef.ref);
  }
}
function Jl(n) {
  return Ql(n, /* @__PURE__ */ new Set());
}
function Ql(n, e) {
  if (e.has(n))
    return !0;
  e.add(n);
  for (const t of tr(n))
    if (Tt(t)) {
      if (!t.rule.ref || we(t.rule.ref) && !Ql(t.rule.ref, e))
        return !1;
    } else {
      if (gt(t))
        return !1;
      if (mi(t))
        return !1;
    }
  return !!n.definition;
}
function Ys(n) {
  if (n.inferredType)
    return n.inferredType.name;
  if (n.dataType)
    return n.dataType;
  if (n.returnType) {
    const e = n.returnType.ref;
    if (e) {
      if (we(e))
        return e.name;
      if (Fl(e) || Gl(e))
        return e.name;
    }
  }
}
function Xs(n) {
  var e;
  if (we(n))
    return Jl(n) ? n.name : (e = Ys(n)) !== null && e !== void 0 ? e : n.name;
  if (Fl(n) || Gl(n) || _d(n))
    return n.name;
  if (mi(n)) {
    const t = cf(n);
    if (t)
      return t;
  } else if (Dl(n))
    return n.name;
  throw new Error("Cannot get name of Unknown Type");
}
function cf(n) {
  var e;
  if (n.inferredType)
    return n.inferredType.name;
  if (!((e = n.type) === null || e === void 0) && e.ref)
    return Xs(n.type.ref);
}
function df(n) {
  var e, t, r;
  return kt(n) ? (t = (e = n.type) === null || e === void 0 ? void 0 : e.name) !== null && t !== void 0 ? t : "string" : (r = Ys(n)) !== null && r !== void 0 ? r : n.name;
}
function Js(n) {
  const e = {
    s: !1,
    i: !1,
    u: !1
  }, t = sn(n.definition, e), r = Object.entries(e).filter(([, i]) => i).map(([i]) => i).join("");
  return new RegExp(t, r);
}
const Qs = /[\s\S]/.source;
function sn(n, e) {
  if (Dd(n))
    return ff(n);
  if (Fd(n))
    return hf(n);
  if (Od(n))
    return gf(n);
  if (Gd(n)) {
    const t = n.rule.ref;
    if (!t)
      throw new Error("Missing rule reference.");
    return qe(sn(t.definition), {
      cardinality: n.cardinality,
      lookahead: n.lookahead
    });
  } else {
    if (Pd(n))
      return mf(n);
    if (Ud(n))
      return pf(n);
    if (Md(n)) {
      const t = n.regex.lastIndexOf("/"), r = n.regex.substring(1, t), i = n.regex.substring(t + 1);
      return e && (e.i = i.includes("i"), e.s = i.includes("s"), e.u = i.includes("u")), qe(r, {
        cardinality: n.cardinality,
        lookahead: n.lookahead,
        wrap: !1
      });
    } else {
      if (Bd(n))
        return qe(Qs, {
          cardinality: n.cardinality,
          lookahead: n.lookahead
        });
      throw new Error(`Invalid terminal element: ${n == null ? void 0 : n.$type}`);
    }
  }
}
function ff(n) {
  return qe(n.elements.map((e) => sn(e)).join("|"), {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function hf(n) {
  return qe(n.elements.map((e) => sn(e)).join(""), {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function pf(n) {
  return qe(`${Qs}*?${sn(n.terminal)}`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function mf(n) {
  return qe(`(?!${sn(n.terminal)})${Qs}*?`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function gf(n) {
  return n.right ? qe(`[${Di(n.left)}-${Di(n.right)}]`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead,
    wrap: !1
  }) : qe(Di(n.left), {
    cardinality: n.cardinality,
    lookahead: n.lookahead,
    wrap: !1
  });
}
function Di(n) {
  return Ti(n.value);
}
function qe(n, e) {
  var t;
  return (e.wrap !== !1 || e.lookahead) && (n = `(${(t = e.lookahead) !== null && t !== void 0 ? t : ""}${n})`), e.cardinality ? `${n}${e.cardinality}` : n;
}
function yf(n) {
  const e = [], t = n.Grammar;
  for (const r of t.rules)
    kt(r) && sf(r) && Xd(Js(r)) && e.push(r.name);
  return {
    multilineCommentRules: e,
    nameRegexp: Ed
  };
}
function us(n) {
  console && console.error && console.error(`Error: ${n}`);
}
function Zl(n) {
  console && console.warn && console.warn(`Warning: ${n}`);
}
function eu(n) {
  const e = (/* @__PURE__ */ new Date()).getTime(), t = n();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: t };
}
function tu(n) {
  function e() {
  }
  e.prototype = n;
  const t = new e();
  function r() {
    return typeof t.bar;
  }
  return r(), r(), n;
}
function Tf(n) {
  return Rf(n) ? n.LABEL : n.name;
}
function Rf(n) {
  return he(n.LABEL) && n.LABEL !== "";
}
class Be {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), C(this.definition, (t) => {
      t.accept(e);
    });
  }
}
class ue extends Be {
  constructor(e) {
    super([]), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}
class an extends Be {
  constructor(e) {
    super(e.definition), this.orgText = "", ke(this, Me(e, (t) => t !== void 0));
  }
}
class pe extends Be {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, ke(this, Me(e, (t) => t !== void 0));
  }
}
let ne = class extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
};
class xe extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
}
class Se extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
}
class W extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
}
class me extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
}
class ge extends Be {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, ke(this, Me(e, (t) => t !== void 0));
  }
}
class G {
  constructor(e) {
    this.idx = 1, ke(this, Me(e, (t) => t !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function vf(n) {
  return x(n, _r);
}
function _r(n) {
  function e(t) {
    return x(t, _r);
  }
  if (n instanceof ue) {
    const t = {
      type: "NonTerminal",
      name: n.nonTerminalName,
      idx: n.idx
    };
    return he(n.label) && (t.label = n.label), t;
  } else {
    if (n instanceof pe)
      return {
        type: "Alternative",
        definition: e(n.definition)
      };
    if (n instanceof ne)
      return {
        type: "Option",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof xe)
      return {
        type: "RepetitionMandatory",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof Se)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: n.idx,
        separator: _r(new G({ terminalType: n.separator })),
        definition: e(n.definition)
      };
    if (n instanceof me)
      return {
        type: "RepetitionWithSeparator",
        idx: n.idx,
        separator: _r(new G({ terminalType: n.separator })),
        definition: e(n.definition)
      };
    if (n instanceof W)
      return {
        type: "Repetition",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof ge)
      return {
        type: "Alternation",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof G) {
      const t = {
        type: "Terminal",
        name: n.terminalType.name,
        label: Tf(n.terminalType),
        idx: n.idx
      };
      he(n.label) && (t.terminalLabel = n.label);
      const r = n.terminalType.PATTERN;
      return n.terminalType.PATTERN && (t.pattern = Xe(r) ? r.source : r), t;
    } else {
      if (n instanceof an)
        return {
          type: "Rule",
          name: n.name,
          orgText: n.orgText,
          definition: e(n.definition)
        };
      throw Error("non exhaustive match");
    }
  }
}
class on {
  visit(e) {
    const t = e;
    switch (t.constructor) {
      case ue:
        return this.visitNonTerminal(t);
      case pe:
        return this.visitAlternative(t);
      case ne:
        return this.visitOption(t);
      case xe:
        return this.visitRepetitionMandatory(t);
      case Se:
        return this.visitRepetitionMandatoryWithSeparator(t);
      case me:
        return this.visitRepetitionWithSeparator(t);
      case W:
        return this.visitRepetition(t);
      case ge:
        return this.visitAlternation(t);
      case G:
        return this.visitTerminal(t);
      case an:
        return this.visitRule(t);
      /* c8 ignore next 2 */
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(e) {
  }
  /* c8 ignore next */
  visitAlternative(e) {
  }
  /* c8 ignore next */
  visitOption(e) {
  }
  /* c8 ignore next */
  visitRepetition(e) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(e) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(e) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(e) {
  }
  /* c8 ignore next */
  visitAlternation(e) {
  }
  /* c8 ignore next */
  visitTerminal(e) {
  }
  /* c8 ignore next */
  visitRule(e) {
  }
}
function Af(n) {
  return n instanceof pe || n instanceof ne || n instanceof W || n instanceof xe || n instanceof Se || n instanceof me || n instanceof G || n instanceof an;
}
function qr(n, e = []) {
  return n instanceof ne || n instanceof W || n instanceof me ? !0 : n instanceof ge ? Ll(n.definition, (r) => qr(r, e)) : n instanceof ue && de(e, n) ? !1 : n instanceof Be ? (n instanceof ue && e.push(n), be(n.definition, (r) => qr(r, e))) : !1;
}
function Ef(n) {
  return n instanceof ge;
}
function Ge(n) {
  if (n instanceof ue)
    return "SUBRULE";
  if (n instanceof ne)
    return "OPTION";
  if (n instanceof ge)
    return "OR";
  if (n instanceof xe)
    return "AT_LEAST_ONE";
  if (n instanceof Se)
    return "AT_LEAST_ONE_SEP";
  if (n instanceof me)
    return "MANY_SEP";
  if (n instanceof W)
    return "MANY";
  if (n instanceof G)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class Ri {
  walk(e, t = []) {
    C(e.definition, (r, i) => {
      const s = Q(e.definition, i + 1);
      if (r instanceof ue)
        this.walkProdRef(r, s, t);
      else if (r instanceof G)
        this.walkTerminal(r, s, t);
      else if (r instanceof pe)
        this.walkFlat(r, s, t);
      else if (r instanceof ne)
        this.walkOption(r, s, t);
      else if (r instanceof xe)
        this.walkAtLeastOne(r, s, t);
      else if (r instanceof Se)
        this.walkAtLeastOneSep(r, s, t);
      else if (r instanceof me)
        this.walkManySep(r, s, t);
      else if (r instanceof W)
        this.walkMany(r, s, t);
      else if (r instanceof ge)
        this.walkOr(r, s, t);
      else
        throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
  }
  walkFlat(e, t, r) {
    const i = t.concat(r);
    this.walk(e, i);
  }
  walkOption(e, t, r) {
    const i = t.concat(r);
    this.walk(e, i);
  }
  walkAtLeastOne(e, t, r) {
    const i = [
      new ne({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, t, r) {
    const i = Sa(e, t, r);
    this.walk(e, i);
  }
  walkMany(e, t, r) {
    const i = [
      new ne({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, i);
  }
  walkManySep(e, t, r) {
    const i = Sa(e, t, r);
    this.walk(e, i);
  }
  walkOr(e, t, r) {
    const i = t.concat(r);
    C(e.definition, (s) => {
      const a = new pe({ definition: [s] });
      this.walk(a, i);
    });
  }
}
function Sa(n, e, t) {
  return [
    new ne({
      definition: [
        new G({ terminalType: n.separator })
      ].concat(n.definition)
    })
  ].concat(e, t);
}
function nr(n) {
  if (n instanceof ue)
    return nr(n.referencedRule);
  if (n instanceof G)
    return xf(n);
  if (Af(n))
    return kf(n);
  if (Ef(n))
    return $f(n);
  throw Error("non exhaustive match");
}
function kf(n) {
  let e = [];
  const t = n.definition;
  let r = 0, i = t.length > r, s, a = !0;
  for (; i && a; )
    s = t[r], a = qr(s), e = e.concat(nr(s)), r = r + 1, i = t.length > r;
  return Ks(e);
}
function $f(n) {
  const e = x(n.definition, (t) => nr(t));
  return Ks(Ne(e));
}
function xf(n) {
  return [n.terminalType];
}
const nu = "_~IN~_";
class Sf extends Ri {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
    const i = Cf(e.referencedRule, e.idx) + this.topProd.name, s = t.concat(r), a = new pe({ definition: s }), o = nr(a);
    this.follows[i] = o;
  }
}
function If(n) {
  const e = {};
  return C(n, (t) => {
    const r = new Sf(t).startWalking();
    ke(e, r);
  }), e;
}
function Cf(n, e) {
  return n.name + e + nu;
}
let Lr = {};
const Nf = new Hl();
function vi(n) {
  const e = n.toString();
  if (Lr.hasOwnProperty(e))
    return Lr[e];
  {
    const t = Nf.pattern(e);
    return Lr[e] = t, t;
  }
}
function wf() {
  Lr = {};
}
const ru = "Complement Sets are not supported for first char optimization", Yr = `Unable to use "first char" lexer optimizations:
`;
function _f(n, e = !1) {
  try {
    const t = vi(n);
    return cs(t.value, {}, t.flags.ignoreCase);
  } catch (t) {
    if (t.message === ru)
      e && Zl(`${Yr}	Unable to optimize: < ${n.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), us(`${Yr}
	Failed parsing: < ${n.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function cs(n, e, t) {
  switch (n.type) {
    case "Disjunction":
      for (let i = 0; i < n.value.length; i++)
        cs(n.value[i], e, t);
      break;
    case "Alternative":
      const r = n.value;
      for (let i = 0; i < r.length; i++) {
        const s = r[i];
        switch (s.type) {
          case "EndAnchor":
          // A group back reference cannot affect potential starting char.
          // because if a back reference is the first production than automatically
          // the group being referenced has had to come BEFORE so its codes have already been added
          case "GroupBackReference":
          // assertions do not affect potential starting codes
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const a = s;
        switch (a.type) {
          case "Character":
            Tr(a.value, e, t);
            break;
          case "Set":
            if (a.complement === !0)
              throw Error(ru);
            C(a.value, (l) => {
              if (typeof l == "number")
                Tr(l, e, t);
              else {
                const u = l;
                if (t === !0)
                  for (let c = u.from; c <= u.to; c++)
                    Tr(c, e, t);
                else {
                  for (let c = u.from; c <= u.to && c < Bn; c++)
                    Tr(c, e, t);
                  if (u.to >= Bn) {
                    const c = u.from >= Bn ? u.from : Bn, d = u.to, h = tt(c), f = tt(d);
                    for (let m = h; m <= f; m++)
                      e[m] = m;
                  }
                }
              }
            });
            break;
          case "Group":
            cs(a.value, e, t);
            break;
          /* istanbul ignore next */
          default:
            throw Error("Non Exhaustive Match");
        }
        const o = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && ds(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
          a.type !== "Group" && o === !1
        )
          break;
      }
      break;
    /* istanbul ignore next */
    default:
      throw Error("non exhaustive match!");
  }
  return z(e);
}
function Tr(n, e, t) {
  const r = tt(n);
  e[r] = r, t === !0 && Lf(n, e);
}
function Lf(n, e) {
  const t = String.fromCharCode(n), r = t.toUpperCase();
  if (r !== t) {
    const i = tt(r.charCodeAt(0));
    e[i] = i;
  } else {
    const i = t.toLowerCase();
    if (i !== t) {
      const s = tt(i.charCodeAt(0));
      e[s] = s;
    }
  }
}
function Ia(n, e) {
  return Jt(n.value, (t) => {
    if (typeof t == "number")
      return de(e, t);
    {
      const r = t;
      return Jt(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function ds(n) {
  const e = n.quantifier;
  return e && e.atLeast === 0 ? !0 : n.value ? te(n.value) ? be(n.value, ds) : ds(n.value) : !1;
}
class Of extends yi {
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = !1;
  }
  visitChildren(e) {
    if (this.found !== !0) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    de(this.targetCharCodes, e.value) && (this.found = !0);
  }
  visitSet(e) {
    e.complement ? Ia(e, this.targetCharCodes) === void 0 && (this.found = !0) : Ia(e, this.targetCharCodes) !== void 0 && (this.found = !0);
  }
}
function Zs(n, e) {
  if (e instanceof RegExp) {
    const t = vi(e), r = new Of(n);
    return r.visit(t), r.found;
  } else
    return Jt(e, (t) => de(n, t.charCodeAt(0))) !== void 0;
}
const Rt = "PATTERN", Un = "defaultMode", Rr = "modes";
let iu = typeof new RegExp("(?:)").sticky == "boolean";
function bf(n, e) {
  e = Vs(e, {
    useSticky: iu,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (E, R) => R()
  });
  const t = e.tracer;
  t("initCharCodeToOptimizedIndexMap", () => {
    rh();
  });
  let r;
  t("Reject Lexer.NA", () => {
    r = pi(n, (E) => E[Rt] === fe.NA);
  });
  let i = !1, s;
  t("Transform Patterns", () => {
    i = !1, s = x(r, (E) => {
      const R = E[Rt];
      if (Xe(R)) {
        const I = R.source;
        return I.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        I !== "^" && I !== "$" && I !== "." && !R.ignoreCase ? I : I.length === 2 && I[0] === "\\" && // not a meta character
        !de([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], I[1]) ? I[1] : e.useSticky ? Na(R) : Ca(R);
      } else {
        if (Et(R))
          return i = !0, { exec: R };
        if (typeof R == "object")
          return i = !0, R;
        if (typeof R == "string") {
          if (R.length === 1)
            return R;
          {
            const I = R.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), F = new RegExp(I);
            return e.useSticky ? Na(F) : Ca(F);
          }
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  let a, o, l, u, c;
  t("misc mapping", () => {
    a = x(r, (E) => E.tokenTypeIdx), o = x(r, (E) => {
      const R = E.GROUP;
      if (R !== fe.SKIPPED) {
        if (he(R))
          return R;
        if (Ye(R))
          return !1;
        throw Error("non exhaustive match");
      }
    }), l = x(r, (E) => {
      const R = E.LONGER_ALT;
      if (R)
        return te(R) ? x(R, (F) => Ra(r, F)) : [Ra(r, R)];
    }), u = x(r, (E) => E.PUSH_MODE), c = x(r, (E) => N(E, "POP_MODE"));
  });
  let d;
  t("Line Terminator Handling", () => {
    const E = ou(e.lineTerminatorCharacters);
    d = x(r, (R) => !1), e.positionTracking !== "onlyOffset" && (d = x(r, (R) => N(R, "LINE_BREAKS") ? !!R.LINE_BREAKS : au(R, E) === !1 && Zs(E, R.PATTERN)));
  });
  let h, f, m, g;
  t("Misc Mapping #2", () => {
    h = x(r, su), f = x(s, eh), m = le(r, (E, R) => {
      const I = R.GROUP;
      return he(I) && I !== fe.SKIPPED && (E[I] = []), E;
    }, {}), g = x(s, (E, R) => ({
      pattern: s[R],
      longerAlt: l[R],
      canLineTerminator: d[R],
      isCustom: h[R],
      short: f[R],
      group: o[R],
      push: u[R],
      pop: c[R],
      tokenTypeIdx: a[R],
      tokenType: r[R]
    }));
  });
  let A = !0, y = [];
  return e.safeMode || t("First Char Optimization", () => {
    y = le(r, (E, R, I) => {
      if (typeof R.PATTERN == "string") {
        const F = R.PATTERN.charCodeAt(0), ie = tt(F);
        Fi(E, ie, g[I]);
      } else if (te(R.START_CHARS_HINT)) {
        let F;
        C(R.START_CHARS_HINT, (ie) => {
          const _e = typeof ie == "string" ? ie.charCodeAt(0) : ie, ye = tt(_e);
          F !== ye && (F = ye, Fi(E, ye, g[I]));
        });
      } else if (Xe(R.PATTERN))
        if (R.PATTERN.unicode)
          A = !1, e.ensureOptimizations && us(`${Yr}	Unable to analyze < ${R.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const F = _f(R.PATTERN, e.ensureOptimizations);
          D(F) && (A = !1), C(F, (ie) => {
            Fi(E, ie, g[I]);
          });
        }
      else
        e.ensureOptimizations && us(`${Yr}	TokenType: <${R.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), A = !1;
      return E;
    }, []);
  }), {
    emptyGroups: m,
    patternIdxToConfig: g,
    charCodeToPatternIdxToConfig: y,
    hasCustom: i,
    canBeOptimized: A
  };
}
function Pf(n, e) {
  let t = [];
  const r = Df(n);
  t = t.concat(r.errors);
  const i = Ff(r.valid), s = i.valid;
  return t = t.concat(i.errors), t = t.concat(Mf(s)), t = t.concat(jf(s)), t = t.concat(zf(s, e)), t = t.concat(qf(s)), t;
}
function Mf(n) {
  let e = [];
  const t = $e(n, (r) => Xe(r[Rt]));
  return e = e.concat(Uf(t)), e = e.concat(Kf(t)), e = e.concat(Wf(t)), e = e.concat(Hf(t)), e = e.concat(Bf(t)), e;
}
function Df(n) {
  const e = $e(n, (i) => !N(i, Rt)), t = x(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: H.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = hi(n, e);
  return { errors: t, valid: r };
}
function Ff(n) {
  const e = $e(n, (i) => {
    const s = i[Rt];
    return !Xe(s) && !Et(s) && !N(s, "exec") && !he(s);
  }), t = x(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: H.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = hi(n, e);
  return { errors: t, valid: r };
}
const Gf = /[^\\][$]/;
function Uf(n) {
  class e extends yi {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(s) {
      this.found = !0;
    }
  }
  const t = $e(n, (i) => {
    const s = i.PATTERN;
    try {
      const a = vi(s), o = new e();
      return o.visit(a), o.found;
    } catch {
      return Gf.test(s.source);
    }
  });
  return x(t, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: H.EOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function Bf(n) {
  const e = $e(n, (r) => r.PATTERN.test(""));
  return x(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: H.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const Vf = /[^\\[][\^]|^\^/;
function Kf(n) {
  class e extends yi {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(s) {
      this.found = !0;
    }
  }
  const t = $e(n, (i) => {
    const s = i.PATTERN;
    try {
      const a = vi(s), o = new e();
      return o.visit(a), o.found;
    } catch {
      return Vf.test(s.source);
    }
  });
  return x(t, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: H.SOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function Wf(n) {
  const e = $e(n, (r) => {
    const i = r[Rt];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return x(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: H.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function Hf(n) {
  const e = [];
  let t = x(n, (s) => le(n, (a, o) => (s.PATTERN.source === o.PATTERN.source && !de(e, o) && o.PATTERN !== fe.NA && (e.push(o), a.push(o)), a), []));
  t = Zn(t);
  const r = $e(t, (s) => s.length > 1);
  return x(r, (s) => {
    const a = x(s, (l) => l.name);
    return {
      message: `The same RegExp pattern ->${Pe(s).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`,
      type: H.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: s
    };
  });
}
function jf(n) {
  const e = $e(n, (r) => {
    if (!N(r, "GROUP"))
      return !1;
    const i = r.GROUP;
    return i !== fe.SKIPPED && i !== fe.NA && !he(i);
  });
  return x(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: H.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [r]
  }));
}
function zf(n, e) {
  const t = $e(n, (i) => i.PUSH_MODE !== void 0 && !de(e, i.PUSH_MODE));
  return x(t, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: H.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function qf(n) {
  const e = [], t = le(n, (r, i, s) => {
    const a = i.PATTERN;
    return a === fe.NA || (he(a) ? r.push({ str: a, idx: s, tokenType: i }) : Xe(a) && Xf(a) && r.push({ str: a.source, idx: s, tokenType: i })), r;
  }, []);
  return C(n, (r, i) => {
    C(t, ({ str: s, idx: a, tokenType: o }) => {
      if (i < a && Yf(s, r.PATTERN)) {
        const l = `Token: ->${o.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: l,
          type: H.UNREACHABLE_PATTERN,
          tokenTypes: [r, o]
        });
      }
    });
  }), e;
}
function Yf(n, e) {
  if (Xe(e)) {
    const t = e.exec(n);
    return t !== null && t.index === 0;
  } else {
    if (Et(e))
      return e(n, 0, [], {});
    if (N(e, "exec"))
      return e.exec(n, 0, [], {});
    if (typeof e == "string")
      return e === n;
    throw Error("non exhaustive match");
  }
}
function Xf(n) {
  return Jt([
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ], (t) => n.source.indexOf(t) !== -1) === void 0;
}
function Ca(n) {
  const e = n.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${n.source})`, e);
}
function Na(n) {
  const e = n.ignoreCase ? "iy" : "y";
  return new RegExp(`${n.source}`, e);
}
function Jf(n, e, t) {
  const r = [];
  return N(n, Un) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Un + `> property in its definition
`,
    type: H.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), N(n, Rr) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Rr + `> property in its definition
`,
    type: H.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), N(n, Rr) && N(n, Un) && !N(n.modes, n.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${Un}: <${n.defaultMode}>which does not exist
`,
    type: H.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), N(n, Rr) && C(n.modes, (i, s) => {
    C(i, (a, o) => {
      if (Ye(a))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${s}> at index: <${o}>
`,
          type: H.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (N(a, "LONGER_ALT")) {
        const l = te(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
        C(l, (u) => {
          !Ye(u) && !de(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${a.name}> outside of mode <${s}>
`,
            type: H.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function Qf(n, e, t) {
  const r = [];
  let i = !1;
  const s = Zn(Ne(z(n.modes))), a = pi(s, (l) => l[Rt] === fe.NA), o = ou(t);
  return e && C(a, (l) => {
    const u = au(l, o);
    if (u !== !1) {
      const d = {
        message: nh(l, u),
        type: u.issue,
        tokenType: l
      };
      r.push(d);
    } else
      N(l, "LINE_BREAKS") ? l.LINE_BREAKS === !0 && (i = !0) : Zs(o, l.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: H.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Zf(n) {
  const e = {}, t = Xt(n);
  return C(t, (r) => {
    const i = n[r];
    if (te(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function su(n) {
  const e = n.PATTERN;
  if (Xe(e))
    return !1;
  if (Et(e))
    return !0;
  if (N(e, "exec"))
    return !0;
  if (he(e))
    return !1;
  throw Error("non exhaustive match");
}
function eh(n) {
  return he(n) && n.length === 1 ? n.charCodeAt(0) : !1;
}
const th = {
  // implements /\n|\r\n?/g.test
  test: function(n) {
    const e = n.length;
    for (let t = this.lastIndex; t < e; t++) {
      const r = n.charCodeAt(t);
      if (r === 10)
        return this.lastIndex = t + 1, !0;
      if (r === 13)
        return n.charCodeAt(t + 1) === 10 ? this.lastIndex = t + 2 : this.lastIndex = t + 1, !0;
    }
    return !1;
  },
  lastIndex: 0
};
function au(n, e) {
  if (N(n, "LINE_BREAKS"))
    return !1;
  if (Xe(n.PATTERN)) {
    try {
      Zs(e, n.PATTERN);
    } catch (t) {
      return {
        issue: H.IDENTIFY_TERMINATOR,
        errMsg: t.message
      };
    }
    return !1;
  } else {
    if (he(n.PATTERN))
      return !1;
    if (su(n))
      return { issue: H.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function nh(n, e) {
  if (e.issue === H.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${n.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === H.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${n.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
function ou(n) {
  return x(n, (t) => he(t) ? t.charCodeAt(0) : t);
}
function Fi(n, e, t) {
  n[e] === void 0 ? n[e] = [t] : n[e].push(t);
}
const Bn = 256;
let Or = [];
function tt(n) {
  return n < Bn ? n : Or[n];
}
function rh() {
  if (D(Or)) {
    Or = new Array(65536);
    for (let n = 0; n < 65536; n++)
      Or[n] = n > 255 ? 255 + ~~(n / 255) : n;
  }
}
function rr(n, e) {
  const t = n.tokenTypeIdx;
  return t === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[t] === !0;
}
function Xr(n, e) {
  return n.tokenTypeIdx === e.tokenTypeIdx;
}
let wa = 1;
const lu = {};
function ir(n) {
  const e = ih(n);
  sh(e), oh(e), ah(e), C(e, (t) => {
    t.isParent = t.categoryMatches.length > 0;
  });
}
function ih(n) {
  let e = re(n), t = n, r = !0;
  for (; r; ) {
    t = Zn(Ne(x(t, (s) => s.CATEGORIES)));
    const i = hi(t, e);
    e = e.concat(i), D(i) ? r = !1 : t = i;
  }
  return e;
}
function sh(n) {
  C(n, (e) => {
    cu(e) || (lu[wa] = e, e.tokenTypeIdx = wa++), _a(e) && !te(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), _a(e) || (e.CATEGORIES = []), lh(e) || (e.categoryMatches = []), uh(e) || (e.categoryMatchesMap = {});
  });
}
function ah(n) {
  C(n, (e) => {
    e.categoryMatches = [], C(e.categoryMatchesMap, (t, r) => {
      e.categoryMatches.push(lu[r].tokenTypeIdx);
    });
  });
}
function oh(n) {
  C(n, (e) => {
    uu([], e);
  });
}
function uu(n, e) {
  C(n, (t) => {
    e.categoryMatchesMap[t.tokenTypeIdx] = !0;
  }), C(e.CATEGORIES, (t) => {
    const r = n.concat(e);
    de(r, t) || uu(r, t);
  });
}
function cu(n) {
  return N(n, "tokenTypeIdx");
}
function _a(n) {
  return N(n, "CATEGORIES");
}
function lh(n) {
  return N(n, "categoryMatches");
}
function uh(n) {
  return N(n, "categoryMatchesMap");
}
function ch(n) {
  return N(n, "tokenTypeIdx");
}
const fs = {
  buildUnableToPopLexerModeMessage(n) {
    return `Unable to pop Lexer Mode after encountering Token ->${n.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(n, e, t, r, i) {
    return `unexpected character: ->${n.charAt(e)}<- at offset: ${e}, skipped ${t} characters.`;
  }
};
var H;
(function(n) {
  n[n.MISSING_PATTERN = 0] = "MISSING_PATTERN", n[n.INVALID_PATTERN = 1] = "INVALID_PATTERN", n[n.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", n[n.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", n[n.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", n[n.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", n[n.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", n[n.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", n[n.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", n[n.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", n[n.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", n[n.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", n[n.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", n[n.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", n[n.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", n[n.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", n[n.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", n[n.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(H || (H = {}));
const Vn = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: fs,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(Vn);
class fe {
  constructor(e, t = Vn) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, s) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const a = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a}--> <${i}>`);
        const { time: o, value: l } = eu(s), u = o > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${a}<-- <${i}> time: ${o}ms`), this.traceInitIndent--, l;
      } else
        return s();
    }, typeof t == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = ke({}, Vn, t);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, s = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === Vn.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = th;
        else if (this.config.lineTerminatorCharacters === Vn.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (t.safeMode && t.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), te(e) ? i = {
          modes: { defaultMode: re(e) },
          defaultMode: Un
        } : (s = !1, i = re(e));
      }), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Jf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Qf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, C(i.modes, (o, l) => {
        i.modes[l] = pi(o, (u) => Ye(u));
      });
      const a = Xt(i.modes);
      if (C(i.modes, (o, l) => {
        this.TRACE_INIT(`Mode: <${l}> processing`, () => {
          if (this.modes.push(l), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Pf(o, a));
          }), D(this.lexerDefinitionErrors)) {
            ir(o);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = bf(o, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: t.positionTracking,
                ensureOptimizations: t.ensureOptimizations,
                safeMode: t.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[l] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[l] = u.charCodeToPatternIdxToConfig, this.emptyGroups = ke({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[l] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !D(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const l = x(this.lexerDefinitionErrors, (u) => u.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + l);
      }
      C(this.lexerDefinitionWarning, (o) => {
        Zl(o.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (iu ? (this.chopInput = ya, this.match = this.matchWithTest) : (this.updateLastIndex = Y, this.match = this.matchWithExec), s && (this.handleModes = Y), this.trackStartLines === !1 && (this.computeNewColumn = ya), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = Y), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const o = le(this.canModeBeOptimized, (l, u, c) => (u === !1 && l.push(c), l), []);
        if (t.ensureOptimizations && !D(o))
          throw Error(`Lexer Modes: < ${o.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        wf();
      }), this.TRACE_INIT("toFastProperties", () => {
        tu(this);
      });
    });
  }
  tokenize(e, t = this.defaultMode) {
    if (!D(this.lexerDefinitionErrors)) {
      const i = x(this.lexerDefinitionErrors, (s) => s.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + i);
    }
    return this.tokenizeInternal(e, t);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(e, t) {
    let r, i, s, a, o, l, u, c, d, h, f, m, g, A, y;
    const E = e, R = E.length;
    let I = 0, F = 0;
    const ie = this.hasCustom ? 0 : Math.floor(e.length / 10), _e = new Array(ie), ye = [];
    let Fe = this.trackStartLines ? 1 : void 0, Ie = this.trackStartLines ? 1 : void 0;
    const $ = Zf(this.emptyGroups), T = this.trackStartLines, k = this.config.lineTerminatorsPattern;
    let S = 0, O = [], L = [];
    const _ = [], Te = [];
    Object.freeze(Te);
    let q;
    function K() {
      return O;
    }
    function dt(se) {
      const Ce = tt(se), It = L[Ce];
      return It === void 0 ? Te : It;
    }
    const Nc = (se) => {
      if (_.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      se.tokenType.PUSH_MODE === void 0) {
        const Ce = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(se);
        ye.push({
          offset: se.startOffset,
          line: se.startLine,
          column: se.startColumn,
          length: se.image.length,
          message: Ce
        });
      } else {
        _.pop();
        const Ce = Qt(_);
        O = this.patternIdxToConfig[Ce], L = this.charCodeToPatternIdxToConfig[Ce], S = O.length;
        const It = this.canModeBeOptimized[Ce] && this.config.safeMode === !1;
        L && It ? q = dt : q = K;
      }
    };
    function ha(se) {
      _.push(se), L = this.charCodeToPatternIdxToConfig[se], O = this.patternIdxToConfig[se], S = O.length, S = O.length;
      const Ce = this.canModeBeOptimized[se] && this.config.safeMode === !1;
      L && Ce ? q = dt : q = K;
    }
    ha.call(this, t);
    let Le;
    const pa = this.config.recoveryEnabled;
    for (; I < R; ) {
      l = null;
      const se = E.charCodeAt(I), Ce = q(se), It = Ce.length;
      for (r = 0; r < It; r++) {
        Le = Ce[r];
        const Re = Le.pattern;
        u = null;
        const Ve = Le.short;
        if (Ve !== !1 ? se === Ve && (l = Re) : Le.isCustom === !0 ? (y = Re.exec(E, I, _e, $), y !== null ? (l = y[0], y.payload !== void 0 && (u = y.payload)) : l = null) : (this.updateLastIndex(Re, I), l = this.match(Re, e, I)), l !== null) {
          if (o = Le.longerAlt, o !== void 0) {
            const Qe = o.length;
            for (s = 0; s < Qe; s++) {
              const Ke = O[o[s]], ft = Ke.pattern;
              if (c = null, Ke.isCustom === !0 ? (y = ft.exec(E, I, _e, $), y !== null ? (a = y[0], y.payload !== void 0 && (c = y.payload)) : a = null) : (this.updateLastIndex(ft, I), a = this.match(ft, e, I)), a && a.length > l.length) {
                l = a, u = c, Le = Ke;
                break;
              }
            }
          }
          break;
        }
      }
      if (l !== null) {
        if (d = l.length, h = Le.group, h !== void 0 && (f = Le.tokenTypeIdx, m = this.createTokenInstance(l, I, f, Le.tokenType, Fe, Ie, d), this.handlePayload(m, u), h === !1 ? F = this.addToken(_e, F, m) : $[h].push(m)), e = this.chopInput(e, d), I = I + d, Ie = this.computeNewColumn(Ie, d), T === !0 && Le.canLineTerminator === !0) {
          let Re = 0, Ve, Qe;
          k.lastIndex = 0;
          do
            Ve = k.test(l), Ve === !0 && (Qe = k.lastIndex - 1, Re++);
          while (Ve === !0);
          Re !== 0 && (Fe = Fe + Re, Ie = d - Qe, this.updateTokenEndLineColumnLocation(m, h, Qe, Re, Fe, Ie, d));
        }
        this.handleModes(Le, Nc, ha, m);
      } else {
        const Re = I, Ve = Fe, Qe = Ie;
        let Ke = pa === !1;
        for (; Ke === !1 && I < R; )
          for (e = this.chopInput(e, 1), I++, i = 0; i < S; i++) {
            const ft = O[i], Ni = ft.pattern, ma = ft.short;
            if (ma !== !1 ? E.charCodeAt(I) === ma && (Ke = !0) : ft.isCustom === !0 ? Ke = Ni.exec(E, I, _e, $) !== null : (this.updateLastIndex(Ni, I), Ke = Ni.exec(e) !== null), Ke === !0)
              break;
          }
        if (g = I - Re, Ie = this.computeNewColumn(Ie, g), A = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(E, Re, g, Ve, Qe), ye.push({
          offset: Re,
          line: Ve,
          column: Qe,
          length: g,
          message: A
        }), pa === !1)
          break;
      }
    }
    return this.hasCustom || (_e.length = F), {
      tokens: _e,
      groups: $,
      errors: ye
    };
  }
  handleModes(e, t, r, i) {
    if (e.pop === !0) {
      const s = e.push;
      t(i), s !== void 0 && r.call(this, s);
    } else e.push !== void 0 && r.call(this, e.push);
  }
  chopInput(e, t) {
    return e.substring(t);
  }
  updateLastIndex(e, t) {
    e.lastIndex = t;
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(e, t, r, i, s, a, o) {
    let l, u;
    t !== void 0 && (l = r === o - 1, u = l ? -1 : 0, i === 1 && l === !0 || (e.endLine = s + u, e.endColumn = a - 1 + -u));
  }
  computeNewColumn(e, t) {
    return e + t;
  }
  createOffsetOnlyToken(e, t, r, i) {
    return {
      image: e,
      startOffset: t,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createStartOnlyToken(e, t, r, i, s, a) {
    return {
      image: e,
      startOffset: t,
      startLine: s,
      startColumn: a,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createFullToken(e, t, r, i, s, a, o) {
    return {
      image: e,
      startOffset: t,
      endOffset: t + o - 1,
      startLine: s,
      endLine: s,
      startColumn: a,
      endColumn: a + o - 1,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  addTokenUsingPush(e, t, r) {
    return e.push(r), t;
  }
  addTokenUsingMemberAccess(e, t, r) {
    return e[t] = r, t++, t;
  }
  handlePayloadNoCustom(e, t) {
  }
  handlePayloadWithCustom(e, t) {
    t !== null && (e.payload = t);
  }
  matchWithTest(e, t, r) {
    return e.test(t) === !0 ? t.substring(r, e.lastIndex) : null;
  }
  matchWithExec(e, t) {
    const r = e.exec(t);
    return r !== null ? r[0] : null;
  }
}
fe.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
fe.NA = /NOT_APPLICABLE/;
function Lt(n) {
  return du(n) ? n.LABEL : n.name;
}
function du(n) {
  return he(n.LABEL) && n.LABEL !== "";
}
const dh = "parent", La = "categories", Oa = "label", ba = "group", Pa = "push_mode", Ma = "pop_mode", Da = "longer_alt", Fa = "line_breaks", Ga = "start_chars_hint";
function fu(n) {
  return fh(n);
}
function fh(n) {
  const e = n.pattern, t = {};
  if (t.name = n.name, Ye(e) || (t.PATTERN = e), N(n, dh))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return N(n, La) && (t.CATEGORIES = n[La]), ir([t]), N(n, Oa) && (t.LABEL = n[Oa]), N(n, ba) && (t.GROUP = n[ba]), N(n, Ma) && (t.POP_MODE = n[Ma]), N(n, Pa) && (t.PUSH_MODE = n[Pa]), N(n, Da) && (t.LONGER_ALT = n[Da]), N(n, Fa) && (t.LINE_BREAKS = n[Fa]), N(n, Ga) && (t.START_CHARS_HINT = n[Ga]), t;
}
const nt = fu({ name: "EOF", pattern: fe.NA });
ir([nt]);
function ea(n, e, t, r, i, s, a, o) {
  return {
    image: e,
    startOffset: t,
    endOffset: r,
    startLine: i,
    endLine: s,
    startColumn: a,
    endColumn: o,
    tokenTypeIdx: n.tokenTypeIdx,
    tokenType: n
  };
}
function hu(n, e) {
  return rr(n, e);
}
const wt = {
  buildMismatchTokenMessage({ expected: n, actual: e, previous: t, ruleName: r }) {
    return `Expecting ${du(n) ? `--> ${Lt(n)} <--` : `token of type --> ${n.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: n, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + n.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: n, actual: e, previous: t, customUserDescription: r, ruleName: i }) {
    const s = "Expecting: ", o = `
but found: '` + Pe(e).image + "'";
    if (r)
      return s + r + o;
    {
      const l = le(n, (h, f) => h.concat(f), []), u = x(l, (h) => `[${x(h, (f) => Lt(f)).join(", ")}]`), d = `one of these possible Token sequences:
${x(u, (h, f) => `  ${f + 1}. ${h}`).join(`
`)}`;
      return s + d + o;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: n, actual: e, customUserDescription: t, ruleName: r }) {
    const i = "Expecting: ", a = `
but found: '` + Pe(e).image + "'";
    if (t)
      return i + t + a;
    {
      const l = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${x(n, (u) => `[${x(u, (c) => Lt(c)).join(",")}]`).join(" ,")}>`;
      return i + l + a;
    }
  }
};
Object.freeze(wt);
const hh = {
  buildRuleNotFoundError(n, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + n.name + "<-";
  }
}, mt = {
  buildDuplicateFoundError(n, e) {
    function t(c) {
      return c instanceof G ? c.terminalType.name : c instanceof ue ? c.nonTerminalName : "";
    }
    const r = n.name, i = Pe(e), s = i.idx, a = Ge(i), o = t(i), l = s > 0;
    let u = `->${a}${l ? s : ""}<- ${o ? `with argument: ->${o}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return u = u.replace(/[ \t]+/g, " "), u = u.replace(/\s\s+/g, `
`), u;
  },
  buildNamespaceConflictError(n) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${n.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  },
  buildAlternationPrefixAmbiguityError(n) {
    const e = x(n.prefixPath, (i) => Lt(i)).join(", "), t = n.alternation.idx === 0 ? "" : n.alternation.idx;
    return `Ambiguous alternatives: <${n.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(n) {
    const e = x(n.prefixPath, (i) => Lt(i)).join(", "), t = n.alternation.idx === 0 ? "" : n.alternation.idx;
    let r = `Ambiguous Alternatives Detected: <${n.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
    return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError(n) {
    let e = Ge(n.repetition);
    return n.repetition.idx !== 0 && (e += n.repetition.idx), `The repetition <${e}> within Rule <${n.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(n) {
    return "deprecated";
  },
  buildEmptyAlternationError(n) {
    return `Ambiguous empty alternative: <${n.emptyChoiceIdx + 1}> in <OR${n.alternation.idx}> inside <${n.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  },
  buildTooManyAlternativesError(n) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${n.alternation.idx}> inside <${n.topLevelRule.name}> Rule.
 has ${n.alternation.definition.length + 1} alternatives.`;
  },
  buildLeftRecursionError(n) {
    const e = n.topLevelRule.name, t = x(n.leftRecursionPath, (s) => s.name), r = `${e} --> ${t.concat([e]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(n) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(n) {
    let e;
    return n.topLevelRule instanceof an ? e = n.topLevelRule.name : e = n.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${n.grammarName}<-`;
  }
};
function ph(n, e) {
  const t = new mh(n, e);
  return t.resolveRefs(), t.errors;
}
class mh extends on {
  constructor(e, t) {
    super(), this.nameToTopRule = e, this.errMsgProvider = t, this.errors = [];
  }
  resolveRefs() {
    C(z(this.nameToTopRule), (e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    const t = this.nameToTopRule[e.nonTerminalName];
    if (t)
      e.referencedRule = t;
    else {
      const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({
        message: r,
        type: ce.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: e.nonTerminalName
      });
    }
  }
}
class gh extends Ri {
  constructor(e, t) {
    super(), this.topProd = e, this.path = t, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1;
  }
  startWalking() {
    if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
      throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = re(this.path.ruleStack).reverse(), this.occurrenceStack = re(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, t = []) {
    this.found || super.walk(e, t);
  }
  walkProdRef(e, t, r) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      const i = t.concat(r);
      this.updateExpectedNext(), this.walk(e.referencedRule, i);
    }
  }
  updateExpectedNext() {
    D(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}
class yh extends gh {
  constructor(e, t) {
    super(e, t), this.path = t, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, t, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const i = t.concat(r), s = new pe({ definition: i });
      this.possibleTokTypes = nr(s), this.found = !0;
    }
  }
}
class Ai extends Ri {
  constructor(e, t) {
    super(), this.topRule = e, this.occurrence = t, this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}
class Th extends Ai {
  walkMany(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, t, r);
  }
}
class Ua extends Ai {
  walkManySep(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, t, r);
  }
}
class Rh extends Ai {
  walkAtLeastOne(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, t, r);
  }
}
class Ba extends Ai {
  walkAtLeastOneSep(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, t, r);
  }
}
function hs(n, e, t = []) {
  t = re(t);
  let r = [], i = 0;
  function s(o) {
    return o.concat(Q(n, i + 1));
  }
  function a(o) {
    const l = hs(s(o), e, t);
    return r.concat(l);
  }
  for (; t.length < e && i < n.length; ) {
    const o = n[i];
    if (o instanceof pe)
      return a(o.definition);
    if (o instanceof ue)
      return a(o.definition);
    if (o instanceof ne)
      r = a(o.definition);
    else if (o instanceof xe) {
      const l = o.definition.concat([
        new W({
          definition: o.definition
        })
      ]);
      return a(l);
    } else if (o instanceof Se) {
      const l = [
        new pe({ definition: o.definition }),
        new W({
          definition: [new G({ terminalType: o.separator })].concat(o.definition)
        })
      ];
      return a(l);
    } else if (o instanceof me) {
      const l = o.definition.concat([
        new W({
          definition: [new G({ terminalType: o.separator })].concat(o.definition)
        })
      ]);
      r = a(l);
    } else if (o instanceof W) {
      const l = o.definition.concat([
        new W({
          definition: o.definition
        })
      ]);
      r = a(l);
    } else {
      if (o instanceof ge)
        return C(o.definition, (l) => {
          D(l.definition) === !1 && (r = a(l.definition));
        }), r;
      if (o instanceof G)
        t.push(o.terminalType);
      else
        throw Error("non exhaustive match");
    }
    i++;
  }
  return r.push({
    partialPath: t,
    suffixDef: Q(n, i)
  }), r;
}
function pu(n, e, t, r) {
  const i = "EXIT_NONE_TERMINAL", s = [i], a = "EXIT_ALTERNATIVE";
  let o = !1;
  const l = e.length, u = l - r - 1, c = [], d = [];
  for (d.push({
    idx: -1,
    def: n,
    ruleStack: [],
    occurrenceStack: []
  }); !D(d); ) {
    const h = d.pop();
    if (h === a) {
      o && Qt(d).idx <= u && d.pop();
      continue;
    }
    const f = h.def, m = h.idx, g = h.ruleStack, A = h.occurrenceStack;
    if (D(f))
      continue;
    const y = f[0];
    if (y === i) {
      const E = {
        idx: m,
        def: Q(f),
        ruleStack: Yn(g),
        occurrenceStack: Yn(A)
      };
      d.push(E);
    } else if (y instanceof G)
      if (m < l - 1) {
        const E = m + 1, R = e[E];
        if (t(R, y.terminalType)) {
          const I = {
            idx: E,
            def: Q(f),
            ruleStack: g,
            occurrenceStack: A
          };
          d.push(I);
        }
      } else if (m === l - 1)
        c.push({
          nextTokenType: y.terminalType,
          nextTokenOccurrence: y.idx,
          ruleStack: g,
          occurrenceStack: A
        }), o = !0;
      else
        throw Error("non exhaustive match");
    else if (y instanceof ue) {
      const E = re(g);
      E.push(y.nonTerminalName);
      const R = re(A);
      R.push(y.idx);
      const I = {
        idx: m,
        def: y.definition.concat(s, Q(f)),
        ruleStack: E,
        occurrenceStack: R
      };
      d.push(I);
    } else if (y instanceof ne) {
      const E = {
        idx: m,
        def: Q(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E), d.push(a);
      const R = {
        idx: m,
        def: y.definition.concat(Q(f)),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(R);
    } else if (y instanceof xe) {
      const E = new W({
        definition: y.definition,
        idx: y.idx
      }), R = y.definition.concat([E], Q(f)), I = {
        idx: m,
        def: R,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(I);
    } else if (y instanceof Se) {
      const E = new G({
        terminalType: y.separator
      }), R = new W({
        definition: [E].concat(y.definition),
        idx: y.idx
      }), I = y.definition.concat([R], Q(f)), F = {
        idx: m,
        def: I,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(F);
    } else if (y instanceof me) {
      const E = {
        idx: m,
        def: Q(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E), d.push(a);
      const R = new G({
        terminalType: y.separator
      }), I = new W({
        definition: [R].concat(y.definition),
        idx: y.idx
      }), F = y.definition.concat([I], Q(f)), ie = {
        idx: m,
        def: F,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(ie);
    } else if (y instanceof W) {
      const E = {
        idx: m,
        def: Q(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E), d.push(a);
      const R = new W({
        definition: y.definition,
        idx: y.idx
      }), I = y.definition.concat([R], Q(f)), F = {
        idx: m,
        def: I,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(F);
    } else if (y instanceof ge)
      for (let E = y.definition.length - 1; E >= 0; E--) {
        const R = y.definition[E], I = {
          idx: m,
          def: R.definition.concat(Q(f)),
          ruleStack: g,
          occurrenceStack: A
        };
        d.push(I), d.push(a);
      }
    else if (y instanceof pe)
      d.push({
        idx: m,
        def: y.definition.concat(Q(f)),
        ruleStack: g,
        occurrenceStack: A
      });
    else if (y instanceof an)
      d.push(vh(y, m, g, A));
    else
      throw Error("non exhaustive match");
  }
  return c;
}
function vh(n, e, t, r) {
  const i = re(t);
  i.push(n.name);
  const s = re(r);
  return s.push(1), {
    idx: e,
    def: n.definition,
    ruleStack: i,
    occurrenceStack: s
  };
}
var B;
(function(n) {
  n[n.OPTION = 0] = "OPTION", n[n.REPETITION = 1] = "REPETITION", n[n.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", n[n.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", n[n.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", n[n.ALTERNATION = 5] = "ALTERNATION";
})(B || (B = {}));
function ta(n) {
  if (n instanceof ne || n === "Option")
    return B.OPTION;
  if (n instanceof W || n === "Repetition")
    return B.REPETITION;
  if (n instanceof xe || n === "RepetitionMandatory")
    return B.REPETITION_MANDATORY;
  if (n instanceof Se || n === "RepetitionMandatoryWithSeparator")
    return B.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (n instanceof me || n === "RepetitionWithSeparator")
    return B.REPETITION_WITH_SEPARATOR;
  if (n instanceof ge || n === "Alternation")
    return B.ALTERNATION;
  throw Error("non exhaustive match");
}
function Va(n) {
  const { occurrence: e, rule: t, prodType: r, maxLookahead: i } = n, s = ta(r);
  return s === B.ALTERNATION ? Ei(e, t, i) : ki(e, t, s, i);
}
function Ah(n, e, t, r, i, s) {
  const a = Ei(n, e, t), o = yu(a) ? Xr : rr;
  return s(a, r, o, i);
}
function Eh(n, e, t, r, i, s) {
  const a = ki(n, e, i, t), o = yu(a) ? Xr : rr;
  return s(a[0], o, r);
}
function kh(n, e, t, r) {
  const i = n.length, s = be(n, (a) => be(a, (o) => o.length === 1));
  if (e)
    return function(a) {
      const o = x(a, (l) => l.GATE);
      for (let l = 0; l < i; l++) {
        const u = n[l], c = u.length, d = o[l];
        if (!(d !== void 0 && d.call(this) === !1))
          e: for (let h = 0; h < c; h++) {
            const f = u[h], m = f.length;
            for (let g = 0; g < m; g++) {
              const A = this.LA(g + 1);
              if (t(A, f[g]) === !1)
                continue e;
            }
            return l;
          }
      }
    };
  if (s && !r) {
    const a = x(n, (l) => Ne(l)), o = le(a, (l, u, c) => (C(u, (d) => {
      N(l, d.tokenTypeIdx) || (l[d.tokenTypeIdx] = c), C(d.categoryMatches, (h) => {
        N(l, h) || (l[h] = c);
      });
    }), l), {});
    return function() {
      const l = this.LA(1);
      return o[l.tokenTypeIdx];
    };
  } else
    return function() {
      for (let a = 0; a < i; a++) {
        const o = n[a], l = o.length;
        e: for (let u = 0; u < l; u++) {
          const c = o[u], d = c.length;
          for (let h = 0; h < d; h++) {
            const f = this.LA(h + 1);
            if (t(f, c[h]) === !1)
              continue e;
          }
          return a;
        }
      }
    };
}
function $h(n, e, t) {
  const r = be(n, (s) => s.length === 1), i = n.length;
  if (r && !t) {
    const s = Ne(n);
    if (s.length === 1 && D(s[0].categoryMatches)) {
      const o = s[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === o;
      };
    } else {
      const a = le(s, (o, l, u) => (o[l.tokenTypeIdx] = !0, C(l.categoryMatches, (c) => {
        o[c] = !0;
      }), o), []);
      return function() {
        const o = this.LA(1);
        return a[o.tokenTypeIdx] === !0;
      };
    }
  } else
    return function() {
      e: for (let s = 0; s < i; s++) {
        const a = n[s], o = a.length;
        for (let l = 0; l < o; l++) {
          const u = this.LA(l + 1);
          if (e(u, a[l]) === !1)
            continue e;
        }
        return !0;
      }
      return !1;
    };
}
class xh extends Ri {
  constructor(e, t, r) {
    super(), this.topProd = e, this.targetOccurrence = t, this.targetProdType = r;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, t, r, i) {
    return e.idx === this.targetOccurrence && this.targetProdType === t ? (this.restDef = r.concat(i), !0) : !1;
  }
  walkOption(e, t, r) {
    this.checkIsTarget(e, B.OPTION, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOne(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOneSep(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
  walkMany(e, t, r) {
    this.checkIsTarget(e, B.REPETITION, t, r) || super.walkOption(e, t, r);
  }
  walkManySep(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
}
class mu extends on {
  constructor(e, t, r) {
    super(), this.targetOccurrence = e, this.targetProdType = t, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, t) {
    e.idx === this.targetOccurrence && this.targetProdType === t && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, B.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, B.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, B.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, B.ALTERNATION);
  }
}
function Ka(n) {
  const e = new Array(n);
  for (let t = 0; t < n; t++)
    e[t] = [];
  return e;
}
function Gi(n) {
  let e = [""];
  for (let t = 0; t < n.length; t++) {
    const r = n[t], i = [];
    for (let s = 0; s < e.length; s++) {
      const a = e[s];
      i.push(a + "_" + r.tokenTypeIdx);
      for (let o = 0; o < r.categoryMatches.length; o++) {
        const l = "_" + r.categoryMatches[o];
        i.push(a + l);
      }
    }
    e = i;
  }
  return e;
}
function Sh(n, e, t) {
  for (let r = 0; r < n.length; r++) {
    if (r === t)
      continue;
    const i = n[r];
    for (let s = 0; s < e.length; s++) {
      const a = e[s];
      if (i[a] === !0)
        return !1;
    }
  }
  return !0;
}
function gu(n, e) {
  const t = x(n, (a) => hs([a], 1)), r = Ka(t.length), i = x(t, (a) => {
    const o = {};
    return C(a, (l) => {
      const u = Gi(l.partialPath);
      C(u, (c) => {
        o[c] = !0;
      });
    }), o;
  });
  let s = t;
  for (let a = 1; a <= e; a++) {
    const o = s;
    s = Ka(o.length);
    for (let l = 0; l < o.length; l++) {
      const u = o[l];
      for (let c = 0; c < u.length; c++) {
        const d = u[c].partialPath, h = u[c].suffixDef, f = Gi(d);
        if (Sh(i, f, l) || D(h) || d.length === e) {
          const g = r[l];
          if (ps(g, d) === !1) {
            g.push(d);
            for (let A = 0; A < f.length; A++) {
              const y = f[A];
              i[l][y] = !0;
            }
          }
        } else {
          const g = hs(h, a + 1, d);
          s[l] = s[l].concat(g), C(g, (A) => {
            const y = Gi(A.partialPath);
            C(y, (E) => {
              i[l][E] = !0;
            });
          });
        }
      }
    }
  }
  return r;
}
function Ei(n, e, t, r) {
  const i = new mu(n, B.ALTERNATION, r);
  return e.accept(i), gu(i.result, t);
}
function ki(n, e, t, r) {
  const i = new mu(n, t);
  e.accept(i);
  const s = i.result, o = new xh(e, n, t).startWalking(), l = new pe({ definition: s }), u = new pe({ definition: o });
  return gu([l, u], r);
}
function ps(n, e) {
  e: for (let t = 0; t < n.length; t++) {
    const r = n[t];
    if (r.length === e.length) {
      for (let i = 0; i < r.length; i++) {
        const s = e[i], a = r[i];
        if ((s === a || a.categoryMatchesMap[s.tokenTypeIdx] !== void 0) === !1)
          continue e;
      }
      return !0;
    }
  }
  return !1;
}
function Ih(n, e) {
  return n.length < e.length && be(n, (t, r) => {
    const i = e[r];
    return t === i || i.categoryMatchesMap[t.tokenTypeIdx];
  });
}
function yu(n) {
  return be(n, (e) => be(e, (t) => be(t, (r) => D(r.categoryMatches))));
}
function Ch(n) {
  const e = n.lookaheadStrategy.validate({
    rules: n.rules,
    tokenTypes: n.tokenTypes,
    grammarName: n.grammarName
  });
  return x(e, (t) => Object.assign({ type: ce.CUSTOM_LOOKAHEAD_VALIDATION }, t));
}
function Nh(n, e, t, r) {
  const i = Ee(n, (l) => wh(l, t)), s = Vh(n, e, t), a = Ee(n, (l) => Fh(l, t)), o = Ee(n, (l) => Oh(l, n, r, t));
  return i.concat(s, a, o);
}
function wh(n, e) {
  const t = new Lh();
  n.accept(t);
  const r = t.allProductions, i = od(r, _h), s = Me(i, (o) => o.length > 1);
  return x(z(s), (o) => {
    const l = Pe(o), u = e.buildDuplicateFoundError(n, o), c = Ge(l), d = {
      message: u,
      type: ce.DUPLICATE_PRODUCTIONS,
      ruleName: n.name,
      dslName: c,
      occurrence: l.idx
    }, h = Tu(l);
    return h && (d.parameter = h), d;
  });
}
function _h(n) {
  return `${Ge(n)}_#_${n.idx}_#_${Tu(n)}`;
}
function Tu(n) {
  return n instanceof G ? n.terminalType.name : n instanceof ue ? n.nonTerminalName : "";
}
class Lh extends on {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
}
function Oh(n, e, t, r) {
  const i = [];
  if (le(e, (a, o) => o.name === n.name ? a + 1 : a, 0) > 1) {
    const a = r.buildDuplicateRuleNameError({
      topLevelRule: n,
      grammarName: t
    });
    i.push({
      message: a,
      type: ce.DUPLICATE_RULE_NAME,
      ruleName: n.name
    });
  }
  return i;
}
function bh(n, e, t) {
  const r = [];
  let i;
  return de(e, n) || (i = `Invalid rule override, rule: ->${n}<- cannot be overridden in the grammar: ->${t}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: ce.INVALID_RULE_OVERRIDE,
    ruleName: n
  })), r;
}
function Ru(n, e, t, r = []) {
  const i = [], s = br(e.definition);
  if (D(s))
    return [];
  {
    const a = n.name;
    de(s, n) && i.push({
      message: t.buildLeftRecursionError({
        topLevelRule: n,
        leftRecursionPath: r
      }),
      type: ce.LEFT_RECURSION,
      ruleName: a
    });
    const l = hi(s, r.concat([n])), u = Ee(l, (c) => {
      const d = re(r);
      return d.push(c), Ru(n, c, t, d);
    });
    return i.concat(u);
  }
}
function br(n) {
  let e = [];
  if (D(n))
    return e;
  const t = Pe(n);
  if (t instanceof ue)
    e.push(t.referencedRule);
  else if (t instanceof pe || t instanceof ne || t instanceof xe || t instanceof Se || t instanceof me || t instanceof W)
    e = e.concat(br(t.definition));
  else if (t instanceof ge)
    e = Ne(x(t.definition, (s) => br(s.definition)));
  else if (!(t instanceof G)) throw Error("non exhaustive match");
  const r = qr(t), i = n.length > 1;
  if (r && i) {
    const s = Q(n);
    return e.concat(br(s));
  } else
    return e;
}
class na extends on {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function Ph(n, e) {
  const t = new na();
  n.accept(t);
  const r = t.alternations;
  return Ee(r, (s) => {
    const a = Yn(s.definition);
    return Ee(a, (o, l) => {
      const u = pu([o], [], rr, 1);
      return D(u) ? [
        {
          message: e.buildEmptyAlternationError({
            topLevelRule: n,
            alternation: s,
            emptyChoiceIdx: l
          }),
          type: ce.NONE_LAST_EMPTY_ALT,
          ruleName: n.name,
          occurrence: s.idx,
          alternative: l + 1
        }
      ] : [];
    });
  });
}
function Mh(n, e, t) {
  const r = new na();
  n.accept(r);
  let i = r.alternations;
  return i = pi(i, (a) => a.ignoreAmbiguities === !0), Ee(i, (a) => {
    const o = a.idx, l = a.maxLookahead || e, u = Ei(o, n, l, a), c = Uh(u, a, n, t), d = Bh(u, a, n, t);
    return c.concat(d);
  });
}
class Dh extends on {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
}
function Fh(n, e) {
  const t = new na();
  n.accept(t);
  const r = t.alternations;
  return Ee(r, (s) => s.definition.length > 255 ? [
    {
      message: e.buildTooManyAlternativesError({
        topLevelRule: n,
        alternation: s
      }),
      type: ce.TOO_MANY_ALTS,
      ruleName: n.name,
      occurrence: s.idx
    }
  ] : []);
}
function Gh(n, e, t) {
  const r = [];
  return C(n, (i) => {
    const s = new Dh();
    i.accept(s);
    const a = s.allProductions;
    C(a, (o) => {
      const l = ta(o), u = o.maxLookahead || e, c = o.idx, h = ki(c, i, l, u)[0];
      if (D(Ne(h))) {
        const f = t.buildEmptyRepetitionError({
          topLevelRule: i,
          repetition: o
        });
        r.push({
          message: f,
          type: ce.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: i.name
        });
      }
    });
  }), r;
}
function Uh(n, e, t, r) {
  const i = [], s = le(n, (o, l, u) => (e.definition[u].ignoreAmbiguities === !0 || C(l, (c) => {
    const d = [u];
    C(n, (h, f) => {
      u !== f && ps(h, c) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[f].ignoreAmbiguities !== !0 && d.push(f);
    }), d.length > 1 && !ps(i, c) && (i.push(c), o.push({
      alts: d,
      path: c
    }));
  }), o), []);
  return x(s, (o) => {
    const l = x(o.alts, (c) => c + 1);
    return {
      message: r.buildAlternationAmbiguityError({
        topLevelRule: t,
        alternation: e,
        ambiguityIndices: l,
        prefixPath: o.path
      }),
      type: ce.AMBIGUOUS_ALTS,
      ruleName: t.name,
      occurrence: e.idx,
      alternatives: o.alts
    };
  });
}
function Bh(n, e, t, r) {
  const i = le(n, (a, o, l) => {
    const u = x(o, (c) => ({ idx: l, path: c }));
    return a.concat(u);
  }, []);
  return Zn(Ee(i, (a) => {
    if (e.definition[a.idx].ignoreAmbiguities === !0)
      return [];
    const l = a.idx, u = a.path, c = $e(i, (h) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[h.idx].ignoreAmbiguities !== !0 && h.idx < l && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      Ih(h.path, u)
    ));
    return x(c, (h) => {
      const f = [h.idx + 1, l + 1], m = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: t,
          alternation: e,
          ambiguityIndices: f,
          prefixPath: h.path
        }),
        type: ce.AMBIGUOUS_PREFIX_ALTS,
        ruleName: t.name,
        occurrence: m,
        alternatives: f
      };
    });
  }));
}
function Vh(n, e, t) {
  const r = [], i = x(e, (s) => s.name);
  return C(n, (s) => {
    const a = s.name;
    if (de(i, a)) {
      const o = t.buildNamespaceConflictError(s);
      r.push({
        message: o,
        type: ce.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: a
      });
    }
  }), r;
}
function Kh(n) {
  const e = Vs(n, {
    errMsgProvider: hh
  }), t = {};
  return C(n.rules, (r) => {
    t[r.name] = r;
  }), ph(t, e.errMsgProvider);
}
function Wh(n) {
  return n = Vs(n, {
    errMsgProvider: mt
  }), Nh(n.rules, n.tokenTypes, n.errMsgProvider, n.grammarName);
}
const vu = "MismatchedTokenException", Au = "NoViableAltException", Eu = "EarlyExitException", ku = "NotAllInputParsedException", $u = [
  vu,
  Au,
  Eu,
  ku
];
Object.freeze($u);
function Jr(n) {
  return de($u, n.name);
}
class $i extends Error {
  constructor(e, t) {
    super(e), this.token = t, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class xu extends $i {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = vu;
  }
}
class Hh extends $i {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = Au;
  }
}
class jh extends $i {
  constructor(e, t) {
    super(e, t), this.name = ku;
  }
}
class zh extends $i {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = Eu;
  }
}
const Ui = {}, Su = "InRuleRecoveryException";
class qh extends Error {
  constructor(e) {
    super(e), this.name = Su;
  }
}
class Yh {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = N(e, "recoveryEnabled") ? e.recoveryEnabled : Je.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Xh);
  }
  getTokenToInsert(e) {
    const t = ea(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return t.isInsertedInRecovery = !0, t;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return !0;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return !0;
  }
  tryInRepetitionRecovery(e, t, r, i) {
    const s = this.findReSyncTokenType(), a = this.exportLexerState(), o = [];
    let l = !1;
    const u = this.LA(1);
    let c = this.LA(1);
    const d = () => {
      const h = this.LA(0), f = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: h,
        ruleName: this.getCurrRuleFullName()
      }), m = new xu(f, u, this.LA(0));
      m.resyncedTokens = Yn(o), this.SAVE_ERROR(m);
    };
    for (; !l; )
      if (this.tokenMatcher(c, i)) {
        d();
        return;
      } else if (r.call(this)) {
        d(), e.apply(this, t);
        return;
      } else this.tokenMatcher(c, s) ? l = !0 : (c = this.SKIP_TOKEN(), this.addToResyncTokens(c, o));
    this.importLexerState(a);
  }
  shouldInRepetitionRecoveryBeTried(e, t, r) {
    return !(r === !1 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)));
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(e, t) {
    const r = this.getCurrentGrammarPath(e, t);
    return this.getNextPossibleTokenTypes(r);
  }
  tryInRuleRecovery(e, t) {
    if (this.canRecoverWithSingleTokenInsertion(e, t))
      return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      const r = this.SKIP_TOKEN();
      return this.consumeToken(), r;
    }
    throw new qh("sad sad panda");
  }
  canPerformInRuleRecovery(e, t) {
    return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, t) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || D(t))
      return !1;
    const r = this.LA(1);
    return Jt(t, (s) => this.tokenMatcher(r, s)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : !1;
  }
  isInCurrentRuleReSyncSet(e) {
    const t = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(t);
    return de(r, e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let t = this.LA(1), r = 2;
    for (; ; ) {
      const i = Jt(e, (s) => hu(t, s));
      if (i !== void 0)
        return i;
      t = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return Ui;
    const e = this.getLastExplicitRuleShortName(), t = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: t,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, t = this.RULE_OCCURRENCE_STACK;
    return x(e, (r, i) => i === 0 ? Ui : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: t[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = x(this.buildFullFollowKeyStack(), (t) => this.getFollowSetFromFollowKey(t));
    return Ne(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === Ui)
      return [nt];
    const t = e.ruleName + e.idxInCallingRule + nu + e.inRule;
    return this.resyncFollows[t];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, t) {
    return this.tokenMatcher(e, nt) || t.push(e), t;
  }
  reSyncTo(e) {
    const t = [];
    let r = this.LA(1);
    for (; this.tokenMatcher(r, e) === !1; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, t);
    return Yn(t);
  }
  attemptInRepetitionRecovery(e, t, r, i, s, a, o) {
  }
  getCurrentGrammarPath(e, t) {
    const r = this.getHumanReadableRuleStack(), i = re(this.RULE_OCCURRENCE_STACK);
    return {
      ruleStack: r,
      occurrenceStack: i,
      lastTok: e,
      lastTokOccurrence: t
    };
  }
  getHumanReadableRuleStack() {
    return x(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
  }
}
function Xh(n, e, t, r, i, s, a) {
  const o = this.getKeyForAutomaticLookahead(r, i);
  let l = this.firstAfterRepMap[o];
  if (l === void 0) {
    const h = this.getCurrRuleFullName(), f = this.getGAstProductions()[h];
    l = new s(f, i).startWalking(), this.firstAfterRepMap[o] = l;
  }
  let u = l.token, c = l.occurrence;
  const d = l.isEndOfRule;
  this.RULE_STACK.length === 1 && d && u === void 0 && (u = nt, c = 1), !(u === void 0 || c === void 0) && this.shouldInRepetitionRecoveryBeTried(u, c, a) && this.tryInRepetitionRecovery(n, e, t, u);
}
const Jh = 4, st = 8, Iu = 1 << st, Cu = 2 << st, ms = 3 << st, gs = 4 << st, ys = 5 << st, Pr = 6 << st;
function Bi(n, e, t) {
  return t | e | n;
}
class ra {
  constructor(e) {
    var t;
    this.maxLookahead = (t = e == null ? void 0 : e.maxLookahead) !== null && t !== void 0 ? t : Je.maxLookahead;
  }
  validate(e) {
    const t = this.validateNoLeftRecursion(e.rules);
    if (D(t)) {
      const r = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), s = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [
        ...t,
        ...r,
        ...i,
        ...s
      ];
    }
    return t;
  }
  validateNoLeftRecursion(e) {
    return Ee(e, (t) => Ru(t, t, mt));
  }
  validateEmptyOrAlternatives(e) {
    return Ee(e, (t) => Ph(t, mt));
  }
  validateAmbiguousAlternationAlternatives(e, t) {
    return Ee(e, (r) => Mh(r, t, mt));
  }
  validateSomeNonEmptyLookaheadPath(e, t) {
    return Gh(e, t, mt);
  }
  buildLookaheadForAlternation(e) {
    return Ah(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, kh);
  }
  buildLookaheadForOptional(e) {
    return Eh(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, ta(e.prodType), $h);
  }
}
class Qh {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = N(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Je.dynamicTokensEnabled, this.maxLookahead = N(e, "maxLookahead") ? e.maxLookahead : Je.maxLookahead, this.lookaheadStrategy = N(e, "lookaheadStrategy") ? e.lookaheadStrategy : new ra({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    C(e, (t) => {
      this.TRACE_INIT(`${t.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: s, repetitionMandatory: a, repetitionMandatoryWithSeparator: o, repetitionWithSeparator: l } = ep(t);
        C(r, (u) => {
          const c = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${Ge(u)}${c}`, () => {
            const d = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: t,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), h = Bi(this.fullRuleNameToShort[t.name], Iu, u.idx);
            this.setLaFuncCache(h, d);
          });
        }), C(i, (u) => {
          this.computeLookaheadFunc(t, u.idx, ms, "Repetition", u.maxLookahead, Ge(u));
        }), C(s, (u) => {
          this.computeLookaheadFunc(t, u.idx, Cu, "Option", u.maxLookahead, Ge(u));
        }), C(a, (u) => {
          this.computeLookaheadFunc(t, u.idx, gs, "RepetitionMandatory", u.maxLookahead, Ge(u));
        }), C(o, (u) => {
          this.computeLookaheadFunc(t, u.idx, Pr, "RepetitionMandatoryWithSeparator", u.maxLookahead, Ge(u));
        }), C(l, (u) => {
          this.computeLookaheadFunc(t, u.idx, ys, "RepetitionWithSeparator", u.maxLookahead, Ge(u));
        });
      });
    });
  }
  computeLookaheadFunc(e, t, r, i, s, a) {
    this.TRACE_INIT(`${a}${t === 0 ? "" : t}`, () => {
      const o = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence: t,
        rule: e,
        maxLookahead: s || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType: i
      }), l = Bi(this.fullRuleNameToShort[e.name], r, t);
      this.setLaFuncCache(l, o);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, t) {
    const r = this.getLastExplicitRuleShortName();
    return Bi(r, e, t);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, t) {
    this.lookAheadFuncsCache.set(e, t);
  }
}
class Zh extends on {
  constructor() {
    super(...arguments), this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}
const vr = new Zh();
function ep(n) {
  vr.reset(), n.accept(vr);
  const e = vr.dslMethods;
  return vr.reset(), e;
}
function Wa(n, e) {
  isNaN(n.startOffset) === !0 ? (n.startOffset = e.startOffset, n.endOffset = e.endOffset) : n.endOffset < e.endOffset && (n.endOffset = e.endOffset);
}
function Ha(n, e) {
  isNaN(n.startOffset) === !0 ? (n.startOffset = e.startOffset, n.startColumn = e.startColumn, n.startLine = e.startLine, n.endOffset = e.endOffset, n.endColumn = e.endColumn, n.endLine = e.endLine) : n.endOffset < e.endOffset && (n.endOffset = e.endOffset, n.endColumn = e.endColumn, n.endLine = e.endLine);
}
function tp(n, e, t) {
  n.children[t] === void 0 ? n.children[t] = [e] : n.children[t].push(e);
}
function np(n, e, t) {
  n.children[e] === void 0 ? n.children[e] = [t] : n.children[e].push(t);
}
const rp = "name";
function Nu(n, e) {
  Object.defineProperty(n, rp, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function ip(n, e) {
  const t = Xt(n), r = t.length;
  for (let i = 0; i < r; i++) {
    const s = t[i], a = n[s], o = a.length;
    for (let l = 0; l < o; l++) {
      const u = a[l];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function sp(n, e) {
  const t = function() {
  };
  Nu(t, n + "BaseSemantics");
  const r = {
    visit: function(i, s) {
      if (te(i) && (i = i[0]), !Ye(i))
        return this[i.name](i.children, s);
    },
    validateVisitor: function() {
      const i = op(this, e);
      if (!D(i)) {
        const s = x(i, (a) => a.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${s.join(`

`).replace(/\n/g, `
	`)}`);
      }
    }
  };
  return t.prototype = r, t.prototype.constructor = t, t._RULE_NAMES = e, t;
}
function ap(n, e, t) {
  const r = function() {
  };
  Nu(r, n + "BaseSemanticsWithDefaults");
  const i = Object.create(t.prototype);
  return C(e, (s) => {
    i[s] = ip;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var Ts;
(function(n) {
  n[n.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", n[n.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Ts || (Ts = {}));
function op(n, e) {
  return lp(n, e);
}
function lp(n, e) {
  const t = $e(e, (i) => Et(n[i]) === !1), r = x(t, (i) => ({
    msg: `Missing visitor method: <${i}> on ${n.constructor.name} CST Visitor.`,
    type: Ts.MISSING_METHOD,
    methodName: i
  }));
  return Zn(r);
}
class up {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = N(e, "nodeLocationTracking") ? e.nodeLocationTracking : Je.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = Y, this.cstFinallyStateUpdate = Y, this.cstPostTerminal = Y, this.cstPostNonTerminal = Y, this.cstPostRule = Y;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Ha, this.setNodeLocationFromNode = Ha, this.cstPostRule = Y, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Y, this.setNodeLocationFromNode = Y, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Wa, this.setNodeLocationFromNode = Wa, this.cstPostRule = Y, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Y, this.setNodeLocationFromNode = Y, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = Y, this.setNodeLocationFromNode = Y, this.cstPostRule = Y, this.setInitialNodeLocation = Y;
    else
      throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = {
      startOffset: NaN,
      endOffset: NaN
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA(1).startOffset,
      endOffset: NaN
    };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = {
      startOffset: NaN,
      startLine: NaN,
      startColumn: NaN,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(e) {
    const t = this.LA(1);
    e.location = {
      startOffset: t.startOffset,
      startLine: t.startLine,
      startColumn: t.startColumn,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  cstInvocationStateUpdate(e) {
    const t = {
      name: e,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(t), this.CST_STACK.push(t);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset <= t.startOffset ? (r.endOffset = t.endOffset, r.endLine = t.endLine, r.endColumn = t.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
  }
  cstPostRuleOnlyOffset(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset <= t.startOffset ? r.endOffset = t.endOffset : r.startOffset = NaN;
  }
  cstPostTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    tp(r, t, e), this.setNodeLocationFromToken(r.location, t);
  }
  cstPostNonTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    np(r, t, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (Ye(this.baseCstVisitorConstructor)) {
      const e = sp(this.className, Xt(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (Ye(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = ap(this.className, Xt(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    const e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }
}
class cp {
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== !0)
      throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : Zr;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const t = this.currIdx + e;
    return t < 0 || this.tokVectorLength <= t ? Zr : this.tokVector[t];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}
class dp {
  ACTION(e) {
    return e.call(this);
  }
  consume(e, t, r) {
    return this.consumeInternal(t, e, r);
  }
  subrule(e, t, r) {
    return this.subruleInternal(t, e, r);
  }
  option(e, t) {
    return this.optionInternal(t, e);
  }
  or(e, t) {
    return this.orInternal(t, e);
  }
  many(e, t) {
    return this.manyInternal(e, t);
  }
  atLeastOne(e, t) {
    return this.atLeastOneInternal(e, t);
  }
  CONSUME(e, t) {
    return this.consumeInternal(e, 0, t);
  }
  CONSUME1(e, t) {
    return this.consumeInternal(e, 1, t);
  }
  CONSUME2(e, t) {
    return this.consumeInternal(e, 2, t);
  }
  CONSUME3(e, t) {
    return this.consumeInternal(e, 3, t);
  }
  CONSUME4(e, t) {
    return this.consumeInternal(e, 4, t);
  }
  CONSUME5(e, t) {
    return this.consumeInternal(e, 5, t);
  }
  CONSUME6(e, t) {
    return this.consumeInternal(e, 6, t);
  }
  CONSUME7(e, t) {
    return this.consumeInternal(e, 7, t);
  }
  CONSUME8(e, t) {
    return this.consumeInternal(e, 8, t);
  }
  CONSUME9(e, t) {
    return this.consumeInternal(e, 9, t);
  }
  SUBRULE(e, t) {
    return this.subruleInternal(e, 0, t);
  }
  SUBRULE1(e, t) {
    return this.subruleInternal(e, 1, t);
  }
  SUBRULE2(e, t) {
    return this.subruleInternal(e, 2, t);
  }
  SUBRULE3(e, t) {
    return this.subruleInternal(e, 3, t);
  }
  SUBRULE4(e, t) {
    return this.subruleInternal(e, 4, t);
  }
  SUBRULE5(e, t) {
    return this.subruleInternal(e, 5, t);
  }
  SUBRULE6(e, t) {
    return this.subruleInternal(e, 6, t);
  }
  SUBRULE7(e, t) {
    return this.subruleInternal(e, 7, t);
  }
  SUBRULE8(e, t) {
    return this.subruleInternal(e, 8, t);
  }
  SUBRULE9(e, t) {
    return this.subruleInternal(e, 9, t);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, t, r = ei) {
    if (de(this.definedRulesNames, e)) {
      const a = {
        message: mt.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }),
        type: ce.DUPLICATE_RULE_NAME,
        ruleName: e
      };
      this.definitionErrors.push(a);
    }
    this.definedRulesNames.push(e);
    const i = this.defineRule(e, t, r);
    return this[e] = i, i;
  }
  OVERRIDE_RULE(e, t, r = ei) {
    const i = bh(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(i);
    const s = this.defineRule(e, t, r);
    return this[e] = s, s;
  }
  BACKTRACK(e, t) {
    return function() {
      this.isBackTrackingStack.push(1);
      const r = this.saveRecogState();
      try {
        return e.apply(this, t), !0;
      } catch (i) {
        if (Jr(i))
          return !1;
        throw i;
      } finally {
        this.reloadRecogState(r), this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return vf(z(this.gastProductionsCache));
  }
}
class fp {
  initRecognizerEngine(e, t) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Xr, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, N(t, "serializedGrammar"))
      throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (te(e)) {
      if (D(e))
        throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number")
        throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (te(e))
      this.tokensMap = le(e, (s, a) => (s[a.name] = a, s), {});
    else if (N(e, "modes") && be(Ne(z(e.modes)), ch)) {
      const s = Ne(z(e.modes)), a = Ks(s);
      this.tokensMap = le(a, (o, l) => (o[l.name] = l, o), {});
    } else if (Uc(e))
      this.tokensMap = re(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = nt;
    const r = N(e, "modes") ? Ne(z(e.modes)) : z(e), i = be(r, (s) => D(s.categoryMatches));
    this.tokenMatcher = i ? Xr : rr, ir(z(this.tokensMap));
  }
  defineRule(e, t, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = N(r, "resyncEnabled") ? r.resyncEnabled : ei.resyncEnabled, s = N(r, "recoveryValueFunc") ? r.recoveryValueFunc : ei.recoveryValueFunc, a = this.ruleShortNameIdx << Jh + st;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
    let o;
    return this.outputCst === !0 ? o = function(...c) {
      try {
        this.ruleInvocationStateUpdate(a, e, this.subruleIdx), t.apply(this, c);
        const d = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(d), d;
      } catch (d) {
        return this.invokeRuleCatch(d, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : o = function(...c) {
      try {
        return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), t.apply(this, c);
      } catch (d) {
        return this.invokeRuleCatch(d, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, Object.assign(o, { ruleName: e, originalGrammarAction: t });
  }
  invokeRuleCatch(e, t, r) {
    const i = this.RULE_STACK.length === 1, s = t && !this.isBackTracking() && this.recoveryEnabled;
    if (Jr(e)) {
      const a = e;
      if (s) {
        const o = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(o))
          if (a.resyncedTokens = this.reSyncTo(o), this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            return l.recoveredNode = !0, l;
          } else
            return r(e);
        else {
          if (this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            l.recoveredNode = !0, a.partialCstResult = l;
          }
          throw a;
        }
      } else {
        if (i)
          return this.moveToTerminatedState(), r(e);
        throw a;
      }
    } else
      throw e;
  }
  // Implementation of parsing DSL
  optionInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Cu, t);
    return this.optionInternalLogic(e, t, r);
  }
  optionInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof e != "function") {
      s = e.DEF;
      const a = e.GATE;
      if (a !== void 0) {
        const o = i;
        i = () => a.call(this) && o.call(this);
      }
    } else
      s = e;
    if (i.call(this) === !0)
      return s.call(this);
  }
  atLeastOneInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(gs, e);
    return this.atLeastOneInternalLogic(e, t, r);
  }
  atLeastOneInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof t != "function") {
      s = t.DEF;
      const a = t.GATE;
      if (a !== void 0) {
        const o = i;
        i = () => a.call(this) && o.call(this);
      }
    } else
      s = t;
    if (i.call(this) === !0) {
      let a = this.doSingleRepetition(s);
      for (; i.call(this) === !0 && a === !0; )
        a = this.doSingleRepetition(s);
    } else
      throw this.raiseEarlyExitException(e, B.REPETITION_MANDATORY, t.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], i, gs, e, Rh);
  }
  atLeastOneSepFirstInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Pr, e);
    this.atLeastOneSepFirstInternalLogic(e, t, r);
  }
  atLeastOneSepFirstInternalLogic(e, t, r) {
    const i = t.DEF, s = t.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === !0; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        Ba
      ], o, Pr, e, Ba);
    } else
      throw this.raiseEarlyExitException(e, B.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG);
  }
  manyInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(ms, e);
    return this.manyInternalLogic(e, t, r);
  }
  manyInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof t != "function") {
      s = t.DEF;
      const o = t.GATE;
      if (o !== void 0) {
        const l = i;
        i = () => o.call(this) && l.call(this);
      }
    } else
      s = t;
    let a = !0;
    for (; i.call(this) === !0 && a === !0; )
      a = this.doSingleRepetition(s);
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [e, t],
      i,
      ms,
      e,
      Th,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a
    );
  }
  manySepFirstInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(ys, e);
    this.manySepFirstInternalLogic(e, t, r);
  }
  manySepFirstInternalLogic(e, t, r) {
    const i = t.DEF, s = t.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === !0; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        Ua
      ], o, ys, e, Ua);
    }
  }
  repetitionSepSecondInternal(e, t, r, i, s) {
    for (; r(); )
      this.CONSUME(t), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      e,
      t,
      r,
      i,
      s
    ], r, Pr, e, s);
  }
  doSingleRepetition(e) {
    const t = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > t;
  }
  orInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Iu, t), i = te(e) ? e : e.DEF, a = this.getLaFuncFromCache(r).call(this, i);
    if (a !== void 0)
      return i[a].ALT.call(this);
    this.raiseNoAltException(t, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1) {
      const e = this.LA(1), t = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: e,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new jh(t, e));
    }
  }
  subruleInternal(e, t, r) {
    let i;
    try {
      const s = r !== void 0 ? r.ARGS : void 0;
      return this.subruleIdx = t, i = e.apply(this, s), this.cstPostNonTerminal(i, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), i;
    } catch (s) {
      throw this.subruleInternalError(s, r, e.ruleName);
    }
  }
  subruleInternalError(e, t, r) {
    throw Jr(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, t !== void 0 && t.LABEL !== void 0 ? t.LABEL : r), delete e.partialCstResult), e;
  }
  consumeInternal(e, t, r) {
    let i;
    try {
      const s = this.LA(1);
      this.tokenMatcher(s, e) === !0 ? (this.consumeToken(), i = s) : this.consumeInternalError(e, s, r);
    } catch (s) {
      i = this.consumeInternalRecovery(e, t, s);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, i), i;
  }
  consumeInternalError(e, t, r) {
    let i;
    const s = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? i = r.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({
      expected: e,
      actual: t,
      previous: s,
      ruleName: this.getCurrRuleFullName()
    }), this.SAVE_ERROR(new xu(i, t, s));
  }
  consumeInternalRecovery(e, t, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, t);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (s) {
        throw s.name === Su ? r : s;
      }
    } else
      throw r;
  }
  saveRecogState() {
    const e = this.errors, t = re(this.RULE_STACK);
    return {
      errors: e,
      lexerState: this.exportLexerState(),
      RULE_STACK: t,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }
  ruleInvocationStateUpdate(e, t, r) {
    this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(t);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), nt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}
class hp {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = N(e, "errorMessageProvider") ? e.errorMessageProvider : Je.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (Jr(e))
      return e.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: re(this.RULE_OCCURRENCE_STACK)
      }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return re(this._errors);
  }
  set errors(e) {
    this._errors = e;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(e, t, r) {
    const i = this.getCurrRuleFullName(), s = this.getGAstProductions()[i], o = ki(e, s, t, this.maxLookahead)[0], l = [];
    for (let c = 1; c <= this.maxLookahead; c++)
      l.push(this.LA(c));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: o,
      actual: l,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new zh(u, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, t) {
    const r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], s = Ei(e, i, this.maxLookahead), a = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      a.push(this.LA(u));
    const o = this.LA(0), l = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: s,
      actual: a,
      previous: o,
      customUserDescription: t,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new Hh(l, this.LA(1), o));
  }
}
class pp {
  initContentAssist() {
  }
  computeContentAssist(e, t) {
    const r = this.gastProductionsCache[e];
    if (Ye(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return pu([r], t, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const t = Pe(e.ruleStack), i = this.getGAstProductions()[t];
    return new yh(i, e).startWalking();
  }
}
const xi = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(xi);
const ja = !0, za = Math.pow(2, st) - 1, wu = fu({ name: "RECORDING_PHASE_TOKEN", pattern: fe.NA });
ir([wu]);
const _u = ea(
  wu,
  `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(_u);
const mp = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class gp {
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = !1;
  }
  enableRecording() {
    this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        const t = e > 0 ? e : "";
        this[`CONSUME${t}`] = function(r, i) {
          return this.consumeInternalRecord(r, e, i);
        }, this[`SUBRULE${t}`] = function(r, i) {
          return this.subruleInternalRecord(r, e, i);
        }, this[`OPTION${t}`] = function(r) {
          return this.optionInternalRecord(r, e);
        }, this[`OR${t}`] = function(r) {
          return this.orInternalRecord(r, e);
        }, this[`MANY${t}`] = function(r) {
          this.manyInternalRecord(e, r);
        }, this[`MANY_SEP${t}`] = function(r) {
          this.manySepFirstInternalRecord(e, r);
        }, this[`AT_LEAST_ONE${t}`] = function(r) {
          this.atLeastOneInternalRecord(e, r);
        }, this[`AT_LEAST_ONE_SEP${t}`] = function(r) {
          this.atLeastOneSepFirstInternalRecord(e, r);
        };
      }
      this.consume = function(e, t, r) {
        return this.consumeInternalRecord(t, e, r);
      }, this.subrule = function(e, t, r) {
        return this.subruleInternalRecord(t, e, r);
      }, this.option = function(e, t) {
        return this.optionInternalRecord(t, e);
      }, this.or = function(e, t) {
        return this.orInternalRecord(t, e);
      }, this.many = function(e, t) {
        this.manyInternalRecord(e, t);
      }, this.atLeastOne = function(e, t) {
        this.atLeastOneInternalRecord(e, t);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => {
      const e = this;
      for (let t = 0; t < 10; t++) {
        const r = t > 0 ? t : "";
        delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(e) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(e, t) {
    return () => !0;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(e) {
    return Zr;
  }
  topLevelRuleRecord(e, t) {
    try {
      const r = new an({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), t.call(this), this.recordingProdStack.pop(), r;
    } catch (r) {
      if (r.KNOWN_RECORDER_ERROR !== !0)
        try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
      throw r;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(e, t) {
    return cn.call(this, ne, e, t);
  }
  atLeastOneInternalRecord(e, t) {
    cn.call(this, xe, t, e);
  }
  atLeastOneSepFirstInternalRecord(e, t) {
    cn.call(this, Se, t, e, ja);
  }
  manyInternalRecord(e, t) {
    cn.call(this, W, t, e);
  }
  manySepFirstInternalRecord(e, t) {
    cn.call(this, me, t, e, ja);
  }
  orInternalRecord(e, t) {
    return yp.call(this, e, t);
  }
  subruleInternalRecord(e, t, r) {
    if (Qr(t), !e || N(e, "ruleName") === !1) {
      const o = new Error(`<SUBRULE${qa(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw o.KNOWN_RECORDER_ERROR = !0, o;
    }
    const i = Qt(this.recordingProdStack), s = e.ruleName, a = new ue({
      idx: t,
      nonTerminalName: s,
      label: r == null ? void 0 : r.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(a), this.outputCst ? mp : xi;
  }
  consumeInternalRecord(e, t, r) {
    if (Qr(t), !cu(e)) {
      const a = new Error(`<CONSUME${qa(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = Qt(this.recordingProdStack), s = new G({
      idx: t,
      terminalType: e,
      label: r == null ? void 0 : r.LABEL
    });
    return i.definition.push(s), _u;
  }
}
function cn(n, e, t, r = !1) {
  Qr(t);
  const i = Qt(this.recordingProdStack), s = Et(e) ? e : e.DEF, a = new n({ definition: [], idx: t });
  return r && (a.separator = e.SEP), N(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), s.call(this), i.definition.push(a), this.recordingProdStack.pop(), xi;
}
function yp(n, e) {
  Qr(e);
  const t = Qt(this.recordingProdStack), r = te(n) === !1, i = r === !1 ? n : n.DEF, s = new ge({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && n.IGNORE_AMBIGUITIES === !0
  });
  N(n, "MAX_LOOKAHEAD") && (s.maxLookahead = n.MAX_LOOKAHEAD);
  const a = Ll(i, (o) => Et(o.GATE));
  return s.hasPredicates = a, t.definition.push(s), C(i, (o) => {
    const l = new pe({ definition: [] });
    s.definition.push(l), N(o, "IGNORE_AMBIGUITIES") ? l.ignoreAmbiguities = o.IGNORE_AMBIGUITIES : N(o, "GATE") && (l.ignoreAmbiguities = !0), this.recordingProdStack.push(l), o.ALT.call(this), this.recordingProdStack.pop();
  }), xi;
}
function qa(n) {
  return n === 0 ? "" : `${n}`;
}
function Qr(n) {
  if (n < 0 || n > za) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${n}>
	Idx value must be a none negative value smaller than ${za + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
class Tp {
  initPerformanceTracer(e) {
    if (N(e, "traceInitPerf")) {
      const t = e.traceInitPerf, r = typeof t == "number";
      this.traceInitMaxIdent = r ? t : 1 / 0, this.traceInitPerf = r ? t > 0 : t;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = Je.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, t) {
    if (this.traceInitPerf === !0) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: i, value: s } = eu(t), a = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, s;
    } else
      return t();
  }
}
function Rp(n, e) {
  e.forEach((t) => {
    const r = t.prototype;
    Object.getOwnPropertyNames(r).forEach((i) => {
      if (i === "constructor")
        return;
      const s = Object.getOwnPropertyDescriptor(r, i);
      s && (s.get || s.set) ? Object.defineProperty(n.prototype, i, s) : n.prototype[i] = t.prototype[i];
    });
  });
}
const Zr = ea(nt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(Zr);
const Je = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: wt,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), ei = Object.freeze({
  recoveryValueFunc: () => {
  },
  resyncEnabled: !0
});
var ce;
(function(n) {
  n[n.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", n[n.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", n[n.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", n[n.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", n[n.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", n[n.LEFT_RECURSION = 5] = "LEFT_RECURSION", n[n.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", n[n.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", n[n.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", n[n.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", n[n.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", n[n.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", n[n.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", n[n.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(ce || (ce = {}));
function Ya(n = void 0) {
  return function() {
    return n;
  };
}
class sr {
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e;
      this.selfAnalysisDone = !0;
      const t = this.className;
      this.TRACE_INIT("toFastProps", () => {
        tu(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), C(this.definedRulesNames, (i) => {
            const a = this[i].originalGrammarAction;
            let o;
            this.TRACE_INIT(`${i} Rule`, () => {
              o = this.topLevelRuleRecord(i, a);
            }), this.gastProductionsCache[i] = o;
          });
        } finally {
          this.disableRecording();
        }
      });
      let r = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        r = Kh({
          rules: z(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (D(r) && this.skipValidations === !1) {
          const i = Wh({
            rules: z(this.gastProductionsCache),
            tokenTypes: z(this.tokensMap),
            errMsgProvider: mt,
            grammarName: t
          }), s = Ch({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: z(this.gastProductionsCache),
            tokenTypes: z(this.tokensMap),
            grammarName: t
          });
          this.definitionErrors = this.definitionErrors.concat(i, s);
        }
      }), D(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = If(z(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, s;
        (s = (i = this.lookaheadStrategy).initialize) === null || s === void 0 || s.call(i, {
          rules: z(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(z(this.gastProductionsCache));
      })), !sr.DEFER_DEFINITION_ERRORS_HANDLING && !D(this.definitionErrors))
        throw e = x(this.definitionErrors, (i) => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
    });
  }
  constructor(e, t) {
    this.definitionErrors = [], this.selfAnalysisDone = !1;
    const r = this;
    if (r.initErrorHandler(t), r.initLexerAdapter(), r.initLooksAhead(t), r.initRecognizerEngine(e, t), r.initRecoverable(t), r.initTreeBuilder(t), r.initContentAssist(), r.initGastRecorder(t), r.initPerformanceTracer(t), N(t, "ignoredIssues"))
      throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = N(t, "skipValidations") ? t.skipValidations : Je.skipValidations;
  }
}
sr.DEFER_DEFINITION_ERRORS_HANDLING = !1;
Rp(sr, [
  Yh,
  Qh,
  up,
  cp,
  fp,
  dp,
  hp,
  pp,
  gp,
  Tp
]);
class vp extends sr {
  constructor(e, t = Je) {
    const r = re(t);
    r.outputCst = !1, super(e, r);
  }
}
function Zt(n, e, t) {
  return `${n.name}_${e}_${t}`;
}
const rt = 1, Ap = 2, Lu = 4, Ou = 5, ar = 7, Ep = 8, kp = 9, $p = 10, xp = 11, bu = 12;
class ia {
  constructor(e) {
    this.target = e;
  }
  isEpsilon() {
    return !1;
  }
}
class sa extends ia {
  constructor(e, t) {
    super(e), this.tokenType = t;
  }
}
class Pu extends ia {
  constructor(e) {
    super(e);
  }
  isEpsilon() {
    return !0;
  }
}
class aa extends ia {
  constructor(e, t, r) {
    super(e), this.rule = t, this.followState = r;
  }
  isEpsilon() {
    return !0;
  }
}
function Sp(n) {
  const e = {
    decisionMap: {},
    decisionStates: [],
    ruleToStartState: /* @__PURE__ */ new Map(),
    ruleToStopState: /* @__PURE__ */ new Map(),
    states: []
  };
  Ip(e, n);
  const t = n.length;
  for (let r = 0; r < t; r++) {
    const i = n[r], s = $t(e, i, i);
    s !== void 0 && Fp(e, i, s);
  }
  return e;
}
function Ip(n, e) {
  const t = e.length;
  for (let r = 0; r < t; r++) {
    const i = e[r], s = X(n, i, void 0, {
      type: Ap
    }), a = X(n, i, void 0, {
      type: ar
    });
    s.stop = a, n.ruleToStartState.set(i, s), n.ruleToStopState.set(i, a);
  }
}
function Mu(n, e, t) {
  return t instanceof G ? oa(n, e, t.terminalType, t) : t instanceof ue ? Dp(n, e, t) : t instanceof ge ? Lp(n, e, t) : t instanceof ne ? Op(n, e, t) : t instanceof W ? Cp(n, e, t) : t instanceof me ? Np(n, e, t) : t instanceof xe ? wp(n, e, t) : t instanceof Se ? _p(n, e, t) : $t(n, e, t);
}
function Cp(n, e, t) {
  const r = X(n, e, t, {
    type: Ou
  });
  at(n, r);
  const i = ln(n, e, r, t, $t(n, e, t));
  return Fu(n, e, t, i);
}
function Np(n, e, t) {
  const r = X(n, e, t, {
    type: Ou
  });
  at(n, r);
  const i = ln(n, e, r, t, $t(n, e, t)), s = oa(n, e, t.separator, t);
  return Fu(n, e, t, i, s);
}
function wp(n, e, t) {
  const r = X(n, e, t, {
    type: Lu
  });
  at(n, r);
  const i = ln(n, e, r, t, $t(n, e, t));
  return Du(n, e, t, i);
}
function _p(n, e, t) {
  const r = X(n, e, t, {
    type: Lu
  });
  at(n, r);
  const i = ln(n, e, r, t, $t(n, e, t)), s = oa(n, e, t.separator, t);
  return Du(n, e, t, i, s);
}
function Lp(n, e, t) {
  const r = X(n, e, t, {
    type: rt
  });
  at(n, r);
  const i = x(t.definition, (a) => Mu(n, e, a));
  return ln(n, e, r, t, ...i);
}
function Op(n, e, t) {
  const r = X(n, e, t, {
    type: rt
  });
  at(n, r);
  const i = ln(n, e, r, t, $t(n, e, t));
  return bp(n, e, t, i);
}
function $t(n, e, t) {
  const r = $e(x(t.definition, (i) => Mu(n, e, i)), (i) => i !== void 0);
  return r.length === 1 ? r[0] : r.length === 0 ? void 0 : Mp(n, r);
}
function Du(n, e, t, r, i) {
  const s = r.left, a = r.right, o = X(n, e, t, {
    type: xp
  });
  at(n, o);
  const l = X(n, e, t, {
    type: bu
  });
  return s.loopback = o, l.loopback = o, n.decisionMap[Zt(e, i ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", t.idx)] = o, j(a, o), i === void 0 ? (j(o, s), j(o, l)) : (j(o, l), j(o, i.left), j(i.right, s)), {
    left: s,
    right: l
  };
}
function Fu(n, e, t, r, i) {
  const s = r.left, a = r.right, o = X(n, e, t, {
    type: $p
  });
  at(n, o);
  const l = X(n, e, t, {
    type: bu
  }), u = X(n, e, t, {
    type: kp
  });
  return o.loopback = u, l.loopback = u, j(o, s), j(o, l), j(a, u), i !== void 0 ? (j(u, l), j(u, i.left), j(i.right, s)) : j(u, o), n.decisionMap[Zt(e, i ? "RepetitionWithSeparator" : "Repetition", t.idx)] = o, {
    left: o,
    right: l
  };
}
function bp(n, e, t, r) {
  const i = r.left, s = r.right;
  return j(i, s), n.decisionMap[Zt(e, "Option", t.idx)] = i, r;
}
function at(n, e) {
  return n.decisionStates.push(e), e.decision = n.decisionStates.length - 1, e.decision;
}
function ln(n, e, t, r, ...i) {
  const s = X(n, e, r, {
    type: Ep,
    start: t
  });
  t.end = s;
  for (const o of i)
    o !== void 0 ? (j(t, o.left), j(o.right, s)) : j(t, s);
  const a = {
    left: t,
    right: s
  };
  return n.decisionMap[Zt(e, Pp(r), r.idx)] = t, a;
}
function Pp(n) {
  if (n instanceof ge)
    return "Alternation";
  if (n instanceof ne)
    return "Option";
  if (n instanceof W)
    return "Repetition";
  if (n instanceof me)
    return "RepetitionWithSeparator";
  if (n instanceof xe)
    return "RepetitionMandatory";
  if (n instanceof Se)
    return "RepetitionMandatoryWithSeparator";
  throw new Error("Invalid production type encountered");
}
function Mp(n, e) {
  const t = e.length;
  for (let s = 0; s < t - 1; s++) {
    const a = e[s];
    let o;
    a.left.transitions.length === 1 && (o = a.left.transitions[0]);
    const l = o instanceof aa, u = o, c = e[s + 1].left;
    a.left.type === rt && a.right.type === rt && o !== void 0 && (l && u.followState === a.right || o.target === a.right) ? (l ? u.followState = c : o.target = c, Gp(n, a.right)) : j(a.right, c);
  }
  const r = e[0], i = e[t - 1];
  return {
    left: r.left,
    right: i.right
  };
}
function oa(n, e, t, r) {
  const i = X(n, e, r, {
    type: rt
  }), s = X(n, e, r, {
    type: rt
  });
  return la(i, new sa(s, t)), {
    left: i,
    right: s
  };
}
function Dp(n, e, t) {
  const r = t.referencedRule, i = n.ruleToStartState.get(r), s = X(n, e, t, {
    type: rt
  }), a = X(n, e, t, {
    type: rt
  }), o = new aa(i, r, a);
  return la(s, o), {
    left: s,
    right: a
  };
}
function Fp(n, e, t) {
  const r = n.ruleToStartState.get(e);
  j(r, t.left);
  const i = n.ruleToStopState.get(e);
  return j(t.right, i), {
    left: r,
    right: i
  };
}
function j(n, e) {
  const t = new Pu(e);
  la(n, t);
}
function X(n, e, t, r) {
  const i = Object.assign({
    atn: n,
    production: t,
    epsilonOnlyTransitions: !1,
    rule: e,
    transitions: [],
    nextTokenWithinRule: [],
    stateNumber: n.states.length
  }, r);
  return n.states.push(i), i;
}
function la(n, e) {
  n.transitions.length === 0 && (n.epsilonOnlyTransitions = e.isEpsilon()), n.transitions.push(e);
}
function Gp(n, e) {
  n.states.splice(n.states.indexOf(e), 1);
}
const ti = {};
class Rs {
  constructor() {
    this.map = {}, this.configs = [];
  }
  get size() {
    return this.configs.length;
  }
  finalize() {
    this.map = {};
  }
  add(e) {
    const t = Gu(e);
    t in this.map || (this.map[t] = this.configs.length, this.configs.push(e));
  }
  get elements() {
    return this.configs;
  }
  get alts() {
    return x(this.configs, (e) => e.alt);
  }
  get key() {
    let e = "";
    for (const t in this.map)
      e += t + ":";
    return e;
  }
}
function Gu(n, e = !0) {
  return `${e ? `a${n.alt}` : ""}s${n.state.stateNumber}:${n.stack.map((t) => t.stateNumber.toString()).join("_")}`;
}
function Up(n, e) {
  const t = {};
  return (r) => {
    const i = r.toString();
    let s = t[i];
    return s !== void 0 || (s = {
      atnStartState: n,
      decision: e,
      states: {}
    }, t[i] = s), s;
  };
}
class Uu {
  constructor() {
    this.predicates = [];
  }
  is(e) {
    return e >= this.predicates.length || this.predicates[e];
  }
  set(e, t) {
    this.predicates[e] = t;
  }
  toString() {
    let e = "";
    const t = this.predicates.length;
    for (let r = 0; r < t; r++)
      e += this.predicates[r] === !0 ? "1" : "0";
    return e;
  }
}
const Xa = new Uu();
class Bp extends ra {
  constructor(e) {
    var t;
    super(), this.logging = (t = e == null ? void 0 : e.logging) !== null && t !== void 0 ? t : (r) => console.log(r);
  }
  initialize(e) {
    this.atn = Sp(e.rules), this.dfas = Vp(this.atn);
  }
  validateAmbiguousAlternationAlternatives() {
    return [];
  }
  validateEmptyOrAlternatives() {
    return [];
  }
  buildLookaheadForAlternation(e) {
    const { prodOccurrence: t, rule: r, hasPredicates: i, dynamicTokensEnabled: s } = e, a = this.dfas, o = this.logging, l = Zt(r, "Alternation", t), c = this.atn.decisionMap[l].decision, d = x(Va({
      maxLookahead: 1,
      occurrence: t,
      prodType: "Alternation",
      rule: r
    }), (h) => x(h, (f) => f[0]));
    if (Ja(d, !1) && !s) {
      const h = le(d, (f, m, g) => (C(m, (A) => {
        A && (f[A.tokenTypeIdx] = g, C(A.categoryMatches, (y) => {
          f[y] = g;
        }));
      }), f), {});
      return i ? function(f) {
        var m;
        const g = this.LA(1), A = h[g.tokenTypeIdx];
        if (f !== void 0 && A !== void 0) {
          const y = (m = f[A]) === null || m === void 0 ? void 0 : m.GATE;
          if (y !== void 0 && y.call(this) === !1)
            return;
        }
        return A;
      } : function() {
        const f = this.LA(1);
        return h[f.tokenTypeIdx];
      };
    } else return i ? function(h) {
      const f = new Uu(), m = h === void 0 ? 0 : h.length;
      for (let A = 0; A < m; A++) {
        const y = h == null ? void 0 : h[A].GATE;
        f.set(A, y === void 0 || y.call(this));
      }
      const g = Vi.call(this, a, c, f, o);
      return typeof g == "number" ? g : void 0;
    } : function() {
      const h = Vi.call(this, a, c, Xa, o);
      return typeof h == "number" ? h : void 0;
    };
  }
  buildLookaheadForOptional(e) {
    const { prodOccurrence: t, rule: r, prodType: i, dynamicTokensEnabled: s } = e, a = this.dfas, o = this.logging, l = Zt(r, i, t), c = this.atn.decisionMap[l].decision, d = x(Va({
      maxLookahead: 1,
      occurrence: t,
      prodType: i,
      rule: r
    }), (h) => x(h, (f) => f[0]));
    if (Ja(d) && d[0][0] && !s) {
      const h = d[0], f = Ne(h);
      if (f.length === 1 && D(f[0].categoryMatches)) {
        const g = f[0].tokenTypeIdx;
        return function() {
          return this.LA(1).tokenTypeIdx === g;
        };
      } else {
        const m = le(f, (g, A) => (A !== void 0 && (g[A.tokenTypeIdx] = !0, C(A.categoryMatches, (y) => {
          g[y] = !0;
        })), g), {});
        return function() {
          const g = this.LA(1);
          return m[g.tokenTypeIdx] === !0;
        };
      }
    }
    return function() {
      const h = Vi.call(this, a, c, Xa, o);
      return typeof h == "object" ? !1 : h === 0;
    };
  }
}
function Ja(n, e = !0) {
  const t = /* @__PURE__ */ new Set();
  for (const r of n) {
    const i = /* @__PURE__ */ new Set();
    for (const s of r) {
      if (s === void 0) {
        if (e)
          break;
        return !1;
      }
      const a = [s.tokenTypeIdx].concat(s.categoryMatches);
      for (const o of a)
        if (t.has(o)) {
          if (!i.has(o))
            return !1;
        } else
          t.add(o), i.add(o);
    }
  }
  return !0;
}
function Vp(n) {
  const e = n.decisionStates.length, t = Array(e);
  for (let r = 0; r < e; r++)
    t[r] = Up(n.decisionStates[r], r);
  return t;
}
function Vi(n, e, t, r) {
  const i = n[e](t);
  let s = i.start;
  if (s === void 0) {
    const o = Zp(i.atnStartState);
    s = Vu(i, Bu(o)), i.start = s;
  }
  return Kp.apply(this, [i, s, t, r]);
}
function Kp(n, e, t, r) {
  let i = e, s = 1;
  const a = [];
  let o = this.LA(s++);
  for (; ; ) {
    let l = Yp(i, o);
    if (l === void 0 && (l = Wp.apply(this, [n, i, o, s, t, r])), l === ti)
      return qp(a, i, o);
    if (l.isAcceptState === !0)
      return l.prediction;
    i = l, a.push(o), o = this.LA(s++);
  }
}
function Wp(n, e, t, r, i, s) {
  const a = Xp(e.configs, t, i);
  if (a.size === 0)
    return Qa(n, e, t, ti), ti;
  let o = Bu(a);
  const l = Qp(a, i);
  if (l !== void 0)
    o.isAcceptState = !0, o.prediction = l, o.configs.uniqueAlt = l;
  else if (rm(a)) {
    const u = Yc(a.alts);
    o.isAcceptState = !0, o.prediction = u, o.configs.uniqueAlt = u, Hp.apply(this, [n, r, a.alts, s]);
  }
  return o = Qa(n, e, t, o), o;
}
function Hp(n, e, t, r) {
  const i = [];
  for (let u = 1; u <= e; u++)
    i.push(this.LA(u).tokenType);
  const s = n.atnStartState, a = s.rule, o = s.production, l = jp({
    topLevelRule: a,
    ambiguityIndices: t,
    production: o,
    prefixPath: i
  });
  r(l);
}
function jp(n) {
  const e = x(n.prefixPath, (i) => Lt(i)).join(", "), t = n.production.idx === 0 ? "" : n.production.idx;
  let r = `Ambiguous Alternatives Detected: <${n.ambiguityIndices.join(", ")}> in <${zp(n.production)}${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
  return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
}
function zp(n) {
  if (n instanceof ue)
    return "SUBRULE";
  if (n instanceof ne)
    return "OPTION";
  if (n instanceof ge)
    return "OR";
  if (n instanceof xe)
    return "AT_LEAST_ONE";
  if (n instanceof Se)
    return "AT_LEAST_ONE_SEP";
  if (n instanceof me)
    return "MANY_SEP";
  if (n instanceof W)
    return "MANY";
  if (n instanceof G)
    return "CONSUME";
  throw Error("non exhaustive match");
}
function qp(n, e, t) {
  const r = Ee(e.configs.elements, (s) => s.state.transitions), i = md(r.filter((s) => s instanceof sa).map((s) => s.tokenType), (s) => s.tokenTypeIdx);
  return {
    actualToken: t,
    possibleTokenTypes: i,
    tokenPath: n
  };
}
function Yp(n, e) {
  return n.edges[e.tokenTypeIdx];
}
function Xp(n, e, t) {
  const r = new Rs(), i = [];
  for (const a of n.elements) {
    if (t.is(a.alt) === !1)
      continue;
    if (a.state.type === ar) {
      i.push(a);
      continue;
    }
    const o = a.state.transitions.length;
    for (let l = 0; l < o; l++) {
      const u = a.state.transitions[l], c = Jp(u, e);
      c !== void 0 && r.add({
        state: c,
        alt: a.alt,
        stack: a.stack
      });
    }
  }
  let s;
  if (i.length === 0 && r.size === 1 && (s = r), s === void 0) {
    s = new Rs();
    for (const a of r.elements)
      ni(a, s);
  }
  if (i.length > 0 && !tm(s))
    for (const a of i)
      s.add(a);
  return s;
}
function Jp(n, e) {
  if (n instanceof sa && hu(e, n.tokenType))
    return n.target;
}
function Qp(n, e) {
  let t;
  for (const r of n.elements)
    if (e.is(r.alt) === !0) {
      if (t === void 0)
        t = r.alt;
      else if (t !== r.alt)
        return;
    }
  return t;
}
function Bu(n) {
  return {
    configs: n,
    edges: {},
    isAcceptState: !1,
    prediction: -1
  };
}
function Qa(n, e, t, r) {
  return r = Vu(n, r), e.edges[t.tokenTypeIdx] = r, r;
}
function Vu(n, e) {
  if (e === ti)
    return e;
  const t = e.configs.key, r = n.states[t];
  return r !== void 0 ? r : (e.configs.finalize(), n.states[t] = e, e);
}
function Zp(n) {
  const e = new Rs(), t = n.transitions.length;
  for (let r = 0; r < t; r++) {
    const s = {
      state: n.transitions[r].target,
      alt: r,
      stack: []
    };
    ni(s, e);
  }
  return e;
}
function ni(n, e) {
  const t = n.state;
  if (t.type === ar) {
    if (n.stack.length > 0) {
      const i = [...n.stack], a = {
        state: i.pop(),
        alt: n.alt,
        stack: i
      };
      ni(a, e);
    } else
      e.add(n);
    return;
  }
  t.epsilonOnlyTransitions || e.add(n);
  const r = t.transitions.length;
  for (let i = 0; i < r; i++) {
    const s = t.transitions[i], a = em(n, s);
    a !== void 0 && ni(a, e);
  }
}
function em(n, e) {
  if (e instanceof Pu)
    return {
      state: e.target,
      alt: n.alt,
      stack: n.stack
    };
  if (e instanceof aa) {
    const t = [...n.stack, e.followState];
    return {
      state: e.target,
      alt: n.alt,
      stack: t
    };
  }
}
function tm(n) {
  for (const e of n.elements)
    if (e.state.type === ar)
      return !0;
  return !1;
}
function nm(n) {
  for (const e of n.elements)
    if (e.state.type !== ar)
      return !1;
  return !0;
}
function rm(n) {
  if (nm(n))
    return !0;
  const e = im(n.elements);
  return sm(e) && !am(e);
}
function im(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const r = Gu(t, !1);
    let i = e.get(r);
    i === void 0 && (i = {}, e.set(r, i)), i[t.alt] = !0;
  }
  return e;
}
function sm(n) {
  for (const e of Array.from(n.values()))
    if (Object.keys(e).length > 1)
      return !0;
  return !1;
}
function am(n) {
  for (const e of Array.from(n.values()))
    if (Object.keys(e).length === 1)
      return !0;
  return !1;
}
var Za;
(function(n) {
  function e(t) {
    return typeof t == "string";
  }
  n.is = e;
})(Za || (Za = {}));
var vs;
(function(n) {
  function e(t) {
    return typeof t == "string";
  }
  n.is = e;
})(vs || (vs = {}));
var eo;
(function(n) {
  n.MIN_VALUE = -2147483648, n.MAX_VALUE = 2147483647;
  function e(t) {
    return typeof t == "number" && n.MIN_VALUE <= t && t <= n.MAX_VALUE;
  }
  n.is = e;
})(eo || (eo = {}));
var ri;
(function(n) {
  n.MIN_VALUE = 0, n.MAX_VALUE = 2147483647;
  function e(t) {
    return typeof t == "number" && n.MIN_VALUE <= t && t <= n.MAX_VALUE;
  }
  n.is = e;
})(ri || (ri = {}));
var P;
(function(n) {
  function e(r, i) {
    return r === Number.MAX_VALUE && (r = ri.MAX_VALUE), i === Number.MAX_VALUE && (i = ri.MAX_VALUE), { line: r, character: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && p.uinteger(i.line) && p.uinteger(i.character);
  }
  n.is = t;
})(P || (P = {}));
var b;
(function(n) {
  function e(r, i, s, a) {
    if (p.uinteger(r) && p.uinteger(i) && p.uinteger(s) && p.uinteger(a))
      return { start: P.create(r, i), end: P.create(s, a) };
    if (P.is(r) && P.is(i))
      return { start: r, end: i };
    throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${a}]`);
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && P.is(i.start) && P.is(i.end);
  }
  n.is = t;
})(b || (b = {}));
var ii;
(function(n) {
  function e(r, i) {
    return { uri: r, range: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && b.is(i.range) && (p.string(i.uri) || p.undefined(i.uri));
  }
  n.is = t;
})(ii || (ii = {}));
var to;
(function(n) {
  function e(r, i, s, a) {
    return { targetUri: r, targetRange: i, targetSelectionRange: s, originSelectionRange: a };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && b.is(i.targetRange) && p.string(i.targetUri) && b.is(i.targetSelectionRange) && (b.is(i.originSelectionRange) || p.undefined(i.originSelectionRange));
  }
  n.is = t;
})(to || (to = {}));
var As;
(function(n) {
  function e(r, i, s, a) {
    return {
      red: r,
      green: i,
      blue: s,
      alpha: a
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.numberRange(i.red, 0, 1) && p.numberRange(i.green, 0, 1) && p.numberRange(i.blue, 0, 1) && p.numberRange(i.alpha, 0, 1);
  }
  n.is = t;
})(As || (As = {}));
var no;
(function(n) {
  function e(r, i) {
    return {
      range: r,
      color: i
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && b.is(i.range) && As.is(i.color);
  }
  n.is = t;
})(no || (no = {}));
var ro;
(function(n) {
  function e(r, i, s) {
    return {
      label: r,
      textEdit: i,
      additionalTextEdits: s
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.string(i.label) && (p.undefined(i.textEdit) || tn.is(i)) && (p.undefined(i.additionalTextEdits) || p.typedArray(i.additionalTextEdits, tn.is));
  }
  n.is = t;
})(ro || (ro = {}));
var io;
(function(n) {
  n.Comment = "comment", n.Imports = "imports", n.Region = "region";
})(io || (io = {}));
var so;
(function(n) {
  function e(r, i, s, a, o, l) {
    const u = {
      startLine: r,
      endLine: i
    };
    return p.defined(s) && (u.startCharacter = s), p.defined(a) && (u.endCharacter = a), p.defined(o) && (u.kind = o), p.defined(l) && (u.collapsedText = l), u;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.uinteger(i.startLine) && p.uinteger(i.startLine) && (p.undefined(i.startCharacter) || p.uinteger(i.startCharacter)) && (p.undefined(i.endCharacter) || p.uinteger(i.endCharacter)) && (p.undefined(i.kind) || p.string(i.kind));
  }
  n.is = t;
})(so || (so = {}));
var Es;
(function(n) {
  function e(r, i) {
    return {
      location: r,
      message: i
    };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && ii.is(i.location) && p.string(i.message);
  }
  n.is = t;
})(Es || (Es = {}));
var ao;
(function(n) {
  n.Error = 1, n.Warning = 2, n.Information = 3, n.Hint = 4;
})(ao || (ao = {}));
var oo;
(function(n) {
  n.Unnecessary = 1, n.Deprecated = 2;
})(oo || (oo = {}));
var lo;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && p.string(r.href);
  }
  n.is = e;
})(lo || (lo = {}));
var si;
(function(n) {
  function e(r, i, s, a, o, l) {
    let u = { range: r, message: i };
    return p.defined(s) && (u.severity = s), p.defined(a) && (u.code = a), p.defined(o) && (u.source = o), p.defined(l) && (u.relatedInformation = l), u;
  }
  n.create = e;
  function t(r) {
    var i;
    let s = r;
    return p.defined(s) && b.is(s.range) && p.string(s.message) && (p.number(s.severity) || p.undefined(s.severity)) && (p.integer(s.code) || p.string(s.code) || p.undefined(s.code)) && (p.undefined(s.codeDescription) || p.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (p.string(s.source) || p.undefined(s.source)) && (p.undefined(s.relatedInformation) || p.typedArray(s.relatedInformation, Es.is));
  }
  n.is = t;
})(si || (si = {}));
var en;
(function(n) {
  function e(r, i, ...s) {
    let a = { title: r, command: i };
    return p.defined(s) && s.length > 0 && (a.arguments = s), a;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.title) && p.string(i.command);
  }
  n.is = t;
})(en || (en = {}));
var tn;
(function(n) {
  function e(s, a) {
    return { range: s, newText: a };
  }
  n.replace = e;
  function t(s, a) {
    return { range: { start: s, end: s }, newText: a };
  }
  n.insert = t;
  function r(s) {
    return { range: s, newText: "" };
  }
  n.del = r;
  function i(s) {
    const a = s;
    return p.objectLiteral(a) && p.string(a.newText) && b.is(a.range);
  }
  n.is = i;
})(tn || (tn = {}));
var ks;
(function(n) {
  function e(r, i, s) {
    const a = { label: r };
    return i !== void 0 && (a.needsConfirmation = i), s !== void 0 && (a.description = s), a;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.string(i.label) && (p.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (p.string(i.description) || i.description === void 0);
  }
  n.is = t;
})(ks || (ks = {}));
var nn;
(function(n) {
  function e(t) {
    const r = t;
    return p.string(r);
  }
  n.is = e;
})(nn || (nn = {}));
var uo;
(function(n) {
  function e(s, a, o) {
    return { range: s, newText: a, annotationId: o };
  }
  n.replace = e;
  function t(s, a, o) {
    return { range: { start: s, end: s }, newText: a, annotationId: o };
  }
  n.insert = t;
  function r(s, a) {
    return { range: s, newText: "", annotationId: a };
  }
  n.del = r;
  function i(s) {
    const a = s;
    return tn.is(a) && (ks.is(a.annotationId) || nn.is(a.annotationId));
  }
  n.is = i;
})(uo || (uo = {}));
var $s;
(function(n) {
  function e(r, i) {
    return { textDocument: r, edits: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && Ns.is(i.textDocument) && Array.isArray(i.edits);
  }
  n.is = t;
})($s || ($s = {}));
var xs;
(function(n) {
  function e(r, i, s) {
    let a = {
      kind: "create",
      uri: r
    };
    return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "create" && p.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || p.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || p.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || nn.is(i.annotationId));
  }
  n.is = t;
})(xs || (xs = {}));
var Ss;
(function(n) {
  function e(r, i, s, a) {
    let o = {
      kind: "rename",
      oldUri: r,
      newUri: i
    };
    return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (o.options = s), a !== void 0 && (o.annotationId = a), o;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "rename" && p.string(i.oldUri) && p.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || p.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || p.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || nn.is(i.annotationId));
  }
  n.is = t;
})(Ss || (Ss = {}));
var Is;
(function(n) {
  function e(r, i, s) {
    let a = {
      kind: "delete",
      uri: r
    };
    return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "delete" && p.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || p.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || p.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || nn.is(i.annotationId));
  }
  n.is = t;
})(Is || (Is = {}));
var Cs;
(function(n) {
  function e(t) {
    let r = t;
    return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => p.string(i.kind) ? xs.is(i) || Ss.is(i) || Is.is(i) : $s.is(i)));
  }
  n.is = e;
})(Cs || (Cs = {}));
var co;
(function(n) {
  function e(r) {
    return { uri: r };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri);
  }
  n.is = t;
})(co || (co = {}));
var fo;
(function(n) {
  function e(r, i) {
    return { uri: r, version: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && p.integer(i.version);
  }
  n.is = t;
})(fo || (fo = {}));
var Ns;
(function(n) {
  function e(r, i) {
    return { uri: r, version: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && (i.version === null || p.integer(i.version));
  }
  n.is = t;
})(Ns || (Ns = {}));
var ho;
(function(n) {
  function e(r, i, s, a) {
    return { uri: r, languageId: i, version: s, text: a };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && p.string(i.languageId) && p.integer(i.version) && p.string(i.text);
  }
  n.is = t;
})(ho || (ho = {}));
var ws;
(function(n) {
  n.PlainText = "plaintext", n.Markdown = "markdown";
  function e(t) {
    const r = t;
    return r === n.PlainText || r === n.Markdown;
  }
  n.is = e;
})(ws || (ws = {}));
var Jn;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(t) && ws.is(r.kind) && p.string(r.value);
  }
  n.is = e;
})(Jn || (Jn = {}));
var po;
(function(n) {
  n.Text = 1, n.Method = 2, n.Function = 3, n.Constructor = 4, n.Field = 5, n.Variable = 6, n.Class = 7, n.Interface = 8, n.Module = 9, n.Property = 10, n.Unit = 11, n.Value = 12, n.Enum = 13, n.Keyword = 14, n.Snippet = 15, n.Color = 16, n.File = 17, n.Reference = 18, n.Folder = 19, n.EnumMember = 20, n.Constant = 21, n.Struct = 22, n.Event = 23, n.Operator = 24, n.TypeParameter = 25;
})(po || (po = {}));
var mo;
(function(n) {
  n.PlainText = 1, n.Snippet = 2;
})(mo || (mo = {}));
var go;
(function(n) {
  n.Deprecated = 1;
})(go || (go = {}));
var yo;
(function(n) {
  function e(r, i, s) {
    return { newText: r, insert: i, replace: s };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i && p.string(i.newText) && b.is(i.insert) && b.is(i.replace);
  }
  n.is = t;
})(yo || (yo = {}));
var To;
(function(n) {
  n.asIs = 1, n.adjustIndentation = 2;
})(To || (To = {}));
var Ro;
(function(n) {
  function e(t) {
    const r = t;
    return r && (p.string(r.detail) || r.detail === void 0) && (p.string(r.description) || r.description === void 0);
  }
  n.is = e;
})(Ro || (Ro = {}));
var vo;
(function(n) {
  function e(t) {
    return { label: t };
  }
  n.create = e;
})(vo || (vo = {}));
var Ao;
(function(n) {
  function e(t, r) {
    return { items: t || [], isIncomplete: !!r };
  }
  n.create = e;
})(Ao || (Ao = {}));
var ai;
(function(n) {
  function e(r) {
    return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  n.fromPlainText = e;
  function t(r) {
    const i = r;
    return p.string(i) || p.objectLiteral(i) && p.string(i.language) && p.string(i.value);
  }
  n.is = t;
})(ai || (ai = {}));
var Eo;
(function(n) {
  function e(t) {
    let r = t;
    return !!r && p.objectLiteral(r) && (Jn.is(r.contents) || ai.is(r.contents) || p.typedArray(r.contents, ai.is)) && (t.range === void 0 || b.is(t.range));
  }
  n.is = e;
})(Eo || (Eo = {}));
var ko;
(function(n) {
  function e(t, r) {
    return r ? { label: t, documentation: r } : { label: t };
  }
  n.create = e;
})(ko || (ko = {}));
var $o;
(function(n) {
  function e(t, r, ...i) {
    let s = { label: t };
    return p.defined(r) && (s.documentation = r), p.defined(i) ? s.parameters = i : s.parameters = [], s;
  }
  n.create = e;
})($o || ($o = {}));
var xo;
(function(n) {
  n.Text = 1, n.Read = 2, n.Write = 3;
})(xo || (xo = {}));
var So;
(function(n) {
  function e(t, r) {
    let i = { range: t };
    return p.number(r) && (i.kind = r), i;
  }
  n.create = e;
})(So || (So = {}));
var Io;
(function(n) {
  n.File = 1, n.Module = 2, n.Namespace = 3, n.Package = 4, n.Class = 5, n.Method = 6, n.Property = 7, n.Field = 8, n.Constructor = 9, n.Enum = 10, n.Interface = 11, n.Function = 12, n.Variable = 13, n.Constant = 14, n.String = 15, n.Number = 16, n.Boolean = 17, n.Array = 18, n.Object = 19, n.Key = 20, n.Null = 21, n.EnumMember = 22, n.Struct = 23, n.Event = 24, n.Operator = 25, n.TypeParameter = 26;
})(Io || (Io = {}));
var Co;
(function(n) {
  n.Deprecated = 1;
})(Co || (Co = {}));
var No;
(function(n) {
  function e(t, r, i, s, a) {
    let o = {
      name: t,
      kind: r,
      location: { uri: s, range: i }
    };
    return a && (o.containerName = a), o;
  }
  n.create = e;
})(No || (No = {}));
var wo;
(function(n) {
  function e(t, r, i, s) {
    return s !== void 0 ? { name: t, kind: r, location: { uri: i, range: s } } : { name: t, kind: r, location: { uri: i } };
  }
  n.create = e;
})(wo || (wo = {}));
var _o;
(function(n) {
  function e(r, i, s, a, o, l) {
    let u = {
      name: r,
      detail: i,
      kind: s,
      range: a,
      selectionRange: o
    };
    return l !== void 0 && (u.children = l), u;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && p.string(i.name) && p.number(i.kind) && b.is(i.range) && b.is(i.selectionRange) && (i.detail === void 0 || p.string(i.detail)) && (i.deprecated === void 0 || p.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
  }
  n.is = t;
})(_o || (_o = {}));
var Lo;
(function(n) {
  n.Empty = "", n.QuickFix = "quickfix", n.Refactor = "refactor", n.RefactorExtract = "refactor.extract", n.RefactorInline = "refactor.inline", n.RefactorRewrite = "refactor.rewrite", n.Source = "source", n.SourceOrganizeImports = "source.organizeImports", n.SourceFixAll = "source.fixAll";
})(Lo || (Lo = {}));
var oi;
(function(n) {
  n.Invoked = 1, n.Automatic = 2;
})(oi || (oi = {}));
var Oo;
(function(n) {
  function e(r, i, s) {
    let a = { diagnostics: r };
    return i != null && (a.only = i), s != null && (a.triggerKind = s), a;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.typedArray(i.diagnostics, si.is) && (i.only === void 0 || p.typedArray(i.only, p.string)) && (i.triggerKind === void 0 || i.triggerKind === oi.Invoked || i.triggerKind === oi.Automatic);
  }
  n.is = t;
})(Oo || (Oo = {}));
var bo;
(function(n) {
  function e(r, i, s) {
    let a = { title: r }, o = !0;
    return typeof i == "string" ? (o = !1, a.kind = i) : en.is(i) ? a.command = i : a.edit = i, o && s !== void 0 && (a.kind = s), a;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && p.string(i.title) && (i.diagnostics === void 0 || p.typedArray(i.diagnostics, si.is)) && (i.kind === void 0 || p.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || en.is(i.command)) && (i.isPreferred === void 0 || p.boolean(i.isPreferred)) && (i.edit === void 0 || Cs.is(i.edit));
  }
  n.is = t;
})(bo || (bo = {}));
var Po;
(function(n) {
  function e(r, i) {
    let s = { range: r };
    return p.defined(i) && (s.data = i), s;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && b.is(i.range) && (p.undefined(i.command) || en.is(i.command));
  }
  n.is = t;
})(Po || (Po = {}));
var Mo;
(function(n) {
  function e(r, i) {
    return { tabSize: r, insertSpaces: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.uinteger(i.tabSize) && p.boolean(i.insertSpaces);
  }
  n.is = t;
})(Mo || (Mo = {}));
var Do;
(function(n) {
  function e(r, i, s) {
    return { range: r, target: i, data: s };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && b.is(i.range) && (p.undefined(i.target) || p.string(i.target));
  }
  n.is = t;
})(Do || (Do = {}));
var Fo;
(function(n) {
  function e(r, i) {
    return { range: r, parent: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && b.is(i.range) && (i.parent === void 0 || n.is(i.parent));
  }
  n.is = t;
})(Fo || (Fo = {}));
var Go;
(function(n) {
  n.namespace = "namespace", n.type = "type", n.class = "class", n.enum = "enum", n.interface = "interface", n.struct = "struct", n.typeParameter = "typeParameter", n.parameter = "parameter", n.variable = "variable", n.property = "property", n.enumMember = "enumMember", n.event = "event", n.function = "function", n.method = "method", n.macro = "macro", n.keyword = "keyword", n.modifier = "modifier", n.comment = "comment", n.string = "string", n.number = "number", n.regexp = "regexp", n.operator = "operator", n.decorator = "decorator";
})(Go || (Go = {}));
var Uo;
(function(n) {
  n.declaration = "declaration", n.definition = "definition", n.readonly = "readonly", n.static = "static", n.deprecated = "deprecated", n.abstract = "abstract", n.async = "async", n.modification = "modification", n.documentation = "documentation", n.defaultLibrary = "defaultLibrary";
})(Uo || (Uo = {}));
var Bo;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
  }
  n.is = e;
})(Bo || (Bo = {}));
var Vo;
(function(n) {
  function e(r, i) {
    return { range: r, text: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && b.is(i.range) && p.string(i.text);
  }
  n.is = t;
})(Vo || (Vo = {}));
var Ko;
(function(n) {
  function e(r, i, s) {
    return { range: r, variableName: i, caseSensitiveLookup: s };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && b.is(i.range) && p.boolean(i.caseSensitiveLookup) && (p.string(i.variableName) || i.variableName === void 0);
  }
  n.is = t;
})(Ko || (Ko = {}));
var Wo;
(function(n) {
  function e(r, i) {
    return { range: r, expression: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && b.is(i.range) && (p.string(i.expression) || i.expression === void 0);
  }
  n.is = t;
})(Wo || (Wo = {}));
var Ho;
(function(n) {
  function e(r, i) {
    return { frameId: r, stoppedLocation: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.defined(i) && b.is(r.stoppedLocation);
  }
  n.is = t;
})(Ho || (Ho = {}));
var _s;
(function(n) {
  n.Type = 1, n.Parameter = 2;
  function e(t) {
    return t === 1 || t === 2;
  }
  n.is = e;
})(_s || (_s = {}));
var Ls;
(function(n) {
  function e(r) {
    return { value: r };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && (i.tooltip === void 0 || p.string(i.tooltip) || Jn.is(i.tooltip)) && (i.location === void 0 || ii.is(i.location)) && (i.command === void 0 || en.is(i.command));
  }
  n.is = t;
})(Ls || (Ls = {}));
var jo;
(function(n) {
  function e(r, i, s) {
    const a = { position: r, label: i };
    return s !== void 0 && (a.kind = s), a;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && P.is(i.position) && (p.string(i.label) || p.typedArray(i.label, Ls.is)) && (i.kind === void 0 || _s.is(i.kind)) && i.textEdits === void 0 || p.typedArray(i.textEdits, tn.is) && (i.tooltip === void 0 || p.string(i.tooltip) || Jn.is(i.tooltip)) && (i.paddingLeft === void 0 || p.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || p.boolean(i.paddingRight));
  }
  n.is = t;
})(jo || (jo = {}));
var zo;
(function(n) {
  function e(t) {
    return { kind: "snippet", value: t };
  }
  n.createSnippet = e;
})(zo || (zo = {}));
var qo;
(function(n) {
  function e(t, r, i, s) {
    return { insertText: t, filterText: r, range: i, command: s };
  }
  n.create = e;
})(qo || (qo = {}));
var Yo;
(function(n) {
  function e(t) {
    return { items: t };
  }
  n.create = e;
})(Yo || (Yo = {}));
var Xo;
(function(n) {
  n.Invoked = 0, n.Automatic = 1;
})(Xo || (Xo = {}));
var Jo;
(function(n) {
  function e(t, r) {
    return { range: t, text: r };
  }
  n.create = e;
})(Jo || (Jo = {}));
var Qo;
(function(n) {
  function e(t, r) {
    return { triggerKind: t, selectedCompletionInfo: r };
  }
  n.create = e;
})(Qo || (Qo = {}));
var Zo;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && vs.is(r.uri) && p.string(r.name);
  }
  n.is = e;
})(Zo || (Zo = {}));
var el;
(function(n) {
  function e(s, a, o, l) {
    return new om(s, a, o, l);
  }
  n.create = e;
  function t(s) {
    let a = s;
    return !!(p.defined(a) && p.string(a.uri) && (p.undefined(a.languageId) || p.string(a.languageId)) && p.uinteger(a.lineCount) && p.func(a.getText) && p.func(a.positionAt) && p.func(a.offsetAt));
  }
  n.is = t;
  function r(s, a) {
    let o = s.getText(), l = i(a, (c, d) => {
      let h = c.range.start.line - d.range.start.line;
      return h === 0 ? c.range.start.character - d.range.start.character : h;
    }), u = o.length;
    for (let c = l.length - 1; c >= 0; c--) {
      let d = l[c], h = s.offsetAt(d.range.start), f = s.offsetAt(d.range.end);
      if (f <= u)
        o = o.substring(0, h) + d.newText + o.substring(f, o.length);
      else
        throw new Error("Overlapping edit");
      u = h;
    }
    return o;
  }
  n.applyEdits = r;
  function i(s, a) {
    if (s.length <= 1)
      return s;
    const o = s.length / 2 | 0, l = s.slice(0, o), u = s.slice(o);
    i(l, a), i(u, a);
    let c = 0, d = 0, h = 0;
    for (; c < l.length && d < u.length; )
      a(l[c], u[d]) <= 0 ? s[h++] = l[c++] : s[h++] = u[d++];
    for (; c < l.length; )
      s[h++] = l[c++];
    for (; d < u.length; )
      s[h++] = u[d++];
    return s;
  }
})(el || (el = {}));
let om = class {
  constructor(e, t, r, i) {
    this._uri = e, this._languageId = t, this._version = r, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      let t = this.offsetAt(e.start), r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  }
  update(e, t) {
    this._content = e.text, this._version = t, this._lineOffsets = void 0;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      let e = [], t = this._content, r = !0;
      for (let i = 0; i < t.length; i++) {
        r && (e.push(i), r = !1);
        let s = t.charAt(i);
        r = s === "\r" || s === `
`, s === "\r" && i + 1 < t.length && t.charAt(i + 1) === `
` && i++;
      }
      r && t.length > 0 && e.push(t.length), this._lineOffsets = e;
    }
    return this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let t = this.getLineOffsets(), r = 0, i = t.length;
    if (i === 0)
      return P.create(0, e);
    for (; r < i; ) {
      let a = Math.floor((r + i) / 2);
      t[a] > e ? i = a : r = a + 1;
    }
    let s = r - 1;
    return P.create(s, e - t[s]);
  }
  offsetAt(e) {
    let t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    let r = t[e.line], i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(r + e.character, i), r);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
};
var p;
(function(n) {
  const e = Object.prototype.toString;
  function t(f) {
    return typeof f < "u";
  }
  n.defined = t;
  function r(f) {
    return typeof f > "u";
  }
  n.undefined = r;
  function i(f) {
    return f === !0 || f === !1;
  }
  n.boolean = i;
  function s(f) {
    return e.call(f) === "[object String]";
  }
  n.string = s;
  function a(f) {
    return e.call(f) === "[object Number]";
  }
  n.number = a;
  function o(f, m, g) {
    return e.call(f) === "[object Number]" && m <= f && f <= g;
  }
  n.numberRange = o;
  function l(f) {
    return e.call(f) === "[object Number]" && -2147483648 <= f && f <= 2147483647;
  }
  n.integer = l;
  function u(f) {
    return e.call(f) === "[object Number]" && 0 <= f && f <= 2147483647;
  }
  n.uinteger = u;
  function c(f) {
    return e.call(f) === "[object Function]";
  }
  n.func = c;
  function d(f) {
    return f !== null && typeof f == "object";
  }
  n.objectLiteral = d;
  function h(f, m) {
    return Array.isArray(f) && f.every(m);
  }
  n.typedArray = h;
})(p || (p = {}));
class lm {
  constructor() {
    this.nodeStack = [];
  }
  get current() {
    var e;
    return (e = this.nodeStack[this.nodeStack.length - 1]) !== null && e !== void 0 ? e : this.rootNode;
  }
  buildRootNode(e) {
    return this.rootNode = new Wu(e), this.rootNode.root = this.rootNode, this.nodeStack = [this.rootNode], this.rootNode;
  }
  buildCompositeNode(e) {
    const t = new ua();
    return t.grammarSource = e, t.root = this.rootNode, this.current.content.push(t), this.nodeStack.push(t), t;
  }
  buildLeafNode(e, t) {
    const r = new Os(e.startOffset, e.image.length, as(e), e.tokenType, !t);
    return r.grammarSource = t, r.root = this.rootNode, this.current.content.push(r), r;
  }
  removeNode(e) {
    const t = e.container;
    if (t) {
      const r = t.content.indexOf(e);
      r >= 0 && t.content.splice(r, 1);
    }
  }
  addHiddenNodes(e) {
    const t = [];
    for (const s of e) {
      const a = new Os(s.startOffset, s.image.length, as(s), s.tokenType, !0);
      a.root = this.rootNode, t.push(a);
    }
    let r = this.current, i = !1;
    if (r.content.length > 0) {
      r.content.push(...t);
      return;
    }
    for (; r.container; ) {
      const s = r.container.content.indexOf(r);
      if (s > 0) {
        r.container.content.splice(s, 0, ...t), i = !0;
        break;
      }
      r = r.container;
    }
    i || this.rootNode.content.unshift(...t);
  }
  construct(e) {
    const t = this.current;
    typeof e.$type == "string" && (this.current.astNode = e), e.$cstNode = t;
    const r = this.nodeStack.pop();
    (r == null ? void 0 : r.content.length) === 0 && this.removeNode(r);
  }
}
class Ku {
  /** @deprecated use `container` instead. */
  get parent() {
    return this.container;
  }
  /** @deprecated use `grammarSource` instead. */
  get feature() {
    return this.grammarSource;
  }
  get hidden() {
    return !1;
  }
  get astNode() {
    var e, t;
    const r = typeof ((e = this._astNode) === null || e === void 0 ? void 0 : e.$type) == "string" ? this._astNode : (t = this.container) === null || t === void 0 ? void 0 : t.astNode;
    if (!r)
      throw new Error("This node has no associated AST element");
    return r;
  }
  set astNode(e) {
    this._astNode = e;
  }
  /** @deprecated use `astNode` instead. */
  get element() {
    return this.astNode;
  }
  get text() {
    return this.root.fullText.substring(this.offset, this.end);
  }
}
class Os extends Ku {
  get offset() {
    return this._offset;
  }
  get length() {
    return this._length;
  }
  get end() {
    return this._offset + this._length;
  }
  get hidden() {
    return this._hidden;
  }
  get tokenType() {
    return this._tokenType;
  }
  get range() {
    return this._range;
  }
  constructor(e, t, r, i, s = !1) {
    super(), this._hidden = s, this._offset = e, this._tokenType = i, this._length = t, this._range = r;
  }
}
class ua extends Ku {
  constructor() {
    super(...arguments), this.content = new ca(this);
  }
  /** @deprecated use `content` instead. */
  get children() {
    return this.content;
  }
  get offset() {
    var e, t;
    return (t = (e = this.firstNonHiddenNode) === null || e === void 0 ? void 0 : e.offset) !== null && t !== void 0 ? t : 0;
  }
  get length() {
    return this.end - this.offset;
  }
  get end() {
    var e, t;
    return (t = (e = this.lastNonHiddenNode) === null || e === void 0 ? void 0 : e.end) !== null && t !== void 0 ? t : 0;
  }
  get range() {
    const e = this.firstNonHiddenNode, t = this.lastNonHiddenNode;
    if (e && t) {
      if (this._rangeCache === void 0) {
        const { range: r } = e, { range: i } = t;
        this._rangeCache = { start: r.start, end: i.end.line < r.start.line ? r.start : i.end };
      }
      return this._rangeCache;
    } else
      return { start: P.create(0, 0), end: P.create(0, 0) };
  }
  get firstNonHiddenNode() {
    for (const e of this.content)
      if (!e.hidden)
        return e;
    return this.content[0];
  }
  get lastNonHiddenNode() {
    for (let e = this.content.length - 1; e >= 0; e--) {
      const t = this.content[e];
      if (!t.hidden)
        return t;
    }
    return this.content[this.content.length - 1];
  }
}
class ca extends Array {
  constructor(e) {
    super(), this.parent = e, Object.setPrototypeOf(this, ca.prototype);
  }
  push(...e) {
    return this.addParents(e), super.push(...e);
  }
  unshift(...e) {
    return this.addParents(e), super.unshift(...e);
  }
  splice(e, t, ...r) {
    return this.addParents(r), super.splice(e, t, ...r);
  }
  addParents(e) {
    for (const t of e)
      t.container = this.parent;
  }
}
class Wu extends ua {
  get text() {
    return this._text.substring(this.offset, this.end);
  }
  get fullText() {
    return this._text;
  }
  constructor(e) {
    super(), this._text = "", this._text = e ?? "";
  }
}
const bs = Symbol("Datatype");
function Ki(n) {
  return n.$type === bs;
}
const tl = "​", Hu = (n) => n.endsWith(tl) ? n : n + tl;
class ju {
  constructor(e) {
    this._unorderedGroups = /* @__PURE__ */ new Map(), this.allRules = /* @__PURE__ */ new Map(), this.lexer = e.parser.Lexer;
    const t = this.lexer.definition, r = e.LanguageMetaData.mode === "production";
    this.wrapper = new hm(t, Object.assign(Object.assign({}, e.parser.ParserConfig), { skipValidations: r, errorMessageProvider: e.parser.ParserErrorMessageProvider }));
  }
  alternatives(e, t) {
    this.wrapper.wrapOr(e, t);
  }
  optional(e, t) {
    this.wrapper.wrapOption(e, t);
  }
  many(e, t) {
    this.wrapper.wrapMany(e, t);
  }
  atLeastOne(e, t) {
    this.wrapper.wrapAtLeastOne(e, t);
  }
  getRule(e) {
    return this.allRules.get(e);
  }
  isRecording() {
    return this.wrapper.IS_RECORDING;
  }
  get unorderedGroups() {
    return this._unorderedGroups;
  }
  getRuleStack() {
    return this.wrapper.RULE_STACK;
  }
  finalize() {
    this.wrapper.wrapSelfAnalysis();
  }
}
class um extends ju {
  get current() {
    return this.stack[this.stack.length - 1];
  }
  constructor(e) {
    super(e), this.nodeBuilder = new lm(), this.stack = [], this.assignmentMap = /* @__PURE__ */ new Map(), this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection;
  }
  rule(e, t) {
    const r = this.computeRuleType(e), i = this.wrapper.DEFINE_RULE(Hu(e.name), this.startImplementation(r, t).bind(this));
    return this.allRules.set(e.name, i), e.entry && (this.mainRule = i), i;
  }
  computeRuleType(e) {
    if (!e.fragment) {
      if (Jl(e))
        return bs;
      {
        const t = Ys(e);
        return t ?? e.name;
      }
    }
  }
  parse(e, t = {}) {
    this.nodeBuilder.buildRootNode(e);
    const r = this.lexerResult = this.lexer.tokenize(e);
    this.wrapper.input = r.tokens;
    const i = t.rule ? this.allRules.get(t.rule) : this.mainRule;
    if (!i)
      throw new Error(t.rule ? `No rule found with name '${t.rule}'` : "No main rule available.");
    const s = i.call(this.wrapper, {});
    return this.nodeBuilder.addHiddenNodes(r.hidden), this.unorderedGroups.clear(), this.lexerResult = void 0, {
      value: s,
      lexerErrors: r.errors,
      lexerReport: r.report,
      parserErrors: this.wrapper.errors
    };
  }
  startImplementation(e, t) {
    return (r) => {
      const i = !this.isRecording() && e !== void 0;
      if (i) {
        const a = { $type: e };
        this.stack.push(a), e === bs && (a.value = "");
      }
      let s;
      try {
        s = t(r);
      } catch {
        s = void 0;
      }
      return s === void 0 && i && (s = this.construct()), s;
    };
  }
  extractHiddenTokens(e) {
    const t = this.lexerResult.hidden;
    if (!t.length)
      return [];
    const r = e.startOffset;
    for (let i = 0; i < t.length; i++)
      if (t[i].startOffset > r)
        return t.splice(0, i);
    return t.splice(0, t.length);
  }
  consume(e, t, r) {
    const i = this.wrapper.wrapConsume(e, t);
    if (!this.isRecording() && this.isValidToken(i)) {
      const s = this.extractHiddenTokens(i);
      this.nodeBuilder.addHiddenNodes(s);
      const a = this.nodeBuilder.buildLeafNode(i, r), { assignment: o, isCrossRef: l } = this.getAssignment(r), u = this.current;
      if (o) {
        const c = yt(r) ? i.image : this.converter.convert(i.image, a);
        this.assign(o.operator, o.feature, c, a, l);
      } else if (Ki(u)) {
        let c = i.image;
        yt(r) || (c = this.converter.convert(c, a).toString()), u.value += c;
      }
    }
  }
  /**
   * Most consumed parser tokens are valid. However there are two cases in which they are not valid:
   *
   * 1. They were inserted during error recovery by the parser. These tokens don't really exist and should not be further processed
   * 2. They contain invalid token ranges. This might include the special EOF token, or other tokens produced by invalid token builders.
   */
  isValidToken(e) {
    return !e.isInsertedInRecovery && !isNaN(e.startOffset) && typeof e.endOffset == "number" && !isNaN(e.endOffset);
  }
  subrule(e, t, r, i, s) {
    let a;
    !this.isRecording() && !r && (a = this.nodeBuilder.buildCompositeNode(i));
    const o = this.wrapper.wrapSubrule(e, t, s);
    !this.isRecording() && a && a.length > 0 && this.performSubruleAssignment(o, i, a);
  }
  performSubruleAssignment(e, t, r) {
    const { assignment: i, isCrossRef: s } = this.getAssignment(t);
    if (i)
      this.assign(i.operator, i.feature, e, r, s);
    else if (!i) {
      const a = this.current;
      if (Ki(a))
        a.value += e.toString();
      else if (typeof e == "object" && e) {
        const l = this.assignWithoutOverride(e, a);
        this.stack.pop(), this.stack.push(l);
      }
    }
  }
  action(e, t) {
    if (!this.isRecording()) {
      let r = this.current;
      if (t.feature && t.operator) {
        r = this.construct(), this.nodeBuilder.removeNode(r.$cstNode), this.nodeBuilder.buildCompositeNode(t).content.push(r.$cstNode);
        const s = { $type: e };
        this.stack.push(s), this.assign(t.operator, t.feature, r, r.$cstNode, !1);
      } else
        r.$type = e;
    }
  }
  construct() {
    if (this.isRecording())
      return;
    const e = this.current;
    return Vd(e), this.nodeBuilder.construct(e), this.stack.pop(), Ki(e) ? this.converter.convert(e.value, e.$cstNode) : (Kd(this.astReflection, e), e);
  }
  getAssignment(e) {
    if (!this.assignmentMap.has(e)) {
      const t = gi(e, gt);
      this.assignmentMap.set(e, {
        assignment: t,
        isCrossRef: t ? Hs(t.terminal) : !1
      });
    }
    return this.assignmentMap.get(e);
  }
  assign(e, t, r, i, s) {
    const a = this.current;
    let o;
    switch (s && typeof r == "string" ? o = this.linker.buildReference(a, t, i, r) : o = r, e) {
      case "=": {
        a[t] = o;
        break;
      }
      case "?=": {
        a[t] = !0;
        break;
      }
      case "+=":
        Array.isArray(a[t]) || (a[t] = []), a[t].push(o);
    }
  }
  assignWithoutOverride(e, t) {
    for (const [i, s] of Object.entries(t)) {
      const a = e[i];
      a === void 0 ? e[i] = s : Array.isArray(a) && Array.isArray(s) && (s.push(...a), e[i] = s);
    }
    const r = e.$cstNode;
    return r && (r.astNode = void 0, e.$cstNode = void 0), e;
  }
  get definitionErrors() {
    return this.wrapper.definitionErrors;
  }
}
class cm {
  buildMismatchTokenMessage(e) {
    return wt.buildMismatchTokenMessage(e);
  }
  buildNotAllInputParsedMessage(e) {
    return wt.buildNotAllInputParsedMessage(e);
  }
  buildNoViableAltMessage(e) {
    return wt.buildNoViableAltMessage(e);
  }
  buildEarlyExitMessage(e) {
    return wt.buildEarlyExitMessage(e);
  }
}
class zu extends cm {
  buildMismatchTokenMessage({ expected: e, actual: t }) {
    return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${t.image}\`.`;
  }
  buildNotAllInputParsedMessage({ firstRedundant: e }) {
    return `Expecting end of file but found \`${e.image}\`.`;
  }
}
class dm extends ju {
  constructor() {
    super(...arguments), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  action() {
  }
  construct() {
  }
  parse(e) {
    this.resetState();
    const t = this.lexer.tokenize(e, { mode: "partial" });
    return this.tokens = t.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), {
      tokens: this.tokens,
      elementStack: [...this.lastElementStack],
      tokenIndex: this.nextTokenIndex
    };
  }
  rule(e, t) {
    const r = this.wrapper.DEFINE_RULE(Hu(e.name), this.startImplementation(t).bind(this));
    return this.allRules.set(e.name, r), e.entry && (this.mainRule = r), r;
  }
  resetState() {
    this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  startImplementation(e) {
    return (t) => {
      const r = this.keepStackSize();
      try {
        e(t);
      } finally {
        this.resetStackSize(r);
      }
    };
  }
  removeUnexpectedElements() {
    this.elementStack.splice(this.stackSize);
  }
  keepStackSize() {
    const e = this.elementStack.length;
    return this.stackSize = e, e;
  }
  resetStackSize(e) {
    this.removeUnexpectedElements(), this.stackSize = e;
  }
  consume(e, t, r) {
    this.wrapper.wrapConsume(e, t), this.isRecording() || (this.lastElementStack = [...this.elementStack, r], this.nextTokenIndex = this.currIdx + 1);
  }
  subrule(e, t, r, i, s) {
    this.before(i), this.wrapper.wrapSubrule(e, t, s), this.after(i);
  }
  before(e) {
    this.isRecording() || this.elementStack.push(e);
  }
  after(e) {
    if (!this.isRecording()) {
      const t = this.elementStack.lastIndexOf(e);
      t >= 0 && this.elementStack.splice(t);
    }
  }
  get currIdx() {
    return this.wrapper.currIdx;
  }
}
const fm = {
  recoveryEnabled: !0,
  nodeLocationTracking: "full",
  skipValidations: !0,
  errorMessageProvider: new zu()
};
class hm extends vp {
  constructor(e, t) {
    const r = t && "maxLookahead" in t;
    super(e, Object.assign(Object.assign(Object.assign({}, fm), { lookaheadStrategy: r ? new ra({ maxLookahead: t.maxLookahead }) : new Bp({
      // If validations are skipped, don't log the lookahead warnings
      logging: t.skipValidations ? () => {
      } : void 0
    }) }), t));
  }
  get IS_RECORDING() {
    return this.RECORDING_PHASE;
  }
  DEFINE_RULE(e, t) {
    return this.RULE(e, t);
  }
  wrapSelfAnalysis() {
    this.performSelfAnalysis();
  }
  wrapConsume(e, t) {
    return this.consume(e, t);
  }
  wrapSubrule(e, t, r) {
    return this.subrule(e, t, {
      ARGS: [r]
    });
  }
  wrapOr(e, t) {
    this.or(e, t);
  }
  wrapOption(e, t) {
    this.option(e, t);
  }
  wrapMany(e, t) {
    this.many(e, t);
  }
  wrapAtLeastOne(e, t) {
    this.atLeastOne(e, t);
  }
}
function qu(n, e, t) {
  return pm({
    parser: e,
    tokens: t,
    ruleNames: /* @__PURE__ */ new Map()
  }, n), e;
}
function pm(n, e) {
  const t = jl(e, !1), r = ee(e.rules).filter(we).filter((i) => t.has(i));
  for (const i of r) {
    const s = Object.assign(Object.assign({}, n), { consume: 1, optional: 1, subrule: 1, many: 1, or: 1 });
    n.parser.rule(i, vt(s, i.definition));
  }
}
function vt(n, e, t = !1) {
  let r;
  if (yt(e))
    r = Am(n, e);
  else if (mi(e))
    r = mm(n, e);
  else if (gt(e))
    r = vt(n, e.terminal);
  else if (Hs(e))
    r = Yu(n, e);
  else if (Tt(e))
    r = gm(n, e);
  else if (Ul(e))
    r = Tm(n, e);
  else if (Bl(e))
    r = Rm(n, e);
  else if (js(e))
    r = vm(n, e);
  else if (bd(e)) {
    const i = n.consume++;
    r = () => n.parser.consume(i, nt, e);
  } else
    throw new Ml(e.$cstNode, `Unexpected element type: ${e.$type}`);
  return Xu(n, t ? void 0 : li(e), r, e.cardinality);
}
function mm(n, e) {
  const t = Xs(e);
  return () => n.parser.action(t, e);
}
function gm(n, e) {
  const t = e.rule.ref;
  if (we(t)) {
    const r = n.subrule++, i = t.fragment, s = e.arguments.length > 0 ? ym(t, e.arguments) : () => ({});
    return (a) => n.parser.subrule(r, Ju(n, t), i, e, s(a));
  } else if (kt(t)) {
    const r = n.consume++, i = Ps(n, t.name);
    return () => n.parser.consume(r, i, e);
  } else if (t)
    er();
  else
    throw new Ml(e.$cstNode, `Undefined rule: ${e.rule.$refText}`);
}
function ym(n, e) {
  const t = e.map((r) => ze(r.value));
  return (r) => {
    const i = {};
    for (let s = 0; s < t.length; s++) {
      const a = n.parameters[s], o = t[s];
      i[a.name] = o(r);
    }
    return i;
  };
}
function ze(n) {
  if (Cd(n)) {
    const e = ze(n.left), t = ze(n.right);
    return (r) => e(r) || t(r);
  } else if (Id(n)) {
    const e = ze(n.left), t = ze(n.right);
    return (r) => e(r) && t(r);
  } else if (Nd(n)) {
    const e = ze(n.value);
    return (t) => !e(t);
  } else if (wd(n)) {
    const e = n.parameter.ref.name;
    return (t) => t !== void 0 && t[e] === !0;
  } else if (Sd(n)) {
    const e = !!n.true;
    return () => e;
  }
  er();
}
function Tm(n, e) {
  if (e.elements.length === 1)
    return vt(n, e.elements[0]);
  {
    const t = [];
    for (const i of e.elements) {
      const s = {
        // Since we handle the guard condition in the alternative already
        // We can ignore the group guard condition inside
        ALT: vt(n, i, !0)
      }, a = li(i);
      a && (s.GATE = ze(a)), t.push(s);
    }
    const r = n.or++;
    return (i) => n.parser.alternatives(r, t.map((s) => {
      const a = {
        ALT: () => s.ALT(i)
      }, o = s.GATE;
      return o && (a.GATE = () => o(i)), a;
    }));
  }
}
function Rm(n, e) {
  if (e.elements.length === 1)
    return vt(n, e.elements[0]);
  const t = [];
  for (const o of e.elements) {
    const l = {
      // Since we handle the guard condition in the alternative already
      // We can ignore the group guard condition inside
      ALT: vt(n, o, !0)
    }, u = li(o);
    u && (l.GATE = ze(u)), t.push(l);
  }
  const r = n.or++, i = (o, l) => {
    const u = l.getRuleStack().join("-");
    return `uGroup_${o}_${u}`;
  }, s = (o) => n.parser.alternatives(r, t.map((l, u) => {
    const c = { ALT: () => !0 }, d = n.parser;
    c.ALT = () => {
      if (l.ALT(o), !d.isRecording()) {
        const f = i(r, d);
        d.unorderedGroups.get(f) || d.unorderedGroups.set(f, []);
        const m = d.unorderedGroups.get(f);
        typeof (m == null ? void 0 : m[u]) > "u" && (m[u] = !0);
      }
    };
    const h = l.GATE;
    return h ? c.GATE = () => h(o) : c.GATE = () => {
      const f = d.unorderedGroups.get(i(r, d));
      return !(f != null && f[u]);
    }, c;
  })), a = Xu(n, li(e), s, "*");
  return (o) => {
    a(o), n.parser.isRecording() || n.parser.unorderedGroups.delete(i(r, n.parser));
  };
}
function vm(n, e) {
  const t = e.elements.map((r) => vt(n, r));
  return (r) => t.forEach((i) => i(r));
}
function li(n) {
  if (js(n))
    return n.guardCondition;
}
function Yu(n, e, t = e.terminal) {
  if (t)
    if (Tt(t) && we(t.rule.ref)) {
      const r = t.rule.ref, i = n.subrule++;
      return (s) => n.parser.subrule(i, Ju(n, r), !1, e, s);
    } else if (Tt(t) && kt(t.rule.ref)) {
      const r = n.consume++, i = Ps(n, t.rule.ref.name);
      return () => n.parser.consume(r, i, e);
    } else if (yt(t)) {
      const r = n.consume++, i = Ps(n, t.value);
      return () => n.parser.consume(r, i, e);
    } else
      throw new Error("Could not build cross reference parser");
  else {
    if (!e.type.ref)
      throw new Error("Could not resolve reference to type: " + e.type.$refText);
    const r = Yl(e.type.ref), i = r == null ? void 0 : r.terminal;
    if (!i)
      throw new Error("Could not find name assignment for type: " + Xs(e.type.ref));
    return Yu(n, e, i);
  }
}
function Am(n, e) {
  const t = n.consume++, r = n.tokens[e.value];
  if (!r)
    throw new Error("Could not find token for keyword: " + e.value);
  return () => n.parser.consume(t, r, e);
}
function Xu(n, e, t, r) {
  const i = e && ze(e);
  if (!r)
    if (i) {
      const s = n.or++;
      return (a) => n.parser.alternatives(s, [
        {
          ALT: () => t(a),
          GATE: () => i(a)
        },
        {
          ALT: Ya(),
          GATE: () => !i(a)
        }
      ]);
    } else
      return t;
  if (r === "*") {
    const s = n.many++;
    return (a) => n.parser.many(s, {
      DEF: () => t(a),
      GATE: i ? () => i(a) : void 0
    });
  } else if (r === "+") {
    const s = n.many++;
    if (i) {
      const a = n.or++;
      return (o) => n.parser.alternatives(a, [
        {
          ALT: () => n.parser.atLeastOne(s, {
            DEF: () => t(o)
          }),
          GATE: () => i(o)
        },
        {
          ALT: Ya(),
          GATE: () => !i(o)
        }
      ]);
    } else
      return (a) => n.parser.atLeastOne(s, {
        DEF: () => t(a)
      });
  } else if (r === "?") {
    const s = n.optional++;
    return (a) => n.parser.optional(s, {
      DEF: () => t(a),
      GATE: i ? () => i(a) : void 0
    });
  } else
    er();
}
function Ju(n, e) {
  const t = Em(n, e), r = n.parser.getRule(t);
  if (!r)
    throw new Error(`Rule "${t}" not found."`);
  return r;
}
function Em(n, e) {
  if (we(e))
    return e.name;
  if (n.ruleNames.has(e))
    return n.ruleNames.get(e);
  {
    let t = e, r = t.$container, i = e.$type;
    for (; !we(r); )
      (js(r) || Ul(r) || Bl(r)) && (i = r.elements.indexOf(t).toString() + ":" + i), t = r, r = r.$container;
    return i = r.name + ":" + i, n.ruleNames.set(e, i), i;
  }
}
function Ps(n, e) {
  const t = n.tokens[e];
  if (!t)
    throw new Error(`Token "${e}" not found."`);
  return t;
}
function km(n) {
  const e = n.Grammar, t = n.parser.Lexer, r = new dm(n);
  return qu(e, r, t.definition), r.finalize(), r;
}
function $m(n) {
  const e = xm(n);
  return e.finalize(), e;
}
function xm(n) {
  const e = n.Grammar, t = n.parser.Lexer, r = new um(n);
  return qu(e, r, t.definition);
}
class Qu {
  constructor() {
    this.diagnostics = [];
  }
  buildTokens(e, t) {
    const r = ee(jl(e, !1)), i = this.buildTerminalTokens(r), s = this.buildKeywordTokens(r, i, t);
    return i.forEach((a) => {
      const o = a.PATTERN;
      typeof o == "object" && o && "test" in o && ls(o) ? s.unshift(a) : s.push(a);
    }), s;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flushLexingReport(e) {
    return { diagnostics: this.popDiagnostics() };
  }
  popDiagnostics() {
    const e = [...this.diagnostics];
    return this.diagnostics = [], e;
  }
  buildTerminalTokens(e) {
    return e.filter(kt).filter((t) => !t.fragment).map((t) => this.buildTerminalToken(t)).toArray();
  }
  buildTerminalToken(e) {
    const t = Js(e), r = this.requiresCustomPattern(t) ? this.regexPatternFunction(t) : t, i = {
      name: e.name,
      PATTERN: r
    };
    return typeof r == "function" && (i.LINE_BREAKS = !0), e.hidden && (i.GROUP = ls(t) ? fe.SKIPPED : "hidden"), i;
  }
  requiresCustomPattern(e) {
    return e.flags.includes("u") || e.flags.includes("s") ? !0 : !!(e.source.includes("?<=") || e.source.includes("?<!"));
  }
  regexPatternFunction(e) {
    const t = new RegExp(e, e.flags + "y");
    return (r, i) => (t.lastIndex = i, t.exec(r));
  }
  buildKeywordTokens(e, t, r) {
    return e.filter(we).flatMap((i) => tr(i).filter(yt)).distinct((i) => i.value).toArray().sort((i, s) => s.value.length - i.value.length).map((i) => this.buildKeywordToken(i, t, !!(r != null && r.caseInsensitive)));
  }
  buildKeywordToken(e, t, r) {
    const i = this.buildKeywordPattern(e, r), s = {
      name: e.value,
      PATTERN: i,
      LONGER_ALT: this.findLongerAlt(e, t)
    };
    return typeof i == "function" && (s.LINE_BREAKS = !0), s;
  }
  buildKeywordPattern(e, t) {
    return t ? new RegExp(Qd(e.value)) : e.value;
  }
  findLongerAlt(e, t) {
    return t.reduce((r, i) => {
      const s = i == null ? void 0 : i.PATTERN;
      return s != null && s.source && Zd("^" + s.source + "$", e.value) && r.push(i), r;
    }, []);
  }
}
class Zu {
  convert(e, t) {
    let r = t.grammarSource;
    if (Hs(r) && (r = rf(r)), Tt(r)) {
      const i = r.rule.ref;
      if (!i)
        throw new Error("This cst node was not parsed by a rule.");
      return this.runConverter(i, e, t);
    }
    return e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runConverter(e, t, r) {
    var i;
    switch (e.name.toUpperCase()) {
      case "INT":
        return We.convertInt(t);
      case "STRING":
        return We.convertString(t);
      case "ID":
        return We.convertID(t);
    }
    switch ((i = df(e)) === null || i === void 0 ? void 0 : i.toLowerCase()) {
      case "number":
        return We.convertNumber(t);
      case "boolean":
        return We.convertBoolean(t);
      case "bigint":
        return We.convertBigint(t);
      case "date":
        return We.convertDate(t);
      default:
        return t;
    }
  }
}
var We;
(function(n) {
  function e(u) {
    let c = "";
    for (let d = 1; d < u.length - 1; d++) {
      const h = u.charAt(d);
      if (h === "\\") {
        const f = u.charAt(++d);
        c += t(f);
      } else
        c += h;
    }
    return c;
  }
  n.convertString = e;
  function t(u) {
    switch (u) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return `
`;
      case "r":
        return "\r";
      case "t":
        return "	";
      case "v":
        return "\v";
      case "0":
        return "\0";
      default:
        return u;
    }
  }
  function r(u) {
    return u.charAt(0) === "^" ? u.substring(1) : u;
  }
  n.convertID = r;
  function i(u) {
    return parseInt(u);
  }
  n.convertInt = i;
  function s(u) {
    return BigInt(u);
  }
  n.convertBigint = s;
  function a(u) {
    return new Date(u);
  }
  n.convertDate = a;
  function o(u) {
    return Number(u);
  }
  n.convertNumber = o;
  function l(u) {
    return u.toLowerCase() === "true";
  }
  n.convertBoolean = l;
})(We || (We = {}));
var ht = {}, Ar = {}, nl;
function ec() {
  if (nl) return Ar;
  nl = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  let n;
  function e() {
    if (n === void 0)
      throw new Error("No runtime abstraction layer installed");
    return n;
  }
  return function(t) {
    function r(i) {
      if (i === void 0)
        throw new Error("No runtime abstraction layer provided");
      n = i;
    }
    t.install = r;
  }(e || (e = {})), Ar.default = e, Ar;
}
var J = {}, rl;
function Sm() {
  if (rl) return J;
  rl = 1, Object.defineProperty(J, "__esModule", { value: !0 }), J.stringArray = J.array = J.func = J.error = J.number = J.string = J.boolean = void 0;
  function n(o) {
    return o === !0 || o === !1;
  }
  J.boolean = n;
  function e(o) {
    return typeof o == "string" || o instanceof String;
  }
  J.string = e;
  function t(o) {
    return typeof o == "number" || o instanceof Number;
  }
  J.number = t;
  function r(o) {
    return o instanceof Error;
  }
  J.error = r;
  function i(o) {
    return typeof o == "function";
  }
  J.func = i;
  function s(o) {
    return Array.isArray(o);
  }
  J.array = s;
  function a(o) {
    return s(o) && o.every((l) => e(l));
  }
  return J.stringArray = a, J;
}
var pt = {}, il;
function tc() {
  if (il) return pt;
  il = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.Emitter = pt.Event = void 0;
  const n = ec();
  var e;
  (function(i) {
    const s = { dispose() {
    } };
    i.None = function() {
      return s;
    };
  })(e || (pt.Event = e = {}));
  class t {
    add(s, a = null, o) {
      this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(s), this._contexts.push(a), Array.isArray(o) && o.push({ dispose: () => this.remove(s, a) });
    }
    remove(s, a = null) {
      if (!this._callbacks)
        return;
      let o = !1;
      for (let l = 0, u = this._callbacks.length; l < u; l++)
        if (this._callbacks[l] === s)
          if (this._contexts[l] === a) {
            this._callbacks.splice(l, 1), this._contexts.splice(l, 1);
            return;
          } else
            o = !0;
      if (o)
        throw new Error("When adding a listener with a context, you should remove it with the same context");
    }
    invoke(...s) {
      if (!this._callbacks)
        return [];
      const a = [], o = this._callbacks.slice(0), l = this._contexts.slice(0);
      for (let u = 0, c = o.length; u < c; u++)
        try {
          a.push(o[u].apply(l[u], s));
        } catch (d) {
          (0, n.default)().console.error(d);
        }
      return a;
    }
    isEmpty() {
      return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
      this._callbacks = void 0, this._contexts = void 0;
    }
  }
  class r {
    constructor(s) {
      this._options = s;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
      return this._event || (this._event = (s, a, o) => {
        this._callbacks || (this._callbacks = new t()), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(s, a);
        const l = {
          dispose: () => {
            this._callbacks && (this._callbacks.remove(s, a), l.dispose = r._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this));
          }
        };
        return Array.isArray(o) && o.push(l), l;
      }), this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(s) {
      this._callbacks && this._callbacks.invoke.call(this._callbacks, s);
    }
    dispose() {
      this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0);
    }
  }
  return pt.Emitter = r, r._noop = function() {
  }, pt;
}
var sl;
function Im() {
  if (sl) return ht;
  sl = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.CancellationTokenSource = ht.CancellationToken = void 0;
  const n = ec(), e = Sm(), t = tc();
  var r;
  (function(o) {
    o.None = Object.freeze({
      isCancellationRequested: !1,
      onCancellationRequested: t.Event.None
    }), o.Cancelled = Object.freeze({
      isCancellationRequested: !0,
      onCancellationRequested: t.Event.None
    });
    function l(u) {
      const c = u;
      return c && (c === o.None || c === o.Cancelled || e.boolean(c.isCancellationRequested) && !!c.onCancellationRequested);
    }
    o.is = l;
  })(r || (ht.CancellationToken = r = {}));
  const i = Object.freeze(function(o, l) {
    const u = (0, n.default)().timer.setTimeout(o.bind(l), 0);
    return { dispose() {
      u.dispose();
    } };
  });
  class s {
    constructor() {
      this._isCancelled = !1;
    }
    cancel() {
      this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
    }
    get isCancellationRequested() {
      return this._isCancelled;
    }
    get onCancellationRequested() {
      return this._isCancelled ? i : (this._emitter || (this._emitter = new t.Emitter()), this._emitter.event);
    }
    dispose() {
      this._emitter && (this._emitter.dispose(), this._emitter = void 0);
    }
  }
  class a {
    get token() {
      return this._token || (this._token = new s()), this._token;
    }
    cancel() {
      this._token ? this._token.cancel() : this._token = r.Cancelled;
    }
    dispose() {
      this._token ? this._token instanceof s && this._token.dispose() : this._token = r.None;
    }
  }
  return ht.CancellationTokenSource = a, ht;
}
var V = Im();
function Cm() {
  return new Promise((n) => {
    typeof setImmediate > "u" ? setTimeout(n, 0) : setImmediate(n);
  });
}
let Mr = 0, Nm = 10;
function wm() {
  return Mr = performance.now(), new V.CancellationTokenSource();
}
const ui = Symbol("OperationCancelled");
function Si(n) {
  return n === ui;
}
async function Ae(n) {
  if (n === V.CancellationToken.None)
    return;
  const e = performance.now();
  if (e - Mr >= Nm && (Mr = e, await Cm(), Mr = performance.now()), n.isCancellationRequested)
    throw ui;
}
class da {
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = (r) => (e(r), this), this.reject = (r) => (t(r), this);
    });
  }
}
class Qn {
  constructor(e, t, r, i) {
    this._uri = e, this._languageId = t, this._version = r, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      const t = this.offsetAt(e.start), r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  }
  update(e, t) {
    for (const r of e)
      if (Qn.isIncremental(r)) {
        const i = rc(r.range), s = this.offsetAt(i.start), a = this.offsetAt(i.end);
        this._content = this._content.substring(0, s) + r.text + this._content.substring(a, this._content.length);
        const o = Math.max(i.start.line, 0), l = Math.max(i.end.line, 0);
        let u = this._lineOffsets;
        const c = al(r.text, !1, s);
        if (l - o === c.length)
          for (let h = 0, f = c.length; h < f; h++)
            u[h + o + 1] = c[h];
        else
          c.length < 1e4 ? u.splice(o + 1, l - o, ...c) : this._lineOffsets = u = u.slice(0, o + 1).concat(c, u.slice(l + 1));
        const d = r.text.length - (a - s);
        if (d !== 0)
          for (let h = o + 1 + c.length, f = u.length; h < f; h++)
            u[h] = u[h] + d;
      } else if (Qn.isFull(r))
        this._content = r.text, this._lineOffsets = void 0;
      else
        throw new Error("Unknown change event received");
    this._version = t;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = al(this._content, !0)), this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    const t = this.getLineOffsets();
    let r = 0, i = t.length;
    if (i === 0)
      return { line: 0, character: e };
    for (; r < i; ) {
      const a = Math.floor((r + i) / 2);
      t[a] > e ? i = a : r = a + 1;
    }
    const s = r - 1;
    return e = this.ensureBeforeEOL(e, t[s]), { line: s, character: e - t[s] };
  }
  offsetAt(e) {
    const t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    const r = t[e.line];
    if (e.character <= 0)
      return r;
    const i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length, s = Math.min(r + e.character, i);
    return this.ensureBeforeEOL(s, r);
  }
  ensureBeforeEOL(e, t) {
    for (; e > t && nc(this._content.charCodeAt(e - 1)); )
      e--;
    return e;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(e) {
    const t = e;
    return t != null && typeof t.text == "string" && t.range !== void 0 && (t.rangeLength === void 0 || typeof t.rangeLength == "number");
  }
  static isFull(e) {
    const t = e;
    return t != null && typeof t.text == "string" && t.range === void 0 && t.rangeLength === void 0;
  }
}
var Ms;
(function(n) {
  function e(i, s, a, o) {
    return new Qn(i, s, a, o);
  }
  n.create = e;
  function t(i, s, a) {
    if (i instanceof Qn)
      return i.update(s, a), i;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  n.update = t;
  function r(i, s) {
    const a = i.getText(), o = Ds(s.map(_m), (c, d) => {
      const h = c.range.start.line - d.range.start.line;
      return h === 0 ? c.range.start.character - d.range.start.character : h;
    });
    let l = 0;
    const u = [];
    for (const c of o) {
      const d = i.offsetAt(c.range.start);
      if (d < l)
        throw new Error("Overlapping edit");
      d > l && u.push(a.substring(l, d)), c.newText.length && u.push(c.newText), l = i.offsetAt(c.range.end);
    }
    return u.push(a.substr(l)), u.join("");
  }
  n.applyEdits = r;
})(Ms || (Ms = {}));
function Ds(n, e) {
  if (n.length <= 1)
    return n;
  const t = n.length / 2 | 0, r = n.slice(0, t), i = n.slice(t);
  Ds(r, e), Ds(i, e);
  let s = 0, a = 0, o = 0;
  for (; s < r.length && a < i.length; )
    e(r[s], i[a]) <= 0 ? n[o++] = r[s++] : n[o++] = i[a++];
  for (; s < r.length; )
    n[o++] = r[s++];
  for (; a < i.length; )
    n[o++] = i[a++];
  return n;
}
function al(n, e, t = 0) {
  const r = e ? [t] : [];
  for (let i = 0; i < n.length; i++) {
    const s = n.charCodeAt(i);
    nc(s) && (s === 13 && i + 1 < n.length && n.charCodeAt(i + 1) === 10 && i++, r.push(t + i + 1));
  }
  return r;
}
function nc(n) {
  return n === 13 || n === 10;
}
function rc(n) {
  const e = n.start, t = n.end;
  return e.line > t.line || e.line === t.line && e.character > t.character ? { start: t, end: e } : n;
}
function _m(n) {
  const e = rc(n.range);
  return e !== n.range ? { newText: n.newText, range: e } : n;
}
var ic;
(() => {
  var n = { 470: (i) => {
    function s(l) {
      if (typeof l != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(l));
    }
    function a(l, u) {
      for (var c, d = "", h = 0, f = -1, m = 0, g = 0; g <= l.length; ++g) {
        if (g < l.length) c = l.charCodeAt(g);
        else {
          if (c === 47) break;
          c = 47;
        }
        if (c === 47) {
          if (!(f === g - 1 || m === 1)) if (f !== g - 1 && m === 2) {
            if (d.length < 2 || h !== 2 || d.charCodeAt(d.length - 1) !== 46 || d.charCodeAt(d.length - 2) !== 46) {
              if (d.length > 2) {
                var A = d.lastIndexOf("/");
                if (A !== d.length - 1) {
                  A === -1 ? (d = "", h = 0) : h = (d = d.slice(0, A)).length - 1 - d.lastIndexOf("/"), f = g, m = 0;
                  continue;
                }
              } else if (d.length === 2 || d.length === 1) {
                d = "", h = 0, f = g, m = 0;
                continue;
              }
            }
            u && (d.length > 0 ? d += "/.." : d = "..", h = 2);
          } else d.length > 0 ? d += "/" + l.slice(f + 1, g) : d = l.slice(f + 1, g), h = g - f - 1;
          f = g, m = 0;
        } else c === 46 && m !== -1 ? ++m : m = -1;
      }
      return d;
    }
    var o = { resolve: function() {
      for (var l, u = "", c = !1, d = arguments.length - 1; d >= -1 && !c; d--) {
        var h;
        d >= 0 ? h = arguments[d] : (l === void 0 && (l = process.cwd()), h = l), s(h), h.length !== 0 && (u = h + "/" + u, c = h.charCodeAt(0) === 47);
      }
      return u = a(u, !c), c ? u.length > 0 ? "/" + u : "/" : u.length > 0 ? u : ".";
    }, normalize: function(l) {
      if (s(l), l.length === 0) return ".";
      var u = l.charCodeAt(0) === 47, c = l.charCodeAt(l.length - 1) === 47;
      return (l = a(l, !u)).length !== 0 || u || (l = "."), l.length > 0 && c && (l += "/"), u ? "/" + l : l;
    }, isAbsolute: function(l) {
      return s(l), l.length > 0 && l.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0) return ".";
      for (var l, u = 0; u < arguments.length; ++u) {
        var c = arguments[u];
        s(c), c.length > 0 && (l === void 0 ? l = c : l += "/" + c);
      }
      return l === void 0 ? "." : o.normalize(l);
    }, relative: function(l, u) {
      if (s(l), s(u), l === u || (l = o.resolve(l)) === (u = o.resolve(u))) return "";
      for (var c = 1; c < l.length && l.charCodeAt(c) === 47; ++c) ;
      for (var d = l.length, h = d - c, f = 1; f < u.length && u.charCodeAt(f) === 47; ++f) ;
      for (var m = u.length - f, g = h < m ? h : m, A = -1, y = 0; y <= g; ++y) {
        if (y === g) {
          if (m > g) {
            if (u.charCodeAt(f + y) === 47) return u.slice(f + y + 1);
            if (y === 0) return u.slice(f + y);
          } else h > g && (l.charCodeAt(c + y) === 47 ? A = y : y === 0 && (A = 0));
          break;
        }
        var E = l.charCodeAt(c + y);
        if (E !== u.charCodeAt(f + y)) break;
        E === 47 && (A = y);
      }
      var R = "";
      for (y = c + A + 1; y <= d; ++y) y !== d && l.charCodeAt(y) !== 47 || (R.length === 0 ? R += ".." : R += "/..");
      return R.length > 0 ? R + u.slice(f + A) : (f += A, u.charCodeAt(f) === 47 && ++f, u.slice(f));
    }, _makeLong: function(l) {
      return l;
    }, dirname: function(l) {
      if (s(l), l.length === 0) return ".";
      for (var u = l.charCodeAt(0), c = u === 47, d = -1, h = !0, f = l.length - 1; f >= 1; --f) if ((u = l.charCodeAt(f)) === 47) {
        if (!h) {
          d = f;
          break;
        }
      } else h = !1;
      return d === -1 ? c ? "/" : "." : c && d === 1 ? "//" : l.slice(0, d);
    }, basename: function(l, u) {
      if (u !== void 0 && typeof u != "string") throw new TypeError('"ext" argument must be a string');
      s(l);
      var c, d = 0, h = -1, f = !0;
      if (u !== void 0 && u.length > 0 && u.length <= l.length) {
        if (u.length === l.length && u === l) return "";
        var m = u.length - 1, g = -1;
        for (c = l.length - 1; c >= 0; --c) {
          var A = l.charCodeAt(c);
          if (A === 47) {
            if (!f) {
              d = c + 1;
              break;
            }
          } else g === -1 && (f = !1, g = c + 1), m >= 0 && (A === u.charCodeAt(m) ? --m == -1 && (h = c) : (m = -1, h = g));
        }
        return d === h ? h = g : h === -1 && (h = l.length), l.slice(d, h);
      }
      for (c = l.length - 1; c >= 0; --c) if (l.charCodeAt(c) === 47) {
        if (!f) {
          d = c + 1;
          break;
        }
      } else h === -1 && (f = !1, h = c + 1);
      return h === -1 ? "" : l.slice(d, h);
    }, extname: function(l) {
      s(l);
      for (var u = -1, c = 0, d = -1, h = !0, f = 0, m = l.length - 1; m >= 0; --m) {
        var g = l.charCodeAt(m);
        if (g !== 47) d === -1 && (h = !1, d = m + 1), g === 46 ? u === -1 ? u = m : f !== 1 && (f = 1) : u !== -1 && (f = -1);
        else if (!h) {
          c = m + 1;
          break;
        }
      }
      return u === -1 || d === -1 || f === 0 || f === 1 && u === d - 1 && u === c + 1 ? "" : l.slice(u, d);
    }, format: function(l) {
      if (l === null || typeof l != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof l);
      return function(u, c) {
        var d = c.dir || c.root, h = c.base || (c.name || "") + (c.ext || "");
        return d ? d === c.root ? d + h : d + "/" + h : h;
      }(0, l);
    }, parse: function(l) {
      s(l);
      var u = { root: "", dir: "", base: "", ext: "", name: "" };
      if (l.length === 0) return u;
      var c, d = l.charCodeAt(0), h = d === 47;
      h ? (u.root = "/", c = 1) : c = 0;
      for (var f = -1, m = 0, g = -1, A = !0, y = l.length - 1, E = 0; y >= c; --y) if ((d = l.charCodeAt(y)) !== 47) g === -1 && (A = !1, g = y + 1), d === 46 ? f === -1 ? f = y : E !== 1 && (E = 1) : f !== -1 && (E = -1);
      else if (!A) {
        m = y + 1;
        break;
      }
      return f === -1 || g === -1 || E === 0 || E === 1 && f === g - 1 && f === m + 1 ? g !== -1 && (u.base = u.name = m === 0 && h ? l.slice(1, g) : l.slice(m, g)) : (m === 0 && h ? (u.name = l.slice(1, f), u.base = l.slice(1, g)) : (u.name = l.slice(m, f), u.base = l.slice(m, g)), u.ext = l.slice(f, g)), m > 0 ? u.dir = l.slice(0, m - 1) : h && (u.dir = "/"), u;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    o.posix = o, i.exports = o;
  } }, e = {};
  function t(i) {
    var s = e[i];
    if (s !== void 0) return s.exports;
    var a = e[i] = { exports: {} };
    return n[i](a, a.exports, t), a.exports;
  }
  t.d = (i, s) => {
    for (var a in s) t.o(s, a) && !t.o(i, a) && Object.defineProperty(i, a, { enumerable: !0, get: s[a] });
  }, t.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s), t.r = (i) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
  };
  var r = {};
  (() => {
    let i;
    t.r(r), t.d(r, { URI: () => h, Utils: () => Ie }), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
    const s = /^\w[\w\d+.-]*$/, a = /^\//, o = /^\/\//;
    function l($, T) {
      if (!$.scheme && T) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${$.authority}", path: "${$.path}", query: "${$.query}", fragment: "${$.fragment}"}`);
      if ($.scheme && !s.test($.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
      if ($.path) {
        if ($.authority) {
          if (!a.test($.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (o.test($.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const u = "", c = "/", d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class h {
      constructor(T, k, S, O, L, _ = !1) {
        Ze(this, "scheme");
        Ze(this, "authority");
        Ze(this, "path");
        Ze(this, "query");
        Ze(this, "fragment");
        typeof T == "object" ? (this.scheme = T.scheme || u, this.authority = T.authority || u, this.path = T.path || u, this.query = T.query || u, this.fragment = T.fragment || u) : (this.scheme = /* @__PURE__ */ function(Te, q) {
          return Te || q ? Te : "file";
        }(T, _), this.authority = k || u, this.path = function(Te, q) {
          switch (Te) {
            case "https":
            case "http":
            case "file":
              q ? q[0] !== c && (q = c + q) : q = c;
          }
          return q;
        }(this.scheme, S || u), this.query = O || u, this.fragment = L || u, l(this, _));
      }
      static isUri(T) {
        return T instanceof h || !!T && typeof T.authority == "string" && typeof T.fragment == "string" && typeof T.path == "string" && typeof T.query == "string" && typeof T.scheme == "string" && typeof T.fsPath == "string" && typeof T.with == "function" && typeof T.toString == "function";
      }
      get fsPath() {
        return E(this);
      }
      with(T) {
        if (!T) return this;
        let { scheme: k, authority: S, path: O, query: L, fragment: _ } = T;
        return k === void 0 ? k = this.scheme : k === null && (k = u), S === void 0 ? S = this.authority : S === null && (S = u), O === void 0 ? O = this.path : O === null && (O = u), L === void 0 ? L = this.query : L === null && (L = u), _ === void 0 ? _ = this.fragment : _ === null && (_ = u), k === this.scheme && S === this.authority && O === this.path && L === this.query && _ === this.fragment ? this : new m(k, S, O, L, _);
      }
      static parse(T, k = !1) {
        const S = d.exec(T);
        return S ? new m(S[2] || u, ie(S[4] || u), ie(S[5] || u), ie(S[7] || u), ie(S[9] || u), k) : new m(u, u, u, u, u);
      }
      static file(T) {
        let k = u;
        if (i && (T = T.replace(/\\/g, c)), T[0] === c && T[1] === c) {
          const S = T.indexOf(c, 2);
          S === -1 ? (k = T.substring(2), T = c) : (k = T.substring(2, S), T = T.substring(S) || c);
        }
        return new m("file", k, T, u, u);
      }
      static from(T) {
        const k = new m(T.scheme, T.authority, T.path, T.query, T.fragment);
        return l(k, !0), k;
      }
      toString(T = !1) {
        return R(this, T);
      }
      toJSON() {
        return this;
      }
      static revive(T) {
        if (T) {
          if (T instanceof h) return T;
          {
            const k = new m(T);
            return k._formatted = T.external, k._fsPath = T._sep === f ? T.fsPath : null, k;
          }
        }
        return T;
      }
    }
    const f = i ? 1 : void 0;
    class m extends h {
      constructor() {
        super(...arguments);
        Ze(this, "_formatted", null);
        Ze(this, "_fsPath", null);
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = E(this)), this._fsPath;
      }
      toString(k = !1) {
        return k ? R(this, !0) : (this._formatted || (this._formatted = R(this, !1)), this._formatted);
      }
      toJSON() {
        const k = { $mid: 1 };
        return this._fsPath && (k.fsPath = this._fsPath, k._sep = f), this._formatted && (k.external = this._formatted), this.path && (k.path = this.path), this.scheme && (k.scheme = this.scheme), this.authority && (k.authority = this.authority), this.query && (k.query = this.query), this.fragment && (k.fragment = this.fragment), k;
      }
    }
    const g = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function A($, T, k) {
      let S, O = -1;
      for (let L = 0; L < $.length; L++) {
        const _ = $.charCodeAt(L);
        if (_ >= 97 && _ <= 122 || _ >= 65 && _ <= 90 || _ >= 48 && _ <= 57 || _ === 45 || _ === 46 || _ === 95 || _ === 126 || T && _ === 47 || k && _ === 91 || k && _ === 93 || k && _ === 58) O !== -1 && (S += encodeURIComponent($.substring(O, L)), O = -1), S !== void 0 && (S += $.charAt(L));
        else {
          S === void 0 && (S = $.substr(0, L));
          const Te = g[_];
          Te !== void 0 ? (O !== -1 && (S += encodeURIComponent($.substring(O, L)), O = -1), S += Te) : O === -1 && (O = L);
        }
      }
      return O !== -1 && (S += encodeURIComponent($.substring(O))), S !== void 0 ? S : $;
    }
    function y($) {
      let T;
      for (let k = 0; k < $.length; k++) {
        const S = $.charCodeAt(k);
        S === 35 || S === 63 ? (T === void 0 && (T = $.substr(0, k)), T += g[S]) : T !== void 0 && (T += $[k]);
      }
      return T !== void 0 ? T : $;
    }
    function E($, T) {
      let k;
      return k = $.authority && $.path.length > 1 && $.scheme === "file" ? `//${$.authority}${$.path}` : $.path.charCodeAt(0) === 47 && ($.path.charCodeAt(1) >= 65 && $.path.charCodeAt(1) <= 90 || $.path.charCodeAt(1) >= 97 && $.path.charCodeAt(1) <= 122) && $.path.charCodeAt(2) === 58 ? $.path[1].toLowerCase() + $.path.substr(2) : $.path, i && (k = k.replace(/\//g, "\\")), k;
    }
    function R($, T) {
      const k = T ? y : A;
      let S = "", { scheme: O, authority: L, path: _, query: Te, fragment: q } = $;
      if (O && (S += O, S += ":"), (L || O === "file") && (S += c, S += c), L) {
        let K = L.indexOf("@");
        if (K !== -1) {
          const dt = L.substr(0, K);
          L = L.substr(K + 1), K = dt.lastIndexOf(":"), K === -1 ? S += k(dt, !1, !1) : (S += k(dt.substr(0, K), !1, !1), S += ":", S += k(dt.substr(K + 1), !1, !0)), S += "@";
        }
        L = L.toLowerCase(), K = L.lastIndexOf(":"), K === -1 ? S += k(L, !1, !0) : (S += k(L.substr(0, K), !1, !0), S += L.substr(K));
      }
      if (_) {
        if (_.length >= 3 && _.charCodeAt(0) === 47 && _.charCodeAt(2) === 58) {
          const K = _.charCodeAt(1);
          K >= 65 && K <= 90 && (_ = `/${String.fromCharCode(K + 32)}:${_.substr(3)}`);
        } else if (_.length >= 2 && _.charCodeAt(1) === 58) {
          const K = _.charCodeAt(0);
          K >= 65 && K <= 90 && (_ = `${String.fromCharCode(K + 32)}:${_.substr(2)}`);
        }
        S += k(_, !0, !1);
      }
      return Te && (S += "?", S += k(Te, !1, !1)), q && (S += "#", S += T ? q : A(q, !1, !1)), S;
    }
    function I($) {
      try {
        return decodeURIComponent($);
      } catch {
        return $.length > 3 ? $.substr(0, 3) + I($.substr(3)) : $;
      }
    }
    const F = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function ie($) {
      return $.match(F) ? $.replace(F, (T) => I(T)) : $;
    }
    var _e = t(470);
    const ye = _e.posix || _e, Fe = "/";
    var Ie;
    (function($) {
      $.joinPath = function(T, ...k) {
        return T.with({ path: ye.join(T.path, ...k) });
      }, $.resolvePath = function(T, ...k) {
        let S = T.path, O = !1;
        S[0] !== Fe && (S = Fe + S, O = !0);
        let L = ye.resolve(S, ...k);
        return O && L[0] === Fe && !T.authority && (L = L.substring(1)), T.with({ path: L });
      }, $.dirname = function(T) {
        if (T.path.length === 0 || T.path === Fe) return T;
        let k = ye.dirname(T.path);
        return k.length === 1 && k.charCodeAt(0) === 46 && (k = ""), T.with({ path: k });
      }, $.basename = function(T) {
        return ye.basename(T.path);
      }, $.extname = function(T) {
        return ye.extname(T.path);
      };
    })(Ie || (Ie = {}));
  })(), ic = r;
})();
const { URI: At, Utils: dn } = ic;
var it;
(function(n) {
  n.basename = dn.basename, n.dirname = dn.dirname, n.extname = dn.extname, n.joinPath = dn.joinPath, n.resolvePath = dn.resolvePath;
  function e(i, s) {
    return (i == null ? void 0 : i.toString()) === (s == null ? void 0 : s.toString());
  }
  n.equals = e;
  function t(i, s) {
    const a = typeof i == "string" ? i : i.path, o = typeof s == "string" ? s : s.path, l = a.split("/").filter((f) => f.length > 0), u = o.split("/").filter((f) => f.length > 0);
    let c = 0;
    for (; c < l.length && l[c] === u[c]; c++)
      ;
    const d = "../".repeat(l.length - c), h = u.slice(c).join("/");
    return d + h;
  }
  n.relative = t;
  function r(i) {
    return At.parse(i.toString()).toString();
  }
  n.normalize = r;
})(it || (it = {}));
var U;
(function(n) {
  n[n.Changed = 0] = "Changed", n[n.Parsed = 1] = "Parsed", n[n.IndexedContent = 2] = "IndexedContent", n[n.ComputedScopes = 3] = "ComputedScopes", n[n.Linked = 4] = "Linked", n[n.IndexedReferences = 5] = "IndexedReferences", n[n.Validated = 6] = "Validated";
})(U || (U = {}));
class Lm {
  constructor(e) {
    this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider;
  }
  async fromUri(e, t = V.CancellationToken.None) {
    const r = await this.fileSystemProvider.readFile(e);
    return this.createAsync(e, r, t);
  }
  fromTextDocument(e, t, r) {
    return t = t ?? At.parse(e.uri), V.CancellationToken.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromString(e, t, r) {
    return V.CancellationToken.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromModel(e, t) {
    return this.create(t, { $model: e });
  }
  create(e, t, r) {
    if (typeof t == "string") {
      const i = this.parse(e, t, r);
      return this.createLangiumDocument(i, e, void 0, t);
    } else if ("$model" in t) {
      const i = { value: t.$model, parserErrors: [], lexerErrors: [] };
      return this.createLangiumDocument(i, e);
    } else {
      const i = this.parse(e, t.getText(), r);
      return this.createLangiumDocument(i, e, t);
    }
  }
  async createAsync(e, t, r) {
    if (typeof t == "string") {
      const i = await this.parseAsync(e, t, r);
      return this.createLangiumDocument(i, e, void 0, t);
    } else {
      const i = await this.parseAsync(e, t.getText(), r);
      return this.createLangiumDocument(i, e, t);
    }
  }
  /**
   * Create a LangiumDocument from a given parse result.
   *
   * A TextDocument is created on demand if it is not provided as argument here. Usually this
   * should not be necessary because the main purpose of the TextDocument is to convert between
   * text ranges and offsets, which is done solely in LSP request handling.
   *
   * With the introduction of {@link update} below this method is supposed to be mainly called
   * during workspace initialization and on addition/recognition of new files, while changes in
   * existing documents are processed via {@link update}.
   */
  createLangiumDocument(e, t, r, i) {
    let s;
    if (r)
      s = {
        parseResult: e,
        uri: t,
        state: U.Parsed,
        references: [],
        textDocument: r
      };
    else {
      const a = this.createTextDocumentGetter(t, i);
      s = {
        parseResult: e,
        uri: t,
        state: U.Parsed,
        references: [],
        get textDocument() {
          return a();
        }
      };
    }
    return e.value.$document = s, s;
  }
  async update(e, t) {
    var r, i;
    const s = (r = e.parseResult.value.$cstNode) === null || r === void 0 ? void 0 : r.root.fullText, a = (i = this.textDocuments) === null || i === void 0 ? void 0 : i.get(e.uri.toString()), o = a ? a.getText() : await this.fileSystemProvider.readFile(e.uri);
    if (a)
      Object.defineProperty(e, "textDocument", {
        value: a
      });
    else {
      const l = this.createTextDocumentGetter(e.uri, o);
      Object.defineProperty(e, "textDocument", {
        get: l
      });
    }
    return s !== o && (e.parseResult = await this.parseAsync(e.uri, o, t), e.parseResult.value.$document = e), e.state = U.Parsed, e;
  }
  parse(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t, r);
  }
  parseAsync(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(t, r);
  }
  createTextDocumentGetter(e, t) {
    const r = this.serviceRegistry;
    let i;
    return () => i ?? (i = Ms.create(e.toString(), r.getServices(e).LanguageMetaData.languageId, 0, t ?? ""));
  }
}
class Om {
  constructor(e) {
    this.documentMap = /* @__PURE__ */ new Map(), this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.serviceRegistry = e.ServiceRegistry;
  }
  get all() {
    return ee(this.documentMap.values());
  }
  addDocument(e) {
    const t = e.uri.toString();
    if (this.documentMap.has(t))
      throw new Error(`A document with the URI '${t}' is already present.`);
    this.documentMap.set(t, e);
  }
  getDocument(e) {
    const t = e.toString();
    return this.documentMap.get(t);
  }
  async getOrCreateDocument(e, t) {
    let r = this.getDocument(e);
    return r || (r = await this.langiumDocumentFactory.fromUri(e, t), this.addDocument(r), r);
  }
  createDocument(e, t, r) {
    if (r)
      return this.langiumDocumentFactory.fromString(t, e, r).then((i) => (this.addDocument(i), i));
    {
      const i = this.langiumDocumentFactory.fromString(t, e);
      return this.addDocument(i), i;
    }
  }
  hasDocument(e) {
    return this.documentMap.has(e.toString());
  }
  invalidateDocument(e) {
    const t = e.toString(), r = this.documentMap.get(t);
    return r && (this.serviceRegistry.getServices(e).references.Linker.unlink(r), r.state = U.Changed, r.precomputedScopes = void 0, r.diagnostics = void 0), r;
  }
  deleteDocument(e) {
    const t = e.toString(), r = this.documentMap.get(t);
    return r && (r.state = U.Changed, this.documentMap.delete(t)), r;
  }
}
const Wi = Symbol("ref_resolving");
class bm {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator;
  }
  async link(e, t = V.CancellationToken.None) {
    for (const r of _t(e.parseResult.value))
      await Ae(t), Kl(r).forEach((i) => this.doLink(i, e));
  }
  doLink(e, t) {
    var r;
    const i = e.reference;
    if (i._ref === void 0) {
      i._ref = Wi;
      try {
        const s = this.getCandidate(e);
        if (Nr(s))
          i._ref = s;
        else if (i._nodeDescription = s, this.langiumDocuments().hasDocument(s.documentUri)) {
          const a = this.loadAstNode(s);
          i._ref = a ?? this.createLinkingError(e, s);
        } else
          i._ref = void 0;
      } catch (s) {
        console.error(`An error occurred while resolving reference to '${i.$refText}':`, s);
        const a = (r = s.message) !== null && r !== void 0 ? r : String(s);
        i._ref = Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${i.$refText}': ${a}` });
      }
      t.references.push(i);
    }
  }
  unlink(e) {
    for (const t of e.references)
      delete t._ref, delete t._nodeDescription;
    e.references = [];
  }
  getCandidate(e) {
    const r = this.scopeProvider.getScope(e).getElement(e.reference.$refText);
    return r ?? this.createLinkingError(e);
  }
  buildReference(e, t, r, i) {
    const s = this, a = {
      $refNode: r,
      $refText: i,
      get ref() {
        var o;
        if (ae(this._ref))
          return this._ref;
        if (gd(this._nodeDescription)) {
          const l = s.loadAstNode(this._nodeDescription);
          this._ref = l ?? s.createLinkingError({ reference: a, container: e, property: t }, this._nodeDescription);
        } else if (this._ref === void 0) {
          this._ref = Wi;
          const l = os(e).$document, u = s.getLinkedNode({ reference: a, container: e, property: t });
          if (u.error && l && l.state < U.ComputedScopes)
            return this._ref = void 0;
          this._ref = (o = u.node) !== null && o !== void 0 ? o : u.error, this._nodeDescription = u.descr, l == null || l.references.push(this);
        } else if (this._ref === Wi)
          throw new Error(`Cyclic reference resolution detected: ${s.astNodeLocator.getAstNodePath(e)}/${t} (symbol '${i}')`);
        return ae(this._ref) ? this._ref : void 0;
      },
      get $nodeDescription() {
        return this._nodeDescription;
      },
      get error() {
        return Nr(this._ref) ? this._ref : void 0;
      }
    };
    return a;
  }
  getLinkedNode(e) {
    var t;
    try {
      const r = this.getCandidate(e);
      if (Nr(r))
        return { error: r };
      const i = this.loadAstNode(r);
      return i ? { node: i, descr: r } : {
        descr: r,
        error: this.createLinkingError(e, r)
      };
    } catch (r) {
      console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`, r);
      const i = (t = r.message) !== null && t !== void 0 ? t : String(r);
      return {
        error: Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${e.reference.$refText}': ${i}` })
      };
    }
  }
  loadAstNode(e) {
    if (e.node)
      return e.node;
    const t = this.langiumDocuments().getDocument(e.documentUri);
    if (t)
      return this.astNodeLocator.getAstNode(t.parseResult.value, e.path);
  }
  createLinkingError(e, t) {
    const r = os(e.container).$document;
    r && r.state < U.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${r.uri}).`);
    const i = this.reflection.getReferenceType(e);
    return Object.assign(Object.assign({}, e), { message: `Could not resolve reference to ${i} named '${e.reference.$refText}'.`, targetDescription: t });
  }
}
function Pm(n) {
  return typeof n.name == "string";
}
class Mm {
  getName(e) {
    if (Pm(e))
      return e.name;
  }
  getNameNode(e) {
    return ql(e.$cstNode, "name");
  }
}
class Dm {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator;
  }
  findDeclaration(e) {
    if (e) {
      const t = uf(e), r = e.astNode;
      if (t && r) {
        const i = r[t.feature];
        if (Ue(i))
          return i.ref;
        if (Array.isArray(i)) {
          for (const s of i)
            if (Ue(s) && s.$refNode && s.$refNode.offset <= e.offset && s.$refNode.end >= e.end)
              return s.ref;
        }
      }
      if (r) {
        const i = this.nameProvider.getNameNode(r);
        if (i && (i === e || Rd(e, i)))
          return r;
      }
    }
  }
  findDeclarationNode(e) {
    const t = this.findDeclaration(e);
    if (t != null && t.$cstNode) {
      const r = this.nameProvider.getNameNode(t);
      return r ?? t.$cstNode;
    }
  }
  findReferences(e, t) {
    const r = [];
    if (t.includeDeclaration) {
      const s = this.getReferenceToSelf(e);
      s && r.push(s);
    }
    let i = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e));
    return t.documentUri && (i = i.filter((s) => it.equals(s.sourceUri, t.documentUri))), r.push(...i), ee(r);
  }
  getReferenceToSelf(e) {
    const t = this.nameProvider.getNameNode(e);
    if (t) {
      const r = et(e), i = this.nodeLocator.getAstNodePath(e);
      return {
        sourceUri: r.uri,
        sourcePath: i,
        targetUri: r.uri,
        targetPath: i,
        segment: Hr(t),
        local: !0
      };
    }
  }
}
class ci {
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.add(t, r);
  }
  /**
   * The total number of values in the multimap.
   */
  get size() {
    return is.sum(ee(this.map.values()).map((e) => e.length));
  }
  /**
   * Clear all entries in the multimap.
   */
  clear() {
    this.map.clear();
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method deletes the specific key / value pair from the multimap.
   *  * Without a value, all values associated with the given key are deleted.
   *
   * @returns `true` if a value existed and has been removed, or `false` if the specified
   *     key / value does not exist.
   */
  delete(e, t) {
    if (t === void 0)
      return this.map.delete(e);
    {
      const r = this.map.get(e);
      if (r) {
        const i = r.indexOf(t);
        if (i >= 0)
          return r.length === 1 ? this.map.delete(e) : r.splice(i, 1), !0;
      }
      return !1;
    }
  }
  /**
   * Returns an array of all values associated with the given key. If no value exists,
   * an empty array is returned.
   *
   * _Note:_ The returned array is assumed not to be modified. Use the `set` method to add a
   * value and `delete` to remove a value from the multimap.
   */
  get(e) {
    var t;
    return (t = this.map.get(e)) !== null && t !== void 0 ? t : [];
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method returns `true` if the specific key / value pair is present in the multimap.
   *  * Without a value, this method returns `true` if the given key is present in the multimap.
   */
  has(e, t) {
    if (t === void 0)
      return this.map.has(e);
    {
      const r = this.map.get(e);
      return r ? r.indexOf(t) >= 0 : !1;
    }
  }
  /**
   * Add the given key / value pair to the multimap.
   */
  add(e, t) {
    return this.map.has(e) ? this.map.get(e).push(t) : this.map.set(e, [t]), this;
  }
  /**
   * Add the given set of key / value pairs to the multimap.
   */
  addAll(e, t) {
    return this.map.has(e) ? this.map.get(e).push(...t) : this.map.set(e, Array.from(t)), this;
  }
  /**
   * Invokes the given callback function for every key / value pair in the multimap.
   */
  forEach(e) {
    this.map.forEach((t, r) => t.forEach((i) => e(i, r, this)));
  }
  /**
   * Returns an iterator of key, value pairs for every entry in the map.
   */
  [Symbol.iterator]() {
    return this.entries().iterator();
  }
  /**
   * Returns a stream of key, value pairs for every entry in the map.
   */
  entries() {
    return ee(this.map.entries()).flatMap(([e, t]) => t.map((r) => [e, r]));
  }
  /**
   * Returns a stream of keys in the map.
   */
  keys() {
    return ee(this.map.keys());
  }
  /**
   * Returns a stream of values in the map.
   */
  values() {
    return ee(this.map.values()).flat();
  }
  /**
   * Returns a stream of key, value set pairs for every key in the map.
   */
  entriesGroupedByKey() {
    return ee(this.map.entries());
  }
}
class ol {
  get size() {
    return this.map.size;
  }
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), this.inverse = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.set(t, r);
  }
  clear() {
    this.map.clear(), this.inverse.clear();
  }
  set(e, t) {
    return this.map.set(e, t), this.inverse.set(t, e), this;
  }
  get(e) {
    return this.map.get(e);
  }
  getKey(e) {
    return this.inverse.get(e);
  }
  delete(e) {
    const t = this.map.get(e);
    return t !== void 0 ? (this.map.delete(e), this.inverse.delete(t), !0) : !1;
  }
}
class Fm {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider;
  }
  async computeExports(e, t = V.CancellationToken.None) {
    return this.computeExportsForNode(e.parseResult.value, e, void 0, t);
  }
  /**
   * Creates {@link AstNodeDescription AstNodeDescriptions} for the given {@link AstNode parentNode} and its children.
   * The list of children to be considered is determined by the function parameter {@link children}.
   * By default only the direct children of {@link parentNode} are visited, nested nodes are not exported.
   *
   * @param parentNode AST node to be exported, i.e., of which an {@link AstNodeDescription} shall be added to the returned list.
   * @param document The document containing the AST node to be exported.
   * @param children A function called with {@link parentNode} as single argument and returning an {@link Iterable} supplying the children to be visited, which must be directly or transitively contained in {@link parentNode}.
   * @param cancelToken Indicates when to cancel the current operation.
   * @throws `OperationCancelled` if a user action occurs during execution.
   * @returns A list of {@link AstNodeDescription AstNodeDescriptions} to be published to index.
   */
  async computeExportsForNode(e, t, r = zs, i = V.CancellationToken.None) {
    const s = [];
    this.exportNode(e, s, t);
    for (const a of r(e))
      await Ae(i), this.exportNode(a, s, t);
    return s;
  }
  /**
   * Add a single node to the list of exports if it has a name. Override this method to change how
   * symbols are exported, e.g. by modifying their exported name.
   */
  exportNode(e, t, r) {
    const i = this.nameProvider.getName(e);
    i && t.push(this.descriptions.createDescription(e, i, r));
  }
  async computeLocalScopes(e, t = V.CancellationToken.None) {
    const r = e.parseResult.value, i = new ci();
    for (const s of tr(r))
      await Ae(t), this.processNode(s, e, i);
    return i;
  }
  /**
   * Process a single node during scopes computation. The default implementation makes the node visible
   * in the subtree of its container (if the node has a name). Override this method to change this,
   * e.g. by increasing the visibility to a higher level in the AST.
   */
  processNode(e, t, r) {
    const i = e.$container;
    if (i) {
      const s = this.nameProvider.getName(e);
      s && r.add(i, this.descriptions.createDescription(e, s, t));
    }
  }
}
class ll {
  constructor(e, t, r) {
    var i;
    this.elements = e, this.outerScope = t, this.caseInsensitive = (i = r == null ? void 0 : r.caseInsensitive) !== null && i !== void 0 ? i : !1;
  }
  getAllElements() {
    return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements;
  }
  getElement(e) {
    const t = this.caseInsensitive ? this.elements.find((r) => r.name.toLowerCase() === e.toLowerCase()) : this.elements.find((r) => r.name === e);
    if (t)
      return t;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
}
class Gm {
  constructor(e, t, r) {
    var i;
    this.elements = /* @__PURE__ */ new Map(), this.caseInsensitive = (i = r == null ? void 0 : r.caseInsensitive) !== null && i !== void 0 ? i : !1;
    for (const s of e) {
      const a = this.caseInsensitive ? s.name.toLowerCase() : s.name;
      this.elements.set(a, s);
    }
    this.outerScope = t;
  }
  getElement(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.elements.get(t);
    if (r)
      return r;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
  getAllElements() {
    let e = ee(this.elements.values());
    return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
  }
}
class sc {
  constructor() {
    this.toDispose = [], this.isDisposed = !1;
  }
  onDispose(e) {
    this.toDispose.push(e);
  }
  dispose() {
    this.throwIfDisposed(), this.clear(), this.isDisposed = !0, this.toDispose.forEach((e) => e.dispose());
  }
  throwIfDisposed() {
    if (this.isDisposed)
      throw new Error("This cache has already been disposed");
  }
}
class Um extends sc {
  constructor() {
    super(...arguments), this.cache = /* @__PURE__ */ new Map();
  }
  has(e) {
    return this.throwIfDisposed(), this.cache.has(e);
  }
  set(e, t) {
    this.throwIfDisposed(), this.cache.set(e, t);
  }
  get(e, t) {
    if (this.throwIfDisposed(), this.cache.has(e))
      return this.cache.get(e);
    if (t) {
      const r = t();
      return this.cache.set(e, r), r;
    } else
      return;
  }
  delete(e) {
    return this.throwIfDisposed(), this.cache.delete(e);
  }
  clear() {
    this.throwIfDisposed(), this.cache.clear();
  }
}
class Bm extends sc {
  constructor(e) {
    super(), this.cache = /* @__PURE__ */ new Map(), this.converter = e ?? ((t) => t);
  }
  has(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).has(t);
  }
  set(e, t, r) {
    this.throwIfDisposed(), this.cacheForContext(e).set(t, r);
  }
  get(e, t, r) {
    this.throwIfDisposed();
    const i = this.cacheForContext(e);
    if (i.has(t))
      return i.get(t);
    if (r) {
      const s = r();
      return i.set(t, s), s;
    } else
      return;
  }
  delete(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).delete(t);
  }
  clear(e) {
    if (this.throwIfDisposed(), e) {
      const t = this.converter(e);
      this.cache.delete(t);
    } else
      this.cache.clear();
  }
  cacheForContext(e) {
    const t = this.converter(e);
    let r = this.cache.get(t);
    return r || (r = /* @__PURE__ */ new Map(), this.cache.set(t, r)), r;
  }
}
class Vm extends Um {
  /**
   * Creates a new workspace cache.
   *
   * @param sharedServices Service container instance to hook into document lifecycle events.
   * @param state Optional document state on which the cache should evict.
   * If not provided, the cache will evict on `DocumentBuilder#onUpdate`.
   * *Deleted* documents are considered in both cases.
   */
  constructor(e, t) {
    super(), t ? (this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(t, () => {
      this.clear();
    })), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((r, i) => {
      i.length > 0 && this.clear();
    }))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(() => {
      this.clear();
    }));
  }
}
class Km {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager, this.globalScopeCache = new Vm(e.shared);
  }
  getScope(e) {
    const t = [], r = this.reflection.getReferenceType(e), i = et(e.container).precomputedScopes;
    if (i) {
      let a = e.container;
      do {
        const o = i.get(a);
        o.length > 0 && t.push(ee(o).filter((l) => this.reflection.isSubtype(l.type, r))), a = a.$container;
      } while (a);
    }
    let s = this.getGlobalScope(r, e);
    for (let a = t.length - 1; a >= 0; a--)
      s = this.createScope(t[a], s);
    return s;
  }
  /**
   * Create a scope for the given collection of AST node descriptions.
   */
  createScope(e, t, r) {
    return new ll(ee(e), t, r);
  }
  /**
   * Create a scope for the given collection of AST nodes, which need to be transformed into respective
   * descriptions first. This is done using the `NameProvider` and `AstNodeDescriptionProvider` services.
   */
  createScopeForNodes(e, t, r) {
    const i = ee(e).map((s) => {
      const a = this.nameProvider.getName(s);
      if (a)
        return this.descriptions.createDescription(s, a);
    }).nonNullable();
    return new ll(i, t, r);
  }
  /**
   * Create a global scope filtered for the given reference type.
   */
  getGlobalScope(e, t) {
    return this.globalScopeCache.get(e, () => new Gm(this.indexManager.allElements(e)));
  }
}
function Wm(n) {
  return typeof n.$comment == "string";
}
function ul(n) {
  return typeof n == "object" && !!n && ("$ref" in n || "$error" in n);
}
class Hm {
  constructor(e) {
    this.ignoreProperties = /* @__PURE__ */ new Set(["$container", "$containerProperty", "$containerIndex", "$document", "$cstNode"]), this.langiumDocuments = e.shared.workspace.LangiumDocuments, this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider, this.commentProvider = e.documentation.CommentProvider;
  }
  serialize(e, t) {
    const r = t ?? {}, i = t == null ? void 0 : t.replacer, s = (o, l) => this.replacer(o, l, r), a = i ? (o, l) => i(o, l, s) : s;
    try {
      return this.currentDocument = et(e), JSON.stringify(e, a, t == null ? void 0 : t.space);
    } finally {
      this.currentDocument = void 0;
    }
  }
  deserialize(e, t) {
    const r = t ?? {}, i = JSON.parse(e);
    return this.linkNode(i, i, r), i;
  }
  replacer(e, t, { refText: r, sourceText: i, textRegions: s, comments: a, uriConverter: o }) {
    var l, u, c, d;
    if (!this.ignoreProperties.has(e))
      if (Ue(t)) {
        const h = t.ref, f = r ? t.$refText : void 0;
        if (h) {
          const m = et(h);
          let g = "";
          this.currentDocument && this.currentDocument !== m && (o ? g = o(m.uri, t) : g = m.uri.toString());
          const A = this.astNodeLocator.getAstNodePath(h);
          return {
            $ref: `${g}#${A}`,
            $refText: f
          };
        } else
          return {
            $error: (u = (l = t.error) === null || l === void 0 ? void 0 : l.message) !== null && u !== void 0 ? u : "Could not resolve reference",
            $refText: f
          };
      } else if (ae(t)) {
        let h;
        if (s && (h = this.addAstNodeRegionWithAssignmentsTo(Object.assign({}, t)), (!e || t.$document) && (h != null && h.$textRegion) && (h.$textRegion.documentURI = (c = this.currentDocument) === null || c === void 0 ? void 0 : c.uri.toString())), i && !e && (h ?? (h = Object.assign({}, t)), h.$sourceText = (d = t.$cstNode) === null || d === void 0 ? void 0 : d.text), a) {
          h ?? (h = Object.assign({}, t));
          const f = this.commentProvider.getComment(t);
          f && (h.$comment = f.replace(/\r/g, ""));
        }
        return h ?? t;
      } else
        return t;
  }
  addAstNodeRegionWithAssignmentsTo(e) {
    const t = (r) => ({
      offset: r.offset,
      end: r.end,
      length: r.length,
      range: r.range
    });
    if (e.$cstNode) {
      const r = e.$textRegion = t(e.$cstNode), i = r.assignments = {};
      return Object.keys(e).filter((s) => !s.startsWith("$")).forEach((s) => {
        const a = af(e.$cstNode, s).map(t);
        a.length !== 0 && (i[s] = a);
      }), e;
    }
  }
  linkNode(e, t, r, i, s, a) {
    for (const [l, u] of Object.entries(e))
      if (Array.isArray(u))
        for (let c = 0; c < u.length; c++) {
          const d = u[c];
          ul(d) ? u[c] = this.reviveReference(e, l, t, d, r) : ae(d) && this.linkNode(d, t, r, e, l, c);
        }
      else ul(u) ? e[l] = this.reviveReference(e, l, t, u, r) : ae(u) && this.linkNode(u, t, r, e, l);
    const o = e;
    o.$container = i, o.$containerProperty = s, o.$containerIndex = a;
  }
  reviveReference(e, t, r, i, s) {
    let a = i.$refText, o = i.$error;
    if (i.$ref) {
      const l = this.getRefNode(r, i.$ref, s.uriConverter);
      if (ae(l))
        return a || (a = this.nameProvider.getName(l)), {
          $refText: a ?? "",
          ref: l
        };
      o = l;
    }
    if (o) {
      const l = {
        $refText: a ?? ""
      };
      return l.error = {
        container: e,
        property: t,
        message: o,
        reference: l
      }, l;
    } else
      return;
  }
  getRefNode(e, t, r) {
    try {
      const i = t.indexOf("#");
      if (i === 0) {
        const l = this.astNodeLocator.getAstNode(e, t.substring(1));
        return l || "Could not resolve path: " + t;
      }
      if (i < 0) {
        const l = r ? r(t) : At.parse(t), u = this.langiumDocuments.getDocument(l);
        return u ? u.parseResult.value : "Could not find document for URI: " + t;
      }
      const s = r ? r(t.substring(0, i)) : At.parse(t.substring(0, i)), a = this.langiumDocuments.getDocument(s);
      if (!a)
        return "Could not find document for URI: " + t;
      if (i === t.length - 1)
        return a.parseResult.value;
      const o = this.astNodeLocator.getAstNode(a.parseResult.value, t.substring(i + 1));
      return o || "Could not resolve URI: " + t;
    } catch (i) {
      return String(i);
    }
  }
}
class jm {
  /**
   * @deprecated Use the new `fileExtensionMap` (or `languageIdMap`) property instead.
   */
  get map() {
    return this.fileExtensionMap;
  }
  constructor(e) {
    this.languageIdMap = /* @__PURE__ */ new Map(), this.fileExtensionMap = /* @__PURE__ */ new Map(), this.textDocuments = e == null ? void 0 : e.workspace.TextDocuments;
  }
  register(e) {
    const t = e.LanguageMetaData;
    for (const r of t.fileExtensions)
      this.fileExtensionMap.has(r) && console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileExtensionMap.set(r, e);
    this.languageIdMap.set(t.languageId, e), this.languageIdMap.size === 1 ? this.singleton = e : this.singleton = void 0;
  }
  getServices(e) {
    var t, r;
    if (this.singleton !== void 0)
      return this.singleton;
    if (this.languageIdMap.size === 0)
      throw new Error("The service registry is empty. Use `register` to register the services of a language.");
    const i = (r = (t = this.textDocuments) === null || t === void 0 ? void 0 : t.get(e)) === null || r === void 0 ? void 0 : r.languageId;
    if (i !== void 0) {
      const o = this.languageIdMap.get(i);
      if (o)
        return o;
    }
    const s = it.extname(e), a = this.fileExtensionMap.get(s);
    if (!a)
      throw i ? new Error(`The service registry contains no services for the extension '${s}' for language '${i}'.`) : new Error(`The service registry contains no services for the extension '${s}'.`);
    return a;
  }
  hasServices(e) {
    try {
      return this.getServices(e), !0;
    } catch {
      return !1;
    }
  }
  get all() {
    return Array.from(this.languageIdMap.values());
  }
}
function Kn(n) {
  return { code: n };
}
var di;
(function(n) {
  n.all = ["fast", "slow", "built-in"];
})(di || (di = {}));
class zm {
  constructor(e) {
    this.entries = new ci(), this.entriesBefore = [], this.entriesAfter = [], this.reflection = e.shared.AstReflection;
  }
  /**
   * Register a set of validation checks. Each value in the record can be either a single validation check (i.e. a function)
   * or an array of validation checks.
   *
   * @param checksRecord Set of validation checks to register.
   * @param category Optional category for the validation checks (defaults to `'fast'`).
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  register(e, t = this, r = "fast") {
    if (r === "built-in")
      throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
    for (const [i, s] of Object.entries(e)) {
      const a = s;
      if (Array.isArray(a))
        for (const o of a) {
          const l = {
            check: this.wrapValidationException(o, t),
            category: r
          };
          this.addEntry(i, l);
        }
      else if (typeof a == "function") {
        const o = {
          check: this.wrapValidationException(a, t),
          category: r
        };
        this.addEntry(i, o);
      } else
        er();
    }
  }
  wrapValidationException(e, t) {
    return async (r, i, s) => {
      await this.handleException(() => e.call(t, r, i, s), "An error occurred during validation", i, r);
    };
  }
  async handleException(e, t, r, i) {
    try {
      await e();
    } catch (s) {
      if (Si(s))
        throw s;
      console.error(`${t}:`, s), s instanceof Error && s.stack && console.error(s.stack);
      const a = s instanceof Error ? s.message : String(s);
      r("error", `${t}: ${a}`, { node: i });
    }
  }
  addEntry(e, t) {
    if (e === "AstNode") {
      this.entries.add("AstNode", t);
      return;
    }
    for (const r of this.reflection.getAllSubTypes(e))
      this.entries.add(r, t);
  }
  getChecks(e, t) {
    let r = ee(this.entries.get(e)).concat(this.entries.get("AstNode"));
    return t && (r = r.filter((i) => t.includes(i.category))), r.map((i) => i.check);
  }
  /**
   * Register logic which will be executed once before validating all the nodes of an AST/Langium document.
   * This helps to prepare or initialize some information which are required or reusable for the following checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map for mapping names to nodes could be established.
   * During the usual checks on the nodes, they are put into this map with their name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerBeforeDocument(e, t = this) {
    this.entriesBefore.push(this.wrapPreparationException(e, "An error occurred during set-up of the validation", t));
  }
  /**
   * Register logic which will be executed once after validating all the nodes of an AST/Langium document.
   * This helps to finally evaluate information which are collected during the checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map with all the collected nodes and their names is checked
   * and validation hints are created for all nodes with the same name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerAfterDocument(e, t = this) {
    this.entriesAfter.push(this.wrapPreparationException(e, "An error occurred during tear-down of the validation", t));
  }
  wrapPreparationException(e, t, r) {
    return async (i, s, a, o) => {
      await this.handleException(() => e.call(r, i, s, a, o), t, s, i);
    };
  }
  get checksBefore() {
    return this.entriesBefore;
  }
  get checksAfter() {
    return this.entriesAfter;
  }
}
class qm {
  constructor(e) {
    this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData;
  }
  async validateDocument(e, t = {}, r = V.CancellationToken.None) {
    const i = e.parseResult, s = [];
    if (await Ae(r), (!t.categories || t.categories.includes("built-in")) && (this.processLexingErrors(i, s, t), t.stopAfterLexingErrors && s.some((a) => {
      var o;
      return ((o = a.data) === null || o === void 0 ? void 0 : o.code) === Oe.LexingError;
    }) || (this.processParsingErrors(i, s, t), t.stopAfterParsingErrors && s.some((a) => {
      var o;
      return ((o = a.data) === null || o === void 0 ? void 0 : o.code) === Oe.ParsingError;
    })) || (this.processLinkingErrors(e, s, t), t.stopAfterLinkingErrors && s.some((a) => {
      var o;
      return ((o = a.data) === null || o === void 0 ? void 0 : o.code) === Oe.LinkingError;
    }))))
      return s;
    try {
      s.push(...await this.validateAst(i.value, t, r));
    } catch (a) {
      if (Si(a))
        throw a;
      console.error("An error occurred during validation:", a);
    }
    return await Ae(r), s;
  }
  processLexingErrors(e, t, r) {
    var i, s, a;
    const o = [...e.lexerErrors, ...(s = (i = e.lexerReport) === null || i === void 0 ? void 0 : i.diagnostics) !== null && s !== void 0 ? s : []];
    for (const l of o) {
      const u = (a = l.severity) !== null && a !== void 0 ? a : "error", c = {
        severity: Hi(u),
        range: {
          start: {
            line: l.line - 1,
            character: l.column - 1
          },
          end: {
            line: l.line - 1,
            character: l.column + l.length - 1
          }
        },
        message: l.message,
        data: Xm(u),
        source: this.getSource()
      };
      t.push(c);
    }
  }
  processParsingErrors(e, t, r) {
    for (const i of e.parserErrors) {
      let s;
      if (isNaN(i.token.startOffset)) {
        if ("previousToken" in i) {
          const a = i.previousToken;
          if (isNaN(a.startOffset)) {
            const o = { line: 0, character: 0 };
            s = { start: o, end: o };
          } else {
            const o = { line: a.endLine - 1, character: a.endColumn };
            s = { start: o, end: o };
          }
        }
      } else
        s = as(i.token);
      if (s) {
        const a = {
          severity: Hi("error"),
          range: s,
          message: i.message,
          data: Kn(Oe.ParsingError),
          source: this.getSource()
        };
        t.push(a);
      }
    }
  }
  processLinkingErrors(e, t, r) {
    for (const i of e.references) {
      const s = i.error;
      if (s) {
        const a = {
          node: s.container,
          property: s.property,
          index: s.index,
          data: {
            code: Oe.LinkingError,
            containerType: s.container.$type,
            property: s.property,
            refText: s.reference.$refText
          }
        };
        t.push(this.toDiagnostic("error", s.message, a));
      }
    }
  }
  async validateAst(e, t, r = V.CancellationToken.None) {
    const i = [], s = (a, o, l) => {
      i.push(this.toDiagnostic(a, o, l));
    };
    return await this.validateAstBefore(e, t, s, r), await this.validateAstNodes(e, t, s, r), await this.validateAstAfter(e, t, s, r), i;
  }
  async validateAstBefore(e, t, r, i = V.CancellationToken.None) {
    var s;
    const a = this.validationRegistry.checksBefore;
    for (const o of a)
      await Ae(i), await o(e, r, (s = t.categories) !== null && s !== void 0 ? s : [], i);
  }
  async validateAstNodes(e, t, r, i = V.CancellationToken.None) {
    await Promise.all(_t(e).map(async (s) => {
      await Ae(i);
      const a = this.validationRegistry.getChecks(s.$type, t.categories);
      for (const o of a)
        await o(s, r, i);
    }));
  }
  async validateAstAfter(e, t, r, i = V.CancellationToken.None) {
    var s;
    const a = this.validationRegistry.checksAfter;
    for (const o of a)
      await Ae(i), await o(e, r, (s = t.categories) !== null && s !== void 0 ? s : [], i);
  }
  toDiagnostic(e, t, r) {
    return {
      message: t,
      range: Ym(r),
      severity: Hi(e),
      code: r.code,
      codeDescription: r.codeDescription,
      tags: r.tags,
      relatedInformation: r.relatedInformation,
      data: r.data,
      source: this.getSource()
    };
  }
  getSource() {
    return this.metadata.languageId;
  }
}
function Ym(n) {
  if (n.range)
    return n.range;
  let e;
  return typeof n.property == "string" ? e = ql(n.node.$cstNode, n.property, n.index) : typeof n.keyword == "string" && (e = of(n.node.$cstNode, n.keyword, n.index)), e ?? (e = n.node.$cstNode), e ? e.range : {
    start: { line: 0, character: 0 },
    end: { line: 0, character: 0 }
  };
}
function Hi(n) {
  switch (n) {
    case "error":
      return 1;
    case "warning":
      return 2;
    case "info":
      return 3;
    case "hint":
      return 4;
    default:
      throw new Error("Invalid diagnostic severity: " + n);
  }
}
function Xm(n) {
  switch (n) {
    case "error":
      return Kn(Oe.LexingError);
    case "warning":
      return Kn(Oe.LexingWarning);
    case "info":
      return Kn(Oe.LexingInfo);
    case "hint":
      return Kn(Oe.LexingHint);
    default:
      throw new Error("Invalid diagnostic severity: " + n);
  }
}
var Oe;
(function(n) {
  n.LexingError = "lexing-error", n.LexingWarning = "lexing-warning", n.LexingInfo = "lexing-info", n.LexingHint = "lexing-hint", n.ParsingError = "parsing-error", n.LinkingError = "linking-error";
})(Oe || (Oe = {}));
class Jm {
  constructor(e) {
    this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider;
  }
  createDescription(e, t, r) {
    const i = r ?? et(e);
    t ?? (t = this.nameProvider.getName(e));
    const s = this.astNodeLocator.getAstNodePath(e);
    if (!t)
      throw new Error(`Node at path ${s} has no name.`);
    let a;
    const o = () => {
      var l;
      return a ?? (a = Hr((l = this.nameProvider.getNameNode(e)) !== null && l !== void 0 ? l : e.$cstNode));
    };
    return {
      node: e,
      name: t,
      get nameSegment() {
        return o();
      },
      selectionSegment: Hr(e.$cstNode),
      type: e.$type,
      documentUri: i.uri,
      path: s
    };
  }
}
class Qm {
  constructor(e) {
    this.nodeLocator = e.workspace.AstNodeLocator;
  }
  async createDescriptions(e, t = V.CancellationToken.None) {
    const r = [], i = e.parseResult.value;
    for (const s of _t(i))
      await Ae(t), Kl(s).filter((a) => !Nr(a)).forEach((a) => {
        const o = this.createDescription(a);
        o && r.push(o);
      });
    return r;
  }
  createDescription(e) {
    const t = e.reference.$nodeDescription, r = e.reference.$refNode;
    if (!t || !r)
      return;
    const i = et(e.container).uri;
    return {
      sourceUri: i,
      sourcePath: this.nodeLocator.getAstNodePath(e.container),
      targetUri: t.documentUri,
      targetPath: t.path,
      segment: Hr(r),
      local: it.equals(t.documentUri, i)
    };
  }
}
class Zm {
  constructor() {
    this.segmentSeparator = "/", this.indexSeparator = "@";
  }
  getAstNodePath(e) {
    if (e.$container) {
      const t = this.getAstNodePath(e.$container), r = this.getPathSegment(e);
      return t + this.segmentSeparator + r;
    }
    return "";
  }
  getPathSegment({ $containerProperty: e, $containerIndex: t }) {
    if (!e)
      throw new Error("Missing '$containerProperty' in AST node.");
    return t !== void 0 ? e + this.indexSeparator + t : e;
  }
  getAstNode(e, t) {
    return t.split(this.segmentSeparator).reduce((i, s) => {
      if (!i || s.length === 0)
        return i;
      const a = s.indexOf(this.indexSeparator);
      if (a > 0) {
        const o = s.substring(0, a), l = parseInt(s.substring(a + 1)), u = i[o];
        return u == null ? void 0 : u[l];
      }
      return i[s];
    }, e);
  }
}
var eg = tc();
class tg {
  constructor(e) {
    this._ready = new da(), this.settings = {}, this.workspaceConfig = !1, this.onConfigurationSectionUpdateEmitter = new eg.Emitter(), this.serviceRegistry = e.ServiceRegistry;
  }
  get ready() {
    return this._ready.promise;
  }
  initialize(e) {
    var t, r;
    this.workspaceConfig = (r = (t = e.capabilities.workspace) === null || t === void 0 ? void 0 : t.configuration) !== null && r !== void 0 ? r : !1;
  }
  async initialized(e) {
    if (this.workspaceConfig) {
      if (e.register) {
        const t = this.serviceRegistry.all;
        e.register({
          // Listen to configuration changes for all languages
          section: t.map((r) => this.toSectionName(r.LanguageMetaData.languageId))
        });
      }
      if (e.fetchConfiguration) {
        const t = this.serviceRegistry.all.map((i) => ({
          // Fetch the configuration changes for all languages
          section: this.toSectionName(i.LanguageMetaData.languageId)
        })), r = await e.fetchConfiguration(t);
        t.forEach((i, s) => {
          this.updateSectionConfiguration(i.section, r[s]);
        });
      }
    }
    this._ready.resolve();
  }
  /**
   *  Updates the cached configurations using the `change` notification parameters.
   *
   * @param change The parameters of a change configuration notification.
   * `settings` property of the change object could be expressed as `Record<string, Record<string, any>>`
   */
  updateConfiguration(e) {
    e.settings && Object.keys(e.settings).forEach((t) => {
      const r = e.settings[t];
      this.updateSectionConfiguration(t, r), this.onConfigurationSectionUpdateEmitter.fire({ section: t, configuration: r });
    });
  }
  updateSectionConfiguration(e, t) {
    this.settings[e] = t;
  }
  /**
  * Returns a configuration value stored for the given language.
  *
  * @param language The language id
  * @param configuration Configuration name
  */
  async getConfiguration(e, t) {
    await this.ready;
    const r = this.toSectionName(e);
    if (this.settings[r])
      return this.settings[r][t];
  }
  toSectionName(e) {
    return `${e}`;
  }
  get onConfigurationSectionUpdate() {
    return this.onConfigurationSectionUpdateEmitter.event;
  }
}
var qn;
(function(n) {
  function e(t) {
    return {
      dispose: async () => await t()
    };
  }
  n.create = e;
})(qn || (qn = {}));
class ng {
  constructor(e) {
    this.updateBuildOptions = {
      // Default: run only the built-in validation checks and those in the _fast_ category (includes those without category)
      validation: {
        categories: ["built-in", "fast"]
      }
    }, this.updateListeners = [], this.buildPhaseListeners = new ci(), this.documentPhaseListeners = new ci(), this.buildState = /* @__PURE__ */ new Map(), this.documentBuildWaiters = /* @__PURE__ */ new Map(), this.currentState = U.Changed, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.textDocuments = e.workspace.TextDocuments, this.indexManager = e.workspace.IndexManager, this.serviceRegistry = e.ServiceRegistry;
  }
  async build(e, t = {}, r = V.CancellationToken.None) {
    var i, s;
    for (const a of e) {
      const o = a.uri.toString();
      if (a.state === U.Validated) {
        if (typeof t.validation == "boolean" && t.validation)
          a.state = U.IndexedReferences, a.diagnostics = void 0, this.buildState.delete(o);
        else if (typeof t.validation == "object") {
          const l = this.buildState.get(o), u = (i = l == null ? void 0 : l.result) === null || i === void 0 ? void 0 : i.validationChecks;
          if (u) {
            const d = ((s = t.validation.categories) !== null && s !== void 0 ? s : di.all).filter((h) => !u.includes(h));
            d.length > 0 && (this.buildState.set(o, {
              completed: !1,
              options: {
                validation: Object.assign(Object.assign({}, t.validation), { categories: d })
              },
              result: l.result
            }), a.state = U.IndexedReferences);
          }
        }
      } else
        this.buildState.delete(o);
    }
    this.currentState = U.Changed, await this.emitUpdate(e.map((a) => a.uri), []), await this.buildDocuments(e, t, r);
  }
  async update(e, t, r = V.CancellationToken.None) {
    this.currentState = U.Changed;
    for (const a of t)
      this.langiumDocuments.deleteDocument(a), this.buildState.delete(a.toString()), this.indexManager.remove(a);
    for (const a of e) {
      if (!this.langiumDocuments.invalidateDocument(a)) {
        const l = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, a);
        l.state = U.Changed, this.langiumDocuments.addDocument(l);
      }
      this.buildState.delete(a.toString());
    }
    const i = ee(e).concat(t).map((a) => a.toString()).toSet();
    this.langiumDocuments.all.filter((a) => !i.has(a.uri.toString()) && this.shouldRelink(a, i)).forEach((a) => {
      this.serviceRegistry.getServices(a.uri).references.Linker.unlink(a), a.state = Math.min(a.state, U.ComputedScopes), a.diagnostics = void 0;
    }), await this.emitUpdate(e, t), await Ae(r);
    const s = this.sortDocuments(this.langiumDocuments.all.filter((a) => {
      var o;
      return a.state < U.Linked || !(!((o = this.buildState.get(a.uri.toString())) === null || o === void 0) && o.completed);
    }).toArray());
    await this.buildDocuments(s, this.updateBuildOptions, r);
  }
  async emitUpdate(e, t) {
    await Promise.all(this.updateListeners.map((r) => r(e, t)));
  }
  /**
   * Sort the given documents by priority. By default, documents with an open text document are prioritized.
   * This is useful to ensure that visible documents show their diagnostics before all other documents.
   *
   * This improves the responsiveness in large workspaces as users usually don't care about diagnostics
   * in files that are currently not opened in the editor.
   */
  sortDocuments(e) {
    let t = 0, r = e.length - 1;
    for (; t < r; ) {
      for (; t < e.length && this.hasTextDocument(e[t]); )
        t++;
      for (; r >= 0 && !this.hasTextDocument(e[r]); )
        r--;
      t < r && ([e[t], e[r]] = [e[r], e[t]]);
    }
    return e;
  }
  hasTextDocument(e) {
    var t;
    return !!(!((t = this.textDocuments) === null || t === void 0) && t.get(e.uri));
  }
  /**
   * Check whether the given document should be relinked after changes were found in the given URIs.
   */
  shouldRelink(e, t) {
    return e.references.some((r) => r.error !== void 0) ? !0 : this.indexManager.isAffected(e, t);
  }
  onUpdate(e) {
    return this.updateListeners.push(e), qn.create(() => {
      const t = this.updateListeners.indexOf(e);
      t >= 0 && this.updateListeners.splice(t, 1);
    });
  }
  /**
   * Build the given documents by stepping through all build phases. If a document's state indicates
   * that a certain build phase is already done, the phase is skipped for that document.
   *
   * @param documents The documents to build.
   * @param options the {@link BuildOptions} to use.
   * @param cancelToken A cancellation token that can be used to cancel the build.
   * @returns A promise that resolves when the build is done.
   */
  async buildDocuments(e, t, r) {
    this.prepareBuild(e, t), await this.runCancelable(e, U.Parsed, r, (s) => this.langiumDocumentFactory.update(s, r)), await this.runCancelable(e, U.IndexedContent, r, (s) => this.indexManager.updateContent(s, r)), await this.runCancelable(e, U.ComputedScopes, r, async (s) => {
      const a = this.serviceRegistry.getServices(s.uri).references.ScopeComputation;
      s.precomputedScopes = await a.computeLocalScopes(s, r);
    }), await this.runCancelable(e, U.Linked, r, (s) => this.serviceRegistry.getServices(s.uri).references.Linker.link(s, r)), await this.runCancelable(e, U.IndexedReferences, r, (s) => this.indexManager.updateReferences(s, r));
    const i = e.filter((s) => this.shouldValidate(s));
    await this.runCancelable(i, U.Validated, r, (s) => this.validate(s, r));
    for (const s of e) {
      const a = this.buildState.get(s.uri.toString());
      a && (a.completed = !0);
    }
  }
  /**
   * Runs prior to beginning the build process to update the {@link DocumentBuildState} for each document
   *
   * @param documents collection of documents to be built
   * @param options the {@link BuildOptions} to use
   */
  prepareBuild(e, t) {
    for (const r of e) {
      const i = r.uri.toString(), s = this.buildState.get(i);
      (!s || s.completed) && this.buildState.set(i, {
        completed: !1,
        options: t,
        result: s == null ? void 0 : s.result
      });
    }
  }
  /**
   * Runs a cancelable operation on a set of documents to bring them to a specified {@link DocumentState}.
   *
   * @param documents The array of documents to process.
   * @param targetState The target {@link DocumentState} to bring the documents to.
   * @param cancelToken A token that can be used to cancel the operation.
   * @param callback A function to be called for each document.
   * @returns A promise that resolves when all documents have been processed or the operation is canceled.
   * @throws Will throw `OperationCancelled` if the operation is canceled via a `CancellationToken`.
   */
  async runCancelable(e, t, r, i) {
    const s = e.filter((o) => o.state < t);
    for (const o of s)
      await Ae(r), await i(o), o.state = t, await this.notifyDocumentPhase(o, t, r);
    const a = e.filter((o) => o.state === t);
    await this.notifyBuildPhase(a, t, r), this.currentState = t;
  }
  onBuildPhase(e, t) {
    return this.buildPhaseListeners.add(e, t), qn.create(() => {
      this.buildPhaseListeners.delete(e, t);
    });
  }
  onDocumentPhase(e, t) {
    return this.documentPhaseListeners.add(e, t), qn.create(() => {
      this.documentPhaseListeners.delete(e, t);
    });
  }
  waitUntil(e, t, r) {
    let i;
    if (t && "path" in t ? i = t : r = t, r ?? (r = V.CancellationToken.None), i) {
      const s = this.langiumDocuments.getDocument(i);
      if (s && s.state > e)
        return Promise.resolve(i);
    }
    return this.currentState >= e ? Promise.resolve(void 0) : r.isCancellationRequested ? Promise.reject(ui) : new Promise((s, a) => {
      const o = this.onBuildPhase(e, () => {
        if (o.dispose(), l.dispose(), i) {
          const u = this.langiumDocuments.getDocument(i);
          s(u == null ? void 0 : u.uri);
        } else
          s(void 0);
      }), l = r.onCancellationRequested(() => {
        o.dispose(), l.dispose(), a(ui);
      });
    });
  }
  async notifyDocumentPhase(e, t, r) {
    const s = this.documentPhaseListeners.get(t).slice();
    for (const a of s)
      try {
        await a(e, r);
      } catch (o) {
        if (!Si(o))
          throw o;
      }
  }
  async notifyBuildPhase(e, t, r) {
    if (e.length === 0)
      return;
    const s = this.buildPhaseListeners.get(t).slice();
    for (const a of s)
      await Ae(r), await a(e, r);
  }
  /**
   * Determine whether the given document should be validated during a build. The default
   * implementation checks the `validation` property of the build options. If it's set to `true`
   * or a `ValidationOptions` object, the document is included in the validation phase.
   */
  shouldValidate(e) {
    return !!this.getBuildOptions(e).validation;
  }
  /**
   * Run validation checks on the given document and store the resulting diagnostics in the document.
   * If the document already contains diagnostics, the new ones are added to the list.
   */
  async validate(e, t) {
    var r, i;
    const s = this.serviceRegistry.getServices(e.uri).validation.DocumentValidator, a = this.getBuildOptions(e).validation, o = typeof a == "object" ? a : void 0, l = await s.validateDocument(e, o, t);
    e.diagnostics ? e.diagnostics.push(...l) : e.diagnostics = l;
    const u = this.buildState.get(e.uri.toString());
    if (u) {
      (r = u.result) !== null && r !== void 0 || (u.result = {});
      const c = (i = o == null ? void 0 : o.categories) !== null && i !== void 0 ? i : di.all;
      u.result.validationChecks ? u.result.validationChecks.push(...c) : u.result.validationChecks = [...c];
    }
  }
  getBuildOptions(e) {
    var t, r;
    return (r = (t = this.buildState.get(e.uri.toString())) === null || t === void 0 ? void 0 : t.options) !== null && r !== void 0 ? r : {};
  }
}
class rg {
  constructor(e) {
    this.symbolIndex = /* @__PURE__ */ new Map(), this.symbolByTypeIndex = new Bm(), this.referenceIndex = /* @__PURE__ */ new Map(), this.documents = e.workspace.LangiumDocuments, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection;
  }
  findAllReferences(e, t) {
    const r = et(e).uri, i = [];
    return this.referenceIndex.forEach((s) => {
      s.forEach((a) => {
        it.equals(a.targetUri, r) && a.targetPath === t && i.push(a);
      });
    }), ee(i);
  }
  allElements(e, t) {
    let r = ee(this.symbolIndex.keys());
    return t && (r = r.filter((i) => !t || t.has(i))), r.map((i) => this.getFileDescriptions(i, e)).flat();
  }
  getFileDescriptions(e, t) {
    var r;
    return t ? this.symbolByTypeIndex.get(e, t, () => {
      var s;
      return ((s = this.symbolIndex.get(e)) !== null && s !== void 0 ? s : []).filter((o) => this.astReflection.isSubtype(o.type, t));
    }) : (r = this.symbolIndex.get(e)) !== null && r !== void 0 ? r : [];
  }
  remove(e) {
    const t = e.toString();
    this.symbolIndex.delete(t), this.symbolByTypeIndex.clear(t), this.referenceIndex.delete(t);
  }
  async updateContent(e, t = V.CancellationToken.None) {
    const i = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e, t), s = e.uri.toString();
    this.symbolIndex.set(s, i), this.symbolByTypeIndex.clear(s);
  }
  async updateReferences(e, t = V.CancellationToken.None) {
    const i = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, t);
    this.referenceIndex.set(e.uri.toString(), i);
  }
  isAffected(e, t) {
    const r = this.referenceIndex.get(e.uri.toString());
    return r ? r.some((i) => !i.local && t.has(i.targetUri.toString())) : !1;
  }
}
class ig {
  constructor(e) {
    this.initialBuildOptions = {}, this._ready = new da(), this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.WorkspaceLock;
  }
  get ready() {
    return this._ready.promise;
  }
  get workspaceFolders() {
    return this.folders;
  }
  initialize(e) {
    var t;
    this.folders = (t = e.workspaceFolders) !== null && t !== void 0 ? t : void 0;
  }
  initialized(e) {
    return this.mutex.write((t) => {
      var r;
      return this.initializeWorkspace((r = this.folders) !== null && r !== void 0 ? r : [], t);
    });
  }
  async initializeWorkspace(e, t = V.CancellationToken.None) {
    const r = await this.performStartup(e);
    await Ae(t), await this.documentBuilder.build(r, this.initialBuildOptions, t);
  }
  /**
   * Performs the uninterruptable startup sequence of the workspace manager.
   * This methods loads all documents in the workspace and other documents and returns them.
   */
  async performStartup(e) {
    const t = this.serviceRegistry.all.flatMap((s) => s.LanguageMetaData.fileExtensions), r = [], i = (s) => {
      r.push(s), this.langiumDocuments.hasDocument(s.uri) || this.langiumDocuments.addDocument(s);
    };
    return await this.loadAdditionalDocuments(e, i), await Promise.all(e.map((s) => [s, this.getRootFolder(s)]).map(async (s) => this.traverseFolder(...s, t, i))), this._ready.resolve(), r;
  }
  /**
   * Load all additional documents that shall be visible in the context of the given workspace
   * folders and add them to the collector. This can be used to include built-in libraries of
   * your language, which can be either loaded from provided files or constructed in memory.
   */
  loadAdditionalDocuments(e, t) {
    return Promise.resolve();
  }
  /**
   * Determine the root folder of the source documents in the given workspace folder.
   * The default implementation returns the URI of the workspace folder, but you can override
   * this to return a subfolder like `src` instead.
   */
  getRootFolder(e) {
    return At.parse(e.uri);
  }
  /**
   * Traverse the file system folder identified by the given URI and its subfolders. All
   * contained files that match the file extensions are added to the collector.
   */
  async traverseFolder(e, t, r, i) {
    const s = await this.fileSystemProvider.readDirectory(t);
    await Promise.all(s.map(async (a) => {
      if (this.includeEntry(e, a, r)) {
        if (a.isDirectory)
          await this.traverseFolder(e, a.uri, r, i);
        else if (a.isFile) {
          const o = await this.langiumDocuments.getOrCreateDocument(a.uri);
          i(o);
        }
      }
    }));
  }
  /**
   * Determine whether the given folder entry shall be included while indexing the workspace.
   */
  includeEntry(e, t, r) {
    const i = it.basename(t.uri);
    if (i.startsWith("."))
      return !1;
    if (t.isDirectory)
      return i !== "node_modules" && i !== "out";
    if (t.isFile) {
      const s = it.extname(t.uri);
      return r.includes(s);
    }
    return !1;
  }
}
class sg {
  buildUnexpectedCharactersMessage(e, t, r, i, s) {
    return fs.buildUnexpectedCharactersMessage(e, t, r, i, s);
  }
  buildUnableToPopLexerModeMessage(e) {
    return fs.buildUnableToPopLexerModeMessage(e);
  }
}
const ag = { mode: "full" };
class og {
  constructor(e) {
    this.errorMessageProvider = e.parser.LexerErrorMessageProvider, this.tokenBuilder = e.parser.TokenBuilder;
    const t = this.tokenBuilder.buildTokens(e.Grammar, {
      caseInsensitive: e.LanguageMetaData.caseInsensitive
    });
    this.tokenTypes = this.toTokenTypeDictionary(t);
    const r = cl(t) ? Object.values(t) : t, i = e.LanguageMetaData.mode === "production";
    this.chevrotainLexer = new fe(r, {
      positionTracking: "full",
      skipValidations: i,
      errorMessageProvider: this.errorMessageProvider
    });
  }
  get definition() {
    return this.tokenTypes;
  }
  tokenize(e, t = ag) {
    var r, i, s;
    const a = this.chevrotainLexer.tokenize(e);
    return {
      tokens: a.tokens,
      errors: a.errors,
      hidden: (r = a.groups.hidden) !== null && r !== void 0 ? r : [],
      report: (s = (i = this.tokenBuilder).flushLexingReport) === null || s === void 0 ? void 0 : s.call(i, e)
    };
  }
  toTokenTypeDictionary(e) {
    if (cl(e))
      return e;
    const t = ac(e) ? Object.values(e.modes).flat() : e, r = {};
    return t.forEach((i) => r[i.name] = i), r;
  }
}
function lg(n) {
  return Array.isArray(n) && (n.length === 0 || "name" in n[0]);
}
function ac(n) {
  return n && "modes" in n && "defaultMode" in n;
}
function cl(n) {
  return !lg(n) && !ac(n);
}
function ug(n, e, t) {
  let r, i;
  typeof n == "string" ? (i = e, r = t) : (i = n.range.start, r = e), i || (i = P.create(0, 0));
  const s = oc(n), a = fa(r), o = fg({
    lines: s,
    position: i,
    options: a
  });
  return yg({
    index: 0,
    tokens: o,
    position: i
  });
}
function cg(n, e) {
  const t = fa(e), r = oc(n);
  if (r.length === 0)
    return !1;
  const i = r[0], s = r[r.length - 1], a = t.start, o = t.end;
  return !!(a != null && a.exec(i)) && !!(o != null && o.exec(s));
}
function oc(n) {
  let e = "";
  return typeof n == "string" ? e = n : e = n.text, e.split(zd);
}
const dl = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy, dg = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function fg(n) {
  var e, t, r;
  const i = [];
  let s = n.position.line, a = n.position.character;
  for (let o = 0; o < n.lines.length; o++) {
    const l = o === 0, u = o === n.lines.length - 1;
    let c = n.lines[o], d = 0;
    if (l && n.options.start) {
      const f = (e = n.options.start) === null || e === void 0 ? void 0 : e.exec(c);
      f && (d = f.index + f[0].length);
    } else {
      const f = (t = n.options.line) === null || t === void 0 ? void 0 : t.exec(c);
      f && (d = f.index + f[0].length);
    }
    if (u) {
      const f = (r = n.options.end) === null || r === void 0 ? void 0 : r.exec(c);
      f && (c = c.substring(0, f.index));
    }
    if (c = c.substring(0, gg(c)), Fs(c, d) >= c.length) {
      if (i.length > 0) {
        const f = P.create(s, a);
        i.push({
          type: "break",
          content: "",
          range: b.create(f, f)
        });
      }
    } else {
      dl.lastIndex = d;
      const f = dl.exec(c);
      if (f) {
        const m = f[0], g = f[1], A = P.create(s, a + d), y = P.create(s, a + d + m.length);
        i.push({
          type: "tag",
          content: g,
          range: b.create(A, y)
        }), d += m.length, d = Fs(c, d);
      }
      if (d < c.length) {
        const m = c.substring(d), g = Array.from(m.matchAll(dg));
        i.push(...hg(g, m, s, a + d));
      }
    }
    s++, a = 0;
  }
  return i.length > 0 && i[i.length - 1].type === "break" ? i.slice(0, -1) : i;
}
function hg(n, e, t, r) {
  const i = [];
  if (n.length === 0) {
    const s = P.create(t, r), a = P.create(t, r + e.length);
    i.push({
      type: "text",
      content: e,
      range: b.create(s, a)
    });
  } else {
    let s = 0;
    for (const o of n) {
      const l = o.index, u = e.substring(s, l);
      u.length > 0 && i.push({
        type: "text",
        content: e.substring(s, l),
        range: b.create(P.create(t, s + r), P.create(t, l + r))
      });
      let c = u.length + 1;
      const d = o[1];
      if (i.push({
        type: "inline-tag",
        content: d,
        range: b.create(P.create(t, s + c + r), P.create(t, s + c + d.length + r))
      }), c += d.length, o.length === 4) {
        c += o[2].length;
        const h = o[3];
        i.push({
          type: "text",
          content: h,
          range: b.create(P.create(t, s + c + r), P.create(t, s + c + h.length + r))
        });
      } else
        i.push({
          type: "text",
          content: "",
          range: b.create(P.create(t, s + c + r), P.create(t, s + c + r))
        });
      s = l + o[0].length;
    }
    const a = e.substring(s);
    a.length > 0 && i.push({
      type: "text",
      content: a,
      range: b.create(P.create(t, s + r), P.create(t, s + r + a.length))
    });
  }
  return i;
}
const pg = /\S/, mg = /\s*$/;
function Fs(n, e) {
  const t = n.substring(e).match(pg);
  return t ? e + t.index : n.length;
}
function gg(n) {
  const e = n.match(mg);
  if (e && typeof e.index == "number")
    return e.index;
}
function yg(n) {
  var e, t, r, i;
  const s = P.create(n.position.line, n.position.character);
  if (n.tokens.length === 0)
    return new fl([], b.create(s, s));
  const a = [];
  for (; n.index < n.tokens.length; ) {
    const u = Tg(n, a[a.length - 1]);
    u && a.push(u);
  }
  const o = (t = (e = a[0]) === null || e === void 0 ? void 0 : e.range.start) !== null && t !== void 0 ? t : s, l = (i = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.range.end) !== null && i !== void 0 ? i : s;
  return new fl(a, b.create(o, l));
}
function Tg(n, e) {
  const t = n.tokens[n.index];
  if (t.type === "tag")
    return uc(n, !1);
  if (t.type === "text" || t.type === "inline-tag")
    return lc(n);
  Rg(t, e), n.index++;
}
function Rg(n, e) {
  if (e) {
    const t = new dc("", n.range);
    "inlines" in e ? e.inlines.push(t) : e.content.inlines.push(t);
  }
}
function lc(n) {
  let e = n.tokens[n.index];
  const t = e;
  let r = e;
  const i = [];
  for (; e && e.type !== "break" && e.type !== "tag"; )
    i.push(vg(n)), r = e, e = n.tokens[n.index];
  return new Gs(i, b.create(t.range.start, r.range.end));
}
function vg(n) {
  return n.tokens[n.index].type === "inline-tag" ? uc(n, !0) : cc(n);
}
function uc(n, e) {
  const t = n.tokens[n.index++], r = t.content.substring(1), i = n.tokens[n.index];
  if ((i == null ? void 0 : i.type) === "text")
    if (e) {
      const s = cc(n);
      return new zi(r, new Gs([s], s.range), e, b.create(t.range.start, s.range.end));
    } else {
      const s = lc(n);
      return new zi(r, s, e, b.create(t.range.start, s.range.end));
    }
  else {
    const s = t.range;
    return new zi(r, new Gs([], s), e, s);
  }
}
function cc(n) {
  const e = n.tokens[n.index++];
  return new dc(e.content, e.range);
}
function fa(n) {
  if (!n)
    return fa({
      start: "/**",
      end: "*/",
      line: "*"
    });
  const { start: e, end: t, line: r } = n;
  return {
    start: ji(e, !0),
    end: ji(t, !1),
    line: ji(r, !0)
  };
}
function ji(n, e) {
  if (typeof n == "string" || typeof n == "object") {
    const t = typeof n == "string" ? Ti(n) : n.source;
    return e ? new RegExp(`^\\s*${t}`) : new RegExp(`\\s*${t}\\s*$`);
  } else
    return n;
}
class fl {
  constructor(e, t) {
    this.elements = e, this.range = t;
  }
  getTag(e) {
    return this.getAllTags().find((t) => t.name === e);
  }
  getTags(e) {
    return this.getAllTags().filter((t) => t.name === e);
  }
  getAllTags() {
    return this.elements.filter((e) => "name" in e);
  }
  toString() {
    let e = "";
    for (const t of this.elements)
      if (e.length === 0)
        e = t.toString();
      else {
        const r = t.toString();
        e += hl(e) + r;
      }
    return e.trim();
  }
  toMarkdown(e) {
    let t = "";
    for (const r of this.elements)
      if (t.length === 0)
        t = r.toMarkdown(e);
      else {
        const i = r.toMarkdown(e);
        t += hl(t) + i;
      }
    return t.trim();
  }
}
class zi {
  constructor(e, t, r, i) {
    this.name = e, this.content = t, this.inline = r, this.range = i;
  }
  toString() {
    let e = `@${this.name}`;
    const t = this.content.toString();
    return this.content.inlines.length === 1 ? e = `${e} ${t}` : this.content.inlines.length > 1 && (e = `${e}
${t}`), this.inline ? `{${e}}` : e;
  }
  toMarkdown(e) {
    var t, r;
    return (r = (t = e == null ? void 0 : e.renderTag) === null || t === void 0 ? void 0 : t.call(e, this)) !== null && r !== void 0 ? r : this.toMarkdownDefault(e);
  }
  toMarkdownDefault(e) {
    const t = this.content.toMarkdown(e);
    if (this.inline) {
      const s = Ag(this.name, t, e ?? {});
      if (typeof s == "string")
        return s;
    }
    let r = "";
    (e == null ? void 0 : e.tag) === "italic" || (e == null ? void 0 : e.tag) === void 0 ? r = "*" : (e == null ? void 0 : e.tag) === "bold" ? r = "**" : (e == null ? void 0 : e.tag) === "bold-italic" && (r = "***");
    let i = `${r}@${this.name}${r}`;
    return this.content.inlines.length === 1 ? i = `${i} — ${t}` : this.content.inlines.length > 1 && (i = `${i}
${t}`), this.inline ? `{${i}}` : i;
  }
}
function Ag(n, e, t) {
  var r, i;
  if (n === "linkplain" || n === "linkcode" || n === "link") {
    const s = e.indexOf(" ");
    let a = e;
    if (s > 0) {
      const l = Fs(e, s);
      a = e.substring(l), e = e.substring(0, s);
    }
    return (n === "linkcode" || n === "link" && t.link === "code") && (a = `\`${a}\``), (i = (r = t.renderLink) === null || r === void 0 ? void 0 : r.call(t, e, a)) !== null && i !== void 0 ? i : Eg(e, a);
  }
}
function Eg(n, e) {
  try {
    return At.parse(n, !0), `[${e}](${n})`;
  } catch {
    return n;
  }
}
class Gs {
  constructor(e, t) {
    this.inlines = e, this.range = t;
  }
  toString() {
    let e = "";
    for (let t = 0; t < this.inlines.length; t++) {
      const r = this.inlines[t], i = this.inlines[t + 1];
      e += r.toString(), i && i.range.start.line > r.range.start.line && (e += `
`);
    }
    return e;
  }
  toMarkdown(e) {
    let t = "";
    for (let r = 0; r < this.inlines.length; r++) {
      const i = this.inlines[r], s = this.inlines[r + 1];
      t += i.toMarkdown(e), s && s.range.start.line > i.range.start.line && (t += `
`);
    }
    return t;
  }
}
class dc {
  constructor(e, t) {
    this.text = e, this.range = t;
  }
  toString() {
    return this.text;
  }
  toMarkdown() {
    return this.text;
  }
}
function hl(n) {
  return n.endsWith(`
`) ? `
` : `

`;
}
class kg {
  constructor(e) {
    this.indexManager = e.shared.workspace.IndexManager, this.commentProvider = e.documentation.CommentProvider;
  }
  getDocumentation(e) {
    const t = this.commentProvider.getComment(e);
    if (t && cg(t))
      return ug(t).toMarkdown({
        renderLink: (i, s) => this.documentationLinkRenderer(e, i, s),
        renderTag: (i) => this.documentationTagRenderer(e, i)
      });
  }
  documentationLinkRenderer(e, t, r) {
    var i;
    const s = (i = this.findNameInPrecomputedScopes(e, t)) !== null && i !== void 0 ? i : this.findNameInGlobalScope(e, t);
    if (s && s.nameSegment) {
      const a = s.nameSegment.range.start.line + 1, o = s.nameSegment.range.start.character + 1, l = s.documentUri.with({ fragment: `L${a},${o}` });
      return `[${r}](${l.toString()})`;
    } else
      return;
  }
  documentationTagRenderer(e, t) {
  }
  findNameInPrecomputedScopes(e, t) {
    const i = et(e).precomputedScopes;
    if (!i)
      return;
    let s = e;
    do {
      const o = i.get(s).find((l) => l.name === t);
      if (o)
        return o;
      s = s.$container;
    } while (s);
  }
  findNameInGlobalScope(e, t) {
    return this.indexManager.allElements().find((i) => i.name === t);
  }
}
class $g {
  constructor(e) {
    this.grammarConfig = () => e.parser.GrammarConfig;
  }
  getComment(e) {
    var t;
    return Wm(e) ? e.$comment : (t = kd(e.$cstNode, this.grammarConfig().multilineCommentRules)) === null || t === void 0 ? void 0 : t.text;
  }
}
class xg {
  constructor(e) {
    this.syncParser = e.parser.LangiumParser;
  }
  parse(e, t) {
    return Promise.resolve(this.syncParser.parse(e));
  }
}
class Sg {
  constructor() {
    this.previousTokenSource = new V.CancellationTokenSource(), this.writeQueue = [], this.readQueue = [], this.done = !0;
  }
  write(e) {
    this.cancelWrite();
    const t = wm();
    return this.previousTokenSource = t, this.enqueue(this.writeQueue, e, t.token);
  }
  read(e) {
    return this.enqueue(this.readQueue, e);
  }
  enqueue(e, t, r = V.CancellationToken.None) {
    const i = new da(), s = {
      action: t,
      deferred: i,
      cancellationToken: r
    };
    return e.push(s), this.performNextOperation(), i.promise;
  }
  async performNextOperation() {
    if (!this.done)
      return;
    const e = [];
    if (this.writeQueue.length > 0)
      e.push(this.writeQueue.shift());
    else if (this.readQueue.length > 0)
      e.push(...this.readQueue.splice(0, this.readQueue.length));
    else
      return;
    this.done = !1, await Promise.all(e.map(async ({ action: t, deferred: r, cancellationToken: i }) => {
      try {
        const s = await Promise.resolve().then(() => t(i));
        r.resolve(s);
      } catch (s) {
        Si(s) ? r.resolve(void 0) : r.reject(s);
      }
    })), this.done = !0, this.performNextOperation();
  }
  cancelWrite() {
    this.previousTokenSource.cancel();
  }
}
class Ig {
  constructor(e) {
    this.grammarElementIdMap = new ol(), this.tokenTypeIdMap = new ol(), this.grammar = e.Grammar, this.lexer = e.parser.Lexer, this.linker = e.references.Linker;
  }
  dehydrate(e) {
    return {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport ? this.dehydrateLexerReport(e.lexerReport) : void 0,
      // We need to create shallow copies of the errors
      // The original errors inherit from the `Error` class, which is not transferable across worker threads
      parserErrors: e.parserErrors.map((t) => Object.assign(Object.assign({}, t), { message: t.message })),
      value: this.dehydrateAstNode(e.value, this.createDehyrationContext(e.value))
    };
  }
  dehydrateLexerReport(e) {
    return e;
  }
  createDehyrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const i of _t(e))
      t.set(i, {});
    if (e.$cstNode)
      for (const i of ss(e.$cstNode))
        r.set(i, {});
    return {
      astNodes: t,
      cstNodes: r
    };
  }
  dehydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode !== void 0 && (r.$cstNode = this.dehydrateCstNode(e.$cstNode, t));
    for (const [i, s] of Object.entries(e))
      if (!i.startsWith("$"))
        if (Array.isArray(s)) {
          const a = [];
          r[i] = a;
          for (const o of s)
            ae(o) ? a.push(this.dehydrateAstNode(o, t)) : Ue(o) ? a.push(this.dehydrateReference(o, t)) : a.push(o);
        } else ae(s) ? r[i] = this.dehydrateAstNode(s, t) : Ue(s) ? r[i] = this.dehydrateReference(s, t) : s !== void 0 && (r[i] = s);
    return r;
  }
  dehydrateReference(e, t) {
    const r = {};
    return r.$refText = e.$refText, e.$refNode && (r.$refNode = t.cstNodes.get(e.$refNode)), r;
  }
  dehydrateCstNode(e, t) {
    const r = t.cstNodes.get(e);
    return Pl(e) ? r.fullText = e.fullText : r.grammarSource = this.getGrammarElementId(e.grammarSource), r.hidden = e.hidden, r.astNode = t.astNodes.get(e.astNode), Xn(e) ? r.content = e.content.map((i) => this.dehydrateCstNode(i, t)) : bl(e) && (r.tokenType = e.tokenType.name, r.offset = e.offset, r.length = e.length, r.startLine = e.range.start.line, r.startColumn = e.range.start.character, r.endLine = e.range.end.line, r.endColumn = e.range.end.character), r;
  }
  hydrate(e) {
    const t = e.value, r = this.createHydrationContext(t);
    return "$cstNode" in t && this.hydrateCstNode(t.$cstNode, r), {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport,
      parserErrors: e.parserErrors,
      value: this.hydrateAstNode(t, r)
    };
  }
  createHydrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const s of _t(e))
      t.set(s, {});
    let i;
    if (e.$cstNode)
      for (const s of ss(e.$cstNode)) {
        let a;
        "fullText" in s ? (a = new Wu(s.fullText), i = a) : "content" in s ? a = new ua() : "tokenType" in s && (a = this.hydrateCstLeafNode(s)), a && (r.set(s, a), a.root = i);
      }
    return {
      astNodes: t,
      cstNodes: r
    };
  }
  hydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode && (r.$cstNode = t.cstNodes.get(e.$cstNode));
    for (const [i, s] of Object.entries(e))
      if (!i.startsWith("$"))
        if (Array.isArray(s)) {
          const a = [];
          r[i] = a;
          for (const o of s)
            ae(o) ? a.push(this.setParent(this.hydrateAstNode(o, t), r)) : Ue(o) ? a.push(this.hydrateReference(o, r, i, t)) : a.push(o);
        } else ae(s) ? r[i] = this.setParent(this.hydrateAstNode(s, t), r) : Ue(s) ? r[i] = this.hydrateReference(s, r, i, t) : s !== void 0 && (r[i] = s);
    return r;
  }
  setParent(e, t) {
    return e.$container = t, e;
  }
  hydrateReference(e, t, r, i) {
    return this.linker.buildReference(t, r, i.cstNodes.get(e.$refNode), e.$refText);
  }
  hydrateCstNode(e, t, r = 0) {
    const i = t.cstNodes.get(e);
    if (typeof e.grammarSource == "number" && (i.grammarSource = this.getGrammarElement(e.grammarSource)), i.astNode = t.astNodes.get(e.astNode), Xn(i))
      for (const s of e.content) {
        const a = this.hydrateCstNode(s, t, r++);
        i.content.push(a);
      }
    return i;
  }
  hydrateCstLeafNode(e) {
    const t = this.getTokenType(e.tokenType), r = e.offset, i = e.length, s = e.startLine, a = e.startColumn, o = e.endLine, l = e.endColumn, u = e.hidden;
    return new Os(r, i, {
      start: {
        line: s,
        character: a
      },
      end: {
        line: o,
        character: l
      }
    }, t, u);
  }
  getTokenType(e) {
    return this.lexer.definition[e];
  }
  getGrammarElementId(e) {
    if (e)
      return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.get(e);
  }
  getGrammarElement(e) {
    return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.getKey(e);
  }
  createGrammarElementIdMap() {
    let e = 0;
    for (const t of _t(this.grammar))
      xd(t) && this.grammarElementIdMap.set(t, e++);
  }
}
function ot(n) {
  return {
    documentation: {
      CommentProvider: (e) => new $g(e),
      DocumentationProvider: (e) => new kg(e)
    },
    parser: {
      AsyncParser: (e) => new xg(e),
      GrammarConfig: (e) => yf(e),
      LangiumParser: (e) => $m(e),
      CompletionParser: (e) => km(e),
      ValueConverter: () => new Zu(),
      TokenBuilder: () => new Qu(),
      Lexer: (e) => new og(e),
      ParserErrorMessageProvider: () => new zu(),
      LexerErrorMessageProvider: () => new sg()
    },
    workspace: {
      AstNodeLocator: () => new Zm(),
      AstNodeDescriptionProvider: (e) => new Jm(e),
      ReferenceDescriptionProvider: (e) => new Qm(e)
    },
    references: {
      Linker: (e) => new bm(e),
      NameProvider: () => new Mm(),
      ScopeProvider: (e) => new Km(e),
      ScopeComputation: (e) => new Fm(e),
      References: (e) => new Dm(e)
    },
    serializer: {
      Hydrator: (e) => new Ig(e),
      JsonSerializer: (e) => new Hm(e)
    },
    validation: {
      DocumentValidator: (e) => new qm(e),
      ValidationRegistry: (e) => new zm(e)
    },
    shared: () => n.shared
  };
}
function lt(n) {
  return {
    ServiceRegistry: (e) => new jm(e),
    workspace: {
      LangiumDocuments: (e) => new Om(e),
      LangiumDocumentFactory: (e) => new Lm(e),
      DocumentBuilder: (e) => new ng(e),
      IndexManager: (e) => new rg(e),
      WorkspaceManager: (e) => new ig(e),
      FileSystemProvider: (e) => n.fileSystemProvider(e),
      WorkspaceLock: () => new Sg(),
      ConfigurationProvider: (e) => new tg(e)
    }
  };
}
var pl;
(function(n) {
  n.merge = (e, t) => fi(fi({}, e), t);
})(pl || (pl = {}));
function oe(n, e, t, r, i, s, a, o, l) {
  const u = [n, e, t, r, i, s, a, o, l].reduce(fi, {});
  return fc(u);
}
const Cg = Symbol("isProxy");
function fc(n, e) {
  const t = new Proxy({}, {
    deleteProperty: () => !1,
    set: () => {
      throw new Error("Cannot set property on injected service container");
    },
    get: (r, i) => i === Cg ? !0 : gl(r, i, n, e || t),
    getOwnPropertyDescriptor: (r, i) => (gl(r, i, n, e || t), Object.getOwnPropertyDescriptor(r, i)),
    // used by for..in
    has: (r, i) => i in n,
    // used by ..in..
    ownKeys: () => [...Object.getOwnPropertyNames(n)]
    // used by for..in
  });
  return t;
}
const ml = Symbol();
function gl(n, e, t, r) {
  if (e in n) {
    if (n[e] instanceof Error)
      throw new Error("Construction failure. Please make sure that your dependencies are constructable.", { cause: n[e] });
    if (n[e] === ml)
      throw new Error('Cycle detected. Please make "' + String(e) + '" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');
    return n[e];
  } else if (e in t) {
    const i = t[e];
    n[e] = ml;
    try {
      n[e] = typeof i == "function" ? i(r) : fc(i, r);
    } catch (s) {
      throw n[e] = s instanceof Error ? s : void 0, s;
    }
    return n[e];
  } else
    return;
}
function fi(n, e) {
  if (e) {
    for (const [t, r] of Object.entries(e))
      if (r !== void 0) {
        const i = n[t];
        i !== null && r !== null && typeof i == "object" && typeof r == "object" ? n[t] = fi(i, r) : n[t] = r;
      }
  }
  return n;
}
class Ng {
  readFile() {
    throw new Error("No file system is available.");
  }
  async readDirectory() {
    return [];
  }
}
const ut = {
  fileSystemProvider: () => new Ng()
}, wg = {
  Grammar: () => {
  },
  LanguageMetaData: () => ({
    caseInsensitive: !1,
    fileExtensions: [".langium"],
    languageId: "langium"
  })
}, _g = {
  AstReflection: () => new Vl()
};
function Lg() {
  const n = oe(lt(ut), _g), e = oe(ot({ shared: n }), wg);
  return n.ServiceRegistry.register(e), e;
}
function xt(n) {
  var e;
  const t = Lg(), r = t.serializer.JsonSerializer.deserialize(n);
  return t.shared.workspace.LangiumDocumentFactory.fromModel(r, At.parse(`memory://${(e = r.name) !== null && e !== void 0 ? e : "grammar"}.langium`)), r;
}
var Og = Object.defineProperty, v = (n, e) => Og(n, "name", { value: e, configurable: !0 }), yl = "Statement", Dr = "Architecture";
function bg(n) {
  return De.isInstance(n, Dr);
}
v(bg, "isArchitecture");
var Er = "Axis", Wn = "Branch";
function Pg(n) {
  return De.isInstance(n, Wn);
}
v(Pg, "isBranch");
var kr = "Checkout", $r = "CherryPicking", qi = "ClassDefStatement", Hn = "Commit";
function Mg(n) {
  return De.isInstance(n, Hn);
}
v(Mg, "isCommit");
var Yi = "Curve", Xi = "Edge", Ji = "Entry", jn = "GitGraph";
function Dg(n) {
  return De.isInstance(n, jn);
}
v(Dg, "isGitGraph");
var Qi = "Group", Fr = "Info";
function Fg(n) {
  return De.isInstance(n, Fr);
}
v(Fg, "isInfo");
var xr = "Item", Zi = "Junction", zn = "Merge";
function Gg(n) {
  return De.isInstance(n, zn);
}
v(Gg, "isMerge");
var es = "Option", Gr = "Packet";
function Ug(n) {
  return De.isInstance(n, Gr);
}
v(Ug, "isPacket");
var Ur = "PacketBlock";
function Bg(n) {
  return De.isInstance(n, Ur);
}
v(Bg, "isPacketBlock");
var Br = "Pie";
function Vg(n) {
  return De.isInstance(n, Br);
}
v(Vg, "isPie");
var Vr = "PieSection";
function Kg(n) {
  return De.isInstance(n, Vr);
}
v(Kg, "isPieSection");
var ts = "Radar", ns = "Service", Kr = "Treemap";
function Wg(n) {
  return De.isInstance(n, Kr);
}
v(Wg, "isTreemap");
var rs = "TreemapRow", Sr = "Direction", Ir = "Leaf", Cr = "Section", Ot, hc = (Ot = class extends Ol {
  getAllTypes() {
    return [Dr, Er, Wn, kr, $r, qi, Hn, Yi, Sr, Xi, Ji, jn, Qi, Fr, xr, Zi, Ir, zn, es, Gr, Ur, Br, Vr, ts, Cr, ns, yl, Kr, rs];
  }
  computeIsSubtype(e, t) {
    switch (e) {
      case Wn:
      case kr:
      case $r:
      case Hn:
      case zn:
        return this.isSubtype(yl, t);
      case Sr:
        return this.isSubtype(jn, t);
      case Ir:
      case Cr:
        return this.isSubtype(xr, t);
      default:
        return !1;
    }
  }
  getReferenceType(e) {
    const t = `${e.container.$type}:${e.property}`;
    switch (t) {
      case "Entry:axis":
        return Er;
      default:
        throw new Error(`${t} is not a valid reference id.`);
    }
  }
  getTypeMetaData(e) {
    switch (e) {
      case Dr:
        return {
          name: Dr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "edges", defaultValue: [] },
            { name: "groups", defaultValue: [] },
            { name: "junctions", defaultValue: [] },
            { name: "services", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Er:
        return {
          name: Er,
          properties: [
            { name: "label" },
            { name: "name" }
          ]
        };
      case Wn:
        return {
          name: Wn,
          properties: [
            { name: "name" },
            { name: "order" }
          ]
        };
      case kr:
        return {
          name: kr,
          properties: [
            { name: "branch" }
          ]
        };
      case $r:
        return {
          name: $r,
          properties: [
            { name: "id" },
            { name: "parent" },
            { name: "tags", defaultValue: [] }
          ]
        };
      case qi:
        return {
          name: qi,
          properties: [
            { name: "className" },
            { name: "styleText" }
          ]
        };
      case Hn:
        return {
          name: Hn,
          properties: [
            { name: "id" },
            { name: "message" },
            { name: "tags", defaultValue: [] },
            { name: "type" }
          ]
        };
      case Yi:
        return {
          name: Yi,
          properties: [
            { name: "entries", defaultValue: [] },
            { name: "label" },
            { name: "name" }
          ]
        };
      case Xi:
        return {
          name: Xi,
          properties: [
            { name: "lhsDir" },
            { name: "lhsGroup", defaultValue: !1 },
            { name: "lhsId" },
            { name: "lhsInto", defaultValue: !1 },
            { name: "rhsDir" },
            { name: "rhsGroup", defaultValue: !1 },
            { name: "rhsId" },
            { name: "rhsInto", defaultValue: !1 },
            { name: "title" }
          ]
        };
      case Ji:
        return {
          name: Ji,
          properties: [
            { name: "axis" },
            { name: "value" }
          ]
        };
      case jn:
        return {
          name: jn,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "statements", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Qi:
        return {
          name: Qi,
          properties: [
            { name: "icon" },
            { name: "id" },
            { name: "in" },
            { name: "title" }
          ]
        };
      case Fr:
        return {
          name: Fr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "title" }
          ]
        };
      case xr:
        return {
          name: xr,
          properties: [
            { name: "classSelector" },
            { name: "name" }
          ]
        };
      case Zi:
        return {
          name: Zi,
          properties: [
            { name: "id" },
            { name: "in" }
          ]
        };
      case zn:
        return {
          name: zn,
          properties: [
            { name: "branch" },
            { name: "id" },
            { name: "tags", defaultValue: [] },
            { name: "type" }
          ]
        };
      case es:
        return {
          name: es,
          properties: [
            { name: "name" },
            { name: "value", defaultValue: !1 }
          ]
        };
      case Gr:
        return {
          name: Gr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "blocks", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Ur:
        return {
          name: Ur,
          properties: [
            { name: "bits" },
            { name: "end" },
            { name: "label" },
            { name: "start" }
          ]
        };
      case Br:
        return {
          name: Br,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "sections", defaultValue: [] },
            { name: "showData", defaultValue: !1 },
            { name: "title" }
          ]
        };
      case Vr:
        return {
          name: Vr,
          properties: [
            { name: "label" },
            { name: "value" }
          ]
        };
      case ts:
        return {
          name: ts,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "axes", defaultValue: [] },
            { name: "curves", defaultValue: [] },
            { name: "options", defaultValue: [] },
            { name: "title" }
          ]
        };
      case ns:
        return {
          name: ns,
          properties: [
            { name: "icon" },
            { name: "iconText" },
            { name: "id" },
            { name: "in" },
            { name: "title" }
          ]
        };
      case Kr:
        return {
          name: Kr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "title" },
            { name: "TreemapRows", defaultValue: [] }
          ]
        };
      case rs:
        return {
          name: rs,
          properties: [
            { name: "indent" },
            { name: "item" }
          ]
        };
      case Sr:
        return {
          name: Sr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "dir" },
            { name: "statements", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Ir:
        return {
          name: Ir,
          properties: [
            { name: "classSelector" },
            { name: "name" },
            { name: "value" }
          ]
        };
      case Cr:
        return {
          name: Cr,
          properties: [
            { name: "classSelector" },
            { name: "name" }
          ]
        };
      default:
        return {
          name: e,
          properties: []
        };
    }
  }
}, v(Ot, "MermaidAstReflection"), Ot), De = new hc(), Tl, Hg = /* @__PURE__ */ v(() => Tl ?? (Tl = xt(`{"$type":"Grammar","isDeclared":true,"name":"Info","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Info","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"info"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"showInfo"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@7"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "InfoGrammar"), Rl, jg = /* @__PURE__ */ v(() => Rl ?? (Rl = xt(`{"$type":"Grammar","isDeclared":true,"name":"Packet","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Packet","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"packet"},{"$type":"Keyword","value":"packet-beta"}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"blocks","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PacketBlock","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"start","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"end","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}],"cardinality":"?"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"+"},{"$type":"Assignment","feature":"bits","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PacketGrammar"), vl, zg = /* @__PURE__ */ v(() => vl ?? (vl = xt(`{"$type":"Grammar","isDeclared":true,"name":"Pie","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Pie","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"pie"},{"$type":"Assignment","feature":"showData","operator":"?=","terminal":{"$type":"Keyword","value":"showData"},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"sections","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PieSection","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PieGrammar"), Al, qg = /* @__PURE__ */ v(() => Al ?? (Al = xt(`{"$type":"Grammar","isDeclared":true,"name":"Architecture","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Architecture","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"architecture-beta"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"groups","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"services","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"junctions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Assignment","feature":"edges","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"LeftPort","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"lhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"RightPort","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Keyword","value":":"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Arrow","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Assignment","feature":"lhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"--"},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":"-"}]}]},{"$type":"Assignment","feature":"rhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"group"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Service","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"service"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"iconText","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Junction","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"junction"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Edge","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"lhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"lhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Assignment","feature":"rhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"rhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ARROW_DIRECTION","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"L"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"R"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"T"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"B"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_GROUP","definition":{"$type":"RegexToken","regex":"/\\\\{group\\\\}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_INTO","definition":{"$type":"RegexToken","regex":"/<|>/"},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@18"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@19"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"ARCH_ICON","definition":{"$type":"RegexToken","regex":"/\\\\([\\\\w-:]+\\\\)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARCH_TITLE","definition":{"$type":"RegexToken","regex":"/\\\\[[\\\\w ]+\\\\]/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "ArchitectureGrammar"), El, Yg = /* @__PURE__ */ v(() => El ?? (El = xt(`{"$type":"Grammar","isDeclared":true,"name":"GitGraph","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"GitGraph","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Keyword","value":":"}]},{"$type":"Keyword","value":"gitGraph:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Keyword","value":":"}]}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"Assignment","feature":"statements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Direction","definition":{"$type":"Assignment","feature":"dir","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"LR"},{"$type":"Keyword","value":"TB"},{"$type":"Keyword","value":"BT"}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Commit","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"commit"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"msg:","cardinality":"?"},{"$type":"Assignment","feature":"message","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Branch","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"branch"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"order:"},{"$type":"Assignment","feature":"order","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Merge","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"merge"},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Checkout","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"checkout"},{"$type":"Keyword","value":"switch"}]},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CherryPicking","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"cherry-pick"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"parent:"},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@14"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"REFERENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "GitGraphGrammar"), kl, Xg = /* @__PURE__ */ v(() => kl ?? (kl = xt(`{"$type":"Grammar","isDeclared":true,"name":"Radar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Radar","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":"radar-beta:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":":"}]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"axis"},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"curve"},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Label","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Axis","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Curve","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Entries","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"DetailedEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"axis","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@2"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Keyword","value":":","cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NumberEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Option","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"showLegend"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"ticks"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"max"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"min"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"graticule"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"GRATICULE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"circle"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"polygon"}}]},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@16"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"interfaces":[{"$type":"Interface","name":"Entry","attributes":[{"$type":"TypeAttribute","name":"axis","isOptional":true,"type":{"$type":"ReferenceType","referenceType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@2"}}}},{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"types":[],"usedGrammars":[]}`)), "RadarGrammar"), $l, Jg = /* @__PURE__ */ v(() => $l ?? ($l = xt(`{"$type":"Grammar","isDeclared":true,"name":"Treemap","rules":[{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"Treemap","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]},{"$type":"Assignment","feature":"TreemapRows","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"TREEMAP_KEYWORD","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap-beta"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"CLASS_DEF","definition":{"$type":"RegexToken","regex":"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STYLE_SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":::"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"COMMA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":","}},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false},{"$type":"ParserRule","name":"TreemapRow","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"item","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ClassDef","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Item","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Section","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Leaf","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID2","definition":{"$type":"RegexToken","regex":"/[a-zA-Z_][a-zA-Z0-9_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER2","definition":{"$type":"RegexToken","regex":"/[0-9_\\\\.\\\\,]+/"},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"MyNumber","dataType":"number","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/"},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"Item","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"classSelector","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"Section","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[]},{"$type":"Interface","name":"Leaf","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}]},{"$type":"Interface","name":"ClassDefStatement","attributes":[{"$type":"TypeAttribute","name":"className","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"styleText","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"Treemap","attributes":[{"$type":"TypeAttribute","name":"TreemapRows","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@14"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"types":[],"usedGrammars":[],"$comment":"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */"}`)), "TreemapGrammar"), Qg = {
  languageId: "info",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Zg = {
  languageId: "packet",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, ey = {
  languageId: "pie",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, ty = {
  languageId: "architecture",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, ny = {
  languageId: "gitGraph",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, ry = {
  languageId: "radar",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, iy = {
  languageId: "treemap",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, St = {
  AstReflection: /* @__PURE__ */ v(() => new hc(), "AstReflection")
}, sy = {
  Grammar: /* @__PURE__ */ v(() => Hg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => Qg, "LanguageMetaData"),
  parser: {}
}, ay = {
  Grammar: /* @__PURE__ */ v(() => jg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => Zg, "LanguageMetaData"),
  parser: {}
}, oy = {
  Grammar: /* @__PURE__ */ v(() => zg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ey, "LanguageMetaData"),
  parser: {}
}, ly = {
  Grammar: /* @__PURE__ */ v(() => qg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ty, "LanguageMetaData"),
  parser: {}
}, uy = {
  Grammar: /* @__PURE__ */ v(() => Yg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ny, "LanguageMetaData"),
  parser: {}
}, cy = {
  Grammar: /* @__PURE__ */ v(() => Xg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ry, "LanguageMetaData"),
  parser: {}
}, dy = {
  Grammar: /* @__PURE__ */ v(() => Jg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => iy, "LanguageMetaData"),
  parser: {}
}, fy = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/, hy = /accTitle[\t ]*:([^\n\r]*)/, py = /title([\t ][^\n\r]*|)/, my = {
  ACC_DESCR: fy,
  ACC_TITLE: hy,
  TITLE: py
}, bt, Ii = (bt = class extends Zu {
  runConverter(e, t, r) {
    let i = this.runCommonConverter(e, t, r);
    return i === void 0 && (i = this.runCustomConverter(e, t, r)), i === void 0 ? super.runConverter(e, t, r) : i;
  }
  runCommonConverter(e, t, r) {
    const i = my[e.name];
    if (i === void 0)
      return;
    const s = i.exec(t);
    if (s !== null) {
      if (s[1] !== void 0)
        return s[1].trim().replace(/[\t ]{2,}/gm, " ");
      if (s[2] !== void 0)
        return s[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, `
`);
    }
  }
}, v(bt, "AbstractMermaidValueConverter"), bt), Pt, Ci = (Pt = class extends Ii {
  runCustomConverter(e, t, r) {
  }
}, v(Pt, "CommonValueConverter"), Pt), Mt, ct = (Mt = class extends Qu {
  constructor(e) {
    super(), this.keywords = new Set(e);
  }
  buildKeywordTokens(e, t, r) {
    const i = super.buildKeywordTokens(e, t, r);
    return i.forEach((s) => {
      this.keywords.has(s.name) && s.PATTERN !== void 0 && (s.PATTERN = new RegExp(s.PATTERN.toString() + "(?:(?=%%)|(?!\\S))"));
    }), i;
  }
}, v(Mt, "AbstractMermaidTokenBuilder"), Mt), Dt;
Dt = class extends ct {
}, v(Dt, "CommonTokenBuilder");
var Ft, gy = (Ft = class extends ct {
  constructor() {
    super(["gitGraph"]);
  }
}, v(Ft, "GitGraphTokenBuilder"), Ft), pc = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new gy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Ci(), "ValueConverter")
  }
};
function mc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    uy,
    pc
  );
  return e.ServiceRegistry.register(t), { shared: e, GitGraph: t };
}
v(mc, "createGitGraphServices");
var Gt, yy = (Gt = class extends ct {
  constructor() {
    super(["info", "showInfo"]);
  }
}, v(Gt, "InfoTokenBuilder"), Gt), gc = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new yy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Ci(), "ValueConverter")
  }
};
function yc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    sy,
    gc
  );
  return e.ServiceRegistry.register(t), { shared: e, Info: t };
}
v(yc, "createInfoServices");
var Ut, Ty = (Ut = class extends ct {
  constructor() {
    super(["packet"]);
  }
}, v(Ut, "PacketTokenBuilder"), Ut), Tc = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Ty(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Ci(), "ValueConverter")
  }
};
function Rc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    ay,
    Tc
  );
  return e.ServiceRegistry.register(t), { shared: e, Packet: t };
}
v(Rc, "createPacketServices");
var Bt, Ry = (Bt = class extends ct {
  constructor() {
    super(["pie", "showData"]);
  }
}, v(Bt, "PieTokenBuilder"), Bt), Vt, vy = (Vt = class extends Ii {
  runCustomConverter(e, t, r) {
    if (e.name === "PIE_SECTION_LABEL")
      return t.replace(/"/g, "").trim();
  }
}, v(Vt, "PieValueConverter"), Vt), vc = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Ry(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new vy(), "ValueConverter")
  }
};
function Ac(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    oy,
    vc
  );
  return e.ServiceRegistry.register(t), { shared: e, Pie: t };
}
v(Ac, "createPieServices");
var Kt, Ay = (Kt = class extends ct {
  constructor() {
    super(["architecture"]);
  }
}, v(Kt, "ArchitectureTokenBuilder"), Kt), Wt, Ey = (Wt = class extends Ii {
  runCustomConverter(e, t, r) {
    if (e.name === "ARCH_ICON")
      return t.replace(/[()]/g, "").trim();
    if (e.name === "ARCH_TEXT_ICON")
      return t.replace(/["()]/g, "");
    if (e.name === "ARCH_TITLE")
      return t.replace(/[[\]]/g, "").trim();
  }
}, v(Wt, "ArchitectureValueConverter"), Wt), Ec = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Ay(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Ey(), "ValueConverter")
  }
};
function kc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    ly,
    Ec
  );
  return e.ServiceRegistry.register(t), { shared: e, Architecture: t };
}
v(kc, "createArchitectureServices");
var Ht, ky = (Ht = class extends ct {
  constructor() {
    super(["radar-beta"]);
  }
}, v(Ht, "RadarTokenBuilder"), Ht), $c = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new ky(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Ci(), "ValueConverter")
  }
};
function xc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    cy,
    $c
  );
  return e.ServiceRegistry.register(t), { shared: e, Radar: t };
}
v(xc, "createRadarServices");
var jt, $y = (jt = class extends ct {
  constructor() {
    super(["treemap"]);
  }
}, v(jt, "TreemapTokenBuilder"), jt), xy = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/, zt, Sy = (zt = class extends Ii {
  runCustomConverter(e, t, r) {
    if (e.name === "NUMBER2")
      return parseFloat(t.replace(/,/g, ""));
    if (e.name === "SEPARATOR")
      return t.substring(1, t.length - 1);
    if (e.name === "STRING2")
      return t.substring(1, t.length - 1);
    if (e.name === "INDENTATION")
      return t.length;
    if (e.name === "ClassDef") {
      if (typeof t != "string")
        return t;
      const i = xy.exec(t);
      if (i)
        return {
          $type: "ClassDefStatement",
          className: i[1],
          styleText: i[2] || void 0
        };
    }
  }
}, v(zt, "TreemapValueConverter"), zt);
function Sc(n) {
  const e = n.validation.TreemapValidator, t = n.validation.ValidationRegistry;
  if (t) {
    const r = {
      Treemap: e.checkSingleRoot.bind(e)
      // Remove unused validation for TreemapRow
    };
    t.register(r, e);
  }
}
v(Sc, "registerValidationChecks");
var qt, Iy = (qt = class {
  /**
   * Validates that a treemap has only one root node.
   * A root node is defined as a node that has no indentation.
   */
  checkSingleRoot(e, t) {
    let r;
    for (const i of e.TreemapRows)
      i.item && (r === void 0 && // Check if this is a root node (no indentation)
      i.indent === void 0 ? r = 0 : i.indent === void 0 ? t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: i,
        property: "item"
      }) : r !== void 0 && r >= parseInt(i.indent, 10) && t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: i,
        property: "item"
      }));
  }
}, v(qt, "TreemapValidator"), qt), Ic = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new $y(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Sy(), "ValueConverter")
  },
  validation: {
    TreemapValidator: /* @__PURE__ */ v(() => new Iy(), "TreemapValidator")
  }
};
function Cc(n = ut) {
  const e = oe(
    lt(n),
    St
  ), t = oe(
    ot({ shared: e }),
    dy,
    Ic
  );
  return e.ServiceRegistry.register(t), Sc(t), { shared: e, Treemap: t };
}
v(Cc, "createTreemapServices");
var He = {}, Cy = {
  info: /* @__PURE__ */ v(async () => {
    const { createInfoServices: n } = await Promise.resolve().then(function() {
      return _y;
    }), e = n().Info.parser.LangiumParser;
    He.info = e;
  }, "info"),
  packet: /* @__PURE__ */ v(async () => {
    const { createPacketServices: n } = await Promise.resolve().then(function() {
      return Ly;
    }), e = n().Packet.parser.LangiumParser;
    He.packet = e;
  }, "packet"),
  pie: /* @__PURE__ */ v(async () => {
    const { createPieServices: n } = await Promise.resolve().then(function() {
      return Oy;
    }), e = n().Pie.parser.LangiumParser;
    He.pie = e;
  }, "pie"),
  architecture: /* @__PURE__ */ v(async () => {
    const { createArchitectureServices: n } = await Promise.resolve().then(function() {
      return by;
    }), e = n().Architecture.parser.LangiumParser;
    He.architecture = e;
  }, "architecture"),
  gitGraph: /* @__PURE__ */ v(async () => {
    const { createGitGraphServices: n } = await Promise.resolve().then(function() {
      return Py;
    }), e = n().GitGraph.parser.LangiumParser;
    He.gitGraph = e;
  }, "gitGraph"),
  radar: /* @__PURE__ */ v(async () => {
    const { createRadarServices: n } = await Promise.resolve().then(function() {
      return My;
    }), e = n().Radar.parser.LangiumParser;
    He.radar = e;
  }, "radar"),
  treemap: /* @__PURE__ */ v(async () => {
    const { createTreemapServices: n } = await Promise.resolve().then(function() {
      return Dy;
    }), e = n().Treemap.parser.LangiumParser;
    He.treemap = e;
  }, "treemap")
};
async function Ny(n, e) {
  const t = Cy[n];
  if (!t)
    throw new Error(`Unknown diagram type: ${n}`);
  He[n] || await t();
  const i = He[n].parse(e);
  if (i.lexerErrors.length > 0 || i.parserErrors.length > 0)
    throw new wy(i);
  return i.value;
}
v(Ny, "parse");
var Yt, wy = (Yt = class extends Error {
  constructor(e) {
    const t = e.lexerErrors.map((i) => i.message).join(`
`), r = e.parserErrors.map((i) => i.message).join(`
`);
    super(`Parsing failed: ${t} ${r}`), this.result = e;
  }
}, v(Yt, "MermaidParseError"), Yt), _y = /* @__PURE__ */ Object.freeze({ __proto__: null, InfoModule: gc, createInfoServices: yc }), Ly = /* @__PURE__ */ Object.freeze({ __proto__: null, PacketModule: Tc, createPacketServices: Rc }), Oy = /* @__PURE__ */ Object.freeze({ __proto__: null, PieModule: vc, createPieServices: Ac }), by = /* @__PURE__ */ Object.freeze({ __proto__: null, ArchitectureModule: Ec, createArchitectureServices: kc }), Py = /* @__PURE__ */ Object.freeze({ __proto__: null, GitGraphModule: pc, createGitGraphServices: mc }), My = /* @__PURE__ */ Object.freeze({ __proto__: null, RadarModule: $c, createRadarServices: xc }), Dy = /* @__PURE__ */ Object.freeze({ __proto__: null, TreemapModule: Ic, createTreemapServices: Cc });
export {
  Ny as p
};
