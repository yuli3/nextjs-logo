export function cssDirectionToSVGCoords(direction: string): {
  x1: string
  y1: string
  x2: string
  y2: string
} {
  switch (direction) {
    case "to-r":
      return { x1: "0%", y1: "50%", x2: "100%", y2: "50%" }
    case "to-l":
      return { x1: "100%", y1: "50%", x2: "0%", y2: "50%" }
    case "to-t":
      return { x1: "50%", y1: "100%", x2: "50%", y2: "0%" }
    case "to-b":
      return { x1: "50%", y1: "0%", x2: "50%", y2: "100%" }
    case "to-tr":
      return { x1: "0%", y1: "100%", x2: "100%", y2: "0%" }
    case "to-tl":
      return { x1: "100%", y1: "100%", x2: "0%", y2: "0%" }
    case "to-br":
      return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" }
    case "to-bl":
      return { x1: "100%", y1: "0%", x2: "0%", y2: "100%" }
    default:
      return { x1: "0%", y1: "0%", x2: "100%", y2: "0%" }
  }
}

export function cssGradientToSVGGradient(
  direction: string,
  color1: string,
  color2: string,
): { gradient: string; gradientId: string } {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`
  const coords = cssDirectionToSVGCoords(direction)

  const gradient = `
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

  return { gradient, gradientId }
}

export function getBackgroundStyle(
  gradientColorFrom: string,
  gradientColorTo?: string,
  gradientDirection?: string,
): string {
  if (!gradientColorTo || !gradientDirection) {
    return gradientColorFrom
  }

  // Convert CSS direction to actual angle
  const angle = gradientDirection
    .replace("to-", "")
    .split("")
    .map((char) => {
      switch (char) {
        case "r":
          return "90deg"
        case "l":
          return "270deg"
        case "t":
          return "0deg"
        case "b":
          return "180deg"
        case "tr":
          return "45deg"
        case "tl":
          return "315deg"
        case "br":
          return "135deg"
        case "bl":
          return "225deg"
        default:
          return "90deg"
      }
    })[0]

  return `linear-gradient(${angle}, ${gradientColorFrom}, ${gradientColorTo})`
}

