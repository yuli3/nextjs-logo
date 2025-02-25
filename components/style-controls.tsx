import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getBorderRadiusStyle, getBorderRadiusValue } from "@/utils/border-radius"
import type { IconStyle, TextStyle, GradientDirection } from "@/types/logo"

interface StyleControlsProps {
  type: "icon" | "text"
  style: IconStyle | TextStyle
  onChange: (style: Partial<IconStyle> | Partial<TextStyle>) => void
}

const gradientDirections: { value: GradientDirection; label: string }[] = [
  { value: "to-r", label: "→" },
  { value: "to-l", label: "←" },
  { value: "to-t", label: "↑" },
  { value: "to-b", label: "↓" },
  { value: "to-tr", label: "↗" },
  { value: "to-tl", label: "↖" },
  { value: "to-br", label: "↘" },
  { value: "to-bl", label: "↙" },
]

export function StyleControls({ type, style, onChange }: StyleControlsProps) {
  const isIcon = type === "icon"
  const iconStyle = style as IconStyle
  const textStyle = style as TextStyle

  return (
    <div className="space-y-6">
      {/* Common Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="color"
              value={style.gradientColorFrom || "#ffffff"}
              onChange={(e) => onChange({ gradientColorFrom: e.target.value })}
            />
            <Input
              type="color"
              value={style.gradientColorTo || style.gradientColorFrom || "#ffffff"}
              onChange={(e) => onChange({ gradientColorTo: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gradient Direction</Label>
          <Select
            value={style.gradientDirection || "to-r"}
            onValueChange={(value) => onChange({ gradientDirection: value as GradientDirection })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gradientDirections.map((direction) => (
                <SelectItem key={direction.value} value={direction.value}>
                  {direction.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Border Radius</Label>
          <div className="flex gap-4">
            <Slider
              min={0}
              max={50}
              step={1}
              value={[getBorderRadiusValue(style.borderRadius)]}
              onValueChange={([value]) => {
                onChange({ borderRadius: getBorderRadiusStyle(value, value >= 25) })
              }}
              className="flex-1"
            />
            <Select
              value={style.borderRadius.includes("%") ? "percent" : "pixel"}
              onValueChange={(unit) => {
                const currentValue = getBorderRadiusValue(style.borderRadius)
                onChange({
                  borderRadius: getBorderRadiusStyle(currentValue, unit === "percent"),
                })
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pixel">px</SelectItem>
                <SelectItem value="percent">%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Icon-specific Controls */}
      {isIcon && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Size</Label>
            <Slider
              min={16}
              max={512}
              step={1}
              value={[iconStyle.size]}
              onValueChange={([value]) => onChange({ size: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Rotation</Label>
            <Slider
              min={0}
              max={360}
              step={1}
              value={[iconStyle.rotate]}
              onValueChange={([value]) => onChange({ rotate: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Stroke Width</Label>
            <Slider
              min={0.5}
              max={4}
              step={0.1}
              value={[iconStyle.strokeWidth]}
              onValueChange={([value]) => onChange({ strokeWidth: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Opacity</Label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[iconStyle.opacity]}
              onValueChange={([value]) => onChange({ opacity: value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Stroke Color</Label>
              <Input type="color" value={iconStyle.color} onChange={(e) => onChange({ color: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Fill Color</Label>
              <Input type="color" value={iconStyle.fill} onChange={(e) => onChange({ fill: e.target.value })} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="absolute-stroke"
              checked={iconStyle.absoluteStrokeWidth}
              onCheckedChange={(checked) => onChange({ absoluteStrokeWidth: checked })}
            />
            <Label htmlFor="absolute-stroke">Absolute stroke width</Label>
          </div>
        </div>
      )}

      {/* Text-specific Controls */}
      {!isIcon && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Text (max 2 characters)</Label>
            <Input maxLength={2} value={textStyle.text} onChange={(e) => onChange({ text: e.target.value })} />
          </div>

          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={textStyle.fontFamily}
              onValueChange={(value) => onChange({ fontFamily: value as "mono" | "sans" | "serif" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sans">Sans</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Mono</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              min={12}
              max={72}
              step={1}
              value={[textStyle.fontSize]}
              onValueChange={([value]) => onChange({ fontSize: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Font Weight</Label>
            <Slider
              min={100}
              max={900}
              step={100}
              value={[textStyle.fontWeight]}
              onValueChange={([value]) => onChange({ fontWeight: value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Text Color</Label>
              <Input type="color" value={textStyle.color} onChange={(e) => onChange({ color: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Border Color</Label>
              <Input
                type="color"
                value={textStyle.borderColor}
                onChange={(e) => onChange({ borderColor: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Border Width</Label>
            <Slider
              min={0}
              max={10}
              step={0.5}
              value={[textStyle.borderWidth]}
              onValueChange={([value]) => onChange({ borderWidth: value })}
            />
          </div>
        </div>
      )}
    </div>
  )
}

