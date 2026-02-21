"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "HOME", icon: "⚡" },
    { id: "calendar", label: "CAL", icon: "📅" },
    { id: "memories", label: "MEM", icon: "🧠" },
    { id: "team", label: "TEAM", icon: "👥" },
    { id: "office", label: "OFF", icon: "🏢" },
    { id: "pipeline", label: "PIPE", icon: "🎬" },
    { id: "analytics", label: "ANA", icon: "📊" },
  ];

  const features = [
    {
      id: "calendar",
      icon: "📅",
      title: "CALENDAR",
      subtitle: "任务调度系统",
      description: "智能日历管理和自动化作业调度",
      color: "#00ff9d",
    },
    {
      id: "memories",
      icon: "🧠",
      title: "MEMORY",
      subtitle: "知识库系统",
      description: "知识管理和快速检索引擎",
      color: "#00d4ff",
    },
    {
      id: "team",
      icon: "👥",
      title: "TEAM",
      subtitle: "团队管理",
      description: "AI代理成员协作和职责分配",
      color: "#ff6b9d",
    },
    {
      id: "office",
      icon: "🏢",
      title: "OFFICE",
      subtitle: "数字办公室",
      description: "实时工作状态监控面板",
      color: "#ffcc00",
    },
    {
      id: "pipeline",
      icon: "🎬",
      title: "PIPELINE",
      subtitle: "内容管道",
      description: "六阶段创作流程管理",
      color: "#ff6b6b",
    },
    {
      id: "analytics",
      icon: "📊",
      title: "ANALYTICS",
      subtitle: "数据分析",
      description: "统计报表和数据洞察",
      color: "#c084fc",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono">
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)',
          backgroundSize: '100% 4px'
        }}></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-2 border-[#00ff9d]/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-[#00ff9d] flex items-center justify-center bg-[#00ff9d]/5">
                  <span className="text-xl font-bold" style={{ color: '#00ff9d' }}>M</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wider">MISSION CONTROL</h1>
                  <p className="text-xs text-gray-500 tracking-widest">AI TEAM MANAGEMENT PLATFORM</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-1">
                {tabs.map((tab) => (
                  <a
                    key={tab.id}
                    href={tab.id === "home" ? "/" : `/${tab.id}`}
                    className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all tracking-wider border border-transparent hover:border-white/10"
                  >
                    {tab.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff9d]/30 mb-8" style={{ backgroundColor: 'rgba(0,255,157,0.05)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00ff9d' }}></div>
                  <span className="text-xs font-medium tracking-wider" style={{ color: '#00ff9d' }}>SYSTEM ONLINE</span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
                  任务控制
                  <br />
                  <span style={{ color: '#00ff9d' }}>中心</span>
                </h1>

                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                  为AI代理团队打造的统一管理平台。
                  <br />
                  集成六大核心系统，实现高效协作。
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/calendar"
                    className="px-8 py-4 bg-[#00ff9d] text-black font-bold text-sm tracking-wider hover:bg-[#00ff9d]/80 transition-all"
                    style={{ boxShadow: '0 0 20px rgba(0,255,157,0.3)' }}
                  >
                    启动系统 →
                  </a>
                  <a
                    href="https://github.com/Joshualover/mission-control"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold text-sm tracking-wider hover:bg-white/5 transition-all"
                  >
                    GITHUB
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 border border-gray-800 bg-black/50">
                  <div className="text-4xl font-bold text-white mb-2">6</div>
                  <div className="text-xs text-gray-500 tracking-wider">核心模块</div>
                </div>
                <div className="p-6 border border-gray-800 bg-black/50">
                  <div className="text-4xl font-bold text-white mb-2">AI</div>
                  <div className="text-xs text-gray-500 tracking-wider">智能驱动</div>
                </div>
                <div className="p-6 border border-gray-800 bg-black/50">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-xs text-gray-500 tracking-wider">开源免费</div>
                </div>
                <div className="p-6 border border-gray-800 bg-black/50">
                  <div className="text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-xs text-gray-500 tracking-wider">实时同步</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">核心系统</h2>
              <p className="text-gray-500 text-sm tracking-wider">CORE SYSTEMS</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <a
                  key={feature.id}
                  href={`/${feature.id}`}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                       style={{ backgroundColor: feature.color }}></div>

                  <div className="relative border-2 border-gray-800 bg-black/80 p-8 hover:border-opacity-50 transition-all duration-300 group-hover:border-opacity-100"
                       style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-5xl">{feature.icon}</div>
                      <div className="text-xs text-gray-600 tracking-wider">0{index + 1}</div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs font-medium mb-1" style={{ color: feature.color }}>
                        {feature.subtitle}
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                      <span className="text-xs font-medium tracking-wider">访问系统</span>
                      <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-gray-500 text-sm">
                <p className="mb-1">Built with Next.js 16 + Tailwind CSS</p>
                <p className="text-xs tracking-wider">© 2024 MISSION CONTROL</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00ff9d', boxShadow: '0 0 10px rgba(0,255,157,0.5)' }}></div>
                <span className="text-xs text-gray-500 tracking-wider">SYSTEM OPERATIONAL</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
