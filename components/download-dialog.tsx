"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { DownloadOptions, DownloadFormat } from "@/types/logo"

interface DownloadDialogProps {
  onDownload: (options: DownloadOptions) => Promise<void>
}

export function DownloadDialog({ onDownload }: DownloadDialogProps) {
  const [format, setFormat] = useState<DownloadFormat>("png")
  const [size, setSize] = useState(320)
  const [includeManifest, setIncludeManifest] = useState(true)
  const [includeBrowserConfig, setIncludeBrowserConfig] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      setError(null)
      await onDownload({
        format,
        size,
        includeManifest,
        includeBrowserConfig,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Format</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as DownloadFormat)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" />
                <Label htmlFor="png">PNG Image</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="svg" id="svg" />
                <Label htmlFor="svg">SVG Vector</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="favicon-package" id="favicon" />
                <Label htmlFor="favicon">Favicon Package</Label>
              </div>
            </RadioGroup>
          </div>

          {format === "png" && (
            <div className="space-y-2">
              <Label>Size (pixels)</Label>
              <Slider min={32} max={1024} step={32} value={[size]} onValueChange={([value]) => setSize(value)} />
              <div className="text-sm text-muted-foreground">
                {size}x{size} pixels
              </div>
            </div>
          )}

          {format === "favicon-package" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manifest"
                  checked={includeManifest}
                  onCheckedChange={(checked) => setIncludeManifest(checked as boolean)}
                />
                <Label htmlFor="manifest">Include manifest.json</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="browserconfig"
                  checked={includeBrowserConfig}
                  onCheckedChange={(checked) => setIncludeBrowserConfig(checked as boolean)}
                />
                <Label htmlFor="browserconfig">Include browserconfig.xml</Label>
              </div>
            </div>
          )}

          {error && <div className="text-sm text-destructive">{error}</div>}

          <Button onClick={handleDownload} className="w-full" disabled={isDownloading}>
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

