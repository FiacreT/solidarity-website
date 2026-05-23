'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';

interface MediaGalleryProps {
  images: any[];
  title?: string;
}

export default function MediaGallery({ images, title }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <div>
      {title && (
        <h3 className="font-heading text-2xl font-bold text-dark mb-6">{title}</h3>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={urlFor(image).width(400).height(400).url()}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Précédent"
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[lightboxIndex]).width(1200).height(800).url()}
              alt={`Photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Suivant"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
