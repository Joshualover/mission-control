import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, isEmailConfigured } from '../../../lib/emails/resend';
import { TaskReminderEmail } from '../../../lib/emails/templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // 检查邮件服务是否配置
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email service not configured. Please set RESEND_API_KEY environment variable.',
        },
        { status: 500 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // 测试任务数据
    const testTasks = [
      {
        _id: 'test-1',
        title: '测试任务 - 这是一封测试邮件',
        description: '这是一个示例任务，用于测试邮件发送功能。如果您收到此邮件，说明邮件配置成功！',
        scheduledTime: Date.now() + 3600000, // 1小时后
        priority: 'high',
        status: 'pending',
      },
      {
        _id: 'test-2',
        title: '完成项目文档',
        description: '编写详细的项目文档，包括API说明和使用示例',
        scheduledTime: Date.now() + 7200000, // 2小时后
        priority: 'medium',
        status: 'pending',
      },
    ];

    const emailContent = TaskReminderEmail({ tasks: testTasks });

    const result = await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send test email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET 方法检查配置状态
export async function GET() {
  return NextResponse.json({
    configured: isEmailConfigured(),
    resendApiKey: !!process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL || 'not configured',
  });
}
