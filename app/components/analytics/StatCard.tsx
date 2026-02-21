import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  trend = "stable",
  icon,
}) => {
  const getTrendColor = () => {
    if (trend === "up") return "#dcfce7";
    if (trend === "down") return "#fee2e2";
    return "#f3f4f6";
  };

  const getTrendTextColor = () => {
    if (trend === "up") return "#16a34a";
    if (trend === "down") return "#dc2626";
    return "#6b7280";
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "28px",
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ fontSize: "14px", color: "#9ca3af", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </div>
        {icon && <div style={{ fontSize: "24px" }}>{icon}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "40px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: "1",
          }}
        >
          {value}
        </div>
        {change !== undefined && (
          <div
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
              backgroundColor: getTrendColor(),
              color: getTrendTextColor(),
            }}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};
