"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SplitHeading } from "./split-heading";
import { contactInfo } from "@/lib/portfolio-data";
import ElectricBorder from "./ui/electric-border";

export function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.getElementById(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center px-4 pt-20 md:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:justify-between md:gap-16 lg:gap-20">
        {/* Text */}
        <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs tracking-wider text-muted-foreground">
              Robotics / UAV / Computer Vision / Edge AI
            </span>
          </motion.div>

          <SplitHeading
            as="h1"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            delay={0.2}
          >
            Rupankar Majumdar
          </SplitHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Building autonomous machines that perceive, decide, and act. From
            custom UAV platforms to edge-deployed vision systems, I engineer
            solutions at the intersection of robotics, flight, and artificial
            intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex items-center gap-4"
          >
            <button
              onClick={() => handleScroll("projects")}
              className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              View Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              About Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-primary/35 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-primary/35 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:rupankarvitc@gmail.com"
              className="rounded-md border border-primary/35 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.kaggle.com/rupankarmajumdar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-primary/35 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Kaggle profile"
            >
              <span className="flex h-5 w-5 items-center justify-center text-sm font-semibold leading-none">
                K
              </span>
            </a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative shrink-0"
        >
          <ElectricBorder
            color="#f0d018"
            speed={1}
            chaos={0.18}
            arcThickness={2.5}
            thickness={2}
            borderRadius={16}
            gap={8}
          >
            <div className="relative aspect-[1060/1280] w-56 overflow-hidden rounded-2xl border border-border/60 md:w-72 lg:w-80">
              <Image
                src="/images/profile.jpg"
                alt="Rupankar Majumdar - Robotics & UAV Engineer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ElectricBorder>
          <div className="absolute -bottom-2 -right-2 aspect-[1060/1280] w-56 rounded-2xl border border-primary/20 md:w-72 lg:w-80" />
        </motion.div>
      </div>
    </section>
  );
}
