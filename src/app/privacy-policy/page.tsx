import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Cookie, Lock, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - CommonJobs',
  description: 'Privacy policy for CommonJobs detailing our data practices, cookie usage, and Google AdSense advertising policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
              Legal Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500">
              Last Updated: August 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm space-y-6 leading-relaxed">
            <p>
              At <strong>CommonJobs</strong>, accessible from our official website, the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of information that is collected and recorded by CommonJobs and how we utilize it.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              1. Zero User Registration & Personal Information
            </h2>
            <p>
              CommonJobs operates on a public discovery model. We do <strong>NOT</strong> require job seekers to register accounts, provide passwords, or upload resumes on our servers. When you click an &ldquo;Apply&rdquo; button, you are redirected directly to the official recruitment portal of the respective hiring organization.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              2. Log Files
            </h2>
            <p>
              CommonJobs follows standard industry procedures regarding the use of log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information and are used solely for analyzing trends, administering the site, and improving page loading performance.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              3. Cookies and Web Beacons
            </h2>
            <p>
              Like any other website, CommonJobs uses &lsquo;cookies&rsquo;. These cookies are used to store information including visitors&rsquo; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&rsquo; experience by customizing our web page content based on visitors&rsquo; browser type and other information.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              4. Google DoubleClick DART Cookie & Google AdSense Policy
            </h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to your website or other websites.</li>
              <li>Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline font-semibold">Google Ads Settings</a> or through <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline font-semibold">www.aboutads.info</a>.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              5. Third Party Privacy Policies
            </h2>
            <p>
              CommonJobs&rsquo;s Privacy Policy does not apply to other advertisers or external websites linked from our pages (such as employer career portals, LinkedIn, or external cloud application portals). Thus, we advise you to consult the respective Privacy Policies of these third-party servers for more detailed information.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              6. Children&rsquo;s Information
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. CommonJobs does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>

            <h2 className="text-lg font-bold text-slate-900 font-heading pt-2">
              7. Consent
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
