# 🤖 Automated Deployment Setup Guide

Panduan lengkap untuk setup otomatis GitHub, Cloudflare, dan Supabase.

## 📋 Persyaratan

- Git installed
- Node.js 18+ installed
- GitHub account (sibersaga)
- Supabase account
- Cloudflare account
- Railway account (optional)

## 🚀 Quickstart (Recommended)

### Windows Users
```bash
cd SiberSaga
setup.bat
```

### macOS/Linux Users
```bash
cd SiberSaga
chmod +x setup.sh
bash setup.sh
```

Script akan secara otomatis:
1. ✓ Membuat environment files (.env)
2. ✓ Install npm dependencies
3. ✓ Initialize Git repository
4. ✓ Setup GitHub remote
5. ✓ Generate deployment summary

## 📝 Manual Setup (If scripts fail)

### Step 1: Create Environment Files

**frontend/.env**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3001
```

**backend/.env**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key-here
SUPABASE_ANON_KEY=your-anon-key-here
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=generate-with-openssl-rand-base64-32
```

### Step 2: Install Dependencies

```bash
npm install --prefix=frontend
npm install --prefix=backend
```

### Step 3: Setup GitHub

```bash
# Initialize git (if not done)
git init

# Add files
git add .
git commit -m "Initial commit: SDN 3 Purwosari website"

# Add GitHub remote
git remote add origin https://github.com/sibersaga/sdn3-purwosari.git

# Push to GitHub
git push -u origin main
```

### Step 4: Add GitHub Secrets

Go to: `https://github.com/sibersaga/sdn3-purwosari/settings/secrets/actions`

Add these secrets:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_API_URL
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
SUPABASE_SERVICE_KEY
RAILWAY_TOKEN (optional)
SLACK_WEBHOOK (optional)
```

### Step 5: Setup Cloudflare Pages

1. Go to https://dash.cloudflare.com/pages
2. Click "Create a project" → "Connect to Git"
3. Select GitHub account & repository
4. Configure build settings:
   - **Framework**: Vite
   - **Build command**: `npm run build --prefix=frontend`
   - **Build output directory**: `frontend/dist`
5. Click "Save and Deploy"

### Step 6: Setup Supabase

```bash
# Option A: Using CLI
bash supabase-setup.sh

# Option B: Manual
# 1. Go to https://supabase.com → Create new project
# 2. Run SQL migrations:
#    psql "postgresql://..." < backend/supabase/migrations/001_initial_schema.sql
# 3. Get API keys from Settings → API
# 4. Add to GitHub secrets
```

### Step 7: Setup Railway (Optional)

1. Go to https://railway.app → Create new project
2. Select "GitHub Repo" → select your repository
3. Add environment variables:
   ```
   SUPABASE_URL=...
   SUPABASE_SERVICE_KEY=...
   NODE_ENV=production
   PORT=3001
   ```
4. Deploy

## 🔄 Automated Workflows

### `.github/workflows/deploy.yml`
Automatically deployed when you push to main:
- ✅ Run tests (Node 18 & 20)
- ✅ Build frontend & backend
- ✅ Deploy to Cloudflare Pages
- ✅ Deploy to Railway
- ✅ Send Slack notification

### `.github/workflows/security.yml`
Runs on push and weekly:
- 🔐 Check npm vulnerabilities
- 🛡️ CodeQL security analysis
- 📊 Generate SBOM

## 🧪 Testing Locally

```bash
# Run everything locally
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:3001

# Build production
npm run build

# Run tests
npm run lint
```

## 📊 Deployment Flow

```
git push main
    ↓
GitHub Actions
    ↓
├─ Install & Build ✅
├─ Run Tests ✅
├─ Deploy Frontend → Cloudflare ✅
├─ Deploy Backend → Railway ✅
└─ Send Notifications ✅
```

## 🚨 Troubleshooting

### "Secrets not found"
```bash
# List secrets
gh secret list

# Add missing secret
gh secret set NAME --body "value"
```

### "Deploy failed"
1. Check GitHub Actions logs: https://github.com/sibersaga/sdn3-purwosari/actions
2. Check build errors in workflow
3. Verify environment variables

### "Database connection failed"
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check credentials
echo $DATABASE_URL
```

## 📚 Full Documentation

- [GITHUB_SETUP.md](GITHUB_SETUP.md) - Detailed GitHub setup
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment guide
- [README.md](README.md) - Project overview

## 🎯 After Setup

1. ✅ Project auto-deploys on git push
2. ✅ Frontend available on Cloudflare Pages
3. ✅ Backend API running on Railway
4. ✅ Database on Supabase
5. ✅ Security scanning active

## 💡 Next Steps

- [ ] Configure custom domain
- [ ] Setup email notifications
- [ ] Enable HTTPS
- [ ] Add monitoring
- [ ] Setup backups
- [ ] Configure CDN caching

---

**Need Help?** See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions.
