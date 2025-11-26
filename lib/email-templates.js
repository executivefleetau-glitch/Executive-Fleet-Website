// Admin Notification Email Template
export const adminNotificationTemplate = ({ fullName, email, subject, message, submittedAt }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
          
          <!-- Header with Black Background -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000;">
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                      New Contact Submission
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">
                      EXECUTIVE FLEET
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
            <td style="padding: 40px;">
              
              <!-- Alert Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #f8f8f8; border-left: 4px solid #000000;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 600;">
                      📩 You have received a new contact form submission
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Submission Details Table -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 1px solid #e0e0e0;">
                
                <!-- Table Header -->
                <tr style="background-color: #000000;">
                  <th style="padding: 15px 20px; text-align: left; color: #ffffff; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #ffffff; width: 30%;">
                    Field
                  </th>
                  <th style="padding: 15px 20px; text-align: left; color: #ffffff; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #ffffff;">
                    Details
                  </th>
                </tr>

                <!-- Full Name Row -->
                <tr style="background-color: #ffffff; border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 18px 20px; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666666; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      Full Name
                    </p>
                  </td>
                  <td style="padding: 18px 20px; vertical-align: top;">
                    <p style="margin: 0; color: #000000; font-size: 15px; font-weight: 600;">
                      ${fullName}
                    </p>
                  </td>
                </tr>

                <!-- Email Row -->
                <tr style="background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 18px 20px; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666666; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      Email Address
                    </p>
                  </td>
                  <td style="padding: 18px 20px; vertical-align: top;">
                    <a href="mailto:${email}" style="margin: 0; color: #000000; font-size: 15px; font-weight: 600; text-decoration: none; border-bottom: 2px solid #000000; padding-bottom: 2px;">
                      ${email}
                    </a>
                  </td>
                </tr>

                <!-- Subject Row -->
                <tr style="background-color: #ffffff; border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 18px 20px; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666666; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      Subject
                    </p>
                  </td>
                  <td style="padding: 18px 20px; vertical-align: top;">
                    <p style="margin: 0; color: #000000; font-size: 15px; font-weight: 600;">
                      ${subject}
                    </p>
                  </td>
                </tr>

                <!-- Message Row -->
                <tr style="background-color: #fafafa;">
                  <td style="padding: 18px 20px; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666666; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      Message
                    </p>
                  </td>
                  <td style="padding: 18px 20px; vertical-align: top;">
                    <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
                      ${message}
                    </p>
                  </td>
                </tr>

                <!-- Submitted At Row -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 18px 20px; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #666666; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      Submitted At
                    </p>
                  </td>
                  <td style="padding: 18px 20px; vertical-align: top;">
                    <p style="margin: 0; color: #666666; font-size: 14px;">
                      ${submittedAt}
                    </p>
                  </td>
                </tr>

              </table>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 40px 0 30px 0;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 16px 40px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-radius: 4px; text-transform: uppercase;">
                      Reply to ${fullName}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f8f8; border-top: 1px solid #e0e0e0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 10px 0; color: #000000; font-size: 14px; font-weight: 600;">
                      Executive Fleet
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.6;">
                      Melbourne's Premier Chauffeur Service<br>
                      Melbourne VIC, Australia<br>
                      <a href="tel:+41227157000" style="color: #000000; text-decoration: none;">+41 22 715 7000</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Client Confirmation Email Template
export const clientConfirmationTemplate = ({ fullName }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Executive Fleet</title>
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
                    
                    <!-- Checkmark Icon -->
                    <table role="presentation" style="margin: 0 auto 20px auto;">
                      <tr>
                        <td style="width: 80px; height: 80px; background-color: #ffffff; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="font-size: 48px; line-height: 80px;">✓</span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      Thank You!
                    </h1>
                    <p style="margin: 15px 0 0 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                      We've received your message
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
                Dear ${fullName},
              </p>

              <p style="margin: 0 0 20px 0; color: #333333; font-size: 15px; line-height: 1.8;">
                Thank you for reaching out to <strong style="color: #000000;">Executive Fleet</strong>. We have successfully received your message and our team will review it shortly.
              </p>

              <p style="margin: 0 0 30px 0; color: #333333; font-size: 15px; line-height: 1.8;">
                We strive to respond to all inquiries within <strong style="color: #000000;">24 hours</strong>. A member of our team will get back to you as soon as possible.
              </p>

              <!-- Info Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f8f8; border-left: 4px solid #000000;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 12px 0; color: #000000; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Need Immediate Assistance?
                    </p>
                    <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      For urgent matters, please don't hesitate to contact us directly:
                    </p>
                    <p style="margin: 0; color: #000000; font-size: 16px; font-weight: 600;">
                      📞 <a href="tel:+41227157000" style="color: #000000; text-decoration: none;">+41 22 715 7000</a><br>
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
                      📞 <a href="tel:+41227157000" style="color: #ffffff; text-decoration: none;">+41 22 715 7000</a>
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
};

