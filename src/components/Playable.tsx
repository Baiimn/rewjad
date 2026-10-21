import { useEffect, useReducer } from 'react';
import { fresh, MY_NO, reduce } from '../logic/order';
import type { Translations } from '../translations';
import { PhoneFrame } from './PhoneFrame';
import { Screen1Home } from './Screen1Home';
import { Screen2Store } from './Screen2Store';
import { Screen3DishSheet } from './Screen3DishSheet';
import { Screen4OrderStatus } from './Screen4OrderStatus';
import { chime } from './chime';

/** Customer-only phone a visitor can tap through. Order logic lives in logic/order.ts; this only draws and dispatches. */
export const Playable = ({ t, width }: { t: Translations; width: number }) => {
  const [s, go] = useReducer(reduce, undefined, fresh);
  const status = s.order?.status;

  // Stall starts cooking a moment after the order is sent.
  useEffect(() => {
    if (status !== 1) return;
    const id = setTimeout(() => go({ t: 'cook' }), 2500);
    return () => clearTimeout(id);
  }, [status]);

  // The stall marks it ready on its own.
  useEffect(() => {
    if (status !== 2) return;
    const id = setTimeout(() => go({ t: 'ready', no: MY_NO }), 6000);
    return () => clearTimeout(id);
  }, [status]);

  // Ready: chime, then back to home 5 s later for the next tester.
  useEffect(() => {
    if (status !== 3) return;
    chime();
    const id = setTimeout(() => go({ t: 'reset' }), 5000);
    return () => clearTimeout(id);
  }, [status]);

  useEffect(() => {
    if (!s.banner) return;
    const id = setTimeout(() => go({ t: 'hide' }), 4000);
    return () => clearTimeout(id);
  }, [s.banner]);

  const key = s.order ? 'order' : s.page;

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame width={width} live>
        <div key={key} className="flex-1 min-h-0 flex flex-col relative animate-fade">
          {s.order ? (
            <Screen4OrderStatus s={s} go={go} />
          ) : s.page === 'home' ? (
            <Screen1Home go={go} touched={s.touched} />
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
