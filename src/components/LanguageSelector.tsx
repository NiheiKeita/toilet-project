import React, { useState } from 'react'
import { Globe } from 'lucide-react'
import { languages, getCurrentLanguage, setCurrentLanguage } from '../utils/i18n'

interface LanguageSelectorProps {
  // eslint-disable-next-line no-unused-vars
  onLanguageChange: (lang: string) => void
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage())

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setCurrentLanguage(langCode)
    onLanguageChange(langCode)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(language => language.code === currentLang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
      >
        <Globe className="size-4 text-gray-600" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex w-full items-center space-x-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${currentLang === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector