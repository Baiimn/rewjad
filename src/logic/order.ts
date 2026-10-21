// Order logic for the Playable phone. Pure: state + action -> new state. Nothing is saved.
// Real D1 stalls and prices from projects/inno-dt2bmc/stalls.md. Ratings and waits are made up.

/** k = food type, used by the stall page pills. */
export type Item = { th: string; en: string; p: number; k?: string };
export type Stall = { th: string; en: string; no: number; f: number; rate: number; wait: number; dishes: Item[]; addons: Item[] };

const d = (th: string, en: string, p: number, k?: string): Item => ({ th, en, p, k });

export const STALLS: Stall[] = [
  { th: 'ขาหมูฮ่องเต้', en: 'Hongtae Pork Leg', no: 5, f: 1, rate: 4.6, wait: 6,
    dishes: [d('ข้าวขาหมู', 'Stewed pork leg rice', 45, 'ขาหมู'), d('ข้าวมันไก่ต้ม', 'Boiled chicken rice', 40, 'ไก่'),
      d('ข้าวมันไก่กรอบ', 'Crispy chicken rice', 40, 'ไก่'), d('ข้าวไก่ทอดน้ำปลา', 'Fish sauce fried chicken rice', 45, 'ไก่'),
      d('ข้าวปลากรอบ', 'Crispy fish rice', 40, 'ปลา'), d('ข้าวปลาแกะ', 'Boned fish rice', 50, 'ปลา')],
    addons: [d('พิเศษ', 'Special size', 5)] },
  { th: 'ก๋วยเตี๋ยวพิมพา', en: 'Pimpa Noodles', no: 7, f: 0, rate: 4.7, wait: 8,
    dishes: [d('ก๋วยเตี๋ยวไก่ตุ๋น', 'Braised chicken noodles', 35), d('น้ำเงี้ยว', 'Nam ngiao noodles', 35),
      d('ต้มยำ', 'Tom yum noodles', 35), d('น้ำใส', 'Clear soup noodles', 35)],
    addons: [d('พิเศษ', 'Special size', 5)] },
  { th: 'แซ่บ นัว ครัว J.T', en: 'Saep Nua J.T Kitchen', no: 4, f: 2, rate: 4.5, wait: 10,
    dishes: [d('ส้มตำ', 'Papaya salad', 40, 'ส้มตำ'), d('ตำปูม้ากุ้งสด', 'Crab and shrimp papaya salad', 80, 'ส้มตำ'),
      d('ข้าวไก่ย่างดูไบ', 'Dubai grilled chicken rice', 45, 'ข้าว'), d('ข้าวไก่ย่างหม่าล่า', 'Mala grilled chicken rice', 45, 'ข้าว'),
      d('ข้าวน้ำตกคอหมูย่าง', 'Grilled pork neck rice', 40, 'ข้าว'), d('ข้าวหมูทอดจิ้มแจ่ว', 'Fried pork rice with jaew', 40, 'ข้าว'),
      d('ต้มแซ่บ', 'Spicy soup', 50, 'ต้ม/ลาบ'), d('ลาบอีสาน', 'Isan larb', 50, 'ต้ม/ลาบ')],
    addons: [d('ข้าวเหนียว', 'Sticky rice', 10)] },
  { th: 'ชาพะยอม', en: 'Chapayom', no: 0, f: 3, rate: 4.8, wait: 4,
    dishes: [d('ชาไทย', 'Thai tea', 35, 'ชา'), d('ชาเขียว', 'Green tea', 35, 'ชา'), d('โกโก้', 'Cocoa', 35, 'กาแฟ/นม'),
      d('นมสด', 'Fresh milk', 35, 'กาแฟ/นม'), d('กาแฟ', 'Coffee', 40, 'กาแฟ/นม'), d('ชาใต้', 'Southern tea', 45, 'ชา')],
    addons: [d('เพิ่มมุก', 'Add pearls', 10)] },
];

export const MY_NO = 27;

/** แนะนำวันนี้ cards on the home page: real dishes, so a tap opens that dish. */
export const PICKS = [{ stall: 0, dish: 0 }, { stall: 1, dish: 2 }, { stall: 2, dish: 0 }, { stall: 3, dish: 0 }];

/** First 2 dishes of each stall carry the แนะนำ tag. */
export const REC = 2;
const ALL = 'ทั้งหมด', RECP = 'แนะนำ';

/** Stall page pills: ทั้งหมด, แนะนำ, then food types (none if the stall has only one type). */
export function pills(stall: number): string[] {
  const ks = [...new Set(STALLS[stall].dishes.map(x => x.k).filter((k): k is string => !!k))];
  return [ALL, RECP, ...(ks.length > 1 ? ks : [])];
}

/** Menu indexes the current pill shows. */
export function shown(s: State): number[] {
  const ds = STALLS[s.stall].dishes.map((x, i) => ({ x, i }));
  if (s.pill === RECP) return ds.filter(o => o.i < REC).map(o => o.i);
  if (s.pill === ALL) return ds.map(o => o.i);
  return ds.filter(o => o.x.k === s.pill).map(o => o.i);
}

/** 1 sent, 2 cooking, 3 ready. Never goes backwards. */
export type Status = 1 | 2 | 3;
export type Order = { no: number; stall: number; dish: number; addons: number[]; time: number; total: number; status: Status };
export type State = {
  page: 'home' | 'stall'; pill: string; touched: boolean;
  stall: number; dish: number | null; sheet: boolean; addons: number[]; time: number;
  order: Order | null; banner: boolean; done: Record<number, boolean>;
};
export type Action =
  | { t: 'open' | 'pick' | 'dish' | 'addon' | 'time'; i: number }
  | { t: 'pill'; k: string }
  | { t: 'ready'; no: number }
  | { t: 'back' | 'close' | 'send' | 'cancel' | 'cook' | 'hide' | 'reset' };

export const fresh = (): State => ({ page: 'home', pill: ALL, touched: false, stall: 0, dish: null, sheet: false, addons: [], time: 0, order: null, banner: false, done: {} });

export const total = (s: State): number => s.dish == null ? 0
  : STALLS[s.stall].dishes[s.dish].p + s.addons.reduce((a, i) => a + STALLS[s.stall].addons[i].p, 0);

export function reduce(s: State, a: Action): State {
  const o = s.order;
  switch (a.t) {
    case 'open': return { ...s, page: 'stall', touched: true, pill: ALL, stall: a.i, dish: null, addons: [], sheet: false };
    case 'pick': { const p = PICKS[a.i];
      return { ...s, page: 'stall', touched: true, pill: ALL, stall: p.stall, dish: p.dish, addons: [], time: 0, sheet: true }; }
    case 'back': return { ...s, page: 'home', dish: null, addons: [], sheet: false };
    case 'pill': return { ...s, pill: a.k };
    case 'dish': return { ...s, dish: a.i, addons: [], time: 0, sheet: true };
    case 'close': return { ...s, sheet: false };
    case 'addon': return { ...s, addons: s.addons.includes(a.i) ? s.addons.filter(x => x !== a.i) : [...s.addons, a.i] };
    case 'time': return { ...s, time: a.i };
    case 'send': return s.dish == null ? s : { ...s, sheet: false,
      order: { no: MY_NO, stall: s.stall, dish: s.dish, addons: s.addons, time: s.time, total: total(s), status: 1 } };
    case 'cancel': return o && o.status === 1 ? { ...s, order: null } : s;
    case 'cook': return o && o.status === 1 ? { ...s, order: { ...o, status: 2 } } : s;
    case 'ready': {
      if (s.done[a.no]) return s;
      const n = { ...s, done: { ...s.done, [a.no]: true } };
      return o && a.no === o.no ? { ...n, order: { ...o, status: 3 }, banner: true } : n;
    }
    case 'hide': return { ...s, banner: false };
    case 'reset': return fresh();
    default: return s;
  }
}
