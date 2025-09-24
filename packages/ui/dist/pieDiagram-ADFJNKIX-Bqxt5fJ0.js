import { Q as S, T as z, aE as j, _ as p, g as q, s as H, a as K, b as Q, t as Z, q as J, l as F, c as X, F as Y, K as ee, a4 as te, e as ae, z as re, H as ne } from "./mermaid.core-CmI31nLO.js";
import { p as ie } from "./chunk-4BX2VUAB-Dz42RmFJ.js";
import { p as se } from "./treemap-75Q7IDZK-B4CjifwB.js";
import { d as I } from "./arc-Dgpf36f9.js";
import { o as le } from "./ordinal-DfAQgscy.js";
function oe(e, a) {
  return a < e ? -1 : a > e ? 1 : a >= e ? 0 : NaN;
}
function ce(e) {
  return e;
}
function ue() {
  var e = ce, a = oe, f = null, x = S(0), s = S(z), o = S(0);
  function l(t) {
    var n, c = (t = j(t)).length, g, y, m = 0, u = new Array(c), i = new Array(c), v = +x.apply(this, arguments), w = Math.min(z, Math.max(-z, s.apply(this, arguments) - v)), h, C = Math.min(Math.abs(w) / c, o.apply(this, arguments)), $ = C * (w < 0 ? -1 : 1), d;
    for (n = 0; n < c; ++n)
      (d = i[u[n] = n] = +e(t[n], n, t)) > 0 && (m += d);
    for (a != null ? u.sort(function(A, D) {
      return a(i[A], i[D]);
    }) : f != null && u.sort(function(A, D) {
      return f(t[A], t[D]);
    }), n = 0, y = m ? (w - c * $) / m : 0; n < c; ++n, v = h)
      g = u[n], d = i[g], h = v + (d > 0 ? d * y : 0) + $, i[g] = {
        data: t[g],
        index: n,
        value: d,
        startAngle: v,
        endAngle: h,
        padAngle: C
      };
    return i;
  }
  return l.value = function(t) {
    return arguments.length ? (e = typeof t == "function" ? t : S(+t), l) : e;
  }, l.sortValues = function(t) {
    return arguments.length ? (a = t, f = null, l) : a;
  }, l.sort = function(t) {
    return arguments.length ? (f = t, a = null, l) : f;
  }, l.startAngle = function(t) {
    return arguments.length ? (x = typeof t == "function" ? t : S(+t), l) : x;
  }, l.endAngle = function(t) {
    return arguments.length ? (s = typeof t == "function" ? t : S(+t), l) : s;
  }, l.padAngle = function(t) {
    return arguments.length ? (o = typeof t == "function" ? t : S(+t), l) : o;
  }, l;
}
var pe = ne.pie, G = {
  sections: /* @__PURE__ */ new Map(),
  showData: !1
}, T = G.sections, N = G.showData, ge = structuredClone(pe), de = /* @__PURE__ */ p(() => structuredClone(ge), "getConfig"), fe = /* @__PURE__ */ p(() => {
  T = /* @__PURE__ */ new Map(), N = G.showData, re();
}, "clear"), he = /* @__PURE__ */ p(({ label: e, value: a }) => {
  if (a < 0)
    throw new Error(
      `"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`
    );
  T.has(e) || (T.set(e, a), F.debug(`added new section: ${e}, with value: ${a}`));
}, "addSection"), me = /* @__PURE__ */ p(() => T, "getSections"), ve = /* @__PURE__ */ p((e) => {
  N = e;
}, "setShowData"), Se = /* @__PURE__ */ p(() => N, "getShowData"), L = {
  getConfig: de,
  clear: fe,
  setDiagramTitle: J,
  getDiagramTitle: Z,
  setAccTitle: Q,
  getAccTitle: K,
  setAccDescription: H,
  getAccDescription: q,
  addSection: he,
  getSections: me,
  setShowData: ve,
  getShowData: Se
}, xe = /* @__PURE__ */ p((e, a) => {
  ie(e, a), a.setShowData(e.showData), e.sections.map(a.addSection);
}, "populateDb"), ye = {
  parse: /* @__PURE__ */ p(async (e) => {
    const a = await se("pie", e);
    F.debug(a), xe(a, L);
  }, "parse")
}, we = /* @__PURE__ */ p((e) => `
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`, "getStyles"), Ae = we, De = /* @__PURE__ */ p((e) => {
  const a = [...e.values()].reduce((s, o) => s + o, 0), f = [...e.entries()].map(([s, o]) => ({ label: s, value: o })).filter((s) => s.value / a * 100 >= 1).sort((s, o) => o.value - s.value);
  return ue().value((s) => s.value)(f);
}, "createPieArcs"), Ce = /* @__PURE__ */ p((e, a, f, x) => {
  F.debug(`rendering pie chart
` + e);
  const s = x.db, o = X(), l = Y(s.getConfig(), o.pie), t = 40, n = 18, c = 4, g = 450, y = g, m = ee(a), u = m.append("g");
  u.attr("transform", "translate(" + y / 2 + "," + g / 2 + ")");
  const { themeVariables: i } = o;
  let [v] = te(i.pieOuterStrokeWidth);
  v ?? (v = 2);
  const w = l.textPosition, h = Math.min(y, g) / 2 - t, C = I().innerRadius(0).outerRadius(h), $ = I().innerRadius(h * w).outerRadius(h * w);
  u.append("circle").attr("cx", 0).attr("cy", 0).attr("r", h + v / 2).attr("class", "pieOuterCircle");
  const d = s.getSections(), A = De(d), D = [
    i.pie1,
    i.pie2,
    i.pie3,
    i.pie4,
    i.pie5,
    i.pie6,
    i.pie7,
    i.pie8,
    i.pie9,
    i.pie10,
    i.pie11,
    i.pie12
  ];
  let E = 0;
  d.forEach((r) => {
    E += r;
  });
  const W = A.filter((r) => (r.data.value / E * 100).toFixed(0) !== "0"), b = le(D);
  u.selectAll("mySlices").data(W).enter().append("path").attr("d", C).attr("fill", (r) => b(r.data.label)).attr("class", "pieCircle"), u.selectAll("mySlices").data(W).enter().append("text").text((r) => (r.data.value / E * 100).toFixed(0) + "%").attr("transform", (r) => "translate(" + $.centroid(r) + ")").style("text-anchor", "middle").attr("class", "slice"), u.append("text").text(s.getDiagramTitle()).attr("x", 0).attr("y", -400 / 2).attr("class", "pieTitleText");
  const O = [...d.entries()].map(([r, M]) => ({
    label: r,
    value: M
  })), k = u.selectAll(".legend").data(O).enter().append("g").attr("class", "legend").attr("transform", (r, M) => {
    const R = n + c, B = R * O.length / 2, V = 12 * n, U = M * R - B;
    return "translate(" + V + "," + U + ")";
  });
  k.append("rect").attr("width", n).attr("height", n).style("fill", (r) => b(r.label)).style("stroke", (r) => b(r.label)), k.append("text").attr("x", n + c).attr("y", n - c).text((r) => s.getShowData() ? `${r.label} [${r.value}]` : r.label);
  const _ = Math.max(
    ...k.selectAll("text").nodes().map((r) => (r == null ? void 0 : r.getBoundingClientRect().width) ?? 0)
  ), P = y + t + n + c + _;
  m.attr("viewBox", `0 0 ${P} ${g}`), ae(m, g, P, l.useMaxWidth);
}, "draw"), $e = { draw: Ce }, ze = {
  parser: ye,
  db: L,
  renderer: $e,
  styles: Ae
};
export {
  ze as diagram
};
