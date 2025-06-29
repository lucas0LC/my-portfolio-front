"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type ModalImageProps = {
  src: string;
  alt: string;
};

export default function ModalImage({ src, alt }: ModalImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `modal-image-${src}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow group"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              layoutId={layoutId}
              className="relative w-full h-auto max-w-4xl max-h-[90vh]"
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}