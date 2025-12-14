// Admin Booking Notification Email Template
export const adminBookingNotificationTemplate = ({ 
  bookingReference, customerName, customerEmail, customerPhone, 
  pickupLocation, dropoffLocation, pickupDate, pickupTime, 
  vehicleName, serviceType, numberOfPassengers, 
  hasChildren, babyCapsule, babySeat, boosterSeat,
  isReturnTrip, returnPickupLocation, returnDropoffLocation, returnDate, returnTime,
  additionalDestination, specialInstructions, createdAt 
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - ${bookingReference}</title>
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
        <table role="presentation" style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 3px solid #ce9b28;">
          
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
                <span style="color: #ce9b28;">NEW BOOKING</span>
                <span style="color: #ffffff;"> RECEIVED</span>
              </h1>
              <p style="margin: 15px 0 0 0; font-size: 13px; font-weight: 600; color: #888888; letter-spacing: 2px; text-transform: uppercase;">
                EXECUTIVE FLEET
              </p>
            </td>
          </tr>

          <!-- Booking Reference -->
          <tr>
            <td style="padding: 30px 40px 20px 40px; text-align: center; background-color: #ffffff;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Booking Reference</p>
              <div style="display: inline-block; background: #000000; padding: 12px 30px; border-radius: 8px;">
                <p style="margin: 0; font-size: 24px; font-weight: 800; background: linear-gradient(90deg,#ce9b28 0%,#fffbe9 50%,#E8B429 100%); letter-spacing: 2px;">${bookingReference}</p>
              </div>
            </td>
          </tr>

          <!-- Alert -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background-color: #fff8e1; border-left: 4px solid #ce9b28; padding: 15px 20px; border-radius: 8px;">
                <p style="margin: 0; font-size: 13px; color: #000000; font-weight: 600;">
                  📩 A new booking request requires your attention
                </p>
              </div>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;">
              <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ce9b28; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Customer Information</h3>
              <table role="presentation" width="100%" style="background-color: #f9f9f9; border-radius: 8px; overflow: hidden;">
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; width: 35%; font-weight: 600;">Name:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000; font-weight: 600;">${customerName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Email:</td>
                  <td style="padding: 12px 15px;"><a href="mailto:${customerEmail}" style="font-size: 14px; color: #ce9b28; text-decoration: none; font-weight: 600;">${customerEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Phone:</td>
                  <td style="padding: 12px 15px;"><a href="tel:${customerPhone}" style="font-size: 14px; color: #ce9b28; text-decoration: none; font-weight: 600;">${customerPhone}</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;">
              <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ce9b28; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Your Booking Details:</h3>
              
              <!-- General Info -->
              <div style="background-color: #ffffff; padding: 15px; border: 2px solid #f0f0f0; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Date: <strong style="color: #000000;">${pickupDate}</strong></p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Time: <strong style="color: #000000;">${pickupTime}</strong></p>
                <p style="margin: 0; font-size: 13px; color: #666666;">Pickup: <strong style="color: #000000;">${pickupLocation}</strong></p>
              </div>

              <!-- Outbound Journey -->
              <div style="background-color: #fef9f0; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #f0e6d2;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #000000; font-weight: 700;">
                  🚗 Outbound Journey
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Destination 1:</strong> ${dropoffLocation}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Date:</strong> ${pickupDate}
                </p>
                <p style="margin: 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Time:</strong> ${pickupTime}
                </p>
                ${additionalDestination ? `
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #666666;">
                  <strong style="color: #ce9b28;">Additional Stop:</strong> ${additionalDestination}
                </p>
                ` : ''}
              </div>

              ${isReturnTrip ? `
              <!-- Return Journey -->
              <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #d0e4f7;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #000000; font-weight: 700;">
                  🔄 Return Journey
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Pickup:</strong> ${returnPickupLocation || 'To be confirmed'}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Destination:</strong> ${returnDropoffLocation || 'To be confirmed'}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Date:</strong> ${returnDate || 'To be confirmed'}
                </p>
                <p style="margin: 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Time:</strong> ${returnTime || 'To be confirmed'}
                </p>
              </div>
              ` : ''}

              <!-- Vehicle & Service -->
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Vehicle:</strong> ${vehicleName}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Service Area:</strong> ${serviceType}
                </p>
                <p style="margin: 0; font-size: 13px; color: #666666;">
                  <strong style="color: #000000;">Passengers:</strong> ${numberOfPassengers}
                </p>
              </div>

              ${hasChildren ? `
              <!-- Child Seats -->
              <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 3px solid #ce9b28;">
                <p style="margin: 0 0 12px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Child Seats Required:</p>
                ${babyCapsule > 0 ? `<p style="margin: 0 0 6px 0; font-size: 13px; color: #000000;">🍼 Baby Capsule (Rear Facing): <strong>${babyCapsule}</strong></p>` : ''}
                ${babySeat > 0 ? `<p style="margin: 0 0 6px 0; font-size: 13px; color: #000000;">👶 Baby Seat: <strong>${babySeat}</strong></p>` : ''}
                ${boosterSeat > 0 ? `<p style="margin: 0; font-size: 13px; color: #000000;">🧒 Booster Seat (4-7 yrs): <strong>${boosterSeat}</strong></p>` : ''}
              </div>
              ` : ''}

              ${specialInstructions ? `
              <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 3px solid #ce9b28;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Special Instructions:</p>
                <p style="margin: 0; font-size: 13px; color: #000000; line-height: 1.6;">${specialInstructions}</p>
              </div>
              ` : ''}
                  </td>
                </tr>

          <!-- Confirmation Notice -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <div style="background-color: #f0f7f0; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #000000; line-height: 1.6;">
                  Our team will confirm your booking within the next 2 hours. We'll ensure everything is arranged perfectly for your journey.
                </p>
              </div>
            </td>
          </tr>

          <!-- Contact Button -->
          <tr>
            <td align="center" style="padding: 0 40px 30px 40px;">
              <a href="mailto:${customerEmail}?subject=Booking ${bookingReference}" style="display: inline-block; background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%); color: #000000; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                Contact Customer
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 40px; background-color: #f9f9f9; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666;">
                Booking received: ${createdAt}
              </p>
              <p style="margin: 10px 0 5px 0; font-size: 14px; color: #ce9b28; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">EXECUTIVE FLEET</p>
              <p style="margin: 0; font-size: 11px; color: #999999;">Melbourne's Premier Chauffeur Service</p>
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
export const clientBookingConfirmationTemplate = ({ 
  bookingReference, customerName, pickupLocation, dropoffLocation, 
  pickupDate, pickupTime, vehicleName, serviceType, numberOfPassengers, 
  hasChildren, babyCapsule, babySeat, boosterSeat,
  isReturnTrip, returnPickupLocation, returnDropoffLocation, returnDate, returnTime,
  additionalDestination, specialInstructions 
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Booking Request - Executive Fleet</title>
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
        <table role="presentation" style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 3px solid #ce9b28;">
          
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
                <span style="color: #ffffff;"> Received!</span>
              </h1>
              <p style="margin: 15px 0 0 0; font-size: 13px; font-weight: 600; color: #888888; letter-spacing: 2px; text-transform: uppercase;">
                EXECUTIVE FLEET
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 40px 20px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #000000; font-weight: 600;">Dear ${customerName},</p>
              <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.7;">
                Thank you for choosing Executive Fleet. We have received your booking request and our team will review it shortly.
              </p>
            </td>
          </tr>

          <!-- Booking Details Section -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <div style="background-color: #fafafa; padding: 25px; border-radius: 12px; border: 2px solid #f0f0f0;">
                
                <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #000000; font-weight: 700;">Your Booking Details:</h2>
                
                <!-- General Info -->
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Date:</strong> ${pickupDate}
                  </p>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Time:</strong> ${pickupTime}
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Pickup:</strong> ${pickupLocation}
                  </p>
                </div>

                <!-- Outbound Journey -->
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ce9b28;">
                  <p style="margin: 0 0 15px 0; font-size: 16px; color: #000000; font-weight: 700;">
                    🚗 Outbound Journey
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Destination 1:</strong> ${dropoffLocation}
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Date:</strong> ${pickupDate}
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Time:</strong> ${pickupTime}
                  </p>
                ${additionalDestination ? `
                  <p style="margin: 10px 0 0 0; font-size: 14px; color: #555555;">
                    <strong style="color: #ce9b28;">Additional Stop:</strong> ${additionalDestination}
                  </p>
                ` : ''}
              </div>

              ${isReturnTrip ? `
                <!-- Return Journey -->
                <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #5b9bd5;">
                  <p style="margin: 0 0 15px 0; font-size: 16px; color: #000000; font-weight: 700;">
                    🔄 Return Journey
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Pickup:</strong> ${returnPickupLocation || 'To be confirmed'}
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Destination:</strong> ${returnDropoffLocation || 'To be confirmed'}
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Date:</strong> ${returnDate || 'To be confirmed'}
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Time:</strong> ${returnTime || 'To be confirmed'}
                  </p>
              </div>
              ` : ''}

                <!-- Vehicle Info -->
                <div style="background-color: #fff; padding: 15px; border-radius: 8px;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Vehicle:</strong> ${vehicleName}
                  </p>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Service Area:</strong> ${serviceType}
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Passengers:</strong> ${numberOfPassengers}
                  </p>
              </div>

              ${hasChildren ? `
                <!-- Child Seats -->
                <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <p style="margin: 0 0 12px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Child Seats:</p>
                  ${babyCapsule > 0 ? `<p style="margin: 0 0 6px 0; font-size: 13px; color: #000000;">🍼 Baby Capsule (Rear Facing): <strong>${babyCapsule}</strong></p>` : ''}
                  ${babySeat > 0 ? `<p style="margin: 0 0 6px 0; font-size: 13px; color: #000000;">👶 Baby Seat: <strong>${babySeat}</strong></p>` : ''}
                  ${boosterSeat > 0 ? `<p style="margin: 0; font-size: 13px; color: #000000;">🧒 Booster Seat (4-7 yrs): <strong>${boosterSeat}</strong></p>` : ''}
                </div>
              ` : ''}

              ${specialInstructions ? `
                <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Special Instructions:</p>
                  <p style="margin: 0; font-size: 13px; color: #000000; line-height: 1.6;">${specialInstructions}</p>
              </div>
              ` : ''}

                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0; font-size: 13px; color: #888888;">...</p>
              </div>
              </div>
            </td>
          </tr>

          <!-- Confirmation Notice -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background-color: #f0f7f0; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #000000; line-height: 1.7; text-align: center;">
                  Our team will confirm your booking within the next 2 hours. We'll ensure everything is arranged perfectly for your journey.
                </p>
              </div>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <div style="background-color: #fafafa; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #000000; font-weight: 700;">Contact us:</p>
                <p style="margin: 0 0 5px 0; font-size: 13px; color: #555555;">
                  Phone: <a href="tel:+61430240945" style="color: #ce9b28; text-decoration: none; font-weight: 600;">+61 430 240 945</a>
                </p>
                <p style="margin: 0; font-size: 13px; color: #555555;">
                  Email: <a href="mailto:executivefleet.au@gmail.com" style="color: #ce9b28; text-decoration: none; font-weight: 600;">executivefleet.au@gmail.com</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Closing Message -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #333333; line-height: 1.7;">
                At Executive Fleet, we pride ourselves on delivering premium chauffeur services with unmatched professionalism and luxury. Our experienced drivers and executive fleet ensure your journey is comfortable, punctual, and memorable.
              </p>
              <div style="background-color: #fafafa; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #000000; font-weight: 600;">
                  We proudly serve: Melbourne and Greater Victoria
                </p>
              </div>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #333333; text-align: center;">
                Thank you for trusting Executive Fleet with your transportation needs.
              </p>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #333333; text-align: center;">
                Best regards,<br>
                <strong style="color: #000000;">Executive Fleet Team</strong>
              </p>
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

