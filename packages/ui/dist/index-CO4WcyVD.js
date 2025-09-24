var qt = Object.defineProperty;
var zt = (r, e, t) => e in r ? qt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var g = (r, e, t) => zt(r, typeof e != "symbol" ? e + "" : e, t);
import { w as je, s as gt, h as Vt, j as Kt, k as Yt, l as Je, z as Jt, m as Qt, n as Xt, o as Zt, p as en } from "./index-CFDAYDAs.js";
import { q as ii, r as oi, t as ai, u as ci } from "./index-CFDAYDAs.js";
let R = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
function tn(r) {
  return Ue(r);
}
function Ue(r) {
  return Array.isArray(r) ? nn(r) : r instanceof RegExp ? r : typeof r == "object" ? rn(r) : r;
}
function nn(r) {
  let e = [];
  for (let t = 0, n = r.length; t < n; t++)
    e[t] = Ue(r[t]);
  return e;
}
function rn(r) {
  let e = {};
  for (let t in r)
    e[t] = Ue(r[t]);
  return e;
}
function pt(r, ...e) {
  return e.forEach((t) => {
    for (let n in t)
      r[n] = t[n];
  }), r;
}
function mt(r) {
  const e = ~r.lastIndexOf("/") || ~r.lastIndexOf("\\");
  return e === 0 ? r : ~e === r.length - 1 ? mt(r.substring(0, r.length - 1)) : r.substr(~e + 1);
}
var Ae = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, te = class {
  static hasCaptures(r) {
    return r === null ? !1 : (Ae.lastIndex = 0, Ae.test(r));
  }
  static replaceCaptures(r, e, t) {
    return r.replace(Ae, (n, s, i, o) => {
      let c = t[parseInt(s || i, 10)];
      if (c) {
        let a = e.substring(c.start, c.end);
        for (; a[0] === "."; )
          a = a.substring(1);
        switch (o) {
          case "downcase":
            return a.toLowerCase();
          case "upcase":
            return a.toUpperCase();
          default:
            return a;
        }
      } else
        return n;
    });
  }
};
function _t(r, e) {
  return r < e ? -1 : r > e ? 1 : 0;
}
function yt(r, e) {
  if (r === null && e === null)
    return 0;
  if (!r)
    return -1;
  if (!e)
    return 1;
  let t = r.length, n = e.length;
  if (t === n) {
    for (let s = 0; s < t; s++) {
      let i = _t(r[s], e[s]);
      if (i !== 0)
        return i;
    }
    return 0;
  }
  return t - n;
}
function Qe(r) {
  return !!(/^#[0-9a-f]{6}$/i.test(r) || /^#[0-9a-f]{8}$/i.test(r) || /^#[0-9a-f]{3}$/i.test(r) || /^#[0-9a-f]{4}$/i.test(r));
}
function bt(r) {
  return r.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var St = class {
  constructor(r) {
    g(this, "cache", /* @__PURE__ */ new Map());
    this.fn = r;
  }
  get(r) {
    if (this.cache.has(r))
      return this.cache.get(r);
    const e = this.fn(r);
    return this.cache.set(r, e), e;
  }
}, ae = class {
  constructor(r, e, t) {
    g(this, "_cachedMatchRoot", new St(
      (r) => this._root.match(r)
    ));
    this._colorMap = r, this._defaults = e, this._root = t;
  }
  static createFromRawTheme(r, e) {
    return this.createFromParsedTheme(an(r), e);
  }
  static createFromParsedTheme(r, e) {
    return ln(r, e);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(r) {
    if (r === null)
      return this._defaults;
    const e = r.scopeName, n = this._cachedMatchRoot.get(e).find(
      (s) => sn(r.parent, s.parentScopes)
    );
    return n ? new wt(
      n.fontStyle,
      n.foreground,
      n.background
    ) : null;
  }
}, ke = class ie {
  constructor(e, t) {
    this.parent = e, this.scopeName = t;
  }
  static push(e, t) {
    for (const n of t)
      e = new ie(e, n);
    return e;
  }
  static from(...e) {
    let t = null;
    for (let n = 0; n < e.length; n++)
      t = new ie(t, e[n]);
    return t;
  }
  push(e) {
    return new ie(this, e);
  }
  getSegments() {
    let e = this;
    const t = [];
    for (; e; )
      t.push(e.scopeName), e = e.parent;
    return t.reverse(), t;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(e) {
    return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
  }
  getExtensionIfDefined(e) {
    const t = [];
    let n = this;
    for (; n && n !== e; )
      t.push(n.scopeName), n = n.parent;
    return n === e ? t.reverse() : void 0;
  }
};
function sn(r, e) {
  if (e.length === 0)
    return !0;
  for (let t = 0; t < e.length; t++) {
    let n = e[t], s = !1;
    if (n === ">") {
      if (t === e.length - 1)
        return !1;
      n = e[++t], s = !0;
    }
    for (; r && !on(r.scopeName, n); ) {
      if (s)
        return !1;
      r = r.parent;
    }
    if (!r)
      return !1;
    r = r.parent;
  }
  return !0;
}
function on(r, e) {
  return e === r || r.startsWith(e) && r[e.length] === ".";
}
var wt = class {
  constructor(r, e, t) {
    this.fontStyle = r, this.foregroundId = e, this.backgroundId = t;
  }
};
function an(r) {
  if (!r)
    return [];
  if (!r.settings || !Array.isArray(r.settings))
    return [];
  let e = r.settings, t = [], n = 0;
  for (let s = 0, i = e.length; s < i; s++) {
    let o = e[s];
    if (!o.settings)
      continue;
    let c;
    if (typeof o.scope == "string") {
      let u = o.scope;
      u = u.replace(/^[,]+/, ""), u = u.replace(/[,]+$/, ""), c = u.split(",");
    } else Array.isArray(o.scope) ? c = o.scope : c = [""];
    let a = -1;
    if (typeof o.settings.fontStyle == "string") {
      a = 0;
      let u = o.settings.fontStyle.split(" ");
      for (let f = 0, d = u.length; f < d; f++)
        switch (u[f]) {
          case "italic":
            a = a | 1;
            break;
          case "bold":
            a = a | 2;
            break;
          case "underline":
            a = a | 4;
            break;
          case "strikethrough":
            a = a | 8;
            break;
        }
    }
    let l = null;
    typeof o.settings.foreground == "string" && Qe(o.settings.foreground) && (l = o.settings.foreground);
    let h = null;
    typeof o.settings.background == "string" && Qe(o.settings.background) && (h = o.settings.background);
    for (let u = 0, f = c.length; u < f; u++) {
      let p = c[u].trim().split(" "), b = p[p.length - 1], y = null;
      p.length > 1 && (y = p.slice(0, p.length - 1), y.reverse()), t[n++] = new cn(
        b,
        y,
        s,
        a,
        l,
        h
      );
    }
  }
  return t;
}
var cn = class {
  constructor(r, e, t, n, s, i) {
    this.scope = r, this.parentScopes = e, this.index = t, this.fontStyle = n, this.foreground = s, this.background = i;
  }
}, I = /* @__PURE__ */ ((r) => (r[r.NotSet = -1] = "NotSet", r[r.None = 0] = "None", r[r.Italic = 1] = "Italic", r[r.Bold = 2] = "Bold", r[r.Underline = 4] = "Underline", r[r.Strikethrough = 8] = "Strikethrough", r))(I || {});
function ln(r, e) {
  r.sort((a, l) => {
    let h = _t(a.scope, l.scope);
    return h !== 0 || (h = yt(a.parentScopes, l.parentScopes), h !== 0) ? h : a.index - l.index;
  });
  let t = 0, n = "#000000", s = "#ffffff";
  for (; r.length >= 1 && r[0].scope === ""; ) {
    let a = r.shift();
    a.fontStyle !== -1 && (t = a.fontStyle), a.foreground !== null && (n = a.foreground), a.background !== null && (s = a.background);
  }
  let i = new un(e), o = new wt(t, i.getId(n), i.getId(s)), c = new fn(new Pe(0, null, -1, 0, 0), []);
  for (let a = 0, l = r.length; a < l; a++) {
    let h = r[a];
    c.insert(0, h.scope, h.parentScopes, h.fontStyle, i.getId(h.foreground), i.getId(h.background));
  }
  return new ae(i, o, c);
}
var un = class {
  constructor(r) {
    g(this, "_isFrozen");
    g(this, "_lastColorId");
    g(this, "_id2color");
    g(this, "_color2id");
    if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(r)) {
      this._isFrozen = !0;
      for (let e = 0, t = r.length; e < t; e++)
        this._color2id[r[e]] = e, this._id2color[e] = r[e];
    } else
      this._isFrozen = !1;
  }
  getId(r) {
    if (r === null)
      return 0;
    r = r.toUpperCase();
    let e = this._color2id[r];
    if (e)
      return e;
    if (this._isFrozen)
      throw new Error(`Missing color in color map - ${r}`);
    return e = ++this._lastColorId, this._color2id[r] = e, this._id2color[e] = r, e;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}, hn = Object.freeze([]), Pe = class Ct {
  constructor(e, t, n, s, i) {
    g(this, "scopeDepth");
    g(this, "parentScopes");
    g(this, "fontStyle");
    g(this, "foreground");
    g(this, "background");
    this.scopeDepth = e, this.parentScopes = t || hn, this.fontStyle = n, this.foreground = s, this.background = i;
  }
  clone() {
    return new Ct(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(e) {
    let t = [];
    for (let n = 0, s = e.length; n < s; n++)
      t[n] = e[n].clone();
    return t;
  }
  acceptOverwrite(e, t, n, s) {
    this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, t !== -1 && (this.fontStyle = t), n !== 0 && (this.foreground = n), s !== 0 && (this.background = s);
  }
}, fn = class xe {
  constructor(e, t = [], n = {}) {
    g(this, "_rulesWithParentScopes");
    this._mainRule = e, this._children = n, this._rulesWithParentScopes = t;
  }
  static _cmpBySpecificity(e, t) {
    if (e.scopeDepth !== t.scopeDepth)
      return t.scopeDepth - e.scopeDepth;
    let n = 0, s = 0;
    for (; e.parentScopes[n] === ">" && n++, t.parentScopes[s] === ">" && s++, !(n >= e.parentScopes.length || s >= t.parentScopes.length); ) {
      const i = t.parentScopes[s].length - e.parentScopes[n].length;
      if (i !== 0)
        return i;
      n++, s++;
    }
    return t.parentScopes.length - e.parentScopes.length;
  }
  match(e) {
    if (e !== "") {
      let n = e.indexOf("."), s, i;
      if (n === -1 ? (s = e, i = "") : (s = e.substring(0, n), i = e.substring(n + 1)), this._children.hasOwnProperty(s))
        return this._children[s].match(i);
    }
    const t = this._rulesWithParentScopes.concat(this._mainRule);
    return t.sort(xe._cmpBySpecificity), t;
  }
  insert(e, t, n, s, i, o) {
    if (t === "") {
      this._doInsertHere(e, n, s, i, o);
      return;
    }
    let c = t.indexOf("."), a, l;
    c === -1 ? (a = t, l = "") : (a = t.substring(0, c), l = t.substring(c + 1));
    let h;
    this._children.hasOwnProperty(a) ? h = this._children[a] : (h = new xe(this._mainRule.clone(), Pe.cloneArr(this._rulesWithParentScopes)), this._children[a] = h), h.insert(e + 1, l, n, s, i, o);
  }
  _doInsertHere(e, t, n, s, i) {
    if (t === null) {
      this._mainRule.acceptOverwrite(e, n, s, i);
      return;
    }
    for (let o = 0, c = this._rulesWithParentScopes.length; o < c; o++) {
      let a = this._rulesWithParentScopes[o];
      if (yt(a.parentScopes, t) === 0) {
        a.acceptOverwrite(e, n, s, i);
        return;
      }
    }
    n === -1 && (n = this._mainRule.fontStyle), s === 0 && (s = this._mainRule.foreground), i === 0 && (i = this._mainRule.background), this._rulesWithParentScopes.push(new Pe(e, t, n, s, i));
  }
}, W = class P {
  static toBinaryStr(e) {
    return e.toString(2).padStart(32, "0");
  }
  static print(e) {
    const t = P.getLanguageId(e), n = P.getTokenType(e), s = P.getFontStyle(e), i = P.getForeground(e), o = P.getBackground(e);
    console.log({
      languageId: t,
      tokenType: n,
      fontStyle: s,
      foreground: i,
      background: o
    });
  }
  static getLanguageId(e) {
    return (e & 255) >>> 0;
  }
  static getTokenType(e) {
    return (e & 768) >>> 8;
  }
  static containsBalancedBrackets(e) {
    return (e & 1024) !== 0;
  }
  static getFontStyle(e) {
    return (e & 30720) >>> 11;
  }
  static getForeground(e) {
    return (e & 16744448) >>> 15;
  }
  static getBackground(e) {
    return (e & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(e, t, n, s, i, o, c) {
    let a = P.getLanguageId(e), l = P.getTokenType(e), h = P.containsBalancedBrackets(e) ? 1 : 0, u = P.getFontStyle(e), f = P.getForeground(e), d = P.getBackground(e);
    return t !== 0 && (a = t), n !== 8 && (l = n), s !== null && (h = s ? 1 : 0), i !== -1 && (u = i), o !== 0 && (f = o), c !== 0 && (d = c), (a << 0 | l << 8 | h << 10 | u << 11 | f << 15 | d << 24) >>> 0;
  }
};
function ce(r, e) {
  const t = [], n = dn(r);
  let s = n.next();
  for (; s !== null; ) {
    let a = 0;
    if (s.length === 2 && s.charAt(1) === ":") {
      switch (s.charAt(0)) {
        case "R":
          a = 1;
          break;
        case "L":
          a = -1;
          break;
        default:
          console.log(`Unknown priority ${s} in scope selector`);
      }
      s = n.next();
    }
    let l = o();
    if (t.push({ matcher: l, priority: a }), s !== ",")
      break;
    s = n.next();
  }
  return t;
  function i() {
    if (s === "-") {
      s = n.next();
      const a = i();
      return (l) => !!a && !a(l);
    }
    if (s === "(") {
      s = n.next();
      const a = c();
      return s === ")" && (s = n.next()), a;
    }
    if (Xe(s)) {
      const a = [];
      do
        a.push(s), s = n.next();
      while (Xe(s));
      return (l) => e(a, l);
    }
    return null;
  }
  function o() {
    const a = [];
    let l = i();
    for (; l; )
      a.push(l), l = i();
    return (h) => a.every((u) => u(h));
  }
  function c() {
    const a = [];
    let l = o();
    for (; l && (a.push(l), s === "|" || s === ","); ) {
      do
        s = n.next();
      while (s === "|" || s === ",");
      l = o();
    }
    return (h) => a.some((u) => u(h));
  }
}
function Xe(r) {
  return !!r && !!r.match(/[\w\.:]+/);
}
function dn(r) {
  let e = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, t = e.exec(r);
  return {
    next: () => {
      if (!t)
        return null;
      const n = t[0];
      return t = e.exec(r), n;
    }
  };
}
function Rt(r) {
  typeof r.dispose == "function" && r.dispose();
}
var Y = class {
  constructor(r) {
    this.scopeName = r;
  }
  toKey() {
    return this.scopeName;
  }
}, gn = class {
  constructor(r, e) {
    this.scopeName = r, this.ruleName = e;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}, pn = class {
  constructor() {
    g(this, "_references", []);
    g(this, "_seenReferenceKeys", /* @__PURE__ */ new Set());
    g(this, "visitedRule", /* @__PURE__ */ new Set());
  }
  get references() {
    return this._references;
  }
  add(r) {
    const e = r.toKey();
    this._seenReferenceKeys.has(e) || (this._seenReferenceKeys.add(e), this._references.push(r));
  }
}, mn = class {
  constructor(r, e) {
    g(this, "seenFullScopeRequests", /* @__PURE__ */ new Set());
    g(this, "seenPartialScopeRequests", /* @__PURE__ */ new Set());
    g(this, "Q");
    this.repo = r, this.initialScopeName = e, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new Y(this.initialScopeName)];
  }
  processQueue() {
    const r = this.Q;
    this.Q = [];
    const e = new pn();
    for (const t of r)
      _n(t, this.initialScopeName, this.repo, e);
    for (const t of e.references)
      if (t instanceof Y) {
        if (this.seenFullScopeRequests.has(t.scopeName))
          continue;
        this.seenFullScopeRequests.add(t.scopeName), this.Q.push(t);
      } else {
        if (this.seenFullScopeRequests.has(t.scopeName) || this.seenPartialScopeRequests.has(t.toKey()))
          continue;
        this.seenPartialScopeRequests.add(t.toKey()), this.Q.push(t);
      }
  }
};
function _n(r, e, t, n) {
  const s = t.lookup(r.scopeName);
  if (!s) {
    if (r.scopeName === e)
      throw new Error(`No grammar provided for <${e}>`);
    return;
  }
  const i = t.lookup(e);
  r instanceof Y ? oe({ baseGrammar: i, selfGrammar: s }, n) : Le(
    r.ruleName,
    { baseGrammar: i, selfGrammar: s, repository: s.repository },
    n
  );
  const o = t.injections(r.scopeName);
  if (o)
    for (const c of o)
      n.add(new Y(c));
}
function Le(r, e, t) {
  if (e.repository && e.repository[r]) {
    const n = e.repository[r];
    le([n], e, t);
  }
}
function oe(r, e) {
  r.selfGrammar.patterns && Array.isArray(r.selfGrammar.patterns) && le(
    r.selfGrammar.patterns,
    { ...r, repository: r.selfGrammar.repository },
    e
  ), r.selfGrammar.injections && le(
    Object.values(r.selfGrammar.injections),
    { ...r, repository: r.selfGrammar.repository },
    e
  );
}
function le(r, e, t) {
  for (const n of r) {
    if (t.visitedRule.has(n))
      continue;
    t.visitedRule.add(n);
    const s = n.repository ? pt({}, e.repository, n.repository) : e.repository;
    Array.isArray(n.patterns) && le(n.patterns, { ...e, repository: s }, t);
    const i = n.include;
    if (!i)
      continue;
    const o = At(i);
    switch (o.kind) {
      case 0:
        oe({ ...e, selfGrammar: e.baseGrammar }, t);
        break;
      case 1:
        oe(e, t);
        break;
      case 2:
        Le(o.ruleName, { ...e, repository: s }, t);
        break;
      case 3:
      case 4:
        const c = o.scopeName === e.selfGrammar.scopeName ? e.selfGrammar : o.scopeName === e.baseGrammar.scopeName ? e.baseGrammar : void 0;
        if (c) {
          const a = { baseGrammar: e.baseGrammar, selfGrammar: c, repository: s };
          o.kind === 4 ? Le(o.ruleName, a, t) : oe(a, t);
        } else
          o.kind === 4 ? t.add(new gn(o.scopeName, o.ruleName)) : t.add(new Y(o.scopeName));
        break;
    }
  }
}
var yn = class {
  constructor() {
    g(this, "kind", 0);
  }
}, bn = class {
  constructor() {
    g(this, "kind", 1);
  }
}, Sn = class {
  constructor(r) {
    g(this, "kind", 2);
    this.ruleName = r;
  }
}, wn = class {
  constructor(r) {
    g(this, "kind", 3);
    this.scopeName = r;
  }
}, Cn = class {
  constructor(r, e) {
    g(this, "kind", 4);
    this.scopeName = r, this.ruleName = e;
  }
};
function At(r) {
  if (r === "$base")
    return new yn();
  if (r === "$self")
    return new bn();
  const e = r.indexOf("#");
  if (e === -1)
    return new wn(r);
  if (e === 0)
    return new Sn(r.substring(1));
  {
    const t = r.substring(0, e), n = r.substring(e + 1);
    return new Cn(t, n);
  }
}
var Rn = /\\(\d+)/, Ze = /\\(\d+)/g, An = -1, kt = -2;
var Z = class {
  constructor(r, e, t, n) {
    g(this, "$location");
    g(this, "id");
    g(this, "_nameIsCapturing");
    g(this, "_name");
    g(this, "_contentNameIsCapturing");
    g(this, "_contentName");
    this.$location = r, this.id = e, this._name = t || null, this._nameIsCapturing = te.hasCaptures(this._name), this._contentName = n || null, this._contentNameIsCapturing = te.hasCaptures(this._contentName);
  }
  get debugName() {
    const r = this.$location ? `${mt(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${r}`;
  }
  getName(r, e) {
    return !this._nameIsCapturing || this._name === null || r === null || e === null ? this._name : te.replaceCaptures(this._name, r, e);
  }
  getContentName(r, e) {
    return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : te.replaceCaptures(this._contentName, r, e);
  }
}, kn = class extends Z {
  constructor(e, t, n, s, i) {
    super(e, t, n, s);
    g(this, "retokenizeCapturedWithRuleId");
    this.retokenizeCapturedWithRuleId = i;
  }
  dispose() {
  }
  collectPatterns(e, t) {
    throw new Error("Not supported!");
  }
  compile(e, t) {
    throw new Error("Not supported!");
  }
  compileAG(e, t, n, s) {
    throw new Error("Not supported!");
  }
}, Tn = class extends Z {
  constructor(e, t, n, s, i) {
    super(e, t, n, null);
    g(this, "_match");
    g(this, "captures");
    g(this, "_cachedCompiledPatterns");
    this._match = new J(s, this.id), this.captures = i, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(e, t) {
    t.push(this._match);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, n, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, n, s);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new Q(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, et = class extends Z {
  constructor(e, t, n, s, i) {
    super(e, t, n, s);
    g(this, "hasMissingPatterns");
    g(this, "patterns");
    g(this, "_cachedCompiledPatterns");
    this.patterns = i.patterns, this.hasMissingPatterns = i.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  collectPatterns(e, t) {
    for (const n of this.patterns)
      e.getRule(n).collectPatterns(e, t);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, n, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, n, s);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new Q(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, Oe = class extends Z {
  constructor(e, t, n, s, i, o, c, a, l, h) {
    super(e, t, n, s);
    g(this, "_begin");
    g(this, "beginCaptures");
    g(this, "_end");
    g(this, "endHasBackReferences");
    g(this, "endCaptures");
    g(this, "applyEndPatternLast");
    g(this, "hasMissingPatterns");
    g(this, "patterns");
    g(this, "_cachedCompiledPatterns");
    this._begin = new J(i, this.id), this.beginCaptures = o, this._end = new J(c || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = a, this.applyEndPatternLast = l || !1, this.patterns = h.patterns, this.hasMissingPatterns = h.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(e, t) {
    return this._end.resolveBackReferences(e, t);
  }
  collectPatterns(e, t) {
    t.push(this._begin);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e, t).compile(e);
  }
  compileAG(e, t, n, s) {
    return this._getCachedCompiledPatterns(e, t).compileAG(e, n, s);
  }
  _getCachedCompiledPatterns(e, t) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new Q();
      for (const n of this.patterns)
        e.getRule(n).collectPatterns(e, this._cachedCompiledPatterns);
      this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
    }
    return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t) : this._cachedCompiledPatterns.setSource(0, t)), this._cachedCompiledPatterns;
  }
}, ue = class extends Z {
  constructor(e, t, n, s, i, o, c, a, l) {
    super(e, t, n, s);
    g(this, "_begin");
    g(this, "beginCaptures");
    g(this, "whileCaptures");
    g(this, "_while");
    g(this, "whileHasBackReferences");
    g(this, "hasMissingPatterns");
    g(this, "patterns");
    g(this, "_cachedCompiledPatterns");
    g(this, "_cachedCompiledWhilePatterns");
    this._begin = new J(i, this.id), this.beginCaptures = o, this.whileCaptures = a, this._while = new J(c, kt), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = l.patterns, this.hasMissingPatterns = l.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(e, t) {
    return this._while.resolveBackReferences(e, t);
  }
  collectPatterns(e, t) {
    t.push(this._begin);
  }
  compile(e, t) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, t, n, s) {
    return this._getCachedCompiledPatterns(e).compileAG(e, n, s);
  }
  _getCachedCompiledPatterns(e) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new Q();
      for (const t of this.patterns)
        e.getRule(t).collectPatterns(e, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(e, t) {
    return this._getCachedCompiledWhilePatterns(e, t).compile(e);
  }
  compileWhileAG(e, t, n, s) {
    return this._getCachedCompiledWhilePatterns(e, t).compileAG(e, n, s);
  }
  _getCachedCompiledWhilePatterns(e, t) {
    return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new Q(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t || "￿"), this._cachedCompiledWhilePatterns;
  }
}, Tt = class v {
  static createCaptureRule(e, t, n, s, i) {
    return e.registerRule((o) => new kn(t, o, n, s, i));
  }
  static getCompiledRuleId(e, t, n) {
    return e.id || t.registerRule((s) => {
      if (e.id = s, e.match)
        return new Tn(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.match,
          v._compileCaptures(e.captures, t, n)
        );
      if (typeof e.begin > "u") {
        e.repository && (n = pt({}, n, e.repository));
        let i = e.patterns;
        return typeof i > "u" && e.include && (i = [{ include: e.include }]), new et(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.contentName,
          v._compilePatterns(i, t, n)
        );
      }
      return e.while ? new ue(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        v._compileCaptures(e.beginCaptures || e.captures, t, n),
        e.while,
        v._compileCaptures(e.whileCaptures || e.captures, t, n),
        v._compilePatterns(e.patterns, t, n)
      ) : new Oe(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        v._compileCaptures(e.beginCaptures || e.captures, t, n),
        e.end,
        v._compileCaptures(e.endCaptures || e.captures, t, n),
        e.applyEndPatternLast,
        v._compilePatterns(e.patterns, t, n)
      );
    }), e.id;
  }
  static _compileCaptures(e, t, n) {
    let s = [];
    if (e) {
      let i = 0;
      for (const o in e) {
        if (o === "$vscodeTextmateLocation")
          continue;
        const c = parseInt(o, 10);
        c > i && (i = c);
      }
      for (let o = 0; o <= i; o++)
        s[o] = null;
      for (const o in e) {
        if (o === "$vscodeTextmateLocation")
          continue;
        const c = parseInt(o, 10);
        let a = 0;
        e[o].patterns && (a = v.getCompiledRuleId(e[o], t, n)), s[c] = v.createCaptureRule(t, e[o].$vscodeTextmateLocation, e[o].name, e[o].contentName, a);
      }
    }
    return s;
  }
  static _compilePatterns(e, t, n) {
    let s = [];
    if (e)
      for (let i = 0, o = e.length; i < o; i++) {
        const c = e[i];
        let a = -1;
        if (c.include) {
          const l = At(c.include);
          switch (l.kind) {
            case 0:
            case 1:
              a = v.getCompiledRuleId(n[c.include], t, n);
              break;
            case 2:
              let h = n[l.ruleName];
              h && (a = v.getCompiledRuleId(h, t, n));
              break;
            case 3:
            case 4:
              const u = l.scopeName, f = l.kind === 4 ? l.ruleName : null, d = t.getExternalGrammar(u, n);
              if (d)
                if (f) {
                  let p = d.repository[f];
                  p && (a = v.getCompiledRuleId(p, t, d.repository));
                } else
                  a = v.getCompiledRuleId(d.repository.$self, t, d.repository);
              break;
          }
        } else
          a = v.getCompiledRuleId(c, t, n);
        if (a !== -1) {
          const l = t.getRule(a);
          let h = !1;
          if ((l instanceof et || l instanceof Oe || l instanceof ue) && l.hasMissingPatterns && l.patterns.length === 0 && (h = !0), h)
            continue;
          s.push(a);
        }
      }
    return {
      patterns: s,
      hasMissingPatterns: (e ? e.length : 0) !== s.length
    };
  }
}, J = class Nt {
  constructor(e, t) {
    g(this, "source");
    g(this, "ruleId");
    g(this, "hasAnchor");
    g(this, "hasBackReferences");
    g(this, "_anchorCache");
    if (e && typeof e == "string") {
      const n = e.length;
      let s = 0, i = [], o = !1;
      for (let c = 0; c < n; c++)
        if (e.charAt(c) === "\\" && c + 1 < n) {
          const l = e.charAt(c + 1);
          l === "z" ? (i.push(e.substring(s, c)), i.push("$(?!\\n)(?<!\\n)"), s = c + 2) : (l === "A" || l === "G") && (o = !0), c++;
        }
      this.hasAnchor = o, s === 0 ? this.source = e : (i.push(e.substring(s, n)), this.source = i.join(""));
    } else
      this.hasAnchor = !1, this.source = e;
    this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t, typeof this.source == "string" ? this.hasBackReferences = Rn.test(this.source) : this.hasBackReferences = !1;
  }
  clone() {
    return new Nt(this.source, this.ruleId);
  }
  setSource(e) {
    this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
  }
  resolveBackReferences(e, t) {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let n = t.map((s) => e.substring(s.start, s.end));
    return Ze.lastIndex = 0, this.source.replace(Ze, (s, i) => bt(n[parseInt(i, 10)] || ""));
  }
  _buildAnchorCache() {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let e = [], t = [], n = [], s = [], i, o, c, a;
    for (i = 0, o = this.source.length; i < o; i++)
      c = this.source.charAt(i), e[i] = c, t[i] = c, n[i] = c, s[i] = c, c === "\\" && i + 1 < o && (a = this.source.charAt(i + 1), a === "A" ? (e[i + 1] = "￿", t[i + 1] = "￿", n[i + 1] = "A", s[i + 1] = "A") : a === "G" ? (e[i + 1] = "￿", t[i + 1] = "G", n[i + 1] = "￿", s[i + 1] = "G") : (e[i + 1] = a, t[i + 1] = a, n[i + 1] = a, s[i + 1] = a), i++);
    return {
      A0_G0: e.join(""),
      A0_G1: t.join(""),
      A1_G0: n.join(""),
      A1_G1: s.join("")
    };
  }
  resolveAnchors(e, t) {
    return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? t ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
  }
}, Q = class {
  constructor() {
    g(this, "_items");
    g(this, "_hasAnchors");
    g(this, "_cached");
    g(this, "_anchorCache");
    this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
  }
  push(r) {
    this._items.push(r), this._hasAnchors = this._hasAnchors || r.hasAnchor;
  }
  unshift(r) {
    this._items.unshift(r), this._hasAnchors = this._hasAnchors || r.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(r, e) {
    this._items[r].source !== e && (this._disposeCaches(), this._items[r].setSource(e));
  }
  compile(r) {
    if (!this._cached) {
      let e = this._items.map((t) => t.source);
      this._cached = new tt(r, e, this._items.map((t) => t.ruleId));
    }
    return this._cached;
  }
  compileAG(r, e, t) {
    return this._hasAnchors ? e ? t ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(r, e, t)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(r, e, t)), this._anchorCache.A1_G0) : t ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(r, e, t)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(r, e, t)), this._anchorCache.A0_G0) : this.compile(r);
  }
  _resolveAnchors(r, e, t) {
    let n = this._items.map((s) => s.resolveAnchors(e, t));
    return new tt(r, n, this._items.map((s) => s.ruleId));
  }
}, tt = class {
  constructor(r, e, t) {
    g(this, "scanner");
    this.regExps = e, this.rules = t, this.scanner = r.createOnigScanner(e);
  }
  dispose() {
    typeof this.scanner.dispose == "function" && this.scanner.dispose();
  }
  toString() {
    const r = [];
    for (let e = 0, t = this.rules.length; e < t; e++)
      r.push("   - " + this.rules[e] + ": " + this.regExps[e]);
    return r.join(`
`);
  }
  findNextMatchSync(r, e, t) {
    const n = this.scanner.findNextMatchSync(r, e, t);
    return n ? {
      ruleId: this.rules[n.index],
      captureIndices: n.captureIndices
    } : null;
  }
}, Te = class {
  constructor(r, e) {
    this.languageId = r, this.tokenType = e;
  }
}, M, Nn = (M = class {
  constructor(e, t) {
    g(this, "_defaultAttributes");
    g(this, "_embeddedLanguagesMatcher");
    g(this, "_getBasicScopeAttributes", new St((e) => {
      const t = this._scopeToLanguage(e), n = this._toStandardTokenType(e);
      return new Te(t, n);
    }));
    this._defaultAttributes = new Te(
      e,
      8
      /* NotSet */
    ), this._embeddedLanguagesMatcher = new vn(Object.entries(t || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(e) {
    return e === null ? M._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e);
  }
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(e) {
    return this._embeddedLanguagesMatcher.match(e) || 0;
  }
  _toStandardTokenType(e) {
    const t = e.match(M.STANDARD_TOKEN_TYPE_REGEXP);
    if (!t)
      return 8;
    switch (t[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
}, g(M, "_NULL_SCOPE_METADATA", new Te(0, 0)), g(M, "STANDARD_TOKEN_TYPE_REGEXP", /\b(comment|string|regex|meta\.embedded)\b/), M), vn = class {
  constructor(r) {
    g(this, "values");
    g(this, "scopesRegExp");
    if (r.length === 0)
      this.values = null, this.scopesRegExp = null;
    else {
      this.values = new Map(r);
      const e = r.map(
        ([t, n]) => bt(t)
      );
      e.sort(), e.reverse(), this.scopesRegExp = new RegExp(
        `^((${e.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(r) {
    if (!this.scopesRegExp)
      return;
    const e = r.match(this.scopesRegExp);
    if (e)
      return this.values.get(e[1]);
  }
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var nt = class {
  constructor(r, e) {
    this.stack = r, this.stoppedEarly = e;
  }
};
function vt(r, e, t, n, s, i, o, c) {
  const a = e.content.length;
  let l = !1, h = -1;
  if (o) {
    const d = In(
      r,
      e,
      t,
      n,
      s,
      i
    );
    s = d.stack, n = d.linePos, t = d.isFirstLine, h = d.anchorPosition;
  }
  const u = Date.now();
  for (; !l; ) {
    if (c !== 0 && Date.now() - u > c)
      return new nt(s, !0);
    f();
  }
  return new nt(s, !1);
  function f() {
    const d = En(
      r,
      e,
      t,
      n,
      s,
      h
    );
    if (!d) {
      i.produce(s, a), l = !0;
      return;
    }
    const p = d.captureIndices, b = d.matchedRuleId, y = p && p.length > 0 ? p[0].end > n : !1;
    if (b === An) {
      const m = s.getRule(r);
      i.produce(s, p[0].start), s = s.withContentNameScopesList(s.nameScopesList), V(
        r,
        e,
        t,
        s,
        i,
        m.endCaptures,
        p
      ), i.produce(s, p[0].end);
      const _ = s;
      if (s = s.parent, h = _.getAnchorPos(), !y && _.getEnterPos() === n) {
        s = _, i.produce(s, a), l = !0;
        return;
      }
    } else {
      const m = r.getRule(b);
      i.produce(s, p[0].start);
      const _ = s, S = m.getName(e.content, p), w = s.contentNameScopesList.pushAttributed(
        S,
        r
      );
      if (s = s.push(
        b,
        n,
        h,
        p[0].end === a,
        null,
        w,
        w
      ), m instanceof Oe) {
        const C = m;
        V(
          r,
          e,
          t,
          s,
          i,
          C.beginCaptures,
          p
        ), i.produce(s, p[0].end), h = p[0].end;
        const E = C.getContentName(
          e.content,
          p
        ), T = w.pushAttributed(
          E,
          r
        );
        if (s = s.withContentNameScopesList(T), C.endHasBackReferences && (s = s.withEndRule(
          C.getEndWithResolvedBackReferences(
            e.content,
            p
          )
        )), !y && _.hasSameRuleAs(s)) {
          s = s.pop(), i.produce(s, a), l = !0;
          return;
        }
      } else if (m instanceof ue) {
        const C = m;
        V(
          r,
          e,
          t,
          s,
          i,
          C.beginCaptures,
          p
        ), i.produce(s, p[0].end), h = p[0].end;
        const E = C.getContentName(
          e.content,
          p
        ), T = w.pushAttributed(
          E,
          r
        );
        if (s = s.withContentNameScopesList(T), C.whileHasBackReferences && (s = s.withEndRule(
          C.getWhileWithResolvedBackReferences(
            e.content,
            p
          )
        )), !y && _.hasSameRuleAs(s)) {
          s = s.pop(), i.produce(s, a), l = !0;
          return;
        }
      } else if (V(
        r,
        e,
        t,
        s,
        i,
        m.captures,
        p
      ), i.produce(s, p[0].end), s = s.pop(), !y) {
        s = s.safePop(), i.produce(s, a), l = !0;
        return;
      }
    }
    p[0].end > n && (n = p[0].end, t = !1);
  }
}
function In(r, e, t, n, s, i) {
  let o = s.beginRuleCapturedEOL ? 0 : -1;
  const c = [];
  for (let a = s; a; a = a.pop()) {
    const l = a.getRule(r);
    l instanceof ue && c.push({
      rule: l,
      stack: a
    });
  }
  for (let a = c.pop(); a; a = c.pop()) {
    const { ruleScanner: l, findOptions: h } = Ln(a.rule, r, a.stack.endRule, t, n === o), u = l.findNextMatchSync(e, n, h);
    if (u) {
      if (u.ruleId !== kt) {
        s = a.stack.pop();
        break;
      }
      u.captureIndices && u.captureIndices.length && (i.produce(a.stack, u.captureIndices[0].start), V(r, e, t, a.stack, i, a.rule.whileCaptures, u.captureIndices), i.produce(a.stack, u.captureIndices[0].end), o = u.captureIndices[0].end, u.captureIndices[0].end > n && (n = u.captureIndices[0].end, t = !1));
    } else {
      s = a.stack.pop();
      break;
    }
  }
  return { stack: s, linePos: n, anchorPosition: o, isFirstLine: t };
}
function En(r, e, t, n, s, i) {
  const o = Pn(r, e, t, n, s, i), c = r.getInjections();
  if (c.length === 0)
    return o;
  const a = xn(c, r, e, t, n, s, i);
  if (!a)
    return o;
  if (!o)
    return a;
  const l = o.captureIndices[0].start, h = a.captureIndices[0].start;
  return h < l || a.priorityMatch && h === l ? a : o;
}
function Pn(r, e, t, n, s, i) {
  const o = s.getRule(r), { ruleScanner: c, findOptions: a } = It(o, r, s.endRule, t, n === i), l = c.findNextMatchSync(e, n, a);
  return l ? {
    captureIndices: l.captureIndices,
    matchedRuleId: l.ruleId
  } : null;
}
function xn(r, e, t, n, s, i, o) {
  let c = Number.MAX_VALUE, a = null, l, h = 0;
  const u = i.contentNameScopesList.getScopeNames();
  for (let f = 0, d = r.length; f < d; f++) {
    const p = r[f];
    if (!p.matcher(u))
      continue;
    const b = e.getRule(p.ruleId), { ruleScanner: y, findOptions: m } = It(b, e, null, n, s === o), _ = y.findNextMatchSync(t, s, m);
    if (!_)
      continue;
    const S = _.captureIndices[0].start;
    if (!(S >= c) && (c = S, a = _.captureIndices, l = _.ruleId, h = p.priority, c === s))
      break;
  }
  return a ? {
    priorityMatch: h === -1,
    captureIndices: a,
    matchedRuleId: l
  } : null;
}
function It(r, e, t, n, s) {
  return {
    ruleScanner: r.compileAG(e, t, n, s),
    findOptions: 0
    /* None */
  };
}
function Ln(r, e, t, n, s) {
  return {
    ruleScanner: r.compileWhileAG(e, t, n, s),
    findOptions: 0
    /* None */
  };
}
function V(r, e, t, n, s, i, o) {
  if (i.length === 0)
    return;
  const c = e.content, a = Math.min(i.length, o.length), l = [], h = o[0].end;
  for (let u = 0; u < a; u++) {
    const f = i[u];
    if (f === null)
      continue;
    const d = o[u];
    if (d.length === 0)
      continue;
    if (d.start > h)
      break;
    for (; l.length > 0 && l[l.length - 1].endPos <= d.start; )
      s.produceFromScopes(l[l.length - 1].scopes, l[l.length - 1].endPos), l.pop();
    if (l.length > 0 ? s.produceFromScopes(l[l.length - 1].scopes, d.start) : s.produce(n, d.start), f.retokenizeCapturedWithRuleId) {
      const b = f.getName(c, o), y = n.contentNameScopesList.pushAttributed(b, r), m = f.getContentName(c, o), _ = y.pushAttributed(m, r), S = n.push(f.retokenizeCapturedWithRuleId, d.start, -1, !1, null, y, _), w = r.createOnigString(c.substring(0, d.end));
      vt(
        r,
        w,
        t && d.start === 0,
        d.start,
        S,
        s,
        !1,
        /* no time limit */
        0
      ), Rt(w);
      continue;
    }
    const p = f.getName(c, o);
    if (p !== null) {
      const y = (l.length > 0 ? l[l.length - 1].scopes : n.contentNameScopesList).pushAttributed(p, r);
      l.push(new On(y, d.end));
    }
  }
  for (; l.length > 0; )
    s.produceFromScopes(l[l.length - 1].scopes, l[l.length - 1].endPos), l.pop();
}
var On = class {
  constructor(r, e) {
    g(this, "scopes");
    g(this, "endPos");
    this.scopes = r, this.endPos = e;
  }
};
function Gn(r, e, t, n, s, i, o, c) {
  return new Mn(
    r,
    e,
    t,
    n,
    s,
    i,
    o,
    c
  );
}
function rt(r, e, t, n, s) {
  const i = ce(e, he), o = Tt.getCompiledRuleId(t, n, s.repository);
  for (const c of i)
    r.push({
      debugSelector: e,
      matcher: c.matcher,
      ruleId: o,
      grammar: s,
      priority: c.priority
    });
}
function he(r, e) {
  if (e.length < r.length)
    return !1;
  let t = 0;
  return r.every((n) => {
    for (let s = t; s < e.length; s++)
      if (Bn(e[s], n))
        return t = s + 1, !0;
    return !1;
  });
}
function Bn(r, e) {
  if (!r)
    return !1;
  if (r === e)
    return !0;
  const t = e.length;
  return r.length > t && r.substr(0, t) === e && r[t] === ".";
}
var Mn = class {
  constructor(r, e, t, n, s, i, o, c) {
    g(this, "_rootId");
    g(this, "_lastRuleId");
    g(this, "_ruleId2desc");
    g(this, "_includedGrammars");
    g(this, "_grammarRepository");
    g(this, "_grammar");
    g(this, "_injections");
    g(this, "_basicScopeAttributesProvider");
    g(this, "_tokenTypeMatchers");
    if (this._rootScopeName = r, this.balancedBracketSelectors = i, this._onigLib = c, this._basicScopeAttributesProvider = new Nn(
      t,
      n
    ), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = o, this._grammar = st(e, null), this._injections = null, this._tokenTypeMatchers = [], s)
      for (const a of Object.keys(s)) {
        const l = ce(a, he);
        for (const h of l)
          this._tokenTypeMatchers.push({
            matcher: h.matcher,
            type: s[a]
          });
      }
  }
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const r of this._ruleId2desc)
      r && r.dispose();
  }
  createOnigScanner(r) {
    return this._onigLib.createOnigScanner(r);
  }
  createOnigString(r) {
    return this._onigLib.createOnigString(r);
  }
  getMetadataForScope(r) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(r);
  }
  _collectInjections() {
    const r = {
      lookup: (s) => s === this._rootScopeName ? this._grammar : this.getExternalGrammar(s),
      injections: (s) => this._grammarRepository.injections(s)
    }, e = [], t = this._rootScopeName, n = r.lookup(t);
    if (n) {
      const s = n.injections;
      if (s)
        for (let o in s)
          rt(
            e,
            o,
            s[o],
            this,
            n
          );
      const i = this._grammarRepository.injections(t);
      i && i.forEach((o) => {
        const c = this.getExternalGrammar(o);
        if (c) {
          const a = c.injectionSelector;
          a && rt(
            e,
            a,
            c,
            this,
            c
          );
        }
      });
    }
    return e.sort((s, i) => s.priority - i.priority), e;
  }
  getInjections() {
    return this._injections === null && (this._injections = this._collectInjections()), this._injections;
  }
  registerRule(r) {
    const e = ++this._lastRuleId, t = r(e);
    return this._ruleId2desc[e] = t, t;
  }
  getRule(r) {
    return this._ruleId2desc[r];
  }
  getExternalGrammar(r, e) {
    if (this._includedGrammars[r])
      return this._includedGrammars[r];
    if (this._grammarRepository) {
      const t = this._grammarRepository.lookup(r);
      if (t)
        return this._includedGrammars[r] = st(
          t,
          e && e.$base
        ), this._includedGrammars[r];
    }
  }
  tokenizeLine(r, e, t = 0) {
    const n = this._tokenize(r, e, !1, t);
    return {
      tokens: n.lineTokens.getResult(n.ruleStack, n.lineLength),
      ruleStack: n.ruleStack,
      stoppedEarly: n.stoppedEarly
    };
  }
  tokenizeLine2(r, e, t = 0) {
    const n = this._tokenize(r, e, !0, t);
    return {
      tokens: n.lineTokens.getBinaryResult(n.ruleStack, n.lineLength),
      ruleStack: n.ruleStack,
      stoppedEarly: n.stoppedEarly
    };
  }
  _tokenize(r, e, t, n) {
    this._rootId === -1 && (this._rootId = Tt.getCompiledRuleId(
      this._grammar.repository.$self,
      this,
      this._grammar.repository
    ), this.getInjections());
    let s;
    if (!e || e === Ge.NULL) {
      s = !0;
      const l = this._basicScopeAttributesProvider.getDefaultAttributes(), h = this.themeProvider.getDefaults(), u = W.set(
        0,
        l.languageId,
        l.tokenType,
        null,
        h.fontStyle,
        h.foregroundId,
        h.backgroundId
      ), f = this.getRule(this._rootId).getName(
        null,
        null
      );
      let d;
      f ? d = K.createRootAndLookUpScopeName(
        f,
        u,
        this
      ) : d = K.createRoot(
        "unknown",
        u
      ), e = new Ge(
        null,
        this._rootId,
        -1,
        -1,
        !1,
        null,
        d,
        d
      );
    } else
      s = !1, e.reset();
    r = r + `
`;
    const i = this.createOnigString(r), o = i.content.length, c = new jn(
      t,
      r,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    ), a = vt(
      this,
      i,
      s,
      0,
      e,
      c,
      !0,
      n
    );
    return Rt(i), {
      lineLength: o,
      lineTokens: c,
      ruleStack: a.stack,
      stoppedEarly: a.stoppedEarly
    };
  }
};
function st(r, e) {
  return r = tn(r), r.repository = r.repository || {}, r.repository.$self = {
    $vscodeTextmateLocation: r.$vscodeTextmateLocation,
    patterns: r.patterns,
    name: r.scopeName
  }, r.repository.$base = e || r.repository.$self, r;
}
var K = class L {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, t, n) {
    this.parent = e, this.scopePath = t, this.tokenAttributes = n;
  }
  static fromExtension(e, t) {
    let n = e, s = (e == null ? void 0 : e.scopePath) ?? null;
    for (const i of t)
      s = ke.push(s, i.scopeNames), n = new L(n, s, i.encodedTokenAttributes);
    return n;
  }
  static createRoot(e, t) {
    return new L(null, new ke(null, e), t);
  }
  static createRootAndLookUpScopeName(e, t, n) {
    const s = n.getMetadataForScope(e), i = new ke(null, e), o = n.themeProvider.themeMatch(i), c = L.mergeAttributes(
      t,
      s,
      o
    );
    return new L(null, i, c);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(e) {
    return L.equals(this, e);
  }
  static equals(e, t) {
    do {
      if (e === t || !e && !t)
        return !0;
      if (!e || !t || e.scopeName !== t.scopeName || e.tokenAttributes !== t.tokenAttributes)
        return !1;
      e = e.parent, t = t.parent;
    } while (!0);
  }
  static mergeAttributes(e, t, n) {
    let s = -1, i = 0, o = 0;
    return n !== null && (s = n.fontStyle, i = n.foregroundId, o = n.backgroundId), W.set(
      e,
      t.languageId,
      t.tokenType,
      null,
      s,
      i,
      o
    );
  }
  pushAttributed(e, t) {
    if (e === null)
      return this;
    if (e.indexOf(" ") === -1)
      return L._pushAttributed(this, e, t);
    const n = e.split(/ /g);
    let s = this;
    for (const i of n)
      s = L._pushAttributed(s, i, t);
    return s;
  }
  static _pushAttributed(e, t, n) {
    const s = n.getMetadataForScope(t), i = e.scopePath.push(t), o = n.themeProvider.themeMatch(i), c = L.mergeAttributes(
      e.tokenAttributes,
      s,
      o
    );
    return new L(e, i, c);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(e) {
    var s;
    const t = [];
    let n = this;
    for (; n && n !== e; )
      t.push({
        encodedTokenAttributes: n.tokenAttributes,
        scopeNames: n.scopePath.getExtensionIfDefined(((s = n.parent) == null ? void 0 : s.scopePath) ?? null)
      }), n = n.parent;
    return n === e ? t.reverse() : void 0;
  }
}, x, Ge = (x = class {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, t, n, s, i, o, c, a) {
    g(this, "_stackElementBrand");
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    g(this, "_enterPos");
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    g(this, "_anchorPos");
    /**
     * The depth of the stack.
     */
    g(this, "depth");
    this.parent = e, this.ruleId = t, this.beginRuleCapturedEOL = i, this.endRule = o, this.nameScopesList = c, this.contentNameScopesList = a, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = n, this._anchorPos = s;
  }
  equals(e) {
    return e === null ? !1 : x._equals(this, e);
  }
  static _equals(e, t) {
    return e === t ? !0 : this._structuralEquals(e, t) ? K.equals(e.contentNameScopesList, t.contentNameScopesList) : !1;
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(e, t) {
    do {
      if (e === t || !e && !t)
        return !0;
      if (!e || !t || e.depth !== t.depth || e.ruleId !== t.ruleId || e.endRule !== t.endRule)
        return !1;
      e = e.parent, t = t.parent;
    } while (!0);
  }
  clone() {
    return this;
  }
  static _reset(e) {
    for (; e; )
      e._enterPos = -1, e._anchorPos = -1, e = e.parent;
  }
  reset() {
    x._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    return this.parent ? this.parent : this;
  }
  push(e, t, n, s, i, o, c) {
    return new x(
      this,
      e,
      t,
      n,
      s,
      i,
      o,
      c
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(e) {
    return e.getRule(this.ruleId);
  }
  toString() {
    const e = [];
    return this._writeString(e, 0), "[" + e.join(",") + "]";
  }
  _writeString(e, t) {
    var n, s;
    return this.parent && (t = this.parent._writeString(e, t)), e[t++] = `(${this.ruleId}, ${(n = this.nameScopesList) == null ? void 0 : n.toString()}, ${(s = this.contentNameScopesList) == null ? void 0 : s.toString()})`, t;
  }
  withContentNameScopesList(e) {
    return this.contentNameScopesList === e ? this : this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      e
    );
  }
  withEndRule(e) {
    return this.endRule === e ? this : new x(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      e,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(e) {
    let t = this;
    for (; t && t._enterPos === e._enterPos; ) {
      if (t.ruleId === e.ruleId)
        return !0;
      t = t.parent;
    }
    return !1;
  }
  toStateStackFrame() {
    var e, t, n;
    return {
      ruleId: this.ruleId,
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: ((t = this.nameScopesList) == null ? void 0 : t.getExtensionIfDefined(((e = this.parent) == null ? void 0 : e.nameScopesList) ?? null)) ?? [],
      contentNameScopesList: ((n = this.contentNameScopesList) == null ? void 0 : n.getExtensionIfDefined(this.nameScopesList)) ?? []
    };
  }
  static pushFrame(e, t) {
    const n = K.fromExtension((e == null ? void 0 : e.nameScopesList) ?? null, t.nameScopesList);
    return new x(
      e,
      t.ruleId,
      t.enterPos ?? -1,
      t.anchorPos ?? -1,
      t.beginRuleCapturedEOL,
      t.endRule,
      n,
      K.fromExtension(n, t.contentNameScopesList)
    );
  }
}, // TODO remove me
g(x, "NULL", new x(
  null,
  0,
  0,
  0,
  !1,
  null,
  null,
  null
)), x), $n = class {
  constructor(r, e) {
    g(this, "balancedBracketScopes");
    g(this, "unbalancedBracketScopes");
    g(this, "allowAny", !1);
    this.balancedBracketScopes = r.flatMap(
      (t) => t === "*" ? (this.allowAny = !0, []) : ce(t, he).map((n) => n.matcher)
    ), this.unbalancedBracketScopes = e.flatMap(
      (t) => ce(t, he).map((n) => n.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(r) {
    for (const e of this.unbalancedBracketScopes)
      if (e(r))
        return !1;
    for (const e of this.balancedBracketScopes)
      if (e(r))
        return !0;
    return this.allowAny;
  }
}, jn = class {
  constructor(r, e, t, n) {
    g(this, "_emitBinaryTokens");
    /**
     * defined only if `false`.
     */
    g(this, "_lineText");
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    g(this, "_tokens");
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    g(this, "_binaryTokens");
    g(this, "_lastTokenEndIndex");
    g(this, "_tokenTypeOverrides");
    this.balancedBracketSelectors = n, this._emitBinaryTokens = r, this._tokenTypeOverrides = t, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
  }
  produce(r, e) {
    this.produceFromScopes(r.contentNameScopesList, e);
  }
  produceFromScopes(r, e) {
    var n;
    if (this._lastTokenEndIndex >= e)
      return;
    if (this._emitBinaryTokens) {
      let s = (r == null ? void 0 : r.tokenAttributes) ?? 0, i = !1;
      if ((n = this.balancedBracketSelectors) != null && n.matchesAlways && (i = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const o = (r == null ? void 0 : r.getScopeNames()) ?? [];
        for (const c of this._tokenTypeOverrides)
          c.matcher(o) && (s = W.set(
            s,
            0,
            c.type,
            null,
            -1,
            0,
            0
          ));
        this.balancedBracketSelectors && (i = this.balancedBracketSelectors.match(o));
      }
      if (i && (s = W.set(
        s,
        0,
        8,
        i,
        -1,
        0,
        0
      )), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === s) {
        this._lastTokenEndIndex = e;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(s), this._lastTokenEndIndex = e;
      return;
    }
    const t = (r == null ? void 0 : r.getScopeNames()) ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex: e,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes: t
    }), this._lastTokenEndIndex = e;
  }
  getResult(r, e) {
    return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === e - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(r, e), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
  }
  getBinaryResult(r, e) {
    this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === e - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(r, e), this._binaryTokens[this._binaryTokens.length - 2] = 0);
    const t = new Uint32Array(this._binaryTokens.length);
    for (let n = 0, s = this._binaryTokens.length; n < s; n++)
      t[n] = this._binaryTokens[n];
    return t;
  }
}, Un = class {
  constructor(r, e) {
    g(this, "_grammars", /* @__PURE__ */ new Map());
    g(this, "_rawGrammars", /* @__PURE__ */ new Map());
    g(this, "_injectionGrammars", /* @__PURE__ */ new Map());
    g(this, "_theme");
    this._onigLib = e, this._theme = r;
  }
  dispose() {
    for (const r of this._grammars.values())
      r.dispose();
  }
  setTheme(r) {
    this._theme = r;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(r, e) {
    this._rawGrammars.set(r.scopeName, r), e && this._injectionGrammars.set(r.scopeName, e);
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(r) {
    return this._rawGrammars.get(r);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(r) {
    return this._injectionGrammars.get(r);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(r) {
    return this._theme.match(r);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(r, e, t, n, s) {
    if (!this._grammars.has(r)) {
      let i = this._rawGrammars.get(r);
      if (!i)
        return null;
      this._grammars.set(r, Gn(
        r,
        i,
        e,
        t,
        n,
        s,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(r);
  }
}, Fn = class {
  constructor(e) {
    g(this, "_options");
    g(this, "_syncRegistry");
    g(this, "_ensureGrammarCache");
    this._options = e, this._syncRegistry = new Un(
      ae.createFromRawTheme(e.theme, e.colorMap),
      e.onigLib
    ), this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(e, t) {
    this._syncRegistry.setTheme(ae.createFromRawTheme(e, t));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(e, t, n) {
    return this.loadGrammarWithConfiguration(e, t, { embeddedLanguages: n });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(e, t, n) {
    return this._loadGrammar(
      e,
      t,
      n.embeddedLanguages,
      n.tokenTypes,
      new $n(
        n.balancedBracketSelectors || [],
        n.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(e) {
    return this._loadGrammar(e, 0, null, null, null);
  }
  _loadGrammar(e, t, n, s, i) {
    const o = new mn(this._syncRegistry, e);
    for (; o.Q.length > 0; )
      o.Q.map((c) => this._loadSingleGrammar(c.scopeName)), o.processQueue();
    return this._grammarForScopeName(
      e,
      t,
      n,
      s,
      i
    );
  }
  _loadSingleGrammar(e) {
    this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
  }
  _doLoadSingleGrammar(e) {
    const t = this._options.loadGrammar(e);
    if (t) {
      const n = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
      this._syncRegistry.addGrammar(t, n);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(e, t = [], n = 0, s = null) {
    return this._syncRegistry.addGrammar(e, t), this._grammarForScopeName(e.scopeName, n, s);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(e, t = 0, n = null, s = null, i = null) {
    return this._syncRegistry.grammarForScopeName(
      e,
      t,
      n,
      s,
      i
    );
  }
}, Be = Ge.NULL;
const Dn = /["&'<>`]/g, Wn = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Hn = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), qn = /[|\\{}()[\]^$+*?.]/g, it = /* @__PURE__ */ new WeakMap();
function zn(r, e) {
  if (r = r.replace(
    e.subset ? Vn(e.subset) : Dn,
    n
  ), e.subset || e.escapeOnly)
    return r;
  return r.replace(Wn, t).replace(Hn, n);
  function t(s, i, o) {
    return e.format(
      (s.charCodeAt(0) - 55296) * 1024 + s.charCodeAt(1) - 56320 + 65536,
      o.charCodeAt(i + 2),
      e
    );
  }
  function n(s, i, o) {
    return e.format(
      s.charCodeAt(0),
      o.charCodeAt(i + 1),
      e
    );
  }
}
function Vn(r) {
  let e = it.get(r);
  return e || (e = Kn(r), it.set(r, e)), e;
}
function Kn(r) {
  const e = [];
  let t = -1;
  for (; ++t < r.length; )
    e.push(r[t].replace(qn, "\\$&"));
  return new RegExp("(?:" + e.join("|") + ")", "g");
}
const Yn = /[\dA-Fa-f]/;
function Jn(r, e, t) {
  const n = "&#x" + r.toString(16).toUpperCase();
  return t && e && !Yn.test(String.fromCharCode(e)) ? n : n + ";";
}
const Qn = /\d/;
function Xn(r, e, t) {
  const n = "&#" + String(r);
  return t && e && !Qn.test(String.fromCharCode(e)) ? n : n + ";";
}
const Zn = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], Ne = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, er = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], Et = {}.hasOwnProperty, Me = {};
let ne;
for (ne in Ne)
  Et.call(Ne, ne) && (Me[Ne[ne]] = ne);
const tr = /[^\dA-Za-z]/;
function nr(r, e, t, n) {
  const s = String.fromCharCode(r);
  if (Et.call(Me, s)) {
    const i = Me[s], o = "&" + i;
    return t && Zn.includes(i) && !er.includes(i) && (!n || e && e !== 61 && tr.test(String.fromCharCode(e))) ? o : o + ";";
  }
  return "";
}
function rr(r, e, t) {
  let n = Jn(r, e, t.omitOptionalSemicolons), s;
  if ((t.useNamedReferences || t.useShortestReferences) && (s = nr(
    r,
    e,
    t.omitOptionalSemicolons,
    t.attribute
  )), (t.useShortestReferences || !s) && t.useShortestReferences) {
    const i = Xn(r, e, t.omitOptionalSemicolons);
    i.length < n.length && (n = i);
  }
  return s && (!t.useShortestReferences || s.length < n.length) ? s : n;
}
function D(r, e) {
  return zn(r, Object.assign({ format: rr }, e));
}
const sr = /^>|^->|<!--|-->|--!>|<!-$/g, ir = [">"], or = ["<", ">"];
function ar(r, e, t, n) {
  return n.settings.bogusComments ? "<?" + D(
    r.value,
    Object.assign({}, n.settings.characterReferences, {
      subset: ir
    })
  ) + ">" : "<!--" + r.value.replace(sr, s) + "-->";
  function s(i) {
    return D(
      i,
      Object.assign({}, n.settings.characterReferences, {
        subset: or
      })
    );
  }
}
function cr(r, e, t, n) {
  return "<!" + (n.settings.upperDoctype ? "DOCTYPE" : "doctype") + (n.settings.tightDoctype ? "" : " ") + "html>";
}
const k = xt(1), Pt = xt(-1), lr = [];
function xt(r) {
  return e;
  function e(t, n, s) {
    const i = t ? t.children : lr;
    let o = (n || 0) + r, c = i[o];
    if (!s)
      for (; c && je(c); )
        o += r, c = i[o];
    return c;
  }
}
const ur = {}.hasOwnProperty;
function Lt(r) {
  return e;
  function e(t, n, s) {
    return ur.call(r, t.tagName) && r[t.tagName](t, n, s);
  }
}
const Fe = Lt({
  body: fr,
  caption: ve,
  colgroup: ve,
  dd: mr,
  dt: pr,
  head: ve,
  html: hr,
  li: gr,
  optgroup: _r,
  option: yr,
  p: dr,
  rp: ot,
  rt: ot,
  tbody: Sr,
  td: at,
  tfoot: wr,
  th: at,
  thead: br,
  tr: Cr
});
function ve(r, e, t) {
  const n = k(t, e, !0);
  return !n || n.type !== "comment" && !(n.type === "text" && je(n.value.charAt(0)));
}
function hr(r, e, t) {
  const n = k(t, e);
  return !n || n.type !== "comment";
}
function fr(r, e, t) {
  const n = k(t, e);
  return !n || n.type !== "comment";
}
function dr(r, e, t) {
  const n = k(t, e);
  return n ? n.type === "element" && (n.tagName === "address" || n.tagName === "article" || n.tagName === "aside" || n.tagName === "blockquote" || n.tagName === "details" || n.tagName === "div" || n.tagName === "dl" || n.tagName === "fieldset" || n.tagName === "figcaption" || n.tagName === "figure" || n.tagName === "footer" || n.tagName === "form" || n.tagName === "h1" || n.tagName === "h2" || n.tagName === "h3" || n.tagName === "h4" || n.tagName === "h5" || n.tagName === "h6" || n.tagName === "header" || n.tagName === "hgroup" || n.tagName === "hr" || n.tagName === "main" || n.tagName === "menu" || n.tagName === "nav" || n.tagName === "ol" || n.tagName === "p" || n.tagName === "pre" || n.tagName === "section" || n.tagName === "table" || n.tagName === "ul") : !t || // Confusing parent.
  !(t.type === "element" && (t.tagName === "a" || t.tagName === "audio" || t.tagName === "del" || t.tagName === "ins" || t.tagName === "map" || t.tagName === "noscript" || t.tagName === "video"));
}
function gr(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && n.tagName === "li";
}
function pr(r, e, t) {
  const n = k(t, e);
  return !!(n && n.type === "element" && (n.tagName === "dt" || n.tagName === "dd"));
}
function mr(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && (n.tagName === "dt" || n.tagName === "dd");
}
function ot(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && (n.tagName === "rp" || n.tagName === "rt");
}
function _r(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && n.tagName === "optgroup";
}
function yr(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && (n.tagName === "option" || n.tagName === "optgroup");
}
function br(r, e, t) {
  const n = k(t, e);
  return !!(n && n.type === "element" && (n.tagName === "tbody" || n.tagName === "tfoot"));
}
function Sr(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && (n.tagName === "tbody" || n.tagName === "tfoot");
}
function wr(r, e, t) {
  return !k(t, e);
}
function Cr(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && n.tagName === "tr";
}
function at(r, e, t) {
  const n = k(t, e);
  return !n || n.type === "element" && (n.tagName === "td" || n.tagName === "th");
}
const Rr = Lt({
  body: Tr,
  colgroup: Nr,
  head: kr,
  html: Ar,
  tbody: vr
});
function Ar(r) {
  const e = k(r, -1);
  return !e || e.type !== "comment";
}
function kr(r) {
  const e = /* @__PURE__ */ new Set();
  for (const n of r.children)
    if (n.type === "element" && (n.tagName === "base" || n.tagName === "title")) {
      if (e.has(n.tagName)) return !1;
      e.add(n.tagName);
    }
  const t = r.children[0];
  return !t || t.type === "element";
}
function Tr(r) {
  const e = k(r, -1, !0);
  return !e || e.type !== "comment" && !(e.type === "text" && je(e.value.charAt(0))) && !(e.type === "element" && (e.tagName === "meta" || e.tagName === "link" || e.tagName === "script" || e.tagName === "style" || e.tagName === "template"));
}
function Nr(r, e, t) {
  const n = Pt(t, e), s = k(r, -1, !0);
  return t && n && n.type === "element" && n.tagName === "colgroup" && Fe(n, t.children.indexOf(n), t) ? !1 : !!(s && s.type === "element" && s.tagName === "col");
}
function vr(r, e, t) {
  const n = Pt(t, e), s = k(r, -1);
  return t && n && n.type === "element" && (n.tagName === "thead" || n.tagName === "tbody") && Fe(n, t.children.indexOf(n), t) ? !1 : !!(s && s.type === "element" && s.tagName === "tr");
}
const re = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function Ir(r, e, t, n) {
  const s = n.schema, i = s.space === "svg" ? !1 : n.settings.omitOptionalTags;
  let o = s.space === "svg" ? n.settings.closeEmptyElements : n.settings.voids.includes(r.tagName.toLowerCase());
  const c = [];
  let a;
  s.space === "html" && r.tagName === "svg" && (n.schema = gt);
  const l = Er(n, r.properties), h = n.all(
    s.space === "html" && r.tagName === "template" ? r.content : r
  );
  return n.schema = s, h && (o = !1), (l || !i || !Rr(r, e, t)) && (c.push("<", r.tagName, l ? " " + l : ""), o && (s.space === "svg" || n.settings.closeSelfClosing) && (a = l.charAt(l.length - 1), (!n.settings.tightSelfClosing || a === "/" || a && a !== '"' && a !== "'") && c.push(" "), c.push("/")), c.push(">")), c.push(h), !o && (!i || !Fe(r, e, t)) && c.push("</" + r.tagName + ">"), c.join("");
}
function Er(r, e) {
  const t = [];
  let n = -1, s;
  if (e) {
    for (s in e)
      if (e[s] !== null && e[s] !== void 0) {
        const i = Pr(r, s, e[s]);
        i && t.push(i);
      }
  }
  for (; ++n < t.length; ) {
    const i = r.settings.tightAttributes ? t[n].charAt(t[n].length - 1) : void 0;
    n !== t.length - 1 && i !== '"' && i !== "'" && (t[n] += " ");
  }
  return t.join("");
}
function Pr(r, e, t) {
  const n = Vt(r.schema, e), s = r.settings.allowParseErrors && r.schema.space === "html" ? 0 : 1, i = r.settings.allowDangerousCharacters ? 0 : 1;
  let o = r.quote, c;
  if (n.overloadedBoolean && (t === n.attribute || t === "") ? t = !0 : (n.boolean || n.overloadedBoolean) && (typeof t != "string" || t === n.attribute || t === "") && (t = !!t), t == null || t === !1 || typeof t == "number" && Number.isNaN(t))
    return "";
  const a = D(
    n.attribute,
    Object.assign({}, r.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: re.name[s][i]
    })
  );
  return t === !0 || (t = Array.isArray(t) ? (n.commaSeparated ? Kt : Yt)(t, {
    padLeft: !r.settings.tightCommaSeparatedLists
  }) : String(t), r.settings.collapseEmptyAttributes && !t) ? a : (r.settings.preferUnquoted && (c = D(
    t,
    Object.assign({}, r.settings.characterReferences, {
      attribute: !0,
      subset: re.unquoted[s][i]
    })
  )), c !== t && (r.settings.quoteSmart && Je(t, o) > Je(t, r.alternative) && (o = r.alternative), c = o + D(
    t,
    Object.assign({}, r.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (o === "'" ? re.single : re.double)[s][i],
      attribute: !0
    })
  ) + o), a + (c && "=" + c));
}
const xr = ["<", "&"];
function Ot(r, e, t, n) {
  return t && t.type === "element" && (t.tagName === "script" || t.tagName === "style") ? r.value : D(
    r.value,
    Object.assign({}, n.settings.characterReferences, {
      subset: xr
    })
  );
}
function Lr(r, e, t, n) {
  return n.settings.allowDangerousHtml ? r.value : Ot(r, e, t, n);
}
function Or(r, e, t, n) {
  return n.all(r);
}
const Gr = Jt("type", {
  invalid: Br,
  unknown: Mr,
  handlers: { comment: ar, doctype: cr, element: Ir, raw: Lr, root: Or, text: Ot }
});
function Br(r) {
  throw new Error("Expected node, not `" + r + "`");
}
function Mr(r) {
  const e = (
    /** @type {Nodes} */
    r
  );
  throw new Error("Cannot compile unknown node `" + e.type + "`");
}
const $r = {}, jr = {}, Ur = [];
function Fr(r, e) {
  const t = e || $r, n = t.quote || '"', s = n === '"' ? "'" : '"';
  if (n !== '"' && n !== "'")
    throw new Error("Invalid quote `" + n + "`, expected `'` or `\"`");
  return {
    one: Dr,
    all: Wr,
    settings: {
      omitOptionalTags: t.omitOptionalTags || !1,
      allowParseErrors: t.allowParseErrors || !1,
      allowDangerousCharacters: t.allowDangerousCharacters || !1,
      quoteSmart: t.quoteSmart || !1,
      preferUnquoted: t.preferUnquoted || !1,
      tightAttributes: t.tightAttributes || !1,
      upperDoctype: t.upperDoctype || !1,
      tightDoctype: t.tightDoctype || !1,
      bogusComments: t.bogusComments || !1,
      tightCommaSeparatedLists: t.tightCommaSeparatedLists || !1,
      tightSelfClosing: t.tightSelfClosing || !1,
      collapseEmptyAttributes: t.collapseEmptyAttributes || !1,
      allowDangerousHtml: t.allowDangerousHtml || !1,
      voids: t.voids || Xt,
      characterReferences: t.characterReferences || jr,
      closeSelfClosing: t.closeSelfClosing || !1,
      closeEmptyElements: t.closeEmptyElements || !1
    },
    schema: t.space === "svg" ? gt : Qt,
    quote: n,
    alternative: s
  }.one(
    Array.isArray(r) ? { type: "root", children: r } : r,
    void 0,
    void 0
  );
}
function Dr(r, e, t) {
  return Gr(r, e, t, this);
}
function Wr(r) {
  const e = [], t = r && r.children || Ur;
  let n = -1;
  for (; ++n < t.length; )
    e[n] = this.one(t[n], n, r);
  return e.join("");
}
function fe(r, e) {
  const t = typeof r == "string" ? {} : { ...r.colorReplacements }, n = typeof r == "string" ? r : r.name;
  for (const [s, i] of Object.entries((e == null ? void 0 : e.colorReplacements) || {}))
    typeof i == "string" ? t[s] = i : s === n && Object.assign(t, i);
  return t;
}
function $(r, e) {
  return r && ((e == null ? void 0 : e[r == null ? void 0 : r.toLowerCase()]) || r);
}
function Hr(r) {
  return Array.isArray(r) ? r : [r];
}
async function Gt(r) {
  return Promise.resolve(typeof r == "function" ? r() : r).then((e) => e.default || e);
}
function De(r) {
  return !r || ["plaintext", "txt", "text", "plain"].includes(r);
}
function Bt(r) {
  return r === "ansi" || De(r);
}
function We(r) {
  return r === "none";
}
function Mt(r) {
  return We(r);
}
function $t(r, e) {
  var n;
  if (!e)
    return r;
  r.properties || (r.properties = {}), (n = r.properties).class || (n.class = []), typeof r.properties.class == "string" && (r.properties.class = r.properties.class.split(/\s+/g)), Array.isArray(r.properties.class) || (r.properties.class = []);
  const t = Array.isArray(e) ? e : e.split(/\s+/g);
  for (const s of t)
    s && !r.properties.class.includes(s) && r.properties.class.push(s);
  return r;
}
function ye(r, e = !1) {
  var i;
  const t = r.split(/(\r?\n)/g);
  let n = 0;
  const s = [];
  for (let o = 0; o < t.length; o += 2) {
    const c = e ? t[o] + (t[o + 1] || "") : t[o];
    s.push([c, n]), n += t[o].length, n += ((i = t[o + 1]) == null ? void 0 : i.length) || 0;
  }
  return s;
}
function qr(r) {
  const e = ye(r, !0).map(([s]) => s);
  function t(s) {
    if (s === r.length)
      return {
        line: e.length - 1,
        character: e[e.length - 1].length
      };
    let i = s, o = 0;
    for (const c of e) {
      if (i < c.length)
        break;
      i -= c.length, o++;
    }
    return { line: o, character: i };
  }
  function n(s, i) {
    let o = 0;
    for (let c = 0; c < s; c++)
      o += e[c].length;
    return o += i, o;
  }
  return {
    lines: e,
    indexToPos: t,
    posToIndex: n
  };
}
function zr(r, e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const i of r.matchAll(/lang=["']([\w-]+)["']/g))
    n.add(i[1]);
  for (const i of r.matchAll(/(?:```|~~~)([\w-]+)/g))
    n.add(i[1]);
  for (const i of r.matchAll(/\\begin\{([\w-]+)\}/g))
    n.add(i[1]);
  if (!t)
    return Array.from(n);
  const s = t.getBundledLanguages();
  return Array.from(n).filter((i) => i && s[i]);
}
const He = "light-dark()", Vr = ["color", "background-color"];
function Kr(r, e) {
  let t = 0;
  const n = [];
  for (const s of e)
    s > t && n.push({
      ...r,
      content: r.content.slice(t, s),
      offset: r.offset + t
    }), t = s;
  return t < r.content.length && n.push({
    ...r,
    content: r.content.slice(t),
    offset: r.offset + t
  }), n;
}
function Yr(r, e) {
  const t = Array.from(e instanceof Set ? e : new Set(e)).sort((n, s) => n - s);
  return t.length ? r.map((n) => n.flatMap((s) => {
    const i = t.filter((o) => s.offset < o && o < s.offset + s.content.length).map((o) => o - s.offset).sort((o, c) => o - c);
    return i.length ? Kr(s, i) : s;
  })) : r;
}
function Jr(r, e, t, n, s = "css-vars") {
  const i = {
    content: r.content,
    explanation: r.explanation,
    offset: r.offset
  }, o = e.map((h) => de(r.variants[h])), c = new Set(o.flatMap((h) => Object.keys(h))), a = {}, l = (h, u) => {
    const f = u === "color" ? "" : u === "background-color" ? "-bg" : `-${u}`;
    return t + e[h] + (u === "color" ? "" : f);
  };
  return o.forEach((h, u) => {
    for (const f of c) {
      const d = h[f] || "inherit";
      if (u === 0 && n && Vr.includes(f))
        if (n === He && o.length > 1) {
          const p = e.findIndex((_) => _ === "light"), b = e.findIndex((_) => _ === "dark");
          if (p === -1 || b === -1)
            throw new R('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
          const y = o[p][f] || "inherit", m = o[b][f] || "inherit";
          a[f] = `light-dark(${y}, ${m})`, s === "css-vars" && (a[l(u, f)] = d);
        } else
          a[f] = d;
      else
        s === "css-vars" && (a[l(u, f)] = d);
    }
  }), i.htmlStyle = a, i;
}
function de(r) {
  const e = {};
  if (r.color && (e.color = r.color), r.bgColor && (e["background-color"] = r.bgColor), r.fontStyle) {
    r.fontStyle & I.Italic && (e["font-style"] = "italic"), r.fontStyle & I.Bold && (e["font-weight"] = "bold");
    const t = [];
    r.fontStyle & I.Underline && t.push("underline"), r.fontStyle & I.Strikethrough && t.push("line-through"), t.length && (e["text-decoration"] = t.join(" "));
  }
  return e;
}
function $e(r) {
  return typeof r == "string" ? r : Object.entries(r).map(([e, t]) => `${e}:${t}`).join(";");
}
const jt = /* @__PURE__ */ new WeakMap();
function be(r, e) {
  jt.set(r, e);
}
function X(r) {
  return jt.get(r);
}
class H {
  constructor(...e) {
    /**
     * Theme to Stack mapping
     */
    g(this, "_stacks", {});
    g(this, "lang");
    if (e.length === 2) {
      const [t, n] = e;
      this.lang = n, this._stacks = t;
    } else {
      const [t, n, s] = e;
      this.lang = n, this._stacks = { [s]: t };
    }
  }
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(e, t) {
    return new H(
      Object.fromEntries(Hr(t).map((n) => [n, Be])),
      e
    );
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(e = this.theme) {
    return this._stacks[e];
  }
  getScopes(e = this.theme) {
    return Qr(this._stacks[e]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
}
function Qr(r) {
  const e = [], t = /* @__PURE__ */ new Set();
  function n(s) {
    var o;
    if (t.has(s))
      return;
    t.add(s);
    const i = (o = s == null ? void 0 : s.nameScopesList) == null ? void 0 : o.scopeName;
    i && e.push(i), s.parent && n(s.parent);
  }
  return n(r), e;
}
function Xr(r, e) {
  if (!(r instanceof H))
    throw new R("Invalid grammar state");
  return r.getInternalStack(e);
}
function Zr() {
  const r = /* @__PURE__ */ new WeakMap();
  function e(t) {
    if (!r.has(t.meta)) {
      let n = function(o) {
        if (typeof o == "number") {
          if (o < 0 || o > t.source.length)
            throw new R(`Invalid decoration offset: ${o}. Code length: ${t.source.length}`);
          return {
            ...s.indexToPos(o),
            offset: o
          };
        } else {
          const c = s.lines[o.line];
          if (c === void 0)
            throw new R(`Invalid decoration position ${JSON.stringify(o)}. Lines length: ${s.lines.length}`);
          let a = o.character;
          if (a < 0 && (a = c.length + a), a < 0 || a > c.length)
            throw new R(`Invalid decoration position ${JSON.stringify(o)}. Line ${o.line} length: ${c.length}`);
          return {
            ...o,
            character: a,
            offset: s.posToIndex(o.line, a)
          };
        }
      };
      const s = qr(t.source), i = (t.options.decorations || []).map((o) => ({
        ...o,
        start: n(o.start),
        end: n(o.end)
      }));
      es(i), r.set(t.meta, {
        decorations: i,
        converter: s,
        source: t.source
      });
    }
    return r.get(t.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(t) {
      var o;
      if (!((o = this.options.decorations) != null && o.length))
        return;
      const s = e(this).decorations.flatMap((c) => [c.start.offset, c.end.offset]);
      return Yr(t, s);
    },
    code(t) {
      var h;
      if (!((h = this.options.decorations) != null && h.length))
        return;
      const n = e(this), s = Array.from(t.children).filter((u) => u.type === "element" && u.tagName === "span");
      if (s.length !== n.converter.lines.length)
        throw new R(`Number of lines in code element (${s.length}) does not match the number of lines in the source (${n.converter.lines.length}). Failed to apply decorations.`);
      function i(u, f, d, p) {
        const b = s[u];
        let y = "", m = -1, _ = -1;
        if (f === 0 && (m = 0), d === 0 && (_ = 0), d === Number.POSITIVE_INFINITY && (_ = b.children.length), m === -1 || _ === -1)
          for (let w = 0; w < b.children.length; w++)
            y += Ut(b.children[w]), m === -1 && y.length === f && (m = w + 1), _ === -1 && y.length === d && (_ = w + 1);
        if (m === -1)
          throw new R(`Failed to find start index for decoration ${JSON.stringify(p.start)}`);
        if (_ === -1)
          throw new R(`Failed to find end index for decoration ${JSON.stringify(p.end)}`);
        const S = b.children.slice(m, _);
        if (!p.alwaysWrap && S.length === b.children.length)
          c(b, p, "line");
        else if (!p.alwaysWrap && S.length === 1 && S[0].type === "element")
          c(S[0], p, "token");
        else {
          const w = {
            type: "element",
            tagName: "span",
            properties: {},
            children: S
          };
          c(w, p, "wrapper"), b.children.splice(m, S.length, w);
        }
      }
      function o(u, f) {
        s[u] = c(s[u], f, "line");
      }
      function c(u, f, d) {
        var y;
        const p = f.properties || {}, b = f.transform || ((m) => m);
        return u.tagName = f.tagName || "span", u.properties = {
          ...u.properties,
          ...p,
          class: u.properties.class
        }, (y = f.properties) != null && y.class && $t(u, f.properties.class), u = b(u, d) || u, u;
      }
      const a = [], l = n.decorations.sort((u, f) => f.start.offset - u.start.offset || u.end.offset - f.end.offset);
      for (const u of l) {
        const { start: f, end: d } = u;
        if (f.line === d.line)
          i(f.line, f.character, d.character, u);
        else if (f.line < d.line) {
          i(f.line, f.character, Number.POSITIVE_INFINITY, u);
          for (let p = f.line + 1; p < d.line; p++)
            a.unshift(() => o(p, u));
          i(d.line, 0, d.character, u);
        }
      }
      a.forEach((u) => u());
    }
  };
}
function es(r) {
  for (let e = 0; e < r.length; e++) {
    const t = r[e];
    if (t.start.offset > t.end.offset)
      throw new R(`Invalid decoration range: ${JSON.stringify(t.start)} - ${JSON.stringify(t.end)}`);
    for (let n = e + 1; n < r.length; n++) {
      const s = r[n], i = t.start.offset <= s.start.offset && s.start.offset < t.end.offset, o = t.start.offset < s.end.offset && s.end.offset <= t.end.offset, c = s.start.offset <= t.start.offset && t.start.offset < s.end.offset, a = s.start.offset < t.end.offset && t.end.offset <= s.end.offset;
      if (i || o || c || a) {
        if (i && o || c && a || c && t.start.offset === t.end.offset || o && s.start.offset === s.end.offset)
          continue;
        throw new R(`Decorations ${JSON.stringify(t.start)} and ${JSON.stringify(s.start)} intersect.`);
      }
    }
  }
}
function Ut(r) {
  return r.type === "text" ? r.value : r.type === "element" ? r.children.map(Ut).join("") : "";
}
const ts = [
  /* @__PURE__ */ Zr()
];
function ge(r) {
  const e = ns(r.transformers || []);
  return [
    ...e.pre,
    ...e.normal,
    ...e.post,
    ...ts
  ];
}
function ns(r) {
  const e = [], t = [], n = [];
  for (const s of r)
    switch (s.enforce) {
      case "pre":
        e.push(s);
        break;
      case "post":
        t.push(s);
        break;
      default:
        n.push(s);
    }
  return { pre: e, post: t, normal: n };
}
var j = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
], Ie = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function rs(r, e) {
  const t = r.indexOf("\x1B", e);
  if (t !== -1 && r[t + 1] === "[") {
    const n = r.indexOf("m", t);
    if (n !== -1)
      return {
        sequence: r.substring(t + 2, n).split(";"),
        startPosition: t,
        position: n + 1
      };
  }
  return {
    position: r.length
  };
}
function ct(r) {
  const e = r.shift();
  if (e === "2") {
    const t = r.splice(0, 3).map((n) => Number.parseInt(n));
    return t.length !== 3 || t.some((n) => Number.isNaN(n)) ? void 0 : {
      type: "rgb",
      rgb: t
    };
  } else if (e === "5") {
    const t = r.shift();
    if (t)
      return { type: "table", index: Number(t) };
  }
}
function ss(r) {
  const e = [];
  for (; r.length > 0; ) {
    const t = r.shift();
    if (!t)
      continue;
    const n = Number.parseInt(t);
    if (!Number.isNaN(n))
      if (n === 0)
        e.push({ type: "resetAll" });
      else if (n <= 9)
        Ie[n] && e.push({
          type: "setDecoration",
          value: Ie[n]
        });
      else if (n <= 29) {
        const s = Ie[n - 20];
        s && (e.push({
          type: "resetDecoration",
          value: s
        }), s === "dim" && e.push({
          type: "resetDecoration",
          value: "bold"
        }));
      } else if (n <= 37)
        e.push({
          type: "setForegroundColor",
          value: { type: "named", name: j[n - 30] }
        });
      else if (n === 38) {
        const s = ct(r);
        s && e.push({
          type: "setForegroundColor",
          value: s
        });
      } else if (n === 39)
        e.push({
          type: "resetForegroundColor"
        });
      else if (n <= 47)
        e.push({
          type: "setBackgroundColor",
          value: { type: "named", name: j[n - 40] }
        });
      else if (n === 48) {
        const s = ct(r);
        s && e.push({
          type: "setBackgroundColor",
          value: s
        });
      } else n === 49 ? e.push({
        type: "resetBackgroundColor"
      }) : n === 53 ? e.push({
        type: "setDecoration",
        value: "overline"
      }) : n === 55 ? e.push({
        type: "resetDecoration",
        value: "overline"
      }) : n >= 90 && n <= 97 ? e.push({
        type: "setForegroundColor",
        value: { type: "named", name: j[n - 90 + 8] }
      }) : n >= 100 && n <= 107 && e.push({
        type: "setBackgroundColor",
        value: { type: "named", name: j[n - 100 + 8] }
      });
  }
  return e;
}
function is() {
  let r = null, e = null, t = /* @__PURE__ */ new Set();
  return {
    parse(n) {
      const s = [];
      let i = 0;
      do {
        const o = rs(n, i), c = o.sequence ? n.substring(i, o.startPosition) : n.substring(i);
        if (c.length > 0 && s.push({
          value: c,
          foreground: r,
          background: e,
          decorations: new Set(t)
        }), o.sequence) {
          const a = ss(o.sequence);
          for (const l of a)
            l.type === "resetAll" ? (r = null, e = null, t.clear()) : l.type === "resetForegroundColor" ? r = null : l.type === "resetBackgroundColor" ? e = null : l.type === "resetDecoration" && t.delete(l.value);
          for (const l of a)
            l.type === "setForegroundColor" ? r = l.value : l.type === "setBackgroundColor" ? e = l.value : l.type === "setDecoration" && t.add(l.value);
        }
        i = o.position;
      } while (i < n.length);
      return s;
    }
  };
}
var os = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function as(r = os) {
  function e(c) {
    return r[c];
  }
  function t(c) {
    return `#${c.map((a) => Math.max(0, Math.min(a, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let n;
  function s() {
    if (n)
      return n;
    n = [];
    for (let l = 0; l < j.length; l++)
      n.push(e(j[l]));
    let c = [0, 95, 135, 175, 215, 255];
    for (let l = 0; l < 6; l++)
      for (let h = 0; h < 6; h++)
        for (let u = 0; u < 6; u++)
          n.push(t([c[l], c[h], c[u]]));
    let a = 8;
    for (let l = 0; l < 24; l++, a += 10)
      n.push(t([a, a, a]));
    return n;
  }
  function i(c) {
    return s()[c];
  }
  function o(c) {
    switch (c.type) {
      case "named":
        return e(c.name);
      case "rgb":
        return t(c.rgb);
      case "table":
        return i(c.index);
    }
  }
  return {
    value: o
  };
}
function cs(r, e, t) {
  const n = fe(r, t), s = ye(e), i = as(
    Object.fromEntries(
      j.map((c) => {
        var a;
        return [
          c,
          (a = r.colors) == null ? void 0 : a[`terminal.ansi${c[0].toUpperCase()}${c.substring(1)}`]
        ];
      })
    )
  ), o = is();
  return s.map(
    (c) => o.parse(c[0]).map((a) => {
      let l, h;
      a.decorations.has("reverse") ? (l = a.background ? i.value(a.background) : r.bg, h = a.foreground ? i.value(a.foreground) : r.fg) : (l = a.foreground ? i.value(a.foreground) : r.fg, h = a.background ? i.value(a.background) : void 0), l = $(l, n), h = $(h, n), a.decorations.has("dim") && (l = ls(l));
      let u = I.None;
      return a.decorations.has("bold") && (u |= I.Bold), a.decorations.has("italic") && (u |= I.Italic), a.decorations.has("underline") && (u |= I.Underline), a.decorations.has("strikethrough") && (u |= I.Strikethrough), {
        content: a.value,
        offset: c[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color: l,
        bgColor: h,
        fontStyle: u
      };
    })
  );
}
function ls(r) {
  const e = r.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (e)
    if (e[3]) {
      const n = Math.round(Number.parseInt(e[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${e[1]}${e[2]}${n}`;
    } else return e[2] ? `#${e[1]}${e[2]}80` : `#${Array.from(e[1]).map((n) => `${n}${n}`).join("")}80`;
  const t = r.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  return t ? `var(${t[1]}-dim)` : r;
}
function qe(r, e, t = {}) {
  const {
    lang: n = "text",
    theme: s = r.getLoadedThemes()[0]
  } = t;
  if (De(n) || We(s))
    return ye(e).map((a) => [{ content: a[0], offset: a[1] }]);
  const { theme: i, colorMap: o } = r.setTheme(s);
  if (n === "ansi")
    return cs(i, e, t);
  const c = r.getLanguage(n);
  if (t.grammarState) {
    if (t.grammarState.lang !== c.name)
      throw new R(`Grammar state language "${t.grammarState.lang}" does not match highlight language "${c.name}"`);
    if (!t.grammarState.themes.includes(i.name))
      throw new R(`Grammar state themes "${t.grammarState.themes}" do not contain highlight theme "${i.name}"`);
  }
  return hs(e, c, i, o, t);
}
function us(...r) {
  if (r.length === 2)
    return X(r[1]);
  const [e, t, n = {}] = r, {
    lang: s = "text",
    theme: i = e.getLoadedThemes()[0]
  } = n;
  if (De(s) || We(i))
    throw new R("Plain language does not have grammar state");
  if (s === "ansi")
    throw new R("ANSI language does not have grammar state");
  const { theme: o, colorMap: c } = e.setTheme(i), a = e.getLanguage(s);
  return new H(
    pe(t, a, o, c, n).stateStack,
    a.name,
    o.name
  );
}
function hs(r, e, t, n, s) {
  const i = pe(r, e, t, n, s), o = new H(
    pe(r, e, t, n, s).stateStack,
    e.name,
    t.name
  );
  return be(i.tokens, o), i.tokens;
}
function pe(r, e, t, n, s) {
  const i = fe(t, s), {
    tokenizeMaxLineLength: o = 0,
    tokenizeTimeLimit: c = 500
  } = s, a = ye(r);
  let l = s.grammarState ? Xr(s.grammarState, t.name) ?? Be : s.grammarContextCode != null ? pe(
    s.grammarContextCode,
    e,
    t,
    n,
    {
      ...s,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : Be, h = [];
  const u = [];
  for (let f = 0, d = a.length; f < d; f++) {
    const [p, b] = a[f];
    if (p === "") {
      h = [], u.push([]);
      continue;
    }
    if (o > 0 && p.length >= o) {
      h = [], u.push([{
        content: p,
        offset: b,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let y, m, _;
    s.includeExplanation && (y = e.tokenizeLine(p, l, c), m = y.tokens, _ = 0);
    const S = e.tokenizeLine2(p, l, c), w = S.tokens.length / 2;
    for (let C = 0; C < w; C++) {
      const E = S.tokens[2 * C], T = C + 1 < w ? S.tokens[2 * C + 2] : p.length;
      if (E === T)
        continue;
      const G = S.tokens[2 * C + 1], ee = $(
        n[W.getForeground(G)],
        i
      ), q = W.getFontStyle(G), Ce = {
        content: p.substring(E, T),
        offset: b + E,
        color: ee,
        fontStyle: q
      };
      if (s.includeExplanation) {
        const Ke = [];
        if (s.includeExplanation !== "scopeName")
          for (const B of t.settings) {
            let U;
            switch (typeof B.scope) {
              case "string":
                U = B.scope.split(/,/).map((Re) => Re.trim());
                break;
              case "object":
                U = B.scope;
                break;
              default:
                continue;
            }
            Ke.push({
              settings: B,
              selectors: U.map((Re) => Re.split(/ /))
            });
          }
        Ce.explanation = [];
        let Ye = 0;
        for (; E + Ye < T; ) {
          const B = m[_], U = p.substring(
            B.startIndex,
            B.endIndex
          );
          Ye += U.length, Ce.explanation.push({
            content: U,
            scopes: s.includeExplanation === "scopeName" ? fs(
              B.scopes
            ) : ds(
              Ke,
              B.scopes
            )
          }), _ += 1;
        }
      }
      h.push(Ce);
    }
    u.push(h), h = [], l = S.ruleStack;
  }
  return {
    tokens: u,
    stateStack: l
  };
}
function fs(r) {
  return r.map((e) => ({ scopeName: e }));
}
function ds(r, e) {
  const t = [];
  for (let n = 0, s = e.length; n < s; n++) {
    const i = e[n];
    t[n] = {
      scopeName: i,
      themeMatches: ps(r, i, e.slice(0, n))
    };
  }
  return t;
}
function lt(r, e) {
  return r === e || e.substring(0, r.length) === r && e[r.length] === ".";
}
function gs(r, e, t) {
  if (!lt(r[r.length - 1], e))
    return !1;
  let n = r.length - 2, s = t.length - 1;
  for (; n >= 0 && s >= 0; )
    lt(r[n], t[s]) && (n -= 1), s -= 1;
  return n === -1;
}
function ps(r, e, t) {
  const n = [];
  for (const { selectors: s, settings: i } of r)
    for (const o of s)
      if (gs(o, e, t)) {
        n.push(i);
        break;
      }
  return n;
}
function Ft(r, e, t) {
  const n = Object.entries(t.themes).filter((a) => a[1]).map((a) => ({ color: a[0], theme: a[1] })), s = n.map((a) => {
    const l = qe(r, e, {
      ...t,
      theme: a.theme
    }), h = X(l), u = typeof a.theme == "string" ? a.theme : a.theme.name;
    return {
      tokens: l,
      state: h,
      theme: u
    };
  }), i = ms(
    ...s.map((a) => a.tokens)
  ), o = i[0].map(
    (a, l) => a.map((h, u) => {
      const f = {
        content: h.content,
        variants: {},
        offset: h.offset
      };
      return "includeExplanation" in t && t.includeExplanation && (f.explanation = h.explanation), i.forEach((d, p) => {
        const {
          content: b,
          explanation: y,
          offset: m,
          ..._
        } = d[l][u];
        f.variants[n[p].color] = _;
      }), f;
    })
  ), c = s[0].state ? new H(
    Object.fromEntries(s.map((a) => {
      var l;
      return [a.theme, (l = a.state) == null ? void 0 : l.getInternalStack(a.theme)];
    })),
    s[0].state.lang
  ) : void 0;
  return c && be(o, c), o;
}
function ms(...r) {
  const e = r.map(() => []), t = r.length;
  for (let n = 0; n < r[0].length; n++) {
    const s = r.map((a) => a[n]), i = e.map(() => []);
    e.forEach((a, l) => a.push(i[l]));
    const o = s.map(() => 0), c = s.map((a) => a[0]);
    for (; c.every((a) => a); ) {
      const a = Math.min(...c.map((l) => l.content.length));
      for (let l = 0; l < t; l++) {
        const h = c[l];
        h.content.length === a ? (i[l].push(h), o[l] += 1, c[l] = s[l][o[l]]) : (i[l].push({
          ...h,
          content: h.content.slice(0, a)
        }), c[l] = {
          ...h,
          content: h.content.slice(a),
          offset: h.offset + a
        });
      }
    }
  }
  return e;
}
function me(r, e, t) {
  let n, s, i, o, c, a;
  if ("themes" in t) {
    const {
      defaultColor: l = "light",
      cssVariablePrefix: h = "--shiki-",
      colorsRendering: u = "css-vars"
    } = t, f = Object.entries(t.themes).filter((m) => m[1]).map((m) => ({ color: m[0], theme: m[1] })).sort((m, _) => m.color === l ? -1 : _.color === l ? 1 : 0);
    if (f.length === 0)
      throw new R("`themes` option must not be empty");
    const d = Ft(
      r,
      e,
      t
    );
    if (a = X(d), l && He !== l && !f.find((m) => m.color === l))
      throw new R(`\`themes\` option must contain the defaultColor key \`${l}\``);
    const p = f.map((m) => r.getTheme(m.theme)), b = f.map((m) => m.color);
    i = d.map((m) => m.map((_) => Jr(_, b, h, l, u))), a && be(i, a);
    const y = f.map((m) => fe(m.theme, t));
    s = ut(f, p, y, h, l, "fg", u), n = ut(f, p, y, h, l, "bg", u), o = `shiki-themes ${p.map((m) => m.name).join(" ")}`, c = l ? void 0 : [s, n].join(";");
  } else if ("theme" in t) {
    const l = fe(t.theme, t);
    i = qe(
      r,
      e,
      t
    );
    const h = r.getTheme(t.theme);
    n = $(h.bg, l), s = $(h.fg, l), o = h.name, a = X(i);
  } else
    throw new R("Invalid options, either `theme` or `themes` must be provided");
  return {
    tokens: i,
    fg: s,
    bg: n,
    themeName: o,
    rootStyle: c,
    grammarState: a
  };
}
function ut(r, e, t, n, s, i, o) {
  return r.map((c, a) => {
    const l = $(e[a][i], t[a]) || "inherit", h = `${n + c.color}${i === "bg" ? "-bg" : ""}:${l}`;
    if (a === 0 && s) {
      if (s === He && r.length > 1) {
        const u = r.findIndex((b) => b.color === "light"), f = r.findIndex((b) => b.color === "dark");
        if (u === -1 || f === -1)
          throw new R('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        const d = $(e[u][i], t[u]) || "inherit", p = $(e[f][i], t[f]) || "inherit";
        return `light-dark(${d}, ${p});${h}`;
      }
      return l;
    }
    return o === "css-vars" ? h : null;
  }).filter((c) => !!c).join(";");
}
function _e(r, e, t, n = {
  meta: {},
  options: t,
  codeToHast: (s, i) => _e(r, s, i),
  codeToTokens: (s, i) => me(r, s, i)
}) {
  var p, b;
  let s = e;
  for (const y of ge(t))
    s = ((p = y.preprocess) == null ? void 0 : p.call(n, s, t)) || s;
  let {
    tokens: i,
    fg: o,
    bg: c,
    themeName: a,
    rootStyle: l,
    grammarState: h
  } = me(r, s, t);
  const {
    mergeWhitespaces: u = !0,
    mergeSameStyleTokens: f = !1
  } = t;
  u === !0 ? i = ys(i) : u === "never" && (i = bs(i)), f && (i = Ss(i));
  const d = {
    ...n,
    get source() {
      return s;
    }
  };
  for (const y of ge(t))
    i = ((b = y.tokens) == null ? void 0 : b.call(d, i)) || i;
  return _s(
    i,
    {
      ...t,
      fg: o,
      bg: c,
      themeName: a,
      rootStyle: l
    },
    d,
    h
  );
}
function _s(r, e, t, n = X(r)) {
  var p, b, y;
  const s = ge(e), i = [], o = {
    type: "root",
    children: []
  }, {
    structure: c = "classic",
    tabindex: a = "0"
  } = e;
  let l = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${e.themeName || ""}`,
      style: e.rootStyle || `background-color:${e.bg};color:${e.fg}`,
      ...a !== !1 && a != null ? {
        tabindex: a.toString()
      } : {},
      ...Object.fromEntries(
        Array.from(
          Object.entries(e.meta || {})
        ).filter(([m]) => !m.startsWith("_"))
      )
    },
    children: []
  }, h = {
    type: "element",
    tagName: "code",
    properties: {},
    children: i
  };
  const u = [], f = {
    ...t,
    structure: c,
    addClassToHast: $t,
    get source() {
      return t.source;
    },
    get tokens() {
      return r;
    },
    get options() {
      return e;
    },
    get root() {
      return o;
    },
    get pre() {
      return l;
    },
    get code() {
      return h;
    },
    get lines() {
      return u;
    }
  };
  if (r.forEach((m, _) => {
    var C, E;
    _ && (c === "inline" ? o.children.push({ type: "element", tagName: "br", properties: {}, children: [] }) : c === "classic" && i.push({ type: "text", value: `
` }));
    let S = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }, w = 0;
    for (const T of m) {
      let G = {
        type: "element",
        tagName: "span",
        properties: {
          ...T.htmlAttrs
        },
        children: [{ type: "text", value: T.content }]
      };
      const ee = $e(T.htmlStyle || de(T));
      ee && (G.properties.style = ee);
      for (const q of s)
        G = ((C = q == null ? void 0 : q.span) == null ? void 0 : C.call(f, G, _ + 1, w, S, T)) || G;
      c === "inline" ? o.children.push(G) : c === "classic" && S.children.push(G), w += T.content.length;
    }
    if (c === "classic") {
      for (const T of s)
        S = ((E = T == null ? void 0 : T.line) == null ? void 0 : E.call(f, S, _ + 1)) || S;
      u.push(S), i.push(S);
    }
  }), c === "classic") {
    for (const m of s)
      h = ((p = m == null ? void 0 : m.code) == null ? void 0 : p.call(f, h)) || h;
    l.children.push(h);
    for (const m of s)
      l = ((b = m == null ? void 0 : m.pre) == null ? void 0 : b.call(f, l)) || l;
    o.children.push(l);
  }
  let d = o;
  for (const m of s)
    d = ((y = m == null ? void 0 : m.root) == null ? void 0 : y.call(f, d)) || d;
  return n && be(d, n), d;
}
function ys(r) {
  return r.map((e) => {
    const t = [];
    let n = "", s = 0;
    return e.forEach((i, o) => {
      const a = !(i.fontStyle && (i.fontStyle & I.Underline || i.fontStyle & I.Strikethrough));
      a && i.content.match(/^\s+$/) && e[o + 1] ? (s || (s = i.offset), n += i.content) : n ? (a ? t.push({
        ...i,
        offset: s,
        content: n + i.content
      }) : t.push(
        {
          content: n,
          offset: s
        },
        i
      ), s = 0, n = "") : t.push(i);
    }), t;
  });
}
function bs(r) {
  return r.map((e) => e.flatMap((t) => {
    if (t.content.match(/^\s+$/))
      return t;
    const n = t.content.match(/^(\s*)(.*?)(\s*)$/);
    if (!n)
      return t;
    const [, s, i, o] = n;
    if (!s && !o)
      return t;
    const c = [{
      ...t,
      offset: t.offset + s.length,
      content: i
    }];
    return s && c.unshift({
      content: s,
      offset: t.offset
    }), o && c.push({
      content: o,
      offset: t.offset + s.length + i.length
    }), c;
  }));
}
function Ss(r) {
  return r.map((e) => {
    const t = [];
    for (const n of e) {
      if (t.length === 0) {
        t.push({ ...n });
        continue;
      }
      const s = t[t.length - 1], i = $e(s.htmlStyle || de(s)), o = $e(n.htmlStyle || de(n)), c = s.fontStyle && (s.fontStyle & I.Underline || s.fontStyle & I.Strikethrough), a = n.fontStyle && (n.fontStyle & I.Underline || n.fontStyle & I.Strikethrough);
      !c && !a && i === o ? s.content += n.content : t.push({ ...n });
    }
    return t;
  });
}
const ws = Fr;
function Cs(r, e, t) {
  var i;
  const n = {
    meta: {},
    options: t,
    codeToHast: (o, c) => _e(r, o, c),
    codeToTokens: (o, c) => me(r, o, c)
  };
  let s = ws(_e(r, e, t, n));
  for (const o of ge(t))
    s = ((i = o.postprocess) == null ? void 0 : i.call(n, s, t)) || s;
  return s;
}
const ht = { light: "#333333", dark: "#bbbbbb" }, ft = { light: "#fffffe", dark: "#1e1e1e" }, dt = "__shiki_resolved";
function ze(r) {
  var c, a, l, h, u;
  if (r != null && r[dt])
    return r;
  const e = {
    ...r
  };
  e.tokenColors && !e.settings && (e.settings = e.tokenColors, delete e.tokenColors), e.type || (e.type = "dark"), e.colorReplacements = { ...e.colorReplacements }, e.settings || (e.settings = []);
  let { bg: t, fg: n } = e;
  if (!t || !n) {
    const f = e.settings ? e.settings.find((d) => !d.name && !d.scope) : void 0;
    (c = f == null ? void 0 : f.settings) != null && c.foreground && (n = f.settings.foreground), (a = f == null ? void 0 : f.settings) != null && a.background && (t = f.settings.background), !n && ((l = e == null ? void 0 : e.colors) != null && l["editor.foreground"]) && (n = e.colors["editor.foreground"]), !t && ((h = e == null ? void 0 : e.colors) != null && h["editor.background"]) && (t = e.colors["editor.background"]), n || (n = e.type === "light" ? ht.light : ht.dark), t || (t = e.type === "light" ? ft.light : ft.dark), e.fg = n, e.bg = t;
  }
  e.settings[0] && e.settings[0].settings && !e.settings[0].scope || e.settings.unshift({
    settings: {
      foreground: e.fg,
      background: e.bg
    }
  });
  let s = 0;
  const i = /* @__PURE__ */ new Map();
  function o(f) {
    var p;
    if (i.has(f))
      return i.get(f);
    s += 1;
    const d = `#${s.toString(16).padStart(8, "0").toLowerCase()}`;
    return (p = e.colorReplacements) != null && p[`#${d}`] ? o(f) : (i.set(f, d), d);
  }
  e.settings = e.settings.map((f) => {
    var y, m;
    const d = ((y = f.settings) == null ? void 0 : y.foreground) && !f.settings.foreground.startsWith("#"), p = ((m = f.settings) == null ? void 0 : m.background) && !f.settings.background.startsWith("#");
    if (!d && !p)
      return f;
    const b = {
      ...f,
      settings: {
        ...f.settings
      }
    };
    if (d) {
      const _ = o(f.settings.foreground);
      e.colorReplacements[_] = f.settings.foreground, b.settings.foreground = _;
    }
    if (p) {
      const _ = o(f.settings.background);
      e.colorReplacements[_] = f.settings.background, b.settings.background = _;
    }
    return b;
  });
  for (const f of Object.keys(e.colors || {}))
    if ((f === "editor.foreground" || f === "editor.background" || f.startsWith("terminal.ansi")) && !((u = e.colors[f]) != null && u.startsWith("#"))) {
      const d = o(e.colors[f]);
      e.colorReplacements[d] = e.colors[f], e.colors[f] = d;
    }
  return Object.defineProperty(e, dt, {
    enumerable: !1,
    writable: !1,
    value: !0
  }), e;
}
async function Dt(r) {
  return Array.from(new Set((await Promise.all(
    r.filter((e) => !Bt(e)).map(async (e) => await Gt(e).then((t) => Array.isArray(t) ? t : [t]))
  )).flat()));
}
async function Wt(r) {
  return (await Promise.all(
    r.map(
      async (t) => Mt(t) ? null : ze(await Gt(t))
    )
  )).filter((t) => !!t);
}
let Rs = 3;
function As(r, e = 3) {
  e > Rs || console.trace(`[SHIKI DEPRECATE]: ${r}`);
}
let F = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
class ks extends Fn {
  constructor(t, n, s, i = {}) {
    super(t);
    g(this, "_resolvedThemes", /* @__PURE__ */ new Map());
    g(this, "_resolvedGrammars", /* @__PURE__ */ new Map());
    g(this, "_langMap", /* @__PURE__ */ new Map());
    g(this, "_langGraph", /* @__PURE__ */ new Map());
    g(this, "_textmateThemeCache", /* @__PURE__ */ new WeakMap());
    g(this, "_loadedThemesCache", null);
    g(this, "_loadedLanguagesCache", null);
    this._resolver = t, this._themes = n, this._langs = s, this._alias = i, this._themes.map((o) => this.loadTheme(o)), this.loadLanguages(this._langs);
  }
  getTheme(t) {
    return typeof t == "string" ? this._resolvedThemes.get(t) : this.loadTheme(t);
  }
  loadTheme(t) {
    const n = ze(t);
    return n.name && (this._resolvedThemes.set(n.name, n), this._loadedThemesCache = null), n;
  }
  getLoadedThemes() {
    return this._loadedThemesCache || (this._loadedThemesCache = [...this._resolvedThemes.keys()]), this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(t) {
    let n = this._textmateThemeCache.get(t);
    n || (n = ae.createFromRawTheme(t), this._textmateThemeCache.set(t, n)), this._syncRegistry.setTheme(n);
  }
  getGrammar(t) {
    if (this._alias[t]) {
      const n = /* @__PURE__ */ new Set([t]);
      for (; this._alias[t]; ) {
        if (t = this._alias[t], n.has(t))
          throw new F(`Circular alias \`${Array.from(n).join(" -> ")} -> ${t}\``);
        n.add(t);
      }
    }
    return this._resolvedGrammars.get(t);
  }
  loadLanguage(t) {
    var o, c, a, l;
    if (this.getGrammar(t.name))
      return;
    const n = new Set(
      [...this._langMap.values()].filter((h) => {
        var u;
        return (u = h.embeddedLangsLazy) == null ? void 0 : u.includes(t.name);
      })
    );
    this._resolver.addLanguage(t);
    const s = {
      balancedBracketSelectors: t.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: t.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(t.scopeName, t);
    const i = this.loadGrammarWithConfiguration(t.scopeName, 1, s);
    if (i.name = t.name, this._resolvedGrammars.set(t.name, i), t.aliases && t.aliases.forEach((h) => {
      this._alias[h] = t.name;
    }), this._loadedLanguagesCache = null, n.size)
      for (const h of n)
        this._resolvedGrammars.delete(h.name), this._loadedLanguagesCache = null, (c = (o = this._syncRegistry) == null ? void 0 : o._injectionGrammars) == null || c.delete(h.scopeName), (l = (a = this._syncRegistry) == null ? void 0 : a._grammars) == null || l.delete(h.scopeName), this.loadLanguage(this._langMap.get(h.name));
  }
  dispose() {
    super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
  }
  loadLanguages(t) {
    for (const i of t)
      this.resolveEmbeddedLanguages(i);
    const n = Array.from(this._langGraph.entries()), s = n.filter(([i, o]) => !o);
    if (s.length) {
      const i = n.filter(([o, c]) => {
        var a;
        return c && ((a = c.embeddedLangs) == null ? void 0 : a.some((l) => s.map(([h]) => h).includes(l)));
      }).filter((o) => !s.includes(o));
      throw new F(`Missing languages ${s.map(([o]) => `\`${o}\``).join(", ")}, required by ${i.map(([o]) => `\`${o}\``).join(", ")}`);
    }
    for (const [i, o] of n)
      this._resolver.addLanguage(o);
    for (const [i, o] of n)
      this.loadLanguage(o);
  }
  getLoadedLanguages() {
    return this._loadedLanguagesCache || (this._loadedLanguagesCache = [
      .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
    ]), this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(t) {
    if (this._langMap.set(t.name, t), this._langGraph.set(t.name, t), t.embeddedLangs)
      for (const n of t.embeddedLangs)
        this._langGraph.set(n, this._langMap.get(n));
  }
}
class Ts {
  constructor(e, t) {
    g(this, "_langs", /* @__PURE__ */ new Map());
    g(this, "_scopeToLang", /* @__PURE__ */ new Map());
    g(this, "_injections", /* @__PURE__ */ new Map());
    g(this, "_onigLib");
    this._onigLib = {
      createOnigScanner: (n) => e.createScanner(n),
      createOnigString: (n) => e.createString(n)
    }, t.forEach((n) => this.addLanguage(n));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(e) {
    return this._langs.get(e);
  }
  loadGrammar(e) {
    return this._scopeToLang.get(e);
  }
  addLanguage(e) {
    this._langs.set(e.name, e), e.aliases && e.aliases.forEach((t) => {
      this._langs.set(t, e);
    }), this._scopeToLang.set(e.scopeName, e), e.injectTo && e.injectTo.forEach((t) => {
      this._injections.get(t) || this._injections.set(t, []), this._injections.get(t).push(e.scopeName);
    });
  }
  getInjections(e) {
    const t = e.split(".");
    let n = [];
    for (let s = 1; s <= t.length; s++) {
      const i = t.slice(0, s).join(".");
      n = [...n, ...this._injections.get(i) || []];
    }
    return n;
  }
}
let z = 0;
function Ns(r) {
  z += 1, r.warnings !== !1 && z >= 10 && z % 10 === 0 && console.warn(`[Shiki] ${z} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let e = !1;
  if (!r.engine)
    throw new F("`engine` option is required for synchronous mode");
  const t = (r.langs || []).flat(1), n = (r.themes || []).flat(1).map(ze), s = new Ts(r.engine, t), i = new ks(s, n, t, r.langAlias);
  let o;
  function c(_) {
    y();
    const S = i.getGrammar(typeof _ == "string" ? _ : _.name);
    if (!S)
      throw new F(`Language \`${_}\` not found, you may need to load it first`);
    return S;
  }
  function a(_) {
    if (_ === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    y();
    const S = i.getTheme(_);
    if (!S)
      throw new F(`Theme \`${_}\` not found, you may need to load it first`);
    return S;
  }
  function l(_) {
    y();
    const S = a(_);
    o !== _ && (i.setTheme(S), o = _);
    const w = i.getColorMap();
    return {
      theme: S,
      colorMap: w
    };
  }
  function h() {
    return y(), i.getLoadedThemes();
  }
  function u() {
    return y(), i.getLoadedLanguages();
  }
  function f(..._) {
    y(), i.loadLanguages(_.flat(1));
  }
  async function d(..._) {
    return f(await Dt(_));
  }
  function p(..._) {
    y();
    for (const S of _.flat(1))
      i.loadTheme(S);
  }
  async function b(..._) {
    return y(), p(await Wt(_));
  }
  function y() {
    if (e)
      throw new F("Shiki instance has been disposed");
  }
  function m() {
    e || (e = !0, i.dispose(), z -= 1);
  }
  return {
    setTheme: l,
    getTheme: a,
    getLanguage: c,
    getLoadedThemes: h,
    getLoadedLanguages: u,
    loadLanguage: d,
    loadLanguageSync: f,
    loadTheme: b,
    loadThemeSync: p,
    dispose: m,
    [Symbol.dispose]: m
  };
}
async function vs(r) {
  r.engine || As("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  const [
    e,
    t,
    n
  ] = await Promise.all([
    Wt(r.themes || []),
    Dt(r.langs || []),
    r.engine
  ]);
  return Ns({
    ...r,
    themes: e,
    langs: t,
    engine: n
  });
}
async function Is(r) {
  const e = await vs(r);
  return {
    getLastGrammarState: (...t) => us(e, ...t),
    codeToTokensBase: (t, n) => qe(e, t, n),
    codeToTokensWithThemes: (t, n) => Ft(e, t, n),
    codeToTokens: (t, n) => me(e, t, n),
    codeToHast: (t, n) => _e(e, t, n),
    codeToHtml: (t, n) => Cs(e, t, n),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...e,
    getInternalContext: () => e
  };
}
function Es(r) {
  const e = r.langs, t = r.themes, n = r.engine;
  async function s(i) {
    function o(u) {
      var f;
      if (typeof u == "string") {
        if (Bt(u))
          return [];
        u = ((f = i.langAlias) == null ? void 0 : f[u]) || u;
        const d = e[u];
        if (!d)
          throw new R(`Language \`${u}\` is not included in this bundle. You may want to load it from external source.`);
        return d;
      }
      return u;
    }
    function c(u) {
      if (Mt(u))
        return "none";
      if (typeof u == "string") {
        const f = t[u];
        if (!f)
          throw new R(`Theme \`${u}\` is not included in this bundle. You may want to load it from external source.`);
        return f;
      }
      return u;
    }
    const a = (i.themes ?? []).map((u) => c(u)), l = (i.langs ?? []).map((u) => o(u)), h = await Is({
      engine: i.engine ?? n(),
      ...i,
      themes: a,
      langs: l
    });
    return {
      ...h,
      loadLanguage(...u) {
        return h.loadLanguage(...u.map(o));
      },
      loadTheme(...u) {
        return h.loadTheme(...u.map(c));
      },
      getBundledLanguages() {
        return e;
      },
      getBundledThemes() {
        return t;
      }
    };
  }
  return s;
}
function Ps(r) {
  let e;
  async function t(n = {}) {
    if (e) {
      const s = await e;
      return await Promise.all([
        s.loadTheme(...n.themes || []),
        s.loadLanguage(...n.langs || [])
      ]), s;
    } else
      return e = r({
        ...n,
        themes: n.themes || [],
        langs: n.langs || []
      }), e;
  }
  return t;
}
function xs(r, e) {
  const t = Ps(r);
  async function n(s, i) {
    var a;
    const o = await t({
      langs: [i.lang],
      themes: "theme" in i ? [i.theme] : Object.values(i.themes)
    }), c = await ((a = e == null ? void 0 : e.guessEmbeddedLanguages) == null ? void 0 : a.call(e, s, i.lang, o));
    return c && await o.loadLanguage(...c), o;
  }
  return {
    getSingletonHighlighter(s) {
      return t(s);
    },
    async codeToHtml(s, i) {
      return (await n(s, i)).codeToHtml(s, i);
    },
    async codeToHast(s, i) {
      return (await n(s, i)).codeToHast(s, i);
    },
    async codeToTokens(s, i) {
      return (await n(s, i)).codeToTokens(s, i);
    },
    async codeToTokensBase(s, i) {
      return (await n(s, i)).codeToTokensBase(s, i);
    },
    async codeToTokensWithThemes(s, i) {
      return (await n(s, i)).codeToTokensWithThemes(s, i);
    },
    async getLastGrammarState(s, i) {
      return (await t({
        langs: [i.lang],
        themes: [i.theme]
      })).getLastGrammarState(s, i);
    }
  };
}
class Ve extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
}
function Ls() {
  return 2147483648;
}
function Os() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
const Gs = (r, e) => r + (e - r % e) % e;
async function Bs(r) {
  let e, t;
  const n = {};
  function s(d) {
    t = d, n.HEAPU8 = new Uint8Array(d), n.HEAPU32 = new Uint32Array(d);
  }
  function i(d, p, b) {
    n.HEAPU8.copyWithin(d, p, p + b);
  }
  function o(d) {
    try {
      return e.grow(d - t.byteLength + 65535 >>> 16), s(e.buffer), 1;
    } catch {
    }
  }
  function c(d) {
    const p = n.HEAPU8.length;
    d = d >>> 0;
    const b = Ls();
    if (d > b)
      return !1;
    for (let y = 1; y <= 4; y *= 2) {
      let m = p * (1 + 0.2 / y);
      m = Math.min(m, d + 100663296);
      const _ = Math.min(b, Gs(Math.max(d, m), 65536));
      if (o(_))
        return !0;
    }
    return !1;
  }
  const a = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
  function l(d, p, b = 1024) {
    const y = p + b;
    let m = p;
    for (; d[m] && !(m >= y); ) ++m;
    if (m - p > 16 && d.buffer && a)
      return a.decode(d.subarray(p, m));
    let _ = "";
    for (; p < m; ) {
      let S = d[p++];
      if (!(S & 128)) {
        _ += String.fromCharCode(S);
        continue;
      }
      const w = d[p++] & 63;
      if ((S & 224) === 192) {
        _ += String.fromCharCode((S & 31) << 6 | w);
        continue;
      }
      const C = d[p++] & 63;
      if ((S & 240) === 224 ? S = (S & 15) << 12 | w << 6 | C : S = (S & 7) << 18 | w << 12 | C << 6 | d[p++] & 63, S < 65536)
        _ += String.fromCharCode(S);
      else {
        const E = S - 65536;
        _ += String.fromCharCode(55296 | E >> 10, 56320 | E & 1023);
      }
    }
    return _;
  }
  function h(d, p) {
    return d ? l(n.HEAPU8, d, p) : "";
  }
  const u = {
    emscripten_get_now: Os,
    emscripten_memcpy_big: i,
    emscripten_resize_heap: c,
    fd_write: () => 0
  };
  async function f() {
    const p = await r({
      env: u,
      wasi_snapshot_preview1: u
    });
    e = p.memory, s(e.buffer), Object.assign(n, p), n.UTF8ToString = h;
  }
  return await f(), n;
}
var Ms = Object.defineProperty, $s = (r, e, t) => e in r ? Ms(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, A = (r, e, t) => $s(r, typeof e != "symbol" ? e + "" : e, t);
let N = null;
function js(r) {
  throw new Ve(r.UTF8ToString(r.getLastOnigError()));
}
class Se {
  constructor(e) {
    A(this, "utf16Length"), A(this, "utf8Length"), A(this, "utf16Value"), A(this, "utf8Value"), A(this, "utf16OffsetToUtf8"), A(this, "utf8OffsetToUtf16");
    const t = e.length, n = Se._utf8ByteLength(e), s = n !== t, i = s ? new Uint32Array(t + 1) : null;
    s && (i[t] = n);
    const o = s ? new Uint32Array(n + 1) : null;
    s && (o[n] = t);
    const c = new Uint8Array(n);
    let a = 0;
    for (let l = 0; l < t; l++) {
      const h = e.charCodeAt(l);
      let u = h, f = !1;
      if (h >= 55296 && h <= 56319 && l + 1 < t) {
        const d = e.charCodeAt(l + 1);
        d >= 56320 && d <= 57343 && (u = (h - 55296 << 10) + 65536 | d - 56320, f = !0);
      }
      s && (i[l] = a, f && (i[l + 1] = a), u <= 127 ? o[a + 0] = l : u <= 2047 ? (o[a + 0] = l, o[a + 1] = l) : u <= 65535 ? (o[a + 0] = l, o[a + 1] = l, o[a + 2] = l) : (o[a + 0] = l, o[a + 1] = l, o[a + 2] = l, o[a + 3] = l)), u <= 127 ? c[a++] = u : u <= 2047 ? (c[a++] = 192 | (u & 1984) >>> 6, c[a++] = 128 | (u & 63) >>> 0) : u <= 65535 ? (c[a++] = 224 | (u & 61440) >>> 12, c[a++] = 128 | (u & 4032) >>> 6, c[a++] = 128 | (u & 63) >>> 0) : (c[a++] = 240 | (u & 1835008) >>> 18, c[a++] = 128 | (u & 258048) >>> 12, c[a++] = 128 | (u & 4032) >>> 6, c[a++] = 128 | (u & 63) >>> 0), f && l++;
    }
    this.utf16Length = t, this.utf8Length = n, this.utf16Value = e, this.utf8Value = c, this.utf16OffsetToUtf8 = i, this.utf8OffsetToUtf16 = o;
  }
  static _utf8ByteLength(e) {
    let t = 0;
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e.charCodeAt(n);
      let o = i, c = !1;
      if (i >= 55296 && i <= 56319 && n + 1 < s) {
        const a = e.charCodeAt(n + 1);
        a >= 56320 && a <= 57343 && (o = (i - 55296 << 10) + 65536 | a - 56320, c = !0);
      }
      o <= 127 ? t += 1 : o <= 2047 ? t += 2 : o <= 65535 ? t += 3 : t += 4, c && n++;
    }
    return t;
  }
  createString(e) {
    const t = e.omalloc(this.utf8Length);
    return e.HEAPU8.set(this.utf8Value, t), t;
  }
}
const we = class O {
  constructor(e) {
    if (A(this, "id", ++O.LAST_ID), A(this, "_onigBinding"), A(this, "content"), A(this, "utf16Length"), A(this, "utf8Length"), A(this, "utf16OffsetToUtf8"), A(this, "utf8OffsetToUtf16"), A(this, "ptr"), !N)
      throw new Ve("Must invoke loadWasm first.");
    this._onigBinding = N, this.content = e;
    const t = new Se(e);
    this.utf16Length = t.utf16Length, this.utf8Length = t.utf8Length, this.utf16OffsetToUtf8 = t.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = t.utf8OffsetToUtf16, this.utf8Length < 1e4 && !O._sharedPtrInUse ? (O._sharedPtr || (O._sharedPtr = N.omalloc(1e4)), O._sharedPtrInUse = !0, N.HEAPU8.set(t.utf8Value, O._sharedPtr), this.ptr = O._sharedPtr) : this.ptr = t.createString(N);
  }
  convertUtf8OffsetToUtf16(e) {
    return this.utf8OffsetToUtf16 ? e < 0 ? 0 : e > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[e] : e;
  }
  convertUtf16OffsetToUtf8(e) {
    return this.utf16OffsetToUtf8 ? e < 0 ? 0 : e > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[e] : e;
  }
  dispose() {
    this.ptr === O._sharedPtr ? O._sharedPtrInUse = !1 : this._onigBinding.ofree(this.ptr);
  }
};
A(we, "LAST_ID", 0);
A(we, "_sharedPtr", 0);
A(we, "_sharedPtrInUse", !1);
let Ht = we;
class Us {
  constructor(e) {
    if (A(this, "_onigBinding"), A(this, "_ptr"), !N)
      throw new Ve("Must invoke loadWasm first.");
    const t = [], n = [];
    for (let c = 0, a = e.length; c < a; c++) {
      const l = new Se(e[c]);
      t[c] = l.createString(N), n[c] = l.utf8Length;
    }
    const s = N.omalloc(4 * e.length);
    N.HEAPU32.set(t, s / 4);
    const i = N.omalloc(4 * e.length);
    N.HEAPU32.set(n, i / 4);
    const o = N.createOnigScanner(s, i, e.length);
    for (let c = 0, a = e.length; c < a; c++)
      N.ofree(t[c]);
    N.ofree(i), N.ofree(s), o === 0 && js(N), this._onigBinding = N, this._ptr = o;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(e, t, n) {
    let s = 0;
    if (typeof n == "number" && (s = n), typeof e == "string") {
      e = new Ht(e);
      const i = this._findNextMatchSync(e, t, !1, s);
      return e.dispose(), i;
    }
    return this._findNextMatchSync(e, t, !1, s);
  }
  _findNextMatchSync(e, t, n, s) {
    const i = this._onigBinding, o = i.findNextOnigScannerMatch(this._ptr, e.id, e.ptr, e.utf8Length, e.convertUtf16OffsetToUtf8(t), s);
    if (o === 0)
      return null;
    const c = i.HEAPU32;
    let a = o / 4;
    const l = c[a++], h = c[a++], u = [];
    for (let f = 0; f < h; f++) {
      const d = e.convertUtf8OffsetToUtf16(c[a++]), p = e.convertUtf8OffsetToUtf16(c[a++]);
      u[f] = {
        start: d,
        end: p,
        length: p - d
      };
    }
    return {
      index: l,
      captureIndices: u
    };
  }
}
function Fs(r) {
  return typeof r.instantiator == "function";
}
function Ds(r) {
  return typeof r.default == "function";
}
function Ws(r) {
  return typeof r.data < "u";
}
function Hs(r) {
  return typeof Response < "u" && r instanceof Response;
}
function qs(r) {
  var e;
  return typeof ArrayBuffer < "u" && (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) || typeof Buffer < "u" && ((e = Buffer.isBuffer) == null ? void 0 : e.call(Buffer, r)) || typeof SharedArrayBuffer < "u" && r instanceof SharedArrayBuffer || typeof Uint32Array < "u" && r instanceof Uint32Array;
}
let se;
function zs(r) {
  if (se)
    return se;
  async function e() {
    N = await Bs(async (t) => {
      let n = r;
      return n = await n, typeof n == "function" && (n = await n(t)), typeof n == "function" && (n = await n(t)), Fs(n) ? n = await n.instantiator(t) : Ds(n) ? n = await n.default(t) : (Ws(n) && (n = n.data), Hs(n) ? typeof WebAssembly.instantiateStreaming == "function" ? n = await Vs(n)(t) : n = await Ks(n)(t) : qs(n) ? n = await Ee(n)(t) : n instanceof WebAssembly.Module ? n = await Ee(n)(t) : "default" in n && n.default instanceof WebAssembly.Module && (n = await Ee(n.default)(t))), "instance" in n && (n = n.instance), "exports" in n && (n = n.exports), n;
    });
  }
  return se = e(), se;
}
function Ee(r) {
  return (e) => WebAssembly.instantiate(r, e);
}
function Vs(r) {
  return (e) => WebAssembly.instantiateStreaming(r, e);
}
function Ks(r) {
  return async (e) => {
    const t = await r.arrayBuffer();
    return WebAssembly.instantiate(t, e);
  };
}
async function Ys(r) {
  return r && await zs(r), {
    createScanner(e) {
      return new Us(e.map((t) => typeof t == "string" ? t : t.source));
    },
    createString(e) {
      return new Ht(e);
    }
  };
}
const Js = /* @__PURE__ */ Es({
  langs: en,
  themes: Zt,
  engine: () => Ys(import("./wasm-DQxwEHae.js"))
}), {
  codeToHtml: ni
} = /* @__PURE__ */ xs(
  Js,
  { guessEmbeddedLanguages: zr }
);
export {
  R as ShikiError,
  $t as addClassToHast,
  $ as applyColorReplacements,
  en as bundledLanguages,
  ii as bundledLanguagesAlias,
  oi as bundledLanguagesBase,
  ai as bundledLanguagesInfo,
  Zt as bundledThemes,
  ci as bundledThemesInfo,
  ni as codeToHtml,
  Js as createHighlighter,
  Is as createHighlighterCore,
  Ys as createOnigurumaEngine,
  qr as createPositionConverter,
  vs as createShikiInternal,
  Ns as createShikiInternalSync,
  xs as createSingletonShorthands,
  Es as createdBundledHighlighter,
  Jr as flatTokenVariants,
  de as getTokenStyleObject,
  zr as guessEmbeddedLanguages,
  ws as hastToHtml,
  We as isNoneTheme,
  De as isPlainLang,
  Bt as isSpecialLang,
  Mt as isSpecialTheme,
  zs as loadWasm,
  Ps as makeSingletonHighlighter,
  Gt as normalizeGetter,
  ze as normalizeTheme,
  fe as resolveColorReplacements,
  ye as splitLines,
  Kr as splitToken,
  Yr as splitTokens,
  $e as stringifyTokenStyle,
  Hr as toArray,
  cs as tokenizeAnsiWithTheme,
  hs as tokenizeWithTheme,
  _s as tokensToHast,
  Zr as transformerDecorations,
  As as warnDeprecated
};
