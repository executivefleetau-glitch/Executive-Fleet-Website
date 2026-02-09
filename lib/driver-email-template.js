import { formatDateMelbourne, formatTimeMelbourne, getReconstructedTimestamp } from '@/lib/timezone';

/**
 * Generates a professional email template for sending booking details
 * to a driver or other person (e.g. partner, staff).
 *
 * @param {Object} booking - The full booking record from the database
 * @param {string} [adminMessage] - Optional message from the admin
 * @returns {string} HTML email string
 */
export function driverEmailTemplate(booking, adminMessage, options = {}) {
  const { includeCustomerPhone = true } = options;
  // Format dates and times using shared Melbourne timezone helpers
  // Reconstruct full timestamp for correct DST-aware formatting
  const formattedDate = formatDateMelbourne(booking.pickupDate);
  const pickupTs = getReconstructedTimestamp(booking.pickupDate, booking.pickupTime);
  const formattedTime = pickupTs ? formatTimeMelbourne(pickupTs) : 'N/A';

  let formattedReturnDate = '';
  let formattedReturnTime = '';
  if (booking.isReturnTrip) {
    formattedReturnDate = booking.returnDate ? formatDateMelbourne(booking.returnDate) : '';
    const returnTs = getReconstructedTimestamp(booking.returnDate, booking.returnTime);
    formattedReturnTime = returnTs ? formatTimeMelbourne(returnTs) : '';
  }

  // Build child seats info
  const childSeatParts = [];
  if (booking.babyCapsule > 0) childSeatParts.push(`${booking.babyCapsule} Baby Capsule(s)`);
  if (booking.babySeat > 0) childSeatParts.push(`${booking.babySeat} Baby Seat(s)`);
  if (booking.boosterSeat > 0) childSeatParts.push(`${booking.boosterSeat} Booster Seat(s)`);
  const childSeatsText = childSeatParts.length > 0 ? childSeatParts.join(', ') : null;

  // Google Maps links
  const pickupMapsUrl = booking.pickupLat && booking.pickupLng
    ? `https://www.google.com/maps/search/?api=1&query=${booking.pickupLat},${booking.pickupLng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.pickupLocation)}`;

  const dropoffMapsUrl = booking.dropoffLat && booking.dropoffLng
    ? `https://www.google.com/maps/search/?api=1&query=${booking.dropoffLat},${booking.dropoffLng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.dropoffLocation)}`;

  // Build return trip section
  const returnTripSection = booking.isReturnTrip ? `
    <tr>
      <td style="padding: 20px 30px 0 30px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #92400e; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                ↩ Return Trip
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                ${formattedReturnDate ? `<tr><td style="padding: 4px 0; color: #78716c; font-size: 13px; width: 100px;">Date:</td><td style="padding: 4px 0; color: #1c1917; font-size: 13px; font-weight: 600;">${formattedReturnDate}</td></tr>` : ''}
                ${formattedReturnTime ? `<tr><td style="padding: 4px 0; color: #78716c; font-size: 13px;">Time:</td><td style="padding: 4px 0; color: #1c1917; font-size: 13px; font-weight: 600;">${formattedReturnTime}</td></tr>` : ''}
                ${booking.returnPickupLocation ? `<tr><td style="padding: 4px 0; color: #78716c; font-size: 13px; vertical-align: top;">Pickup:</td><td style="padding: 4px 0; color: #1c1917; font-size: 13px; font-weight: 600;">${booking.returnPickupLocation}</td></tr>` : ''}
                ${booking.returnDropoffLocation ? `<tr><td style="padding: 4px 0; color: #78716c; font-size: 13px; vertical-align: top;">Dropoff:</td><td style="padding: 4px 0; color: #1c1917; font-size: 13px; font-weight: 600;">${booking.returnDropoffLocation}</td></tr>` : ''}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  // Build flight info section
  const flightSection = (booking.flightNumber || booking.terminalType) ? `
    <tr>
      <td style="padding: 20px 30px 0 30px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                ✈ Flight Information
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                ${booking.flightNumber ? `<tr><td style="padding: 4px 0; color: #64748b; font-size: 13px; width: 100px;">Flight:</td><td style="padding: 4px 0; color: #1e293b; font-size: 13px; font-weight: 600;">${booking.flightNumber}</td></tr>` : ''}
                ${booking.terminalType ? `<tr><td style="padding: 4px 0; color: #64748b; font-size: 13px;">Terminal:</td><td style="padding: 4px 0; color: #1e293b; font-size: 13px; font-weight: 600;">${booking.terminalType}</td></tr>` : ''}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  // Build admin message section
  const adminMessageSection = adminMessage && adminMessage.trim() ? `
    <tr>
      <td style="padding: 20px 30px 0 30px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #faf5ff; border-left: 4px solid #8b5cf6; border-radius: 0 8px 8px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b21a8; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                Message from Admin
              </p>
              <p style="margin: 0; color: #581c87; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${adminMessage}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  // Build special instructions section
  const specialInstructionsSection = booking.specialInstructions ? `
    <tr>
      <td style="padding: 20px 30px 0 30px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 0 8px 8px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 8px 0; color: #854d0e; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                Special Instructions
              </p>
              <p style="margin: 0; color: #713f12; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${booking.specialInstructions}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trip Assignment - ${booking.bookingReference}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 30px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 24px 30px; text-align: center;">
              <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #ce9b28; letter-spacing: 1px; text-transform: uppercase;">
                Executive Fleet
              </h1>
              <p style="margin: 0; font-size: 13px; color: #999; letter-spacing: 0.5px;">Trip Assignment</p>
            </td>
          </tr>

          <!-- Reference Banner -->
          <tr>
            <td style="background-color: #ce9b28; padding: 14px 30px; text-align: center;">
              <p style="margin: 0; font-size: 16px; font-weight: 700; color: #000; letter-spacing: 0.5px;">
                Booking Ref: ${booking.bookingReference}
              </p>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding: 24px 30px 0 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Customer Details
                    </p>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 13px; width: 100px;">Name:</td>
                        <td style="padding: 4px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${booking.customerName}</td>
                      </tr>
                      ${includeCustomerPhone ? `<tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 13px;">Phone:</td>
                        <td style="padding: 4px 0;">
                          <a href="tel:${booking.customerPhone}" style="color: #1e293b; font-size: 14px; font-weight: 600; text-decoration: none;">${booking.customerPhone}</a>
                        </td>
                      </tr>` : ''}
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 13px;">Email:</td>
                        <td style="padding: 4px 0;">
                          <a href="mailto:${booking.customerEmail}" style="color: #ce9b28; font-size: 13px; text-decoration: none;">${booking.customerEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 13px;">Passengers:</td>
                        <td style="padding: 4px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${booking.numberOfPassengers}</td>
                      </tr>
                      ${childSeatsText ? `<tr><td style="padding: 4px 0; color: #64748b; font-size: 13px;">Child Seats:</td><td style="padding: 4px 0; color: #1e293b; font-size: 13px;">${childSeatsText}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trip Details -->
          <tr>
            <td style="padding: 20px 30px 0 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 0 8px 8px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; color: #166534; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Trip Details
                    </p>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 4px 0; color: #4ade80; font-size: 13px; width: 100px;">Date:</td>
                        <td style="padding: 4px 0; color: #14532d; font-size: 14px; font-weight: 700;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #4ade80; font-size: 13px;">Time:</td>
                        <td style="padding: 4px 0; color: #14532d; font-size: 14px; font-weight: 700;">${formattedTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0 4px 0; color: #4ade80; font-size: 13px; vertical-align: top;">Pickup:</td>
                        <td style="padding: 8px 0 4px 0; color: #14532d; font-size: 13px; font-weight: 600;">
                          <a href="${pickupMapsUrl}" style="color: #14532d; text-decoration: underline;" target="_blank">${booking.pickupLocation}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #4ade80; font-size: 13px; vertical-align: top;">Dropoff:</td>
                        <td style="padding: 4px 0; color: #14532d; font-size: 13px; font-weight: 600;">
                          <a href="${dropoffMapsUrl}" style="color: #14532d; text-decoration: underline;" target="_blank">${booking.dropoffLocation}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #4ade80; font-size: 13px;">Service:</td>
                        <td style="padding: 4px 0; color: #14532d; font-size: 13px; font-weight: 600;">${booking.serviceType || 'N/A'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Vehicle -->
          <tr>
            <td style="padding: 20px 30px 0 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px 20px; text-align: center;">
                    <p style="margin: 0 0 4px 0; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Vehicle Assignment</p>
                    <p style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 800;">${booking.vehicleName}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${returnTripSection}
          ${flightSection}
          ${specialInstructionsSection}
          ${adminMessageSection}

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center; margin-top: 20px;">
              <p style="margin: 0 0 10px 0; color: #ce9b28; font-size: 16px; font-weight: 700; letter-spacing: 1px;">
                EXECUTIVE FLEET
              </p>
              <p style="margin: 0 0 12px 0; color: #999; font-size: 12px;">
                Melbourne's Premier Luxury Chauffeur Service
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                <a href="tel:+61431951996" style="color: #ffffff; text-decoration: none;">+61 431 951 996</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:info@executivefleet.com.au" style="color: #ffffff; text-decoration: none;">info@executivefleet.com.au</a>
              </p>
              <div style="margin: 16px 0; height: 1px; background-color: #333;"></div>
              <p style="margin: 0; color: #666; font-size: 10px;">
                This email contains confidential booking details. Please do not forward.
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
}
