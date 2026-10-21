import { useEffect, useReducer, useRef, useState } from 'react';
import { Check, Clock, Store, X } from 'lucide-react';
import { freshStall, MAX_ORDERS, preview, REASONS, reduceStall } from '../logic/stallDemo';
import { PhoneFrame } from './PhoneFrame';
import { chime } from './chime';

/** Self-running stall phone. Logic in logic/stallDemo.ts; this draws, dispatches and runs the timers. */
export const StallPhone = ({ width }: { width: number }) => {
  const [s, go] = useReducer(reduceStall, undefined, freshStall);
  const [seen, setSeen] = useState(false);
  const [asking, setAsking] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const count = s.orders.length;

  // Runs only while the phone is on screen: orders and chimes pause when scrolled away.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // First order 2 s after view, then every 8 s, 3 at most.
  useEffect(() => {
    if (!seen || count >= MAX_ORDERS) return;
    const id = setTimeout(() => go({ t: 'arrive' }), count === 0 ? 2000 : 8000);
    return () => clearTimeout(id);
  }, [seen, count]);

  // Chime only on a new order seen on screen, never on scroll.
  useEffect(() => { if (count > 0 && seen) chime(); }, [count]);

  const waiting = s.orders.filter(o => o.status === 'new' || o.status === 'accepted').length;
  const btn = 'h-12 rounded-xl text-base font-heading font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform';

  return (
    <div ref={ref}>
      <PhoneFrame width={width} live>
        <div className="flex-1 min-h-0 flex flex-col bg-white">
          <header className="bg-ink text-white px-5 pt-2 pb-4">
            <span className="inline-flex items-center gap-1.5 bg-brand-text rounded-full px-3 h-7 text-sm font-heading font-bold">
              <Store className="w-4 h-4" />
              มุมมองร้านค้า
            </span>
            <h1 className="mt-2 text-2xl font-heading font-bold">ขาหมูฮ่องเต้</h1>
            <div className="mt-3 flex gap-8">
              <div><span className="block text-sm">รอทำ</span><span className="block text-xl font-heading font-bold">{waiting}</span></div>
              <div><span className="block text-sm">พร้อมรับ</span><span className="block text-xl font-heading font-bold">{s.orders.filter(o => o.status === 'ready').length}</span></div>
            </div>
          </header>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pb-10">
            <h2 className="pt-4 pb-2 px-1 text-lg font-heading font-bold">ออเดอร์เข้า</h2>
            {count === 0 && <p className="px-1 text-base text-ink/70">รอออเดอร์ใหม่...</p>}
            <ul className="flex flex-col gap-3">
              {[...s.orders].map((o, i) => ({ o, i })).reverse().map(({ o, i }) => (
                <li key={o.no} className={`rounded-2xl border-2 p-4 ${o.status === 'new' ? 'border-brand order-new' : 'border-orange-100'} ${o.status === 'cancelled' ? 'opacity-70' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5">
                      <span className="text-3xl font-heading font-extrabold">#{o.no}</span>
                      {o.status === 'new' && <span className="bg-brand-text text-white rounded-full px-2.5 h-7 flex items-center text-sm font-heading font-bold">ใหม่</span>}
                      {o.status === 'accepted' && <span className="text-sm font-semibold text-brand-text">กำลังทำ</span>}
                      {o.status === 'ready' && <span className="text-sm font-semibold text-go">แจ้งลูกค้าแล้ว</span>}
                      {o.status === 'cancelled' && <span className="text-sm font-semibold text-red-700">ยกเลิกแล้ว</span>}
                    </span>
                    <span className="flex items-center gap-1 text-base font-semibold"><Clock className="w-4 h-4" />{o.time}</span>
                  </div>
                  <div className="mt-1.5 flex justify-between text-base font-medium"><span>{o.dish}</span><span>{o.price} ฿</span></div>

                  {asking === i && (o.status === 'new' || o.status === 'accepted') ? (
                    <div className="mt-3 flex flex-col gap-2">
                      <span className="text-sm font-semibold">เหตุผลที่ยกเลิก</span>
                      <div className="grid grid-cols-2 gap-2">
                        {REASONS.map(r => (
                          <button key={r} type="button" onClick={() => { go({ t: 'cancel', i, reason: r }); setAsking(null); }}
                            className={`${btn} border-2 border-red-700 text-red-700`}>{r}</button>
                        ))}
                      </div>
                      <button type="button" onClick={() => setAsking(null)} className="h-10 text-sm font-semibold underline">กลับ</button>
                    </div>
                  ) : o.status === 'new' ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setAsking(i)} className={`${btn} border-2 border-ink/30`}><X className="w-5 h-5" />ยกเลิก</button>
                      <button type="button" onClick={() => go({ t: 'accept', i })} className={`${btn} bg-brand-text text-white`}><Check className="w-5 h-5 stroke-[3]" />รับออเดอร์</button>
                    </div>
                  ) : o.status === 'accepted' ? (
                    <div className="mt-3 grid grid-cols-[auto_1fr] gap-2">
                      <button type="button" onClick={() => setAsking(i)} className={`${btn} px-4 border-2 border-ink/30`}>ยกเลิก</button>
                      <button type="button" onClick={() => go({ t: 'ready', i })} className={`${btn} bg-go text-white`}><Check className="w-5 h-5 stroke-[3]" />พร้อมแล้ว แจ้ง #{o.no}</button>
                    </div>
                  ) : null}

                  {preview(o) && <p className="mt-3 rounded-xl bg-orange-50 px-3 py-2 text-sm font-semibold">{preview(o)}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
