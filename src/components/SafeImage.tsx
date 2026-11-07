import React, { useState } from 'react';
import { AlertTriangle, Camera } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackCategory?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = '', fallbackCategory = 'Civic Issue' }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`w-full bg-gradient-to-br from-slate-800 to-blue-950 flex flex-col items-center justify-center p-4 text-center text-slate-300 ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center mb-2">
          <Camera className="w-5 h-5 text-sky-400" />
        </div>
        <span className="text-xs font-bold text-white tracking-wide">{fallbackCategory}</span>
        <span className="text-[10px] text-slate-400 mt-0.5">Bengaluru Ward Media</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
