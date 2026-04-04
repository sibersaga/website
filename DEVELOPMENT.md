# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account (free tier available)
- Text editor (VS Code recommended)

### Initial Setup

```bash
# 1. Clone or download the repository
git clone https://github.com/yourusername/sdn3-purwosari.git
cd sdn3-purwosari

# 2. Setup Frontend
cd frontend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install

# 3. Setup Backend (in new terminal)
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install

# 4. Start Development Servers

# Terminal 1 - Frontend
cd frontend
npm run dev
# Runs on http://localhost:3000

# Terminal 2 - Backend
cd backend
npm run dev
# Runs on http://localhost:3001
```

---

## Project Structure

```
sdn3-purwosari/
├── frontend/
│   ├── src/
│   │   ├── App.tsx                 # Main component
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom hooks
│   │   ├── utils/                  # Utility functions
│   │   └── types/                  # TypeScript interfaces
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML template
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── tsconfig.json               # TypeScript config
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── server.ts               # Express server
│   │   ├── routes/                 # API routes
│   │   ├── controllers/            # Business logic
│   │   ├── middleware/             # Custom middleware
│   │   ├── utils/                  # Utility functions
│   │   └── types/                  # TypeScript interfaces
│   ├── supabase/
│   │   └── migrations/             # Database migrations
│   ├── dist/                       # Compiled JavaScript (generated)
│   ├── tsconfig.json               # TypeScript config
│   ├── package.json
│   └── .env.example
│
├── docs/
│   ├── ARCHITECTURE.md             # System architecture
│   ├── DEPLOYMENT.md               # Deployment guide
│   ├── API.md                      # API documentation
│   └── ANALYSIS_AND_RECOMMENDATIONS.md # Issues & improvements
│
├── .gitignore                      # Git ignore rules
├── README.md                       # Project readme
└── DEVELOPMENT.md                  # This file
```

---

## Frontend Development

### Available Scripts

```bash
npm run dev        # Start development server (port 3000)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Type check with TypeScript
npm run clean      # Remove dist folder
```

### Key Technologies

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Animations**: Motion
- **Database**: Supabase
- **Language**: TypeScript

### Folder Organization

#### `/src/components`
Reusable React components. Examples:
- `Navigation.tsx` - Header & navigation
- `Gallery.tsx` - Photo gallery
- `NewsCard.tsx` - News article card

#### `/src/pages`
Page-level components:
- `Home.tsx` - Homepage
- `AdminDashboard.tsx` - Admin panel
- `NewsDetail.tsx` - Single news page

#### `/src/hooks`
Custom React hooks:
- `useSiteData.ts` - Fetch/manage site data
- `useAdmin.ts` - Authentication state
- `useLocalStorage.ts` - Browser storage

#### `/src/utils`
Utility functions:
- `api.ts` - API client
- `helpers.ts` - Helper functions
- `supabase.ts` - Supabase client

#### `/src/types`
TypeScript interfaces:
- `index.ts` - All type definitions

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** in `src/` folder

3. **Test locally**
   ```bash
   npm run dev
   # Check http://localhost:3000
   ```

4. **Type check**
   ```bash
   npm run lint
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   git push origin feature/my-feature
   ```

7. **Create Pull Request** on GitHub

---

## Backend Development

### Available Scripts

```bash
npm run dev      # Start development server with auto-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled server
npm run lint     # Type check with TypeScript
npm run migrate  # Run database migrations
```

### Key Technologies

- **Runtime**: Node.js
- **Framework**: Express 4
- **Database**: Supabase (PostgreSQL)
- **ORM**: Raw SQL + Supabase client (no ORM yet)
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Language**: TypeScript

### API Endpoints Structure

```bash
/api/
├── /health              # Health check
├── /auth/               # Authentication
│   ├── POST /login
│   ├── POST /register
│   └── POST /logout
├── /schools/            # School information
├── /news/               # News & announcements
├── /gallery/            # Photo gallery
├── /teachers/           # Teacher directory
├── /complaints/         # Complaints/suggestions
├── /events/             # Academic calendar
├── /extracurriculars/   # Extracurricular info
└── /testimonials/       # Testimonials
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/api-endpoint
   ```

2. **Create new route** in `src/routes/`
   ```typescript
   // src/routes/news.ts
   import { Router } from 'express';
   
   const router = Router();
   
   router.get('/', async (req, res) => {
     // Implementation
   });
   
   export default router;
   ```

3. **Register route** in `src/server.ts`
   ```typescript
   import newsRoutes from './routes/news.js';
   app.use('/api/news', newsRoutes);
   ```

4. **Test with API client**
   ```bash
   curl http://localhost:3001/api/news
   ```

5. **Add tests** (when setup)
   ```bash
   npm test
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add news API endpoint"
   git push origin feature/api-endpoint
   ```

---

## Database Development

### Setup Supabase Locally (Optional)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to Supabase project
supabase link --project-ref your-project-ref

# Pull remote schema
supabase db pull

# Create migration
supabase migration new create_tables

# Apply migrations
supabase migration up
```

### Database Schema

Main tables in `backend/supabase/migrations/001_initial_schema.sql`:

- `schools` - School information
- `news` - News articles
- `gallery` - Photo gallery
- `teachers` - Teacher directory
- `complaints` - User complaints/suggestions
- `events` - Academic calendar
- `extracurriculars` - Extracurricular activities
- `testimonials` - User testimonials
- `users` - Admin users

### Running Migrations

```bash
# Using psql (PostgreSQL client)
psql "postgresql://user:password@db.supabase.co:5432/postgres" < migrations/001_initial_schema.sql

# Or through Supabase dashboard:
# 1. Go to SQL Editor
# 2. Paste migration SQL
# 3. Run
```

---

## Common Tasks

### Adding a New Page to Frontend

1. Create component in `src/pages/NewPage.tsx`
2. Create route in navigation
3. Add to router (if using React Router)
4. Export from `src/pages/index.ts`

### Adding a New API Endpoint

1. Create route file in `src/routes/resource.ts`
2. Implement controller logic in `src/controllers/resource.ts`
3. Add middleware if needed in `src/middleware/`
4. Register route in `src/server.ts`
5. Document in `docs/API.md`

### Connecting Frontend to New API Endpoint

```typescript
// src/utils/api.ts
export const getNews = async () => {
  const response = await fetch('/api/news');
  return response.json();
};

// In component
import { getNews } from '@/utils/api';

const [news, setNews] = useState([]);

useEffect(() => {
  getNews().then(setNews);
}, []);
```

### Environment Variables

Create `.env` files (never commit to Git):

**Frontend** (`frontend/.env`):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_API_URL=http://localhost:3001
```

**Backend** (`backend/.env`):
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-key
DATABASE_URL=postgresql://...
NODE_ENV=development
PORT=3001
```

---

## Debugging

### Frontend Debugging

```bash
# Use VS Code Debugger
# Set breakpoint and press F5

# Or use browser DevTools
# Press F12 in browser
# Check Console, Network, React Dev Tools
```

### Backend Debugging

```bash
# Add console.log for quick debugging
console.log('Debug:', variable);

# Run with debugger
node --inspect dist/server.js

# Then visit chrome://inspect in Chrome
```

### API Testing Tools

- **Postman**: https://postman.com
- **Insomnia**: https://insomnia.rest
- **REST Client** (VS Code Extension)

---

## Code Style & Standards

### TypeScript

- Use strict mode
- No `any` types
- Define interfaces for objects

### Naming Conventions

- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Files**: Match component name (e.g., `Button.tsx` for `<Button />`)

### Commit Messages

Follow conventional commits:

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Comments

```typescript
// Use for brief explanations
/* Use for longer, multi-line explanations */

// Add JSDoc for functions
/**
 * Fetches user data from API
 * @param userId - The user's ID
 * @returns User object
 */
function getUser(userId: string) { }
```

---

## Testing (Future)

Once testing is setup:

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Performance Tips

### Frontend

1. Use lazy loading for images
2. Code split large components
3. Avoid unnecessary re-renders
4. Use React.memo for expensive components
5. Profile with React DevTools Profiler

### Backend

1. Use database indexes
2. Cache responses
3. Implement pagination
4. Use connection pooling
5. Monitor slow queries

---

## Troubleshooting

### Frontend Issues

**Port 3000 already in use**
```bash
# Kill process
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

**CORS errors**
- Ensure backend has correct CORS settings
- Check API URL in .env
- Verify request headers

**Module not found**
- Check file spelling
- Verify import paths
- Clear node_modules: `rm -rf node_modules && npm install`

### Backend Issues

**Port 3001 already in use**
```bash
# Kill process
npx kill-port 3001
```

**Cannot connect to database**
- Verify DATABASE_URL
- Check IP whitelist in Supabase
- Test connection: `psql $DATABASE_URL`

**TypeScript errors**
- Run `npm run lint` to see all errors
- Update types in `src/types/`

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: describe changes"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
# Review and merge

# Delete local branch
git branch -d feature/my-feature
```

---

## Resources

- **React Docs**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Vite Guide**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Express Guide**: https://expressjs.com
- **Supabase Docs**: https://supabase.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

## Getting Help

1. Check the documentation in `/docs`
2. Search GitHub issues
3. Review code comments
4. Ask team members
5. Check Stack Overflow

---

## Code Review Checklist

Before submitting PR:

- [ ] Code follows style guide
- [ ] TypeScript has no errors
- [ ] All tests pass
- [ ] No hardcoded values
- [ ] Environment variables used
- [ ] Error handling included
- [ ] Code is documented
- [ ] Performance optimized
- [ ] No sensitive data exposed
- [ ] Changes are tested locally

---

**Last Updated**: April 4, 2026
**Maintained By**: Development Team
