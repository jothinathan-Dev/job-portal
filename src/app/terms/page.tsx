import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FreshJobs',
  description: 'Terms and conditions governing the use of FreshJobs job notification portal.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500">Last Updated: August 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm space-y-6 leading-relaxed">
            <p>
              Welcome to <strong>FreshJobs</strong>. By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              1. Informational Nature of Service
            </h2>
            <p>
              FreshJobs functions as a job search aggregator and informational notification board. We are not an employer, recruitment agency, or agent of any listed company. We do not participate in candidate shortlisting, interview scheduling, or employment decisions.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              2. Accuracy of Job Postings
            </h2>
            <p>
              While we make every effort to verify and publish accurate information derived from company career portals, job openings can change, expire, or close at any time without prior notice. Candidates are strongly encouraged to verify all requirements on the official hiring company portal before applying.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              3. External Links & Third-Party Portals
            </h2>
            <p>
              Our website contains links to external websites (such as company career portals, application tracking systems, and social messaging channels). We have no control over the content, privacy practices, or availability of those third-party sites and assume no responsibility for them.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              4. Intellectual Property
            </h2>
            <p>
              Company names, logos, and trademarks displayed on this site are the property of their respective owners. Their inclusion on this website does not imply endorsement, affiliation, or sponsorship.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              5. Modifications to Terms
            </h2>
            <p>
              FreshJobs may revise these Terms of Service at any time without prior notice. By continuing to use this website, you agree to be bound by the current version of these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
