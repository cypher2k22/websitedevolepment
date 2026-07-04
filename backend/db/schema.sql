-- Database Schema for CodeJourney

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 100,
  badges JSONB DEFAULT '[]',
  completed_projects JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  technology VARCHAR(100) NOT NULL,
  starter_code JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS milestones (
  id VARCHAR(255) NOT NULL,
  project_id VARCHAR(255) REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  desc_text TEXT NOT NULL,
  PRIMARY KEY (id, project_id)
);

CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  project_id VARCHAR(255) REFERENCES projects(id) ON DELETE CASCADE,
  tech VARCHAR(100) NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  last_completed_milestone VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, project_id)
);
