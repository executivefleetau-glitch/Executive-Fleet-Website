// Return Booking Request Email Template
export const returnBookingEmailTemplate = ({
  bookingReference,
  customerName,
  originalPickupDate,
  originalPickupLocation,
  originalDropoffLocation,
  vehicleName,
  returnBookingUrl
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Your Return Journey - Executive Fleet</title>
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
            <td style="background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%); padding: 16px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.5px;">
                Need a Return Journey? - Executive Fleet
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; font-weight: 600;">Dear ${customerName},</p>
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #333333; line-height: 1.7;">
                Thank you for booking with Executive Fleet! We hope you're looking forward to your upcoming journey.
              </p>
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #333333; line-height: 1.7;">
                We noticed you haven't booked a return trip yet. Would you like us to arrange your return journey? 
                Simply click the button below and we'll have your return transfer ready with the same premium service.
              </p>

              <!-- Savings Incentive -->
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #86efac; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 25px;">
                <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 800; color: #166534;">
                  Book your return and save!
                </p>
                <p style="margin: 0; font-size: 13px; color: #15803d; line-height: 1.5;">
                  Return bookings are priced competitively. No surge pricing, guaranteed pickup.
                </p>
              </div>
              
              <!-- Original Booking Summary -->
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e0e0e0; margin: 25px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #ce9b28; text-transform: uppercase; letter-spacing: 1px;">
                      Your Original Booking (Ref: ${bookingReference})
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Date:</strong> ${originalPickupDate}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">From:</strong> ${originalPickupLocation}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">To:</strong> ${originalDropoffLocation}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Vehicle:</strong> ${vehicleName}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Return Journey Preview -->
              <table role="presentation" width="100%" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 8px; border: 2px dashed #0ea5e9; margin: 25px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 1px;">
                      Suggested Return Journey
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #0c4a6e;">
                      <strong>From:</strong> ${originalDropoffLocation}
                    </p>
                    <p style="margin: 8px 0; font-size: 14px; color: #0c4a6e;">
                      <strong>To:</strong> ${originalPickupLocation}
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 13px; color: #64748b; font-style: italic;">
                      You'll be able to choose your preferred return date and time.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${returnBookingUrl}" style="display: inline-block; padding: 18px 45px; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); color: #000000; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);">
                      Book Your Return Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0; font-size: 14px; color: #666666; text-align: center; line-height: 1.6;">
                Already have alternative arrangements? No problem! 
                Just ignore this email. We're here whenever you need us.
              </p>
            </td>
          </tr>

          <!-- Why Book Return Section -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e0e0e0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #333333;">
                      Why book your return with us?
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 13px; line-height: 1.8;">
                      <li>Same professional chauffeur service</li>
                      <li>Pre-arranged pickup - no waiting or searching</li>
                      <li>Consistent pricing with no surge charges</li>
                      <li>Seamless coordination between both journeys</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 8px; border: 1px solid #e0e0e0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #000000;">
                      Prefer to speak to someone? We're here to help!
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
