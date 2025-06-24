import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Waves, Users } from 'lucide-react';

interface FloatingWord {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  sinkSpeed: number;
  timestamp: number;
}

const SpringPage: React.FC = () => {
  const navigate = useNavigate();
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const [stats, setStats] = useState({ totalWords: 0, activeWords: 0 });

  useEffect(() => {
    // Load flushed words from localStorage
    const storedWords = JSON.parse(localStorage.getItem('flushedWords') || '[]');

    // Create floating words
    const words = storedWords.map((word: any, index: number) => ({
      id: `${word.timestamp}-${index}`,
      text: word.text,
      x: Math.random() * 80 + 10, // 10-90% from left
      y: Math.random() * 60 + 20, // 20-80% from top
      opacity: Math.max(0.3, 1 - (Date.now() - word.timestamp) / 60000), // Fade over 1 minute
      size: Math.random() * 0.5 + 0.8, // 0.8-1.3 scale
      sinkSpeed: Math.random() * 0.1 + 0.05, // 0.05-0.15 per second
      timestamp: word.timestamp
    })).filter((word: FloatingWord) => word.opacity > 0);

    setFloatingWords(words);
    setStats({
      totalWords: storedWords.length,
      activeWords: words.length
    });

    // Animation loop for sinking effect
    const animationInterval = setInterval(() => {
      setFloatingWords(prevWords =>
        prevWords.map(word => ({
          ...word,
          y: word.y + word.sinkSpeed,
          opacity: Math.max(0, word.opacity - 0.002) // Gradual fade
        })).filter(word => word.opacity > 0 && word.y < 100)
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Water Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400">
        {/* Water surface animation */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-blue-100 opacity-60 animate-gentle-wave"></div>

        {/* Underwater bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <Waves className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">言葉の泉</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{stats.totalWords} words</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-sm opacity-80">現在漂っている言葉</p>
              <p className="text-2xl font-bold">{stats.activeWords}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">これまでの総数</p>
              <p className="text-2xl font-bold">{stats.totalWords}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Words */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingWords.map((word) => (
          <div
            key={word.id}
            className="absolute text-gray-700 font-medium select-none transition-all duration-1000 ease-out hover:scale-110"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              opacity: word.opacity,
              transform: `scale(${word.size})`,
              fontSize: `${16 + Math.random() * 8}px`,
              textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
          <p className="text-gray-700 mb-2">
            これまで自分が流した言葉が、この泉で静かに沈んでいきます
          </p>
          <p className="text-gray-500 text-sm">
            あなたの心の重荷も、時間と共に軽やかになっていくでしょう。
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-24 right-6 z-10">
        <button
          onClick={() => navigate('/toilet')}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
        >
          もう一度流す
        </button>
      </div>
    </div>
  );
};

export default SpringPage;