import { useEffect, useReducer, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { fresh, MY_NO, reduce } from '../logic/order';
import type { Translations } from '../translations';
import { PhoneFrame } from './PhoneFrame';
import { Screen2Store } from './Screen2Store';
import { Screen3DishSheet } from './Screen3DishSheet';
import { Screen4OrderStatus } from './Screen4OrderStatus';
import { Screen5SellerView } from './Screen5SellerView';

/** The phone a visitor can tap through. Order logic lives in logic/order.ts; this only draws and dispatches. */
export const Playable = ({ t, width }: { t: Translations; width: number }) => {
  const [s, go] = useReducer(reduce, undefined, fresh);
  const [view, setView] = useState<'student' | 'stall'>('student');
  const status = s.order?.status;

  // Stall starts cooking a moment after the order is sent.
  useEffect(() => {
    if (status !== 1) return;
    const id = setTimeout(() => go({ t: 'cook' }), 2500);
    return () => clearTimeout(id);
  }, [status]);

  // If nobody taps Ready in the stall view, the stall does it.
  useEffect(() => {
    if (status !== 2) return;
    const id = setTimeout(() => go({ t: 'ready', no: MY_NO }), 6000);
    return () => clearTimeout(id);
  }, [status]);

  // Once ready, show the student the banner.
  useEffect(() => {
    if (status === 3) setView('student');
  }, [status]);

  useEffect(() => {
    if (!s.banner) return;
    const id = setTimeout(() => go({ t: 'hide' }), 4000);
    return () => clearTimeout(id);
  }, [s.banner]);

  const key = view === 'stall' ? 'stall' : s.order ? 'order' : 'store';
  const tab = (v: 'student' | 'stall', label: string) => (
    <button
      type="button"
      onClick={() => setView(v)}
      aria-pressed={view === v}
      className={`h-11 px-5 rounded-full text-base font-bold transition-colors ${view === v ? 'bg-ink text-white' : 'text-ink'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="flex p-1 rounded-full border-2 border-ink/15 bg-white">
          {tab('student', t.demoLabels.student)}
          {tab('stall', t.demoLabels.stall)}
        </div>
        <button
          type="button"
          onClick={() => { go({ t: 'reset' }); setView('student'); }}
          className="h-11 px-4 rounded-full text-base font-bold text-ink flex items-center gap-2 active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          {t.demoLabels.restart}
        </button>
      </div>
      <PhoneFrame width={width} live>
        <div key={key} className="flex-1 min-h-0 flex flex-col relative animate-fade">
          {view === 'stall' ? (
            <Screen5SellerView s={s} go={go} />
          ) : s.order ? (
            <Screen4OrderStatus s={s} go={go} />
          ) : (
            <>
              <Screen2Store s={s} go={go} />
              {s.sheet && (
                <div className="absolute inset-0 z-40 bg-black/40 flex flex-col animate-fade">
                  <button type="button" aria-label="ปิด" className="absolute inset-0" onClick={() => go({ t: 'close' })} />
                  <Screen3DishSheet s={s} go={go} />
                </div>
              )}
            </>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
};
