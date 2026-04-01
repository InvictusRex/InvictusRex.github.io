"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { SplitHeading } from "./split-heading";
import { ImageLightbox } from "./image-lightbox";
import { galleryImages } from "@/lib/portfolio-data";
import { Expand } from "lucide-react";

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const initialPhotoCount = 6;
  const displayImages = showAllPhotos
    ? galleryImages
    : galleryImages.slice(0, initialPhotoCount);
  const hasMorePhotos =
    galleryImages.length > initialPhotoCount && !showAllPhotos;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryImages.length) % galleryImages.length,
      );
    }
  };

  return (
    <SectionWrapper id="gallery">
      <SplitHeading
        as="h2"
        className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        Gallery
      </SplitHeading>
      <p className="mb-10 max-w-2xl text-base text-muted-foreground">
        Moments from competitions, lab work, field tests, and the engineering
        process behind the projects.
      </p>

      {/* Masonry-style dense grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:10px] grid-flow-dense">
        {displayImages.map((image, index) => (
          <GalleryCard
            key={index}
            image={image}
            index={index}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {hasMorePhotos && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAllPhotos(true)}
            className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-primary/5 px-6 py-2.5 text-center font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
          >
            View More Photos
          </button>
        </div>
      )}

      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </SectionWrapper>
  );
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: { src: string };
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [rowSpan, setRowSpan] = useState(22);

  const updateSpan = (naturalWidth: number, naturalHeight: number) => {
    const ratio = naturalHeight / naturalWidth;
    const nextSpan = Math.round(10 + ratio * 10);
    setRowSpan(Math.max(14, Math.min(nextSpan, 26)));
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className="group relative w-full overflow-hidden rounded-lg border border-border text-left transition-all hover:border-primary/30"
    >
      <Image
        src={image.src}
        alt="Gallery image"
        fill
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          updateSpan(naturalWidth, naturalHeight);
        }}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Expand className="h-4 w-4 shrink-0 text-primary" />
      </div>
    </motion.button>
  );
}
