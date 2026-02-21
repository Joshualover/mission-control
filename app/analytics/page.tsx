"use client";

import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  // 模拟数据
  const stats = {
    tasks: {
      total: 24,
      completed: 18,
      pending: 4,
      cancelled: 2,
      completionRate: 75,
    },
    projects: {
      total: 12,
      inProgress: 5,
      completed: 6,
      idea: 1,
    },
    team: {
      total: 6,
      active: 3,
      busy: 2,
      idle: 1,
      utilization: 83,
    },
    memories: {
      total: 7,
      high: 3,
      medium: 3,
      low: 1,
    },
  };

  const activityData = [
    { date: "02-15", tasks: 4, projects: 2, memories: 1 },
    { date: "02-16", tasks: 6, projects: 3, memories: 2 },
    { date: "02-17", tasks: 5, projects: 1, memories: 0 },
    { date: "02-18", tasks: 8, projects: 4, memories: 3 },
    { date: "02-19", tasks: 7, projects: 2, memories: 1 },
    { date: "02-20", tasks: 9, projects: 3, memories: 2 },
    { date: "02-21", tasks: 12, projects: 5, memories: 7 },
  ];

  const topPerformers = [
    { name: "约书亚", role: "主控AI", tasks: 8, efficiency: 95, avatar: "🤖" },
    { name: "代码专家", role: "开发者", tasks: 6, efficiency: 88, avatar: "💻" },
    { name: "数据分析师", role: "分析师", tasks: 5, efficiency: 92, avatar: "📊" },
  ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                📊 数据分析
              </h1>
              <p className="text-gray-600">任务控制中心的数据洞察</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === "7d"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                7天
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === "30d"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                30天
              </button>
              <button
                onClick={() => setTimeRange("90d")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === "90d"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                90天
              </button>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">任务总数</h3>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{stats.tasks.total}</div>
            <div className="text-xs text-gray-500 mt-1">
              完成率 {stats.tasks.completionRate}%
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">项目总数</h3>
              <span className="text-2xl">🎬</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">{stats.projects.total}</div>
            <div className="text-xs text-gray-500 mt-1">
              进行中 {stats.projects.inProgress} 个
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">团队利用率</h3>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.team.utilization}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.team.active} 个在线
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">记忆总数</h3>
              <span className="text-2xl">🧠</span>
            </div>
            <div className="text-3xl font-bold text-pink-600">{stats.memories.total}</div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.memories.high} 个关键记忆
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Activity Chart */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📈 活动趋势</h3>
            <div className="space-y-3">
              {activityData.map((day) => (
                <div key={day.date} className="flex items-center">
                  <div className="w-16 text-sm text-gray-600">{day.date}</div>
                  <div className="flex-1 flex space-x-1">
                    <div
                      className="bg-blue-500 rounded transition-all hover:bg-blue-600"
                      style={{ width: `${(day.tasks / 12) * 100}%`, height: "24px" }}
                      title={`任务: ${day.tasks}`}
                    ></div>
                    <div
                      className="bg-purple-500 rounded transition-all hover:bg-purple-600"
                      style={{
                        width: `${(day.projects / 12) * 100}%`,
                        height: "24px",
                      }}
                      title={`项目: ${day.projects}`}
                    ></div>
                    <div
                      className="bg-pink-500 rounded transition-all hover:bg-pink-600"
                      style={{
                        width: `${(day.memories / 12) * 100}%`,
                        height: "24px",
                      }}
                      title={`记忆: ${day.memories}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-gray-600">任务</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span className="text-gray-600">项目</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded mr-2"></div>
                <span className="text-gray-600">记忆</span>
              </div>
            </div>
          </div>

          {/* Task Distribution */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 任务分布</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">已完成</span>
                  <span className="font-semibold text-green-600">
                    {stats.tasks.completed} ({stats.tasks.completionRate}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${stats.tasks.completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">待执行</span>
                  <span className="font-semibold text-yellow-600">
                    {stats.tasks.pending} ({Math.round((stats.tasks.pending / stats.tasks.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${(stats.tasks.pending / stats.tasks.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">已取消</span>
                  <span className="font-semibold text-gray-600">
                    {stats.tasks.cancelled} ({Math.round((stats.tasks.cancelled / stats.tasks.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gray-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${(stats.tasks.cancelled / stats.tasks.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 表现最佳</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((performer, index) => (
              <div
                key={performer.name}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-4xl">{performer.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{performer.name}</div>
                    <div className="text-xs text-gray-600">{performer.role}</div>
                  </div>
                  {index === 0 && <span className="text-2xl">🥇</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-600">完成任务</div>
                    <div className="font-bold text-blue-600">{performer.tasks}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">效率</div>
                    <div className="font-bold text-green-600">{performer.efficiency}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Pipeline Stats */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎬 项目管道状态</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {stats.projects.idea}
              </div>
              <div className="text-sm text-gray-600">💡 创意</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stats.projects.inProgress}
              </div>
              <div className="text-sm text-gray-600">📝 进行中</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">0</div>
              <div className="text-sm text-gray-600">🎬 制作</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">✨ 后期</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">0</div>
              <div className="text-sm text-gray-600">👀 审核</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {stats.projects.completed}
              </div>
              <div className="text-sm text-gray-600">✅ 已发布</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
