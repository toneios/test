import React, { useState } from 'react';
import Timer from './components/Timer';
import StatusBar from './components/StatusBar';
import WarningBanner from './components/WarningBanner';
import BackgroundSettings from './components/BackgroundSettings';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <div 
      className="min-h-screen bg-black flex flex-col relative"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blur overlay with reduced blur */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-black/40"
          style={{ backdropFilter: 'blur(4px)' }}
        />
      )}
      
      <WarningBanner />
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute top-4 right-4">
          <BackgroundSettings onImageChange={setBackgroundImage} />
        </div>
        <div className="w-full max-w-2xl bg-gray-900/90 p-8 rounded-xl border border-red-500/20 shadow-[0_0_15px_rgba(255,0,0,0.1)] relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent rounded-xl" />
          <div className="relative">
            <StatusBar />
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;