# Architecture Overview

## Project Structure

```
sdn3-purwosari/
├── frontend/           # React SPA (Cloudflare Pages)
├── backend/            # Express API (Supabase/Railway)
└── docs/               # Documentation
```

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│              Cloudflare CDN/Pages                    │
│         (Frontend Distribution Layer)                │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│         React Frontend (Vite Build)                  │
│   - Components, Pages, Hooks                         │
│   - State Management (localStorage/Zustand)          │
│   - Tailwind CSS Styling                             │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────┐
│           Express Backend API                        │
│   - REST Endpoints                                   │
│   - Authentication & Authorization                   │
│   - Business Logic & Validation                      │
└────────────────────┬────────────────────────────────┘
                     │ SQL
                     ▼
┌─────────────────────────────────────────────────────┐
│        Supabase (PostgreSQL Database)                │
│   - Schools, News, Gallery, Teachers                 │
│   - Complaints, Events, Users                        │
│   - File Storage (Images)                            │
└─────────────────────────────────────────────────────┘
```

## Data Flow

### 1. News Management
```
Admin Dashboard → API (/api/news) → Supabase DB → Frontend Display
```

### 2. Image Upload
```
Frontend Upload → Supabase Storage → API Reference → Database → Frontend Display
```

### 3. Complaint System
```
User Form → API (/api/complaints) → Email Notification → Admin Review → Response
```

## Key Components

### Frontend Components
- **Navigation**: Header with dropdown menus, mobile hamburger
- **Hero Section**: Main banner with CTA buttons
- **Gallery**: Image carousel with filtering
- **News Feed**: Article cards with pagination
- **Admin Panel**: Content management interface
- **Forms**: Contact, complaint submission, newsletter

### Backend Endpoints
- `GET /api/health` - Health check
- `GET /api/schools/:id` - School information
- `GET /api/news` - List news articles
- `POST /api/complaints` - Submit complaint
- `GET/POST /api/gallery` - Gallery management
- `GET /api/teachers` - Teacher directory
- `GET /api/events` - Academic calendar

### Database Tables
```
schools
├── id (UUID PK)
├── name, email, phone
├── address, website
├── vision, mission
└── accreditation_status

news
├── id (UUID PK)
├── school_id (FK)
├── title, content
├── category
└── featured_image

gallery
├── id (UUID PK)
├── school_id (FK)
├── image_url
├── category
└── description

teachers
├── id (UUID PK)
├── school_id (FK)
├── name, nip, position
├── email, phone
└── profile_image

complaints
├── id (UUID PK)
├── school_id (FK)
├── name, email, content
├── complaint_type
├── status (pending/resolved)
└── response_text

events
├── id (UUID PK)
├── school_id (FK)
├── title, event_date
├── event_type
└── location

users
├── id (UUID PK)
├── school_id (FK)
├── username, email
├── password_hash
└── role
```

## Authentication Flow

```
Login Attempt
    ↓
POST /api/auth/login
    ↓
Verify Credentials
    ↓
Generate JWT Token
    ↓
Return Token
    ↓
Store in localStorage
    ↓
Include in API Requests (Authorization Header)
    ↓
Verify Token on Protected Routes
    ↓
Access Granted/Denied
```

## Deployment Architecture

### Frontend (Cloudflare Pages)
```
Git Push → GitHub Webhook → Cloudflare Build → Deploy to CDN
```

### Backend (Supabase Functions or Railway)
```
Git Push → CI/CD Pipeline → Build Docker Image → Deploy Container
```

### Database (Supabase)
```
Auto Backups → Point-in-time Recovery → Replication Available
```

## Security Layers

1. **Frontend**
   - HTTPS/TLS Encryption
   - CSP (Content Security Policy)
   - CORS Protection

2. **Backend**
   - JWT Authentication
   - Input Validation & Sanitization
   - Rate Limiting
   - Helmet (Security Headers)

3. **Database**
   - Row Level Security (RLS)
   - Encrypted Passwords (bcrypt)
   - Parameterized Queries (SQL Injection Prevention)
   - Regular Backups

## Performance Optimization

### Frontend
- Code Splitting (Lazy Loading)
- Image Optimization (WebP, Compression)
- Minification & Tree Shaking
- Caching Strategies (Service Worker)
- CDN Distribution (Cloudflare)

### Backend
- Database Indexing
- Query Optimization
- Caching Layer (Redis optional)
- Compression (gzip)
- Load Balancing

## Monitoring & Logging

- **Frontend**: Error tracking (Sentry optional)
- **Backend**: Request logging (Morgan)
- **Database**: Query logs & performance monitoring
- **Deployment**: CI/CD pipeline logs

## Scaling Strategy

### Current (MVP)
- Single backend instance
- Shared database
- CDN-distributed frontend

### Future (Enterprise)
- Multiple backend instances
- Read replicas for database
- Microservices architecture
- Dedicated storage service
- Message queue (for async jobs)
