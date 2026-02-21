import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 获取所有计划任务
export const listScheduledTasks = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("scheduledTasks").collect();
    return tasks.sort((a, b) => a.scheduledTime - b.scheduledTime);
  },
});

// 获取单个任务
export const getScheduledTask = query({
  args: { id: v.id("scheduledTasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// 获取指定日期范围的任务
export const getTasksByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_scheduledTime")
      .range(
        args.startDate,
        args.endDate
      )
      .collect();
    return tasks;
  },
});

// 获取即将到来的任务
export const getUpcomingTasks = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const now = Date.now();
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_scheduledTime")
      .collect();
    
    const upcomingTasks = tasks
      .filter(task => 
        task.scheduledTime >= now && 
        task.status === "pending"
      )
      .sort((a, b) => a.scheduledTime - b.scheduledTime);
    
    return args.limit 
      ? upcomingTasks.slice(0, args.limit) 
      : upcomingTasks;
  },
});

// 创建计划任务
export const createScheduledTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    scheduledTime: v.number(),
    taskType: v.union(v.literal("one-time"), v.literal("recurring")),
    recurrenceRule: v.optional(v.string()),
    assignedTo: v.union(v.literal("斌哥"), v.literal("约书亚")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("scheduledTasks", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// 更新任务
export const updateScheduledTask = mutation({
  args: {
    id: v.id("scheduledTasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    scheduledTime: v.optional(v.number()),
    recurrenceRule: v.optional(v.string()),
    assignedTo: v.optional(v.union(v.literal("斌哥"), v.literal("约书亚"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 完成任务
export const completeScheduledTask = mutation({
  args: { id: v.id("scheduledTasks") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: "completed",
      completedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// 取消任务
export const cancelScheduledTask = mutation({
  args: { id: v.id("scheduledTasks") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: "cancelled",
      updatedAt: Date.now(),
    });
  },
});

// 删除任务
export const deleteScheduledTask = mutation({
  args: { id: v.id("scheduledTasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
