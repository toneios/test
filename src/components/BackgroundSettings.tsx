import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, Upload } from 'lucide-react';

interface BackgroundSettingsProps {
  onImageChange: (url: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ onImageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) {
      return;
    }

    // Vérifier si c'est une image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    // Créer une URL locale pour l'image
    const imageUrl = URL.createObjectURL(file);
    
    // Tester si l'image peut être chargée
    const img = new Image();
    img.onload = () => {
      onImageChange(imageUrl);
      setIsOpen(false);
    };
    img.onerror = () => {
      setError('Invalid image file');
      URL.revokeObjectURL(imageUrl);
    };
    img.src = imageUrl;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
      >
        <ImageIcon className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-700 z-50">
            <div className="flex justify-between items-center">
              <div className="text-sm font-mono text-gray-400 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                <span>BACKGROUND CONFIGURATION</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <button
                onClick={handleButtonClick}
                className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center space-y-2 hover:border-gray-500 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-mono text-gray-400">
                  CLICK TO SELECT IMAGE
                </span>
                <span className="text-xs font-mono text-gray-500">
                  Maximum size: 5MB
                </span>
              </button>

              {error && (
                <p className="text-red-500 text-sm font-mono mt-2">{error}</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BackgroundSettings;