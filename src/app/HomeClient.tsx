'use client';

import React, { useState, useMemo, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import AdBanner from '@/components/AdBanner';
import CommunityBanner from '@/components/CommunityBanner';
import { Sparkles, TrendingUp, Building2, Zap, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { JobListing } from '@/lib/types';

interface HomeClientProps {
  initialJobs: JobListing[];
}

export default function HomeClient({ initialJobs }: HomeClientProps) {
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedJobType, setSelectedJobType] = useState('All Types');

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  // Filter jobs dynamically
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== 'active') return false;

      if (search) {
        const q = search.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchRole = job.roleCategory.toLowerCase().includes(q);
        const matchTags = job.tags?.some(t => t.toLowerCase().includes(q));
        const matchLocation = job.location.toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchRole && !matchTags && !matchLocation) {
          return false;
        }
      }

      if (selectedBatch !== 'All Batches') {
        const b = selectedBatch.toLowerCase().replace('batch', '').trim();
        const hasBatch = job.batches.some(jb => jb.toLowerCase().includes(b));
        const hasTag = job.tags.some(jt => jt.toLowerCase().includes(b));
        if (!hasBatch && !hasTag) return false;
      }

      if (selectedLocation !== 'All Locations') {
        const loc = selectedLocation.toLowerCase().trim();
        const matchLoc = job.location.toLowerCase().includes(loc);
        const matchTag = job.tags.some(jt => jt.toLowerCase().includes(loc));
        if (!matchLoc && !matchTag) return false;
      }

      if (selectedCategory !== 'All Categories') {
        const cat = selectedCategory.toLowerCase().trim();
        const matchCat = job.roleCategory.toLowerCase().includes(cat);
        const matchTag = job.tags.some(jt => jt.toLowerCase().includes(cat));
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

  const featuredJobs = useMemo(() => {
    return jobs.filter(j => j.isFeatured && j.status === 'active').slice(0, 3);
  }, [jobs]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedBatch('All Batches');
    setSelectedLocation('All Locations');
    setSelectedCategory('All Categories');
    setSelectedJobType('All Types');
  };

  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;
  const inArticleAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/40">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>100% Free • No Login Required • Direct Official Links</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight md:leading-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-brand-300 to-emerald-400">Off-Campus Drives</span> & Freshers Jobs
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover verified hiring notifications for <strong>2024, 2025 & 2026 Batch Freshers</strong>, IT internships, SQL developers, software engineers, and remote roles. Apply directly without creating an account!
          </p>

          {/* Quick Filter Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-semibold mr-1">Trending:</span>
            <button
              onClick={() => { setSelectedBatch('2026 Batch'); setSearch(''); }}
              className="bg-slate-800/80 hover:bg-brand-600 border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              🎓 2026 Batch
            </button>
            <button
              onClick={() => { setSelectedBatch('2025 Batch'); setSearch(''); }}
              className="bg-slate-800/80 hover:bg-brand-600 border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              🎓 2025 Batch
            </button>
            <button
              onClick={() => { setSelectedLocation('Remote'); setSearch(''); }}
              className="bg-slate-800/80 hover:bg-brand-600 border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              🌐 Remote / WFH
            </button>
            <button
              onClick={() => { setSelectedLocation('Bangalore'); setSearch(''); }}
              className="bg-slate-800/80 hover:bg-brand-600 border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              📍 Bangalore
            </button>
            <button
              onClick={() => { setSearch('Datavail SQL'); }}
              className="bg-slate-800/80 hover:bg-brand-600 border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              ⚡ SQL Developer
            </button>
          </div>
        </div>
      </section>

      {/* Top Google AdSense Leaderboard Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slotId={topAdSlot} format="horizontal" className="my-6" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Featured Drives Banner Grid (if not filtering) */}
        {search === '' && selectedBatch === 'All Batches' && selectedLocation === 'All Locations' && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 font-heading">
                  Featured Hiring Drives
                </h2>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                High Priority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Live Filter Controls */}
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

        {/* Job Listings Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <span>Latest Job Openings</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Updated Real-Time • Verified Official Links
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <React.Fragment key={job.id}>
                  <JobCard job={job} />
                  {/* Insert Ad unit after 3rd card for high monetization yield */}
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
                We couldn't find any job listings matching your current filter criteria. Try clearing some filters or searching for different keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp & Telegram Community Join Banner */}
        <CommunityBanner />

        {/* Informational Authority & Value Section */}
        <section className="my-14 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
              Why Job Seekers Rely On FreshJobs?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We eliminate barriers in the job search process by curating authentic, fresh off-campus recruitment drives directly from employer portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Zero Login Walls</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No sign up, no resume collection, and no annoying password requirements. Click and apply immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">100% Free Applications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct redirects to genuine employer career sites (Oracle Cloud, Workday, Greenhouse, SuccessFactors).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Real-time Updates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous monitoring of IT company career portals to publish off-campus drives the moment they go live.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Batch-wise Targeting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear labeling for 2024, 2025, and 2026 batches so you only spend time applying for eligible opportunities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
