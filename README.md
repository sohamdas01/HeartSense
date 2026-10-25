# ❤️ HeartSense — Heart Disease Risk Predictor

A small full-stack app that estimates the risk of heart disease from 11 clinical inputs.
A React + Tailwind frontend talks to a FastAPI backend that serves a K-Nearest-Neighbours model trained on the
[Heart Failure Prediction dataset](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction).

> **Disclaimer:** for educational purposes only. It is a screening aid, not a medical diagnosis.

## Features
- Landing page (`/`) and prediction screen (`/check`)
- Instant High / Low risk verdict with a risk-score ring
- Input validation on both the client and the server
- No accounts, no database — nothing is stored
- Responsive, dark glassmorphism UI

## Project structure
```
Heart-Disease-Prediction/
├── ml/            HeartDisease.ipynb, heart.csv, KNN_heart.pkl, scaler.pkl, columns.pkl
├── backend/       FastAPI app (main.py) + requirements.txt
├── frontend/      Vite + React + Tailwind CSS v4
├── Dockerfile     API-only image (used by Render)
└── render.yaml    Optional Render blueprint
```

## Model
- Algorithm: `KNeighborsClassifier` (default k = 5), features scaled with `StandardScaler`
- Inputs: Age, Sex, Chest Pain Type, Resting BP, Cholesterol, Fasting Blood Sugar, Resting ECG, Max Heart Rate,
  Exercise Angina, Oldpeak, ST Slope
- Categorical inputs are one-hot encoded into the 15 columns stored in `columns.pkl`
- The risk score is the share of the 5 nearest neighbours with heart disease, so it moves in steps of 20 %
- To retrain, run `ml/HeartDisease.ipynb` from inside `ml/`; it rewrites the three `.pkl` files

## Run locally
Requirements: Python 3.10+ and Node 20+.

```bash
# 1. API (http://localhost:8000)
cd backend
pip install -r requirements.txt
uvicorn main:app --port 8000

# 2. Frontend (http://localhost:5173) — in a second terminal
cd frontend
npm install
npm run dev
```

In development Vite proxies `/api` to `localhost:8000`, so no configuration is needed.

> `requirements.txt` pins `scikit-learn==1.6.1`, the version the pickles were saved with. A different version
> still loads but prints a warning.

## API
`POST /api/predict`

```json
{
  "age": 54, "sex": "M", "chest_pain": "ASY", "resting_bp": 140, "cholesterol": 239,
  "fasting_bs": 0, "resting_ecg": "Normal", "max_hr": 160, "exercise_angina": "N",
  "oldpeak": 1.2, "st_slope": "Up"
}
```
Response: `{ "prediction": 0 | 1, "probability": 0.0 – 1.0 }`

| Field | Allowed values |
|---|---|
| `age` | 18–100 |
| `sex` | `M`, `F` |
| `chest_pain` | `ATA`, `NAP`, `TA`, `ASY` |
| `resting_bp` | 80–200 |
| `cholesterol` | 100–600 |
| `fasting_bs` | `0`, `1` |
| `resting_ecg` | `Normal`, `ST`, `LVH` |
| `max_hr` | 60–220 |
| `exercise_angina` | `Y`, `N` |
| `oldpeak` | 0.0–6.0 |
| `st_slope` | `Up`, `Flat`, `Down` |

`GET /api/health` returns `{"status": "ok"}`. Interactive docs are at `/docs`.

## Deploy (Render API + Vercel frontend)
1. **Render** — create a Web Service from this repo, language **Docker**, health check path `/api/health`
   (or use the Blueprint in `render.yaml`). Copy the service URL.
2. **Vercel** — import the repo with **Root Directory** `frontend` and add the environment variable
   `VITE_API_URL=https://<your-service>.onrender.com` (no trailing slash).
3. **Render** — add `CORS_ORIGINS=https://<your-app>.vercel.app` (comma-separate multiple origins) and redeploy.

`VITE_API_URL` is read at build time, so redeploy the frontend after changing it. On Render's free tier the
service sleeps when idle; the first request after a quiet spell can take 30–60 seconds.

## Tech stack
React 19 · React Router · Tailwind CSS 4 · Vite · FastAPI · scikit-learn · pandas · Docker
