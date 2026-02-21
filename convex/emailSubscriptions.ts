import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 订阅邮件
export const subscribe = mutation({
  args: {
    email: v.string(),
    preferences: v.optional(v.object({
      deadlineReminders: v.optional(v.boolean()),
      statusChanges: v.optional(v.boolean()),
      dailySummary: v.optional(v.boolean()),
      weeklySummary: v.optional(v.boolean()),
    })),
    reminderHour: v.optional(v.number()),
    timezone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { email, preferences, reminderHour, timezone } = args;

    // 检查是否已存在
    const existing = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    const now = Date.now();
    const unsubscribeToken = `${email}-${now}-${Math.random().toString(36).substring(7)}`;

    if (existing) {
      // 更新现有订阅
      await ctx.db.patch(existing._id, {
        isActive: true,
        preferences: {
          deadlineReminders: preferences?.deadlineReminders ?? true,
          statusChanges: preferences?.statusChanges ?? true,
          dailySummary: preferences?.dailySummary ?? true,
          weeklySummary: preferences?.weeklySummary ?? true,
        },
        reminderHour: reminderHour ?? 9,
        timezone: timezone ?? "Asia/Shanghai",
        unsubscribeToken,
        updatedAt: now,
      });
      return { success: true, subscriptionId: existing._id };
    } else {
      // 创建新订阅
      const subscriptionId = await ctx.db.insert("emailSubscriptions", {
        email,
        isActive: true,
        preferences: {
          deadlineReminders: preferences?.deadlineReminders ?? true,
          statusChanges: preferences?.statusChanges ?? true,
          dailySummary: preferences?.dailySummary ?? true,
          weeklySummary: preferences?.weeklySummary ?? true,
        },
        reminderHour: reminderHour ?? 9,
        timezone: timezone ?? "Asia/Shanghai",
        unsubscribeToken,
        createdAt: now,
        updatedAt: now,
      });
      return { success: true, subscriptionId };
    }
  },
});

// 取消订阅
export const unsubscribe = mutation({
  args: {
    unsubscribeToken: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriptions = await ctx.db
      .query("emailSubscriptions")
      .filter((q) => q.eq(q.field("unsubscribeToken"), args.unsubscribeToken))
      .collect();

    if (subscriptions.length === 0) {
      return { success: false, error: "Invalid unsubscribe token" };
    }

    const subscription = subscriptions[0];
    await ctx.db.patch(subscription._id, {
      isActive: false,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 通过邮箱取消订阅
export const unsubscribeByEmail = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existing) {
      return { success: false, error: "Subscription not found" };
    }

    await ctx.db.patch(existing._id, {
      isActive: false,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 获取订阅信息
export const getSubscription = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return subscription;
  },
});

// 获取所有活跃订阅
export const getActiveSubscriptions = query({
  args: {
    preference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const subscriptions = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    if (args.preference) {
      return subscriptions.filter(sub => sub.preferences[args.preference as keyof typeof sub.preferences] === true);
    }

    return subscriptions;
  },
});

// 更新订阅偏好
export const updatePreferences = mutation({
  args: {
    email: v.string(),
    preferences: v.object({
      deadlineReminders: v.optional(v.boolean()),
      statusChanges: v.optional(v.boolean()),
      dailySummary: v.optional(v.boolean()),
      weeklySummary: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existing) {
      return { success: false, error: "Subscription not found" };
    }

    await ctx.db.patch(existing._id, {
      preferences: {
        ...existing.preferences,
        ...args.preferences,
      },
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 更新提醒时间
export const updateReminderTime = mutation({
  args: {
    email: v.string(),
    reminderHour: v.number(),
    timezone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existing) {
      return { success: false, error: "Subscription not found" };
    }

    await ctx.db.patch(existing._id, {
      reminderHour: args.reminderHour,
      ...(args.timezone && { timezone: args.timezone }),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
