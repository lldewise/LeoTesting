import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translateEN from './locales/en-US.json';
import translateDK from './locales/da-DK.json';

const resources = {
  en_US: { translation: translateEN },
  da_DK: { translation: translateDK },
};

i18n.on('languageChanged', lng => {
  if (!window.location.pathname.includes(lng)) {
    window.location.replace(
      window.location.origin + '/' + lng + window.location.pathname,
    );
  }
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    whitelist: ['en_US', 'da_DK'],
    fallbackLng: ['en_US'],
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
