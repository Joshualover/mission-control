import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "任务控制中心 | Mission Control",
  description: "任务调度和管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
