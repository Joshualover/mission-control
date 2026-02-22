"use client";

import Navigation from "../components/Navigation";
import { useState } from "react";

// 类型定义
interface Task {
  id: number;
  title: string;
  time: string;
  status: "completed" | "pending";
  type: "one-time" | "recurring";
  priority: "high" | "medium" | "low";
}

export default function CalendarPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const allTasks: Task[] = [
    { id: 1, title: "完成界面设计", time: "09:00", status: "completed", type: "one-time", priority: "high" },
    { id: 2, title: "团队会议", time: "14:00", status: "pending", type: "recurring", priority: "medium" },
    { id: 3, title: "代码审查", time: "16:30", status: "pending", type: "one-time", priority: "low" },
    { id: 4, title: "文档编写", time: "10:00", status: "completed", type: "one-time", priority: "high" },
    { id: 5, title: "周报总结", time: "17:00", status: "pending", type: "recurring", priority: "medium" },
  ];

  // 过滤和搜索逻辑
  const filteredTasks = allTasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus !== "all" && task.status !== filterStatus) {
      return false;
    }
    if (filterType !== "all" && task.type !== filterType) {
      return false;
    }
    return true;
  });

  // 生成.ics文件内容
  const generateICSFile = (tasks: Task[]): string => {
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mission Control//Calendar Export//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    tasks.forEach(task => {
      const today = new Date();
      const [hours, minutes] = task.time.split(':').map(Number);

      const startDate = new Date(today);
      startDate.setHours(hours, minutes, 0, 0);
      const startUTC = formatDateToUTC(startDate);

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1);
      const endUTC = formatDateToUTC(endDate);

      const priorityMap: Record<string, number> = { high: 9, medium: 5, low: 1 };

      icsContent.push('BEGIN:VEVENT');
      icsContent.push(`UID:${task.id}@missioncontrol`);
      icsContent.push(`DTSTAMP:${formatDateToUTC(new Date())}`);
      icsContent.push(`DTSTART:${startUTC}`);
      icsContent.push(`DTEND:${endUTC}`);
      icsContent.push(`SUMMARY:${task.title}`);
      icsContent.push(`DESCRIPTION:优先级: ${task.priority}\\n状态: ${task.status}\\n类型: ${task.type}`);
      icsContent.push(`PRIORITY:${priorityMap[task.priority]}`);
      icsContent.push(`STATUS:${task.status === 'completed' ? 'COMPLETED' : 'CONFIRMED'}`);

      if (task.type === 'recurring') {
        icsContent.push('RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR');
      }

      icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  // 格式化日期为UTC格式
  const formatDateToUTC = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  // 下载.ics文件
  const downloadICS = (content: string, filename: string = 'calendar.ics'): void => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // 导出所有任务
  const exportAllTasks = (): void => {
    const icsContent = generateICSFile(filteredTasks);
    downloadICS(icsContent, 'mission-control-calendar.ics');
  };

  // 导出单个任务
  const exportSingleTask = (task: Task): void => {
    const icsContent = generateICSFile([task]);
    downloadICS(icsContent, `${task.title.replace(/\s+/g, '-')}.ics`);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>📅</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>日历</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            智能日历
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            任务调度和定时作业管理
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Search and Filters */}
        <div style={{ backgroundColor: 'var(--card-bg)', padding: '28px', borderRadius: '20px', marginBottom: '24px', boxShadow: 'var(--shadow)' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
              <input
                type="text"
                placeholder="搜索任务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>状态</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', minWidth: '140px', cursor: 'pointer', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                <option value="all">全部</option>
                <option value="completed">已完成</option>
                <option value="pending">待办</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>类型</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', minWidth: '140px', cursor: 'pointer', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                <option value="all">全部</option>
                <option value="one-time">单次任务</option>
                <option value="recurring">循环任务</option>
              </select>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
              <button
                onClick={exportAllTasks}
                disabled={filteredTasks.length === 0}
                style={{
                  padding: '10px 20px',
                  background: filteredTasks.length > 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e5e7eb',
                  borderRadius: '10px',
                  color: filteredTasks.length > 0 ? 'white' : '#9ca3af',
                  fontSize: '14px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: filteredTasks.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                📥 导出日历
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                显示 <strong style={{ color: '#667eea' }}>{filteredTasks.length}</strong> / {allTasks.length} 个任务
              </span>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || filterStatus !== "all" || filterType !== "all") && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
              {searchQuery && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#fef3c7', borderRadius: '8px', fontSize: '13px', color: '#92400e' }}>
                  <span>搜索: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}>×</button>
                </div>
              )}
              {filterStatus !== "all" && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#dbeafe', borderRadius: '8px', fontSize: '13px', color: '#1e40af' }}>
                  <span>状态: {filterStatus === 'completed' ? '已完成' : '待办'}</span>
                  <button onClick={() => setFilterStatus("all")} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}>×</button>
                </div>
              )}
              {filterType !== "all" && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#dcfce7', borderRadius: '8px', fontSize: '13px', color: '#166534' }}>
                  <span>类型: {filterType === 'one-time' ? '单次' : '循环'}</span>
                  <button onClick={() => setFilterType("all")} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}>×</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Today's Tasks */}
        <div style={{ backgroundColor: 'var(--card-bg)', padding: '36px', borderRadius: '20px', marginBottom: '32px', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 6px' }}>今日任务</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', margin: 0 }}>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
            </div>
            <div style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700' }}>
              {filteredTasks.filter(t => t.status === 'completed').length}/{filteredTasks.length} 完成
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>没有找到任务</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', margin: 0 }}>尝试调整搜索或筛选条件</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '2px solid',
                    borderColor: task.status === 'completed' ? '#dcfce7' : 'var(--card-border)',
                    backgroundColor: task.status === 'completed' ? '#f0fdf4' : 'var(--card-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: task.status === 'completed' ? '#dcfce7' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    {task.status === 'completed' ? '✅' : task.type === 'recurring' ? '🔄' : '📋'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                      {task.time} {task.type === 'recurring' ? '· 循环任务' : '· 单次任务'} · {task.priority === 'high' ? '🔴 高优先级' : task.priority === 'medium' ? '🟡 中优先级' : '🟢 低优先级'}
                    </div>
                  </div>

                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    backgroundColor: task.status === 'completed' ? '#dcfce7' : task.status === 'pending' ? '#fef3c7' : '#fee2e2',
                    color: task.status === 'completed' ? '#16a34a' : task.status === 'pending' ? '#d97706' : '#dc2626'
                  }}>
                    {task.status === 'completed' ? '已完成' : '待办'}
                  </div>

                  <button
                    onClick={() => exportSingleTask(task)}
                    style={{
                      padding: '8px',
                      background: 'transparent',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      transition: 'all 0.2s ease'
                    }}
                    title="导出此任务"
                  >
                    📥
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '40px',
          borderRadius: '20px',
          border: '2px dashed rgba(102,126,234,0.2)',
          textAlign: 'center',
          boxShadow: 'var(--shadow)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>➕</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>快速添加任务</h3>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', margin: '0 0 24px' }}>
            创建一次性任务或设置循环作业
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '15px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102,126,234,0.3)'
            }}>
              📋 单次任务
            </button>
            <button style={{
              padding: '14px 28px',
              backgroundColor: 'white',
              borderRadius: '12px',
              color: '#667eea',
              fontSize: '15px',
              fontWeight: '700',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              🔄 循环任务
            </button>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '20px', margin: '20px 0 0' }}>
            集成后可创建 cron 作业和定时任务
          </p>
        </div>
      </div>
    </div>
  );
}
