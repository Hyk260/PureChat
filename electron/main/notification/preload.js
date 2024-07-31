import { ipcRenderer, contextBridge } from 'electron'
import {
  NOTIFICATION_SHOW_CHANNEL,
  NOTIFICATION_CLOSE_CHANNEL,
  NOTIFICATION_ON_CLICK_CHANNEL
} from './constants'

let timeout = null

ipcRenderer.on(NOTIFICATION_SHOW_CHANNEL, (_, data) => {
  let duration; // 通知持续时间

  if (data) {
    // 如果有数据，设置持续时间
    duration = data.duration || 2000; // 默认持续时间为2000毫秒

    // 根据数据的自定义标志，选择不同的处理方式
    if (data.custom) {
      const { title, body, icon, extraData } = data; // 解构数据

      // 触发自定义事件，传递通知信息
      window.dispatchEvent(
        new CustomEvent('notification-message', {
          detail: { title, body, icon, extraData }
        })
      );
    } else {
      // 如果不是自定义通知，调用h函数显示通知
      h(data.title, data.body, data.icon, data.extraData);
    }
  } else {
    // 如果没有数据，设置默认持续时间
    duration = 2000;
  }

  // 清除之前的定时器
  if (timeout) clearTimeout(timeout);

  // 设置定时器，发送关闭通知的消息
  timeout = setTimeout(() => {
    ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, false);
  }, duration);
});

contextBridge.exposeInMainWorld('notification', {
  close: () => {
    ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, true)
  },
  doClick: (extraData) => {
    ipcRenderer.send(NOTIFICATION_ON_CLICK_CHANNEL, extraData)
  }
})

contextBridge.exposeInMainWorld('electron', {})

function h(
  title,
  subtitle,
  icon,
  extraData
) {
  while (document.body.firstChild) {
    document.body.firstChild.remove()
  }

  const container = document.createElement('div')
  container.classList.add('n')

  if (extraData) {
    container.addEventListener('click', () => {
      ipcRenderer.send(NOTIFICATION_ON_CLICK_CHANNEL, extraData)
    })
  }

  if (icon) {
    const header = document.createElement('div')
    header.classList.add('hd')
    const img = document.createElement('img')
    img.src = icon
    img.alt = ''
    header.appendChild(img)

    container.appendChild(header)
  }

  const body = document.createElement('div')
  body.classList.add('bd')

  const h4 = document.createElement('h4')
  h4.innerText = title
  body.appendChild(h4)

  if (subtitle) {
    const p = document.createElement('p')
    p.innerText = subtitle
    body.appendChild(p)
  }

  container.appendChild(body)

  document.body.appendChild(container)

  const close = document.createElement('div')
  close.classList.add('close')

  close.addEventListener('click', () => {
    ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, true)
  })

  document.body.appendChild(close)
}
