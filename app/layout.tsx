import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-context";

export const metadata: Metadata = {
  title: "Mission Control - AI 团队管理平台",
  description: "为 AI 代理团队打造的一站式管理平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
