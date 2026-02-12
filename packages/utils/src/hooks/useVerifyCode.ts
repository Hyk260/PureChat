import { ref } from "vue"
import { cloneDeep } from "lodash-es"
import type { FormInstance, FormItemProp } from "element-plus"

export const useVerifyCode = () => {
  const isDisabled = ref(false)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)
  const text = ref("")

  const start = async (formEl: FormInstance | undefined, props: FormItemProp, time = 60) => {
    if (!formEl) return
    const initTime = cloneDeep(time)
    await formEl.validateField(props, (isValid) => {
      if (isValid) {
        if (timer.value) {
          clearInterval(timer.value)
        }
        isDisabled.value = true
        text.value = `${time}`
        timer.value = setInterval(() => {
          if (time > 0) {
            time -= 1
            text.value = `${time}`
          } else {
            text.value = ""
            isDisabled.value = false
            if (timer.value) {
              clearInterval(timer.value)
            }
            time = initTime
          }
        }, 1000)
      }
    })
  }

  const end = () => {
    text.value = ""
    isDisabled.value = false
    if (timer.value) {
      clearInterval(timer.value)
    }
  }

  return {
    isDisabled,
    timer,
    text,
    start,
    end,
  }
}
