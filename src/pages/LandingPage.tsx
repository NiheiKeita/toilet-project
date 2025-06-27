import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Heart, Sparkles } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { getTranslation, getCurrentLanguage } from '../utils/i18n';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>

      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in mt-16">
          <div className="flex items-center justify-center mb-6">
            <Droplets className="text-blue-400 w-16 h-16 mr-4 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              {getTranslation('title', currentLang)}
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Heart className="text-pink-400 w-6 h-6 animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              {getTranslation('subtitle', currentLang)}
            </p>
            <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {getTranslation('feature1Title', currentLang)}
            </h3>
            <p className="text-gray-600">
              {getTranslation('feature1Desc', currentLang)}
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 hover:border-green-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {getTranslation('feature2Title', currentLang)}
            </h3>
            <p className="text-gray-600">
              {getTranslation('feature2Desc', currentLang)}
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {getTranslation('feature3Title', currentLang)}
            </h3>
            <p className="text-gray-600">
              {getTranslation('feature3Desc', currentLang)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-bounce-gentle">
          <button
            onClick={() => navigate('/toilet')}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <span className="flex items-center">
              {getTranslation('start', currentLang)}
              <Droplets className="ml-2 w-6 h-6" />
            </span>
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          {getTranslation('tagline', currentLang)}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;