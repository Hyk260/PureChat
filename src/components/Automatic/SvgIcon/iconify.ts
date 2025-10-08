import { defineAsyncComponent } from "vue"

let IconifyComponent = null
export function getIconify() {
  if (IconifyComponent) return IconifyComponent
  IconifyComponent = defineAsyncComponent(async () => {
    try {
      const mod = await import("@iconify/vue")
      return (mod as any).Icon
    } catch {
      throw new Error(
        'Optional dependency "@iconify/vue" is not installed. Please install it to enable language icons in code blocks.'
      )
    }
  })
  return IconifyComponent
}
