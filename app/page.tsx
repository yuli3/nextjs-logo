import type { Metadata } from "next"
import LogoGenerator from "@/components/logo-generator"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Logo Generator - Create Beautiful Logos",
  description: "Create beautiful logos with icons or text using our easy-to-use logo generator",
  openGraph: {
    title: "Logo Generator - Create Beautiful Logos",
    description: "Create beautiful logos with icons or text using our easy-to-use logo generator",
    type: "website",
  },
}

export default function Page() {
  return (    
  <ErrorBoundary>
    <LogoGenerator />
  </ErrorBoundary>)
}

