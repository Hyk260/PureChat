import { kebabCase } from "lodash-es"

export const useFillId = (namespace: string) => {
  const id = `icons-${kebabCase(namespace)}-fill`
  return () => ({ fill: `url(#${id})`, id })
}
