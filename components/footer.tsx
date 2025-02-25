import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="w-full container mx-auto flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Logo Generator</h2>
          <p className="text-muted-foreground max-w-[600px]">
            A powerful tool for creating beautiful logos with icons or text. Perfect for quick branding, social media
            profiles, app icons, or any project that needs a professional logo.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Features</h3>
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <li>Icon & Text Logos</li>
            <li>Color Palettes</li>
            <li>Multiple Layouts</li>
            <li>SVG & PNG Export</li>
            <li>Favicon Package</li>
            <li>Gradient Support</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">How to Use</h3>
          <p className="text-sm text-muted-foreground max-w-[600px]">
            Choose between icon or text mode, customize your design with our intuitive controls, select from pre-made
            color palettes, and download your logo in various formats. Use the undo/redo buttons or keyboard shortcuts
            (Ctrl+Z, Ctrl+Y) to navigate your design history.
          </p>
        </div>

        {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Contact
          </Link>
        </div> */}

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} <Link href="https://logo.ahoxy.com">Logo Generator</Link>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

