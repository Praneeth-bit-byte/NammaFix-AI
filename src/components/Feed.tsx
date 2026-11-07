import React, { useState } from 'react';
import { Search, MapPin, ThumbsUp, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { Issue, IssueStatus } from '../types';
import { BENGALURU_WARDS } from '../mockData';
import { SafeImage } from './SafeImage';

interface FeedProps {
  issues: Issue[];
  onSelectIssue: (issue: Issue) => void;
  onUpvote: (id: string) => void;
  language: 'en' | 'kn';
  onOpenReport: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  issues,
  onSelectIssue,
  onUpvote,
  language,
  onOpenReport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeTabMode, setActiveTabMode] = useState<'feed' | 'map'>('feed');

  const categories = ['All', 'Pothole', 'Garbage Dump', 'Streetlight Failure', 'Water Leakage', 'Drainage Overflow'];
  const statuses = ['All', 'Reported', 'AI Verified', 'In Progress', 'Resolved (Pending AI Check)', 'Closed & Verified'];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.locationAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesWard = selectedWard === 'All' || issue.ward === selectedWard;
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesWard && matchesStatus;
  });

  const statusColors: Record<IssueStatus, string> = {
    'Reported': 'bg-slate-100 text-slate-700 border-slate-300',
    'AI Verified': 'bg-blue-50 text-blue-700 border-blue-200',
    'Dispatched': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'In Progress': 'bg-amber-50 text-amber-800 border-amber-200',
    'Resolved (Pending AI Check)': 'bg-sky-50 text-sky-800 border-sky-200',
    'Closed & Verified': 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  const priorityBadgeColors: Record<string, string> = {
    'Low': 'text-slate-600 bg-slate-100 border-slate-200',
    'Medium': 'text-blue-700 bg-blue-50 border-blue-200',
    'High': 'text-amber-800 bg-amber-50 border-amber-200',
    'Emergency': 'text-red-700 bg-red-50 border-red-200'
  };

  const verifiedCount = issues.filter(i => i.status === 'Closed & Verified' || i.status === 'AI Verified').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress' || i.status === 'Dispatched').length;
  const emergencyCount = issues.filter(i => i.priority === 'Emergency').length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Citizen Dashboard Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-8 text-white shadow-xl border border-blue-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-sky-300 text-xs font-semibold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'Simulated AI Vision & 7 Pilot Wards Coverage' : 'ಸಿಮ್ಯುಲೇಟೆಡ್ AI ವೀಕ್ಷಣೆ & 7 ವಾರ್ಡ್‌ಗಳು'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'en' ? 'Fixing Bengaluru, One Ward at a Time.' : 'ನಮ್ಮ ಬೆಂಗಳೂರನ್ನು ಒಟ್ಟಾಗಿ ಸರಿಪಡಿಸೋಣ.'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'Report potholes, garbage dumps, water leaks, and streetlight failures with geo-tagged simulated AI verification across 7 Bengaluru pilot wards.'
                : 'ಗುಂಡಿಗಳು, ಕಸದ ರಾಶಿಗಳು ಮತ್ತು ಬೀದಿ ದೀಪಗಳ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenReport}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{language === 'en' ? 'Report New Issue' : 'ಹೊಸ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabMode(activeTabMode === 'feed' ? 'map' : 'feed')}
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{activeTabMode === 'feed' ? 'Explore Ward Map' : 'Back to Issues Feed'}</span>
              </button>
            </div>
          </div>

          {/* Citizen Dashboard KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 shrink-0 lg:w-80">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block">Active Reports</span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-white mt-0.5 block">
                {issues.length}
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block">AI Verified</span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-sky-400 mt-0.5 block">
                {verifiedCount}
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block">In Progress</span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-amber-400 mt-0.5 block">
                {inProgressCount}
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block">Pilot Scope</span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-emerald-400 mt-0.5 block">
                7 Wards
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search by title, landmark or ID (e.g. NF-8492)...' : 'ಹುಡುಕಿ...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none bg-slate-50/60"
            />
          </div>

          {/* View Toggle (Feed vs Map) */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTabMode('feed')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTabMode === 'feed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Issues Feed ({filteredIssues.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTabMode('map')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTabMode === 'map'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Geospatial Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category, Ward & Status Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category Filter</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">BBMP Ward (7 Pilot Wards)</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="All">All 7 Pilot Wards (ಬೆಂಗಳೂರು)</option>
              {BENGALURU_WARDS.map(w => (
                <option key={w.name} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Resolution Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area: Feed Grid or Geospatial Map View */}
      {activeTabMode === 'feed' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredIssues.length === 0 ? (
            <div className="col-span-full py-16 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No civic issues found matching your filters</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Try resetting the category, ward, or status filters, or submit a new civic issue report.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedWard('All');
                  setSelectedStatus('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredIssues.map(issue => (
              <article
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Card Thumbnail with SafeImage fallback */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <SafeImage
                      src={issue.photoUrl}
                      alt={issue.title}
                      fallbackCategory={issue.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-mono tabular-nums bg-slate-900/90 text-white px-2.5 py-1 rounded-lg border border-white/15 font-bold shadow-sm">
                        {issue.id}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold border shadow-sm ${statusColors[issue.status]}`}>
                        {issue.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold bg-blue-600/90 px-2.5 py-0.5 rounded-md">
                        {issue.category}
                      </span>
                      <span className="font-mono tabular-nums text-[11px] bg-slate-900/80 px-2 py-0.5 rounded-md">
                        AI {(issue.aiConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-medium truncate">{issue.ward}</span>
                      <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold shrink-0 ${priorityBadgeColors[issue.priority]}`}>
                        {issue.priority}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition">
                      {issue.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{issue.locationAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpvote(issue.id);
                    }}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-semibold py-1 px-2 -ml-2 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="tabular-nums">{issue.upvotes} Upvotes</span>
                  </button>
                  <div className="flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-0.5 transition">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      ) : (
        /* Geospatial Map View */
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Bengaluru Ward Geospatial Inspector</h3>
              <p className="text-xs text-slate-500">
                Interactive ward-wise cluster map across 7 pilot Bengaluru wards. Select any pin to inspect simulated AI telemetry.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 font-semibold tabular-nums">
                Emergency ({emergencyCount})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-semibold tabular-nums">
                Active ({inProgressCount})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold tabular-nums">
                Verified ({verifiedCount})
              </span>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[500px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            {/* Map Coordinate Grid Background */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Map Pins */}
            <div className="absolute inset-0 p-4 sm:p-8">
              {filteredIssues.map((issue, idx) => {
                const topPercent = 16 + ((idx * 19) % 64);
                const leftPercent = 14 + ((idx * 23) % 72);
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => onSelectIssue(issue)}
                    style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group focus:outline-none z-10"
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition transform group-hover:scale-110 ${
                          issue.priority === 'Emergency'
                            ? 'bg-red-600 text-white'
                            : issue.status.includes('Resolved') || issue.status === 'Closed & Verified'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0" />
                      </div>
                      <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/90 text-white font-mono text-[10px] font-semibold border border-slate-700 shadow whitespace-nowrap">
                        {issue.id}
                      </span>
                      <div className="hidden sm:block absolute bottom-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-30 border border-blue-500/40 text-left">
                        <p className="font-bold text-sky-300">{issue.id} · {issue.category}</p>
                        <p className="font-semibold text-white mt-0.5">{issue.title}</p>
                        <p className="text-[11px] text-slate-400">{issue.ward}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 text-xs text-slate-300 sm:max-w-sm shadow-lg">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Simulated GIS Boundary Layer (7 Pilot Wards)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Select any geo-tagged marker above to inspect GPS coordinates, simulated AI confidence score, and dispatched BBMP engineering crew.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
