// src/config/i18n.ts
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loadPath = path.join(__dirname, "translation/{{lng}}.json");

console.log("i18next loadPath:", loadPath);

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en", 
    backend: {
      loadPath: loadPath,
    },
    detection: {
      order: [ "header"], 
    },
    preload: ["en", "ar"], 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18next;

