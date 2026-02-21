import { NextRequest, NextResponse } from 'next/server';
import { getActiveSubscriptions } from '../../../convex/emailSubscriptions';
import { convexQuery } from '@convex-dev/next/server';
import { getTasks } from '../../../convex/tasks';
import { sendEmail } from '../../../lib/emails/resend';
import { DailySummaryEmail } from '../../../lib/emails/templates';

// Vercel Cron Job endpoint
// Cron schedule: 每天 9:00 AM (UTC) 发送
// 配置在 vercel.json 中
export async function GET(request: NextRequest) {
  try {
    // 验证 Cron Secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting daily summary cron job...');

    // 获取所有订阅了每日摘要的用户
    const subscriptions = await convexQuery(getActiveSubscriptions, {
      preference: 'dailySummary',
    });

    console.log(`Found ${subscriptions.length} active subscriptions for daily summary`);

    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscriptions to process',
      });
    }

    // 获取所有任务
    const allTasks = await convexQuery(getTasks, {});

    // 今天日期
    const today = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    // 批量发送每日摘要
    let successCount = 0;
    let failedCount = 0;

    for (const subscription of subscriptions) {
      try {
        const emailContent = DailySummaryEmail({
          tasks: allTasks,
          date: today,
        });

        const result = await sendEmail({
          to: subscription.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (result.success) {
          successCount++;
          console.log(`✓ Daily summary sent to ${subscription.email}`);
        } else {
          failedCount++;
          console.error(`✗ Failed to send daily summary to ${subscription.email}`);
        }
      } catch (error) {
        failedCount++;
        console.error(`✗ Error sending to ${subscription.email}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily summary sent to ${successCount} subscribers`,
      stats: {
        total: subscriptions.length,
        success: successCount,
        failed: failedCount,
      },
    });
  } catch (error) {
    console.error('Daily summary cron error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 为了测试，也支持 POST
export async function POST(request: NextRequest) {
  return GET(request);
}
