# 🚀 Quick Start - SDN 3 Purwosari Deployment

Panduan cepat untuk setup otomatis deployment ke GitHub, Cloudflare, dan Supabase.

## 📋 Prerequisites

- Git installed (`git --version`)
- Node.js 18+ installed (`node --version`)
- npm or yarn (`npm --version`)
- GitHub account: **sibersaga**
- GitHub Personal Access Token (classic with repo & workflow scope)
- Cloudflare account (free tier)
- Supabase account (free tier)

## 🚦 1. Setup Otomatis (Recommended)

### Windows PowerShell / Command Prompt:
```bash
setup.bat
```

### macOS / Linux / Git Bash:
```bash
bash setup.sh
```

**Script akan:**
- ✅ Check prerequisites
- ✅ Prompt untuk credentials (GitHub, Supabase, Cloudflare, Railway)
- ✅ Create `.env` files untuk frontend & backend
- ✅ Initialize Git repository
- ✅ Add GitHub remote
- ✅ Output checklist untuk secrets

---

## 🔧 2. Setup Manual (Jika Script Gagal)

### Step 1: Clone & Initialize Git
```bash
cd path/to/sdn3-purwosari
git init
git add .
git commit -m "Initial: SDN 3 Purwosari structured project"
```

### Step 2: Create/Use GitHub Repository
1. Go to https://github.com/sibersaga
2. Repository: **website** (already exists)
3. URL: `https://github.com/sibersaga/website.git`

Add remote and push:
```bash
git remote add origin https://github.com/sibersaga/website.git
git branch -M main
git push -u origin main
```

### Step 3: Add GitHub Remote & Push
```bash
git remote add origin https://github.com/sibersaga/website.git
git branch -M main
git push -u origin main
```

### Step 4: Create `.env` Files

**frontend/.env:**
```env
VITE_API_URL=https://api.sdn3purwosari.com
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**backend/.env:**
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://sdn3purwosari.com
DATABASE_URL=postgresql://...
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
JWT_SECRET=your-secret-key
```

### Step 5: Add GitHub Secrets
Go to repository Settings → Secrets and variables → Actions

Tambahkan 8 secrets berikut:
1. `CLOUDFLARE_ACCOUNT_ID` - Dari Cloudflare dashboard
2. `CLOUDFLARE_API_TOKEN` - Create new token dengan Pages scope
3. `CLOUDFLARE_ZONE_ID` - Domain zone ID
4. `RAILWAY_TOKEN` - Railway.app API token
5. `SUPABASE_URL` - Project URL
6. `SUPABASE_SERVICE_KEY` - Service role key
7. `DATABASE_URL` - PostgreSQL connection string
8. `JWT_SECRET` - Generate: `openssl rand -hex 32`

---

## 🌐 3. Setup Cloudflare Pages

### Automatic (via GitHub Actions):
Setelah push ke main branch, GitHub Actions akan deploy otomatis ke Cloudflare Pages.

### Manual:
1. Go to https://dash.cloudflare.com → Pages
2. Click **Create a project**
3. Connect GitHub → Select **sdn3-purwosari** repo
4. Build settings:
   - Framework: Vite
   - Build command: `npm run build --prefix=frontend`
   - Build output directory: `frontend/dist`
5. Environment variables:
   - `VITE_API_URL`: https://api.sdn3purwosari.com
   - `VITE_SUPABASE_URL`: [Your Supabase URL]
   - `VITE_SUPABASE_ANON_KEY`: [Your Supabase Key]
6. Click **Deploy site**

---

## 🗄️ 4. Setup Supabase Database

### Automatic:
```bash
bash supabase-setup.sh
```

### Manual:
1. Go to https://supabase.com → Create new project
2. Project name: `sdn3-purwosari`
3. Database password: Generate strong password
4. Region: Choose closest to location
5. Create project
6. Wait for provisioning (~2 minutes)
7. Go to Settings → Database → Connection string
8. Copy `psql` connection string
9. Run migrations:
   ```bash
   psql "postgresql://..." < backend/supabase/migrations/001_initial_schema.sql
   ```
10. Enable Row Level Security (RLS):
    - Go to Authentication → Policies
    - Enable RLS for all tables

---

## 🚀 5. Deploy Backend

### Option A: Railway (Recommended)
1. Go to https://railway.app
2. Create new project → Deploy from GitHub
3. Select **sdn3-purwosari** repository
4. Select **backend** folder
5. Add environment variables (same as backend/.env)
6. Deploy

### Option B: Supabase Edge Functions
```bash
supabase functions deploy --project-ref <project-ref>
```

### Option C: Traditional VPS/Server
```bash
npm run build --prefix=backend
npm start --prefix=backend
```

---

## ✅ 6. Verification Checklist

- [ ] GitHub repository created at `github.com/sibersaga/sdn3-purwosari`
- [ ] GitHub Actions workflow executing (visible in Actions tab)
- [ ] Frontend deployed to Cloudflare Pages
- [ ] Backend deployed to Railway/Function
- [ ] Database migrations executed on Supabase
- [ ] Environment variables set in all platforms
- [ ] SSL certificates active (green lock icon)
- [ ] API endpoints responding: `curl https://api.sdn3purwosari.com/api/health`
- [ ] Frontend accessible: https://sdn3purwosari.com
- [ ] Credentials not exposed in code

---

## 🐛 Troubleshooting

### GitHub Actions Failed
- Check build logs in Actions tab
- Run locally: `npm run build --prefix=frontend`
- Verify Node version 18+

### Cloudflare Deployment Failed
- Check build output directory
- Verify VITE_ prefixed env vars
- Check Pages build logs

### Supabase Connection Error
- Verify DATABASE_URL format
- Check connection string in Settings
- Ensure IP not blocked (disable firewall)

### Backend Not Responding
- Check Railway logs
- Verify PORT env var set
- Test locally: `npm run dev --prefix=backend`

---

## 📚 Documentation

- **[AUTOMATED_SETUP.md](AUTOMATED_SETUP.md)** - Detailed setup guide
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - GitHub secrets configuration
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Full deployment procedure
- **[API.md](API.md)** - API endpoints documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture

---

## ⚡ Commands Reference

```bash
# Development
npm run dev                    # Run frontend + backend
npm run dev --prefix=frontend  # Frontend only
npm run dev --prefix=backend   # Backend only

# Production Build
npm run build                  # Build frontend + backend
npm start --prefix=backend     # Start production backend

# Database
npm run db:migrate            # Run migrations
bash supabase-setup.sh        # Setup Supabase

# Cleanup
npm run clean                 # Remove build artifacts
```

---

## 📞 Support

- GitHub Issues: https://github.com/sibersaga/sdn3-purwosari/issues
- Documentation: See docs/ folder
- Email: [Your email]

---

**Happy Deploying! 🎉**

Generated: $(date)
