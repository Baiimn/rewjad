// Stall phone in "For stalls": fake orders arrive, the stall accepts, cancels or marks ready. Pure.

export const REASONS = ['ของหมด', 'ร้านปิด'] as const;
export type Reason = (typeof REASONS)[number];
export type StallStatus = 'new' | 'accepted' | 'ready' | 'cancelled';
export type StallOrder = { no: number; dish: string; price: number; time: string; status: StallStatus; reason?: Reason };
export type StallState = { orders: StallOrder[] };
export type StallAction =
  | { t: 'arrive' }
  | { t: 'accept' | 'ready'; i: number }
  | { t: 'cancel'; i: number; reason: Reason };

const FAKE = [
  { no: 28, dish: 'ข้าวขาหมู พิเศษ x1', price: 50, time: '12:15' },
  { no: 29, dish: 'ข้าวมันไก่กรอบ x2', price: 80, time: '12:15' },
  { no: 30, dish: 'ข้าวปลาแกะ x1', price: 50, time: '12:30' },
];
export const MAX_ORDERS = FAKE.length;

export const freshStall = (): StallState => ({ orders: [] });

const move = (s: StallState, i: number, from: StallStatus[], to: Partial<StallOrder>): StallState => {
  const o = s.orders[i];
  if (!o || !from.includes(o.status)) return s;
  return { orders: s.orders.map((x, j) => (j === i ? { ...x, ...to } : x)) };
};

export function reduceStall(s: StallState, a: StallAction): StallState {
  switch (a.t) {
    case 'arrive': {
      const next = FAKE[s.orders.length];
      return next ? { orders: [...s.orders, { ...next, status: 'new' }] } : s;
    }
    case 'accept': return move(s, a.i, ['new'], { status: 'accepted' });
    case 'cancel': return move(s, a.i, ['new', 'accepted'], { status: 'cancelled', reason: a.reason });
    case 'ready': return move(s, a.i, ['accepted'], { status: 'ready' });
    default: return s;
  }
}

/** What the customer would see after a cancel; null otherwise. */
export const preview = (o: StallOrder): string | null =>
  o.status === 'cancelled' ? `ลูกค้าจะเห็น: ร้านยกเลิกออเดอร์ (${o.reason})` : null;
