"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const lines = children.split("\n");
  let wordIndex = 0;

  return (
    <Tag ref={ref} className={cn("font-heading text-balance", className)}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");

        return (
          <span key={`line-${lineIndex}`} className="block">
            {words.map((word, indexInLine) => {
              const currentWordIndex = wordIndex;
              wordIndex += 1;

              return (
                <span
                  key={`line-${lineIndex}-word-${indexInLine}`}
                  className="mr-[0.25em] inline-block overflow-hidden"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                      isInView
                        ? { y: 0, opacity: 1 }
                        : { y: "100%", opacity: 0 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: delay + currentWordIndex * 0.08,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
