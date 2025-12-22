# GitHub Actions - Scheduled Blog Publishing Setup

## ✅ What I've Set Up

Your blog scheduled publishing now uses **GitHub Actions** (100% FREE) instead of Vercel Cron Jobs.

### Files Created/Modified:
1. ✅ **`.github/workflows/publish-scheduled-blogs.yml`** - GitHub Actions workflow (runs every 15 minutes)
2. ✅ **`app/api/cron/publish-scheduled-blogs/route.js`** - Updated comments
3. ✅ **Deleted `vercel.json`** - No longer needed

---

## 🚀 Setup Instructions

### Step 1: Push to GitHub

Make sure your code is pushed to your GitHub repository:

```bash
git add .
git commit -m "Add GitHub Actions for scheduled blog publishing"
git push origin main
```

### Step 2: Add GitHub Secret

You need to add your website URL as a GitHub secret:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add this secret:
   - **Name:** `NEXT_PUBLIC_BASE_URL`
   - **Value:** `https://your-actual-domain.com` (replace with your real domain)
   - Click **Add secret**

**Example:**
- If deployed on Vercel: `https://executive-fleet.vercel.app`
- If custom domain: `https://www.executivefleet.com.au`

**Important:** 
- ✅ Use `https://` (not `http://`)
- ✅ Include `www.` if your domain uses it
- ✅ NO trailing slash at the end
- ✅ NO quotes around the URL

### Step 3: Enable GitHub Actions (If Needed)

1. Go to your repository
2. Click the **Actions** tab
3. If prompted, click **I understand my workflows, go ahead and enable them**

### Step 4: Verify It's Working

1. Go to **Actions** tab in your GitHub repository
2. You should see "Publish Scheduled Blogs" workflow
3. Click on it to see the schedule and runs

---

## 🎯 How It Works

### Automatic Execution:
- ⏰ Runs **every 15 minutes** automatically
- 🔍 Checks for blogs with `status: 'scheduled'` and `scheduledPublishAt <= now`
- 📝 Publishes them by setting `status: 'published'` and `published: true`
- 📧 No emails or notifications (silent publishing)

### Schedule:
```
Every 15 minutes: 00:00, 00:15, 00:30, 00:45, 01:00, 01:15, etc.
```

**Note:** Your scheduled blog will be published within 15 minutes of the scheduled time.

---

## 🧪 Testing

### Option 1: Manual Trigger (Recommended for Testing)

1. Go to **Actions** tab in GitHub
2. Click **Publish Scheduled Blogs** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait a few seconds, then check the run results

### Option 2: Create a Test Scheduled Blog

1. Go to your admin panel: `/admin/blogs/new`
2. Create a blog post
3. Set **Status:** "Scheduled for Publishing"
4. Set **Scheduled Date:** Today's date, 5 minutes from now
5. Click **Create Blog**
6. Wait 15-20 minutes
7. Check if the blog is published

### Option 3: Test API Directly

Open this URL in your browser:
```
https://your-domain.com/api/cron/publish-scheduled-blogs
```

You should see:
```json
{
  "success": true,
  "message": "No blogs to publish",
  "publishedCount": 0
}
```

---

## 📊 Monitoring

### Check Run History:

1. Go to **Actions** tab
2. Click **Publish Scheduled Blogs**
3. See all past runs with timestamps and results

### Check Logs:

Click on any run → Click the job → Expand the steps to see detailed logs

### Success Indicators:
- ✅ Green checkmark = Success
- ❌ Red X = Failed (check logs)
- 🟡 Yellow dot = Running

---

## 🔧 Configuration

### Change Schedule Frequency:

Edit `.github/workflows/publish-scheduled-blogs.yml`:

```yaml
on:
  schedule:
    # Every 5 minutes:
    - cron: '*/5 * * * *'
    
    # Every 30 minutes:
    - cron: '*/30 * * * *'
    
    # Every hour:
    - cron: '0 * * * *'
    
    # Every day at midnight:
    - cron: '0 0 * * *'
```

**Cron Syntax:** `minute hour day month weekday`

---

## 🔒 Optional Security

If you want extra security, you can add a secret token:

### 1. Generate a Random Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Add to GitHub Secrets:
- **Name:** `CRON_SECRET`
- **Value:** (paste the generated secret)

### 3. Add to Vercel Environment Variables:
- Go to Vercel → Your Project → Settings → Environment Variables
- Add: `CRON_SECRET` = (same secret)
- Redeploy

### 4. Update GitHub Workflow:

Edit `.github/workflows/publish-scheduled-blogs.yml`:

```yaml
- name: Trigger scheduled blog publishing
  run: |
    response=$(curl -s -o /dev/null -w "%{http_code}" -X GET \
      -H "User-Agent: GitHub-Actions-Cron" \
      -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
      "${{ secrets.NEXT_PUBLIC_BASE_URL }}/api/cron/publish-scheduled-blogs")
```

---

## ❓ Troubleshooting

### Issue: "API returned status code: 500"

**Solution:**
- Check your Vercel deployment logs
- Ensure database connection is working
- Verify Prisma schema is migrated

### Issue: "API returned status code: 404"

**Solution:**
- Verify `NEXT_PUBLIC_BASE_URL` is correct in GitHub secrets
- Ensure the API file exists: `app/api/cron/publish-scheduled-blogs/route.js`
- Redeploy your application

### Issue: "Workflow doesn't run"

**Solution:**
- Ensure the workflow file is in `.github/workflows/` folder
- Check if GitHub Actions is enabled for your repository
- The first scheduled run happens after the workflow is pushed

### Issue: "API returned status code: 308" or "Exit code 3"

**Solution:**
- This means the URL is redirecting (e.g., from non-www to www)
- The workflow already includes `-L` flag to follow redirects
- Verify `NEXT_PUBLIC_BASE_URL` matches your exact production URL:
  - If your site is at `www.domain.com`, use `https://www.domain.com`
  - If your site is at `domain.com`, use `https://domain.com`
  - No trailing slash!
- Test the API manually: Open `https://your-domain.com/api/cron/publish-scheduled-blogs` in browser

### Issue: "Scheduled blog not publishing"

**Checklist:**
1. Blog status is `'scheduled'` (not `'draft'`)
2. `scheduledPublishAt` date/time is in the past
3. Blog `published` field is `false`
4. GitHub Actions workflow is running (check Actions tab)
5. API endpoint is returning success

---

## 💡 Tips

1. **Free Forever:** GitHub Actions provides 2,000 minutes/month free (this uses ~5 seconds per run)
2. **Reliable:** GitHub Actions is very reliable and widely used
3. **No Maintenance:** Once set up, it runs automatically
4. **Easy Debugging:** Check logs in Actions tab anytime
5. **Manual Override:** You can always manually publish a scheduled blog from admin

---

## 📝 Summary

### What You Have Now:
- ✅ Free scheduled blog publishing (no paid plans needed)
- ✅ Runs every 15 minutes automatically
- ✅ Reliable and professional solution
- ✅ Easy to monitor and debug
- ✅ Works with your existing admin UI

### What You Need to Do:
1. Push code to GitHub
2. Add `NEXT_PUBLIC_BASE_URL` secret to GitHub
3. Done! It will start working automatically

---

## 🎉 Need Help?

If you encounter any issues:
1. Check the **Actions** tab logs in GitHub
2. Check your Vercel deployment logs
3. Test the API endpoint directly in browser
4. Verify all environment variables are set

---

**Last Updated:** December 22, 2025

