import { Search, Clock, Star, MapPin, ChevronDown, Bell, Home, Receipt, User, Plus, ShoppingBag, ArrowRight, Store } from 'lucide-react';
import { Photo } from './Photo';

const categories = [
  { name: 'ก๋วยเตี๋ยว', img: 'food/tom-yum-noodle.jpg' },
  { name: 'ข้าว', img: 'food/khao-kha-mu.jpg' },
  { name: 'ส้มตำ', img: 'food/som-tam.jpg' },
  { name: 'เครื่องดื่ม', img: 'food/cha-yen.jpg' },
];

const picks = [
  { title: 'ข้าวขาหมูพิเศษ', stall: 'ขาหมูฮ่องเต้', price: '50 ฿', img: 'food/khao-kha-mu.jpg', time: '8 นาที' },
  { title: 'บะหมี่ต้มยำ', stall: 'ก๋วยเตี๋ยวพิมพา', price: '50 ฿', img: 'food/tom-yum-noodle.jpg', time: '10 นาที' },
  { title: 'ส้มตำไทย', stall: 'แซ่บ นัว ครัว J.T', price: '45 ฿', img: 'food/som-tam.jpg', time: '15 นาที' },
  { title: 'ชาไทยเย็น', stall: 'ชาพะยอม', price: '30 ฿', img: 'food/cha-yen.jpg', time: '5 นาที' },
];

const stalls = [
  { name: 'ขาหมูฮ่องเต้', img: '/stalls/kha-mu-hongtae.jpg', rating: '4.7', wait: '8 นาที', menu: 'ข้าวขาหมู ข้าวมันไก่ ไก่ทอด' },
  { name: 'ก๋วยเตี๋ยวพิมพา', img: '/stalls/pimpa.jpg', rating: '4.8', wait: '10 นาที', menu: 'ก๋วยเตี๋ยว ต้มยำ เย็นตาโฟ' },
  { name: 'แซ่บ นัว ครัว J.T', img: '/stalls/saep-nua.jpg', rating: '4.9', wait: '15 นาที', menu: 'ส้มตำ ยำ ลาบ' },
  { name: 'ชาพะยอม', img: '/stalls/chapayom.jpg', rating: '4.6', wait: '5 นาที', menu: 'ชานม ชาเขียว กาแฟ' },
];

export const Screen1Home = () => (
  <div className="flex-1 min-h-0 flex flex-col bg-white">
    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-3">
      <header className="px-5 pt-1 pb-3 flex items-center justify-between">
        <button className="text-left">
          <span className="flex items-center gap-1 text-sm font-medium">
            <MapPin className="w-4 h-4 text-brand-text" />
            จุดรับอาหาร
            <ChevronDown className="w-4 h-4" />
          </span>
          <span className="block text-base font-heading font-bold">โรงอาหาร D1</span>
        </button>
        <button className="relative w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center" aria-label="แจ้งเตือน">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand" />
        </button>
      </header>

      <section className="px-5 pb-4">
        <h1 className="text-2xl font-heading font-bold leading-tight">หิวยัง? สั่งก่อน ไม่ต้องรอคิว</h1>
        <p className="text-sm mt-1">สั่งระหว่างเดินมา แล้วรับกล่องที่เคาน์เตอร์ได้เลย</p>
      </section>

      <div className="px-5 pb-4">
        <button className="w-full h-12 bg-orange-50 rounded-xl px-4 flex items-center gap-2.5 text-sm">
          <Search className="w-5 h-5 shrink-0" />
          ค้นหาร้าน หรือเมนู
        </button>
      </div>

      <div className="px-5 pb-4 grid grid-cols-4 gap-2">
        {categories.map((c) => (
          <button key={c.name} className="flex flex-col items-center gap-1.5">
            <Photo src={c.img} alt={c.name} className="w-14 h-14 rounded-full" />
            <span className="text-sm font-medium">{c.name}</span>
          </button>
        ))}
      </div>

      <section className="pb-5">
        <div className="px-5 mb-2.5 flex items-baseline justify-between">
          <h2 className="text-lg font-heading font-bold">แนะนำวันนี้</h2>
          <button className="text-sm font-semibold text-brand-text">ดูทั้งหมด</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
          {picks.map((p) => (
            <button key={p.title} className="w-40 shrink-0 text-left rounded-2xl border border-orange-100 overflow-hidden">
              <div className="relative">
                <Photo src={p.img} alt={p.title} className="w-full h-20" />
                <span className="absolute bottom-1.5 left-1.5 bg-white rounded-md px-1.5 text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {p.time}
                </span>
              </div>
              <div className="p-2.5">
                <span className="block text-sm font-heading font-bold truncate">{p.title}</span>
                <span className="block text-sm truncate">{p.stall}</span>
                <span className="mt-1.5 flex items-center justify-between">
                  <span className="text-base font-heading font-bold">{p.price}</span>
                  <span className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center">
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5">
        <h2 className="text-lg font-heading font-bold mb-1">ร้านตัวอย่างใน D1</h2>
        <ul className="divide-y divide-orange-100">
          {stalls.map((s) => (
            <li key={s.name}>
              <button className="w-full py-3 flex items-center gap-3 text-left">
                <Photo src={s.img} alt={s.name} className="w-16 h-16 rounded-xl shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-heading font-bold truncate">{s.name}</span>
                    <span className="text-sm font-semibold text-go shrink-0">เปิดอยู่</span>
                  </span>
                  <span className="block text-sm truncate">{s.menu}</span>
                  <span className="flex items-center gap-4 text-sm font-medium mt-0.5">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {s.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      รอราว {s.wait}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
          <li>
            <a href="#join-stall" className="my-3 w-full p-3 flex items-center gap-3 rounded-xl border-2 border-dashed border-brand-text/50 bg-orange-50 text-left">
              <span className="w-16 h-16 rounded-xl shrink-0 bg-white flex items-center justify-center text-brand-text">
                <Store className="w-7 h-7" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-base font-heading font-bold text-brand-text">ร้านของคุณก็อยู่ตรงนี้ได้</span>
                <span className="block text-sm">ลงชื่อร้านกับ REWJAD</span>
              </span>
              <ArrowRight className="w-5 h-5 text-brand-text shrink-0" />
            </a>
          </li>
        </ul>
      </section>
    </div>

    <div className="shrink-0 px-4 pb-3">
      <button className="w-full h-14 rounded-2xl bg-brand-text text-white px-4 flex items-center justify-between font-heading font-bold text-base shadow-lg shadow-orange-800/30">
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

    <nav className="shrink-0 border-t border-orange-100 bg-white px-6 pt-2 pb-7 flex justify-between">
      {[
        { icon: Home, label: 'หน้าแรก', active: true },
        { icon: Search, label: 'ค้นหา' },
        { icon: Receipt, label: 'ออเดอร์' },
        { icon: User, label: 'ฉัน' },
      ].map(({ icon: Icon, label, active }) => (
        <button key={label} className={`flex flex-col items-center gap-0.5 text-sm font-heading ${active ? 'text-brand-text font-bold' : 'font-medium'}`}>
          <Icon className="w-6 h-6" />
          {label}
        </button>
      ))}
    </nav>
  </div>
);
