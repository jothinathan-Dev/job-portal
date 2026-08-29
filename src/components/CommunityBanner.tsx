import React from 'react';
import { MessageCircle, Send, BellRing, Sparkles } from 'lucide-react';

export default function CommunityBanner() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://whatsapp.com/channel/0029VaABghcFi8xY5OYgIq0F';
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || 'https://t.me/jobupdates_freshers';

  return (
    <div className="my-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-indigo-500/20">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <BellRing className="w-3.5 h-3.5 text-indigo-400" />
            <span>Instant Job Notifications</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Never Miss An Off-Campus Drive Again!
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Get instant hiring notifications for <strong>2024, 2025 & 2026 batches</strong>, direct application links, interview syllabus, and aptitude questions delivered straight to your phone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Join WhatsApp Channel</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            <span>Join Telegram Group</span>
          </a>
        </div>
      </div>
    </div>
  );
}
