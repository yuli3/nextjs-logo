import type { BorderRadius } from "@/types/logo"

function getBorderRadiusValue(radius: BorderRadius): number {
  switch (radius) {
    case "none":
      return 0
    case "sm":
      return 4
    case "md":
      return 8
    case "lg":
      return 12
    case "xl":
      return 16
    case "2xl":
      return 24
    case "3xl":
      return 32
    case "full":
      return 9999
    default:
      return 0
  }
}

export function createSVGFromElement(element: HTMLElement, size = 320): string {
  try {
    // Get the content container
    const contentContainer = element.firstElementChild as HTMLElement
    if (!contentContainer) {
      throw new Error("Content container not found")
    }

    // Get computed styles
    const style = window.getComputedStyle(contentContainer)
    const backgroundColor = style.backgroundColor
    const backgroundImage = style.backgroundImage
    const borderRadius = style.borderRadius

    // Get the content (icon or text)
    const content = contentContainer.innerHTML

    // Handle gradient background
    let gradient = ""
    let backgroundFill = `fill="${backgroundColor}"`

    if (backgroundImage.includes("linear-gradient")) {
      const gradientMatch = backgroundImage.match(/linear-gradient$$(.*?)$$/)
      if (gradientMatch) {
        const gradientParts = gradientMatch[1].split(",").map((part) => part.trim())
        const angle = gradientParts[0]
        const color1 = gradientParts[1]
        const color2 = gradientParts[2]

        const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

        // Convert CSS gradient angle to SVG coordinates
        const coords = getGradientCoordinates(angle)

        gradient = `
          <defs>
            <linearGradient 
              id="${gradientId}" 
              x1="${coords.x1}" 
              y1="${coords.y1}" 
              x2="${coords.x2}" 
              y2="${coords.y2}"
            >
              <stop offset="0%" stop-color="${color1}" />
              <stop offset="100%" stop-color="${color2}" />
            </linearGradient>
          </defs>
        `
        backgroundFill = `fill="url(#${gradientId})"`
      }
    }

    // Create SVG with proper viewBox and preserveAspectRatio
    const svgContent = `
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 ${size} ${size}"
        width="${size}" 
        height="${size}"
      >
        ${gradient}
        <rect 
          x="0" 
          y="0" 
          width="${size}" 
          height="${size}" 
          ${backgroundFill}
          rx="${Number.parseInt(borderRadius) || 0}"
          ry="${Number.parseInt(borderRadius) || 0}"
        />
        <foreignObject x="0" y="0" width="${size}" height="${size}">
          <div xmlns="http://www.w3.org/1999/xhtml"
               style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            ${content}
          </div>
        </foreignObject>
      </svg>
    `

    return svgContent.trim()
  } catch (error) {
    console.error("Error creating SVG:", error)
    throw new Error(`Failed to create SVG: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

function getGradientCoordinates(angle: string): { x1: string; y1: string; x2: string; y2: string } {
  if (angle.includes("deg")) {
    const degrees = Number.parseInt(angle)
    const radians = (degrees - 90) * (Math.PI / 180)
    const x1 = 50 + Math.cos(radians) * 50
    const y1 = 50 + Math.sin(radians) * 50
    const x2 = 50 - Math.cos(radians) * 50
    const y2 = 50 - Math.sin(radians) * 50
    return {
      x1: `${x1}%`,
      y1: `${y1}%`,
      x2: `${x2}%`,
      y2: `${y2}%`,
    }
  }

  switch (angle) {
    case "to right":
      return { x1: "0%", y1: "50%", x2: "100%", y2: "50%" }
    case "to left":
      return { x1: "100%", y1: "50%", x2: "0%", y2: "50%" }
    case "to bottom":
      return { x1: "50%", y1: "0%", x2: "50%", y2: "100%" }
    case "to top":
      return { x1: "50%", y1: "100%", x2: "50%", y2: "0%" }
    case "to bottom right":
      return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" }
    case "to bottom left":
      return { x1: "100%", y1: "0%", x2: "0%", y2: "100%" }
    case "to top right":
      return { x1: "0%", y1: "100%", x2: "100%", y2: "0%" }
    case "to top left":
      return { x1: "100%", y1: "100%", x2: "0%", y2: "0%" }
    default:
      return { x1: "0%", y1: "50%", x2: "100%", y2: "50%" }
  }
}

