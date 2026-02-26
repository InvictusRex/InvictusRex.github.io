"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { SectionWrapper } from "./section-wrapper"
import { SplitHeading } from "./split-heading"
import { ProjectModal } from "./project-modal"
import { projects, categories } from "@/lib/portfolio-data"
import type { Project } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <SectionWrapper id="projects">
      <SplitHeading
        as="h2"
        className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        Projects
      </SplitHeading>
      <p className="mb-8 max-w-2xl text-base text-muted-foreground">
        A selection of engineering projects spanning aerial vehicles, robotics,
        machine learning, and more. Each represents a full design-build-test cycle.
      </p>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid (Chroma Grid style) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Hover indicator */}
        <div className="absolute right-3 top-3 rounded-md bg-background/70 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
            {project.year}
          </span>
          <span className="truncate text-[10px] text-muted-foreground/70">
            {project.category}
          </span>
        </div>
        <h3 className="font-heading text-sm font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded border border-border/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
