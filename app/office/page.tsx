"use client";

import { useState, useEffect } from "react";
import { Id } from "../convex/_generated/dataModel";
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

// 办公室布局配置 - 3x2网格
const OFFICE_LAYOUT = [
  { id: 1, position: { x: 0, y: 0 }, deskColor: "from-purple-100 to-purple-200" },
  { id: 2, position: { x: 1, y: 0 }, deskColor: "from-blue-100 to-blue-200" },
  { id: 3, position: { x: 2, y: 0 }, deskColor: "from-green-100 to-green-200" },
  { id: 4, position: { x: 0, y: 1 }, deskColor: "from-pink-100 to-pink-200" },
  { id: 5, position: { x: 1, y: 1 }, deskColor: "from-yellow-100 to-yellow-200" },
  { id: 6, position: { x: 2, y: 1 }, deskColor: "from-indigo-100 to-indigo-200" },
];

const ROLE_CONFIG = {
  主控AI: { icon: "🤖", color: "from-purple-500 to-indigo-500" },
  开发者: { icon: "💻", color: "from-blue-500 to-cyan-500" },
  作家: { icon: "✍️", color: "from-green-500 to-emerald-500" },
  设计师: { icon: "🎨", color: "from-pink-500 to-rose-500" },
  研究员: { icon: "🔍", color: "from-yellow-500 to-orange-500" },
  分析师: { icon: "📊", color: "from-indigo-500 to-purple-500" },
};

const STATUS_CONFIG = {
  active: { label: "工作中", color: "bg-green-500", glow: "shadow-green-500/50" },
  idle: { label: "离开", color: "bg-gray-400", glow: "shadow-gray-400/50" },
  busy: { label: "忙碌", color: "bg-red-500", glow: "shadow-red-500/50" },
};

const PRESET_TEAM: Omit<TeamMember, "_id">[] = [
  {
    name: "约书亚",
    role: "主控AI",
    description: "斌哥的AI助手，负责整体协调和任务分配。",
    responsibilities: ["协调各子代理的工作", "与斌哥直接沟通", "任务规划"],
    skills: ["项目管理", "协调沟通", "Next.js"],
    avatar: "🤖",
    status: "active",
    currentTask: "构建数字化办公室视图",
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now(),
  },
  {
    name: "代码专家",
    role: "开发者",
    description: "负责编写高质量代码。",
    responsibilities: ["编写组件", "设计API", "代码审查"],
    skills: ["React", "TypeScript", "Git"],
    avatar: "💻",
    status: "busy",
    currentTask: "优化性能",
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 300000,
  },
  {
    name: "文案编辑",
    role: "作家",
    description: "负责创作内容。",
    responsibilities: ["撰写文档", "创作脚本", "编辑文案"],
    skills: ["写作", "编辑"],
    avatar: "✍️",
    status: "idle",
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 3600000,
  },
  {
    name: "视觉设计师",
    role: "设计师",
    description: "负责UI/UX设计。",
    responsibilities: ["界面设计", "视觉设计", "设计系统"],
    skills: ["UI设计", "Figma"],
    avatar: "🎨",
    status: "active",
    currentTask: "设计新界面",
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 600000,
  },
  {
    name: "信息收集员",
    role: "研究员",
    description: "负责信息收集。",
    responsibilities: ["搜索信息", "数据分析", "调研"],
    skills: ["搜索", "分析"],
    avatar: "🔍",
    status: "active",
    currentTask: "市场调研",
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 900000,
  },
  {
    name: "数据分析师",
    role: "分析师",
    description: "负责数据分析。",
    responsibilities: ["数据分析", "报告", "统计"],
    skills: ["数据", "SQL"],
    avatar: "📊",
    status: "busy",
    currentTask: "生成报告",
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 180000,
  },
];

export default function OfficePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<"desk" | "status">("desk");

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
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

  const getMemberAtDesk = (deskId: number) => {
    return teamMembers[deskId];
  };

  const getStats = () => {
    return {
      total: teamMembers.length,
      active: teamMembers.filter((m) => m.status === "active").length,
      busy: teamMembers.filter((m) => m.status === "busy").length,
      idle: teamMembers.filter((m) => m.status === "idle").length,
    };
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                🏢 数字化办公室
              </h1>
              <p className="text-gray-300">实时查看团队成员工作状态</p>
            </div>
            <div className="flex space-x-3">
              <a
                href="/"
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              >
                📅 日历
              </a>
              <a
                href="/memories"
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              >
                🧠 记忆库
              </a>
              <a
                href="/team"
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              >
                👥 团队
              </a>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("desk")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "desk"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              🖥️ 办公室视图
            </button>
            <button
              onClick={() => setViewMode("status")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "status"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              📊 状态面板
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-300">团队规模</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
            <div className="text-sm text-gray-300">工作中</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-red-400">{stats.busy}</div>
            <div className="text-sm text-gray-300">忙碌</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-gray-400">{stats.idle}</div>
            <div className="text-sm text-gray-300">离开</div>
          </div>
        </div>

        {viewMode === "desk" ? (
          /* Office Desk View */
          <div className="relative">
            {/* Office Room */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 shadow-2xl">
              {/* Room Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">AI 团队办公室</h2>
                <p className="text-gray-400 text-sm">实时监控工作状态</p>
              </div>

              {/* Desk Grid - 3x2 Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFFICE_LAYOUT.map((desk) => {
                  const member = getMemberAtDesk(desk.id - 1);
                  const statusConfig = member ? STATUS_CONFIG[member.status] : null;
                  const roleConfig = member ? ROLE_CONFIG[member.role] : null;

                  return (
                    <div
                      key={desk.id}
                      className={`
                        relative rounded-xl p-6 border-2 transition-all duration-300
                        ${member ? "border-white/20 hover:border-white/40" : "border-dashed border-gray-700"}
                      `}
                    >
                      {member ? (
                        <>
                          {/* Desk Surface */}
                          <div
                            className={`
                              absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${desk.deskColor}
                            `}
                          ></div>

                          {/* Computer Monitor */}
                          <div className="relative mb-4">
                            <div className="bg-gray-900 rounded-lg p-4 border-4 border-gray-700 shadow-xl">
                              {/* Screen */}
                              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded p-4 h-32 flex flex-col items-center justify-center">
                                <div className="text-4xl mb-2">{member.avatar}</div>
                                <div className="text-white text-sm font-semibold">
                                  {member.name}
                                </div>
                                {member.currentTask && (
                                  <div className="text-xs text-blue-200 mt-1 text-center px-2">
                                    {member.currentTask}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* Monitor Stand */}
                            <div className="w-8 h-6 bg-gray-700 mx-auto"></div>
                            <div className="w-16 h-2 bg-gray-600 mx-auto rounded"></div>
                          </div>

                          {/* Avatar & Status */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`
                                  relative text-5xl
                                  ${statusConfig?.glow ? `shadow-lg ${statusConfig.glow}` : ""}
                                `}
                              >
                                {member.avatar}
                                {/* Status Indicator */}
                                <div
                                  className={`
                                    absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900
                                    ${statusConfig?.color}
                                    ${member.status === "active" || member.status === "busy" ? "animate-pulse" : ""}
                                  `}
                                ></div>
                              </div>
                              <div>
                                <div className="text-white font-semibold">{member.name}</div>
                                <div className="text-xs text-gray-400">
                                  {roleConfig?.icon} {member.role}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="text-gray-400 hover:text-white text-xl"
                            >
                              ℹ️
                            </button>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center justify-between">
                            <span
                              className={`
                                px-3 py-1 rounded-full text-xs font-semibold
                                ${
                                  member.status === "active"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : member.status === "busy"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                }
                              `}
                            >
                              {statusConfig?.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {format(new Date(member.updatedAt), "HH:mm", {
                                locale: zhCN,
                              })}
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Empty Desk */
                        <div className="flex flex-col items-center justify-center h-full py-8">
                          <div className="text-4xl mb-2 opacity-30">🪑</div>
                          <div className="text-gray-600 text-sm">空工位</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Status Panel View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => {
              const statusConfig = STATUS_CONFIG[member.status];
              const roleConfig = ROLE_CONFIG[member.role];

              return (
                <div
                  key={member._id}
                  onClick={() => setSelectedMember(member)}
                  className={`
                    bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 transition-all cursor-pointer
                    ${member.status === "active" ? "border-green-500/50" : ""}
                    ${member.status === "busy" ? "border-red-500/50" : ""}
                    ${member.status === "idle" ? "border-gray-500/50" : ""}
                    hover:bg-white/15
                  `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{member.avatar}</div>
                      <div>
                        <div className="text-white font-semibold">{member.name}</div>
                        <div className="text-xs text-gray-400">
                          {roleConfig?.icon} {member.role}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`
                        w-3 h-3 rounded-full ${statusConfig.color}
                        ${member.status === "active" || member.status === "busy" ? "animate-pulse" : ""}
                      `}
                    ></div>
                  </div>

                  {member.currentTask && (
                    <div className="mb-3 p-3 bg-white/5 rounded-lg">
                      <div className="text-xs font-semibold text-gray-400 mb-1">
                        当前任务
                      </div>
                      <div className="text-sm text-white">{member.currentTask}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full shadow-2xl border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{selectedMember.avatar}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedMember.name}</h2>
                    <p className="text-gray-400">
                      {ROLE_CONFIG[selectedMember.role].icon} {selectedMember.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-white text-3xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">简介</h3>
                  <p className="text-gray-300">{selectedMember.description}</p>
                </div>

                {selectedMember.currentTask && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">当前任务</h3>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white">{selectedMember.currentTask}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">职责</h3>
                  <ul className="space-y-2">
                    {selectedMember.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">状态管理</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "active")}
                      className={`
                        px-4 py-2 rounded-lg font-semibold transition-all
                        ${
                          selectedMember.status === "active"
                            ? "bg-green-600 text-white"
                            : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                        }
                      `}
                    >
                      🟢 工作中
                    </button>
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "busy")}
                      className={`
                        px-4 py-2 rounded-lg font-semibold transition-all
                        ${
                          selectedMember.status === "busy"
                            ? "bg-red-600 text-white"
                            : "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                        }
                      `}
                    >
                      🔴 忙碌
                    </button>
                    <button
                      onClick={() => updateMemberStatus(selectedMember._id, "idle")}
                      className={`
                        px-4 py-2 rounded-lg font-semibold transition-all
                        ${
                          selectedMember.status === "idle"
                            ? "bg-gray-600 text-white"
                            : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
                        }
                      `}
                    >
                      ⚪ 离开
                    </button>
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
