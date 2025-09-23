import ImageParent from "./Image"
import PreviewGroup from "./PreviewGroup"

import type { ImageProps } from "./type"
import type { ReactNode } from "react"

export interface IImage {
  (props: ImageProps): ReactNode
  PreviewGroup: typeof PreviewGroup
}

const Image = ImageParent as unknown as IImage
Image.PreviewGroup = PreviewGroup

export default Image
export { default as PreviewGroup } from "./PreviewGroup"
export type * from "./type"
