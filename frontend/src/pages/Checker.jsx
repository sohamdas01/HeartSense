import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, NumberInput, Segmented, Slider } from '../components/fields'
import Result from '../components/Result'

const DEFAULTS = {
  age: 40,
  sex: 'M',
  chest_pain: 'ATA',
  resting_bp: 120,
  cholesterol: 200,
  fasting_bs: 0,
  resting_ecg: 'Normal',
  max_hr: 150,
  exercise_angina: 'N',
  oldpeak: 1.0,
  st_slope: 'Up',
}

// Empty in dev (Vite proxies /api); in production set VITE_API_URL to the hosted API
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

const RANGES = { resting_bp: [80, 200], cholesterol: [100, 600] }

export default function Checker() {
  const [form, setForm] = useState(DEFAULTS)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setResult(null)
    setError(null)
  }

  const valid = Object.entries(RANGES).every(
    ([k, [lo, hi]]) => form[k] !== '' && form[k] >= lo && form[k] <= hi,
  )

  async function submit(e) {
    e.preventDefault()
    if (!valid) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const [res] = await Promise.all([
        fetch(`${API_URL}/api/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }),
        new Promise((r) => setTimeout(r, 700)), // let the loader breathe
      ])
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      setResult(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-rose-600/25 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-700/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-indigo-700/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
          ← Back to home
        </Link>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 animate-beat place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-3xl shadow-xl shadow-rose-500/40">
            ❤️
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Heart
            <span className="bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">Sense</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/55">
            Enter a few clinical details and our machine-learning model will estimate the risk of heart disease in
            seconds.
          </p>
          <svg viewBox="0 0 400 40" className="mx-auto mt-6 h-8 w-72 text-rose-400/70" fill="none">
            <path
              d="M0 20h120l15-16 20 32 18-24 12 8h215"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </header>

        <form onSubmit={submit} className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <Card icon="🧑" title="Personal" subtitle="Basic patient information" delay={0}>
              <Slider label="Age" unit="yrs" min={18} max={100} value={form.age} onChange={set('age')} />
              <Segmented
                label="Sex"
                value={form.sex}
                onChange={set('sex')}
                options={[
                  { value: 'M', label: 'Male' },
                  { value: 'F', label: 'Female' },
                ]}
              />
            </Card>

            <Card icon="🩺" title="Vitals & Blood" subtitle="Resting measurements" delay={80}>
              <NumberInput
                label="Resting Blood Pressure"
                unit="mm Hg"
                min={80}
                max={200}
                value={form.resting_bp}
                onChange={set('resting_bp')}
              />
              <NumberInput
                label="Cholesterol"
                unit="mg/dL"
                min={100}
                max={600}
                value={form.cholesterol}
                onChange={set('cholesterol')}
              />
              <Segmented
                label="Fasting Blood Sugar > 120 mg/dL"
                value={form.fasting_bs}
                onChange={set('fasting_bs')}
                wide
                options={[
                  { value: 0, label: 'No', sub: '120 mg/dL or below' },
                  { value: 1, label: 'Yes', sub: 'Above 120 mg/dL' },
                ]}
              />
            </Card>

            <Card icon="📈" title="Heart & Exercise" subtitle="ECG and stress-test results" delay={160}>
              <Segmented
                label="Chest Pain Type"
                value={form.chest_pain}
                onChange={set('chest_pain')}
                wide
                options={[
                  { value: 'ATA', label: 'ATA', sub: 'Atypical angina' },
                  { value: 'NAP', label: 'NAP', sub: 'Non-anginal pain' },
                  { value: 'TA', label: 'TA', sub: 'Typical angina' },
                  { value: 'ASY', label: 'ASY', sub: 'Asymptomatic' },
                ]}
              />
              <Segmented
                label="Resting ECG"
                value={form.resting_ecg}
                onChange={set('resting_ecg')}
                wide
                options={[
                  { value: 'Normal', label: 'Normal', sub: 'No abnormality' },
                  { value: 'ST', label: 'ST', sub: 'ST-T wave abnormality' },
                  { value: 'LVH', label: 'LVH', sub: 'Left ventricular hypertrophy' },
                ]}
              />
              <Slider
                label="Max Heart Rate"
                unit="bpm"
                min={60}
                max={220}
                value={form.max_hr}
                onChange={set('max_hr')}
              />
              <Slider
                label="Oldpeak (ST Depression)"
                min={0}
                max={6}
                step={0.1}
                value={form.oldpeak}
                onChange={(v) => set('oldpeak')(Math.round(v * 10) / 10)}
              />
              <Segmented
                label="Exercise-Induced Angina"
                value={form.exercise_angina}
                onChange={set('exercise_angina')}
                options={[
                  { value: 'N', label: 'No' },
                  { value: 'Y', label: 'Yes' },
                ]}
              />
              <Segmented
                label="ST Slope"
                value={form.st_slope}
                onChange={set('st_slope')}
                options={[
                  { value: 'Up', label: 'Up' },
                  { value: 'Flat', label: 'Flat' },
                  { value: 'Down', label: 'Down' },
                ]}
              />
            </Card>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <Result loading={loading} error={error} result={result} />
            <button
              type="submit"
              disabled={loading || !valid}
              className="w-full rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-600 px-6 py-4 text-base font-bold shadow-xl shadow-rose-600/30 transition hover:shadow-rose-500/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Analysing…' : 'Check my risk →'}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(DEFAULTS)
                setResult(null)
                setError(null)
              }}
              className="w-full rounded-2xl border border-white/10 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              Reset form
            </button>
          </aside>
        </form>

       
      </div>
    </div>
  )
}
