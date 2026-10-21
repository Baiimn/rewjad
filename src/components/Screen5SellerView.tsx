import { Check, Clock, Store } from 'lucide-react';
import { TIMES } from './media';
import { STALLS, type Action, type State } from '../logic/order';

type Order = { no: number; time: string; items: [string, string][]; note?: string; state: 'new' | 'cooking' | 'ready' };

const staticOrders: Order[] = [
  { no: 27, time: '12:10', items: [['ข้าวขาหมู พิเศษ x1', '50 ฿']], note: 'ขอพริกน้ำส้มเพิ่ม แยกน้ำราด', state: 'new' },
  { no: 26, time: '12:10', items: [['ข้าวปลากรอบ x1', '40 ฿'], ['ข้าวขาหมู ธรรมดา x1', '45 ฿']], note: 'ไม่เอาผักกาดดอง', state: 'cooking' },
  { no: 25, time: '12:05', items: [['ข้าวไก่ทอดน้ำปลา x2', '90 ฿']], note: 'น้ำปลาพริกแยกถุง', state: 'cooking' },
  { no: 24, time: '12:00', items: [['ข้าวมันไก่กรอบ x1', '40 ฿']], state: 'ready' },
];

/** The stall's other orders in the Playable phone: made up from that stall's own menu. */
function liveOrders(s: State): Order[] {
  const stall = s.order ? s.order.stall : s.stall;
  const st = STALLS[stall];
  const pick = (i: number) => st.dishes[i % st.dishes.length];
  const others: Order[] = [
    { no: 26, time: '12:10', items: [[`${pick(1).th} x1`, `${pick(1).p} ฿`]], state: 'cooking' },
    { no: 25, time: '12:05', items: [[`${pick(2).th} x2`, `${pick(2).p * 2} ฿`]], state: 'cooking' },
    { no: 24, time: '12:00', items: [[`${pick(0).th} x1`, `${pick(0).p} ฿`]], state: 'ready' },
  ];
  const o = s.order;
  const mine: Order[] = o
    ? [{
        no: o.no, time: TIMES[o.time],
        items: [[`${st.dishes[o.dish].th}${o.addons.map(a => ` ${st.addons[a].th}`).join('')} x1`, `${o.total} ฿`]],
        state: o.status === 1 ? 'new' : o.status === 2 ? 'cooking' : 'ready',
      }]
    : [];
  return [...mine, ...others].map(x => (s.done[x.no] ? { ...x, state: 'ready' } : x));
}

type Props = { s?: State; go?: (a: Action) => void };

/** No props: the approved static picture. With s + go: the Playable phone's stall view with live Ready taps. */
export const Screen5SellerView = ({ s, go }: Props) => {
  const orders = s ? liveOrders(s) : staticOrders;
  const name = s ? STALLS[s.order ? s.order.stall : s.stall].th : 'ขาหมูฮ่องเต้';
  const waiting = orders.filter(o => o.state !== 'ready').length;
  const ready = orders.filter(o => o.state === 'ready').length;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      <header className="bg-ink text-white px-5 pt-2 pb-4">
        <span className="inline-flex items-center gap-1.5 bg-brand-text rounded-full px-3 h-7 text-sm font-heading font-bold">
          <Store className="w-4 h-4" />
          มุมมองร้านค้า
        </span>
        <h1 className="mt-2 text-2xl font-heading font-bold">{name}</h1>
        <div className="mt-3 flex gap-8">
          {[
            ['รอปรุง', String(waiting)],
            ['พร้อมรับ', String(ready)],
            ['ยอดวันนี้', '2,150 ฿'],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="block text-sm">{k}</span>
              <span className="block text-xl font-heading font-bold">{v}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pb-10">
        <h2 className="pt-4 pb-1 text-lg font-heading font-bold">ออเดอร์วันนี้</h2>
        <ul className="divide-y divide-orange-100">
          {orders.map((o) => (
            <li key={o.no} className="py-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="text-3xl font-heading font-extrabold">#{o.no}</span>
                  {o.state === 'new' && <span className="bg-brand-text text-white rounded-full px-2.5 h-7 flex items-center text-sm font-heading font-bold">ใหม่</span>}
                  {o.state === 'ready' && <span className="text-sm font-semibold text-go">แจ้งลูกค้าแล้ว</span>}
                </span>
                <span className="flex items-center gap-1 text-base font-semibold">
                  <Clock className="w-4 h-4" />
                  {o.time}
                </span>
              </div>
              <div className="mt-1.5 space-y-0.5 text-base">
                {o.items.map(([n, p]) => (
                  <div key={n} className="flex justify-between font-medium">
                    <span>{n}</span>
                    <span>{p}</span>
                  </div>
                ))}
                {o.note && <p className="text-sm">{o.note}</p>}
              </div>
              {o.state !== 'ready' && (
                <button
                  onClick={() => go?.({ t: 'ready', no: o.no })}
                  className="mt-3 w-full h-12 rounded-xl bg-go text-white text-base font-heading font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  พร้อมแล้ว แจ้ง #{o.no} มารับ
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
