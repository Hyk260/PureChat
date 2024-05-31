import SvgIcon from "@/components/SvgIcon";

export const registerSvgIcon = (app) => {
  app.component("SvgIcon", SvgIcon); // 注册全局组件
  const req = require.context("./", true, /\.svg$/);
  const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);
  };
  requireAll(req);
};
