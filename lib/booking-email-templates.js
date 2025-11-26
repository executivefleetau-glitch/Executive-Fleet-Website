// Admin Booking Notification Email Template
export const adminBookingNotificationTemplate = ({ bookingReference, customerName, customerEmail, customerPhone, pickupLocation, dropoffLocation, pickupDate, pickupTime, vehicleName, serviceType, numberOfPassengers, createdAt }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #1a1a1a; box-shadow: 0 8px 32px rgba(236, 183, 29, 0.3); border: 2px solid rgba(236, 183, 29, 0.2);">
          
          <!-- Header with Gradient Background -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <div style="background-color: rgba(0, 0, 0, 0.3); display: inline-block; padding: 20px 40px; border-radius: 8px;">
                      <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                        🚗 New Booking
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #000000; font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                        Executive Fleet
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Reference Badge -->
          <tr>
            <td style="padding: 30px 40px 20px 40px; text-align: center;">
              <div style="background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%); display: inline-block; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(206, 155, 40, 0.5);">
                <p style="margin: 0; color: #000000; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  Booking Reference
                </p>
                <p style="margin: 5px 0 0 0; color: #000000; font-size: 24px; font-weight: 800; letter-spacing: 2px;">
                  ${bookingReference}
                </p>
              </div>
            </td>
          </tr>

          <!-- Alert Box -->
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: rgba(206, 155, 40, 0.1); border-left: 4px solid #ce9b28; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #E8B429; font-size: 14px; font-weight: 600;">
                      📩 A new chauffeur booking has been submitted and requires your attention.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding: 20px 40px;">
              <h3 style="margin: 0 0 20px 0; color: #E8B429; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(206, 155, 40, 0.3); padding-bottom: 10px;">
                Customer Information
              </h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email:</span>
                    <a href="mailto:${customerEmail}" style="color: #E8B429; font-size: 15px; font-weight: 600; margin-left: 10px; text-decoration: none;">${customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone:</span>
                    <a href="tel:${customerPhone}" style="color: #E8B429; font-size: 15px; font-weight: 600; margin-left: 10px; text-decoration: none;">${customerPhone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trip Details -->
          <tr>
            <td style="padding: 20px 40px;">
              <h3 style="margin: 0 0 20px 0; color: #E8B429; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(206, 155, 40, 0.3); padding-bottom: 10px;">
                Trip Details
              </h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">From:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${pickupLocation}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">To:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${dropoffLocation}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Pickup Date:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${pickupDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Pickup Time:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${pickupTime}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Vehicle:</span>
                    <span style="color: #E8B429; font-size: 15px; font-weight: 600; margin-left: 10px;">${vehicleName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Service Type:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${serviceType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Passengers:</span>
                    <span style="color: #ffffff; font-size: 15px; font-weight: 600; margin-left: 10px;">${numberOfPassengers}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 30px 40px;">
              <a href="mailto:${customerEmail}?subject=Booking Confirmation - ${bookingReference}" style="display: inline-block; padding: 18px 45px; background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%); color: #000000; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 1px; border-radius: 8px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(206, 155, 40, 0.5);">
                Contact Customer
              </a>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td style="padding: 20px 40px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                Booking received: ${createdAt}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #000000; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #E8B429; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
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
};

// Client Booking Confirmation Email Template
export const clientBookingConfirmationTemplate = ({ bookingReference, customerName, pickupLocation, dropoffLocation, pickupDate, pickupTime, vehicleName, serviceType, numberOfPassengers, isReturnTrip, returnDate, returnTime, additionalDestination, specialInstructions }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - Executive Fleet</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #1a1a1a; box-shadow: 0 8px 32px rgba(236, 183, 29, 0.3); border: 2px solid rgba(236, 183, 29, 0.2);">
          
          <!-- Hero Header -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);">
                <tr>
                  <td style="padding: 50px 40px; text-align: center;">
                    <!-- Success Icon -->
                    <div style="width: 100px; height: 100px; background-color: rgba(0, 0, 0, 0.4); border-radius: 50%; margin: 0 auto 25px auto; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 60px; line-height: 1;">✓</span>
                    </div>

                    <h1 style="margin: 0; color: #000000; font-size: 36px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                      Booking Received!
                    </h1>
                    <p style="margin: 15px 0 0 0; color: #000000; font-size: 16px; font-weight: 600; letter-spacing: 1px;">
                      Thank you for choosing Executive Fleet
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Reference -->
          <tr>
            <td style="padding: 35px 40px 25px 40px; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                Your Booking Reference
              </p>
              <div style="background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%); display: inline-block; padding: 20px 40px; border-radius: 50px; box-shadow: 0 6px 20px rgba(206, 155, 40, 0.6);">
                <p style="margin: 0; color: #000000; font-size: 32px; font-weight: 800; letter-spacing: 3px;">
                  ${bookingReference}
                </p>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Dear ${customerName},
              </p>
              <p style="margin: 20px 0 0 0; color: #cccccc; font-size: 15px; line-height: 1.7;">
                Thank you for booking with <strong style="color: #E8B429;">Executive Fleet</strong>. We have successfully received your booking request and our team will review it shortly.
              </p>
            </td>
          </tr>

          <!-- Important Notice -->
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, rgba(206, 155, 40, 0.15), rgba(232, 180, 41, 0.05)); border-left: 4px solid #ce9b28; border-radius: 8px;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 12px 0; color: #E8B429; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      ⏳ Awaiting Confirmation
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.7;">
                      Your booking is currently <strong>pending</strong>. Our team will contact you within <strong>24 hours</strong> to confirm availability, finalize pricing, and discuss any additional requirements.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trip Details -->
          <tr>
            <td style="padding: 30px 40px 20px 40px;">
              <h2 style="margin: 0 0 25px 0; color: #E8B429; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(206, 155, 40, 0.3); padding-bottom: 12px;">
                Your Trip Details
              </h2>

              <!-- Journey -->
              <div style="background-color: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(206, 155, 40, 0.2);">
                <div style="margin-bottom: 20px;">
                  <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Pickup Location</p>
                  <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">📍 ${pickupLocation}</p>
                </div>
                <div style="border-top: 2px dashed rgba(206, 155, 40, 0.3); margin: 15px 0; padding-top: 15px;">
                  <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Dropoff Location</p>
                  <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">📍 ${dropoffLocation}</p>
                </div>
                ${additionalDestination ? `
                <div style="border-top: 2px dashed rgba(206, 155, 40, 0.3); margin: 15px 0; padding-top: 15px;">
                  <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Additional Stop</p>
                  <p style="margin: 0; color: #E8B429; font-size: 16px; font-weight: 600;">📍 ${additionalDestination}</p>
                </div>
                ` : ''}
              </div>

              <!-- Date & Time -->
              <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(206, 155, 40, 0.2);">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 50%; padding-right: 10px;">
                      <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</p>
                      <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">📅 ${pickupDate}</p>
                    </td>
                    <td style="width: 50%; padding-left: 10px;">
                      <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Time</p>
                      <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">🕒 ${pickupTime}</p>
                    </td>
                  </tr>
                </table>
              </div>

              ${isReturnTrip ? `
              <!-- Return Trip -->
              <div style="background: linear-gradient(135deg, rgba(206, 155, 40, 0.1), rgba(232, 180, 41, 0.05)); padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 2px solid rgba(206, 155, 40, 0.3);">
                <p style="margin: 0 0 15px 0; color: #E8B429; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                  🔄 Return Trip Included
                </p>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 50%; padding-right: 10px;">
                      <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Return Date</p>
                      <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 600;">📅 ${returnDate}</p>
                    </td>
                    <td style="width: 50%; padding-left: 10px;">
                      <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Return Time</p>
                      <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 600;">🕒 ${returnTime}</p>
                    </td>
                  </tr>
                </table>
              </div>
              ` : ''}

              <!-- Vehicle & Service Info -->
              <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(206, 155, 40, 0.2);">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                      <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Selected Vehicle</p>
                      <p style="margin: 0; color: #E8B429; font-size: 16px; font-weight: 600;">🚗 ${vehicleName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 15px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="width: 50%; padding-right: 10px;">
                            <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service Type</p>
                            <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">${serviceType}</p>
                          </td>
                          <td style="width: 50%; padding-left: 10px;">
                            <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Passengers</p>
                            <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">👥 ${numberOfPassengers}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              ${specialInstructions ? `
              <!-- Special Instructions -->
              <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; margin-top: 20px; border: 1px solid rgba(206, 155, 40, 0.2);">
                <p style="margin: 0 0 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Special Instructions</p>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.7;">
                  ${specialInstructions}
                </p>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: rgba(0, 0, 0, 0.4); border: 2px solid rgba(206, 155, 40, 0.3); border-radius: 12px;">
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 15px 0; color: #E8B429; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      📞 Need Immediate Assistance?
                    </p>
                    <p style="margin: 0 0 20px 0; color: #cccccc; font-size: 14px; line-height: 1.7;">
                      Our team is here to help! For urgent matters or questions about your booking, please contact us directly:
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      <a href="tel:+41227157000" style="color: #E8B429; text-decoration: none;">📱 +41 22 715 7000</a><br>
                      <span style="font-size: 13px; color: #888888; font-weight: 400;">Available 24/7</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 20px 40px 40px 40px;">
              <a href="https://executivefleet.com.au" style="display: inline-block; padding: 18px 45px; background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%); color: #000000; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 1px; border-radius: 8px; text-transform: uppercase; box-shadow: 0 6px 20px rgba(206, 155, 40, 0.6);">
                Visit Our Website
              </a>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 15px 0; color: #cccccc; font-size: 15px; line-height: 1.7;">
                We look forward to providing you with an exceptional chauffeur experience!
              </p>
              <p style="margin: 0; color: #cccccc; font-size: 15px;">
                Best regards,<br>
                <strong style="color: #E8B429;">The Executive Fleet Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; background-color: #000000; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #E8B429; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
                EXECUTIVE FLEET
              </p>
              <p style="margin: 0 0 25px 0; color: #666666; font-size: 13px;">
                Melbourne's Premier Luxury Chauffeur Service
              </p>
              <div style="margin: 0 0 25px 0; height: 2px; background: linear-gradient(90deg, transparent, #ce9b28, #E8B429, transparent);"></div>
              <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #888888; font-size: 13px;">
                      📍 Melbourne VIC, Australia
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #888888; font-size: 13px;">
                      📞 <a href="tel:+41227157000" style="color: #E8B429; text-decoration: none;">+41 22 715 7000</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <p style="margin: 0; color: #888888; font-size: 13px;">
                      ✉️ <a href="mailto:admin@executivefleet.com.au" style="color: #E8B429; text-decoration: none;">admin@executivefleet.com.au</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 25px 0 0 0; color: #444444; font-size: 11px;">
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

