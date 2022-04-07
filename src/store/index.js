import { createStore } from "vuex";
import storeLocal from "storejs"
/**
 * 不需要手动导入应用模块
 * 自动导入模块文件中的所有vuex模块
 */
 const modulesFiles = require.context('./modules', true, /\.js$/)
 const modules = modulesFiles.keys().reduce((modules, modulePath) => {
   // set './app.js' => 'app'
   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
   const value = modulesFiles(modulePath)
   modules[moduleName] = value.default
   return modules
 }, {})

export default createStore({
  modules,
  state: {
    enableScrolling: true, // 滚动条
    // songlistIds: null, // 用户收藏歌单ID
    // 用户喜欢歌曲
    liked: {
      songs: [], // 喜欢音乐列表
      songsWithDetails: [], // 只有前12首
      playlists: [], // 歌单
      albums: [], // 专辑
      artists: [], // 艺人
      mvs: [], // MV
      cloudDisk: [], // 云盘
      playHistory: [],
    },
    toast: {
      show: false,
      text: '',
      timer: null,
    },
    modals: {
      addTrackToPlaylistModal: {
        show: false,
        selectedTrackID: 0,
      },
      // 新建歌单
      newPlaylistModal: {
        show: false,
        afterCreateAddTrackID: 0,
      },
    },
    dailyTracks: [], // 每日推荐歌曲ID
    showLyrics: false, // 歌词页
    // data: storeLocal.get('data') || account, // 用户信息
    player: storeLocal.get('player'), // 播放实例
    // settings: storeLocal.get('settings') || DefaultSetting, // 全局设置s
  },
  mutations: {},
  actions: {},
  modules: {},
});
