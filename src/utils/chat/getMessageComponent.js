import FileElemItem from "@/views/chatStudio/ElemItemTypes/FileElemItem.vue";
import ImageElemItem from "@/views/chatStudio/ElemItemTypes/ImageElemItem.vue";
import RelayElemItem from "@/views/chatStudio/ElemItemTypes/RelayElemItem.vue";
import TextElemItem from "@/views/chatStudio/ElemItemTypes/TextElemItem.vue";
import TipsElemItem from "@/views/chatStudio/ElemItemTypes/TipsElemItem.vue";
import CustomElemItem from "@/views/chatStudio/ElemItemTypes/CustomElemItem.vue";
import GroupTipElement from "@/views/chatStudio/ElemItemTypes/GroupTipElement.vue";
import GroupSystemNoticeElem from "@/views/chatStudio/ElemItemTypes/GroupSystemNoticeElem.vue";

const MESSAGE_COMPONENT_MAP = {
  TIMTextElem: TextElemItem, //文本消息
  TIMRelayElem: RelayElemItem, // 合并转发消息
  TIMImageElem: ImageElemItem, // 图片消息
  TIMFileElem: FileElemItem, // 文件消息
  TIMCustomElem: CustomElemItem, // 自定义消息
  TIMGroupTipElem: GroupTipElement, // 群消息提示
  TIMGroupSystemNoticeElem: GroupSystemNoticeElem, // 系统通知
};

const componentCache = new Map();

/**
 * 根据消息类型获取对应的组件
 * @param {Object} item - 消息对象
 * @returns {Component|null} - 对应的组件或null
 */
export const getMessageComponent = (item) => {
  if (!item) return null;
  
  const { type, isRevoked, ID } = item;
  
  const cacheKey = `${type}_${isRevoked ? 'revoked' : 'normal'}_${ID}`;
  
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey);
  }
  
  let component = null;
  
  // 如果消息被撤回，返回提示组件
  if (isRevoked) {
    component = TipsElemItem;
  } else {
    // 根据消息类型返回对应组件
    component = MESSAGE_COMPONENT_MAP[type] || null;
  }
  
  componentCache.set(cacheKey, component);
  
  return component;
};

/**
 * 清理组件缓存
 */
export const clearComponentCache = () => {
  componentCache.clear();
};

/**
 * 获取缓存统计信息
 */
export const getCacheStats = () => {
  return {
    size: componentCache.size,
    keys: Array.from(componentCache.keys())
  };
};

/**
 * 获取所有可用的消息组件类型
 */
export const getAvailableMessageTypes = () => {
  return Object.keys(MESSAGE_COMPONENT_MAP);
};

/**
 * 测试组件获取性能
 * @param {Array} messages - 消息数组
 * @returns {Object} - 性能测试结果
 */
export const testComponentPerformance = (messages) => {
  const startTime = performance.now();
  const results = [];
  
  for (let i = 0; i < 1000; i++) {
    messages.forEach(item => {
      const component = getMessageComponent(item);
      results.push(component);
    });
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  return {
    duration,
    iterations: 1000,
    messagesCount: messages.length,
    totalCalls: results.length,
    averageTimePerCall: duration / results.length,
    cacheSize: componentCache.size
  };
};