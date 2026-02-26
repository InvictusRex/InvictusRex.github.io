"use client"

import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"
import { SplitHeading } from "./split-heading"
import { contactInfo } from "@/lib/portfolio-data"
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API endpoint
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <SectionWrapper id="contact">
      <SplitHeading
        as="h2"
        className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        Get In Touch
      </SplitHeading>
      <p className="mb-10 max-w-2xl text-base text-muted-foreground">
        Interested in collaboration, research opportunities, or have a project in
        mind? I would love to hear from you.
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Contact info */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <ContactCard
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={contactInfo.email}
            href={`mailto:${contactInfo.email}`}
          />
          <ContactCard
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={contactInfo.location}
          />
          <ContactCard
            icon={<Github className="h-4 w-4" />}
            label="GitHub"
            value="github.com/arjunmehta"
            href={contactInfo.github}
          />
          <ContactCard
            icon={<Linkedin className="h-4 w-4" />}
            label="LinkedIn"
            value="linkedin.com/in/arjunmehta-robotics"
            href={contactInfo.linkedin}
          />
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-medium text-muted-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-xs font-medium text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              className="resize-none rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              placeholder="Tell me about your project or opportunity..."
            />
          </div>
          <button
            type="submit"
            disabled={submitted}
            className="group flex items-center justify-center gap-2 self-start rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-70"
          >
            {submitted ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Message Sent
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-border pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            Designed & built by Arjun Mehta
          </p>
          <p className="font-mono text-xs text-muted-foreground/50">
            Robotics / UAV / Edge AI
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}

function ContactCard({
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
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 transition-colors hover:border-primary/30">
      <div className="text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {label}
        </p>
        <p className="truncate text-sm text-foreground">{value}</p>
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
