# 🔗 GitHub + Cloudflare + Supabase Integration Guide

Panduan lengkap untuk mengintegrasikan proyek dengan GitHub, Cloudflare Pages, dan Supabase.

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        GITHUB.COM                            │
│  - Source code repository                                    │
│  - GitHub Actions CI/CD pipeline                             │
│  - Secrets management                                        │
└────────┬─────────────────────┬──────────────────────────────┘
         │                     │
    [PUSH]               [WEBHOOK]
         │                     │
         ▼                     ▼
┌──────────────────────────────────────────────────────────────┐
│            GITHUB ACTIONS (CI/CD Pipeline)                   │
│  - Test & Build frontend (Vite)                              │
│  - Test & Build backend (Express/TypeScript)                 │
│  - Deploy to Cloudflare Pages                                │
│  - Deploy to Railway                                         │
│  - Security scanning (npm audit, CodeQL)                     │
└────────┬────────────────────────────┬───────────────────────┘
         │                            │
    [DEPLOY]                    [DEPLOY]
         │                            │
         ▼                            ▼
┌──────────────────────┐   ┌──────────────────────┐
│   CLOUDFLARE PAGES   │   │  RAILWAY (Backend)   │
│  - Frontend SPA      │   │  - Express API       │
│  - Static hosting    │   │  - Business logic    │
│  - CDN/Caching       │   │  - Job processing    │
│  - SSL/TLS           │   │  - Environment vars  │
│  - Analytics         │   │  - Logs & monitoring │
└──────────┬───────────┘   └──────────┬───────────┘
           │                         │
           │                    [API CALLS]
           │                         │
           └──────────────┬──────────┘
                          │
                          ▼
            ┌──────────────────────────┐
            │   SUPABASE PostgreSQL    │
            │  - Database              │
            │  - Authentication        │
            │  - Row Level Security    │
            │  - Realtime updates      │
            │  - Storage (files)       │
            │  - Edge Functions        │
            └──────────────────────────┘
```

---

## 🔑 Step 1: GitHub Setup

### 1.1 Create Repository

1. Go to **https://github.com/sibersaga**
2. Click **Repositories** tab
3. Click **New** button
4. Fill in:
   - **Repository name:** `sdn3-purwosari`
   - **Description:** School Website - SDN 3 Purwosari
   - **Public:** Yes (required for Cloudflare Pages free tier)
   - **Add .gitignore:** Node
   - **License:** MIT or Proprietary
5. Click **Create repository**

### 1.2 Push Local Code

```bash
# Navigate to project directory
cd path/to/sdn3-purwosari

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial: SDN 3 Purwosari structured project"

# Add remote repository
git remote add origin https://github.com/sibersaga/sdn3-purwosari.git

# Verify remote
git remote -v

# Push to main branch
git branch -M main
git push -u origin main

# Verify on GitHub
# Visit: https://github.com/sibersaga/sdn3-purwosari
```

### 1.3 Add GitHub Secrets

Repository Settings → Secrets and variables → Actions

**Add these 8 secrets:**

| Secret Name | Value | Where to Get |
|------------|-------|--------------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Cloudflare dashboard → Overview |
| `CLOUDFLARE_API_TOKEN` | API token with Pages scope | Cloudflare → API Tokens → Create Token |
| `CLOUDFLARE_ZONE_ID` | Domain zone ID | Cloudflare → Your domain → Overview |
| `RAILWAY_TOKEN` | Railway API token | railway.app → Account settings |
| `SUPABASE_URL` | Supabase project URL | supabase.com → Project settings |
| `SUPABASE_SERVICE_KEY` | Service role key | supabase.com → Settings → API |
| `DATABASE_URL` | PostgreSQL connection string | supabase.com → Settings → Database |
| `JWT_SECRET` | 32-char random string | Generate: `openssl rand -hex 32` |

**Step-by-step untuk setiap secret:**

```bash
# Get Cloudflare Account ID
curl https://api.cloudflare.com/client/v4/accounts \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Cloudflare Zone ID
# Kunjungi domain di Cloudflare dashboard → Overview → Zone ID

# Generate JWT Secret
openssl rand -hex 32

# Get Supabase credentials
# Kunjungi supabase.com → Project settings → API
```

---

## 🌐 Step 2: Cloudflare Pages Setup

### 2.1 Connect Repository

1. Go to **https://dash.cloudflare.com**
2. Navigate to **Pages**
3. Click **Create a project**
4. Choose **Connect to Git**
5. Authorize GitHub
6. Select repository: **sibersaga/sdn3-purwosari**
7. Click **Begin setup**

### 2.2 Configure Build

Fill in build configuration:

- **Project name:** `sdn3-purwosari`
- **Production branch:** `main`
- **Build command:** `npm run build --prefix=frontend`
- **Build output directory:** `frontend/dist`
- **Node version:** `20.x` (or latest stable)

### 2.3 Add Environment Variables

Go to **Settings** → **Environment variables**

Add for **Production:**

```
VITE_API_URL = https://api.sdn3purwosari.com
VITE_SUPABASE_URL = [From Supabase settings]
VITE_SUPABASE_ANON_KEY = [From Supabase settings]
NODE_ENV = production
```

Add for **Preview (Optional):**

```
VITE_API_URL = https://staging-api.sdn3purwosari.com
VITE_SUPABASE_URL = [Staging Supabase URL]
VITE_SUPABASE_ANON_KEY = [Staging key]
NODE_ENV = staging
```

### 2.4 Connect Domain

1. Go to **Custom domains**
2. Click **Setup a custom domain**
3. Enter: `sdn3purwosari.com`
4. Follow DNS configuration steps
5. Update your domain DNS records at registrar:
   - Type: `CNAME`
   - Name: `www` (or `@` for root)
   - Value: `sdn3purwosari.com.cdn.cloudflare.com`

### 2.5 Verify Deployment

After first push to main:
1. GitHub Actions automatically builds & deploys
2. Cloudflare Pages shows deployment status
3. Visit: `https://sdn3purwosari.com` to verify
4. Check green lock icon for SSL/TLS

---

## 🗄️ Step 3: Supabase Setup

### 3.1 Create Project

1. Go to **https://supabase.com**
2. Sign in or create account
3. Click **New project**
4. Fill in:
   - **Project name:** `sdn3-purwosari`
   - **Database password:** Generate strong password (save it!)
   - **Region:** Choose closest to location (e.g., Singapore)
   - **Pricing plan:** Free tier is sufficient
5. Click **Create new project**
6. Wait for provisioning (~2 minutes)

### 3.2 Get Connection Credentials

Go to **Settings** → **Database** → **Connection string**

Copy three connection strings:

```bash
# Connection String (PSQL)
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Connection String (JavaScript)
# Use this for backend/.env

# Connection String (Connection pooler)
# Use for high-volume scenarios
```

Add to backend/.env:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_KEY=[SERVICE_ROLE_KEY]
```

### 3.3 Run Database Migrations

```bash
# Get DATABASE_URL from above

# Run migrations using psql
psql "$DATABASE_URL" < backend/supabase/migrations/001_initial_schema.sql

# OR using Supabase CLI
supabase migration up --db-url "$DATABASE_URL"

# Verify tables created
psql "$DATABASE_URL" -c "\dt"
```

### 3.4 Enable Row Level Security (RLS)

1. Go to **Settings** → **Authentication**
2. Enable **JWT expiration**
3. Set to 24 hours
4. Go to each table in **SQL Editor**:
   - Run: `ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;`
5. Create RLS policies for each table

Example policy for public read access:
```sql
CREATE POLICY "Enable read for all users" 
ON public.news FOR SELECT 
USING (is_published = true);

CREATE POLICY "Enable insert for authenticated users"
ON public.news FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
```

### 3.5 Setup Authentication

Go to **Authentication** → **Providers**

Enable:
- [ ] Email (default enabled)
- [ ] Google (OAuth)
- [ ] GitHub (OAuth)

Get OAuth credentials:
- Google: https://console.cloud.google.com
- GitHub: Settings → Developer settings → OAuth Apps

---

## 🚀 Step 4: Railway Backend Deployment

### 4.1 Create Railway Project

1. Go to **https://railway.app**
2. Sign in with GitHub
3. Click **New project** → **Deploy from GitHub repo**
4. Select **sibersaga/sdn3-purwosari**
5. Choose **backend** directory
6. Click **Deploy**

### 4.2 Add Environment Variables

In Railway dashboard:
- Click **Variables** tab
- Add all variables from `backend/.env`:

```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://sdn3purwosari.com
DATABASE_URL=postgresql://...
SUPABASE_URL=https://[project].supabase.co
SUPABASE_SERVICE_KEY=[key]
JWT_SECRET=[secret]
```

### 4.3 Configure Domain

1. Go to **Settings**
2. Click **Domains**
3. Add custom domain: `api.sdn3purwosari.com`
4. Update DNS records (CNAME to Railway domain)
5. Wait for SSL certificate (5-10 minutes)

### 4.4 View Logs

Click **Deployments** tab to:
- View build logs
- Check runtime errors
- Monitor performance

---

## ✅ Step 5: Verification & Testing

### 5.1 Verify Deployments

```bash
# Check frontend deployment
curl -I https://sdn3purwosari.com
# Should show: HTTP/2 200, SSL certificate valid

# Check backend API
curl https://api.sdn3purwosari.com/api/health
# Should show: {"status":"OK","message":"...","timestamp":"..."}

# Check database connection from backend
curl https://api.sdn3purwosari.com/api/schools
# Should show JSON response or 401 if auth required
```

### 5.2 Check GitHub Actions

1. Go to **GitHub repository** → **Actions** tab
2. See workflow runs for each push
3. View detailed logs for each job
4. Verify: ✅ test → ✅ deploy-frontend → ✅ deploy-backend

### 5.3 Monitor Logs

**Cloudflare Pages:**
- Dashboard → Pages → Deployments → View build logs

**Railway:**
- Dashboard → Deployments → View logs

**Supabase:**
- Dashboard → Logs → Database logs

### 5.4 Security Checklist

- [ ] No secrets in code (use .env files)
- [ ] All secrets added to GitHub Actions
- [ ] CORS properly configured
- [ ] JWT authentication working
- [ ] RLS enabled on database
- [ ] SSL certificates valid (green lock)
- [ ] Rate limiting configured
- [ ] Error messages don't expose sensitive info

---

## 🔄 Continuous Integration Workflow

### On Each Push to Main:

1. **GitHub Actions Triggers**
   ```
   ✓ Checkout code
   ✓ Setup Node 18 & 20
   ✓ Install dependencies
   ✓ Lint code
   ✓ Build frontend & backend
   ✓ Run security checks (npm audit, CodeQL)
   ```

2. **Frontend Deployment**
   ```
   ✓ Build Vite bundle → frontend/dist/
   ✓ Deploy to Cloudflare Pages
   ✓ Update DNS/SSL
   ✓ Invalidate CDN cache
   ```

3. **Backend Deployment**
   ```
   ✓ Build TypeScript → backend/dist/
   ✓ Deploy to Railway
   ✓ Update environment
   ✓ Run health checks
   ```

4. **Notifications**
   ```
   ✓ Send Slack notification with status
   ✓ Post deployment summary to PR comments
   ✓ Tag release on GitHub
   ```

---

## 🐛 Troubleshooting

### Issue: "Deploy workflow failed"

**Solution:**
1. Check GitHub Actions logs
2. Verify Node version (18+)
3. Run build locally: `npm run build`
4. Check environment variables syntax

### Issue: "Frontend shows 404 errors"

**Solution:**
1. Verify build output directory: `frontend/dist`
2. Check Cloudflare routing rules
3. Clear CDN cache: Cloudflare dashboard → Purge cache
4. Check SPA configuration

### Issue: "Backend API not responding"

**Solution:**
1. Verify Railway deployment status
2. Check environment variables in Railway
3. Test locally: `npm run dev --prefix=backend`
4. Check CORS configuration
5. Verify database connection: `psql "$DATABASE_URL" -c "SELECT 1"`

### Issue: "Database queries failing"

**Solution:**
1. Verify DATABASE_URL format
2. Test connection: `psql "$DATABASE_URL" -c "SELECT 1"`
3. Check RLS policies
4. Verify user authentication/JWT
5. Check Supabase dashboard for connection limits

---

## 📚 Additional Resources

- **GitHub Actions:** https://docs.github.com/en/actions
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Supabase:** https://supabase.com/docs
- **Railway:** https://docs.railway.app
- **Express.js:** https://expressjs.com/
- **Vite:** https://vitejs.dev/

---

**Last Updated:** 2024-12-19
**Status:** ✅ Production Ready
