export interface WasmEffectsExports {
  memory: WebAssembly.Memory;
  particleDataPtr: () => number;
  electricPointDataPtr: () => number;
  particleStride: () => number;
  initParticles: (
    requestedCount: number,
    width: number,
    height: number,
    speed: number,
    seed: number,
  ) => number;
  updateParticles: (
    count: number,
    mouseX: number,
    mouseY: number,
    maxDist: number,
    speed: number,
    width: number,
    height: number,
  ) => void;
  computeElectricPoints: (
    requestedSampleCount: number,
    left: number,
    top: number,
    borderWidth: number,
    borderHeight: number,
    radius: number,
    time: number,
    octaves: number,
    lacunarity: number,
    gain: number,
    amplitude: number,
    frequency: number,
    baseFlatness: number,
    displacementScale: number,
  ) => number;
}

let wasmEffectsPromise: Promise<WasmEffectsExports | null> | null = null;

export function getWasmEffects(): Promise<WasmEffectsExports | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!wasmEffectsPromise) {
    wasmEffectsPromise = fetch("/wasm/effects.wasm", { cache: "force-cache" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load WASM: ${response.status}`);
        }

        const bytes = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes, {});
        return instance.exports as unknown as WasmEffectsExports;
      })
      .catch(() => null);
  }

  return wasmEffectsPromise;
}
