'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function StickyAnchorAd() {
  const [isVisible, setIsVisible] = useState(true);
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY_ANCHOR;
  const rawAdId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-6534319640160959';
  const clientId = rawAdId.startsWith('ca-pub-')
    ? rawAdId
    : rawAdId.startsWith('pub-')
    ? `ca-${rawAdId}`
    : `ca-pub-${rawAdId}`;

  if (!isVisible) return null;

  return (
    <aside aria-label="Bottom Sponsor" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-300 shadow-2xl transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 py-2 relative flex items-center justify-center min-h-[60px] md:min-h-[70px]">
        {/* Close / Dismiss button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-7 right-2 sm:right-4 bg-slate-900 text-white p-1 rounded-t-md text-xs flex items-center gap-1 hover:bg-slate-800 transition-colors shadow-md"
          title="Close Ad"
          aria-label="Close Advertisement"
        >
          <span className="text-[10px] uppercase font-bold pl-1">Ad</span>
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Ad content / placeholder */}
        {clientId && clientId.startsWith('ca-pub-') && slotId ? (
          <div className="w-full h-full flex justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '100%', height: '60px' }}
              data-ad-client={clientId}
              data-ad-slot={slotId}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-brand-700 font-bold px-2 py-0.5 rounded text-[10px]">
                SPONSORED
              </span>
              <span className="text-slate-700 font-medium hidden sm:inline">
                🚀 Looking for Freshers Off-Campus Jobs? Never miss another drive deadline.
              </span>
            </div>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://whatsapp.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shrink-0 transition-colors shadow-xs"
            >
              Get Daily Job Alerts →
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}
