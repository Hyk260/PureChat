import { ElNotification, ElButton } from "element-plus";
import { setCookie, getCookie } from "@/utils/cookie";
import { isElectron } from "@/utils/common";
import { isDev } from "@/config/env";
import { $t } from "@/locales/index";
import { h } from "vue";

let Notification = null;

function setPageNotif() {
  !getCookie("onUpdate") && setCookie("onUpdate", true, 1);
}

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
            setPageNotif();
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
            setPageNotif();
          },
        },
        () => $t("system.updateConfirm")
      ),
    ]),
    duration: 6000,
  });
}

async function getHtmlBuildTime() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseURL}index.html`);

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || "";

  return buildTime;
}

export function setupAppVersionNotification() {
  if (isElectron) return;
  document.addEventListener("visibilitychange", async () => {
    if (isDev) return;
    if (getCookie("onUpdate")) return;
    const buildTime = await getHtmlBuildTime();
    const BUILD_TIME = __APP_INFO__.lastBuildTime;
    if (
      !isDev &&
      buildTime !== "undefined" &&
      buildTime !== BUILD_TIME &&
      document.visibilityState === "visible"
    ) {
      notify();
    }
  });
}
