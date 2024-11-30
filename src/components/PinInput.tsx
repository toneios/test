import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';

interface PinInputProps {
  correctPin: string;
  onPinVerified: () => void;
}

const PinInput: React.FC<PinInputProps> = ({ correctPin, onPinVerified }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError(false);
    
    if (value.length === 4) {
      if (value === correctPin) {
        onPinVerified();
        setAttempts(0);
      } else {
        setError(true);
        setAttempts(prev => prev + 1);
        setTimeout(() => setPin(''), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-red-500 font-mono text-sm mb-4 flex items-center">
        <ShieldAlert className="w-4 h-4 mr-2" />
        <span>SECURITY CLEARANCE REQUIRED</span>
      </div>
      
      <div className="flex items-center space-x-2">
        {error ? (
          <Lock className="w-5 h-5 text-red-500" />
        ) : (
          <Unlock className="w-5 h-5 text-gray-400" />
        )}
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          placeholder="ENTER PIN"
          className={`bg-gray-900 text-white px-4 py-2 rounded-lg w-32 text-center font-mono ${
            error ? 'border-2 border-red-500' : 'border border-gray-700'
          }`}
          maxLength={4}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm font-mono">
          ACCESS DENIED - ATTEMPT {attempts}/3
        </div>
      )}
    </div>
  );
};

export default PinInput;