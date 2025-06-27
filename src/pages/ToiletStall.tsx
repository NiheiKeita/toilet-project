import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Type } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { getTranslation, getCurrentLanguage } from '../utils/i18n';

const ToiletStall: React.FC = () => {
  const { stallId } = useParams();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);
  const [flushWords, setFlushWords] = useState<string[]>([]);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Stall data matching the selection page
  const stallData = {
    1: { name: 'stallA', theme: 'blue', description: 'tiredPeople', message: 'tiredMessage' },
    2: { name: 'stallB', theme: 'green', description: 'goodThings', message: 'badMemoryMessage' },
    3: { name: 'stallC', theme: 'purple', description: 'badThings', message: 'badMemoryMessage' },
    4: { name: 'stallD', theme: 'pink', description: 'anythingFlush', message: 'anythingMessage' },
  };

  const currentStall = stallData[parseInt(stallId || '1') as keyof typeof stallData];

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      // Set language based on current language
      const speechLang = currentLang === 'ja' ? 'ja-JP' :
        currentLang === 'en' ? 'en-US' :
          currentLang === 'ko' ? 'ko-KR' :
            currentLang === 'zh' ? 'zh-CN' :
              currentLang === 'es' ? 'es-ES' :
                currentLang === 'fr' ? 'fr-FR' : 'ja-JP';

      recognitionRef.current.lang = speechLang;

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
  }, [currentLang]);

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
        stallId: stallId,
        language: currentLang
      }));
      localStorage.setItem('flushedWords', JSON.stringify([...existingWords, ...newWords]));

      navigate('/complete');
    }, 4000);
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/toilet')}
              className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors"
              disabled={isFlushing}
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>
        {/* <h1 className="text-2xl font-bold text-gray-800">
          {getTranslation(currentStall.name as any, currentLang)}
        </h1> */}
        <div>
          <p className="text-gray-600 text-2xl mt-1 mb-4">
            {getTranslation(currentStall.description as any, currentLang)}
          </p>
        </div>

        {/* Stall Message */}
        <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-blue-700 text-center">
            {getTranslation(currentStall.message as any, currentLang)}
          </p>
        </div>

        {/* Toilet Bowl with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Toilet Bowl - More realistic toilet shape */}
            <div className="relative w-56 md:w-80 h-96">
              {/* Toilet Tank */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-20 bg-white border-4 border-gray-300 rounded-t-2xl shadow-lg">
                <div className="absolute inset-2 bg-gray-50 rounded-t-xl"></div>
                {/* Tank lid line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200"></div>
              </div>

              {/* Toilet Bowl Base */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 h-80 bg-white border-4 border-gray-300 shadow-2xl"
                style={{
                  borderRadius: '50% 50% 30% 30% / 25% 25% 75% 75%',
                  clipPath: 'polygon(0 0, 100% 0, 95% 85%, 85% 95%, 15% 95%, 5% 85%)'
                }}>

                {/* Inner bowl - the actual water area */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-56 h-64 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner overflow-hidden"
                  style={{
                    borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                  }}>

                  {/* Water - fills the inner bowl properly */}
                  <div className={`absolute inset-0 transition-all duration-1000 overflow-hidden ${isFlushing ? 'animate-shake' : 'bg-blue-400'
                    }`}
                    style={{
                      borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                    }}>

                    {/* Water surface */}
                    <div className={`absolute transition-all duration-1000 ${isFlushing
                      ? 'inset-0'
                      : 'bottom-0 left-0 right-0 h-full'
                      }`}
                      style={{
                        background: isFlushing
                          ? 'conic-gradient(from 0deg, #1e40af, #3b82f6, #60a5fa, #93c5fd, #1e40af)'
                          : 'h-full',
                        borderRadius: isFlushing
                          ? '50% 50% 40% 40% / 20% 20% 80% 80%'
                          : '50% 0 50% 50% / 0 0 80% 80%'
                      }}>

                      {/* Flushing Words */}
                      {isFlushing && flushWords.map((word, index) => (
                        <div
                          key={index}
                          className="absolute text-lg font-bold text-white animate-flush-word pointer-events-none z-10"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '3s',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                          }}
                        >
                          {word}
                        </div>
                      ))}

                      {/* Drain hole at the bottom - only visible when not flushing */}
                      {!isFlushing && (
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-500/5 rounded-full shadow-inner"></div>
                      )}
                      {/* Water surface ripples - only when not flushing */}
                      {!isFlushing && (
                        <>
                          <div className="absolute  h-full top-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          {/* <div className="absolute  h-full top-2 left-0 right-0 bg-gradient-to-r from-transparent via-blue-200/60 to-transparent animate-gentle-wave"></div> */}
                        </>
                      )}

                      {/* Swirling water effect when flushing */}
                      {isFlushing && (
                        <>
                          {/* Large circular water motion behind the bowl */}
                          <div
                            className="absolute animate-spin-slow"
                            style={{
                              width: '300px',
                              height: '300px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.8), rgba(96, 165, 250, 0.6), rgba(147, 197, 253, 0.4), rgba(59, 130, 246, 0.8))',
                              borderRadius: '50%',
                              zIndex: 1
                            }}
                          ></div>

                          {/* Counter-rotating inner swirl */}
                          <div
                            className="absolute animate-spin-slow"
                            style={{
                              width: '200px',
                              height: '200px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: 'conic-gradient(from 180deg, rgba(30, 64, 175, 0.6), rgba(59, 130, 246, 0.4), rgba(96, 165, 250, 0.2), rgba(30, 64, 175, 0.6))',
                              borderRadius: '50%',
                              animationDirection: 'reverse',
                              animationDuration: '2s',
                              zIndex: 2
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Toilet bowl rim highlight */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-60 h-2 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full opacity-60"></div>
              </div>

              {/* Toilet seat */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-300 shadow-lg"
                style={{
                  borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%'
                }}>
                {/* Seat hinges */}
                <div className="absolute -top-1 left-8 w-3 h-3 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="absolute -top-1 right-8 w-3 h-3 bg-gray-400 rounded-full shadow-inner"></div>
              </div>
            </div>

            {/* Realistic Flush Lever */}
            <div className="absolute top-24 -right-16">
              <button
                onClick={handleFlush}
                disabled={!inputText.trim() || isFlushing}
                className={`relative transition-all duration-300 ${!inputText.trim() || isFlushing
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105'
                  } ${isFlushing ? 'animate-press-down' : ''}`}
              >
                {/* Lever mount */}
                <div className="w-10 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-lg border border-gray-400">
                  <div className="absolute inset-1 bg-gradient-to-b from-white/20 to-transparent rounded-md"></div>
                </div>

                {/* Lever handle */}
                <div className={`absolute top-2 left-2 w-6 h-20 rounded-full shadow-lg transform-gpu transition-all duration-300 ${!inputText.trim() || isFlushing
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                  : 'bg-gradient-to-r from-chrome-400 to-chrome-600 hover:from-chrome-500 hover:to-chrome-700'
                  } ${isFlushing ? 'rotate-12' : 'hover:rotate-6'}`}
                  style={{
                    background: !inputText.trim() || isFlushing
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : 'linear-gradient(135deg, #f3f4f6, #d1d5db, #9ca3af)',
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.3)'
                  }}>

                  {/* Lever grip texture */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/20 rounded-full"></div>

                  {/* Lever text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 rotate-90">
                    FLUSH
                  </div>
                </div>

                {/* Connection pipe */}
                <div className="absolute top-6 left-8 w-8 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-inner border border-gray-500"></div>
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
                placeholder={getTranslation('placeholder', currentLang)}
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                disabled={isListening}
              />
              <Type className="absolute top-4 right-4 w-5 h-5 text-gray-400" />
            </div>

            {/* Voice Input */}
            <div className="flex justify-center">
              <button
                onClick={toggleListening}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${isListening
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>{getTranslation('voiceStop', currentLang)}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>{getTranslation('voiceStart', currentLang)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center text-gray-600">
              <p className="mb-2">{getTranslation('flushInstruction', currentLang)}</p>
              <p className="text-sm text-gray-500">
                {inputText.length > 0 && `${inputText.length}${getTranslation('charactersEntered', currentLang)}`}
              </p>
            </div>
          </div>
        )}

        {/* Flushing Message */}
        {isFlushing && (
          <div className="text-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {getTranslation('flushing', currentLang)}
              </h2>
              <p className="text-gray-600 mb-4">
                {getTranslation('flushingMessage', currentLang)}
              </p>
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