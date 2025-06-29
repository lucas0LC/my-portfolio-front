import { getAboutPage } from "@/app/lib/about";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang?: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const page = await getAboutPage(lang);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <main className="container mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-[300px]">
              <Image
                src={page.imageUrl}
                alt="Foto de perfil"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 tracking-tight mb-8">
              {page.title}
            </h1>
            
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-slate-800 dark:text-slate-50"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}