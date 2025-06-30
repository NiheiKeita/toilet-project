import React, { useState, useEffect } from 'react'
import { ArrowLeft, Lock, User } from 'lucide-react'
import LanguageSelector from '../../components/LanguageSelector'
import { useRouter } from 'next/router'
import { getCurrentLanguage, getTranslation } from '~/utils/i18n'

const ToiletSelection: React.FC = () => {
  const router = useRouter()
  const [openingStall, setOpeningStall] = useState<number | null>(null)
  const [currentLang, setCurrentLang] = useState('ja')

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const stalls = [
    { id: 1, occupied: false, name: 'stallA', theme: 'blue', description: 'tiredPeople', message: 'tiredMessage' },
    { id: 2, occupied: true, name: 'stallB', theme: 'green', description: 'goodThings', message: 'badMemoryMessage' },
    { id: 3, occupied: false, name: 'stallC', theme: 'purple', description: 'badThings', message: 'badMemoryMessage' },
    { id: 4, occupied: false, name: 'stallD', theme: 'pink', description: 'anythingFlush', message: 'anythingMessage' },
  ]

  const getThemeClasses = (theme: string, occupied: boolean) => {
    if (occupied) {
      return {
        door: 'bg-gray-300 border-gray-400',
        handle: 'bg-gray-500',
        indicator: 'bg-red-500',
        text: 'text-gray-500'
      }
    }

    const themes = {
      blue: {
        door: 'bg-blue-100 hover:bg-blue-200 border-blue-300 hover:border-blue-400',
        handle: 'bg-blue-600 hover:bg-blue-700',
        indicator: 'bg-green-500',
        text: 'text-blue-700'
      },
      green: {
        door: 'bg-green-100 hover:bg-green-200 border-green-300 hover:border-green-400',
        handle: 'bg-green-600 hover:bg-green-700',
        indicator: 'bg-green-500',
        text: 'text-green-700'
      },
      purple: {
        door: 'bg-purple-100 hover:bg-purple-200 border-purple-300 hover:border-purple-400',
        handle: 'bg-purple-600 hover:bg-purple-700',
        indicator: 'bg-green-500',
        text: 'text-purple-700'
      },
      pink: {
        door: 'bg-pink-100 hover:bg-pink-200 border-pink-300 hover:border-pink-400',
        handle: 'bg-pink-600 hover:bg-pink-700',
        indicator: 'bg-green-500',
        text: 'text-pink-700'
      },
    }

    return themes[theme as keyof typeof themes]
  }

  const handleStallClick = (stallId: number, occupied: boolean) => {
    if (occupied) return

    setOpeningStall(stallId)

    // Wait for door opening animation, then navigate
    setTimeout(() => {
      router.push(`/toilet/${stallId}`)
    }, 1200) // Animation duration
  }

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="mr-4 rounded-full p-2 transition-colors hover:bg-white/50"
              disabled={openingStall !== null}
            >
              <ArrowLeft className="size-6 text-gray-600" />
            </button>
          </div>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          {getTranslation('selectStall', currentLang)}
        </h1>
        {/* Toilet Stalls Grid */}
        <div className="my-8 grid gap-8 md:grid-cols-2">
          {stalls.map((stall) => {
            const themeClasses = getThemeClasses(stall.theme, stall.occupied)
            const isOpening = openingStall === stall.id

            return (
              <div
                key={stall.id}
                className={`relative transition-all duration-300 ${!stall.occupied && !openingStall ? 'cursor-pointer hover:scale-105' :
                  stall.occupied ? 'cursor-not-allowed' : 'cursor-default'
                  }`}
                onClick={() => handleStallClick(stall.id, stall.occupied)}
              >
                {/* Door Frame */}
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-600 p-2 shadow-2xl">

                  {/* Interior view (visible when door opens) */}
                  <div className={`absolute inset-2 rounded-md bg-gradient-to-b from-gray-100 to-gray-200 transition-opacity duration-500 ${isOpening ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {/* Toilet interior background */}
                    <div className="absolute inset-0 rounded-md bg-gradient-to-b from-blue-50 to-blue-100"></div>

                    {/* Realistic toilet from front view */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                      {/* Toilet tank */}
                      <div className="relative mb-1 h-16 w-20 rounded-t-lg border-2 border-gray-300 bg-white shadow-lg">
                        <div className="absolute inset-1 rounded-t-md bg-gray-50"></div>
                        <div className="absolute inset-x-2 top-2 h-0.5 bg-gray-200"></div>
                      </div>

                      {/* Toilet bowl - front view */}
                      <div className="relative h-20 w-24 border-2 border-gray-300 bg-white shadow-xl"
                        style={{
                          borderRadius: '50% 50% 30% 30% / 25% 25% 75% 75%'
                        }}>

                        {/* Inner bowl */}
                        <div className="absolute left-1/2 top-2 h-14 w-16 -translate-x-1/2 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner"
                          style={{
                            borderRadius: '50% 50% 40% 40% / 20% 20% 80% 80%'
                          }}>

                          {/* Water in bowl */}
                          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-blue-200 to-blue-300 opacity-80"
                            style={{
                              borderRadius: '0 0 40% 40% / 0 0 80% 80%'
                            }}>
                            <div className="absolute inset-x-0 top-0 h-0.5 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                          </div>
                        </div>

                        {/* Toilet seat */}
                        <div className="absolute left-1/2 top-1 h-2 w-20 -translate-x-1/2 border border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200"
                          style={{
                            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%'
                          }}>
                        </div>
                      </div>

                      {/* Toilet base/floor connection */}
                      <div className="absolute -bottom-2 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-gray-300 opacity-60"></div>
                    </div>

                    {/* Floor tiles pattern */}
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                      {/* Tile lines */}
                      <div className="absolute inset-0 grid grid-cols-8 gap-px">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="bg-gray-300 opacity-30"></div>
                        ))}
                      </div>
                    </div>

                    {/* Wall tiles */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid h-full grid-cols-6 grid-rows-8 gap-px">
                        {[...Array(48)].map((_, i) => (
                          <div key={i} className="bg-gray-400"></div>
                        ))}
                      </div>
                    </div>

                    {/* Welcome message */}
                    {isOpening && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-fade-in rounded-2xl bg-white/90 px-6 py-4 shadow-lg backdrop-blur-sm">
                          <p className="text-lg font-semibold text-gray-700">
                            {getTranslation('welcome', currentLang)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Door */}
                  <div
                    className={`relative size-full transform-gpu rounded-md border-4 transition-all duration-1000 ${themeClasses.door} shadow-inner ${isOpening ? 'rotate-y-90 opacity-0' : 'rotate-y-0 opacity-100'
                      }`}
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                      transform: isOpening ? 'perspective(1000px) rotateY(-90deg)' : 'perspective(1000px) rotateY(0deg)'
                    }}
                  >

                    {/* Door panels (traditional door design) */}
                    <div className="absolute inset-4 grid grid-rows-2 gap-4">
                      {/* Upper panel */}
                      <div className="rounded-sm border-2 border-gray-300 bg-white/20 shadow-inner"></div>
                      {/* Lower panel */}
                      <div className="rounded-sm border-2 border-gray-300 bg-white/20 shadow-inner"></div>
                    </div>

                    {/* Door handle */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className={`h-8 w-4 rounded-full shadow-lg transition-all duration-300 ${themeClasses.handle} ${isOpening ? 'animate-pulse' : ''
                        }`}>
                        <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-white/30 to-transparent"></div>
                      </div>
                      {/* Handle shadow */}
                      <div className="absolute -right-1 top-1 h-6 w-2 rounded-full bg-black/20 blur-sm"></div>
                    </div>

                    {/* Door hinges */}
                    <div className="absolute left-1 top-8 h-6 w-3 rounded-sm bg-gray-700 shadow-md">
                      <div className="absolute inset-0.5 rounded-sm bg-gradient-to-r from-gray-500 to-gray-600"></div>
                    </div>
                    <div className="absolute bottom-8 left-1 h-6 w-3 rounded-sm bg-gray-700 shadow-md">
                      <div className="absolute inset-0.5 rounded-sm bg-gradient-to-r from-gray-500 to-gray-600"></div>
                    </div>

                    {/* Occupied/Available indicator */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2">
                      <div className={`flex h-8 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${stall.occupied ? 'bg-red-500' : 'bg-green-500'
                        } ${isOpening ? 'animate-bounce' : ''}`}>
                        {stall.occupied ? (
                          <Lock className="size-4 text-white" />
                        ) : (
                          <User className="size-4 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Door nameplate */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <div className="rounded-lg border border-gray-200 bg-white/90 px-4 py-3 text-center shadow-md backdrop-blur-sm">
                        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-1`}>
                          {getTranslation(stall.name as any, currentLang)}
                        </h3>
                        <p className={`text-sm ${themeClasses.text} mb-2 opacity-80`}>
                          {getTranslation(stall.description as any, currentLang)}
                        </p>
                        <p className={`text-xs ${stall.occupied ? 'text-red-600' : 'text-green-600'}`}>
                          {stall.occupied ? getTranslation('occupied', currentLang) : getTranslation('available', currentLang)}
                        </p>
                      </div>
                    </div>

                    {/* Occupied overlay effect */}
                    {stall.occupied && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-500/30">
                        <div className="animate-pulse rounded-full bg-red-500/90 px-4 py-2 text-lg font-bold text-white">
                          {getTranslation('occupied', currentLang)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Door frame shadow */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg shadow-inner"></div>

                  {/* Opening sound effect visual */}
                  {isOpening && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute size-2 animate-ping rounded-full bg-yellow-400"
                          style={{
                            left: `${i * 8}px`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '0.8s'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Floor indicator */}
                <div className="absolute -bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm"></div>

                {/* Entering effect overlay */}
                {isOpening && (
                  <div className="pointer-events-none absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="mb-2 text-lg text-gray-600">
            {getTranslation('instruction', currentLang)}
          </p>
          <p className="text-sm text-gray-500">
            {getTranslation('privacy', currentLang)}
          </p>

          {/* Loading message when door is opening */}
          {openingStall && (
            <div className="animate-fade-in mt-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                <div className="size-4 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600"></div>
                <span>{getTranslation('entering', currentLang)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToiletSelection