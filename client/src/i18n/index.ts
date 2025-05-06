import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALS } from './constants';

import en from './locales/en/translation.json';
import uk from './locales/uk/translation.json';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: LOCALS.EN,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
