import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { zh, en } from "@urmovie/i18n";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "zh-TW": { translation: zh },
      zh: { translation: zh },
      en: { translation: en },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
