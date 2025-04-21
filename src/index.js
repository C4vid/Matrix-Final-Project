import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

import az from './Locales/az.json';
import en from './Locales/en.json'; 

i18n.init({
  resources: {
    az: {
      translation: az,
    },
    en: {
      translation: en,
    },
  },
  lng: 'az',
  fallbackLng: 'az',
  interpolation: {
    escapeValue: false, 
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
