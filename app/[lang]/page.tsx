import { getProjects } from "@/app/lib/projects";
import ProjectCarousel from "@/app/components/ProjectCarousel";
import { Suspense } from "react";
import Link from "next/link";
import ContactSection from "../components/ContactSection";

type Props = {
  params: Promise<{ lang?: string }>;
}

export default async function HomePage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const projects = await getProjects(params.lang);
  const featuredProjects = projects.filter( project => project.destaque_na_homepage);

  return (
    <>
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-50 tracking-tight mb-4">
            {params.lang === 'en' 
              ? <>Web Developer and Data Analyst <br></br><p className="text-xl md:text-2xl">Building the Infrastructure for Insights</p></>
              : <>Desenvolvedor Web e Analista de Dados <br></br><p className="text-xl md:text-2xl">Construindo a Infraestrutura para Insights</p></>
            }
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-100 max-w-3xl mx-auto mb-8">
            {params.lang === 'en' 
              ? <>My specialty goes beyond the code: I transform complex data into actionable insights through analysis and create intuitive visualizations that empower strategic decision-making. I seek opportunities where I can merge software engineering and data analysis to solve challenging problems.</>
              : <>Minha especialidade é ir além do código: eu transformo dados complexos em insights acionáveis através da análise e crio visualizações intuitivas que capacitam a tomada de decisões estratégicas. Busco oportunidades onde possa unir a engenharia de software e a análise de dados para resolver problemas desafiadores.</>
            }
          </p>
          <Link href="/projetos" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            {params.lang === 'en' 
                ? <>Look at my work</>
                : <>Veja meus trabalhos</>
            }
          </Link>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-50 mb-12">
            {params.lang === 'en' 
                ? <>Featured Projects</>
                : <>Projetos em Destaque</>
            }
          </h2>
          <Suspense fallback={<div className="text-center">Carregando projetos...</div>}>
            <ProjectCarousel projects={featuredProjects} />
          </Suspense>
        </div>
      </section>
      <ContactSection lang={params.lang} />
    </>
  );
}