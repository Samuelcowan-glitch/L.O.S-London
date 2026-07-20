import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Leaf, Sprout, Fence, Lightbulb, Scissors, PencilRuler,
  ShieldCheck, Award, Clock, Phone, Mail, MapPin,
  ArrowUpRight, ArrowRight, Menu, X, Lock,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Studio', href: '#studio' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_FULL = [
  {
    icon: PencilRuler,
    title: 'Garden Design & Build',
    text: 'Full garden design and build across South West London — townhouses, rooftops and estates, from first sketch to final planting, delivered by one crew.',
  },
  {
    icon: ShieldCheck,
    title: 'Private Estate Care',
    text: 'Discreet, year-round care for high-profile homes. NDAs as standard, vetted crew, unmarked vans on request.',
  },
  {
    icon: Sprout,
    title: 'Planting Schemes',
    text: 'Layered, four-season planting designed for London light and clay — garden borders in Fulham, Clapham and Barnes that photograph as well in February as in June.',
  },
  {
    icon: Fence,
    title: 'Garden Design Consultancy',
    text: "A garden designer’s eye on your space — layout, proportion and planting advice for homeowners planning their own project.",
  },
  {
    icon: Lightbulb,
    title: 'Garden Lighting',
    text: 'Low-glare architectural lighting that makes a garden work after dark — for entertaining, security and quiet evenings.',
  },
  {
    icon: Scissors,
    title: 'Garden Maintenance',
    text: 'Striped lawns, sharp hedges, mulched beds. Scheduled garden maintenance across South West London keeps every garden press-ready all year.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center opacity-90 group-hover:opacity-100 transition">
              <img
                src={`${import.meta.env.BASE_URL}logo/${scrolled ? 'da-icon.svg' : 'da-icon-dark.svg'}`}
                alt=""
                className="h-8 w-8"
              />
            </span>
            <span
              className={`font-display font-bold tracking-tight text-lg ${
                scrolled ? 'text-ink' : 'text-white'
              } transition-colors`}
            >
              Drummond Anderson
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Request a consultation
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Drummond Anderson</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            Request a consultation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero — built around a seamlessly looping background video
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8, stagger: 0.12,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Belt-and-braces looping: `loop` handles it natively, and if the browser
  // ever fires `ended` (e.g. after a stall), restart the video by hand.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const restart = () => {
      v.currentTime = 0
      v.play().catch(() => {})
    }
    v.addEventListener('ended', restart)
    return () => v.removeEventListener('ended', restart)
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}hero.mp4`}
          poster="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2400&q=80"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/85 via-deep/45 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/25 to-transparent" />
      </div>

      {/* Floating leaf motes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary-light/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[26%] h-1 w-1 rounded-full bg-white/50 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] right-[34%] h-1.5 w-1.5 rounded-full bg-primary-light/50 animate-float" style={{ animationDelay: '4.2s' }} />
      </div>

      {/* Top frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl">
          <p className="hero-meta font-mono text-[11px] uppercase tracking-[0.3em] text-white/70 mb-6">
            Est. 2004 · South West London
          </p>
          <h1 className="font-display font-bold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-5xl md:text-6xl">
              Gardens worthy of
            </span>
            <span
              className="hero-line-2 block font-serif italic font-medium text-accent text-6xl sm:text-7xl md:text-8xl lg:text-9xl mt-2"
              style={{ lineHeight: '0.92' }}
            >
              the spotlight.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Drummond Anderson is a studio of garden designers for South West
            London&rsquo;s most admired private gardens — from Chelsea and
            Fulham townhouses to Richmond estates and the homes of household
            names.
            <span className="text-white"> Discretion is part of the service.</span>
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/40"
            >
              Request a consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+447852944415"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full"
            >
              <Phone className="h-4 w-4" />
              07852 944415
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Design Studio Shuffler
---------------------------------------------------------------- */
function DesignShuffler() {
  const items = [
    { tag: 'Townhouse', label: 'Chelsea courtyard, York stone & yew', area: '68 m²' },
    { tag: 'Estate', label: 'Walled kitchen garden, Richmond', area: '540 m²' },
    { tag: 'Rooftop', label: 'Battersea roof terrace, wind-hardy', area: '92 m²' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-muted">{item.area}</span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#4A7D5F' : '#E4E2DA' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature animation: falling leaves over a lawn
---------------------------------------------------------------- */
function GardenLeaves() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(9)

  const statuses = [
    { text: 'Lawns striped · beds mulched', label: 'Kept', tone: 'emerald' },
    { text: 'Autumn clear-up · rear lawn', label: 'On it', tone: 'accent' },
    { text: 'Crew on site · gates 08:00', label: 'Live', tone: 'primary' },
    { text: 'Garden ready · gates locked', label: 'Done', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Done') setCount((c) => c + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  // Leaves drifting down from the hedge line
  const leaves = [
    { left: '15%', delay: '0.0s', dur: '3.4s', size: 15, hue: '#4A7D5F', sway: 1 },
    { left: '25%', delay: '1.3s', dur: '3.9s', size: 12, hue: '#A8552F', sway: -1 },
    { left: '38%', delay: '0.6s', dur: '3.6s', size: 17, hue: '#2E5E43', sway: 1 },
    { left: '50%', delay: '1.8s', dur: '3.2s', size: 13, hue: '#C6A15B', sway: -1 },
    { left: '62%', delay: '0.9s', dur: '4.0s', size: 16, hue: '#4A7D5F', sway: 1 },
    { left: '74%', delay: '2.0s', dur: '3.5s', size: 12, hue: '#A8552F', sway: -1 },
    { left: '85%', delay: '0.4s', dur: '3.7s', size: 15, hue: '#2E5E43', sway: 1 },
  ]

  // Settle rings where leaves land on the lawn
  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' :
    status.tone === 'accent' ? 'text-accent-dark' :
    'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' :
    status.tone === 'accent' ? 'bg-accent' :
    'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #F2F6EE 0%, #E6EEDF 70%, #DAE8D0 100%)' }}
    >
      {/* Soft light blooms */}
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-accent/20 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Scissors className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Year-round care
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
            this week
          </span>
        </div>
      </div>

      {/* Clipped hedge line at top, where the leaves fall from */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path
          d="M0,14 Q10,4 25,9 Q40,2 58,8 Q75,3 92,9 Q110,4 128,8 Q146,2 164,9 Q182,4 200,8 Q218,3 236,9 Q254,4 272,8 Q290,2 308,9 Q326,4 344,8 Q362,3 380,9 Q392,5 400,12 L400,20 L0,20 Z"
          fill="#2E5E43"
          fillOpacity="0.28"
        />
        <path
          d="M0,16 Q20,9 45,13 Q70,8 100,13 Q130,8 160,13 Q190,8 220,13 Q250,8 280,13 Q310,8 340,13 Q370,9 400,15 L400,20 L0,20 Z"
          fill="#1F4530"
          fillOpacity="0.35"
        />
      </svg>

      {/* Falling leaves */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {leaves.map((l, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: l.left,
              width: `${l.size}px`,
              height: `${l.size}px`,
              animation: `leaf-fall-${l.sway > 0 ? 'r' : 'l'} ${l.dur} cubic-bezier(0.45,0.05,0.55,0.95) ${l.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(31,69,48,0.25))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2 C 18 6, 21 12, 19 19 C 12 21, 6 18, 4 11 C 5 6, 8 3, 12 2 Z"
              fill={l.hue}
              fillOpacity="0.85"
            />
            <path d="M6 17 C 9 13, 13 9, 17 6" stroke="#F7F6F2" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.7" />
          </svg>
        ))}
      </div>

      {/* Lawn stripes at the bottom */}
      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path
          d="M 0,6 Q 12.5,3 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6"
          fill="none" stroke="#2E5E43" strokeOpacity="0.45" strokeWidth="1.2"
        />
        <path
          d="M 0,8 Q 12.5,5.5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8"
          fill="none" stroke="#4A7D5F" strokeOpacity="0.25" strokeWidth="0.8"
        />
      </svg>

      {/* Settle rings where leaves land */}
      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-dark/40"
            style={{
              left: r.left,
              width: '4px',
              height: '4px',
              animation: `leaf-settle 2.4s ease-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && (
              <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />
            )}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${toneText}`}
            style={{ animation: 'leaf-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes leaf-fall-r {
          0%   { transform: translate(-50%, -12px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          50%  { transform: translate(calc(-50% + 10px), 45px) rotate(80deg); }
          82%  { opacity: 1; }
          100% { transform: translate(calc(-50% - 4px), 95px) rotate(160deg); opacity: 0; }
        }
        @keyframes leaf-fall-l {
          0%   { transform: translate(-50%, -12px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          50%  { transform: translate(calc(-50% - 10px), 45px) rotate(-80deg); }
          82%  { opacity: 1; }
          100% { transform: translate(calc(-50% + 4px), 95px) rotate(-160deg); opacity: 0; }
        }
        @keyframes leaf-settle {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes leaf-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Cursor Scheduler (visit booking)
---------------------------------------------------------------- */
function VisitScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0: return { x: 8, y: 110, opacity: 0 }
      case 1: return { x: 60, y: 60, opacity: 1 }
      case 2: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4: return { x: 130, y: 130, opacity: 1 }
      default: return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Week 28 · July
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Visit
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className={`font-mono text-[9px] ${step >= 3 && idx === activeDay ? 'text-white/70' : 'text-muted'}`}>{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 6}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4
            ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30'
            : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Crew booked' : 'Pick a day'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#16211A" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Studio',
      heading: 'Design & Build',
      sub: 'Sketch to soil',
      text: 'Every garden design starts on the drawing board. We design for the house, the light and the life lived in it — then our own landscaping crew builds it, stone by stone.',
      Component: DesignShuffler,
    },
    {
      eyebrow: '02 / Care',
      heading: 'Kept, all year',
      sub: 'Quietly immaculate',
      text: 'A great garden is never finished. Scheduled visits keep lawns striped, hedges razor-sharp and borders full — so it looks effortless every single day.',
      Component: GardenLeaves,
    },
    {
      eyebrow: '03 / Ease',
      heading: 'One text away',
      sub: 'Booked around you',
      text: 'Visits scheduled around filming, touring and family life. One message and the crew is booked — in and out before the day starts.',
      Component: VisitScheduler,
    },
  ]

  return (
    <section id="studio" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ What we do
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Three crafts.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">
              One standard.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {card.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-dark text-lg mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp — animated counter (intersection observer + RAF)
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — three numbers behind the trust
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      title: 'Experience',
      target: 19,
      suffix: '+',
      label: 'years designing SW London gardens',
      desc: 'Just under two decades of garden design across South West London — courtyards, terraces and estates. We know London clay, London light and London planning.',
    },
    {
      n: '02',
      title: 'Care',
      target: 120,
      suffix: '+',
      label: 'gardens under our care',
      desc: 'From courtyards in Chelsea and Fulham to multi-acre grounds in Richmond, over a hundred and twenty gardens are kept by our crews year-round.',
    },
    {
      n: '03',
      title: 'Discretion',
      target: 100,
      suffix: '%',
      label: 'discretion, always',
      desc: 'NDAs as standard, vetted staff, unmarked vehicles on request. Our best-known clients are the ones we never talk about.',
    },
  ]

  return (
    <section id="numbers" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ The numbers
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              What the trust
              <span className="block font-serif italic font-medium text-primary-dark">rests on.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three numbers that define how we work. Not marketing — just what we
            deliver, garden after garden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-bold text-[6rem] sm:text-[7rem] md:text-[8rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">
                {p.label}
              </p>

              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>

              <span className="absolute top-9 right-9 sm:top-12 sm:right-12 font-mono text-[9px] uppercase tracking-widest text-primary/30">
                {p.n} / F&amp;F
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — sticky stacking process cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Walk the garden',
      tagline: 'We listen first.',
      text: 'A visit, a slow walk round, and a lot of questions. How do you use the space, what should it hide, what should it show off? We survey the soil, the light and the sightlines, then set out a fixed, transparent proposal.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Garden designer surveying a South West London garden',
      meta: 'Step 1 / Listen',
    },
    {
      num: '02',
      title: 'Design & build',
      tagline: 'Our crew, start to finish.',
      text: 'Planting plans, stone samples and lighting mock-ups before a single spade goes in. Then one dedicated crew builds it — no subcontractor roulette, no surprises, tidy site every evening.',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
      alt: 'Layered planting scheme along a path in a Fulham garden design',
      meta: 'Step 2 / Build',
    },
    {
      num: '03',
      title: 'Keep it perfect',
      tagline: 'We never really leave.',
      text: 'Handover is the beginning, not the end. Scheduled care visits keep the garden at its opening-day best through every season — and you get the same familiar faces at the gate each time.',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
      alt: 'Striped lawn and mature borders kept by garden maintenance in Wimbledon',
      meta: 'Step 3 / Keep',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
          ╱ How we work
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">
            No surprises.
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {step.meta}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    The F&amp;F Way
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-bold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                    Step {step.num}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Drummond Anderson
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services Grid — six dark tiles
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Everything we do</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              The whole garden,
              <span className="block font-serif italic font-medium text-accent">
                one crew.
              </span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            From a Chelsea courtyard to a Richmond estate — garden design,
            landscaping and year-round care by Drummond Anderson, across South West
            London and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary-light group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals — the client list does the talking
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: Lock,
      title: 'Discretion assured',
      text: 'NDAs as standard, vetted long-serving staff and unmarked vehicles on request. Your garden stays your business.',
    },
    {
      Icon: Award,
      title: 'Trusted by household names',
      text: 'The gardens behind some of Britain’s best-known front doors — in music, television and beyond — are kept by our crews.',
    },
    {
      Icon: Clock,
      title: 'There when it matters',
      text: 'Pre-shoot tidy-ups, party-morning turnarounds and storm callouts. When the garden has to be right today, we answer.',
    },
  ]

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ In good company
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Gardens the cameras find.
          </h2>
          <p
            className={`font-serif italic text-2xl sm:text-3xl text-primary-dark mt-6 transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Household names in music and television &mdash; and the homes we&rsquo;ll never name.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Request a consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function ContactForm() {
  const [tab, setTab] = useState('enquiry') // 'enquiry' | 'booking'

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: heading + info */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              ╱ Contact
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Tell us about
              <span className="block font-serif italic font-medium text-primary-dark">
                your garden.
              </span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              A few lines and a couple of photos is all it takes. We&rsquo;ll come
              back within one working day to arrange a garden design visit,
              anywhere in South West London.
            </p>

            <div className="mt-10 space-y-4">
              <a href="tel:+447852944415" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Call directly
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">07852 944415</span>
                </span>
              </a>

              <a href="mailto:rafeanderson04@gmail.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Write to
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">rafeanderson04@gmail.com</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Home turf
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">South West London</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">
                Privacy first
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Your details and photos are used only to respond to your enquiry,
                stored securely and never shared. For high-profile households we
                are happy to sign an NDA before the first visit.
              </p>
            </div>
          </div>

          {/* Right: GoHighLevel embeds — enquiry form or booking calendar */}
          <div className="lg:col-span-7">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab('enquiry')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  tab === 'enquiry' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-surface border border-divider text-muted hover:text-ink'
                }`}
              >
                Send an enquiry
              </button>
              <button
                onClick={() => setTab('booking')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  tab === 'booking' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-surface border border-divider text-muted hover:text-ink'
                }`}
              >
                Book a call directly
              </button>
            </div>

            <div className="bg-surface border border-divider rounded-5xl p-3 sm:p-4 shadow-xl shadow-primary/5 overflow-hidden">
              {tab === 'enquiry' ? (
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/jOMj6uoBjXM0vIf5rnZZ"
                  style={{ width: '100%', height: '1133px', border: 'none', borderRadius: '8px' }}
                  id="inline-jOMj6uoBjXM0vIf5rnZZ"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Form 3"
                  data-height="1133"
                  data-layout-iframe-id="inline-jOMj6uoBjXM0vIf5rnZZ"
                  data-form-id="jOMj6uoBjXM0vIf5rnZZ"
                  title="Contact enquiry form"
                />
              ) : (
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/QzhmdKWnlfi6SZHuy748"
                  style={{ width: '100%', height: '1400px', border: 'none', borderRadius: '8px' }}
                  id="QzhmdKWnlfi6SZHuy748_1783968651112"
                  title="Book a garden design call"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Gardens worthy of
            <span className="font-serif italic font-medium text-accent block">
              the spotlight.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Drummond Anderson Garden Design &amp; Maintenance — garden design, landscaping and quiet year-round
              care across South West London.
            </p>
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Request a consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={`${import.meta.env.BASE_URL}logo/da-icon-dark.svg`} alt="" className="h-8 w-8" />
              <span className="font-display font-bold text-lg">Drummond Anderson</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              South West London garden designers — designing, building and
              caring for private gardens with the discretion our clients rely on.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-6">
              Est. 2004 · London
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/65 hover:text-primary-light transition text-sm">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Studio
            </p>
            <ul className="space-y-2.5">
              <li><a href="#numbers" className="text-white/65 hover:text-primary-light transition text-sm">Numbers</a></li>
              <li><a href="#process" className="text-white/65 hover:text-primary-light transition text-sm">Process</a></li>
              <li><a href="#contact" className="text-white/65 hover:text-primary-light transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+447852944415" className="text-white/65 hover:text-primary-light transition text-sm">
                  07852 944415
                </a>
              </li>
              <li>
                <a href="mailto:rafeanderson04@gmail.com" className="text-white/65 hover:text-primary-light transition text-sm">
                  rafeanderson04@gmail.com
                </a>
              </li>
              <li className="text-white/65 text-sm">South West London, UK</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-3">
            Garden design &amp; landscaping across South West London
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            Chelsea · Fulham · Battersea · Clapham · Wandsworth · Putney ·
            Wimbledon · Barnes · Richmond · Kew · Kensington
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              Taking on new gardens · Autumn 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary-light transition">Privacy</Link>
            <Link to="/terms" className="hover:text-primary-light transition">Terms</Link>
            <span>© 2026 Drummond Anderson Garden Design &amp; Maintenance</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
