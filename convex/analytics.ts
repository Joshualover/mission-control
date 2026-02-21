import { query } from "./_generated/server";
import { v } from "convex/values";

// 获取任务统计数据
export const getTaskStats = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query("scheduledTasks").collect();

    let filteredTasks = tasks;
    if (args.startDate) {
      filteredTasks = filteredTasks.filter(t => t.scheduledTime >= args.startDate!);
    }
    if (args.endDate) {
      filteredTasks = filteredTasks.filter(t => t.scheduledTime <= args.endDate!);
    }

    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status === "completed").length;
    const pending = filteredTasks.filter(t => t.status === "pending").length;
    const cancelled = filteredTasks.filter(t => t.status === "cancelled").length;

    const byAssignee = filteredTasks.reduce((acc, task) => {
      const assignee = task.assignedTo;
      if (!acc[assignee]) {
        acc[assignee] = { total: 0, completed: 0, pending: 0, avgTime: 0 };
      }
      acc[assignee].total++;
      if (task.status === "completed") {
        acc[assignee].completed++;
        if (task.completedAt && task.scheduledTime) {
          acc[assignee].avgTime += task.completedAt - task.scheduledTime;
        }
      } else if (task.status === "pending") {
        acc[assignee].pending++;
      }
      return acc;
    }, {} as Record<string, { total: number; completed: number; pending: number; avgTime: number }>);

    // 计算平均完成时间
    Object.keys(byAssignee).forEach(assignee => {
      const data = byAssignee[assignee];
      if (data.completed > 0) {
        data.avgTime = Math.round(data.avgTime / data.completed);
      }
    });

    const byPriority = {
      high: filteredTasks.filter(t => t.priority === "high").length,
      medium: filteredTasks.filter(t => t.priority === "medium").length,
      low: filteredTasks.filter(t => t.priority === "low").length,
    };

    return {
      total,
      completed,
      pending,
      cancelled,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      byAssignee,
      byPriority,
    };
  },
});

// 获取任务完成趋势（按天）
export const getTaskTrend = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 7;
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    const startDate = now - days * dayInMs;

    const tasks = await ctx.db.query("scheduledTasks").collect();

    // 按天分组
    const trend: Record<string, { completed: number; created: number }> = {};

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate + i * dayInMs);
      const dateKey = date.toISOString().split('T')[0];
      trend[dateKey] = { completed: 0, created: 0 };
    }

    tasks.forEach(task => {
      if (task.scheduledTime >= startDate && task.scheduledTime <= now) {
        const date = new Date(task.scheduledTime);
        const dateKey = date.toISOString().split('T')[0];
        if (trend[dateKey]) {
          trend[dateKey].created++;
          if (task.status === "completed") {
            trend[dateKey].completed++;
          }
        }
      }
    });

    return Object.entries(trend).map(([date, data]) => ({
      date,
      ...data,
    }));
  },
});

// 获取项目统计
export const getProjectStats = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();

    const total = projects.length;
    const byStage = projects.reduce((acc, project) => {
      acc[project.stage] = (acc[project.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = {
      high: projects.filter(p => p.priority === "high").length,
      medium: projects.filter(p => p.priority === "medium").length,
      low: projects.filter(p => p.priority === "low").length,
    };

    const published = projects.filter(p => p.publishedAt).length;

    return {
      total,
      byStage,
      byPriority,
      published,
      publishedRate: total > 0 ? Math.round((published / total) * 100) : 0,
    };
  },
});

// 获取团队效率统计
export const getTeamEfficiency = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 7;
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    const startDate = now - days * dayInMs;

    const tasks = await ctx.db.query("scheduledTasks").collect();
    const teamMembers = await ctx.db.query("teamMembers").collect();

    const memberStats = teamMembers.map(member => {
      const memberTasks = tasks.filter(
        t => t.assignedTo === member.name && t.scheduledTime >= startDate
      );

      const completed = memberTasks.filter(t => t.status === "completed").length;
      const pending = memberTasks.filter(t => t.status === "pending").length;
      const avgTime = memberTasks
        .filter(t => t.status === "completed" && t.completedAt)
        .reduce((sum, t) => sum + (t.completedAt! - t.scheduledTime), 0) / (completed || 1);

      return {
        name: member.name,
        role: member.role,
        status: member.status,
        total: memberTasks.length,
        completed,
        pending,
        avgTime: Math.round(avgTime / 1000 / 60), // 转换为分钟
        efficiency: memberTasks.length > 0 ? Math.round((completed / memberTasks.length) * 100) : 0,
      };
    });

    return memberStats;
  },
});
