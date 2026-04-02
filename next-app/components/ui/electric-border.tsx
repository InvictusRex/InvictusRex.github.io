"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  getWasmEffects,
  type WasmEffectsExports,
} from "../../lib/wasm-effects";

function hexToRgba(hex: string, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let normalizedHex = hex.replace("#", "");
  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const parsedInt = Number.parseInt(normalizedHex, 16);
  const r = (parsedInt >> 16) & 255;
  const g = (parsedInt >> 8) & 255;
  const b = parsedInt & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type ElectricBorderProps = {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  arcThickness?: number;
  thickness?: number;
  borderRadius?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
};

export default function ElectricBorder({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 0.12,
  arcThickness = 2,
  thickness = 2,
  borderRadius = 24,
  gap = 0,
  className,
  style,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const wasmRef = useRef<WasmEffectsExports | null>(null);
  const wasmPointsRef = useRef<Float32Array | null>(null);

  const random = useCallback((x: number) => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }, []);

  const noise2D = useCallback(
    (x: number, y: number) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);

      return (
        a * (1 - ux) * (1 - uy) +
        b * ux * (1 - uy) +
        c * (1 - ux) * uy +
        d * ux * uy
      );
    },
    [random],
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      time: number,
      seed: number,
      baseFlatness: number,
    ) => {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;

      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y +=
          octaveAmplitude *
          noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }

      return y;
    },
    [noise2D],
  );

  const getCornerPoint = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      arcLength: number,
      progress: number,
    ) => {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    },
    [],
  );

  const getRoundedRectPoint = useCallback(
    (
      t: number,
      left: number,
      top: number,
      width: number,
      height: number,
      radius: number,
    ) => {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter =
        2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;

      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(
          left + width - radius,
          top + radius,
          radius,
          -Math.PI / 2,
          Math.PI / 2,
          progress,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(
          left + width - radius,
          top + height - radius,
          radius,
          0,
          Math.PI / 2,
          progress,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return {
          x: left + width - radius - progress * straightWidth,
          y: top + height,
        };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(
          left + radius,
          top + height - radius,
          radius,
          Math.PI / 2,
          Math.PI / 2,
          progress,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return {
          x: left,
          y: top + height - radius - progress * straightHeight,
        };
      }
      accumulated += straightHeight;

      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(
        left + radius,
        top + radius,
        radius,
        Math.PI,
        Math.PI / 2,
        progress,
      );
    },
    [getCornerPoint],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const octaves = 10;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const baseFlatness = 0;
    const displacement = 60;
    const borderOffset = 60;

    const updateSize = () => {
      const baseWidth = container.offsetWidth;
      const baseHeight = container.offsetHeight;
      const width = baseWidth + borderOffset * 2;
      const height = baseHeight + borderOffset * 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    let { width, height } = updateSize();

    let cancelled = false;

    getWasmEffects().then((wasm) => {
      if (cancelled || !wasm) return;
      wasmRef.current = wasm;
    });

    const drawElectricBorder = (currentTime: number) => {
      if (!canvas || !ctx) return;

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = color;
      ctx.lineWidth = arcThickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const scale = displacement;
      const left = borderOffset - gap;
      const top = borderOffset - gap;
      const borderWidth = width - 2 * borderOffset + gap * 2;
      const borderHeight = height - 2 * borderOffset + gap * 2;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter =
        2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.floor(approximatePerimeter / 2);

      ctx.beginPath();

      const wasm = wasmRef.current;
      if (wasm) {
        const pointCount = wasm.computeElectricPoints(
          sampleCount,
          left,
          top,
          borderWidth,
          borderHeight,
          radius,
          timeRef.current,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          baseFlatness,
          scale,
        );

        const ptr = wasm.electricPointDataPtr();
        const expectedLength = pointCount * 2;

        if (
          !wasmPointsRef.current ||
          wasmPointsRef.current.length !== expectedLength ||
          wasmPointsRef.current.buffer !== wasm.memory.buffer
        ) {
          wasmPointsRef.current = new Float32Array(
            wasm.memory.buffer,
            ptr,
            expectedLength,
          );
        }

        const points = wasmPointsRef.current;
        if (points) {
          for (let i = 0; i < pointCount; i++) {
            const x = points[i * 2];
            const y = points[i * 2 + 1];
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        }
      } else {
        for (let i = 0; i <= sampleCount; i++) {
          const progress = i / sampleCount;

          const point = getRoundedRectPoint(
            progress,
            left,
            top,
            borderWidth,
            borderHeight,
            radius,
          );

          const xNoise = octavedNoise(
            progress * 8,
            octaves,
            lacunarity,
            gain,
            amplitude,
            frequency,
            timeRef.current,
            0,
            baseFlatness,
          );
          const yNoise = octavedNoise(
            progress * 8,
            octaves,
            lacunarity,
            gain,
            amplitude,
            frequency,
            timeRef.current,
            1,
            baseFlatness,
          );

          const displacedX = point.x + xNoise * scale;
          const displacedY = point.y + yNoise * scale;

          if (i === 0) {
            ctx.moveTo(displacedX, displacedY);
          } else {
            ctx.lineTo(displacedX, displacedY);
          }
        }
      }

      ctx.closePath();
      ctx.stroke();

      animationRef.current = requestAnimationFrame(drawElectricBorder);
    };

    const resizeObserver = new ResizeObserver(() => {
      const newSize = updateSize();
      width = newSize.width;
      height = newSize.height;
    });
    resizeObserver.observe(container);

    animationRef.current = requestAnimationFrame(drawElectricBorder);

    return () => {
      cancelled = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [
    color,
    speed,
    chaos,
    arcThickness,
    borderRadius,
    gap,
    getRoundedRectPoint,
    octavedNoise,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative isolate overflow-visible ${className ?? ""}`}
      style={{ borderRadius, ...style }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div
        className="pointer-events-none absolute z-0"
        style={{
          inset: -gap,
          borderRadius: borderRadius + gap,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            border: `${thickness}px solid ${hexToRgba(color, 0.6)}`,
            filter: "blur(1px)",
            borderRadius: borderRadius + gap,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            border: `${thickness}px solid ${color}`,
            filter: "blur(4px)",
            borderRadius: borderRadius + gap,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-[1] scale-110 opacity-30"
          style={{
            filter: "blur(32px)",
            background: `linear-gradient(-30deg, ${color}, transparent, ${color})`,
            borderRadius: borderRadius + gap,
          }}
        />
      </div>
      <div className="relative z-[1] rounded-[inherit]">{children}</div>
    </div>
  );
}
