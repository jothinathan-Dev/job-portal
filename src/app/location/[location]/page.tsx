import React from 'react';
import type { Metadata } from 'next';
import { getJobs } from '@/lib/db';
import JobsClientList from '@/app/jobs/JobsClientList';
import AdBanner from '@/components/AdBanner';
import { MapPin } from 'lucide-react';

interface LocationPageProps {
  params: {
    location: string;
  };
}

export async function generateStaticParams() {
  return [
    { location: 'bangalore' },
    { location: 'hyderabad' },
    { location: 'pune' },
    { location: 'remote' },
    { location: 'chennai' },
    { location: 'pan-india' },
  ];
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const formattedLocation = params.location.replace('-', ' ').toUpperCase();
  return {
    title: `Freshers IT Jobs in ${formattedLocation} - CommonJobs`,
    description: `Browse verified software developer, IT trainee, and tech off-campus drives based in ${formattedLocation}. Direct application links.`,
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const jobs = getJobs();
  const rawLoc = params.location.replace('-', ' ');
  const formattedLocationTitle = rawLoc.charAt(0).toUpperCase() + rawLoc.slice(1);
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            Location Specific Careers
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Tech & Freshers Jobs in {formattedLocationTitle}
          </h1>
          <p className="text-sm text-slate-600">
            Find the latest hiring opportunities and off-campus placements located in {formattedLocationTitle}.
          </p>
        </div>

        <AdBanner slotId={topAdSlot} format="horizontal" className="mb-8" />

        <JobsClientList
          initialJobs={jobs}
          defaultLocation={formattedLocationTitle}
        />
      </div>
    </div>
  );
}
