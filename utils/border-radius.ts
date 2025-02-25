// Convert pixel or percentage values to CSS border-radius
export function getBorderRadiusStyle(value: number, usePercentage = false): string {
  if (value === 0) return "0"
  return usePercentage ? `${value}%` : `${value}px`
}

// Convert CSS border-radius to numeric value
export function getBorderRadiusValue(radius: string): number {
  if (!radius || radius === "0") return 0
  const match = radius.match(/^(\d+)(px|%)?$/)
  if (!match) return 0
  return Number.parseInt(match[1], 10)
}

