import { h } from 'vue';
import { ElNotification, ElButton } from "element-plus";
import { isDev } from "@/config/env";
import { $t } from './i18n';

export function setupAppVersionNotification() {
  document.addEventListener('visibilitychange', async () => {
    const buildTime = await getHtmlBuildTime();
    const BUILD_TIME = __APP_INFO__.lastBuildTime

    if (!isDev && buildTime !== BUILD_TIME && document.visibilityState === 'visible') {
      const Notification = ElNotification({
        title: '检测到系统有新版本发布，是否立即刷新页面？',
        dangerouslyUseHTMLString: true,
        message:
          h('div', [
            h(
              ElButton,
              { onClick() { Notification.close() } },
              () => $t('system.updateCancel')
            ),
            h(
              ElButton,
              { type: 'primary', onClick() { location.reload() } },
              () => $t('system.updateConfirm')
            )
          ]),
        duration: 0, // 6000
        // onClick: () => {
        //   Notification.close();
        // },
      });
    }
  });
}

async function getHtmlBuildTime() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseURL}index.html`);

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || '';

  return buildTime;
}
