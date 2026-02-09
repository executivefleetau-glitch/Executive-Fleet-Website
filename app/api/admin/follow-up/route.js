import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { priceQuoteEmailTemplate } from '@/lib/price-quote-email-template';
import { getReconstructedTimestamp, formatDateMelbourne, formatTimeMelbourne } from '@/lib/timezone';

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';

// Use shared timezone helpers
const formatDate = (d) => d ? formatDateMelbourne(d) : null;
const formatTime = formatTimeMelbourne;

export async function POST(request) {
    try {
        const { bookingId, action, note, discountType, discountValue } = await request.json();

        if (!bookingId || !action) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        // Prepare update data
        let updateData = {};

        // 1. Tag Logic
        const dateStr = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit' });
        const tagMap = {
            'reminder': `Reminder (${dateStr})`,
            'discount': `Discount (${dateStr})`,
            'message': `Message (${dateStr})`,
            'call': `Call Logged (${dateStr})`,
            'lost': `Marked Lost (${dateStr})`
        };
        const tagToAdd = tagMap[action] || `FollowUp (${dateStr})`;

        // Append tag to existing array
        const currentTags = booking.followUpTags || [];
        updateData.followUpTags = [...currentTags, tagToAdd];


        // 2. Action Specific Logic
        if (action === 'lost') {
            updateData.status = 'cancelled';
            updateData.cancelledAt = new Date();
        }
        else if (action === 'call') {
            updateData.updatedAt = new Date();
        }
        else if (action === 'discount') {
            // Always compute base price from subtotal (pre-discount amount).
            // If subtotal is null (quote never sent yet), reconstruct it from
            // the individual fare components -- same logic as send-price-quote.
            let basePrice = parseFloat(booking.subtotal) || 0;

            if (basePrice === 0) {
                // Reconstruct subtotal from component fares
                const outbound = parseFloat(booking.outboundFare) || 0;
                const returnF = parseFloat(booking.returnFare) || 0;
                const childSeatTotal =
                    (booking.babyCapsule > 0 && booking.babyCapsulePrice ? booking.babyCapsule * parseFloat(booking.babyCapsulePrice) : 0) +
                    (booking.babySeat > 0 && booking.babySeatPrice ? booking.babySeat * parseFloat(booking.babySeatPrice) : 0) +
                    (booking.boosterSeat > 0 && booking.boosterSeatPrice ? booking.boosterSeat * parseFloat(booking.boosterSeatPrice) : 0);
                const extraChargesTotal = Array.isArray(booking.extraCharges)
                    ? booking.extraCharges.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0)
                    : 0;
                basePrice = outbound + returnF + childSeatTotal + extraChargesTotal;
            }

            // If we still have no base price, fall back to finalPrice as last resort
            if (basePrice === 0) {
                basePrice = parseFloat(booking.finalPrice) || 0;
            }

            let discountAmount = 0;
            const dType = (discountType || 'percentage').toString().toLowerCase();
            if (dType === 'percentage') {
                discountAmount = basePrice * (parseFloat(discountValue || 0) / 100);
            } else {
                discountAmount = parseFloat(discountValue || 0);
            }

            const newFinalPrice = Math.max(0, basePrice - discountAmount);

            updateData.subtotal = basePrice; // Persist reconstructed subtotal if it was missing
            updateData.discount = discountAmount;
            updateData.finalPrice = newFinalPrice;

            console.log(`Applying discount: Subtotal ${basePrice}, Discount ${discountAmount} (${dType} ${discountValue}), New Final ${newFinalPrice}`);
        }

        // 3. Perform Database Update
        // 3. Perform Database Update
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: updateData
        });

        // Update quotedPrice so the dashboard displays the latest price
        if (action === 'discount' && updateData.finalPrice !== undefined) {
            try {
                await prisma.booking.update({
                    where: { id: bookingId },
                    data: {
                        quotedPrice: updateData.finalPrice,
                        quoteSentAt: new Date(),
                    }
                });
            } catch (e) {
                console.error("Failed to update quotedPrice:", e);
            }
        }


        // 4. Send Emails (if applicable)
        if (['reminder', 'discount', 'message'].includes(action)) {
            let subject = '';
            let htmlContent = '';

            if (action === 'reminder') {
                subject = `REMINDER: Your Quote - ${booking.bookingReference} - Executive Fleet`;

                // Construct email data with potentially updated prices if we were sending a discount (but reminder uses current booking state)
                // If we just updated the price (discount), we should probably use 'updatedBooking' values?
                // But reminder usually implies sending the *existing* quote. 
                // However, for 'discount', we definitely want to show the new price if we were using the template.
                // The current discount logic sends a generic HTML message logic below, not the full template.

                const bookingToSend = action === 'discount' ? updatedBooking : booking;

                const childSeatBreakdown = [];
                if (bookingToSend.babyCapsule > 0 && bookingToSend.babyCapsulePrice) childSeatBreakdown.push({ name: 'Baby Capsule', quantity: bookingToSend.babyCapsule, priceEach: parseFloat(bookingToSend.babyCapsulePrice), total: bookingToSend.babyCapsule * parseFloat(bookingToSend.babyCapsulePrice) });
                if (bookingToSend.babySeat > 0 && bookingToSend.babySeatPrice) childSeatBreakdown.push({ name: 'Baby Seat', quantity: bookingToSend.babySeat, priceEach: parseFloat(bookingToSend.babySeatPrice), total: bookingToSend.babySeat * parseFloat(bookingToSend.babySeatPrice) });
                if (bookingToSend.boosterSeat > 0 && bookingToSend.boosterSeatPrice) childSeatBreakdown.push({ name: 'Booster Seat', quantity: bookingToSend.boosterSeat, priceEach: parseFloat(bookingToSend.boosterSeatPrice), total: bookingToSend.boosterSeat * parseFloat(bookingToSend.boosterSeatPrice) });

                const emailData = {
                    bookingReference: bookingToSend.bookingReference,
                    customerName: bookingToSend.customerName,
                    pickupLocation: bookingToSend.pickupLocation,
                    dropoffLocation: bookingToSend.dropoffLocation,
                    pickupDate: formatDate(bookingToSend.pickupDate),
                    pickupTime: formatTime(getReconstructedTimestamp(bookingToSend.pickupDate, bookingToSend.pickupTime)),
                    vehicleName: bookingToSend.vehicleName,
                    numberOfPassengers: bookingToSend.numberOfPassengers,
                    isReturnTrip: bookingToSend.isReturnTrip,
                    returnPickupLocation: bookingToSend.returnPickupLocation || bookingToSend.dropoffLocation,
                    returnDropoffLocation: bookingToSend.returnDropoffLocation || bookingToSend.pickupLocation,
                    returnDate: formatDate(bookingToSend.returnDate),
                    returnTime: bookingToSend.returnTime ? formatTime(getReconstructedTimestamp(bookingToSend.returnDate, bookingToSend.returnTime)) : null,
                    outboundFare: parseFloat(bookingToSend.outboundFare || 0),
                    returnFare: parseFloat(bookingToSend.returnFare || 0),
                    childSeatBreakdown,
                    extraCharges: bookingToSend.extraCharges || [],
                    subtotal: parseFloat(bookingToSend.subtotal || 0),
                    discount: parseFloat(bookingToSend.discount || 0),
                    total: parseFloat(bookingToSend.finalPrice || 0),
                    confirmationToken: bookingToSend.confirmationToken
                };

                htmlContent = priceQuoteEmailTemplate(emailData);
            } else {
                // message or discount
                const isDiscount = action === 'discount';
                subject = isDiscount
                    ? `Special Offer: Updated Price for Booking ${booking.bookingReference}`
                    : `Message regarding your Booking ${booking.bookingReference}`;

                if (isDiscount) {
                    // Show original subtotal as "was" price, new final as "now" price
                    const oldPrice = parseFloat(updatedBooking.subtotal || booking.subtotal || booking.quotedPrice || booking.finalPrice || 0).toFixed(2);
                    const newPrice = parseFloat(updatedBooking.finalPrice || 0).toFixed(2);
                    const savings = (parseFloat(oldPrice) - parseFloat(newPrice)).toFixed(2);
                    const noteContent = note ? note.replace(/\n/g, '<br>') : 'We value your interest in Executive Fleet. To help proceed with your booking, we are pleased to offer you a special discounted rate.';

                    // Sleek Promotional Template (Gold/Blue Theme)
                    htmlContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Special Offer</title>
                    </head>
                    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      <div style="background-color:#f4f4f4; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                          
                          <!-- Header -->
                          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px;">EXECUTIVE FLEET</h1>
                          </div>

                          <!-- Body -->
                          <div style="padding: 32px 24px;">
                            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 24px;">Special Price Update</h2>
                            
                            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hello ${booking.customerName.split(' ')[0]},</p>
                            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                              ${noteContent}
                            </p>

                            <!-- Price Box (Yellow/Gold) -->
                            <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 20px;">
                               <div style="color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Exclusive Offer</div>
                               <div style="border-top: 1px solid #fde68a; padding-top: 16px;">
                                  <div style="margin-bottom: 8px;">
                                    <span style="font-size: 14px; color: #92400e; text-decoration: line-through;">Was: $${oldPrice}</span>
                                  </div>
                                  <div style="margin-bottom: 8px;">
                                    <span style="font-size: 32px; font-weight: 800; color: #78350f;">$${newPrice}</span>
                                  </div>
                                  <div style="background-color: #dcfce7; color: #166534; font-size: 14px; font-weight: 700; padding: 6px 16px; border-radius: 20px; display: inline-block;">
                                    You Save: $${savings}
                                  </div>
                               </div>
                            </div>

                            <!-- Urgency Box (Blue) -->
                            <div style="background-color: #dbeafe; border-radius: 6px; padding: 12px; text-align: center; margin-bottom: 32px; color: #1e40af; font-weight: 600; font-size: 14px;">
                              ⏰ This offer is valid for the next 48 hours only!
                            </div>

                            <!-- CTA Button (Gold) -->
                            <div style="text-align: center; margin-bottom: 40px;">
                              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://executivefleet.com.au'}/booking/confirm/${booking.confirmationToken}" 
                                 style="background-color: #cca474; color: #1a1a1a; padding: 16px 32px; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                ✓ Confirm at Discounted Price
                              </a>
                            </div>

                            <!-- Journey Details -->
                            <div style="border-left: 4px solid #cca474; background-color: #f8fafc; padding: 20px; border-radius: 0 4px 4px 0;">
                              <h3 style="margin-top: 0; color: #0f172a; font-size: 15px; font-weight: 700; margin-bottom: 12px;">Your Journey (Outbound Leg):</h3>
                              <p style="margin: 6px 0; color: #475569; font-size: 14px;">
                                <strong style="color: #334155;">Date:</strong> ${formatDate(booking.pickupDate)} at ${formatTime(getReconstructedTimestamp(booking.pickupDate, booking.pickupTime))}
                              </p>
                              <p style="margin: 6px 0; color: #475569; font-size: 14px;">
                                <strong style="color: #334155;">Pickup:</strong> ${booking.pickupLocation}
                              </p>
                              <p style="margin: 6px 0; color: #475569; font-size: 14px;">
                                <strong style="color: #334155;">Dropoff:</strong> ${booking.dropoffLocation}
                              </p>
                            </div>

                          </div>

                          <!-- Footer -->
                          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0;">© ${new Date().getFullYear()} Executive Fleet Australia. All rights reserved.</p>
                            <p style="margin: 8px 0 0 0;">
                               <a href="${process.env.NEXT_PUBLIC_APP_URL || '#'}/unsubscribe" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a> from promotions.
                            </p>
                          </div>

                        </div>
                      </div>
                    </body>
                    </html>
                    `;
                } else {
                    // Standard Message Template
                    htmlContent = `
                        <div style="font-family: sans-serif; padding: 20px; color: #333;">
                          <h2>Hello ${booking.customerName.split(' ')[0]},</h2>
                          <p>${note ? note.replace(/\n/g, '<br>') : 'We wanted to follow up on your recent booking inquiry.'}</p>
                          <p>Best regards,<br>Executive Fleet Team</p>
                        </div>
                    `;
                }
            }

            if (process.env.RESEND_API_KEY && booking.customerEmail) {
                try {
                    console.log(`📧 Sending follow-up email (${action})...`);
                    console.log('   From:', process.env.RESEND_FROM_EMAIL);
                    console.log('   To:', booking.customerEmail);
                    console.log('   Action:', action);
                    
                    const emailResult = await resend.emails.send({
                        from: process.env.RESEND_FROM_EMAIL,
                        to: booking.customerEmail,
                        subject: subject,
                        html: htmlContent,
                    });
                    
                    console.log('✅ Follow-up email sent successfully:', emailResult);
                } catch (emailError) {
                    console.error('❌ Failed to send follow-up email:', {
                        error: emailError.message,
                        statusCode: emailError.statusCode,
                        name: emailError.name,
                        from: process.env.RESEND_FROM_EMAIL,
                        to: booking.customerEmail
                    });
                    // Don't fail the entire request if email fails
                }
            }
        }

        return NextResponse.json({ message: 'Follow-up action completed successfully.', booking: updatedBooking });

    } catch (error) {
        console.error('Follow-up error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
