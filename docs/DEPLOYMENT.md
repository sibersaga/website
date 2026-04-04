# Deployment Guide

## Prerequisites

- Node.js 18+ installed locally
- Git account (GitHub, GitLab, Bitbucket)
- Supabase account (free tier available)
- Cloudflare account (free tier available)

## Frontend Deployment (Cloudflare Pages)

### Step 1: Prepare Frontend for Production

```bash
cd frontend
npm install
npm run build
```

Verify `frontend/dist/` folder is created.

### Step 2: Push to Git Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: SDN 3 Purwosari website"
git remote add origin https://github.com/yourusername/sdn3-purwosari.git
git push -u origin main
```

### Step 3: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Pages** from left sidebar
3. Click **Create a project**
4. Connect your GitHub account
5. Select the `sdn3-purwosari` repository
6. Configure build settings:
   - **Framework**: Vite
   - **Build command**: `npm run build --prefix=frontend`
   - **Build output directory**: `frontend/dist`
   - **Root directory**: `/` (leave empty if not using monorepo structure)

7. Add Environment Variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_API_URL=https://api.yourdomain.com
   ```

8. Click **Save and Deploy**

### Step 4: Configure Custom Domain

1. In Cloudflare Pages settings, go to **Custom domains**
2. Add your domain (e.g., `sdn3purwosari.com`)
3. Verify DNS settings point to Cloudflare
4. Wait for SSL certificate to be issued (usually 2-5 minutes)

### Step 5: Setup Automatic Deployments

Cloudflare will automatically:
- Deploy when you push to `main` branch
- Preview deployments for pull requests
- Rollback previous versions if needed

---

## Backend Deployment

### Option 1: Supabase Edge Functions (Recommended for Beginners)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase project locally
supabase init

# Deploy function
supabase functions deploy api --no-verify-jwt
```

Then expose function as API endpoint in Supabase dashboard.

### Option 2: Railway (Recommended for Full Control)

1. Go to [Railway.app](https://railway.app)
2. Click **New Project**
3. Select **GitHub Repo** (push your code to GitHub)
4. Add environment variables:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-key
   DATABASE_URL=postgresql://...
   NODE_ENV=production
   PORT=3001
   ```

5. Railway auto-deploys when you push to main branch

### Option 3: Traditional VPS/Server

```bash
# SSH into your server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/yourusername/sdn3-purwosari.git
cd sdn3-purwosari/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with production values

# Build TypeScript
npm run build

# Install PM2 (process manager)
npm install -g pm2

# Start application
pm2 start dist/server.js --name "sdn3-api"
pm2 startup
pm2 save

# Setup reverse proxy (Nginx example)
sudo nano /etc/nginx/sites-available/api.yourdomain.com
```

Nginx config:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable SSL with Certbot:
```bash
sudo certbot --nginx -d api.yourdomain.com
```

---

## Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Click **Start your project**
3. Sign in with GitHub
4. Create a new organization
5. Create a new project with:
   - Name: `sdn3-purwosari`
   - Password: Strong, unique password
   - Region: Closest to your location
   - Pricing: Free tier or Pro

### Step 2: Run Migrations

```bash
# Get connection string from Supabase dashboard
# Settings → Database → Connection string

# Option 1: Using psql (PostgreSQL client)
psql "postgresql://user:password@db.xxxxx.supabase.co:5432/postgres" < backend/supabase/migrations/001_initial_schema.sql

# Option 2: Via Supabase SQL Editor
# 1. Go to Supabase Dashboard
# 2. Select SQL Editor
# 3. Create new query
# 4. Paste contents of 001_initial_schema.sql
# 5. Run query
```

### Step 3: Setup Authentication

1. In Supabase dashboard: **Authentication → Providers**
2. Enable Email/Password authentication
3. Configure email templates
4. Setup SMTP for transactional emails (optional)

### Step 4: Setup Storage

1. Go to **Storage** section
2. Create new bucket: `school-gallery`
3. Create new bucket: `user-uploads`
4. Configure access policies:
   ```sql
   -- Public read access for gallery
   CREATE POLICY "Public read access" ON storage.objects
     FOR SELECT
     USING (bucket_id = 'school-gallery');
   ```

### Step 5: Enable Row Level Security (RLS)

```sql
-- Enable RLS on tables
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON public.news
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can read their own complaints" ON public.complaints
  FOR SELECT
  USING (auth.uid() = created_by OR is_anonymous = false);
```

---

## Environment Variables Configuration

### Frontend (.env.production)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-published-anon-key
VITE_API_URL=https://api.yourdomain.com
```

### Backend (.env.production)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=generate-a-strong-random-string-here
```

**How to generate strong secrets:**
```bash
# Using openssl (available on macOS/Linux)
openssl rand -base64 32

# Or use this Node.js one-liner
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## SSL/TLS Certificate

### Cloudflare Pages (Automatic)
- ✅ Free SSL certificate included
- ✅ Auto-renewal
- ✅ No configuration needed

### Custom Backend Domain

**Option 1: Let's Encrypt (Free)**
```bash
sudo apt-get install certbot
sudo certbot certonly --standalone -d api.yourdomain.com
```

**Option 2: Cloudflare**
1. Configure nameservers to point to Cloudflare
2. Cloudflare auto-provisions SSL

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install --prefix=frontend
      
      - name: Build
        run: npm run build --prefix=frontend
      
      - name: Deploy to Cloudflare
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: sdn3-purwosari
          directory: frontend/dist

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install --prefix=backend
      
      - name: Run tests
        run: npm test --prefix=backend
      
      - name: Deploy to Railway
        uses: railway-app/deploy-action@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          service: sdn3-api
```

---

## Monitoring & Logging

### Frontend Monitoring
```javascript
// Add to frontend
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### Backend Logging
```javascript
// Already configured with Morgan
import morgan from 'morgan';
app.use(morgan('combined')); // Detailed logging
```

### Database Monitoring
- Use Supabase dashboard for query performance
- Enable slow query log
- Monitor connection pool

---

## Backup Strategy

### Automatic Backups
- Supabase provides daily backups (free tier)
- Point-in-time recovery available

### Manual Backup
```bash
# Backup database
pg_dump "postgresql://user:password@db.xxxxx.supabase.co:5432/postgres" > backup.sql

# Backup storage
aws s3 sync s3://your-bucket ./backup/
```

---

## Health Checks & Monitoring

### Frontend
```javascript
// Monitor 404s, errors, performance
if (import.meta.env.PROD) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}
```

### Backend
```bash
# Monitor endpoint
curl https://api.yourdomain.com/api/health
# Should return: { "status": "OK" }
```

### Database
```sql
-- Check connection count
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;
```

---

## Troubleshooting

### Frontend won't deploy
- Check build command is correct
- Verify build output directory exists
- Check environment variables are set
- Review build logs in Cloudflare dashboard

### Backend API not responding
- Check server logs: `journalctl -u sdn3-api -f`
- Verify environment variables
- Check database connection: `psql $DATABASE_URL`
- Verify CORS settings

### Database connection errors
- Verify connection string
- Check IP whitelist in Supabase
- Verify credentials are correct
- Check firewall rules

### CORS Issues
- Add frontend domain to backend CORS_ORIGIN
- Verify request has proper headers
- Check browser console for errors

---

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Setup monitoring & error tracking
- [ ] Configure email for notifications
- [ ] Setup database backups
- [ ] Enable HTTPS everywhere
- [ ] Configure CDN caching rules
- [ ] Setup SSL/TLS certificate auto-renewal
- [ ] Create database user for application
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Setup uptime monitoring
- [ ] Configure rate limiting
- [ ] Enable HSTS headers
- [ ] Setup content security policy
- [ ] Test disaster recovery procedures

---

## Support

For issues or questions:
- Check Cloudflare status page
- Check Supabase status page
- Review error logs
- Contact support teams
- File GitHub issues

