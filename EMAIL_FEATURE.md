# 📧 Mission Control 邮件提醒功能

本文档说明如何配置和使用 Mission Control 的邮件提醒功能。

## 功能概述

邮件提醒功能提供以下特性：

1. **任务截止时间提醒** - 任务即将到期时自动发送提醒邮件
2. **任务状态变更通知** - 任务状态更新时发送通知
3. **每日任务摘要** - 每天发送任务摘要报告
4. **每周任务报告** - 每周一发送本周任务报告
5. **邮件订阅管理** - 用户可以自主订阅/取消订阅，自定义通知偏好

## 技术实现

### 邮件服务提供商

使用 **Resend** 作为邮件服务提供商：
- ✅ 简单易用的 API
- ✅ 免费额度充足（3000封/月）
- ✅ 出色的送达率
- ✅ 支持自定义域名

### 定时任务

使用 **Vercel Cron Jobs** 定时执行：
- **每小时** - 检查即将到期的任务
- **每天 9:00 AM UTC** - 发送每日摘要
- **每周一 9:00 AM UTC** - 发送每周报告

## 快速开始

### 1. 获取 Resend API Key

1. 访问 [Resend](https://resend.com)
2. 注册账号并登录
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制 API Key

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.example .env.local
```

编辑 `.env.local` 并填入您的配置：

```env
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Cron Secret
CRON_SECRET=your-random-secret-string-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 配置发送域名（可选但推荐）

在 Resend 控制台添加您的发送域名：

1. 进入 Domains 页面
2. 添加域名（如 `mail.yourdomain.com`）
3. 按照指引配置 DNS 记录
4. 等待验证通过

### 4. 部署到 Vercel

```bash
# 安装依赖
npm install

# 部署到 Vercel
vercel deploy

# 或使用 Vercel Dashboard 连接 GitHub 仓库自动部署
```

在 Vercel 项目设置中添加环境变量。

### 5. 在 Vercel 配置 Cron Jobs

Vercel 会自动读取 `vercel.json` 配置并设置 Cron Jobs。

确保在 Vercel 项目设置中添加 `CRON_SECRET` 环境变量。

## 使用方法

### 订阅邮件

1. 打开日历页面
2. 点击 "📧 邮件设置" 按钮
3. 输入邮箱地址
4. 选择通知偏好：
   - ⏰ 任务截止提醒
   - 📊 状态变更通知
   - 📋 每日任务摘要
   - 📈 每周任务报告
5. 设置每日摘要发送时间
6. 选择时区
7. 点击 "订阅邮件"

### 测试邮件

在邮件设置页面，点击 "测试邮件" 按钮发送一封测试邮件，验证配置是否正确。

### 取消订阅

有两种方式取消订阅：

1. **通过设置页面**：
   - 打开邮件设置
   - 点击 "取消订阅" 按钮

2. **通过邮件链接**：
   - 每封邮件底部都包含退订链接
   - 点击链接即可取消订阅

### 管理订阅偏好

随时可以调整通知偏好：
- 重新打开邮件设置
- 勾选/取消勾选相应选项
- 设置会自动保存

## API 端点

### 订阅邮件

```http
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "preferences": {
    "deadlineReminders": true,
    "statusChanges": true,
    "dailySummary": true,
    "weeklySummary": true
  },
  "reminderHour": 9,
  "timezone": "Asia/Shanghai"
}
```

### 取消订阅

```http
POST /api/unsubscribe
Content-Type: application/json

{
  "token": "unsubscribe-token-here"
}
```

或

```http
DELETE /api/unsubscribe?email=user@example.com
```

### 发送测试邮件

```http
POST /api/test-email
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### 检查邮件配置

```http
GET /api/test-email
```

## 邮件模板

所有邮件模板位于 `lib/emails/templates.tsx`：

- **TaskReminderEmail** - 任务提醒邮件
- **StatusChangeEmail** - 状态变更通知
- **DailySummaryEmail** - 每日摘要邮件
- **WeeklySummaryEmail** - 每周报告邮件
- **WelcomeEmail** - 欢迎邮件

## 自定义配置

### 修改 Cron 时间表

编辑 `vercel.json`：

```json
{
  "crons": [
    {
      "path": "/api/cron/task-reminders",
      "schedule": "0 * * * *"  // 每小时
    },
    {
      "path": "/api/cron/daily-summary",
      "schedule": "0 1 * * *"  // 每天 UTC 1:00 (北京时间 9:00)
    },
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 1 * * 1"  // 每周一 UTC 1:00
    }
  ]
}
```

Cron 表达式格式：`分 时 日 月 周`

### 自定义邮件样式

编辑 `lib/emails/templates.tsx` 中的 `emailStyles` 对象。

### 添加新的通知类型

1. 在 `convex/emailSubscriptions.ts` 中添加新的偏好设置
2. 在 `lib/emails/templates.tsx` 中创建新的邮件模板
3. 在 `app/api/cron/` 中创建新的 cron endpoint

## 安全性

- ✅ Cron 端点通过 `CRON_SECRET` 保护
- ✅ 邮箱地址格式验证
- ✅ 取消订阅 token 机制
- ✅ API 密钥不暴露在前端代码

## 反垃圾邮件合规

- ✅ 每封邮件包含退订链接
- ✅ 用户可以随时取消订阅
- ✅ 明确的发送者身份
- ✅ 符合 CAN-SPAM 法规要求

## 故障排查

### 邮件未发送

1. 检查 `RESEND_API_KEY` 是否正确配置
2. 验证 Resend 账户余额
3. 检查发送域名是否已验证
4. 查看 Vercel 函数日志

### Cron 任务未执行

1. 确认项目已部署到 Vercel
2. 检查 `vercel.json` 配置是否正确
3. 验证 `CRON_SECRET` 环境变量已设置
4. 在 Vercel Dashboard 中查看 Cron 日志

### 邮件进入垃圾箱

1. 配置自定义发送域名（非 @resend.com）
2. 设置正确的 DNS 记录（SPF、DKIM）
3. 确保发件人地址一致

## 成本估算

基于 Resend 定价（2024）：

- **免费计划**：3,000 封/月
- **付费计划**：$20/月，50,000 封

示例计算：
- 100 个用户，每日摘要 = 3,000 封/月（免费计划覆盖）
- 1,000 个用户，每日摘要 = 30,000 封/月（需付费计划）

## 下一步优化

- [ ] 添加邮件发送队列
- [ ] 实现邮件打开追踪
- [ ] 添加邮件点击统计
- [ ] 支持更多邮件模板
- [ ] 添加邮件预览功能
- [ ] 实现批量邮件管理

## 支持

如有问题，请：
1. 查看本文档的故障排查部分
2. 检查 Resend 控制台的日志
3. 查看 Vercel 部署日志
4. 提交 Issue 到 GitHub

## 许可证

MIT License - 详见项目根目录 LICENSE 文件
