import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
export type LanguageType = "EN" | "FR" | "DE" | "JP";
const LanguageContext = createContext<
  | { language: LanguageType; setLanguage: (language: LanguageType) => void }
  | undefined
>(undefined);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>(() => {
    try {
      const saved = localStorage.getItem("devops_services_language");
      if (saved && ["EN", "JP", "FR", "DE"].includes(saved))
        return saved as LanguageType;
    } catch {}
    return "EN";
  });
  useEffect(() => {
    try {
      localStorage.setItem("devops_services_language", language);
    } catch {}
    document.documentElement.lang = { EN: "en", JP: "ja", FR: "fr", DE: "de" }[
      language
    ];
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required.");
  return context;
}
