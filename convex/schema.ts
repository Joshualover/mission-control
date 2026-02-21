import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  scheduledTasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    scheduledTime: v.number(), // Unix timestamp
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("cancelled")),
    taskType: v.union(v.literal("one-time"), v.literal("recurring")),
    recurrenceRule: v.optional(v.string()), // Cron 表达式
    assignedTo: v.union(v.literal("斌哥"), v.literal("约书亚")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_scheduledTime", ["scheduledTime"])
    .index("by_status", ["status"])
    .index("by_assignedTo", ["assignedTo"]),

  memories: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()), // 来源文件或对话
    importance: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_importance", ["importance"])
    .index("by_createdAt", ["createdAt"]),

  teamMembers: defineTable({
    name: v.string(),
    role: v.union(
      v.literal("主控AI"),
      v.literal("开发者"),
      v.literal("作家"),
      v.literal("设计师"),
      v.literal("研究员"),
      v.literal("分析师")
    ),
    description: v.string(),
    responsibilities: v.array(v.string()),
    skills: v.array(v.string()),
    avatar: v.string(), // emoji 或头像 URL
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("busy")),
    currentTask: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_role", ["role"])
    .index("by_status", ["status"]),
});
