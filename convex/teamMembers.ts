import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 获取所有团队成员
export const listTeamMembers = query({
  handler: async (ctx) => {
    const members = await ctx.db.query("teamMembers").collect();
    return members;
  },
});

// 获取单个成员
export const getTeamMember = query({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// 按角色获取成员
export const getMembersByRole = query({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_role", (q) => q.eq("role", args.role as any))
      .collect();
    return members;
  },
});

// 按状态获取成员
export const getMembersByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_status", (q) => q.eq("status", args.status as any))
      .collect();
    return members;
  },
});

// 创建团队成员
export const createTeamMember = mutation({
  args: {
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
    avatar: v.string(),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("busy")),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("teamMembers", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// 更新成员状态
export const updateMemberStatus = mutation({
  args: {
    id: v.id("teamMembers"),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("busy")),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 更新成员信息
export const updateTeamMember = mutation({
  args: {
    id: v.id("teamMembers"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除成员
export const deleteTeamMember = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
