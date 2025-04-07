import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

import az from './Locales/az.json'; // Azerice
import en from './Locales/en.json'; // İngilizce

i18n.init({
  resources: {
    az: {
      translation: az,
    },
    en: {
      translation: en,
    },
  },
  lng: 'az', // Varsayılan dil
  fallbackLng: 'az',
  interpolation: {
    escapeValue: false, // React zaten XSS koruması sağlar
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
