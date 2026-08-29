import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyAnchorAd from '@/components/StickyAnchorAd';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://commonjobs.in'),
  title: {
    default: 'CommonJobs - Latest Off Campus Drives, Freshers Jobs & Internships',
    template: '%s | CommonJobs'
  },
  description: 'Verified off-campus drives, fresher hiring, software developer jobs (2024, 2025, 2026 Batch), tech internships and career updates with direct apply links. No registration required.',
  keywords: [
    'Off Campus Drives',
    'Freshers Jobs',
    '2025 Batch Jobs',
    '2026 Batch Hiring',
    'Software Engineer Jobs',
    'IT Jobs for Freshers',
    'SQL Developer Off Campus',
    'Remote Jobs India',
    'CommonJobs'
  ],
  authors: [{ name: 'CommonJobs Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CommonJobs',
    title: 'CommonJobs - Latest Off Campus Drives, Freshers Jobs & Internships',
    description: 'Find verified off-campus drives and freshers IT jobs across India. Direct official apply links.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommonJobs - Off Campus Hiring & Freshers Jobs',
    description: 'Apply directly for freshers & tech jobs with zero login hassle.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense Script Integration */}
        {adsenseClientId && adsenseClientId.startsWith('ca-pub-') && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1 pb-16">{children}</main>
        <Footer />
        <StickyAnchorAd />
      </body>
    </html>
  );
}
