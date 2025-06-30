import React, { useState, useEffect } from 'react'
import { Droplets, Heart, Sparkles } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { getCurrentLanguage, getTranslation } from '~/utils/i18n'
import { useRouter } from 'next/router'

const LandingPage: React.FC = () => {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('ja') // デフォルト値を設定

  useEffect(() => {
    // クライアントサイドでのみ言語を取得
    setCurrentLang(getCurrentLanguage())
  }, [])

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Language Selector */}
      <div className="absolute right-6 top-6">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Hero Section */}
        <div className="animate-fade-in mb-12 mt-16">
          <div className="mb-6 flex items-center justify-center">
            <Droplets className="mr-4 size-16 animate-bounce text-blue-400" />
            <h1 className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              {getTranslation('title', currentLang)}
            </h1>
          </div>
          <div className="mb-8 flex items-center justify-center space-x-4">
            <Heart className="size-6 animate-pulse text-pink-400" />
            <p className="text-xl font-medium text-gray-600 md:text-2xl">
              {getTranslation('subtitle', currentLang)}
            </p>
            <Sparkles className="size-6 animate-pulse text-yellow-400" />
          </div>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-200">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-100">
              <Droplets className="size-8 text-blue-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {getTranslation('feature1Title', currentLang)}
            </h3>
            <p className="text-gray-600">
              {getTranslation('feature1Desc', currentLang)}
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-200">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
              <Heart className="size-8 text-green-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {getTranslation('feature2Title', currentLang)}
            </h3>
            <p className="text-gray-600">
              {getTranslation('feature2Desc', currentLang)}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-200">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100">
              <Sparkles className="size-8 text-purple-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
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
            onClick={() => router.push('/toilet')}
            className="hover:shadow-3xl rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-12 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <span className="flex items-center">
              {getTranslation('start', currentLang)}
              <Droplets className="ml-2 size-6" />
            </span>
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          {getTranslation('tagline', currentLang)}
        </p>
      </div>
    </div>
  )
}

export default LandingPage