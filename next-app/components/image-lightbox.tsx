"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/portfolio-data";

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, handleKeyDown]);

  const image = currentIndex !== null ? images[currentIndex] : null;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-background/90 backdrop-blur-md" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-md bg-secondary/80 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 z-20 rounded-md bg-secondary/80 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 z-20 rounded-md bg-secondary/80 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-[92vw] max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full overflow-hidden rounded-lg bg-black/20">
              <Image
                src={image.src}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 80vw"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
