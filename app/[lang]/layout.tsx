import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { TranslationProvider } from "@/app/context/LanguageContext";
import { lang as idioma, Locale } from "../idioma-config";

const sora = Sora({ 
  subsets: ["latin"],
  weight: ['400', '600', '700', '800'] 
});

export async function generateStaticParams() {
  return idioma.locales.map((locale) => ({
    lang: locale,
  }));
}

export const metadata: Metadata = {
  title: "Portfólio",
  description: "portfólio bonito e cheiroso",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string | Locale};
}) {
  const { lang } = await params;
  return (
    <html lang={lang || idioma.defaultLocale} suppressHydrationWarning>
      <body className={`${sora.className} bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-50 transition-colors duration-300 h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <TranslationProvider>
            <Navbar />
            <main className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-50">{children}</main>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
