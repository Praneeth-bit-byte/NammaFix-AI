import React, { useState } from 'react';
import { X, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { Issue, IssueCategory, IssuePriority } from '../types';
import { BENGALURU_WARDS } from '../mockData';
import confetti from 'canvas-confetti';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIssue: (issue: Issue) => void;
  language: 'en' | 'kn';
}

const SAMPLE_PHOTOS = [
  { name: 'Pothole (Sony World)', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f8?auto=format&fit=crop&w=800&q=80', cat: 'Pothole' },
  { name: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80', cat: 'Garbage Dump' },
  { name: 'Streetlight Dark', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', cat: 'Streetlight Failure' },
  { name: 'Water Pipe Leak', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f86f6?auto=format&fit=crop&w=800&q=80', cat: 'Water Leakage' },
  { name: 'Open Drain', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', cat: 'Drainage Overflow' }
];

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onAddIssue, language }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Pothole');
  const [ward, setWard] = useState(BENGALURU_WARDS[0].name);
  const [locationAddress, setLocationAddress] = useState('');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_PHOTOS[0].url);
  const [priority, setPriority] = useState<IssuePriority>('Medium');
  const [reporterName, setReporterName] = useState('Ananya Swaminathan');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ confidence: number; summary: string } | null>(null);

  if (!isOpen) return null;

  const handleSimulateAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult({
        confidence: 0.96,
        summary: `AI Vision verified ${category} with high spatial confidence. Auto-routed to ${ward} BBMP jurisdictional team.`
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !locationAddress) return;

    const newIssue: Issue = {
      id: `NF-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      description,
      category,
      ward,
      locationAddress,
      lat: 12.9716 + (Math.random() - 0.5) * 0.05,
      lng: 77.5946 + (Math.random() - 0.5) * 0.05,
      photoUrl,
      status: 'Reported',
      priority,
      upvotes: 1,
      aiConfidence: aiResult ? aiResult.confidence : 0.94,
      aiSummary: aiResult ? aiResult.summary : `AI processed report for ${category}. Routed to BBMP ward officer.`,
      reportedBy: reporterName,
      createdAt: new Date().toISOString(),
      estimatedDays: priority === 'Emergency' ? 1 : priority === 'High' ? 2 : 4,
      comments: []
    };

    onAddIssue(newIssue);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900 text-white rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">
              {language === 'en'
                ? 'Report Civic Issue with AI Verification'
                : 'AI ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Category & Ward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                {language === 'en' ? 'Issue Category' : 'ಸಮಸ್ಯೆಯ ವರ್ಗ'}
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as IssueCategory;
                  setCategory(cat);
                  const matched = SAMPLE_PHOTOS.find(p => p.cat === cat);
                  if (matched) setPhotoUrl(matched.url);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm bg-slate-50"
              >
                <option value="Pothole">Pothole / ಗುಂಡಿ</option>
                <option value="Garbage Dump">Garbage Dump / ಕಸದ ತೊಟ್ಟಿ</option>
                <option value="Streetlight Failure">Streetlight Failure / ದೀಪ ವೈಫಲ್ಯ</option>
                <option value="Water Leakage">Water Leakage / ನೀರು ಸೋರಿಕೆ</option>
                <option value="Drainage Overflow">Drainage Overflow / ಚರಂಡಿ ಉಕ್ಕಿ ಹರಿಯುವುದು</option>
                <option value="Stray Animals">Stray Animals / ಬೀದಿ ನಾಯಿಗಳು</option>
                <option value="Broken Footpath">Broken Footpath / ಮುರಿದ ಕಾಲುದಾರಿ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                {language === 'en' ? 'BBMP Ward' : 'ಬಿಬಿಎಂಪಿ ವಾರ್ಡ್'}
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm bg-slate-50"
              >
                {BENGALURU_WARDS.map(w => (
                  <option key={w.name} value={w.name}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              {language === 'en' ? 'Issue Title' : 'ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ'}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Deep pothole near junction causing accidents"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              {language === 'en' ? 'Detailed Description' : 'ವಿವರವಾದ ವಿವರಣೆ'}
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the issue size, exact landmark, and urgency..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Location Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{language === 'en' ? 'Location / Landmark in Bengaluru' : 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಸ್ಥಳ / ಹೆಗ್ಗುರುತು'}</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 100ft Road, Indiranagar near Metro Station"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Photo & AI Verification */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase">
              {language === 'en' ? 'Photo Evidence & AI Validation' : 'ಫೋಟೋ ಸಾಕ್ಷ್ಯ & AI ಮೌಲ್ಯಮಾಪನ'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SAMPLE_PHOTOS.map(sp => (
                <button
                  key={sp.name}
                  type="button"
                  onClick={() => {
                    setPhotoUrl(sp.url);
                    setCategory(sp.cat as IssueCategory);
                  }}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition text-left ${
                    photoUrl === sp.url
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={sp.url}
                    alt={sp.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-16 object-cover"
                  />
                  <p className="text-[10px] p-1.5 bg-slate-100 text-center truncate font-semibold text-slate-700">
                    {sp.cat}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={handleSimulateAI}
                disabled={isAnalyzing}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 text-sky-400 shrink-0 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Running Gemini Vision AI...' : 'Run AI Verification Check'}</span>
              </button>
              <span className="text-xs text-slate-500 text-center sm:text-right">
                Instant Geo-spatial Ward Routing
              </span>
            </div>

            {aiResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-blue-950">
                    AI Verified (Confidence: {(aiResult.confidence * 100).toFixed(0)}%):{' '}
                  </span>
                  {aiResult.summary}
                </div>
              </div>
            )}
          </div>

          {/* Priority & Reporter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                {language === 'en' ? 'Priority Urgency' : 'ತುರ್ತು ಪ್ರಾಮುಖ್ಯತೆ'}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as IssuePriority)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm bg-slate-50"
              >
                <option value="Low">Low / ಕಡಿಮೆ</option>
                <option value="Medium">Medium / ಮಧ್ಯಮ</option>
                <option value="High">High / ಹೆಚ್ಚು</option>
                <option value="Emergency">Emergency / ತುರ್ತು</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                {language === 'en' ? 'Your Name (Citizen)' : 'ನಿಮ್ಮ ಹೆಸರು'}
              </label>
              <input
                type="text"
                required
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-blue-600/25 transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Submit to BBMP & AI Network</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
