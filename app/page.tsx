"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "主页", icon: "⚡", href: "/" },
    { id: "calendar", label: "日历", icon: "📅", href: "/calendar" },
    { id: "memories", label: "记忆", icon: "🧠", href: "/memories" },
    { id: "team", label: "团队", icon: "👥", href: "/team" },
    { id: "office", label: "办公室", icon: "🏢", href: "/office" },
    { id: "pipeline", label: "管道", icon: "🎬", href: "/pipeline" },
    { id: "analytics", label: "分析", icon: "📊", href: "/analytics" },
  ];

  const features = [
    {
      id: "calendar",
      emoji: "📅",
      title: "智能日历",
      description: "管理任务和调度",
      detail: "任务调度和定时作业管理",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      id: "memories",
      emoji: "🧠",
      title: "记忆库",
      description: "知识管理",
      detail: "知识库和快速检索系统",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      id: "team",
      emoji: "👥",
      title: "团队",
      description: "成员管理",
      detail: "AI 代理成员和协作",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      id: "office",
      emoji: "🏢",
      title: "办公室",
      description: "工作监控",
      detail: "实时工作状态面板",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      id: "pipeline",
      emoji: "🎬",
      title: "内容管道",
      description: "创作流程",
      detail: "六阶段项目管理",
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200",
    },
    {
      id: "analytics",
      emoji: "📊",
      title: "数据分析",
      description: "统计报表",
      detail: "数据洞察和可视化",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Mission Control</h1>
                <p className="text-sm text-gray-500">任务控制中心</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  {tab.icon} {tab.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8">
            <span className="text-sm font-medium text-gray-700">AI 团队管理平台</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            统一管理
            <br />
            <span className="text-gray-400">AI 代理团队</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            集成日历、知识库、团队、办公室、内容管道和数据分析六大核心功能
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/calendar"
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              开始使用
            </a>
            <a
              href="https://github.com/Joshualover/mission-control"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-lg text-gray-600">六大系统一站式管理</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={`/${feature.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all h-full">
                  <div className={`w-16 h-16 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{feature.emoji}</span>
                  </div>

                  <h3 className={`text-xl font-bold ${feature.color} mb-2`}>
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 font-medium">
                    {feature.description}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.detail}
                  </p>

                  <div className={`mt-6 pt-6 border-t ${feature.border} flex items-center text-gray-400 group-hover:text-gray-600 transition-colors`}>
                    <span className="text-sm font-medium">了解更多</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">核心模块</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">AI</div>
              <div className="text-gray-600">智能驱动</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">开源免费</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">实时同步</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-2">Built with Next.js 16 + Tailwind CSS</p>
          <p className="text-sm text-gray-500">© 2024 Mission Control. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
