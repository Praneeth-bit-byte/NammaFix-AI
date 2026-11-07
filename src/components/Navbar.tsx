import React from 'react';
import { Shield, MapPin, BarChart3, ShieldCheck, Trophy, PlusCircle, Globe, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'kn';
  setLanguage: (lang: 'en' | 'kn') => void;
  userRole: 'citizen' | 'official';
  setUserRole: (role: 'citizen' | 'official') => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  userRole,
  setUserRole,
  onOpenReport,
}) => {
  const navItems = [
    { id: 'feed', labelEn: 'Issues & Map', labelKn: 'ಸಮಸ್ಯೆಗಳು & ನಕ್ಷೆ', icon: MapPin },
    { id: 'wards', labelEn: 'Ward Analytics', labelKn: 'ವಾರ್ಡ್ ವಿಶ್ಲೇಷಣೆ', icon: BarChart3 },
    { id: 'leaderboard', labelEn: 'Leaderboard', labelKn: 'ಲೀಡರ್‌ಬೋರ್ಡ್', icon: Trophy },
    { id: 'admin', labelEn: 'BBMP Action Portal', labelKn: 'ಬಿಬಿಎಂಪಿ ಪೋರ್ಟಲ್', icon: ShieldCheck },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Primary Header Row */}
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white whitespace-nowrap">
                  NammaFix-AI
                </span>
                <span className="hidden sm:inline-block text-[11px] bg-blue-500/20 text-sky-300 px-2 py-0.5 rounded-md font-semibold border border-blue-400/30 whitespace-nowrap">
                  {language === 'en' ? 'Bengaluru' : 'ಬೆಂಗಳೂರು'}
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400 truncate">
                {language === 'en' ? 'AI Civic Infrastructure Platform' : 'AI ನಾಗರಿಕ ಮೂಲಸೌಕರ್ಯ ವೇದಿಕೆ'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{language === 'en' ? item.labelEn : item.labelKn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              className="px-2 sm:px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

            {/* Role Toggle */}
            <button
              type="button"
              onClick={() => setUserRole(userRole === 'citizen' ? 'official' : 'citizen')}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                userRole === 'official'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
              }`}
              title="Switch Active Role"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">
                {userRole === 'official' ? 'Official (BBMP)' : 'Citizen'}
              </span>
              <span className="sm:hidden">
                {userRole === 'official' ? 'BBMP' : 'Citizen'}
              </span>
            </button>

            {/* Report Issue Primary CTA */}
            <button
              type="button"
              onClick={onOpenReport}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-blue-600/25 transition flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>{language === 'en' ? 'Report Issue' : 'ವರದಿ ಮಾಡಿ'}</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Bar (< 1024px) */}
        <nav className="flex lg:hidden items-center gap-1.5 overflow-x-auto py-2.5 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'en' ? item.labelEn : item.labelKn}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
