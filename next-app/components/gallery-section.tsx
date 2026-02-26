"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { SectionWrapper } from "./section-wrapper"
import { SplitHeading } from "./split-heading"
import { ImageLightbox } from "./image-lightbox"
import { galleryImages } from "@/lib/portfolio-data"
import { Expand } from "lucide-react"

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
    }
  }

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
      )
    }
  }

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

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <GalleryCard
            key={index}
            image={image}
            index={index}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </SectionWrapper>
  )
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: { src: string; alt: string; caption: string }
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      className="group relative aspect-[3/2] overflow-hidden rounded-lg border border-border text-left transition-all hover:border-primary/30"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Caption & icon */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-xs text-foreground/90">{image.caption}</p>
        <Expand className="h-4 w-4 shrink-0 text-primary" />
      </div>
    </motion.button>
  )
}
