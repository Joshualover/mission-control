import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建任务
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    scheduledTime: v.number(),
    taskType: v.string(),
    recurrenceRule: v.optional(v.string()),
    assignedTo: v.string(),
    priority: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const taskId = await ctx.db.insert("scheduledTasks", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return taskId;
  },
});

// 获取所有任务
export const getTasks = query({
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .order("desc")
      .collect();
    return tasks;
  },
});

// 按状态获取任务
export const getTasksByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_status", (q) => q.eq("status", args.status as any))
      .collect();
    return tasks;
  },
});

// 按负责人获取任务
export const getTasksByAssignee = query({
  args: { assignedTo: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_assignedTo", (q) => q.eq("assignedTo", args.assignedTo as any))
      .collect();
    return tasks;
  },
});

// 获取待处理的任务
export const getPendingTasks = query({
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
    return tasks;
  },
});

// 更新任务状态
export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("scheduledTasks"),
    status: v.string(),
    completedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { taskId, status, completedAt } = args;
    await ctx.db.patch(taskId, {
      status,
      completedAt,
      updatedAt: Date.now(),
    });
  },
});

// 更新任务
export const updateTask = mutation({
  args: {
    taskId: v.id("scheduledTasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    scheduledTime: v.optional(v.number()),
    taskType: v.optional(v.string()),
    recurrenceRule: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { taskId, ...updates } = args;
    await ctx.db.patch(taskId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除任务
export const deleteTask = mutation({
  args: { taskId: v.id("scheduledTasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);
  },
});
