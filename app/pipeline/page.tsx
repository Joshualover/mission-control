"use client";

import { useState, useEffect } from "react";
import { Id } from "../../types";

type Project = {
  _id: Id<"projects">;
  title: string;
  description: string;
  stage: "idea" | "script" | "production" | "post-production" | "review" | "published";
  content?: string;
  images?: string[];
  assignedTo: "斌哥" | "约书亚";
  priority: "low" | "medium" | "high";
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
};

const STAGES = [
  { value: "idea", label: "💡 创意", color: "bg-purple-100", icon: "💡" },
  { value: "script", label: "📝 脚本", color: "bg-blue-100", icon: "📝" },
  { value: "production", label: "🎬 制作", color: "bg-yellow-100", icon: "🎬" },
  { value: "post-production", label: "✨ 后期", color: "bg-orange-100", icon: "✨" },
  { value: "review", label: "👀 审核", color: "bg-pink-100", icon: "👀" },
  { value: "published", label: "✅ 已发布", color: "bg-green-100", icon: "✅" },
] as const;

const PRIORITIES = [
  { value: "low", label: "🟢 低", color: "border-green-500" },
  { value: "medium", label: "🟡 中", color: "border-yellow-500" },
  { value: "high", label: "🔴 高", color: "border-red-500" },
] as const;

const ASSIGNEES = [
  { value: "斌哥", label: "斌哥", avatar: "👨‍💼" },
  { value: "约书亚", label: "约书亚", avatar: "🤖" },
] as const;

const PRESET_PROJECTS: Omit<Project, "_id">[] = [
  {
    title: "AI 系列视频",
    description: "制作关于人工智能的系列视频内容",
    stage: "idea",
    content: "主题：AI的发展历程、应用场景、未来趋势",
    assignedTo: "斌哥",
    priority: "high",
    images: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    title: "产品评测脚本",
    description: "最新科技产品的深度评测",
    stage: "script",
    content: "开头引入、产品介绍、使用体验、优缺点分析、总结建议",
    assignedTo: "约书亚",
    priority: "medium",
    images: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    title: "教程文档编写",
    description: "编写 Next.js + Convex 教程",
    stage: "production",
    content: "项目初始化、数据库设计、API实现、部署流程",
    assignedTo: "约书亚",
    priority: "high",
    images: [],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 3600000,
  },
];

export default function PipelinePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "idea" as const,
    content: "",
    assignedTo: "斌哥" as const,
    priority: "medium" as const,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const projectsWithIds: Project[] = PRESET_PROJECTS.map((project, index) => ({
      ...project,
      _id: `project_${index}` as Id<"projects">,
    }));
    setProjects(projectsWithIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      _id: Math.random().toString() as Id<"projects">,
      ...formData,
      images: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setProjects([...projects, newProject]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      stage: "idea",
      content: "",
      assignedTo: "斌哥",
      priority: "medium",
    });
  };

  const updateProjectStage = async (
    projectId: Id<"projects">,
    newStage: Project["stage"]
  ) => {
    setProjects(
      projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              stage: newStage,
              updatedAt: Date.now(),
              ...(newStage === "published" && !project.publishedAt
                ? { publishedAt: Date.now() }
                : {}),
            }
          : project
      )
    );
  };

  const deleteProject = async (projectId: Id<"projects">) => {
    setProjects(projects.filter((project) => project._id !== projectId));
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎬 内容管道
          </h1>
          <p className="text-gray-600 mb-4">跟踪和管理所有内容创作项目</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            ➕ 新建项目
          </button>
        </div>

        {/* Pipeline Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {STAGES.map((stage) => (
            <div key={stage.value} className={`${stage.color} rounded-lg p-4 min-h-[500px]`}>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{stage.icon}</span>
                <h2 className="text-lg font-bold">{stage.label}</h2>
              </div>
              <div className="space-y-3">
                {projects
                  .filter((project) => project.stage === stage.value)
                  .map((project) => (
                    <div
                      key={project._id}
                      onClick={() => openProject(project)}
                      className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 hover:scale-[1.02]"
                      style={{
                        borderLeftColor:
                          PRIORITIES.find((p) => p.value === project.priority)?.color
                            .split("-")[1] || "gray",
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 flex-1 text-sm">
                          {project.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project._id);
                          }}
                          className="text-red-500 hover:text-red-700 ml-2 text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <span>{ASSIGNEES.find((a) => a.value === project.assignedTo)?.avatar}</span>
                          <span className="text-gray-500">
                            {ASSIGNEES.find((a) => a.value === project.assignedTo)?.label}
                          </span>
                        </div>
                        <span className="bg-gray-200 px-2 py-0.5 rounded">
                          {PRIORITIES.find((p) => p.value === project.priority)?.label}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* New Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">📝 新建项目</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">项目标题 *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="输入项目标题..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">项目描述 *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                    placeholder="简要描述项目内容..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">详细内容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={6}
                    placeholder="输入完整脚本、创意详情或其他内容..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">分配给</label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedTo: e.target.value as "斌哥" | "约书亚",
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {ASSIGNEES.map((assignee) => (
                        <option key={assignee.value} value={assignee.value}>
                          {assignee.avatar} {assignee.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">优先级</label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as const,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {PRIORITIES.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">初始阶段</label>
                  <select
                    value={formData.stage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stage: e.target.value as Project["stage"],
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {STAGES.map((stage) => (
                      <option key={stage.value} value={stage.value}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    创建项目
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

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">描述</h3>
                  <p className="text-gray-800">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">内容</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedProject.content || "暂无内容"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">当前阶段</h3>
                    <p className="text-gray-800">
                      {STAGES.find((s) => s.value === selectedProject.stage)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">优先级</h3>
                    <p className="text-gray-800">
                      {PRIORITIES.find((p) => p.value === selectedProject.priority)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">分配给</h3>
                    <p className="text-gray-800">
                      {ASSIGNEES.find((a) => a.value === selectedProject.assignedTo)?.avatar}{" "}
                      {ASSIGNEES.find((a) => a.value === selectedProject.assignedTo)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">更新时间</h3>
                    <p className="text-gray-800">
                      {new Date(selectedProject.updatedAt).toLocaleString("zh-CN")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">移动到下一阶段</h3>
                  <div className="flex flex-wrap gap-2">
                    {STAGES.filter((s) => s.value !== selectedProject.stage).map((stage) => (
                      <button
                        key={stage.value}
                        onClick={() => {
                          updateProjectStage(selectedProject._id, stage.value);
                          setSelectedProject({
                            ...selectedProject,
                            stage: stage.value,
                            updatedAt: Date.now(),
                          });
                        }}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors"
                      >
                        → {stage.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
