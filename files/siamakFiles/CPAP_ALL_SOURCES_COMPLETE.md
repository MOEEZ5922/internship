# CPAP — Complete Source Documentation

### Linde Homecare / Backend Project

---

## 📋 TABLE OF CONTENTS — NAVIGATION

```
PART 1 — CPAP GENERAL
  1.1  Role of CPAP in the project
  1.2  db_cpap schema (current)
  1.3  V1 route strategy
  1.4  Frequency / timing
  1.5  Questions to confirm

PART 2 — LMD / LINDE MEDICAL DIRECT
  2.1  What is LMD
  2.2  Confirmed endpoints
  2.3  Authentication
  2.4  CPAP data structure (ProgressIndicator)
  2.5  Local DB schema (LHARI)
  2.6  Status / blockers

PART 3 — PHILIPS / CARE ORCHESTRATOR
  3.1  What is Care Orchestrator
  3.2  Device models
  3.3  Backend routes
  3.4  Authentication (HMACSHA256)
  3.5  What we tested
  3.6  Timing
  3.7  Fields — comparison + what to ask Linde
  3.8  Status / email / meeting

PART 4 — RESMED / AIRVIEW
  4.1  What is AirView
  4.2  Device models
  4.3  Backend routes (AVX + Extract)
  4.4  Authentication
  4.5  What we tested
  4.6  Timing (sessionDate vs receivedOn)
  4.7  Fields — comparison + what to ask Linde
  4.8  Status / email / meeting

PART 5 — LÖWENSTEIN / PRISMA CLOUD
  5.1  What is Löwenstein
  5.2  Device models (plus vs max distinction)
  5.3  Backend routes
  5.4  API status (404 — why + what to do)
  5.5  Confirmed fields from blog
  5.6  Fields — comparison
  5.7  Status / email / meeting

PART 6 — SEFAM / SEFAM CONNECT
  6.1  What is Sefam
  6.2  Device models
  6.3  Backend routes
  6.4  API confirmed working (GraphQL)
  6.5  Authentication
  6.6  Fields
  6.7  Status / email / meeting

PART 7 — GLOBAL STATUS SUMMARY
  7.1  All sources — one-page status table
  7.2  V1 recommendation
  7.3  All emails to send
```

---

---

# PART 1 — CPAP GENERAL

---

## 1.1 Role of CPAP in the project

CPAP is the central source of the project. It provides therapy and usage metrics used for adherence monitoring, therapy effectiveness, and risk logic. The backend plan places `db_cpap` among the 7 main backend tables.

CPAP data confirmed used in research (Yasaman papers, 570 patients, 4 manufacturers):

```
UsageDuration, AHI, LeaksLargePercentage, MaskPressure
from: Philips, ResMed, Sefam, Löwenstein devices
```

---

## 1.2 db_cpap schema — current version

The schema must stay close to the real source structure (Usage3.csv fields). Do not simplify too early.

| Column                 | Type         | Source field         | Required | Notes                        |
| ---------------------- | ------------ | -------------------- | -------- | ---------------------------- |
| id                     | UUID         | —                   | Yes      | PK, unique record identifier |
| patient_id             | UUID/INT     | AtHomePatientId      | Yes      | Main join key                |
| tenant_id              | TEXT         | TenantId             | Yes      | Tenant / platform identifier |
| reference_date         | DATE         | ReferenceDate        | Yes      | Main therapy date            |
| timestamp              | TIMESTAMPTZ  | Timestamp            | Yes      | Exact record time            |
| device_type            | TEXT         | DeviceType           | Yes      | Manufacturer / model family  |
| usage_hours            | NUMERIC(6,2) | Use                  | Yes      | Total usage hours            |
| effective_use_hours    | NUMERIC(6,2) | EffectiveUse         | Yes      | Effective usage hours        |
| leaks95                | NUMERIC(6,2) | Leaks95              | Yes      | 95th percentile leak         |
| leaks90                | NUMERIC(6,2) | Leaks90              | Yes      | 90th percentile leak         |
| leaks0                 | NUMERIC(6,2) | Leaks0               | Yes      | Minimum leak value           |
| leaks_large_percentage | NUMERIC(6,2) | LeaksLargePercentage | Yes      | % large leaks                |
| ahi                    | NUMERIC(6,2) | AHI                  | Yes      | Apnea-Hypopnea Index         |
| ai_cent                | NUMERIC(6,2) | AICent               | Yes      | Central apnea index          |
| pressure90             | NUMERIC(6,2) | Presure90            | Yes      | 90th percentile pressure     |
| pressure0              | NUMERIC(6,2) | Presure0             | Yes      | Minimum pressure             |
| source_platform        | TEXT         | —                   | Yes      | Linde / manufacturer label   |
| raw_payload            | JSONB        | —                   | Yes      | Full raw source row          |
| created_at             | TIMESTAMPTZ  | —                   | Yes      | Row creation time            |

---

## 1.3 V1 route strategy

```
V1 practical route (now):
  Linde-side batch/file ingestion into db_cpap
  → Use Usage3.csv and similar files
  → Most concrete route available today

V1 backend cleaner route (documented task):
  Linde LMD via VPN batch ingestion
  → More direct system integration
  → Documented in backend plan

Long-term route (to investigate):
  Direct manufacturer API (Philips, ResMed, Sefam, Löwenstein)
  → Not yet operational
  → Best long-term solution
  → Investigate in parallel while V1 uses Linde-side data
```

---

## 1.4 Frequency / timing

```
CPAP is NOT a real-time source.

Data generation frequency : during device use at night
Device → cloud sync        : depends on manufacturer and connectivity
                             modem = automatic next morning
                             SD card = manual, can be days/weeks
Backend refresh            : batch / daily / next-day delayed
Real-time                  : not confirmed, do not assume
```

Rule from Ludovic (Philips):

```
If no modem call for 7+ days → alert technician
Last night may be incomplete until next modem call confirms it
Missing data ≠ no use (could be connectivity issue)
```

---

## 1.5 Questions to confirm

```
1. Is db_cpap now correctly aligned with the real Usage3.csv structure?
2. For CPAP V1, should we officially treat Linde-side batch ingestion as the working route?
3. Is Linde LMD via VPN the expected real backend route for V1?
4. Which manufacturer APIs should we investigate for long-term integration?
5. What is the official backend refresh frequency for CPAP: daily / next-day / other?
```

---

---

# PART 2 — LMD / LINDE MEDICAL DIRECT

---

## 2.1 What is LMD

LMD = Linde Medical Direct. It is the Linde-side web service that aggregates CPAP data from all manufacturers used by Linde patients. The previous intern project already used this API to ingest data into a local MS SQL database called LHARI.

LMD is important because it is the **only confirmed route that already has working code** from a previous project. It works as a single entry point regardless of which manufacturer device the patient uses.

Files inspected:

```
auth_config.ini, auth.py, patients.py, treatments.py,
progress_indicator.py, risk_factor.py, tbl_patient.sql,
app.py, patient.log, treatment.log, progress_indicator.log, risk_factor.log
```

---

## 2.2 Confirmed endpoints

| Endpoint                                                                                | Script                | What it returns           |
| --------------------------------------------------------------------------------------- | --------------------- | ------------------------- |
| `LoginRest/Login`                                                                     | auth.py               | Session Token             |
| `PatientRest/GetPatientTreatment`                                                     | patients.py           | Patient info + treatments |
| `TreatmentGlobalSearchRest/GetTreatmentsGlobalSearch`                                 | patients.py           | All patient IDs           |
| `TreatmentRest/GetTreatmentSummary`                                                   | treatments.py         | Treatment detail          |
| `TreatmentProgressIndicatorHistoryRest/GetGroupedTreatmentProgressIndicatorsHistory2` | progress_indicator.py | CPAP measurements         |
| `TreatmentRiskFactorHistoryRest/GetGroupedTreatmentRiskFactorsHistory2`               | risk_factor.py        | Risk factors              |

Base URL:

```
https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/
```

---

## 2.3 Authentication

```
Method  : POST LoginRest/Login
Body    : Domain=LINDE, Username, Password, Application=LMDm
Returns : Session token (expires)

Corporate proxy required : 10.132.5.7:8080
Without Linde network    : API calls will fail

Credentials in file      : placeholders only (username / password)
Real credentials         : not available — must ask team
Token in get_patient.py  : hardcoded, confirmed expired (tested)
```

---

## 2.4 CPAP data structure

CPAP measurements in LMD are stored as generic key-value pairs via `ProgressIndicator`. They are NOT named fields like AHI, usage etc.

```
Value                              → the numeric value (ex: 4.2)
MeasurementDate                    → date of measurement
ProgressIndicatorType.Description  → name of the field (ex: "AHI", "Usage")
ProgressIndicatorType.UnitOfMeasure → unit
ProgressIndicatorType.Classification
ProgressIndicatorType.FieldType
ProgressIndicatorType.MinValue / MaxValue
```

To feed db_cpap we need to:

```
1. Get the ProgressIndicatorType ID list
2. Map each type ID to the correct db_cpap field (AHI, usage, leaks, pressure)
3. Pivot from long format → wide format (one row per patient per day)
```

Type ID mapping: **not confirmed yet — must ask team.**

Data volume from logs:

```
patient.log              → ~236 patient IDs processed
treatment.log            → 7 errors only
progress_indicator.log   → ~18,918 entries (large history available)
risk_factor.log          → ~19,199 entries
```

---

## 2.5 Local DB schema (LHARI)

The previous project used a local MS SQL Server database called LHARI.

```
patient
  id, first_name, last_name, address, zip_code, town,
  full_name, data_protected_type, creation_date, gender, trc_id

treatment
  id, patient_id → patient.id
  trc_treatment_id, trc_rendered_treatment

progress_indicator_type
  id, description, units, classification,
  min_value, max_value, field_type

treatment_progress_indicator
  id, id_treatment → treatment.id
  id_progress_indicator_type → progress_indicator_type.id
  value (VARCHAR), measurement_date, creation_date

risk_factor_type
  id, factor_type, name

treatment_risk_factor
  id, id_treatment → treatment.id
  id_risk_factor_type → risk_factor_type.id
  value, creation_date
```

---

## 2.6 Status / blockers

| Item                               | Status           |
| ---------------------------------- | ---------------- |
| Route identified                   | ✅               |
| 6 endpoints confirmed              | ✅               |
| Auth method confirmed              | ✅               |
| Working code from previous project | ✅               |
| Real credentials                   | ❌ Not available |
| Proxy access                       | ❌ Not confirmed |
| Token                              | ❌ Expired       |
| ProgressIndicatorType ID mapping   | ❌ Unknown       |

Blockers:

```
1. Username/Password for lindemedicaldirect.com → ask team
2. Access to proxy 10.132.5.7:8080 → ask team
3. ProgressIndicatorType IDs for AHI/usage/leaks/pressure → ask team
```

---

---

# PART 3 — PHILIPS / CARE ORCHESTRATOR

---

## 3.1 What is Care Orchestrator

Care Orchestrator (formerly EncoreAnywhere) is the Philips cloud platform for all Philips CPAP and respiratory devices. All Philips devices send their data here. Our backend retrieves data via the Care Orchestrator Integration Services API.

---

## 3.2 Device models

```
DreamStation 1 / 2 / Go (travel)
DreamStation BiPAP ASV / AVAPS / ST
System One (older generation)
Trilogy Evo (ventilation)
BiPAP V30 Auto
```

All models send data to Care Orchestrator — one API covers all.
Exact models used by Linde patients: not confirmed yet.

---

## 3.3 Backend routes

### Route 1 — Care Orchestrator Integration Services API ⭐ Main

```
Our backend → signed HTTP request → Care Orchestrator API → JSON → db_cpap
```

Confirmed API host:

```
integration.careorchestrator.com
```

Swagger documentation:

```
https://eu-integration.careorchestrator.com/swagger-ui.html?urls.primaryName=full-api
```

17 API groups confirmed (from JSON response). Most important:

| Group                 | Use                                  |
| --------------------- | ------------------------------------ |
| `therapyData`       | ⭐ CPAP therapy data — main         |
| `patients`          | ⭐ Patient info + modem call history |
| `ventTherapyData`   | Ventilation data                     |
| `compliantPatients` | Compliance lists                     |
| `equipment`         | Device info                          |
| `reports`           | PDF reports — secondary             |

Most important endpoints:

```
GET /therapy/{patientId}/{startDate}/{endDate}
→ CPAP therapy data for one patient / date range → feeds db_cpap

GET /patients/{patientId}/activities
→ device communication history (modem calls)
→ tells us when device last synced
→ alert if no communication for 7+ days

GET /patients/{patientId}
→ patient demographics

GET /ventTherapy/{patientId}/{startDate}/{endDate}
→ ventilation data (BiPAP patients)
```

### Route 2 — Dashboard (manual only)

```
Dashboard URL: not confirmed (eu.careorchestrator.com = DNS error — tested)
Must ask team for correct login URL.
Not useful for backend automation.
```

### Route 3 — EncoreAnywhere (old — do not use)

```
Replaced by Care Orchestrator. Ignore.
```

---

## 3.4 Authentication

Every API call needs a signed Authorization header. Swagger password is documentation access only — not enough for real calls.

```
Headers:
  Host          : integration.careorchestrator.com
  Timestamp     : current UTC time
  Authorization : <ID>:<HMACSHA256(URI path + timestamp, key)>
  Accept        : application/json
```

Philips provides after formal integrator registration:

```
- authorization ID
- authorization key
- hostname
```

Not self-service. Linde must register as authorized integrator.
Process: ~2 weeks after signing interoperability agreement.

---

## 3.5 What we tested

```
✅ Swagger JSON visible at eu-integration.careorchestrator.com
✅ API host confirmed: integration.careorchestrator.com
✅ All 17 API groups confirmed from JSON
❌ Direct endpoint call → AuthorizationFailed
❌ Swagger "Try it out" → TypeError: Failed to fetch
```

---

## 3.6 Timing

```
Not real-time.
Modem devices  : data available same day or next morning
SD card        : delayed — depends on patient upload
Bluetooth      : depends on patient app sync

Backend job:
  Run daily
  1. Check /activities → last modem call date
  2. Alert if 7+ days without modem call
  3. Call /therapy for missing dates
  4. Store in db_cpap

Date rule (Ludovic):
  Same date startDate + endDate = one full night
  Example: 2024-01-01 / 2024-01-01 → night of Jan 1st
  Last night may be incomplete until next modem call confirms it
```

---

## 3.7 Fields — comparison with db_cpap

### Already in db_cpap — no action needed

```
usageHours, effectiveUseHours, AHI, CAI (ai_cent),
leak95/90/0, leaksLargePercentage, pressure90/0, deviceType
```

### Missing — to request from Linde or Philips

| Field                         | Why it matters                                                    |
| ----------------------------- | ----------------------------------------------------------------- |
| OAI (Obstructive Apnea Index) | Separates obstructive from central apneas. Needed for risk model. |
| HI (Hypopnea Index)           | One of two AHI components. AHI = AI + HI.                         |
| AI (Apnea Index total)        | Completes clinical picture.                                       |
| last_modem_call               | When device last communicated. Critical for 7-day alert.          |
| source_of_upload              | Modem / SD / Bluetooth. Explains data gaps.                       |
| device_serial_number          | Device swap detection and tracking.                               |
| therapy_mode                  | CPAP / APAP / BiPAP. Needed to interpret pressure.                |
| mask_on/off_time              | Mask events. Useful for future coaching features (V2).            |

---

## 3.8 Status / email / meeting

| Item                              | Status                              |
| --------------------------------- | ----------------------------------- |
| API host confirmed                | ✅ integration.careorchestrator.com |
| 17 API groups confirmed           | ✅                                  |
| Swagger accessible                | ✅                                  |
| Auth method understood            | ✅ HMACSHA256                       |
| Executable API access             | ❌ Blocked                          |
| Authorization ID / key / hostname | ❌ Not received                     |
| Test PatientGUID                  | ❌ Not received                     |
| Dashboard login URL               | ❌ Not confirmed                    |

Email to send:

```
Subject: Philips Care Orchestrator API access — do we have it?

Hello,

For our CPAP backend, I need to retrieve therapy data from Care Orchestrator.
API confirmed at: integration.careorchestrator.com
Swagger: https://eu-integration.careorchestrator.com/swagger-ui.html?urls.primaryName=full-api

Real API calls return AuthorizationFailed.
The guide confirms we need formal integrator credentials.

Questions:
1. Does Linde already have authorized Care Orchestrator integrator access?
2. If yes → please send: authorization ID, key, hostname, one test PatientGUID.
3. If no → should Linde request integrator registration from Philips?
4. What is the correct Care Orchestrator dashboard login URL for Europe?
5. Which Philips device models do our patients use?

Best regards
```

Meeting summary:

```
Philips Care Orchestrator confirmed as target. One API covers all Philips models.
17 API groups confirmed. Main endpoint: GET /therapy/{patientId}/{startDate}/{endDate}.
Most db_cpap fields already covered from LMD.
7 missing fields to request: OAI, HI, AI, last_modem_call, source_of_upload,
device_serial_number, therapy_mode.
Only blocker: integrator credentials — must confirm if Linde already has them.
```

---

---

# PART 4 — RESMED / AIRVIEW

---

## 4.1 What is AirView

AirView is the ResMed cloud platform for all ResMed CPAP and respiratory devices. Our backend retrieves data via the AirView Exchange (AVX) API.

---

## 4.2 Device models

```
AirSense 10 / 10 AutoSet / 10 For Her
AirSense 11 / 11 AutoSet
AirCurve 10 (S / ST / ASV / VAuto / ST-A)
AirCurve 11
AirMini (travel)
AirStart 10 (basic — limited data)
S9 series (older)
Lumis / Stellar / Astral (ventilation — Astral needs external RCM module)
```

Exact models used by Linde patients: not confirmed yet.

---

## 4.3 Backend routes

### Route 1 — AirView Exchange (AVX) API ⭐ Main route

Full REST API, system-to-system. Best long-term solution.

```
Our backend (daily) → AVX API call → JSON → db_cpap
```

AVX API families:

| Family                        | Use                                  |
| ----------------------------- | ------------------------------------ |
| Data Collection and Usage API | ⭐ CPAP therapy session data — main |
| Patient Management API        | ⭐ Patient ECNs, device assignments  |
| Device Management API         | Device info                          |
| Compliance Reporting API      | Secondary                            |
| Detailed Data / Reporting API | Secondary                            |

Most important endpoints:

```
GET /v1/patients/{ecn}/data/sessions?receivedOn={date}
→ ⭐ BEST for daily sync
→ all sessions AirView received on that date
→ handles modem + delayed SD uploads automatically
→ docs say: "best used when called daily for synchronisation purposes"

GET /v1/patients/{ecn}/data/sessions/{date}
→ one specific therapy day

GET /v1/patients/{ecn}/data/sessions?noOfDays={n}&endDate={date}
→ date range — useful for backfill
```

### Route 2 — AirView Extract (XML) ⚠️ Temporary workaround ONLY — not for long term

```
AirView generates XML export
→ our backend downloads file
→ parses XML
→ stores in db_cpap
```

⚠️ NOT the correct long-term solution.
AVX API = we control what we get, when, clean JSON.
AirView Extract = we wait for ResMed to generate a file, XML format, less control.
Only use if AVX is not yet available for V1. Must be replaced by AVX as soon as possible.

### Route 3 — Dashboard (manual only)

```
https://airview.resmed.eu
365 days summary + 90 days detailed data available manually.
Not for backend automation.
```

### Route 4 — myAir patient app (patient-facing only)

```
Patient app. Not a backend route.
AirSense 11 includes Care Check-In: patient answers questions,
visible to clinicians in AirView → useful for future coaching.
```

---

## 4.4 Authentication

```
- AVX Integrator account : set up by ResMed — not self-service
- IDS proxy              : ResMed authentication proxy
- Certificate            : required for all API calls
- Organisation ID        : our identifier in AirView
- Patient ECN            : ResMed patient identifier — needed per patient
```

Access request page:

```
https://airview.resmed.eu/info/access
```

---

## 4.5 What we tested

```
✅ AVX technical documentation reviewed (from Yasaman)
✅ All API families identified
✅ Best sync endpoint identified: receivedOn
✅ Field list confirmed from documentation
❌ No real API call made
❌ AVX account: not confirmed
❌ IDS proxy + certificate: not confirmed
❌ ECNs: not confirmed
❌ AirView Extract: not confirmed if configured
```

---

## 4.6 Timing

Important distinction:

```
sessionDate = the night the patient used the device (ex: January 15)
receivedOn  = when AirView received the data (ex: January 16 or much later)
```

For wireless devices: gap is usually a few hours.
For SD card devices: gap can be days or weeks.

Using `receivedOn` in daily sync handles both cases correctly.

Backend job:

```
Run daily
1. For each active patient:
   GET /v1/patients/{ecn}/data/sessions?receivedOn=yesterday
2. Upsert into db_cpap (dedup: patient_id + sessionDate + device serial)
3. Flag sessions where sessionDate ≠ receivedOn (delayed upload)

For backfill: use noOfDays + endDate
Always store raw_payload
```

---

## 4.7 Fields — comparison with db_cpap

### Already in db_cpap — no action needed

```
usageHours, AHI, CAI (ai_cent), leak95/90,
leaksLargePercentage, pressure90/0, deviceType, sessionDate
```

### Missing — priority fields to request

| Field                           | Why it matters                                               |
| ------------------------------- | ------------------------------------------------------------ |
| OAI                             | Obstructive apnea classification.                            |
| HI                              | Hypopnea component of AHI.                                   |
| AI                              | Total apnea count.                                           |
| ODI (Oxygen Desaturation Index) | ⚡ Unique to ResMed — SpO2 drops per hour. Severity metric. |
| receiptTime                     | When AirView got the data. Essential for sync logic.         |
| device_serial_number            | Device swap detection.                                       |
| therapy_mode                    | Interpret pressure correctly.                                |

### Missing — for later

| Field                     | Why it matters                                     |
| ------------------------- | -------------------------------------------------- |
| SpO2 + minutesBelowSpO288 | Clinical severity — below 88% = hypoxia threshold |
| CSR                       | Cheyne-Stokes Respiration — cardiac patients      |
| RERA                      | Sleep disruptions beyond AHI                       |

ODI note: ResMed provides ODI. Philips does not always. This is a unique ResMed advantage — request from Linde.

---

## 4.8 Status / email / meeting

| Item                              | Status                   |
| --------------------------------- | ------------------------ |
| All API families identified       | ✅                       |
| Sync logic understood             | ✅ receivedOn daily pull |
| AirView Extract option identified | ✅                       |
| Missing fields identified         | ✅ 7 priority + 3 later  |
| AVX Integrator account            | ❓ Not confirmed         |
| IDS proxy + certificate           | ❓ Not confirmed         |
| Organisation ID + ECNs            | ❓ Not confirmed         |
| AirView Extract configured        | ❓ Not confirmed         |

Email to send:

```
Subject: ResMed AirView integration access — do we have it?

Hello,

For our CPAP backend, I need to retrieve therapy data from ResMed AirView.

Two options:
Option A — AirView Exchange (AVX) API
  Main endpoint: GET /v1/patients/{ecn}/data/sessions?receivedOn={date}
  Needs: AVX account, IDS proxy, certificate, Organisation ID, ECNs

Option B — AirView Extract (XML)
  Simpler file-based option — possible V1 shortcut

Questions:
1. Does Linde already have AVX integrator access or AirView Extract configured?
2. If yes → please send credentials / sample file.
3. If no → should Linde request from ResMed?
   Access page: https://airview.resmed.eu/info/access
4. Which ResMed device models do our patients use?
   Do they have wireless modules?

Best regards
```

Meeting summary:

```
ResMed AirView identified. Two backend options: AVX API (best long-term)
AirView Extract exists but is a temporary workaround only — not for long term.
Best sync: receivedOn endpoint handles modem + delayed SD uploads.
ODI is a unique ResMed field worth requesting from Linde.
Blockers: confirm if Linde has AVX or Extract access, get ECNs.
```

---

---

# PART 5 — LÖWENSTEIN / PRISMA CLOUD

---

## 5.1 What is Löwenstein

Löwenstein Medical (Germany) specialises in CPAP, APAP, BiLevel and ventilation devices. Platform: **prisma CLOUD**. Confirmed in Yasaman's research with 570 patients across 4 manufacturers.

---

## 5.2 Device models

```
prisma SOFT      → basic CPAP, Bluetooth only — no modem
prisma SMART plus → APAP, Bluetooth → prisma APP
prisma SMART max  → APAP, Bluetooth + modem → prisma CLOUD ✅ automatic daily
prisma SmartPlus  → APAP, SD / LAN / Bluetooth / modem
prismaLAB        → sleep lab system, SD / PSG / LAN
prismaCR         → BiLevel / ASV, SD / PSG / LAN / modem
prisma VENT      → ventilation, also on prisma CLOUD
```

Exact models used by Linde patients: not confirmed.

---

## 5.3 Backend routes

### Route 1 — prisma CLOUD REST API ⭐ Main route

```
Our backend (daily) → prisma CLOUD API call → JSON → db_cpap
```

Confirmed from prisma CLOUD blog and release notes: API exists, supports partner organisation access with Read-only or Read+Write permissions.

### Route 2 — prismaTS software (secondary)

Clinical software for data export. Automation: not confirmed.

### Route 3 — Dashboard (manual only)

```
https://homecare.loewensteinmedical.com
```

### Route 4 — prisma APP / prisma JOURNAL (patient-facing only)

Not backend routes.

---

## 5.4 API status — what happened with the URL

We received Swagger credentials from our supervisor (Yasaman), originally sent by Löwenstein .

```
URL tested : https://api.prismacloud.com/
Result     : Error 404 — Page not found
```

Why 404 — two possible reasons:

```
Reason 1 — Wrong URL path:
  The Swagger UI is on a sub-path, not the root.
  Examples: /swagger-ui.html, /docs, /api/v1
  The exact sub-path was not included in the original email.

Reason 2 — Credentials expired:
  The email is approximately old.
  API credentials often expire after a few months.
```

The API server exists — confirmed because the Löwenstein Medical logo is visible in the 404 page footer.

Next step: contact Löwenstein for correct URL and fresh credentials.

```
Support: support@prismaCLOUD.com
```

---

## 5.5 Confirmed fields from prisma CLOUD blog

The prisma CLOUD release notes confirm:

```
Statistics endpoint:
  deep_sleep_duration    → minutes of deep sleep
  portion_of_deep_sleep  → % of deep sleep
  SEL_index              → Löwenstein sleep efficiency index

BiLevel API:
  RSBI                   → Rapid Shallow Breathing Index
  respiratory_stability  → percentiles 25 / 50 / 75 / 95
```

These fields are **unique to Löwenstein** — not available from Philips or ResMed.

---

## 5.6 Fields — comparison with db_cpap

### Already in db_cpap

```
usageHours, AHI, leaksLargePercentage, pressure
→ confirmed used in Yasaman research data
```

### Missing — unique to Löwenstein

| Field                 | Why it matters                                     |
| --------------------- | -------------------------------------------------- |
| deep_sleep_duration   | ⚡ Unique — sleep depth metric                    |
| portion_of_deep_sleep | ⚡ Unique — % deep sleep                          |
| SEL_index             | ⚡ Unique — sleep efficiency index                |
| prisma RECOVER score  | ⚡ Unique — deep sleep quality indicator          |
| RERA                  | Sleep disruptions beyond AHI                       |
| FOT-based apnea type  | More precise obstructive vs central classification |
| deviceSerialNumber    | Device tracking                                    |
| therapyMode           | CPAP / APAP / BiLevel                              |

---

## 5.7 Status / email / meeting

| Item                                | Status                                   |
| ----------------------------------- | ---------------------------------------- |
| Cloud platform confirmed            | ✅ prisma CLOUD                          |
| Löwenstein in Linde data confirmed | ✅ Yasaman papers                        |
| Unique fields confirmed from blog   | ✅ deep_sleep, SEL_index, RSBI           |
| API URL                             | ⚠️ Known but 404                       |
| Swagger credentials                 | ⚠️ Received but old, possibly expired |
| Correct Swagger sub-path            | ❌ Unknown                               |
| Real API credentials                | ❌ Not received                          |
| Partner organisation registration   | ❌ Not done                              |

Email to send:

```
Subject: prisma CLOUD API access — credentials expired?

Hello,

We are building a backend for Linde Homecare France and need to
connect to the prisma CLOUD API.

We received old Swagger credentials
pointing to https://api.prismacloud.com/
but this URL returns a 404 error.

Could you please:
1. Confirm the correct current Swagger URL
2. Confirm if existing credentials are still valid or provide new ones
3. Explain the process to register as a partner organisation
4. Provide a test patient identifier

Support: support@prismaCLOUD.com

Best regards
```

Meeting summary:

```
Löwenstein prisma CLOUD confirmed as target.
Unique fields not in Philips or ResMed: deep sleep duration, SEL index, prisma RECOVER.
These could add significant value to our AI model.
API URL known but returns 404 — credentials likely expired (old).
Next step: contact Löwenstein for correct URL and fresh credentials.
```

---

---

# PART 6 — SEFAM / SEFAM CONNECT

---

## 6.1 What is Sefam

Sefam is a French CPAP manufacturer (Nancy, since 1982). Platform: **Sefam Connect**. Confirmed in Yasaman's research. Unique: uses GraphQL API instead of REST.

```
Philips → REST API
ResMed  → REST API
Sefam   → GraphQL API ← different but not harder
```

GraphQL = ONE endpoint, we send structured queries to get exactly what we need.

---

## 6.2 Device models

```
S.Box        → CPAP/APAP, Bluetooth + GSM modem + WiFi ✅
S.Box Duo ST → BiLevel, Bluetooth + 3G + WiFi ✅
Néa          → foam-free CPAP, Bluetooth ✅
EcoStar      → basic CPAP
```

---

## 6.3 Backend routes

### Route 1 — Sefam Connect GraphQL API ⭐ Main route — CONFIRMED WORKING

```
URL   : https://uat-psad-sefam-api.sefam-connect.eu/
Status: ✅ SERVER RESPONDS
Error : "Need to be signed in to access to service" (code 3 — tokenRefused)
→ API is working — just needs a valid auth token
```

Tech stack confirmed from error trace:

```
Framework : Laravel/Lumen (PHP)
API type  : GraphQL
Auth      : Token-based
```

This is a UAT-PSAD test environment provided by Sefam for developers:

```
API     : https://uat-psad-sefam-api.sefam-connect.eu/
API-DOC : https://uat-psad-sefam-api-doc.sefam-connect.eu
Frontend: https://uat-psad-sefam-front.sefam-connect.eu
```

Email from Sefam confirms: accounts have been created for us.

How GraphQL works vs REST:

```
REST (Philips/ResMed):
  GET /therapy/{patientId}/{startDate}/{endDate}
  → separate endpoint per data type

GraphQL (Sefam):
  POST https://uat-psad-sefam-api.sefam-connect.eu/
  Body: { query: "{ patient(id: X) { sessions { date usageHours AHI } } }" }
  → ONE endpoint, we request exactly what we need
```

### Route 2 — API Documentation page

```
URL   : https://uat-psad-sefam-api-doc.sefam-connect.eu
Status: ✅ accessible — login page visible
Needs : credentials (login + password OR token)
```

### Route 3 — Dashboard (manual only)

```
URL   : https://uat-psad-sefam-front.sefam-connect.eu
Status: ✅ accessible — PSAD test environment
Note  : "YOU ARE IN PSAD ENVIRONMENT — NOT PRODUCTION"
```

### Route 4 — SEFAM Access apps (patient/clinician only)

```
SEFAM Access Lite → patient app
SEFAM Access Pro  → clinician app for real-time configuration
Not backend routes.
```

---

## 6.4 Authentication

```
Auth method confirmed : Token-based (error code 3 = tokenRefused)

How to get token:
  POST login mutation to GraphQL endpoint
  with username + password → receive auth token
  use token in Authorization header for all calls

Exact login mutation: to confirm from API-DOC
```

---

## 6.5 Fields

From device documentation and SEFAM Access app:

| Field                        | In db_cpap already? | Notes                                      |
| ---------------------------- | ------------------- | ------------------------------------------ |
| usageHours                   | ✅                  | Main compliance                            |
| AHI                          | ✅                  | Main clinical metric                       |
| CHI (Central Hypopnea Index) | ❌                  | Separate from AHI — unique mention in app |
| leaks                        | ✅                  | Mask fit                                   |
| pressure                     | ✅                  | Therapy pressure                           |
| deviceSerialNumber           | ❌                  | Device tracking                            |
| therapyMode                  | ❌                  | CPAP / APAP / BiLevel                      |
| connected device data        | ❌                  | Weight, BP from compatible devices         |

Full field list: to confirm once logged into API-DOC.

---

## 6.6 Status / email / meeting

| Item                          | Status                                          |
| ----------------------------- | ----------------------------------------------- |
| API confirmed working         | ✅ https://uat-psad-sefam-api.sefam-connect.eu/ |
| API type confirmed            | ✅ GraphQL (Laravel/Lumen)                      |
| Auth method confirmed         | ✅ token-based                                  |
| API-DOC accessible            | ✅ needs login                                  |
| Frontend dashboard accessible | ✅ test environment                             |
| Sefam in Linde data confirmed | ✅ Yasaman papers                               |
| Login credentials             | ❌ Not yet received                             |
| Full query / field list       | ❌ Need to log into API-DOC                     |
| Production API URL            | ❌ Not confirmed                                |
| Test patient identifier       | ❌ Not confirmed                                |

Email to send:

```
Subject: Sefam UAT-PSAD — login credentials needed

Hello,

Thank you for the UAT-PSAD environment access.

We can confirm:
  API working: https://uat-psad-sefam-api.sefam-connect.eu/
  API-DOC accessible: https://uat-psad-sefam-api-doc.sefam-connect.eu

However we need login credentials to access the API-DOC
and to authenticate our API calls.

Could you please send:
1. Login / password for the API documentation
2. Login / password or token for the API
3. A test patient identifier
4. The production API URL

Best regards
```

Meeting summary:

```
Sefam is the most operationally advanced integration we have.
We already have the UAT-PSAD test environment.
The API is confirmed working — responds and just needs a token.
GraphQL API = one endpoint, cleaner for our backend.
API documentation is accessible — just needs credentials.
Next step: get credentials and inspect the GraphQL schema.
```

---

---

# PART 7 — GLOBAL STATUS SUMMARY

---

## 7.1 All sources — one-page status table

| Source                | Cloud             | API Type   | API Working?   | Auth              | Credentials        | Test patient | Priority     |
| --------------------- | ----------------- | ---------- | -------------- | ----------------- | ------------------ | ------------ | ------------ |
| **LMD**         | Linde internal    | REST       | ✅ Code exists | Token + proxy     | ❌ Expired/missing | ❌           | V1 candidate |
| **Philips**     | Care Orchestrator | REST       | ❌ AuthFailed  | HMACSHA256        | ❌ Not received    | ❌           | Long-term    |
| **ResMed**      | AirView           | REST (AVX) | ❌ Not tested  | Certificate+proxy | ❌ Not confirmed   | ❌           | Long-term    |
| **Löwenstein** | prisma CLOUD      | REST       | ⚠️ 404       | Unknown           | ⚠️ Expired (1yr) | ❌           | Long-term    |
| **Sefam**       | Sefam Connect     | GraphQL    | ✅ Responds    | Token             | ❌ Needed          | ❌           | Most ready   |

---

## 7.2 V1 recommendation

```
V1 now (most concrete):
  Linde-side batch/file ingestion (Usage3.csv and similar)
  + Linde LMD via VPN when proxy access is available

V1 manufacturer API most ready:
  Sefam → API confirmed working, just needs credentials

Long-term (all manufacturers):
  Philips → need integrator registration
  ResMed  → need AVX account or Extract setup
  Löwenstein → need updated API credentials
```

---

## 7.3 All emails to send — summary

```
1. To Linde (LMD):
   → Username/Password for lindemedicaldirect.com
   → Proxy 10.132.5.7:8080 access
   → ProgressIndicatorType ID mapping

2. To Linde / Philips:
   → Care Orchestrator integrator access (ID/key/hostname/PatientGUID)
   → Dashboard login URL

3. To Linde / ResMed:
   → AVX integrator access OR AirView Extract configuration
   → ECNs + Organisation ID
   → Which ResMed models? Do they have wireless?

4. To Löwenstein:
   → support@prismaCLOUD.com
   → Correct Swagger URL + fresh credentials
   → Partner organisation registration process

5. To Sefam:
   → Login credentials for API-DOC and API
   → Test patient identifier
   → Production API URL
```
