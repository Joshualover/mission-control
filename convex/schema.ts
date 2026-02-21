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
});
