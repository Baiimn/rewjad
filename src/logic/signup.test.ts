import { describe, expect, it } from 'vitest';
import { signupFields } from './signup';

describe('signupFields', () => {
  it('credits a known member tag to that member', () => {
    expect(signupFields('mac', 'line: abc', 'student')).toEqual({
      'entry.1197810742': 'line: abc', 'entry.65618801': 'Mac', 'entry.1031465348': 'student',
    });
  });

  it('maps an unknown tag to none', () => {
    expect(signupFields('bob', 'x', 'student')['entry.65618801']).toBe('none');
  });

  it('maps a missing tag to none', () => {
    expect(signupFields(null, 'x', 'student')['entry.65618801']).toBe('none');
  });

  it('one form: the choice sets who, member kept either way', () => {
    const s = signupFields('first', 'x', 'stall');
    const u = signupFields('first', 'x', 'student');
    expect([s['entry.1031465348'], s['entry.65618801']]).toEqual(['stall', 'First']);
    expect([u['entry.1031465348'], u['entry.65618801']]).toEqual(['student', 'First']);
  });

  it('sends who = stall for the stall form', () => {
    expect(signupFields('Pot', '081', 'stall')).toEqual({
      'entry.1197810742': '081', 'entry.65618801': 'Pot', 'entry.1031465348': 'stall',
    });
  });
});
