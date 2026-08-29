import React from 'react';
import Link from 'next/link';
import { Briefcase, Heart, MessageCircle, Send, ShieldAlert, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://whatsapp.com/channel/0029VaABghcFi8xY5OYgIq0F';
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || 'https://t.me/jobupdates_freshers';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                Common<span className="text-indigo-400">Jobs</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              India's premier portal for verified off-campus drives, fresher hiring, software engineering openings, IT internships, and career opportunities. Fast, direct applications without registration walls.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Join WhatsApp Group</span>
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-700/60 text-sky-400 text-xs font-semibold hover:bg-sky-900 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Alerts</span>
              </a>
            </div>
          </div>

          {/* Col 2: Batches */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-heading">
              Hiring By Batch
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/batch/2026-batch" className="hover:text-indigo-400 transition-colors">
                  2026 Batch Freshers
                </Link>
              </li>
              <li>
                <Link href="/batch/2025-batch" className="hover:text-indigo-400 transition-colors">
                  2025 Batch Drives
                </Link>
              </li>
              <li>
                <Link href="/batch/2024-batch" className="hover:text-indigo-400 transition-colors">
                  2024 Batch Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=internship" className="hover:text-indigo-400 transition-colors">
                  Summer / SDE Internships
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=software" className="hover:text-indigo-400 transition-colors">
                  Software Engineer Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Locations */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-heading">
              Top Locations
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/location/bangalore" className="hover:text-indigo-400 transition-colors">
                  Bangalore / Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/location/hyderabad" className="hover:text-indigo-400 transition-colors">
                  Hyderabad Jobs
                </Link>
              </li>
              <li>
                <Link href="/location/pune" className="hover:text-indigo-400 transition-colors">
                  Pune Tech Drives
                </Link>
              </li>
              <li>
                <Link href="/location/remote" className="hover:text-indigo-400 transition-colors">
                  Work From Home / Remote
                </Link>
              </li>
              <li>
                <Link href="/location/chennai" className="hover:text-indigo-400 transition-colors">
                  Chennai Openings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: AdSense & Legal Pages */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-heading">
              Legal & Policy
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note for AdSense compliance */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3">
          <div className="flex items-start gap-2 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> CommonJobs is an informational job alert board. We are not a recruitment agency and never charge candidates for job opportunities or interview applications. All logos, trademarks, and brand names belong to their respective corporate owners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3">
            <p>© {currentYear} CommonJobs Portal. All rights reserved.</p>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Crafted for Freshers & Job Seekers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
