import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant prediction',
    text: 'Get a High or Low risk verdict the moment you submit — no waiting, no sign-up.',
  },
  {
    icon: '🧠',
    title: 'Machine-learning powered',
    text: 'A K-Nearest-Neighbours model trained on 734 real patient records compares your profile to similar cases.',
  },
  {
    icon: '📊',
    title: 'Clear risk score',
    text: 'See how strongly your profile matches heart-disease patients with an easy-to-read risk ring.',
  },
  {
    icon: '🩺',
    title: '11 clinical inputs',
    text: 'Age, blood pressure, cholesterol, ECG, chest pain type, ST slope and more — explained in plain words.',
  },
  {
    icon: '🔒',
    title: 'Private by design',
    text: 'No accounts and no database. Your details are used for the prediction and never stored.',
  },
  {
    icon: '📱',
    title: 'Works everywhere',
    text: 'A responsive interface that feels great on phones, tablets and desktops.',
  },
]

const STEPS = [
  { n: '01', title: 'Enter your details', text: 'Slide, type or tap through a short, friendly form.' },
  { n: '02', title: 'Model analyses', text: 'Your profile is scaled and matched against its nearest neighbours.' },
  { n: '03', title: 'See your result', text: 'Receive your risk verdict and score in seconds.' },
]

const STATS = [
  { value: '11', label: 'Health inputs' },
  { value: '734', label: 'Patient records' },
  { value: '<1s', label: 'To get a result' },
]

function CTA({ children = 'Check my risk', big }) {
  return (
    <Link
      to="/check"
      className={`group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-600 font-bold shadow-xl shadow-rose-600/40 transition hover:shadow-rose-500/60 active:scale-[0.97] ${
        big ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base'
      }`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-rose-600/30 blur-[130px]" />
        <div className="absolute -right-48 top-[28rem] h-[34rem] w-[34rem] rounded-full bg-fuchsia-700/25 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-700/20 blur-[130px]" />
      </div>

      {/* nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-lg shadow-lg shadow-rose-500/40">
            ❤️
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Heart
            <span className="bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">Sense</span>
          </span>
        </div>
        <Link
          to="/check"
          className="rounded-xl border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Check my risk
        </Link>
      </nav>

      {/* hero */}
      <header className="mx-auto max-w-4xl px-4 pb-20 pt-14 text-center sm:px-6 sm:pt-20">
        <div className="animate-rise mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-rose-400/25 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
          AI heart-health screening
        </div>

        <div className="animate-rise mx-auto mb-8 grid h-28 w-28 animate-beat place-items-center rounded-[2rem] bg-gradient-to-br from-rose-500 to-fuchsia-600 text-6xl shadow-2xl shadow-rose-500/50">
          ❤️
        </div>

        <h1
          style={{ animationDelay: '100ms' }}
          className="animate-rise text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Heart
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
            Sense
          </span>
        </h1>

        <p
          style={{ animationDelay: '200ms' }}
          className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Know your heart disease risk in seconds. Share a few clinical details and let machine learning do the
          heavy lifting.
        </p>

        <div style={{ animationDelay: '300ms' }} className="animate-rise mt-10 flex flex-col items-center gap-4">
          <CTA big />
          <span className="text-xs text-white/35">Free · No sign-up · Takes under a minute</span>
        </div>

        <svg viewBox="0 0 600 60" className="mx-auto mt-16 h-14 w-full max-w-xl text-rose-400/70" fill="none">
          <path
            d="M0 30h190l18-24 26 48 22-36 14 12h330"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </header>

      {/* stats */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-3 divide-x divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04] py-8 backdrop-blur-xl">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <div className="bg-gradient-to-r from-rose-300 to-fuchsia-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-300">Features</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Everything you need, nothing you don't</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-rose-400/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-rose-500/10"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500/30 to-fuchsia-600/30 text-2xl ring-1 ring-white/10 transition group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-300">How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Three simple steps</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="bg-gradient-to-br from-rose-400 to-fuchsia-500 bg-clip-text text-5xl font-extrabold text-transparent">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* final CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-600/25 via-fuchsia-700/20 to-indigo-700/20 p-10 text-center backdrop-blur-xl sm:p-16">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-rose-500/30 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to check on your heart?</h2>
          <p className="relative mx-auto mt-3 max-w-md text-white/60">
            It only takes a minute — and it could be the most important one today.
          </p>
          <div className="relative mt-8">
            <CTA big />
          </div>
        </div>
      </section>

     
    </div>
  )
}
