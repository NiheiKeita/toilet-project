import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { getTranslation, getCurrentLanguage } from '../utils/i18n';

const CompletePage: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  useEffect(() => {
    // Delayed appearance for dramatic effect
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>

      <div className={`text-center max-w-lg mx-auto transition-all duration-1000 ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Success Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <CheckCircle className="w-24 h-24 text-green-500 animate-scale-in" />
            <div className="absolute -inset-4 bg-green-100 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {getTranslation('flushed', currentLang)}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {getTranslation('flushSuccess', currentLang)}
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-500">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-lg font-medium">
              {getTranslation('heartLight', currentLang)}
            </span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Visual Effect */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            {/* Water droplets falling */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-blue-400 rounded-full animate-fall"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
            <div className="w-full h-4 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full opacity-60 animate-gentle-wave"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/spring')}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>{getTranslation('viewSpring', currentLang)}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
          >
            {getTranslation('backToStart', currentLang)}
          </button>
        </div>

        {/* Encouragement */}
        <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100">
          <p className="text-green-700 text-sm">
            💚 {getTranslation('encouragement', currentLang)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;