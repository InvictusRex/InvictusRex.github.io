"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const PARTICLE_COLOR = { r: 240, g: 208, b: 24 };
  const SPREAD = 16;
  const SPEED = 0.06;
  const BASE_SIZE = 100;
  const PIXEL_RATIO = 1;

  const initParticles = useCallback(
    (width: number, height: number) => {
      const count = Math.floor((width * height) / (BASE_SIZE * SPREAD * 5));
      const particles: Particle[] = [];
      for (let i = 0; i < Math.min(count, 1400); i++) {
        const size = Math.random() * 1.8 + 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          size,
          baseSize: size,
        });
      }
      return particles;
    },
    [BASE_SIZE, SPREAD, SPEED],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * PIXEL_RATIO;
      canvas.height = document.documentElement.scrollHeight * PIXEL_RATIO;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX * PIXEL_RATIO,
        y: (e.clientY + window.scrollY) * PIXEL_RATIO,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.16;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
          p.size = p.baseSize * (1 + (1 - dist / maxDist) * 1.5);
        } else {
          p.size += (p.baseSize - p.size) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.vx += (Math.random() - 0.5) * SPEED * 0.08;
        p.vy += (Math.random() - 0.5) * SPEED * 0.08;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR.r}, ${PARTICLE_COLOR.g}, ${PARTICLE_COLOR.b}, 0.5)`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    initParticles,
    PIXEL_RATIO,
    SPEED,
    PARTICLE_COLOR.r,
    PARTICLE_COLOR.g,
    PARTICLE_COLOR.b,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
