import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUSCommon from "./locales/en-US/common.json";
import enUSInput from "./locales/en-US/input.json";
import enUSMarkdown from "./locales/en-US/markdown.json";
import enUSMessage from "./locales/en-US/message.json";
import enUSPage from "./locales/en-US/page.json";
import arSACommon from "./locales/ar-SA/common.json";
import arSAInput from "./locales/ar-SA/input.json";
import arSAMarkdown from "./locales/ar-SA/markdown.json";
import arSAMessage from "./locales/ar-SA/message.json";
import arSAPage from "./locales/ar-SA/page.json";
import zhCNCommon from "./locales/zh-CN/common.json";
import zhCNInput from "./locales/zh-CN/input.json";
import zhCNMarkdown from "./locales/zh-CN/markdown.json";
import zhCNMessage from "./locales/zh-CN/message.json";
import zhCNPage from "./locales/zh-CN/page.json";

const SUPPORTED_LANGUAGES = ["zh-CN", "en-US", "ar-SA"] as const;

function getInitialLanguage(): (typeof SUPPORTED_LANGUAGES)[number] {
  if (typeof window === "undefined") {
    return "zh-CN";
  }

  const fromStorage = window.localStorage.getItem("lang");
  if (fromStorage === "zh-CN" || fromStorage === "en-US" || fromStorage === "ar-SA") {
    return fromStorage as (typeof SUPPORTED_LANGUAGES)[number];
  }

  const browserLanguage = window.navigator.language;
  if (browserLanguage.startsWith("zh")) return "zh-CN";
  if (browserLanguage.startsWith("ar")) return "ar-SA";
  return "en-US";
}

void i18n.use(initReactI18next).init({
  resources: {
    "zh-CN": {
      common: zhCNCommon,
      input: zhCNInput,
      markdown: zhCNMarkdown,
      message: zhCNMessage,
      page: zhCNPage,
    },
    "en-US": {
      common: enUSCommon,
      input: enUSInput,
      markdown: enUSMarkdown,
      message: enUSMessage,
      page: enUSPage,
    },
    "ar-SA": {
      common: arSACommon,
      input: arSAInput,
      markdown: arSAMarkdown,
      message: arSAMessage,
      page: arSAPage,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: "zh-CN",
  supportedLngs: [...SUPPORTED_LANGUAGES],
  defaultNS: "common",
  ns: ["common", "input", "markdown", "message", "page"],
  interpolation: {
    escapeValue: false,
  },
});

void i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("lang", language);
  }
});

export default i18n;
