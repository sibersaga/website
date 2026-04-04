#!/bin/bash

# Supabase Automated Setup Script
# This script creates and configures a new Supabase project

set -e

echo "🚀 Supabase Automated Setup"
echo "============================"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "📥 Installing Supabase CLI..."
    npm install -g supabase
fi

echo "Supabase CLI is installed ✓"
echo ""

# Get Supabase credentials
read -p "Enter your Supabase Project Reference: " PROJECT_REF
read -p "Enter your Supabase Project Name: " PROJECT_NAME
read -sp "Enter your Supabase Access Token: " SUPABASE_ACCESS_TOKEN
echo ""

# Initialize Supabase project
echo ""
echo "📋 Initializing Supabase project..."

if [ ! -d supabase ]; then
    supabase init
    echo "✓ Initialized Supabase"
else
    echo "⚠ Supabase directory already exists"
fi

# Link to Supabase project
echo ""
echo "🔗 Linking to Supabase project..."
export SUPABASE_ACCESS_TOKEN
supabase link --project-ref "$PROJECT_REF"
echo "✓ Linked to Supabase"

# Pull remote schema
echo ""
echo "📥 Pulling remote schema..."
supabase db pull
echo "✓ Pulled schema"

# Run migrations
echo ""
echo "🔄 Running database migrations..."
supabase migration up
echo "✓ Migrations completed"

# Get project info
echo ""
echo "📊 Fetching project information..."
SUPABASE_URL="https://${PROJECT_REF}.supabase.co"
echo ""
echo "✅ Supabase Setup Complete!"
echo ""
echo "Project Information:"
echo "  URL: $SUPABASE_URL"
echo "  Project Ref: $PROJECT_REF"
echo ""

# Save to .env file
cat > .env.supabase << EOF
SUPABASE_URL=$SUPABASE_URL
SUPABASE_PROJECT_REF=$PROJECT_REF
EOF

echo "Saved to .env.supabase"
echo ""
echo "Next steps:"
echo "  1. Get your API keys from: $SUPABASE_URL/auth/users"
echo "  2. Update frontend/.env with VITE_SUPABASE_ANON_KEY"
echo "  3. Update backend/.env with SUPABASE_SERVICE_KEY"
echo ""
