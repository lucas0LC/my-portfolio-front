'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';
import { lang } from '../idioma-config';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const getCurrentLocale = () => {
    const segment = pathname.split('/')[1];
    return lang.locales.includes(segment as any) ? segment : lang.defaultLocale;
  };
  const currentLocale = getCurrentLocale();

  const createLocalizedPath = (path: string) => {
    if (currentLocale === lang.defaultLocale) {
      return path;
    }
    return `/${currentLocale}${path}`;
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === `/${currentLocale}`;
    }
    return pathname.startsWith(path) || pathname.startsWith(createLocalizedPath(path));
  };

  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-colors">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href={createLocalizedPath('/')} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 hover:text-blue-600 transition-colors">
          Lucas
        </Link>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={createLocalizedPath('/')}
              className={clsx(
                isActive('/')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-slate-50 hover:text-blue-600 transition-colors duration-200'
              )}
            >
              Home
            </Link>
            <Link
              href={createLocalizedPath('/projetos')}
              className={clsx(
                isActive('/projetos')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-slate-50 hover:text-blue-600 transition-colors duration-200'
              )}
            >
              {currentLocale === 'en' 
                ? <>Works</>
                : <>Projetos</>
              }
            </Link>
            <Link
              href={createLocalizedPath('/sobre')}
              className={clsx(
                isActive('/sobre')
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-slate-50 hover:text-blue-600 transition-colors duration-200'
              )}
            >
              {currentLocale === 'en' 
                ? <>About</>
                : <>Sobre</>
              }
            </Link>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-700 dark:bg-slate-200"></div>
          <LanguageSwitcher />
          <div className="md:block w-px h-6 bg-slate-700 dark:bg-slate-200"></div>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}