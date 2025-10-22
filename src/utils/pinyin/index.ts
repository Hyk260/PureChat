let pinyinProModule: any = null
let isPinyinProLoaded = false
let isPinyinProLoading = false

/**
 * 动态导入 pinyin-pro 模块
 */
async function loadPinyinPro(): Promise<any> {
  if (isPinyinProLoaded && pinyinProModule) {
    return pinyinProModule
  }

  if (isPinyinProLoading) {
    // 如果正在加载中，等待加载完成
    return new Promise((resolve) => {
      const checkLoaded = () => {
        if (isPinyinProLoaded && pinyinProModule) {
          resolve(pinyinProModule)
        } else {
          setTimeout(checkLoaded, 50)
        }
      }
      checkLoaded()
    })
  }

  try {
    isPinyinProLoading = true
    const module = await import("pinyin-pro")
    pinyinProModule = module
    isPinyinProLoaded = true
    console.log("pinyin-pro 模块加载成功")
    return module
  } catch (error) {
    console.warn("pinyin-pro 模块加载失败，将使用兜底方案:", error)
    isPinyinProLoaded = false
    pinyinProModule = null
    return null
  } finally {
    isPinyinProLoading = false
  }
}

/**
 * 兜底方案：简单的文本字符串匹配
 * @param text 要匹配的文本
 * @param searchStr 搜索字符串
 * @returns 匹配结果数组
 */
function fallbackTextMatch(text: string, searchStr: string): string[] {
  if (!text || !searchStr) return []

  const lowerText = text.toLowerCase()
  const lowerSearchStr = searchStr.toLowerCase()

  // 直接包含匹配
  if (lowerText.includes(lowerSearchStr)) {
    return [searchStr]
  }

  // 首字母匹配
  const firstChars = text
    .split("")
    .map((char) => {
      // 简单的首字母提取（仅处理常见中文字符）
      if (/[\u4e00-\u9fa5]/.test(char)) {
        return getSimplePinyin(char)
      }
      return char.toLowerCase()
    })
    .join("")

  if (firstChars.includes(lowerSearchStr)) {
    return [searchStr]
  }

  return []
}

/**
 * 简单的拼音首字母提取（兜底方案）
 * 仅处理部分常见中文字符
 */
function getSimplePinyin(char: string): string {
  const pinyinMap: Record<string, string> = {
    阿: "a",
    爱: "a",
    安: "a",
    按: "a",
    案: "a",
    把: "b",
    白: "b",
    百: "b",
    帮: "b",
    包: "b",
    保: "b",
    报: "b",
    被: "b",
    本: "b",
    比: "b",
    必: "b",
    变: "b",
    表: "b",
    别: "b",
    不: "b",
    才: "c",
    参: "c",
    草: "c",
    层: "c",
    查: "c",
    长: "c",
    常: "c",
    场: "c",
    车: "c",
    成: "c",
    城: "c",
    程: "c",
    出: "c",
    处: "c",
    传: "c",
    创: "c",
    此: "c",
    从: "c",
    大: "d",
    代: "d",
    带: "d",
    当: "d",
    到: "d",
    道: "d",
    得: "d",
    的: "d",
    地: "d",
    第: "d",
    点: "d",
    电: "d",
    调: "d",
    定: "d",
    动: "d",
    都: "d",
    读: "d",
    对: "d",
    多: "d",
    而: "e",
    二: "e",
    发: "f",
    法: "f",
    反: "f",
    方: "f",
    放: "f",
    非: "f",
    分: "f",
    风: "f",
    服: "f",
    复: "f",
    该: "g",
    改: "g",
    干: "g",
    感: "g",
    高: "g",
    告: "g",
    格: "g",
    个: "g",
    给: "g",
    工: "g",
    公: "g",
    功: "g",
    共: "g",
    构: "g",
    够: "g",
    故: "g",
    关: "g",
    观: "g",
    管: "g",
    光: "g",
    规: "g",
    国: "g",
    过: "g",
    还: "h",
    海: "h",
    好: "h",
    号: "h",
    和: "h",
    河: "h",
    黑: "h",
    很: "h",
    红: "h",
    后: "h",
    候: "h",
    话: "h",
    化: "h",
    划: "h",
    画: "h",
    回: "h",
    会: "h",
    活: "h",
    火: "h",
    机: "j",
    基: "j",
    及: "j",
    级: "j",
    即: "j",
    集: "j",
    几: "j",
    计: "j",
    记: "j",
    技: "j",
    加: "j",
    家: "j",
    间: "j",
    见: "j",
    建: "j",
    将: "j",
    交: "j",
    教: "j",
    接: "j",
    结: "j",
    解: "j",
    界: "j",
    今: "j",
    进: "j",
    经: "j",
    精: "j",
    九: "j",
    就: "j",
    据: "j",
    决: "j",
    绝: "j",
    开: "k",
    看: "k",
    可: "k",
    克: "k",
    空: "k",
    口: "k",
    快: "k",
    况: "k",
    困: "k",
    来: "l",
    老: "l",
    乐: "l",
    类: "l",
    离: "l",
    理: "l",
    力: "l",
    历: "l",
    立: "l",
    利: "l",
    连: "l",
    两: "l",
    量: "l",
    了: "l",
    料: "l",
    列: "l",
    流: "l",
    六: "l",
    路: "l",
    论: "l",
    马: "m",
    满: "m",
    毛: "m",
    没: "m",
    每: "m",
    美: "m",
    门: "m",
    面: "m",
    民: "m",
    名: "m",
    明: "m",
    命: "m",
    模: "m",
    目: "m",
    那: "n",
    内: "n",
    能: "n",
    你: "n",
    年: "n",
    念: "n",
    女: "n",
    欧: "o",
    排: "p",
    派: "p",
    判: "p",
    配: "p",
    片: "p",
    平: "p",
    评: "p",
    破: "p",
    普: "p",
    七: "q",
    其: "q",
    起: "q",
    气: "q",
    前: "q",
    钱: "q",
    强: "q",
    切: "q",
    亲: "q",
    清: "q",
    情: "q",
    请: "q",
    求: "q",
    取: "q",
    去: "q",
    全: "q",
    确: "q",
    然: "r",
    让: "r",
    人: "r",
    认: "r",
    任: "r",
    日: "r",
    如: "r",
    入: "r",
    三: "s",
    色: "s",
    山: "s",
    上: "s",
    少: "s",
    设: "s",
    社: "s",
    身: "s",
    深: "s",
    生: "s",
    声: "s",
    时: "s",
    实: "s",
    使: "s",
    世: "s",
    事: "s",
    是: "s",
    手: "s",
    首: "s",
    受: "s",
    书: "s",
    数: "s",
    水: "s",
    说: "s",
    思: "s",
    死: "s",
    四: "s",
    送: "s",
    算: "s",
    随: "s",
    所: "s",
    他: "t",
    她: "t",
    它: "t",
    台: "t",
    太: "t",
    态: "t",
    谈: "t",
    特: "t",
    提: "t",
    题: "t",
    体: "t",
    天: "t",
    条: "t",
    听: "t",
    通: "t",
    同: "t",
    头: "t",
    投: "t",
    图: "t",
    土: "t",
    推: "t",
    退: "t",
    外: "w",
    完: "w",
    万: "w",
    王: "w",
    网: "w",
    往: "w",
    望: "w",
    为: "w",
    位: "w",
    文: "w",
    问: "w",
    我: "w",
    无: "w",
    五: "w",
    物: "w",
    西: "x",
    息: "x",
    希: "x",
    系: "x",
    下: "x",
    先: "x",
    现: "x",
    线: "x",
    相: "x",
    想: "x",
    向: "x",
    小: "x",
    校: "x",
    些: "x",
    心: "x",
    新: "x",
    信: "x",
    行: "x",
    形: "x",
    型: "x",
    性: "x",
    学: "x",
    血: "x",
    压: "y",
    呀: "y",
    言: "y",
    眼: "y",
    样: "y",
    要: "y",
    也: "y",
    一: "y",
    已: "y",
    以: "y",
    意: "y",
    因: "y",
    应: "y",
    用: "y",
    由: "y",
    有: "y",
    又: "y",
    右: "y",
    于: "y",
    与: "y",
    语: "y",
    元: "y",
    原: "y",
    员: "y",
    远: "y",
    月: "y",
    越: "y",
    云: "y",
    运: "y",
    在: "z",
    再: "z",
    早: "z",
    造: "z",
    则: "z",
    怎: "z",
    增: "z",
    展: "z",
    站: "z",
    张: "z",
    找: "z",
    照: "z",
    这: "z",
    真: "z",
    正: "z",
    政: "z",
    知: "z",
    直: "z",
    只: "z",
    指: "z",
    至: "z",
    制: "z",
    治: "z",
    中: "z",
    重: "z",
    主: "z",
    住: "z",
    注: "z",
    专: "z",
    转: "z",
    装: "z",
    状: "z",
    准: "z",
    资: "z",
    子: "z",
    自: "z",
    字: "z",
    总: "z",
    走: "z",
    足: "z",
    最: "z",
    作: "z",
    做: "z",
  }

  return pinyinMap[char] || char.toLowerCase()
}

/**
 * 拼音匹配函数（支持动态导入和兜底方案）
 * @param text 要匹配的文本
 * @param searchStr 搜索字符串
 * @returns 匹配结果数组
 */
export async function matchPinyin(text: string, searchStr: string): Promise<string[]> {
  try {
    const pinyinPro = await loadPinyinPro()
    if (pinyinPro?.match) {
      return pinyinPro.match(text, searchStr) || []
    }
  } catch (error) {
    console.warn("pinyin-pro match 函数调用失败:", error)
  }

  return fallbackTextMatch(text, searchStr)
}

/**
 * 同步版本的拼音匹配函数（优先使用缓存）
 * @param text 要匹配的文本
 * @param searchStr 搜索字符串
 * @returns 匹配结果数组
 */
export function matchPinyinSync(text: string, searchStr: string): string[] {
  if (isPinyinProLoaded && pinyinProModule?.match) {
    try {
      return pinyinProModule.match(text, searchStr) || []
    } catch (error) {
      console.warn("pinyin-pro match 函数调用失败:", error)
    }
  }

  return fallbackTextMatch(text, searchStr)
}

/**
 * 预加载 pinyin-pro 模块
 */
export async function preloadPinyinPro(): Promise<void> {
  try {
    await loadPinyinPro()
  } catch (error) {
    console.warn("pinyin-pro 预加载失败:", error)
  }
}

/**
 * 获取 pinyin-pro 模块状态
 */
export function getPinyinProStatus() {
  return {
    isLoaded: isPinyinProLoaded,
    isLoading: isPinyinProLoading,
    hasModule: !!pinyinProModule,
  }
}
