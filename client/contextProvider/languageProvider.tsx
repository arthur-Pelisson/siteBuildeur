'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = typeof window !== 'undefined';

  // Load language from local storage on initialization (client side only)
  const initialLanguage: Language | null = isClient ? localStorage.getItem('language') as Language | null : null;
  const [language, setLanguage] = useState<Language>(initialLanguage || 'fr');
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    if (isClient) {
      // If no language is stored in local storage, set it to 'fr'
      if (!initialLanguage && initialLanguage != null) {
        localStorage.setItem('language', initialLanguage);
      }
      
      setIsClientLoaded(true);
    }
  }, [isClient, initialLanguage]);

  // Save language to local storage whenever it changes (client side only)
  useEffect(() => {
    if (isClient && isClientLoaded) {
      document.documentElement.setAttribute("lang", language);
      localStorage.setItem('language', language);
    }
  }, [language, isClient, isClientLoaded]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
          {isClientLoaded && children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};