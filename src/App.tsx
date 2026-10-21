import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Coins, MapPin, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { PhoneFrame } from './components/PhoneFrame';
import { Playable } from './components/Playable';
import { Reveal } from './components/Reveal';
import { Screen2Store } from './components/Screen2Store';
import { Screen4OrderStatus } from './components/Screen4OrderStatus';
import { Screen5SellerView } from './components/Screen5SellerView';
import { ScrollShowcase } from './components/ScrollShowcase';
import { WaitlistForm } from './components/WaitlistForm';
import { content, type Language } from './translations';

/** Phone width that fits the screen: the hero pair and the Playable phone shrink on small phones. */
function useNarrow() {
  const [narrow, setNarrow] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 640);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return narrow;
}

export default function App() {
  const [lang, setLang] = useState<Language>('TH');
  const t = content[lang];
  const narrow = useNarrow();
  useEffect(() => { document.documentElement.lang = lang === 'TH' ? 'th' : 'en'; }, [lang]);

  const steps = [
    { no: '01', icon: <UtensilsCrossed className="w-6 h-6" />, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { no: '02', icon: <Clock className="w-6 h-6" />, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { no: '03', icon: <CheckCircle2 className="w-6 h-6 text-go" />, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ];
  const h2 = 'text-3xl sm:text-4xl md:text-5xl font-bold font-display text-ink leading-snug';

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-ink font-body selection:bg-orange-100 flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-6">
          <a href="#" className="text-2xl font-bold font-display">REWJAD</a>
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
            <a href="#how-it-works" className="hover:text-brand-text transition-colors">{t.nav.howItWorks}</a>
            <a href="#for-stalls" className="hover:text-brand-text transition-colors">{t.nav.forStalls}</a>
            <a href="#demo" className="hover:text-brand-text transition-colors">{t.nav.demo}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setLang(lang === 'EN' ? 'TH' : 'EN')} aria-label="Switch language"
              className="h-11 px-4 border-2 border-ink/20 bg-white text-base font-bold rounded-xl active:scale-95 transition-transform">
              {t.nav.langSwitch}
            </button>
            <a href="#demo" className="hidden sm:flex h-11 px-5 items-center bg-brand-text text-white text-base font-bold rounded-xl active:scale-95 transition-transform">
              {t.hero.cta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="pt-10 md:pt-20 pb-16 md:pb-24 px-5 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8 max-w-2xl animate-fade">
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-[1.25] whitespace-pre-line">{t.hero.headline}</h1>
                <p className="text-lg sm:text-xl leading-relaxed">{t.hero.subline}</p>
              </div>
              <a href="#demo" className="w-full sm:w-auto sm:self-start px-8 h-14 bg-brand-text active:bg-[#9A3412] text-white text-lg font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-orange-900/20 active:scale-95 transition-transform">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base font-semibold">
                <span className="flex items-center gap-3"><MapPin className="w-5 h-5 text-brand-text shrink-0" />{t.hero.badges.building}</span>
                <span className="flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-go shrink-0" />{t.hero.badges.benefit}</span>
              </div>
            </div>

            {/* Two phones overlapping by flex, so their box always holds them in full. */}
            <div className="flex-1 flex justify-center items-start pt-4 lg:pt-0 animate-fade [animation-delay:150ms]">
              <div className="-rotate-6 mt-6">
                <PhoneFrame width={narrow ? 168 : 250}><Screen4OrderStatus /></PhoneFrame>
              </div>
              <div className="rotate-6 -ml-8 sm:-ml-12 z-10">
                <PhoneFrame width={narrow ? 168 : 250}><Screen2Store /></PhoneFrame>
              </div>
            </div>
          </div>
        </section>

        <ScrollShowcase t={t} />

        <section id="how-it-works" className="py-20 md:py-28 px-5 sm:px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-14">
            <Reveal className="flex flex-col gap-4 max-w-3xl">
              <h2 className={h2}>{t.howItWorks.title}</h2>
              <p className="text-lg leading-relaxed">{t.howItWorks.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {steps.map((x, i) => (
                <Reveal key={x.no} delay={i * 120} className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold font-display text-brand-text">{x.no}</span>
                    <span className="text-brand-text">{x.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display">{x.title}</h3>
                  <p className="text-base leading-relaxed">{x.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="for-stalls" className="py-20 md:py-28 px-5 sm:px-6 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
            <Reveal className="flex-1 flex justify-center order-2 lg:order-1">
              <PhoneFrame width={narrow ? 300 : 340}><Screen5SellerView /></PhoneFrame>
            </Reveal>
            <div className="flex-1 flex flex-col gap-10 max-w-2xl order-1 lg:order-2">
              <Reveal className="flex flex-col gap-4">
                <h2 className={h2}>{t.forStalls.title}</h2>
                <p className="text-2xl sm:text-3xl font-bold font-display text-go flex items-center gap-3">
                  <Coins className="w-8 h-8 shrink-0" />
                  {t.forStalls.highlight}
                </p>
                <p className="text-lg leading-relaxed">{t.forStalls.description}</p>
              </Reveal>
              <div className="flex flex-col gap-6">
                {t.forStalls.points.map((pt, i) => (
                  <Reveal key={pt.title} delay={i * 100} className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-bold font-display">{pt.title}</h3>
                    <p className="text-base leading-relaxed">{pt.desc}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal><WaitlistForm t={t} who="stall" /></Reveal>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 md:py-28 px-5 sm:px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <Reveal className="flex flex-col gap-4 max-w-3xl">
              <h2 className={h2}>{t.demoSection.title}</h2>
              <p className="text-lg leading-relaxed">{t.demoSection.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col items-center gap-4">
                <Playable t={t} width={narrow ? Math.min(340, window.innerWidth - 40) : 360} />
                <p className="text-base text-center max-w-[340px]">{t.demoSection.instruction}</p>
              </div>
              <div className="lg:col-span-7 lg:pt-16">
                <WaitlistForm t={t} who="student" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 py-12 px-5 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-base">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold font-display">REWJAD</span>
            <span>{t.footer.tagline}</span>
            <span>{t.footer.location}</span>
          </div>
          <span>&copy; {new Date().getFullYear()} REWJAD</span>
        </div>
      </footer>
    </div>
  );
}
