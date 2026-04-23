# CPAP Sources — Simple Summary

### Linde Homecare / Backend Project

> Simple version. For full details → read CPAP_ALL_SOURCES_COMPLETE.md

---

## 📋 CONTENTS

```
PART 1 — What is CPAP in this project
PART 2 — LMD / Linde Medical Direct
PART 3 — Philips / Care Orchestrator
PART 4 — ResMed / AirView
PART 5 — Löwenstein / prisma CLOUD
PART 6 — Sefam / Sefam Connect
PART 7 — Global status + what we need
```

---

# PART 1 — What is CPAP in this project

CPAP is the central data source. It gives us therapy metrics to monitor patients: usage hours, AHI (apnea events), leaks, and pressure. This data goes into `db_cpap` in our backend.

**4 manufacturers used by Linde patients:** Philips, ResMed, Löwenstein, Sefam.

**How it works:**

```
Patient uses CPAP at night
→ Device records: usage, AHI, leaks, pressure
→ Device sends data to manufacturer cloud
→ Our backend retrieves data from the cloud via API
→ Data stored in db_cpap
→ Used for dashboard, alerts, AI model
```

**Important:** CPAP is NOT real-time. Data arrives next morning at the earliest.

---

# PART 2 — LMD / Linde Medical Direct

**What it is:**
Linde's own web service. One entry point for all CPAP manufacturers.

**How we get data:**

```
Our backend → LMD API → therapy data → db_cpap
```

**Status:**

```
✅ Working code exists from previous project
❌ Credentials missing — need from team
❌ Need proxy access (Linde network)
```

---

# PART 3 — Philips / Care Orchestrator

**What it is:**
Philips cloud. All Philips devices send data here. One API covers all models.

**How we get data:**

```
Our backend → Care Orchestrator API → therapy data → db_cpap
```

**Status:**

```
✅ API confirmed working (integration.careorchestrator.com)
✅ Documentation accessible
❌ Blocked — need integrator credentials from Philips
```

---

# PART 4 — ResMed / AirView

**What it is:**
ResMed cloud. All ResMed devices send data here.

**How we get data:**

```
Our backend → AirView Exchange (AVX) API → therapy data → db_cpap
```

**Important:**

```
AVX API = correct solution ✅
AirView Extract (XML) = temporary workaround only ⚠️
  → less control, harder to maintain, not for long term
```

**Status:**

```
✅ API documented and understood
❌ Need AVX integrator access from ResMed
```

---

# PART 5 — Löwenstein / prisma CLOUD

**What it is:**
German manufacturer. Cloud platform: prisma CLOUD.

**How we get data:**

```
Our backend → prisma CLOUD API → therapy data → db_cpap
```

**Status:**

```
✅ API confirmed to exist
⚠️ Credentials old → 404 error
❌ Need updated credentials and correct URL
→ Contact: support@prismaCLOUD.com
```

---

# PART 6 — Sefam / Sefam Connect

**What it is:**
French manufacturer. Cloud platform: Sefam Connect.
**Most ready integration we have right now.**

**How we get data:**

```
Our backend → Sefam Connect GraphQL API → therapy data → db_cpap
```

Note: Sefam uses GraphQL instead of REST. Different but not harder — cleaner actually.

**Status:**

```
✅ API CONFIRMED WORKING — tested
✅ Test environment available
❌ Need login credentials to connect
```

---

# PART 7 — Global status + what we need

## Status table

| Source                | API Working?   | Credentials      | Priority                |
| --------------------- | -------------- | ---------------- | ----------------------- |
| **LMD**         | ✅ Code exists | ❌ Missing       | V1 — most concrete now |
| **Philips**     | ❌ Blocked     | ❌ Not received  | Long-term               |
| **ResMed**      | ❌ Not tested  | ❌ Not confirmed | Long-term               |
| **Löwenstein** | ⚠️ 404       | ⚠️ Expired     | Long-term               |
| **Sefam**       | ✅ Responds    | ❌ Needed        | Most ready right now    |

## What we need

```
LMD        → credentials + proxy access
Philips    → integrator access (or confirm if already exists)
ResMed     → AVX access (or confirm if already exists)
Sefam      → login credentials + test patient + production URL
Löwenstein → contact support@prismaCLOUD.com directly
```
