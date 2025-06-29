"use client";

import { useTranslations } from "@/app/context/LanguageContext";
import { useEffect } from "react";

type Props = {
  project: string | null;
  children: React.ReactNode;
}

export default function ProjectTranslation({ project, children }: Props) {
  const { setProjectUUID } = useTranslations();

  useEffect(() => {
    if (project) {
      setProjectUUID(project);
    }
    
    return () => {
      setProjectUUID(null);
    };
  }, [project, setProjectUUID]);

  return <>{children}</>;
}
