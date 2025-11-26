import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, subject, message, customerName } = await request.json();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #1a1a1a; border: 2px solid rgba(206, 155, 40, 0.2); border-radius: 16px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%); border-radius: 14px 14px 0 0;">
              <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: 800;">
                Executive Fleet
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px;">
                Dear ${customerName || 'Valued Customer'},
              </p>
              <div style="color: #cccccc; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
                ${message}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; border-radius: 0 0 14px 14px;">
              <p style="margin: 0 0 10px 0; color: #E8B429; font-size: 16px; font-weight: 700;">
                Executive Fleet
              </p>
              <p style="margin: 0; color: #666666; font-size: 12px;">
                Melbourne's Premier Chauffeur Service
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html: emailHtml,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}

