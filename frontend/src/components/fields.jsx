export function Card({ icon, title, subtitle, children, delay = 0 }) {
  return (
    <section
      style={{ animationDelay: `${delay}ms` }}
      className="animate-rise rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <header className="mb-6 flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-xl shadow-lg shadow-rose-500/30">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>
      </header>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">{children}</div>
    </section>
  )
}

export function Field({ label, hint, value, wide, children }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-white/80">{label}</label>
        {value !== undefined && (
          <span className="rounded-lg bg-rose-500/15 px-2.5 py-0.5 text-sm font-semibold tabular-nums text-rose-300">
            {value}
          </span>
        )}
      </div>
      {children}
      {hint && <p className="mt-2 text-xs text-white/40">{hint}</p>}
    </div>
  )
}

export function Slider({ label, hint, unit, min, max, step = 1, value, onChange, wide }) {
  const fill = ((value - min) / (max - min)) * 100
  const shown = step < 1 ? Number(value).toFixed(1) : value
  return (
    <Field label={label} hint={hint} wide={wide} value={`${shown}${unit ? ' ' + unit : ''}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--fill': `${fill}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-white/30">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </Field>
  )
}

export function NumberInput({ label, hint, unit, min, max, value, onChange }) {
  const invalid = value === '' || value < min || value > max
  return (
    <Field label={label} hint={invalid ? `Enter a value between ${min} and ${max}` : hint}>
      <div
        className={`flex items-center overflow-hidden rounded-xl border bg-white/[0.04] transition focus-within:ring-2 ${
          invalid
            ? 'border-amber-400/60 focus-within:ring-amber-400/30'
            : 'border-white/10 focus-within:border-rose-400/60 focus-within:ring-rose-500/30'
        }`}
      >
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full bg-transparent px-4 py-3 text-base font-medium tabular-nums outline-none"
        />
        <span className="pr-4 text-sm text-white/40">{unit}</span>
      </div>
    </Field>
  )
}

export function Segmented({ label, hint, options, value, onChange, wide }) {
  const cols = options.length > 3 ? 2 : options.length
  return (
    <Field label={label} hint={hint} wide={wide}>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`rounded-xl border px-3 py-2.5 text-left transition ${
                active
                  ? 'border-rose-400/70 bg-rose-500/20 shadow-lg shadow-rose-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]'
              }`}
            >
              <div className={`text-sm font-semibold ${active ? 'text-white' : 'text-white/75'}`}>{o.label}</div>
              {o.sub && <div className="mt-0.5 text-[11px] leading-tight text-white/45">{o.sub}</div>}
            </button>
          )
        })}
      </div>
    </Field>
  )
}
