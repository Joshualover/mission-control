import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建评论
export const createComment = mutation({
  args: {
    taskId: v.id("scheduledTasks"),
    author: v.string(),
    content: v.string(),
    mentions: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const commentId = await ctx.db.insert("comments", {
      taskId: args.taskId,
      author: args.author,
      content: args.content,
      mentions: args.mentions || [],
      createdAt: now,
      updatedAt: now,
      isEdited: false,
    });
    return commentId;
  },
});

// 获取任务的所有评论
export const getCommentsByTask = query({
  args: {
    taskId: v.id("scheduledTasks"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_task_created", (q) =>
        q.eq("taskId", args.taskId)
      )
      .collect();
    
    return comments.map(comment => ({
      ...comment,
      // 格式化时间显示
      formattedTime: new Date(comment.createdAt).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
  },
});

// 更新评论
export const updateComment = mutation({
  args: {
    commentId: v.id("comments"),
    content: v.string(),
    mentions: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("评论不存在");
    }

    await ctx.db.patch(args.commentId, {
      content: args.content,
      mentions: args.mentions || comment.mentions,
      updatedAt: Date.now(),
      isEdited: true,
    });

    return args.commentId;
  },
});

// 删除评论
export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("评论不存在");
    }

    await ctx.db.delete(args.commentId);
    return args.commentId;
  },
});

// 获取任务的评论数量
export const getCommentCount = query({
  args: {
    taskId: v.id("scheduledTasks"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();

    return comments.length;
  },
});
