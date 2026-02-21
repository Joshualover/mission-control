"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "主页", icon: "⚡" },
    { id: "calendar", label: "日历", icon: "📅" },
    { id: "memories", label: "记忆", icon: "🧠" },
    { id: "team", label: "团队", icon: "👥" },
    { id: "office", label: "办公室", icon: "🏢" },
    { id: "pipeline", label: "管道", icon: "🎬" },
    { id: "analytics", label: "分析", icon: "📊" },
  ];

  const features = [
    {
      id: "calendar",
      icon: "📅",
      title: "智能日历",
      description: "管理任务调度和定时作业",
      gradient: "from-blue-600 to-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: "memories",
      icon: "🧠",
      title: "记忆库",
      description: "知识管理和快速检索系统",
      gradient: "from-purple-600 to-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: "team",
      icon: "👥",
      title: "团队",
      description: "AI 代理成员管理",
      gradient: "from-green-600 to-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      id: "office",
      icon: "🏢",
      title: "办公室",
      description: "实时工作状态监控",
      gradient: "from-orange-600 to-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      id: "pipeline",
      icon: "🎬",
      title: "内容管道",
      description: "六阶段创作流程",
      gradient: "from-pink-600 to-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
    },
    {
      id: "analytics",
      icon: "📊",
      title: "分析",
      description: "数据洞察和统计报表",
      gradient: "from-indigo-600 to-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-white font-semibold text-lg">Mission Control</span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {tabs.map((tab) => (
                  <a
                    key={tab.id}
                    href={tab.id === "home" ? "/" : `/${tab.id}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {tab.icon} {tab.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-blue-400 text-sm font-medium">AI 团队管理平台</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              任务控制中心
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                统一管理
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              为 AI 代理团队打造的一站式管理平台，集成日历、知识库、团队、办公室、内容管道和分析六大核心功能
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/calendar"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
              >
                开始使用 →
              </a>
              <a
                href="https://github.com/Joshualover/mission-control"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <a
                key={feature.id}
                href={`/${feature.id}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl"
                     style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                </div>
                <div className={`relative backdrop-blur-xl ${feature.bgColor} border ${feature.borderColor} rounded-2xl p-8 hover:border-white/30 transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 mb-6">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">查看详情</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400 text-sm">核心模块</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">AI</div>
              <div className="text-gray-400 text-sm">智能驱动</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400 text-sm">免费开源</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400 text-sm">实时同步</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center text-gray-400">
              <p className="mb-2">Built with Next.js 16 + Tailwind CSS</p>
              <p className="text-sm">© 2024 Mission Control. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
