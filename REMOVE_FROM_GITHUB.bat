@echo off
REM ============================================
REM Remove ENV_VARIABLES.txt from GitHub
REM ============================================

echo ========================================
echo Remove Exposed Environment Variables
echo ========================================
echo.

echo Step 1: Removing file from Git...
git rm ENV_VARIABLES.txt 2>nul || echo File already removed from Git
echo.

echo Step 2: Committing removal...
git commit -m "Security: Remove exposed environment variables file"
echo.

echo Step 3: Pushing to GitHub (force push)...
echo WARNING: This will overwrite the GitHub repository history
pause

git push origin main --force

echo.
echo ========================================
echo File removed from GitHub successfully!
echo ========================================
echo.
echo CRITICAL: You MUST now rotate all credentials:
echo   1. Supabase API keys
echo   2. Database password  
echo   3. Resend API key
echo   4. JWT secrets
echo.
echo See SECURITY_FIX_REQUIRED.md for details
echo.
pause



