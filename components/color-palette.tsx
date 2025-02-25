import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colorPalettes } from "@/utils/color-palettes"
import type { ColorPalette } from "@/types/logo"

interface ColorPaletteProps {
  onSelectPalette: (colors: ColorPalette["colors"]) => void
}

export function ColorPalette({ onSelectPalette }: ColorPaletteProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palettes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {colorPalettes.map((palette) => (
            <Button
              key={palette.id}
              variant="outline"
              className="h-auto p-2"
              onClick={() => onSelectPalette(palette.colors)}
            >
              <div className="space-y-2 w-full">
                <div className="text-xs font-medium">{palette.name}</div>
                <div className="flex gap-1">
                  <div
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: palette.colors.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: palette.colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border"
                    style={{
                      background: `linear-gradient(45deg, ${palette.colors.gradientFrom}, ${palette.colors.gradientTo})`,
                    }}
                    title="Gradient"
                  />
                </div>
                <div className="text-xs text-muted-foreground">{palette.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

