'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobListing } from '@/lib/types';
import {
  ShieldCheck,
  Lock,
  Plus,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  ArrowUpRight,
  LogOut,
  Sliders,
  DollarSign,
  Globe,
  UploadCloud
} from 'lucide-react';

const ROLE_CATEGORIES = [
  'Software Development',
  'Database & SQL',
  'Data & Analytics',
  'QA / Testing',
  'Cloud & DevOps',
  'Core Engineering',
  'Product & Design',
  'IT Support / Operations',
];

const COMMON_BATCHES = ['2026 Batch', '2025 Batch', '2024 Batch', 'Freshers', 'Any Batch'];

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    companyLogo: '',
    companyWebsite: '',
    roleCategory: 'Software Development',
    jobType: 'Full Time' as JobListing['jobType'],
    location: 'Bangalore / Remote',
    experience: 'Freshers (0-1 yrs)',
    batches: ['2025 Batch', '2026 Batch', 'Freshers'],
    qualifications: 'BE / B.Tech, BCA / MCA, B.Sc (CS/IT), Any Graduate',
    salary: '₹4.5 LPA - ₹6.5 LPA',
    applyUrl: '',
    deadline: 'Hiring Urgently',
    isFeatured: false,
    isUrgent: false,
    overview: '',
    descriptionHtml: '',
    tags: 'Off Campus, Freshers, IT Jobs',
    status: 'active' as JobListing['status'],
  });

  // Check stored PIN
  useEffect(() => {
    const storedPin = sessionStorage.getItem('admin_key');
    if (storedPin) {
      verifyAdmin(storedPin);
    }
  }, []);

  const verifyAdmin = async (keyToVerify: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: keyToVerify }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_key', keyToVerify);
        fetchJobs();
      } else {
        setAuthError(data.message || 'Invalid PIN');
        sessionStorage.removeItem('admin_key');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAdmin(pin);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_key');
    setIsAuthenticated(false);
    setPin('');
  };

  const openCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      company: '',
      companyLogo: '',
      companyWebsite: '',
      roleCategory: 'Software Development',
      jobType: 'Full Time',
      location: 'Bangalore / Remote',
      experience: 'Freshers (0-1 yrs)',
      batches: ['2025 Batch', '2026 Batch', 'Freshers'],
      qualifications: 'BE / B.Tech, BCA / MCA, B.Sc (CS/IT), Any Graduate',
      salary: '₹4.5 LPA - ₹6.5 LPA',
      applyUrl: '',
      deadline: 'Hiring Urgently',
      isFeatured: false,
      isUrgent: false,
      overview: '',
      descriptionHtml: getDefaultDescriptionTemplate('', ''),
      tags: 'Off Campus, Freshers, IT Jobs',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobListing) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      companyLogo: job.companyLogo || '',
      companyWebsite: job.companyWebsite || '',
      roleCategory: job.roleCategory,
      jobType: job.jobType,
      location: job.location,
      experience: job.experience,
      batches: job.batches,
      qualifications: job.qualifications?.join(', ') || '',
      salary: job.salary,
      applyUrl: job.applyUrl,
      deadline: job.deadline || 'Hiring Urgently',
      isFeatured: Boolean(job.isFeatured),
      isUrgent: Boolean(job.isUrgent),
      overview: job.overview,
      descriptionHtml: job.descriptionHtml,
      tags: job.tags?.join(', ') || '',
      status: job.status,
    });
    setIsModalOpen(true);
  };

  const toggleBatch = (batchName: string) => {
    if (formData.batches.includes(batchName)) {
      setFormData({
        ...formData,
        batches: formData.batches.filter((b) => b !== batchName),
      });
    } else {
      setFormData({
        ...formData,
        batches: [...formData.batches, batchName],
      });
    }
  };

  function getDefaultDescriptionTemplate(companyName: string, roleTitle: string) {
    const comp = companyName || 'The Company';
    const role = roleTitle || 'Software Engineer';
    return `<h3>About ${comp}</h3>
<p>${comp} is a leading global technology and services organization providing industry-standard enterprise solutions.</p>

<h3>Job Summary & Roles</h3>
<ul>
  <li>Collaborate with cross-functional development teams to build scalable software and data solutions.</li>
  <li>Write clean, efficient, and well-tested code following best engineering practices.</li>
  <li>Participate in agile sprints, bug fixes, performance optimization, and system testing.</li>
</ul>

<h3>Eligibility & Qualifications</h3>
<ul>
  <li><strong>Degree:</strong> BE / B.Tech (All Branches), BCA, MCA, B.Sc (Computer Science / IT), Any Graduate.</li>
  <li><strong>Batch:</strong> 2024, 2025 & 2026 Batch Freshers.</li>
  <li><strong>Academic Criteria:</strong> Minimum 60% or 6.0 CGPA throughout academics.</li>
  <li><strong>Experience:</strong> Freshers (0 - 1 Year).</li>
</ul>

<h3>Required Skills</h3>
<ul>
  <li>Good foundational knowledge in programming (Java, Python, C++, or JavaScript) and SQL.</li>
  <li>Understanding of Data Structures, Algorithms, and Object-Oriented Programming (OOP).</li>
  <li>Strong analytical, logical reasoning, and problem-solving abilities.</li>
  <li>Good English written and verbal communication skills.</li>
</ul>

<h3>Selection Process</h3>
<ol>
  <li>Online Aptitude & Coding Assessment.</li>
  <li>Technical Round Interview.</li>
  <li>HR / Managerial Round.</li>
</ol>`;
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminKey = sessionStorage.getItem('admin_key') || '';

    const payload = {
      title: formData.title,
      company: formData.company,
      companyLogo: formData.companyLogo,
      companyWebsite: formData.companyWebsite,
      roleCategory: formData.roleCategory,
      jobType: formData.jobType,
      location: formData.location,
      experience: formData.experience,
      batches: formData.batches,
      qualifications: formData.qualifications.split(',').map((q) => q.trim()).filter(Boolean),
      salary: formData.salary,
      applyUrl: formData.applyUrl,
      deadline: formData.deadline,
      isFeatured: formData.isFeatured,
      isUrgent: formData.isUrgent,
      overview: formData.overview || `${formData.company} is hiring for ${formData.title}. Read details and apply online.`,
      descriptionHtml: formData.descriptionHtml,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: formData.status,
    };

    setLoading(true);
    try {
      if (editingJob) {
        // Update
        const res = await fetch(`/api/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setActionSuccess('Job updated successfully!');
          setIsModalOpen(false);
          fetchJobs();
        } else {
          alert(data.message || 'Failed to update job');
        }
      } else {
        // Create
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setActionSuccess('New job posted successfully!');
          setIsModalOpen(false);
          fetchJobs();
        } else {
          alert(data.message || 'Failed to create job');
        }
      }
    } catch {
      alert('Error communicating with server');
    } finally {
      setLoading(false);
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const adminKey = sessionStorage.getItem('admin_key') || '';

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess('Job deleted successfully');
        fetchJobs();
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch {
      alert('Error communicating with server');
    }
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-md w-full text-white shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold font-heading">Admin Portal Login</h1>
            <p className="text-xs text-slate-400">
              Enter your master Admin Secret Key / PIN to manage jobs and post off-campus drives.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Secret Key / Passcode
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter secret PIN (default: admin123)"
                className="w-full py-3 px-4 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Unlock Admin Dashboard'}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Public Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ADMIN CMS ACTIVE
              </span>
              <span className="text-xs text-slate-400">• Single-Admin Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Job Listings Management
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={openCreateModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-4 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {actionSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Published</p>
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading">{jobs.length}</h2>
            </div>
            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Drives</p>
              <h2 className="text-2xl font-extrabold text-emerald-600 font-heading">
                {jobs.filter((j) => j.status === 'active').length}
              </h2>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monetization Ready</p>
              <h2 className="text-sm font-extrabold text-indigo-600 font-heading">Google AdSense Enabled</h2>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base font-heading">All Job Posts</h2>
            <span className="text-xs text-slate-500">{jobs.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Company & Job Title</th>
                  <th className="py-3 px-4">Role Domain</th>
                  <th className="py-3 px-4">Batches</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden font-bold text-slate-700">
                          {job.companyLogo ? (
                            <img src={job.companyLogo} alt="" className="w-full h-full object-cover" />
                          ) : (
                            job.company.charAt(0)
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-brand-600 block text-[11px] uppercase">
                            {job.company}
                          </span>
                          <span className="font-bold text-slate-900 text-xs line-clamp-1">
                            {job.title}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{job.roleCategory}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {job.batches.slice(0, 2).map((b, i) => (
                          <span key={i} className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{job.location}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">{job.salary}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          job.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {job.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/job/${job.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg"
                          title="View Live Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Edit Job"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free Vercel Deployment & AdSense Setup Tip Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold font-heading">
              100% Free Hosting on Vercel & Google AdSense Setup
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            To deploy this live for $0/month: push this folder to your GitHub repository and import it into Vercel. In Vercel Project Settings &gt; Environment Variables, set <code className="text-indigo-300 font-mono">ADMIN_SECRET_KEY</code>, <code className="text-indigo-300 font-mono">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> (your ca-pub), and <code className="text-indigo-300 font-mono">NEXT_PUBLIC_SITE_URL</code>. Vercel automatically deploys with global CDN, free SSL, and custom domain support!
          </p>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  {editingJob ? 'Edit Job Posting' : 'Publish New Off-Campus Job'}
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in the job details. It will immediately appear on the homepage and search feeds.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Job Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Job Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Datavail Junior SQL Developer Off Campus Drive Freshers Apply Now"
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Company & Role Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Datavail, Amazon, TCS"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role Category / Domain *
                  </label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  >
                    {ROLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Direct Apply URL (CRITICAL) */}
              <div>
                <label className="block font-bold text-emerald-700 mb-1 flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  Direct Official Apply URL * (Opens in new tab when candidate clicks Apply)
                </label>
                <input
                  type="url"
                  required
                  value={formData.applyUrl}
                  onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                  placeholder="https://eifn.fa.us6.oraclecloud.com/... or company career portal link"
                  className="w-full py-2.5 px-3 bg-emerald-50/50 border border-emerald-300 rounded-xl font-medium text-emerald-950 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Salary, Location, Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary / Package</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹4.5 LPA - ₹6.5 LPA"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bangalore / Remote"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. Freshers (0-1 yrs)"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Batch Selector Checkboxes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Eligible Batches (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_BATCHES.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => toggleBatch(b)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        formData.batches.includes(b)
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {b} {formData.batches.includes(b) && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Logo & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Logo Image URL</label>
                  <input
                    type="url"
                    value={formData.companyLogo}
                    onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                    placeholder="https://... image URL (optional)"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Official Website</label>
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Flags: Featured & Urgent */}
              <div className="flex items-center gap-6 py-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <span>Featured On Homepage Top</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-700">
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-600"
                  />
                  <span>Hiring Urgently Badge</span>
                </label>
              </div>

              {/* Short Overview */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Overview / Summary</label>
                <textarea
                  rows={2}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="Short 2-line summary displayed at the top of the job post..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              {/* Full Rich Description HTML */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">
                    Full Job Description & Eligibility (HTML supported)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        descriptionHtml: getDefaultDescriptionTemplate(formData.company, formData.title),
                      })
                    }
                    className="text-indigo-600 hover:underline font-bold text-[11px]"
                  >
                    Insert Standard Fresher Template
                  </button>
                </div>
                <textarea
                  rows={8}
                  required
                  value={formData.descriptionHtml}
                  onChange={(e) => setFormData({ ...formData, descriptionHtml: e.target.value })}
                  placeholder="<h3>About Company</h3>..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2.5 px-7 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md"
                >
                  {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
