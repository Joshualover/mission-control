import { NextRequest, NextResponse } from 'next/server';
import { subscribe } from '../../../convex/emailSubscriptions';
import { convexQuery } from '@convex-dev/next/server';
import { isValidEmail } from '../../../lib/emails/resend';
import { WelcomeEmail } from '../../../lib/emails/templates';
import { sendEmail } from '../../../lib/emails/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, preferences, reminderHour, timezone } = body;

    // 验证邮箱
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 调用 Convex mutation 订阅
    const result = await convexQuery(subscribe, {
      email,
      preferences,
      reminderHour,
      timezone,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // 发送欢迎邮件
    const welcomeEmail = WelcomeEmail({ email });
    await sendEmail({
      to: email,
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
      subscriptionId: result.subscriptionId,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
