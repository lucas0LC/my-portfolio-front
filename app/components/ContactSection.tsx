"use client";

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';
import Link from 'next/link';

const contactLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-correia-2ba10b274/',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/lucas0LC',
    icon: Github,
  },
  {
    name: 'Email',
    href: 'lucascoreia123@gmail.com',
    icon: Mail,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
    }
  },
};

type Props = {
  lang?: string;
}


export default function ContactSection({ lang }: Props) {
  return (
    <section className="bg-background dark:bg-dark-background py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-text dark:text-dark-dark-text mb-4">
            {lang === 'en' 
                ? <>Let's Talk!</>
                : <>Vamos Conversar!</>
            }
        </h2>
        <p className="text-lg text-light-text dark:text-dark-light-text mb-12 max-w-2xl mx-auto">
            {lang === 'en' 
                ? <>I'm always open to new opportunities and collaborations. If you have a project in mind or just want to exchange ideas, feel free to get in touch.</>
                : <>Estou sempre aberto a novas oportunidades e colaborações. Se você tem um projeto em mente ou apenas quer trocar uma ideia, não hesite em me contatar.</>
            }
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 bg-foreground dark:bg-dark-foreground border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <link.icon className="h-6 w-6 text-primary" />
              <span className="font-semibold text-dark-text dark:text-dark-dark-text">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}