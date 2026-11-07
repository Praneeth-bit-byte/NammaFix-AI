import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { Issue, IssueStatus } from '../types';
import { SafeImage } from './SafeImage';

interface AdminPortalProps {
  issues: Issue[];
  onUpdateStatus: (id: string, status: IssueStatus, afterPhoto?: string) => void;
  language: 'en' | 'kn';
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ issues, onUpdateStatus, language }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(issues[0]?.id || '');
  const [newStatus, setNewStatus] = useState<IssueStatus>('In Progress');
  const [afterPhotoUrl, setAfterPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1584467735811-62862d3a334c?auto=format&fit=crop&w=800&q=80'
  );
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const selectedIssue = issues.find(i => i.id === selectedIssueId);

  const handleStatusUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;
    onUpdateStatus(
      selectedIssue.id,
      newStatus,
      newStatus.includes('Resolved') || newStatus === 'Closed & Verified' ? afterPhotoUrl : undefined
    );
    setStatusFeedback(
      `Work order ${selectedIssue.id} status updated to "${newStatus}" and synchronized across BBMP ward databases.`
    );
    setTimeout(() => setStatusFeedback(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-8 text-white shadow-xl border border-blue-500/30">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-sky-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'en' ? 'BBMP Official & Zonal Commissioner Portal' : 'ಬಿಬಿಎಂಪಿ ಅಧಿಕೃತ ಪೋರ್ಟಲ್'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en' ? 'Work Order Dispatch & Simulated AI Anti-Ghost Gate' : 'ಕೆಲಸದ ಆದೇಶ ಮತ್ತು ಆಂಟಿ-ಘೋಸ್ಟ್ ಪರಿಹಾರ ದ್ವಾರ'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {language === 'en'
              ? 'Manage department work orders, dispatch field crews, and upload verifiable closure evidence checked by simulated AI vision.'
              : 'ವಿಭಾಗದ ಕೆಲಸದ ಆದೇಶಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಸಿಮ್ಯುಲೇಟೆಡ್ AI ಪರಿಶೀಲಿಸಿದ ಮುಕ್ತಾಯ ಸಾಕ್ಷ್ಯವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'}
          </p>
        </div>
      </div>

      {statusFeedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusFeedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left: Incoming Work Orders List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4 lg:col-span-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">Incoming Work Orders</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an issue to manage status, assign crew, or upload completion photos.
            </p>
          </div>

          <div className="space-y-3 max-h-[480px] lg:max-h-[550px] overflow-y-auto pr-1">
            {issues.map(issue => {
              const isSelected = selectedIssueId === issue.id;
              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => {
                    setSelectedIssueId(issue.id);
                    setNewStatus(issue.status);
                  }}
                  className={`w-full text-left p-4 rounded-xl border cursor-pointer transition block ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono tabular-nums font-bold text-slate-900">{issue.id}</span>
                    <span className="text-blue-600 font-semibold">{issue.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{issue.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 truncate">{issue.ward}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                    <span className="text-slate-600 font-medium">Status: {issue.status}</span>
                    <span className="text-blue-600 font-bold flex items-center gap-0.5">
                      <span>Manage</span>
                      <ChevronRight className="w-3 h-3 shrink-0" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Issue Management & Ghost Resolution Audit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-6 lg:col-span-2">
          {selectedIssue ? (
            <form onSubmit={handleStatusUpdateSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tabular-nums bg-slate-900 text-white px-2.5 py-1 rounded-lg font-bold">
                      {selectedIssue.id}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md font-semibold">
                      {selectedIssue.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">{selectedIssue.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{selectedIssue.locationAddress} ({selectedIssue.ward})</span>
                  </p>
                </div>
                <div className="sm:text-right bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Current Status</span>
                  <span className="text-xs font-bold text-blue-600">{selectedIssue.status}</span>
                </div>
              </div>

              {/* Before Photo Preview & AI Summary with SafeImage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="h-36 rounded-lg overflow-hidden border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5 px-1 pt-1">
                    Citizen Reported Evidence
                  </span>
                  <SafeImage
                    src={selectedIssue.photoUrl}
                    alt={selectedIssue.title}
                    fallbackCategory={selectedIssue.category}
                    className="w-full h-28 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-blue-700 block mb-1">
                      Simulated AI Triage Summary ({(selectedIssue.aiConfidence * 100).toFixed(0)}% Confidence)
                    </span>
                    <p className="text-slate-700 leading-relaxed">{selectedIssue.aiSummary}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-600">
                    <span>Assigned: <strong>{selectedIssue.assignedOfficial || 'Ward Engineer'}</strong></span>
                    <span className="font-mono tabular-nums">SLA: {selectedIssue.estimatedDays}d</span>
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Update Work Order Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50"
                >
                  <option value="Reported">Reported / ವರದಿ ಮಾಡಲಾಗಿದೆ</option>
                  <option value="AI Verified">AI Verified / ಪರಿಶೀಲಿಸಲಾಗಿದೆ</option>
                  <option value="Dispatched">Dispatched / ಸಿಬ್ಬಂದಿ ನಿಯೋಜಿಸಲಾಗಿದೆ</option>
                  <option value="In Progress">In Progress / ಪ್ರಗತಿಯಲ್ಲಿದೆ</option>
                  <option value="Resolved (Pending AI Check)">
                    Resolved (Pending AI Check) / ಪರಿಹಾರ (AI ಪರಿಶೀಲನೆ ಬಾಕಿ)
                  </option>
                  <option value="Closed & Verified">Closed & Verified / ಮುಕ್ತಾಯ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ</option>
                </select>
              </div>

              {/* Resolution Photo Upload / Verification with SafeImage */}
              {(newStatus.includes('Resolved') || newStatus === 'Closed & Verified') && (
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Simulated Anti-Ghost Resolution Evidence Photo Required
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    Select or upload the completion photo of the repaired site. Simulated AI vision will cross-verify pixel consistency against the initial report.
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      'https://images.unsplash.com/photo-1584467735811-62862d3a334c?auto=format&fit=crop&w=800&q=80',
                      'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
                      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
                    ].map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAfterPhotoUrl(url)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition ${
                          afterPhotoUrl === url
                            ? 'border-blue-600 ring-2 ring-blue-600/20'
                            : 'border-slate-200 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <SafeImage
                          src={url}
                          alt={`Resolution evidence ${idx + 1}`}
                          fallbackCategory="Resolved Site"
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Update Work Order & Run Simulated AI Audit</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-20 text-center text-slate-400 text-sm">
              Select an issue from the incoming work orders list to manage status and review simulated AI audit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
