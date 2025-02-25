import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import type { IconStyle } from "@/types/logo"

interface IconStyleControlsProps {
  style: IconStyle
  onChange: (style: Partial<IconStyle>) => void
}

export function IconStyleControls({ style, onChange }: IconStyleControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Size</Label>
        <Slider
          min={16}
          max={512}
          step={1}
          value={[style.size]}
          onValueChange={([value]) => onChange({ size: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Rotation</Label>
        <Slider
          min={0}
          max={360}
          step={1}
          value={[style.rotate]}
          onValueChange={([value]) => onChange({ rotate: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Stroke Width</Label>
        <Slider
          min={0.5}
          max={4}
          step={0.1}
          value={[style.strokeWidth]}
          onValueChange={([value]) => onChange({ strokeWidth: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Opacity</Label>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[style.opacity]}
          onValueChange={([value]) => onChange({ opacity: value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="absolute-stroke"
          checked={style.absoluteStrokeWidth}
          onCheckedChange={(checked) => onChange({ absoluteStrokeWidth: checked })}
        />
        <Label htmlFor="absolute-stroke">Absolute stroke width</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Stroke Color</Label>
          <Input type="color" value={style.color} onChange={(e) => onChange({ color: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Fill Color</Label>
          <Input type="color" value={style.fill} onChange={(e) => onChange({ fill: e.target.value })} />
        </div>
      </div>
    </div>
  )
}

