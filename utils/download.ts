import FileSaver from "file-saver"
import html2canvas from "html2canvas"
import type { DownloadOptions } from "@/types/logo"

export async function downloadLogo(element: HTMLElement | null, options: DownloadOptions): Promise<void> {
  if (!element) {
    throw new Error("No element provided for download")
  }

  try {
    const size = options.size || 320
    const scale = 2 // Higher resolution for better quality

    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement
    clone.style.width = `${size}px`
    clone.style.height = `${size}px`

    // Temporarily append clone to document for rendering
    clone.style.position = "absolute"
    clone.style.left = "-9999px"
    document.body.appendChild(clone)

    switch (options.format) {
      case "svg": {
        const svgString = generateSVGString(clone, size)
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
        FileSaver.saveAs(blob, "logo.svg")
        break
      }

      case "png": {
        const canvas = await html2canvas(clone, {
          width: size,
          height: size,
          scale,
          backgroundColor: null,
          logging: false,
          allowTaint: true,
          useCORS: true,
        })

        canvas.toBlob(
          (blob) => {
            if (blob) {
              FileSaver.saveAs(blob, "logo.png")
            } else {
              throw new Error("Failed to create PNG blob")
            }
          },
          "image/png",
          1,
        )
        break
      }

      case "favicon-package": {
        await generateFaviconPackage(clone)
        break
      }

      default:
        throw new Error("Invalid download format")
    }

    // Clean up
    document.body.removeChild(clone)
  } catch (error) {
    console.error("Download failed:", error)
    throw error
  }
}

async function generateFaviconPackage(element: HTMLElement): Promise<void> {
  const sizes = [16, 32, 48, 96, 144, 192]
  const files: { [key: string]: Blob } = {}

  // Get the original dimensions
  const originalWidth = element.offsetWidth
  const originalHeight = element.offsetHeight
  const aspectRatio = originalWidth / originalHeight

  for (const size of sizes) {
    // Create a temporary canvas for this size
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error(`Failed to get canvas context for size ${size}`)
    }

    // Calculate dimensions that maintain aspect ratio
    let drawWidth = size
    let drawHeight = size
    let offsetX = 0
    let offsetY = 0

    if (aspectRatio > 1) {
      // Wider than tall
      drawHeight = size / aspectRatio
      offsetY = (size - drawHeight) / 2
    } else {
      // Taller than wide
      drawWidth = size * aspectRatio
      offsetX = (size - drawWidth) / 2
    }

    // Create a temporary canvas with the original content
    const tempCanvas = await html2canvas(element, {
      width: originalWidth,
      height: originalHeight,
      scale: 1,
      backgroundColor: null,
      logging: false,
      allowTaint: true,
      useCORS: true,
    })

    // Draw the scaled image onto the final canvas
    ctx.drawImage(tempCanvas, offsetX, offsetY, drawWidth, drawHeight)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error(`Failed to create PNG blob for size ${size}`))
          }
        },
        "image/png",
        1,
      )
    })

    files[`favicon-${size}x${size}.png`] = blob
  }

  // Add manifest and browserconfig
  const manifest = {
    name: "Logo",
    icons: sizes.map((size) => ({
      src: `/favicon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  }

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

  files["manifest.json"] = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" })
  files["browserconfig.xml"] = new Blob([browserconfig], { type: "application/xml" })

  // Create zip file
  const JSZip = (await import("jszip")).default
  const zip = new JSZip()

  Object.entries(files).forEach(([filename, blob]) => {
    zip.file(filename, blob)
  })

  const zipBlob = await zip.generateAsync({ type: "blob" })
  FileSaver.saveAs(zipBlob, "favicon-package.zip")
}

function generateSVGString(element: HTMLElement, size: number): string {
  const contentContainer = element.firstElementChild as HTMLElement
  if (!contentContainer) {
    throw new Error("Content container not found")
  }

  const style = window.getComputedStyle(contentContainer)
  const computedStyles = {
    gradientColorFrom: style.backgroundColor,
    backgroundImage: style.backgroundImage,
    borderRadius: style.borderRadius,
    display: style.display,
    alignItems: style.alignItems,
    justifyContent: style.justifyContent,
  }

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg 
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${size}"
  height="${size}"
  viewBox="0 0 ${size} ${size}"
>
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
    </style>
  </defs>
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
      <div style="
        width: 100%;
        height: 100%;
        background-color: ${computedStyles.gradientColorFrom};
        background-image: ${computedStyles.backgroundImage};
        border-radius: ${computedStyles.borderRadius};
        display: ${computedStyles.display};
        align-items: ${computedStyles.alignItems};
        justify-content: ${computedStyles.justifyContent};
      ">
        ${contentContainer.innerHTML}
      </div>
    </div>
  </foreignObject>
</svg>`
}

