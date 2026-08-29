import { JobListing, JobFilterParams } from './types';
import initialJobs from '../data/jobs.json';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'jobs.json');
const TMP_FILE_PATH = path.join('/tmp', 'jobs.json');

// In-memory fallback
let memoryJobs: JobListing[] = (initialJobs as unknown) as JobListing[];

export async function loadRawJobs(): Promise<JobListing[]> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Try reading from Upstash Redis / Vercel KV if configured (global persistent storage across all serverless instances)
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/freshjobs_data`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryJobs = parsed;
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Cloud KV read error:', e);
    }
  }

  // 2. Try reading from /tmp if on serverless
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

  // 3. Try reading from project workspace src/data/jobs.json
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

export async function saveJobs(jobs: JobListing[]): Promise<boolean> {
  memoryJobs = jobs;
  let savedLocally = false;

  // 1. Save to Cloud KV (Upstash Redis / Vercel KV) if configured
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/set/freshjobs_data`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobs),
      });
      if (res.ok) savedLocally = true;
    } catch (e) {
      console.warn('Cloud KV save error:', e);
    }
  }

  // 2. Try writing to workspace path
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

  // 3. Try writing to /tmp for serverless persistence
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    savedLocally = true;
  } catch {
    // continue
  }

  return savedLocally || true;
}

export async function getJobs(filters?: JobFilterParams): Promise<JobListing[]> {
  const jobs = await loadRawJobs();

  if (!filters) {
    return [...jobs].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }

  return jobs.filter((job) => {
    // Only active unless querying specifically
    if (job.status !== 'active') return false;

    // Search query match
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchRole = job.roleCategory.toLowerCase().includes(q);
      const matchTags = job.tags?.some(t => t.toLowerCase().includes(q));
      const matchLocation = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchRole && !matchTags && !matchLocation) {
        return false;
      }
    }

    // Batch filter
    if (filters.batch) {
      const bQuery = filters.batch.toLowerCase().replace('-', ' ').trim();
      const hasBatch = job.batches.some(b => b.toLowerCase().includes(bQuery));
      const hasTag = job.tags.some(t => t.toLowerCase().includes(bQuery));
      if (!hasBatch && !hasTag) return false;
    }

    // Location filter
    if (filters.location) {
      const locQuery = filters.location.toLowerCase().replace('-', ' ').trim();
      const matchLocation = job.location.toLowerCase().includes(locQuery);
      const matchTag = job.tags.some(t => t.toLowerCase().includes(locQuery));
      if (!matchLocation && !matchTag) return false;
    }

    // Category filter
    if (filters.category) {
      const catQuery = filters.category.toLowerCase().replace('-', ' ').trim();
      const matchCat = job.roleCategory.toLowerCase().includes(catQuery);
      const matchTag = job.tags.some(t => t.toLowerCase().includes(catQuery));
      if (!matchCat && !matchTag) return false;
    }

    // Job Type
    if (filters.jobType && filters.jobType !== 'all') {
      if (job.jobType.toLowerCase() !== filters.jobType.toLowerCase()) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export async function getAllJobsAdmin(): Promise<JobListing[]> {
  const jobs = await loadRawJobs();
  return [...jobs].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export async function getJobBySlug(slug: string): Promise<JobListing | undefined> {
  const jobs = await getAllJobsAdmin();
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();
  return jobs.find((j) => j.slug.toLowerCase() === normalizedSlug || j.id === slug);
}

export async function createJob(newJob: Omit<JobListing, 'id' | 'postedDate' | 'viewsCount'>): Promise<JobListing> {
  const jobs = await getAllJobsAdmin();
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
  await saveJobs(updatedJobs);
  return created;
}

export async function updateJob(id: string, updates: Partial<JobListing>): Promise<JobListing | null> {
  const jobs = await getAllJobsAdmin();
  const index = jobs.findIndex(j => j.id === id);
  if (index === -1) return null;

  const updated: JobListing = {
    ...jobs[index],
    ...updates,
    id: jobs[index].id, // preserve id
  };

  jobs[index] = updated;
  await saveJobs(jobs);
  return updated;
}

export async function deleteJob(id: string): Promise<boolean> {
  const jobs = await getAllJobsAdmin();
  const filtered = jobs.filter(j => j.id !== id);
  if (filtered.length === jobs.length) return false;
  await saveJobs(filtered);
  return true;
}
