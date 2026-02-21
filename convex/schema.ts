import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// 任务评论表和邮件订阅表
export default defineSchema({
  comments: defineTable({
    // 关联的任务ID
    taskId: v.id("scheduledTasks"),
    // 评论作者
    author: v.string(),
    // 评论内容（支持Markdown）
    content: v.string(),
    // 创建时间
    createdAt: v.number(),
    // 更新时间
    updatedAt: v.number(),
    // @提及的用户列表
    mentions: v.optional(v.array(v.string())),
    // 是否已编辑
    isEdited: v.boolean(),
  })
    .index("by_task", ["taskId"])
    .index("by_task_created", ["taskId", "createdAt"]),

  // 邮件订阅表
  emailSubscriptions: defineTable({
    // 邮箱地址
    email: v.string(),
    // 订阅状态
    isActive: v.boolean(),
    // 通知偏好
    preferences: v.object({
      // 任务截止提醒
      deadlineReminders: v.boolean(),
      // 状态变更通知
      statusChanges: v.boolean(),
      // 每日摘要
      dailySummary: v.boolean(),
      // 每周摘要
      weeklySummary: v.boolean(),
    }),
    // 提醒时间（小时，0-23）
    reminderHour: v.number(),
    // 时区
    timezone: v.string(),
    // 取消订阅令牌
    unsubscribeToken: v.string(),
    // 创建时间
    createdAt: v.number(),
    // 更新时间
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_active", ["isActive"]),
});
