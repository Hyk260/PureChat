import type { SpotlightCardProps } from "@/awesome/SpotlightCard"
import type { IconProps } from "@/Icon"
import type { DivProps } from "@/types"
import type { CSSProperties } from "react"

export interface FeatureItemType {
  column?: number
  description?: string
  hero?: boolean
  icon?: IconProps["icon"]
  image?: string
  imageStyle?: CSSProperties
  imageType?: "light" | "primary" | "soon"
  link?: string
  openExternal?: boolean
  row?: number
  title: string
}

export interface FeatureItemProps extends FeatureItemType, Omit<DivProps, "title"> {}

export interface FeaturesProps extends DivProps {
  columns?: SpotlightCardProps["columns"]
  gap?: SpotlightCardProps["gap"]
  itemClassName?: string
  itemStyle?: CSSProperties
  items: FeatureItemType[]
  maxWidth?: number
}
