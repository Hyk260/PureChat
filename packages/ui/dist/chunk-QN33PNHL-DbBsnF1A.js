import { _ as a, e as w, l as x } from "./mermaid.core-CmI31nLO.js";
var d = /* @__PURE__ */ a((e, t, i, o) => {
  e.attr("class", i);
  const { width: r, height: h, x: n, y: c } = u(e, t);
  w(e, h, r, o);
  const s = l(n, c, r, h, t);
  e.attr("viewBox", s), x.debug(`viewBox configured: ${s} with padding: ${t}`);
}, "setupViewPortForSVG"), u = /* @__PURE__ */ a((e, t) => {
  var o;
  const i = ((o = e.node()) == null ? void 0 : o.getBBox()) || { width: 0, height: 0, x: 0, y: 0 };
  return {
    width: i.width + t * 2,
    height: i.height + t * 2,
    x: i.x,
    y: i.y
  };
}, "calculateDimensionsWithPadding"), l = /* @__PURE__ */ a((e, t, i, o, r) => `${e - r} ${t - r} ${i} ${o}`, "createViewBox");
export {
  d as s
};
