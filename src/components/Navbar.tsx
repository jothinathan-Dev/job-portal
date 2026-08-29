'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Search, Menu, X, Sparkles, MessageCircle, Send, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://whatsapp.com/channel/0029VaABghcFi8xY5OYgIq0F';
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || 'https://t.me/jobupdates_freshers';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              🚀 Off-Campus 2024-2026
            </span>
            <span className="hidden sm:inline text-slate-300">
              Daily verified hiring drives for Freshers, Internships & Software Engineers!
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join WhatsApp</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">Common</span>
                <span className="font-extrabold text-xl tracking-tight text-brand-600 font-heading">Jobs</span>
                <span className="text-[10px] bg-brand-100 text-brand-700 font-bold px-1.5 py-0.5 rounded ml-1">PORTAL</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-none">Off Campus & Freshers Careers</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
            <Link href="/" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              All Jobs
            </Link>
            <Link href="/batch/2026-batch" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors flex items-center gap-1">
              <span>2026 Batch</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </Link>
            <Link href="/batch/2025-batch" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              2025 Batch
            </Link>
            <Link href="/batch/2024-batch" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              2024 Batch
            </Link>
            <Link href="/location/remote" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              Remote
            </Link>
            <Link href="/location/bangalore" className="px-3.5 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors">
              Bangalore
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/jobs"
              className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search Jobs"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Admin Post</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/jobs"
              className="p-2 text-slate-600 hover:text-brand-600 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-lg border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Group
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-sky-50 text-sky-700 font-semibold text-xs rounded-lg border border-sky-200"
            >
              <Send className="w-4 h-4" />
              Telegram Channel
            </a>
          </div>

          <nav className="flex flex-col space-y-1 font-medium text-slate-700 text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              🏠 Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 font-semibold text-brand-600"
            >
              💼 All Jobs
            </Link>
            <Link
              href="/batch/2026-batch"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
            >
              <span>🎓 2026 Batch Jobs</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">NEW</span>
            </Link>
            <Link
              href="/batch/2025-batch"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              🎓 2025 Batch Jobs
            </Link>
            <Link
              href="/batch/2024-batch"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              🎓 2024 Batch Jobs
            </Link>
            <Link
              href="/location/remote"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              🌐 Work From Home / Remote
            </Link>
            <Link
              href="/location/bangalore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              📍 Bangalore Jobs
            </Link>
            <Link
              href="/location/hyderabad"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              📍 Hyderabad Jobs
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
