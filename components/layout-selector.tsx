import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { layouts } from "@/utils/layouts"

interface LayoutSelectorProps {
  selectedLayout: string
  onSelect: (layoutId: string) => void
}

export function LayoutSelector({ selectedLayout, onSelect }: LayoutSelectorProps) {
  return (
    <Select value={selectedLayout} onValueChange={onSelect}>
      <SelectTrigger className="w-[200px]" aria-label="Select layout">
        <SelectValue placeholder="Choose a layout" />
      </SelectTrigger>
      <SelectContent>
        {layouts.map((layout) => (
          <SelectItem key={layout.id} value={layout.id}>
            <div className="flex flex-col">
              <span>{layout.name}</span>
              <span className="text-xs text-muted-foreground">{layout.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

