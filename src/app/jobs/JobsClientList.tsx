'use client';

import React, { useState, useMemo } from 'react';
import { JobListing } from '@/lib/types';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import AdBanner from '@/components/AdBanner';
import CommunityBanner from '@/components/CommunityBanner';
import { Building2 } from 'lucide-react';

interface JobsClientListProps {
  initialJobs: JobListing[];
  defaultBatch?: string;
  defaultLocation?: string;
  defaultCategory?: string;
}

export default function JobsClientList({
  initialJobs,
  defaultBatch = 'All Batches',
  defaultLocation = 'All Locations',
  defaultCategory = 'All Categories',
}: JobsClientListProps) {
  const [jobs] = useState<JobListing[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(defaultBatch);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedJobType, setSelectedJobType] = useState('All Types');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== 'active') return false;

      if (search) {
        const q = search.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchRole = job.roleCategory.toLowerCase().includes(q);
        const matchTags = job.tags?.some((t) => t.toLowerCase().includes(q));
        const matchLocation = job.location.toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchRole && !matchTags && !matchLocation) {
          return false;
        }
      }

      if (selectedBatch !== 'All Batches') {
        const b = selectedBatch.toLowerCase().replace('batch', '').trim();
        const hasBatch = job.batches.some((jb) => jb.toLowerCase().includes(b));
        const hasTag = job.tags.some((jt) => jt.toLowerCase().includes(b));
        if (!hasBatch && !hasTag) return false;
      }

      if (selectedLocation !== 'All Locations') {
        const loc = selectedLocation.toLowerCase().trim();
        const matchLoc = job.location.toLowerCase().includes(loc);
        const matchTag = job.tags.some((jt) => jt.toLowerCase().includes(loc));
        if (!matchLoc && !matchTag) return false;
      }

      if (selectedCategory !== 'All Categories') {
        const cat = selectedCategory.toLowerCase().trim();
        const matchCat = job.roleCategory.toLowerCase().includes(cat);
        const matchTag = job.tags.some((jt) => jt.toLowerCase().includes(cat));
        if (!matchCat && !matchTag) return false;
      }

      if (selectedJobType !== 'All Types') {
        if (job.jobType.toLowerCase() !== selectedJobType.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, search, selectedBatch, selectedLocation, selectedCategory, selectedJobType]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedBatch('All Batches');
    setSelectedLocation('All Locations');
    setSelectedCategory('All Categories');
    setSelectedJobType('All Types');
  };

  const inArticleAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE;

  return (
    <div>
      <JobFilters
        search={search}
        setSearch={setSearch}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        onReset={handleResetFilters}
        totalResults={filteredJobs.length}
      />

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <React.Fragment key={job.id}>
              <JobCard job={job} />
              {index === 2 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <AdBanner slotId={inArticleAdSlot} format="in-article" className="my-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No matching jobs found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Try adjusting your search keywords or resetting the filter options.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}

      <CommunityBanner />
    </div>
  );
}
