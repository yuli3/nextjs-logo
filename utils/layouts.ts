import type { LayoutConfig } from "@/types/logo"

export const layouts: LayoutConfig[] = [
  {
    id: "default",
    name: "Default Layout",
    description: "Preview on the right, controls on the left",
    gridLayout: "md:grid-cols-[2fr_3fr]",
    previewLocation: "right",
    controlsLayout: "stacked",
  },
  {
    id: "preview-left",
    name: "Preview Left",
    description: "Preview on the left, controls on the right",
    gridLayout: "md:grid-cols-[3fr_2fr]",
    previewLocation: "left",
    controlsLayout: "stacked",
  },
  {
    id: "preview-top",
    name: "Preview Top",
    description: "Preview at the top, controls below",
    gridLayout: "grid-cols-1",
    previewLocation: "top",
    controlsLayout: "sideBySide",
  },
  {
    id: "wide-preview",
    name: "Wide Preview",
    description: "Large preview with side-by-side controls",
    gridLayout: "grid-cols-1",
    previewLocation: "top",
    controlsLayout: "sideBySide",
  },
]

export const defaultLayout = layouts[0]

export function getLayout(id: string): LayoutConfig {
  return layouts.find((layout) => layout.id === id) || defaultLayout
}

