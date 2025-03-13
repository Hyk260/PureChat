// 主窗口
global.mainWin = null;

// 主窗口配置
global.mainWinOptions = {
  width: 1080,
  height: 700,
  minWidth: 1080,
  minHeight: 700,
};

// 登录窗口配置
global.loginWinOptions = {
  width: 380,
  height: 550,
  maxWidth: 380,
  maxHeight: 550,
  minWidth: 380,
  minHeight: 550,
  frame: false, // 创建无边框窗口
  resizable: false, //禁止改变窗口尺寸
};

export const titleBarOverlayDark = {
  height: 32,
  color: 'rgba(0,0,0,0)',
  symbolColor: '#ffffff'
}

export const titleBarOverlayLight = {
  height: 32,
  color: 'rgba(255,255,255,0)',
  symbolColor: '#000000'
}
