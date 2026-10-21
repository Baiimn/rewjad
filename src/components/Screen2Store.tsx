import { ChevronLeft, Heart, Star, Clock, MapPin, Plus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { Photo } from './Photo';
import { STALL_PHOTO, dishPhoto } from './media';
import { STALLS, type Action, type State } from '../logic/order';

type Dish = { name: string; price: string; desc?: string; img?: string; hot?: boolean };

const menu: Dish[] = [
  { name: 'ข้าวขาหมู', price: '45 ฿', desc: 'ขาหมูพะโล้เนื้อนุ่ม ผักกาดดอง น้ำจิ้มแซ่บ', img: 'food/khao-kha-mu.jpg', hot: true },
  { name: 'ข้าวมันไก่ต้ม', price: '40 ฿', desc: 'ไก่ต้มนุ่ม ข้าวมันหอมกระเทียม', img: 'food/khao-man-kai.jpg' },
  { name: 'ข้าวมันไก่กรอบ', price: '40 ฿', desc: 'ไก่ทอดกรอบ น้ำจิ้มไก่หวาน', img: 'food/kai-krob.jpg', hot: true },
  { name: 'ข้าวไก่ทอดน้ำปลา', price: '45 ฿', desc: 'ไก่ทอดคลุกน้ำปลา หอมเจียว', img: 'food/kai-thot.jpg' },
  { name: 'ข้าวปลากรอบ', price: '40 ฿', desc: 'ปลาทอดกรอบ น้ำยำรสจัด', img: 'food/pla-krob.jpg' },
  { name: 'ข้าวปลาแกะ', price: '50 ฿', desc: 'ปลาแกะก้าง ราดพริกน้ำปลา', img: 'food/pla-kae.jpg' },
];

type Props = { s?: State; go?: (a: Action) => void };

/** No props: the approved static picture. With s + go: the Playable phone's stall page. */
export const Screen2Store = ({ s, go }: Props) => {
  const st = s ? STALLS[s.stall] : STALLS[0];
  const dishes: Dish[] = s
    ? st.dishes.map((d, i) => ({ name: d.th, price: `${d.p} ฿`, img: dishPhoto(d.th), hot: i === 0 }))
    : menu;
  const tabs = s ? STALLS.map(x => x.th) : ['ทั้งหมด', 'แนะนำ', 'เมนูข้าว', 'เครื่องเคียง'];
  const active = s ? s.stall : 0;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white relative">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-28">
        <div className="relative">
          <Photo src={s ? STALL_PHOTO[s.stall] : '/stalls/kha-mu-hongtae.jpg'} alt={`ป้ายร้าน${st.th}`} className="w-full h-40" />
          <button className="absolute top-3 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center" aria-label="กลับ">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="absolute top-3 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center" aria-label="ร้านโปรด">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <section className="px-5 pt-4 pb-3">
          <h1 className="text-2xl font-heading font-bold">{st.th}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
            <span className="font-semibold text-go">เปิดอยู่</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {s ? st.rate : '4.7 (180 รีวิว)'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              รอราว {s ? st.wait : 8} นาที
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              D1 ล็อค {s ? st.no : 4}
            </span>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-text" />
            เลือกเวลารับได้ เดินมารับกล่องที่เคาน์เตอร์ ไม่ต้องรอคิว
          </p>
        </section>

        <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar border-y border-orange-100">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => go?.({ t: 'tab', i })}
              className={`px-4 h-9 rounded-full text-sm font-heading whitespace-nowrap transition-colors ${i === active ? 'bg-ink text-white font-bold' : 'bg-orange-50 font-medium'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul key={active} className="px-4 pt-3 space-y-2.5 animate-fade">
          {dishes.map((m, i) => (
            <li key={m.name}>
              <button onClick={() => go?.({ t: 'dish', i })} className="w-full p-2.5 rounded-2xl border border-orange-100 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
                <Photo src={m.img} alt={m.name} className="w-20 h-20 rounded-xl shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-base font-heading font-bold truncate">{m.name}</span>
                    {m.hot && <span className="text-sm font-semibold text-brand-text shrink-0">แนะนำ</span>}
                  </span>
                  {m.desc && <span className="block text-sm line-clamp-1">{m.desc}</span>}
                  <span className="mt-1 flex items-center justify-between">
                    <span className="text-base font-heading font-bold">{m.price}</span>
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center">
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {!s && (
        <div className="absolute bottom-0 inset-x-0 px-4 pt-3 pb-7 bg-white border-t border-orange-100">
          <button className="w-full h-14 rounded-2xl bg-brand-text text-white px-4 flex items-center justify-between font-heading font-bold text-base">
            <span className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5" />
              1 รายการ
            </span>
            <span className="flex items-center gap-2">
              ดูตะกร้า 50 ฿
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
