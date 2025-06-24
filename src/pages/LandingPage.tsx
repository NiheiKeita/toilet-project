import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Heart, Sparkles } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Droplets className="text-blue-400 w-16 h-16 mr-4 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              洗い流したい
            </h1>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">
            言葉メーカー
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Heart className="text-pink-400 w-6 h-6 animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              心の重荷を、水に流しませんか？
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">流して清める</h3>
            <p className="text-gray-600">嫌な言葉や思い出を、トイレに流してスッキリ</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 hover:border-green-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">心の癒し</h3>
            <p className="text-gray-600">泉で漂う言葉を眺めながら、心を落ち着かせる</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">みんなで共有</h3>
            <p className="text-gray-600">世界中の人が流した言葉を、美しいアートで体感</p>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-bounce-gentle">
          <button
            onClick={() => navigate('/toilet')}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <span className="flex items-center">
              はじめる
              <Droplets className="ml-2 w-6 h-6" />
            </span>
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          あなたの心を軽やかに。今すぐ体験してみてください。
        </p>
      </div>
    </div>
  );
};

export default LandingPage;