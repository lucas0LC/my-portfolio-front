"use client";

import ModalImage from './ModalImage';

type ImageGridProps = {
  images: {
    src: string;
    alt: string;
  }[];
};

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="not-prose w-4/5 my-8 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {images.map((image, index) => (
        <ModalImage key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}