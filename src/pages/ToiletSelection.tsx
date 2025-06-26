import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { getTranslation, getCurrentLanguage } from '../utils/i18n';

const ToiletSelection: React.FC = () => {
  const navigate = useNavigate();
  const [openingStall, setOpeningStall] = useState<number | null>(null);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const stalls = [
    { id: 1, occupied: false, name: 'stallA', theme: 'blue', description: 'tiredPeople', message: 'tiredMessage' },
    { id: 2, occupied: true, name: 'stallB', theme: 'green', description: 'goodThings', message: 'badMemoryMessage' },
    { id: 3, occupied: false, name: 'stallC', theme: 'purple', description: 'badThings', message: 'badMemoryMessage' },
    { id: 4, occupied: false, name: 'stallD', theme: 'pink', description: 'anythingFlush', message: 'anythingMessage' },
  ];

  const getThemeClasses = (theme: string, occupied: boolean) => {
    if (occupied) {
      return {
        door: 'bg-gray-300 border-gray-400',
        handle: 'bg-gray-500',
        indicator: 'bg-red-500',
        text: 'text-gray-500'
      };
    }
    
    const themes = {
      blue: {
        door: 'bg-blue-100 hover:bg-blue-200 border-blue-300 hover:border-blue-400',
        handle: 'bg-blue-600 hover:bg-blue-700',
        indicator: 'bg-green-500',
        text: 'text-blue-700'
      },
      green: {
        door: 'bg-green-100 hover:bg-green-200 border-green-300 hover:border-green-400',
        handle: 'bg-green-600 hover:bg-green-700',
        indicator: 'bg-green-500',
        text: 'text-green-700'
      },
      purple: {
        door: 'bg-purple-100 hover:bg-purple-200 border-purple-300 hover:border-purple-400',
        handle: 'bg-purple-600 hover:bg-purple-700',
        indicator: 'bg-green-500',
        text: 'text-purple-700'
      },
      pink: {
        door: 'bg-pink-100 hover:bg-pink-200 border-pink-300 hover:border-pink-400',
        handle: 'bg-pink-600 hover:bg-pink-700',
        indicator: 'bg-green-500',
        text: 'text-pink-700'
      },
    };
    
    return themes[theme as keyof typeof themes];
  };

  const handleStallClick = (stallId: number, occupied: boolean) => {
    if (occupied) return;
    
    setOpeningStall(stallId);
    
    // Wait for door opening animation, then navigate
    setTimeout(() => {
      navigate(`/toilet/${stallId}`);
    }, 1200); // Animation duration
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors"
              disabled={openingStall !== null}
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {getTranslation('selectStall', currentLang)}
            </h1>
          </div>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>

        {/* Toilet Stalls Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {stalls.map((stall) => {
            const themeClasses = getThemeClasses(stall.theme, stall.occupied);
            const isOpening = openingStall === stall.id;
            
            return (
              <div
                key={stall.id}
                className={`relative transition-all duration-300 ${
                  !stall.occupied && !openingStall ? 'hover:transform hover:scale-105 cursor-pointer' : 
                  stall.occupied ? 'cursor-not-allowed' : 'cursor-default'
                }`}
                onClick={() => handleStallClick(stall.id, stall.occupied)}
              >
                {/* Door Frame */}
                <div className="relative w-full h-80 bg-gray-600 rounded-lg shadow-2xl p-2 overflow-hidden">
                  
                  {/* Interior view (visible when door opens) */}
                  <div className={`absolute inset-2 rounded-md bg-gradient-to-b from-gray-100 to-gray-200 transition-opacity duration-500 ${
                    isOpening ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {/* Toilet interior background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 rounded-md"></div>
                    
                    {/* Realistic toilet from front view */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      {/* Toilet tank */}
                      <div className="relative w-20 h-16 bg-white border-2 border-gray-300 rounded-t-lg shadow-lg mb-1">
                        <div className="absolute inset-1 bg-gray-50 rounded-t-md"></div>
                        <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-200"></div>
                      </div>
                      
                      {/* Toilet bowl - front view */}
                      <div className="relative w-24 h-20 bg-white border-2 border-gray-300 shadow-xl"
                        style={{
                          borderRadius: '50% 50% 30% 30% / 25% 25% 75% 75%'
                        }}>
                        
                        {/* Inner bowl */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner"
                          style={{
                            borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                          }}>
                          
                          {/* Water in bowl */}
                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-blue-200 to-blue-300 opacity-80"
                            style={{
                              borderRadius: '0 0 40% 40% / 0 0 80% 80%'
                            }}>
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Toilet seat */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300"
                          style={{
                            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%'
                          }}>
                        </div>
                      </div>
                      
                      {/* Toilet base/floor connection */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-300 rounded-full opacity-60"></div>
                    </div>
                    
                    {/* Floor tiles pattern */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                      {/* Tile lines */}
                      <div className="absolute inset-0 grid grid-cols-8 gap-px">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="bg-gray-300 opacity-30"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Wall tiles */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 grid-rows-8 gap-px h-full">
                        {[...Array(48)].map((_, i) => (
                          <div key={i} className="bg-gray-400"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Welcome message */}
                    {isOpening && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg animate-fade-in">
                          <p className="text-lg font-semibold text-gray-700">
                            {getTranslation('welcome', currentLang)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Door */}
                  <div 
                    className={`relative w-full h-full rounded-md border-4 transition-all duration-1000 transform-gpu ${themeClasses.door} shadow-inner ${
                      isOpening ? 'rotate-y-90 opacity-0' : 'rotate-y-0 opacity-100'
                    }`}
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                      transform: isOpening ? 'perspective(1000px) rotateY(-90deg)' : 'perspective(1000px) rotateY(0deg)'
                    }}
                  >
                    
                    {/* Door panels (traditional door design) */}
                    <div className="absolute inset-4 grid grid-rows-2 gap-4">
                      {/* Upper panel */}
                      <div className="border-2 border-gray-300 rounded-sm bg-white/20 shadow-inner"></div>
                      {/* Lower panel */}
                      <div className="border-2 border-gray-300 rounded-sm bg-white/20 shadow-inner"></div>
                    </div>
                    
                    {/* Door handle */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className={`w-4 h-8 rounded-full shadow-lg transition-all duration-300 ${themeClasses.handle} ${
                        isOpening ? 'animate-pulse' : ''
                      }`}>
                        <div className="absolute inset-0.5 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                      </div>
                      {/* Handle shadow */}
                      <div className="absolute top-1 -right-1 w-2 h-6 bg-black/20 rounded-full blur-sm"></div>
                    </div>
                    
                    {/* Door hinges */}
                    <div className="absolute left-1 top-8 w-3 h-6 bg-gray-700 rounded-sm shadow-md">
                      <div className="absolute inset-0.5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-sm"></div>
                    </div>
                    <div className="absolute left-1 bottom-8 w-3 h-6 bg-gray-700 rounded-sm shadow-md">
                      <div className="absolute inset-0.5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-sm"></div>
                    </div>
                    
                    {/* Occupied/Available indicator */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`w-16 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        stall.occupied ? 'bg-red-500' : 'bg-green-500'
                      } ${isOpening ? 'animate-bounce' : ''}`}>
                        {stall.occupied ? (
                          <Lock className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    
                    {/* Door nameplate */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border border-gray-200 text-center">
                        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-1`}>
                          {getTranslation(stall.name as any, currentLang)}
                        </h3>
                        <p className={`text-sm ${themeClasses.text} mb-2 opacity-80`}>
                          {getTranslation(stall.description as any, currentLang)}
                        </p>
                        <p className={`text-xs ${stall.occupied ? 'text-red-600' : 'text-green-600'}`}>
                          {stall.occupied ? getTranslation('occupied', currentLang) : getTranslation('available', currentLang)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Occupied overlay effect */}
                    {stall.occupied && (
                      <div className="absolute inset-0 bg-gray-500/30 rounded-md flex items-center justify-center">
                        <div className="bg-red-500/90 text-white px-4 py-2 rounded-full font-bold text-lg animate-pulse">
                          {getTranslation('occupied', currentLang)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Door frame shadow */}
                  <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none"></div>
                  
                  {/* Opening sound effect visual */}
                  {isOpening && (
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                          style={{
                            left: `${i * 8}px`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '0.8s'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Floor indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-400 rounded-full shadow-sm"></div>
                
                {/* Entering effect overlay */}
                {isOpening && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse pointer-events-none rounded-lg"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-2">
            {getTranslation('instruction', currentLang)}
          </p>
          <p className="text-gray-500 text-sm">
            {getTranslation('privacy', currentLang)}
          </p>
          
          {/* Loading message when door is opening */}
          {openingStall && (
            <div className="mt-6 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <div className="animate-spin w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full"></div>
                <span>{getTranslation('entering', currentLang)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToiletSelection;