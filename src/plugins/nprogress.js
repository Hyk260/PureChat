import NProgress from 'nprogress';
import "nprogress/nprogress.css";

/** Setup plugin NProgress */
export function setupNProgress() {
  NProgress.configure({
    // 动画方式
    easing: "ease",
    // 递增进度条的速度
    speed: 500,
    // 是否显示加载icon
    showSpinner: false,
    // 自动递增间隔
    trickleSpeed: 200,
    // 初始化时的最小百分比
    minimum: 0.3, // 0.3
  });

  // mount on window
  window.NProgress = NProgress;
}

export default NProgress;