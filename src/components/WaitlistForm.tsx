import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FORM_URL, signupFields, type Who } from '../logic/signup';
import type { Translations } from '../translations';

type Props = { t: Translations; who: Who };

/** One contact field. Posts to the Google Form in the background; the member tag comes from ?m= in the address. */
export const WaitlistForm = ({ t, who }: Props) => {
  const [contact, setContact] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [empty, setEmpty] = useState(false);
  const w = t.waitlist;
  const copy = who === 'stall'
    ? { heading: t.stallForm.heading, description: t.stallForm.description, placeholder: t.stallForm.placeholder, button: t.stallForm.button, success: t.stallForm.success }
    : { heading: w.heading, description: w.description, placeholder: w.inputPlaceholder, button: w.submitButton, success: w.successMessage };
  const id = `contact-${who}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const clean = contact.trim();
    if (!clean) { setEmpty(true); return; }
    setState('sending');
    try {
      const m = new URLSearchParams(location.search).get('m');
      // no-cors: the browser sends it but can't read Google's reply, so only a network error shows as failed.
      await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(signupFields(m, clean, who)) });
      setState('done');
    } catch {
      setState('failed');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-ink">{copy.heading}</h3>
        <p className="text-lg text-ink leading-relaxed">{copy.description}</p>
      </div>

      {state === 'done' ? (
        <div className="flex flex-col gap-4 animate-fade">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-go shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold font-display text-ink">{w.done}</span>
              <p className="text-base text-ink leading-relaxed">{copy.success}</p>
            </div>
          </div>
          <button type="button" onClick={() => { setContact(''); setState('idle'); }} className="self-start h-11 text-base font-semibold text-brand-text underline underline-offset-4">
            {w.submitAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <label htmlFor={id} className="text-base font-bold text-ink">{w.label}</label>
          <input
            id={id}
            type="text"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            value={contact}
            onChange={(e) => { setContact(e.target.value); setEmpty(false); }}
            placeholder={copy.placeholder}
            className="w-full text-base text-ink placeholder:text-ink/60 bg-white border-2 border-ink/30 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 rounded-xl px-4 h-14 outline-none transition-colors"
          />
          {empty && <span className="text-base font-semibold text-red-700">{w.empty}</span>}
          {state === 'failed' && <span className="text-base font-semibold text-red-700">{w.failed}</span>}
          <button
            type="submit"
            disabled={state === 'sending'}
            className="w-full sm:w-auto sm:self-start px-8 h-14 bg-brand-text active:bg-[#9A3412] text-white text-lg font-bold rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] disabled:opacity-80"
          >
            <span>{state === 'sending' ? w.submitting : copy.button}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-base text-ink leading-relaxed">{w.privacyNotice}</p>
        </form>
      )}
    </div>
  );
};
