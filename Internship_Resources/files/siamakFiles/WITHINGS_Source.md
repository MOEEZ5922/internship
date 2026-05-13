
# Withings — Source Documentation

**Project:** CPAP/OSA Backend MVP — Linde Homecare France
**Last updated:** 2026-04-22
**Sources used:** openapi.json (official Withings API), developer.withings.com, notification docs, partner hub screenshots

---

## 1. What is Withings in this project

Withings is a consumer medical device company.
Two devices are used in this project:

| Device             | What it measures                            |
| ------------------ | ------------------------------------------- |
| **Watch**    | Activity, sleep, HR, HRV, SpO2, respiration |
| **BPM Core** | Blood pressure, SpO2, ECG, Afib             |

Both devices sync to the **Withings mobile app**, which uploads data to the **Withings cloud**.
Our backend retrieves data from the cloud via the **Withings Public API**.

---

## 2. Data flow — full chain

```
Patient wears device
        ↓
Device records data continuously (Watch) or per measurement (BPM Core)
        ↓
Patient opens Withings app on phone
        ↓
App connects to device via Bluetooth
        ↓
App uploads data to Withings cloud servers
        ↓
Our backend calls Withings API
        ↓
Data stored in PostgreSQL (db_withings_watch / db_withings_bpm_core)
```

---

## 3. Critical constraint — no real-time

**From official Withings API docs (openapi.json — Measure, Sleep, Heart sections):**

> *"The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK)."*

This means:

- Data is **not** available in real-time
- Data only appears on the API **after** the patient opens the Withings app and syncs
- If the patient does not open the app → we get nothing
- There is no direct device → cloud connection without the app (unless Cellular solution is used — not confirmed for this project)

**Concrete example:**

```
Patient sleeps Monday night with watch
Tuesday 8 AM → patient does NOT open app
Our backend calls API at 8 AM → nothing returned for Monday night

Tuesday 2 PM → patient opens Withings app
Sync happens → data uploaded to cloud
Our backend calls API again → Monday night data now available
Delay = ~14 hours from recording to availability
```

**What we cannot fix:**
If the patient never opens the app, the data never reaches the cloud.
No webhook, no pull frequency, no backend logic can recover this.
This is a patient behavior constraint, not a backend problem.
→ Solution: `missingness_flag` in `patient_week` layer to track patients with no data that week.

---

## 4. Sync options

### Option 1 — Daily scheduled pull (V1)

```
Every day at 7 AM:
→ backend loops through all patients with valid Withings tokens
→ calls API for each patient separately
→ stores new data if returned
→ flags missing if nothing returned
```

- Simple to implement
- Safe for V1
- Wastes API calls on patients who did not sync
- May miss data if patient synced after 7 AM

### Option 2 — Notify / Webhook (long-term)

```
Patient opens app → sync happens
→ Withings detects new data
→ Withings sends POST to our callback URL:

POST https://our-backend.com/webhooks/withings
{
  userid: 12345,
  appli: 44,
  startdate: 1714000000,
  enddate: 1714050000
}

→ our backend receives this immediately
→ calls the correct endpoint for that patient only
→ stores the data
```

- Event-driven — only calls API when data actually exists
- No wasted API calls
- Near-instant data availability
- Requires backend webhook endpoint
- Must subscribe per patient per appli code

**Important:** Withings sends one notification per user. There is no "get all patients at once" endpoint. Every API call is per user, using that user's individual access_token.

### V1 vs Long-term

|                  | V1                 | Long-term           |
| ---------------- | ------------------ | ------------------- |
| Method           | Daily cron pull    | Notify + webhook    |
| Trigger          | Time-based (7 AM)  | Event-based         |
| API calls        | All patients daily | Only when triggered |
| Miss risk        | Medium             | Low                 |
| Setup complexity | Low                | Medium              |
| Status           | ✅ Use for V1      | ⏳ Add after V1     |

---

## 5. Auth — OAuth2

**Source:** openapi.json — OAuth2 section

Withings uses OAuth2 Authorization Code Flow.
The patient must give permission to our app before we can access their data.

### Auth flow

```
Step 1 — Authorization URL
GET https://account.withings.com/oauth2_user/authorize2
params:
  response_type = code
  client_id     = our app client_id
  scope         = user.metrics,user.activity,user.info,user.sleepevents
  redirect_uri  = our callback URL
  state         = random value for CSRF protection

→ patient sees Withings login page
→ patient clicks "Allow"
→ Withings redirects to our redirect_uri with ?code=XXXX
→ code is valid for 30 SECONDS ONLY

Step 2 — Exchange code for tokens
POST https://wbsapi.withings.net/v2/oauth2
action        = requesttoken
grant_type    = authorization_code
client_id     = our client_id
client_secret = our client_secret
code          = code from step 1
redirect_uri  = same as step 1

→ response:
{
  userid        : 12345,       ← MUST save in DB
  access_token  : "...",       ← valid 3 hours
  refresh_token : "...",       ← long-term
  expires_in    : 10800,
  scope         : "user.metrics,user.activity"
}

Step 3 — Use access_token in every request
Authorization: Bearer {access_token}

Step 4 — Refresh when expired
POST /v2/oauth2
action      = requesttoken
grant_type  = refresh_token
refresh_token = stored refresh_token
→ get new access_token + new refresh_token
```

### What to store in DB per patient

```sql
withings_userid     INT           -- Withings internal ID, mandatory
access_token        TEXT          -- encrypted, expires in 3h
refresh_token       TEXT          -- encrypted, long-term
token_expires_at    TIMESTAMPTZ   -- when to refresh
scope               TEXT          -- confirmed permissions
created_at          TIMESTAMPTZ
updated_at          TIMESTAMPTZ
```

### Token refresh logic

```python
def get_valid_token(patient_id):
    token = get_token_from_db(patient_id)
    # refresh 5 minutes before expiry
    if token.expires_at < now() + timedelta(minutes=5):
        new_token = call_withings_refresh(token.refresh_token)
        save_token_to_db(patient_id, new_token)
        return new_token.access_token
    return token.access_token
```

### If refresh_token becomes invalid

```
Happens when:
- patient revokes app access
- patient changes Withings password
- token unused for very long time

Result:
→ 401 Unauthorized on refresh attempt
→ flag patient as reauth_needed in DB
→ dashboard shows alert to technician
→ patient must re-authorize manually (full OAuth flow again)
→ cannot recover automatically
```

### Token security rules

```
- Never store tokens in plain text → encrypt at rest
- Never log tokens → remove from all print/log statements
- Never expose tokens in API responses → backend internal use only
```

### Required credentials (blockers)

```
client_id      ← from Withings Partner/Developer app
client_secret  ← from Withings Partner/Developer app
redirect_uri   ← our backend callback URL
```

**Status: not confirmed we have these yet.**

---

## 6. Scopes

| Scope                | Covers                                    |
| -------------------- | ----------------------------------------- |
| `user.metrics`     | BP, HR, SpO2, ECG, HRV, BPM Core data     |
| `user.activity`    | Steps, sleep, activity (Watch)            |
| `user.info`        | User profile                              |
| `user.sleepevents` | Bed in/out events (optional)              |
| `user.data`        | Survey answers (if Withings surveys used) |

---

## 7. API endpoints

**Base URL:** `https://wbsapi.withings.net`
**Auth:** `Authorization: Bearer {access_token}` on all calls

### Watch endpoints

| Endpoint             | Action                  | Key fields returned                                                                                                                                                             |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /v2/measure` | `getactivity`         | steps, distance, calories, hr_average, hr_min, hr_max, hr_zones                                                                                                                 |
| `POST /v2/measure` | `getintradayactivity` | heart_rate, spo2_auto, rmssd, sdnn1, hrv_quality, rr, chest_movement_rate                                                                                                       |
| `POST /v2/sleep`   | `getsummary`          | total_sleep_time, light/deep/rem sleep, sleep_efficiency, sleep_latency, waso, wakeup_count, hr_average, rr_average, snoring,**apnea_hypopnea_index**, sleep_score, rmssd |
| `POST /v2/sleep`   | `get`                 | high-frequency: hr, rr, snoring, rmssd, hrv_quality per minute                                                                                                                  |
| `POST /v2/heart`   | `list`                | ECG record list                                                                                                                                                                 |
| `POST /v2/heart`   | `get`                 | raw ECG signal                                                                                                                                                                  |

### BPM Core endpoints

| Endpoint           | Action      | Key fields / meastype                                                                                                                                |
| ------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /measure`  | `getmeas` | meastype 9=diastolic_bp, 10=systolic_bp, 11=heart_pulse, 54=spo2, 91=pulse_wave_velocity, 130=afib_result, 135=qrs, 136=pr, 137=qt, 138=corrected_qt |
| `POST /v2/heart` | `list`    | ECG record list (20s at 500Hz for BPM Core)                                                                                                          |
| `POST /v2/heart` | `get`     | raw ECG signal                                                                                                                                       |

### Notify endpoint

| Endpoint         | Action        | Use                                           |
| ---------------- | ------------- | --------------------------------------------- |
| `POST /notify` | `subscribe` | subscribe to notifications per user per appli |
| `POST /notify` | `list`      | list active subscriptions                     |
| `POST /notify` | `revoke`    | cancel subscription                           |

### Notify appli codes

| appli | Trigger            | Call after           |
| ----- | ------------------ | -------------------- |
| 4     | New BP / HR / SpO2 | `getmeas`          |
| 16    | New activity       | `getactivity`      |
| 44    | New sleep          | `sleep getsummary` |
| 54    | New ECG            | `heart list`       |
| 62    | New HRV            | `getmeas`          |

---

## 8. Frequency / sync

| Device             | Data production       | Backend availability              |
| ------------------ | --------------------- | --------------------------------- |
| Watch              | Continuous while worn | After patient opens app + sync    |
| BPM Core           | Per measurement only  | After measurement + app sync      |
| Real-time          | ❌ Not available      | ❌ Not available                  |
| V1 pull            | Daily cron 7 AM       | Best effort                       |
| Notify (long-term) | Immediate on sync     | As soon as Withings receives data |

---

## 9. db_withings_watch schema

```sql
id                      UUID            PK
patient_id              UUID/INT        FK → patients — main join key
timestamp               TIMESTAMPTZ     exact sync/measurement time
source_name             TEXT            always 'withings'
device_type             TEXT            watch model / family label
source_type             TEXT            'activity' | 'sleep' | 'intraday'

-- Activity
step_count              INT
distance                NUMERIC(8,3)    meters
calories                NUMERIC(8,3)    active calories
activity_value          JSONB           full activity block if needed

-- Heart rate
heart_rate              NUMERIC(6,2)    average HR
hr_min                  NUMERIC(6,2)
hr_max                  NUMERIC(6,2)

-- HRV
hrv_rmssd               NUMERIC(8,3)
hrv_sdnn1               NUMERIC(8,3)
hrv_quality             TEXT/JSONB      HRV quality flag

-- SpO2 / Respiration
spo2                    NUMERIC(6,2)    device/feature dependent
respiration_rate        NUMERIC(6,2)    breaths per minute

-- Sleep summary
sleep_state             TEXT            sleep stage if available
sleep_summary_payload   JSONB           full sleep summary block
total_sleep_time_s      INT             total sleep in seconds
sleep_efficiency        NUMERIC(5,4)    ratio sleep / time in bed
apnea_hypopnea_index    NUMERIC(5,2)    ⚠️ key OSA field — EU devices only
sleep_score             INT             Withings sleep score
waso_s                  INT             wake after sleep onset (seconds)
wakeup_count            INT             number of wakeups

-- Metadata
raw_payload             JSONB           full API response
created_at              TIMESTAMPTZ     DEFAULT now()
```

---

## 10. db_withings_bpm_core schema

```sql
id                      UUID            PK
patient_id              UUID/INT        FK → patients — main join key
timestamp               TIMESTAMPTZ     exact measurement time
source_name             TEXT            always 'withings'
device_type             TEXT            'BPM Core' or BPM family label

-- Blood pressure
systolic_bp             NUMERIC(6,2)    meastype 10
diastolic_bp            NUMERIC(6,2)    meastype 9

-- Cardiac
heart_rate              NUMERIC(6,2)    meastype 11
spo2                    NUMERIC(6,2)    meastype 54 — device dependent
afib_result             INT             meastype 130
pulse_wave_velocity     NUMERIC(6,3)    meastype 91

-- ECG
ecg_flag                TEXT/JSONB      ECG classification / summary
ecg_signal_id           TEXT            link to Heart API signal
qrs_duration            NUMERIC(6,2)    meastype 135
pr_duration             NUMERIC(6,2)    meastype 136
qt_duration             NUMERIC(6,2)    meastype 137
corrected_qt            NUMERIC(6,2)    meastype 138

-- Metadata
raw_payload             JSONB           full API response
created_at              TIMESTAMPTZ     DEFAULT now()
```

---

## 11. db_withings — family layer

```
db_withings is kept as a family/source layer above the two device tables.
It is NOT the main implementation table.

Purpose:
- represents Withings as one source family
- common fields shared across Watch and BPM Core can be referenced here
- later: selected fields from both tables map to db_biomarkers

Layer order:
db_withings_watch     ← device-specific source table (V1 implementation)
db_withings_bpm_core  ← device-specific source table (V1 implementation)
        ↓
db_withings           ← family layer (reference only for now)
        ↓
db_biomarkers         ← normalized biomarker layer (later)
        ↓
patient_week          ← weekly aggregation (later)
```

---

## 12. Mobile SDK — note

Withings offers a **Mobile SDK** for partners who want to embed sync directly inside their own app.

```
Normal route:
Patient → opens Withings app → syncs → Withings cloud → our API

SDK route:
Patient → opens OUR app → syncs directly → Withings cloud → our API
```

|                                | Normal API | Mobile SDK |
| ------------------------------ | ---------- | ---------- |
| Patient needs Withings app     | Yes        | No         |
| We control sync trigger        | No         | Yes        |
| Requires Withings Pro contract | No         | Yes        |
| Backend complexity             | Low        | Higher     |

**For V1 → not needed. Keep normal API route.**
Could be relevant long-term if we build our own patient mobile app.

---

## 13. Key fields for OSA project

| Field                              | Device           | Why important             |
| ---------------------------------- | ---------------- | ------------------------- |
| `apnea_hypopnea_index`           | Watch (EU)       | Direct OSA metric         |
| `spo2`                           | Watch + BPM Core | Oxygen desaturation       |
| `hrv_rmssd` / `hrv_quality`    | Watch            | Autonomic nervous system  |
| `sleep_efficiency`               | Watch            | Sleep quality             |
| `total_sleep_time_s`             | Watch            | Sleep duration            |
| `waso_s`                         | Watch            | Sleep fragmentation       |
| `afib_result`                    | BPM Core         | Cardiovascular risk       |
| `systolic_bp` / `diastolic_bp` | BPM Core         | Cardiovascular monitoring |
| `respiration_rate`               | Watch            | Breathing quality         |

---

## 14. Open questions

| # | Question                                                                                               | Status                     |
| - | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| 1 | Do we already have a Withings Partner app (client_id / client_secret)?                                 | ❌ not confirmed           |
| 2 | Do we have test Withings accounts and devices (Watch + BPM Core)?                                      | ❌ not confirmed           |
| 3 | Which Watch model exactly is used in the project?                                                      | ❓ unknown                 |
| 4 | V1 = API pull only, or configure Notify/webhook from the start?                                        | ❓ waiting for decision    |
| 5 | Is apnea_hypopnea_index available on the project Watch devices? (EU devices only)                      | ❓ needs confirmation      |
| 6 | Should withings_userid be stored in a separate token table or inside the patients table?               | ❓ design decision pending |
| 7 | Do patients use the standard Withings app, or are we expected to build our own app (Mobile SDK route)? | ❓ unknown                 |
| 8 | What is the expected pull frequency for V1: daily, twice daily, or webhook from start?                 | ❓ waiting                 |

---

## 15. Status summary

```
Source family:          Withings
Devices:                Watch + BPM Core
Route:                  ✅ Public API + OAuth2 — confirmed
API documentation:      ✅ openapi.json — complete
Auth flow:              ✅ documented
Fields identified:      ✅ Watch + BPM Core
Schemas:                ✅ db_withings_watch + db_withings_bpm_core defined
Notify/webhook:         ✅ appli codes identified — not yet implemented
Project OAuth setup:    ❌ client_id / client_secret not confirmed
Test devices/accounts:  ❌ not confirmed
Real-time:              ❌ not available — by design
V1 strategy:            ⏳ daily pull — ready to implement once credentials confirmed
Long-term strategy:     ⏳ Notify/webhook — add after V1
```

---

## 16. Next action

```
1. Confirm with Yasaman / Linde:
   - Do we have a Withings Partner app already?
   - Which Watch model is used?
   - Do we have test accounts / devices?

2. If yes → start OAuth2 setup + test first API call
3. If no → request Withings Partner access

4. After confirmed → implement:
   - Token storage table
   - Daily pull cron job (V1)
   - db_withings_watch + db_withings_bpm_core ingestion
   - missingness flag logic
```
