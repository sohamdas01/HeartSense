import os
from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent
ML_DIR = BASE_DIR / "ml"
DIST_DIR = BASE_DIR / "frontend" / "dist"

model = joblib.load(ML_DIR / "KNN_heart.pkl")
scaler = joblib.load(ML_DIR / "scaler.pkl")
expected_columns = list(joblib.load(ML_DIR / "columns.pkl"))

app = FastAPI(title="Heart Disease Prediction API")
app.add_middleware(
    CORSMiddleware,
    # Extra origins (e.g. a separately hosted frontend) via CORS_ORIGINS="https://a.com,https://b.com"
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"]
    + [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientInput(BaseModel):
    age: int = Field(ge=18, le=100)
    sex: Literal["M", "F"]
    chest_pain: Literal["ATA", "NAP", "TA", "ASY"]
    resting_bp: int = Field(ge=80, le=200)
    cholesterol: int = Field(ge=100, le=600)
    fasting_bs: Literal[0, 1]
    resting_ecg: Literal["Normal", "ST", "LVH"]
    max_hr: int = Field(ge=60, le=220)
    exercise_angina: Literal["Y", "N"]
    oldpeak: float = Field(ge=0.0, le=6.0)
    st_slope: Literal["Up", "Flat", "Down"]


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/predict")
def predict(p: PatientInput):
    raw_input = {
        "Age": p.age,
        "RestingBP": p.resting_bp,
        "Cholesterol": p.cholesterol,
        "FastingBS": p.fasting_bs,
        "MaxHR": p.max_hr,
        "Oldpeak": p.oldpeak,
        "Sex_" + p.sex: 1,
        "ChestPainType_" + p.chest_pain: 1,
        "RestingECG_" + p.resting_ecg: 1,
        "ExerciseAngina_" + p.exercise_angina: 1,
        "ST_Slope_" + p.st_slope: 1,
    }
    df = pd.DataFrame([raw_input])
    for col in expected_columns:
        if col not in df.columns:
            df[col] = 0
    df = df[expected_columns]

    scaled = scaler.transform(df)
    prediction = int(model.predict(scaled)[0])
    probability = float(model.predict_proba(scaled)[0][1])

    return {"prediction": prediction, "probability": probability}


# Serve the built React app (production). Registered last so /api routes win.
if DIST_DIR.is_dir():
    app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")

    @app.get("/{path:path}", include_in_schema=False)
    def spa(path: str):
        if path.startswith("api/"):
            raise HTTPException(status_code=404)
        file = (DIST_DIR / path).resolve()
        if path and file.is_file() and DIST_DIR in file.parents:
            return FileResponse(file)
        return FileResponse(DIST_DIR / "index.html")
