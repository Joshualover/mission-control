import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建项目
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    stage: v.string(),
    content: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    assignedTo: v.string(),
    priority: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return projectId;
  },
});

// 获取所有项目
export const getProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .order("desc")
      .collect();
    return projects;
  },
});

// 按阶段获取项目
export const getProjectsByStage = query({
  args: { stage: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_stage", (q) => q.eq("stage", args.stage))
      .collect();
    return projects;
  },
});

// 按负责人获取项目
export const getProjectsByAssignee = query({
  args: { assignedTo: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_assignedTo", (q) => q.eq("assignedTo", args.assignedTo as any))
      .collect();
    return projects;
  },
});

// 按优先级获取项目
export const getProjectsByPriority = query({
  args: { priority: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_priority", (q) => q.eq("priority", args.priority as any))
      .collect();
    return projects;
  },
});

// 获取进行中的项目
export const getActiveProjects = query({
  handler: async (ctx) => {
    const stages = ["idea", "script", "production", "post-production", "review"];
    const projects = await ctx.db
      .query("projects")
      .collect();
    return projects.filter(p => stages.includes(p.stage));
  },
});

// 更新项目阶段
export const updateProjectStage = mutation({
  args: {
    projectId: v.id("projects"),
    stage: v.string(),
  },
  handler: async (ctx, args) => {
    const { projectId, stage } = args;
    const updates: any = {
      stage,
      updatedAt: Date.now(),
    };
    if (stage === "published") {
      updates.publishedAt = Date.now();
    }
    await ctx.db.patch(projectId, updates);
  },
});

// 更新项目
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    stage: v.optional(v.string()),
    content: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    assignedTo: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { projectId, ...updates } = args;
    await ctx.db.patch(projectId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除项目
export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});
