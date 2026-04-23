# Masimo — Source Documentation

**Project:** CPAP/OSA Backend MVP — Linde Homecare France
**Last updated:** 2026-04-22

**Sources used (all read and documented here):**

- MightySat Rx brochure: PLM-11294H (2025) — device specs, parameters, models
- Masimo Trace brochure: PLM-10553D (2021) — supported devices, export, technical specs
- SafetyNet brochure: PLM-14755C (2025) — platform overview, devices, ordering
- SafetyNet Quick Reference Guide: LAB-10206D (2021) — app screens, CareProgram, Live View
- masimo.eu, masimo.com, masimo.co.uk — Professional Health App page
- Search on masimo.com: P/N 95162 → no results / P/N 95166 → no results (P/Ns not indexed on public site)
- Team email to Yasaman (Apr 15) — requesting Masimo contact for SafetyNet enterprise access

---

## ⚠️ CRITICAL FINDING 1 — Masimo Trace does NOT support MightySat Rx

**Source: Masimo Trace brochure PLM-10553D — Supported Devices section**

Trace officially supports ONLY:

```text
Radical-7 (with or without RDS)    V1.4.5.1 or above
Radical Docking Station (RDS)      V5.1.3.2 or above
Root / Root NIBPT                  V1.6.2.1 or above
Rad-97 Product Family              V1.0.3.5 or above
Rad-67                             V1.0.3.7 or above
Rad-G                              V1.2.1.3 or above
```

**MightySat Rx is NOT listed. Trace cannot be used for MightySat Rx.**

---

## **⚠️ CRITICAL FINDING 2 — Project model confirmed with Bluetooth LE**

**Source: MightySat Rx brochure PLM-11294H (model table) + project confirmation**

**✅ PROJECT MODEL CONFIRMED: P/N 95162 (Touchscreen + Bluetooth LE)**

This means:

```text
→ Professional Health App is applicable
→ SafetyNet is technically applicable
→ backend integration is possible
```

The non-Bluetooth model exists in the documentation, but it is not the project model and is no longer the main blocker.

---

## **1. What is Masimo in this project**

Medical-grade pulse oximetry source.

**Confirmed project device: MightySat® Rx Fingertip Pulse Oximeter with Touchscreen — P/N 95162**

**Why it matters for OSA:**

```text
SpO2 drops during apnea events → Masimo detects this directly
→ most direct OSA oxygen desaturation biomarker
→ complements CPAP AHI data
→ PVi detects respiratory variability during breathing cycle
→ RRp provides respiration rate without needing Hexoskin shirt
```

---

## **2. MightySat Rx — confirmed parameters**

**Source: MightySat Rx brochure PLM-11294H (2025)**

| **Parameter**               | **Symbol** | **Display Range** | **Accuracy (ARMS)**                                     |
| --------------------------- | ---------- | ----------------- | ------------------------------------------------------- |
| Oxygen Saturation           | SpO2       | 0–100%            | ±2% no motion / ±3% motion / ±2% low perfusion          |
| Pulse Rate                  | PR         | 25–240 bpm        | ±3 bpm no motion / ±5 bpm motion / ±3 bpm low perfusion |
| Perfusion Index             | Pi         | 0.02–20%          | —                                                       |
| Respiration Rate from Pleth | RRp        | 4–70 rpm          | 3 rpm ± 1 rpm (bench validated full range)              |
| Pleth Variability Index     | PVi        | 0–100%            | —                                                       |

**Resolution:** SpO2=1% / PR=1 bpm / PVi=1% / RRp=1 rpm

**Additional display:**

```text
Plethysmographic Waveform  → real-time high resolution (also in app)
Signal I.Q. (SIQ)          → vertical bar under pleth → SpO2 confidence indicator
                             height of bar = higher confidence in reading
```

**Parameter definitions:**

```text
SpO2  → functional oxygen saturation of arterial hemoglobin — main OSA metric
PR    → pulse rate in bpm from pleth signal
Pi    → ratio pulsatile / non-pulsatile blood flow → peripheral perfusion strength
RRp   → respiration rate estimated from pleth waveform changes (4–70 rpm)
PVi   → dynamic changes in Pi during respiratory cycle → respiratory variability
SIQ   → SpO2 reading confidence level — not a numeric value, bar height indicator
```

**Physical specs:**

```text
Weight:        73g with batteries
Dimensions:    7.4 cm × 4.1 cm × 3.3 cm
Battery:       two 1.5V AAA batteries (~1800 spot-checks at 50% brightness, 30s each)
Bluetooth:     BLE — confirmed for project model P/N 95162
Mode:          Continuous Operation
IP rating:     IP23
Alarms:        None
Patient:       >30 kg (adult + pediatric)
Temperature:   5–40°C operating / -40–70°C storage
Humidity:      10–95% non-condensing
```

**Technology:** Masimo SET® — Measure-through Motion and Low Perfusion technology.

Used in >200 million patients/year in hospitals worldwide.

---

## **3. Project model — P/N 95162**

**Source: MightySat Rx brochure PLM-11294H + project confirmation**

| **Feature**             | **P/N 95162**       |
| ----------------------- | ------------------- |
| Name                    | Touchscreen + BT LE |
| SpO2, PR, Pi, RRp, PVi  | ✅                  |
| Pleth waveform          | ✅                  |
| 150° viewing angle      | ✅                  |
| Rotational touchscreen  | ✅                  |
| Bluetooth LE            | ✅                  |
| Professional Health App | ✅                  |
| SafetyNet App           | ✅                  |
| Backend integration     | ✅ possible         |

**Project conclusion:**

```text
The confirmed project model supports both:
- Professional Health App
- SafetyNet
```

---

## **4. Data flow — full chain**

### **Path A — Professional Health App (V1)**

```text
Patient clips device → takes measurement
→ Professional Health App connects via Bluetooth LE
→ displays live: SpO2, PR, Pi, PVi, RRp, pleth waveform
→ stores trends up to 12 hours
→ export: CSV via email
→ we receive CSV → parse → ingest → db_masimo
```

### **Path B — SafetyNet (long-term)**

```text
Patient clips device → takes measurement
→ SafetyNet App connects via Bluetooth LE
→ data auto-transferred to Masimo SafetyNet Secure Cloud
→ Clinician Portal: multi-patient dashboard, alerts, trends, reports
→ optional EMR integration / backend API (needs enterprise agreement)
```

---

## **5. Routes**

### **Route 1 — Professional Health App + CSV**

**Status: ✅ V1 practical route — confirmed applicable for project model P/N 95162**

**Source: masimo.co.uk Professional Health App page**

```text
App: iOS and Android
Pairs with: MightySat Rx BT LE model only

Live display:
→ SpO2, PR, Pi, PVi, RRp, pleth waveform
→ smart tone audible feature
→ trend graphs for all parameters

Storage: up to 12 hours per session
Export: standard CSV files via email
Integration: Apple Health Kit (iOS)
```

**Backend ingestion V1:**

```text
Patient takes measurement
→ app captures via Bluetooth
→ clinician/patient emails CSV
→ we receive → parse → db_masimo
```

**Limitations:**

```text
- 12h max per session — no unlimited history
- Export = manual email — not automated
- No direct programmatic API
```

---

### **Route 2 — Masimo SafetyNet**

**Status: ⏳ Long-term — subscription + enterprise access needed — confirmed technically applicable for project model P/N 95162**

**Source: SafetyNet brochure PLM-14755C (2025) + QRG LAB-10206D (2021)**

**SafetyNet = 3-layer cloud platform:**

```text
Layer 1 — SafetyNet App (patient, iOS + Android):
→ pairs with MightySat Rx via Bluetooth
→ auto-collects SpO2, PR (from MightySat)
→ RRp + PVi: device or manual entry
→ live data + 30-day history + weekly summary
→ CarePrograms: daily symptom questionnaires
→ patient shares data with providers/family

Layer 2 — Masimo SafetyNet Secure Cloud:
→ encrypted data storage and transfer
→ bridges app ↔ Clinician Portal

Layer 3 — Clinician Portal (web):
→ multi-patient dashboard
→ customizable alerts + notification logs
→ historical trends per patient
→ overnight pulse oximetry reports
→ ECG reports (compatible devices)
→ CarePrograms + questionnaires
→ EMR integration bi-directional
→ role-based access controls
→ audio/visual communication
```

**CareProgram screen (from QRG LAB-10206D):**

```text
CONTINUOUS MONITORING:
SPO2  → "99% at 9:15 a.m. from MightySat"   ← auto-captured
PR    → "64 bpm at 9:15 a.m. from MightySat" ← auto-captured
RRp   → "Use connected device or tap + to add manually"
PVi   → "Use connected device or tap + to add manually"
```

**Live View screen (from QRG LAB-10206D):**

```text
Shows in real-time:
→ O₂ Saturation
→ Beats/min (HR)
→ Breaths/min (RR)
→ Pleth Variability
→ Perfusion Index
→ Temperature °F (from Radius T° if connected)
History: up to 1 hour
Shared users: can view live data
```

**Backend integration from Clinician Portal:**

```text
EMR: bi-directional integration — confirmed in brochure
API / HL7: not publicly documented
→ needs enterprise agreement with Masimo
→ email sent to Yasaman Apr 15 — response still pending
```

---

### **Route 3 — Masimo Trace**

**Status: ❌ NOT applicable for MightySat Rx**

**Source: Masimo Trace brochure PLM-10553D**

```text
Trace = PC software
Supported devices: Radical-7, RDS, Root, Rad-97, Rad-67, Rad-G
NOT supported: MightySat Rx
```

---

### **Routes summary**

| **Route**                      | **Applies to**                    | **V1?**      | **Status**                             |
| ------------------------------ | --------------------------------- | ------------ | -------------------------------------- |
| Professional Health App + CSV  | Confirmed project model P/N 95162 | ✅ V1        | Ready to test and implement            |
| SafetyNet App + Cloud + Portal | Confirmed project model P/N 95162 | ⏳ Long-term | Needs subscription + enterprise access |
| Masimo Trace                   | Not applicable to project device  | ❌           | Confirmed not applicable               |

---

## **6. Frequency / sync**

| **Item**               | **P/N 95162**                                                             |
| ---------------------- | ------------------------------------------------------------------------- |
| Device measurement     | Spot-check on demand                                                      |
| App storage            | Up to 12h per session                                                     |
| CSV export             | Manual email — not automated                                              |
| SafetyNet cloud        | Automatic after measurement                                               |
| Usable backend refresh | Unknown — depends on route                                                |
| Real-time              | ❌ not truly real-time; near-real-time only through SafetyNet UI/workflow |

```text
MightySat Rx = spot-check device, not a continuous wearable
→ patient clips → measures seconds/minutes → removes
→ unlike Hexoskin, it is not worn for hours
→ frequency depends on care protocol
→ exact protocol for this project not confirmed
```

---

## **7. db_masimo schema**

```sql
id                       UUID            PK
patient_id               UUID/INT        FK → patients
timestamp                TIMESTAMPTZ     exact measurement time
source_name              TEXT            always 'masimo'
device_type              TEXT            'MightySat Rx'
device_model_pn          TEXT            '95162'

-- 5 confirmed MightySat Rx parameters
spo2                     NUMERIC(6,2)    SpO2 % — key OSA metric
pulse_rate               NUMERIC(6,2)    PR bpm
perfusion_index          NUMERIC(6,2)    Pi (0.02–20%)
respiration_rate         NUMERIC(6,2)    RRp breaths/min (4–70)
pleth_variability_index  NUMERIC(6,2)    PVi (0–100%)

-- Quality
siq_flag                 TEXT/INT        Signal I.Q. confidence level
measurement_quality      TEXT            quality flag if returned

-- Session
session_duration_s       INT             measurement session length in seconds
data_source_route        TEXT            'professional_health_app' | 'safetynet'

-- Metadata
raw_payload              JSONB           full CSV row or export content
created_at               TIMESTAMPTZ     DEFAULT now()
```

**Excluded from V1 (not confirmed for MightySat Rx):**

```text
SpCO  → carboxyhemoglobin — rainbow / Radical-7 only
SpMet → methemoglobin — advanced devices only
ORi   → oxygen reserve index — advanced devices only
SpHb  → hemoglobin — Radical-7 / Root only
```

---

## **8. Key fields for OSA project**

| **Field**                 | **Why important**                               |
| ------------------------- | ----------------------------------------------- |
| `spo2`                    | Oxygen desaturation — most direct OSA biomarker |
| `pleth_variability_index` | Respiratory variability — apnea-related         |
| `respiration_rate`        | Breathing rate from pleth — no shirt needed     |
| `perfusion_index`         | Blood flow quality — sensor reliability         |
| `siq_flag`                | SpO2 confidence — filters unreliable readings   |

---

## **9. Model decision**

```text
Project model = P/N 95162 ✅ CONFIRMED
→ V1: Professional Health App → CSV → db_masimo
→ Long-term: SafetyNet → cloud → portal / API (pending Masimo response)
→ backend work can proceed
```

---

## **10. Open questions**

| **#** | **Question**                                               | **Status**                     |
| ----- | ---------------------------------------------------------- | ------------------------------ |
| 1     | Masimo response: SafetyNet enterprise / backend API / HL7? | ⏳ email sent Apr 15 — waiting |
| 2     | SafetyNet Premium (5077) or Basic (4770)?                  | ❓ unknown                     |
| 3     | Professional Health App already used in project?           | ❓ unknown                     |
| 4     | Expected measurement frequency per patient per day?        | ❓ unknown                     |
| 5     | Usable backend refresh logic for Masimo at V1?             | ❓ still to define             |

---

## **11. Status summary**

```text
Source:                   Masimo — MightySat Rx
Project model:            ✅ CONFIRMED — P/N 95162 (Touchscreen + Bluetooth LE)
Parameters confirmed:     ✅ SpO2, PR, Pi, RRp, PVi + SIQ
Professional Health App:  ✅ applicable
SafetyNet:                ✅ technically applicable
Trace:                    ❌ not applicable
V1 route:                 ✅ Professional Health App + CSV
Long-term route:          ⏳ SafetyNet
Main blocker now:         enterprise / backend access details, not the device model
```

---

## **12. Next actions**

```text
Priority 1:
→ Test Professional Health App CSV export with test patient
→ Confirm who performs the export in practice (patient / technician / project workflow)
→ Define ingestion pipeline: email → parse → db_masimo

Priority 2:
→ Wait for Masimo response
→ Confirm: SafetyNet backend API / HL7 / export options
→ Confirm: which SafetyNet subscription level

Priority 3:
→ Plan SafetyNet onboarding if enterprise access confirmed
→ Define usable backend refresh logic for V1
```

span
