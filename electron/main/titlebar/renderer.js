import {
  TITLE_BAR_CHANNEL,
  TITLE_BAR_MAXIMIZE_REPLY_CHANNEL,
  TITLE_BAR_FULLSCREEN_REPLY_CHANNEL
} from './constants'

const SHADOW_ROOT_CSS = `
:host {
  position: relative;
  width: 100%;
  height: 32px;
  display: block;
  -webkit-user-select: none;
  --tb-title-font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI';
  --tb-control-height: 32px;
  --tb-control-width: 34px;
  --tb-control-margin: 3px;
  --tb-control-radius: 5px;
  background-color: var(--tb-theme-color, #eee);
  // --tb-title-text-color: #333333;
  // --tb-control-symbol-color: #585c65;
  // --tb-control-hover-color: #e1e1e1;
  // --tb-control-close-symbol-color: #090909;
}
::slotted(:not(.window__control)) {
  display: none;
}
// @media (prefers-color-scheme: dark) {
//   :host {
//     background-color: var(--tb-theme-color, #000);
//     --tb-title-text-color: #cccccc;
//     --tb-control-symbol-color: #cccccc;
//     --tb-control-hover-color: #373737;
//     --tb-control-close-symbol-color: #fcfcfc;
//   }
// }
.titlebar__drag-region {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}
.titlebar__title {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  font-family: var(--tb-title-font-family);
  font-size: 14px;
  font-weight: normal;
  color: var(--tb-title-text-color);
}
.titlebar__title.mac {
  justify-content: center;
  font-weight: 600;
}
.titlebar__window-controls {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  -webkit-app-region: no-drag;
}
.titlebar__window-controls.mac {
  margin-top: var(--tb-control-margin);
  margin-right: var(--tb-control-margin);
}
.titlebar__window-controls.mac ::slotted(.window__control) {
  border-radius: var(--tb-control-radius);
}
.window__control, ::slotted(.window__control) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tb-control-width);
  min-width: 34px;
  height: var(--tb-control-height);
  min-height: 26px;
}
.window__control .window__control-icon {
  position: absolute;
  height: 10px;
  width: 10px;
  box-sizing: border-box;
}
.window__control:hover, ::slotted(.window__control:hover) {
  background-color: var(--tb-control-hover-color);
}
.window__control-min .window__control-icon:before {
  content: "";
  position: relative;
  top: 4px;
  display: flex;
  border-top: 1px solid var(--tb-control-symbol-color);
}
.window__control-max .window__control-icon {
  border: 1px solid var(--tb-control-symbol-color);
}
.window__control-max.window__control-max_active .window__control-icon {
  position: relative;
  border: none;
}
.window__control-max.window__control-max_active .window__control-icon:before,
.window__control-max.window__control-max_active .window__control-icon:after {
  content: '';
  display: block;
  position: absolute;
  border: 1px solid var(--tb-control-symbol-color);
}
.window__control-max.window__control-max_active .window__control-icon:before {
  left: 0;
  bottom: 0;
  width: 6px;
  height: 6px;
}
.window__control-max.window__control-max_active .window__control-icon:after {
  top: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-left: 0;
  border-bottom: 0;
  background: linear-gradient(to left, var(--tb-control-symbol-color) 1px, transparent 0) no-repeat bottom right / 1px 1px, linear-gradient(to left, var(--tb-control-symbol-color) 1px, transparent 0) no-repeat top left / 1px 1px;
}
.window__control-close:hover {
  background-color: #F45454;
}
.window__control-close:hover .window__control-icon:before,
.window__control-close:hover .window__control-icon:after {
  background-color: #fff;
}
.window__control-close .window__control-icon:before,
.window__control-close .window__control-icon:after {
  content: '';
  position: absolute;
  top: 50%;
  left: -1px;
  width: 12px;
  height: 1px;
  background-color: var(--tb-control-close-symbol-color);
}
.window__control-close .window__control-icon:before {
  transform: rotate(45deg) translateZ(0);
}
.window__control-close .window__control-icon:after {
  transform: rotate(-45deg) translateZ(0);
}
`
const core = ((globalThis || window).uikit ||
  (globalThis || window).electron)

export default class TitleBar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    if (!(window && window?.api?.isTitlebar)) return null

    const style = document.createElement('style')
    style.textContent = SHADOW_ROOT_CSS
    shadow.appendChild(style)

    const isMacintosh = core.process.platform === 'darwin'

    const overlay = this.hasAttribute('overlay')

    if (!overlay) {
      const el = document.createElement('div')
      el.classList.add('titlebar__drag-region')
      shadow.appendChild(el)

      const title = this.getAttribute('windowtitle')

      if (title) {
        const el = document.createElement('div')
        el.classList.add('titlebar__title')
        if (isMacintosh) {
          el.classList.add('mac')
        }
        el.innerText = title
        shadow.appendChild(el)
      }
    }

    if (!isMacintosh || this.hasChildNodes()) {
      const controls = document.createElement('div')
      controls.classList.add('titlebar__window-controls')

      if (isMacintosh) {
        controls.classList.add('mac')
      }

      controls.appendChild(document.createElement('slot'))

      if (!isMacintosh) {
        const minimizable = !this.hasAttribute('nominimize')

        if (minimizable) {
          const el = document.createElement('div')
          el.classList.add('window__control', 'window__control-min')

          const icon = document.createElement('span')
          icon.classList.add('window__control-icon')

          el.appendChild(icon)

          el.addEventListener('click', () => {
            core.ipcRenderer.send(TITLE_BAR_CHANNEL, 'minimize')
          })

          controls.appendChild(el)
        }

        const maximizable = !this.hasAttribute('nomaximize')

        if (maximizable) {
          const el = document.createElement('div')
          el.classList.add('window__control', 'window__control-max')

          const icon = document.createElement('span')
          icon.classList.add('window__control-icon')

          el.appendChild(icon)

          el.addEventListener('click', () => {
            core.ipcRenderer.send(TITLE_BAR_CHANNEL, 'maximizeOrUnmaximize')
          })

          core.ipcRenderer.on(
            TITLE_BAR_MAXIMIZE_REPLY_CHANNEL,
            (_, maximized) => {
              if (maximized === 1) {
                el.classList.add('window__control-max_active')
              } else {
                el.classList.remove('window__control-max_active')
              }
            }
          )

          controls.appendChild(el)
        }

        const closable = !this.hasAttribute('noclose')

        if (closable) {
          const el = document.createElement('div')
          el.classList.add('window__control', 'window__control-close')

          const icon = document.createElement('span')
          icon.classList.add('window__control-icon')

          el.appendChild(icon)

          el.addEventListener('click', () => {
            core.ipcRenderer.send(TITLE_BAR_CHANNEL, 'close')
          })

          controls.appendChild(el)
        }
      }

      shadow.appendChild(controls)
    }

    const fullscreenable = this.hasAttribute('supportfullscreen')

    if (fullscreenable) {
      core.ipcRenderer.on(
        TITLE_BAR_FULLSCREEN_REPLY_CHANNEL,
        (_, fullscreen) => {
          const root = this.shadowRoot

          if (root) {
            const region = root.querySelector(
              '.titlebar__drag-region'
            )
            if (region) {
              region.style['app-region'] = fullscreen === 1 ? 'no-drag' : ''
            }

            const controls = root.querySelector(
              '.titlebar__window-controls'
            )

            if (controls) {
              controls.style.display = fullscreen === 1 ? 'none' : ''
            }
          }
        }
      )
    }
  }
}

customElements.define('title-bar', TitleBar)
