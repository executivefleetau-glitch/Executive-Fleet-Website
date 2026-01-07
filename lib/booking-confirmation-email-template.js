// Simple Booking Confirmation Email Template
export const bookingConfirmationEmailTemplate = ({
  bookingReference,
  customerName,
  pickupDate,
  pickupLocation,
  dropoffLocation,
  vehicleName
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - Executive Fleet</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    table { border-collapse: collapse; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
  
  <!-- Email Container -->
  <table role="presentation" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 3px solid #ce9b28;">
          
          <!-- Header -->
          <tr>
            <td style="background: #000000; padding: 60px 40px; text-align: center;">
              <!-- Success Icon -->
              <table role="presentation" align="center" style="margin: 0 auto 30px auto;">
                <tr>
                  <td align="center" style="width: 120px; height: 120px; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); border-radius: 60px; text-align: center; vertical-align: middle;">
                    <span style="font-size: 70px; color: #000000; line-height: 120px; display: inline-block;">✓</span>
                  </td>
                </tr>
              </table>
              <!-- Title -->
              <h1 style="margin: 0; font-size: 38px; font-weight: 800; letter-spacing: 1px;">
                <span style="color: #ce9b28;">Booking</span>
                <span style="color: #ffffff;"> Confirmed!</span>
              </h1>
              <p style="margin: 15px 0 0 0; font-size: 13px; font-weight: 600; color: #888888; letter-spacing: 2px; text-transform: uppercase;">
                EXECUTIVE FLEET
              </p>
            </td>
          </tr>

          <!-- Confirmation Message -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; font-weight: 600;">Dear ${customerName},</p>
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #333333; line-height: 1.7;">
                Great news! Your booking has been confirmed. We're looking forward to providing you with an exceptional chauffeur experience.
              </p>
              
              <!-- Booking Reference Box -->
              <table role="presentation" width="100%" style="background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); border-radius: 12px; overflow: hidden; margin: 25px 0;">
                <tr>
                  <td style="padding: 25px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #000000; text-transform: uppercase; letter-spacing: 1.5px;">
                      Booking Reference
                    </p>
                    <p style="margin: 0; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 3px; font-family: 'Courier New', monospace;">
                      ${bookingReference}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Trip Summary -->
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e0e0e0; margin: 25px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #ce9b28; text-transform: uppercase; letter-spacing: 1px;">
                      Trip Summary
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Date:</strong> ${pickupDate}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">From:</strong> ${pickupLocation}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">To:</strong> ${dropoffLocation}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Vehicle:</strong> ${vehicleName}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <p style="margin: 25px 0 15px 0; font-size: 15px; color: #333333; line-height: 1.7;">
                Our team will contact you 24 hours before your scheduled pickup to reconfirm all details.
              </p>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding: 20px 40px 40px 40px;">
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e0e0e0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #000000;">
                      Questions or need to make changes?
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #666666;">
                      📞 <a href="tel:+61431951996" style="color: #ce9b28; text-decoration: none; font-weight: 600;">+61 431 951 996</a>
                      <span style="margin: 0 8px; color: #cccccc;">|</span>
                      ✉️ <a href="mailto:info@executivefleet.com.au" style="color: #ce9b28; text-decoration: none; font-weight: 600;">info@executivefleet.com.au</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 40px; background-color: #f9f9f9; text-align: center; border-top: 2px solid #e0e0e0;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #ce9b28; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">EXECUTIVE FLEET</p>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #999999;">Melbourne's Premier Luxury Chauffeur Service</p>
              <p style="margin: 0; font-size: 10px; color: #bbbbbb;">
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

















