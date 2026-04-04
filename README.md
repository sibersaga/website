# SDN 3 Purwosari Website

Website resmi SDN 3 Purwosari Wonogiri - Platform pendidikan digital yang modern, responsif, dan user-friendly.

## 📋 Struktur Proyek

```
SiberSaga/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/               # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env.example
│
├── backend/                  # Express + Node.js + Supabase
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript interfaces
│   │   └── server.ts         # Express server
│   ├── supabase/
│   │   └── migrations/       # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/                     # Documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── ARCHITECTURE.md       # Architecture overview
│   └── API.md                # API documentation
│
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Frontend (Cloudflare)

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend (Supabase)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials and database connection

# Run migrations (first time setup)
npm run migrate

# Development server
npm run dev

# Build TypeScript
npm run build

# Production start
npm start
```

## 📱 Features

- ✅ Responsive Design (Mobile-first approach)
- ✅ Dark Mode Support
- ✅ Admin Dashboard for Content Management
- ✅ Gallery Management with Image Upload
- ✅ News & Announcements System
- ✅ Complaint/Suggestion System (Layanan Aduan)
- ✅ Teacher Directory
- ✅ Academic Calendar
- ✅ Testimonials Section
- ✅ Extracurricular Information
- ✅ SEO Optimized
- ✅ PWA Ready (Progressive Web App)

## 🔧 Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **State Management**: React Hooks + localStorage (upgradeable to Redux/Zustand)
- **Animation**: Motion (Framer Motion alternative)
- **Icons**: Lucide React
- **Database Client**: Supabase.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4
- **ORM**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **Validation**: Express Validator
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **TypeScript**: Full type support

### Hosting
- **Frontend**: Cloudflare Pages
- **Backend**: Supabase Functions (atau Railway, Render, etc)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (untuk images)

## 🔐 Security Checklist

- [ ] Change hardcoded admin password (currently: `$Sdn3purwosari`)
- [ ] Set strong JWT secret in `.env`
- [ ] Enable Row Level Security (RLS) on Supabase
- [ ] Setup rate limiting on API endpoints
- [ ] Enable HTTPS everywhere
- [ ] Configure CORS properly for production
- [ ] Add API key validation
- [ ] Setup monitoring & error tracking
- [ ] Regular security audits
- [ ] Backup strategy for database

## 📝 Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.yourdomain.com
```

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your-very-secure-secret-key
```

## 🚀 Deployment

### Frontend to Cloudflare Pages

```bash
# 1. Connect your GitHub repository to Cloudflare Pages
# 2. Set build command: npm run build --prefix=frontend
# 3. Set build output directory: frontend/dist
# 4. Add environment variables in Cloudflare dashboard
```

### Backend to Supabase Functions / Railway

```bash
# Option 1: Supabase Edge Functions
# Copy backend/src files to supabase/functions/api

# Option 2: Railway / Render
# Push code to Git, auto-deploy from there
```

## 📊 Database Schema

Struktur database sudah tersedia di `backend/supabase/migrations/001_initial_schema.sql`

Key tables:
- `schools` - School information
- `news` - News & announcements
- `gallery` - Photo gallery
- `teachers` - Teacher directory
- `complaints` - Suggestions & complaints
- `events` - Academic calendar
- `extracurriculars` - Extracurricular activities
- `testimonials` - Student/parent testimonials
- `users` - Admin users

## 🐛 Issues & Improvements Needed

### Critical
1. **Hardcoded Credentials**: Admin password is hardcoded in App.tsx
   - ⚠️ Move to backend authentication
   - ⚠️ Implement proper login system with JWT

2. **Local Storage**: Data stored in localStorage only (client-side)
   - ⚠️ Migrate to Supabase PostgreSQL
   - ⚠️ Setup backend API endpoints

3. **No Image Upload**: Currently using placeholder images
   - ⚠️ Implement file upload to Supabase Storage
   - ⚠️ Add image optimization

### Important
4. **CORS Issues**: API calls might fail cross-origin
   - ✓ Setup proper CORS in backend
   - ✓ Configure Cloudflare settings

5. **Error Handling**: Limited error handling
   - ⚠️ Add comprehensive error boundaries
   - ⚠️ Setup error logging service

6. **Performance**: Large monolithic component
   - ⚠️ Break down App.tsx into smaller components
   - ⚠️ Implement code splitting & lazy loading

7. **SEO**: Not optimized for search engines
   - ⚠️ Add meta tags & schema.org markup
   - ⚠️ Implement sitemap & robots.txt

8. **Testing**: No test files
   - ⚠️ Add unit tests (Jest + React Testing Library)
   - ⚠️ Add E2E tests (Cypress/Playwright)

### Recommended
9. **State Management**: Using React hooks + localStorage
   - ⚠️ Consider Redux/Zustand for complex state
   - ⚠️ Add persistence layer

10. **Type Safety**: Some `any` types present
    - ⚠️ Remove all `any` types
    - ⚠️ Add strict TypeScript config

11. **Documentation**: Minimal inline documentation
    - ⚠️ Add JSDoc comments
    - ⚠️ Create architecture diagrams

12. **CI/CD**: No automated tests/deployment
    - ⚠️ Setup GitHub Actions workflow
    - ⚠️ Add pre-commit hooks

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com)
- [Cloudflare Pages Guide](https://developers.cloudflare.com/pages)

## 📧 Contact & Support

- **Email**: sdn3purwosari@gmail.com
- **Instagram**: @sdn3purwosari
- **YouTube**: SDN 3 Purwosari Official
- **TikTok**: @sdn3purwosari_wonogiri

## 📄 License

Proprietary - SDN 3 Purwosari

---

**Last Updated**: April 4, 2026
**Maintained By**: SDN 3 Purwosari Development Team
