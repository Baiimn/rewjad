import { ChevronLeft, Check, Flame, PackageCheck, MapPin, Wallet, Phone, Send } from 'lucide-react';
import { TIMES } from './media';
import { STALLS, type Action, type State } from '../logic/order';

type Step = { label: string; time: string; state: 'done' | 'now' | 'next' };

const staticSteps: Step[] = [
  { label: 'ส่งแล้ว', time: '12:02', state: 'done' },
  { label: 'กำลังปรุง', time: 'ตอนนี้', state: 'now' },
  { label: 'พร้อมรับ', time: 'ราว 12:10', state: 'next' },
];

const stepIcon = (st: Step['state'], i: number) =>
  st === 'done' ? <Check className="w-5 h-5 stroke-[3]" /> : st === 'now' ? [<Send key={0} className="w-5 h-5" />, <Flame key={1} className="w-5 h-5" />, <PackageCheck key={2} className="w-5 h-5" />][i] : <PackageCheck className="w-5 h-5" />;

type Props = { s?: State; go?: (a: Action) => void };

/** No props: the approved static picture. With s + go (and s.order set): the Playable phone's order page. */
export const Screen4OrderStatus = ({ s, go }: Props) => {
  const o = s?.order ?? null;
  const st = o ? STALLS[o.stall] : STALLS[1];
  const pickup = o ? TIMES[o.time] : '12:10';
  const steps: Step[] = o
    ? ['ส่งแล้ว', 'กำลังปรุง', 'พร้อมรับ'].map((label, i) => ({
        label,
        time: i === 0 ? '12:02' : i === 2 ? `ราว ${pickup}` : o.status === 2 ? 'ตอนนี้' : '',
        state: o.status > i + 1 || o.status === 3 ? 'done' : o.status === i + 1 ? 'now' : 'next',
      }))
    : staticSteps;
  const line = o
    ? `${st.dishes[o.dish].th}${o.addons.map(a => ` ${st.addons[a].th}`).join('')} x1`
    : 'ข้าวขาหมู พิเศษ x1';
  const sum = o ? o.total : 50;
  const showBanner = s ? s.banner : true;
  const bannerText = o ? `#${o.no} พร้อมรับแล้ว ไปรับที่เคาน์เตอร์ได้เลย` : '#27 ร้านรับแล้ว กำลังปรุง รับได้ราว 12:10';

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white relative">
      {showBanner && (
        <button
          onClick={() => go?.({ t: 'hide' })}
          className={`absolute top-1 inset-x-3 z-20 bg-ink text-white rounded-2xl p-3 flex items-center gap-3 shadow-xl text-left ${s ? 'animate-drop' : ''}`}
        >
          <span className="w-10 h-10 rounded-xl bg-brand-text flex items-center justify-center font-heading font-extrabold text-lg shrink-0">R</span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">REWJAD</span>
            <span className="block text-sm">{bannerText}</span>
          </span>
        </button>
      )}

      <header className="px-4 pt-[84px] pb-2 flex items-center gap-2">
        <button className="w-10 h-10 rounded-full flex items-center justify-center" aria-label="กลับ">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-heading font-bold">ออเดอร์ของฉัน</h1>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 pb-10">
        <section className="pt-2 pb-5 border-b border-orange-100">
          <p className="text-base font-medium">คิวของคุณ ร้าน{st.th}</p>
          <div className="flex items-end justify-between">
            <span className="text-7xl font-heading font-extrabold leading-none">#{o ? o.no : 27}</span>
            <span className="text-right">
              <span className="block text-sm font-medium">รับได้ราว</span>
              <span className="block text-3xl font-heading font-bold text-brand-text">{pickup}</span>
            </span>
          </div>
        </section>

        <ol className="py-5 border-b border-orange-100 space-y-4">
          {steps.map((x, i) => (
            <li key={x.label} className="flex items-center gap-3">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${
                  x.state === 'done' ? 'bg-go text-white' : x.state === 'now' ? 'bg-brand text-white ring-4 ring-orange-100' : 'border-2 border-ink'
                }`}
              >
                {stepIcon(x.state, s ? i : 1)}
              </span>
              <span className={`flex-1 text-base font-heading ${x.state === 'now' ? 'font-bold' : 'font-medium'}`}>{x.label}</span>
              <span className="text-sm font-medium">{x.time}</span>
            </li>
          ))}
        </ol>

        <section className="py-5 border-b border-orange-100 space-y-2 text-base">
          <div className="flex justify-between font-semibold">
            <span>{line}</span>
            <span>{sum} ฿</span>
          </div>
          {!o && <p className="text-sm">ขอพริกน้ำส้มเพิ่ม แยกน้ำราด</p>}
          <p className="flex items-center gap-2 text-sm pt-1">
            <MapPin className="w-4 h-4 shrink-0" />
            เคาน์เตอร์ร้าน D1 ล็อค {o ? st.no : 4} บอกเลข #{o ? o.no : 27}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4 shrink-0" />
            จ่ายตอนรับ {sum} ฿ สแกน QR หรือเงินสด
          </p>
        </section>

        {o?.status === 1 ? (
          <button
            onClick={() => go?.({ t: 'cancel' })}
            className="mt-5 w-full h-12 rounded-xl border-2 border-ink flex items-center justify-center gap-2 text-base font-heading font-semibold"
          >
            ยกเลิกออเดอร์
          </button>
        ) : (
          <button className="mt-5 w-full h-12 rounded-xl border-2 border-ink flex items-center justify-center gap-2 text-base font-heading font-semibold">
            <Phone className="w-5 h-5" />
            โทรหาร้าน
          </button>
        )}
        <p className="mt-3 text-sm text-center">
          {o?.status === 1 ? 'ยกเลิกได้จนกว่าร้านจะเริ่มปรุง' : o?.status === 3 ? 'ไปรับที่เคาน์เตอร์ บอกเลขคิว' : 'ร้านเริ่มปรุงแล้ว ยกเลิกไม่ได้'}
        </p>
      </div>
    </div>
  );
};
