import React, { useEffect, useState } from 'react'
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { getCurrentLanguage, getTranslation } from '~/utils/i18n'
import { useRouter } from 'next/router'

const CompletePage: React.FC = () => {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [currentLang, setCurrentLang] = useState('ja') // デフォルト値を設定

  useEffect(() => {
    // クライアントサイドでのみ言語を取得
    setCurrentLang(getCurrentLanguage())
  }, [])

  useEffect(() => {
    // Delayed appearance for dramatic effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Language Selector */}
      <div className="absolute right-6 top-6">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>

      <div className={`mx-auto mt-6 max-w-lg text-center transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
        {/* Success Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <CheckCircle className="animate-scale-in size-24 text-green-500" />
            <div className="absolute -inset-4 animate-ping rounded-full bg-green-100 opacity-20"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            {getTranslation('flushed', currentLang)}
          </h1>
          <p className="mb-4 text-xl text-gray-600">
            {getTranslation('flushSuccess', currentLang)}
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-500">
            <Sparkles className="size-5 animate-pulse" />
            <span className="text-lg font-medium">
              {getTranslation('heartLight', currentLang)}
            </span>
            <Sparkles className="size-5 animate-pulse" />
          </div>
        </div>

        {/* Visual Effect */}
        <div className="mb-8">
          <div className="relative mx-auto size-32">
            {/* Water droplets falling */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-fall absolute size-3 rounded-full bg-blue-400"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
            <div className="animate-gentle-wave h-4 w-full rounded-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 opacity-60"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/spring')}
            className="flex w-full items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-green-600 hover:shadow-xl"
          >
            <span>{getTranslation('viewSpring', currentLang)}</span>
            <ArrowRight className="size-5" />
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full rounded-full border-2 border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
          >
            {getTranslation('backToStart', currentLang)}
          </button>
        </div>

        {/* Encouragement */}
        <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="text-sm text-green-700">
            💚 {getTranslation('encouragement', currentLang)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompletePage