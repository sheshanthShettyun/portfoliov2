type DaveSound = "click" | "detent" | "page" | "stamp" | "toggle";

const STORAGE_KEY = "dm:sound";
const cooldowns = new Map<DaveSound, number>();
let context: AudioContext | null = null;
let output: GainNode | null = null;
let enabled: boolean | null = null;

function soundIsEnabled() {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

function audio() {
  if (!soundIsEnabled()) return null;
  try {
    context ??= new AudioContext();
    if (context.state !== "running") void context.resume();
    if (!output) {
      output = context.createGain();
      output.gain.value = 0.72;
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 12;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.002;
      compressor.release.value = 0.12;
      output.connect(compressor).connect(context.destination);
    }
    return { context, output, now: context.currentTime };
  } catch {
    return null;
  }
}

function noise(
  ctx: AudioContext,
  destination: AudioNode,
  now: number,
  length: number,
  type: BiquadFilterType,
  frequency: number,
  level: number,
) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = 0.85;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(level, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
  source.connect(filter).connect(gain).connect(destination);
  source.start(now);
  source.stop(now + length);
}

function tone(ctx: AudioContext, destination: AudioNode, now: number, from: number, to: number, length: number, level: number) {
  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(from, now);
  oscillator.frequency.exponentialRampToValueAtTime(to, now + length);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(level, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
  oscillator.connect(gain).connect(destination);
  oscillator.start(now);
  oscillator.stop(now + length + 0.01);
}

export function setDaveSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    // Audio still works when storage is unavailable.
  }
}

export function getDaveSoundEnabled() {
  return soundIsEnabled();
}

export function playDaveSound(kind: DaveSound) {
  const limits: Record<DaveSound, number> = { click: 35, detent: 70, page: 250, stamp: 300, toggle: 120 };
  const timestamp = performance.now();
  if (timestamp - (cooldowns.get(kind) ?? -Infinity) < limits[kind]) return;
  cooldowns.set(kind, timestamp);
  const value = audio();
  if (!value) return;
  const { context: ctx, output: destination, now } = value;

  if (kind === "click") {
    noise(ctx, destination, now, 0.018, "bandpass", 2900, 0.12);
    tone(ctx, destination, now, 210, 1400, 0.045, 0.035);
  } else if (kind === "detent") {
    noise(ctx, destination, now, 0.008, "highpass", 4200, 0.07);
    tone(ctx, destination, now, 1850, 2200, 0.018, 0.018);
  } else if (kind === "page") {
    noise(ctx, destination, now, 0.22, "bandpass", 1500, 0.045);
    tone(ctx, destination, now + 0.16, 160, 110, 0.06, 0.03);
  } else if (kind === "stamp") {
    noise(ctx, destination, now, 0.06, "lowpass", 1600, 0.16);
    tone(ctx, destination, now, 145, 58, 0.18, 0.18);
  } else {
    tone(ctx, destination, now, 300, 540, 0.16, 0.055);
  }
}
