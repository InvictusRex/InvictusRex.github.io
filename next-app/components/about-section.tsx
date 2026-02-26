"use client"

import { SectionWrapper } from "./section-wrapper"
import { SplitHeading } from "./split-heading"
import { Timeline, mapExperience, mapEducation } from "./timeline"
import {
  experiences,
  educationItems,
  techStack,
  contactInfo,
} from "@/lib/portfolio-data"
import { Mail, MapPin, Github, Linkedin, GraduationCap } from "lucide-react"

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SplitHeading
        as="h2"
        className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        About Me
      </SplitHeading>

      <div className="mb-12 max-w-3xl">
        <p className="text-base leading-relaxed text-muted-foreground">
          I am a robotics engineer and researcher with a deep focus on autonomous aerial
          systems and edge-deployed machine intelligence. My work spans the full stack of
          robotics — from mechanical design and embedded firmware to computer vision and
          real-time inference on resource-constrained hardware. I believe the future of
          robotics lies at the intersection of capable hardware and intelligent software,
          and I build systems that bridge that gap.
        </p>
      </div>

      {/* Info grid */}
      <div className="mb-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={<GraduationCap className="h-4 w-4" />}
          label="Education"
          value="M.S. Robotics, Georgia Tech"
        />
        <InfoCard
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={contactInfo.email}
          href={`mailto:${contactInfo.email}`}
        />
        <InfoCard
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={contactInfo.location}
        />
        <InfoCard
          icon={<Github className="h-4 w-4" />}
          label="GitHub"
          value="arjunmehta"
          href={contactInfo.github}
        />
      </div>

      {/* Experience & Education side-by-side */}
      <div className="mb-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
            Experience
          </h3>
          <Timeline
            items={experiences.map(mapExperience)}
            label="Professional experience"
          />
        </div>
        <div>
          <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
            Education
          </h3>
          <Timeline
            items={educationItems.map(mapEducation)}
            label="Education history"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/30">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}
