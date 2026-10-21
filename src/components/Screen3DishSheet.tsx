import { X, Clock, Check, Wallet } from 'lucide-react';
import { Photo } from './Photo';
import { TIMES, dishPhoto } from './media';
import { STALLS, total, type Action, type State } from '../logic/order';

const Radio = ({ on }: { on?: boolean }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${on ? 'bg-brand text-white' : 'border-2 border-ink'}`}>
    {on && <Check className="w-3.5 h-3.5 stroke-[3]" />}
  </span>
);

const Box = ({ on }: { on?: boolean }) => (
  <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${on ? 'bg-brand text-white' : 'border-2 border-ink'}`}>
    {on && <Check className="w-3.5 h-3.5 stroke-[3]" />}
  </span>
);

type Props = { s?: State; go?: (a: Action) => void };

/** No props: the approved static picture. With s + go: the Playable phone's dish sheet. */
export const Screen3DishSheet = ({ s, go }: Props) => {
  const st = s ? STALLS[s.stall] : null;
  const dish = st && s?.dish != null ? st.dishes[s.dish] : null;
  const pickTime = s ? s.time : 0;

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      {!s && (
        <>
          <Photo src="/stalls/kha-mu-hongtae.jpg" alt="" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-black/45" />
          <p className="absolute top-3 left-5 text-white font-heading font-bold text-lg">ขาหมูฮ่องเต้</p>
        </>
      )}

      <div className={`relative ${s ? 'mt-auto h-[88%] shadow-[0_-20px_60px_rgba(0,0,0,0.25)] animate-sheet' : 'mt-20 flex-1'} min-h-0 bg-white rounded-t-[28px] flex flex-col`}>
        <div className="pt-2.5 flex justify-center">
          <div className="w-10 h-1 bg-ink rounded-full" />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-3 pb-32 space-y-4">
          <div className="relative">
            <Photo src={dish ? dishPhoto(dish.th) ?? undefined : 'food/khao-kha-mu.jpg'} alt={dish?.th ?? 'ข้าวขาหมู'} className="w-full h-24 rounded-2xl" />
            <button onClick={() => go?.({ t: 'close' })} className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white flex items-center justify-center" aria-label="ปิด">
              <X className="w-5 h-5" />
            </button>
          </div>

          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-heading font-bold">{dish?.th ?? 'ข้าวขาหมู'}</h2>
              <span className="text-lg font-heading font-bold">{dish?.p ?? 45} ฿</span>
            </div>
            <p className="text-sm">{st ? `ร้าน${st.th} D1 ล็อค ${st.no}` : 'ร้านขาหมูฮ่องเต้ ขาหมูพะโล้ตุ๋น เนื้อนุ่ม เสิร์ฟกับผักกาดดอง'}</p>
          </section>

          {s && st ? (
            <section>
              <h3 className="text-base font-heading font-bold mb-2">เพิ่มเติม</h3>
              <div className="space-y-2">
                {st.addons.map((a, i) => {
                  const on = s.addons.includes(i);
                  return (
                    <button
                      key={a.th}
                      onClick={() => go?.({ t: 'addon', i })}
                      className={`w-full h-12 px-3.5 rounded-xl flex items-center gap-3 text-sm transition-colors ${on ? 'border-2 border-brand bg-orange-50' : 'border border-orange-100'}`}
                    >
                      <Box on={on} />
                      <span className={`flex-1 text-left ${on ? 'font-bold' : 'font-medium'}`}>{a.th}</span>
                      <span className="font-semibold">+{a.p} ฿</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : (
            <>
              <section>
                <h3 className="text-base font-heading font-bold mb-2">ขนาดจาน</h3>
                <div className="space-y-2">
                  <button className="w-full h-12 px-3.5 rounded-xl border border-orange-100 flex items-center gap-3 text-sm">
                    <Radio />
                    <span className="flex-1 text-left font-medium">ธรรมดา</span>
                    <span className="font-semibold">45 ฿</span>
                  </button>
                  <button className="w-full h-12 px-3.5 rounded-xl border-2 border-brand bg-orange-50 flex items-center gap-3 text-sm">
                    <Radio on />
                    <span className="flex-1 text-left font-bold">พิเศษ</span>
                    <span className="font-bold">50 ฿</span>
                  </button>
                </div>
              </section>

              <section>
                <h3 className="text-base font-heading font-bold mb-2">เพิ่มเติม</h3>
                <div className="space-y-2">
                  {[
                    ['ไข่ต้มยางมะตูม', '+10 ฿'],
                    ['เพิ่มข้าว', '+5 ฿'],
                  ].map(([n, p]) => (
                    <button key={n} className="w-full h-12 px-3.5 rounded-xl border border-orange-100 flex items-center gap-3 text-sm">
                      <Box />
                      <span className="flex-1 text-left font-medium">{n}</span>
                      <span className="font-semibold">{p}</span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          <section>
            <h3 className="text-base font-heading font-bold mb-2 flex items-center gap-1.5">
              <Clock className="w-5 h-5" />
              รับกี่โมง
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {TIMES.map((t, i) => (
                <button
                  key={t}
                  onClick={() => go?.({ t: 'time', i })}
                  className={`h-12 rounded-xl text-base font-heading transition-colors ${i === pickTime ? 'bg-brand-text text-white font-bold' : 'border border-orange-100 font-semibold'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {!s && (
            <section>
              <h3 className="text-base font-heading font-bold mb-2">ถึงร้าน</h3>
              <div className="h-12 px-3.5 rounded-xl border border-orange-100 flex items-center text-sm">ขอพริกน้ำส้มเพิ่ม แยกน้ำราด</div>
            </section>
          )}

          <p className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4 shrink-0" />
            จ่ายตอนรับ สแกน QR หรือเงินสด
          </p>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4 pt-3 pb-7 bg-white border-t border-orange-100">
          <button
            onClick={() => go?.({ t: 'send' })}
            className="w-full h-14 rounded-2xl bg-brand-text text-white px-5 flex items-center justify-between font-heading font-bold text-lg active:scale-[0.98] transition-transform"
          >
            <span>ส่งออเดอร์</span>
            <span>{s ? total(s) : 50} ฿</span>
          </button>
        </div>
      </div>
    </div>
  );
};
