# Contact Form Setup Instructions

## 1. Install Required Packages

Run the following command in your terminal:

```bash
npm install @prisma/client @supabase/supabase-js
npm install -D prisma
```

## 2. Create .env.local File

Create a file named `.env.local` in the root directory with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://rgahpwtrriskteprvdod.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYWhwd3Rycmlza3RlcHJ2ZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MDQ1ODEsImV4cCI6MjA3OTI4MDU4MX0.FunbQPXHXYOf6QU3mEoq1PBWJduBbkXjRxXjrmgJpuY"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYWhwd3Rycmlza3RlcHJ2ZG9kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzcwNDU4MSwiZXhwIjoyMDc5MjgwNTgxfQ.xHIe9dBZPHhkAzgLKZSXnqeEU_U4Lnqxt-VFivYYtfw"
SUPABASE_JWT_SECRET="/3e+suqbl58DEuAj65mSJ54MjL5shbHuv1zIN7KhuuXprfl6SoaCXMIaJ79B5p9TN1GU2ubhZOeoIpCUVOM4Ng=="

# Postgres Configuration
POSTGRES_PASSWORD="IBxyrXAvEfyooEeZ"
POSTGRES_PRISMA_URL="postgres://postgres.rgahpwtrriskteprvdod:IBxyrXAvEfyooEeZ@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
POSTGRES_URL="postgres://postgres.rgahpwtrriskteprvdod:IBxyrXAvEfyooEeZ@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"
POSTGRES_URL_NON_POOLING="postgres://postgres.rgahpwtrriskteprvdod:IBxyrXAvEfyooEeZ@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require"

# Database URL for Prisma
DATABASE_URL="postgres://postgres.rgahpwtrriskteprvdod:IBxyrXAvEfyooEeZ@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require"

# Resend API Configuration for Email
RESEND_API_KEY="re_bSs1iQgr_N3qGrnHUM4Mg9pcxrsrcECYC"
RESEND_FROM_EMAIL="onboarding@resend.dev"
RESEND_TO_EMAIL="executivefleet.au@gmail.com"
```

## 3. Generate Prisma Client

Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

## 4. Push Database Schema

Run the following command to create the table in your Supabase database:

```bash
npx prisma db push
```

This will create a `contact_submissions` table with the following fields:
- id (String, unique identifier)
- full_name (String)
- email (String)
- subject (String)
- message (Text)
- created_at (DateTime)
- updated_at (DateTime)

## 5. Verify Database

You can verify the table was created by:
1. Go to https://supabase.com
2. Open your project: rgahpwtrriskteprvdod
3. Go to Table Editor
4. You should see the `contact_submissions` table

## 6. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your Supabase dashboard to see the submission

## 7. View Submissions (Optional)

You can view all submissions by making a GET request to:
```
http://localhost:3000/api/contact
```

Or create an admin page to view submissions.

## Files Created/Modified:

✅ `prisma/schema.prisma` - Database schema
✅ `lib/prisma.js` - Prisma client initialization
✅ `lib/supabase.js` - Supabase client initialization
✅ `app/api/contact/route.js` - API endpoint for form submission
✅ `components/contact/ContactForm.jsx` - Updated with form handling

## Features:

✅ Form validation (required fields, email format)
✅ Loading state while submitting
✅ Success/error messages
✅ Form reset after successful submission
✅ Database storage with Prisma + Supabase
✅ Responsive and accessible

## Troubleshooting:

If you get any errors:

1. **Prisma Client Error**: Run `npx prisma generate` again
2. **Database Connection Error**: Check your .env.local credentials
3. **Module Not Found**: Install missing packages with npm install
4. **API Route Error**: Make sure Next.js dev server is running

## Security Notes:

⚠️ **IMPORTANT**: Never commit the `.env.local` file to version control!
⚠️ The `.env.local` is already in `.gitignore` by default in Next.js

Your contact form is now fully functional! 🎉

