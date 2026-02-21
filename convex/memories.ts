import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 获取所有记忆
export const listMemories = query({
  handler: async (ctx) => {
    const memories = await ctx.db.query("memories").collect();
    return memories.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// 获取单个记忆
export const getMemory = query({
  args: { id: v.id("memories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
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
    return memories.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// 搜索记忆（标题和内容）
export const searchMemories = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const memories = await ctx.db.query("memories").collect();
    const queryLower = args.query.toLowerCase();
    
    return memories
      .filter(
        (memory) =>
          memory.title.toLowerCase().includes(queryLower) ||
          memory.content.toLowerCase().includes(queryLower) ||
          memory.tags?.some((tag) => tag.toLowerCase().includes(queryLower))
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});

// 获取所有分类
export const getCategories = query({
  handler: async (ctx) => {
    const memories = await ctx.db.query("memories").collect();
    const categories = new Set(memories.map((m) => m.category).filter(Boolean));
    return Array.from(categories);
  },
});

// 创建记忆
export const createMemory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    importance: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("memories", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// 更新记忆
export const updateMemory = mutation({
  args: {
    id: v.id("memories"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    importance: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除记忆
export const deleteMemory = mutation({
  args: { id: v.id("memories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
