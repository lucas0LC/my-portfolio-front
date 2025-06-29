export const lang = {
  defaultLocale: 'pt-br',
  locales: ['pt-br', 'en'],
} as const;

export type Locale = (typeof lang)['locales'][number];