"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useMemo } from "react";

export type TimeRange = "week" | "month" | "year";
export type ViewMode = "daily" | "weekly" | "monthly";

export function useAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [viewMode, setViewMode] = useState<ViewMode>("daily");

  // 根据时间范围计算天数
  const days = useMemo(() => {
    switch (timeRange) {
      case "week":
        return 7;
      case "month":
        return 30;
      case "year":
        return 365;
      default:
        return 7;
    }
  }, [timeRange]);

  // 计算时间范围
  const dateRange = useMemo(() => {
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    const startDate = now - days * dayInMs;

    // 计算对比时间范围（上一个周期）
    const prevStartDate = startDate - days * dayInMs;
    const prevEndDate = startDate;

    return { startDate, endDate: now, prevStartDate, prevEndDate };
  }, [days]);

  // 获取统计数据
  const currentStats = useQuery(api.analytics.getTaskStats, {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const previousStats = useQuery(api.analytics.getTaskStats, {
    startDate: dateRange.prevStartDate,
    endDate: dateRange.prevEndDate,
  });

  const taskTrend = useQuery(api.analytics.getTaskTrend, { days });
  const projectStats = useQuery(api.analytics.getProjectStats, {});
  const teamEfficiency = useQuery(api.analytics.getTeamEfficiency, { days });

  // 计算变化率
  const changes = useMemo(() => {
    if (!currentStats || !previousStats) {
      return {
        totalChange: 0,
        completionRateChange: 0,
        avgCompletionTimeChange: 0,
      };
    }

    const totalChange = previousStats.total > 0
      ? Math.round(((currentStats.total - previousStats.total) / previousStats.total) * 100)
      : 0;

    const completionRateChange = currentStats.completionRate - previousStats.completionRate;

    const avgCompletionTimeChange = 0; // 需要更复杂的计算

    return {
      totalChange,
      completionRateChange,
      avgCompletionTimeChange,
    };
  }, [currentStats, previousStats]);

  // 处理趋势数据用于图表
  const trendData = useMemo(() => {
    if (!taskTrend) return [];

    return taskTrend.map(item => ({
      ...item,
      displayDate: new Date(item.date).toLocaleDateString("zh-CN", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [taskTrend]);

  // 团队效率数据
  const teamData = useMemo(() => {
    if (!teamEfficiency) return [];
    return teamEfficiency;
  }, [teamEfficiency]);

  // 项目阶段数据
  const stageData = useMemo(() => {
    if (!projectStats) return [];

    return Object.entries(projectStats.byStage || {}).map(([stage, count]) => ({
      name: stage,
      value: count,
    }));
  }, [projectStats]);

  // 优先级数据
  const priorityData = useMemo(() => {
    if (!currentStats) return [];

    return [
      { name: "高优先级", value: currentStats.byPriority?.high || 0, color: "#ef4444" },
      { name: "中优先级", value: currentStats.byPriority?.medium || 0, color: "#f59e0b" },
      { name: "低优先级", value: currentStats.byPriority?.low || 0, color: "#10b981" },
    ];
  }, [currentStats]);

  // 活跃度热力图数据
  const heatmapData = useMemo(() => {
    if (!taskTrend) return [];

    return taskTrend.map((item, index) => ({
      day: index,
      value: item.completed,
    }));
  }, [taskTrend]);

  // 导出数据
  const exportData = useMemo(() => {
    return {
      stats: currentStats,
      trend: trendData,
      team: teamData,
      projects: projectStats,
      generatedAt: new Date().toISOString(),
    };
  }, [currentStats, trendData, teamData, projectStats]);

  return {
    // 数据
    currentStats,
    previousStats,
    taskTrend: trendData,
    projectStats,
    teamEfficiency: teamData,
    stageData,
    priorityData,
    heatmapData,
    changes,
    exportData,

    // 控制器
    timeRange,
    setTimeRange,
    viewMode,
    setViewMode,
    days,
    dateRange,

    // 加载状态
    isLoading: !currentStats || !taskTrend || !projectStats || !teamEfficiency,
  };
}
