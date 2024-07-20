import type { IconProps as IconPropsOrigin } from '@iconify/vue'

export interface IconProps extends IconPropsOrigin {}

export interface SvgIcon {
  name: string
  prefix?: string
  color?: string
}

export interface WebIcon {
  url?: string
  name: string
  prefix?: string
  fontFamily?: string
}

export interface IconListType {
  collection?: string
  iconData?: string[]
  showTextFlag?: boolean
  searchValue?: string
}
