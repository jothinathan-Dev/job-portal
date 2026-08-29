import React from 'react';
import type { Metadata } from 'next';
import { Briefcase, Target, ShieldCheck, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - CommonJobs',
  description: 'Learn about CommonJobs, our mission to empower college freshers and job seekers with direct, verified off-campus career opportunities without login barriers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-100 pb-8">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
              Who We Are
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              About CommonJobs Portal
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Empowering college graduates, early-career tech professionals, and students with transparent, frictionless access to verified off-campus drives across India.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600" />
              <span>Our Core Mission</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Finding off-campus job drives shouldn't require jumping through paywalls, forced registration forms, or suspicious spam portals. CommonJobs was created to provide a clean, fast, and 100% free discovery platform where job seekers can view authentic job requirements and apply directly on the hiring company's official career portal (such as Oracle Cloud, Workday, Greenhouse, and SuccessFactors).
            </p>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">No Registration Hassle</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe in frictionless browsing. You can view all requirements and click the direct apply link instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Strictly Verified Links</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every job listed on our board links directly to genuine corporate career portals, never middleman charge traps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Batch-Specific Curation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear labeling for 2024, 2025, and 2026 batches helps candidates immediately find opportunities matching their graduation year.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Community-Driven</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time alerts broadcasted via WhatsApp & Telegram channels to ensure candidates never miss registration deadlines.
              </p>
            </div>
          </div>

          {/* Editorial Integrity */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Our Content & Ethical Standards
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              CommonJobs operates as an independent informational portal. We do not represent any corporate employer unless explicitly stated, nor do we charge candidates any fees for job notifications. All logos and trademarks featured on this portal belong to their respective corporate copyright holders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
