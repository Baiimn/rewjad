// Two-note chime made with the browser's audio API, no sound file.
// Browsers only allow sound after the visitor has tapped the page, so it stays silent until then.

let ctx: AudioContext | null = null;
let tapped = false;

if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', () => {
    tapped = true;
    ctx ??= new AudioContext();
    void ctx.resume();
  }, { once: true, capture: true });
}

export function chime() {
  if (!tapped || !ctx) return;
  const t0 = ctx.currentTime;
  [880, 1320].forEach((hz, i) => {
    const osc = ctx!.createOscillator();
    const gain = ctx!.createGain();
    const t = t0 + i * 0.14;
    osc.type = 'sine';
    osc.frequency.value = hz;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(gain).connect(ctx!.destination);
    osc.start(t);
    osc.stop(t + 0.65);
  });
}
