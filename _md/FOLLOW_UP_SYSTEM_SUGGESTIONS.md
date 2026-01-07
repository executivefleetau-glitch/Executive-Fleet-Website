# 📋 Follow-up System Implementation Guide

This document contains comprehensive suggestions for implementing a professional follow-up system for Executive Fleet booking management.

---

## 1. Follow-up Types & Workflow 🔄

### A. Automated Follow-ups (Time-Based)

| Follow-up Type | Trigger | When | Purpose |
|----------------|---------|------|---------|
| **Initial Acknowledgment** | Booking created | Immediately | Confirm booking received |
| **Quote Reminder** | No price sent | 2 hours after booking | Remind admin to send quote |
| **Quote Follow-up** | Price quote sent | 24 hours after quote | Check if customer received quote |
| **Confirmation Reminder** | Quote sent, no confirmation | 48 hours after quote | Encourage customer to confirm |
| **Pre-trip Reminder** | Booking confirmed | 24 hours before pickup | Remind customer of upcoming trip |
| **Day-of Reminder** | Booking confirmed | 2 hours before pickup | Final reminder with driver details |
| **Post-trip Follow-up** | Booking completed | 2 hours after dropoff | Request feedback/review |
| **Second Follow-up** | No response | 3 days after first follow-up | Gentle reminder |
| **Final Follow-up** | Still no response | 7 days after booking | Last attempt before marking as "Lost" |

### B. Manual Follow-ups (Admin-Triggered)

| Follow-up Type | When to Use | Purpose |
|----------------|-------------|---------|
| **Custom Message** | Anytime | Respond to specific customer queries |
| **Price Adjustment** | After negotiation | Send revised quote |
| **Cancellation** | Customer cancels | Confirm cancellation & refund |
| **Rescheduling** | Change of plans | Confirm new date/time |
| **Special Offer** | Lost booking | Win-back discount offer |

---

## 2. Booking Status Lifecycle 📊

```
NEW → QUOTED → CONFIRMED → SCHEDULED → IN_PROGRESS → COMPLETED → REVIEWED
  ↓      ↓         ↓           ↓            ↓            ↓
LOST  EXPIRED  CANCELLED   CANCELLED    CANCELLED    ARCHIVED
```

### Recommended Statuses:
- `pending` → Waiting for price quote
- `quoted` → Price sent, awaiting customer confirmation
- `confirmed` → Customer confirmed booking
- `scheduled` → Booking confirmed + driver assigned
- `in_progress` → Trip started
- `completed` → Trip finished
- `reviewed` → Customer feedback received
- `cancelled` → Cancelled by customer/admin
- `expired` → Quote expired (e.g., 7 days)
- `lost` → No response after multiple follow-ups
- `archived` → Old completed bookings

---

## 3. Database Schema for Follow-ups 🗄️

Add a new `FollowUp` model to your `prisma/schema.prisma`:

```prisma
model FollowUp {
  id            String    @id @default(cuid())
  bookingId     String    @map("booking_id")
  booking       Booking   @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  
  // Follow-up Details
  type          String    // "auto_quote_reminder", "manual_custom", "post_trip", etc.
  subject       String
  message       String    @db.Text
  
  // Scheduling
  scheduledFor  DateTime  @map("scheduled_for")
  sentAt        DateTime? @map("sent_at")
  
  // Tracking
  status        String    @default("pending") // "pending", "sent", "failed", "cancelled"
  method        String    @default("email") // "email", "sms", "call"
  sentBy        String?   @map("sent_by") // Admin user ID (for manual follow-ups)
  
  // Response Tracking
  opened        Boolean   @default(false)
  openedAt      DateTime? @map("opened_at")
  clicked       Boolean   @default(false)
  clickedAt     DateTime? @map("clicked_at")
  replied       Boolean   @default(false)
  repliedAt     DateTime? @map("replied_at")
  
  // Metadata
  notes         String?   @db.Text
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@index([bookingId])
  @@index([scheduledFor])
  @@index([status])
  @@map("follow_ups")
}

// Also add these fields to the Booking model
model Booking {
  // ... existing fields ...
  
  followUps     FollowUp[]
  
  // New fields for follow-up tracking
  lastFollowUpAt      DateTime? @map("last_follow_up_at")
  nextFollowUpAt      DateTime? @map("next_follow_up_at")
  followUpCount       Int       @default(0) @map("follow_up_count")
  lastResponseAt      DateTime? @map("last_response_at")
}
```

---

## 4. UI/UX Recommendations 🎨

### A. Admin Booking Table - Add Follow-up Column

```
| Booking Ref | Customer | ... | Follow-up Status | Next Follow-up | Actions |
|-------------|----------|-----|------------------|----------------|---------|
| BKG-001     | John Doe | ... | 🟢 Responded     | -              | [Send] [Schedule] |
| BKG-002     | Jane S.  | ... | 🟡 Pending (2d)  | In 1 hour      | [Send Now] [Edit] |
| BKG-003     | Mike T.  | ... | 🔴 Overdue (5d)  | 2 days ago     | [Send] [Mark Lost] |
```

### B. Follow-up Timeline in Booking Details Modal

```
📅 Follow-up Timeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Initial Acknowledgment    Dec 16, 10:00 AM  (Sent ✓)
✅ Price Quote Sent           Dec 16, 11:30 AM  (Opened ✓)
🟡 Quote Follow-up            Dec 17, 11:30 AM  (Pending)
⏰ Confirmation Reminder      Dec 18, 11:30 AM  (Scheduled)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[+ Add Manual Follow-up]  [Edit Schedule]
```

### C. Quick Actions in Booking Row

Add a dropdown menu with:
- 📧 Send Quote Reminder
- ✅ Mark as Contacted
- 🔄 Schedule Follow-up
- 📝 Add Custom Note
- ❌ Mark as Lost

---

## 5. Automation Rules Engine ⚙️

Create an automation system with rules like:

```javascript
// Example automation rules
const followUpRules = [
  {
    name: "Quote Reminder",
    trigger: "booking_created",
    condition: "status == 'pending' AND outboundFare == null",
    delay: "2 hours",
    action: "send_email",
    template: "admin_quote_reminder"
  },
  {
    name: "Customer Quote Follow-up",
    trigger: "price_quote_sent",
    condition: "status == 'quoted'",
    delay: "24 hours",
    action: "send_email",
    template: "customer_quote_followup"
  },
  {
    name: "Lost Opportunity",
    trigger: "last_follow_up",
    condition: "followUpCount >= 3 AND daysSinceLastFollowUp > 7",
    delay: "0",
    action: "mark_as_lost"
  }
];
```

---

## 6. Recommended Tools & Services 🛠️

### Email Service (Already using Resend ✅)
- Continue with **Resend** for transactional emails
- Add tracking pixels for open/click tracking

### SMS Service (Optional)
- **Twilio** - Most popular, reliable
- **Vonage** (Nexmo) - Good for Australia
- **ClickSend** - Australian company

### Scheduling/Queue System
- **Vercel Cron Jobs** - For scheduled tasks (if using Vercel)
- **node-cron** - Simple Node.js scheduler
- **Bull Queue** - Robust job queue (requires Redis)
- **Quirrel** - Serverless job queueing

### Analytics & Tracking
- Track email opens, clicks, responses
- Conversion funnel: Quote Sent → Opened → Clicked → Confirmed

---

## 7. API Endpoints to Create 🔌

```javascript
// Follow-up Management
POST   /api/admin/bookings/:id/follow-ups        // Create manual follow-up
GET    /api/admin/bookings/:id/follow-ups        // Get follow-up history
PUT    /api/admin/follow-ups/:id                 // Update follow-up
DELETE /api/admin/follow-ups/:id                 // Cancel scheduled follow-up

// Quick Actions
POST   /api/admin/bookings/:id/mark-contacted    // Mark as contacted
POST   /api/admin/bookings/:id/mark-lost         // Mark as lost
POST   /api/admin/bookings/:id/snooze            // Snooze follow-up

// Automation
POST   /api/cron/process-follow-ups              // Process scheduled follow-ups (cron job)
GET    /api/admin/follow-up-analytics            // Get follow-up performance stats
```

---

## 8. Email Templates to Create 📧

| Template | When | Subject |
|----------|------|---------|
| `customer_quote_followup` | 24h after quote | "Did you receive our quote for your booking?" |
| `customer_confirmation_reminder` | 48h after quote | "Just checking in about your booking" |
| `customer_pre_trip_reminder` | 24h before trip | "Your trip is tomorrow - Here's what you need to know" |
| `customer_day_of_reminder` | 2h before trip | "Your driver is on the way!" |
| `customer_post_trip_feedback` | 2h after trip | "How was your experience? We'd love your feedback!" |
| `customer_winback_offer` | 7 days no response | "Special 10% discount on your booking" |
| `admin_quote_reminder` | 2h after booking | "New booking waiting for price quote" |

---

## 9. Priority Implementation Order 🎯

### Phase 1: Core (Week 1)
1. ✅ Add `contactStatus` filtering (Already done!)
2. Add follow-up database model
3. Manual follow-up button (send custom email)
4. Follow-up history display

### Phase 2: Automation (Week 2)
5. Automatic quote reminder (admin)
6. Automatic customer follow-up (24h after quote)
7. Cron job for scheduled follow-ups
8. Email tracking (opens/clicks)

### Phase 3: Advanced (Week 3)
9. Pre-trip & post-trip reminders
10. SMS integration (optional)
11. Follow-up analytics dashboard
12. Lost opportunity tracking

---

## 10. Key Metrics to Track 📈

| Metric | What it tells you |
|--------|-------------------|
| **Response Rate** | % of customers who respond after quote |
| **Time to Response** | Average time from quote to customer response |
| **Conversion Rate** | % of quotes that become confirmed bookings |
| **Lost Rate** | % of bookings that go cold |
| **Follow-up Effectiveness** | Which follow-up types get best response |
| **Best Time to Send** | When do emails get opened most |

---

## 11. Sample Email Templates

### Customer Quote Follow-up (24h after quote)

```html
Subject: Did you receive our quote for your booking?

Hi {{customerName}},

We sent you a price quote yesterday for your booking ({{bookingReference}}) from {{pickupLocation}} to {{dropoffLocation}} on {{pickupDate}}.

Just checking in to see if you received it and if you have any questions!

Journey Details:
📅 Date: {{pickupDate}}
🕐 Time: {{pickupTime}}
📍 From: {{pickupLocation}}
🎯 To: {{dropoffLocation}}
🚗 Vehicle: {{vehicleName}}

💰 Total Price: ${{totalPrice}} AUD
{{#if isReturnTrip}}
✨ Includes 4% return trip discount!
{{/if}}

If you're ready to confirm, just reply to this email or click here: [Confirm Booking]

Have questions? We're here to help!

Best regards,
Executive Fleet Team
```

### Pre-trip Reminder (24h before)

```html
Subject: Your trip is tomorrow - Here's what you need to know

Hi {{customerName}},

Your Executive Fleet booking is tomorrow! Here are the details:

📅 Date: {{pickupDate}}
🕐 Pickup Time: {{pickupTime}}
📍 Pickup Location: {{pickupLocation}}
🎯 Destination: {{dropoffLocation}}
🚗 Vehicle: {{vehicleName}}

Your driver will contact you 15 minutes before pickup.

Need to make changes? Contact us at: [phone number]

Safe travels!
Executive Fleet Team
```

---

## 12. Implementation Checklist

- [ ] Create database migration for FollowUp model
- [ ] Create follow-up API routes
- [ ] Build follow-up UI components
- [ ] Create email templates
- [ ] Set up cron job for automated follow-ups
- [ ] Add follow-up tracking to booking details
- [ ] Implement email open/click tracking
- [ ] Add follow-up analytics dashboard
- [ ] Test all automation rules
- [ ] Document admin workflow

---

**Created**: December 16, 2025  
**Status**: Ready for implementation  
**Priority**: Phase 1 recommended to start

---

For questions or to start implementation, refer to this document and implement phase by phase.





