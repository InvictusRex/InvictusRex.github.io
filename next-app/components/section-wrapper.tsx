"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative z-10 px-4 py-20 md:px-8 md:py-28 lg:py-32",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  )
}
