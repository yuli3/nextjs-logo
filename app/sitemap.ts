import { MetadataRoute } from "next";
import { tools } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahoxy.com"

  // 기본 페이지
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, // ✅ 'as const'로 리터럴 타입 고정
      priority: 1,
    },
  ];

  // tools 배열을 기반으로 sitemap 추가
  const toolEntries: MetadataRoute.Sitemap = tools
    .filter((tool) => !/^https?:\/\//.test(tool.link)) // ✅ HTTP/HTTPS 링크 필터링
    .map((tool) => ({
    url: `${baseUrl}/${tool.link}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const, // ✅ 'as const' 추가
    priority: 0.8,
  }));

  return [...sitemapEntries, ...toolEntries];
}