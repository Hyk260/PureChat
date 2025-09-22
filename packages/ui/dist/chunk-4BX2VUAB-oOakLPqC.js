import { _ as __name } from "./mermaid.core-BkqE_Jc4.js";
function populateCommonDb(ast, db) {
  var _a, _b, _c;
  if (ast.accDescr) {
    (_a = db.setAccDescription) == null ? void 0 : _a.call(db, ast.accDescr);
  }
  if (ast.accTitle) {
    (_b = db.setAccTitle) == null ? void 0 : _b.call(db, ast.accTitle);
  }
  if (ast.title) {
    (_c = db.setDiagramTitle) == null ? void 0 : _c.call(db, ast.title);
  }
}
__name(populateCommonDb, "populateCommonDb");
export {
  populateCommonDb as p
};
