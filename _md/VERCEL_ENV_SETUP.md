# Vercel Environment Variables Setup

## ⚠️ **IMPORTANT: Required for Deployment**

Your build is failing because Supabase environment variables are not configured in Vercel.

---

## 🔑 **Environment Variables You Need:**

You need to add these environment variables to your Vercel project:

### **1. Supabase Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### **2. Database Variables:**
- `DATABASE_URL` (Direct connection - for Prisma CLI)
- `DIRECT_URL` (Optional - same as DATABASE_URL)

### **3. Email Variables (Resend):**
- `RESEND_API_KEY`
- `ADMIN_EMAIL`

### **4. Google Maps:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### **5. NextAuth (if using authentication):**
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

---

## 📝 **How to Add Environment Variables to Vercel:**

### **Step 1: Go to Vercel Project Settings**

1. Go to [vercel.com](https://vercel.com)
2. Select your project: **Executive Fleet**
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### **Step 2: Add Each Variable**

For each variable:

1. **Key**: Enter the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
2. **Value**: Paste the actual value from your `.env.local` file
3. **Environments**: Select all three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. Click **Save**

### **Step 3: Redeploy**

After adding all variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## 🔍 **Where to Find Your Values:**

### **Local `.env.local` File:**

Your environment variables are in your local `.env.local` file. Open it and copy the values.

Example:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rgahpwtrriskteprvdod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database
DATABASE_URL=postgresql://postgres.[project]:[password]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=admin@executivefleet.com.au

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDxxxxxxxxxxxxx

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.com
```

### **Supabase Dashboard:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### **Supabase Database URL:**

1. In Supabase dashboard
2. Go to **Settings** → **Database**
3. Scroll to **Connection string**
4. Select **URI** tab
5. Copy the connection string (use **Transaction** mode for `DATABASE_URL`)

### **Resend API Key:**

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Create or copy your API key
3. Use for `RESEND_API_KEY`

### **Google Maps API Key:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Copy your API key

---

## ✅ **Checklist:**

Use this checklist to make sure you've added everything:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added to Vercel
- [ ] `DATABASE_URL` added to Vercel
- [ ] `RESEND_API_KEY` added to Vercel
- [ ] `ADMIN_EMAIL` added to Vercel
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` added to Vercel
- [ ] `NEXTAUTH_SECRET` added to Vercel
- [ ] `NEXTAUTH_URL` added to Vercel (use your Vercel domain)
- [ ] Redeployed after adding variables
- [ ] Build succeeded ✅

---

## 🚀 **Quick Add - Copy Your `.env.local`:**

The fastest way:

1. Open your local `.env.local` file
2. Copy ALL variables
3. In Vercel:
   - Click **Add Another**
   - Paste all variables at once
   - Vercel will parse them automatically
4. Select environments (Production, Preview, Development)
5. Save
6. Redeploy

---

## 🔧 **After Deployment:**

### **Update NEXTAUTH_URL:**

After your first successful deployment:

1. Copy your Vercel deployment URL (e.g., `https://executive-fleet.vercel.app`)
2. Update `NEXTAUTH_URL` in Vercel environment variables
3. Set it to your production URL
4. Redeploy

### **For Custom Domain:**

If you have a custom domain (e.g., `executivefleet.com.au`):

1. Add custom domain in Vercel (Settings → Domains)
2. Update `NEXTAUTH_URL` to `https://executivefleet.com.au`
3. Redeploy

---

## ❓ **Troubleshooting:**

### **Build still failing after adding variables?**

1. Make sure you selected **all three environments** (Production, Preview, Development)
2. Check for typos in variable names
3. Make sure there are no extra spaces in values
4. Try redeploying (don't just rebuild)

### **App works but some features don't?**

Check which environment variables are missing:
- No blogs? → Check Supabase variables
- No emails? → Check `RESEND_API_KEY`
- No map? → Check `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Login issues? → Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL`

### **"Missing Supabase environment variables" in console?**

This means the variables weren't loaded. Double-check:
1. Variable names are EXACT (case-sensitive)
2. You redeployed after adding them
3. You selected the right environment (Production/Preview/Development)

---

## 📌 **Important Notes:**

1. **Never commit `.env.local` to Git** - It contains sensitive keys
2. **All variables starting with `NEXT_PUBLIC_` are exposed to the browser** - Don't put secrets there
3. **Service role keys are powerful** - Keep them secret
4. **Redeploy after adding variables** - Changes don't take effect until you redeploy
5. **Test in Preview environment first** - Before promoting to production

---

## 🎯 **Next Steps:**

1. ✅ Add all environment variables to Vercel (follow steps above)
2. ✅ Redeploy your project
3. ✅ Check build logs for success
4. ✅ Test your deployed app
5. ✅ Set up GitHub Actions (see `GITHUB_ACTIONS_SETUP.md`)

---

**Once environment variables are added and deployment succeeds, your app will be fully functional!** 🚀

