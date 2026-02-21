"use client";

export default function Home() {
  const features = [
    {
      id: "calendar",
      emoji: "📅",
      title: "智能日历",
      description: "管理任务和调度",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "memories",
      emoji: "🧠",
      title: "记忆库",
      description: "知识管理",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "team",
      emoji: "👥",
      title: "团队",
      description: "成员管理",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "office",
      emoji: "🏢",
      title: "办公室",
      description: "工作监控",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      id: "pipeline",
      emoji: "🎬",
      title: "内容管道",
      description: "创作流程",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "analytics",
      emoji: "📊",
      title: "数据分析",
      description: "统计报表",
      gradient: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="relative">
        {/* Navigation */}
        <nav className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">M</span>
              </div>
              <span className="font-semibold">Mission Control</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
              <a href="/calendar" className="hover:text-white transition-colors">日历</a>
              <a href="/memories" className="hover:text-white transition-colors">记忆</a>
              <a href="/team" className="hover:text-white transition-colors">团队</a>
              <a href="/office" className="hover:text-white transition-colors">办公室</a>
              <a href="/pipeline" className="hover:text-white transition-colors">管道</a>
              <a href="/analytics" className="hover:text-white transition-colors">分析</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">AI 团队管理平台</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              任务控制中心
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              为 AI 代理团队打造的统一管理平台
              <br />
              集成六大核心系统
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/calendar"
                className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                开始使用 →
              </a>
              <a
                href="https://github.com/Joshualover/mission-control"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">核心功能</h2>
              <p className="text-gray-400">一站式 AI 团队管理解决方案</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <a
                  key={feature.id}
                  href={`/${feature.id}`}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                       style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                  </div>
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center text-gray-500 group-hover:text-white transition-colors">
                      <span className="text-sm">了解更多</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-sm text-gray-400">核心模块</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">AI</div>
              <div className="text-sm text-gray-400">智能驱动</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-sm text-gray-400">开源免费</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm text-gray-400">实时同步</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <p className="text-gray-400 mb-2">Built with Next.js 16 + Tailwind CSS</p>
            <p className="text-sm text-gray-500">© 2024 Mission Control</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
