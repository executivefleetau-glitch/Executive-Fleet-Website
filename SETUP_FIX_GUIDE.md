# Setup Fix Guide - Executive Fleet Website

## 🔴 Critical Issues to Fix

You have two critical issues that need to be resolved:

### 1. Google Maps Distance Matrix API Error
**Error:** `You're calling a legacy API, which is not enabled for your project`

### 2. Supabase Database Connection Error
**Error:** `Can't reach database server at aws-1-us-east-1.pooler.supabase.com:5432`

---

## ✅ Solution 1: Enable Google Maps Distance Matrix API

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Select your project (the one with your API key)

### Step 2: Enable the Distance Matrix API
1. Go to **APIs & Services** → **Library**
2. Search for "Distance Matrix API"
3. Click on it and click **ENABLE**

### Step 3: Also Enable These APIs (Required)
- ✅ **Maps JavaScript API** (already enabled)
- ✅ **Places API** (already enabled)
- ✅ **Distance Matrix API** (need to enable)
- ✅ **Geocoding API** (recommended)

### Step 4: Verify API Key Restrictions
1. Go to **APIs & Services** → **Credentials**
2. Click on your API key
3. Under **API restrictions**, ensure these APIs are allowed:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API
   - Geocoding API

---

## ✅ Solution 2: Fix Supabase Database Connection

Your Prisma client can't connect to Supabase. Here's how to fix it:

### Step 1: Check Your Supabase Project Status
1. Go to https://supabase.com/dashboard
2. Log in to your account
3. Select your project: **Executive Fleet**
4. **Check if the database is paused**
   - If paused, click "Resume Project"
   - Wait for it to fully resume (takes 1-2 minutes)

### Step 2: Get Fresh Database URLs
1. In Supabase Dashboard, go to **Project Settings** → **Database**
2. Scroll down to **Connection string** section
3. Copy the following URLs:

**Connection Pooling URL (Transaction Mode):**
```
postgres://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres
```

**Direct Connection URL:**
```
postgres://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
```

### Step 3: Update Your .env.local File

Open your `.env.local` file and update these variables:

```env
# Supabase Database URLs
POSTGRES_PRISMA_URL="your-connection-pooling-url-here"
POSTGRES_URL_NON_POOLING="your-direct-connection-url-here"

# Replace [YOUR-PASSWORD] with your actual database password
# Replace [YOUR-PROJECT-REF] with your project reference
```

### Step 4: Reset Password (If Needed)
If you don't remember your database password:
1. Go to **Project Settings** → **Database**
2. Scroll to **Reset Database Password**
3. Enter a new password
4. Click **Reset Password**
5. Update your `.env.local` with the new password

### Step 5: Verify and Restart

```bash
# Stop your dev server (Ctrl+C)

# Generate Prisma Client again
npx prisma generate

# Push schema to database (if needed)
npx prisma db push

# Restart your dev server
npm run dev
```

---

## 🔧 Alternative: Use Supabase Connection Strings Format

If the above doesn't work, try this format:

```env
# Format 1: Direct URL with password
DATABASE_URL="postgresql://postgres.xxxxxxxx:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

# Format 2: With connection pooling
POSTGRES_PRISMA_URL="postgresql://postgres.xxxxxxxx:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://postgres.xxxxxxxx:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
```

**Note:** 
- Pooling uses port **6543** (Supavisor)
- Direct connection uses port **5432**

---

## 🧪 Test Your Configuration

After making these changes, test the booking form:

1. Navigate to: http://localhost:3000/booking-vehicle
2. Fill out the form with test data
3. Submit the booking
4. Check the terminal for any errors

### Expected Success Output:
```
✅ Google Maps API loaded successfully
✅ Booking saved to database
✅ Emails sent successfully
POST /api/bookings 200 in XXXms
```

---

## 📝 Current Status

### ✅ What's Working:
- Booking form UI fixed (labels no longer overlap)
- Error handling improved (booking won't fail if Maps API fails)
- Better error messages for debugging

### ⏳ What You Need to Do:
1. Enable Distance Matrix API in Google Cloud Console
2. Fix Supabase database connection
3. Update .env.local with correct credentials
4. Restart your dev server

---

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check Supabase Dashboard:**
   - Is project active and running?
   - Check database health in Settings → Database

2. **Test Database Connection:**
   ```bash
   npx prisma db pull
   ```
   If this works, your connection is good.

3. **Check Environment Variables:**
   ```bash
   # In your terminal, verify the vars are loaded
   echo $POSTGRES_PRISMA_URL
   ```

4. **Restart Everything:**
   - Stop dev server (Ctrl+C)
   - Close terminal
   - Open new terminal
   - Run `npm run dev`

---

## 📞 Need Help?

If you continue to have issues, please provide:
1. Screenshot of your Supabase project status
2. Screenshot of enabled APIs in Google Cloud
3. Error messages from terminal (hide sensitive data)

---

**Last Updated:** November 25, 2025
**Status:** Awaiting user action to enable APIs and fix database connection









