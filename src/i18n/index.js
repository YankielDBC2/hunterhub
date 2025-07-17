import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import ru from './locales/ru.json'
import zh from './locales/zh.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import pt from './locales/pt.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ru: { translation: ru },
      zh: { translation: zh },
      de: { translation: de },
      fr: { translation: fr },
      it: { translation: it },
      ja: { translation: ja },
      ko: { translation: ko },
      pt: { translation: pt },
    },
    lng: localStorage.getItem('preferredLang')?.toLowerCase() || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
