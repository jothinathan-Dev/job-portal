import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '@/lib/db';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'FreshJobs - Latest Off Campus Drives, Freshers Jobs & Internships',
  description: 'Verified off-campus drives, fresher hiring, software developer jobs (2024, 2025, 2026 Batch), tech internships and career updates with direct apply links.',
};

export default function HomePage() {
  const jobs = getJobs();

  return <HomeClient initialJobs={jobs} />;
}
