# 📧 Email Flow Documentation

## Complete Email Timeline

### Step 1: Customer Submits Booking
**Action:** Customer fills out booking form on website
**Email Sent:** 
- ✅ "Booking Received!" → Customer
- ✅ "New Booking Received" → Admin
**Count:** 2 emails total (1 to customer, 1 to admin)

---

### Step 2: Admin Sends Price Quote
**Action:** Admin clicks "Send Price Quote" button in dashboard
**Email Sent:**
- ✅ "Your Quote" → Customer (includes pricing + "Confirm Booking" button)
**Count:** 1 email (to customer only)

---

### Step 3: Customer Confirms Booking
**Action:** Customer clicks "Confirm Booking" button in the price quote email
**Email Sent:**
- ✅ "Booking Confirmed!" → Customer (simple confirmation with booking reference)
**Count:** 1 email (to customer only)

---

## Total Customer Emails

1. **"Booking Received!"** - When they submit booking
2. **"Your Quote"** - When admin sends pricing
3. **"Booking Confirmed!"** - When they confirm booking

**Total: 3 emails throughout the entire process**

---

## Duplicate Prevention Measures

### Frontend (Confirmation Page)
```javascript
const hasConfirmed = useRef(false);

useEffect(() => {
  // Prevent duplicate API calls in React Strict Mode
  if (hasConfirmed.current) return;
  hasConfirmed.current = true;
  confirmBooking();
}, []);
```

### Backend (Confirmation API)
```javascript
// Check if already confirmed (don't send email again)
if (booking.status === 'confirmed') {
  console.log('Booking already confirmed, skipping email');
  return NextResponse.json({
    message: 'Booking already confirmed',
    booking: { /* ... */ },
    alreadyConfirmed: true
  });
}
```

---

## Debugging Email Issues

If customer reports receiving duplicate emails:

1. **Check Console Logs:**
```bash
# Should see only ONE of these:
"Sending confirmation email to [email]"
"Confirmation email sent successfully"

# If you see this, email was NOT sent:
"Booking already confirmed, skipping email"
```

2. **Check Email Service Dashboard:**
   - Login to Resend dashboard
   - Check if duplicate emails were sent
   - Verify only ONE confirmation email per booking

3. **Check Browser:**
   - Customer may have multiple tabs open
   - Customer may have clicked button multiple times
   - Browser back/forward can trigger re-renders

---

## Email Subjects

For easy identification:

1. **Booking Received:** `Booking Received - [REFERENCE] - Executive Fleet`
2. **Price Quote:** `Your Quote - [REFERENCE] - Executive Fleet`
3. **Booking Confirmed:** `Booking Confirmed - [REFERENCE] - Executive Fleet`

All emails use the same booking reference number.

---

## Important Notes

⚠️ **Only ONE confirmation email should be sent per booking**

✅ **Safeguards in place:**
- Frontend: useRef prevents duplicate API calls
- Backend: Status check prevents duplicate emails
- Database: Booking status prevents re-confirmation

✅ **If customer clicks "Confirm Booking" button twice:**
- First click: Email sent, status updated to "confirmed"
- Second click: Returns "already confirmed", NO email sent

---

## Testing the Flow

1. Submit a test booking
2. Check customer receives 1 email ("Booking Received!")
3. Admin sends price quote
4. Check customer receives 1 email ("Your Quote")
5. Click "Confirm Booking" button
6. Check customer receives 1 email ("Booking Confirmed!")
7. Try clicking button again
8. Should see "Booking already confirmed" message
9. NO additional email should be sent

**Expected Total: 3 emails (1 at each step)**

---

## If Still Receiving Duplicate Emails

Check these possibilities:

1. **Email Service Issue:**
   - Resend API may be queuing emails
   - Check Resend dashboard for duplicate sends

2. **Multiple Browser Tabs:**
   - Customer opened email in multiple tabs
   - Each tab triggers confirmation

3. **Network Issues:**
   - Slow connection causes double-submit
   - User clicks button multiple times

4. **Development Mode:**
   - React Strict Mode runs effects twice
   - useRef should prevent this

---

**All safeguards are in place. Only ONE confirmation email should be sent!** ✅


