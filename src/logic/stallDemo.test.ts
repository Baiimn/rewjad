import { test } from 'vitest';
import assert from 'node:assert/strict';
import { freshStall, reduceStall, preview, MAX_ORDERS, type StallAction } from './stallDemo';

const run = (...acts: StallAction[]) => acts.reduce(reduceStall, freshStall());
const arrive: StallAction = { t: 'arrive' };

test('arrive adds orders up to 3, then no-op', () => {
  const s = run(arrive, arrive, arrive, arrive, arrive);
  assert.equal(s.orders.length, MAX_ORDERS);
  assert.equal(MAX_ORDERS, 3);
  assert.ok(s.orders.every(o => o.status === 'new'));
  assert.equal(new Set(s.orders.map(o => o.no)).size, 3);
});

test('accept only from new; double accept no-op', () => {
  const s = run(arrive, { t: 'accept', i: 0 });
  assert.equal(s.orders[0].status, 'accepted');
  assert.equal(reduceStall(s, { t: 'accept', i: 0 }), s);
});

test('cancel from new or accepted keeps reason', () => {
  let s = run(arrive, arrive, { t: 'cancel', i: 0, reason: 'ของหมด' });
  assert.equal(s.orders[0].status, 'cancelled');
  assert.equal(s.orders[0].reason, 'ของหมด');
  s = run(arrive, { t: 'accept', i: 0 }, { t: 'cancel', i: 0, reason: 'ร้านปิด' });
  assert.equal(s.orders[0].reason, 'ร้านปิด');
});

test('ready only from accepted', () => {
  const fromNew = run(arrive);
  assert.equal(reduceStall(fromNew, { t: 'ready', i: 0 }), fromNew);
  const s = run(arrive, { t: 'accept', i: 0 }, { t: 'ready', i: 0 });
  assert.equal(s.orders[0].status, 'ready');
});

test('illegal moves are no-ops', () => {
  const c = run(arrive, { t: 'cancel', i: 0, reason: 'ของหมด' });
  assert.equal(reduceStall(c, { t: 'ready', i: 0 }), c);
  assert.equal(reduceStall(c, { t: 'accept', i: 0 }), c);
  assert.equal(reduceStall(c, { t: 'cancel', i: 0, reason: 'ร้านปิด' }), c);
  const r = run(arrive, { t: 'accept', i: 0 }, { t: 'ready', i: 0 });
  assert.equal(reduceStall(r, { t: 'cancel', i: 0, reason: 'ของหมด' }), r);
  assert.equal(reduceStall(r, { t: 'accept', i: 5 }), r);
});

test('preview text has the reason', () => {
  const s = run(arrive, { t: 'cancel', i: 0, reason: 'ร้านปิด' });
  assert.equal(preview(s.orders[0]), 'ลูกค้าจะเห็น: ร้านยกเลิกออเดอร์ (ร้านปิด)');
  assert.equal(preview(run(arrive).orders[0]), null);
});
