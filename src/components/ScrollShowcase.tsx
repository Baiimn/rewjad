import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Translations } from '../translations';
import { PhoneFrame } from './PhoneFrame';
import { Reveal } from './Reveal';
import { Screen1Home } from './Screen1Home';
import { Screen2Store } from './Screen2Store';
import { Screen3DishSheet } from './Screen3DishSheet';
import { Screen4OrderStatus } from './Screen4OrderStatus';
import { Screen5SellerView } from './Screen5SellerView';

/** -1 when the section enters from below, 0 centred, 1 when it leaves at the top. */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = (window.innerHeight - r.top) / (r.height + window.innerHeight);
      setP((Math.min(Math.max(v, 0), 1) - 0.5) * 2);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    read();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [ref]);
  return p;
}

export const ScrollShowcase = ({ t }: { t: Translations }) => {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);
  const n = t.showcase3D.screenNames;
  const screens: { el: ReactNode; desc: string; tilt: string }[] = [
    { el: <Screen1Home />, desc: n.home, tilt: `rotateY(${22 + p * 14}deg) rotateX(${-4 + p * 8}deg) rotateZ(-3deg) translateZ(-60px)` },
    { el: <Screen2Store />, desc: n.store, tilt: `rotateY(${11 + p * 9}deg) rotateX(${-2 + p * 5}deg) rotateZ(-1.5deg) translateZ(-20px)` },
    { el: <Screen3DishSheet />, desc: n.dish, tilt: `rotateY(${p * -6}deg) rotateX(${6 - Math.abs(p) * 6}deg) translateZ(40px)` },
    { el: <Screen4OrderStatus />, desc: n.status, tilt: `rotateY(${-11 + p * -9}deg) rotateX(${-2 + p * 5}deg) rotateZ(1.5deg) translateZ(-20px)` },
    { el: <Screen5SellerView />, desc: n.stall, tilt: `rotateY(${-22 + p * -14}deg) rotateX(${-4 + p * 8}deg) rotateZ(3deg) translateZ(-60px)` },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden" aria-label={t.showcase3D.title}>
      <Reveal className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-ink leading-snug">{t.showcase3D.title}</h2>
        <p className="text-lg text-ink leading-relaxed max-w-3xl">{t.showcase3D.description}</p>
      </Reveal>

      {/* Phone: a swipeable row, each phone tilting with the scroll. */}
      <div className="md:hidden mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 pb-6 [perspective:900px]">
        {screens.map((x, i) => (
          <div key={i} className="snap-center shrink-0 flex flex-col items-center gap-3 will-change-transform"
            style={{ transform: `rotateY(${p * 14}deg) rotateX(${p * 6}deg)` }}>
            <PhoneFrame width={250}>{x.el}</PhoneFrame>
            <span className="text-base text-ink text-center max-w-[240px]">{x.desc}</span>
          </div>
        ))}
      </div>

      {/* Desktop: five phones fanned out in 3D. */}
      <div className="hidden md:flex mt-14 justify-center items-start -space-x-14 lg:-space-x-10 xl:-space-x-6 pointer-events-none [perspective:1400px]">
        {screens.map((x, i) => (
          <div key={i} className="flex flex-col items-center gap-5 will-change-transform transition-transform duration-200 ease-out"
            style={{ transform: x.tilt, zIndex: 30 - Math.abs(2 - i) * 10 }}>
            <PhoneFrame width={i === 2 ? 250 : 220}>{x.el}</PhoneFrame>
            <span className="text-base text-ink text-center max-w-[210px] leading-snug">{x.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
