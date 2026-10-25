function Ring({ percent, color }) {
  const r = 70
  const c = 2 * Math.PI * r
  return (
    <div className="relative mx-auto h-48 w-48">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * percent) / 100}
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-4xl font-extrabold tabular-nums">{percent}%</div>
          <div className="text-[11px] uppercase tracking-widest text-white/45">risk score</div>
        </div>
      </div>
    </div>
  )
}

function Shell({ children, glow }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      {glow && (
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: glow }}
        />
      )}
      <h3 className="relative mb-5 text-xs font-semibold uppercase tracking-widest text-white/45">Prediction</h3>
      <div className="relative">{children}</div>
    </div>
  )
}

export default function Result({ loading, error, result }) {
  if (loading) {
    return (
      <Shell>
        <div className="grid h-72 place-items-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-rose-400" />
            <p className="text-sm text-white/60">Analysing patient profile…</p>
          </div>
        </div>
      </Shell>
    )
  }

  if (error) {
    return (
      <Shell>
        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
          <p className="mb-1 font-semibold">Couldn't reach the model</p>
          <p className="text-amber-100/70">{error}</p>
          <p className="mt-3 text-xs text-amber-100/60">
            The server may be waking up (it sleeps when idle) — wait a few seconds and try again.
          </p>
        </div>
      </Shell>
    )
  }

  if (!result) {
    return (
      <Shell>
        <div className="grid h-72 place-items-center text-center">
          <div>
            <div className="mx-auto mb-4 grid h-20 w-20 animate-beat place-items-center rounded-full bg-rose-500/15 text-4xl">
              ❤️
            </div>
            <p className="font-semibold">Your result will appear here</p>
            <p className="mx-auto mt-1 max-w-[16rem] text-sm text-white/45">
              Fill in the details and press <span className="text-rose-300">Check my risk</span>.
            </p>
          </div>
        </div>
      </Shell>
    )
  }

  const high = result.prediction === 1
  const percent = Math.round(result.probability * 100)
  const color = high ? '#fb7185' : '#34d399'

  return (
    <Shell glow={color}>
      <div className="animate-rise">
        <Ring percent={percent} color={color} />
        <div
          className={`mx-auto mt-5 w-fit rounded-full px-4 py-1.5 text-sm font-bold ${
            high ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
          }`}
        >
          {high ? '⚠️ High risk of heart disease' : '✅ Low risk of heart disease'}
        </div>
        <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
          {high
            ? 'The model found this profile closely resembles patients diagnosed with heart disease. Please consult a cardiologist for a proper evaluation.'
            : 'This profile resembles patients without heart disease. Keep up healthy habits and regular check-ups.'}
        </p>
        
      </div>
    </Shell>
  )
}
