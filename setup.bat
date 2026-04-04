@echo off
REM SDN 3 Purwosari - Automated Setup Script (Windows)
REM This script automates GitHub, Cloudflare, and Supabase integration

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo 🚀 SDN 3 Purwosari - Automated Setup (Windows)
echo =============================================
echo.

REM Check prerequisites
echo 📋 Checking prerequisites...

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ Git is not installed
    exit /b 1
)
echo ✓ Git found

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ Node.js/npm is not installed
    exit /b 1
)
echo ✓ npm found

REM Get GitHub credentials
echo.
echo 🔧 GitHub Configuration
echo =======================

set /p GITHUB_USER="Enter GitHub username (sibersaga): "
if "!GITHUB_USER!"=="" set GITHUB_USER=sibersaga

set /p GITHUB_REPO="Enter GitHub repository name (sdn3-purwosari): "
if "!GITHUB_REPO!"=="" set GITHUB_REPO=sdn3-purwosari

set /p GITHUB_TOKEN="Enter GitHub Personal Access Token: "

REM Get Supabase credentials
echo.
echo 🔧 Supabase Configuration
echo ==========================

set /p SUPABASE_URL="Enter Supabase Project URL: "
set /p SUPABASE_ANON_KEY="Enter Supabase Anon Key: "
set /p SUPABASE_SERVICE_KEY="Enter Supabase Service Key: "

REM Get Cloudflare credentials
echo.
echo 🔧 Cloudflare Configuration
echo ============================

set /p CLOUDFLARE_ACCOUNT_ID="Enter Cloudflare Account ID: "
set /p CLOUDFLARE_API_TOKEN="Enter Cloudflare API Token: "

set /p CLOUDFLARE_PROJECT="Enter Cloudflare Pages Project Name (sdn3-purwosari): "
if "!CLOUDFLARE_PROJECT!"=="" set CLOUDFLARE_PROJECT=sdn3-purwosari

REM Get Railway credentials (optional)
echo.
echo 🔧 Railway Configuration (Optional)
echo ====================================

set /p USE_RAILWAY="Do you want to deploy backend to Railway? (y/n): "
if /i "!USE_RAILWAY!"=="y" (
    set /p RAILWAY_TOKEN="Enter Railway Token: "
) else (
    set RAILWAY_TOKEN=
)

REM Setup local environment files
echo.
echo 📝 Setting up environment files
echo ================================

REM Frontend .env
(
echo VITE_SUPABASE_URL=!SUPABASE_URL!
echo VITE_SUPABASE_ANON_KEY=!SUPABASE_ANON_KEY!
echo VITE_API_URL=https://api.sdn3purwosari.com
) > frontend\.env
echo ✓ Created frontend\.env

REM Backend .env
(
echo SUPABASE_URL=!SUPABASE_URL!
echo SUPABASE_SERVICE_KEY=!SUPABASE_SERVICE_KEY!
echo SUPABASE_ANON_KEY=!SUPABASE_ANON_KEY!
echo DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
echo NODE_ENV=production
echo PORT=3001
echo CORS_ORIGIN=https://sdn3purwosari.com
echo JWT_SECRET=your-generated-secret-here
) > backend\.env
echo ✓ Created backend\.env

REM Install npm packages
echo.
echo 📦 Installing npm packages
echo ===========================

call npm install --prefix=frontend
call npm install --prefix=backend
echo ✓ Installed all dependencies

REM Initialize git repository if not exists
echo.
echo 🔐 Setting up GitHub
echo ====================

if not exist .git (
    call git init
    call git add .
    call git commit -m "Initial commit: SDN 3 Purwosari website"
    echo ✓ Initialized Git repository
) else (
    echo ⚠ Git repository already exists
)

REM Add GitHub remote
set GITHUB_URL=https://github.com/!GITHUB_USER!/!GITHUB_REPO!.git
for /f "tokens=*" %%i in ('git remote') do set GIT_REMOTES=!GIT_REMOTES! %%i
if "!GIT_REMOTES!"=="" (
    call git remote add origin !GITHUB_URL!
    echo ✓ Added GitHub remote
) else (
    call git remote set-url origin !GITHUB_URL!
    echo ✓ Updated GitHub remote
)

REM Create setup summary
echo.
echo 📋 GitHub Repository Secrets
echo =============================
echo.
echo Add these secrets to GitHub (Settings ^> Secrets and variables ^> Actions^):
echo.
echo Frontend:
echo VITE_SUPABASE_URL=!SUPABASE_URL!
echo VITE_SUPABASE_ANON_KEY=!SUPABASE_ANON_KEY!
echo VITE_API_URL=https://api.sdn3purwosari.com
echo.
echo Deployment:
echo CLOUDFLARE_API_TOKEN=!CLOUDFLARE_API_TOKEN!
echo CLOUDFLARE_ACCOUNT_ID=!CLOUDFLARE_ACCOUNT_ID!
if not "!RAILWAY_TOKEN!"=="" (
    echo RAILWAY_TOKEN=!RAILWAY_TOKEN!
)
echo.

echo.
echo ✅ Setup Complete!
echo ==================
echo.
echo Next steps:
echo   1. Add GitHub repository secrets (see above^)
echo   2. Push to GitHub: git push -u origin main
echo   3. Setup Cloudflare Pages deployment
echo   4. Run Supabase database migrations
echo   5. Configure Railway backend deployment (optional^)
echo.
pause
