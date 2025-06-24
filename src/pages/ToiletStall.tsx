import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Type } from 'lucide-react';

const ToiletStall: React.FC = () => {
  const { stallId } = useParams();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);
  const [flushWords, setFlushWords] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ja-JP';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInputText(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleFlush = () => {
    if (!inputText.trim()) return;

    const words = inputText.split('').filter(char => char.trim());
    setFlushWords(words);
    setIsFlushing(true);

    // Simulate flush animation duration
    setTimeout(() => {
      // Store flushed words in localStorage for spring page
      const existingWords = JSON.parse(localStorage.getItem('flushedWords') || '[]');
      const newWords = words.map(word => ({
        text: word,
        timestamp: Date.now(),
        stallId: stallId
      }));
      localStorage.setItem('flushedWords', JSON.stringify([...existingWords, ...newWords]));
      
      navigate('/complete');
    }, 4000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/toilet')}
            className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors"
            disabled={isFlushing}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">個室 {stallId}</h1>
        </div>

        {/* Toilet Bowl with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Toilet Bowl - More realistic shape */}
            <div className={`w-72 h-96 bg-white border-8 border-gray-200 shadow-2xl relative overflow-hidden transition-all duration-300 ${
              isFlushing ? 'animate-shake' : ''
            }`}
            style={{
              borderRadius: '50% 50% 40% 40% / 30% 30% 70% 70%',
              clipPath: 'ellipse(50% 60% at 50% 40%)'
            }}>
              
              {/* Inner bowl shadow for depth */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner"
                style={{
                  clipPath: 'ellipse(90% 85% at 50% 50%)'
                }}></div>
              
              {/* Water - fills entire bowl when flushing */}
              <div className={`absolute transition-all duration-1000 ${
                isFlushing 
                  ? 'inset-4 animate-swirl' 
                  : 'bottom-6 left-6 right-6 h-20 animate-gentle-wave'
              }`}
              style={{
                background: isFlushing 
                  ? 'conic-gradient(from 0deg, #1e40af, #3b82f6, #60a5fa, #93c5fd, #1e40af)'
                  : 'linear-gradient(to bottom, #bfdbfe, #60a5fa)',
                borderRadius: isFlushing 
                  ? '50% 50% 45% 45% / 25% 25% 75% 75%'
                  : '50% 50% 45% 45% / 25% 25% 75% 75%',
                clipPath: 'ellipse(90% 85% at 50% 50%)'
              }}>
                
                {/* Flushing Words */}
                {isFlushing && flushWords.map((word, index) => (
                  <div
                    key={index}
                    className="absolute text-lg font-bold text-white animate-flush-word pointer-events-none"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: '3s',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {word}
                  </div>
                ))}
                
                {/* Water surface ripples - only when not flushing */}
                {!isFlushing && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                )}
                
                {/* Swirling water effect when flushing */}
                {isFlushing && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30 animate-spin-slow rounded-full"></div>
                    <div className="absolute inset-4 bg-gradient-to-tl from-blue-300/40 to-blue-500/40 animate-spin-slow rounded-full" style={{ animationDirection: 'reverse' }}></div>
                  </>
                )}
              </div>
              
              {/* Drain hole at the bottom - only visible when not flushing */}
              {!isFlushing && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-800 rounded-full shadow-inner"></div>
              )}
            </div>
            
            {/* Realistic Flush Lever */}
            <div className="absolute -right-12 top-16">
              <button
                onClick={handleFlush}
                disabled={!inputText.trim() || isFlushing}
                className={`relative transition-all duration-300 ${
                  !inputText.trim() || isFlushing
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:scale-105'
                } ${isFlushing ? 'animate-press-down' : ''}`}
              >
                {/* Lever base/mount */}
                <div className="w-8 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg shadow-lg"></div>
                
                {/* Lever handle */}
                <div className={`w-4 h-16 rounded-full shadow-lg transform-gpu transition-all duration-300 ${
                  !inputText.trim() || isFlushing
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                    : 'bg-gradient-to-r from-chrome-400 to-chrome-600 hover:from-chrome-500 hover:to-chrome-700'
                } ${isFlushing ? 'rotate-12' : 'hover:rotate-6'}`}
                style={{
                  marginLeft: '8px',
                  marginTop: '-4px',
                  background: !inputText.trim() || isFlushing 
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                    : 'linear-gradient(135deg, #e5e7eb, #9ca3af, #6b7280)',
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.3)'
                }}>
                  
                  {/* Lever grip texture */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/20 rounded-full"></div>
                </div>
                
                {/* Lever connection */}
                <div className="absolute top-6 left-2 w-6 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-inner"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Input Section */}
        {!isFlushing && (
          <div className="space-y-6">
            {/* Text Input */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="忘れたい言葉や思いを入力してください..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                disabled={isListening}
              />
              <Type className="absolute top-4 right-4 w-5 h-5 text-gray-400" />
            </div>

            {/* Voice Input */}
            <div className="flex justify-center">
              <button
                onClick={toggleListening}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isListening
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>録音停止</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>音声入力</span>
                  </>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center text-gray-600">
              <p className="mb-2">嫌な思い出や言葉を入力して、水に流しましょう</p>
              <p className="text-sm text-gray-500">
                {inputText.length > 0 && `${inputText.length}文字入力済み`}
              </p>
            </div>
          </div>
        )}

        {/* Flushing Message */}
        {isFlushing && (
          <div className="text-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">流しています...</h2>
              <p className="text-gray-600 mb-4">あなたの心の重荷が軽くなっていきます</p>
              <div className="flex justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToiletStall;