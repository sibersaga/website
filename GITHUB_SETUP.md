# GitHub Secrets & Configuration Guide

## 🔐 Required GitHub Secrets

Add these secrets to your GitHub repository at:
`Settings` → `Secrets and variables` → `Actions`

### Frontend Deployment Secrets

```
VITE_SUPABASE_URL
  └─ Value: https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY
  └─ Value: your-anon-key-here

VITE_API_URL
  └─ Value: https://api.sdn3purwosari.com
```

### Cloudflare Pages Deployment Secrets

```
CLOUDFLARE_API_TOKEN
  └─ How to get:
     1. Go to https://dash.cloudflare.com/profile/api-tokens
     2. Create new token with:
        - Permissions: Account.Cloudflare Pages:Edit
        - Scope: All accounts

CLOUDFLARE_ACCOUNT_ID
  └─ How to get:
     1. Go to https://dash.cloudflare.com
     2. In the sidebar, find your account ID
     3. Copy it
```

### Backend Deployment Secrets (Railway)

```
RAILWAY_TOKEN
  └─ How to get:
     1. Go to https://railway.app/project
     2. Settings → Tokens
     3. Create new token
```

### Supabase Secrets

```
SUPABASE_SERVICE_KEY
  └─ How to get:
     1. Go to Supabase Dashboard
     2. Settings → API
     3. Copy "service_role" key (⚠️ Keep this secret!)
```

### Optional: Slack Notifications

```
SLACK_WEBHOOK
  └─ How to get:
     1. Create Slack app at https://api.slack.com/apps
     2. Enable Incoming Webhooks
     3. Create new webhook URL
     4. Copy the URL
```

---

## 📋 Step-by-Step Setup Instructions

### 1. Create GitHub Repository

```bash
# Option A: Using GitHub CLI
gh repo create sibersaga/sdn3-purwosari --public

# Option B: Manual
# Go to https://github.com/new
# Create new repository: sdn3-purwosari
```

### 2. Push Code to GitHub

```bash
git add .
git commit -m "Initial commit: SDN 3 Purwosari website"
git branch -M main
git remote add origin https://github.com/sibersaga/sdn3-purwosari.git
git push -u origin main
```

### 3. Add GitHub Secrets

```bash
# Using GitHub CLI
gh secret set VITE_SUPABASE_URL --body "https://your-project.supabase.co"
gh secret set VITE_SUPABASE_ANON_KEY --body "your-key"
gh secret set VITE_API_URL --body "https://api.sdn3purwosari.com"
gh secret set CLOUDFLARE_API_TOKEN --body "your-token"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "your-account-id"
gh secret set SUPABASE_SERVICE_KEY --body "your-service-key"
gh secret set RAILWAY_TOKEN --body "your-railway-token"
```

Or manually:
1. Go to `https://github.com/sibersaga/sdn3-purwosari/settings/secrets/actions`
2. Click "New repository secret"
3. Add each secret from the list above

### 4. Setup Cloudflare Pages

```bash
# Option A: Automatic (via GitHub Actions)
# The deploy.yml workflow will automatically deploy to Cloudflare

# Option B: Manual
# 1. Go to https://dash.cloudflare.com/pages
# 2. Click "Create a project"
# 3. Connect GitHub account
# 4. Select repository: sibersaga/sdn3-purwosari
# 5. Build settings:
#    - Framework: Vite
#    - Build command: npm run build --prefix=frontend
#    - Build output directory: frontend/dist
# 6. Click "Save and Deploy"
```

### 5. Setup Supabase

```bash
# 1. Create Supabase project
# Go to https://supabase.com → Create new project

# 2. Run migrations
psql "$DATABASE_URL" < backend/supabase/migrations/001_initial_schema.sql

# 3. Get credentials
# Settings → API → Copy SUPABASE_URL and SUPABASE_ANON_KEY

# 4. Add to GitHub secrets
gh secret set SUPABASE_URL --body "https://your-project.supabase.co"
gh secret set SUPABASE_SERVICE_KEY --body "your-service-role-key"
```

### 6. Setup Railway (Optional)

```bash
# 1. Create Railway account at https://railway.app

# 2. Create new project → GitHub Repo

# 3. Select repository: sibersaga/sdn3-purwosari

# 4. Add environment variables:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-key
NODE_ENV=production
PORT=3001

# 5. Deploy
# Railway auto-deploys on push to main
```

---

## 🔄 Automated Deployment Flow

### When you push to main:

```
git push
    ↓
GitHub Actions triggers
    ↓
1️⃣  Build & Test
    - npm install
    - npm run build
    - npm run lint
    ↓
2️⃣  Deploy Frontend (if tests pass)
    - Build React app
    - Deploy to Cloudflare Pages
    ↓
3️⃣  Deploy Backend (if tests pass)
    - Build Node.js app
    - Deploy to Railway
    ↓
4️⃣  Notifications (optional)
    - Send Slack message with status
```

---

## 📊 GitHub Actions Workflows

### deploy.yml (Main Deployment)
```yaml
Triggers: push to main, staging
Jobs:
  1. test - Run tests on both node 18 & 20
  2. deploy-frontend - Deploy to Cloudflare Pages
  3. deploy-backend - Deploy to Railway
  4. notify - Send Slack notification
```

### security.yml (Security Scanning)
```yaml
Triggers: push, pull_request, weekly
Jobs:
  1. dependency-check - Audit npm packages
  2. codeql - GitHub CodeQL analysis
```

---

## 🚨 Troubleshooting

### Deploy fails with "Secrets not found"

**Solution:**
```bash
# Verify secrets are added
gh secret list

# Add missing secret
gh secret set SECRET_NAME --body "value"
```

### Cloudflare deployment failed

**Check:**
1. Is CLOUDFLARE_API_TOKEN valid?
2. Is CLOUDFLARE_ACCOUNT_ID correct?
3. Does Cloudflare project exist?

**Fix:**
```bash
# Re-add secrets
gh secret set CLOUDFLARE_API_TOKEN --body "new-token"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "correct-id"
```

### Railway deployment not working

**Check:**
1. Is RAILWAY_TOKEN valid?
2. Does Railway project exist?
3. Are environment variables set?

**Fix:**
1. Go to https://railway.app/project
2. Settings → Tokens → Create new
3. Update GitHub secret

### Supabase connection fails

**Check:**
1. Is SUPABASE_URL correct?
2. Is SUPABASE_SERVICE_KEY correct?
3. Does Supabase project exist?

**Fix:**
```bash
# Re-add Supabase secrets
gh secret set SUPABASE_URL --body "correct-url"
gh secret set SUPABASE_SERVICE_KEY --body "correct-key"
```

---

## 🔍 Monitoring Deployments

### View GitHub Actions Logs

```bash
# List recent workflows
gh run list

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

### View Cloudflare Logs

1. Go to `https://dash.cloudflare.com/pages/view/sdn3-purwosari`
2. Click "Deployments"
3. Click deployment to view logs

### View Railway Logs

1. Go to `https://railway.app/project`
2. Select backend service
3. View "Logs" tab

---

## 📚 Documentation

- [DEPLOYMENT.md](../docs/DEPLOYMENT.md) - Detailed deployment guide
- [README.md](../README.md) - Project overview
- [DEVELOPMENT.md](../DEVELOPMENT.md) - Development guide

---

## 🎯 Automation Checklist

- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] All secrets added to GitHub
- [ ] Cloudflare Pages configured
- [ ] Railway backend configured
- [ ] Supabase database setup
- [ ] First deployment successful
- [ ] Production domain configured
- [ ] SSL certificates working
- [ ] Monitoring setup (optional)

---

**Last Updated:** April 4, 2026
**Status:** Ready for Deployment
