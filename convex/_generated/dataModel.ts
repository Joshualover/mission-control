// Auto-generated data model for Convex
// This is a simplified version for build purposes

export type Id<T extends string> = string;

export type TableNames = "scheduledTasks" | "memories" | "teamMembers" | "projects";

export type DocumentByName<T extends TableNames> = T extends "scheduledTasks"
  ? ScheduledTask
  : T extends "memories"
  ? Memory
  : T extends "teamMembers"
  ? TeamMember
  : T extends "projects"
  ? Project
  : never;

export type ScheduledTask = {
  _id: Id<"scheduledTasks">;
  title: string;
  description?: string;
  scheduledTime: number;
  status: "pending" | "completed" | "cancelled";
  taskType: "one-time" | "recurring";
  recurrenceRule?: string;
  assignedTo: string;
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
  role: string;
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
  stage: string;
  content?: string;
  images?: string[];
  assignedTo: string;
  priority: "low" | "medium" | "high";
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
};
