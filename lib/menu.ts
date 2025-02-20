import { Metadata } from "next";

export const tools = [
  {
    name: "Age Calculator",
    koreanName: "국제나이, 만 나이 계산기",
    icon: "Calculator",
    description: "나이 계산기, 국제 나이 계산기, 만 나이 계산기",
    keywords: [
      "Age Calculator",
      "만나이",
      "나이",
      "국제나이",
      "계산기",
      "International Age",
      "별자리",
      "궁합",
      "띠",
      "육십갑자",
      "동물띠",
    ],
    category: "Utilities",
    link: "ageCalculator",
  },
];

export function generateMetadata(page: string): Metadata {
  const tool = tools.find((t) => t.link === page);
  if (!tool) return {};

  return {
    title: `${tool.koreanName} | ${tool.name}`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.koreanName} | ${tool.name}`,
      description: tool.description,
      url: `https://ahoxy.com/${tool.link}`,
      type: "website",
    },
  };
}

export function generateJSONLD(page: string): string {
  const tool = tools.find((t) => t.link === page);
  if (!tool) return "";

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.koreanName,
    url: `https://ahoxy.com/${tool.link}`,
    description: tool.description,
    keywords: tool.keywords,
  };

  return JSON.stringify(jsonLD);
}