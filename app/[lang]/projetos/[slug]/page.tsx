import { getProjectBySlug } from '@/app/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TechTag from '@/app/components/TechTag';
import ProjectBody from '@/app/components/ProjectBody';
import ProjectTranslation from '@/app/components/ProjectTranslation';
import { getProjectPathById } from '@/app/lib/projects';
import { lang as idioma } from '@/app/idioma-config';

type Props = {
  params: Promise<{ slug: string, lang?: string; }>;
};

export default async function ProjectDetailPage({ params }: Props, ) {
  const { slug, lang }= await params
  const project = await getProjectBySlug(slug, lang);
  
  if (!project) {
    notFound();
  }
  //DEUS me ajuda ai
  const activeLocale = idioma.locales.includes(lang as any) ? lang : idioma.defaultLocale;
  const inactiveLocale = activeLocale === idioma.locales[1]? idioma.defaultLocale : idioma.locales[1]
  const pathTranslation = await getProjectPathById(project.id, inactiveLocale);

  return (
    <ProjectTranslation project={pathTranslation}>
      <div className="py-12 sm:py-16">
      <main className="container mx-auto px-6 md:px-8">
        <Link 
          href="/projetos" 
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-100 hover:text-blue-600 mb-8 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Voltar para todos os projetos
        </Link>
        
        <article>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">{project.title}</h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-200 max-w-3xl mx-auto">{project.subtitle}</p>
          </div>
    
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] mb-12 rounded-lg shadow-2xl overflow-hidden">
            <Image 
              src={project.imageUrl} 
              alt={project.imageAlt} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 border-b pb-2 mb-4">Tecnologias Usadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 border-b pb-2 mb-4">Links</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center">Ver Projeto Online</a>
                <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-900 transition-colors text-center">Ver Repositório</a>
              </div>
            </div>
          </div>
          <ProjectBody descriptionHtml={project.descriptionHtml}/>
        </article>
        </main>
      </div>
    </ProjectTranslation>
  );
}