import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WarningBanner: React.FC = () => {
  return (
    <div className="bg-red-500/10 border-b border-red-500/20 py-2">
      <div className="container mx-auto px-4 flex items-center justify-center text-red-500 font-mono text-sm">
        <AlertTriangle className="w-4 h-4 mr-2" />
        <span>CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY</span>
      </div>
    </div>
  );
};

export default WarningBanner;