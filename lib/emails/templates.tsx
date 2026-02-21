import React from 'react';

// 基础邮件样式
const emailStyles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 30px',
    textAlign: 'center' as const,
    borderRadius: '12px 12px 0 0',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 10px',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    margin: '0',
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '0 0 12px 12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e5e7eb',
  },
  taskItem: {
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '12px',
    borderLeft: '4px solid #667eea',
  },
  taskTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 8px',
  },
  taskMeta: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '16px',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '30px',
    fontSize: '12px',
    color: '#9ca3af',
  },
  footerLink: {
    color: '#667eea',
    textDecoration: 'underline',
  },
};

// 任务提醒邮件
export const TaskReminderEmail = ({ tasks }: { tasks: Array<any> }) => ({
  subject: `🔔 任务提醒 - ${tasks.length} 个任务即将到期`,
  html: `
    <div style="${JSON.stringify(emailStyles.container)}">
      <div style="${JSON.stringify(emailStyles.header)}">
        <h1 style="${JSON.stringify(emailStyles.headerTitle)}">⏰ 任务提醒</h1>
        <p style="${JSON.stringify(emailStyles.headerSubtitle)}">您有 ${tasks.length} 个任务需要注意</p>
      </div>
      <div style="${JSON.stringify(emailStyles.content)}">
        ${tasks.map(task => `
          <div style="${JSON.stringify(emailStyles.taskItem)}">
            <h3 style="${JSON.stringify(emailStyles.taskTitle)}">${task.title}</h3>
            <p style="${JSON.stringify(emailStyles.taskMeta)}">
              📅 ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
              ${task.priority === 'high' ? '🔴 高优先级' : task.priority === 'medium' ? '🟡 中优先级' : '🟢 低优先级'}
            </p>
            ${task.description ? `<p style="font-size: 14px; color: #4b5563; margin: 8px 0 0;">${task.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
      <div style="${JSON.stringify(emailStyles.footer)}">
        <p>这是自动发送的提醒邮件</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/calendar" style="${JSON.stringify(emailStyles.footerLink)}">查看任务</a> |
          如不想收到此类邮件，可
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="${JSON.stringify(emailStyles.footerLink)}">取消订阅</a>
        </p>
      </div>
    </div>
  `,
});

// 状态变更通知邮件
export const StatusChangeEmail = ({ task, oldStatus, newStatus }: { task: any; oldStatus: string; newStatus: string }) => ({
  subject: `📊 任务状态变更 - ${task.title}`,
  html: `
    <div style="${JSON.stringify(emailStyles.container)}">
      <div style="${JSON.stringify(emailStyles.header)}">
        <h1 style="${JSON.stringify(emailStyles.headerTitle)}">📊 状态变更通知</h1>
        <p style="${JSON.stringify(emailStyles.headerSubtitle)}">任务状态已更新</p>
      </div>
      <div style="${JSON.stringify(emailStyles.content)}">
        <div style="${JSON.stringify(emailStyles.section)}">
          <h2 style="${JSON.stringify(emailStyles.sectionTitle)}">${task.title}</h2>
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px;">
            <strong>状态：</strong> ${oldStatus} → ${newStatus}
          </p>
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px;">
            <strong>优先级：</strong> ${task.priority === 'high' ? '🔴 高' : task.priority === 'medium' ? '🟡 中' : '🟢 低'}
          </p>
          <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px;">
            <strong>时间：</strong> ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
          </p>
          ${task.description ? `<p style="font-size: 14px; color: #4b5563; margin: 8px 0 0;"><strong>描述：</strong><br/>${task.description}</p>` : ''}
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/calendar" style="${JSON.stringify(emailStyles.button)}">查看任务详情</a>
      </div>
      <div style="${JSON.stringify(emailStyles.footer)}">
        <p>这是自动发送的提醒邮件</p>
        <p>
          如不想收到此类邮件，可
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="${JSON.stringify(emailStyles.footerLink)}">取消订阅</a>
        </p>
      </div>
    </div>
  `,
});

// 每日任务摘要邮件
export const DailySummaryEmail = ({ tasks, date }: { tasks: Array<any>; date: string }) => {
  const completed = tasks.filter(t => t.status === 'completed');
  const pending = tasks.filter(t => t.status === 'pending');
  const overdue = tasks.filter(t => t.status === 'pending' && t.scheduledTime < Date.now());

  return {
    subject: `📋 每日任务摘要 - ${date}`,
    html: `
      <div style="${JSON.stringify(emailStyles.container)}">
        <div style="${JSON.stringify(emailStyles.header)}">
          <h1 style="${JSON.stringify(emailStyles.headerTitle)}">📋 每日任务摘要</h1>
          <p style="${JSON.stringify(emailStyles.headerSubtitle)}">${date}</p>
        </div>
        <div style="${JSON.stringify(emailStyles.content)}">
          ${overdue.length > 0 ? `
            <div style="${JSON.stringify(emailStyles.section)}">
              <h2 style="${JSON.stringify({...emailStyles.sectionTitle, color: '#dc2626'})}">⚠️ 逾期任务 (${overdue.length})</h2>
              ${overdue.map(task => `
                <div style="${JSON.stringify({...emailStyles.taskItem, borderLeftColor: '#dc2626'})}">
                  <h3 style="${JSON.stringify(emailStyles.taskTitle)}">${task.title}</h3>
                  <p style="${JSON.stringify(emailStyles.taskMeta)}">
                    📅 ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
                  </p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${pending.length > 0 ? `
            <div style="${JSON.stringify(emailStyles.section)}">
              <h2 style="${JSON.stringify({...emailStyles.sectionTitle, color: '#d97706'})}">📝 待办任务 (${pending.length})</h2>
              ${pending.slice(0, 5).map(task => `
                <div style="${JSON.stringify({...emailStyles.taskItem, borderLeftColor: '#d97706'})}">
                  <h3 style="${JSON.stringify(emailStyles.taskTitle)}">${task.title}</h3>
                  <p style="${JSON.stringify(emailStyles.taskMeta)}">
                    📅 ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
                    · ${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                  </p>
                </div>
              `).join('')}
              ${pending.length > 5 ? `<p style="font-size: 13px; color: #6b7280; margin: 12px 0 0;">还有 ${pending.length - 5} 个待办任务...</p>` : ''}
            </div>
          ` : ''}

          ${completed.length > 0 ? `
            <div style="${JSON.stringify(emailStyles.section)}">
              <h2 style="${JSON.stringify({...emailStyles.sectionTitle, color: '#16a34a'})}">✅ 已完成 (${completed.length})</h2>
              ${completed.slice(0, 3).map(task => `
                <div style="${JSON.stringify({...emailStyles.taskItem, borderLeftColor: '#16a34a'})}">
                  <h3 style="${JSON.stringify({...emailStyles.taskTitle, textDecoration: 'line-through', color: '#9ca3af'})}">${task.title}</h3>
                </div>
              `).join('')}
              ${completed.length > 3 ? `<p style="font-size: 13px; color: #6b7280; margin: 12px 0 0;">共完成 ${completed.length} 个任务</p>` : ''}
            </div>
          ` : ''}

          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/calendar" style="${JSON.stringify(emailStyles.button)}">查看所有任务</a>
        </div>
        <div style="${JSON.stringify(emailStyles.footer)}">
          <p>这是自动发送的每日摘要</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="${JSON.stringify(emailStyles.footerLink)}">取消订阅</a>
          </p>
        </div>
      </div>
    `,
  };
};

// 每周任务摘要邮件
export const WeeklySummaryEmail = ({ tasks, weekRange }: { tasks: Array<any>; weekRange: string }) => {
  const completed = tasks.filter(t => t.status === 'completed');
  const pending = tasks.filter(t => t.status === 'pending');
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status === 'pending');

  return {
    subject: `📊 每周任务报告 - ${weekRange}`,
    html: `
      <div style="${JSON.stringify(emailStyles.container)}">
        <div style="${JSON.stringify(emailStyles.header)}">
          <h1 style="${JSON.stringify(emailStyles.headerTitle)}">📊 每周任务报告</h1>
          <p style="${JSON.stringify(emailStyles.headerSubtitle)}">${weekRange}</p>
        </div>
        <div style="${JSON.stringify(emailStyles.content)}">
          <div style="display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 120px; padding: 20px; background: #f0fdf4; border-radius: 12px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #16a34a; margin-bottom: 8px;">${completed.length}</div>
              <div style="font-size: 14px; color: #6b7280;">已完成</div>
            </div>
            <div style="flex: 1; min-width: 120px; padding: 20px; background: #fef3c7; border-radius: 12px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #d97706; margin-bottom: 8px;">${pending.length}</div>
              <div style="font-size: 14px; color: #6b7280;">进行中</div>
            </div>
            <div style="flex: 1; min-width: 120px; padding: 20px; background: #fee2e2; border-radius: 12px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #dc2626; margin-bottom: 8px;">${highPriority.length}</div>
              <div style="font-size: 14px; color: #6b7280;">高优先级</div>
            </div>
          </div>

          ${highPriority.length > 0 ? `
            <div style="${JSON.stringify(emailStyles.section)}">
              <h2 style="${JSON.stringify({...emailStyles.sectionTitle, color: '#dc2626'})}">🔴 高优先级任务</h2>
              ${highPriority.map(task => `
                <div style="${JSON.stringify({...emailStyles.taskItem, borderLeftColor: '#dc2626'})}">
                  <h3 style="${JSON.stringify(emailStyles.taskTitle)}">${task.title}</h3>
                  <p style="${JSON.stringify(emailStyles.taskMeta)}">
                    📅 ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
                  </p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${pending.length > 0 ? `
            <div style="${JSON.stringify(emailStyles.section)}">
              <h2 style="${JSON.stringify(emailStyles.sectionTitle)}">📝 所有待办任务</h2>
              ${pending.slice(0, 8).map(task => `
                <div style="${JSON.stringify({...emailStyles.taskItem, borderLeftColor: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#16a34a'})}">
                  <h3 style="${JSON.stringify(emailStyles.taskTitle)}">${task.title}</h3>
                  <p style="${JSON.stringify(emailStyles.taskMeta)}">
                    📅 ${new Date(task.scheduledTime).toLocaleString('zh-CN')}
                    · ${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                  </p>
                </div>
              `).join('')}
              ${pending.length > 8 ? `<p style="font-size: 13px; color: #6b7280; margin: 12px 0 0;">还有 ${pending.length - 8} 个任务...</p>` : ''}
            </div>
          ` : ''}

          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/calendar" style="${JSON.stringify(emailStyles.button)}">查看所有任务</a>
        </div>
        <div style="${JSON.stringify(emailStyles.footer)}">
          <p>这是自动发送的每周报告</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="${JSON.stringify(emailStyles.footerLink)}">取消订阅</a>
          </p>
        </div>
      </div>
    `,
  };
};

// 欢迎邮件
export const WelcomeEmail = ({ email }: { email: string }) => ({
  subject: '🎉 欢迎订阅 Mission Control 任务提醒',
  html: `
    <div style="${JSON.stringify(emailStyles.container)}">
      <div style="${JSON.stringify(emailStyles.header)}">
        <h1 style="${JSON.stringify(emailStyles.headerTitle)}">🎉 欢迎订阅!</h1>
        <p style="${JSON.stringify(emailStyles.headerSubtitle)}">Mission Control 邮件提醒服务</p>
      </div>
      <div style="${JSON.stringify(emailStyles.content)}">
        <div style="${JSON.stringify(emailStyles.section)}">
          <h2 style="${JSON.stringify(emailStyles.sectionTitle)}">订阅成功确认</h2>
          <p style="font-size: 15px; color: #4b5563; line-height: 1.6; margin: 0 0 16px;">
            感谢您订阅 Mission Control 的任务提醒服务！您将收到以下类型的邮件通知：
          </p>
          <ul style="font-size: 15px; color: #4b5563; line-height: 1.8; margin: 0 0 24px; padding-left: 24px;">
            <li>⏰ 任务截止时间提醒</li>
            <li>📊 任务状态变更通知</li>
            <li>📋 每日任务摘要</li>
            <li>📊 每周任务报告</li>
          </ul>
        </div>

        <div style="${JSON.stringify(emailStyles.section)}">
          <h2 style="${JSON.stringify(emailStyles.sectionTitle)}">管理您的订阅</h2>
          <p style="font-size: 15px; color: #4b5563; line-height: 1.6; margin: 0 0 16px;">
            您可以随时调整通知偏好或在日历页面管理您的订阅设置。
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/calendar" style="${JSON.stringify(emailStyles.button)}">前往日历页面</a>
        </div>

        <div style="padding: 20px; background: #f0fdf4; border-radius: 12px; border-left: 4px solid #16a34a; margin: 24px 0;">
          <p style="font-size: 14px; color: #16a34a; margin: 0; font-weight: 600;">
            💡 提示：您可以在日历页面设置提醒时间，选择最适合您的时间段接收每日摘要。
          </p>
        </div>
      </div>
      <div style="${JSON.stringify(emailStyles.footer)}">
        <p>订阅邮箱: ${email}</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="${JSON.stringify(emailStyles.footerLink)}">取消订阅</a>
        </p>
      </div>
    </div>
  `,
});
