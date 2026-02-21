"use client";

import React from "react";

interface ExportButtonProps {
  data: any;
  filename?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, filename = "analytics-export" }) => {
  const exportToCSV = () => {
    // 将数据转换为CSV格式
    let csvContent = "";

    // 添加元数据
    csvContent += `数据分析报告,${new Date().toLocaleString("zh-CN")}\n\n`;

    // 统计数据
    if (data.stats) {
      csvContent += "统计数据\n";
      csvContent += "指标,数值\n";
      csvContent += `总任务数,${data.stats.total}\n`;
      csvContent += `已完成,${data.stats.completed}\n`;
      csvContent += `待处理,${data.stats.pending}\n`;
      csvContent += `完成率,${data.stats.completionRate}%\n\n`;
    }

    // 趋势数据
    if (data.trend && data.trend.length > 0) {
      csvContent += "任务趋势\n";
      csvContent += "日期,已创建,已完成\n";
      data.trend.forEach((item: any) => {
        csvContent += `${item.displayDate},${item.created},${item.completed}\n`;
      });
      csvContent += "\n";
    }

    // 团队数据
    if (data.team && data.team.length > 0) {
      csvContent += "团队效率\n";
      csvContent += "成员,角色,总任务,已完成,待处理,效率(%),平均时间(分钟)\n";
      data.team.forEach((member: any) => {
        csvContent += `${member.name},${member.role},${member.total},${member.completed},${member.pending},${member.efficiency},${member.avgTime}\n`;
      });
      csvContent += "\n";
    }

    // 项目数据
    if (data.projects) {
      csvContent += "项目统计\n";
      csvContent += "指标,数值\n";
      csvContent += `总项目数,${data.projects.total}\n`;
      csvContent += `已发布,${data.projects.published}\n`;
      csvContent += `发布率,${data.projects.publishedRate}%\n\n`;

      if (data.projects.byStage) {
        csvContent += "项目阶段分布\n";
        csvContent += "阶段,数量\n";
        Object.entries(data.projects.byStage).forEach(([stage, count]) => {
          csvContent += `${stage},${count}\n`;
        });
      }
    }

    // 创建Blob并下载
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
        onClick={exportToCSV}
        style={{
          padding: "8px 16px",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: "600",
          backgroundColor: "white",
          color: "#374151",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
        }}
      >
        <span>📥</span>
        <span>导出 CSV</span>
      </button>
      <button
        onClick={exportToJSON}
        style={{
          padding: "8px 16px",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: "600",
          backgroundColor: "white",
          color: "#374151",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
        }}
      >
        <span>📋</span>
        <span>导出 JSON</span>
      </button>
    </div>
  );
};
