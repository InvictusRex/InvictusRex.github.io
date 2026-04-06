const PARTICLE_STRIDE = 6;
const MAX_PARTICLES = 1800;
const MAX_ELECTRIC_POINTS = 8192;

const particleData = new StaticArray<f32>(MAX_PARTICLES * PARTICLE_STRIDE);
const electricPointData = new StaticArray<f32>(MAX_ELECTRIC_POINTS * 2);

let prngState: u32 = 1;
let tempX: f32 = 0;
let tempY: f32 = 0;

function rand(): f32 {
  let x = prngState;
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  prngState = x;
  return <f32>(x >>> 0) / 4294967295.0;
}

function frand(seed: f32): f32 {
  const s = Mathf.sin(seed * 12.9898) * 43758.5453;
  return s - Mathf.floor(s);
}

function noise2D(x: f32, y: f32): f32 {
  const i = Mathf.floor(x);
  const j = Mathf.floor(y);
  const fx = x - i;
  const fy = y - j;

  const a = frand(i + j * 57.0);
  const b = frand(i + 1.0 + j * 57.0);
  const c = frand(i + (j + 1.0) * 57.0);
  const d = frand(i + 1.0 + (j + 1.0) * 57.0);

  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);

  return (
    a * (1.0 - ux) * (1.0 - uy) +
    b * ux * (1.0 - uy) +
    c * (1.0 - ux) * uy +
    d * ux * uy
  );
}

function octavedNoise(
  x: f32,
  octaves: i32,
  lacunarity: f32,
  gain: f32,
  baseAmplitude: f32,
  baseFrequency: f32,
  time: f32,
  seed: f32,
  baseFlatness: f32,
): f32 {
  let y: f32 = 0.0;
  let amplitude = baseAmplitude;
  let frequency = baseFrequency;

  for (let i = 0; i < octaves; i++) {
    let octaveAmplitude = amplitude;
    if (i == 0) {
      octaveAmplitude *= baseFlatness;
    }

    y +=
      octaveAmplitude *
      noise2D(frequency * x + seed * 100.0, time * frequency * 0.3);

    frequency *= lacunarity;
    amplitude *= gain;
  }

  return y;
}

function setCornerPoint(
  centerX: f32,
  centerY: f32,
  radius: f32,
  startAngle: f32,
  arcLength: f32,
  progress: f32,
): void {
  const angle = startAngle + progress * arcLength;
  tempX = centerX + radius * Mathf.cos(angle);
  tempY = centerY + radius * Mathf.sin(angle);
}

function setRoundedRectPoint(
  t: f32,
  left: f32,
  top: f32,
  width: f32,
  height: f32,
  radius: f32,
): void {
  const straightWidth = width - 2.0 * radius;
  const straightHeight = height - 2.0 * radius;
  const cornerArc = (Mathf.PI * radius) / 2.0;
  const totalPerimeter =
    2.0 * straightWidth + 2.0 * straightHeight + 4.0 * cornerArc;
  const distance = t * totalPerimeter;

  let accumulated: f32 = 0.0;

  if (distance <= accumulated + straightWidth) {
    const progress = <f32>((distance - accumulated) / straightWidth);
    tempX = <f32>(left + radius + progress * straightWidth);
    tempY = top;
    return;
  }
  accumulated += straightWidth;

  if (distance <= accumulated + cornerArc) {
    const progress = <f32>((distance - accumulated) / cornerArc);
    setCornerPoint(
      left + width - radius,
      top + radius,
      radius,
      -Mathf.PI / 2.0,
      Mathf.PI / 2.0,
      progress,
    );
    return;
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightHeight) {
    const progress = <f32>((distance - accumulated) / straightHeight);
    tempX = left + width;
    tempY = <f32>(top + radius + progress * straightHeight);
    return;
  }
  accumulated += straightHeight;

  if (distance <= accumulated + cornerArc) {
    const progress = <f32>((distance - accumulated) / cornerArc);
    setCornerPoint(
      left + width - radius,
      top + height - radius,
      radius,
      0.0,
      Mathf.PI / 2.0,
      progress,
    );
    return;
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightWidth) {
    const progress = <f32>((distance - accumulated) / straightWidth);
    tempX = <f32>(left + width - radius - progress * straightWidth);
    tempY = top + height;
    return;
  }
  accumulated += straightWidth;

  if (distance <= accumulated + cornerArc) {
    const progress = <f32>((distance - accumulated) / cornerArc);
    setCornerPoint(
      left + radius,
      top + height - radius,
      radius,
      Mathf.PI / 2.0,
      Mathf.PI / 2.0,
      progress,
    );
    return;
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightHeight) {
    const progress = <f32>((distance - accumulated) / straightHeight);
    tempX = left;
    tempY = <f32>(top + height - radius - progress * straightHeight);
    return;
  }
  accumulated += straightHeight;

  const progress = <f32>((distance - accumulated) / cornerArc);
  setCornerPoint(
    left + radius,
    top + radius,
    radius,
    Mathf.PI,
    Mathf.PI / 2.0,
    progress,
  );
}

export function particleDataPtr(): usize {
  return changetype<usize>(particleData);
}

export function electricPointDataPtr(): usize {
  return changetype<usize>(electricPointData);
}

export function particleStride(): i32 {
  return PARTICLE_STRIDE;
}

export function initParticles(
  requestedCount: i32,
  width: f32,
  height: f32,
  speed: f32,
  seed: i32,
): i32 {
  prngState = <u32>(seed > 0 ? seed : 1);
  const count = requestedCount < MAX_PARTICLES ? requestedCount : MAX_PARTICLES;

  for (let i = 0; i < count; i++) {
    const base = i * PARTICLE_STRIDE;
    const size = rand() * 1.8 + 0.4;

    unchecked((particleData[base] = rand() * width));
    unchecked((particleData[base + 1] = rand() * height));
    unchecked((particleData[base + 2] = (rand() - 0.5) * speed));
    unchecked((particleData[base + 3] = (rand() - 0.5) * speed));
    unchecked((particleData[base + 4] = size));
    unchecked((particleData[base + 5] = size));
  }

  return count;
}

export function updateParticles(
  count: i32,
  mouseX: f32,
  mouseY: f32,
  maxDist: f32,
  speed: f32,
  width: f32,
  height: f32,
): void {
  const cappedCount = count < MAX_PARTICLES ? count : MAX_PARTICLES;

  for (let i = 0; i < cappedCount; i++) {
    const base = i * PARTICLE_STRIDE;

    let x = unchecked(particleData[base]);
    let y = unchecked(particleData[base + 1]);
    let vx = unchecked(particleData[base + 2]);
    let vy = unchecked(particleData[base + 3]);
    let size = unchecked(particleData[base + 4]);
    const baseSize = unchecked(particleData[base + 5]);

    const dx = mouseX - x;
    const dy = mouseY - y;
    const dist = Mathf.sqrt(dx * dx + dy * dy);

    if (dist < maxDist && dist > 0.0001) {
      const force = (1.0 - dist / maxDist) * 0.16;
      vx -= <f32>((dx / dist) * force);
      vy -= <f32>((dy / dist) * force);
      size = baseSize * (1.0 + (1.0 - dist / maxDist) * 1.5);
    } else {
      size += (baseSize - size) * 0.05;
    }

    x += vx;
    y += vy;

    vx *= 0.995;
    vy *= 0.995;
    vx += (rand() - 0.5) * speed * 0.08;
    vy += (rand() - 0.5) * speed * 0.08;

    if (x < -20.0) x = width + 20.0;
    if (x > width + 20.0) x = -20.0;
    if (y < -20.0) y = height + 20.0;
    if (y > height + 20.0) y = -20.0;

    unchecked((particleData[base] = x));
    unchecked((particleData[base + 1] = y));
    unchecked((particleData[base + 2] = vx));
    unchecked((particleData[base + 3] = vy));
    unchecked((particleData[base + 4] = size));
  }
}

export function computeElectricPoints(
  requestedSampleCount: i32,
  left: f32,
  top: f32,
  borderWidth: f32,
  borderHeight: f32,
  radius: f32,
  time: f32,
  octaves: i32,
  lacunarity: f32,
  gain: f32,
  amplitude: f32,
  frequency: f32,
  baseFlatness: f32,
  displacementScale: f32,
): i32 {
  const sampleCount = requestedSampleCount > 1 ? requestedSampleCount : 1;
  const pointCount =
    sampleCount + 1 < MAX_ELECTRIC_POINTS
      ? sampleCount + 1
      : MAX_ELECTRIC_POINTS;

  for (let i = 0; i < pointCount; i++) {
    const progress = <f32>i / <f32>(pointCount - 1);

    setRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

    const xNoise = octavedNoise(
      progress * 8.0,
      octaves,
      lacunarity,
      gain,
      amplitude,
      frequency,
      time,
      0.0,
      baseFlatness,
    );

    const yNoise = octavedNoise(
      progress * 8.0,
      octaves,
      lacunarity,
      gain,
      amplitude,
      frequency,
      time,
      1.0,
      baseFlatness,
    );

    const base = i * 2;
    unchecked((electricPointData[base] = tempX + xNoise * displacementScale));
    unchecked(
      (electricPointData[base + 1] = tempY + yNoise * displacementScale),
    );
  }

  return pointCount;
}
