import { ipcRenderer, contextBridge } from 'electron'
import {
  NOTIFICATION_SHOW_CHANNEL,
  NOTIFICATION_CLOSE_CHANNEL,
  NOTIFICATION_ON_CLICK_CHANNEL
} from './constants'

let timeout = null

ipcRenderer.on(
  NOTIFICATION_SHOW_CHANNEL,
  (_, data) => {
    let ms
    if (data) {
      ms = data.duration
      if (data.custom) {
        const { title, body, icon, extraData } = data
        window.dispatchEvent(
          new CustomEvent('notification-message', {
            detail: { title, body, icon, extraData }
          })
        )
      } else {
        h(data.title, data.body, data.icon, data.extraData)
      }
    } else {
      ms = 2000
    }
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, false)
    }, ms)
  }
)

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
