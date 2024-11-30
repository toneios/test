import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Clock, X, Check } from 'lucide-react';

interface SettingsProps {
  pin: string;
  onPinChange: (newPin: string) => void;
  currentTime: number;
  onTimeChange: (newTime: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ pin, onPinChange, currentTime, onTimeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempPin, setTempPin] = useState(pin);
  const [tempMinutes, setTempMinutes] = useState(Math.floor(currentTime / 60).toString());
  const [tempSeconds, setTempSeconds] = useState((currentTime % 60).toString());
  const [isValidated, setIsValidated] = useState(false);
  const [isTimerValidated, setIsTimerValidated] = useState(false);
  const [activeTab, setActiveTab] = useState<'pin' | 'timer'>('pin');

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setTempPin(value);
    setIsValidated(false);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setTempMinutes(value);
    setIsTimerValidated(false);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (parseInt(value) < 60) {
      setTempSeconds(value);
      setIsTimerValidated(false);
    }
  };

  const handleValidatePin = () => {
    if (tempPin.length === 4) {
      onPinChange(tempPin);
      setIsValidated(true);
      
      setTimeout(() => {
        setIsOpen(false);
        setIsValidated(false);
        setActiveTab('pin');
      }, 5000);
    }
  };

  const handleValidateTimer = () => {
    const minutes = parseInt(tempMinutes) || 0;
    const seconds = parseInt(tempSeconds) || 0;
    const totalSeconds = (minutes * 60) + seconds;
    onTimeChange(totalSeconds);
    setIsTimerValidated(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsTimerValidated(false);
      setActiveTab('pin');
    }, 5000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTempPin(pin);
    setTempMinutes(Math.floor(currentTime / 60).toString());
    setTempSeconds((currentTime % 60).toString());
    setIsValidated(false);
    setIsTimerValidated(false);
    setActiveTab('pin');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
      >
        <SettingsIcon className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-700 z-50">
            <div className="flex justify-between items-center">
              <div className="text-sm font-mono text-gray-400 flex items-center">
                {activeTab === 'pin' ? (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    <span>SECURITY CONFIGURATION</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>TIMER CONFIGURATION</span>
                  </>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex space-x-2 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('pin')}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  activeTab === 'pin'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                PIN CODE
              </button>
              <button
                onClick={() => setActiveTab('timer')}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  activeTab === 'timer'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                TIMER
              </button>
            </div>
            
            <div className="space-y-4">
              {activeTab === 'pin' ? (
                <>
                  <label className="text-sm text-gray-300 font-mono block">
                    ACCESS CODE (4 DIGITS)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      value={tempPin}
                      onChange={handlePinChange}
                      placeholder="ENTER NEW CODE"
                      className={`flex-1 bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 font-mono ${
                        isValidated ? 'border-green-500' : ''
                      }`}
                      maxLength={4}
                    />
                    <button
                      onClick={handleValidatePin}
                      disabled={tempPin.length !== 4}
                      className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                        isValidated
                          ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {isValidated ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        'VALIDATE'
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label className="text-sm text-gray-300 font-mono block">
                    SET TIMER (MM:SS)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tempMinutes}
                      onChange={handleMinutesChange}
                      placeholder="MM"
                      className={`w-20 bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 font-mono text-center ${
                        isTimerValidated ? 'border-green-500' : ''
                      }`}
                      maxLength={2}
                    />
                    <span className="text-gray-400 font-mono self-center">:</span>
                    <input
                      type="text"
                      value={tempSeconds}
                      onChange={handleSecondsChange}
                      placeholder="SS"
                      className={`w-20 bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 font-mono text-center ${
                        isTimerValidated ? 'border-green-500' : ''
                      }`}
                      maxLength={2}
                    />
                    <button
                      onClick={handleValidateTimer}
                      className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                        isTimerValidated
                          ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {isTimerValidated ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        'SET'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {activeTab === 'pin' && isValidated && (
              <div className="text-green-500 text-sm font-mono flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>PIN UPDATED SUCCESSFULLY</span>
              </div>
            )}

            {activeTab === 'timer' && isTimerValidated && (
              <div className="text-green-500 text-sm font-mono flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>TIMER UPDATED SUCCESSFULLY</span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Settings;