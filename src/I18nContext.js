import React, { createContext, useState } from 'react';
import i18n from './i18n.js';

export const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
