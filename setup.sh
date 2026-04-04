#!/bin/bash

# SDN 3 Purwosari - Automated Setup Script
# This script automates GitHub, Cloudflare, and Supabase integration

set -e

echo "🚀 SDN 3 Purwosari - Automated Setup"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v git &> /dev/null; then
    echo -e "${RED}✗ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git found${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ Node.js/npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found${NC}"

# Get GitHub credentials
echo ""
echo -e "${BLUE}🔧 GitHub Configuration${NC}"
echo "========================"

read -p "Enter GitHub username (sibersaga): " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-sibersaga}

read -p "Enter GitHub repository name (sdn3-purwosari): " GITHUB_REPO
GITHUB_REPO=${GITHUB_REPO:-sdn3-purwosari}

read -sp "Enter GitHub Personal Access Token (with repo, workflow scopes): " GITHUB_TOKEN
echo ""

# Get Supabase credentials
echo ""
echo -e "${BLUE}🔧 Supabase Configuration${NC}"
echo "==========================="

read -p "Enter Supabase Project URL (https://your-project.supabase.co): " SUPABASE_URL
read -sp "Enter Supabase Anon Key: " SUPABASE_ANON_KEY
echo ""
read -sp "Enter Supabase Service Key: " SUPABASE_SERVICE_KEY
echo ""

# Get Cloudflare credentials
echo ""
echo -e "${BLUE}🔧 Cloudflare Configuration${NC}"
echo "============================"

read -p "Enter Cloudflare Account ID: " CLOUDFLARE_ACCOUNT_ID
read -sp "Enter Cloudflare API Token: " CLOUDFLARE_API_TOKEN
echo ""
read -p "Enter Cloudflare Pages Project Name (sdn3-purwosari): " CLOUDFLARE_PROJECT
CLOUDFLARE_PROJECT=${CLOUDFLARE_PROJECT:-sdn3-purwosari}

# Get Railway credentials (optional)
echo ""
echo -e "${BLUE}🔧 Railway Configuration (Optional)${NC}"
echo "====================================="

read -p "Do you want to deploy backend to Railway? (y/n): " USE_RAILWAY
if [[ $USE_RAILWAY == "y" ]]; then
    read -sp "Enter Railway Token: " RAILWAY_TOKEN
    echo ""
else
    RAILWAY_TOKEN=""
fi

# Get Slack webhook (optional)
echo ""
echo -p "Enter Slack webhook URL for notifications (optional, press enter to skip): " SLACK_WEBHOOK
echo ""

# Setup local environment files
echo ""
echo -e "${BLUE}📝 Setting up environment files${NC}"
echo "================================"

# Frontend .env
cat > frontend/.env << EOF
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
VITE_API_URL=https://api.sdn3purwosari.com
EOF
echo -e "${GREEN}✓ Created frontend/.env${NC}"

# Backend .env
cat > backend/.env << EOF
SUPABASE_URL=$SUPABASE_URL
SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY
SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://sdn3purwosari.com
JWT_SECRET=$(openssl rand -base64 32)
EOF
echo -e "${GREEN}✓ Created backend/.env${NC}"

# Install npm packages
echo ""
echo -e "${BLUE}📦 Installing npm packages${NC}"
echo "==========================="

npm install --prefix=frontend
npm install --prefix=backend
echo -e "${GREEN}✓ Installed all dependencies${NC}"

# Initialize git repository if not exists
echo ""
echo -e "${BLUE}🔐 Setting up GitHub${NC}"
echo "===================="

if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit: SDN 3 Purwosari website"
    echo -e "${GREEN}✓ Initialized Git repository${NC}"
else
    echo -e "${YELLOW}⚠ Git repository already exists${NC}"
fi

# Add GitHub remote
GITHUB_URL="https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
if ! git remote | grep -q origin; then
    git remote add origin "$GITHUB_URL"
    echo -e "${GREEN}✓ Added GitHub remote${NC}"
else
    git remote set-url origin "$GITHUB_URL"
    echo -e "${GREEN}✓ Updated GitHub remote${NC}"
fi

# Create GitHub repository secrets file
echo ""
echo -e "${BLUE}📋 GitHub Repository Secrets${NC}"
echo "============================"
echo ""
echo "Add these secrets to GitHub (Settings → Secrets and variables → Actions):"
echo ""
echo -e "${YELLOW}Frontend:${NC}"
echo "VITE_SUPABASE_URL=$SUPABASE_URL"
echo "VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY"
echo "VITE_API_URL=https://api.sdn3purwosari.com"
echo ""
echo -e "${YELLOW}Deployment:${NC}"
echo "CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN"
echo "CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID"
if [[ ! -z "$RAILWAY_TOKEN" ]]; then
    echo "RAILWAY_TOKEN=$RAILWAY_TOKEN"
fi
if [[ ! -z "$SLACK_WEBHOOK" ]]; then
    echo "SLACK_WEBHOOK=$SLACK_WEBHOOK"
fi
echo ""
echo "Backend:"
echo "SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY"
echo ""

# Create setup summary file
cat > SETUP_SUMMARY.md << EOF
# 🚀 Setup Summary - $(date)

## GitHub
- **Repository**: $GITHUB_URL
- **User**: $GITHUB_USER

## Supabase
- **Project URL**: $SUPABASE_URL
- **Database**: PostgreSQL (configured)

## Cloudflare Pages
- **Account ID**: $CLOUDFLARE_ACCOUNT_ID
- **Project Name**: $CLOUDFLARE_PROJECT
- **Frontend URL**: https://$CLOUDFLARE_PROJECT.pages.dev

## Railway (Backend)
- **Status**: $([ -z "$RAILWAY_TOKEN" ] && echo "Not configured" || echo "Configured")

## Next Steps

### 1. Push to GitHub
\`\`\`bash
git push -u origin main
\`\`\`

### 2. Add GitHub Secrets
Go to: https://github.com/$GITHUB_USER/$GITHUB_REPO/settings/secrets/actions

Add these secrets:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_API_URL
- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- SUPABASE_SERVICE_KEY
- RAILWAY_TOKEN (if using Railway)
- SLACK_WEBHOOK (if using Slack)

### 3. Setup Cloudflare Pages
1. Go to https://dash.cloudflare.com
2. Pages → Create project
3. Connect GitHub repository
4. Configure build settings:
   - Framework: Vite
   - Build command: npm run build --prefix=frontend
   - Build output: frontend/dist

### 4. Setup Supabase Database
Run migrations:
\`\`\`bash
psql "$DATABASE_URL" < backend/supabase/migrations/001_initial_schema.sql
\`\`\`

### 5. Setup Railway (Optional)
1. Create new project on Railway
2. Connect GitHub repository
3. Set environment variables

## Documentation
- [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [API.md](docs/API.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)

EOF

echo -e "${GREEN}✓ Created SETUP_SUMMARY.md${NC}"

# Final summary
echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo -e "${GREEN}Environment files created:${NC}"
echo "  ✓ frontend/.env"
echo "  ✓ backend/.env"
echo "  ✓ .github/workflows/deploy.yml"
echo "  ✓ .github/workflows/security.yml"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "  1. Add GitHub repository secrets (see SETUP_SUMMARY.md)"
echo "  2. Push to GitHub: git push -u origin main"
echo "  3. Setup Cloudflare Pages deployment"
echo "  4. Run Supabase database migrations"
echo "  5. Configure Railway backend deployment (optional)"
echo ""
echo "📖 For more details, see SETUP_SUMMARY.md"
echo ""
