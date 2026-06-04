"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { uk } from "@/i18n/uk";
import { en } from "@/i18n/en";

export type Lang = "uk" | "en";

const translations = { uk, en } as const;

function getVal(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[k];
    return undefined;
  }, obj) as string ?? path;
}

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }
const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uk");
  useEffect(() => {
    const s = localStorage.getItem("brasa-lang");
    if (s === "uk" || s === "en") setLangState(s);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("brasa-lang", l); };
  const t = (key: string) => getVal(translations[lang] as Record<string, unknown>, key);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
export const useLang = () => { const c = useContext(LangContext); if (!c) throw new Error("useLang"); return c; };
