'use client';

import React, { useEffect, useState } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'responsive' | 'in-article';
  className?: string;
  label?: string;
}

export default function AdBanner({
  slotId,
  format = 'horizontal',
  className = '',
  label = 'Advertisement'
}: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // If real client ID exists and slot ID is configured
    if (clientId && clientId.startsWith('ca-pub-') && slotId) {
      try {
        // @ts-expect-error - adsbygoogle window object
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.warn('AdSense push error:', err);
      }
    }
  }, [clientId, slotId]);

  // Dimension helpers based on format
  const getFormatClasses = () => {
    switch (format) {
      case 'horizontal':
        return 'min-h-[90px] md:min-h-[100px] w-full max-w-[728px] lg:max-w-[970px]';
      case 'rectangle':
        return 'min-h-[250px] w-full max-w-[300px] sm:max-w-[336px]';
      case 'in-article':
        return 'min-h-[140px] md:min-h-[200px] w-full';
      case 'vertical':
        return 'min-h-[600px] w-full max-w-[300px]';
      case 'responsive':
      default:
        return 'min-h-[100px] w-full';
    }
  };

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Tiny subtle ad label required by Google policy */}
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        {label}
      </span>

      <div className={`ad-slot-wrapper mx-auto p-2 bg-slate-50 border border-dashed border-slate-300 rounded-xl transition-all ${getFormatClasses()}`}>
        {clientId && clientId.startsWith('ca-pub-') && slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={format === 'rectangle' ? 'rectangle' : 'auto'}
            data-full-width-responsive="true"
          />
        ) : (
          /* Placeholder display during development or awaiting approval */
          <div className="flex flex-col items-center justify-center text-center p-4 text-slate-500">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-xs border border-slate-200 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>Google AdSense Slot</span>
            </div>
            <p className="text-[11px] text-slate-600 max-w-xs">
              {format.toUpperCase()} AD UNIT ({slotId ? `Slot #${slotId}` : 'Responsive'})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
