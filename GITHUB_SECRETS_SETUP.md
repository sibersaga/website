# GitHub Secrets Setup Guide

Untuk menjalankan GitHub Actions workflow dengan benar, Anda perlu mengatur GitHub Secrets.

## Setup Langkah-demi-Langkah

### 1. Buka GitHub Secrets Settings
- Pergi ke: https://github.com/sibersaga/website/settings/secrets/actions
- Klik **"New repository secret"** untuk setiap secret

### 2. Tambahkan Frontend Secrets

#### VITE_SUPABASE_URL
- **Deskripsi:** URL Supabase project Anda
- **Format:** `https://your-project.supabase.co`
- **Dari mana:** Supabase Project Settings → API → Project URL

#### VITE_SUPABASE_ANON_KEY
- **Deskripsi:** Supabase Anonymous Key untuk frontend
- **Dari mana:** Supabase Project Settings → API → Anon Key

#### VITE_API_URL
- **Deskripsi:** URL backend API
- **Format:** `https://api.sdn3purwosari.com`

### 3. Tambahkan Deployment Secrets

#### CLOUDFLARE_API_TOKEN
- **Deskripsi:** Cloudflare API Token untuk Pages deployment
- **Dari mana:** Cloudflare Dashboard → Account → API Tokens → Create Token
- **Permissions:** 
  - Cloudflare Pages - Edit
  - Account - Account Firewall Policies (Read)

#### CLOUDFLARE_ACCOUNT_ID
- **Deskripsi:** Cloudflare Account ID
- **Dari mana:** Cloudflare Dashboard → Account → Account ID (di sidebar kanan)

#### RAILWAY_TOKEN
- **Deskripsi:** Railway API Token untuk backend deployment
- **Dari mana:** Railway Dashboard → Account Settings → API Tokens → Create

### 4. Tambahkan Optional Secrets

#### SLACK_WEBHOOK
- **Deskripsi:** Slack webhook untuk deployment notifications (opsional)
- **Dari mana:** Slack Workspace → Custom Integrations → Incoming Webhooks

## Verifikasi Setup

Setelah menambahkan semua secrets:

1. Buka **Actions** tab di GitHub
2. Lihat workflow run terbaru
3. Cek apakah workflow berhasil tanpa errors

## Troubleshooting

### Workflow Gagal dengan "Missing secrets"
- Pastikan nama secret **PERSIS** sama dengan yang di workflow file
- Secrets bersifat case-sensitive

### Build Gagal karena Missing Environment Variables
- Pastikan semua secrets yang dibutuhkan sudah ditambahkan
- Cek `.env.example` untuk list lengkap variabel yang diperlukan

### Deployment Gagal
- Cek logs di GitHub Actions untuk error detail
- Verifikasi token masih valid di platform deployment
- Pastikan project name di Cloudflare/Railway sesuai

## Security Best Practices

✅ **Lakukan:**
- Rotate tokens secara berkala (setiap 3-6 bulan)
- Gunakan token dengan minimal permissions yang diperlukan
- Review secrets settings secara berkala

❌ **Jangan:**
- Jangan hardcode secrets di file (sudah diperbaiki)
- Jangan share secrets dengan publik
- Jangan commit `.env` files ke repository
