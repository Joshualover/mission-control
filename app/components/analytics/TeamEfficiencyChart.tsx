"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TeamEfficiencyChartProps {
  data: Array<{
    name: string;
    role: string;
    total: number;
    completed: number;
    pending: number;
    avgTime: number;
    efficiency: number;
  }>;
}

const COLORS = ["#667eea", "#764ba2", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export const TeamEfficiencyChart: React.FC<TeamEfficiencyChartProps> = ({ data }) => {
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
          团队效率分析
        </h3>
        <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>成员任务完成情况与效率</p>
      </div>

      <div style={{ height: "280px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" style={{ fontSize: "12px", fill: "#9ca3af" }} tick={{ fill: "#9ca3af" }} />
            <YAxis
              type="category"
              dataKey="name"
              style={{ fontSize: "13px", fill: "#374151" }}
              tick={{ fill: "#374151" }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "完成率") return [`${value}%`, name];
                if (name === "平均时间") return [`${value}分钟`, name];
                return [value, name];
              }}
            />
            <Bar dataKey="completed" fill="#667eea" radius={[0, 8, 8, 0]} name="完成任务" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 团队成员详情卡片 */}
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {data.map((member, index) => (
          <div
            key={member.name}
            style={{
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]} 0%, ${COLORS[(index + 1) % COLORS.length]} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {member.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}>{member.name}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{member.role}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px" }}>
              <div>
                <span style={{ color: "#9ca3af" }}>完成: </span>
                <span style={{ fontWeight: "600", color: "#10b981" }}>{member.completed}</span>
              </div>
              <div>
                <span style={{ color: "#9ca3af" }}>待办: </span>
                <span style={{ fontWeight: "600", color: "#f59e0b" }}>{member.pending}</span>
              </div>
              <div>
                <span style={{ color: "#9ca3af" }}>效率: </span>
                <span style={{ fontWeight: "600", color: "#667eea" }}>{member.efficiency}%</span>
              </div>
              <div>
                <span style={{ color: "#9ca3af" }}>均时: </span>
                <span style={{ fontWeight: "600" }}>{member.avgTime}m</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
