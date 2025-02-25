import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleAdSense } from "@/components/Adsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() : Promise<Metadata> {
  return {
    title: {
      template: "%s",
      default: "Logo Generator | ahoxy.com",
    },
    description:
      "Create your logo in minutes with our free and easy-to-use logo generator. Perfect for startups, solo entrepreneurs, and anyone looking for a quick and hassle-free branding solution. No design experience needed – simply choose your style, customize, and download your professional-looking logo today!",
    keywords: [
      "Free Logo Maker","Easy Logo Creator", "Quick Logo Generator","Simple Logo Design","DIY Logo Tool","Startup Logo Maker"
      ,"Small Business Logo Creator", "Favicon Generator", "Text to Logo", "Icon to Logo", "One-click Logo"
    ],
    authors: [{ name: "ahoxy" }],
    openGraph: {
      title: "Door to online tools, A collection of AI tools, content creation helpers, and games.",
      description:
        "Create your logo in minutes with our free and easy-to-use logo generator. Perfect for startups, solo entrepreneurs, and anyone looking for a quick and hassle-free branding solution. No design experience needed – simply choose your style, customize, and download your professional-looking logo today!",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "ahoxy",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BASE_URL + "/ms-icon-310x310.png",
          width: 1024,
          height: 1024,
          alt: "ahoxy, door to online tools",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Door to Online Tools",
      description:
        "Create your logo in minutes with our free and easy-to-use logo generator. Perfect for startups, solo entrepreneurs, and anyone looking for a quick and hassle-free branding solution. No design experience needed – simply choose your style, customize, and download your professional-looking logo today!",
      images: [process.env.NEXT_PUBLIC_BASE_URL + "/ms-icon-310x310.png"],
    },
    robots: "index, follow",
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
        { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
        { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
        { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
        { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
        { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
        { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
        { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
        { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "apple-icon-precomposed",
          url: "/apple-icon-precomposed.png",
        },
      ],
    },
    other: {
      "msapplication-TileColor": "#ffffff",
      "msapplication-TileImage": "/ms-icon-144x144.png",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-915L6V38X6" />
        <GoogleAdSense />
      </body>
    </html>
  );
}
