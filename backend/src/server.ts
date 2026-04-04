import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK',
    message: 'Backend API SDN 3 Purwosari is running',
    timestamp: new Date().toISOString()
  });
});

// Routes placeholder
app.use('/api/auth', (req: Request, res: Response) => {
  res.json({ message: 'Auth routes coming soon' });
});

app.use('/api/schools', (req: Request, res: Response) => {
  res.json({ message: 'School data routes coming soon' });
});

app.use('/api/news', (req: Request, res: Response) => {
  res.json({ message: 'News routes coming soon' });
});

app.use('/api/gallery', (req: Request, res: Response) => {
  res.json({ message: 'Gallery routes coming soon' });
});

app.use('/api/complaints', (req: Request, res: Response) => {
  res.json({ message: 'Complaint/Aduan routes coming soon' });
});

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✓ Backend server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
