import type { DivProps, SvgProps } from "@/types"
import type { ReactNode, Ref } from "react"

type IconProps = SvgProps & DivProps

export interface FileTypeIconProps extends IconProps {
  color?: string
  filetype?: string
  icon?: ReactNode
  ref?: Ref<HTMLDivElement>
  size?: number
  type?: "file" | "folder"
  variant?: "color" | "mono"
}
