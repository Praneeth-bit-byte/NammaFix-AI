import React from 'react';
import { Trophy, ShieldCheck } from 'lucide-react';
import { LEADERBOARD } from '../mockData';

interface LeaderboardProps {
  language: 'en' | 'kn';
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ language }) => {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-8 text-white shadow-xl border border-blue-500/30">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-sky-300 text-xs font-bold mb-3 border border-blue-400/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{language === 'en' ? 'Namma Bengaluru Civic Champions' : 'ನಮ್ಮ ಬೆಂಗಳೂರು ನಾಗರಿಕ ಚಾಂಪಿಯನ್‌ಗಳು'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {language === 'en' ? 'Citizen Leaderboard & Monthly Awards' : 'ನಾಗರಿಕ ಲೀಡರ್‌ಬೋರ್ಡ್ ಮತ್ತು ಮಾಸಿಕ ಪ್ರಶಸ್ತಿಗಳು'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {language === 'en'
              ? 'Recognizing dedicated residents who report infrastructure issues, verify resolutions, and make Bengaluru a world-class city.'
              : 'ಮೂಲಸೌಕರ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡುವ ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಸಮರ್ಪಿತ ನಿವಾಸಿಗಳನ್ನು ಗುರುತಿಸುವುದು.'}
          </p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Top Bengaluru Contributors (November 2026)
            </h2>
            <p className="text-xs text-slate-500">
              Points earned via verified issue reports and anti-ghost audit participation.
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg font-bold">
            Monthly BBMP Award Race
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {LEADERBOARD.map((user, index) => (
            <div
              key={user.id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                    index === 0
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : index === 1
                      ? 'bg-slate-200 text-slate-800'
                      : index === 2
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  #{index + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{user.name}</h3>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-semibold border border-blue-200">
                      {user.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{user.ward}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pl-13 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-400 block">Reports / Verified</span>
                  <span className="text-xs font-semibold text-slate-700 tabular-nums">
                    {user.reportsCount} reported · {user.verifiedCount} verified
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Civic Points</span>
                  <span className="text-base sm:text-lg font-extrabold font-mono tabular-nums text-blue-600">
                    {user.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
