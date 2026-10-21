import { test } from 'vitest';
import assert from 'node:assert/strict';
import { fresh, reduce, total, STALLS, type Action } from './order';

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

test('tab change clears dish and add-ons', () => {
  const s = run({ t: 'dish', i: 0 }, { t: 'addon', i: 0 }, { t: 'close' }, { t: 'tab', i: 2 });
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

test('reset gives fresh state', () => {
  assert.deepEqual(run({ t: 'dish', i: 0 }, { t: 'send' }, { t: 'reset' }), fresh());
});
