import { JobListing, JobFilterParams } from './types';
import initialJobs from '../data/jobs.json';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'jobs.json');

// In-memory memory fallback if file system is read-only (like Vercel serverless functions)
let memoryJobs: JobListing[] = (initialJobs as unknown) as JobListing[];

export function getJobs(filters?: JobFilterParams): JobListing[] {
  let jobs: JobListing[] = [];
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      jobs = JSON.parse(fileData);
    } else {
      jobs = memoryJobs;
    }
  } catch {
    jobs = memoryJobs;
  }

  // Update memory state
  memoryJobs = jobs;

  if (!filters) {
    return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
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

export function getAllJobsAdmin(): JobListing[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(fileData).sort((a: JobListing, b: JobListing) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }
  } catch {
    // fallback
  }
  return memoryJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
}

export function getJobBySlug(slug: string): JobListing | undefined {
  const jobs = getJobs();
  return jobs.find((j) => j.slug === slug || j.id === slug);
}

export function saveJobs(jobs: JobListing[]): boolean {
  memoryJobs = jobs;
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.warn('File write error (expected on read-only serverless filesystem, kept in memory):', error);
    return true;
  }
}

export function createJob(newJob: Omit<JobListing, 'id' | 'postedDate' | 'viewsCount'>): JobListing {
  const jobs = getAllJobsAdmin();
  const id = `job-${Date.now()}`;
  const slug = newJob.slug || newJob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const created: JobListing = {
    ...newJob,
    id,
    slug,
    postedDate: new Date().toISOString(),
    viewsCount: 0,
    status: newJob.status || 'active',
  };

  jobs.unshift(created);
  saveJobs(jobs);
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
