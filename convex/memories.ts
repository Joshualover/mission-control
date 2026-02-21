import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建记忆
export const createMemory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    importance: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const memoryId = await ctx.db.insert("memories", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return memoryId;
  },
});

// 获取所有记忆
export const getMemories = query({
  handler: async (ctx) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
    return memories;
  },
});

// 按重要性获取记忆
export const getMemoriesByImportance = query({
  args: { importance: v.string() },
  handler: async (ctx, args) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_importance", (q) => q.eq("importance", args.importance as any))
      .collect();
    return memories;
  },
});

// 按分类获取记忆
export const getMemoriesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return memories;
  },
});

// 更新记忆
export const updateMemory = mutation({
  args: {
    memoryId: v.id("memories"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    importance: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { memoryId, ...updates } = args;
    await ctx.db.patch(memoryId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除记忆
export const deleteMemory = mutation({
  args: { memoryId: v.id("memories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.memoryId);
  },
});
