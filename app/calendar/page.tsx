"use client";

import Navigation from "../components/Navigation";
import EmailSettings from "../components/EmailSettings";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function CalendarPage() {
  const tasks = useQuery(api.tasks.getTasks);
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showEmailSettings, setShowEmailSettings] = useState(false);

  const handleStatusToggle = async (taskId: Id<"scheduledTasks">, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const completedAt = newStatus === "completed" ? Date.now() : undefined;
    await updateTaskStatus({ taskId, status: newStatus, completedAt });
  };

  const handleDelete = async (taskId: Id<"scheduledTasks">) => {
    if (confirm("确定要删除这个任务吗？")) {
      await deleteTask(taskId);
    }
  };

  // 生成.ics文件内容
  const generateICSFile = (taskList) => {
    if (!taskList || taskList.length === 0) return '';

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mission Control//Calendar Export//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    taskList.forEach(task => {
      const taskDate = new Date(task.scheduledTime);
      const startDate = taskDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const endDate = new Date(taskDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent.push('BEGIN:VEVENT');
      icsContent.push(`DTSTART:${startDate}`);
      icsContent.push(`DTEND:${endDate}`);
      icsContent.push(`SUMMARY:${task.title}${task.description ? ' - ' + task.description : ''}`);
      icsContent.push(`DESCRIPTION:优先级: ${task.priority}\\n负责人: ${task.assignedTo}`);
      icsContent.push(`STATUS:${task.status === 'completed' ? 'CONFIRMED' : 'TENTATIVE'}`);
      icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  // 导出日历
  const exportCalendar = () => {
    const icsContent = generateICSFile(tasks);
    if (!icsContent) return;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mission-control-calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 过滤任务
  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesType = filterType === 'all' || task.taskType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  }) ?? [];

  // 统计
  const stats = tasks ? {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    recurring: tasks.filter(t => t.taskType === 'recurring').length,
  } : { total: 0, completed: 0, pending: 0, recurring: 0 };

  if (tasks === undefined) {
    return (
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <p style={{ fontSize: '18px', color: '#666' }}>加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>📅</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>日历</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            任务调度中心
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            计划任务与定时作业管理
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#667eea', marginBottom: '8px' }}>{stats.total}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>总任务</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#16a34a', marginBottom: '8px' }}>{stats.completed}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>已完成</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#d97706', marginBottom: '8px' }}>{stats.pending}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>待处理</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#9333ea', marginBottom: '8px' }}>{stats.recurring}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>定期任务</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="搜索任务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', cursor: 'pointer' }}
              >
                <option value="all">全部状态</option>
                <option value="pending">待处理</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', cursor: 'pointer' }}
              >
                <option value="all">全部类型</option>
                <option value="one-time">一次性</option>
                <option value="recurring">定期</option>
              </select>
            </div>
            <button
              onClick={exportCalendar}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📥 导出日历
            </button>
            <button
              onClick={() => setShowEmailSettings(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#667eea',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#667eea'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
            >
              📧 邮件设置
            </button>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '60px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
            <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: '700' }}>暂无任务</h3>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>开始创建您的第一个任务吧！</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredTasks.map((task) => {
              const taskDate = new Date(task.scheduledTime);
              const timeStr = taskDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
              const dateStr = taskDate.toLocaleDateString('zh-CN');

              return (
                <div
                  key={task._id}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: `2px solid ${task.status === 'completed' ? '#16a34a' : task.status === 'cancelled' ? '#ef4444' : '#e5e7eb'}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    opacity: task.status === 'cancelled' ? 0.6 : 1,
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={() => handleDelete(task._id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      opacity: '0.5',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                    title="删除"
                  >
                    🗑️
                  </button>

                  {/* Checkbox */}
                  <button
                    onClick={() => handleStatusToggle(task._id, task.status)}
                    style={{
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      borderRadius: '8px',
                      border: '2px solid ' + (task.status === 'completed' ? '#16a34a' : '#d1d5db'),
                      backgroundColor: task.status === 'completed' ? '#16a34a' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {task.status === 'completed' && '✓'}
                  </button>

                  {/* Task Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        margin: 0,
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                      }}>
                        {task.title}
                      </h3>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: task.priority === 'high' ? '#fef2f2' : task.priority === 'medium' ? '#fffbeb' : '#f0fdf4',
                        color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#16a34a',
                      }}>
                        {task.priority === 'high' ? '🔴 高' : task.priority === 'medium' ? '🟡 中' : '🟢 低'}
                      </div>
                    </div>

                    {task.description && (
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', margin: '0 0 12px' }}>
                        {task.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                        <span>📅</span>
                        <span>{dateStr} {timeStr}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                        <span>👤</span>
                        <span>{task.assignedTo}</span>
                      </div>
                      {task.taskType === 'recurring' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#9333ea', fontWeight: '500' }}>
                          <span>🔄</span>
                          <span>定期任务</span>
                        </div>
                      )}
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: task.status === 'completed' ? '#dcfce7' : task.status === 'cancelled' ? '#fee2e2' : '#dbeafe',
                        color: task.status === 'completed' ? '#16a34a' : task.status === 'cancelled' ? '#dc2626' : '#2563eb',
                      }}>
                        {task.status === 'completed' ? '已完成' : task.status === 'cancelled' ? '已取消' : '待处理'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Email Settings Modal */}
      {showEmailSettings && <EmailSettings onClose={() => setShowEmailSettings(false)} />}
    </div>
  );
}
