"use client";

import { ProcessedProject } from "@/app/lib/type";
import useEmblaCarousel from 'embla-carousel-react';
import ProjectCard from "./ProjectCard";
import { useCallback } from "react";

type CarouselProps = {
  projects: ProcessedProject[];
};

export default function ProjectCarousel({ projects }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {projects.map((project) => (
            // Cada slide
            <div key={project.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition z-10"
        aria-label="Projeto anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition z-10"
        aria-label="Próximo projeto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}