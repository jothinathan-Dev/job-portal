import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '@/lib/db';
import JobsClientList from './JobsClientList';
import AdBanner from '@/components/AdBanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'All Off-Campus Drives & Freshers Jobs - FreshJobs',
  description: 'Browse all verified IT jobs, off-campus recruitment drives, software engineering openings, and internships for freshers across India.',
};

export default async function AllJobsPage() {
  const jobs = await getJobs();
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Intro */}
        <div className="mb-8 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
            All Openings Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Browse All Off-Campus Hiring Drives
          </h1>
          <p className="text-sm text-slate-600">
            Search across leading IT companies, product startups, and tech multinational off-campus recruitment for freshers (2024, 2025, 2026 Batch).
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdBanner slotId={topAdSlot} format="horizontal" className="mb-8" />

        {/* Client-side Filter & Listing Component */}
        <JobsClientList initialJobs={jobs} />
      </div>
    </div>
  );
}
