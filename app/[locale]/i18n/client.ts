/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "fr", "es"],
  ns: ["common"],
  defaultNS: "common",
  resources: {
    en: {
      common: require("../../../public/locales/en/common.json"),
    },
    fr: {
      common: require("../../../public/locales/fr/common.json"),
    },
    es: {
      common: require("../../../public/locales/es/common.json"),
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
