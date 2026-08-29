import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getJobs, getJobBySlug } from '@/lib/db';
import JobSchema from '@/components/JobSchema';
import AdBanner from '@/components/AdBanner';
import SocialShare from '@/components/SocialShare';
import CommunityBanner from '@/components/CommunityBanner';
import {
  MapPin,
  Calendar,
  Briefcase,
  IndianRupee,
  GraduationCap,
  ExternalLink,
  Building2,
  Clock,
  Sparkles,
  Flame,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

interface JobPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) {
    return {
      title: 'Job Not Found - FreshJobs',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freshjobs.in';
  const pageUrl = `${siteUrl}/job/${job.slug}`;

  return {
    title: `${job.title} - ${job.company} Off Campus Drive`,
    description: `${job.title} at ${job.company}. Eligible Batches: ${job.batches.join(', ')}. Location: ${job.location}. Salary: ${job.salary}. Read eligibility and apply online directly.`,
    keywords: [
      job.company,
      job.title,
      ...job.batches,
      job.location,
      job.roleCategory,
      'Off Campus Drive',
      'Freshers Recruitment',
      'Apply Now'
    ],
    openGraph: {
      title: `${job.title} - ${job.company}`,
      description: job.overview,
      url: pageUrl,
      type: 'article',
      publishedTime: job.postedDate,
      images: job.companyLogo ? [{ url: job.companyLogo }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} | ${job.company}`,
      description: job.overview,
    },
  };
}

export default async function SingleJobPage({ params }: JobPageProps) {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const allJobs = await getJobs();
  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id && (j.roleCategory === job.roleCategory || j.batches.some(b => job.batches.includes(b))))
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freshjobs.in';
  const currentUrl = `${siteUrl}/job/${job.slug}`;

  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER;
  const inArticleAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE;
  const sidebarAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently Posted';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-10">
      {/* Google Jobs Schema JSON-LD */}
      <JobSchema job={job} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-brand-600 font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/jobs" className="hover:text-brand-600 font-medium">
            Jobs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">{job.roleCategory}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {job.title}
          </span>
        </nav>

        {/* Top Header Leaderboard Ad */}
        <AdBanner slotId={topAdSlot} format="horizontal" className="mb-8" />

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Content Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Hero Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.isUrgent && (
                  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Hiring Urgently</span>
                  </span>
                )}
                {job.isFeatured && (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Featured Off Campus</span>
                  </span>
                )}
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {job.jobType}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Posted: {formatDate(job.postedDate)}</span>
                </span>
              </div>

              {/* Company Logo + Title */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-600 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
                      {job.company.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-bold text-brand-600 tracking-wide uppercase mb-1">
                    {job.company}
                  </h2>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                    {job.title}
                  </h1>
                </div>
              </div>

              {/* Highlight Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium block">Role Category</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                    <Briefcase className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    {job.roleCategory}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium block">Salary / Package</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 truncate">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {job.salary || 'Best in Industry'}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium block">Job Location</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {job.location}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium block">Batch Eligibility</span>
                  <span className="font-bold text-indigo-700 flex items-center gap-1 truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    {job.batches.join(', ')}
                  </span>
                </div>
              </div>

              {/* Direct Apply Button Banner */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct official application link • No registration required</span>
                </div>

                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Apply For This Job</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Share Bar */}
            <SocialShare title={job.title} url={currentUrl} />

            {/* Mid Article Ad Slot */}
            <AdBanner slotId={inArticleAdSlot} format="in-article" className="my-6" />

            {/* Detailed Job Information Body */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              {/* Overview Box */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">
                  Job Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/60">
                  {job.overview}
                </p>
              </div>

              {/* Render Rich Description HTML */}
              <div
                className="job-content text-slate-700 leading-relaxed text-sm pt-2"
                dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
              />

              {/* Batch & Eligibility Tags */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Eligible Batches & Degree Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.batches.map((b, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-lg border border-indigo-200/60"
                    >
                      🎓 {b}
                    </span>
                  ))}
                  {job.qualifications?.map((q, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg"
                    >
                      {q}
                    </span>
                  ))}
                  {job.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-50 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Apply Action Callout */}
              <div className="pt-6 border-t border-slate-100 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base font-heading">Ready to submit your application?</h4>
                  <p className="text-xs text-slate-300">Click below to open the official employer application page.</p>
                </div>

                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md shrink-0"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Anti-Fraud Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Candidate Notice:</strong> FreshJobs is an open informational platform and never demands any fee, registration charges, or money for job applications or interviews. If anyone asks for money claiming to represent {job.company}, do not pay.
              </div>
            </div>
          </div>

          {/* Sidebar Column (1 Col) */}
          <div className="space-y-6">
            {/* Quick Job Summary Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                Job Details Summary
              </h3>

              <ul className="space-y-3 text-xs">
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Company</span>
                  <span className="font-bold text-slate-900">{job.company}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Job Role</span>
                  <span className="font-bold text-slate-900">{job.roleCategory}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Experience</span>
                  <span className="font-bold text-slate-900">{job.experience}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Salary</span>
                  <span className="font-bold text-emerald-600">{job.salary}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Job Location</span>
                  <span className="font-bold text-slate-900">{job.location}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Job Type</span>
                  <span className="font-bold text-brand-600">{job.jobType}</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span className="text-slate-500 font-medium">Deadline</span>
                  <span className="font-bold text-rose-600">{job.deadline || 'Hiring Urgently'}</span>
                </li>
              </ul>

              {job.companyWebsite && (
                <div className="pt-2">
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Visit {job.company} Website</span>
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar Google AdSense Rectangle Slot */}
            <AdBanner slotId={sidebarAdSlot} format="rectangle" />

            {/* WhatsApp / Telegram Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Daily Alerts
              </span>
              <h4 className="text-lg font-bold font-heading">
                Get Freshers Hiring Alerts on WhatsApp!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join 50,000+ students and freshers receiving daily verified off-campus drive notifications.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://whatsapp.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md"
              >
                Join Free WhatsApp Group →
              </a>
            </div>
          </div>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                More Off-Campus Drives You Might Like
              </h3>
              <Link
                href="/jobs"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View All Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJobs.map((rJob) => (
                <div
                  key={rJob.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                      {rJob.company}
                    </span>
                    <Link
                      href={`/job/${rJob.slug}`}
                      className="block font-bold text-slate-900 text-sm mt-1 hover:text-brand-600 line-clamp-2"
                    >
                      {rJob.title}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                        {rJob.location}
                      </span>
                      <span className="text-emerald-600 font-bold text-[11px]">
                        {rJob.salary}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/job/${rJob.slug}`}
                    className="mt-4 inline-flex items-center justify-between text-xs font-bold text-slate-700 hover:text-brand-600 pt-3 border-t border-slate-100"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community banner at bottom */}
        <CommunityBanner />
      </div>
    </div>
  );
}
