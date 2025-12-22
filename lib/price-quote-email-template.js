// Price Quote Email Template for Admin to Send to Clients
export const priceQuoteEmailTemplate = ({ 
  bookingReference, 
  customerName, 
  pickupLocation, 
  dropoffLocation, 
  pickupDate, 
  pickupTime, 
  vehicleName, 
  numberOfPassengers,
  isReturnTrip,
  returnPickupLocation,
  returnDropoffLocation, 
  returnDate, 
  returnTime,
  outboundFare,
  returnFare,
  childSeatBreakdown = [],
  extraCharges = [],
  subtotal,
  discount,
  total,
  confirmationToken
}) => {
  const hasDiscount = isReturnTrip && discount > 0;
  const hasChildSeats = childSeatBreakdown && childSeatBreakdown.length > 0;
  const hasExtras = extraCharges && extraCharges.length > 0;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Quote - Executive Fleet</title>
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
                <span style="color: #ce9b28;">Your</span>
                <span style="color: #ffffff;"> Quote</span>
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
                We're delighted to provide you with a quote for your upcoming journey.
              </p>
            </td>
          </tr>

          <!-- Trip Details -->
          <tr>
            <td style="padding: 20px 40px;">
              
              <!-- Outbound Journey -->
              <div style="background-color: #fef9f0; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #ce9b28;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #000000; font-weight: 700;">
                  🚗 Outbound Journey
                </h3>
                <table role="presentation" width="100%" style="border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Date:</strong>
                      <span style="color: #000000; margin-left: 10px;">${pickupDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Time:</strong>
                      <span style="color: #000000; margin-left: 10px;">${pickupTime}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Pickup:</strong>
                      <span style="color: #000000; margin-left: 10px;">${pickupLocation}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Destination:</strong>
                      <span style="color: #000000; margin-left: 10px;">${dropoffLocation}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Vehicle:</strong>
                      <span style="color: #000000; margin-left: 10px;">${vehicleName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Passengers:</strong>
                      <span style="color: #000000; margin-left: 10px;">${numberOfPassengers}</span>
                    </td>
                  </tr>
                </table>
              </div>

              ${isReturnTrip ? `
              <!-- Return Journey -->
              <div style="background-color: #f0f7ff; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #5b9bd5;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #000000; font-weight: 700;">
                  🔄 Return Journey
                </h3>
                <table role="presentation" width="100%" style="border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Date:</strong>
                      <span style="color: #000000; margin-left: 10px;">${returnDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Time:</strong>
                      <span style="color: #000000; margin-left: 10px;">${returnTime}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Pickup:</strong>
                      <span style="color: #000000; margin-left: 10px;">${returnPickupLocation}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Destination:</strong>
                      <span style="color: #000000; margin-left: 10px;">${returnDropoffLocation}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px;">
                      <strong style="color: #666666;">Vehicle:</strong>
                      <span style="color: #000000; margin-left: 10px;">${vehicleName}</span>
                    </td>
                  </tr>
                </table>
              </div>
              ` : ''}

            </td>
          </tr>

          <!-- Pricing Table -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <table role="presentation" width="100%" style="background-color: #fafafa; border-radius: 12px; overflow: hidden; border: 2px solid #e0e0e0;">
                
                <!-- Table Header -->
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 15px 20px; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e0e0e0;">
                    SERVICE
                  </td>
                  <td style="padding: 15px 20px; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 1px; text-align: right; border-bottom: 2px solid #e0e0e0;">
                    AMOUNT
                  </td>
                </tr>

                <!-- Outbound Fare -->
                <tr>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; border-bottom: 1px solid #e0e0e0;">
                    Outbound Base Fare
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; text-align: right; border-bottom: 1px solid #e0e0e0;">
                    $${parseFloat(outboundFare).toFixed(2)}
                  </td>
                </tr>

                ${isReturnTrip ? `
                <!-- Return Fare -->
                <tr>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; border-bottom: 1px solid #e0e0e0;">
                    Return Base Fare
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; text-align: right; border-bottom: 1px solid #e0e0e0;">
                    $${parseFloat(returnFare).toFixed(2)}
                  </td>
                </tr>
                ` : ''}

                ${hasChildSeats ? childSeatBreakdown.map(item => `
                <!-- Child Seat: ${item.name} -->
                <tr style="background-color: #fff8e1;">
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; border-bottom: 1px solid #e0e0e0; border-left: 3px solid #ce9b28;">
                    ${item.name}${item.quantity > 1 ? ` (${item.quantity} × $${parseFloat(item.priceEach).toFixed(2)})` : ''}
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; text-align: right; border-bottom: 1px solid #e0e0e0;">
                    $${parseFloat(item.total).toFixed(2)}
                  </td>
                </tr>
                `).join('') : ''}

                ${hasExtras ? extraCharges.map(item => `
                <!-- Extra: ${item.name} -->
                <tr style="background-color: #f0f7ff;">
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; border-bottom: 1px solid #e0e0e0; border-left: 3px solid #5b9bd5;">
                    ${item.name}
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; text-align: right; border-bottom: 1px solid #e0e0e0;">
                    $${parseFloat(item.price).toFixed(2)}
                  </td>
                </tr>
                `).join('') : ''}

                <!-- Subtotal -->
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; font-weight: 700; border-bottom: 1px solid #e0e0e0;">
                    Subtotal
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #000000; font-weight: 700; text-align: right; border-bottom: 1px solid #e0e0e0;">
                    $${parseFloat(subtotal).toFixed(2)}
                  </td>
                </tr>

                ${hasDiscount ? `
                <!-- Discount -->
                <tr style="background-color: #d4edda;">
                  <td style="padding: 15px 20px;">
                    <div style="font-size: 15px; color: #155724; font-weight: 600;">
                      Discount (4%)
                    </div>
                    <div style="font-size: 12px; color: #155724; margin-top: 2px;">
                      Return booking discount
                    </div>
                  </td>
                  <td style="padding: 15px 20px; font-size: 15px; color: #155724; font-weight: 700; text-align: right;">
                    -$${parseFloat(discount).toFixed(2)}
                  </td>
                </tr>
                ` : ''}

                <!-- Total -->
                <tr style="background: linear-gradient(135deg, #d4a574 0%, #c89b5a 100%);">
                  <td style="padding: 20px; font-size: 18px; color: #000000; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                    TOTAL
                  </td>
                  <td style="padding: 20px; font-size: 22px; color: #000000; font-weight: 800; text-align: right;">
                    $${parseFloat(total).toFixed(2)}
                  </td>
                </tr>

              </table>

              ${hasDiscount ? `
              <!-- Special Offer Banner -->
              <div style="background-color: #fff3cd; border: 2px solid #d4a574; border-left: 4px solid #ce9b28; padding: 15px 20px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; font-size: 15px; color: #856404; font-weight: 700;">
                  🎉 Special Offer Applied!
                </p>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #856404;">
                  Return booking discount
                </p>
              </div>
              ` : ''}

            </td>
          </tr>

          <!-- Confirm Button -->
          <tr>
            <td align="center" style="padding: 20px 40px 40px 40px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/confirm/${confirmationToken}" style="display: inline-block; background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%); color: #000000; padding: 18px 50px; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);">
                Confirm Booking
              </a>
              <p style="margin: 15px 0 0 0; font-size: 13px; color: #666666;">
                Click the button above to confirm your booking
              </p>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <div style="background-color: #fafafa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #000000; font-weight: 700;">Need to make changes?</p>
                <p style="margin: 0 0 15px 0; font-size: 13px; color: #666666; line-height: 1.6;">
                  If you have any questions or need to modify your booking, please don't hesitate to contact us.
                </p>
                <p style="margin: 0; font-size: 13px; color: #666666;">
                  📞 Phone: <a href="tel:+614531951996" style="color: #ce9b28; text-decoration: none; font-weight: 600;">+61 4531 951 996</a><br>
                  ✉️ Email: <a href="mailto:executivefleet.au@gmail.com" style="color: #ce9b28; text-decoration: none; font-weight: 600;">executivefleet.au@gmail.com</a>
                </p>
              </div>
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

