import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Waves } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { getTranslation, getCurrentLanguage } from '../../utils/i18n'
import { useFCM } from '~/firebase/useFCM'
import { useMount } from 'react-use'

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
  const router = useRouter()
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([])
  const [stats, setStats] = useState({ totalWords: 0, activeWords: 0 })
  const [currentLang, setCurrentLang] = useState('ja')
  const { messages, fcmToken } = useFCM()

  useMount(() => {
    // 現在の通知許可状態を取得
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        alert(permission)
      })
    }
  })
  useEffect(() => {
    // クライアントサイドでのみ言語を取得
    setCurrentLang(getCurrentLanguage())

    // Load flushed words from localStorage (only on client side)
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedWords = JSON.parse(localStorage.getItem('flushedWords') || '[]')

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
      })).filter((word: FloatingWord) => word.opacity > 0)

      setFloatingWords(words)
      setStats({
        totalWords: storedWords.length,
        activeWords: words.length
      })
    }

    // Animation loop for sinking effect
    const animationInterval = setInterval(() => {
      setFloatingWords(prevWords =>
        prevWords.map(word => ({
          ...word,
          y: word.y + word.sinkSpeed,
          opacity: Math.max(0, word.opacity - 0.002) // Gradual fade
        })).filter(word => word.opacity > 0 && word.y < 100)
      )
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
  }


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Water Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400">
        {/* Water surface animation */}
        <div className="animate-gentle-wave absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-blue-100 opacity-60"></div>

        {/* Underwater bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-bubble absolute size-2 rounded-full bg-white/30"
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="mr-4 rounded-full p-2 transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="size-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <Waves className="size-8 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-600">
                {getTranslation('springTitle', currentLang)}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector onLanguageChange={handleLanguageChange} />
            {/* <div className="flex items-center space-x-1 text-white">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {stats.totalWords} {getTranslation('words', currentLang)}
              </span>
            </div> */}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 rounded-2xl bg-black/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">
                {getTranslation('currentWords', currentLang)}
              </p>
              <p className="text-2xl font-bold">{stats.activeWords}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">
                {getTranslation('totalWords', currentLang)}
              </p>
              <p className="text-2xl font-bold">{stats.totalWords}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Words */}
      <div className="pointer-events-none absolute inset-0">
        {floatingWords.map((word) => (
          <div
            key={word.id}
            className="absolute select-none font-medium text-gray-700 transition-all duration-1000 ease-out hover:scale-110"
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
      <div className="absolute inset-x-6 bottom-6 z-10">
        <div className="rounded-2xl bg-white/90 p-6 text-center backdrop-blur-sm">
          <p className="mb-2 text-gray-700">
            {getTranslation('springMessage', currentLang)}
          </p>
          <p className="text-sm text-gray-500">
            {getTranslation('springSubMessage', currentLang)}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-24 right-6 z-10">
        <button
          onClick={() => router.push('/toilet')}
          className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-green-600 hover:shadow-xl"
        >
          {getTranslation('flushAgain', currentLang)}
        </button>
      </div>
      <div className='rounded-lg bg-gray-100 p-4'>
        <p>fcmToken: {fcmToken}</p>
        <p>messages: {JSON.stringify(messages)}</p>
      </div>
    </div>
  )
}

export default SpringPage