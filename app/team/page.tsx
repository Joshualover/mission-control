"use client";

import { useState, useEffect } from "react";
import { Id } from "../../types";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

type TeamMember = {
  _id: Id<"teamMembers">;
  name: string;
  role: "主控AI" | "开发者" | "作家" | "设计师" | "研究员" | "分析师";
  description: string;
  responsibilities: string[];
  skills: string[];
  avatar: string;
  status: "active" | "idle" | "busy";
  currentTask?: string;
  createdAt: number;
  updatedAt: number;
};

const ROLE_CONFIG = {
  主控AI: {
    icon: "🤖",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-500",
  },
  开发者: {
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
  },
  作家: {
    icon: "✍️",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
  },
  设计师: {
    icon: "🎨",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-500",
  },
  研究员: {
    icon: "🔍",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
  },
  分析师: {
    icon: "📊",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-500",
  },
};

const STATUS_CONFIG = {
  active: { label: "在线", color: "bg-green-500", pulse: true },
  idle: { label: "空闲", color: "bg-gray-400", pulse: false },
  busy: { label: "忙碌", color: "bg-red-500", pulse: true },
};

const PRESET_TEAM: Omit<TeamMember, "_id">[] = [
  {
    name: "约书亚",
    role: "主控AI",
    description: "斌哥的AI助手，负责整体协调和任务分配。喜欢直接、高效的沟通风格。",
    responsibilities: [
      "协调各子代理的工作",
      "与斌哥直接沟通",
      "任务规划和优先级管理",
      "确保项目按时完成",
    ],
    skills: ["项目管理", "协调沟通", "问题解决", "Next.js", "Convex"],
    avatar: "🤖",
    status: "active",
    currentTask: "构建任务控制中心",
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now(),
  },
  {
    name: "代码专家",
    role: "开发者",
    description: "负责编写高质量、可维护的代码。擅长前端开发和API设计。",
    responsibilities: [
      "编写React/Next.js组件",
      "设计RESTful API",
      "数据库schema设计",
      "代码审查和优化",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Convex", "Git"],
    avatar: "💻",
    status: "idle",
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 3600000,
  },
  {
    name: "文案编辑",
    role: "作家",
    description: "负责创作引人入胜的内容，包括文章、脚本、文档等。",
    responsibilities: [
      "撰写技术文档",
      "创作视频脚本",
      "编写营销文案",
      "内容审核和编辑",
    ],
    skills: ["技术写作", "创意写作", "脚本创作", "文档编写", "编辑"],
    avatar: "✍️",
    status: "busy",
    currentTask: "编写项目README",
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 1800000,
  },
  {
    name: "视觉设计师",
    role: "设计师",
    description: "负责创建美观、易用的用户界面和视觉内容。",
    responsibilities: [
      "UI/UX设计",
      "响应式布局设计",
      "视觉素材创作",
      "设计系统维护",
    ],
    skills: ["UI设计", "UX设计", "Figma", "Tailwind CSS", "色彩理论"],
    avatar: "🎨",
    status: "active",
    currentTask: "优化记忆库界面",
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 900000,
  },
  {
    name: "信息收集员",
    role: "研究员",
    description: "负责收集和分析信息，提供决策支持。",
    responsibilities: [
      "网络搜索",
      "数据分析",
      "竞品调研",
      "技术趋势追踪",
    ],
    skills: ["信息检索", "数据分析", "调研", "报告编写", "竞品分析"],
    avatar: "🔍",
    status: "idle",
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 7200000,
  },
  {
    name: "数据分析师",
    role: "分析师",
    description: "负责分析数据和指标，提供洞察和建议。",
    responsibilities: [
      "数据分析",
      "性能监控",
      "用户行为分析",
      "A/B测试",
    ],
    skills: ["数据分析", "SQL", "可视化", "统计", "报告"],
    avatar: "📊",
    status: "active",
    currentTask: "分析任务完成率",
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 600000,
  },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    // 使用预设团队成员
    const membersWithIds: TeamMember[] = PRESET_TEAM.map((member, index) => ({
      ...member,
      _id: `member_${index}` as Id<"teamMembers">,
    }));
    setTeamMembers(membersWithIds);
  };

  const updateMemberStatus = async (
    memberId: Id<"teamMembers">,
    status: TeamMember["status"],
    currentTask?: string
  ) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member._id === memberId
          ? { ...member, status, currentTask, updatedAt: Date.now() }
          : member
      )
    );
  };

  const getStats = () => {
    return {
      total: teamMembers.length,
      active: teamMembers.filter((m) => m.status === "active").length,
      busy: teamMembers.filter((m) => m.status === "busy").length,
      idle: teamMembers.filter((m) => m.status === "idle").length,
      byRole: teamMembers.reduce((acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                👥 团队结构
              </h1>
              <p className="text-gray-600">AI代理团队成员和职责分配</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                📅 日历
              </a>
              <a
                href="/memories"
                className="px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                🧠 记忆库
              </a>
              <a
                href="/office"
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                🏢 办公室
              </a>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              ⊞ 网格
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              ☰ 列表
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">总成员</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">在线</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-red-600">{stats.busy}</div>
            <div className="text-sm text-gray-600">忙碌</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-gray-600">{stats.idle}</div>
            <div className="text-sm text-gray-600">空闲</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-purple-600">
              {Object.keys(stats.byRole).length}
            </div>
            <div className="text-sm text-gray-600">角色类型</div>
          </div>
        </div>

        {/* Team Members */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => {
              const roleConfig = ROLE_CONFIG[member.role];
              const statusConfig = STATUS_CONFIG[member.status];

              return (
                <div
                  key={member._id}
                  onClick={() => setSelectedMember(member)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden hover:scale-[1.02]"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${roleConfig.color} p-6`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl">{member.avatar}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-white/80 text-sm">{roleConfig.icon} {member.role}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div
                          className={`w-3 h-3 rounded-full ${statusConfig.color} ${
                            statusConfig.pulse ? "animate-pulse" : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {member.description}
                    </p>

                    {member.currentTask && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs font-semibold text-blue-600 mb-1">
                          当前任务
                        </div>
                        <div className="text-sm text-gray-700">{member.currentTask}</div>
                      </div>
                    )}

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 mb-2">
                        核心技能
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 py-1 ${roleConfig.bgColor} rounded text-xs`}
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{member.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      最后更新: {format(new Date(member.updatedAt), "MM/dd HH:mm", { locale: zhCN })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    成员
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    角色
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    当前任务
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    最后更新
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teamMembers.map((member) => {
                  const roleConfig = ROLE_CONFIG[member.role];
                  const statusConfig = STATUS_CONFIG[member.status];

                  return (
                    <tr
                      key={member._id}
                      onClick={() => setSelectedMember(member)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{member.avatar}</div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 ${roleConfig.bgColor} rounded text-xs font-medium`}
                        >
                          {roleConfig.icon} {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${statusConfig.color} mr-2 ${
                              statusConfig.pulse ? "animate-pulse" : ""
                            }`}
                          ></div>
                          <span className="text-sm text-gray-900">{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {member.currentTask || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(member.updatedAt), "MM/dd HH:mm", {
                          locale: zhCN,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{selectedMember.avatar}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedMember.name}
                    </h2>
                    <p className="text-gray-600">
                      {ROLE_CONFIG[selectedMember.role].icon} {selectedMember.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">简介</h3>
                  <p className="text-gray-700">{selectedMember.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">职责</h3>
                  <ul className="space-y-2">
                    {selectedMember.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 ${ROLE_CONFIG[selectedMember.role].bgColor} rounded-lg text-sm font-medium`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">状态管理</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "active")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedMember.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      🟢 在线
                    </button>
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "busy")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedMember.status === "busy"
                          ? "bg-red-600 text-white"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      🔴 忙碌
                    </button>
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "idle")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedMember.status === "idle"
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ⚪ 空闲
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">创建时间:</span>{" "}
                    {format(new Date(selectedMember.createdAt), "yyyy/MM/dd HH:mm:ss", {
                      locale: zhCN,
                    })}
                  </div>
                  <div>
                    <span className="font-semibold">最后更新:</span>{" "}
                    {format(new Date(selectedMember.updatedAt), "yyyy/MM/dd HH:mm:ss", {
                      locale: zhCN,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
