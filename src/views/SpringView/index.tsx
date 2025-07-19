import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Waves } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { getTranslation, getCurrentLanguage } from '../../utils/i18n'
import { useFCM } from '~/firebase/useFCM'
import { useMount } from 'react-use'
import { FloatingText } from './components/FloatingText'

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
  const { messages } = useFCM()

  useMount(() => {
    // 現在の通知許可状態を取得
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        // 許可状態が未設定の場合、許可を要求
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('通知許可が取得されました')
          } else if (permission === 'denied') {
            console.log('通知許可が拒否されました')
            // ユーザーに通知設定の変更を促すメッセージを表示
            alert('プッシュ通知を受信するには、ブラウザの通知設定を許可してください。')
          }
        })
      } else if (Notification.permission === 'denied') {
        // 既に拒否されている場合
        console.log('通知許可が拒否されています')
        // ユーザーに通知設定の変更を促すメッセージを表示
        alert('プッシュ通知を受信するには、ブラウザの通知設定を許可してください。')
      } else if (Notification.permission === 'granted') {
        console.log('通知許可が既に取得されています')
      }
    }
  })

  // FCMメッセージを受信したときにfloating wordsを生成
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]

      // メッセージからテキストを抽出
      const messageText = latestMessage.notification?.title ||
        latestMessage.notification?.body ||
        latestMessage.data?.text || '新しいメッセージ'
      const textChars = messageText
        .split('')
        .filter(char => char.trim()) // 空白文字を除外
        .map(char => char === ' ' ? '　' : char) // 半角スペースを全角スペースに変換

      textChars.forEach((word, index) => {
        const newWord: FloatingWord = {
          id: `${word}-${index}`,
          text: word,
          x: Math.random() * 80 + 10, // 10-90% from left
          y: Math.random() * 60 + 20, // 20-80% from top
          opacity: 1, // 最初は完全に表示
          size: Math.random() * 0.8 + 0.6, // 0.6-1.4 scale（より多様なサイズ）
          sinkSpeed: Math.random() * 0.15 + 0.03, // 0.03-0.18 per second（より多様な速度）
          timestamp: Date.now() // 少しずつ遅延させて表示
        }
        setFloatingWords(prev => [...prev, newWord])
      })
    }
  }, [messages])

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
      // localStorageを初期化
      localStorage.removeItem('flushedWords')
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

  const handleRemove = (id: string) => {
    setFloatingWords(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="relative min-h-screen overflow-hidden" data-testid="test-spring-page">
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
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 rounded-2xl bg-black/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">
                {getTranslation('currentWords', currentLang)}
              </p>
              <p className="text-2xl font-bold">{floatingWords.length}</p>
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
        {floatingWords.map((word) => {
          return (
            <FloatingText
              key={word.id}
              id={word.id}
              text={word.text}
              opacity={word.opacity}
              size={word.size}
              x={word.x}
              y={word.y}
              onFinish={handleRemove}
            />
          )
        })}
      </div>

      {/* Bottom Message */}
      <div className="absolute inset-x-6 bottom-6 z-10">
        <div className="rounded-2xl bg-white/90 p-6 text-center backdrop-blur-sm">
          <p className="mb-2 text-gray-700">
            {getTranslation('springMessage', currentLang)}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-28 right-6 z-10 sm:bottom-24">
        <button
          onClick={() => router.push('/toilet')}
          className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-green-600 hover:shadow-xl"
        >
          {getTranslation('flushAgain', currentLang)}
        </button>
      </div>


    </div >
  )
}

export default SpringPage