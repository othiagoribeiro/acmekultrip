import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

// Componente de bandeira minimalista usando CSS
const Flag: React.FC<{ country: string; className?: string }> = ({ country, className = '' }) => {
  const flagStyles = {
    en: 'bg-gradient-to-b from-blue-600 via-white to-red-600', // Reino Unido simplificado
    es: 'bg-gradient-to-b from-red-600 via-yellow-400 to-red-600', // Espanha
    pt: 'bg-gradient-to-r from-green-600 via-red-600 to-green-600', // Portugal
    de: 'bg-gradient-to-b from-black via-red-600 to-yellow-400' // Alemanha
  };

  return (
    <div className={`w-6 h-4 rounded-sm overflow-hidden ${flagStyles[country]} ${className}`}>
      {/* Detalhes específicos das bandeiras */}
      {country === 'en' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-600 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-red-600 to-transparent opacity-60" />
        </>
      )}
      {country === 'pt' && (
        <div className="absolute left-0 top-0 w-2 h-full bg-green-600" />
      )}
    </div>
  );
};

const LanguageSelector: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
    { code: 'pt' as Language, name: 'Portuguese', nativeName: 'Português' },
    { code: 'de' as Language, name: 'German', nativeName: 'Deutsch' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
          scrollY > 50 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        <Flag country={language} className="relative" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage?.nativeName}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar o dropdown */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Flag country={lang.code} className="relative" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;