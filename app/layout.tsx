"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("calendar");

  useEffect(() => {
    // 根据路径设置活动标签
    if (pathname === "/") setActiveTab("calendar");
    else if (pathname === "/memories") setActiveTab("memories");
    else if (pathname === "/team") setActiveTab("team");
    else if (pathname === "/office") setActiveTab("office");
    else if (pathname === "/pipeline") setActiveTab("pipeline");
    else if (pathname === "/analytics") setActiveTab("analytics");
  }, [pathname]);

  const tabs = [
    { id: "calendar", label: "📅 日历", path: "/" },
    { id: "memories", label: "🧠 记忆库", path: "/memories" },
    { id: "team", label: "👥 团队", path: "/team" },
    { id: "office", label: "🏢 办公室", path: "/office" },
    { id: "pipeline", label: "🎬 管道", path: "/pipeline" },
    { id: "analytics", label: "📊 分析", path: "/analytics" },
  ];

  const handleTabChange = (tabId: string, path: string) => {
    setActiveTab(tabId);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Top Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Brand */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                任务控制中心
              </h1>
            </div>
            <div className="text-xs text-gray-500">Mission Control</div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id, tab.path)}
                className={`
                  px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
