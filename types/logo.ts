import type { LucideIcon } from "lucide-react"

export type BorderRadius = string // Now accepts values like "10px" or "50%"

export type GradientDirection = "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl"
export type LogoType = "icon" | "text"
export type FontFamily = "mono" | "sans" | "serif"

export type LayoutConfig = {
  id: string
  name: string
  description: string
  gridLayout: string
  previewLocation: "left" | "right" | "top"
  controlsLayout: "stacked" | "sideBySide"
}

export type BackgroundStyle = {
  rounded: BorderRadius
  padding: number
  shadow: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner"
  gradientColorFrom: string
  gradientColorTo?: string
  gradientDirection?: GradientDirection
}

export type IconStyle = {
  size: number
  rotate: number
  strokeWidth: number
  color: string
  fill: string
  opacity: number
  absoluteStrokeWidth: boolean
  gradientColorFrom: string
  gradientColorTo?: string
  gradientDirection?: GradientDirection
  borderRadius: BorderRadius
  preserveAspectRatio: "xMidYMid meet" | "none"
}

export type TextStyle = {
  text: string
  fontSize: number
  fontWeight: number
  color: string
  borderWidth: number
  borderColor: string
  fontFamily: FontFamily
  gradientColorFrom: string
  gradientColorTo?: string
  gradientDirection?: GradientDirection
  borderRadius: BorderRadius
}

export type LogoState = {
  type: LogoType
  icon?: LucideIcon
  iconStyle: IconStyle
  textStyle: TextStyle
  background: BackgroundStyle
  selectedLayout: string
}

export type LogoAction =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" }
  | { type: "SET_LOGO_TYPE"; payload: LogoType }
  | { type: "SET_ICON"; payload: LucideIcon }
  | { type: "UPDATE_ICON_STYLE"; payload: Partial<IconStyle> }
  | { type: "UPDATE_TEXT_STYLE"; payload: Partial<TextStyle> }
  | { type: "UPDATE_BACKGROUND"; payload: Partial<BackgroundStyle> }
  | { type: "SET_LAYOUT"; payload: string }

export type UndoableState = {
  past: LogoState[]
  present: LogoState
  future: LogoState[]
}

export type ColorPalette = {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    gradientFrom: string
    gradientTo: string
  }
}

export type DownloadFormat = "png" | "svg" | "favicon-package"

export type DownloadOptions = {
  format: DownloadFormat
  size?: number
  includeManifest?: boolean
  includeBrowserConfig?: boolean
  maintainRatio?: boolean
}

export type LogoError = {
  code: string
  message: string
  details?: unknown
}

