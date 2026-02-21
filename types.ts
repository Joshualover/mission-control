// 简化的类型定义，用于构建

export type Id<T> = string;

export type ScheduledTask = {
  _id: Id<"scheduledTasks">;
  title: string;
  description?: string;
  scheduledTime: number;
  status: "pending" | "completed" | "cancelled";
  taskType: "one-time" | "recurring";
  recurrenceRule?: string;
  assignedTo: "斌哥" | "约书亚";
  priority: "low" | "medium" | "high";
  completedAt?: number;
  createdAt: number;
  updatedAt: number;
};

export type Memory = {
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

export type TeamMember = {
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

export type Project = {
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
