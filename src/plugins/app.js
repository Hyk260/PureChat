import { ElNotification, ElButton } from "element-plus";
import { $t } from "@/locales/index";
import { h } from "vue";

let isShow = false;
let Notification = null;
const { DEV: isDev, PROD: isProd, VITE_AUTOMATICALLY_DETECT_UPDATE } = import.meta.env;

function notify() {
  if (Notification) Notification.close();
  Notification = ElNotification({
    title: $t("system.updateContent"),
    dangerouslyUseHTMLString: true,
    message: h("div", [
      h(
        ElButton,
        {
          onClick() {
            Notification.close();
          },
        },
        () => $t("system.updateCancel")
      ),
      h(
        ElButton,
        {
          type: "primary",
          onClick() {
            location.reload();
            Notification.close();
          },
        },
        () => $t("system.updateConfirm")
      ),
    ]),
    onClose: () => {
      isShow = false;
    },
    duration: 6000,
  });
}

async function getHtmlBuildTime() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseURL}index.html?time=${Date.now()}`);

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || "";

  return buildTime;
}

const checkForUpdates = async () => {
  if (isShow) return;

  const buildTime = await getHtmlBuildTime();

  const BUILD_TIME = __APP_INFO__.lastBuildTime;

  // If build time hasn't changed, no update is needed
  if (buildTime === BUILD_TIME) {
    return;
  }

  isShow = true;

  notify();
};

export function setupAppVersionNotification() {
  if (isDev || __IS_ELECTRON__) return;
  const canAutoUpdateApp = VITE_AUTOMATICALLY_DETECT_UPDATE === 'Y' && isProd;
  if (!canAutoUpdateApp) return;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkForUpdates();
    }
  });
}
