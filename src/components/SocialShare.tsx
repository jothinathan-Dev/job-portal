'use client';

import React, { useState } from 'react';
import { Share2, MessageCircle, Send, Linkedin, Twitter, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`🚨 Off-Campus Hiring Drive: ${title}\nApply Here: `);

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodedTitle}${encodedUrl}`;
  const shareTelegram = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Share2 className="w-4 h-4 text-brand-600" />
          <span>Share with your friends & college batches:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp */}
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href={shareTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Share on Telegram"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* Twitter / X */}
          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            title="Share on X (Twitter)"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
            title="Copy Job Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
