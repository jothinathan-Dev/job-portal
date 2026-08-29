export interface JobListing {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  roleCategory: string; // e.g. "Software Development", "Data & Analytics", "Core Engineering", "QA / Testing"
  jobType: 'Full Time' | 'Internship' | 'Part Time' | 'Contract';
  location: string; // e.g. "Bangalore", "Hyderabad", "Pune", "Remote", "Pan India"
  experience: string; // e.g. "Freshers (0-1 yrs)", "0-2 years", "2+ years"
  batches: string[]; // e.g. ["2024 Batch", "2025 Batch", "2026 Batch", "Freshers"]
  qualifications: string[]; // e.g. ["BE / B.Tech", "BCA / MCA", "B.Sc / BCS", "Any Graduate"]
  salary: string; // e.g. "₹4.5 - ₹7.5 LPA", "₹30,000 / month", "Best in Industry"
  applyUrl: string; // Direct link to company career portal (Oracle Cloud, Workday, etc.)
  deadline?: string; // e.g. "30 Oct 2026" or "Hiring Urgently"
  postedDate: string; // ISO date string
  isFeatured?: boolean;
  isUrgent?: boolean;
  viewsCount?: number;
  overview: string; // Short summary
  descriptionHtml: string; // Full rich HTML content (Eligibility, Responsibilities, Selection Process)
  tags: string[]; // e.g. ["SQL", "Java", "Python", "Datavail", "Off Campus", "Freshers"]
  status: 'active' | 'expired' | 'draft';
}

export interface JobFilterParams {
  search?: string;
  batch?: string;
  location?: string;
  category?: string;
  jobType?: string;
}
