
# Somno-Art — Source Documentation

**Project:** CPAP/OSA Backend MVP — Linde Homecare France
**Last updated:** 2026-04-23

**Sources used (all read and documented here):**

- Multiple Night Report (FR) — PPRS / Somno-Art Software 2.8.0[3.2.1] — confirmed report output
- SASoftware HCP Manual EN v2.8.0[3.2.1] — full technical documentation
- Mvt_RawData_example.xlsx — actimetry raw data file example (project files)
- PP_RawData_example.xlsx — pulse/RR interval raw data file example (project files)
- Screenshots of project folder structure (somno-art folder confirmed)

---

## 1. What is Somno-Art in this project

Somno-Art is a sleep analysis software made by **PPRS** (Colmar, France).
It is NOT a wearable or sensor — it is a **standalone software that analyses heart rate and movement signals** to produce sleep staging and sleep architecture reports.

**Software version in project:** `Somno-Art Software 2.8.0[3.2.1]` (release date: 2022-05)
**Contact:** support@somno-art.com / www.somno-art.com

**Why it matters for the OSA project:**

```
Somno-Art provides nightly sleep structure — the most detailed sleep layer in the project:
→ Sleep stages: W, N1+N2, N3, REM
→ TST, sleep efficiency, WASO, latencies
→ Movement and cardiac arousal metrics
→ Multi-night longitudinal tracking
This is the dedicated sleep architecture source — more structured than Withings or Hexoskin summaries.
```

---

## 2. What Somno-Art is and is not

```
Somno-Art Software = standalone medical software (CE + FDA marking)
→ NOT a wearable device
→ NOT a real-time monitoring tool
→ It TAKES input files (heart rate + movement recordings)
→ It PRODUCES output files (sleep stages + sleep reports)

Intended users: trained professionals with sleep expertise only
Patients and general HCPs do NOT have access to Somno-Art Software
```

**Medical indications (from HCP manual):**

```
Analyses physiological signals of heart rate and movements of adults
→ Assesses sleep parameters: continuity, latencies, architecture
→ Used for sleep structure characterisation
→ Aid for diagnosis and treatment follow-up of sleep disturbances
Minimum recording: 5 hours time in bed
```

**Exclusions — cannot be analysed:**

```
→ Patients with heart rate disorders
→ Patients with cardiac devices (defibrillator, pacemaker, stimulator)
→ Beta-blocker treatment
→ Active cardiovascular disease (Afib, AV block, SVT >100bpm, etc.)
→ Diastolic BP > 110 mmHg
→ Pathological motor activity
```

---

## 3. Input data — what Somno-Art reads

**Source: HCP manual section 2**

Somno-Art reads **night recordings of beat-to-beat cardiac intervals and movements** in two formats:

### Format 1 — SAR (Somno-Art Recording)

```
File extension: .sar
Produced by: Somno-Art Device (supported since V1.1.1[1.7.0])
Contains:
→ Actimetry signals + beat-to-beat cardiac intervals
→ Lights Off, Lights On, and event times
→ Information about the subject
```

### Format 2 — XML

```
File extension: .xml
Contains:
→ Actimetry signal + beat-to-beat cardiac intervals
→ Lights Off, Lights On, and event times
→ Information about the subject
Lights Off/On = analysis start and stop markers
```

### File naming convention

```
<recording identifier>.<ext>
or with visit code:
<recording identifier>_<visit code>.<ext>
```

### Raw data files confirmed in project folder

**Mvt_RawData_example.xlsx — actimetry (movement) file:**

```
Columns (raw tab):
  onset    → time marker (msec from recording start)
  Act      → actimetry value (count)

Columns (with units tab):
  time from start recording (msec)
  time from start recording (sec)
  time from start recording (min)
  Actimetry value (count)

Example rows:
  29432 msec → 29.43 sec → 0.49 min → 152 counts
  59432 msec → 59.43 sec → 0.99 min → 8 counts

Frequency: ~30 second intervals (accumulated every 30 seconds per manual)
This is the movement/actigraphy input to the Somno-Art algorithm.
```

**PP_RawData_example.xlsx — pulse / RR interval file:**

```
Columns (raw tab):
  Onset  → time marker (msec from recording start)
  RR     → RR interval (msec) = beat-to-beat cardiac interval

Columns (with units tab):
  Time from start recording (msec)
  Time from start recording (sec)
  Time from start recording (min)
  PP (msec)   → pulse period (= RR interval in msec)
  PP (sec)    → same in seconds
  HR (bpm)    → heart rate derived from RR

Example rows:
  636 msec onset  → RR=824 msec → HR=72.82 bpm
  1440 msec       → RR=804 msec → HR=74.63 bpm
  7620 msec       → RR=3000 msec → HR=20.00 bpm (artifact / detection gap)

This is the beat-to-beat cardiac interval input to the Somno-Art algorithm.
```

---

## 4. Output files — what Somno-Art produces

**Source: HCP manual section 3**

### 4.1 Sleep stage classification — TXT file

```
Format: text file (.txt)
Filename: Somno-Art_<input filename>_HYPNO.txt
Content: sleep stage for each 30-second page of the recording

CE outputs (4 stages):  W, N1+N2, N3, REM
FDA outputs (3 stages): W, NREM, REM

Example extract from manual:
  Time        Page  Stage
  23:13:51    1     0     (0 = W)
  23:14:21    2     0
  23:14:51    3     0
  ...

1-second epoch classification → downsampled to 30-second epochs
Dominant stage selected per 30-second window.
```

### 4.2 Sleep report — PDF file

```
Format: PDF
Filename: Somno-Art_<input filename>.pdf

Classic report includes:
→ General information (Study ID, Subject ID, software version, recording date)
→ Hypnogram image (visual sleep stage timeline)
→ Sleep architecture parameters + normative values (CE only)
→ Sleep stage transition matrix (CE only)
→ Measures from recording
→ Reading guide

Simplified report (CE only):
→ Same minus transition matrix
```

**From Multiple Night Report confirmed in project:**

```
Study ID: PPRS01
Subject: Subject1001
Software: Somno-Art Software 2.8.0[3.2.1]
Report date: 2024-11-19
10 nights analysed: Sep 16 to Sep 29, 2023
Sleep stages displayed: W, N1+N2, N3, REM
HypnoLog: multi-night hypnogram with WASO% and Sleep Efficiency% per night
```

### 4.3 CSV signal export

```
3 CSV files produced from SAR input:

1. Somno-Art_<filename>_header+Events.csv
   → SAR file header info + events

2. Somno-Art_<filename>_MV.csv
   → Actimetry from SAR file, accumulated every 30 seconds

3. Somno-Art_<filename>_RR.csv
   → Raw RR intervals from SAR file
```

### 4.4 Sleep parameters — XLSX files (global output)

```
Aggregates results of ALL recordings into Excel tables.

File 1: Somno-Art_SLEEP_PARAMS.xlsx
→ Standard sleep parameters (see full list in section 5)

File 2: Somno-Art_EXTRA_PARAMS.xlsx  (CE outputs only)
→ Extended parameters (see full list in section 5)

Both files contain:
→ Tab "Definitions": definition of all parameters
→ Tab "Info": analysis date + software version
→ Columns: Source code, Subject code, Record code, Visit code, Analysis status,
           Lights Off Time, Lights On Time, Sleep Alloc. Time, TST, [all parameters...]
```

These two Excel files are the **main structured source for backend ingestion**.

---

## 5. All confirmed output parameters

**Source: HCP manual sections 3.2.1 + Multiple Night Report tables**

This is the **complete reference list** of all confirmed Somno-Art output fields.
This is documentation — not the physical DB schema.
See section 12 for which fields go where in DB.

### SLEEP_PARAMS.xlsx — CE standard fields

| Parameter         | Definition                                             | Unit       |
| ----------------- | ------------------------------------------------------ | ---------- |
| Lights Off Time   | First epoch of sleep analysis                          | hr:min:sec |
| Lights On Time    | Last epoch (excluded) of sleep analysis                | hr:min:sec |
| Sleep Alloc. Time | Duration Lights Off → Lights On                       | min        |
| TST               | Total duration of non-W stages                         | min        |
| Sleep Latency     | Time Lights Off → any sleep stage                     | min        |
| WASO              | Wake After Sleep Onset — W duration after sleep onset | min        |
| Sleep Eff.        | TST / Sleep Alloc. Time                                | %          |
| Latency R         | Time Sleep Onset → first REM                          | min        |
| W Dur.            | Total wake duration Lights Off → Lights On            | min        |
| N1+N2 Dur.        | Total N1+N2 duration                                   | min        |
| N3 Dur.           | Total N3 (deep sleep) duration                         | min        |
| R Dur.            | Total REM duration                                     | min        |
| N1+N2 Perc.       | N1+N2 / TST                                            | %          |
| N3 Perc.          | N3 / TST                                               | %          |
| R Perc.           | REM / TST                                              | %          |

### EXTRA_PARAMS.xlsx — CE extended fields

| Parameter                     | Definition                                                          | Unit  |
| ----------------------------- | ------------------------------------------------------------------- | ----- |
| NREM Dur.                     | Total N1+N2+N3 duration                                             | min   |
| NREM Perc.                    | NREM / TST                                                          | %     |
| WASO Perc.                    | W after sleep onset / (Sleep Onset → Lights On)                    | %     |
| Sleep Latency N1+N2           | Lights Off → first N1 or N2                                        | min   |
| Sleep Latency N3              | Lights Off → first N3                                              | min   |
| Sleep Latency R               | Lights Off → first REM                                             | min   |
| Latency N1+N2                 | Sleep Onset → first N1 or N2                                       | min   |
| Latency N3                    | Sleep Onset → first N3                                             | min   |
| LPS                           | Latency to persistent sleep (Lights Off → 10 min continuous sleep) | min   |
| WALPS                         | Wake after latency to persistent sleep                              | min   |
| P R Onset                     | Lights Off → first 2 min continuous REM                            | min   |
| P R Latency                   | Sleep Onset → first 2 min continuous REM                           | min   |
| Latency LPS→R                | LPS → first REM                                                    | min   |
| No. of stage changes          | Total sleep stage transitions                                       | count |
| No. ascending changes         | Changes to lighter stage or wake                                    | count |
| No. descending changes        | Changes to deeper stage                                             | count |
| No. of Awk.                   | Number of awakenings (sleep onset → Lights On)                     | count |
| No. of Awk. >15s              | Awakenings > 15 seconds                                             | count |
| WASF                          | Wake time after sleep offset                                        | min   |
| No. of Cycles                 | Sleep cycles                                                        | count |
| No. of Mov.                   | Total individualised movements                                      | count |
| No. of Mov. before SO         | Movements before Sleep Onset                                        | count |
| No. of Mov. after SO          | Movements after Sleep Onset                                         | count |
| No. of Mov. before PSO        | Movements before Persistent Sleep Onset                             | count |
| No. of Mov. after PSO         | Movements after Persistent Sleep Onset                              | count |
| Mov. dur.                     | Total movement duration                                             | min   |
| No. of AC                     | Number of Cardiac Arousals                                          | count |
| No. of AC before/after SO/PSO | Cardiac Arousals split by timing                                    | count |
| AC dur.                       | Total Cardiac Arousal duration                                      | min   |
| AC ampl.                      | Average amplitude of Cardiac Arousals                               | bpm   |

### Analysis status values

| Status                        | Meaning                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| Done                          | Analysis successful                                         |
| Warning — out of battery     | Recording ended before Lights On (battery died)             |
| Warning — partial            | Analysis stopped before Lights On (major signal invalidity) |
| Warning — Lights Off shifted | Lights Off moved ≤1 min due to poor signal quality         |
| Warning — filename issue     | Filename doesn't match study/subject/record/visit in file   |

---

## 6. Real data confirmed from Multiple Night Report (project)

**Source: Multiple_night_report_(FR).pdf — Subject1001, 10 nights**

| Night | Date       | TST (min) | Sleep Eff (%) | WASO (min) | Sleep Lat. (min) | N1+N2 % | N3 %  | REM % | Cycles |
| ----- | ---------- | --------- | ------------- | ---------- | ---------------- | ------- | ----- | ----- | ------ |
| 1     | 2023-09-16 | 440.5     | 81.57         | 79.0       | 20.5             | 54.71   | 22.36 | 22.93 | 2      |
| 2     | 2023-09-17 | 301.5     | 74.54         | 18.5       | 84.5             | 61.03   | 28.03 | 10.95 | 2      |
| 3     | 2023-09-21 | 371.5     | 90.17         | 12.0       | 28.5             | 70.52   | 10.77 | 18.71 | 3      |
| 4     | 2023-09-22 | 458.5     | 92.91         | 34.5       | 0.5              | 51.04   | 29.99 | 18.97 | 5      |
| 5     | 2023-09-24 | 332.0     | 85.13         | 16.0       | 42.0             | 62.80   | 22.74 | 14.46 | 3      |
| 6     | 2023-09-25 | 414.5     | 96.62         | 11.0       | 3.5              | 64.90   | 17.37 | 17.73 | 3      |
| 7     | 2023-09-26 | 368.5     | 94.25         | 11.5       | 11.0             | 48.85   | 29.72 | 21.44 | 2      |
| 8     | 2023-09-27 | 401.0     | 93.04         | 12.0       | 18.0             | 62.09   | 12.47 | 25.44 | 4      |
| 9     | 2023-09-28 | 339.5     | 81.12         | 10.0       | 69.0             | 52.58   | 20.62 | 26.80 | 3      |
| 10*   | 2023-09-29 | 444.0     | 90.34         | 16.5       | 31.0             | 55.52   | 18.47 | 26.01 | 2      |

*Night 10 = Warning (out of battery)

---

## 7. Data flow — full chain

```
Patient wears recording device (Somno-Art Device or compatible)
during sleep night (≥5 hours)
        ↓
SAR or XML file produced by device
        ↓
File transferred securely to Somno-Art Trained Professional
        ↓
Somno-Art Software v2.8.0[3.2.1] analyses the file
        ↓
Outputs produced:
  → HYPNO.txt          (sleep stage per 30s epoch)
  → PDF report         (hypnogram + parameters)
  → MV.csv             (actimetry signal)
  → RR.csv             (beat-to-beat RR intervals)
  → SLEEP_PARAMS.xlsx  (standard sleep parameters)
  → EXTRA_PARAMS.xlsx  (extended parameters, CE only)
        ↓
Files available in project folder / shared location
        ↓
Backend ingests files
        ↓
db_somnoart_raw     ← full parsed content + file metadata stored here first
        ↓
db_somnoart         ← core useful nightly metrics extracted and stored here
```

---

## 8. Route — V1 and long-term

### V1 route — XLSX file ingestion

```
Status: ✅ confirmed direction
Route: shared folder / file drop → backend ingestion → db_somnoart_raw → db_somnoart

Main files for V1:
→ Somno-Art_SLEEP_PARAMS.xlsx  ← main source for all sleep parameters per night
→ Somno-Art_EXTRA_PARAMS.xlsx  ← extended parameters (CE outputs)

Optional later files:
→ Somno-Art_<filename>_HYPNO.txt  ← stage-by-stage per 30s epoch
→ Somno-Art_<filename>_RR.csv     ← raw RR intervals (for signal/biomarker layer)
→ Somno-Art_<filename>_MV.csv     ← raw actimetry (for signal/biomarker layer)
```

**V1 ingestion logic:**

```
1. Backend polls or receives shared folder
2. New file detected → parse SLEEP_PARAMS.xlsx + EXTRA_PARAMS.xlsx
3. Store full parsed row + file context → db_somnoart_raw
4. Extract core fields → insert one clean row per night → db_somnoart
5. Flag analysis_status (Done / Warning / partial)
```

### Long-term route

```
Still file-based — no official API or direct integration route confirmed.
Unless PPRS/Somno-Art provides a cloud API in the future, file ingestion
remains the correct production route.
```

---

## 9. Frequency / sync

| Layer                 | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| Recording frequency   | Nightly — one recording per night                        |
| Output generation     | After Somno-Art Software processes the SAR/XML file       |
| File availability     | After trained professional processes the file             |
| Backend refresh       | File-drop based — per report / per batch                 |
| Real-time             | ❌ Not applicable — report-based source                  |
| Usable refresh rhythm | Nightly / per night processed — exact path not confirmed |

```
Somno-Art is NIGHTLY — not continuous, not real-time.
One recording = one sleep night = one set of output files.
Backend gets data when the file is processed and deposited.
```

---

## 10. Schema structure — 3 things, not the same

Before looking at the schemas, it is important to understand that there are **3 distinct things** here:

```
1. somnoArt full fields  (section 5 above)
   = complete reference list of all confirmed Somno-Art output fields
   = documentation only — not a DB table
   = source of truth for what the software produces

2. db_somnoart
   = main backend / dashboard DB table
   = contains only the core useful nightly sleep metrics
   = what the API, dashboard, and backend logic read from

3. db_somnoart_raw
   = ingestion and traceability DB table
   = contains file metadata + full parsed source content in raw_payload JSONB
   = backend writes here first, then extracts to db_somnoart
```

The extended fields that are **not** promoted to `db_somnoart` do not disappear.
They are preserved inside `raw_payload` in `db_somnoart_raw` until a decision is made.

### Open design question — do we need a third mapped table?

This is the current open question: the full field list (section 5) has many confirmed extended fields that are not in `db_somnoart`. Where do they live in DB?

```
Option A — raw_payload is enough for now  ← current direction
→ Extended fields stay inside raw_payload JSONB in db_somnoart_raw
→ They can be queried from JSONB if needed before any promotion decision
→ No extra table needed in V1
→ Simpler, less maintenance overhead

Option B — add a third fully mapped table
→ Create db_somnoart_extended with all confirmed extended columns mapped
→ Cleaner SQL querying on extended fields without JSONB extraction
→ More upfront work, more tables to maintain
→ Only worth it if extended fields are actively queried in V1

Decision: ❓ not confirmed yet
Current direction: Option A — extended fields live in raw_payload for now,
specific fields promoted to db_somnoart only when the project needs them
```

---

## 11. Field grouping — what goes where

### Group A — Core fields → in `db_somnoart` now

```
analysis_status, sleep_state
tst, sleep_efficiency, waso, sleep_latency, rem_latency
n1_n2_duration, n3_duration, rem_duration
cycle_count, nb_awakening
```

These are the most useful nightly metrics for backend, dashboard, and clinical use.

### Group B — Extended fields → in `raw_payload` for now

```
lights_off_time, lights_on_time, sleep_alloc_time_min
wake_duration, waso_pct
sleep_latency_n3, sleep_latency_r, lps
nrem_duration, n1_n2_pct, n3_pct, rem_pct, nrem_pct
nb_awakenings_gt15s, nb_stage_changes
nb_movements, nb_cardiac_arousals, cardiac_arousal_ampl_bpm
```

All confirmed and stored inside `raw_payload` — not mapped to individual columns yet.
Can be promoted to `db_somnoart` (or a third table) later if needed.

### Group C — File / source tracking fields → always in `db_somnoart_raw`

```
software_version, record_id, visit_code
file_name, file_type, source_path, ingested_at
```

These are for ingestion traceability only — not for dashboard or clinical use.

---

## 12. Final schemas

### 12.1 Main table — `db_somnoart`

The main structured Somno-Art table used by the backend and dashboard.
One row = one analysed sleep night per patient.

```sql
id               UUID            PK — unique record identifier
patient_id       UUID/INT        FK → patients — main join key
night_date       DATE            sleep night date — one row = one analysed night
timestamp        TIMESTAMPTZ     analysis/report time if available
source_name      TEXT            always 'somnoart'

-- Quality
analysis_status  TEXT            'Done' | 'Warning-battery' | 'Warning-partial' |
                                  'Warning-LightsOff-shifted' | 'Warning-filename'

-- Sleep state summary
sleep_state      TEXT            sleep stage / state summary

-- Core sleep parameters
tst              NUMERIC(6,2)    Total Sleep Time (min)
sleep_efficiency NUMERIC(6,2)    TST / sleep alloc time (%)
waso             NUMERIC(6,2)    Wake After Sleep Onset (min)
sleep_latency    NUMERIC(6,2)    time to fall asleep (min)
rem_latency      NUMERIC(6,2)    Sleep Onset → first REM (min)

-- Sleep stage durations
n1_n2_duration   NUMERIC(6,2)    light sleep duration (min)
n3_duration      NUMERIC(6,2)    deep sleep duration (min)
rem_duration     NUMERIC(6,2)    REM duration (min)

-- Architecture summary
cycle_count      INT             number of sleep cycles
nb_awakening     INT             number of awakenings during the night

-- Traceability link
raw_payload      JSONB           optional link to full source row from db_somnoart_raw
created_at       TIMESTAMPTZ     DEFAULT now()
```

### 12.2 Raw / ingestion table — `db_somnoart_raw`

Ingestion and traceability table. Written to first, before extracting to `db_somnoart`.
Stores all Group B extended fields inside `raw_payload` until promoted.

```sql
id               UUID            PK — unique raw row identifier
patient_id       UUID/INT        patient key if known at ingestion time
night_date       DATE            night identifier if available in source
timestamp        TIMESTAMPTZ     ingestion / analysis / report time if available
source_name      TEXT            always 'somnoart'

-- File context
file_type        TEXT            SLEEP_PARAMS / EXTRA_PARAMS / HYPNO / RR / MV / report
file_name        TEXT            original file name
source_path      TEXT            shared folder / deposit path / origin path
software_version TEXT            Somno-Art software version string

-- Source tracking
analysis_status  TEXT            quality/status from source output
record_id        TEXT            recording identifier from filename or report
visit_code       TEXT            visit code if present

-- Full content
raw_payload      JSONB           full parsed row or extracted source content
                                  ↳ Group B extended fields live here for now

-- Ingestion metadata
ingested_at      TIMESTAMPTZ     backend ingestion timestamp
created_at       TIMESTAMPTZ     DEFAULT now()
```

---

## 13. Key fields for OSA project

| Field                | Why important                                                   |
| -------------------- | --------------------------------------------------------------- |
| `tst`              | Total sleep time — core sleep health metric                    |
| `sleep_efficiency` | Ratio sleep / time in bed — overall sleep quality              |
| `waso`             | Wake time after sleep onset — sleep fragmentation              |
| `n3_duration`      | Deep sleep — restoration quality                               |
| `rem_duration`     | REM sleep — cognitive restoration, OSA-relevant                |
| `sleep_latency`    | Time to fall asleep — sleep quality indicator                  |
| `rem_latency`      | Time to first REM — relevant for OSA and sleep disorders       |
| `cycle_count`      | Number of complete sleep cycles — architecture quality         |
| `nb_awakening`     | Total awakenings — fragmentation summary                       |
| `analysis_status`  | Data quality flag — must always be checked before using values |

---

## 14. Analysis status — backend rule

Always check `analysis_status` before using Somno-Art values.

```
Done
→ values are complete and reliable → use normally

Warning (out of battery)
→ values may not cover the full night → flag in patient_week

Warning (partial)
→ values only cover the analysed portion → flag, use with caution

Warning (Lights Off shifted)
→ latencies are relative to the shifted time → note the offset

Warning (filename issue)
→ subject/study ID mismatch → verify before storing
```

Backend rule:

```python
if analysis_status == 'Done':
    → ingest normally

elif 'Warning' in analysis_status:
    → ingest but set quality_flag = True in patient_week
    → store analysis_status text for traceability
```

---

## 15. Open questions

| # | Question                                                                             | Status                               |
| - | ------------------------------------------------------------------------------------ | ------------------------------------ |
| 1 | What is the exact shared folder / file deposit path for Somno-Art outputs?           | ❓ not confirmed                     |
| 2 | Who processes the SAR/XML files through Somno-Art Software — internal team or PPRS? | ❓ unknown                           |
| 3 | What is the expected file delivery rhythm — per night, per batch, per week?         | ❓ not confirmed                     |
| 4 | Should we ingest SLEEP_PARAMS only, or also EXTRA_PARAMS and HYPNO.txt in V1?        | ❓ design decision                   |
| 5 | Should we ingest the raw RR.csv and MV.csv files for the biomarker layer?            | ❓ pending                           |
| 6 | Are CE or FDA outputs used in this project (4-stage vs 3-stage classification)?      | ❓ not confirmed                     |
| 7 | Is there an automation mechanism for file drop, or is it always manual?              | ❓ not confirmed                     |
| 8 | Do extended fields need their own mapped DB table, or does raw_payload cover V1?     | ❓ design decision — see section 10 |

---

## 16. Status summary

```
Source:                   Somno-Art — standalone sleep analysis software
Software:                 ✅ confirmed — v2.8.0[3.2.1] by PPRS
Medical indications:      ✅ documented — adults, sleep staging, OSA follow-up
Input formats:            ✅ SAR (.sar) and XML — confirmed from HCP manual
Output files:             ✅ all documented — HYPNO.txt, PDF, CSV, XLSX
Sleep parameters:         ✅ fully confirmed — SLEEP_PARAMS + EXTRA_PARAMS field lists
Real project data:        ✅ Multiple night report confirmed — 10 nights, Subject1001
Raw data files:           ✅ Mvt_RawData_example.xlsx + PP_RawData_example.xlsx in project
V1 route:                 ✅ XLSX file ingestion — confirmed direction
Long-term route:          ✅ still file-based — no API confirmed
Real-time:                ❌ not applicable — nightly report-based source
Schema — main table:      ✅ db_somnoart defined — core nightly metrics only
Schema — raw table:       ✅ db_somnoart_raw defined — file metadata + raw_payload
Extended fields:          ✅ confirmed and stored in raw_payload — not yet promoted
Third mapped table:       ❓ design decision pending — see section 10
Shared folder path:       ❓ not confirmed
File delivery automation: ❓ not confirmed
CE vs FDA outputs:        ❓ not confirmed
```

---

## 17. Next actions

```
1. Confirm with Yasaman / project team:
   - What is the exact shared folder / deposit path for Somno-Art files?
   - Who runs the Somno-Art Software analysis (trained professional)?
   - What is the file delivery frequency (per night, per batch)?
   - CE or FDA outputs (4-stage or 3-stage classification)?

2. Once path confirmed:
   - Set up file watcher / polling on shared folder
   - Parse SLEEP_PARAMS.xlsx → store full row in db_somnoart_raw
   - Extract core fields → insert into db_somnoart
   - Add analysis_status check before ingesting
   - Handle Warning statuses with quality flags

3. Design decisions to confirm:
   - Do extended fields need a third mapped DB table, or is raw_payload enough for V1?
   - Which extended fields (if any) should be promoted to db_somnoart now?
   - Should EXTRA_PARAMS.xlsx feed into db_somnoart directly in V1?

4. Later:
   - Decide if HYPNO.txt (30s epoch stages) is needed for the AI/model layer
   - Decide if RR.csv and MV.csv should feed the biomarker layer
```
