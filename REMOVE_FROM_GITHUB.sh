#!/bin/bash

# ============================================
# Remove ENV_VARIABLES.txt from GitHub
# ============================================

echo "🚨 Removing exposed environment variables from GitHub..."
echo ""

# Step 1: Remove the file from Git tracking
echo "Step 1: Removing file from Git..."
git rm ENV_VARIABLES.txt 2>/dev/null || echo "File already removed from Git"

# Step 2: Commit the removal
echo "Step 2: Committing removal..."
git commit -m "Security: Remove exposed environment variables file"

# Step 3: Force push to overwrite GitHub history
echo "Step 3: Pushing to GitHub (force push)..."
echo "⚠️  This will overwrite the GitHub repository history"
read -p "Press Enter to continue or Ctrl+C to cancel..."

git push origin main --force

echo ""
echo "✅ File removed from GitHub!"
echo ""
echo "⚠️  IMPORTANT: You MUST now rotate all exposed credentials:"
echo "   1. Supabase API keys"
echo "   2. Database password"
echo "   3. Resend API key"
echo "   4. JWT secrets"
echo ""
echo "📖 See SECURITY_FIX_REQUIRED.md for detailed instructions"



