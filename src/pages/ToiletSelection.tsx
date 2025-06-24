import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ToiletSelection: React.FC = () => {
  const navigate = useNavigate();

  const stalls = [
    { id: 1, occupied: false, name: '個室A', theme: 'blue' },
    { id: 2, occupied: true, name: '個室B', theme: 'green' },
    { id: 3, occupied: false, name: '個室C', theme: 'purple' },
    { id: 4, occupied: false, name: '個室D', theme: 'pink' },
  ];

  const getThemeClasses = (theme: string, occupied: boolean) => {
    if (occupied) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300';
    }
    
    const themes = {
      blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300 text-blue-700',
      green: 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300 text-green-700',
      purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300 text-purple-700',
      pink: 'bg-pink-50 hover:bg-pink-100 border-pink-200 hover:border-pink-300 text-pink-700',
    };
    
    return themes[theme as keyof typeof themes];
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">個室を選んでください</h1>
        </div>

        {/* Toilet Stalls Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {stalls.map((stall) => (
            <div
              key={stall.id}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${getThemeClasses(stall.theme, stall.occupied)} ${
                !stall.occupied ? 'hover:transform hover:scale-105 cursor-pointer' : ''
              }`}
              onClick={() => !stall.occupied && navigate(`/toilet/${stall.id}`)}
            >
              {/* Toilet Bowl Visual */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  {/* Toilet Bowl */}
                  <div className={`w-32 h-40 rounded-3xl border-4 ${
                    stall.occupied ? 'border-gray-300 bg-gray-100' : 'border-current bg-white/50'
                  } shadow-inner relative overflow-hidden`}>
                    {/* Water */}
                    <div className={`absolute bottom-2 left-2 right-2 h-8 rounded-2xl ${
                      stall.occupied ? 'bg-gray-200' : 'bg-blue-200'
                    } ${!stall.occupied ? 'animate-gentle-wave' : ''}`}></div>
                    
                    {/* Occupied Indicator */}
                    {stall.occupied && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Flush Handle */}
                  <div className={`absolute -right-4 top-4 w-6 h-12 rounded-lg ${
                    stall.occupied ? 'bg-gray-400' : 'bg-current opacity-60'
                  }`}></div>
                </div>

                {/* Stall Info */}
                <h3 className="text-xl font-semibold mb-2">{stall.name}</h3>
                <p className={`text-sm ${stall.occupied ? 'text-gray-400' : 'text-current opacity-70'}`}>
                  {stall.occupied ? '使用中' : '空いています'}
                </p>
              </div>

              {/* Availability Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                stall.occupied 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {stall.occupied ? '使用中' : '空室'}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-gray-600 text-lg">
            空いている個室を選んで、心の重荷を流しましょう
          </p>
          <p className="text-gray-500 text-sm mt-2">
            プライベートな空間で、安心してご利用いただけます
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToiletSelection;