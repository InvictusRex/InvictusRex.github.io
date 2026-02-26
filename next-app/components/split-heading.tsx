"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitHeadingProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
  delay?: number
}

export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const words = children.split(" ")

  return (
    <Tag
      ref={ref}
      className={cn("font-heading text-balance", className)}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * 0.08,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
