import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建团队成员
export const createTeamMember = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    description: v.string(),
    responsibilities: v.array(v.string()),
    skills: v.array(v.string()),
    avatar: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const memberId = await ctx.db.insert("teamMembers", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return memberId;
  },
});

// 获取所有团队成员
export const getTeamMembers = query({
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .order("desc")
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

// 按角色获取成员
export const getMembersByRole = query({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
    return members;
  },
});

// 获取活跃成员
export const getActiveMembers = query({
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
    return members;
  },
});

// 更新成员状态
export const updateMemberStatus = mutation({
  args: {
    memberId: v.id("teamMembers"),
    status: v.string(),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { memberId, status, currentTask } = args;
    await ctx.db.patch(memberId, {
      status,
      currentTask,
      updatedAt: Date.now(),
    });
  },
});

// 更新成员信息
export const updateMember = mutation({
  args: {
    memberId: v.id("teamMembers"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    description: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { memberId, ...updates } = args;
    await ctx.db.patch(memberId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除成员
export const deleteMember = mutation({
  args: { memberId: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.memberId);
  },
});
