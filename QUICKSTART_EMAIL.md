# 📧 Mission Control 邮件功能快速开始

## 5 分钟快速配置

### 步骤 1: 获取 Resend API Key（2 分钟）

1. 访问 [resend.com](https://resend.com)
2. 点击 "Sign Up" 注册账号
3. 进入 "API Keys" 页面
4. 点击 "Create API Key"
5. 复制生成的 API Key（格式：`re_xxxxxxxx`）

### 步骤 2: 配置环境变量（1 分钟）

```bash
# 在项目根目录执行
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
# 必填项
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# 可选项（默认值）
CRON_SECRET=generate-a-random-string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**提示**：生成 CRON_SECRET：
```bash
openssl rand -base64 32
```

### 步骤 3: 测试邮件功能（2 分钟）

1. 启动开发服务器：
```bash
npm run dev
```

2. 打开浏览器访问：http://localhost:3000/calendar

3. 点击右上角 "📧 邮件设置" 按钮

4. 输入您的邮箱地址

5. 点击 "测试邮件" 按钮

6. 检查邮箱是否收到测试邮件（1-2分钟内）

### 步骤 4: 订阅邮件通知（可选）

在邮件设置页面：

1. ✅ 选择通知类型：
   - ⏰ 任务截止提醒
   - 📊 状态变更通知
   - 📋 每日任务摘要
   - 📈 每周任务报告

2. ⏰ 设置每日摘要时间（默认 9:00）

3. 🌍 选择时区（默认 Asia/Shanghai）

4. 点击 "订阅邮件"

## 部署到生产环境

### Vercel 部署（推荐）

1. **推送代码到 GitHub**
```bash
git push origin master
```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库

3. **配置环境变量**
   在 Vercel 项目设置中添加：
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   CRON_SECRET=your-random-secret-string
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **部署完成！**

   Vercel 会自动：
   - 部署应用
   - 配置 Cron Jobs
   - 启用定时任务

### 配置 Resend 发送域名（可选但推荐）

1. 在 Resend 控制台，进入 "Domains"
2. 点击 "Add Domain"
3. 输入你的域名（如 `mail.yourdomain.com`）
4. 添加 DNS 记录到你的域名提供商：
   ```
   Type: CNAME
   Name: mail
   Value: resend.com

   Type: TXT
   Name: _dmarc.mail
   Value: v=DMARC1; p=none

   Type: TXT
   Name: resend._domainkey
   Value: （从 Resend 获取）
   ```

5. 等待 DNS 验证通过（通常 5-10 分钟）

## 验证部署

### 检查 Cron Jobs

在 Vercel Dashboard:
1. 进入你的项目
2. 点击 "Cron Jobs"
3. 确认看到 3 个 cron 任务：
   - `task-reminders` - 每小时
   - `daily-summary` - 每天
   - `weekly-summary` - 每周一

### 测试生产环境邮件

1. 访问你的生产域名
2. 打开日历页面
3. 点击 "📧 邮件设置"
4. 发送测试邮件
5. 验证邮件是否送达

## 常见问题

### ❓ 邮件没有收到

**检查清单**：
1. 检查垃圾邮件文件夹
2. 确认 RESEND_API_KEY 正确
3. 查看浏览器控制台是否有错误
4. 检查 Resend 控制台的日志

### ❓ Cron 任务不执行

**解决方案**：
1. 确认已部署到 Vercel
2. 检查 CRON_SECRET 环境变量已设置
3. 在 Vercel Dashboard 查看 Cron 日志

### ❓ 如何取消订阅

两种方式：
1. 打开邮件设置，点击 "取消订阅"
2. 点击邮件底部的退订链接

## 成本估算

基于 Resend 定价：

| 用户数 | 每日摘要 | 每月邮件 | 成本 |
|--------|----------|----------|------|
| 100 | 1封/天 | 3,000 | 免费 ✅ |
| 500 | 1封/天 | 15,000 | 免费 ✅ |
| 1,000 | 1封/天 | 30,000 | $20/月 |
| 5,000 | 1封/天 | 150,000 | $20/月 |

免费计划：3,000 封/月
付费计划：$20/月，50,000 封

## 下一步

- 📖 阅读 [EMAIL_FEATURE.md](./EMAIL_FEATURE.md) 了解详细文档
- 🎨 自定义邮件模板（`lib/emails/templates.tsx`）
- ⏰ 调整 Cron 时间表（`vercel.json`）
- 📊 查看邮件统计数据（Resend Dashboard）

## 需要帮助？

- 📧 Resend 文档：https://resend.com/docs
- 🚀 Vercel 文档：https://vercel.com/docs
- 💬 提交 Issue：https://github.com/your-repo/issues

---

**享受邮件提醒功能！** 🎉
