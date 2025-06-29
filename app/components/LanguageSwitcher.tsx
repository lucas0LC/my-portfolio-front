"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { lang as idioma } from '@/app/idioma-config';
import clsx from 'clsx';
import { useTranslations } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const pathName = usePathname();

  const currentLocale = pathName.split('/')[1];
  const activeLocale = idioma.locales.includes(currentLocale as any) ? currentLocale : idioma.defaultLocale;

  const { ProjectUUID } = useTranslations();
  
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');

    if (ProjectUUID) {
        segments.splice(-1, 1, ProjectUUID)
        segments[1] = locale === idioma.locales[1]? idioma.locales[1] : '';
        if (locale === idioma.defaultLocale) {return  ProjectUUID};
        return segments.join('/');
    }

    if (locale === idioma.defaultLocale) {
      // (/en/projetos para /projetos)
      segments.splice(1, idioma.locales.includes(segments[1] as any) ? 1 : 0);
      return segments.join('/') || '/';
    }

    if (idioma.locales.includes(segments[1] as any)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join('/');
  };

  
  return (
    <div className="flex items-center space-x-4">
      {idioma.locales.map((locale) => (
        <Link
          key={locale}
          href={redirectedPathName(locale)}
          className={clsx(
            'text-sm uppercase font-bold transition-colors duration-300',
            activeLocale === locale
              ? 'text-blue-600 pointer-events-none'
              : 'text-gray-500 dark:text-slate-50 hover:text-blue-600'
          )}
        >
          {locale.split('pt-')}
        </Link>
      ))}
    </div>
  );
}