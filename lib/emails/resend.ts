import { Resend } from 'resend';

// 初始化 Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// 验证是否配置了邮件服务
export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

// 发送邮件
export async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resend) {
    console.error('Resend not configured. Please set RESEND_API_KEY environment variable.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const fromEmail = from || process.env.RESEND_FROM_EMAIL || 'noreply@missioncontrol.app';

    const result = await resend.emails.send({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

// 批量发送邮件
export async function sendBulkEmails({
  recipients,
  subject,
  html,
  from,
}: {
  recipients: string[];
  subject: string;
  html: string;
  from?: string;
}) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as Array<{ email: string; error: any }>,
  };

  // 批量发送，每次最多100个
  const batchSize = 100;
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);

    for (const email of batch) {
      const result = await sendEmail({
        to: email,
        subject,
        html,
        from,
      });

      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({ email, error: result.error });
      }
    }

    // 避免速率限制，每批次之间等待1秒
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// 检查邮箱格式
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 获取退订链接
export function getUnsubscribeLink(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/api/unsubscribe?token=${token}`;
}
