"use client";

import React from "react";

export type TimeRange = "week" | "month" | "year";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        padding: "4px",
        backgroundColor: "#f3f4f6",
        borderRadius: "12px",
        gap: "4px",
      }}
    >
      {[
        { value: "week" as TimeRange, label: "周" },
        { value: "month" as TimeRange, label: "月" },
        { value: "year" as TimeRange, label: "年" },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          style={{
            padding: "8px 20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: value === option.value ? "white" : "transparent",
            color: value === option.value ? "#667eea" : "#6b7280",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: value === option.value ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
          onMouseEnter={(e) => {
            if (value !== option.value) {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (value !== option.value) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
