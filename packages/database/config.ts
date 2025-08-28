// 基础用户信息结构
const BaseUserProfile = {
  userID: "",
  nick: "",
  gender: "",
  birthday: 0,
  location: "",
  selfSignature: "",
  allowType: "",
  language: 0,
  avatar: "",
  messageSettings: 0,
  adminForbidType: "",
  level: 0,
  role: 0,
  lastUpdatedTime: 0,
  profileCustomField: []
};

// 用户信息结构
export const UserProfile = {
  ...BaseUserProfile,
  userID: "admin",
  nick: "admin",
  avatar: "avatar"
};

// 对话列表
export const ConversationList = {
  conversationID: "",
  unreadCount: 0,
  type: "C2C",
  lastMessage: {
    lastTime: 0,
    lastSequence: 0,
    fromAccount: "",
    type: "",
    payload: {
      text: "",
    },
    cloudCustomData: "",
    isRevoked: false,
    onlineOnlyFlag: false,
    nick: "",
    nameCard: "",
    version: 0,
    isPeerRead: false,
    revoker: null,
    messageForShow: "",
  },
  peerReadTime: 0,
  groupAtInfoList: [],
  remark: "",
  isPinned: false,
  messageRemindType: "AcceptAndNotify",
  markList: [],
  customData: "",
  conversationGroupList: [],
  draftText: "",
  userProfile: {
    ...BaseUserProfile
  },
  subType: "",
};

// 基础消息元素
export const BaseElemMessage = {
  ID: "",
  conversationID: "",
  conversationType: "C2C",
  time: 0,
  sequence: 0,
  clientSequence: 0,
  random: 0,
  priority: "Normal",
  nick: "",
  avatar: "",
  isPeerRead: false,
  nameCard: "",
  hasRiskContent: false,
  isPlaceMessage: 0,
  isRevoked: false,
  from: "",
  to: "",
  flow: "out",
  isSystemMessage: false,
  protocol: "JSON",
  isResend: false,
  isRead: true,
  status: "success",
  atUserList: [],
  cloudCustomData: "",
  isDeleted: false,
  isModified: false,
  clientTime: 0,
  senderTinyID: "",
  needReadReceipt: false,
  version: "0",
  isBroadcastMessage: false,
  isSupportExtension: false,
  revoker: "",
  revokeReason: "",
  payload: {},
  type: "",
};

export const ProvidersList = [
  {
    ...BaseUserProfile,
    userID: "@RBT#001",
    nick: "OpenAI",
    selfSignature:
      "OpenAI 是全球领先的人工智能研究机构，其开发的模型如GPT系列推动了自然语言处理的前沿。OpenAI 致力于通过创新和高效的AI解决方案改变多个行业。他们的产品具有显著的性能和经济性，广泛用于研究、商业和创新应用。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "OpenAI",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://openai.com/",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#002",
    nick: "ZhiPu",
    selfSignature:
      "智谱 AI 提供多模态与语言模型的开放平台，支持广泛的AI应用场景，包括文本处理、图像理解与编程辅助等。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "ZhiPu",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://zhipuai.cn",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#003",
    nick: "ZeroOne",
    selfSignature:
      "01.AI 专注于AI 2.0时代的人工智能技术，大力推动“人+人工智能”的创新和应用，采用超强大模型和先进AI技术以提升人类生产力，实现技术赋能。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "01.AI",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://www.lingyiwanwu.com/",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#004",
    nick: "Qwen",
    selfSignature:
      "通义千问是阿里云自主研发的超大规模语言模型，具有强大的自然语言理解和生成能力。它可以回答各种问题、创作文字内容、表达观点看法、撰写代码等，在多个领域发挥作用。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#005",
    nick: "Ollama",
    selfSignature:
      "Ollama 提供的模型广泛涵盖代码生成、数学运算、多语种处理和对话互动等领域，支持企业级和本地化部署的多样化需求。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "Ollama",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://ollama.com/",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#006",
    nick: "GitHub",
    selfSignature: "通过GitHub模型，开发人员可以成为AI工程师，并使用行业领先的AI模型进行构建。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "GitHub",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://github.com/marketplace/models",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#007",
    nick: "DeepSeek",
    selfSignature:
      "DeepSeek 是一家专注于人工智能技术研究和应用的公司，其最新模型 DeepSeek-V3 多项评测成绩超越 Qwen2.5-72B 和 Llama-3.1-405B 等开源模型，性能对齐领军闭源模型 GPT-4o 与 Claude-3.5-Sonnet。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "DeepSeek",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://deepseek.com",
      },
    ],
  },
  {
    ...BaseUserProfile,
    userID: "@RBT#008",
    nick: "Mistral",
    selfSignature:
      "Mistral 提供先进的通用、专业和研究型模型，广泛应用于复杂推理、多语言任务、代码生成等领域，通过功能调用接口，用户可以集成自定义功能，实现特定应用。",
    profileCustomField: [
      {
        key: "Tag_Profile_Custom_Provider",
        value: "Mistral",
      },
      {
        key: "Tag_Profile_Custom_Homepage",
        value: "https://docs.mistral.ai/getting-started/models",
      },
    ],
  },
];
