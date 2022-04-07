// import { playlistsCategories } from '@/mock/Applist-data'

// const enabledPlaylistCategories = playlistsCategories.filter((c) => c.enable).map((c) => c.name)

const localStorage = {
  player: {}, // 播放器数据
  settings: {
    lang: 'zh-CN', // 默认语言
    musicLanguage: 'all', // 语种偏好
    appearance: 'auto', // 主题
    musicQuality: 320000, // 音质
    lyricFontSize: 16, // 歌词字体大小
    outputDevice: 'default',
    showPlaylistsByAppleMusic: true, // Apple Music歌单
    enableUnblockNeteaseMusic: true,
    automaticallyCacheSongs: true,
    cacheLimit: 8192,
    enableReversedMode: false,
    nyancatStyle: false, // 进度条样式
    showLyricsTranslation: true, // 歌词翻译
    lyricsBackground: true, // 歌词背景
    closeAppOption: 'ask',
    enableDiscordRichPresence: false,
    enableGlobalShortcut: true,
    showLibraryDefault: false,
    subTitleDefault: false, // 副标题使用别名
    // enabledPlaylistCategories,
    proxyConfig: {
      protocol: 'noProxy',
      server: '',
      port: null,
    },
    // shortcuts: shortcuts,
  },
  data: {
    user: {}, // 用户账号信息
    likedSongPlaylistID: 0, // 歌单ID libraryPlaylistFilter
    lastRefreshCookieDate: 0,
    libraryPlaylistFilter: '', // all mine liked
    loginMode: null, // 登录模式 account username
  },
}

export default localStorage
