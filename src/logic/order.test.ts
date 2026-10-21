import { test } from 'vitest';
import assert from 'node:assert/strict';
import { fresh, reduce, total, shown, pills, STALLS, PICKS, type Action } from './order';

const run = (...acts: Action[]) => acts.reduce(reduce, fresh());

test('dish opens sheet with time 0 and no add-ons', () => {
  const s = run({ t: 'dish', i: 1 });
  assert.equal(s.sheet, true);
  assert.equal(s.time, 0);
  assert.deepEqual(s.addons, []);
});

test('add-on toggles and total is live', () => {
  const base = STALLS[0].dishes[0].p;
  let s = run({ t: 'dish', i: 0 }, { t: 'addon', i: 0 });
  assert.equal(total(s), base + STALLS[0].addons[0].p);
  s = reduce(s, { t: 'addon', i: 0 });
  assert.equal(total(s), base);
});

test('stall change clears dish and add-ons', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'addon', i: 0 }, { t: 'close' }, { t: 'back' }, { t: 'open', i: 2 });
  assert.equal(s.stall, 2);
  assert.equal(s.dish, null);
  assert.deepEqual(s.addons, []);
});

test('send makes order #27 at status sent, fixes total', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'addon', i: 0 }, { t: 'time', i: 2 }, { t: 'send' });
  assert.equal(s.sheet, false);
  assert.equal(s.order!.no, 27);
  assert.equal(s.order!.status, 1);
  assert.equal(s.order!.time, 2);
  assert.equal(s.order!.total, STALLS[0].dishes[0].p + STALLS[0].addons[0].p);
});

test('cancel works only before cooking', () => {
  let s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'cancel' });
  assert.equal(s.order, null);
  s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'cook' }, { t: 'cancel' });
  assert.equal(s.order!.status, 2);
});

test('stall Ready on student order sets ready and fires banner', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'cook' }, { t: 'ready', no: 27 });
  assert.equal(s.order!.status, 3);
  assert.equal(s.banner, true);
  assert.equal(s.done[27], true);
});

test('ready on other order touches only that order', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'ready', no: 24 });
  assert.equal(s.done[24], true);
  assert.equal(s.order!.status, 1);
  assert.equal(s.banner, false);
});

test('ready twice does not undo, banner dismiss keeps ready', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'ready', no: 27 }, { t: 'ready', no: 27 }, { t: 'hide' });
  assert.equal(s.order!.status, 3);
  assert.equal(s.banner, false);
});

test('cook after ready does not go backwards', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'ready', no: 27 }, { t: 'cook' });
  assert.equal(s.order!.status, 3);
});

test('ready then reset gives fresh state', () => {
  assert.deepEqual(run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'cook' }, { t: 'ready', no: 27 }, { t: 'reset' }), fresh());
});

test('ขาหมูฮ่องเต้ is the first stall', () => {
  assert.equal(STALLS[0].th, 'ขาหมูฮ่องเต้');
});

test('reset gives fresh state', () => {
  assert.deepEqual(run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'reset' }), fresh());
});

test('opens on home, untouched', () => {
  assert.equal(fresh().page, 'home');
  assert.equal(fresh().touched, false);
});

test('stall tap opens that stall on ทั้งหมด', () => {
  const s = run({ t: 'open', i: 2 });
  assert.equal(s.page, 'stall');
  assert.equal(s.stall, 2);
  assert.equal(s.pill, 'ทั้งหมด');
  assert.equal(s.touched, true);
  assert.equal(s.sheet, false);
});

test('pick tap opens stall with that dish sheet', () => {
  const s = run({ t: 'pick', i: 1 });
  assert.equal(s.page, 'stall');
  assert.equal(s.stall, PICKS[1].stall);
  assert.equal(s.dish, PICKS[1].dish);
  assert.equal(s.sheet, true);
});

test('back returns home, keeps touched', () => {
  const s = run({ t: 'open', i: 1 }, { t: 'back' });
  assert.equal(s.page, 'home');
  assert.equal(s.touched, true);
});

test('reset after ready returns home', () => {
  const s = run({ t: 'open', i: 3 }, { t: 'dish', i: 0 }, { t: 'send' }, { t: 'ready', no: 27 }, { t: 'reset' });
  assert.equal(s.page, 'home');
  assert.equal(s.order, null);
});

test('pills: ทั้งหมด, แนะนำ, then types; one-type stall has none', () => {
  assert.deepEqual(pills(0), ['ทั้งหมด', 'แนะนำ', 'ขาหมู', 'ไก่', 'ปลา']);
  assert.deepEqual(pills(1), ['ทั้งหมด', 'แนะนำ']);
  assert.deepEqual(pills(2), ['ทั้งหมด', 'แนะนำ', 'ส้มตำ', 'ข้าว', 'ต้ม/ลาบ']);
  assert.deepEqual(pills(3), ['ทั้งหมด', 'แนะนำ', 'ชา', 'กาแฟ/นม']);
});

test('pill filters by type and keeps menu index', () => {
  let s = run({ t: 'open', i: 0 }, { t: 'pill', k: 'ปลา' });
  assert.deepEqual(shown(s), [4, 5]);
  s = reduce(s, { t: 'pill', k: 'แนะนำ' });
  assert.deepEqual(shown(s), [0, 1]);
  s = reduce(s, { t: 'pill', k: 'ทั้งหมด' });
  assert.equal(shown(s).length, STALLS[0].dishes.length);
});

test('home picks point at real dishes', () => {
  for (const p of PICKS) assert.ok(STALLS[p.stall].dishes[p.dish]);
});

test('reset brings the ring back for the next tester', () => {
  assert.equal(run({ t: 'open', i: 0 }, { t: 'reset' }).touched, false);
});
