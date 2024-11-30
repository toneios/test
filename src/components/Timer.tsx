import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Power, PowerOff, AlertTriangle, Flame, Cloud } from 'lucide-react';
import PinInput from './PinInput';
import Settings from './Settings';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('0000');
  const [isPermanentlyOn, setIsPermanentlyOn] = useState(false);
  const [isPermanentlyOff, setIsPermanentlyOff] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    
    if ((isRunning || isPermanentlyOn) && !isPermanentlyOff && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isPermanentlyOn, isPermanentlyOff]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(30 * 60);
    setIsPermanentlyOn(false);
    setIsPermanentlyOff(false);
    setVictoryMessage(null);
    setIsLocked(true); // Reset to locked state
  };

  const handlePermanentOn = () => {
    setIsPermanentlyOn(true);
    setIsPermanentlyOff(false);
    setIsRunning(false);
    setTimeLeft(0);
    setVictoryMessage("PHÉNIX REBELLES WIN");
  };

  const handlePermanentOff = () => {
    setIsPermanentlyOff(true);
    setIsPermanentlyOn(false);
    setIsRunning(false);
    setVictoryMessage("OMBRES NOIRS WIN");
  };

  const handleTimeChange = (newTime: number) => {
    setTimeLeft(newTime);
    setIsRunning(false);
    setIsPermanentlyOn(false);
    setIsPermanentlyOff(false);
    setVictoryMessage(null);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="self-end">
        <Settings 
          pin={pin} 
          onPinChange={setPin} 
          currentTime={timeLeft}
          onTimeChange={handleTimeChange}
        />
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-red-500/5 rounded-lg blur-sm" />
        {victoryMessage ? (
          <div className="relative text-4xl font-mono font-bold flex items-center justify-center space-x-3">
            {victoryMessage === "PHÉNIX REBELLES WIN" ? (
              <Flame className="w-8 h-8 text-orange-500" />
            ) : (
              <Cloud className="w-8 h-8 text-gray-500" />
            )}
            <span className={victoryMessage === "PHÉNIX REBELLES WIN" ? "text-orange-500" : "text-gray-500"}>
              {victoryMessage}
            </span>
          </div>
        ) : (
          <div className="relative text-8xl font-mono font-bold text-red-500 tabular-nums">
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {timeLeft < 300 && timeLeft > 0 && !victoryMessage && (
        <div className="flex items-center text-yellow-500 font-mono text-sm">
          <AlertTriangle className="w-4 h-4 mr-2" />
          <span>WARNING: CRITICAL TIME THRESHOLD</span>
        </div>
      )}

      {/* Basic controls - always accessible */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={isRunning ? handlePause : handleStart}
            disabled={isPermanentlyOn || isPermanentlyOff}
            className="flex items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
          >
            {isRunning ? (
              <Pause className="w-8 h-8 text-red-500" />
            ) : (
              <Play className="w-8 h-8 text-green-500" />
            )}
          </button>
          <span className="text-xs font-mono text-gray-400">START SYSTEM</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
          >
            <RefreshCw className="w-8 h-8 text-blue-500" />
          </button>
          <span className="text-xs font-mono text-gray-400">RESTART SYSTEM</span>
        </div>
      </div>

      {/* PIN protected controls */}
      {isLocked ? (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <PinInput correctPin={pin} onPinVerified={() => setIsLocked(false)} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handlePermanentOn}
              disabled={isPermanentlyOn}
              className="flex items-center justify-center w-16 h-16 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/30"
            >
              <Power className="w-8 h-8 text-green-500" />
            </button>
            <span className="text-xs font-mono text-gray-400">LANCEMENT INSTANTANÉ</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handlePermanentOff}
              disabled={isPermanentlyOff}
              className="flex items-center justify-center w-16 h-16 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30"
            >
              <PowerOff className="w-8 h-8 text-red-500" />
            </button>
            <span className="text-xs font-mono text-gray-400">ARRET DEFINITIF</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;