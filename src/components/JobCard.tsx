import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { JobListing } from '@/lib/types';
import { MapPin, Calendar, Briefcase, IndianRupee, Sparkles, Flame, ArrowUpRight, GraduationCap } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  // Format posted date relative or clean date
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-card hover:-translate-y-1 overflow-hidden ${
        featured || job.isFeatured
          ? 'border-indigo-200 ring-1 ring-indigo-500/20 bg-gradient-to-b from-indigo-50/30 to-white'
          : 'border-slate-200/90 hover:border-indigo-300'
      }`}
    >
      {/* Top badges banner */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {job.isUrgent && (
            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Hiring Urgently</span>
            </span>
          )}

          {job.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Featured Drive</span>
            </span>
          )}

          <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {job.jobType}
          </span>
        </div>

        <div className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(job.postedDate)}</span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 pt-2">
        <div className="flex items-start gap-3.5 mb-3">
          {/* Company Avatar / Logo */}
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 p-1 shrink-0 flex items-center justify-center overflow-hidden group-hover:border-indigo-400 transition-colors">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-brand-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {job.company.charAt(0)}
              </div>
            )}
          </div>

          {/* Job Title & Company */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-0.5">
              {job.company}
            </p>
            <Link
              href={`/job/${job.slug}`}
              className="font-bold text-slate-900 text-base md:text-lg leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors font-heading"
            >
              {job.title}
            </Link>
          </div>
        </div>

        {/* Key Info Pill Grid */}
        <div className="grid grid-cols-2 gap-2 my-3.5 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 font-bold truncate">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{job.salary || 'Best in Industry'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
            <Briefcase className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="truncate">{job.experience}</span>
          </div>

          <div className="flex items-center gap-1.5 text-indigo-700 font-semibold truncate">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{job.batches?.join(', ') || 'Freshers'}</span>
          </div>
        </div>

        {/* Batch Tags List */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.batches.slice(0, 3).map((b, idx) => (
            <span
              key={idx}
              className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-indigo-100/80"
            >
              {b}
            </span>
          ))}
          {job.roleCategory && (
            <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
              {job.roleCategory}
            </span>
          )}
        </div>

        {/* Bottom CTA Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Direct Apply Link Available
          </span>

          <Link
            href={`/job/${job.slug}`}
            className="inline-flex items-center gap-1 bg-slate-900 text-white hover:bg-brand-600 font-semibold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs group-hover:bg-brand-600"
          >
            <span>View & Apply</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
