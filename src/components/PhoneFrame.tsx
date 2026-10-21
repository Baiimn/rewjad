import type { ReactNode } from 'react';
import { Wifi, Battery } from 'lucide-react';

// Native phone size; the landing scales it down with a CSS transform so the screens keep their real layout.
const W = 412;
const H = 866;

type PhoneFrameProps = { id?: string; label?: string; width?: number; live?: boolean; children: ReactNode };

export const PhoneFrame = ({ id, label, width = W, live = false, children }: PhoneFrameProps) => {
  const k = width / W;
  return (
    <figure className="m-0 flex flex-col items-center gap-4 shrink-0">
      <div style={{ width, height: H * k }} className="relative">
        <div
          style={{ width: W, height: H, transform: `scale(${k})`, transformOrigin: 'top left' }}
          className="absolute top-0 left-0 p-[11px] bg-[#23262E] rounded-[52px] shadow-[0_40px_80px_-20px_rgba(26,26,26,0.45)]"
          inert={!live}
        >
          <div
            id={id}
            style={{ width: 390, height: 844 }}
            className="relative bg-white text-ink font-thai overflow-hidden flex flex-col rounded-[42px] select-none"
          >
            <div className="relative z-50 shrink-0 h-11 px-7 flex items-center justify-between text-sm font-semibold">
              <span>12:02</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[110px] h-[28px] bg-black rounded-full" />
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <Wifi className="w-4 h-4" />
                <Battery className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="flex-1 min-h-0 flex flex-col relative">{children}</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-ink rounded-full z-50" />
          </div>
        </div>
      </div>
      {label && <figcaption className="text-base font-heading font-semibold text-center">{label}</figcaption>}
    </figure>
  );
};
