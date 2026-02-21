"use client";

import Navigation from "../components/Navigation";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  StatCard,
  TaskTrendChart,
  TeamEfficiencyChart,
  ProjectProgressChart,
  WorkloadChart,
  TimeRangeSelector,
  ExportButton,
} from "../components/analytics";

export default function AnalyticsPage() {
  const {
    currentStats,
    previousStats,
    taskTrend,
    projectStats,
    changes,
    timeRange,
    setTimeRange,
    isLoading,
    exportData,
  } = useAnalytics();

  if (isLoading) {
    return (
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: '500' }}>加载分析数据...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>分析</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            数据分析
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 24px' }}>
            统计报表和数据洞察
          </p>

          {/* Time Range Selector */}
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1400px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard
            label="总任务数"
            value={currentStats?.total || 0}
            change={changes.totalChange}
            trend={changes.totalChange > 0 ? 'up' : changes.totalChange < 0 ? 'down' : 'stable'}
            icon="📝"
          />
          <StatCard
            label="完成率"
            value={`${currentStats?.completionRate || 0}%`}
            change={changes.completionRateChange}
            trend={changes.completionRateChange > 0 ? 'up' : changes.completionRateChange < 0 ? 'down' : 'stable'}
            icon="✅"
          />
          <StatCard
            label="已完成"
            value={currentStats?.completed || 0}
            icon="🎯"
          />
          <StatCard
            label="待处理"
            value={currentStats?.pending || 0}
            icon="⏳"
          />
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <TaskTrendChart data={taskTrend} />
          <TeamEfficiencyChart data={useAnalytics().teamEfficiency} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <ProjectProgressChart
            stageData={useAnalytics().stageData}
            priorityData={useAnalytics().priorityData}
            projectStats={projectStats}
          />
          <WorkloadChart
            trendData={taskTrend}
            heatmapData={useAnalytics().heatmapData}
          />
        </div>

        {/* Export Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            数据更新时间: {new Date().toLocaleString('zh-CN')}
          </div>
          <ExportButton data={exportData} />
        </div>
      </div>
    </div>
  );
}
