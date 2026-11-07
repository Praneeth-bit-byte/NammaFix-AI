import React from 'react';
import { BarChart3, MapPin, Users, CheckCircle2, Clock } from 'lucide-react';
import { BENGALURU_WARDS } from '../mockData';

interface WardAnalyticsProps {
  language: 'en' | 'kn';
}

export const WardAnalytics: React.FC<WardAnalyticsProps> = ({ language }) => {
  const totalIssuesCount = BENGALURU_WARDS.reduce((acc, w) => acc + w.totalIssues, 0);
  const totalResolvedCount = BENGALURU_WARDS.reduce((acc, w) => acc + w.resolvedIssues, 0);
  const overallResolutionRate = Math.round((totalResolvedCount / totalIssuesCount) * 100);
  const overallAvgDays = (
    BENGALURU_WARDS.reduce((acc, w) => acc + w.avgResolutionDays, 0) / BENGALURU_WARDS.length
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header & KPI Metrics */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-8 text-white shadow-xl border border-blue-500/30">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-sky-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <BarChart3 className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'en' ? 'BBMP Ward Infrastructure Analytics' : 'ಬಿಬಿಎಂಪಿ ವಾರ್ಡ್ ವಿಶ್ಲೇಷಣೆ'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en' ? 'Bengaluru Civic Performance & SLA Dashboard' : 'ಬೆಂಗಳೂರು ನಾಗರಿಕ ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {language === 'en'
              ? 'Monitoring resolution efficiency, officer accountability, and infrastructure health across Bengaluru pilot zones.'
              : 'ಬೆಂಗಳೂರು ವಲಯಗಳಲ್ಲಿ ಪರಿಹಾರದ ದಕ್ಷತೆ ಮತ್ತು ಅಧಿಕಾರಿಗಳ ಜವಾಬ್ದಾರಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುವುದು.'}
          </p>
        </div>

        {/* High-level Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4">
            <span className="text-slate-400 text-xs block">Pilot Wards Monitored</span>
            <span className="text-xl sm:text-3xl font-extrabold font-mono tabular-nums text-white mt-1 block">
              7 / 243
            </span>
          </div>
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4">
            <span className="text-slate-400 text-xs block">Total Issues Logged</span>
            <span className="text-xl sm:text-3xl font-extrabold font-mono tabular-nums text-sky-400 mt-1 block">
              {totalIssuesCount}
            </span>
          </div>
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4">
            <span className="text-slate-400 text-xs block">Verified Resolved ({overallResolutionRate}%)</span>
            <span className="text-xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-1 block">
              {totalResolvedCount}
            </span>
          </div>
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4">
            <span className="text-slate-400 text-xs block">Average Resolution SLA</span>
            <span className="text-xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400 mt-1 block">
              {overallAvgDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Ward Breakdown Table (Desktop/Tablet) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Ward-wise Breakdown & Responsible Engineers
            </h2>
            <p className="text-xs text-slate-500">
              Real-time resolution SLAs and assigned BBMP / BESCOM / BWSSB nodal officers.
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg font-semibold">
            7 Pilot Wards Active
          </span>
        </div>

        {/* Desktop & Tablet Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="p-4">Ward Name</th>
                <th className="p-4">BBMP Zone</th>
                <th className="p-4 text-right">Total Issues</th>
                <th className="p-4 text-right">Resolved</th>
                <th className="p-4">Resolution Rate</th>
                <th className="p-4 text-right">Avg SLA</th>
                <th className="p-4">Official in Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BENGALURU_WARDS.map(ward => {
                const resolutionRate = Math.round((ward.resolvedIssues / ward.totalIssues) * 100);
                return (
                  <tr key={ward.name} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{ward.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{ward.zone}</td>
                    <td className="p-4 text-right font-mono tabular-nums font-bold text-slate-800">
                      {ward.totalIssues}
                    </td>
                    <td className="p-4 text-right font-mono tabular-nums font-bold text-emerald-600">
                      {ward.resolvedIssues}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${resolutionRate}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums font-semibold text-slate-700">
                          {resolutionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono tabular-nums text-slate-700">
                      {ward.avgResolutionDays} Days
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{ward.officialInCharge}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack (< 768px) */}
        <div className="md:hidden divide-y divide-slate-100">
          {BENGALURU_WARDS.map(ward => {
            const resolutionRate = Math.round((ward.resolvedIssues / ward.totalIssues) * 100);
            return (
              <div key={ward.name} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{ward.name}</h3>
                      <p className="text-xs text-slate-500">{ward.zone}</p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
                    {resolutionRate}% Resolved
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${resolutionRate}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Total</span>
                    <span className="font-mono tabular-nums font-bold text-slate-800">{ward.totalIssues}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Verified</span>
                    <span className="font-mono tabular-nums font-bold text-emerald-600">{ward.resolvedIssues}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Avg SLA</span>
                    <span className="font-mono tabular-nums font-bold text-slate-800">{ward.avgResolutionDays}d</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium">{ward.officialInCharge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
