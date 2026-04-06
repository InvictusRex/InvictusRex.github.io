import { Github, Linkedin, Mail } from "lucide-react";

const domains = [
  "Drones & Robotics",
  "Computer Vision",
  "Machine Learning",
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 px-4 py-10 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
        <div className="md:pr-2">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Rupankar Majumdar
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Building vision-first autonomous robotics systems for
            safety-critical real-world applications.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        <div className="md:justify-self-center">
          <h4 className="font-heading text-sm font-semibold text-foreground">
            Navigation
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2">
            <div className="flex flex-col gap-2">
              <a
                href="#home"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                About
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="#projects"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Projects
              </a>
              <a
                href="#gallery"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Gallery
              </a>
            </div>
          </div>
        </div>

        <div className="md:justify-self-end">
          <h4 className="font-heading text-sm font-semibold text-foreground">
            Let's Connect On
          </h4>
          <div className="mt-3 flex items-start gap-4">
            <a
              href="https://github.com/InvictusRex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <span className="rounded-md border border-primary/35 p-2 transition-colors hover:bg-secondary hover:text-foreground">
                <Github className="h-4 w-4" />
              </span>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rupankar-majumdar-aa8246278/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <span className="rounded-md border border-primary/35 p-2 transition-colors hover:bg-secondary hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </span>
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:rupankarvitc@gmail.com"
              className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <span className="rounded-md border border-primary/35 p-2 transition-colors hover:bg-secondary hover:text-foreground">
                <Mail className="h-4 w-4" />
              </span>
              <span>Mail</span>
            </a>
            <a
              href="https://www.kaggle.com/rupankarmajumdar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              aria-label="Kaggle"
            >
              <span className="rounded-md border border-primary/35 p-2 transition-colors hover:bg-secondary hover:text-foreground">
                <span className="flex h-4 w-4 items-center justify-center text-[11px] font-semibold leading-none">
                  K
                </span>
              </span>
              <span>Kaggle</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 w-full max-w-6xl border-t border-border/50 pt-2">
        <p className="text-xs text-muted-foreground/70">
          © 2026 Rupankar Majumdar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
