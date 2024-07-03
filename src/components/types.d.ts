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
}
