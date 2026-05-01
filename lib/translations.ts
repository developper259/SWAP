import frTranslations from '../lang/fr.json';
import enTranslations from '../lang/en.json';

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof frTranslations;

const translations = {
  fr: frTranslations,
  en: enTranslations,
} as const;

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found in current language
      let fallback: any = translations.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key; // Return key if not found anywhere
        }
      }
      return typeof fallback === 'string' ? fallback : key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function useTranslation(lang: Language) {
  return {
    t: (key: string) => getTranslation(lang, key),
    lang,
  };
}

export default translations;
