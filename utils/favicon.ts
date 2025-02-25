import FileSaver from "file-saver"
import type { DownloadOptions } from "@/types/logo"

export async function generateFaviconPackage(svgString: string, options: DownloadOptions): Promise<void> {
  try {
    const sizes = [16, 32, 48, 96, 144, 192, 512]
    const files: { [key: string]: Blob } = {}

    // Convert SVG to different PNG sizes
    for (const size of sizes) {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error(`Failed to get canvas context for size ${size}`)
      }

      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            ctx.clearRect(0, 0, size, size)
            ctx.drawImage(img, 0, 0, size, size)
            canvas.toBlob((blob) => {
              if (blob) {
                files[`favicon-${size}x${size}.png`] = blob
                resolve()
              } else {
                reject(new Error(`Failed to create PNG blob for size ${size}`))
              }
            }, "image/png")
          } catch (error) {
            reject(error)
          }
        }

        img.onerror = () => {
          reject(new Error(`Failed to load SVG image for size ${size}`))
        }

        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
        const url = URL.createObjectURL(svgBlob)
        img.src = url
        setTimeout(() => URL.revokeObjectURL(url), 0)
      })
    }

    if (options.includeManifest) {
      const manifest = {
        name: "Logo",
        icons: sizes.map((size) => ({
          src: `/favicon-${size}x${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        })),
      }
      files["manifest.json"] = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" })
    }

    if (options.includeBrowserConfig) {
      const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/favicon-96x96.png"/>
      <square150x150logo src="/favicon-144x144.png"/>
      <square310x310logo src="/favicon-192x192.png"/>
    </tile>
  </msapplication>
</browserconfig>`
      files["browserconfig.xml"] = new Blob([browserconfig], { type: "application/xml" })
    }

    const JSZip = (await import("jszip")).default
    const zip = new JSZip()

    Object.entries(files).forEach(([filename, blob]) => {
      zip.file(filename, blob)
    })

    const zipBlob = await zip.generateAsync({ type: "blob" })
    FileSaver.saveAs(zipBlob, "favicon-package.zip")
  } catch (error) {
    console.error("Failed to generate favicon package:", error)
    throw new Error(`Failed to generate favicon package: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

