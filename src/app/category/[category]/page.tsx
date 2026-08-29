import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '@/lib/db';
import JobsClientList from '@/app/jobs/JobsClientList';
import AdBanner from '@/components/AdBanner';
import { Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return [
    { category: 'software-development' },
    { category: 'database-sql' },
    { category: 'data-analytics' },
    { category: 'qa-testing' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const formattedCat = params.category.replace('-', ' ').toUpperCase();
  return {
    title: `${formattedCat} Off Campus Drives - FreshJobs`,
    description: `Latest off-campus recruitment drives, freshers jobs, and internships in ${formattedCat}. Apply online directly.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const jobs = getJobs();
  const rawCat = params.category.replace('-', ' ');
  const formattedCategoryTitle = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            Category Drives
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {formattedCategoryTitle.toUpperCase()} Jobs
          </h1>
          <p className="text-sm text-slate-600">
            Explore active openings and hiring drives specifically for {formattedCategoryTitle}.
          </p>
        </div>

        <AdBanner slotId={topAdSlot} format="horizontal" className="mb-8" />

        <JobsClientList
          initialJobs={jobs}
          defaultCategory={formattedCategoryTitle}
        />
      </div>
    </div>
  );
}
