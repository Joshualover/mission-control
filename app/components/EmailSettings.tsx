"use client";

import React, { useState } from 'react';

interface EmailSettingsProps {
  onClose?: () => void;
}

export default function EmailSettings({ onClose }: EmailSettingsProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    deadlineReminders: true,
    statusChanges: true,
    dailySummary: true,
    weeklySummary: true,
  });
  const [reminderHour, setReminderHour] = useState(9);
  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testEmailLoading, setTestEmailLoading] = useState(false);

  // 处理订阅
  const handleSubscribe = async () => {
    if (!email) {
      setMessage({ type: 'error', text: '请输入邮箱地址' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences,
          reminderHour,
          timezone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubscribed(true);
        setMessage({ type: 'success', text: '订阅成功！欢迎邮件已发送到您的邮箱' });
      } else {
        setMessage({ type: 'error', text: data.error || '订阅失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  // 处理取消订阅
  const handleUnsubscribe = async () => {
    if (!email) {
      setMessage({ type: 'error', text: '请输入邮箱地址' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubscribed(false);
        setMessage({ type: 'success', text: '已取消订阅' });
      } else {
        setMessage({ type: 'error', text: data.error || '取消订阅失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  // 发送测试邮件
  const handleTestEmail = async () => {
    if (!email) {
      setMessage({ type: 'error', text: '请输入邮箱地址' });
      return;
    }

    setTestEmailLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '测试邮件已发送' });
      } else {
        setMessage({ type: 'error', text: data.error || '发送失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误，请稍后重试' });
    } finally {
      setTestEmailLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
            📧 邮件设置
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '4px',
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            邮箱地址
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isSubscribed}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              ...(isSubscribed ? { backgroundColor: '#f9fafb', color: '#9ca3af' } : {}),
            }}
          />
        </div>

        {/* Preferences */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
            通知偏好
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { key: 'deadlineReminders', label: '⏰ 任务截止提醒', desc: '任务即将到期时提醒' },
              { key: 'statusChanges', label: '📊 状态变更通知', desc: '任务状态更新时通知' },
              { key: 'dailySummary', label: '📋 每日任务摘要', desc: '每天发送任务摘要' },
              { key: 'weeklySummary', label: '📈 每周任务报告', desc: '每周一发送任务报告' },
            ].map((pref) => (
              <div key={pref.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <input
                  type="checkbox"
                  id={pref.key}
                  checked={preferences[pref.key as keyof typeof preferences]}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    [pref.key]: e.target.checked,
                  })}
                  style={{
                    marginTop: '2px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                  }}
                />
                <div>
                  <label htmlFor={pref.key} style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', cursor: 'pointer' }}>
                    {pref.label}
                  </label>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>
                    {pref.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder Time */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            每日摘要发送时间
          </label>
          <select
            value={reminderHour}
            onChange={(e) => setReminderHour(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>

        {/* Timezone */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            时区
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Asia/Shanghai">中国 (Asia/Shanghai)</option>
            <option value="Asia/Tokyo">日本 (Asia/Tokyo)</option>
            <option value="America/New_York">美东 (America/New_York)</option>
            <option value="America/Los_Angeles">美西 (America/Los_Angeles)</option>
            <option value="Europe/London">英国 (Europe/London)</option>
            <option value="Europe/Paris">欧洲 (Europe/Paris)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '14px',
            backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fee2e2',
            color: message.type === 'success' ? '#16a34a' : '#dc2626',
            border: `1px solid ${message.type === 'success' ? '#16a34a' : '#dc2626'}`,
          }}>
            {message.text}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {!isSubscribed ? (
            <>
              <button
                onClick={handleSubscribe}
                disabled={loading || !email}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: loading || !email ? '#e5e7eb' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: loading || !email ? 'not-allowed' : 'pointer',
                  opacity: loading || !email ? 0.5 : 1,
                }}
              >
                {loading ? '订阅中...' : '订阅邮件'}
              </button>
              <button
                onClick={handleTestEmail}
                disabled={testEmailLoading || !email}
                style={{
                  padding: '14px 24px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: testEmailLoading || !email ? 'not-allowed' : 'pointer',
                  opacity: testEmailLoading || !email ? 0.5 : 1,
                }}
              >
                {testEmailLoading ? '发送中...' : '测试邮件'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleUnsubscribe}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: loading ? '#e5e7eb' : '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? '处理中...' : '取消订阅'}
              </button>
              <button
                onClick={handleTestEmail}
                disabled={testEmailLoading}
                style={{
                  padding: '14px 24px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: testEmailLoading ? 'not-allowed' : 'pointer',
                  opacity: testEmailLoading ? 0.5 : 1,
                }}
              >
                {testEmailLoading ? '发送中...' : '测试邮件'}
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          borderLeft: '4px solid #16a34a',
        }}>
          <p style={{ fontSize: '13px', color: '#16a34a', margin: 0, lineHeight: '1.5' }}>
            💡 <strong>提示：</strong>您可以随时调整通知偏好或在日历页面管理订阅。每封邮件底部都包含退订链接。
          </p>
        </div>
      </div>
    </div>
  );
}
