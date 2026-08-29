'use client';

import React from 'react';
import { Search, Filter, MapPin, GraduationCap, Briefcase, RotateCcw } from 'lucide-react';

interface JobFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  selectedBatch: string;
  setSelectedBatch: (v: string) => void;
  selectedLocation: string;
  setSelectedLocation: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedJobType: string;
  setSelectedJobType: (v: string) => void;
  onReset: () => void;
  totalResults: number;
}

const BATCHES = ['All Batches', '2026 Batch', '2025 Batch', '2024 Batch', 'Freshers'];
const LOCATIONS = ['All Locations', 'Bangalore', 'Hyderabad', 'Pune', 'Remote', 'Chennai', 'Pan India'];
const CATEGORIES = ['All Categories', 'Software Development', 'Database & SQL', 'Data & Analytics', 'QA / Testing'];
const JOB_TYPES = ['All Types', 'Full Time', 'Internship'];

export default function JobFilters({
  search,
  setSearch,
  selectedBatch,
  setSelectedBatch,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  selectedJobType,
  setSelectedJobType,
  onReset,
  totalResults,
}: JobFiltersProps) {
  const isFiltered =
    search !== '' ||
    selectedBatch !== 'All Batches' ||
    selectedLocation !== 'All Locations' ||
    selectedCategory !== 'All Categories' ||
    selectedJobType !== 'All Types';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 md:p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by job title, company (e.g. Datavail, Amazon, SQL, Java), or skills..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Batch Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-indigo-500" />
            Batch
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {BATCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500" />
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-blue-500" />
            Role Domain
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-emerald-500" />
            Job Type
          </label>
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {JOB_TYPES.map((jt) => (
              <option key={jt} value={jt}>
                {jt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter status & Reset button */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
        <span className="font-semibold text-slate-600">
          Showing <span className="text-brand-600 font-bold">{totalResults}</span> matching job listings
        </span>

        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-md transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
