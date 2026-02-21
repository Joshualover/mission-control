import { NextRequest, NextResponse } from 'next/server';
import { getActiveSubscriptions } from '../../../convex/emailSubscriptions';
import { convexQuery } from '@convex-dev/next/server';
import { getTasks } from '../../../convex/tasks';
import { sendEmail } from '../../../lib/emails/resend';
import { TaskReminderEmail } from '../../../lib/emails/templates';

// Vercel Cron Job endpoint
// Cron schedule: 每小时运行一次，检查即将到期的任务
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

    console.log('Starting task reminder cron job...');

    // 获取所有订阅了任务提醒的用户
    const subscriptions = await convexQuery(getActiveSubscriptions, {
      preference: 'deadlineReminders',
    });

    console.log(`Found ${subscriptions.length} active subscriptions for deadline reminders`);

    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscriptions to process',
      });
    }

    // 获取所有待办任务
    const allTasks = await convexQuery(getTasks, {});
    const pendingTasks = allTasks.filter(task => task.status === 'pending');

    // 找出即将到期的任务（24小时内）
    const now = Date.now();
    const twentyFourHoursFromNow = now + 24 * 60 * 60 * 1000;

    const upcomingTasks = pendingTasks.filter(task => {
      const taskTime = task.scheduledTime;
      return taskTime > now && taskTime <= twentyFourHoursFromNow;
    });

    console.log(`Found ${upcomingTasks.length} tasks due within 24 hours`);

    if (upcomingTasks.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No upcoming tasks',
      });
    }

    // 批量发送提醒邮件
    let successCount = 0;
    let failedCount = 0;

    for (const subscription of subscriptions) {
      try {
        const emailContent = TaskReminderEmail({
          tasks: upcomingTasks,
        });

        const result = await sendEmail({
          to: subscription.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (result.success) {
          successCount++;
          console.log(`✓ Task reminder sent to ${subscription.email}`);
        } else {
          failedCount++;
          console.error(`✗ Failed to send task reminder to ${subscription.email}`);
        }
      } catch (error) {
        failedCount++;
        console.error(`✗ Error sending to ${subscription.email}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Task reminders sent to ${successCount} subscribers`,
      stats: {
        total: subscriptions.length,
        tasks: upcomingTasks.length,
        success: successCount,
        failed: failedCount,
      },
    });
  } catch (error) {
    console.error('Task reminder cron error:', error);
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
