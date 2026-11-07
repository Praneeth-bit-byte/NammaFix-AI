import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Sparkles, MapPin, ShieldCheck, CheckCircle2, User, Clock, Camera } from 'lucide-react';
import { Issue, Comment } from '../types';
import { SafeImage } from './SafeImage';

interface IssueDetailModalProps {
  issue: Issue | null;
  onClose: () => void;
  onUpvote: (id: string) => void;
  onAddComment: (issueId: string, comment: Comment) => void;
  onVerifyResolution?: (issueId: string, verified: boolean) => void;
  language: 'en' | 'kn';
  userRole: 'citizen' | 'official';
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  issue,
  onClose,
  onUpvote,
  onAddComment,
  onVerifyResolution,
  language,
  userRole,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  if (!issue) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: userRole === 'official' ? 'Rajesh Kumar (BBMP Official)' : 'Ananya Swaminathan',
      role: userRole === 'official' ? 'BBMP Official' : 'Citizen',
      text: commentText.trim(),
      createdAt: new Date().toISOString()
    };

    onAddComment(issue.id, newComment);
    setCommentText('');
  };

  const handleRunAiAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult(
        'Simulated AI Auditor checked before/after photo visual delta: 98.4% match with resolved state. Ghost resolution risk: ZERO.'
      );
      if (onVerifyResolution) {
        onVerifyResolution(issue.id, true);
      }
    }, 1200);
  };

  const priorityColors = {
    Low: 'bg-slate-800 text-slate-200 border-slate-700',
    Medium: 'bg-blue-500/20 text-sky-300 border-blue-400/30',
    High: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    Emergency: 'bg-red-500/20 text-red-300 border-red-400/40'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900 text-white rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tabular-nums bg-blue-600 text-white px-2.5 py-1 rounded-lg font-bold">
              {issue.id}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${priorityColors[issue.priority]}`}>
              {issue.priority} Priority
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Title & Ward */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-blue-600">{issue.category}</span>
              <span>·</span>
              <span className="font-semibold text-slate-700">{issue.ward}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{issue.title}</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{issue.locationAddress}</span>
            </p>
          </div>

          {/* Photos (Before & After with SafeImage) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Initial Report Photo</span>
              </p>
              <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <SafeImage
                  src={issue.photoUrl}
                  alt={issue.title}
                  fallbackCategory={issue.category}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {issue.afterPhotoUrl ? (
              <div>
                <p className="text-xs font-semibold text-emerald-700 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Resolution Evidence Photo (BBMP)</span>
                </p>
                <div className="h-48 rounded-xl overflow-hidden border border-emerald-200 shadow-sm">
                  <SafeImage
                    src={issue.afterPhotoUrl}
                    alt="After resolution"
                    fallbackCategory="Resolved Site"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[12rem]">
                <Clock className="w-8 h-8 text-slate-400 mb-2 shrink-0" />
                <p className="text-xs font-semibold text-slate-600">Resolution photo pending from field crew.</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Simulated AI Anti-Ghost Audit will trigger once uploaded.
                </p>
              </div>
            )}
          </div>

          {/* AI Summary Box */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 text-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {language === 'en' ? 'Simulated AI Vision & Routing Analysis' : 'ಸಿಮ್ಯುಲೇಟೆಡ್ AI ವಿಶ್ಲೇಷಣೆ'}
                </h3>
              </div>
              <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-md font-mono tabular-nums font-bold">
                {(issue.aiConfidence * 100).toFixed(0)}% Confidence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{issue.aiSummary}</p>
          </div>

          {/* Simulated AI Ghost Resolution Check / Auditor Action */}
          {issue.afterPhotoUrl && issue.status !== 'Closed & Verified' && userRole === 'official' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Simulated Anti-Ghost Resolution Audit Ready</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Run simulated computer vision verification to cross-check before/after pixels.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRunAiAudit}
                disabled={isAuditing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <ShieldCheck className={`w-4 h-4 shrink-0 ${isAuditing ? 'animate-spin' : ''}`} />
                <span>{isAuditing ? 'Analyzing Pixels...' : 'Run Simulated AI Ghost Check'}</span>
              </button>
            </div>
          )}

          {auditResult && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl p-3 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{auditResult}</span>
            </div>
          )}

          {/* Description & Metadata */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Issue Details</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{issue.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Reported By</span>
                <span className="font-semibold text-slate-800">{issue.reportedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Assigned Official</span>
                <span className="font-semibold text-slate-800">{issue.assignedOfficial || 'Unassigned'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">SLA Target</span>
                <span className="font-semibold font-mono tabular-nums text-slate-800">{issue.estimatedDays} Days</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current Status</span>
                <span className="font-semibold text-blue-600">{issue.status}</span>
              </div>
            </div>
          </div>

          {/* Upvote & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onUpvote(issue.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs transition cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4 shrink-0" />
              <span className="tabular-nums">Upvote Issue ({issue.upvotes})</span>
            </button>
            <span className="text-xs text-slate-400 tabular-nums">
              Reported on {new Date(issue.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Discussion & Official Updates ({issue.comments.length})</span>
            </h4>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {issue.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">
                  No comments yet. Be the first to add an update or note.
                </p>
              ) : (
                issue.comments.map(c => (
                  <div key={c.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{c.author}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            c.role === 'BBMP Official'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.role === 'AI Auditor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {c.role}
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                        {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 pl-5">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder={
                  userRole === 'official'
                    ? 'Add official status update as BBMP engineer...'
                    : 'Add a helpful comment or update...'
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer shrink-0"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
