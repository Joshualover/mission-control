"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskTrendChartProps {
  data: Array<{
    date: string;
    displayDate: string;
    completed: number;
    created: number;
  }>;
}

type ViewMode = "daily" | "weekly" | "monthly";

export const TaskTrendChart: React.FC<TaskTrendChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [chartType, setChartType] = useState<"line" | "bar">>("line");

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>
            任务完成趋势
          </h3>
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>任务创建与完成情况</p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "line" | "bar")}
            style={{
              padding: "8px 16px",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "10px",
              fontSize: "13px",
              backgroundColor: "#f9fafb",
              cursor: "pointer",
            }}
          >
            <option value="line">曲线图</option>
            <option value="bar">柱状图</option>
          </select>
        </div>
      </div>

      <div style={{ height: "280px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                style={{ fontSize: "12px", fill: "#9ca3af" }}
                tick={{ fill: "#9ca3af" }}
              />
              <YAxis
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
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: "#667eea", r: 4 }}
                activeDot={{ r: 6 }}
                name="已完成"
              />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#764ba2"
                strokeWidth={3}
                dot={{ fill: "#764ba2", r: 4 }}
                activeDot={{ r: 6 }}
                name="已创建"
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                style={{ fontSize: "12px", fill: "#9ca3af" }}
                tick={{ fill: "#9ca3af" }}
              />
              <YAxis
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
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar dataKey="completed" fill="#667eea" radius={[8, 8, 0, 0]} name="已完成" />
              <Bar dataKey="created" fill="#764ba2" radius={[8, 8, 0, 0]} name="已创建" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
