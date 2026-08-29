import { JobListing, JobFilterParams } from './types';
import initialJobs from '../data/jobs.json';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'jobs.json');
const TMP_FILE_PATH = path.join('/tmp', 'jobs.json');

// In-memory memory fallback if file system is read-only (like Vercel serverless functions)
let memoryJobs: JobListing[] = (initialJobs as unknown) as JobListing[];

function loadRawJobs(): JobListing[] {
  // 1. Try reading from /tmp if on serverless
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const tmpData = fs.readFileSync(TMP_FILE_PATH, 'utf-8');
      const parsedTmp = JSON.parse(tmpData);
      if (Array.isArray(parsedTmp) && parsedTmp.length > 0) {
        memoryJobs = parsedTmp;
        return parsedTmp;
      }
    }
  } catch {
    // continue
  }

  // 2. Try reading from project workspace src/data/jobs.json
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryJobs = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading jobs data from disk:', error);
  }

  return memoryJobs;
}

export function saveJobs(jobs: JobListing[]): boolean {
  memoryJobs = jobs;
  let savedLocally = false;

  // Try writing to workspace path
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    savedLocally = true;
  } catch {
    // Expected on read-only serverless filesystem
  }

  // Try writing to /tmp for serverless persistence
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    savedLocally = true;
  } catch {
    // continue
  }

  // Optional: If Upstash Redis / Vercel KV REST API is configured in env, save to cloud KV
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (kvUrl && kvToken) {
    try {
      fetch(`${kvUrl}/set/jobs_data`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobs),
      }).catch((e) => console.warn('Cloud KV save error:', e));
    } catch (e) {
      console.warn('Cloud KV fetch init error:', e);
    }
  }

  return savedLocally || true;
}

export function createJob(newJob: Omit<JobListing, 'id' | 'postedDate' | 'viewsCount'>): JobListing {
  const jobs = getAllJobsAdmin();
  const id = `job-${Date.now()}`;
  let baseSlug = (newJob.slug || newJob.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  
  if (!baseSlug) {
    baseSlug = `job-${Date.now()}`;
  }

  // Ensure unique slug
  let slug = baseSlug;
  let counter = 1;
  while (jobs.some(j => j.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  const created: JobListing = {
    ...newJob,
    id,
    slug,
    postedDate: new Date().toISOString(),
    viewsCount: 0,
    status: newJob.status || 'active',
  };

  const updatedJobs = [created, ...jobs];
  saveJobs(updatedJobs);
  return created;
}

export function updateJob(id: string, updates: Partial<JobListing>): JobListing | null {
  const jobs = getAllJobsAdmin();
  const index = jobs.findIndex(j => j.id === id);
  if (index === -1) return null;

  const updated: JobListing = {
    ...jobs[index],
    ...updates,
    id: jobs[index].id, // preserve id
  };

  jobs[index] = updated;
  saveJobs(jobs);
  return updated;
}

export function deleteJob(id: string): boolean {
  const jobs = getAllJobsAdmin();
  const filtered = jobs.filter(j => j.id !== id);
  if (filtered.length === jobs.length) return false;
  saveJobs(filtered);
  return true;
}
