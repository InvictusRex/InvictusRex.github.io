"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getWasmEffects, type WasmEffectsExports } from "../lib/wasm-effects";

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
  const jsParticlesRef = useRef<Particle[]>([]);
  const wasmParticlesRef = useRef<Float32Array | null>(null);
  const particleCountRef = useRef(0);
  const animationRef = useRef<number>(0);
  const wasmRef = useRef<WasmEffectsExports | null>(null);

  const [useMediaFallback, setUseMediaFallback] = useState(false);

  const PARTICLE_COLOR = { r: 240, g: 208, b: 24 };
  const SPREAD = 16;
  const SPEED = 0.06;
  const BASE_SIZE = 100;
  const PIXEL_RATIO = 1;
  const MAX_DIST = 120;

  const getParticleCount = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / (BASE_SIZE * SPREAD * 5));
    return Math.min(count, 1400);
  }, []);

  const initJsParticles = useCallback(
    (width: number, height: number) => {
      const count = getParticleCount(width, height);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
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
    [getParticleCount],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
      navigator.userAgent,
    );
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;

    const isLowEnd = cores <= 4 || (typeof memory === "number" && memory <= 4);
    setUseMediaFallback(reducedMotion || isMobile || isLowEnd);
  }, []);

  useEffect(() => {
    if (useMediaFallback) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;

    const bindWasmParticleView = (count: number) => {
      const wasm = wasmRef.current;
      if (!wasm) return;
      const stride = wasm.particleStride();
      const ptr = wasm.particleDataPtr();
      wasmParticlesRef.current = new Float32Array(
        wasm.memory.buffer,
        ptr,
        count * stride,
      );
    };

    const initParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const requestedCount = getParticleCount(width, height);
      const wasm = wasmRef.current;

      if (wasm) {
        const seed = (Date.now() & 0x7fffffff) | 1;
        particleCountRef.current = wasm.initParticles(
          requestedCount,
          width,
          height,
          SPEED,
          seed,
        );
        bindWasmParticleView(particleCountRef.current);
      } else {
        jsParticlesRef.current = initJsParticles(width, height);
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth * PIXEL_RATIO;
      canvas.height = document.documentElement.scrollHeight * PIXEL_RATIO;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      initParticles();
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

    getWasmEffects().then((wasm) => {
      if (cancelled || !wasm) return;
      wasmRef.current = wasm;
      resize();
    });

    const drawJsParticles = () => {
      for (const p of jsParticlesRef.current) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST && dist > 0.0001) {
          const force = (1 - dist / MAX_DIST) * 0.16;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
          p.size = p.baseSize * (1 + (1 - dist / MAX_DIST) * 1.5);
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
      }
    };

    const drawWasmParticles = () => {
      const wasm = wasmRef.current;
      if (!wasm || !wasmParticlesRef.current) return;

      const expectedLength = particleCountRef.current * wasm.particleStride();
      if (
        wasmParticlesRef.current.length !== expectedLength ||
        wasmParticlesRef.current.buffer !== wasm.memory.buffer
      ) {
        bindWasmParticleView(particleCountRef.current);
      }

      const particles = wasmParticlesRef.current;
      if (!particles) return;

      wasm.updateParticles(
        particleCountRef.current,
        mouseRef.current.x,
        mouseRef.current.y,
        MAX_DIST,
        SPEED,
        canvas.width,
        canvas.height,
      );

      for (let i = 0; i < particleCountRef.current; i++) {
        const base = i * 6;
        const x = particles[base];
        const y = particles[base + 1];
        const size = particles[base + 4];

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR.r}, ${PARTICLE_COLOR.g}, ${PARTICLE_COLOR.b}, 0.5)`;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (wasmRef.current) {
        drawWasmParticles();
      } else {
        drawJsParticles();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    getParticleCount,
    initJsParticles,
    PIXEL_RATIO,
    SPEED,
    PARTICLE_COLOR.r,
    PARTICLE_COLOR.g,
    PARTICLE_COLOR.b,
    useMediaFallback,
  ]);

  if (useMediaFallback) {
    return (
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          backgroundImage: "url('/images/fallbacks/particles-fallback.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      >
        <video
          className="h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/fallbacks/particles-fallback.gif"
        >
          <source
            src="/images/fallbacks/particles-fallback.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
