import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mic, MicOff, Type } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { getCurrentLanguage, getTranslation } from '~/utils/i18n'
import { useRouter } from 'next/router'
import { SpeechRecognition } from '~/types/speech'

type Props = {
  stallId: string
}

const ToiletStall = ({ stallId }: Props) => {
  // const { stallId } = useParams()
  const router = useRouter()
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isFlushing, setIsFlushing] = useState(false)
  const [flushWords, setFlushWords] = useState<string[]>([])
  const [currentLang, setCurrentLang] = useState('ja') // デフォルト値を設定
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Stall data matching the selection page
  const stallData = {
    1: { name: 'stallA', theme: 'blue', description: 'tiredPeople', message: 'tiredMessage' },
    2: { name: 'stallB', theme: 'green', description: 'goodThings', message: 'badMemoryMessage' },
    3: { name: 'stallC', theme: 'purple', description: 'badThings', message: 'badMemoryMessage' },
    4: { name: 'stallD', theme: 'pink', description: 'anythingFlush', message: 'anythingMessage' },
  }

  const currentStall = stallData[parseInt(stallId || '1') as keyof typeof stallData]

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        // Set language based on current language
        const speechLang = currentLang === 'ja' ? 'ja-JP' :
          currentLang === 'en' ? 'en-US' :
            currentLang === 'ko' ? 'ko-KR' :
              currentLang === 'zh' ? 'zh-CN' :
                currentLang === 'es' ? 'es-ES' :
                  currentLang === 'fr' ? 'fr-FR' : 'ja-JP'

        recognitionRef.current.lang = speechLang

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setInputText(prev => prev + finalTranscript)
          }
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [currentLang])

  useEffect(() => {
    // クライアントサイドでのみ言語を取得
    setCurrentLang(getCurrentLanguage())
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleFlush = () => {
    if (!inputText.trim()) return

    const words = inputText.split('').filter(char => char.trim())
    setFlushWords(words)
    setIsFlushing(true)

    // Simulate flush animation duration
    setTimeout(() => {
      // Store flushed words in localStorage for spring page (only on client side)
      if (typeof window !== 'undefined' && window.localStorage) {
        const existingWords = JSON.parse(localStorage.getItem('flushedWords') || '[]')
        const newWords = words.map(word => ({
          text: word,
          timestamp: Date.now(),
          stallId: stallId,
          language: currentLang
        }))
        localStorage.setItem('flushedWords', JSON.stringify([...existingWords, ...newWords]))
      }

      router.push('/complete')
    }, 4000)
  }

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/toilet')}
              className="mr-4 rounded-full p-2 transition-colors hover:bg-white/50"
              disabled={isFlushing}
            >
              <ArrowLeft className="size-6 text-gray-600" />
            </button>
          </div>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>
        {/* <h1 className="text-2xl font-bold text-gray-800">
          {getTranslation(currentStall.name as any, currentLang)}
        </h1> */}
        <div>
          <p className="mb-4 mt-1 text-2xl text-gray-600">
            {getTranslation(currentStall.description as any, currentLang)}
          </p>
        </div>

        {/* Stall Message */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-center text-blue-700">
            {getTranslation(currentStall.message as any, currentLang)}
          </p>
        </div>

        {/* Toilet Bowl with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Toilet Bowl - More realistic toilet shape */}
            <div className="relative h-96 w-56 md:w-80">
              {/* Toilet Tank */}
              <div className="absolute left-1/2 top-0 h-20 w-64 -translate-x-1/2 rounded-t-2xl border-4 border-gray-300 bg-white shadow-lg">
                <div className="absolute inset-2 rounded-t-xl bg-gray-50"></div>
                {/* Tank lid line */}
                <div className="absolute inset-x-4 top-4 h-0.5 bg-gray-200"></div>
              </div>

              {/* Toilet Bowl Base */}
              <div className="absolute left-1/2 top-16 h-80 w-72 -translate-x-1/2 border-4 border-gray-300 bg-white shadow-2xl"
                style={{
                  borderRadius: '50% 50% 30% 30% / 25% 25% 75% 75%',
                  clipPath: 'polygon(0 0, 100% 0, 95% 85%, 85% 95%, 15% 95%, 5% 85%)'
                }}>

                {/* Inner bowl - the actual water area */}
                <div className="absolute left-1/2 top-8 h-64 w-56 -translate-x-1/2 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner"
                  style={{
                    borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                  }}>

                  {/* Water - fills the inner bowl properly */}
                  <div className={`absolute inset-0 overflow-hidden transition-all duration-1000 ${isFlushing ? 'animate-shake' : 'bg-blue-400'
                    }`}
                    style={{
                      borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                    }}>

                    {/* Water surface */}
                    <div className={`absolute transition-all duration-1000 ${isFlushing
                      ? 'inset-0'
                      : 'inset-x-0 bottom-0 h-full'
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
                          className="animate-flush-word pointer-events-none absolute z-10 text-lg font-bold text-white"
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
                        <div className="absolute left-1/2 top-14 size-10 -translate-x-1/2 rounded-full bg-gray-500/5 shadow-inner"></div>
                      )}
                      {/* Water surface ripples - only when not flushing */}
                      {!isFlushing && (
                        <>
                          <div className="absolute  inset-x-0 top-0 h-full animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                          {/* <div className="absolute  h-full top-2 left-0 right-0 bg-gradient-to-r from-transparent via-blue-200/60 to-transparent animate-gentle-wave"></div> */}
                        </>
                      )}

                      {/* Swirling water effect when flushing */}
                      {isFlushing && (
                        <>
                          {/* Large circular water motion behind the bowl */}
                          <div
                            className="animate-spin-slow absolute"
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
                            className="animate-spin-slow absolute"
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
                <div className="absolute left-1/2 top-6 h-2 w-60 -translate-x-1/2 rounded-full bg-gradient-to-r from-gray-200 via-white to-gray-200 opacity-60"></div>
              </div>

              {/* Toilet seat */}
              <div className="absolute left-1/2 top-20 h-4 w-64 -translate-x-1/2 border-2 border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg"
                style={{
                  borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%'
                }}>
                {/* Seat hinges */}
                <div className="absolute -top-1 left-8 size-3 rounded-full bg-gray-400 shadow-inner"></div>
                <div className="absolute -top-1 right-8 size-3 rounded-full bg-gray-400 shadow-inner"></div>
              </div>
            </div>

            {/* Realistic Flush Lever */}
            <div className="absolute -right-16 top-24">
              <button
                onClick={handleFlush}
                disabled={!inputText.trim() || isFlushing}
                className={`relative transition-all duration-300 ${!inputText.trim() || isFlushing
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105'
                  } ${isFlushing ? 'animate-press-down' : ''}`}
              >
                {/* Lever mount */}
                <div className="h-8 w-10 rounded-lg border border-gray-400 bg-gradient-to-b from-gray-300 to-gray-400 shadow-lg">
                  <div className="absolute inset-1 rounded-md bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>

                {/* Lever handle */}
                <div className={`absolute left-2 top-2 h-20 w-6 transform-gpu rounded-full shadow-lg transition-all duration-300 ${!inputText.trim() || isFlushing
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                  : 'from-chrome-400 to-chrome-600 hover:from-chrome-500 hover:to-chrome-700 bg-gradient-to-r'
                  } ${isFlushing ? 'rotate-12' : 'hover:rotate-6'}`}
                  style={{
                    background: !inputText.trim() || isFlushing
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : 'linear-gradient(135deg, #f3f4f6, #d1d5db, #9ca3af)',
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.3)'
                  }}>

                  {/* Lever grip texture */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-white/40"></div>
                  <div className="absolute bottom-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-black/20"></div>

                  {/* Lever text */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-xs font-bold text-gray-600">
                    FLUSH
                  </div>
                </div>

                {/* Connection pipe */}
                <div className="absolute left-8 top-6 h-3 w-8 rounded-full border border-gray-500 bg-gradient-to-r from-gray-400 to-gray-500 shadow-inner"></div>
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
                className="h-32 w-full resize-none rounded-2xl border-2 border-gray-200 p-4 text-lg transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                disabled={isListening}
              />
              <Type className="absolute right-4 top-4 size-5 text-gray-400" />
            </div>

            {/* Voice Input */}
            <div className="flex justify-center">
              <button
                onClick={toggleListening}
                className={`flex items-center space-x-2 rounded-full px-6 py-3 font-medium transition-all duration-300 ${isListening
                  ? 'animate-pulse bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="size-5" />
                    <span>{getTranslation('voiceStop', currentLang)}</span>
                  </>
                ) : (
                  <>
                    <Mic className="size-5" />
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
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                {getTranslation('flushing', currentLang)}
              </h2>
              <p className="mb-4 text-gray-600">
                {getTranslation('flushingMessage', currentLang)}
              </p>
              <div className="flex justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ToiletStall