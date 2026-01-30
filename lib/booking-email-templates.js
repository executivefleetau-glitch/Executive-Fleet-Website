// Admin Booking Notification Email Template
export const adminBookingNotificationTemplate = ({
  bookingReference, bookingType, customerName, customerEmail, customerPhone,
  pickupLocation, dropoffLocation, pickupDate, pickupTime, expectedEndTime,
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
          
          <!-- Sleek Compact Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%); padding: 16px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.5px;">
                New Booking Received - Executive Fleet
              </h1>
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
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Booking Type: <strong style="color: #ce9b28; text-transform: capitalize;">${bookingType || 'Distance'}</strong></p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Date: <strong style="color: #000000;">${pickupDate}</strong></p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Pickup Time: <strong style="color: #000000;">${pickupTime}</strong></p>
                ${expectedEndTime ? `<p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">Expected End Time: <strong style="color: #ce9b28;">${expectedEndTime}</strong></p>` : ''}
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


// Client Booking Confirmation Email Template (Quote Request)
export const clientBookingConfirmationTemplate = ({
  bookingReference, bookingType, customerName, pickupLocation, dropoffLocation,
  pickupDate, pickupTime, expectedEndTime, vehicleName, serviceType, numberOfPassengers,
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
  <title>Your Quote Request - Executive Fleet</title>
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
          
          <!-- Sleek Compact Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%); padding: 16px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.5px;">
                Your Quote Request - Executive Fleet
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 40px 20px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #000000; font-weight: 600;">Dear ${customerName},</p>
              <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.7;">
                Thank you for requesting a quote from Executive Fleet. We have received your details and our team will send you a personalized quote shortly.
              </p>
            </td>
          </tr>

          <!-- Booking Details Section -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <div style="background-color: #fafafa; padding: 25px; border-radius: 12px; border: 2px solid #f0f0f0;">
                
                <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #000000; font-weight: 700;">Your Quote Request Details:</h2>
                
                <!-- General Info -->
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Booking Type:</strong> <span style="color: #ce9b28; text-transform: capitalize;">${bookingType || 'Distance'}</span>
                  </p>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Date:</strong> ${pickupDate}
                  </p>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Pickup Time:</strong> ${pickupTime}
                  </p>
                  ${expectedEndTime ? `
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;">
                    <strong style="color: #000000;">Expected End Time:</strong> <span style="color: #ce9b28;">${expectedEndTime}</span>
                  </p>
                  ` : ''}
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
                  <strong>What happens next?</strong><br><br>
                  Our team will review your details and send you a personalized quote. We respond <strong>7am - 10pm same day</strong>, otherwise next business day.
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
                  Phone: <a href="tel:+61431951996" style="color: #ce9b28; text-decoration: none; font-weight: 600;">+61 431 951 996</a>
                </p>
                <p style="margin: 0; font-size: 13px; color: #555555;">
                  Email: <a href="mailto:info@executivefleet.com.au" style="color: #ce9b28; text-decoration: none; font-weight: 600;">info@executivefleet.com.au</a>
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
                Thank you for considering Executive Fleet for your transportation needs. No commitment required until you approve your quote.
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


// Admin Notification Template - Customer Confirmed Booking
export const adminBookingConfirmedNotificationTemplate = ({
  bookingReference,
  customerName,
  customerEmail,
  customerPhone,
  pickupLocation,
  dropoffLocation,
  pickupDate,
  pickupTime,
  vehicleName,
  finalPrice,
  confirmedAt
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - ${bookingReference}</title>
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
        <table role="presentation" style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 3px solid #28a745;">
          
          <!-- Header - Green for Confirmation -->
          <tr>
            <td style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 16px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                ✅ Booking Confirmed by Customer
              </h1>
            </td>
          </tr>

          <!-- Booking Reference -->
          <tr>
            <td style="padding: 30px 40px 20px 40px; text-align: center; background-color: #ffffff;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Booking Reference</p>
              <div style="display: inline-block; background: #28a745; padding: 12px 30px; border-radius: 8px;">
                <p style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">${bookingReference}</p>
              </div>
            </td>
          </tr>

          <!-- Success Alert -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px 20px; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #155724; font-weight: 600;">
                  🎉 Great news! The customer has confirmed their booking and accepted the quoted price.
                </p>
              </div>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;">
              <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #28a745; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Customer Information</h3>
              <table role="presentation" width="100%" style="background-color: #f9f9f9; border-radius: 8px; overflow: hidden;">
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; width: 35%; font-weight: 600;">Name:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000; font-weight: 600;">${customerName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Email:</td>
                  <td style="padding: 12px 15px;"><a href="mailto:${customerEmail}" style="font-size: 14px; color: #28a745; text-decoration: none; font-weight: 600;">${customerEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Phone:</td>
                  <td style="padding: 12px 15px;"><a href="tel:${customerPhone}" style="font-size: 14px; color: #28a745; text-decoration: none; font-weight: 600;">${customerPhone}</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trip Details -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;">
              <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #28a745; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Trip Details</h3>
              <table role="presentation" width="100%" style="background-color: #f9f9f9; border-radius: 8px; overflow: hidden;">
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; width: 35%; font-weight: 600;">Date:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000; font-weight: 600;">${pickupDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Time:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000; font-weight: 600;">${pickupTime || 'As scheduled'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Pickup:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000;">${pickupLocation}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Destination:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000;">${dropoffLocation}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-size: 13px; color: #666666; font-weight: 600;">Vehicle:</td>
                  <td style="padding: 12px 15px; font-size: 14px; color: #000000; font-weight: 600;">${vehicleName}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Price Box -->
          ${finalPrice ? `
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 20px; border-radius: 12px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px;">Confirmed Price</p>
                <p style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff;">$${parseFloat(finalPrice).toFixed(2)}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Action Required -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #856404; font-weight: 700;">📋 Next Steps:</p>
                <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 13px; line-height: 1.8;">
                  <li>Assign a driver to this booking</li>
                  <li>Contact customer 24 hours before pickup to reconfirm</li>
                  <li>Ensure vehicle is prepared and ready</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- View in Dashboard Button -->
          <tr>
            <td align="center" style="padding: 20px 40px 30px 40px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://executivefleet.com.au'}/admin/bookings" style="display: inline-block; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                View in Dashboard
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 40px; background-color: #f9f9f9; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666;">
                Confirmed: ${confirmedAt}
              </p>
              <p style="margin: 10px 0 5px 0; font-size: 14px; color: #28a745; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">EXECUTIVE FLEET</p>
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




