import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { to, subject, message, customerName } = await request.json();

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
          
          <!-- Hero Section with Black Background -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000;">
                <tr>
                  <td style="padding: 50px 40px; text-align: center;">
                    
                    <!-- Reply Icon -->
                    <table role="presentation" style="margin: 0 auto 20px auto;">
                      <tr>
                        <td style="width: 80px; height: 80px; background-color: #ffffff; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="font-size: 48px; line-height: 80px;">✉️</span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      Executive Fleet
                    </h1>
                    <p style="margin: 15px 0 0 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                      Melbourne's Premier Chauffeur Service
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Decorative Line -->
          <tr>
            <td style="padding: 0; background: linear-gradient(90deg, #000000 0%, #666666 50%, #000000 100%); height: 2px;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              
              <p style="margin: 0 0 20px 0; color: #000000; font-size: 18px; font-weight: 600;">
                Dear ${customerName || 'Valued Customer'},
              </p>

              <!-- Message Content Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f8f8; border-left: 4px solid #000000;">
                <tr>
                  <td style="padding: 25px;">
                    <div style="color: #333333; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f8f8; border-left: 4px solid #000000;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 12px 0; color: #000000; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Need Further Assistance?
                    </p>
                    <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      For any additional questions, please don't hesitate to contact us directly:
                    </p>
                    <p style="margin: 0; color: #000000; font-size: 16px; font-weight: 600;">
                      📞 <a href="tel:+614531951996" style="color: #000000; text-decoration: none;">+61 4531 951 996</a><br>
                      <span style="font-size: 14px; color: #666666; font-weight: 400;">Available 24/7</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 40px 0 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://executivefleet.com.au" style="display: inline-block; padding: 16px 40px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-radius: 4px; text-transform: uppercase;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #333333; font-size: 15px; line-height: 1.8;">
                We look forward to serving you soon!
              </p>

              <p style="margin: 20px 0 0 0; color: #333333; font-size: 15px; line-height: 1.8;">
                Best regards,<br>
                <strong style="color: #000000;">The Executive Fleet Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; background-color: #000000; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 700;">
                EXECUTIVE FLEET
              </p>
              <p style="margin: 0 0 20px 0; color: #cccccc; font-size: 13px; line-height: 1.6;">
                Melbourne's Premier Luxury Chauffeur Service
              </p>
              <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #cccccc; font-size: 13px;">
                      📍 Melbourne VIC, Australia
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #cccccc; font-size: 13px;">
                      📞 <a href="tel:+614531951996" style="color: #ffffff; text-decoration: none;">+61 4531 951 996</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #cccccc; font-size: 13px;">
                      ✉️ <a href="mailto:info@executivefleet.com.au" style="color: #ffffff; text-decoration: none;">info@executivefleet.com.au</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Divider Line -->
              <div style="margin: 25px 0; height: 1px; background-color: #333333;"></div>
              
              <p style="margin: 0; color: #999999; font-size: 11px;">
                © ${new Date().getFullYear()} Executive Fleet. All rights reserved.
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

