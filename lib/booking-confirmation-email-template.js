// Simple Booking Confirmation Email Template
export const bookingConfirmationEmailTemplate = ({
  bookingReference,
  customerName,
  pickupDate,
  pickupLocation,
  dropoffLocation,
  vehicleName,
  driverName,
  driverPhone,
  shareDriverDetails,
  hasChildren,
  babyCapsule,
  babySeat,
  boosterSeat,
  specialInstructions,
  numberOfPassengers
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
          
          <!-- Sleek Compact Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%); padding: 16px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.5px;">
                Booking Confirmed - Executive Fleet
              </h1>
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
                    ${numberOfPassengers ? `<p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Passengers:</strong> ${numberOfPassengers}
                    </p>` : ''}
                    ${hasChildren && (babyCapsule > 0 || babySeat > 0 || boosterSeat > 0) ? `<p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Child Seats:</strong> ${[babyCapsule > 0 ? `${babyCapsule} Baby Capsule` : '', babySeat > 0 ? `${babySeat} Baby Seat` : '', boosterSeat > 0 ? `${boosterSeat} Booster Seat` : ''].filter(Boolean).join(', ')}
                    </p>` : ''}
                    ${specialInstructions ? `<p style="margin: 8px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Notes:</strong> ${specialInstructions}
                    </p>` : ''}
                  </td>
                </tr>
              </table>

              ${shareDriverDetails && driverName ? `
              <!-- Driver Details -->
              <table role="presentation" width="100%" style="background-color: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; margin: 25px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 1px;">
                      Your Driver
                    </p>
                    <p style="margin: 4px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Name:</strong> ${driverName}
                    </p>
                    ${driverPhone ? `<p style="margin: 4px 0; font-size: 14px; color: #333333;">
                      <strong style="color: #000000;">Phone:</strong> <a href="tel:${driverPhone}" style="color: #ce9b28; text-decoration: none; font-weight: 600;">${driverPhone}</a>
                    </p>` : ''}
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Next Steps -->
              <p style="margin: 25px 0 15px 0; font-size: 15px; color: #333333; line-height: 1.7;">
                Our team will contact you 24 hours before your scheduled pickup to reconfirm all details.
              </p>
            </td>
          </tr>

          <!-- Referral CTA -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 1px solid #d8b4fe; border-radius: 10px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #7c3aed;">
                  Know someone who needs a ride?
                </p>
                <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
                  Share the Executive Fleet experience with friends and family. Forward this email or visit
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://executivefleet.com.au'}" style="color: #ce9b28; font-weight: 600; text-decoration: none;">executivefleet.com.au</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
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

















