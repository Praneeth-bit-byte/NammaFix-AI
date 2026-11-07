import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { WardAnalytics } from './components/WardAnalytics';
import { Leaderboard } from './components/Leaderboard';
import { AdminPortal } from './components/AdminPortal';
import { ReportModal } from './components/ReportModal';
import { IssueDetailModal } from './components/IssueDetailModal';
import { INITIAL_ISSUES } from './mockData';
import { Issue, Comment, IssueStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  const [userRole, setUserRole] = useState<'citizen' | 'official'>('citizen');
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleAddIssue = (newIssue: Issue) => {
    setIssues(prev => [newIssue, ...prev]);
  };

  const handleUpvote = (id: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { ...issue, upvotes: issue.upvotes + 1 };
      }
      return issue;
    }));
    if (selectedIssue && selectedIssue.id === id) {
      setSelectedIssue(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    }
  };

  const handleAddComment = (issueId: string, comment: Comment) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, comments: [...issue.comments, comment] };
      }
      return issue;
    }));
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(prev => prev ? { ...prev, comments: [...prev.comments, comment] } : null);
    }
  };

  const handleUpdateStatus = (id: string, status: IssueStatus, afterPhoto?: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          status,
          afterPhotoUrl: afterPhoto || issue.afterPhotoUrl
        };
      }
      return issue;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {activeTab === 'feed' && (
          <Feed
            issues={issues}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onUpvote={handleUpvote}
            language={language}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'wards' && (
          <WardAnalytics language={language} />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard language={language} />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            issues={issues}
            onUpdateStatus={handleUpdateStatus}
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">NammaFix-AI</span>
            <span>·</span>
            <span>Bengaluru Civic Infrastructure & Anti-Ghost Resolution Platform</span>
          </div>
          <p className="text-slate-500">
            Built for BBMP, BESCOM & BWSSB Autonomous Ward Governance.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddIssue={handleAddIssue}
        language={language}
      />

      <IssueDetailModal
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onUpvote={handleUpvote}
        onAddComment={handleAddComment}
        onVerifyResolution={(id, verified) => {
          handleUpdateStatus(id, verified ? 'Closed & Verified' : 'In Progress');
        }}
        language={language}
        userRole={userRole}
      />
    </div>
  );
};
