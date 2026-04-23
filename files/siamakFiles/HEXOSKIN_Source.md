# Hexoskin — Source Documentation

**Project:** CPAP/OSA Backend MVP — Linde Homecare France
**Last updated:** 2026-04-22
**Sources used:** Hexoskin ProShirt Product Spec Sheet (2026), api.hexoskin.com/docs (official REST API v3.3.x), hexoskin.com/pages/developers, team research notes

---

## 1. What is Hexoskin in this project

Hexoskin is a smart garment (shirt) with embedded textile sensors.
It provides continuous high-frequency physiological signals during wear — more detailed than CPAP alone.

**Device used:** Hexoskin ProShirt (Men and Women versions)

**Why it matters for OSA:**

```
CPAP data tells us: did the patient use the device?
Hexoskin tells us: what is happening physiologically while they sleep?
→ HR, HRV, RR intervals, breathing rate, respiratory volume, activity
→ Complements CPAP data with a richer physiological layer
```

---

## 2. Device specifications

**Source: Hexoskin ProShirt Product Spec Sheet 2026**

### Sensors

| Sensor                                                    | Spec                                | Signals                                                                         |
| --------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| 1-lead ECG                                                | 256 Hz — 12 bits — LSB: 0.0064 mV | Heart rate, HRV, HRR, RR intervals                                              |
| Dual-channel RIP (Respiratory Inductance Plethysmography) | 128 Hz — 16 bits                   | Breathing rate, tidal volume, minute ventilation, inspiration/expiration events |
| 3-Axis Accelerometer                                      | 64 Hz — 13 bits                    | Actigraphy, activity level, step counting, cadence                              |

### Quality assessment channels (per sensor)

```
ECG:
  - Disconnection detection
  - 50-60 Hz noise detection
  - Saturation ECG signal detection
  - Movement artifact detection
  - RR intervals reliability detection

Respiration (RIP):
  - Disconnection detection
  - Noise detection
  - Baseline change detection

Accelerometer:
  - Disconnection detection
  - Noise detection
  - Baseline change detection
```

### Device hardware

```
Battery:         36 hours continuous data collection — USB fast charge 90 min
Local storage:   16 GB — Loop Recorder: 100 days — 42,000 datapoints/minute
Bluetooth:       BLE 4.2 — real-time transmission — iOS & Android compatible
Dimensions:      13 × 42 × 72 mm — 40g
```

---

## 3. Data flow — full chain

```
Patient wears Hexoskin shirt
        ↓
Shirt records data locally (up to 36h / 16GB on device)
        ↓
Patient connects via Bluetooth to phone
        ↓
OneSync software syncs data to Hexoskin servers
        ↓
Data available via:
  - Dashboard / OneView (manual export/view)
  - HxConvertSourceFile (download + convert)
  - OneAPI / REST API (programmatic backend access)
```

---

## 4. Hexoskin platform components

**Source: Product spec sheet + api.hexoskin.com + support.hexoskin.com**

| Component                | What it is                         | Role                                                       |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------- |
| **Hexoskin App**   | iOS / Android                      | Real-time data visualization during recording              |
| **OneSync**        | Desktop software (OSX + Windows)   | Syncs shirt data to Hexoskin servers                       |
| **User Dashboard** | Web platform (`my.hexoskin.com`) | Data visualization + health status tracking for users      |
| **OneView**        | Web platform                       | All-in-one data monitoring for studies and data management |
| **OneAPI**         | REST API                           | Programmatic backend access                                |
| **OneSDK**         | Android SDK + Bluetooth            | Direct raw data streaming — mobile/device side            |

---

## 5. Routes

### Route 1 — Dashboard / OneView

**Status: V1 practical route — confirmed as candidate**

```
Patient wears shirt → OneSync syncs data
→ data available on my.hexoskin.com / OneView dashboard
→ export: CSV for HR, breathing rate, minute ventilation, activity, cadence
→ export: binary format for raw data (ECG, RIP, accelerometry)
→ Python + Matlab/Octave scripts available to convert binary to CSV
```

From official API docs:

> *"You can download your Heart Rate, Breathing Rate, Minute ventilation, Activity and cadence in CSV format, and the rest of the data in binary form directly from the dashboard."*

- Requires Dashboard / OneView account access
- Access to `my.hexoskin.com` — currently returns 403 without valid credentials
- Access is expected from project side (1–2 months)

---

### Route 2 — HxConvertSourceFile

**Status: V1 backup / export route — confirmed as candidate**

Three modes:

```
A) Download multiple records without converting
B) Convert already downloaded records
C) Download and convert at the same time
```

Technical details:

```
Server selection: api.hexoskin.com for Hexoskin / astro.hexoskin.com for Astroskin
Auth: account username/password via "Change user"
Admin login: may require selecting a user account
Output: raw files, CSV/TXT, EDF, info.json metadata
Records can be filtered by start/end date
Data saved in: User_## / record_#### or range_#### folders
```

- Requires account login + already synced records
- Strong practical V1 route if access and synced records exist
- Officially documented and confirmed

---

### Route 3 — OneAPI (REST API)

**Status: Long-term backend route — needs credentials**

```
Base URL: https://api.hexoskin.com/api/
API version header: X-HexoAPIVersion: 3.3.x
All requests over SSL
Default response: JSON
```

Auth options:

```
Option A — API Key:
  Headers per request:
  X-HEXOTIMESTAMP  → current UTC timestamp (NOT multiplied by 256)
  X-HEXOAPIKEY     → public key
  X-HEXOAPISIGNATURE → SHA1(private_key + timestamp + full_URL)
  Never send the private key — only use it to sign

Option B — OAuth2:
  Authorization: https://api.hexoskin.com/api/connect/oauth2/auth/
  Token exchange: https://api.hexoskin.com/api/connect/oauth2/token/
  After token: Authorization: Bearer {token}
```

To get access:

> *"Email api@hexoskin.com with your project name and a quick description of what you want to do, and we'll happily create you one."*
> Source: api.hexoskin.com/docs

Python client available: `https://bitbucket.org/carre/hexoskin-api-python-client`

---

### Route 4 — OneSync

**Status: Synchronization bridge — NOT a final data-access route**

```
OneSync is not the route our backend reads from.
It is the step that makes data available for Dashboard / HxConvert / OneAPI.
Patient must run OneSync to upload shirt data to Hexoskin servers.
```

- Desktop software: OSX 10.15+ and Windows 10+
- Officially documented and confirmed
- Team confirmation needed on whether project already uses OneSync

---

### Route 5 — OneSDK / Direct Bluetooth

**Status: Low priority — mobile/device side only**

```
Direct real-time Bluetooth access
Raw ECG / RIP / accelerometry streaming
Android integration
Requires SDK license / project approval
```

- Not the backend priority
- Only relevant if project explicitly needs real-time mobile raw streaming

---

### Routes summary

| Route               | What                              | V1              | Status              |
| ------------------- | --------------------------------- | --------------- | ------------------- |
| Dashboard / OneView | Manual view + export              | ✅ V1           | Confirmed candidate |
| HxConvertSourceFile | Download + convert synced records | ✅ V1 backup    | Confirmed candidate |
| OneAPI              | REST API — programmatic          | ⏳ Long-term    | Needs credentials   |
| OneSync             | Sync bridge                       | —              | Intermediate step   |
| OneSDK / Bluetooth  | Mobile raw streaming              | ❌ Low priority | Not backend         |

---

## 6. OneAPI — key endpoints

**Source: api.hexoskin.com/docs (REST API v3.3.x)**

### Important note — HexoTimestamp

```
Hexoskin does NOT use standard UNIX timestamps.
HexoTimestamp = UNIX epoch × 256
→ represents 256ths of a second since Jan 1 1970 12:00:00 UTC

Example: 25 May 2006 12:00:00 → UNIX = 1148558400 → HexoTimestamp = 294030950400

EXCEPTION: X-HEXOTIMESTAMP header uses normal UNIX timestamp (not × 256)
```

### Core endpoints

| Endpoint              | Method | Description                                                       |
| --------------------- | ------ | ----------------------------------------------------------------- |
| `/api/account/`     | GET    | Authenticated user info                                           |
| `/api/user/`        | GET    | All users visible to account                                      |
| `/api/record/`      | GET    | List of recordings (filter by device, start, end, user)           |
| `/api/record/{id}/` | GET    | Single recording detail                                           |
| `/api/data/`        | GET    | Biometric data — use `?datatype__in=19,33&record=37700`        |
| `/api/datatype/`    | GET    | List of all available datatypes                                   |
| `/api/report/`      | GET    | Metrics and reports — use `?include_metrics=44,1&record=37700` |
| `/api/range/`       | GET    | Activity ranges (annotated time periods)                          |
| `/api/metric/`      | GET    | List of all metrics                                               |
| `/api/accesstoken/` | GET    | View API keys associated with account                             |

### Important datatypes

**1Hz derived data:**

```
19  → Heart rate (bpm)
33  → Breathing rate (breaths/min)
36  → Minute ventilation (L/min)
49  → Activity (actigraphy)
```

**Raw high-frequency data:**

```
4113 → ECG (256 Hz)
4129 → Thoracic respiration (128 Hz)
4130 → Abdominal respiration (128 Hz)
4145 → Acceleration X (64 Hz)
4146 → Acceleration Y (64 Hz)
4147 → Acceleration Z (64 Hz)
```

**Asynchronous data:**

```
52  → Steps
18  → RR intervals
34  → Inspiration detections
35  → Expiration detections
```

**Quality / status channels:**

```
1000 → Heart rate status (bit flags: disconnection, 50/60Hz noise, saturation, artifacts, unreliable RR)
```

**Sleep metrics (activitytype 12 required):**

```
270  → Sleep position
Available metrics: 1032 (sleep total time), 1033, 1034, 1035, 1036, 1037, 1038 (sleep efficiency), 1039
```

**HRV (activitytype 12=Sleep or 106=Rest test required):**

```
HRV HF, HRV LF, HRV LF normalized, NN intervals, SD NN, Triangular index
Metric 50 → HRV average
Metric 173 → HRVLFnorm average
```

### Data export formats (via /api/data/)

```
Accept: application/json          → JSON (max 65535 points per call, subsampled if more)
Accept: text/csv                  → CSV (1Hz data only)
Accept: application/octet-stream  → Binary ZIP (full unsubsampled data — recommended for raw)
Accept: application/x-edf         → EDF format
```

**Important:** For raw high-frequency data (ECG at 256Hz), always use binary — JSON will subsample.

### Example data query

```
GET https://api.hexoskin.com/api/data/?datatype__in=19,33,18&record=37700
→ returns heart rate, breathing rate, and RR intervals for record 37700
```

---

## 7. Frequency / sync

| Layer                          | Value                                 |
| ------------------------------ | ------------------------------------- |
| ECG source frequency           | 256 Hz (continuous during wear)       |
| Respiration source frequency   | 128 Hz                                |
| Accelerometer source frequency | 64 Hz                                 |
| Derived HR/BR                  | 1 Hz                                  |
| Local device storage           | Up to 36h / 16 GB / 100 days loop     |
| Sync to Hexoskin servers       | After patient runs OneSync            |
| Backend availability           | After sync — not real-time           |
| Usable backend refresh         | **Unknown / not confirmed yet** |
| Real-time backend              | Not confirmed                         |

**Practical note:**

```
Data sits on the shirt until OneSync is run.
If OneSync is not used → no data reaches Hexoskin servers → nothing to pull.
Exact timing of when backend can retrieve data depends on project workflow.
```

---

## 8. db_hexoskin schema

```sql
id                      UUID            PK
patient_id              UUID/INT        FK → patients — main join key
timestamp               TIMESTAMPTZ     exact measurement time
source_name             TEXT            always 'hexoskin'
device_type             TEXT            device model / garment type

-- ECG / Cardiac (from 1-lead ECG at 256Hz)
heart_rate              NUMERIC(6,2)    1Hz derived HR (datatype 19)
hrv                     NUMERIC(8,3)    HRV value if computed
rr_intervals            JSONB           RR interval sequence (datatype 18) — semi-raw in V1
ecg_quality_flag        INT             bit flags: disconnection/noise/saturation/artifact/unreliable RR

-- Respiration (from dual-channel RIP at 128Hz)
breathing_rate          NUMERIC(6,2)    1Hz derived (datatype 33)
tidal_volume            NUMERIC(8,3)    volume per breath in L — documented field, confirm project use
minute_ventilation      NUMERIC(8,3)    L/min (datatype 36) — documented, confirm project use
respiration_quality     TEXT/JSONB      respiration quality flags

-- Activity (from 3-axis accelerometer at 64Hz)
accelerometer_activity  NUMERIC(8,3)    activity/actigraphy summary (datatype 49)
step_count              INT             steps (datatype 52)
cadence                 NUMERIC(6,2)    steps/min pace

-- Sleep (only when activitytype = 12)
sleep_state             TEXT            sleep position / sleep phase if used
sleep_efficiency        NUMERIC(5,4)    metric 1038 — if sleep range used
sleep_total_time_s      INT             metric 1032 — if sleep range used

-- HRV (only when activitytype = 12 or 106)
hrv_lf                  NUMERIC(8,3)    HRV low frequency
hrv_hf                  NUMERIC(8,3)    HRV high frequency
hrv_sdnn                NUMERIC(8,3)    SD of NN intervals

-- Metadata
record_id               INT             Hexoskin record ID — link to source record
range_id                INT             Hexoskin range ID — if activity range used
raw_payload             JSONB           full API response or export content
created_at              TIMESTAMPTZ     DEFAULT now()
```

---

## 9. Key fields for OSA project

| Field                      | Source sensor       | Why important                          |
| -------------------------- | ------------------- | -------------------------------------- |
| `heart_rate`             | ECG                 | Cardiac monitoring during sleep        |
| `hrv` / `rr_intervals` | ECG                 | Autonomic nervous system — OSA marker |
| `breathing_rate`         | RIP dual channel    | Respiratory monitoring                 |
| `tidal_volume`           | RIP                 | Breathing depth — relevant for apnea  |
| `minute_ventilation`     | RIP                 | Total breathing volume                 |
| `sleep_state`            | Activity + ECG      | Sleep staging if activitytype=12       |
| `ecg_quality_flag`       | ECG quality channel | Detect unreliable data                 |
| `respiration_quality`    | RIP quality channel | Detect disconnection / noise           |

---

## 10. Open questions

| # | Question                                                                                         | Status                             |
| - | ------------------------------------------------------------------------------------------------ | ---------------------------------- |
| 1 | Do we already have OneAPI project access, or does it need to be requested from api@hexoskin.com? | ❌ not confirmed                   |
| 2 | Do we already have Dashboard / OneView account access?                                           | ❌ not confirmed (403 when tested) |
| 3 | Do we already use OneSync in the project workflow, or does it need to be set up?                 | ❓ unknown                         |
| 4 | Do we already have HxConvertSourceFile access + synced records to download?                      | ❓ unknown                         |
| 5 | What is the expected usable backend refresh rhythm for V1: daily, per session, other?            | ❓ unknown                         |
| 6 | Which Hexoskin ProShirt model / size is used in the project?                                     | ❓ unknown                         |
| 7 | Is sleep range (activitytype=12) configured in the project — needed for HRV and sleep metrics?  | ❓ needs confirmation              |
| 8 | Should we use JSON or binary format for raw data retrieval via OneAPI?                           | ❓ design decision pending         |

---

## 11. Status summary

```
Source:                  Hexoskin ProShirt
Device specs:            ✅ confirmed — spec sheet 2026
Signals documented:      ✅ ECG 256Hz / RIP 128Hz / Accelerometer 64Hz
Routes identified:       ✅ Dashboard / HxConvert / OneAPI / OneSync / OneSDK
API docs:                ✅ api.hexoskin.com/docs REST v3.3.x — fully read
Datatypes confirmed:     ✅ HR(19), BR(33), MV(36), Activity(49), RR(18), ECG(4113), RIP(4129/4130), Acc(4145-4147)
Auth mechanism:          ✅ API Key (SHA1 signed) or OAuth2 — documented
HexoTimestamp:           ✅ epoch × 256 — critical to implement correctly
Schema:                  ✅ db_hexoskin defined
V1 route:                ⏳ Dashboard — access not yet confirmed
V1 backup:               ⏳ HxConvertSourceFile — access not yet confirmed
Long-term route:         ⏳ OneAPI — credentials not yet confirmed
Backend refresh timing:  ❌ unknown — depends on OneSync + project workflow
Real-time:               ❌ not applicable — batch/sync based
```

---

## 12. Next action

```
1. Confirm with Yasaman / Linde:
   - Do we have Dashboard / OneView project access?
   - Do we have OneAPI credentials, or should we email api@hexoskin.com?
   - Do we have HxConvertSourceFile login + synced records?
   - Is OneSync already configured in the project workflow?

2. If API access confirmed:
   - Test GET /api/account/ to verify connection
   - Test GET /api/record/ to list available recordings
   - Test GET /api/data/?datatype__in=19,33&record={id} for HR + BR

3. If only Dashboard access:
   - Export CSV for HR, BR, MV, activity, cadence
   - Export binary for ECG, RIP
   - Use provided Python scripts to convert binary to CSV
   - Ingest into db_hexoskin

4. Implement HexoTimestamp conversion (× 256) before any time comparison with other sources
```
