"use client";

import { useState, useEffect, FormEvent } from "react";
import { Id } from "../../types";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

type Memory = {
  _id: Id<"memories">;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  source?: string;
  importance: "low" | "medium" | "high";
  createdAt: number;
  updatedAt: number;
};

const IMPORTANCE_LEVELS = [
  { value: "low", label: "🟢 普通", color: "border-green-500 bg-green-50" },
  { value: "medium", label: "🟡 重要", color: "border-yellow-500 bg-yellow-50" },
  { value: "high", label: "🔴 关键", color: "border-red-500 bg-red-50" },
] as const;

const CATEGORIES = [
  "技术决策",
  "项目经验",
  "工作流程",
  "问题解决",
  "最佳实践",
  "个人偏好",
  "其他",
];

const PRESET_MEMORIES: Omit<Memory, "_id">[] = [
  {
    title: "项目快速部署脚本",
    content: "使用 quick-web-deploy 技能可以在30秒内创建并部署完整的 Web 应用。脚本位于 /root/.openclaw/workspace/skills/quick-web-deploy/quick-deploy.sh。使用命令：./quick-deploy.sh project-name。",
    category: "工作流程",
    tags: ["部署", "自动化", "GitHub Pages"],
    source: "quick-web-deploy skill",
    importance: "high",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    title: "GitHub 克隆镜像使用",
    content: "由于网络速度慢（~13-18 kB/s），GitHub 直接克隆经常失败。使用 gh-proxy.com 镜像：git clone https://gh-proxy.com/https://github.com/{user}/{repo}.git",
    category: "技术决策",
    tags: ["GitHub", "网络", "镜像"],
    source: "memory/2026-02-21.md",
    importance: "high",
    createdAt: Date.now() - 72000000,
    updatedAt: Date.now() - 72000000,
  },
  {
    title: "版本参数解决浏览器缓存",
    content: "在 Web 应用中遇到浏览器缓存问题，通过添加版本参数解决：<link rel=\"stylesheet\" href=\"style.css?v=2.1.2\">。每次更新时修改版本号即可强制浏览器重新加载资源。",
    category: "问题解决",
    tags: ["浏览器缓存", "性能", "前端"],
    source: "todo-reminder-app 项目",
    importance: "medium",
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
  },
  {
    title: "斌哥的偏好设置",
    content: "斌哥喜欢直接、高效的沟通。不要用'问得好'、'我很乐意为您效劳'等开场白。直接回答问题。注重实用性而非完美执行。斌哥的时区是 UTC+8（东八区）。",
    category: "个人偏好",
    tags: ["斌哥", "沟通", "偏好"],
    source: "USER.md",
    importance: "high",
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
  },
  {
    title: "数据绑定从索引改为 data-id",
    content: "从数组索引改为 data-id 属性绑定，解决了过滤任务时的按钮事件bug。之前：onclick=\"completeTask(${index})\"；之后：onclick=\"completeTask(this)\" data-id=\"${task.id}\"",
    category: "技术决策",
    tags: ["JavaScript", "DOM", "事件绑定"],
    source: "todo-reminder-app 项目",
    importance: "medium",
    createdAt: Date.now() - 1800000,
    updatedAt: Date.now() - 1800000,
  },
  {
    title: "Convex 数据库特性",
    content: "Convex 是一个实时数据库，自动处理 WebSocket 连接和数据同步。数据模型定义在 schema.ts，查询和突变在单独的文件中。支持索引、关系和实时更新。",
    category: "技术决策",
    tags: ["Convex", "数据库", "实时"],
    source: "mission-control 项目",
    importance: "medium",
    createdAt: Date.now() - 90000000,
    updatedAt: Date.now() - 90000000,
  },
  {
    title: "任务控制中心工作流程",
    content: "当斌哥安排任务时，我会在日历中创建对应的任务条目，设置计划时间和优先级，完成后标记为'已完成'。这样斌哥可以随时监督我的工作进度。",
    category: "工作流程",
    tags: ["协作", "任务管理", "透明化"],
    source: "约书亚工作规范",
    importance: "high",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImportance, setSelectedImportance] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    source: "",
    importance: "medium" as const,
  });

  useEffect(() => {
    loadMemories();
  }, []);

  useEffect(() => {
    filterMemories();
  }, [memories, searchQuery, selectedCategory, selectedImportance]);

  const loadMemories = async () => {
    // 使用预设记忆
    const memoriesWithIds: Memory[] = PRESET_MEMORIES.map((memory, index) => ({
      ...memory,
      _id: `memory_${index}` as Id<"memories">,
    }));
    setMemories(memoriesWithIds);
  };

  const filterMemories = () => {
    let filtered = [...memories];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (memory) =>
          memory.title.toLowerCase().includes(query) ||
          memory.content.toLowerCase().includes(query) ||
          memory.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (selectedCategory) {
      filtered = filtered.filter((memory) => memory.category === selectedCategory);
    }

    // 重要性过滤
    if (selectedImportance) {
      filtered = filtered.filter((memory) => memory.importance === selectedImportance);
    }

    setFilteredMemories(filtered);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newMemory: Memory = {
      _id: Math.random().toString() as Id<"memories">,
      title: formData.title,
      content: formData.content,
      category: formData.category || undefined,
      tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : [],
      source: formData.source || undefined,
      importance: formData.importance,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setMemories([newMemory, ...memories]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: "",
      source: "",
      importance: "medium",
    });
  };

  const deleteMemory = async (memoryId: Id<"memories">) => {
    setMemories(memories.filter((memory) => memory._id !== memoryId));
  };

  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    memories.forEach((memory) => {
      const category = memory.category || "未分类";
      stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                🧠 记忆库
              </h1>
              <p className="text-gray-600">存储和检索重要信息</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                📅 日历
              </a>
              <a
                href="/team"
                className="px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                👥 团队
              </a>
              <a
                href="/office"
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                🏢 办公室
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                ➕ 新建记忆
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索记忆标题、内容或标签..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">分类:</span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedCategory === null
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  全部 ({memories.length})
                </button>
                {Object.entries(getCategoryStats()).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category} ({count})
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm font-semibold text-gray-700">重要性:</span>
                <button
                  onClick={() => setSelectedImportance(null)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedImportance === null
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  全部
                </button>
                {IMPORTANCE_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSelectedImportance(level.value)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      selectedImportance === level.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-blue-600">{memories.length}</div>
            <div className="text-sm text-gray-600">总记忆数</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-purple-600">
              {memories.filter((m) => m.importance === "high").length}
            </div>
            <div className="text-sm text-gray-600">关键记忆</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {new Set(memories.map((m) => m.category)).size}
            </div>
            <div className="text-sm text-gray-600">分类数量</div>
          </div>
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">没有找到匹配的记忆</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMemories.map((memory) => (
              <div
                key={memory._id}
                onClick={() => setSelectedMemory(memory)}
                className={`
                  bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-all cursor-pointer
                  border-l-4 ${IMPORTANCE_LEVELS.find((l) => l.value === memory.importance)?.color}
                  hover:scale-[1.02]
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800 flex-1">
                    {memory.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMemory(memory._id);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2 text-sm"
                  >
                    🗑️
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {memory.content}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {memory.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {memory.category}
                    </span>
                  )}
                  {memory.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {format(new Date(memory.createdAt), "MM/dd HH:mm", {
                      locale: zhCN,
                    })}
                  </span>
                  <span>
                    {IMPORTANCE_LEVELS.find((l) => l.value === memory.importance)?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Memory Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">📝 新建记忆</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">标题 *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="记忆标题..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">内容 *</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="记忆内容..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">分类</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">选择分类</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">重要性</label>
                    <select
                      value={formData.importance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          importance: e.target.value as "low" | "medium" | "high",
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {IMPORTANCE_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">标签</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="用逗号分隔多个标签..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">来源</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="记忆来源..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    创建记忆
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Memory Detail Modal */}
        {selectedMemory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedMemory.title}</h2>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">内容</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedMemory.content}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">分类</h3>
                    <p className="text-gray-800">
                      {selectedMemory.category || "未分类"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">重要性</h3>
                    <p className="text-gray-800">
                      {IMPORTANCE_LEVELS.find((l) => l.value === selectedMemory.importance)
                        ?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">创建时间</h3>
                    <p className="text-gray-800">
                      {format(new Date(selectedMemory.createdAt), "yyyy/MM/dd HH:mm:ss", {
                        locale: zhCN,
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">来源</h3>
                    <p className="text-gray-800">
                      {selectedMemory.source || "未知"}
                    </p>
                  </div>
                </div>

                {selectedMemory.tags && selectedMemory.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMemory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
