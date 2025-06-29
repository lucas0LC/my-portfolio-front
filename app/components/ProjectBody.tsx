"use client";

import parse, { DOMNode, Element } from 'html-react-parser';
import ModalImage from './ModalImage';
import ImageGrid from './ImageGrid';

type ProjectBodyProps = {
  descriptionHtml: string;
};

export default function ProjectBody({ descriptionHtml }: ProjectBodyProps) {
  
  const options = {
    replace: (domNode: DOMNode) => {
      if (!(domNode instanceof Element && domNode.attribs)) {
        return;
      }
      
      if (domNode.attribs['data-gallery-processed']) {
        return <></>;
      }
      
      let isImageNode = false;
      let currentElement: DOMNode | null = domNode;
      let imageNode: Element | null = null;
      
      if (currentElement.name === 'img') {
        isImageNode = true;
        imageNode = currentElement;
      } else if (currentElement.name === 'p' && currentElement.children.length === 1 && (currentElement.children[0] as Element).name === 'img') {
        isImageNode = true;
        imageNode = currentElement.children[0] as Element;
      }
      
      if (isImageNode && imageNode) {
        let galleryImages = [{ src: imageNode.attribs.src, alt: imageNode.attribs.alt || '' }];
        let nextNode = currentElement.next;
        
        while (nextNode) {
          let nextImageNode: Element | null = null;
          
          if (nextNode instanceof Element) {
             if (nextNode.name === 'img') {
              nextImageNode = nextNode;
            } else if (nextNode.name === 'p' && nextNode.children.length === 1 && (nextNode.children[0] as Element).name === 'img') {
              nextImageNode = nextNode.children[0] as Element;
            }
          }

          if (nextImageNode) {
            // Se for uma imagem, adiciona à galeria e marca como processada.
            galleryImages.push({ src: nextImageNode.attribs.src, alt: nextImageNode.attribs.alt || '' });
            (nextNode as Element).attribs['data-gallery-processed'] = 'true';
            nextNode = nextNode.next;
          } else {
            break;
          }
        }

        // Se a galeria tem mais de uma imagem, renderiza o Grid.
        if (galleryImages.length > 1) {
          return <ImageGrid images={galleryImages} />;
        } else {
          // Se for só uma imagem, renderiza o ModalImage sozinho.
          return <ModalImage src={imageNode.attribs.src} alt={imageNode.attribs.alt || 'Imagem do projeto'} />;
        }
      }
    },
  };

  return (
    <div className="prose prose-slate justify-items-center lg:prose-xl max-w-none text-slate-800 dark:text-slate-100">
      {parse(descriptionHtml, options)}
    </div>
  );
}
