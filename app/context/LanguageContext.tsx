"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type TranslationMap = string | null;

interface TranslationContextType {
  ProjectUUID: TranslationMap;
  setProjectUUID: (ProjectUUID: TranslationMap) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [ProjectUUID, setProjectUUID] = useState<TranslationMap>(null);
  
  return (
    <TranslationContext.Provider value={{ ProjectUUID, setProjectUUID }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslations deve ser usado dentro de um TranslationProvider');
  }
  return context;
}

/* lembrete
Criar uma nova função no projects.ts chamada getprojectPathById com parâmetro de 'lang?' que vai buscar o path do projeto pelo ID.
usar a função getprojectPathById junto com LanguageContext para criar uma nova logica no languageSwitcher junto com "const { translations } = useTranslations();"
 */