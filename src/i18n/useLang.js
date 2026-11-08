import { createContext, useContext } from "react";
import { strings } from "./strings";

export const LangContext = createContext({
  lang: "vi",
  setLang: () => {},
});

/**
 * `t(key, vars)` looks up a UI string; `l(value)` picks the current language
 * from a `{ vi, en }` field in src/data (plain strings pass through).
 */
export const useLang = () => {
  const { lang, setLang } = useContext(LangContext);
  const t = (key, vars) => {
    const text = strings[lang][key] ?? strings.vi[key] ?? key;
    return vars
      ? text.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "")
      : text;
  };
  const l = (value) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? (value[lang] ?? value.vi)
      : value;
  return { lang, setLang, t, l };
};
