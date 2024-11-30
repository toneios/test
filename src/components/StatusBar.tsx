import React from 'react';
import { Shield, Wifi, Activity } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8 text-xs font-mono">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-green-500">
          <Shield className="w-4 h-4 mr-1" />
          <span>SECURE</span>
        </div>
        <div className="flex items-center text-blue-500">
          <Wifi className="w-4 h-4 mr-1" />
          <span>CONNECTED</span>
        </div>
      </div>
      <div className="flex items-center text-yellow-500">
        <Activity className="w-4 h-4 mr-1" />
        <span>SYSTEM ACTIVE</span>
      </div>
    </div>
  );
};

export default StatusBar;