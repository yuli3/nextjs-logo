"use client"

import { useLogoState } from "@/hooks/use-logo-state"
import { useIconSearch } from "@/hooks/use-icon-search"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Undo2, Redo2, Search } from "lucide-react"
import { DownloadDialog } from "@/components/download-dialog"
import { StyleControls } from "@/components/style-controls"
import { LogoPreview } from "@/components/logo-preview"
import { ColorPalette } from "@/components/color-palette"
import { LayoutSelector } from "@/components/layout-selector"
import { Footer } from "@/components/footer"
import { downloadLogo } from "@/utils/download"
import { getLayout } from "@/utils/layouts"
import type { LogoType, DownloadOptions, ColorPalette as ColorPaletteType } from "@/types/logo"
import Link from "next/link"

// Popular search keywords for suggestions
const searchSuggestions = ["arrow", "cloud", "star", "heart", "user", "home", "settings", "tool", "chart", "music"]

export default function LogoGenerator() {
  const { state, dispatch, canUndo, canRedo } = useLogoState()
  const { query, results, handleSearch } = useIconSearch()
  const currentLayout = getLayout(state.selectedLayout)

  const handleTabChange = (value: string) => {
    dispatch({ type: "RESET" })
    dispatch({ type: "SET_LOGO_TYPE", payload: value as LogoType })
  }

  const handleDownload = async (options: DownloadOptions) => {
    const element = document.querySelector("#logo-preview")
    if (element instanceof HTMLElement) {
      try {
        await downloadLogo(element, { ...options, maintainRatio: true })
      } catch (error) {
        console.error("Download failed:", error)
        throw new Error("Failed to download logo. Please try again.")
      }
    } else {
      throw new Error("Preview element not found")
    }
  }

  const handleColorPaletteSelect = (colors: ColorPaletteType["colors"]) => {
    if (!colors) return

    if (state.type === "icon") {
      dispatch({
        type: "UPDATE_ICON_STYLE",
        payload: {
          color: colors.primary,
          fill: colors.secondary,
          gradientColorFrom: colors.gradientFrom,
          gradientColorTo: colors.gradientTo,
        },
      })
    } else {
      dispatch({
        type: "UPDATE_TEXT_STYLE",
        payload: {
          color: colors.primary,
          borderColor: colors.secondary,
          gradientColorFrom: colors.gradientFrom,
          gradientColorTo: colors.gradientTo,
        },
      })
    }

    dispatch({
      type: "UPDATE_BACKGROUND",
      payload: {
        gradientColorFrom: colors.gradientFrom,
        gradientColorTo: colors.gradientTo,
      },
    })
  }

  const Header = (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold"><Link href="/">Logo Generator ✨</Link></h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch({ type: "UNDO" })}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="h-4 w-4" />
                <span className="sr-only">Undo</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch({ type: "REDO" })}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="h-4 w-4" />
                <span className="sr-only">Redo</span>
              </Button>
              <DownloadDialog onDownload={handleDownload} />
            </div>
            <Separator orientation="vertical" className="h-6" />
            <LayoutSelector
              selectedLayout={state.selectedLayout}
              onSelect={(layoutId) => dispatch({ type: "SET_LAYOUT", payload: layoutId })}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const Controls = (
    <div className={currentLayout.controlsLayout === "sideBySide" ? "grid md:grid-cols-2 gap-6" : "space-y-6"}>
      <ColorPalette onSelectPalette={handleColorPaletteSelect} />

      <Tabs defaultValue="icon" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="icon">Icon</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="icon">
          <Card>
            <CardHeader>
              <CardTitle>Search Icons</CardTitle>
              <CardDescription>Find the perfect icon for your logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search icons..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Search icons"
                />
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">You may like this...</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleSearch(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {results.slice(0, 8).map((result) => (
                  <Button
                    key={result.name}
                    variant="outline"
                    className="aspect-square p-2"
                    onClick={() =>
                      dispatch({
                        type: "SET_ICON",
                        payload: result.icon,
                      })
                    }
                    aria-label={`Select ${result.name} icon`}
                  >
                    <result.icon className="h-full w-full" />
                  </Button>
                ))}
              </div>
            </CardContent>

            {state.icon && (
              <CardContent className="border-t pt-4 mt-4">
                <StyleControls
                  type="icon"
                  style={state.iconStyle}
                  onChange={(style) =>
                    dispatch({
                      type: "UPDATE_ICON_STYLE",
                      payload: style,
                    })
                  }
                />
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Settings</CardTitle>
              <CardDescription>Customize your text logo</CardDescription>
            </CardHeader>
            <CardContent>
              <StyleControls
                type="text"
                style={state.textStyle}
                onChange={(style) =>
                  dispatch({
                    type: "UPDATE_TEXT_STYLE",
                    payload: style,
                  })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const Preview = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Your logo preview</CardDescription>
        </CardHeader>
        <CardContent>
          <LogoPreview state={state} />
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          💡 Pro Tips:
          <ul className="mt-2 list-disc list-inside">
            <li>Use Ctrl+Z to undo and Ctrl+Y to redo</li>
            <li>Try different layouts and color palettes for inspiration</li>
            <li>Export in SVG format for best quality</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      {Header}
      <main className="flex-1 container mx-auto p-6">
        <div className={`grid gap-6 ${currentLayout.gridLayout}`}>
          {currentLayout.previewLocation === "left" ? (
            <>
              {Preview}
              {Controls}
            </>
          ) : currentLayout.previewLocation === "right" ? (
            <>
              {Controls}
              {Preview}
            </>
          ) : (
            <>
              {Preview}
              {Controls}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

