-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Schools Table
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  website VARCHAR(255),
  established_year INTEGER,
  accreditation_status VARCHAR(50),
  principal_name VARCHAR(255),
  vision TEXT,
  mission TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);

-- News/Announcements Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  featured_image VARCHAR(500),
  author_id UUID,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(255),
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  uploaded_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  nip VARCHAR(50),
  position VARCHAR(100),
  specialization VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  profile_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);

-- Complaints/Aduan Table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  complaint_type VARCHAR(50),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  avatar_emoji VARCHAR(10),
  is_anonymous BOOLEAN DEFAULT true,
  response_text TEXT,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events/Calendar Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  event_type VARCHAR(50),
  description TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extracurriculars Table
CREATE TABLE IF NOT EXISTS extracurriculars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  supervisor_id UUID REFERENCES teachers(id),
  meeting_schedule VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (for admin)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_news_school_id ON news(school_id);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_gallery_school_id ON gallery(school_id);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_complaints_school_id ON complaints(school_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_events_school_id ON events(school_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_testimonials_school_id ON testimonials(school_id);

-- RLS (Row Level Security) Policies - Uncomment when using RLS
-- ALTER TABLE news ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Sample school data
INSERT INTO schools (name, email, phone, address, established_year, accreditation_status, principal_name, vision, mission)
VALUES (
  'SDN 3 Purwosari',
  'sdn3purwosari@gmail.com',
  '+62-271-395141',
  'Sumbersari, Desa Purwosari, Kecamatan Wonogiri, Kabupaten Wonogiri, Jawa Tengah',
  1985,
  'B',
  'Titik Purwanti, S.Pd',
  'Menjadi lembaga pendidikan unggulan yang menghasilkan generasi beriman, bertaqwa, cerdas, kreatif, dan inovatif.',
  'Meningkatkan mutu pendidikan melalui inovasi pembelajaran digital dan pengembangan karakter berbasis nilai luhur.'
) ON CONFLICT DO NOTHING;
