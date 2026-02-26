"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Experience, Education } from "@/lib/portfolio-data"

interface TimelineItem {
  title: string
  subtitle: string
  period: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  label: string
}

function mapExperience(exp: Experience): TimelineItem {
  return {
    title: exp.title,
    subtitle: exp.company,
    period: exp.period,
    description: exp.description,
  }
}

function mapEducation(edu: Education): TimelineItem {
  return {
    title: edu.degree,
    subtitle: edu.school,
    period: edu.period,
    description: edu.description,
  }
}

export { mapExperience, mapEducation }

export function Timeline({ items, label }: TimelineProps) {
  return (
    <div role="list" aria-label={label} className="relative ml-4">
      {/* Vertical line */}
      <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

      {items.map((item, index) => (
        <TimelineEntry key={index} item={item} index={index} />
      ))}
    </div>
  )
}

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      role="listitem"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pb-8 pl-8 last:pb-0"
    >
      {/* Dot */}
      <div className="absolute left-0 top-2 -translate-x-1/2 rounded-full">
        <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
        <span className="font-mono text-xs text-primary">{item.period}</span>
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground/80">{item.subtitle}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </motion.div>
  )
}
