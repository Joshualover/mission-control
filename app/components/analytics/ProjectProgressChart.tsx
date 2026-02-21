"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface ProjectProgressChartProps {
  stageData: Array<{ name: string; value: number }>;
  priorityData: Array<{ name: string; value: number; color: string }>;
  projectStats?: {
    total: number;
    published: number;
    publishedRate: number;
  };
}

const STAGE_COLORS = ["#667eea", "#764ba2", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

const STAGE_LABELS: Record<string, string> = {
  idea: "创意",
  script: "脚本",
  production: "制作",
  "post-production": "后期",
  review: "审核",
  published: "已发布",
};

export const ProjectProgressChart: React.FC<ProjectProgressChartProps> = ({
  stageData,
  priorityData,
  projectStats,
}) => {
  const processedStageData = stageData.map(item => ({
    name: STAGE_LABELS[item.name] || item.name,
    value: item.value,
  }));

  const totalProjects = stageData.reduce((sum, item) => sum + item.value, 0);

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
          项目进度追踪
        </h3>
        <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>各阶段任务分布与优先级</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
        {/* 阶段分布饼图 */}
        <div>
          <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: "0 0 16px" }}>
            阶段分布
          </h4>
          <div style={{ height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processedStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  style={{ fontSize: "11px" }}
                >
                  {processedStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 优先级分布 */}
        <div>
          <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: "0 0 16px" }}>
            优先级分布
          </h4>
          <div style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
            {priorityData.map((item) => (
              <div key={item.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                  <span style={{ color: "#374151", fontWeight: "500" }}>{item.name}</span>
                  <span style={{ color: "#9ca3af", fontWeight: "600" }}>{item.value}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${totalProjects > 0 ? (item.value / totalProjects) * 100 : 0}%`,
                      height: "100%",
                      backgroundColor: item.color,
                      borderRadius: "4px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 项目统计摘要 */}
      {projectStats && (
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>总项目数</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a1a" }}>{projectStats.total}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>已发布</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#10b981" }}>{projectStats.published}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>发布率</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#667eea" }}>{projectStats.publishedRate}%</div>
          </div>
        </div>
      )}
    </div>
  );
};
