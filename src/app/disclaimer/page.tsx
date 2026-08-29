import React from 'react';
import type { Metadata } from 'next';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer - CommonJobs',
  description: 'Official disclaimer regarding job listings, brand trademarks, and candidate safety on CommonJobs.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
              Important Notice
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Disclaimer
            </h1>
            <p className="text-sm text-slate-500">Last Updated: August 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm space-y-6 leading-relaxed">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-amber-900">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-base font-heading mb-1">CommonJobs Never Charges For Job Openings</strong>
                <p className="text-xs text-amber-800 leading-relaxed">
                  We are a 100% free informational community portal. Neither CommonJobs nor genuine hiring employers will ever ask you to pay application fees, security deposits, or laptop charges for interviews. If anyone asks for money claiming to represent a recruiter, report it immediately and do not send money.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              1. Non-Affiliation Disclaimer
            </h2>
            <p>
              CommonJobs is an independent website providing news and links related to off-campus recruitment drives, internships, and walk-in interviews. We are not officially affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with any of the companies mentioned on our website (including Datavail, Amazon, TCS, Google, Accenture, or Deloitte).
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              2. Trademarks & Logos
            </h2>
            <p>
              All company names, logos, product marks, and registered trademarks displayed on this website are property of their respective owners. Their use on this website is for informational and identification purposes only and does not imply any affiliation or endorsement.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              3. No Guarantee of Placement
            </h2>
            <p>
              CommonJobs does not guarantee that applying through links on our site will result in an interview call or job offer. Selection and hiring criteria are entirely at the sole discretion of the hiring company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
