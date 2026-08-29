import React from 'react';
import { JobListing } from '@/lib/types';

interface JobSchemaProps {
  job: JobListing;
}

export default function JobSchema({ job }: JobSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://commonjobs.in';
  
  // Calculate valid through date (defaults to 60 days from posted date if not specified)
  const posted = new Date(job.postedDate);
  const validThroughDate = new Date(posted.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString();

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.descriptionHtml || job.overview,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company,
      value: job.id,
    },
    datePosted: job.postedDate,
    validThrough: validThroughDate,
    employmentType: job.jobType === 'Internship' ? 'INTERN' : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: job.companyWebsite || undefined,
      logo: job.companyLogo || undefined,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        unitText: 'YEAR',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
    directApply: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
