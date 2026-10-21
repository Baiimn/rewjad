// Turns a sign-up into the three Google Form fields (PLAN Setup b).
export const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf60Ge5Fc8Cx5UWhQCkuHOofv_K2fIjbDfdXGGVG9ynFHmXag/formResponse';

export type Who = 'student' | 'stall';

const MEMBERS = ['Mac', 'First', 'Phuek', 'Pot'];

export function signupFields(memberTag: string | null, contact: string, who: Who) {
  const member = MEMBERS.find(m => m.toLowerCase() === memberTag?.toLowerCase()) ?? 'none';
  return { 'entry.1197810742': contact, 'entry.65618801': member, 'entry.1031465348': who };
}
