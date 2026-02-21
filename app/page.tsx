"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "🏠 主页", icon: "🏠" },
    { id: "calendar", label: "📅 日历", icon: "📅" },
    { id: "memories", label: "🧠 记忆库", icon: "🧠" },
    { id: "team", label: "👥 团队", icon: "👥" },
    { id: "office", label: "🏢 办公室", icon: "🏢" },
    { id: "pipeline", label: "🎬 管道", icon: "🎬" },
    { id: "analytics", label: "📊 分析", icon: "📊" },
  ];

  const features = [
    {
      id: "calendar",
      icon: "📅",
      title: "智能日历",
      description: "任务调度和 cron 作业管理",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "memories",
      icon: "🧠",
      title: "记忆库",
      description: "知识管理和快速检索",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "team",
      icon: "👥",
      title: "团队管理",
      description: "AI 代理成员和职责分配",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      id: "office",
      icon: "🏢",
      title: "数字办公室",
      description: "实时工作状态监控",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
    },
    {
      id: "pipeline",
      icon: "🎬",
      title: "内容管道",
      description: "六阶段创作流程管理",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
    {
      id: "analytics",
      icon: "📊",
      title: "数据分析",
      description: "数据洞察和统计报表",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🎯</span>
              <span className="text-xl font-bold text-white">Mission Control</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6 animate-gradient">
            任务控制中心
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-purple-200 max-w-3xl mx-auto mb-12">
            AI 代理团队的统一管理平台
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/calendar"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-xl shadow-purple-500/50 hover:scale-105"
            >
              🚀 开始使用
            </a>
            <a
              href="https://github.com/Joshualover/mission-control"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200"
            >
              📦 GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">六大核心功能</h2>
          <p className="text-purple-200 text-lg">一站式 AI 团队管理解决方案</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <a
              key={feature.icon}
              href={`/${feature.id === "home" ? "" : feature.id}`}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${feature.color}`}>
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-purple-200 group-hover:text-white transition-colors">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-purple-300 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">了解更多</span>
                  <span className="ml-2 text-lg group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">6</div>
            <div className="text-purple-200 text-sm">核心模块</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">AI</div>
            <div className="text-purple-200 text-sm">智能代理</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-purple-200 text-sm">免费使用</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">∞</div>
            <div className="text-purple-200 text-sm">扩展性</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="text-center text-purple-300">
          <p className="mb-2">Built with ❤️ using Next.js 14 + Tailwind CSS</p>
          <p className="text-sm">© 2024 Mission Control. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
