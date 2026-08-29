import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '@/lib/db';
import JobsClientList from '@/app/jobs/JobsClientList';
import AdBanner from '@/components/AdBanner';
import { GraduationCap } from 'lucide-react';

interface BatchPageProps {
  params: {
    batch: string;
  };
}

export async function generateStaticParams() {
  return [
    { batch: '2026-batch' },
    { batch: '2025-batch' },
    { batch: '2024-batch' },
    { batch: 'freshers' },
  ];
}

export async function generateMetadata({ params }: BatchPageProps): Promise<Metadata> {
  const formattedBatch = params.batch.replace('-', ' ').toUpperCase();
  return {
    title: `${formattedBatch} Off Campus Drives & Hiring - CommonJobs`,
    description: `Latest verified off-campus drives, fresher hiring, and software developer jobs specifically for ${formattedBatch} students. Direct official application links.`,
  };
}

export default function BatchPage({ params }: BatchPageProps) {
  const jobs = getJobs();
  const rawBatch = params.batch.replace('-', ' ');
  const formattedBatchTitle = rawBatch.charAt(0).toUpperCase() + rawBatch.slice(1);
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            Batch Targeted Hiring
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {formattedBatchTitle.toUpperCase()} Off-Campus Drives
          </h1>
          <p className="text-sm text-slate-600">
            Exclusive off-campus opportunities, SDE internships, and IT recruitment drives open for {formattedBatchTitle} candidates.
          </p>
        </div>

        <AdBanner slotId={topAdSlot} format="horizontal" className="mb-8" />

        <JobsClientList
          initialJobs={jobs}
          defaultBatch={formattedBatchTitle.includes('Batch') ? formattedBatchTitle : `${formattedBatchTitle} Batch`}
        />
      </div>
    </div>
  );
}
