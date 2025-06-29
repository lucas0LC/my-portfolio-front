"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ProcessedProject } from '@/app/lib/type';
import TechTag from './TechTag';
import { usePathname } from 'next/navigation';
import { lang } from '../idioma-config';

type ProjectCardProps = {
  project: ProcessedProject;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const pathName = usePathname();
  const currentLocale = pathName.split('/')[1];
  const activeLocale = lang.locales.includes(currentLocale as any) ? `/`+ currentLocale : '';
  
  return (
    <Link href={activeLocale + project.path} className="group flex flex-col h-full bg-slate-200 border-slate-600 dark:bg-slate-500 border dark:border-slate-100 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          className="object-cover 
                     transition-transform duration-500 ease-in-out
                     group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 mb-2
                       group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h2>
        
        <p className="text-slate-800 dark:text-slate-100 text-sm mb-4 flex-grow">
          {project.summary || project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
      </div>
    </Link>
  );
}