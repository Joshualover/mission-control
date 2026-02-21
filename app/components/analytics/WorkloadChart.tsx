"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WorkloadChartProps {
  trendData: Array<{
    date: string;
    displayDate: string;
    completed: number;
    created: number;
  }>;
  heatmapData: Array<{
    day: number;
    value: number;
  }>;
}

export const WorkloadChart: React.FC<WorkloadChartProps> = ({ trendData, heatmapData }) => {
  // 计算每日工作负载（基于完成任务数）
  const workloadData = trendData.map(item => ({
    date: item.displayDate,
    tasks: item.completed,
    efficiency: item.created > 0 ? Math.round((item.completed / item.created) * 100) : 0,
  }));

  // 计算平均效率
  const avgEfficiency = workloadData.length > 0
    ? Math.round(workloadData.reduce((sum, item) => sum + item.efficiency, 0) / workloadData.length)
    : 0;

  // 热力图配置（7天 x 24小时，简化为7天）
  const heatmapCells = Array.from({ length: 7 }, (_, i) => {
    const dayData = heatmapData[i];
    const intensity = dayData ? Math.min(dayData.value / 10, 1) : 0;
    return {
      day: i,
      intensity,
      value: dayData?.value || 0,
    };
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        height: "100%",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>
          工作负载分析
        </h3>
        <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>每日任务量与效率趋势</p>
      </div>

      {/* 效率趋势图 */}
      <div style={{ height: "220px", marginBottom: "24px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={workloadData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              style={{ fontSize: "12px", fill: "#9ca3af" }}
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              yAxisId="left"
              style={{ fontSize: "12px", fill: "#9ca3af" }}
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              style={{ fontSize: "12px", fill: "#9ca3af" }}
              tick={{ fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "完成任务") return [value, name];
                return [`${value}%`, name];
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="tasks"
              stroke="#667eea"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTasks)"
              name="完成任务"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="efficiency"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEfficiency)"
              name="效率"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 活跃度热力图 */}
      <div>
        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: "0 0 12px" }}>
          本周活跃度热力图
        </h4>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => {
            const cell = heatmapCells[index];
            const bgColor = `rgba(102, 126, 234, ${cell.intensity})`;
            return (
              <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 }}>
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: bgColor,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: cell.intensity > 0.5 ? "white" : "#667eea",
                    transition: "all 0.2s ease",
                  }}
                  title={`${cell.value} 个任务`}
                >
                  {cell.value}
                </div>
                <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500" }}>{day}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            浅色 = 低活跃度，深色 = 高活跃度
          </div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#10b981" }}>
            平均效率: {avgEfficiency}%
          </div>
        </div>
      </div>

      {/* 工作类型分布（基于优先级） */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
          任务类型分布
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#ef4444" }} />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>高优先级</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#f59e0b" }} />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>中优先级</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#10b981" }} />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>低优先级</span>
          </div>
        </div>
      </div>
    </div>
  );
};
