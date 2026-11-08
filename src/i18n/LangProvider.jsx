import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { LangContext } from "./useLang";

const STORAGE_KEY = "lang";

// Vietnamese is the default; only an explicit earlier choice switches it.
const initialLang = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

LangProvider.propTypes = { children: PropTypes.node };
