// import { delay } from "lodash-es"

/**
 * 延迟执行函数
 * @param ms 延迟的毫秒数，默认为200毫秒
 * @returns Promise对象，在指定时间后resolve
 */
export const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

export const delay = sleep
