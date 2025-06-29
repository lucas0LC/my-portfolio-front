import { getProjects } from '@/app/lib/projects';
import ProjectCard from '@/app/components/ProjectCard';

type Props = {
  params: Promise<{ lang?: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params
  const projects = await getProjects(lang);
  
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        {lang === 'en' ? 'My Projects' : 'Meus Projetos'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {projects.length === 0 && (
          <p>{lang === 'en' ? 'No projects found.' : 'Nenhum projeto encontrado.'}</p>
        )}
      </div>
    </main>
  );
}