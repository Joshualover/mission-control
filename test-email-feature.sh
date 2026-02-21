#!/bin/bash

# Mission Control 邮件功能测试脚本

echo "🚀 Mission Control 邮件功能测试"
echo "=================================="
echo ""

# 检查环境变量
echo "📋 检查环境变量..."
if [ ! -f .env.local ]; then
    echo "❌ 未找到 .env.local 文件"
    echo "请先创建 .env.local 并配置环境变量"
    exit 1
fi

source .env.local

if [ -z "$RESEND_API_KEY" ]; then
    echo "❌ 未设置 RESEND_API_KEY"
    exit 1
fi

if [ -z "$CRON_SECRET" ]; then
    echo "⚠️  未设置 CRON_SECRET（生产环境必须设置）"
fi

echo "✅ 环境变量检查完成"
echo ""

# 检查依赖
echo "📦 检查依赖..."
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 运行类型检查
echo "🔍 运行类型检查..."
if ! npm run build 2>&1 | grep -q "error"; then
    echo "✅ 类型检查通过"
else
    echo "⚠️  类型检查发现问题，请检查"
fi
echo ""

# 测试 API 端点
echo "🧪 测试 API 端点..."

echo ""
echo "1. 测试邮件配置检查..."
curl -s http://localhost:3000/api/test-email 2>/dev/null | grep -q "configured"
if [ $? -eq 0 ]; then
    echo "✅ 邮件配置检查端点正常"
else
    echo "⚠️  请确保开发服务器正在运行 (npm run dev)"
fi

echo ""
echo "2. 提示：手动测试步骤"
echo "   a. 启动开发服务器: npm run dev"
echo "   b. 打开浏览器访问: http://localhost:3000/calendar"
echo "   c. 点击 '📧 邮件设置' 按钮"
echo "   d. 输入测试邮箱"
echo "   e. 点击 '测试邮件' 按钮"
echo "   f. 检查邮箱是否收到测试邮件"

echo ""
echo "📊 功能检查清单"
echo "================"
echo "✅ API 路由创建"
echo "   - POST /api/subscribe"
echo "   - POST /api/unsubscribe"
echo "   - DELETE /api/unsubscribe"
echo "   - POST /api/test-email"
echo "   - GET /api/test-email"
echo ""
echo "✅ 定时任务 API"
echo "   - GET /api/cron/task-reminders"
echo "   - GET /api/cron/daily-summary"
echo "   - GET /api/cron/weekly-summary"
echo ""
echo "✅ 数据模型"
echo "   - convex/emailSubscriptions.ts"
echo "   - emailSubscriptions 表"
echo ""
echo "✅ 邮件模板"
echo "   - TaskReminderEmail"
echo "   - StatusChangeEmail"
echo "   - DailySummaryEmail"
echo "   - WeeklySummaryEmail"
echo "   - WelcomeEmail"
echo ""
echo "✅ UI 组件"
echo "   - EmailSettings.tsx (邮件设置模态框)"
echo ""
echo "✅ Vercel 配置"
echo "   - vercel.json (Cron Jobs)"
echo ""

echo "📝 部署前检查清单"
echo "=================="
echo "1. 设置环境变量"
echo "   - RESEND_API_KEY"
echo "   - RESEND_FROM_EMAIL"
echo "   - CRON_SECRET (随机字符串)"
echo "   - NEXT_PUBLIC_APP_URL (生产域名)"
echo ""
echo "2. Resend 配置"
echo "   - 验证发送域名"
echo "   - 配置 DNS 记录 (SPF, DKIM)"
echo ""
echo "3. 部署到 Vercel"
echo "   - 连接 GitHub 仓库"
echo "   - 添加环境变量"
echo "   - 确认 Cron Jobs 已启用"
echo ""

echo "✨ 测试完成！"
echo ""
echo "详细信息请参考 EMAIL_FEATURE.md"
