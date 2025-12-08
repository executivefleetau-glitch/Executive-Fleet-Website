# 🔐 Admin Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the admin dashboard.

## 📋 Overview

- **Tech Stack**: Next.js App Router + NextAuth.js + Prisma + PostgreSQL
- **Authentication**: Google OAuth (first-time admin signup + protected login)
- **Database**: User table with admin flags

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install next-auth
```

### 2. Set up Environment Variables
Add these to your `.env.local` file:
```env
# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key-here-replace-with-random-string"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id-from-google-cloud-console"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-google-cloud-console"
```

### 3. Set up Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen if needed
6. Set application type to "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
8. Copy the Client ID and Client Secret to your `.env.local`

### 4. Generate NextAuth Secret
```bash
# Generate a random secret
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

### 5. Run Database Migration
```bash
npx prisma migrate dev --name add-user-auth
```

### 6. Generate Prisma Client
```bash
npx prisma generate
```

### 7. Start Development Server
```bash
npm run dev
```

## 🔄 How It Works

### First-Time Setup Flow
1. Visit `/admin/dashboard` (will redirect to `/admin/login`)
2. Page shows "Admin Setup" (no admin exists yet)
3. Click "Continue with Google"
4. First user becomes admin automatically
5. Redirected to admin dashboard

### Normal Login Flow (after first admin exists)
1. Visit `/admin/dashboard` (will redirect to `/admin/login`)
2. Page shows "Admin Login" (admin already exists)
3. Click "Login with Google"
4. If user is admin → access granted
5. If user is not admin → "Access Denied" page

## 🗃️ Database Schema

The authentication adds a `User` table:

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  image       String?  @map("avatar_url")
  isAdmin     Boolean  @default(false) @map("is_admin")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@index([isAdmin])
  @@map("users")
}
```

## 🛡️ Route Protection

Protected routes:
- `/admin/*` - Requires authentication + admin privileges
- `/api/admin/*` - API routes protected by middleware

Middleware automatically redirects:
- Unauthenticated users → `/admin/login`
- Non-admin users → `/admin/no-access`

## 🧪 Testing

### Test First-Time Admin Setup
1. Clear database: `npx prisma migrate reset`
2. Visit `/admin/dashboard`
3. Should show "Admin Setup" page
4. Sign in with Google → becomes first admin

### Test Normal Login
1. First admin already exists in database
2. Visit `/admin/dashboard`
3. Should show "Admin Login" page
4. Sign in with existing admin Google account → access granted
5. Sign in with different Google account → access denied

### Test Access Control
1. Visit `/admin/dashboard` without authentication
2. Should redirect to `/admin/login`
3. Sign in with non-admin account
4. Should show "Access Denied" page with option to sign out

## 🎨 UI Features

### Login Page
- Responsive design matching your theme
- Auto-detects if admin setup or login
- Professional Google OAuth button
- Error handling with user-friendly messages
- Loading states during authentication

### Admin Dashboard
- Shows actual user info from Google (name, email, avatar)
- Secure logout functionality
- Loading screen while checking authentication

### Access Denied Page  
- Clean error page for non-admin users
- Option to sign out and try different account
- Link back to main website

## 🔧 Troubleshooting

### Common Issues

**"Configuration Error"**
- Check `NEXTAUTH_SECRET` is set
- Verify Google OAuth credentials

**"Access Denied" for admin user**
- Check if user exists in database with `isAdmin: true`
- Verify email matches Google account

**Redirect URI Mismatch**
- Add correct callback URL to Google Console
- Format: `http://localhost:3000/api/auth/callback/google`

**Database Connection Issues**
- Ensure `DATABASE_URL` is correct
- Run `npx prisma migrate deploy`

### Debug Mode
Set `NODE_ENV=development` to see debug logs in console.

## 📁 Files Created/Modified

### New Files:
- `app/api/auth/[...nextauth]/route.js` - NextAuth configuration
- `app/api/admin/check-setup/route.js` - Check if admin exists
- `app/admin/login/page.jsx` - Admin login page
- `app/admin/no-access/page.jsx` - Access denied page
- `components/providers/AuthProvider.jsx` - Session provider
- `middleware.js` - Route protection
- `AUTHENTICATION_SETUP.md` - This guide

### Modified Files:
- `prisma/schema.prisma` - Added User model
- `package.json` - Added next-auth dependency
- `app/layout.jsx` - Added AuthProvider
- `components/admin/DashboardLayout.jsx` - Added auth integration
- `ENV_VARIABLES.txt` - Added auth environment variables

## 🔐 Security Notes

- Only verified Google emails can sign up
- First user becomes admin automatically
- After first admin, new signups are blocked
- All admin routes protected by middleware
- Secure logout clears all session data
- NEXTAUTH_SECRET should be kept private

## 🎯 Next Steps

1. Set up Google OAuth in Google Cloud Console
2. Update environment variables
3. Run database migration
4. Test the authentication flow
5. Deploy with production OAuth settings

Your admin authentication system is now ready! 🎉
